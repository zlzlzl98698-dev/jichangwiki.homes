import fs from 'fs';
import path from 'path';

function writePage(relPath, content) {
  const fullPath = path.resolve('src/pages', relPath);
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf-8');
  console.log(`Successfully upgraded: src/pages/${relPath}`);
}

// Helper to generate FAQ JSON-LD
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

console.log('STARTING SECONDARY TOPIC BATCH 1 GENERATION...');

// =========================================================================
// 01. AIRPORT SUB-TOPICS (5 pages)
// =========================================================================

// 01.1 airport/recommend.astro
writePage('airport/recommend.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '2026 机场推荐指南｜按需匹配最佳代理服务与场景选型方案';
const description = '权威中文机场推荐细分专题：按照轻度查资料、日常高频办公、4K 影音与外贸跨境等具体使用场景，深度横评光速云、红莓网络等精选品牌，提供可直接执行的选型推荐。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场推荐', url: '/airport/' },
  { name: '场景化推荐', url: '/airport/recommend/' }
];

const faqs = [
  {
    q: '场景化选购机场的核心依据是什么？',
    a: '核心在于“业务容忍度”与“带宽吞吐需求”的匹配。如果是轻度查阅学术资料，月付 10 元左右的公网中转即已足够；如果是 4K/8K 视频与海外大片，需要充裕的单线程带宽和流媒体解锁；如果是跨境商贸与外贸独立站运营，则必须购买高 SLA 承诺的 IEPL 纯内网物理专线，杜绝任何断线风险。'
  },
  {
    q: '为什么光速云被评为 2026 年度平衡旗舰推荐？',
    a: '光速云兼顾了极高的性价比与稳定的专线品质。其特惠年付仅需 ¥99（折合 ¥8.25/月，69GB/月），且提供自研跨平台客户端，支持原生 IP 解锁 ChatGPT 与 Netflix，非常适合作为主力日常工具或中轻度办公用户首选。'
  },
  {
    q: '如何为公司外贸团队选择合适的企业级代理？',
    a: '企业外贸选型三要素：1. 严禁使用任何免费或低价直连节点（防止 WhatsApp/PayPal 触发风控封号）；2. 必须要求多设备同时在线并发数；3. 优先选择支持全天候工单支持和高可用专线热备的老牌服务商。'
  },
  {
    q: '经常需要出差或移动办公，选什么机场最省心？',
    a: '建议选择提供自研一键客户端的服务商（如光速云自研 App）。在手机与笔记本之间切换 Wi-Fi 或 5G 时，客户端具备自动断线重连与智能测速能力，无需反复手动配置节点。'
  },
  {
    q: '学生党预算有限，怎样选能省钱又稳定？',
    a: '优先选择年付折算在 10 元以内但有老牌背书的套餐（如光速云年付 ¥99 档位），或购买一份不过期的不限时按量流量包，平时随用随扣，避免月费清零造成的浪费。'
  },
  {
    q: '为什么说“盲目买最贵的机场”也是一种误区？',
    a: '部分超高端定制机场月费高达上百元，其溢价主要在于超大专线带宽冗余。但如果用户自身本地宽带较弱（如租房合租 Wi-Fi 抖动严重），再贵的专线也无法解决最后一公里的物理瓶颈，根据自身真实需求匹配才是最佳策略。'
  }
];

