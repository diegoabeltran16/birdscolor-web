// File: src/pages/index.js
// ID literal en birdscolordevbrain.jsonl: "-src_pages_index.js"
// Tags asociados: ["--- Codigo", "⚙️🛡️ Seguridad", "🧠 Nivel 4: Flujo Funcional General"]
// Parte de: ["--- 🗂 Principios de programación"]
// Usa: ["-src_security_securityHeaders.js", "-src_modules_cookies.js", "-src_modules_language.js", "-src_script.js"]

import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';

export default function Home() {
  // (No usamos localStorage aquí; el módulo cookies.js se encargará de todo
  //  en el lado del cliente)

  // Opcional: Si quieres, podrías agregar aquí lógica relacionada con "isPollitoEnabled"
  // usando useEffect, pero dado que cookies.js ya hace removeClass de "disabled",
  // no es estrictamente necesario.

  return (
    <>
      {/* Meta y estilos globales */}
      <Head>
        <title>BirdsColor - Interactivo</title>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
        {/* CSS global ubicado en /public/assets/styles.css */}
        <link rel="stylesheet" href="/assets/styles.css" />
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

      {/* Contenedor principal */}
      <div className="background"></div>
      <div className="container">
        {/* Imagen del pollito con id="icono" y clase "disabled" inicialmente */}
        <picture>
          <source
            srcSet="/assets/images/pollito-1024.webp"
            type="image/webp"
          />
          <img
            src="/assets/images/pollito-1024.png"
            srcSet="
              /assets/images/pollito-480.png 480w,
              /assets/images/pollito-768.png 768w,
              /assets/images/pollito-1024.png 1024w
            "
            sizes="(max-width: 600px) 480px, (max-width: 1200px) 768px, 1024px"
            loading="lazy"
            alt="Pollito"
            className="icono disabled"
            id="icono"
          />
        </picture>

        {/* Spinner */}
        <div id="spinner" className="spinner-wrapper" style={{ display: 'none' }}>
          <div className="spinner" role="status" aria-label="Cargando..." />
        </div>
      </div>

      {/* Módulos JS funcionales (se ejecutan tras cargar la página en el navegador) */}
      <Script src="/modules/language.js" strategy="afterInteractive" />
      <Script src="/modules/cookies.js" strategy="afterInteractive" />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
