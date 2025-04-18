// sync-to-tiddlers.cjs
// 🧠 Refactoración del módulo para exportar cada archivo como un tiddler independiente
// Objetivo: generar 1 archivo .json por cada archivo fuente del proyecto para importar en TiddlyWiki

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { execSync } = require('child_process');

// 📁 Configuraciones base
const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'coverage', 'tiddlers-export'];
const VALID_EXTENSIONS = ['.js', '.html', '.css', '.json', '.sh', '.md'];
const PROJECT_ROOT = process.cwd();
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'tiddlers-export');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

// 🏷️ Tags base
const BASE_TAGS = [
  '[[--- Codigo]]',
  '[[--- Ciclos de desarrollo]]',
  '[[--- Detalles del proyecto]]',
  '[[--- Principios de programación]]',
  'auto-generated'
];

// 🔍 Utilidad para recorrer carpetas y recolectar archivos
function collectFiles(dir) {
  const files = [];
  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.includes(item)) files.push(...collectFiles(fullPath));
    } else if (VALID_EXTENSIONS.includes(path.extname(item))) {
      files.push(fullPath);
    }
  }
  return files;
}

// 🧠 Crea el contenido del tiddler a partir de un archivo real
function createTiddlerContent(filePath) {
  const relPath = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf8');
  const ext = path.extname(filePath).slice(1);
  const title = `sync-${relPath}`;
  const hash = crypto.createHash('md5').update(content).digest('hex').slice(0, 12);

  return {
    title,
    text: `\u0060\u0060\u0060${ext}\n${content}\n\u0060\u0060\u0060`,
    type: `text/vnd.tiddlywiki`,
    tags: BASE_TAGS,
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
    'tmap.id': hash
  };
}

// 🚀 Recorre archivos y genera un tiddler por cada uno
function generateTiddlers() {
  const allFiles = collectFiles(PROJECT_ROOT);
  const outputCount = [];

  for (const file of allFiles) {
    const tiddler = createTiddlerContent(file);
    const outPath = path.join(OUTPUT_DIR, `${tiddler.title}.json`);
    fs.writeFileSync(outPath, JSON.stringify(tiddler, null, 2));
    outputCount.push(tiddler.title);
  }

  console.log(`\n✅ ${outputCount.length} tiddlers exportados a: ${OUTPUT_DIR}`);
  console.log(`📦 Archivos:`, outputCount);
}

// 🏁 Ejecutar
generateTiddlers();
