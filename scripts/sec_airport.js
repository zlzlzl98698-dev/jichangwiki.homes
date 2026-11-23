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

// 1. recommend.astro
const recFaqs = [
  {
    q: '场景化选购机场的核心依据是什么？',
    a: '核心在于“业务容忍度”与“带宽吞吐需求”的匹配。轻度查阅学术资料，月付 10 元左右的公网中转即已足够；4K/8K 视频与海外大片，需要充裕的单线程带宽和流媒体解锁；跨境商贸与外贸独立站运营，则必须购买高 SLA 承诺的 IEPL 纯内网物理专线，杜绝任何断线风险。'
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
  }
];
const recTitle = '2026 场景化机场推荐指南｜按需匹配最佳代理服务与场景选型方案';
const recDesc = '权威中文机场推荐细分专题：按照轻度查资料、日常高频办公、4K 影音与外贸跨境等具体使用场景，深度横评光速云、红莓网络等精选品牌，提供可直接执行的选型推荐。';
const recBreadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场推荐', url: '/airport/' },
  { name: '场景化推荐', url: '/airport/recommend/' }
];
const recJsonLd = makeFaqJsonLd('/airport/recommend/', recTitle, recDesc, recBreadcrumbs, recFaqs);

writePage('airport/recommend.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '${recTitle}';
const description = '${recDesc}';
const breadcrumbs = ${JSON.stringify(recBreadcrumbs)};
const jsonLd = ${JSON.stringify(recJsonLd)};
const recBrands = [brands.find(b => b.id === 'guangsu') || brands[0], brands[1], brands[2], brands[3]].filter(Boolean);
const faqs = ${JSON.stringify(recFaqs)};
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

    <section class="mb-12 space-y-6">
      <h2 class="text-2xl font-bold text-slate-900">四大主力场景深度拆解与推荐方案</h2>
      <div class="p-5 bg-white rounded-2xl border border-slate-200">
        <h3 class="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
          <span>📚</span> 场景一：学术科研与文献查阅（轻度低频）
        </h3>
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
          <strong>需求特征</strong>：主要访问 Google Scholar、IEEE、Nature、GitHub 代码库，数据传输量小（&lt;30GB/月），要求连接迅速、DNS 解析精准无污染。<br/>
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
          <strong>选型标准</strong>：节点落地必须采用双 ISP 原生住宅 IP，单线程突发带宽不低于 50Mbps，晚高峰骨干网 QoS 丢包率小于 1%。<br/>
          <strong>推荐品牌</strong>：红莓网络（全专线）、光速云高速版（月付 ¥25/月）。
        </p>
      </div>

      <div class="p-5 bg-white rounded-2xl border border-slate-200">
        <h3 class="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
          <span>🤖</span> 场景三：ChatGPT 4o 与 Claude 3.5 生产力（IP 纯净高要求）
        </h3>
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
          <strong>需求特征</strong>：高频调用 OpenAI 与 Anthropic 官方平台，最怕遭遇 Cloudflare 1020 报错或账号无故封禁。<br/>
          <strong>选型标准</strong>：禁止走香港出口（官方不支持），必须锁定美国或日本的高纯净原生专线节点，开启客户端全局 TUN 模式接管。<br/>
          <strong>推荐品牌</strong>：光速云 AI 专属通道、青云梯原生落地节点。
        </p>
      </div>

      <div class="p-5 bg-white rounded-2xl border border-slate-200">
        <h3 class="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
          <span>💼</span> 场景四：跨境电商与海外独立站商贸运营（高 SLA 零容忍）
        </h3>
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
          <strong>需求特征</strong>：Shopify 店铺管理、Amazon 卖家后台、TikTok 东南亚出海运营，任何断线都会影响大额订单成交。<br/>
          <strong>选型标准</strong>：必须配备双物理内网专线备份，具备独立专属客服响应，部署“双机场自动故障转移”。<br/>
          <strong>推荐策略</strong>：主力选用全 IEPL 老牌服务商，备用配备高额度按量包。
        </p>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-xl font-bold text-slate-900 mb-4">精选场景适配候选品牌速览</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recBrands.map(b => (
          <BrandCard brand={b} />
        ))}
      </div>
    </section>

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

