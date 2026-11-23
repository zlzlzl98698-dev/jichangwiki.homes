// scripts/build_all_secondary_pages.js
// Substantively expands ALL 54 Secondary Topic Pages across 10 categories
// into high-density, authoritative, multi-section thematic guides.

import fs from 'node:fs';
import path from 'node:path';

console.log('Writing full-scale expansion for ALL 54 Secondary Topic Pages...');

function renderTemplate({
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
  const safeSection1Content = (section1Content || '').replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');
  const safeSection2Content = (section2Content || '').replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');
  const safeAnswerFirstText = (answerFirstText || '').replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');

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
import MobileStickyCTA from '../../components/conversion/MobileStickyCTA.astro';
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

    <!-- Main Two-Column Grid on Desktop -->
    <div class="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
      
      <!-- Left Column: Main Long-Form Encyclopedic Content -->
      <div class="lg:col-span-9 min-w-0">
        
        <!-- Answer-First Executive Summary Box -->
        <section id="verdict" class="scroll-mt-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6 sm:p-8 mb-12 shadow-sm">
          <div class="flex items-center gap-2 text-blue-950 font-extrabold text-lg mb-3">
            <span class="text-xl">💡</span>
            <span>${answerFirstTitle}</span>
          </div>
          <div class="text-sm sm:text-base text-blue-950 leading-relaxed space-y-3 font-sans">
            ${safeAnswerFirstText}
          </div>
        </section>

        <!-- Section 1: Deep Industry / Technical Analysis -->
        <section id="section-1" class="scroll-mt-24 mb-14">
          <h2 class="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span class="w-1.5 h-6 bg-blue-600 rounded-full inline-block"></span>
            ${section1Title}
          </h2>
          <div class="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
            ${safeSection1Content}
          </div>
        </section>

        <!-- Section 2: Core Architecture & Traps -->
        <section id="section-2" class="scroll-mt-24 mb-14">
          <h2 class="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span class="w-1.5 h-6 bg-indigo-600 rounded-full inline-block"></span>
            ${section2Title}
          </h2>
          <div class="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
            ${safeSection2Content}
          </div>
        </section>

        <!-- Section 3: Head-to-Head Specification / Comparison Table -->
        <section id="comparison-table" class="scroll-mt-24 mb-14">
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
    <section id="recommended-brands" class="scroll-mt-24 mb-14">
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
    <section id="decision-tree" class="scroll-mt-24 mb-14">
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
    <section id="faqs" class="scroll-mt-24 mb-14">
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
    <section id="related-articles" class="scroll-mt-24 mb-14 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200">
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

      <!-- Right Column: Sticky Table of Contents (TOC) & Quick Access -->
      <aside class="hidden lg:block lg:col-span-3 sticky top-24 space-y-4">
        <!-- TOC Navigation Widget -->
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm text-xs">
          <div class="flex items-center gap-1.5 font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
            <span>📑</span>
            <span>章节快速导航</span>
          </div>
          <nav class="space-y-1 text-slate-600 font-medium">
            <a href="#verdict" class="block py-1.5 px-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition truncate">💡 核心直接结论</a>
            <a href="#section-1" class="block py-1.5 px-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition truncate">一、 技术原理解构</a>
            <a href="#section-2" class="block py-1.5 px-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition truncate">二、 实战排错与SOP</a>
            <a href="#comparison-table" class="block py-1.5 px-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition truncate">三、 核心指标对照表</a>
            <a href="#recommended-brands" class="block py-1.5 px-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition truncate">四、 精选专线直达</a>
            <a href="#decision-tree" class="block py-1.5 px-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition truncate">五、 选型决策与军规</a>
            <a href="#faqs" class="block py-1.5 px-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition truncate">六、 高频技术答疑</a>
            <a href="#related-articles" class="block py-1.5 px-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition truncate">七、 关联三级长文</a>
          </nav>
        </div>

        <!-- Quick Sponsor Mini-Card -->
        <div class="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl p-4 text-white shadow-md border border-slate-800 text-xs">
          <div class="flex items-center justify-between mb-2">
            <span class="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-500/30">全场景首选</span>
            <span class="text-amber-300 font-bold font-mono">9折码 AMM</span>
          </div>
          <h4 class="font-bold text-white text-sm mb-1">光速云 IEPL 企业专线</h4>
          <p class="text-slate-300 text-[11px] mb-3 leading-relaxed">电信级物理内网，0 丢包 4K 秒开，全平台一键导入。</p>
          <div class="flex items-center gap-2">
            <button 
              type="button" 
              class="flex-1 py-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 font-mono font-bold text-center border border-amber-400/30 copy-coupon-btn transition cursor-pointer" 
              data-copy="AMM"
              title="点击复制优惠码 AMM"
            >
              复制券码
            </button>
            <a 
              href="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y" 
              target="_blank" 
              rel="nofollow sponsored noopener noreferrer" 
              class="flex-1 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-center transition shadow-sm"
            >
              官网直达 &rarr;
            </a>
          </div>
        </div>
      </aside>

    </div>
  </div>

  <!-- Mobile Sticky Bottom Conversion Bar -->
  <MobileStickyCTA />
</BaseLayout>
`;
}

// Import definitions from modular files
import { clientsPages } from './pages_clients.js';
import { airportPages } from './pages_airport.js';
import { pricingPages } from './pages_pricing.js';
import { streamingAiPages } from './pages_streaming_ai.js';
import { networkPages } from './pages_network.js';
import { tutorialsPages } from './pages_tutorials.js';
import { troubleshootingPages } from './pages_troubleshooting.js';
import { riskPages } from './pages_risk.js';
import { vpnPages } from './pages_vpn.js';
import { brandsPages } from './pages_brands.js';

const allPages = [
  ...clientsPages,
  ...airportPages,
  ...pricingPages,
  ...streamingAiPages,
  ...networkPages,
  ...tutorialsPages,
  ...troubleshootingPages,
  ...riskPages,
  ...vpnPages,
  ...brandsPages
];

console.log(`Loaded ${allPages.length} secondary page configurations across 10 categories.`);

let successCount = 0;
for (const p of allPages) {
  const filePath = path.resolve(`src/pages/${p.categoryKey}/${p.subSlug}.astro`);
  const content = renderTemplate(p);
  fs.writeFileSync(filePath, content, 'utf8');
  successCount++;
  console.log(`[OK] (${successCount}/${allPages.length}) Upgraded src/pages/${p.categoryKey}/${p.subSlug}.astro`);
}

console.log(`\\nALL ${successCount} Secondary Pages successfully upgraded to industrial long-form depth!`);
