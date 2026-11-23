// scripts/seo_audit_engine.js
import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles(distDir);
console.log(`[INFO] Found ${htmlFiles.length} HTML files in dist/`);

// 1. Robots.txt check
const robotsPath = path.join(distDir, 'robots.txt');
const robotsContent = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, 'utf8') : null;

// 2. Sitemap check
const sitemap0Path = path.join(distDir, 'sitemap-0.xml');
const sitemap0Content = fs.existsSync(sitemap0Path) ? fs.readFileSync(sitemap0Path, 'utf8') : '';
const sitemapUrls = (sitemap0Content.match(/<loc>([^<]+)<\/loc>/g) || []).map(s => s.replace(/<\/?loc>/g, ''));

console.log(`[INFO] Sitemap contains ${sitemapUrls.length} URLs`);

// Checks
const auditResults = {
  robots: {
    exists: !!robotsContent,
    content: robotsContent,
    blocksStaticAssets: robotsContent ? /Disallow:.*\.(css|js|png|jpg|webp)/i.test(robotsContent) : false,
    pointsToSitemap: robotsContent ? /Sitemap:\s*https:\/\/jichangwiki\.homes\/sitemap-index\.xml/i.test(robotsContent) : false
  },
  sitemap: {
    count: sitemapUrls.length,
    hasDisallowedUrls: sitemapUrls.filter(u => u.includes('/search/')),
    hasNonHttps: sitemapUrls.filter(u => !u.startsWith('https://jichangwiki.homes/')),
    hasTrailingSlashIssues: sitemapUrls.filter(u => !u.endsWith('/') && !u.endsWith('.xml') && !u.endsWith('.html'))
  },
  canonicals: {
    totalChecked: htmlFiles.length,
    missing: [],
    wrongDomain: [],
    relative: [],
    mismatchSelf: []
  },
  outboundLinks: {
    totalChecked: 0,
    commercialMissingNofollow: [],
    allExternal: []
  },
  internalDeadLinks: {
    checked: 0,
    deadLinks: []
  },
  contentLength: {
    thinPagesUnder1000Chars: [],
    wordCountStats: []
  },
  schema: {
    pagesWithSchema: 0,
    parseErrors: [],
    typesFound: new Set()
  },
  metaUniqueness: {
    duplicateTitles: new Map(),
    duplicateDescriptions: new Map()
  },
  trackingCode: {
    hasThirdPartyTracking: []
  }
};

// Map of all valid URLs in site for internal link checking
const validSiteUrls = new Set(sitemapUrls);
// Also add root paths
htmlFiles.forEach(f => {
  let rel = path.relative(distDir, f).replace(/\\/g, '/');
  if (rel.endsWith('index.html')) {
    rel = rel.replace(/index\.html$/, '');
  }
  validSiteUrls.add('https://jichangwiki.homes/' + rel);
  validSiteUrls.add('/' + rel);
});

const titlesMap = new Map();
const descsMap = new Map();