// 2. ranking.astro
const rkFaqs = [
  {
    q: '天梯榜的综合评分是如何计算出来的？有无主观打分？',
    a: '拒绝主观印象，采用五维量化打分模型：线路专线性占 40%、晚高峰抗丢包率占 25%、每 GB 流量折算单价占 15%、跨平台客户端成熟度占 10%、平稳运营年限占 10%。综合计算得出最终百分制得分。'
  },
  {
    q: '第一梯队（Tier 1）与第二梯队（Tier 2）核心区别是什么？',
    a: '第一梯队品牌具备全线企业级物理专线（IEPL/IPLC），晚高峰丢包率控制在 1.5% 以内，且运营时间多在 2-3 年以上；第二梯队主要是高性价比公网中转或入门级专线品牌，平时速度飞快，但在敏感时期或特定晚高峰时段偶有轻微网络抖动。'
  },
  {
    q: '为什么排行榜上看不到完全免费的白嫖机场？',
    a: '免费服务无法通过我们基础的“SLA 可用性与隐私安全红线”审核。免费节点大多存在严重的 DNS 泄漏、广告劫持或带宽转售问题，且节点存活时间通常不足几周，无法进入严谨的商业综合天梯评测。'
  }
];
const rkTitle = '2026 机场综合排行榜｜天梯榜与多品牌统一指标客观评测';
const rkDesc = '百科机场 2026 综合天梯榜：基于线路专线性（40%）、晚高峰可用率（25%）、单位流量单价（15%）、客户端便利度（10%）与运营口碑（10%）五大标准化权重，对 31 家主流服务商建立客观量化分级梯队。';
const rkBreadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场推荐', url: '/airport/' },
  { name: '机场排行榜', url: '/airport/ranking/' }
];
const rkJsonLd = makeFaqJsonLd('/airport/ranking/', rkTitle, rkDesc, rkBreadcrumbs, rkFaqs);

writePage('airport/ranking.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '${rkTitle}';
const description = '${rkDesc}';
const breadcrumbs = ${JSON.stringify(rkBreadcrumbs)};
const jsonLd = ${JSON.stringify(rkJsonLd)};
const tier1 = brands.slice(0, 5);
const tier2 = brands.slice(5, 14);
const tier3 = brands.slice(14, 25);
const faqs = ${JSON.stringify(rkFaqs)};
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

    <section class="mb-12">
      <div class="flex items-center justify-between mb-4">
        <span class="px-3 py-1 rounded-lg bg-blue-600 text-white font-extrabold text-sm">第一梯队 (Tier 1)</span>
        <span class="text-xs text-slate-500">综合得分 90+ · 纯专线保障 · 晚高峰抗抖动顶流</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tier1.map(b => (
          <BrandCard brand={b} />
        ))}
      </div>
    </section>

    <section class="mb-12">
      <div class="flex items-center justify-between mb-4">
        <span class="px-3 py-1 rounded-lg bg-slate-800 text-white font-extrabold text-sm">第二梯队 (Tier 2)</span>
        <span class="text-xs text-slate-500">综合得分 80-89 · 高性价比与特色中转</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tier2.map(b => (
          <BrandCard brand={b} />
        ))}
      </div>
    </section>

    <section class="mb-12">
      <div class="flex items-center justify-between mb-4">
        <span class="px-3 py-1 rounded-lg bg-slate-600 text-white font-extrabold text-sm">第三梯队 (Tier 3)</span>
        <span class="text-xs text-slate-500">综合得分 70-79 · 轻量尝鲜与应急跳板</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tier3.map(b => (
          <BrandCard brand={b} />
        ))}
      </div>
    </section>

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

// 3. reliable.astro
const relFaqs = [
  {
    q: '“靠谱机场”的核心判断标准有哪些？',
    a: '三大金标准：1. 运营年限超过 2-3 年；2. 拥有开放活跃的官方 Telegram 社区，出现故障有透明技术通告，绝不永久全员禁言；3. 资费与成本逻辑相符，不搞夸张的“30元终身永久包”资金盘套现模式。'
  },
  {
    q: '为什么成立多年的老牌机场也会出现短期网络抖动？',
    a: '网络抖动不等于跑路。国际海底光缆突发中断（如红海断纤）、上游机房电力割接都会造成临时影响。靠谱服务商的标志在于运维反应速度：具备多地 BGP 专线热备能力，在几十分钟内自动倒换路由并发布故障说明。'
  }
];
const relTitle = '靠谱机场甄选指南（2026）｜拒绝短期跑路、精选老牌高口碑服务商';
const relDesc = '百科机场靠谱服务商专题：深入拆解机场跑路本质，甄选持续平稳运营 2-3 年以上的老牌服务商。建立价格透明度、社群活跃度与退款保障审查标准，让每一次充值都有安全保障。';
const relBreadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场推荐', url: '/airport/' },
  { name: '靠谱机场', url: '/airport/reliable/' }
];
const relJsonLd = makeFaqJsonLd('/airport/reliable/', relTitle, relDesc, relBreadcrumbs, relFaqs);

