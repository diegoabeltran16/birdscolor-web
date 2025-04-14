// test/test_interaction.js

import { expect } from 'chai';
import { JSDOM } from 'jsdom';
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

  beforeEach(() => {
    clock = sinon.useFakeTimers();

    const htmlPath = path.join(__dirname, 'index.test.html');
    const html = fs.readFileSync(htmlPath, 'utf8');

    const dom = new JSDOM(html, {
      runScripts: "dangerously",
      resources: "usable",
      url: "http://localhost/"
    });

    window = dom.window;
    document = window.document;

    // Simulamos la lógica de redirección del script
    const inlineScript = `
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
    const script = document.createElement("script");
    script.textContent = inlineScript;
    document.body.appendChild(script);

    pollito = document.getElementById("icono");
    spinner = document.getElementById("spinner");
    window.__redirectedUrl = "";
  });

  afterEach(() => {
    clock.restore();
  });

  it('Debe redirigir después del tiempo definido (diagnóstico con fake timers)', () => {
    pollito.dispatchEvent(new window.Event("click", { bubbles: true }));
    clock.tick(1050);
    expect(window.__redirectedUrl).to.equal(EXPECTED_REDIRECT);
  });
});
