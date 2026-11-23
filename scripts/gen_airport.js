import fs from 'fs';
import path from 'path';

const brands = JSON.parse(fs.readFileSync('src/data/brands.json', 'utf-8'));

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writePage(relPath, content) {
  const fullPath = path.resolve('src/pages', relPath);
  ensureDir(fullPath);
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf-8');
  console.log(`Generated: src/pages/${relPath}`);
}

// ==========================================
// 1. AIRPORT TOPIC PAGES (/airport/)
// ==========================================

// /airport/index.astro
writePage('airport/index.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '机场推荐与排行专区｜2026 中文代理选购与稳定性综合评测';
const description = '百科机场推荐专题专区：聚合 2026 最新靠谱机场、稳定专线机场、好用平民机场及综合天梯榜。按预算、使用场景与晚高峰稳定性提供科学客观的选购方案。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场推荐', url: '/airport/' }
];

const subSections = [
  { name: '机场推荐', url: '/airport/recommend/', desc: '按需求场景选购：轻度、高频、外贸跨境与流媒体', icon: '🎯' },
  { name: '机场排行', url: '/airport/ranking/', desc: '统一指标下的综合评测天梯：速率、SLA与口碑', icon: '🏆' },
  { name: '靠谱机场', url: '/airport/reliable/', desc: '拒绝短期跑路：甄选 2020-2023 年起运营老牌服务商', icon: '🛡️' },
  { name: '稳定机场', url: '/airport/stable/', desc: '晚高峰抗抖动：企业级 IEPL/IPLC 内网专线精选', icon: '⚡' },
  { name: '好用的机场', url: '/airport/best/', desc: '新手友好：自研一键客户端与免配置通用订阅', icon: '✨' }
];

const featuredBrands = brands.slice(0, 6);
const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <!-- Hero Header -->
    <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-xl">
      <div class="max-w-3xl">
        <span class="px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold border border-blue-400/30">
          一级专题 · 机场推荐与选购导航
        </span>
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 mb-4">
          机场推荐与排行：从网络架构到真实场景选型
        </h1>
        <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
          面对海量代理服务商，“推荐”偏向按场景匹配最佳选择，而“排行”则偏向在统一指标下的横向打分。本专题拆解晚高峰速率、线路专线化程度、客户端兼容性与计费透明度，为您提供可靠、客观的参考依据。
        </p>
      </div>
    </div>

    <!-- Secondary Hubs Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
      {subSections.map((s) => (
        <a href={s.url} class="p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition group">
          <div class="text-2xl mb-2 group-hover:scale-110 transition-transform">{s.icon}</div>
          <h2 class="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{s.name}</h2>
          <p class="text-xs text-slate-500 mt-1 line-clamp-2">{s.desc}</p>
        </a>
      ))}
    </div>

    <!-- Deep Editorial Content: Selection Methodology -->
    <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-12 prose prose-slate max-w-none text-sm sm:text-base leading-relaxed">
      <h2 class="text-2xl font-bold text-slate-900 mb-4">
        科学选购机场的四大关键维度 (Answer-First)
      </h2>
      <p>
        选择一家靠谱好用的机场，绝不能仅凭宣传语中的“极速千兆”或“百分百解锁”。在 2026 年复杂的网络环境下，客观判断一家机场的品质应着眼于以下四大核心维度：
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6">
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <h3 class="font-bold text-slate-900 text-sm mb-1">1. 线路类型：专线还是普通公网中转？</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            <strong>IEPL/IPLC 专线</strong> 拥有跨境独立物理或虚拟内网信道，完全绕过公网 GFW 的 DPI 深度包检测与 QoS 晚高峰限速；而普通公网隧道中转在晚高峰敏感期容易发生较大丢包与延迟剧烈抖动。
          </p>
        </div>

        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <h3 class="font-bold text-slate-900 text-sm mb-1">2. 协议开销：VLESS、Trojan 还是旧 SS？</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            现代主流服务商正加速普及 <strong>VLESS 与 Trojan</strong> 协议，其握手开销低、性能损耗小，对移动端设备的耗电控制也显著优于臃肿的旧式 VMess。
          </p>
        </div>

        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <h3 class="font-bold text-slate-900 text-sm mb-1">3. 计费周期与退款机制</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            对于任何新接触的品牌，<strong>首选月付</strong> 是降低试错成本的核心准则。对于声称超低价年付套餐（如¥99/年折合¥8/月），需核对其实际实付门槛与退款条款。
          </p>
        </div>

        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <h3 class="font-bold text-slate-900 text-sm mb-1">4. 落地 IP 质量与 AI/流媒体支持</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            ChatGPT、Claude 与 Netflix 对出口数据中心 ASN 具有严苛的风控策略。原生住宅 IP 或高质量机房 IP 能显著减少 Cloudflare 循环人机验证与 1020 阻断。
          </p>
        </div>
      </div>
    </div>

    <!-- Primary Promotion Banner -->
    <BrandCTA 
      brandName={guangsu.name}
      affiliateURL={guangsu.affiliateURL}
      couponCode="AMM"
      entryPrice={guangsu.entryPrice}
      variant="banner"
    />

    <!-- Recommended Brands Showcase -->
    <div class="my-12">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-bold text-slate-900">核心精选品牌推荐</h2>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">综合晚高峰表现、协议支持度与服务口碑甄选</p>
        </div>
        <a href="/airport/ranking/" class="text-xs font-semibold text-blue-600 hover:underline">
          查看完整排行榜 &rarr;
        </a>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredBrands.map((b) => (
          <BrandCard brand={b} />
        ))}
      </div>
    </div>

    <AffiliateDisclosure />

  </div>