writePage('airport/reliable.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '${relTitle}';
const description = '${relDesc}';
const breadcrumbs = ${JSON.stringify(relBreadcrumbs)};
const jsonLd = ${JSON.stringify(relJsonLd)};
const reliableBrands = brands.filter(b => b.establishedYear && b.establishedYear <= 2023).slice(0, 6);
const faqs = ${JSON.stringify(relFaqs)};
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

// 4. stable.astro
const stbFaqs = [
  {
    q: '“稳定性”的量化技术指标到底是什么？',
    a: '两大硬指标：1. 晚高峰（20:00-23:00）丢包率（Packet Loss），优质专线必须低于 1.5%；2. 延迟抖动偏差（Jitter），连续 ping 200 次的波动范围必须在 10ms 以内。'
  },
  {
    q: '为什么 IEPL 专线能够做到全天候稳定？',
    a: 'IEPL 是国际以太网私有内网物理光纤。数据包在境内直接进入运营商企业专网，全程不经过公网国际出口关口局，彻底绕开了 GFW 的 DPI 深度包检测与民用出口 QoS 丢包限速。'
  }
];
const stbTitle = '2026 稳定机场推荐指南｜晚高峰抗抖动、低丢包企业级 IEPL 专线精选';
const stbDesc = '权威中文稳定机场专题：深入剖析晚高峰 20:00-23:00 骨干网 QoS 拥塞机制，精选全 IEPL/IPLC 企业级专线服务商。保障 4K 视频持续播放不缓冲、网络游戏超低延迟抖动。';
const stbBreadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场推荐', url: '/airport/' },
  { name: '稳定机场', url: '/airport/stable/' }
];
const stbJsonLd = makeFaqJsonLd('/airport/stable/', stbTitle, stbDesc, stbBreadcrumbs, stbFaqs);

writePage('airport/stable.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '${stbTitle}';
const description = '${stbDesc}';
const breadcrumbs = ${JSON.stringify(stbBreadcrumbs)};
const jsonLd = ${JSON.stringify(stbJsonLd)};
const stableBrands = brands.filter(b => b.networkTypes && b.networkTypes.some(t => t.includes('专线') || t.includes('IEPL'))).slice(0, 6);
const faqs = ${JSON.stringify(stbFaqs)};
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

// 5. best.astro
const bstFaqs = [
  {
    q: '新手常说的“好用”主要体现在哪些方面？',
    a: '主要体现在：1. 免去配置痛苦，提供一键客户端，登录账号即可使用；2. 智能分流规则透明，国内网站直连海外加速；3. 遇到节点维护自动切换，无需手动频繁排障。'
  }
];
const bstTitle = '好用的新手机场推荐（2026）｜免配置一键自研客户端、零门槛上手';
const bstDesc = '百科机场新手友好专题：专为电脑小白与新手用户打造。精选提供 Windows/Mac/Android 自研专属一键客户端的服务商，免去繁琐的 YAML 规则与第三方订阅导入，开箱即用。';
const bstBreadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场推荐', url: '/airport/' },
  { name: '好用的机场', url: '/airport/best/' }
];
const bstJsonLd = makeFaqJsonLd('/airport/best/', bstTitle, bstDesc, bstBreadcrumbs, bstFaqs);

writePage('airport/best.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '${bstTitle}';
const description = '${bstDesc}';
const breadcrumbs = ${JSON.stringify(bstBreadcrumbs)};
const jsonLd = ${JSON.stringify(bstJsonLd)};
const bestBrands = brands.filter(b => b.strengths && b.strengths.some(s => s.includes('客户端') || s.includes('入门'))).slice(0, 6);
if (bestBrands.length === 0) bestBrands.push(brands[0], brands[1]);
const faqs = ${JSON.stringify(bstFaqs)};
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

console.log('ALL 5 AIRPORT SECONDARY PAGES WRITTEN!');
