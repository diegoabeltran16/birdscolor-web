
import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'

export default function SimbiosisEn() {
  const router = useRouter()

  // Optional: function to show panel/modal instead of redirect
  const handleClick = (target) => {
    if (target === 'brain') {
      router.push('/brain')
      // or show panel/modal here
    } else if (target === 'body') {
      router.push('/body')
    } else if (target === 'community') {
      router.push('/community')
      // or scroll to section
    }
  }

  return (
    <>
      <Head>
        <title>Simbiosis – Venn Diagram</title>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
      </Head>

      {/* Venn Diagram */}
      <div className="venn-wrapper">
        {/* Top left circle: Brain */}
        <div className="venn-item" id="circle-left">
          <div className="outer-ring ring-left" />
          <div className="venn-circle" tabIndex={0} role="button">
            <span>🧠</span>
          </div>
          <div className="venn-label label-top cloud-bubble">Brain</div>
        </div>
        {/* Top right circle: Body */}
        <div className="venn-item" id="circle-right">
          <div className="outer-ring ring-right" />
          <div className="venn-circle" tabIndex={0} role="button">
            <span>💪</span>
          </div>
          <div className="venn-label label-top cloud-bubble">Body</div>
        </div>
        {/* Bottom center circle: Community */}
        <div className="venn-item" id="circle-bottom">
          <div className="outer-ring" />
          <div className="venn-circle" tabIndex={0} role="button">
            <span>🌍</span>
          </div>
          <div className="venn-label label-bottom">Community</div>
        </div>
      </div>

      {/* Your interaction script (heartbeat, click, redirect, etc.) */}
      <Script
        src="/script.js"
        strategy="afterInteractive"
      />
    </>
  )
}