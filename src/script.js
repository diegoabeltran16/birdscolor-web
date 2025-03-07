document.addEventListener("DOMContentLoaded", () => {
    const pollito = document.getElementById("icono");
    const spinner = document.getElementById("spinner");
    if (!pollito || !spinner) {
        console.error("Elemento 'icono' o 'spinner' no encontrado.");
        return;
    }

    const REDIRECT_DELAY = 1000; // Tiempo antes de redirigir en ms

    // Función para guardar el evento en localStorage en caso de error
    const saveEventLocally = (eventData) => {
        const events = JSON.parse(localStorage.getItem("pendingEvents")) || [];
        events.push(eventData);
        localStorage.setItem("pendingEvents", JSON.stringify(events));
    };

    // Función para enviar datos del clic a Power Automate y posteriormente a GA4
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
            console.error("Error al enviar el evento, guardando localmente.", error);
            saveEventLocally(eventData);
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
                pollito.classList.remove("bounce"); // Remueve la clase para permitir reutilización
                pollito.removeEventListener("animationend", restoreAnimation);
            }
        });

        // Redirigir a la página final después del retardo definido
        setTimeout(() => {
            window.location.href = "simbiosis_es.html";
        }, REDIRECT_DELAY);
    };

    pollito.addEventListener("click", handlePollitoClick);
});

// Agregar la animación bounce dinámicamente (opcional si se define en CSS)
const style = document.createElement("style");
style.innerHTML = `
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
`;
document.head.appendChild(style);

// Función para reintentar enviar eventos guardados en localStorage
const resendPendingEvents = async () => {
    const events = JSON.parse(localStorage.getItem("pendingEvents")) || [];
    if (events.length === 0) return;
    for (let i = 0; i < events.length; i++) {
        try {
            await fetch("https://powerautomate-webhook.com", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(events[i])
            });
            // Si se envía correctamente, eliminar el evento enviado
            events.splice(i, 1);
            i--; // Ajustar el índice tras eliminar
        } catch (error) {
            console.error("Error al reenviar evento pendiente:", error);
            break; // Si falla, salir y reintentar más tarde
        }
    }
    localStorage.setItem("pendingEvents", JSON.stringify(events));
};

// Escuchar el evento "online" para reintentar el envío de eventos pendientes
window.addEventListener("online", resendPendingEvents);