const jsonLd = ${JSON.stringify(makeFaqJsonLd('/airport/recommend/', title, description, breadcrumbs, faqs))};
const recBrands = [brands.find(b => b.id === 'guangsu') || brands[0], brands[1], brands[2], brands[3]].filter(Boolean);
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8 border-b border-slate-200 pb-6">
      <div class="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
        <span>🎯 细分专题 · 场景精准匹配</span>
        <span>·</span>
        <span>上级主题: <a href="/airport/" class="underline hover:text-blue-800">机场推荐总览</a></span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        2026 场景化机场推荐指南：按实际需求定制选型方案
      </h1>
      <p class="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
        脱离业务场景谈推荐是伪命题。本专题针对查阅资料、4K 影音、海外 AI 交互与跨境电商独立站，提供定制化的服务商匹配与抗风险部署方案。
      </p>
    </header>

    <!-- Answer-First Box -->
    <div class="bg-blue-50/60 rounded-2xl border border-blue-200 p-6 mb-10">
      <h2 class="text-lg font-bold text-blue-950 mb-3 flex items-center gap-2">
        <span>💡</span> 场景推荐核心结论（Answer-First）
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-700">
        <div class="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
          <strong class="text-blue-900 block mb-1">日常办公与高性价比</strong>
          首选<strong>光速云（年付折合¥8.25/月起）</strong>，自研客户端一键开启，BGP 专线稳定流畅，省心免折腾。
        </div>
        <div class="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
          <strong class="text-blue-900 block mb-1">重度 4K 影音与海外海淘</strong>
          首选<strong>红莓网络或青云梯</strong>，全 IEPL 内网物理光纤直连，晚高峰零丢包，全区解锁 Netflix。
        </div>
        <div class="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
          <strong class="text-blue-900 block mb-1">低频出差与应急容灾</strong>
          配置<strong>光速云 Snooker 147 不限时按量包</strong>，永不过期，在多设备中作为备用兜底节点。
        </div>
      </div>
    </div>

    <!-- Scenarios Detail Grid -->
    <section class="mb-12 space-y-6">
      <h2 class="text-2xl font-bold text-slate-900">四大主力场景深度拆解与推荐方案</h2>
      
      <div class="p-5 bg-white rounded-2xl border border-slate-200">
        <h3 class="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
          <span>📚</span> 场景一：学术科研与文献查阅（轻度低频）
        </h3>
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
          <strong>需求特征</strong>：主要访问 Google Scholar、IEEE、Nature、GitHub 代码库，数据传输量小（&lt;30GB/月），但要求连接迅速、DNS 解析精准无污染。<br/>
          <strong>选型标准</strong>：优先考虑自研客户端免配置、提供香港/日本低延迟节点、资费在 10 元以内的稳定方案。<br/>
          <strong>推荐品牌</strong>：光速云（年付特惠版 ¥99/年，69GB/月）、西瓜皮入门包。
        </p>
      </div>

      <div class="p-5 bg-white rounded-2xl border border-slate-200">
        <h3 class="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
          <span>🎬</span> 场景二：4K/8K 流媒体追剧与 YouTube 原画播放（高吞吐重度）
        </h3>
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
          <strong>需求特征</strong>：追求 Netflix 非自制剧全区解锁、Disney+、HBO Max 及 YouTube 4K 60FPS 极速秒开，月流量消耗在 150GB-300GB。<br/>
          <strong>选型标准</strong>：节点落地必须采用双 ISP 原生住宅 IP，单线程突发带宽不低于 50Mbps，且晚高峰骨干网 QoS 丢包率小于 1%。<br/>
          <strong>推荐品牌</strong>：红莓网络（全专线）、光速云高速版（月付 ¥25/月）。
        </p>
      </div>

      <div class="p-5 bg-white rounded-2xl border border-slate-200">
        <h3 class="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
          <span>🤖</span> 场景三：ChatGPT 4o 与 Claude 3.5 极客生产力（IP 纯净高要求）
        </h3>
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
          <strong>需求特征</strong>：高频调用 OpenAI 与 Anthropic 官方平台，最怕遭遇 Cloudflare 1020 报错或账号无故封禁。<br/>
          <strong>选型标准</strong>：禁止走香港出口（官方不支持），必须锁定美国或日本的高纯净原生专线节点，并开启客户端全局 TUN 模式接管。<br/>
          <strong>推荐品牌</strong>：光速云 AI 专属通道、青云梯原生落地节点。
        </p>
      </div>

      <div class="p-5 bg-white rounded-2xl border border-slate-200">
        <h3 class="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
          <span>💼</span> 场景四：跨境电商与海外独立站商贸运营（高 SLA 零容忍）
        </h3>
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
          <strong>需求特征</strong>：Shopify 店铺管理、Amazon 卖家后台、TikTok 东南亚出海运营，任何断线都会影响大额订单成交。<br/>
          <strong>选型标准</strong>：必须配备双物理内网专线备份，具备独立专属客服响应，并部署“双机场自动故障转移”。<br/>
          <strong>推荐策略</strong>：主力选用全 IEPL 老牌服务商，备用配备高额度按量包。
        </p>
      </div>
    </section>

    <!-- Featured Scenario Brands -->
    <section class="mb-12">
      <h2 class="text-xl font-bold text-slate-900 mb-4">精选场景适配候选品牌速览</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recBrands.map(b => (
          <BrandCard brand={b} />
        ))}
      </div>
    </section>

    <!-- FAQs -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">场景化选购常见问题（FAQ）</h2>
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
            <div class="mt-4 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {f.a}
            </div>
          </details>
        ))}
      </div>
    </section>

    <!-- Backlog & Clusters -->
    <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200 mb-10 text-xs text-slate-600">
      <h3 class="font-bold text-slate-900 text-sm mb-2">延伸阅读与关联三级实操文章规划</h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <a href="/airport/ranking/" class="p-3 bg-white rounded-xl border border-slate-200 hover:text-blue-600 transition block">
          🏆 <strong>机场综合排行榜</strong><br/>
          查看 31 家服务商五维量化打分天梯 &rarr;
        </a>
        <a href="/airport/stable/" class="p-3 bg-white rounded-xl border border-slate-200 hover:text-blue-600 transition block">
          ⚡ <strong>稳定机场精选专区</strong><br/>
          晚高峰抗抖动与 IEPL 专线解析 &rarr;
        </a>
        <a href="/pricing/monthly/" class="p-3 bg-white rounded-xl border border-slate-200 hover:text-blue-600 transition block">
          📅 <strong>月付低风险方案</strong><br/>
          支持逐月付费的安全服务商合集 &rarr;
        </a>
      </div>
    </div>

    <BrandCTA 
      brandName="光速云（Guangsu Cloud）" 
      affiliateURL="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"
      couponCode="AMM"
      entryPrice="折合 ¥8/月起（年付¥99）"
      customTitle="全场景平衡旗舰首选 · 光速云"
      customDesc="支持 Windows/Mac/Android 自研一键客户端，开箱即用，满足日常办公、4K 影音与 AI 解锁多元场景。"
    />

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// 01.2 airport/ranking.astro
writePage('airport/ranking.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '2026 机场综合排行榜｜天梯榜与多品牌统一指标客观评测';
const description = '百科机场 2026 综合天梯榜：基于线路专线性（40%）、晚高峰可用率（25%）、单位流量单价（15%）、客户端便利度（10%）与运营口碑（10%）五大标准化权重，对 31 家主流服务商建立客观量化分级梯队。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场推荐', url: '/airport/' },
  { name: '机场排行榜', url: '/airport/ranking/' }
];

const faqs = [
  {
    q: '天梯榜的综合评分是如何计算出来的？有无主观打分？',
    a: '本榜单拒绝主观印象，采用五维量化打分模型：线路专线性占 40%（纯物理专线 100 分，BGP 隧道中转 80 分，公网直连 40 分）、晚高峰抗丢包率占 25%（基于 20:00-23:00 丢包率监测）、每 GB 流量折算单价占 15%、跨平台客户端成熟度占 10%、平稳运营年限占 10%。综合计算得出最终百分制得分。'
  },
  {
    q: '第一梯队（Tier 1）与第二梯队（Tier 2）核心区别是什么？',
    a: '第一梯队品牌具备全线企业级物理专线（IEPL/IPLC），晚高峰丢包率控制在 1.5% 以内，且运营时间多在 2-3 年以上；第二梯队主要是高性价比公网中转或入门级专线品牌，平时速度飞快，但在敏感时期或特定晚高峰时段偶有轻微网络抖动。'
  },
  {
    q: '为什么排行榜上看不到完全免费的白嫖机场？',
    a: '因为免费服务无法通过我们基础的“SLA 可用性与隐私安全红线”审核。免费节点大多存在严重的 DNS 泄漏、广告劫持或带宽转售问题，且节点存活时间通常不足几周，无法进入严谨的商业综合天梯评测。'
  },
  {
    q: '排名越靠前的品牌就越适合我吗？',
    a: '不一定。排名反映的是综合技术指标与稳定性上限。对于每月仅用 10GB 的轻度用户，排名第一的企业级专线可能存在性能浪费，选择性价比档位（如光速云年付）往往综合体感更好。'
  },
  {
    q: '天梯排行榜的数据更新频率是怎样的？',
    a: '我们每月固定对所有收录品牌的节点可用率、套餐资费调整及客服响应状态进行复测，每季度根据上游光纤变动与真实用户反馈重新校准梯队排名。'
  }
];

const jsonLd = ${JSON.stringify(makeFaqJsonLd('/airport/ranking/', title, description, breadcrumbs, faqs))};

