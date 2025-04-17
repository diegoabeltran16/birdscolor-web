// cookies.js — Ciclo 1, Módulo UX Simbiótica
// 🧠 Funciones principales:
// 1. Detectar el idioma del usuario.
// 2. Crear dinámicamente el banner de cookies (estilo glass pastel).
// 3. Mostrar el banner si el usuario no ha elegido aún.
// 4. Al elegir una opción: guardar, ocultar y habilitar interacción con el pollito.
// 5. Habilitar automáticamente el pollito si ya había consentimiento guardado.
// 6. No redirigir automáticamente. El clic en el pollito será quien lo haga.
// 7. Garantizar modularidad, accesibilidad y control del usuario.

document.addEventListener("DOMContentLoaded", () => {

  // 🌐 1. Obtener idioma detectado previamente
  const lang = localStorage.getItem("idioma") || "es";

  // 📚 2. Diccionario de textos en ES y EN
  const textos = {
    es: {
      mensaje: "Este sitio utiliza cookies para mejorar tu experiencia. ¿Aceptas?",
      aceptar: "Aceptar",
      esenciales: "Esenciales",
      rechazar: "Rechazar",
      elegir: "Elegir"
    },
    en: {
      mensaje: "This site uses cookies to improve your experience. Do you accept?",
      aceptar: "Accept",
      esenciales: "Essentials",
      rechazar: "Reject",
      elegir: "Choose"
    }
  };

  const t = textos[lang];

  // 🧱 3. Crear banner dinámicamente
  const banner = document.createElement("div");
  banner.id = "cookie-banner";
  Object.assign(banner.style, {
    position: "fixed",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTop: "2px solid #FFD6A5",
    padding: "20px",
    textAlign: "center",
    zIndex: "1000",
    display: "none",
    backdropFilter: "blur(6px)",
    borderRadius: "12px 12px 0 0",
    color: "#333",
    boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)"
  });

  // 🔘 4. Contenido del banner
  banner.innerHTML = `
    <p style="font-size: 1.1rem; margin-bottom: 10px;">${t.mensaje}</p>
    <div>
      <button class="cookie-button" id="accept-cookies">✅ ${t.aceptar}</button>
      <button class="cookie-button" id="accept-essential">🍪 ${t.esenciales}</button>
      <button class="cookie-button" id="reject-cookies">❌ ${t.rechazar}</button>
      <button class="cookie-button" id="choose-cookies">🎛️ ${t.elegir}</button>
    </div>
  `;

  // 🧷 5. Insertar banner en el DOM
  document.body.appendChild(banner);

  // ✨ 6. Función pública para mostrar el banner (llamable desde script.js)
  window.showCookieBanner = function () {
    banner.style.display = "block";
  };

  // 🔓 7. Función para ocultar el banner y habilitar el pollito
  function hideCookieBannerAndEnablePollito() {
    banner.style.display = "none";

    window.isPollitoEnabled = true;

    const icono = document.getElementById("icono");
    if (icono) {
      icono.classList.remove("disabled");
    }
  }

  // ✅ 8. Asignar eventos a cada botón del banner
  document.getElementById("accept-cookies").addEventListener("click", () => {
    localStorage.setItem("cookiesConsent", "all");
    hideCookieBannerAndEnablePollito();
  });

  document.getElementById("accept-essential").addEventListener("click", () => {
    localStorage.setItem("cookiesConsent", "essential");
    hideCookieBannerAndEnablePollito();
  });

  document.getElementById("reject-cookies").addEventListener("click", () => {
    localStorage.setItem("cookiesConsent", "none");
    hideCookieBannerAndEnablePollito();
  });

  document.getElementById("choose-cookies").addEventListener("click", () => {
    localStorage.setItem("cookiesConsent", "custom");
    console.log("[cookies] Usuario quiere elegir cookies (futuro modal)");
    hideCookieBannerAndEnablePollito();
  });

  // ✅ 9. Desbloquear el pollito si ya hay consentimiento guardado
setTimeout(() => {
  if (localStorage.getItem("cookiesConsent")) {
    window.isPollitoEnabled = true;

    const icono = document.getElementById("icono");
    if (icono) {
      icono.classList.remove("disabled");
    }

    console.log("✅ Pollito habilitado automáticamente por consentimiento previo");
  }
}, 100); // pequeño delay para asegurar que todo está cargado


});
