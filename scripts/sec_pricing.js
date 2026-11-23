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

// 1. cheap.astro
const chpFaqs = [
  {
    q: '每月 5-15 元的便宜机场能保证日常可用吗？',
    a: '完全可以，但必须认准老牌成熟品牌。例如光速云的年付特惠版仅需 ¥99（折合 ¥8.25/月，69GB/月），依靠规模化用户分摊了专线成本；如果是某些新开小作坊的 5 元套餐，则往往采用劣质公网直连超售，晚高峰极易卡死。'
  },
  {
    q: '购买便宜机场最容易踩的陷阱是什么？',
    a: '最大的陷阱是“高倍率暗扣”与“年付套现跑路”。标称给 500GB 流量，但主要节点全设为 3x-5x 高倍率，实际只能用 100GB；或者通过超低价格诱导用户一次性支付 3 年费用后卷款关站。'
  }
];
const chpTitle = '便宜机场推荐指南（2026）｜月费 5-15 元高性价比梯队精选与避坑';
const chpDesc = '百科机场便宜服务商专题：深入核算实际月付与年付折算成本，甄选月费 5-15 元区间内真正可用、不跑路、不虚高倍率的高性价比平价机场。';
const chpBreadcrumbs = [
  { name: '首页', url: '/' },
  { name: '价格与套餐', url: '/pricing/' },
  { name: '便宜机场', url: '/pricing/cheap/' }
];
const chpJsonLd = makeFaqJsonLd('/pricing/cheap/', chpTitle, chpDesc, chpBreadcrumbs, chpFaqs);

writePage('pricing/cheap.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '${chpTitle}';
const description = '${chpDesc}';
const breadcrumbs = ${JSON.stringify(chpBreadcrumbs)};
const jsonLd = ${JSON.stringify(chpJsonLd)};
const cheapBrands = brands.filter(b => b.minMonthlyPrice && b.minMonthlyPrice <= 15).slice(0, 6);
if (cheapBrands.length === 0) cheapBrands.push(brands[0]);
const faqs = ${JSON.stringify(chpFaqs)};
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
`);

// 2. one-yuan.astro
const oyFaqs = [
  {
    q: '一元机场为什么能做到 1 元一个月？他们真的不亏钱吗？',
    a: '一元机场的商业模式完全建立在“零硬成本直连 + 疯狂超售 + 流量沉没”之上：1. 租用极廉价的公网直连 VPS，无任何昂贵的内网专线成本；2. 将 1Gbps 的带宽卖给数千人，赌大多数人不会同时在线；3. 大量用户花 1 元尝鲜后便弃用，沉淀资金形成运营利润。'
  },
  {
    q: '一元机场适合什么样的使用场景？',
    a: '仅适合：1. 新手低成本测试客户端能否正常安装运行；2. 抓取公开网页数据；3. 作为极端的兜底备用临时跳板。绝不可用于日常办公、跨境海淘、重要账号登录或 4K 追剧。'
  }
];
const oyTitle = '一元机场靠谱吗？（2026）｜月付 1 元超低成本商业本质与防坑深度解密';
const oyDesc = '百科机场一元服务商专题：全面拆解月付 1 元背后的公网直连极高超售率商业逻辑。揭秘为什么一元机场只能做临时备用跳板，绝不能用于主力工作或重要账号登录。';
const oyBreadcrumbs = [
  { name: '首页', url: '/' },
  { name: '价格与套餐', url: '/pricing/' },
  { name: '一元机场', url: '/pricing/one-yuan/' }
];
const oyJsonLd = makeFaqJsonLd('/pricing/one-yuan/', oyTitle, oyDesc, oyBreadcrumbs, oyFaqs);

writePage('pricing/one-yuan.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';

const title = '${oyTitle}';
const description = '${oyDesc}';
const breadcrumbs = ${JSON.stringify(oyBreadcrumbs)};
const jsonLd = ${JSON.stringify(oyJsonLd)};
const faqs = ${JSON.stringify(oyFaqs)};
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
`);

// 3. one-cent.astro
const ocFaqs = [
  {
    q: '一分机场（0.01元）是真的吗？还是钓鱼网站？',
    a: '部分正规机场为了让用户低门槛验证本地网络连通性，确实会设立 0.01 元的“首日体验包”（通常给 1GB-5GB 流量）。但也存在不良网站利用 1 分钱诱导用户授权微信免密代扣，支付时务必核实是否为一次性普通支付。'
  }
];
const ocTitle = '一分机场深度评测（2026）｜0.01 元微量测试包与短期应急跳板分析';
const ocDesc = '百科机场一分钱服务商专题：深入分析一分钱（0.01元）测试包的领取机制、有效期、流量限制与防坑指南，为用户提供科学客观的短期尝鲜参考。';
const ocBreadcrumbs = [
  { name: '首页', url: '/' },
  { name: '价格与套餐', url: '/pricing/' },
  { name: '一分机场', url: '/pricing/one-cent/' }
];
const ocJsonLd = makeFaqJsonLd('/pricing/one-cent/', ocTitle, ocDesc, ocBreadcrumbs, ocFaqs);