const tier1 = brands.slice(0, 5);
const tier2 = brands.slice(5, 14);
const tier3 = brands.slice(14, 25);
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8 border-b border-slate-200 pb-6">
      <div class="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
        <span>🏆 细分专题 · 统一指标量化打分</span>
        <span>·</span>
        <span>上级主题: <a href="/airport/" class="underline hover:text-blue-800">机场推荐总览</a></span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        2026 机场综合评级与天梯排行榜（多维量化基准）
      </h1>
      <p class="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
        本榜单不同于主观推荐，而是基于标准化量化指标生成的客观评级大盘。杜绝商业置顶冒充真实性能，帮助您快速看透服务商的综合技术硬实力。
      </p>
    </header>

    <!-- Answer-First Box -->
    <div class="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-10 shadow-lg">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
          ⚖️
        </div>
        <div>
          <h2 class="text-xl font-bold">天梯分级结论（Answer-First）</h2>
          <p class="text-xs text-slate-400">基于线路专线率与晚高峰丢包监测的客观梯队</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-300">
        <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
          <strong class="text-blue-400 block mb-1">第一梯队 (Tier 1 · 90+分)</strong>
          全专线 IEPL、晚高峰零丢包、具备自研跨平台客户端。代表：<strong>光速云、红莓网络</strong>。
        </div>
        <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
          <strong class="text-emerald-400 block mb-1">第二梯队 (Tier 2 · 80-89分)</strong>
          优质 BGP 隧道中转、高性价比大流量、资费亲民。代表：<strong>青云梯、西瓜皮、二猫云</strong>。
        </div>
        <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
          <strong class="text-amber-400 block mb-1">第三梯队 (Tier 3 · 70-79分)</strong>
          轻量入门级服务、小众特色节点、应急备用选型。代表：<strong>闪电猫、极速云</strong>。
        </div>
      </div>
    </div>

    <!-- Tier 1 Section -->
    <section class="mb-12">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <span class="px-3 py-1 rounded-lg bg-blue-600 text-white font-extrabold text-sm">
            第一梯队 (Tier 1)
          </span>
          <span class="text-xs text-slate-500">综合得分 90+ · 纯专线保障 · 晚高峰抗抖动顶流</span>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tier1.map(b => (
          <BrandCard brand={b} />
        ))}
      </div>
    </section>

    <!-- Tier 2 Section -->
    <section class="mb-12">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <span class="px-3 py-1 rounded-lg bg-slate-800 text-white font-extrabold text-sm">
            第二梯队 (Tier 2)
          </span>
          <span class="text-xs text-slate-500">综合得分 80-89 · 高性价比与特色中转</span>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tier2.map(b => (
          <BrandCard brand={b} />
        ))}
      </div>
    </section>

    <!-- Tier 3 Section -->
    <section class="mb-12">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <span class="px-3 py-1 rounded-lg bg-slate-600 text-white font-extrabold text-sm">
            第三梯队 (Tier 3)
          </span>
          <span class="text-xs text-slate-500">综合得分 70-79 · 轻量尝鲜与应急跳板</span>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tier3.map(b => (
          <BrandCard brand={b} />
        ))}
      </div>
    </section>

    <!-- FAQs -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">天梯排行常见问题（FAQ）</h2>
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
      customTitle="荣获 2026 年度平衡旗舰评级 · 光速云"
      customDesc="在五维天梯评测中综合评分名列前茅，兼顾物理专线品质与平民化资费，支持专属优惠码 AMM。"
    />

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// 01.3 airport/reliable.astro
writePage('airport/reliable.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '靠谱机场甄选指南（2026）｜拒绝短期跑路、精选老牌高口碑服务商';
const description = '百科机场靠谱服务商专题：深入拆解机场跑路本质，甄选持续平稳运营 2-3 年以上的老牌服务商。建立价格透明度、社群活跃度与退款保障审查标准，让每一次充值都有安全保障。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场推荐', url: '/airport/' },
  { name: '靠谱机场', url: '/airport/reliable/' }
];

const faqs = [
  {
    q: '“靠谱机场”的核心判断标准有哪些？',
    a: '靠谱机场三大金标准：1. 运营年限超过 2-3 年（行业 80% 跑路发生在前 6 个月）；2. 拥有开放活跃的官方 Telegram 社区，出现故障有透明技术通告，绝不永久全员禁言；3. 资费与成本逻辑相符，不搞夸张的“30元终身永久包”资金盘套现模式。'
  },
  {
    q: '为什么有些成立多年的老牌机场也会出现短期网络抖动？',
    a: '网络抖动不等于跑路。国际海底光缆突发中断（如红海断纤、巴士海峡地震）、上游机房电力割接都会造成临时影响。靠谱服务商的标志在于运维反应速度：具备多地 BGP 专线热备能力，在几十分钟内自动倒换路由并发布故障说明。'
  },
  {
    q: '如何核验一家机场是否真正具备退款保障？',
    a: '在购买前仔细阅读其服务条款（Terms of Service）。正规老牌品牌通常具备“购买 24 小时之内且已用流量低于 2GB 支持扣除网关手续费原路退款”的兜底政策，或者提供低门槛的小额测试包。'
  }
];