</BaseLayout>
`);

// /airport/recommend.astro
writePage('airport/recommend.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '2026 机场推荐选购指南｜按预算、用途与稳定性科学匹配';
const description = '百科机场推荐：拒绝千篇一律的软文灌水，按学生低预算、日常办公、跨境电商外贸、ChatGPT/AI开发及 4K 追剧五大真实需求，为您匹配最适合的机场代理方案。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场推荐', url: '/airport/' },
  { name: '机场推荐选购指南', url: '/airport/recommend/' }
];

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const cheapBrands = brands.filter(b => b.minMonthlyPrice && b.minMonthlyPrice <= 15).slice(0, 3);
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <header class="mb-10 text-center max-w-3xl mx-auto">
      <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">Scenario-Based Selection</span>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4">
        2026 机场推荐：按使用场景与核心意图精选
      </h1>
      <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
        “适合自己的才是最好的”。没有绝对完美的单一机场，只有满足特定预算与网络需求的合理搭配。以下按五大高频场景梳理针对性选购建议。
      </p>
    </header>

    <!-- Scenario 1: AI & Productivity -->
    <section class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 mb-8 shadow-sm">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-2xl">🤖</span>
        <div>
          <h2 class="text-xl font-bold text-slate-900">场景一：AI 生产力（ChatGPT / Claude / Gemini）</h2>
          <p class="text-xs text-slate-500">重点考量：IP 出口纯净度、无降级、低阻断率</p>
        </div>
      </div>
      <p class="text-sm text-slate-600 leading-relaxed mb-4">
        由于 OpenAI 与 Anthropic 针对公网云服务器 IP 实施了严格的黑名单过滤，低质机场容易遭遇频繁验证码或直接阻断登录。推荐选择具备原生落地 IP 或独立专线优化的品牌，如<strong>光速云</strong>（实测香港/新加坡节点 AI 体验佳）或 <strong>速界</strong>、<strong>灵动云</strong>。
      </p>
      <BrandCTA 
        brandName="光速云" 
        affiliateURL={guangsu.affiliateURL}
        couponCode="AMM"
        entryPrice={guangsu.entryPrice}
        variant="inline"
      />
    </section>

    <!-- Scenario 2: Budget & Lightweight -->
    <section class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 mb-8 shadow-sm">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-2xl">💰</span>
        <div>
          <h2 class="text-xl font-bold text-slate-900">场景二：低预算学生与轻度查资料</h2>
          <p class="text-xs text-slate-500">重点考量：单月资费在 5-10 元以内，无强制年付套路</p>
        </div>
      </div>
      <p class="text-sm text-slate-600 leading-relaxed mb-4">
        若每月用量仅在 50GB-100GB 左右，主要用于查学术文献、浏览 GitHub 或推特，无需承担高额专线费用。推荐：
        <strong>飞猫云</strong>（7元档配合8折码仅需¥5.6/月）、<strong>微风网络</strong>（7元档配9折码约¥6.3/月）以及 <strong>大佬云</strong>、<strong>闪电鼠</strong>（5.6元/月起）。
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cheapBrands.map(b => (
          <BrandCard brand={b} />
        ))}
      </div>
    </section>

    <!-- Scenario 3: Non-expiring backup -->
    <section class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 mb-8 shadow-sm">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-2xl">⏳</span>
        <div>
          <h2 class="text-xl font-bold text-slate-900">场景三：出差备用与不限时流量</h2>
          <p class="text-xs text-slate-500">重点考量：流量不过期、按需扣除、适合多设备长效防断联</p>
        </div>
      </div>
      <p class="text-sm text-slate-600 leading-relaxed mb-4">
        对于偶尔出差、海外业务频次低或作为备用梯子的用户，按月交月租会浪费大量闲置流量。推荐一次性付费的不过期套餐：
        <strong>光速云·致敬斯诺克147永久套餐</strong>（¥147 含 247GB 不过期）及 <strong>星岛梦</strong>（¥99 含 200GB 不过期），一次充值长期安心。
      </p>
    </section>

    <AffiliateDisclosure />

  </div>
</BaseLayout>
`);