writePage('pricing/one-cent.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';

const title = '${ocTitle}';
const description = '${ocDesc}';
const breadcrumbs = ${JSON.stringify(ocBreadcrumbs)};
const jsonLd = ${JSON.stringify(ocJsonLd)};
const faqs = ${JSON.stringify(ocFaqs)};
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
`);

// 4. monthly.astro
const monFaqs = [
  {
    q: '为什么强烈建议所有新手在第一期必须选择“真实月付”？',
    a: '真实月付是用户手中最大的博弈筹码。各个家庭的宽带运营商在不同地区的晚高峰国际路由差异极大。只有通过首月真实月付实测，验证晚高峰看视频不卡、AI 解锁符合预期，确认没有暗坑后再考虑长期订阅。'
  },
  {
    q: '月付价格比年付平均贵多少算合理？',
    a: '合理溢价通常在 15%-25% 左右。例如真实月付 20-25 元/月，年付折算约为 16-20 元/月，这属于正常的长周期资金时间价值贴现。'
  }
];
const monTitle = '月付机场推荐指南（2026）｜真月付、无沉没风险、灵活续费服务商精选';
const monDesc = '百科机场月付专题：坚持“真月付”原则，拒绝大额年付捆绑与跑路风险。精选支持逐月缴费、提供合理退款与高 SLA 保证的优质老牌服务商。';
const monBreadcrumbs = [
  { name: '首页', url: '/' },
  { name: '价格与套餐', url: '/pricing/' },
  { name: '月付机场', url: '/pricing/monthly/' }
];
const monJsonLd = makeFaqJsonLd('/pricing/monthly/', monTitle, monDesc, monBreadcrumbs, monFaqs);

writePage('pricing/monthly.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '${monTitle}';
const description = '${monDesc}';
const breadcrumbs = ${JSON.stringify(monBreadcrumbs)};
const jsonLd = ${JSON.stringify(monJsonLd)};
const monthlyBrands = brands.filter(b => b.minMonthlyPrice && b.minMonthlyPrice > 0).slice(0, 6);
const faqs = ${JSON.stringify(monFaqs)};
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
`);

// 5. lifetime.astro
const ltFaqs = [
  {
    q: '不限时按量流量包适合什么样的人群？',
    a: '适合两大类用户：1. 低频轻度使用者：每月只消耗 5-10GB，买常规月付容易浪费；2. 高可用容灾备用者：配置在 Fallback 自动回退组中，平时不走流量，主力专线突发故障时秒级切换兜底。'
  }
];
const ltTitle = '不限时机场流量包指南（2026）｜流量永不过期、按量计费与容灾备用首选';
const ltDesc = '百科机场不限时按量专题：深入剖析“一次购买、永久不过期、按月不重置”流量包的价值模型。针对出差低频党与双机场容灾，提供每 GB 真实单价核算与最佳选型方案。';
const ltBreadcrumbs = [
  { name: '首页', url: '/' },
  { name: '价格与套餐', url: '/pricing/' },
  { name: '不限时机场', url: '/pricing/lifetime/' }
];
const ltJsonLd = makeFaqJsonLd('/pricing/lifetime/', ltTitle, ltDesc, ltBreadcrumbs, ltFaqs);

writePage('pricing/lifetime.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';

const title = '${ltTitle}';
const description = '${ltDesc}';
const breadcrumbs = ${JSON.stringify(ltBreadcrumbs)};
const jsonLd = ${JSON.stringify(ltJsonLd)};
const faqs = ${JSON.stringify(ltFaqs)};
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
`);

// 6. value.astro
const valFaqs = [
  {
    q: '“性价比”如何科学计算？避免掉入唯低价论？',
    a: '真实性价比公式：综合价值 = (有效实际流量 &times; 晚高峰连通率) &divide; 实际支付金额。如果花了 1 元但晚高峰丢包 50%、或者 5 倍率扣量导致实际只能用几 G，其性价比远低于花 8-15 元获得 100% 稳定专线体验。'
  }
];
const valTitle = '2026 性价比机场评测指南｜速率、SLA 与资费黄金平衡点测算';
const valDesc = '百科机场性价比综合专题：建立“单位流量单价 &times; 晚高峰可用率 &times; 客户端成熟度”性价比评估模型。深度横评各大服务商真实使用价值，拒绝低价高倍率暗扣陷阱。';
const valBreadcrumbs = [
  { name: '首页', url: '/' },
  { name: '价格与套餐', url: '/pricing/' },
  { name: '性价比机场', url: '/pricing/value/' }
];
const valJsonLd = makeFaqJsonLd('/pricing/value/', valTitle, valDesc, valBreadcrumbs, valFaqs);

writePage('pricing/value.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '${valTitle}';
const description = '${valDesc}';
const breadcrumbs = ${JSON.stringify(valBreadcrumbs)};
const jsonLd = ${JSON.stringify(valJsonLd)};
const valueBrands = [brands.find(b => b.id === 'guangsu') || brands[0], brands[1], brands[3], brands[5]].filter(Boolean);
const faqs = ${JSON.stringify(valFaqs)};
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
`);

console.log('ALL 6 PRICING SECONDARY PAGES WRITTEN!');
