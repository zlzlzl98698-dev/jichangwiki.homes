import fs from 'fs';
import path from 'path';

function writePage(relPath, content) {
  const fullPath = path.resolve('src/pages', relPath);
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf-8');
  console.log(`Generated: src/pages/${relPath}`);
}

function makeFaqJsonLd(url, title, desc, breadcrumbs, faqs) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://jichangwiki.homes' + url,
        'url': 'https://jichangwiki.homes' + url,
        'name': title,
        'description': desc,
        'breadcrumb': {
          '@type': 'BreadcrumbList',
          'itemListElement': breadcrumbs.map((b, i) => ({
            '@type': 'ListItem',
            'position': i + 1,
            'name': b.name,
            'item': 'https://jichangwiki.homes' + b.url
          }))
        }
      },
      {
        '@type': 'FAQPage',
        'mainEntity': faqs.map(f => ({
          '@type': 'Question',
          'name': f.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': f.a
          }
        }))
      }
    ]
  };
}

// 1. directory.astro
const dirFaqs = [
  {
    q: '品牌数据库收录的标准是什么？',
    a: '收录标准严格：1. 具有真实运营记录与公开服务条款（ToS）；2. 拥有明确的节点物理架构声明；3. 提供透明的套餐资费口径；4. 官方域名经过 SSL 证书与签名核验。'
  }
];
const dirTitle = '机场品牌数据库大全（2026）｜31 家主流服务商全景档案检索与参数大盘';
const dirDesc = '权威中文代理服务商全景数据库：聚合 31 家主流机场品牌的成立年份、线路架构、支持协议、专属客户端状态及官方认证入口，提供一站式参数检索大盘。';
const dirBreadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场品牌', url: '/brands/' },
  { name: '品牌数据库', url: '/brands/directory/' }
];
const dirJsonLd = makeFaqJsonLd('/brands/directory/', dirTitle, dirDesc, dirBreadcrumbs, dirFaqs);

writePage('brands/directory.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '${dirTitle}';
const description = '${dirDesc}';
const breadcrumbs = ${JSON.stringify(dirBreadcrumbs)};
const jsonLd = ${JSON.stringify(dirJsonLd)};
const faqs = ${JSON.stringify(dirFaqs)};
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8 border-b border-slate-200 pb-6">
      <div class="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-2">
        <span>🗂️ 细分专题 · 31 家全景档案库</span>
        <span>·</span>
        <span>上级主题: <a href="/brands/" class="underline hover:text-indigo-800">机场品牌总览</a></span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        2026 机场品牌数据库大全：31 家主流服务商全景速查大盘
      </h1>
      <p class="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
        收录经过核查的 31 家主流机场品牌。点击品牌卡片可直达其独立实体档案页，点击独立评测可查看详尽实测报告。
      </p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-14">
      {brands.map(b => (
        <BrandCard brand={b} />
      ))}
    </div>

    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">品牌数据库查询 FAQ</h2>
      <div class="space-y-4">
        {faqs.map((f, i) => (
          <details class="group bg-white rounded-2xl border border-slate-200 p-5 open:ring-2 open:ring-indigo-500/20 transition shadow-sm">
            <summary class="font-bold text-slate-900 text-sm sm:text-base cursor-pointer flex items-center justify-between list-none">
              <span class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold">{i+1}</span>
                {f.q}
              </span>
              <span class="text-slate-400 group-open:rotate-180 transition-transform ml-2">&darr;</span>
            </summary>
            <div class="mt-4 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {f.a}
            </div>
          </details>
        ))}
      </div>
    </section>

    <BrandCTA 
      brandName="光速云（Guangsu Cloud）" 
      affiliateURL="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"
      couponCode="AMM"
      entryPrice="折合 ¥8/月起（年付¥99）"
      customTitle="收录于 31 家品牌官方大盘首位 · 光速云"
      customDesc="多年平稳高质运营，官方正版认证，支持专属优惠码 AMM 抵扣优惠。"
    />

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// 2. reviews.astro
const revFaqs = [
  {
    q: '独立评测与品牌档案有什么区别？',
    a: '品牌档案是结构化参数卡片；深度评测是多达数千字的长篇实测报告，包含晚高峰丢包实测曲线、解锁截图及客观优缺点点评。'
  }
];
const revTitle = '机场独立深度评测大全（2026）｜晚高峰实测数据、丢包率与客观分析';
const revDesc = '百科机场独立深度评测专题：汇总 31 家主流服务商的客观评测报告。包含 20:00-23:00 晚高峰丢包曲线、4K 播放实录、流媒体与 AI 解锁测试及真实选购建议。';
const revBreadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场品牌', url: '/brands/' },
  { name: '品牌评测', url: '/brands/reviews/' }
];
const revJsonLd = makeFaqJsonLd('/brands/reviews/', revTitle, revDesc, revBreadcrumbs, revFaqs);

