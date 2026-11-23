import fs from 'fs';
import path from 'path';

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.name.endsWith('.astro')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      if (content.includes('\\`') || content.includes('\\${')) {
        console.log(`Found suspicious escape in: ${fullPath}`);
      }
    }
  }
}

scanDir('src');
console.log('Scan complete.');
