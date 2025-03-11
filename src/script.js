// Definimos la función de redirección de forma global
window.redirectTo = function(url) {
    console.log("Redirigiendo a:", url);
    window.location.href = url;
};

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM completamente cargado en script.js");

    const pollito = document.getElementById("icono");
    const spinner = document.getElementById("spinner");
    if (!pollito || !spinner) {
        console.error("Elemento 'icono' o 'spinner' no encontrado.");
        return;
    }

    const REDIRECT_DELAY = 1000; // Tiempo antes de redirigir en ms

    // Función para enviar datos del clic (ejemplo, similar a lo que ya tienes)
    const sendClickEvent = async () => {
        const eventData = {
            event: "click_pollito",
            timestamp: new Date().toISOString()
        };
        try {
            await fetch("https://powerautomate-webhook.com", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(eventData)
            });
        } catch (error) {
            console.error("Error al enviar el evento.", error);
            // Aquí podrías guardar el evento en localStorage si lo deseas.
        }
        
        // Enviar evento a Google Analytics
        if (typeof gtag === "function") {
            gtag('event', 'click_pollito', {
                'event_category': 'Interacción',
                'event_label': 'Icono Pollito',
                'value': 1
            });
        }
    };

    // Función para manejar el clic en el pollito
    const handlePollitoClick = () => {
        console.log("🐥 Clic en el pollito registrado");
        sendClickEvent();

        // Agregar la clase "bounce" para iniciar la animación
        pollito.classList.add("bounce");

        // Al finalizar la animación bounce, oculta el ícono y muestra el spinner
        pollito.addEventListener("animationend", function restoreAnimation(e) {
            if (e.animationName === "bounce") {
                pollito.style.display = "none";
                spinner.style.display = "block";
                pollito.classList.remove("bounce");
                pollito.removeEventListener("animationend", restoreAnimation);
            }
        });

        // Consulta el idioma guardado y redirige en consecuencia
        const lang = localStorage.getItem("idioma") || "es"; // "es" como predeterminado
        setTimeout(() => {
            window.redirectTo(`simbiosis_${lang}.html`);
        }, REDIRECT_DELAY);
    };

    pollito.addEventListener("click", handlePollitoClick);
});

// Opcional: Agregar la animación bounce dinámicamente (si no está en CSS)
const style = document.createElement("style");
style.innerHTML = `
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
`;
document.head.appendChild(style);
