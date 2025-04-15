// cookies.js – Banner dinámico multilenguaje y modular
document.addEventListener("DOMContentLoaded", () => {

    // 🔤 1. Obtener el idioma guardado o establecer uno por defecto (coordinado con language.js)
    const lang = localStorage.getItem("idioma") || "es";
  
    // 📚 2. Diccionario multilenguaje
    const textos = {
      es: {
        mensaje: "Este sitio utiliza cookies para mejorar tu experiencia. ¿Aceptas?",
        aceptar: "Aceptar todas",
        esenciales: "Solo esenciales",
        rechazar: "Rechazar",
        elegir: "Elegir cookies"
      },
      en: {
        mensaje: "This site uses cookies to improve your experience. Do you accept?",
        aceptar: "Accept all",
        esenciales: "Essentials only",
        rechazar: "Reject",
        elegir: "Choose cookies"
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
      backgroundColor: "#fff",
      borderTop: "1px solid #ccc",
      padding: "20px",
      textAlign: "center",
      zIndex: "1000",
      display: "none"
    });
  
    // 📄 4. Construir contenido HTML traducido
    banner.innerHTML = `
      <p>${t.mensaje}</p>
      <button id="accept-cookies">${t.aceptar}</button>
      <button id="accept-essential">${t.esenciales}</button>
      <button id="reject-cookies">${t.rechazar}</button>
      <button id="choose-cookies">${t.elegir}</button>
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
  