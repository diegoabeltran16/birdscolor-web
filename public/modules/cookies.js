// File: public/modules/cookies.js
// ID literal en birdscolordevbrain.jsonl: "-src_modules_cookies.js"
// Tags asociados: ["--- Codigo", "⚙️🛡️ Seguridad", "🗂 Modularidad y Estado"]
// Parte de: ["--- Codigo"]
// Usa: ["-src_pages_index.js"]

// Ciclo 1, Módulo UX Simbiótica
// 1. Detectar idioma, 2. Crear banner, 3. Mostrar/ocultar, 4. Guardar consentimiento, 5. Habilitar pollito.

const lang = localStorage.getItem("idioma") || "es";
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

// Crear banner
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

// Contenido del banner
banner.innerHTML = `
  <p style="font-size: 1.1rem; margin-bottom: 10px;">${t.mensaje}</p>
  <div>
    <button class="cookie-button" id="accept-cookies">✅ ${t.aceptar}</button>
    <button class="cookie-button" id="accept-essential">🍪 ${t.esenciales}</button>
    <button class="cookie-button" id="reject-cookies">❌ ${t.rechazar}</button>
    <button class="cookie-button" id="choose-cookies">🎛️ ${t.elegir}</button>
  </div>
`;

// Insertar banner en el body (está garantizado que este script se ejecuta en el cliente)
document.body.appendChild(banner);

// Función para mostrar banner
window.showCookieBanner = function () {
  banner.style.display = "block";
};

// Función para ocultar banner y habilitar pollito
function hideCookieBannerAndEnablePollito() {
  banner.style.display = "none";
  window.isPollitoEnabled = true;
  const icono = document.getElementById("icono");
  if (icono) {
    icono.classList.remove("disabled");
  }
}

// Asignar eventos a botones
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

// Lógica automática de aparición/habilitación
(function initCookieLogic() {
  const consent = localStorage.getItem("cookiesConsent");
  const icono = document.getElementById("icono");

  if (consent) {
    window.isPollitoEnabled = true;
    if (icono) icono.classList.remove("disabled");
    console.log("✅ Pollito habilitado automáticamente por consentimiento previo");
  } else {
    window.showCookieBanner();
  }
})();
