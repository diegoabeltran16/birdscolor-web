
// test_cookies.js — Ciclo 1, Módulo de Cookies
// 🧪 Pruebas unitarias para validar el consentimiento y desbloqueo simbiótico

import { expect } from "chai";

describe("🍪 cookies.js - Banner de cookies", () => {
  let banner, icono;

  beforeEach(() => {
    // 🧽 Limpiar entorno antes de cada test
    localStorage.clear();
    document.body.innerHTML = '';

    // Simular elementos clave del DOM
    banner = document.createElement("div");
    banner.id = "cookie-banner";
    document.body.appendChild(banner);

    icono = document.createElement("img");
    icono.id = "icono";
    icono.classList.add("icono", "disabled");
    document.body.appendChild(icono);

    // Simular los botones del banner
    ["accept-cookies", "accept-essential", "reject-cookies", "choose-cookies"].forEach(id => {
      const btn = document.createElement("button");
      btn.id = id;
      document.body.appendChild(btn);
    });

    // Simular funciones globales necesarias
    window.isPollitoEnabled = false;
  });

  it("✅ Aceptar cookies - guarda 'all' y habilita al pollito", () => {
    document.getElementById("accept-cookies").click();
    localStorage.setItem("cookiesConsent", "all");
    window.isPollitoEnabled = true;
    icono.classList.remove("disabled");

    expect(localStorage.getItem("cookiesConsent")).to.equal("all");
    expect(window.isPollitoEnabled).to.be.true;
    expect(icono.classList.contains("disabled")).to.be.false;
  });

  it("🍪 Esenciales - guarda 'essential' y habilita al pollito", () => {
    document.getElementById("accept-essential").click();
    localStorage.setItem("cookiesConsent", "essential");
    window.isPollitoEnabled = true;
    icono.classList.remove("disabled");

    expect(localStorage.getItem("cookiesConsent")).to.equal("essential");
    expect(window.isPollitoEnabled).to.be.true;
    expect(icono.classList.contains("disabled")).to.be.false;
  });

  it("❌ Rechazar - guarda 'none' y habilita al pollito", () => {
    document.getElementById("reject-cookies").click();
    localStorage.setItem("cookiesConsent", "none");
    window.isPollitoEnabled = true;
    icono.classList.remove("disabled");

    expect(localStorage.getItem("cookiesConsent")).to.equal("none");
    expect(window.isPollitoEnabled).to.be.true;
    expect(icono.classList.contains("disabled")).to.be.false;
  });

  it("🎛️ Elegir - guarda 'custom' y habilita al pollito", () => {
    document.getElementById("choose-cookies").click();
    localStorage.setItem("cookiesConsent", "custom");
    window.isPollitoEnabled = true;
    icono.classList.remove("disabled");

    expect(localStorage.getItem("cookiesConsent")).to.equal("custom");
    expect(window.isPollitoEnabled).to.be.true;
    expect(icono.classList.contains("disabled")).to.be.false;
  });
});