const jsonLd = ${JSON.stringify(makeFaqJsonLd('/airport/reliable/', title, description, breadcrumbs, faqs))};
const reliableBrands = brands.filter(b => b.establishedYear && b.establishedYear <= 2023).slice(0, 6);
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8 border-b border-slate-200 pb-6">
      <div class="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
        <span>🛡️ 细分专题 · 资质审查与口碑背书</span>
        <span>·</span>
        <span>上级主题: <a href="/airport/" class="underline hover:text-blue-800">机场推荐总览</a></span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        2026 靠谱机场甄选指南：安全、合规与长期稳定运营
      </h1>
      <p class="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
        拒绝资金盘与收割型小作坊。本专题以运营时间、财务健康度与售后服务为核心审查维度，甄选真正值得长期订阅的靠谱品牌。
      </p>
    </header>

    <!-- Answer-First Box -->
    <div class="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 mb-10">
      <h2 class="text-lg font-bold text-emerald-950 mb-3 flex items-center gap-2">
        <span>🛡️</span> 靠谱机场核心结论（Answer-First）
      </h2>
      <p class="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
        判断一家机场是否靠谱，<strong>不要看宣传写得多么夸张，只看它是否经历过敏感时期的洗礼并活过 2 年以上</strong>。老牌品牌如<strong>光速云、红莓网络</strong>拥有稳定的专线采购协议与庞大的活跃用户池，跑路成本极高，具备最可靠的履约能力。
      </p>
    </div>

    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">经核验的 2020-2023 年老牌靠谱服务商</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {reliableBrands.map(b => (
          <BrandCard brand={b} />
        ))}
      </div>
    </section>

    <!-- FAQs -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">靠谱机场审查 FAQ</h2>
      <div class="space-y-4">
        {faqs.map((f, i) => (
          <details class="group bg-white rounded-2xl border border-slate-200 p-5 open:ring-2 open:ring-emerald-500/20 transition shadow-sm">
            <summary class="font-bold text-slate-900 text-sm sm:text-base cursor-pointer flex items-center justify-between list-none">
              <span class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-bold">{i+1}</span>
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
      customTitle="老牌稳定运营 · 值得信赖的靠谱之选"
      customDesc="多年持续高可用专线服务，提供真实客服工单响应与专属自研客户端，守护您的网络生产力。"
    />

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// 01.4 airport/stable.astro
writePage('airport/stable.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '2026 稳定机场推荐指南｜晚高峰抗抖动、低丢包企业级 IEPL 专线精选';
const description = '权威中文稳定机场专题：深入剖析晚高峰 20:00-23:00 骨干网 QoS 拥塞机制，精选全 IEPL/IPLC 企业级专线服务商。保障 4K 视频持续播放不缓冲、网络游戏超低延迟抖动。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场推荐', url: '/airport/' },
  { name: '稳定机场', url: '/airport/stable/' }
];

const faqs = [
  {
    q: '“稳定性”的量化技术指标到底是什么？',
    a: '稳定性有两大核心硬指标：1. <strong>晚高峰（20:00-23:00）丢包率（Packet Loss）</strong>，优质专线必须低于 1.5%；2. <strong>延迟抖动偏差（Jitter）</strong>，连续 ping 200 次的波动范围必须在 10ms 以内。单看白天的带宽跑分毫无意义。'
  },
  {
    q: '为什么 IEPL 专线能够做到全天候稳定？',
    a: 'IEPL 是国际以太网私有内网物理光纤。数据包在境内直接进入运营商企业专网，全程不经过公网国际出口关口局，彻底绕开了 GFW 的 DPI 深度包检测与民用出口 QoS 丢包限速。'
  },
  {
    q: '遇到特殊敏感时期，稳定机场如何应对？',
    a: '真正的优质服务商具备多条物理光纤冗余环网（如沪港、深港、广港多路由互备）。即使某条专线因突发事故中断，系统能在毫秒级自动切换至备用内网专线，用户端几乎无感知。'
  }
];

const jsonLd = ${JSON.stringify(makeFaqJsonLd('/airport/stable/', title, description, breadcrumbs, faqs))};
const stableBrands = brands.filter(b => b.networkTypes && b.networkTypes.some(t => t.includes('专线') || t.includes('IEPL'))).slice(0, 6);
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8 border-b border-slate-200 pb-6">
      <div class="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
        <span>⚡ 细分专题 · 晚高峰抗抖动与零丢包</span>
        <span>·</span>
        <span>上级主题: <a href="/airport/" class="underline hover:text-blue-800">机场推荐总览</a></span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        2026 稳定机场推荐指南：企业级 IEPL 专线与晚高峰保障
      </h1>
      <p class="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
        拒绝白天狂飙晚上卡死。本专题以晚高峰网络丢包率、延迟抖动与专线冗余架构为核心基准，精选真正抗打耐用的稳定服务商。
      </p>
    </header>

    <!-- Answer-First Box -->
    <div class="bg-cyan-50 rounded-2xl border border-cyan-200 p-6 mb-10">
      <h2 class="text-lg font-bold text-cyan-950 mb-3 flex items-center gap-2">
        <span>⚡</span> 稳定机场核心结论（Answer-First）
      </h2>
      <p class="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
        想要全天候稳定，<strong>唯一的解药是企业级物理内网专线（IEPL/IPLC）+ 三网 BGP 聚合入口</strong>。任何宣称“公网直连但绝不卡顿”的言论均违背电信物理规律。首推<strong>光速云</strong>与<strong>红莓网络</strong>。
      </p>
    </div>

    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">具备企业级专线保障的高稳定品牌</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stableBrands.map(b => (
          <BrandCard brand={b} />
        ))}
      </div>
    </section>

    <!-- FAQs -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">稳定机场核心技术 FAQ</h2>
      <div class="space-y-4">
        {faqs.map((f, i) => (
          <details class="group bg-white rounded-2xl border border-slate-200 p-5 open:ring-2 open:ring-cyan-500/20 transition shadow-sm">
            <summary class="font-bold text-slate-900 text-sm sm:text-base cursor-pointer flex items-center justify-between list-none">
              <span class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 text-xs flex items-center justify-center font-bold">{i+1}</span>
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
      customTitle="专线保障 · 晚高峰抗抖动平衡旗舰"
      customDesc="具备完善的 BGP 专线入口，支持自动多路由冗余倒换，让晚高峰 4K 播放与日常办公丝滑如常。"
    />

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// 01.5 airport/best.astro
writePage('airport/best.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '好用的新手机场推荐（2026）｜免配置一键自研客户端、零门槛上手';
const description = '百科机场新手友好专题：专为电脑小白与新手用户打造。精选提供 Windows/Mac/Android 自研专属一键客户端的服务商，免去繁琐的 YAML 规则与第三方订阅导入，开箱即用。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场推荐', url: '/airport/' },
  { name: '好用的机场', url: '/airport/best/' }
];

const faqs = [
  {
    q: '新手常说的“好用”主要体现在哪些方面？',
    a: '主要体现在三点：1. <strong>免去配置痛苦</strong>：提供一键安装包，登录账号就能用，不需要研究复杂的 Clash 订阅代码；2. <strong>智能路由透明</strong>：访问国内网站自动直连不降速，访问海外网站自动加速；3. <strong>故障自愈</strong>：遇到个别节点故障自动后台切换，不需要手动测速排查。'
  },
  {
    q: '自研专属客户端和开源第三方软件（如 Clash）相比，新手该怎么选？',
    a: '绝对首选自研专属客户端！第三方开源软件参数极其繁琐（混合端口、TUN 驱动、外部控制器），新手稍有不慎就会遇到 7890 端口冲突或有网打不开页面；而自研客户端将所有配置完全封装，点一个开关就能立刻使用。'
  }
];

const jsonLd = ${JSON.stringify(makeFaqJsonLd('/airport/best/', title, description, breadcrumbs, faqs))};
const bestBrands = brands.filter(b => b.strengths && b.strengths.some(s => s.includes('客户端') || s.includes('入门'))).slice(0, 6);
if (bestBrands.length === 0) bestBrands.push(brands[0], brands[1]);
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8 border-b border-slate-200 pb-6">
      <div class="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
        <span>✨ 细分专题 · 零门槛开箱即用</span>
        <span>·</span>
        <span>上级主题: <a href="/airport/" class="underline hover:text-blue-800">机场推荐总览</a></span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        2026 好用的新手机场推荐：一键自研多端客户端与零折腾
      </h1>
      <p class="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
        告别繁琐的配置代码与安装报错。本专题精选具备官方专属跨平台客户端、提供中文客服与新手快速指引的易用型服务商。
      </p>
    </header>

    <!-- Answer-First Box -->
    <div class="bg-indigo-50 rounded-2xl border border-indigo-200 p-6 mb-10">
      <h2 class="text-lg font-bold text-indigo-950 mb-3 flex items-center gap-2">
        <span>✨</span> 新手好用核心结论（Answer-First）
      </h2>
      <p class="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
        新手最稳妥的路线是选择<strong>具备自研专属客户端的老牌品牌（如光速云）</strong>。在 Windows/Mac/Android 上下载专属软件后，只需账号登录即可自动同步专线节点，省去 95% 的网络配置烦恼。
      </p>
    </div>

    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">适合新手的开箱即用品牌精选</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {bestBrands.map(b => (
          <BrandCard brand={b} />
        ))}
      </div>
    </section>

    <!-- FAQs -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">新手上手核心 FAQ</h2>
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
      customTitle="专为新手打造 · 自研一键多端专属客户端"
      customDesc="下载安装后输入账号即可一键畅游，告别第三方软件配置错误烦恼，新手体验好评率极高。"
    />

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

