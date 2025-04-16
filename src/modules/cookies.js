// cookies.js – Banner dinámico multilenguaje y modular
document.addEventListener("DOMContentLoaded", () => {

    // 🔤 1. Obtener el idioma guardado o establecer uno por defecto (coordinado con language.js)
    const lang = localStorage.getItem("idioma") || "es";
  
    // 📚 2. Diccionario multilenguaje
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
  
    const t = textos[lang]; // 🧠 Alias del idioma activo
  
    // 📦 3. Crear el banner de cookies dinámicamente
    const banner = document.createElement("div");
    banner.id = "cookie-banner";
    Object.assign(banner.style, {
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        backgroundColor: "rgba(255, 255, 255, 0.8)", // fondo semi-transparente
        borderTop: "2px solid #FFD6A5", // línea pastel
        padding: "20px",
        textAlign: "center",
        zIndex: "1000",
        display: "none",
        backdropFilter: "blur(6px)", // efecto glass
        borderRadius: "12px 12px 0 0", // esquinas suaves
        color: "#333", // texto visible pero no negro
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)" // profundidad sutil
      });
      
  
    // 📄 4. Construir contenido HTML traducido
    banner.innerHTML = `
    <p style="font-size: 1.1rem; margin-bottom: 10px;">${t.mensaje}</p>
    <div>
    <button class="cookie-button" id="accept-cookies">✅ ${t.aceptar}</button>
    <button class="cookie-button" id="accept-essential">🍪 ${t.esenciales}</button>
    <button class="cookie-button" id="reject-cookies">❌ ${t.rechazar}</button>
    <button class="cookie-button" id="choose-cookies">🎛️ ${t.elegir}</button>
  </div>
`;

  
    document.body.appendChild(banner);
  
    // 🌍 5. Función global para mostrar el banner
    window.showCookieBanner = function () {
      banner.style.display = "block";
    };
  
    // 🔕 6. Ocultar el banner
    function hideCookieBanner() {
      banner.style.display = "none";
    }
  
    // 🔁 7. Manejo de decisiones del usuario
    document.getElementById("accept-cookies").addEventListener("click", () => {
      localStorage.setItem("cookiesConsent", "all");
      hideCookieBanner();
      redirectAfterConsent();
    });
  
    document.getElementById("accept-essential").addEventListener("click", () => {
      localStorage.setItem("cookiesConsent", "essential");
      hideCookieBanner();
      redirectAfterConsent();
    });
  
    document.getElementById("reject-cookies").addEventListener("click", () => {
      localStorage.setItem("cookiesConsent", "none");
      hideCookieBanner();
      redirectAfterConsent();
    });
  
    // 🧪 8. Botón para futura expansión ("Elegir cookies")
    document.getElementById("choose-cookies").addEventListener("click", () => {
      localStorage.setItem("cookiesConsent", "custom");
      console.log("[cookies] Usuario quiere elegir cookies (futuro modal)");
      hideCookieBanner();
      redirectAfterConsent();
    });
  
    // 🚪 9. Redirección multilenguaje
    function redirectAfterConsent() {
      const idioma = localStorage.getItem("idioma") || "es";
      window.redirectTo(`simbiosis_${idioma}.html`);
    }
  });
  