import fs from 'fs';
import path from 'path';

const rawFile = path.resolve('scripts/data-raw/32家机场品牌清单.txt');
const rawGuangsu = path.resolve('scripts/data-raw/光速云品牌信息.txt');

const mainContent = fs.readFileSync(rawFile, 'utf-8');
const guangsuExtra = fs.readFileSync(rawGuangsu, 'utf-8');

// Parse summary table first
const tableMatch = mainContent.match(/## 完整数据表[\s\S]*?(?=## 合规提醒)/);
const tableData = {};
if (tableMatch) {
  const tableLines = tableMatch[0].split('\n');
  for (const line of tableLines) {
    const parts = line.split('|').map(s => s.trim());
    if (parts.length >= 6 && parts[1] && !parts[1].includes('#') && !parts[1].includes('---')) {
      const num = parseInt(parts[1], 10);
      const name = parts[2];
      const link = parts[3].replace(/`/g, '');
      const coupon = parts[4].replace(/`/g, '');
      const usp = parts[5];
      tableData[name] = { num, name, link, coupon, usp };
    }
  }
}

// Map of slug to logo
const logoMap = {
  guangsu: '/images/logos/光速云主图.png',
  muguang: '/images/logos/xdm_logo.webp',
  feimao: '/images/logos/飞猫云主图.png',
  weifeng: '/images/logos/bee_logo.webp',
  dalaoyun: '/images/logos/kuaili_logo.png',
  xingdaomeng: '/images/logos/xdm_logo.webp',
  ermao: '/images/logos/2mao_logo.webp',
  wuyou: '/images/logos/flyingbird.webp',
  weitu: '/images/logos/v2云主图.png',
  firefly: '/images/logos/flyingbird.webp',
  yuzhou: '/images/logos/yuzhou_logo.webp',
  u1s1: '/images/logos/u1s1主图.png',
  lingmao: '/images/logos/kuaili_logo.png',
  jilian: '/images/logos/极连云主图.png',
  guangnian: '/images/logos/光年梯主图.png',
  yifan: '/images/logos/1fly_logo.webp',
  sogo: '/images/logos/sogo.webp',
  kexin: '/images/logos/kuku_logo.webp',
  sujie: '/images/logos/sujie_logo.webp',
  shanyue: '/images/logos/echo_logo.webp',
  quanqiu: '/images/logos/全球云主图.png',
  shandianshu: '/images/logos/kuaili_logo.png',
  yunjiexian: '/images/logos/yinyun_logo.webp',
  liulianyun: '/images/logos/yinyun_logo.webp',
  shenxing: '/images/logos/totoro.webp',
  huanqiuti: '/images/logos/flyv机场256x256.png',
  yinxingren: '/images/logos/隐形人256x256.png',
  tiziyun: '/images/logos/梯子云256x256.png',
  lingdong: '/images/logos/灵动云256x256.png',
  langwang: '/images/logos/TNT.webp',
  edgenova: '/images/logos/edgenova_logo.webp'
};

// Split by sections
// Let's find sections using line indices
const lines = mainContent.split(/\r?\n/);
const sectionDelimiters = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const m = line.match(/^(?:主推)?##\s*(\d+)\.\s*(.+)$/);
  if (m) {
    sectionDelimiters.push({ lineIndex: i, num: m[1], rawTitle: m[2], type: 'numbered' });
  } else if (line.match(/^##\s+完整数据表/)) {
    sectionDelimiters.push({ lineIndex: i, rawTitle: '完整数据表', type: 'table' });
  } else if (i > 950 && line.match(/^(\s*)(灵动云|浪网|边缘节点 EdgeNova|Firefly 萤火虫)\s*$/)) {
    sectionDelimiters.push({ lineIndex: i, rawTitle: line.trim(), type: 'supplementary' });
  }
}

console.log(`Found ${sectionDelimiters.length} sections in file.`);

// Function to extract text of section
const sections = [];
for (let i = 0; i < sectionDelimiters.length; i++) {
  const cur = sectionDelimiters[i];
  if (cur.type === 'table') continue;
  const next = sectionDelimiters[i + 1];
  const endIndex = next ? next.lineIndex : lines.length;
  const sectionText = lines.slice(cur.lineIndex, endIndex).join('\n');
  sections.push({
    rawTitle: cur.rawTitle,
    type: cur.type,
    text: sectionText
  });
}

console.log(`Extracted ${sections.length} brand sections.`);

// Save debug JSON
fs.writeFileSync('scripts/sections_summary.json', JSON.stringify(sections.map(s => ({
  title: s.rawTitle,
  type: s.type,
  length: s.text.length,
  head: s.text.slice(0, 150)
})), null, 2));
