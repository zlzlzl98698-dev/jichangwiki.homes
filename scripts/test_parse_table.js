import fs from 'fs';
import path from 'path';

// Load raw brand file and Guangsu supplementary file
const rawFile = path.resolve('scripts/data-raw/32家机场品牌清单.txt');
const rawGuangsu = path.resolve('scripts/data-raw/光速云品牌信息.txt');

const mainContent = fs.readFileSync(rawFile, 'utf-8');
const guangsuExtra = fs.readFileSync(rawGuangsu, 'utf-8');

// Read table at lines 918+ for quick affiliate & coupon mapping
const tableMatch = mainContent.match(/## 完整数据表[\s\S]*?(?=## 合规提醒)/);
const tableData = {};
if (tableMatch) {
  const tableLines = tableMatch[0].split('\n');
  for (const line of tableLines) {
    const parts = line.split('|').map(s => s.trim());
    if (parts.length >= 6 && parts[1] && !parts[1].includes('#') && !parts[1].includes('---')) {
      const num = parts[1];
      const name = parts[2];
      const link = parts[3].replace(/`/g, '');
      const coupon = parts[4].replace(/`/g, '');
      const usp = parts[5];
      tableData[name] = { num, name, link, coupon, usp };
    }
  }
}

console.log(`Parsed ${Object.keys(tableData).length} brands from summary table.`);
