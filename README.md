# 🐤 BirdsColor

**BirdsColor** es una experiencia web interactiva que explora la relación entre tecnología, lenguaje, aprendizaje y naturaleza 🌱. Desarrollado como un proyecto modular y educativo, demuestra habilidades en desarrollo frontend moderno, integración continua (CI/CD), accesibilidad y despliegue automatizado.

----

## 🎯 Propósito del Repositorio

Este repositorio es un portafolio técnico y punto de partida para la evolución profesional del autor.

Ideal para reclutadores que deseen evaluar:

- Buenas prácticas de desarrollo
- Modularidad en JavaScript moderno
- Implementación de CI/CD (GitHub Actions)
- Testing automatizado con Mocha, Chai y Sinon
- Accesibilidad y diseño responsive
- Capacidad de documentación clara y organizada

----

## 🧪 Tecnologías Clave

- HTML5 + CSS3 + JavaScript
- Mocha + Chai + Sinon (Tests)
- GitHub Actions (CI/CD)
- GitHub Pages + GoDaddy (Despliegue)
- Arquitectura modular + diseño progresivo

----

## 🚀 Despliegue

El sitio se publica automáticamente en:

🔗 [https://birdscolor.com](https://birdscolor.com) (via GoDaddy + GitHub Pages)

----

## 📌 Destacados Técnicos

- ✅ Navegación inteligente basada en el idioma del navegador
- ✅ Consentimiento de cookies con almacenamiento local
- ✅ Interfaz visual animada y responsiva
- ✅ Pruebas con mocks y temporizadores virtuales
- ✅ GitHub Actions para testing y despliegue automatizado

----

## 🤝 Contacto del Desarrollador

**Diego Beltrán** – [@diegoabeltran16](https://github.com/diegoabeltran16)

----

## 🔒 Despliegue estático seguro (sin npm en producción)

- **Artefacto**: publicar únicamente la carpeta `public/` (HTML, CSS, JS planos). No subir `node_modules` ni ejecutar `npm` en el servidor.
- **Servidor estático/CDN**: apuntar el host raíz a `public/`. Un `python -m http.server 8080` sirve localmente para pruebas.
- **Cabeceras**: aplicar las de `src/security/securityHeaders.js` o el ejemplo en `security/static-headers.conf` (estilo nginx). Asegurar HTTPS para que HSTS tenga efecto.
- **CSP ajustado al sitio**: al eliminar Google Analytics, retirar sus dominios de `script-src` y `connect-src`. Al añadir otro script/CDN, declararlo explícitamente.
- **TercerOS**: menos es más. Cada script externo incrementa la superficie de ataque; conservar solo lo indispensable.
- **Ciclo de cambios**: realizar cambios localmente, revisar, y subir únicamente los archivos estáticos resultantes. Las auditorías npm (si se ejecutan) deben realizarse en la máquina del desarrollador, no en producción.


