// En test_interaction.js (la versión final de las pruebas unitarias)
import { expect } from 'chai';
import { JSDOM, ResourceLoader, VirtualConsole } from 'jsdom';
import sinon from 'sinon';
import fs from 'node:fs';
import path from 'node:path';

describe('Interacción con el ícono del pollito', function() {
  this.retries(3);
  let window, document, pollito, spinner, clock, redirectStub;
  const REDIRECT_DELAY = 1000;
  const EXPECTED_REDIRECT = "simbiosis_es.html";

  beforeEach(async () => {
    // Configuramos fake timers.
    clock = sinon.useFakeTimers({
      toFake: ["setTimeout", "clearTimeout", "setInterval", "clearInterval"]
    });
    const htmlPath = path.join(__dirname, '../src/index.html');
    if (!fs.existsSync(htmlPath)) {
      throw new Error(`Archivo HTML no encontrado: ${htmlPath}`);
    }
    const html = fs.readFileSync(htmlPath, 'utf8');

    // ResourceLoader para evitar cargar archivos externos.
    const resourceLoader = new ResourceLoader({
      fetch(url) {
        if (url.endsWith('.css') || url.endsWith('.js')) {
          return Promise.resolve(Buffer.from(''));
        }
        return Promise.resolve(null);
      }
    });
    const virtualConsole = new VirtualConsole();
    virtualConsole.sendTo(console);

    // Configuramos JSDOM con la URL base.
    const dom = new JSDOM(html, {
      runScripts: "dangerously",
      resources: resourceLoader,
      url: "http://127.0.0.1:5500/src/index.html",
      virtualConsole
    });
    await new Promise(resolve => {
      dom.window.document.addEventListener("DOMContentLoaded", resolve);
    });

    window = dom.window;
    document = window.document;
    pollito = document.getElementById("icono");
    spinner = document.getElementById("spinner");
    if (!pollito || !spinner) {
      throw new Error("Elemento 'icono' o 'spinner' no encontrado en el DOM.");
    }
    // Definimos fetch en window para evitar errores.
    window.fetch = () => Promise.resolve({ ok: true });
    
    // Aquí ya se ha cargado el script, y window.redirectTo es la función global definida en script.js.
    // Stub de redirectTo para capturar la URL en window.__redirectedUrl.
    window.__redirectedUrl = "";
    redirectStub = sinon.stub(window, 'redirectTo').callsFake((url) => {
      window.__redirectedUrl = url;
    });
  });

  afterEach(() => {
    clock.restore();
    if (redirectStub) redirectStub.restore();
  });

  it('Debe redirigir después del tiempo definido (diagnóstico con fake timers)', function() {
    pollito.dispatchEvent(new window.Event("click", { bubbles: true }));
    clock.tick(REDIRECT_DELAY + 100);
    console.log("redirectedUrl:", window.__redirectedUrl);
    expect(window.__redirectedUrl).to.include(EXPECTED_REDIRECT);
  });
});
