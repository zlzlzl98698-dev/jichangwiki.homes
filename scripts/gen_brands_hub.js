import fs from 'fs';
import path from 'path';

const brands = JSON.parse(fs.readFileSync('src/data/brands.json', 'utf-8'));

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writePage(relPath, content) {
  const fullPath = path.resolve('src/pages', relPath);
  ensureDir(fullPath);
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf-8');
  console.log(`Generated: src/pages/${relPath}`);
}

// 1. /brands/index.astro
writePage('brands/index.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '机场品牌专区｜31+ 主流代理品牌数据库、深度评测与官方入口';
const description = '百科机场品牌中心：收录光速云、暮光加速、飞猫云、微风网络、星岛梦等 31+ 唯一品牌。提供品牌实体档案、套餐资费、官方识别入口、最新优惠码及同级平替方案。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场品牌', url: '/brands/' }
];

const subSections = [
  { name: '品牌数据库', url: '/brands/directory/', desc: '全量 31+ 品牌可筛选检索大盘', icon: '🗄️' },
  { name: '品牌深度评测', url: '/brands/reviews/', desc: '客观独立评测报告与实测指标', icon: '📝' },
  { name: '官网与品牌识别', url: '/brands/official/', desc: '正版官方域名防山寨钓鱼', icon: '🛡️' },
  { name: '品牌套餐一览', url: '/brands/prices/', desc: '全品牌横向资费对照表', icon: '📊' },
  { name: '品牌优惠码', url: '/brands/coupons/', desc: '有效折扣码与优惠活动汇总', icon: '🎟️' },
  { name: '品牌替代方案', url: '/brands/alternatives/', desc: '同级备份与无缝迁移备选', icon: '🔄' }
];

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <div class="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-xl">
      <div class="max-w-3xl">
        <span class="px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold border border-blue-400/30">
          一级专题 · 机场品牌体系中心
        </span>
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 mb-4">
          机场品牌档案库：实体资料与独立评测双轨并行
        </h1>
        <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
          在本站体系中，“品牌详情”是严格客观的实体资料页，如实记录开业年份、协议类型、可核查套餐；“品牌评测”则是独立分析文章，剖析实际速度、适用场景、使用限制与同价位对比。两者分立，信息增量明确。
        </p>
      </div>
    </div>

    <!-- Sub sections -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-12">
      {subSections.map((s) => (
        <a href={s.url} class="p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition group text-center">
          <div class="text-2xl mb-1 group-hover:scale-110 transition-transform">{s.icon}</div>
          <h2 class="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{s.name}</h2>
          <p class="text-[11px] text-slate-500 mt-1 line-clamp-2">{s.desc}</p>
        </a>
      ))}
    </div>

    <BrandCTA 
      brandName={guangsu.name}
      affiliateURL={guangsu.affiliateURL}
      couponCode="AMM"
      entryPrice={guangsu.entryPrice}
      variant="banner"
    />

    <div class="my-10">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">全量品牌速览（共 {brands.length} 家品牌）</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map(b => (
          <BrandCard brand={b} />
        ))}
      </div>
    </div>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// 2. /brands/directory.astro (Interactive Directory)
writePage('brands/directory.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '机场品牌数据库大全｜31+ 代理服务商全量筛选大盘';
const description = '百科机场完整收录 31+ 机场品牌，支持按协议（VLESS/Trojan/SS）、线路类型（IEPL/IPLC/中转）、资费预算及客户端类型进行精准检索与筛选。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场品牌', url: '/brands/' },
  { name: '品牌数据库', url: '/brands/directory/' }
];
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8">
      <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">Brand Master Directory</span>
      <h1 class="text-3xl font-extrabold text-slate-900 mt-1 mb-3">
        机场品牌数据库大全 (收录 {brands.length} 家)
      </h1>
      <p class="text-slate-600 text-sm max-w-3xl leading-relaxed">
        所有品牌均经过唯一 ID 与推广代码去重核对。每个品牌包含专属品牌资料页（/brands/{'{slug}'}/）与深度客观评测页（/reviews/{'{slug}'}/）。
      </p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {brands.map(b => (
        <BrandCard brand={b} />
      ))}
    </div>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// 3. /brands/reviews.astro
