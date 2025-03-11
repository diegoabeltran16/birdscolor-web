// language.js
document.addEventListener("DOMContentLoaded", function() {
    // Obtiene el idioma guardado o lo detecta automáticamente
    const userLang = localStorage.getItem("idioma") || navigator.language || navigator.userLanguage;
    const langCode = userLang.startsWith("es") ? "es" : "en";
    
    const currentPage = window.location.pathname;
    
    // Si estamos en index.html o en la raíz, redirige a la página correcta
    if ((currentPage.endsWith("index.html") || currentPage === "/") &&
        !currentPage.includes(`simbiosis_${langCode}.html`)) {
        window.location.href = `simbiosis_${langCode}.html`;
    }
});

// Función para cambiar el idioma manualmente
function cambiarIdioma(lang) {
    localStorage.setItem("idioma", lang);
    window.location.href = `simbiosis_${lang}.html`;
}
