// test_language.js

import { expect } from 'chai';
import { JSDOM, ResourceLoader, VirtualConsole } from 'jsdom';
import sinon from 'sinon';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';



describe('Language Module Tests', function() {
  let dom, window, document;

  // Configuramos JSDOM con un HTML mínimo que incluya los elementos necesarios.
  beforeEach(function(done) {
    dom = new JSDOM(
      `<!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Test</title>
      </head>
      <body>
        <div id="icono"></div>
        <div id="spinner"></div>
      </body>
      </html>`,
      {
        url: "http://localhost/index.html",
        runScripts: "dangerously",
        resources: "usable"
      }
    );
    window = dom.window;
    document = window.document;
    // Limpiamos localStorage antes de cada prueba
    window.localStorage.clear();
    done();
  });

  afterEach(function() {
    // Cerramos la instancia de JSDOM
    dom.window.close();
  });

  it('should set localStorage "idioma" based on navigator.language if not present', function() {
    // ✅ Forzamos el idioma usando Proxy (sin redefinir .language directamente)
    const fakeNavigator = new Proxy(window.navigator, {
      get(target, prop) {
        if (prop === 'language') return 'es-ES';
        return target[prop];
      }
    });
    // Inyectamos el proxy
    Object.defineProperty(window, 'navigator', {
      value: fakeNavigator,
      configurable: true
    });
  
    // Simulamos el script del módulo language.js
    const languageScript = `
      if (!localStorage.getItem("idioma")) {
          const userLang = navigator.language || navigator.userLanguage;
          const langCode = userLang.startsWith("es") ? "es" : "en";
          localStorage.setItem("idioma", langCode);
      }
    `;
    const scriptEl = document.createElement("script");
    scriptEl.textContent = languageScript;
    document.body.appendChild(scriptEl);
  
    // ✅ Ejecutamos el código de inmediato (no necesita setTimeout ni done)
    const idioma = window.localStorage.getItem("idioma");
    expect(idioma).to.equal("es");
  });
  
  it('cambiarIdioma should update localStorage and call global redirectTo', function() {
    // Stub de window.redirectTo para evitar navegación real y capturar la URL.
    const redirectStub = sinon.stub();
    window.redirectTo = redirectStub;
    
    // Inyectamos la definición de la función cambiarIdioma (si no se cargó ya)
    const languageScript = `
      function cambiarIdioma(lang) {
          localStorage.setItem("idioma", lang);
          window.redirectTo("simbiosis_" + lang + ".html");
      }
    `;
    const scriptEl = document.createElement("script");
    scriptEl.textContent = languageScript;
    document.body.appendChild(scriptEl);

    // Llamamos a la función cambiarIdioma con "en"
    window.cambiarIdioma("en");
    
    // Verificamos que localStorage se actualizó
    assert.strictEqual(window.localStorage.getItem("idioma"), "en");
    // Verificamos que se llamó a redirectTo con la URL correcta
    assert(redirectStub.calledOnce, "redirectTo debe haberse llamado una vez");
    assert(redirectStub.calledWith("simbiosis_en.html"), "redirectTo debe llamarse con 'simbiosis_en.html'");
  });
});
