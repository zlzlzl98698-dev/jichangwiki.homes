import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const sitemapIndex = path.join(distDir, 'sitemap-index.xml');
const sitemapTarget = path.join(distDir, 'sitemap.xml');

if (fs.existsSync(sitemapIndex)) {
  fs.copyFileSync(sitemapIndex, sitemapTarget);
  console.log(`[SEO Build] Successfully synchronized sitemap-index.xml -> sitemap.xml in ${distDir}`);
} else if (fs.existsSync(path.join(distDir, 'sitemap-0.xml'))) {
  fs.copyFileSync(path.join(distDir, 'sitemap-0.xml'), sitemapTarget);
  console.log(`[SEO Build] Successfully copied sitemap-0.xml -> sitemap.xml in ${distDir}`);
} else {
  console.warn(`[SEO Build Warning] Neither sitemap-index.xml nor sitemap-0.xml found in ${distDir}`);
}
