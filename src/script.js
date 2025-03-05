document.addEventListener("DOMContentLoaded", () => {
    const pollito = document.getElementById("icono");
    const spinner = document.getElementById("spinner");
    if (!pollito || !spinner) {
        console.error("Elemento 'icono' o 'spinner' no encontrado.");
        return;
    }

    const ANIM_BOUNCE_DURATION = 500; // Duración de la animación bounce en ms
    const REDIRECT_DELAY = 1000;       // Tiempo antes de redirigir en ms

    // Función para guardar el evento en localStorage en caso de error
    const saveEventLocally = (eventData) => {
        const events = JSON.parse(localStorage.getItem("pendingEvents")) || [];
        events.push(eventData);
        localStorage.setItem("pendingEvents", JSON.stringify(events));
    };

    // Función para enviar datos del clic
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
    };

    // Función para manejar el clic en el pollito
    const handlePollitoClick = () => {
        console.log("🐥 Clic en el pollito registrado");
        sendClickEvent();

        // Aplicar animación bounce al pollito
        pollito.style.animation = "bounce 0.5s";
        
        // Cuando finalice la animación bounce, se oculta el pollito y se muestra el spinner
        pollito.addEventListener("animationend", function restoreAnimation(e) {
            if (e.animationName === "bounce") {
                pollito.style.display = "none";
                spinner.style.display = "block";
                pollito.removeEventListener("animationend", restoreAnimation);
            }
        });

        // Redirigir a la página final después del retardo definido
        setTimeout(() => {
            window.location.href = "final.html";
        }, REDIRECT_DELAY);
    };

    pollito.addEventListener("click", handlePollitoClick);
});

// Agregar animación bounce dinámicamente (alternativamente, se puede incluir en el CSS)
const style = document.createElement("style");
style.innerHTML = `
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
`;
document.head.appendChild(style);
