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

  // 2. CSP alineada con el sitio estatico actual (pollito + GA). Ajusta si quitas GA.
  //    - inline style necesario para atributos style puntuales (spinner display, etc.).
  {
    key: 'Content-Security-Policy',
    value:
      "default-src 'self'; " +
      "script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data:; " +
      "font-src 'self'; " +
      "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com; " +
      "object-src 'none'; " +
      "frame-ancestors 'none'; " +
      "base-uri 'self'",
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

  // 4.1. Limita permisos de hardware/sensores no usados.
  {
    key: 'Permissions-Policy',
    value: 'geolocation=(), microphone=(), camera=(), payment=()'
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
  },

  // 7. Protege recursos contra ser cargados por otros origenes.
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin',
  }
];

module.exports = securityHeaders;