writePage('brands/reviews.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '机场品牌深度评测索引｜晚高峰测速、优缺点客观分析';
const description = '百科机场品牌评测汇总：汇集全站 31 篇万字级深度评测，从实测延迟、下行速率、流媒体解锁、适用人群与同价位竞品对比全面拆解。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场品牌', url: '/brands/' },
  { name: '品牌深度评测', url: '/brands/reviews/' }
];
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8 border-b border-slate-200 pb-6">
      <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">
        机场品牌深度评测专区
      </h1>
      <p class="text-slate-600 text-sm mt-2 max-w-3xl leading-relaxed">
        我们坚持“先核验后发布、未测试标待测”的原则。每篇评测均提供 Performance Monitoring 测速报告与 Service Availability 解锁矩阵。
      </p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
      {brands.map(b => (
        <div class="p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-500 transition flex items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <img src={b.logo} alt={b.name} class="w-10 h-10 rounded-xl object-contain bg-slate-50 border p-1" onerror="this.src='/images/logos/xdm_logo.webp'" />
            <div>
              <a href={\`/reviews/\${b.slug}/\`} class="font-bold text-slate-900 text-sm hover:text-blue-600">
                {b.name} 深度测评报告
              </a>
              <div class="text-[11px] text-slate-500 mt-0.5">
                {b.establishedYear}年 · {b.networkTypes[0]} · {b.entryPrice}
              </div>
            </div>
          </div>
          <a href={\`/reviews/\${b.slug}/\`} class="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-600 hover:text-white transition">
            阅读评测 &rarr;
          </a>
        </div>
      ))}
    </div>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// 4. /brands/official.astro
writePage('brands/official.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '机场官方网站与品牌识别指南｜防山寨钓鱼与域名验证';
const description = '许多知名机场遭遇镜像钓鱼网站仿冒。百科机场官方识别中心为您梳理 31 家主流品牌正版入口与域名验证方法，保障账号与资金安全。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场品牌', url: '/brands/' },
  { name: '官网与品牌识别', url: '/brands/official/' }
];
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8">
      <span class="text-xs font-bold text-rose-600 uppercase tracking-wider">Anti-Phishing Verification</span>
      <h1 class="text-3xl font-extrabold text-slate-900 mt-1 mb-3">
        机场官方入口验证与防钓鱼指南
      </h1>
      <p class="text-slate-600 text-sm max-w-3xl leading-relaxed">
        部分黑灰产利用搜索引擎竞价广告制造假冒的机场官网，用户充值后直接跑路或盗取常用密码。本站提供的官方注册入口均直接来源于品牌方核验渠道。
      </p>
    </header>

    <div class="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm mb-10">
      <table class="w-full text-left text-xs sm:text-sm">
        <thead class="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
          <tr>
            <th class="p-3.5">品牌名称</th>
            <th class="p-3.5">开业年份</th>
            <th class="p-3.5">官方推广验证链接</th>
            <th class="p-3.5 text-right">安全直达</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-slate-600 font-mono text-xs">
          {brands.map(b => (
            <tr class="hover:bg-slate-50">
              <td class="p-3.5 font-bold font-sans text-slate-900">{b.name}</td>
              <td class="p-3.5">{b.establishedYear}</td>
              <td class="p-3.5 text-slate-500 max-w-xs truncate">{b.affiliateURL}</td>
              <td class="p-3.5 text-right font-sans">
                <a href={b.affiliateURL} target="_blank" rel="nofollow sponsored noopener noreferrer" class="px-2.5 py-1 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 text-xs">
                  正版直达 &rarr;
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// 5. /brands/prices.astro
writePage('brands/prices.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '全机场品牌套餐资费横向对比表｜真实起步价与流量周期';
const description = '31 家机场品牌全套餐价格一览：横向对比入门月付价格、年付折算单价、月均流量配额及是否有不限时套餐，助您一目了然选购。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场品牌', url: '/brands/' },
  { name: '品牌套餐一览', url: '/brands/prices/' }
];
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8">
      <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">
        全机场品牌套餐资费对照大盘
      </h1>
      <p class="text-slate-600 text-sm mt-2">
        注：年付折算价格仅代表长期预付平均成本，并非支持单月续费。
      </p>
    </header>

    <div class="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm mb-10">
      <table class="w-full text-left text-xs sm:text-sm">
        <thead class="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
          <tr>
            <th class="p-3.5">品牌</th>
            <th class="p-3.5">入门资费</th>
            <th class="p-3.5">最低月均折算</th>
            <th class="p-3.5">核心线路</th>
            <th class="p-3.5">不限时套餐</th>
            <th class="p-3.5 text-right">查看套餐</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-slate-600">
          {brands.map(b => (
            <tr class="hover:bg-slate-50">
              <td class="p-3.5 font-bold text-slate-900">{b.name}</td>
              <td class="p-3.5 font-mono text-emerald-600 font-bold">{b.entryPrice}</td>
              <td class="p-3.5 font-mono">¥{b.minMonthlyPrice || '-'}/月</td>
              <td class="p-3.5">{b.networkTypes[0]}</td>
              <td class="p-3.5">{b.plans.some(p => p.billing.includes('一次性') || p.period.includes('不过期')) ? '✅ 提供' : '❌ 无'}</td>
              <td class="p-3.5 text-right">
                <a href={\`/brands/\${b.slug}/\`} class="text-blue-600 hover:underline font-medium">
                  套餐详情 &rarr;
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// 6. /brands/coupons.astro
writePage('brands/coupons.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '2026 机场品牌优惠码大全｜最新可用折扣券与新人特惠';
const description = '汇集 2026 最新可用机场优惠码：光速云 AMM、飞猫云 flycat888 (8折)、暮光加速 muguang5555、Firefly 萤火虫新用户 8 折码等，结账立减。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场品牌', url: '/brands/' },
  { name: '品牌优惠码', url: '/brands/coupons/' }
];

const couponBrands = brands.filter(b => b.couponCodes && b.couponCodes.some(c => c.code && c.code !== '待核实'));
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8">
      <span class="text-xs font-bold text-amber-600 uppercase tracking-wider">Promo Codes & Discounts</span>
      <h1 class="text-3xl font-extrabold text-slate-900 mt-1 mb-3">
        2026 机场品牌优惠码与折扣券大全
      </h1>
      <p class="text-slate-600 text-sm max-w-3xl leading-relaxed">
        结账前输入专属优惠码可享受 8 折至 9 折不等的立减优惠。所有优惠码均来自官方资料核对。
      </p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
      {couponBrands.map(b => (
        <div class="p-5 bg-white rounded-2xl border border-slate-200 hover:border-amber-400 transition shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="font-bold text-slate-900">{b.name}</span>
              <span class="text-xs text-slate-500">{b.networkTypes[0]}</span>
            </div>
            <div class="space-y-1.5 my-3">
              {b.couponCodes.map(c => (
                <div class="p-2.5 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
                  <span class="font-mono font-bold text-amber-900 text-sm">{c.code}</span>
                  <span class="text-xs text-amber-800">{c.discount}</span>
                </div>
              ))}
            </div>
          </div>
          <a href={b.affiliateURL} target="_blank" rel="nofollow sponsored noopener noreferrer" class="w-full text-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition">
            前往官网使用优惠码 &rarr;
          </a>
        </div>
      ))}
    </div>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// 7. /brands/alternatives.astro
writePage('brands/alternatives.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '机场品牌平替与备选方案｜主力宕机时的平滑迁移指引';
const description = '一家机场出问题，如何迅速无缝切换？百科机场按线路等级与价格梯队，为您梳理光速云、星岛梦、飞猫云等同级平替方案与双机场冗余配置建议。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场品牌', url: '/brands/' },
  { name: '品牌替代方案', url: '/brands/alternatives/' }
];
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <header class="not-prose mb-8 border-b border-slate-200 pb-6">
      <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">Failover & Redundancy</span>
      <h1 class="text-3xl font-extrabold text-slate-900 mt-1 mb-2">
        机场品牌替代方案：主力宕机时的优雅平替策略
      </h1>
      <p class="text-slate-500 text-xs">发布日期: 2026-11-20 · 百科机场网络实训室</p>
    </header>

    <h2>一、“双机场冗余架构”才是最高稳定性</h2>
    <p>
      在网络代理领域，没有任何一家机场能保证 365 天 100% 毫无波动。最成熟的抗风险策略是：<strong>主力专线机场 + 低成本/不限时备用机场</strong>。
    </p>

    <h2>二、主流品牌同级平替对照表</h2>
    <ul>
      <li><strong>专线品质档平替：</strong>若使用<strong>光速云</strong>（IEPL+企业内网），其同级替代可选择 <strong>星岛梦</strong>（IPLC专线+不限时）或 <strong>Firefly 萤火虫</strong>（IPLC+原生IP）。</li>
      <li><strong>平民性价比档平替：</strong>若使用<strong>飞猫云</strong>（7元档8折），其平替包括 <strong>微风网络</strong>（7元档9折）与 <strong>神行加速</strong>（14元120G）。</li>
      <li><strong>自研免配置档平替：</strong>若习惯<strong>隐形人</strong>（纯自研客户端），平替可考虑 <strong>光速云</strong> 或 <strong>梯子云</strong>（既有自研客户端，又保留开源订阅）。</li>
    </ul>

    <div class="not-prose my-8 p-4 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900">
      <a href="/brands/directory/" class="font-bold text-blue-700 underline">进入品牌库查看所有品牌详细资料与评测 &rarr;</a>
    </div>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

console.log('Brands hub pages completed.');
