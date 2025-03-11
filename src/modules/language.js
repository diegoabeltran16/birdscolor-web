// language.js
document.addEventListener("DOMContentLoaded", function() {
    // Si no existe una preferencia de idioma, la detecta y la guarda
    if (!localStorage.getItem("idioma")) {
        const userLang = navigator.language || navigator.userLanguage;
        const langCode = userLang.startsWith("es") ? "es" : "en";
        localStorage.setItem("idioma", langCode);
    }
});

// Función para cambiar el idioma manualmente (usa el selector en index.html)
function cambiarIdioma(lang) {
    localStorage.setItem("idioma", lang);
    // No redirigimos aquí; la redirección se hará al interactuar con el pollito
    console.log("Idioma cambiado a:", lang);
}