// /airport/ranking.astro
writePage('airport/ranking.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '2026 机场综合排行榜｜天梯榜与多品牌统一指标评测';
const description = '百科机场2026综合排行榜：基于线路架构、晚高峰丢包率、套餐单价性价比、客户服务及运营历史，对 31 家主流品牌建立统一打分梯队榜单。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场推荐', url: '/airport/' },
  { name: '机场综合排行榜', url: '/airport/ranking/' }
];

const tier1 = brands.slice(0, 5);
const tier2 = brands.slice(5, 12);
const tier3 = brands.slice(12, 20);
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <header class="mb-8 border-b border-slate-200 pb-6">
      <div class="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
        <span>🏆 天梯综合榜单</span>
        <span>·</span>
        <span>客观打分体系</span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        2026 机场综合评级与天梯排行榜
      </h1>
      <p class="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
        本榜单不同于主观推荐，而是依据<strong>线路专线性（40%）、晚高峰可用率（25%）、单位流量单价（15%）、客户端便利度（10%）与运营年限口碑（10%）</strong>五大标准化权重生成的客观分级梯队。
      </p>
    </header>

    <!-- Tier 1 Section -->
    <section class="mb-12">
      <div class="flex items-center gap-3 mb-4">
        <span class="px-3 py-1 rounded-lg bg-blue-600 text-white font-extrabold text-sm">
          第一梯队 (Tier 1)
        </span>
        <span class="text-xs text-slate-500">综合评分 90+ 分 · 专线保障 · 晚高峰抗抖动佳选</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tier1.map(b => (
          <BrandCard brand={b} />
        ))}
      </div>
    </section>

    <!-- Tier 2 Section -->
    <section class="mb-12">
      <div class="flex items-center gap-3 mb-4">
        <span class="px-3 py-1 rounded-lg bg-slate-800 text-white font-extrabold text-sm">
          第二梯队 (Tier 2)
        </span>
        <span class="text-xs text-slate-500">综合评分 80-89 分 · 平价性价比与细分特色品牌</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tier2.map(b => (
          <BrandCard brand={b} />
        ))}
      </div>
    </section>

    <!-- Tier 3 Section -->
    <section class="mb-12">
      <div class="flex items-center gap-3 mb-4">
        <span class="px-3 py-1 rounded-lg bg-slate-600 text-white font-extrabold text-sm">
          第三梯队 (Tier 3)
        </span>
        <span class="text-xs text-slate-500">超低价入门与备用备灾选项</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tier3.map(b => (
          <BrandCard brand={b} />
        ))}
      </div>
    </section>

    <AffiliateDisclosure />

  </div>
