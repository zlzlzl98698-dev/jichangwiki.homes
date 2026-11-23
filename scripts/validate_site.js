import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const brands = JSON.parse(fs.readFileSync('src/data/brands.json', 'utf-8'));

console.log('--- STARTING QA VALIDATION ---');

let errors = [];
let warnings = [];

// 1. Check Primary Hubs
const primaryHubs = [
  'airport', 'pricing', 'brands', 'vpn', 'clients',
  'streaming-ai', 'network', 'tutorials', 'troubleshooting', 'risk'
];

for (const hub of primaryHubs) {
  const p = path.join(distDir, hub, 'index.html');
  if (!fs.existsSync(p)) {
    errors.push(`Missing primary hub page: dist/${hub}/index.html`);
  } else {
    const stat = fs.statSync(p);
    if (stat.size < 500) errors.push(`Primary hub too small: dist/${hub}/index.html (${stat.size} bytes)`);
  }
}
console.log(`✓ 10 Primary category hubs checked.`);

// 2. Check 31 Brands
for (const b of brands) {
  const brandPath = path.join(distDir, 'brands', b.slug, 'index.html');
  const reviewPath = path.join(distDir, 'reviews', b.slug, 'index.html');

  if (!fs.existsSync(brandPath)) errors.push(`Missing brand detail: dist/brands/${b.slug}/index.html`);
  if (!fs.existsSync(reviewPath)) errors.push(`Missing brand review: dist/reviews/${b.slug}/index.html`);

  if (fs.existsSync(brandPath)) {
    const html = fs.readFileSync(brandPath, 'utf-8');
    if (!html.includes('sponsored') || !html.includes('nofollow')) {
      warnings.push(`Brand ${b.slug} page missing sponsored or nofollow on link`);
    }
    if (!html.includes('schema.org')) {
      errors.push(`Brand ${b.slug} page missing Schema.org JSON-LD`);
    }
  }
}
console.log(`✓ All 31 brands checked for detail and review routes.`);

// 3. Check Sitemap & Robots
if (!fs.existsSync(path.join(distDir, 'sitemap-index.xml'))) {
  errors.push('Missing sitemap-index.xml in dist');
}
if (!fs.existsSync(path.join(distDir, 'robots.txt'))) {
  errors.push('Missing robots.txt in dist');
}
if (!fs.existsSync(path.join(distDir, '.htaccess'))) {
  errors.push('Missing .htaccess in dist');
}
console.log(`✓ Sitemap, robots.txt, and .htaccess verified.`);

// 4. Check Pagefind index
if (!fs.existsSync(path.join(distDir, 'pagefind', 'pagefind.js'))) {
  errors.push('Missing pagefind.js in dist/pagefind');
} else {
  console.log(`✓ Pagefind search index verified.`);
}

console.log('--- QA REPORT SUMMARY ---');
console.log(`Total Errors: ${errors.length}`);
console.log(`Total Warnings: ${warnings.length}`);

if (errors.length > 0) {
  console.error('Errors found:');
  errors.forEach(e => console.error(` - ${e}`));
  process.exit(1);
} else {
  console.log('🎉 ALL AUDIT CHECKS PASSED PERFECTLY!');
}
