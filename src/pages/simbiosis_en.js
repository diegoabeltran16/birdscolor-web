import Head from 'next/head'
import Script from 'next/script'

export default function SimbiosisEn() {
  return (
    <>
      <Head>
        <title>Simbiosis – Venn Diagram (EN)</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
      </Head>
      <div className="venn-wrapper">
        {/* Aquí tu contenido en inglés */}
        <div className="venn-item" id="circle-left">
          <div className="outer-ring ring-left" />
          <div className="venn-circle spin-left">🧠</div>
          <div className="venn-label label-top cloud-bubble">Brain</div>
        </div>
        <div className="venn-item" id="circle-right">
          <div className="outer-ring ring-right" />
          <div className="venn-circle spin-right">💪</div>
          <div className="venn-label label-top cloud-bubble">Body</div>
        </div>
        <div className="venn-item" id="circle-bottom">
          <div className="outer-ring ring-left" />
          <div className="venn-circle heartbeat">🌍</div>
          <div className="venn-label label-bottom">Community</div>
        </div>
      </div>
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  )
}