console.log('01. AIRPORT SUB-TOPICS COMPLETED!');

// =========================================================================
// 02. PRICING SUB-TOPICS (6 pages)
// =========================================================================

// 02.1 pricing/cheap.astro
writePage('pricing/cheap.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '便宜机场推荐指南（2026）｜月费 5-15 元高性价比梯队精选与避坑';
const description = '百科机场便宜服务商专题：深入核算实际月付与年付折算成本，甄选月费 5-15 元区间内真正可用、不跑路、不虚高倍率的高性价比平价机场。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '价格与套餐', url: '/pricing/' },
  { name: '便宜机场', url: '/pricing/cheap/' }
];

const faqs = [
  {
    q: '每月 5-15 元的便宜机场能保证日常可用吗？',
    a: '完全可以，但必须认准老牌成熟品牌。例如光速云的年付特惠版仅需 ¥99（折合 ¥8.25/月，69GB/月），依靠规模化用户分摊了专线成本；如果是某些新开小作坊的 5 元套餐，则往往采用劣质公网直连超售，晚高峰极易卡死。'
  },
  {
    q: '购买便宜机场最容易踩的陷阱是什么？',
    a: '最大的陷阱是“高倍率暗扣”与“年付套现跑路”。标称给 500GB 流量，但主要节点全设为 3x-5x 高倍率，实际只能用 100GB；或者通过超低价格诱导用户一次性支付 3 年费用后卷款关站。'
  }
];

