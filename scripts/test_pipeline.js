import fs from 'fs';
import path from 'path';

// Load brands
const brands = JSON.parse(fs.readFileSync('src/data/brands.json', 'utf-8'));

// Helper to ensure dir
function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writePage(relPath, content) {
  const fullPath = path.resolve('src/pages', relPath);
  ensureDir(fullPath);
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf-8');
  console.log(`Generated: src/pages/${relPath}`);
}

console.log('Starting full page generation pipeline...');
