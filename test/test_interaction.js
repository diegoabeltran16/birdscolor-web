import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';

describe('Interacción con el ícono del pollito', () => {
    let window, document, pollito, spinner, clock;
    const REDIRECT_DELAY = 1000; // Debe coincidir con el valor en script.js

    beforeEach(() => {
        // Usamos fake timers para simular el paso del tiempo sin esperar
        clock = sinon.useFakeTimers();

        const dom = new JSDOM(`<!DOCTYPE html>
            <html>
            <head>
                <style>
                    /* Simulación básica para que se apliquen estilos */
                    .bounce { animation: bounce 0.5s; }
                    @keyframes bounce {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.2); }
                    }
                </style>
            </head>
            <body>
                <img id="icono" class="icono" src="pollito.png">
                <div id="spinner" class="spinner" style="display: none;"></div>
            </body>
            </html>`, { runScripts: "dangerously", resources: "usable" });

        window = dom.window;
        document = window.document;
        pollito = document.getElementById("icono");
        spinner = document.getElementById("spinner");

        // Stub para fetch que siempre resuelve exitosamente
        global.fetch = sinon.stub().resolves({ ok: true });
        global.window = window;
    });

    afterEach(() => {
        clock.restore();
        delete global.fetch;
        delete global.window;
    });

    it('Debe registrar un clic en el ícono', () => {
        let clickDetected = false;
        pollito.addEventListener("click", () => { clickDetected = true; });
        
        const clickEvent = new window.Event("click", { bubbles: true });
        pollito.dispatchEvent(clickEvent);

        expect(clickDetected).to.be.true;
    });

    it('Debe ocultar el ícono y mostrar el spinner al finalizar la animación de bounce', (done) => {
        // Escuchar el evento de finalización de la animación
        pollito.addEventListener("animationend", function restoreAnimation(e) {
            if (e.animationName === "bounce") {
                expect(pollito.style.display).to.equal("none");
                expect(spinner.style.display).to.equal("block");
                pollito.removeEventListener("animationend", restoreAnimation);
                done();
            }
        });
        // Simular que se agrega la clase "bounce" y se dispara el evento de animación
        pollito.classList.add("bounce");
        const animEvent = new window.Event("animationend", { bubbles: true });
        // Agregamos manualmente la propiedad animationName
        Object.defineProperty(animEvent, 'animationName', { value: "bounce" });
        pollito.dispatchEvent(animEvent);
    });

    it('Debe redirigir después del tiempo definido', () => {
        // Como window.location.href es de solo lectura en jsdom, simulamos la redirección
        const originalHref = window.location.href;
        // Sobrescribimos window.location.assign para simular la redirección
        const assignStub = sinon.stub(window.location, 'assign').callsFake((url) => {
            window.location.href = url;
        });
        
        // Simular clic en el pollito
        pollito.dispatchEvent(new window.Event("click", { bubbles: true }));
        // Avanzar el reloj simulado
        clock.tick(REDIRECT_DELAY + 100);

        expect(window.location.href).to.include("simbiosis_es.html");
        assignStub.restore();
    });
});
