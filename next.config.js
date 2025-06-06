// File: src/next.config.js
// ID literal en birdscolordevbrain.jsonl: "-src_next.config.js"
// Tags asociados: ["--- Codigo", "⚙️🛡️ Seguridad"]
// Parte de: ["--- Codigo"]
// Usa: ["-src_security_securityHeaders.js"]
//
// Este archivo configura Next.js para BirdsColor. Importa las cabeceras de seguridad
// definidas en securityHeaders.js y las aplica a todas las rutas. De esta manera,
// cada petición HTTP recibe las políticas HSTS, CSP y demás protecciones definidas
// por el nodo ⚙️🛡️ Seguridad. Asegura coherencia con los principios de --- 🗂 Principios de programación,
// manteniendo modularidad y trazabilidad semántica.
//
// Relación semántica:
//   - El nodo "-src_security_securityHeaders.js" define las cabeceras.
//   - Aquí las usamos (`usa`) y hacemos parte (`parte_de`) del nodo general de código.
//   - Si se agregan nuevas cabeceras en securityHeaders.js, este archivo se ajustará
//     y el nodo en birdscolordevbrain.jsonl quedará actualizado en "textMarkdown".

const securityHeaders = require('./security/securityHeaders');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Expone las cabeceras de seguridad en cada ruta (/(.*) → todas las rutas).
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },

  // Otras configuraciones de Next.js pueden ir aquí,
  // p. ej., redirecciones, rewrites, optimizaciones de imágenes, etc.
  // Pero por ahora, nos enfocamos en la seguridad según ⚙️🛡️ Seguridad.

  // Ejemplo de posibles optimizaciones futuras:
  // images: {
  //   domains: ['trusted.cdn.com'],
  // },
  // redirects: async () => [
  //   {
  //     source: '/old-path/:slug*',
  //     destination: '/new-path/:slug*',
  //     permanent: true,
  //   },
  // ],
};

module.exports = nextConfig;
