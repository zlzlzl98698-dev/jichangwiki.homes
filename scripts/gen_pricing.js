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

// 1. /pricing/index.astro
writePage('pricing/index.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '机场价格与套餐专题｜便宜机场、月付方案与不限时资费横评';
const description = '百科机场价格与套餐中心：建立统一对比口径，详细解析一元机场、5-10元便宜机场、灵活月付与一次性不过期不限时流量套餐，拒绝价格暗坑。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '价格与套餐', url: '/pricing/' }
];

const subSections = [
  { name: '便宜机场', url: '/pricing/cheap/', desc: '单月10元以内平价优选', icon: '🏷️' },
  { name: '一元机场', url: '/pricing/one-yuan/', desc: '极致低价机制与安全避坑', icon: '🪙' },
  { name: '一分机场', url: '/pricing/one-cent/', desc: '试用极低价与套路识别', icon: '🔍' },
  { name: '月付机场', url: '/pricing/monthly/', desc: '拒绝年付套牢，支持单月续费', icon: '📅' },
  { name: '不限时机场', url: '/pricing/lifetime/', desc: '流量不过期长效备用套餐', icon: '⏳' },
  { name: '性价比机场', url: '/pricing/value/', desc: '综合速率与单GB成本精选', icon: '⚖️' }
];

const cheapPicks = brands.filter(b => b.minMonthlyPrice && b.minMonthlyPrice <= 15).slice(0, 6);
const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <div class="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-xl">
      <div class="max-w-3xl">
        <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold border border-emerald-400/30">
          一级专题 · 价格与套餐模型解析
        </span>
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 mb-4">
          机场价格与资费模型：看透年付折算与真实月付
        </h1>
        <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
          许多商家宣传“每月仅需 8 元”，但实际上需要一次性预付整年 99 元；还有商家宣称 1000G 超大流量，却在后台设置了 3x-5x 隐藏倍率。本专题帮您看清真实成本，选到真正高性价比的服务。
        </p>
      </div>
    </div>

    <!-- Sub sections -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-12">
      {subSections.map((s) => (
        <a href={s.url} class="p-4 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition group text-center">
          <div class="text-2xl mb-1 group-hover:scale-110 transition-transform">{s.icon}</div>
          <h2 class="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{s.name}</h2>
          <p class="text-[11px] text-slate-500 mt-1 line-clamp-2">{s.desc}</p>
        </a>
      ))}
    </div>

    <!-- Editorial: Pricing Metric Standard -->
    <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-12 prose prose-slate max-w-none text-sm sm:text-base leading-relaxed">
      <h2 class="text-2xl font-bold text-slate-900 mb-4">
        百科机场统一价格比较口径规范
      </h2>
      <p>
        为了确保全站数据公开透明，百科机场对所有品牌的套餐建立统一的<strong>真实支付价格、付款周期、每月配额、流量有效期与倍率换算</strong>：
      </p>

      <div class="overflow-x-auto not-prose my-6">
        <table class="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
          <thead class="bg-slate-100 text-slate-700 font-bold">
            <tr>
              <th class="p-3">价格类型</th>
              <th class="p-3">计费方式</th>
              <th class="p-3">代表品牌与套餐</th>
              <th class="p-3">真实支付门槛</th>
              <th class="p-3">核心避坑提示</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-600">
            <tr>
              <td class="p-3 font-bold text-slate-900">年付折算低价</td>
              <td class="p-3">按年一次性支付</td>
              <td class="p-3">光速云轻量版 (¥99/年，折合约¥8/月)</td>
              <td class="p-3 font-mono">实付 ¥99</td>
              <td class="p-3">不能单月续费，需确认品牌长期稳健性</td>
            </tr>
            <tr>
              <td class="p-3 font-bold text-slate-900">真月付平价</td>
              <td class="p-3">按月随时续费</td>
              <td class="p-3">飞猫云 (¥7/月折后¥5.6)、大佬云 (¥5.6/月)</td>
              <td class="p-3 font-mono">实付 ¥5.6 - ¥7</td>
              <td class="p-3">试错成本极低，适合小白入门或备用</td>
            </tr>
            <tr>
              <td class="p-3 font-bold text-slate-900">不限时流量包</td>
              <td class="p-3">一次性付费不过期</td>
              <td class="p-3">光速云斯诺克147 (¥147/247G)、星岛梦 (¥99/200G)</td>
              <td class="p-3 font-mono">一次性付清</td>
              <td class="p-3">无月租清零压力，适合低频长期备用</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Banner for Guangsu -->
    <BrandCTA 
      brandName={guangsu.name}
      affiliateURL={guangsu.affiliateURL}
      couponCode="AMM"
      entryPrice={guangsu.entryPrice}
      variant="banner"
    />

    <!-- Low price picks -->
    <div class="my-10">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">平民低预算热门机场推荐</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cheapPicks.map(b => (
          <BrandCard brand={b} />
        ))}
      </div>
    </div>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// 2. /pricing/cheap.astro
