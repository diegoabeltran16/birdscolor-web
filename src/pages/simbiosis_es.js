// File: src/pages/simbiosis_es.js
import Head from 'next/head'
import Script from 'next/script'

export default function SimbiosisEs() {
  return (
    <>
      <Head>
        <title>Simbiosis – Diagrama Venn</title>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
      </Head>

      {/* Diagrama Venn */}
      <div className="venn-wrapper">
        {/* Círculo superior izquierdo: Cerebro */}
        <div className="venn-item" id="circle-left">
          <div className="outer-ring ring-left" />
          <div className="venn-circle spin-left">🧠</div>
          <div className="venn-label label-top cloud-bubble">Cerebro</div>
        </div>
        {/* Círculo superior derecho: Cuerpo */}
        <div className="venn-item" id="circle-right">
          <div className="outer-ring ring-right" />
          <div className="venn-circle spin-right">💪</div>
          <div className="venn-label label-top cloud-bubble">Cuerpo</div>
        </div>
        {/* Círculo inferior centrado: Comunidad */}
        <div className="venn-item" id="circle-bottom">
          <div className="outer-ring ring-left" />
          <div className="venn-circle heartbeat">🌍</div>
          <div className="venn-label label-bottom">Comunidad</div>
        </div>
      </div>

      {/* Tu script de interacción (latido, click, redirección, etc.) */}
      <Script
        src="/script.js"
        strategy="afterInteractive"
      />
    </>
  )
}