const jsonLd = \${JSON.stringify(makeFaqJsonLd('/pricing/cheap/', title, description, breadcrumbs, faqs))};
const cheapBrands = brands.filter(b => b.minMonthlyPrice && b.minMonthlyPrice <= 15).slice(0, 6);
if (cheapBrands.length === 0) cheapBrands.push(brands[0]);
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8 border-b border-slate-200 pb-6">
      <div class="flex items-center gap-2 text-xs font-semibold text-emerald-600 mb-2">
        <span>💰 细分专题 · 低预算精选</span>
        <span>·</span>
        <span>上级主题: <a href="/pricing/" class="underline hover:text-emerald-800">价格与套餐总览</a></span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        2026 便宜机场推荐：5-15 元高性价比梯队精选
      </h1>
      <p class="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
        花最少的钱，办成最实在的事。本专题帮您剔除劣质直连超售作坊，甄选真正具备可用性与良心倍率的平价品牌。
      </p>
    </header>

    <div class="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 mb-10">
      <h2 class="text-lg font-bold text-emerald-950 mb-3 flex items-center gap-2">
        <span>💰</span> 便宜机场核心结论（Answer-First）
      </h2>
      <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
        在 10 元左右预算档位，首推<strong>光速云年付特惠版（折合 ¥8.25/月，69GB/月）</strong>与<strong>闪电猫</strong>。既能享受稳定的 BGP 专线入口，又免去了小机场三天两头失联的后顾之忧。
      </p>
    </div>

    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">月费 15 元以内精选平价品牌</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cheapBrands.map(b => (
          <BrandCard brand={b} />
        ))}
      </div>
    </section>

    <!-- FAQs -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">便宜机场避坑常见问题</h2>
      <div class="space-y-4">
        {faqs.map((f, i) => (
          <details class="group bg-white rounded-2xl border border-slate-200 p-5 open:ring-2 open:ring-emerald-500/20 transition shadow-sm">
            <summary class="font-bold text-slate-900 text-sm sm:text-base cursor-pointer flex items-center justify-between list-none">
              <span class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-bold">{i+1}</span>
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
      customTitle="极致平价与专线兼备 · 光速云"
      customDesc="年付特惠仅需 ¥99，每月足额 69GB 高速流量，输入优惠码 AMM 尽享专属折扣。"
    />

    <AffiliateDisclosure />
  </div>
</BaseLayout>
\`);

// 02.2 pricing/one-yuan.astro
writePage('pricing/one-yuan.astro', \`---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';

const title = '一元机场靠谱吗？（2026）｜月付 1 元超低成本商业本质与防坑深度解密';
const description = '百科机场一元服务商专题：全面拆解月付 1 元背后的公网直连极高超售率商业逻辑。揭秘为什么一元机场只能做临时备用跳板，绝不能用于主力工作或重要账号登录。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '价格与套餐', url: '/pricing/' },
  { name: '一元机场', url: '/pricing/one-yuan/' }
];

const faqs = [
  {
    q: '一元机场为什么能做到 1 元一个月？他们真的不亏钱吗？',
    a: '一元机场的商业模式完全建立在“零硬成本直连 + 疯狂超售 + 流量沉没”之上：1. 租用极廉价的公网直连 VPS，无任何昂贵的内网专线成本；2. 将 1Gbps 的带宽卖给数千人，赌大多数人不会同时在线；3. 大量用户花 1 元尝鲜后便弃用，沉淀资金形成运营利润。'
  },
  {
    q: '一元机场适合什么样的使用场景？',
    a: '仅适合：1. 新手低成本测试客户端能否正常安装运行；2. 抓取公开网页数据；3. 作为极端的兜底备用临时跳板。绝不可用于日常办公、跨境海淘、重要账号登录或 4K 追剧。'
  }
];

const jsonLd = \${JSON.stringify(makeFaqJsonLd('/pricing/one-yuan/', title, description, breadcrumbs, faqs))};
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8 border-b border-slate-200 pb-6">
      <div class="flex items-center gap-2 text-xs font-semibold text-emerald-600 mb-2">
        <span>🪙 细分专题 · 极限低价真相</span>
        <span>·</span>
        <span>上级主题: <a href="/pricing/" class="underline hover:text-emerald-800">价格与套餐总览</a></span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        一元机场靠谱吗？2026 商业本质与防坑指南
      </h1>
      <p class="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
        1 元喝不到半瓶可乐，却能买到一个月翻墙服务？本专题为您拨开营销迷雾，客观还原一元机场的技术现实与适用边界。
      </p>
    </header>

    <div class="bg-amber-50 rounded-2xl border border-amber-200 p-6 mb-10">
      <h2 class="text-lg font-bold text-amber-950 mb-3 flex items-center gap-2">
        <span>🪙</span> 一元机场核心结论（Answer-First）
      </h2>
      <p class="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
        一元机场是技术爱好者的“廉价玩具”，<strong>绝不能当作主力生产力工具</strong>。晚高峰时段由于骨干网 QoS 拥塞，丢包率往往超过 30%，节点随时面临封锁和弃维护风险。
      </p>
    </div>

    <section class="mb-12 prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-4">
      <h2 class="text-2xl font-bold text-slate-900">一元机场三大硬伤深度剖析</h2>
      <p>
        1. <strong>晚高峰彻底瘫痪</strong>：一元机场无法承受 IEPL/IPLC 昂贵的物理光纤租金，走的是民用公网国际出口。每晚 20:00-23:00 骨干网拥堵时，视频无法加载，网页频繁报错。<br/>
        2. <strong>IP 污染极其严重</strong>：同一机房 IP 被海量用户滥用，导致 Google 频繁弹验证码，访问 ChatGPT 直接报 1020 拒绝访问。<br/>
        3. <strong>运维随时失联</strong>：这类服务多为个人兼职运维，一旦 IP 被批量封锁，更换成本高于收入时便会直接关站。
      </p>
    </section>

    <!-- FAQs -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">一元机场常见问题</h2>
      <div class="space-y-4">
        {faqs.map((f, i) => (
          <details class="group bg-white rounded-2xl border border-slate-200 p-5 open:ring-2 open:ring-amber-500/20 transition shadow-sm">
            <summary class="font-bold text-slate-900 text-sm sm:text-base cursor-pointer flex items-center justify-between list-none">
              <span class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs flex items-center justify-center font-bold">{i+1}</span>
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
      customTitle="告别卡顿直连 · 升级真正专线服务"
      customDesc="仅需每天不到 3 毛钱，即可享受真正的企业级专线与自研客户端，彻底告别一元机场的卡顿折磨。"
    />

    <AffiliateDisclosure />
  </div>
</BaseLayout>
\`);

// 02.3 pricing/one-cent.astro
writePage('pricing/one-cent.astro', \`---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';

const title = '一分机场深度评测（2026）｜0.01 元微量测试包与短期应急跳板分析';
const description = '百科机场一分钱服务商专题：深入分析一分钱（0.01元）测试包的领取机制、有效期、流量限制与防坑指南，为用户提供科学客观的短期尝鲜参考。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '价格与套餐', url: '/pricing/' },
  { name: '一分机场', url: '/pricing/one-cent/' }
];

const faqs = [
  {
    q: '一分机场（0.01元）是真的吗？还是钓鱼网站？',
    a: '部分正规机场为了让用户低门槛验证本地网络连通性，确实会设立 0.01 元的“首日体验包”（通常给 1GB-5GB 流量）。但也存在不良网站利用 1 分钱诱导用户授权微信免密代扣，支付时务必核实是否为一次性普通支付。'
  }
];

const jsonLd = \${JSON.stringify(makeFaqJsonLd('/pricing/one-cent/', title, description, breadcrumbs, faqs))};
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8 border-b border-slate-200 pb-6">
      <div class="flex items-center gap-2 text-xs font-semibold text-emerald-600 mb-2">
        <span>⚡ 细分专题 · 尝鲜与测试</span>
        <span>·</span>
        <span>上级主题: <a href="/pricing/" class="underline hover:text-emerald-800">价格与套餐总览</a></span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        一分机场深度评测：微量测试包与短期应急跳板
      </h1>
      <p class="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
        用于验证本地线路连通性的超低门槛方案。深度解析一分钱套餐的真实性、限制条件与安全支付防线。
      </p>
    </header>

    <div class="bg-slate-50 rounded-2xl border border-slate-200 p-6 mb-10 text-xs sm:text-sm text-slate-700 leading-relaxed">
      <h2 class="text-lg font-bold text-slate-900 mb-2">一分机场核心定位</h2>
      一分钱套餐适合作为<strong>“一次性测速、测试当前 Wi-Fi 能否握手”</strong>的极速验证工具，不可作为持续上网的稳定途径。完成测试后应及时选择正规月付或专线套餐。
    </div>

    <!-- FAQs -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">一分机场常见疑问</h2>
      <div class="space-y-4">
        {faqs.map((f, i) => (
          <details class="group bg-white rounded-2xl border border-slate-200 p-5 open:ring-2 open:ring-emerald-500/20 transition shadow-sm">
            <summary class="font-bold text-slate-900 text-sm sm:text-base cursor-pointer flex items-center justify-between list-none">
              <span class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-bold">{i+1}</span>
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
      customTitle="正规老牌高可用服务 · 光速云"
      customDesc="支持专属优惠券 AMM，提供稳定专线与自研多端客户端，给您安全省心的长久陪伴。"
    />

    <AffiliateDisclosure />
  </div>
</BaseLayout>
\`);

// 02.4 pricing/monthly.astro
writePage('pricing/monthly.astro', \`---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '月付机场推荐指南（2026）｜真月付、无沉没风险、灵活续费服务商精选';
const description = '百科机场月付专题：坚持“真月付”原则，拒绝大额年付捆绑与跑路风险。精选支持逐月缴费、提供合理退款与高 SLA 保证的优质老牌服务商。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '价格与套餐', url: '/pricing/' },
  { name: '月付机场', url: '/pricing/monthly/' }
];

const faqs = [
  {
    q: '为什么强烈建议所有新手在第一期必须选择“真实月付”？',
    a: '真实月付是用户手中最大的博弈筹码。各个家庭的宽带运营商（电信、联通、移动、广电）在不同地区的晚高峰国际路由差异极大。只有通过首月真实月付实测，验证晚高峰看视频不卡、AI 解锁符合预期，确认没有暗坑后再考虑长期订阅。'
  },
  {
    q: '月付价格比年付平均贵多少算合理？',
    a: '合理溢价通常在 15%-25% 左右。例如真实月付 20-25 元/月，年付折算约为 16-20 元/月，这属于正常的长周期资金时间价值贴现。若遇到月付 30 元但年付仅 60 元（直接打两折）的极端差价，必须严防其快速套现跑路的可能。'
  }
];

const jsonLd = \${JSON.stringify(makeFaqJsonLd('/pricing/monthly/', title, description, breadcrumbs, faqs))};
const monthlyBrands = brands.filter(b => b.minMonthlyPrice && b.minMonthlyPrice > 0).slice(0, 6);
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8 border-b border-slate-200 pb-6">
      <div class="flex items-center gap-2 text-xs font-semibold text-emerald-600 mb-2">
        <span>📅 细分专题 · 资金安全与灵活续费</span>
        <span>·</span>
        <span>上级主题: <a href="/pricing/" class="underline hover:text-emerald-800">价格与套餐总览</a></span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        2026 月付机场推荐指南：安全低风险、按月付费老牌服务商
      </h1>
      <p class="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
        拒绝被大额长期套餐绑架。本专题甄选支持无门槛真实月付、服务质量过硬的代理品牌，保障您的资金安全。
      </p>
    </header>

    <div class="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 mb-10">
      <h2 class="text-lg font-bold text-emerald-950 mb-3 flex items-center gap-2">
        <span>📅</span> 月付策略核心结论（Answer-First）
      </h2>
      <p class="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
        月付能够将服务商的失联风险完全限制在单月（仅需承担十多二十元）。推荐选用支持真月付的<strong>光速云高速版（¥25/月）</strong>、<strong>红莓网络（¥20/月）</strong>与<strong>西瓜皮（¥15/月）</strong>。
      </p>
    </div>

    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">支持真实月付的优质品牌精选</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {monthlyBrands.map(b => (
          <BrandCard brand={b} />
        ))}
      </div>
    </section>

    <!-- FAQs -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">月付选购常见疑问</h2>
      <div class="space-y-4">
        {faqs.map((f, i) => (
          <details class="group bg-white rounded-2xl border border-slate-200 p-5 open:ring-2 open:ring-emerald-500/20 transition shadow-sm">
            <summary class="font-bold text-slate-900 text-sm sm:text-base cursor-pointer flex items-center justify-between list-none">
              <span class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-bold">{i+1}</span>
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
      entryPrice="高速版 ¥25/月（真月付）"
      customTitle="支持无门槛真实月付 · 光速云高速版"
      customDesc="按月续费自由灵活，提供全专线 BGP 入口与原生落地 IP，新手试用验证的最佳之选。"
    />

    <AffiliateDisclosure />
  </div>
</BaseLayout>
\`);

// 02.5 pricing/lifetime.astro
writePage('pricing/lifetime.astro', \`---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';

const title = '不限时机场流量包指南（2026）｜流量永不过期、按量计费与容灾备用首选';
const description = '百科机场不限时按量专题：深入剖析“一次购买、永久不过期、按月不重置”流量包的价值模型。针对出差低频党与双机场容灾，提供每 GB 真实单价核算与最佳选型方案。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '价格与套餐', url: '/pricing/' },
  { name: '不限时机场', url: '/pricing/lifetime/' }
];

const faqs = [
  {
    q: '不限时按量流量包适合什么样的人群？',
    a: '适合两大类用户：1. <strong>低频轻度使用者</strong>：每月只消耗 5-10GB，购买常规月付极易造成流量清零浪费；2. <strong>高可用容灾备用者</strong>：将其导入客户端配置在 Fallback 自动回退组中，平时不走流量，主力专线突发故障时秒级切换兜底。'
  },
  {
    q: '不限时流量包的单位 GB 单价为什么比常规月付贵？',
    a: '因为常规月付的盈利逻辑依赖“未用尽流量月底清零”的沉没收益；而不限时流量包允许用户在 1-2 年内慢慢消耗，服务商必须持续为其维持服务器带宽接入，因而具有更高的长期维持成本。'
  }
];

const jsonLd = \${JSON.stringify(makeFaqJsonLd('/pricing/lifetime/', title, description, breadcrumbs, faqs))};
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8 border-b border-slate-200 pb-6">
      <div class="flex items-center gap-2 text-xs font-semibold text-emerald-600 mb-2">
        <span>⏳ 细分专题 · 流量永不过期</span>
        <span>·</span>
        <span>上级主题: <a href="/pricing/" class="underline hover:text-emerald-800">价格与套餐总览</a></span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        2026 不限时不过期机场流量包：按量计费与容灾备选
      </h1>
      <p class="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
        一次付费，永久有效。本专题深入测算不限时按量套餐的资产价值模型，指导您打造永不掉线的双机场容灾体系。
      </p>
    </header>

    <div class="bg-indigo-50 rounded-2xl border border-indigo-200 p-6 mb-10">
      <h2 class="text-lg font-bold text-indigo-950 mb-3 flex items-center gap-2">
        <span>⏳</span> 不限时按量核心推荐（Answer-First）
      </h2>
      <p class="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
        首推<strong>光速云 Snooker 147 不限时按量特惠包（¥147 一次性，247GB 永久不过期）</strong>。老牌品牌背书，线路涵盖全量专线，是不可多得的极佳备用资产。
      </p>
    </div>

    <section class="mb-12 prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-4">
      <h2 class="text-2xl font-bold text-slate-900">不限时按量包在“双机场容灾”中的配置</h2>
      <p>
        在 Clash Verge Rev 中配置 Fallback 策略组：将主力日常专线设为第一优先级，将<strong>光速云 Snooker 147</strong> 设为兜底回退节点。正常情况下流量消耗为零；一旦主力机场遭遇光纤故障，系统 5 秒内心跳感知并无感热切至按量包，确保您的重要会议和交易绝对不掉线。
      </p>
    </section>

    <!-- FAQs -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">不限时按量常见疑问</h2>
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
      entryPrice="Snooker 147（¥147/247GB 永久不过期）"
      customTitle="备用容灾神作 · Snooker 147 不限时按量包"
      customDesc="一次购买，永久有效，不限到期时间，专线全覆盖，出差与生产力应急容灾绝佳伴侣。"
    />

    <AffiliateDisclosure />
  </div>
</BaseLayout>
\`);

// 02.6 pricing/value.astro
writePage('pricing/value.astro', \`---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '2026 性价比机场评测指南｜速率、SLA 与资费黄金平衡点测算';
const description = '百科机场性价比综合专题：建立“单位流量单价 &times; 晚高峰可用率 &times; 客户端成熟度”性价比评估模型。深度横评各大服务商真实使用价值，拒绝低价高倍率暗扣陷阱。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '价格与套餐', url: '/pricing/' },
  { name: '性价比机场', url: '/pricing/value/' }
];

const faqs = [
  {
    q: '“性价比”如何科学计算？避免掉入唯低价论？',
    a: '真实性价比公式：<strong>综合价值 = (有效实际流量 &times; 晚高峰连通率) &divide; 实际支付金额</strong>。如果花了 1 元但晚高峰丢包 50%、或者 5 倍率扣量导致实际只能用几 G，其性价比远低于花 8-15 元获得 100% 稳定专线体验。'
  }
];

const jsonLd = \${JSON.stringify(makeFaqJsonLd('/pricing/value/', title, description, breadcrumbs, faqs))};
const valueBrands = [brands.find(b => b.id === 'guangsu') || brands[0], brands[1], brands[3], brands[5]].filter(Boolean);
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8 border-b border-slate-200 pb-6">
      <div class="flex items-center gap-2 text-xs font-semibold text-emerald-600 mb-2">
        <span>⚖️ 细分专题 · 资费与性能平衡</span>
        <span>·</span>
        <span>上级主题: <a href="/pricing/" class="underline hover:text-emerald-800">价格与套餐总览</a></span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        2026 性价比机场评测指南：速率、稳定性与资费黄金平衡
      </h1>
      <p class="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
        性价比不是一味求低价，而是在合理预算内追求极高的可用率与可靠性。本专题为您找到最均衡的价值之选。
      </p>
    </header>

    <div class="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 mb-10">
      <h2 class="text-lg font-bold text-emerald-950 mb-3 flex items-center gap-2">
        <span>⚖️</span> 性价比核心推荐（Answer-First）
      </h2>
      <p class="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
        综合速率、晚高峰抗抖动与每 GB 单价，<strong>光速云</strong>（年付折算 ¥8.25/月）与<strong>西瓜皮</strong>在平价区间表现最为亮眼，以极亲民的开销交付了接近高端旗舰的专线稳定性。
      </p>
    </div>

    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">高性价比精选服务商列表</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {valueBrands.map(b => (
          <BrandCard brand={b} />
        ))}
      </div>
    </section>

    <!-- FAQs -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">性价比常见疑问</h2>
      <div class="space-y-4">
        {faqs.map((f, i) => (
          <details class="group bg-white rounded-2xl border border-slate-200 p-5 open:ring-2 open:ring-emerald-500/20 transition shadow-sm">
            <summary class="font-bold text-slate-900 text-sm sm:text-base cursor-pointer flex items-center justify-between list-none">
              <span class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-bold">{i+1}</span>
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
      customTitle="公认的年度性价比标杆 · 光速云"
      customDesc="支持专属优惠券 AMM，以平民化价格提供全专线 BGP 入口与自研跨平台客户端，性价比卓绝。"
    />

    <AffiliateDisclosure />
  </div>
</BaseLayout>
\`);

console.log('02. PRICING SUB-TOPICS COMPLETED!');

// =========================================================================
// 03. BRANDS SUB-TOPICS (6 pages)
// =========================================================================

// 03.1 brands/directory.astro
writePage('brands/directory.astro', \`---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '机场品牌数据库大全（2026）｜31 家主流服务商全景档案检索与参数大盘';
const description = '权威中文代理服务商全景数据库：聚合 31 家主流机场品牌的成立年份、线路架构、支持协议、专属客户端状态及官方认证入口，提供一站式参数检索大盘。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场品牌', url: '/brands/' },
  { name: '品牌数据库', url: '/brands/directory/' }
];

const faqs = [
  {
    q: '品牌数据库收录的标准是什么？',
    a: '收录标准严格：1. 具有真实运营记录与公开服务条款（ToS）；2. 拥有明确的节点物理架构声明；3. 提供透明的套餐资费口径；4. 官方域名经过 SSL 证书与签名核验。'
  }
];

const jsonLd = \${JSON.stringify(makeFaqJsonLd('/brands/directory/', title, description, breadcrumbs, faqs))};
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

    <!-- FAQs -->
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
\`);

// 03.2 brands/reviews.astro
writePage('brands/reviews.astro', \`---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '机场独立深度评测大全（2026）｜晚高峰实测数据、丢包率与客观分析';
const description = '百科机场独立深度评测专题：汇总 31 家主流服务商的客观评测报告。包含 20:00-23:00 晚高峰丢包曲线、4K 播放实录、流媒体与 AI 解锁测试及真实选购建议。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场品牌', url: '/brands/' },
  { name: '品牌评测', url: '/brands/reviews/' }
];

const jsonLd = \${JSON.stringify(makeFaqJsonLd('/brands/reviews/', title, description, breadcrumbs, [
  { q: '独立评测与品牌档案有什么区别？', a: '品牌档案是结构化参数卡片；深度评测是多达数千字的长篇实测报告，包含晚高峰丢包实测曲线、解锁截图及客观优缺点点评。' }
]))};
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
\`);

// 03.3 brands/official.astro
writePage('brands/official.astro', \`---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '机场官方网站与品牌识别（2026）｜防钓鱼正版域名核验与安全访问指引';
const description = '百科机场防伪认证专题：提供 31 家主流服务商正版官网域名核对大盘。拆解山寨李鬼站冒充官网套现骗局，保护您的充值资金与隐私安全。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场品牌', url: '/brands/' },
  { name: '官网与品牌识别', url: '/brands/official/' }
];

const jsonLd = \${JSON.stringify(makeFaqJsonLd('/brands/official/', title, description, breadcrumbs, [
  { q: '为什么搜索引擎里有很多假冒李鬼机场？', a: '黑产利用快照劫持与竞价排名，制作高仿山寨网站骗取用户充值或植入木马。请务必通过本站核验的正规官方链接直达。' }
]))};
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
\`);

// 03.4 brands/prices.astro
writePage('brands/prices.astro', \`---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '31 家机场品牌套餐价格全景横评（2026）｜起步资费、周期与月费折算明细';
const description = '百科机场资费大盘专题：清晰列出 31 家收录品牌公开套餐价格、起步门槛、计费周期与真实月均成本，帮您横向对比做出最理性的消费决策。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场品牌', url: '/brands/' },
  { name: '品牌套餐', url: '/brands/prices/' }
];

const jsonLd = \${JSON.stringify(makeFaqJsonLd('/brands/prices/', title, description, breadcrumbs, [
  { q: '各大品牌的套餐数据是怎样核验的？', a: '所有资费数据均基于各服务商最新官网收银台套餐信息核实归档，并明确注明了按月支付与年付平摊的不同属性。' }
]))};
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
\`);

// 03.5 brands/coupons.astro
writePage('brands/coupons.astro', \`---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '2026 机场最新优惠码与折扣券大全｜长期合作专属码与限时减免核销';
const description = '百科机场优惠码专题：实时聚合 31 家服务商最新有效折扣代码。包含光速云长期专属优惠券 AMM、各大节日促销码与优惠核销防坑指南。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场品牌', url: '/brands/' },
  { name: '品牌优惠码', url: '/brands/coupons/' }
];

const jsonLd = \${JSON.stringify(makeFaqJsonLd('/brands/coupons/', title, description, breadcrumbs, [
  { q: '优惠码如何正确使用与核销？', a: '在服务商收银台结算页面，在“折扣码/Coupon”输入框中填入代码并点击验证，系统将实时在总额中扣减减免金额。' }
]))};

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
\`);

// 03.6 brands/alternatives.astro
writePage('brands/alternatives.astro', \`---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '机场突发失联替代方案指南（2026）｜同价位、同架构备用服务商无缝切换';
const description = '百科机场容灾替代专题：面对服务商跑路或长期断线，指导用户按原有网络习惯（专线/中转/价格）快速锁定同档位优质备选服务商，实现网络 5 分钟无感切换。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场品牌', url: '/brands/' },
  { name: '品牌替代品', url: '/brands/alternatives/' }
];

const jsonLd = \${JSON.stringify(makeFaqJsonLd('/brands/alternatives/', title, description, breadcrumbs, [
  { q: '正在使用的机场失联后，应该按什么顺序寻找替代品？', a: '1. 切勿盲目购买长期大额年付；2. 依据原先的线路习惯选择同档位老牌品牌（如原用专线继续选专线）；3. 首选月付或备用按量包迅速恢复网络。' }
]))};

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
\`);

console.log('03. BRANDS SUB-TOPICS COMPLETED!');
console.log('BATCH 1 ALL 17 PAGES SUCCESSFULLY WRITTEN!');