writePage('pricing/cheap.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '便宜机场推荐｜单月10元以内高性价比代理精选';
const description = '精选单月资费在 5-10 元左右的便宜机场：包含飞猫云、微风网络、大佬云、闪电鼠及光速云年付特惠，详细拆解低价套餐的真实带宽与流量配给。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '价格与套餐', url: '/pricing/' },
  { name: '便宜机场推荐', url: '/pricing/cheap/' }
];

const cheapBrands = brands.filter(b => b.minMonthlyPrice && b.minMonthlyPrice <= 10);
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8">
      <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider">Budget Friendly</span>
      <h1 class="text-3xl font-extrabold text-slate-900 mt-1 mb-3">
        便宜机场推荐：10元内平民价位真实横评
      </h1>
      <p class="text-slate-600 text-sm max-w-3xl leading-relaxed">
        便宜不等于劣质。通过优化国内中转带宽复用率与采用现代低开销轻量协议（VLESS），不少优秀服务商能够将月付价格压低至 <strong>5.6 元至 8 元</strong>，满足日常网页、社交媒体与高清视频需求。
      </p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {cheapBrands.map(b => (
        <BrandCard brand={b} />
      ))}
    </div>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// 3. /pricing/one-yuan.astro
writePage('pricing/one-yuan.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';

const title = '一元机场靠谱吗？一元机场原理、风险与真实评测';
const description = '1元机场为什么这么便宜？百科机场深度解析一元机场的公网中转复用原理、超售比例、跑路周期与隐私安全性，为您提供客观的避坑指南。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '价格与套餐', url: '/pricing/' },
  { name: '一元机场深度解析', url: '/pricing/one-yuan/' }
];
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <header class="not-prose mb-8 border-b border-slate-200 pb-6">
      <span class="text-xs font-bold text-amber-600 uppercase tracking-wider">In-Depth Analysis</span>
      <h1 class="text-3xl font-extrabold text-slate-900 mt-1 mb-2">
        一元机场靠谱吗？看透超低价背后的运作模式与风险
      </h1>
      <p class="text-slate-500 text-xs">发布日期: 2026-11-20 · 百科机场技术评测室</p>
    </header>

    <h2>一、一元机场为什么能做到这么便宜？</h2>
    <p>
      “一元机场”（或几元机场）通常采用<strong>廉价公网直连 VPS 或超高复用率的公网隧道中转</strong>。其运作核心是“超售”：一台 1Gbps 带宽的母机分配给成千上万个轻度用户，赌绝大多数用户平时不在线。
    </p>

    <h2>二、一元机场的三大不可避免弊端</h2>
    <ol>
      <li><strong>晚高峰卡顿与高丢包：</strong>一到晚上 8 点后，超售带宽瞬间被挤爆，延迟飙升至 300ms 以上，视频频繁缓冲。</li>
      <li><strong>频繁遭遇 GFW 阻断：</strong>廉价公网出口 IP 极易被墙，且服务商缺少专线灾备预算，换 IP 周期漫长。</li>
      <li><strong>AI 与流媒体极低解锁率：</strong>公网廉价机房 IP 早已被 OpenAI、Netflix 批量列入风控黑名单。</li>
    </ol>

    <h2>三、科学看待与替代方案</h2>
    <p>
      一元机场可以作为<strong>纯文字网页查阅或临时紧急失联时的备选</strong>，但切勿将其作为日常生产力工具或跨境工作的主力。若预算在 10 元左右，更推荐具备真实专线中转的平价机场（如飞猫云 8 折后 ¥5.6、光速云年付折算约 ¥8/月）。
    </p>

    <div class="not-prose my-8 p-4 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900">
      <a href="/pricing/cheap/" class="font-bold text-blue-700 underline">点击查看：10元内更稳定的平价替代机场清单 &rarr;</a>
    </div>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// 4. /pricing/one-cent.astro
