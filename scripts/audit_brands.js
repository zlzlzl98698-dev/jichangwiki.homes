import fs from 'fs';
import path from 'path';

const rawFile = path.resolve('scripts/data-raw/32家机场品牌清单.txt');
const content = fs.readFileSync(rawFile, 'utf-8');

// Let's find all brand blocks
const lines = content.split(/\r?\n/);
console.log(`Total lines: ${lines.length}`);

// We see brand headers starting with '## ' or '主推## ' or plain lines for supplementary brands
const headings = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.match(/^(?:主推)?##\s*(\d+)\.\s*(.+)$/)) {
    headings.push({ index: i, line });
  } else if (line.match(/^##\s+完整数据表/)) {
    headings.push({ index: i, line, isTable: true });
  } else if (i > 950 && line.match(/^(\s*)(灵动云|浪网|边缘节点 EdgeNova|Firefly 萤火虫)\s*$/)) {
    headings.push({ index: i, line: `## Supp. ${line.trim()}`, isSupp: true });
  }
}

console.log('Detected brand sections:', headings.length);
headings.forEach(h => console.log(`Line ${h.index + 1}: ${h.line}`));
