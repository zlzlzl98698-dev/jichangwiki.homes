// scripts/upgrade_all_secondary_pages.js
// Substantively expands ALL 54 Secondary Topic Pages across 10 categories
// into high-density, authoritative, multi-section thematic guides.

import fs from 'node:fs';
import path from 'node:path';

console.log('Starting full-scale expansion of ALL 54 Secondary Topic Pages...');

// Helper to create consistent, high-conversion, deep secondary page templates
function generateSecondaryPage({
  categoryKey,
  categoryName,
  parentHubName,
  parentHubUrl,
  subSlug,
  title,
  description,
  heroBadge,
  h1,
  subDesc,
  answerFirstTitle,
  answerFirstText,
  section1Title,
  section1Content,
  section2Title,
  section2Content,
  tableTitle,
  tableSubtitle,
  tableHeaders,
  tableRows,
  decisionTreeTitle,
  decisionTreeScenarios,
  decisionRulesTitle,
  decisionRules,
  brandShowcaseTitle,
  faqTitle,
  faqs,
  relatedArticlesTitle,
  relatedArticles
}) {
  const breadcrumbs = [
    { name: "首页", url: "/" },
    { name: parentHubName, url: parentHubUrl },
    { name: subSlug, url: `${parentHubUrl}${subSlug}/` }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://jichangwiki.homes${parentHubUrl}${subSlug}/`,
        "url": `https://jichangwiki.homes${parentHubUrl}${subSlug}/`,
        "name": title,
        "description": description,
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://jichangwiki.homes/" },
            { "@type": "ListItem", "position": 2, "name": parentHubName, "item": `https://jichangwiki.homes${parentHubUrl}` },
            { "@type": "ListItem", "position": 3, "name": title, "item": `https://jichangwiki.homes${parentHubUrl}${subSlug}/` }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      }
    ]
  };

  return `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = ${JSON.stringify(title)};
const description = ${JSON.stringify(description)};
const breadcrumbs = ${JSON.stringify(breadcrumbs)};
const jsonLd = ${JSON.stringify(jsonLd)};

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const displayBrands = brands.slice(0, 6);
const faqs = ${JSON.stringify(faqs)};
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <!-- Top Hub Header -->
    <header class="mb-8 border-b border-slate-200 pb-6">
      <div class="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
        <span>${heroBadge}</span>
        <span>·</span>
        <span>上级主题: <a href="${parentHubUrl}" class="underline hover:text-blue-800">${parentHubName}总览</a></span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
        ${h1}
      </h1>
      <p class="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed max-w-4xl">
        ${subDesc}
      </p>
    </header>

    <!-- Answer-First Executive Summary Box -->
    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6 sm:p-8 mb-12 shadow-sm">
      <div class="flex items-center gap-2 text-blue-950 font-extrabold text-lg mb-3">
        <span class="text-xl">💡</span>
        <span>${answerFirstTitle}</span>
      </div>
      <div class="text-sm sm:text-base text-blue-950 leading-relaxed space-y-3 font-sans">
        ${answerFirstText}
      </div>
    </div>

    <!-- Section 1: Deep Industry / Technical Analysis -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
        <span class="w-1.5 h-6 bg-blue-600 rounded-full inline-block"></span>
        ${section1Title}
      </h2>
      <div class="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
        ${section1Content}
      </div>
    </section>

    <!-- Section 2: Core Architecture & Traps -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
        <span class="w-1.5 h-6 bg-indigo-600 rounded-full inline-block"></span>
        ${section2Title}
      </h2>
      <div class="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
        ${section2Content}
      </div>
    </section>

    <!-- Section 3: Head-to-Head Specification / Comparison Table -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-2 pb-2 border-b border-slate-100 flex items-center gap-2">
        <span class="w-1.5 h-6 bg-emerald-600 rounded-full inline-block"></span>
        ${tableTitle}
      </h2>
      <p class="text-xs sm:text-sm text-slate-600 mb-4">
        ${tableSubtitle}
      </p>

      <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mb-6">
        <table class="w-full text-xs sm:text-sm text-left border-collapse">
          <thead class="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
            <tr>
              ${tableHeaders.map(h => `<th class="py-3 px-4">${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 bg-white">
            ${tableRows.map(row => `
              <tr class="hover:bg-blue-50/50 transition">
                ${row.map((cell, idx) => `<td class="py-3 px-4 ${idx === 0 ? 'font-bold text-slate-900' : ''}">${cell}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>

    <!-- Section 4: Brand Showcase Grid -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
        ${brandShowcaseTitle || '精选匹配服务商直达'}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayBrands.map(b => (
          <BrandCard brand={b} />
        ))}
      </div>
    </section>

    <!-- Section 5: Buyer Decision Tree & Best Practices -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
        <span class="w-1.5 h-6 bg-amber-500 rounded-full inline-block"></span>
        ${decisionTreeTitle}
      </h2>
      <div class="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
        <div class="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-3 my-4">
          ${decisionTreeScenarios.map(s => `
            <div class="flex items-start gap-3">
              <span class="font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded text-xs flex-shrink-0">${s.badge}</span>
              <p class="text-xs sm:text-sm text-slate-800 leading-relaxed">
                <strong>${s.title}：</strong> ${s.desc}
              </p>
            </div>
          `).join('')}
        </div>

        <h3 class="text-lg font-bold text-slate-900 mt-6 mb-2">${decisionRulesTitle || '黄金操作与选型守则：'}</h3>
        <ol class="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
          ${decisionRules.map(r => `<li>${r}</li>`).join('')}
        </ol>
      </div>
    </section>

    <!-- Section 6: In-Depth FAQ Accordion -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
        ${faqTitle || '常见疑难与实战答疑 (FAQ)'}
      </h2>
      <div class="space-y-4">
        {faqs.map((f, i) => (
          <details class="group bg-white rounded-2xl border border-slate-200 p-5 open:ring-2 open:ring-blue-500/20 transition shadow-sm">
            <summary class="font-bold text-slate-900 text-sm sm:text-base cursor-pointer flex items-center justify-between list-none">
              <span class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">{i+1}</span>
                {f.q}
              </span>
              <span class="text-slate-400 group-open:rotate-180 transition-transform ml-2">&darr;</span>
            </summary>
            <div class="mt-4 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              {f.a}
            </div>
          </details>
        ))}
      </div>
    </section>

    <!-- Section 7: Related In-Depth Tier-3 Articles Hub -->
    <section class="mb-14 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200">
      <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-2">
        📚 ${relatedArticlesTitle || '本专题关联的三级深度实操长文推荐'}
      </h3>
      <p class="text-xs text-slate-600 mb-5">
        如果您想更深入了解本专题的技术底层、代码配置及故障排查实操，推荐继续研读：
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${relatedArticles.map(a => `
          <a href="${a.url}" class="p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition group">
            <span class="text-[11px] text-blue-600 font-bold block mb-1">${a.tag}</span>
            <h4 class="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition">
              ${a.title} &rarr;
            </h4>
            <p class="text-xs text-slate-500 mt-1 line-clamp-2">
              ${a.desc}
            </p>
          </a>
        `).join('')}
      </div>
    </section>

    <!-- Bottom Conversion CTA -->
    <BrandCTA 
      brandName="光速云（Guangsu Cloud）" 
      affiliateURL="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"
      couponCode="AMM"
      entryPrice="折合 ¥8/月起（年付¥99）"
      customTitle="全场景高可靠专线保障 · 光速云"
      customDesc="4年老牌稳健运营，IEPL 企业级专线，4K 秒开无卡顿，输入优惠码 AMM 尽享专属折扣。"
    />

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`;
}

// Map of category configurations to generate rich content for each file
import { getSecondaryData } from './secondary_page_data.js';

const secondaryData = getSecondaryData();
let count = 0;

for (const item of secondaryData) {
  const filePath = path.resolve(`src/pages/${item.categoryKey}/${item.subSlug}.astro`);
  const content = generateSecondaryPage(item);
  fs.writeFileSync(filePath, content, 'utf8');
  count++;
  console.log(`[OK] (${count}/54) Upgraded secondary page: src/pages/${item.categoryKey}/${item.subSlug}.astro`);
}

console.log(`\\nSuccessfully upgraded ALL ${count} secondary pages to full long-form depth!`);