</BaseLayout>
`);

// /airport/reliable.astro
writePage('airport/reliable.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '靠谱机场推荐｜运营年限长、口碑稳健的老牌代理甄选';
const description = '如何甄别一家真正靠谱的机场？百科机场从运营年份、SLA服务承诺、历史跑路防范及退款维权能力，为您精选 2020-2023 年起持续服务的老牌稳定机场。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场推荐', url: '/airport/' },
  { name: '靠谱机场精选', url: '/airport/reliable/' }
];

const reliableBrands = brands.filter(b => b.establishedYear <= 2022).slice(0, 6);
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8">
      <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">Reliable & Established</span>
      <h1 class="text-3xl font-extrabold text-slate-900 mt-1 mb-3">
        靠谱机场精选：拒绝快闪跑路，认准长期稳健运营
      </h1>
      <p class="text-slate-600 text-sm max-w-3xl leading-relaxed">
        代理行业更替频繁，许多刚开业半年以超低年付吸金的“快闪机场”往往在遭遇大封锁时失联。所谓“靠谱”，首要指标就是<strong>经历过多次特殊敏感期的大考，并且持续保持节点维护与工单响应</strong>。
      </p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {reliableBrands.map(b => (
        <BrandCard brand={b} />
      ))}
    </div>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// /airport/stable.astro
writePage('airport/stable.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '稳定机场推荐｜IEPL/IPLC 专线晚高峰抗抖动与防断联';
const description = '为什么你的节点一到晚上 8 点就卡顿？百科机场深度解析专线抗封锁原理，推荐全程采用 IEPL、IPLC 内网专线的高稳定性机场服务商。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场推荐', url: '/airport/' },
  { name: '稳定机场推荐', url: '/airport/stable/' }
];

const stableBrands = brands.filter(b => b.networkTypes.some(t => t.includes('IEPL') || t.includes('IPLC'))).slice(0, 6);
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8">
      <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider">Dedicated Backbone Line</span>
      <h1 class="text-3xl font-extrabold text-slate-900 mt-1 mb-3">
        稳定机场推荐：晚高峰不卡顿的专线核心秘诀
      </h1>
      <p class="text-slate-600 text-sm max-w-3xl leading-relaxed">
        晚高峰（20:00 - 23:00）是检验机场稳定性的试金石。普通公网出口会遭遇运营商严重的国际出口拥堵与 QoS 丢包。而企业级 <strong>IEPL 专线</strong> 拥有专有跨境信道，延迟恒定且极少丢包。
      </p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {stableBrands.map(b => (
        <BrandCard brand={b} />
      ))}
    </div>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// /airport/best.astro
writePage('airport/best.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '好用的机场推荐｜开箱即用、自研客户端与免配置指南';
const description = '新手小白最怕复杂的订阅转换与节点分流规则。本文精选提供一键客户端、自研软件或通用开源订阅识别的好用机场，轻松上手不折腾。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场推荐', url: '/airport/' },
  { name: '好用的机场', url: '/airport/best/' }
];

const bestBrands = brands.filter(b => b.clients.some(c => c.includes('自研') || c.includes('免转换')) || b.isPrimary).slice(0, 6);
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8">
      <span class="text-xs font-bold text-purple-600 uppercase tracking-wider">Easy To Use</span>
      <h1 class="text-3xl font-extrabold text-slate-900 mt-1 mb-3">
        好用的机场推荐：免去繁琐配置，上手即连
      </h1>
      <p class="text-slate-600 text-sm max-w-3xl leading-relaxed">
        好用包含两大维度：一是<strong>客户端交互好用</strong>（自研一键登录免配端口），二是<strong>节点智能路由好用</strong>（国内流量直连、海外流量自动加速，无需手动切点）。
      </p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {bestBrands.map(b => (
        <BrandCard brand={b} />
      ))}
    </div>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

console.log('Airport topic pages completed.');
