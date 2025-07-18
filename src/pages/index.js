// File: src/pages/index.js
// ID literal en birdscolordevbrain.jsonl: "-src_pages_index.js"
// Tags asociados: ["--- Codigo", "⚙️🛡️ Seguridad", "🧠 Nivel 4: Flujo Funcional General"]
// Parte de: ["--- 🗂 Principios de programación"]
// Usa: ["-src_security_securityHeaders.js", "-src_modules_cookies.js", "-src_modules_language.js", "-src_script.js"]

import Head from 'next/head'
import Script from 'next/script'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const icono = document.getElementById("icono");
    const spinnerWrapper = document.getElementById("spinner");
    const lang = localStorage.getItem("idioma") || "es";

    if (!icono) return;

    icono.classList.add("heartbeat");
    window.isPollitoEnabled = false;
    icono.classList.add("disabled");

    icono.addEventListener("click", () => {
      if (!window.isPollitoEnabled) {
        console.log("🔒 Aún no se ha aceptado/rechazado cookies.");
        return;
      }
      icono.classList.add("bounce");
      icono.style.display = "none";
      if (spinnerWrapper) spinnerWrapper.style.display = "flex";
      setTimeout(() => {
        window.location.href = `/simbiosis_${lang}`;
      }, 800);
    });

    // Limpieza del event listener al desmontar
    return () => {
      icono.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <>
      {/* Meta y estilos globales */}
      <Head>
        <title>BirdsColor – Pollito Simbiótico</title>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
        {/* Elimina la siguiente línea */}
        {/* <link rel="stylesheet" href="/assets/styles.css" /> */}
      </Head>

      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-8NQMNKF5J6"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-8NQMNKF5J6');
        `}
      </Script>

      {/* Banner de cookies */}
      <div id="cookie-banner-container" />

      {/* Fondo animado */}
      <div className="background" />

      {/* Contenedor principal */}
      <div className="container">
        {/* Pollito latiendo */}
        <picture>
          <source
            srcSet="/assets/images/pollito-1024.webp"
            type="image/webp"
          />
          <img
            id="icono"
            className="icono disabled heartbeat"
            src="/assets/images/pollito-1024.png"
            srcSet="
              /assets/images/pollito-480.png 480w,
              /assets/images/pollito-768.png 768w,
              /assets/images/pollito-1024.png 1024w
            "
            sizes="(max-width: 600px) 480px, (max-width: 1200px) 768px, 1024px"
            loading="lazy"
            alt="Pollito Simbiótico"
          />
        </picture>

        {/* Spinner (oculto hasta mostrarlo) */}
        <div id="spinner" className="spinner-wrapper" style={{ display: 'none' }}>
          <div className="spinner" role="status" aria-label="Cargando..." />
        </div>
      </div>

      {/* Módulos “cliente” */}
      <Script src="/modules/language.js" strategy="afterInteractive" />
      <Script src="/modules/cookies.js"    strategy="afterInteractive" />
      <Script src="/script.js"             strategy="afterInteractive" />
    </>
  )
}
