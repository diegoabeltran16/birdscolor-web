// sync-to-tiddlers.cjs
// 🧠 Módulo actualizado para exportar archivos del proyecto como tiddlers individuales (.json)
// 🎯 Objetivo: Generar un archivo JSON por cada archivo modificado, listo para importar en TiddlyWiki

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// ======================
// ✨ CONFIGURACIÓN
// ======================
const ROOT_DIR = process.cwd();
const OUTPUT_DIR = path.join(ROOT_DIR, 'scripts', 'tiddlers-export');
const HASH_FILE = path.join(OUTPUT_DIR, '.hashes.json');

const VALID_EXTENSIONS = ['.js', '.html', '.css', '.json', '.md', '.sh'];
const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'coverage'];
const LANGUAGE_MAP = {
  '.js': 'js',
  '.html': 'html',
  '.css': 'css',
  '.json': 'json',
  '.md': 'md',
  '.sh': 'bash'
};

const TAG_MAP = [
  { dir: 'src', tag: '[[--- Codigo]]' },
  { dir: 'test', tag: '[[--- Test]]' },
  { dir: 'scripts', tag: '[[--- Automatizacion]]' },
  { dir: '.github', tag: '[[--- CI/CD]]' },
  { ext: '.md', tag: '[[--- Documentacion]]' }
];

// ======================
// 🌐 UTILIDADES
// ======================
function getAllFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = entries.flatMap(entry => {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory() && !IGNORE_DIRS.includes(entry.name)) {
      return getAllFiles(res);
    } else if (entry.isFile() && VALID_EXTENSIONS.includes(path.extname(entry.name))) {
      return res;
    } else {
      return [];
    }
  });
  return files;
}

function getHash(content) {
  return crypto.createHash('sha1').update(content).digest('hex');
}

function detectTags(filePath) {
  const tags = [];
  for (const rule of TAG_MAP) {
    if (rule.dir && filePath.includes(path.sep + rule.dir + path.sep)) tags.push(rule.tag);
    if (rule.ext && filePath.endsWith(rule.ext)) tags.push(rule.tag);
  }
  return [...new Set(tags)];
}

function filePathToTitle(filePath) {
  return filePath.replace(/[\\\/]/g, '_');
}

// ======================
// 📁 EXPORTADOR POR ARCHIVO
// ======================
function exportTiddlers() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const hashData = fs.existsSync(HASH_FILE) ? JSON.parse(fs.readFileSync(HASH_FILE)) : {};
  const files = getAllFiles(ROOT_DIR);

  const newHashes = {};
  let changedCount = 0;

  for (const file of files) {
    const relPath = path.relative(ROOT_DIR, file);
    const ext = path.extname(file);
    const lang = LANGUAGE_MAP[ext] || 'txt';
    const content = fs.readFileSync(file, 'utf-8');
    const hash = getHash(content);
    newHashes[relPath] = hash;

    if (hashData[relPath] === hash) continue; // No hay cambios
    changedCount++;

    const tiddler = {
      title: relPath,
      text: `\n\`\`\`${lang}\n${content}\n\`\`\``,
      tags: detectTags(relPath).join(' '),
      type: 'text/markdown',
      created: new Date().toISOString(),
      modified: new Date().toISOString()
    };
    
    // 🧽 Limpieza del nombre duplicado
    const safeName = filePathToTitle(relPath).replace(/\.json$/, '');
    const outFile = path.join(OUTPUT_DIR, `${safeName}.json`);
    fs.writeFileSync(outFile, JSON.stringify(tiddler, null, 2), 'utf-8');
    
  }

  fs.writeFileSync(HASH_FILE, JSON.stringify(newHashes, null, 2));
  console.log(`\n📦 Archivos modificados detectados: ${changedCount}`);
  console.log(`✅ Tiddlers exportados individualmente en: ${OUTPUT_DIR}`);
}

// ======================
// 🚀 EJECUCIÓN
// ======================
exportTiddlers();
