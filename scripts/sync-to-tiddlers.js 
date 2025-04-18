// sync-to-tiddlers.js 
// 🧠 Módulo simbiótico que sincroniza archivos reales del proyecto con tiddlers
// Objetivo: generar tiddlers JSONL automáticamente desde los archivos MODIFICADOS en el repositorio

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { execSync } = require('child_process');

const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'coverage'];
const VALID_EXTENSIONS = ['.js', '.html', '.css', '.json', '.sh', '.md'];
const OUTPUT_DIR = path.join(__dirname, 'tiddlers-export');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

const BASE_TAGS = [
  '[[--- Codigo]]',
  '[[--- Ciclos de desarrollo]]',
  '[[--- Detalles del proyecto]]',
  '[[--- Principios de programación]]',
  'auto-generated'
];

let tiddlers = [];

function getMimeType(file) {
  const ext = path.extname(file);
  switch (ext) {
    case '.js': return 'application/javascript';
    case '.html': return 'text/html';
    case '.css': return 'text/css';
    case '.json': return 'application/json';
    case '.sh': return 'text/x-shellscript';
    case '.md': return 'text/markdown';
    default: return 'text/plain';
  }
}

function generateTags(filePath, fileName) {
  const tags = [...BASE_TAGS];
  const lower = fileName.toLowerCase();

  if (filePath.includes('src')) tags.push('src');
  if (filePath.includes('test')) tags.push('tests unitarios');
  if (filePath.includes('modules')) tags.push('modulos js');
  if (filePath.includes('.github')) tags.push('.github', 'CI/CD');
  if (filePath.endsWith('.css')) tags.push('estilos');
  if (filePath.endsWith('.html')) tags.push('plantilla HTML');
  if (lower.includes('cookie')) tags.push('privacidad', 'cookies');
  if (lower.includes('language')) tags.push('idioma', 'multilenguaje');
  if (lower.includes('readme')) tags.push('documentación');

  return tags;
}

function generateTiddler(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  return {
    title: fileName,
    text: `\`\`${path.extname(fileName).slice(1)}\n${content}\n\`\``,
    type: getMimeType(fileName),
    created: new Date().toISOString().replace(/[-:]/g, '').slice(0, 15),
    modified: new Date().toISOString().replace(/[-:]/g, '').slice(0, 15),
    tags: generateTags(filePath, fileName),
    'tmap.id': crypto.randomUUID()
  };
}

// 🧠 Obtener archivos modificados desde Git
function getModifiedFiles() {
  const output = execSync('git diff --name-only HEAD').toString();
  return output.split('\n')
    .map(f => f.trim())
    .filter(f => f && VALID_EXTENSIONS.includes(path.extname(f)));
}

// 🚀 Principal
const modifiedFiles = getModifiedFiles();
console.log(`📦 Archivos modificados detectados: ${modifiedFiles.length}`);

for (const relativePath of modifiedFiles) {
  const fullPath = path.resolve(relativePath);
  if (fs.existsSync(fullPath)) {
    const tiddler = generateTiddler(fullPath);
    tiddlers.push(tiddler);
  }
}

if (tiddlers.length > 0) {
  const outputPath = path.join(OUTPUT_DIR, 'tiddlers-export.jsonl');
  fs.writeFileSync(outputPath, tiddlers.map(t => JSON.stringify(t)).join(os.EOL));
  console.log(`✅ ${tiddlers.length} tiddlers generados en: ${outputPath}`);
} else {
  console.log('🟡 No hay archivos modificados para sincronizar.');
}