for (const file of htmlFiles) {
  const relPath = path.relative(distDir, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');

  // Title check
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  if (title) {
    if (!titlesMap.has(title)) titlesMap.set(title, []);
    titlesMap.get(title).push(relPath);
  }

  // Description check
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  const desc = descMatch ? descMatch[1].trim() : '';
  if (desc) {
    if (!descsMap.has(desc)) descsMap.set(desc, []);
    descsMap.get(desc).push(relPath);
  }

  // Canonical check
  const canonMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (!canonMatch) {
    auditResults.canonicals.missing.push(relPath);
  } else {
    const href = canonMatch[1];
    if (!href.startsWith('https://jichangwiki.homes/')) {
      auditResults.canonicals.wrongDomain.push({ file: relPath, href });
    }
    // Check if canonical matches self
    let expectedPath = relPath === 'index.html' ? '' : (relPath.endsWith('index.html') ? relPath.replace('index.html', '') : relPath);
    let expectedUrl = `https://jichangwiki.homes/${expectedPath}`;
    if (href !== expectedUrl && relPath !== '404.html') {
      auditResults.canonicals.mismatchSelf.push({ file: relPath, actual: href, expected: expectedUrl });
    }
  }

  // Outbound links check
  const linkMatches = html.matchAll(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi);
  for (const match of linkMatches) {
    const fullTag = match[0];
    const href = match[1];
    auditResults.outboundLinks.totalChecked++;

    if (href.startsWith('http://') || href.startsWith('https://')) {
      if (!href.includes('jichangwiki.homes') && !href.includes('localhost') && !href.includes('schema.org')) {
        const relMatch = fullTag.match(/rel=["']([^"']+)["']/i);
        const rel = relMatch ? relMatch[1] : '';
        auditResults.outboundLinks.allExternal.push({ file: relPath, href, rel });

        // Is it commercial / affiliate link?
        if (href.includes('aff') || href.includes('code=') || href.includes('channel=') || fullTag.includes('官网') || fullTag.includes('直达')) {
          if (!rel.includes('nofollow')) {
            auditResults.outboundLinks.commercialMissingNofollow.push({ file: relPath, href, fullTag });
          }
        }
      }
    } else if (href.startsWith('/') && !href.startsWith('//')) {
      // Internal link check
      auditResults.internalDeadLinks.checked++;
      const cleanHref = href.split('#')[0].split('?')[0];
      if (cleanHref && cleanHref !== '/' && !validSiteUrls.has(cleanHref) && !validSiteUrls.has('https://jichangwiki.homes' + cleanHref)) {
        // Check if file exists in dist
        let checkPath = path.join(distDir, cleanHref.endsWith('/') ? cleanHref + 'index.html' : cleanHref);
        if (!fs.existsSync(checkPath) && !fs.existsSync(checkPath + '.html')) {
          auditResults.internalDeadLinks.deadLinks.push({ from: relPath, to: href });
        }
      }
    }
  }

  // Text content length
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    const cleanText = bodyMatch[1]
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<svg[\s\S]*?<\/svg>/gi, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, '');
    
    if (cleanText.length < 1000 && relPath !== '404.html') {
      auditResults.contentLength.thinPagesUnder1000Chars.push({ file: relPath, len: cleanText.length });
    }
  }

  // Schema parsing
  const jsonLdMatches = html.matchAll(/<script\s+type=["']application\/ld\+json["']>([^<]+)<\/script>/gi);
  for (const jm of jsonLdMatches) {
    auditResults.schema.pagesWithSchema++;
    try {
      const parsed = JSON.parse(jm[1]);
      if (parsed['@type']) auditResults.schema.typesFound.add(parsed['@type']);
      if (parsed['@graph']) {
        parsed['@graph'].forEach(g => {
          if (g['@type']) auditResults.schema.typesFound.add(g['@type']);
        });
      }
    } catch (e) {
      auditResults.schema.parseErrors.push({ file: relPath, err: e.message });
    }
  }

  // Third party tracking scripts
  if (/googletagmanager\.com|google-analytics\.com|hm\.baidu\.com|cnzz\.com/i.test(html)) {
    auditResults.trackingCode.hasThirdPartyTracking.push(relPath);
  }

  // H1 tags count
  const h1Matches = html.match(/<h1[^>]*>/gi) || [];
  if (h1Matches.length !== 1 && relPath !== '404.html') {
    if (!auditResults.h1Issues) auditResults.h1Issues = [];
    auditResults.h1Issues.push({ file: relPath, count: h1Matches.length });
  }

  // Missing img alt
  const imgMatches = html.matchAll(/<img\s+([^>]+)>/gi);
  for (const im of imgMatches) {
    const attrs = im[1];
    if (!attrs.includes('alt=') || /alt=["']\s*["']/.test(attrs)) {
      if (!auditResults.imgAltIssues) auditResults.imgAltIssues = [];
      auditResults.imgAltIssues.push({ file: relPath, img: im[0] });
    }
  }

  // GEO / AEO elements check (Tables & Details)
  const hasTable = /<table[^>]*>/i.test(html);
  const hasFaq = /<details[^>]*>/i.test(html);
  const hasVerdict = /Answer-First|核心速查结论|核心评测结论|核心直接答案|核心概况/i.test(html);
  if (!auditResults.geoStats) auditResults.geoStats = { pagesWithTables: 0, pagesWithFaqs: 0, pagesWithVerdict: 0 };
  if (hasTable) auditResults.geoStats.pagesWithTables++;
  if (hasFaq) auditResults.geoStats.pagesWithFaqs++;
  if (hasVerdict) auditResults.geoStats.pagesWithVerdict++;
}

// Duplicate titles/descriptions
for (const [t, list] of titlesMap.entries()) {
  if (list.length > 1) {
    auditResults.metaUniqueness.duplicateTitles.set(t, list);
  }
}
for (const [d, list] of descsMap.entries()) {
  if (list.length > 1) {
    auditResults.metaUniqueness.duplicateDescriptions.set(d, list);
  }
}

console.log('=== AUDIT SUMMARY RESULTS ===');
console.log('1. Robots exists & blocks static:', auditResults.robots);
console.log('2. Sitemap count:', auditResults.sitemap.count, 'Disallowed in sitemap:', auditResults.sitemap.hasDisallowedUrls);
console.log('3. Canonical issues - Missing:', auditResults.canonicals.missing.length, 'Wrong Domain:', auditResults.canonicals.wrongDomain.length, 'Mismatch Self:', auditResults.canonicals.mismatchSelf.length);
if (auditResults.canonicals.mismatchSelf.length) {
  console.log('   Mismatch samples:', auditResults.canonicals.mismatchSelf.slice(0, 5));
}
console.log('4. Commercial Outbound Links Missing nofollow:', auditResults.outboundLinks.commercialMissingNofollow.length);
if (auditResults.outboundLinks.commercialMissingNofollow.length) {
  console.log('   Missing nofollow samples:', auditResults.outboundLinks.commercialMissingNofollow.slice(0, 5));
}
console.log('5. Internal Dead Links:', auditResults.internalDeadLinks.deadLinks.length);
if (auditResults.internalDeadLinks.deadLinks.length) {
  console.log('   All Dead Links:', JSON.stringify(auditResults.internalDeadLinks.deadLinks, null, 2));
}
console.log('6. Thin Pages (< 1000 chars):', auditResults.contentLength.thinPagesUnder1000Chars.length);
if (auditResults.contentLength.thinPagesUnder1000Chars.length) {
  console.log('   Thin pages:', auditResults.contentLength.thinPagesUnder1000Chars);
}
console.log('7. Schema Parse Errors:', auditResults.schema.parseErrors.length);
console.log('   Schema types found:', Array.from(auditResults.schema.typesFound));
console.log('8. Third-party tracking scripts:', auditResults.trackingCode.hasThirdPartyTracking.length);
console.log('9. Duplicate Titles:', auditResults.metaUniqueness.duplicateTitles.size);
if (auditResults.metaUniqueness.duplicateTitles.size) {
  for (const [t, list] of auditResults.metaUniqueness.duplicateTitles.entries()) {
    console.log('   Title:', t, 'in files:', list);
  }
}
console.log('10. Duplicate Descriptions:', auditResults.metaUniqueness.duplicateDescriptions.size);
if (auditResults.metaUniqueness.duplicateDescriptions.size) {
  for (const [d, list] of auditResults.metaUniqueness.duplicateDescriptions.entries()) {
    console.log('   Desc:', d, 'in files:', list);
  }
}
console.log('11. H1 Tag Issues (not exactly 1 H1):', auditResults.h1Issues ? auditResults.h1Issues.length : 0);
if (auditResults.h1Issues && auditResults.h1Issues.length) console.log(auditResults.h1Issues);
console.log('12. Missing Img Alt count:', auditResults.imgAltIssues ? auditResults.imgAltIssues.length : 0);
if (auditResults.imgAltIssues && auditResults.imgAltIssues.length) console.log(auditResults.imgAltIssues.slice(0, 5));
console.log('13. GEO / AEO elements count:', auditResults.geoStats);
