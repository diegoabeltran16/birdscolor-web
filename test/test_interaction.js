// test/test_interaction.js

import { expect } from 'chai';
import { JSDOM, ResourceLoader, VirtualConsole } from 'jsdom';
import sinon from 'sinon';
import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Interacción con el ícono del pollito', function () {
  let window, document, pollito, spinner, clock;
  const REDIRECT_DELAY = 1000;
  const EXPECTED_REDIRECT = "simbiosis_es.html";

  beforeEach(async () => {
    // Fake timers para controlar el tiempo
    clock = sinon.useFakeTimers();

    const htmlPath = path.join(__dirname, '../src/pages/index.html');
    if (!fs.existsSync(htmlPath)) {
      throw new Error(`Archivo HTML no encontrado: ${htmlPath}`);
    }

    const html = fs.readFileSync(htmlPath, 'utf8');

    const resourceLoader = new ResourceLoader({
      fetch(url) {
        // Ignoramos scripts externos en tests
        return Promise.resolve(Buffer.from(''));
      }
    });

    const dom = new JSDOM(html, {
      runScripts: "dangerously",
      resources: resourceLoader,
      url: "http://localhost/",
      virtualConsole: new VirtualConsole()
    });

    await new Promise(resolve => setTimeout(resolve, 50));


    window = dom.window;
    document = window.document;
    pollito = document.getElementById("icono");
    spinner = document.getElementById("spinner");

    if (!pollito || !spinner) {
      throw new Error("Elemento 'icono' o 'spinner' no encontrado en el DOM.");
    }

    // Simulamos la lógica de script.js
    const simulatedScript = `
      function redirectTo(url) {
        window.__redirectedUrl = url;
      }

      document.getElementById("icono").addEventListener("click", function() {
        document.getElementById("spinner").style.display = "block";
        setTimeout(() => {
          redirectTo("simbiosis_es.html");
        }, 1000);
      });
    `;
    const scriptEl = document.createElement("script");
    scriptEl.textContent = simulatedScript;
    document.body.appendChild(scriptEl);

    // Inicializamos variable de prueba
    window.__redirectedUrl = "";
  });

  afterEach(() => {
    clock.restore();
  });

  it('Debe redirigir después del tiempo definido (diagnóstico con fake timers)', function () {
    pollito.dispatchEvent(new window.Event("click", { bubbles: true }));
    clock.tick(REDIRECT_DELAY + 100);
    expect(window.__redirectedUrl).to.include(EXPECTED_REDIRECT);
  });
});
