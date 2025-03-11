// cookies.js
document.addEventListener("DOMContentLoaded", () => {
    // Crear el banner de cookies de forma dinámica (o puedes incluirlo en el HTML y mantenerlo oculto)
    const banner = document.createElement("div");
    banner.id = "cookie-banner";
    banner.style.position = "fixed";
    banner.style.bottom = "0";
    banner.style.left = "0";
    banner.style.right = "0";
    banner.style.backgroundColor = "#fff";
    banner.style.borderTop = "1px solid #ccc";
    banner.style.padding = "20px";
    banner.style.textAlign = "center";
    banner.style.zIndex = "1000";
    banner.style.display = "none"; // Se muestra al invocar showCookieBanner

    banner.innerHTML = `
        <p>Este sitio utiliza cookies para mejorar tu experiencia. ¿Aceptas?</p>
        <button id="accept-cookies">Aceptar todas</button>
        <button id="accept-essential">Solo esenciales</button>
        <button id="reject-cookies">Rechazar</button>
    `;
    document.body.appendChild(banner);

    // Definir la función global para mostrar el banner
    window.showCookieBanner = function() {
        banner.style.display = "block";
    };

    // Función para ocultar el banner
    function hideCookieBanner() {
        banner.style.display = "none";
    }

    // Manejar las interacciones del banner
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

    // Función para redirigir después de gestionar las cookies
    function redirectAfterConsent() {
        const lang = localStorage.getItem("idioma") || "es";
        window.redirectTo(`simbiosis_${lang}.html`);
    }
});
