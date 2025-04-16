// language.js – Módulo de detección automática de idioma del navegador
document.addEventListener("DOMContentLoaded", function () {
    // 🎯 Paso 1: Definir los idiomas soportados por el sistema
    const idiomasSoportados = ["es", "en"];
  
    // 🌍 Paso 2: Detectar el idioma del navegador del usuario
    const userLang = navigator.language || navigator.userLanguage;
    const langDetectado = userLang.slice(0, 2);
  
    // ✅ Paso 3: Validar que el idioma esté soportado, sino usar "es" como fallback
    const langFinal = idiomasSoportados.includes(langDetectado) ? langDetectado : "es";
  
    // 🧠 Paso 4: Guardar en localStorage si no se ha guardado antes
    if (!localStorage.getItem("idioma")) {
      localStorage.setItem("idioma", langFinal);
      console.log("[language] Idioma detectado y guardado:", langFinal);
    }
  
    // 🌐 Paso 5: Exponer el idioma actual como variable global (solo lectura)
    window.idiomaActual = localStorage.getItem("idioma");
  });
  