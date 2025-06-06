// File: src/security/securityHeaders.js
// ID literal en birdscolordevbrain.jsonl: "-src_security_securityHeaders.js"
// Tags asociados: ["--- Codigo", "⚙️🛡️ Seguridad"]
// Parte de: ["--- Codigo"]
// Define: ["headers de seguridad globales"]
//
// Este módulo exporta un array de cabeceras HTTP que refuerzan la seguridad
// siguiendo las pautas definidas bajo el nodo ⚙️🛡️ Seguridad y los principios
// de --- 🗂 Principios de programación. Cada cabecera evita vectores de ataque
// comunes (XSS, clickjacking, sniffing, etc.) y puede extenderse a futuro.
//
// Uso en next.config.js:
//   const securityHeaders = require('./src/security/securityHeaders');
//   module.exports = {
//     async headers() {
//       return [
//         {
//           source: '/(.*)',
//           headers: securityHeaders,
//         },
//       ];
//     },
//   };

const securityHeaders = [
  // 1. HSTS: Fuerza HTTPS en todos los subdominios durante 2 años y habilita preload.
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },

  // 2. CSP (Content Security Policy) básica:
  //    - default-src 'self': solo cargar recursos del mismo origen.
  //    - script-src 'self': permitir scripts solo desde nuestro dominio.
  //    - style-src 'self' 'unsafe-inline': estilos solo de nuestro dominio
  //        y permitir estilos inline controlados (por ejemplo, Tailwind CSS).
  //    - img-src 'self' data: https://trusted.cdn.com: permitir imágenes desde nuestro dominio,
  //        datos en base64 (data:), y un CDN específico de medios.
  //    - font-src 'self': permitir fuentes solo desde nuestro dominio.
  //    - connect-src 'self' https://api.birdscolor.com: conexiones XHR/fetch a nuestro API.
  {
    key: 'Content-Security-Policy',
    value:
      "default-src 'self'; " +
      "script-src 'self'; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https://trusted.cdn.com; " +
      "font-src 'self'; " +
      "connect-src 'self' https://api.birdscolor.com",
  },

  // 3. Protege contra sniffing de tipo de contenido.
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },

  // 4. Previene que la página sea embebida en <iframe> (clickjacking).
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },

  // 5. Política de Referrer: solo enviar referer dentro del mismo origen.
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },

  // 6. XSS Protection (en navegadores viejos que lo soporten).
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  }
];

module.exports = securityHeaders;
