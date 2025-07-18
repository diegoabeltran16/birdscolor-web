// script.js — Ciclo 1, Módulo UX Simbiótica
// 🧠 Funciones principales:
// 1. Mostrar el pollito palpitando desde el inicio.
// 2. Bloquear interacción hasta que el usuario decida sobre las cookies.
// 3. Detectar idioma del usuario.
// 4. Registrar el clic en el pollito (Power Automate + Analytics).
// 5. Mostrar spinner emocional.
// 6. Redirigir según idioma y consentimiento.
// 7. Garantizar modularidad, ética y accesibilidad.

document.addEventListener("DOMContentLoaded", () => {
  const icono = document.getElementById("icono");
  if (!icono) {
    console.error("No se encontró el elemento #icono");
    return;
  }
  const spinnerWrapper = document.getElementById("spinner");
  const lang = localStorage.getItem("idioma") || "es";

  // ✅ 1. Activar latido simbiótico desde el inicio
  icono.classList.add("heartbeat");

  // 🛡️ 2. Bloquear el clic hasta que el usuario decida cookies
  window.isPollitoEnabled = false; // se habilita luego desde cookies.js
  icono.classList.add("disabled"); // opcional: estilo visual deshabilitado

  // 🧪 3. Verifica si ya hay consentimiento guardado
  const consent = localStorage.getItem("cookiesConsent");
  if (!consent && typeof showCookieBanner === "function") {
    setTimeout(() => {
      showCookieBanner(); // banner se muestra automáticamente
    }, 200);
  }

  // 🎬 4. Función para mostrar el spinner centrado
  const showSpinner = () => {
    if (spinnerWrapper) {
      spinnerWrapper.style.display = "flex";
    }
  };

  // 🚀 5. Función desacoplada para redirección amigable
  window.redirectTo = function (url) {
    setTimeout(() => {
      window.location.href = url;
    }, 800); // breve delay para que el spinner respire
  };

  // 🐤 6. Evento de clic en el pollito
  icono.addEventListener("click", () => {
    // ⛔ Bloquea si el usuario no ha aceptado cookies aún
    if (!window.isPollitoEnabled) {
      console.log("🔒 Aún no se ha aceptado/rechazado cookies.");
      return;
    }

    // 💫 Animación de rebote emocional
    icono.classList.add("bounce");

    // 📤 Registro simbiótico (para Power Automate u otro backend)
    const evento = {
      evento: "click_pollito",
      timestamp: new Date().toISOString(),
      idioma: lang,
    };
    console.log("[📤 Evento enviado]", evento);

    // 📊 Registro opcional en Google Analytics
    if (typeof gtag === "function") {
      gtag("event", "click_pollito", {
        event_category: "UX",
        event_label: lang,
        value: 1,
      });
    }

    // 👋 Oculta el pollito, muestra transición visual
    icono.style.display = "none";
    showSpinner();

    // 📦 Evaluación post-consentimiento: redirección
    setTimeout(() => {
      const cookiesConsent = localStorage.getItem("cookiesConsent");
      if (!cookiesConsent && typeof showCookieBanner === "function") {
        showCookieBanner(); // En caso de que aún no se haya mostrado
      } else {
        window.redirectTo(`/simbiosis_${lang}`);
      }
    }, 300);
  });
});