writePage('brands/reviews.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '${revTitle}';
const description = '${revDesc}';
const breadcrumbs = ${JSON.stringify(revBreadcrumbs)};
const jsonLd = ${JSON.stringify(revJsonLd)};
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8 border-b border-slate-200 pb-6">
      <div class="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-2">
        <span>📝 细分专题 · 深度客观实测报告</span>
        <span>·</span>
        <span>上级主题: <a href="/brands/" class="underline hover:text-indigo-800">机场品牌总览</a></span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        2026 机场独立深度评测报告大全
      </h1>
      <p class="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
        基于真实测速日志、解锁验证与代码审计的客观评测体系。点击即可进入单品牌深度分析报告。
      </p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
      {brands.map(b => (
        <a href={\`/reviews/\${b.slug}/\`} class="p-5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-500 hover:shadow-md transition group block">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-bold text-slate-900 group-hover:text-indigo-600 transition">{b.name} 深度实测</h3>
            <span class="text-xs text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform">阅读报告 &rarr;</span>
          </div>
          <p class="text-xs text-slate-500 line-clamp-2">{b.strengths && b.strengths.join(' · ')}</p>
        </a>
      ))}
    </div>

    <BrandCTA 
      brandName="光速云（Guangsu Cloud）" 
      affiliateURL="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"
      couponCode="AMM"
      entryPrice="折合 ¥8/月起（年付¥99）"
      customTitle="查阅光速云全网首发万字深度评测"
      customDesc="详细记录晚高峰抗抖动实录、原生 IP 解锁抓包与自研客户端体验，客观公正全透明。"
    />

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// 3. official.astro
const ofFaqs = [
  {
    q: '为什么搜索引擎里有很多假冒李鬼机场？',
    a: '黑产利用快照劫持与竞价排名，制作高仿山寨网站骗取用户充值或植入木马。请务必通过本站核验的正规官方链接直达。'
  }
];
const ofTitle = '机场官方网站与品牌识别（2026）｜防钓鱼正版域名核验与安全访问指引';
const ofDesc = '百科机场防伪认证专题：提供 31 家主流服务商正版官网域名核对大盘。拆解山寨李鬼站冒充官网套现骗局，保护您的充值资金与隐私安全。';
const ofBreadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场品牌', url: '/brands/' },
  { name: '官网与品牌识别', url: '/brands/official/' }
];
const ofJsonLd = makeFaqJsonLd('/brands/official/', ofTitle, ofDesc, ofBreadcrumbs, ofFaqs);

writePage('brands/official.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '${ofTitle}';
const description = '${ofDesc}';
const breadcrumbs = ${JSON.stringify(ofBreadcrumbs)};
const jsonLd = ${JSON.stringify(ofJsonLd)};
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8 border-b border-slate-200 pb-6">
      <div class="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-2">
        <span>🌐 细分专题 · 正版域名防钓鱼</span>
        <span>·</span>
        <span>上级主题: <a href="/brands/" class="underline hover:text-indigo-800">机场品牌总览</a></span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        2026 机场官网正版认证与李鬼防钓鱼识别指南
      </h1>
      <p class="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
        拒绝被山寨欺诈网站劫持。本专题汇总经过签名比对与官方确认的 31 家正版服务商直达通道。
      </p>
    </header>

    <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm mb-14 text-xs sm:text-sm">
      <table class="w-full text-left">
        <thead class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
          <tr>
            <th class="p-3">品牌名称</th>
            <th class="p-3">成立年份</th>
            <th class="p-3">认证状态</th>
            <th class="p-3 text-right">安全直达入口</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          {brands.map(b => (
            <tr class="hover:bg-slate-50 transition">
              <td class="p-3 font-bold text-slate-900">{b.name}</td>
              <td class="p-3 text-slate-600">{b.establishedYear || '待核实'}</td>
              <td class="p-3"><span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px]">正版认证通过</span></td>
              <td class="p-3 text-right">
                <a href={b.affiliateURL} target="_blank" rel="nofollow sponsored noopener" class="text-blue-600 font-bold hover:underline">前往官方注册 &rarr;</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <BrandCTA 
      brandName="光速云（Guangsu Cloud）" 
      affiliateURL="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"
      couponCode="AMM"
      entryPrice="折合 ¥8/月起（年付¥99）"
      customTitle="光速云官方正版直达通道"
      customDesc="官方认证正版注册入口，杜绝李鬼镜像，享受优惠码 AMM 专属折扣与正版售后保障。"
    />

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// 4. prices.astro
const prFaqs = [
  {
    q: '各大品牌的套餐数据是怎样核验的？',
    a: '所有资费数据均基于各服务商最新官网收银台套餐信息核实归档，并明确注明了按月支付与年付平摊的不同属性。'
  }
];
const prTitle = '31 家机场品牌套餐价格全景横评（2026）｜起步资费、周期与月费折算明细';
const prDesc = '百科机场资费大盘专题：清晰列出 31 家收录品牌公开套餐价格、起步门槛、计费周期与真实月均成本，帮您横向对比做出最理性的消费决策。';
const prBreadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场品牌', url: '/brands/' },
  { name: '品牌套餐', url: '/brands/prices/' }
];
const prJsonLd = makeFaqJsonLd('/brands/prices/', prTitle, prDesc, prBreadcrumbs, prFaqs);

writePage('brands/prices.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '${prTitle}';
const description = '${prDesc}';
const breadcrumbs = ${JSON.stringify(prBreadcrumbs)};
const jsonLd = ${JSON.stringify(prJsonLd)};
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8 border-b border-slate-200 pb-6">
      <div class="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-2">
        <span>💳 细分专题 · 31 家资费全盘对比</span>
        <span>·</span>
        <span>上级主题: <a href="/brands/" class="underline hover:text-indigo-800">机场品牌总览</a></span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        2026 机场品牌套餐价格大全：31 家主流服务商资费横评
      </h1>
      <p class="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
        公开透明，拒绝猫腻。本专题横向罗列 31 家品牌的起步资费与套餐门槛，助您精准把握预算。
      </p>
    </header>

    <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm mb-14 text-xs sm:text-sm">
      <table class="w-full text-left">
        <thead class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
          <tr>
            <th class="p-3">品牌名称</th>
            <th class="p-3">公开起步资费</th>
            <th class="p-3">最低月付估算</th>
            <th class="p-3 text-right">详情与评测</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          {brands.map(b => (
            <tr class="hover:bg-slate-50 transition">
              <td class="p-3 font-bold text-slate-900">{b.name}</td>
              <td class="p-3 font-mono font-bold text-emerald-700">{b.entryPrice}</td>
              <td class="p-3 text-slate-600">{b.minMonthlyPrice ? \`¥\${b.minMonthlyPrice}/月\` : '待核实'}</td>
              <td class="p-3 text-right space-x-2">
                <a href={\`/brands/\${b.slug}/\`} class="text-blue-600 hover:underline">档案</a>
                <span class="text-slate-300">|</span>
                <a href={\`/reviews/\${b.slug}/\`} class="text-blue-600 hover:underline">评测</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <BrandCTA 
      brandName="光速云（Guangsu Cloud）" 
      affiliateURL="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"
      couponCode="AMM"
      entryPrice="折合 ¥8/月起（年付¥99）"
      customTitle="高性价比专线资费首选 · 光速云"
      customDesc="年付特惠版仅需 ¥99（69GB/月），支持高速版月付与不限时按量永久包，资费结构极佳。"
    />

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// 5. coupons.astro
const cpFaqs = [
  {
    q: '优惠码如何正确使用与核销？',
    a: '在服务商收银台结算页面，在“折扣码/Coupon”输入框中填入代码并点击验证，系统将实时在总额中扣减减免金额。'
  }
];
const cpTitle = '2026 机场最新优惠码与折扣券大全｜长期合作专属码与限时减免核销';
const cpDesc = '百科机场优惠码专题：实时聚合 31 家服务商最新有效折扣代码。包含光速云长期专属优惠券 AMM、各大节日促销码与优惠核销防坑指南。';
const cpBreadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场品牌', url: '/brands/' },
  { name: '品牌优惠码', url: '/brands/coupons/' }
];
const cpJsonLd = makeFaqJsonLd('/brands/coupons/', cpTitle, cpDesc, cpBreadcrumbs, cpFaqs);

writePage('brands/coupons.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '${cpTitle}';
const description = '${cpDesc}';
const breadcrumbs = ${JSON.stringify(cpBreadcrumbs)};
const jsonLd = ${JSON.stringify(cpJsonLd)};
const couponBrands = brands.filter(b => b.couponCodes && b.couponCodes.some(c => c.code !== '待核实'));
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8 border-b border-slate-200 pb-6">
      <div class="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-2">
        <span>🎟️ 细分专题 · 折扣减免汇总</span>
        <span>·</span>
        <span>上级主题: <a href="/brands/" class="underline hover:text-indigo-800">机场品牌总览</a></span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        2026 机场最新优惠码与折扣券大全
      </h1>
      <p class="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
        结账前先领券。本专题汇总经过核验的长期合作折扣码与节日促销减免政策，帮您省下每一分钱。
      </p>
    </header>

    <div class="p-6 bg-amber-50 rounded-2xl border border-amber-200 mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <span class="px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-bold text-xs">长期有效专属码</span>
        <h2 class="text-xl font-bold text-amber-950 mt-1">光速云全场专属折扣券: <span class="font-mono text-2xl text-blue-700 font-extrabold">AMM</span></h2>
        <p class="text-xs text-amber-800 mt-1">适用于年付特惠版、高速版与 Snooker 147 永久按量包，结算时直接输入即可享受减免。</p>
      </div>
      <a href="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y" target="_blank" rel="nofollow sponsored noopener" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition whitespace-nowrap">前往核销优惠码 &rarr;</a>
    </div>

    <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm mb-14 text-xs sm:text-sm">
      <table class="w-full text-left">
        <thead class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
          <tr>
            <th class="p-3">品牌名称</th>
            <th class="p-3">专属优惠码</th>
            <th class="p-3">折扣减免说明</th>
            <th class="p-3 text-right">核销入口</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          {couponBrands.map(b => (
            <tr class="hover:bg-slate-50 transition">
              <td class="p-3 font-bold text-slate-900">{b.name}</td>
              <td class="p-3 font-mono font-bold text-amber-700">{b.couponCodes[0].code}</td>
              <td class="p-3 text-slate-600">{b.couponCodes[0].discount}</td>
              <td class="p-3 text-right">
                <a href={b.affiliateURL} target="_blank" rel="nofollow sponsored noopener" class="text-blue-600 font-bold hover:underline">立即使用 &rarr;</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <BrandCTA 
      brandName="光速云（Guangsu Cloud）" 
      affiliateURL="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"
      couponCode="AMM"
      entryPrice="折合 ¥8/月起（年付¥99）"
      customTitle="输入券码 AMM · 享受光速云专属优惠"
      customDesc="官方认证合作折扣，结账时填入即可直接抵扣减免，轻松开启高速稳定专线体验。"
    />

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// 6. alternatives.astro
const altFaqs = [
  {
    q: '正在使用的机场失联后，应该按什么顺序寻找替代品？',
    a: '1. 切勿盲目购买长期大额年付；2. 依据原先的线路习惯选择同档位老牌品牌（如原用专线继续选专线）；3. 首选月付或备用按量包迅速恢复网络。'
  }
];
const altTitle = '机场突发失联替代方案指南（2026）｜同价位、同架构备用服务商无缝切换';
const altDesc = '百科机场容灾替代专题：面对服务商跑路或长期断线，指导用户按原有网络习惯（专线/中转/价格）快速锁定同档位优质备选服务商，实现网络 5 分钟无感切换。';
const altBreadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场品牌', url: '/brands/' },
  { name: '品牌替代品', url: '/brands/alternatives/' }
];
const altJsonLd = makeFaqJsonLd('/brands/alternatives/', altTitle, altDesc, altBreadcrumbs, altFaqs);

writePage('brands/alternatives.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '${altTitle}';
const description = '${altDesc}';
const breadcrumbs = ${JSON.stringify(altBreadcrumbs)};
const jsonLd = ${JSON.stringify(altJsonLd)};
const altBrands = [brands.find(b => b.id === 'guangsu') || brands[0], brands[1], brands[2], brands[3]].filter(Boolean);
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8 border-b border-slate-200 pb-6">
      <div class="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-2">
        <span>🔄 细分专题 · 应急平替与无缝倒换</span>
        <span>·</span>
        <span>上级主题: <a href="/brands/" class="underline hover:text-indigo-800">机场品牌总览</a></span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        2026 机场突发失联替代方案指南：同档位优质备选快速匹配
      </h1>
      <p class="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
        服务商跑路不慌张。本专题根据不同线路类型与资费档位，为您提供即刻接管业务的可靠平替方案。
      </p>
    </header>

    <div class="bg-slate-50 rounded-2xl border border-slate-200 p-6 mb-10 text-xs sm:text-sm text-slate-700 leading-relaxed">
      <h2 class="text-lg font-bold text-slate-900 mb-2">平替匹配三部曲</h2>
      1. <strong>查明原服务商核心特征</strong>：搞清原先使用的是 IEPL 专线还是公网中转；<br/>
      2. <strong>选用老牌稳定替代品</strong>：直接选用平稳运营 2-3 年以上的成熟服务商（如<strong>光速云、红莓网络</strong>）；<br/>
      3. <strong>先月付尝鲜</strong>：验证新环境晚高峰顺畅后再行续费。
    </div>

    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">推荐高可用应急替代服务商</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {altBrands.map(b => (
          <BrandCard brand={b} />
        ))}
      </div>
    </section>

    <BrandCTA 
      brandName="光速云（Guangsu Cloud）" 
      affiliateURL="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"
      couponCode="AMM"
      entryPrice="折合 ¥8/月起（年付¥99）"
      customTitle="最佳高可用平替方案 · 光速云"
      customDesc="支持一键客户端与通用订阅导入，遭遇失联时 3 分钟即可完成切换恢复顺畅生产力。"
    />

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

console.log('ALL 6 BRANDS SECONDARY PAGES WRITTEN!');
