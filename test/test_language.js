// test_language.js

const assert = require('assert');
const sinon = require('sinon');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

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

  it('should set localStorage "idioma" based on navigator.language if not present', function(done) {
    // Forzamos el valor de navigator.language
    Object.defineProperty(window.navigator, 'language', {
      value: "es-ES",
      configurable: true
    });
    
    // Simulamos la carga de language.js inyectando su código en el DOM.
    const languageScript = `
      document.addEventListener("DOMContentLoaded", function() {
          if (!localStorage.getItem("idioma")) {
              const userLang = navigator.language || navigator.userLanguage;
              const langCode = userLang.startsWith("es") ? "es" : "en";
              localStorage.setItem("idioma", langCode);
          }
      });
      function cambiarIdioma(lang) {
          localStorage.setItem("idioma", lang);
          window.redirectTo("simbiosis_" + lang + ".html");
      }
    `;
    const scriptEl = document.createElement("script");
    scriptEl.textContent = languageScript;
    document.body.appendChild(scriptEl);

    // Disparamos el evento DOMContentLoaded
    document.dispatchEvent(new window.Event("DOMContentLoaded"));
    
    // Damos un pequeño retardo para que se ejecute el listener.
    setTimeout(function() {
      const idioma = window.localStorage.getItem("idioma");
      assert.strictEqual(idioma, "es");
      done();
    }, 0);
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
