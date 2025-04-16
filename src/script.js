"use strict";

// =============================================
// Lógica del DIAGRAMA VENN (Simbiosis)
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  // Obtiene el idioma y estado de cookies
  const lang = localStorage.getItem("idioma") || "es";
  const consent = localStorage.getItem("cookiesConsent") || "none";

  // Diccionario multilenguaje para el diagrama Venn
  const textos = {
    es: { cerebro: "Cerebro", cuerpo: "Cuerpo", comunidad: "Comunidad" },
    en: { cerebro: "Mind", cuerpo: "Body", comunidad: "Community" },
  };
  const t = textos[lang];

  // Asignar los textos a las etiquetas de cada círculo del diagrama
  // Se asume que en el HTML de simbiosis se usan elementos con clase "venn-label"
  const vennMap = {
    "circle-left": t.cerebro,
    "circle-right": t.cuerpo,
    "circle-bottom": t.comunidad,
  };
  for (const [id, texto] of Object.entries(vennMap)) {
    const label = document.querySelector(`#${id} .venn-label`);
    if (label) label.textContent = texto;
  }

  // Asignar redirecciones a cada círculo del Venn
  const redirectMap = {
    "circle-left": `tiddly_cerebro_${lang}.html`,
    "circle-right": `tiddly_cuerpo_${lang}.html`,
    "circle-bottom": `comunidad_${lang}.html`,
  };
  for (const [id, url] of Object.entries(redirectMap)) {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("click", () => {
        if (consent !== "none") {
          window.redirectTo(url);
        } else {
          alert("⚠️ Debes aceptar cookies para continuar.");
        }
      });
    }
  }

  // =============================================
  // Lógica del POLLITO (index.html)
  // NO TOCAR ESTA SECCIÓN
  // =============================================
  const pollito = document.getElementById("icono");
  const spinner = document.getElementById("spinner");
  const REDIRECT_DELAY = 1000;

  if (pollito && spinner) {
    pollito.addEventListener("click", () => {
      console.log("🐥 Clic en el pollito registrado");

      // Evento a Power Automate + Analytics
      const eventData = {
        event: "click_pollito",
        timestamp: new Date().toISOString(),
      };
      fetch("https://powerautomate-webhook.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      }).catch((err) =>
        console.error("❌ Error al enviar el evento:", err)
      );

      if (typeof gtag === "function") {
        gtag("event", "click_pollito", {
          event_category: "Interacción",
          event_label: "Icono Pollito",
          value: 1,
        });
      }

      // Animación de feedback
      pollito.classList.add("bounce");
      pollito.addEventListener("animationend", function restoreAnimation(e) {
        if (e.animationName === "bounce") {
          pollito.style.display = "none";
          spinner.style.display = "block";
          pollito.classList.remove("bounce");
          pollito.removeEventListener("animationend", restoreAnimation);
        }
      });

      // Mostrar banner o redirigir
      setTimeout(() => {
        if (typeof showCookieBanner === "function") {
          showCookieBanner();
        } else {
          window.redirectTo(`simbiosis_${lang}.html`);
        }
      }, REDIRECT_DELAY);
    });
  }
});

// =============================================
// Inyección de la animación "bounce" si no existe
// =============================================
if (!document.getElementById("bounce-style")) {
  const style = document.createElement("style");
  style.id = "bounce-style";
  style.innerHTML = `
      @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
      }
  `;
  document.head.appendChild(style);
}
