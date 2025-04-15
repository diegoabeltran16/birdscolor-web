// 🌐 Redirección global
window.redirectTo = function (url) {
    console.log("Redirigiendo a:", url);
    window.location.href = url;
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ DOM listo – script.js activo");
  
    const lang = localStorage.getItem("idioma") || "es";
    const consent = localStorage.getItem("cookiesConsent") || "none";
  
    // 📚 Diccionario multilenguaje
    const textos = {
      es: { cerebro: "Cerebro", cuerpo: "Cuerpo", comunidad: "Comunidad" },
      en: { cerebro: "Mind", cuerpo: "Body", comunidad: "Community" },
    };
    const t = textos[lang];
  
    // 🧠 Aplicar textos del Venn si existen
    const vennMap = {
      "circle-left": t.cerebro,
      "circle-right": t.cuerpo,
      "circle-bottom": t.comunidad,
    };
  
    for (const [id, texto] of Object.entries(vennMap)) {
      const label = document.querySelector(`#${id} .label`);
      if (label) label.textContent = texto;
    }
  
    // 🔁 Redirecciones simbióticas del Venn
    const redirectMap = {
      "circle-left": `tiddly_cerebro_${lang}.html`,
      "circle-right": `tiddly_cuerpo_${lang}.html`,
      "circle-bottom": `comunidad_${lang}.html`,
    };
  
    for (const [id, url] of Object.entries(redirectMap)) {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("click", () => {
          if (consent !== "none") {
            window.redirectTo(url);
          } else {
            alert("⚠️ Debes aceptar cookies para continuar.");
          }
        });
      }
    }
  
    // 🐥 Lógica del Pollito (Index)
    const pollito = document.getElementById("icono");
    const spinner = document.getElementById("spinner");
    const REDIRECT_DELAY = 1000;
  
    if (pollito && spinner) {
      pollito.addEventListener("click", () => {
        console.log("🐥 Clic en el pollito registrado");
  
        // 🎯 Evento Power Automate + Analytics
        const eventData = {
          event: "click_pollito",
          timestamp: new Date().toISOString(),
        };
        fetch("https://powerautomate-webhook.com", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventData),
        }).catch((err) =>
          console.error("❌ Error al enviar el evento:", err)
        );
  
        if (typeof gtag === "function") {
          gtag("event", "click_pollito", {
            event_category: "Interacción",
            event_label: "Icono Pollito",
            value: 1,
          });
        }
  
        // Animación de feedback
        pollito.classList.add("bounce");
        pollito.addEventListener("animationend", function restoreAnimation(e) {
          if (e.animationName === "bounce") {
            pollito.style.display = "none";
            spinner.style.display = "block";
            pollito.classList.remove("bounce");
            pollito.removeEventListener("animationend", restoreAnimation);
          }
        });
  
        // Mostrar banner o redirigir
        setTimeout(() => {
          if (typeof showCookieBanner === "function") {
            showCookieBanner();
          } else {
            window.redirectTo(`simbiosis_${lang}.html`);
          }
        }, REDIRECT_DELAY);
      });
    }
  });
  
  // 🌀 Si la animación bounce no está en el CSS, la inyectamos
  if (!document.getElementById("bounce-style")) {
    const style = document.createElement("style");
    style.id = "bounce-style";
    style.innerHTML = `
      @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
      }
    `;
    document.head.appendChild(style);
  }
  