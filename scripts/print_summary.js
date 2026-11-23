import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/sections_summary.json', 'utf-8'));
data.forEach((s, idx) => {
  console.log(`${idx + 1}. [${s.type}] ${s.title} (${s.length} bytes)`);
});