writePage('pricing/one-cent.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';

const title = '一分机场套路揭秘｜0.01元试用背后的陷阱与防坑';
const description = '为什么网上有一分机场？是真实福利还是吸粉跑路套路？百科机场为您拆解 0.01 元试用机场背后的个人隐私收集、强制绑定年付与钓鱼链接风险。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '价格与套餐', url: '/pricing/' },
  { name: '一分机场套路揭秘', url: '/pricing/one-cent/' }
];
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <header class="not-prose mb-8 border-b border-slate-200 pb-6">
      <span class="text-xs font-bold text-rose-600 uppercase tracking-wider">Scam Prevention</span>
      <h1 class="text-3xl font-extrabold text-slate-900 mt-1 mb-2">
        一分机场套路揭秘：0.01元试用背后的商业陷阱
      </h1>
      <p class="text-slate-500 text-xs">发布日期: 2026-11-20 · 百科机场防坑指南</p>
    </header>

    <h2>一、一分钱买机场：商家图什么？</h2>
    <p>
      在网络黑产与营销中，“0.01元/1分钱”并非真实的商品交易，其真实目的通常有三种：
    </p>
    <ul>
      <li><strong>收集用户个人信息：</strong>诱导用户在注册页面输入常用邮箱与密码，进行密码撞库。</li>
      <li><strong>强制绑定自动续费：</strong>通过第三方不正规免签支付接口，暗中开通高额自动扣费。</li>
      <li><strong>钓鱼与吸粉引流：</strong>进入后实际节点根本无法连接，页面全是诱导下载木马客户端或赌博广告。</li>
    </ul>

    <h2>二、防范指南</h2>
    <p>
      千万不要在未经信誉核实的“一分机场”网站使用与日常相同的密码。测试代理服务应选择明码标价、具备正常客服与运营历史的品牌。
    </p>

    <div class="not-prose my-8 p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
      <a href="/airport/reliable/" class="font-bold text-emerald-700 underline">返回查看：真正靠谱可信的老牌机场精选 &rarr;</a>
    </div>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// 5. /pricing/monthly.astro
writePage('pricing/monthly.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '月付机场推荐｜拒绝年付套牢，支持单月弹性续费的机场甄选';
const description = '为什么资深玩家都坚持买月付？百科机场精选支持 15-25 元单月付费、无强制年付绑定、支持按月调整的优质月付机场推荐。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '价格与套餐', url: '/pricing/' },
  { name: '月付机场推荐', url: '/pricing/monthly/' }
];

const monthlyBrands = brands.filter(b => b.plans.some(p => p.billing === '月付' && p.price <= 25)).slice(0, 6);
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8">
      <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">Flexible Monthly Billing</span>
      <h1 class="text-3xl font-extrabold text-slate-900 mt-1 mb-3">
        月付机场推荐：按月续费更自由，资金风险近乎为零
      </h1>
      <p class="text-slate-600 text-sm max-w-3xl leading-relaxed">
        <strong>“新用户首购一律月付”</strong>是避免被跑路机场套牢的黄金守则。月付让您在遭遇商家降速、节点失效或换主时能够毫不犹豫地更换替代方案。
      </p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {monthlyBrands.map(b => (
        <BrandCard brand={b} />
      ))}
    </div>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// 6. /pricing/lifetime.astro
writePage('pricing/lifetime.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '不限时机场推荐｜流量不过期、一次性付费长效备用套餐';
const description = '出差用量少？不限时套餐流量永不过期。精选光速云致敬斯诺克147、星岛梦、灵动云等提供一次性按量付费不限时机场，随时备用防断网。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '价格与套餐', url: '/pricing/' },
  { name: '不限时机场推荐', url: '/pricing/lifetime/' }
];

const lifetimeBrands = brands.filter(b => b.plans.some(p => p.billing.includes('一次性') || p.period.includes('不过期'))).slice(0, 6);
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8">
      <span class="text-xs font-bold text-purple-600 uppercase tracking-wider">Non-Expiring Data</span>
      <h1 class="text-3xl font-extrabold text-slate-900 mt-1 mb-3">
        不限时机场推荐：流量不过期，低频备用长效之选
      </h1>
      <p class="text-slate-600 text-sm max-w-3xl leading-relaxed">
        对于每月只需消耗十几个G、甚至平时只在出差时使用的用户，按月清零的月租模式非常不划算。<strong>不限时套餐</strong>一次性付费，流量用完为止，是理想的第二梯队备用灾备线路。
      </p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {lifetimeBrands.map(b => (
        <BrandCard brand={b} />
      ))}
    </div>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// 7. /pricing/value.astro
writePage('pricing/value.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '高性价比机场推荐｜每GB单价、专线速率与综合价值平衡';
const description = '什么是真正的性价比？百科机场从单GB价格、节点倍率真实性、IEPL专线占比及流媒体解锁支持，精选 2026 综合性价比最高的优质机场。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '价格与套餐', url: '/pricing/' },
  { name: '性价比机场推荐', url: '/pricing/value/' }
];

const valueBrands = brands.filter(b => b.minMonthlyPrice && b.minMonthlyPrice <= 20).slice(0, 6);
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8">
      <span class="text-xs font-bold text-cyan-600 uppercase tracking-wider">Best Value For Money</span>
      <h1 class="text-3xl font-extrabold text-slate-900 mt-1 mb-3">
        性价比机场推荐：兼顾专线速度与平民价格
      </h1>
      <p class="text-slate-600 text-sm max-w-3xl leading-relaxed">
        真正的性价比不是单纯的价格最低，而是在<strong>15-20元价位段内提供真专线、真低延迟与真无暗扣倍率</strong>。以下品牌在性能与价格平衡点上表现优异。
      </p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {valueBrands.map(b => (
        <BrandCard brand={b} />
      ))}
    </div>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

console.log('Pricing topic pages completed.');
