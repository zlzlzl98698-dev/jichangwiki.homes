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

// -------------------------------------------------------------
// 1. risk/shutdown.astro
// -------------------------------------------------------------
const shutFaqs = [
  {
    q: '机场跑路前通常有哪些极其明显的“预兆征兆”？',
    a: '跑路前三大经典预警信号：1) 突击大促销：突然在非节假日推出“买一年送一年”或“终身 99 元不限流”的超反常骨折折扣，旨在最后一波圈钱套现；2) 禁言与工单失联：官方 Telegram 大群突然开启全员禁言，客服工单数天无人回复；3) 节点大面积变红：主流节点持续坏死数天无人修复，官方借口“机房被查/被拔线”推诿拖延。'
  },
  {
    q: '为什么说“小作坊机场”最容易跑路？其商业模式缺陷在哪？',
    a: '小作坊机场缺乏自有技术储备与重资金专线合约，通常使用开源面板套壳搭建，靠低价拉人头。由于低估了国际带宽成本与超售后的退款挤兑，当新进用户的资金无法覆盖月度服务器账单时，资金链断裂的运营者往往选择直接关机删库失联。'
  },
  {
    q: '如何彻底规避因机场跑路造成的经济损失？',
    a: '坚持**“月付优先，绝不买多年/永久套餐”**！对于任何初次接触的机场，哪怕年付优惠再大，也务必先按月订购体验；即便对于深受信赖的老牌品牌，也尽量按季付或半年付，单次充值金额严控在个人风险承受范围内（如低于 100 元）。'
  },
  {
    q: '万一遇上机场跑路，已充值的费用能通过支付宝/微信追回吗？',
    a: '极度困难。由于翻墙代理在大陆属于灰色未受监管领域，机场使用的收款通道多为第三方非法发卡网、虚拟币 USDT 或个人转账码。向支付平台投诉往往只能导致发卡商户号被冻结，资金极难原路退回。因此事前风控远胜于事后维权。'
  },
  {
    q: '光速云等成熟老牌品牌如何防范经营风险？',
    a: '光速云具备多年连续稳健运营历史，拥有多地企业级物理专线长期采购合同与庞大的真实付费用户基数，现金流充沛稳定，且始终坚持支持弹性小额月付，运营极度透明规范。'
  },
  {
    q: '机场突然失联是跑路还是不可抗力故障？如何鉴别？',
    a: '如果节点超时但官方 Telegram 频道在半小时内发布了故障公告并同步了修复进度（如光缆施工、DDoS 攻击清洗），通常属于正常技术维护；若连续超过 48 小时音讯全无、网站解析被解析到 localhost 或页面提示 404，则大概率已卷款跑路。'
  }
];

const shutJsonLd = JSON.stringify(makeFaqJsonLd(
  '/risk/shutdown/',
  '机场跑路与失联风险防范指南 - 识别五大跑路前兆与资金避险 | 百科机场',
  '全面揭秘不良机场跑路圈钱内幕，深度拆解骨折促销、工单失联与节点瘫痪等危险信号，手把手教您如何通过月付与备用方案避免财产损失。',
  [
    { name: '首页', url: '/' },
    { name: '风险与替代', url: '/risk/' },
    { name: '跑路风险防范', url: '/risk/shutdown/' }
  ],
  shutFaqs
));

const shutContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${shutJsonLd};
---

<BaseLayout
  title="机场跑路与失联风险防范指南 - 识别五大跑路前兆与避险 | 百科机场"
  description="揭秘翻墙机场卷款跑路黑幕，详细解析跑路前反常打折、工单失联与全红节点信号，坚守月付原则，守卫个人资金安全。"
  canonical="https://jichangwiki.homes/risk/shutdown/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/risk/" class="hover:text-primary-600 transition-colors">风险与替代</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">跑路风险防范</span>
    </nav>

    <header class="bg-gradient-to-br from-rose-950 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-rose-900/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-400/30 mb-4">
          资产安全专题 · 跑路避险指南
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          机场跑路与失联风险防范：识破陷阱与资金避险
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          翻墙行业缺乏法律监管，卷款失联屡见不鲜。本文带您看清小作坊崩盘的资金链本质，掌握识别跑路信号的火眼金睛。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-rose-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <span>跑路防范第一防线</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            <strong>坚决恪守“月付优先”原则！</strong>无论任何品牌宣称多么诱人，绝不购买所谓的“三年付”或“永久会员”。选择具备多年运营历史的老牌大厂（如光速云），将单次消费控制在几十元以内，彻底规避资金损失。
          </p>
        </div>
      </div>
    </header>

    <!-- 跑路前兆矩阵 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-rose-600 rounded-full inline-block"></span>
        <span>机场卷款跑路前的三大典型征兆</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xl font-bold text-rose-600 mb-2">征兆 1：反常骨折促销</div>
          <p class="text-slate-600 text-sm leading-relaxed">
            无缘无故推出“充 100 送 100”、“永久套餐仅需 99 元”等违背商业常识的活动，通常是跑路前最后一次套现。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xl font-bold text-rose-600 mb-2">征兆 2：社群全员禁言</div>
          <p class="text-slate-600 text-sm leading-relaxed">
            官方 Telegram 交流群突然开启禁言或直接解散，工单系统停止派发回复，运营团队处于半失联状态。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xl font-bold text-rose-600 mb-2">征兆 3：主力节点连环瘫痪</div>
          <p class="text-slate-600 text-sm leading-relaxed">
            节点大面积红线超时持续数天，官方不断借口“机房被拔线/运营商检查”，实则是已无力支付下一期机房账单。
          </p>
        </div>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-rose-600 rounded-full inline-block"></span>
        <span>具备长期稳健运营信誉的标杆品牌</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-rose-600 uppercase tracking-wider">老牌长期稳健运营</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全天候稳健经营保障</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云具备多年连续稳健运营历史，拥有多地企业级物理专线长期采购合同与庞大的真实付费用户基数，现金流充沛稳定，且始终坚持支持弹性小额月付，运营极度透明规范。
            </p>
          </div>
          <BrandCTA brand={guangsu} />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-rose-600 rounded-full inline-block"></span>
        <span>跑路防范常见疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {shutFaqs.map(faq => (
          <details class="group bg-white rounded-xl border border-slate-200 p-5 open:bg-slate-50 transition-colors">
            <summary class="font-semibold text-slate-900 cursor-pointer flex justify-between items-center list-none">
              <span>{faq.q}</span>
              <span class="text-rose-600 group-open:rotate-180 transition-transform duration-200">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </span>
            </summary>
            <p class="mt-3 text-slate-600 leading-relaxed text-sm pt-2 border-t border-slate-100">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`;

writePage('risk/shutdown.astro', shutContent);

// -------------------------------------------------------------
// 2. risk/avoid-scams.astro
// -------------------------------------------------------------
const scamFaqs = [
  {
    q: '所谓的“一元包年、9.9元永久不限流量”机场为什么一定是骗局？',
    a: '跨境专线带宽与机房电力属于刚性物理成本。目前正规专线每 Gbps 带宽月成本在数万元以上。一元或 9.9 元甚至连发卡手续费都不够，其运营目的只有两种：1) 聚集数千名小白用户充值后立刻卷款跑路；2) 在节点中进行中间人嗅探劫持流量，甚至转售用户个人隐私变现。'
  },
  {
    q: '有些不良机场是如何暗中“偷跑流量”的？',
    a: '不良机场通过修改后端计费代码：1) 虚标倍率：名字写 1.0x，后台实际按 1.5x-2.0x 结算扣款；2) 空跑流量：即便您关机断网，后台仍按每小时数百兆静默扣除；3) 四舍五入机制：一次几十 KB 的微小握手直接向上舍入为 10MB 计费。'
  },
  {
    q: '网上那些“机场推荐评测博客”给出的榜单完全可信吗？',
    a: '很多个人博客是由某些黑心机场主自导自演搭建的“带货站”，排名前三的往往全是该站长自己开的马甲跑路机场。辨别方法：看评测是否披露真实测速数据、是否提供客观中立的局限性分析，以及是否明确标注入驻条件。'
  },
  {
    q: '在 Telegram 找“代充海外会员”或“买号”有哪些风险？',
    a: 'TG 私聊代充大多使用盗刷黑卡（Carding），一旦原持卡人发起拒付申诉，您的 OpenAI、Netflix 或 Spotify 账号会在数周后被官方永久封禁，造成号财两空。充值务必走正规虚拟卡或官方直付。'
  },
  {
    q: '光速云在防坑诚信方面表现如何？',
    a: '光速云坚持透明实标原则：全线节点倍率与后台计费 100% 同步公开，绝无暗扣偷跑；官方提供精准的流量日志审计面板，每一兆消耗均清晰可核查。'
  },
  {
    q: '遇到机场乱收费或恶意删号，有哪些自卫手段？',
    a: '保留付款流水截图与工单记录，在各主流机场曝光频道（如 Telegram 机场测速评测群、V2EX、相关论坛）公开发布客观证据维权，警示更多受害者。'
  }
];

const scamJsonLd = JSON.stringify(makeFaqJsonLd(
  '/risk/avoid-scams/',
  '机场避坑与防骗全攻略 - 虚假超低价、偷跑流量与黑产套路全揭秘 | 百科机场',
  '全面揭露科学上网黑产三大杀猪盘：虚假一元包年套路、后台暗中偷跑流量、盗刷黑卡充值，助您树立理性消费观念，识别优质合规服务。',
  [
    { name: '首页', url: '/' },
    { name: '风险与替代', url: '/risk/' },
    { name: '避坑防骗指南', url: '/risk/avoid-scams/' }
  ],
  scamFaqs
));

const scamContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${scamJsonLd};
---

<BaseLayout
  title="机场避坑与防骗全攻略 - 虚假超低价与偷跑流量深度揭秘 | 百科机场"
  description="深度曝光翻墙黑产套路：虚假一元包年、后台暗中偷量、中间人劫持与黑卡代充陷阱，为您提供权威防坑指引与理性选型建议。"
  canonical="https://jichangwiki.homes/risk/avoid-scams/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/risk/" class="hover:text-primary-600 transition-colors">风险与替代</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">避坑防骗指南</span>
    </nav>

    <header class="bg-gradient-to-br from-amber-950 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-amber-900/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30 mb-4">
          行业黑幕揭秘 · 消费者避坑守则
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          机场避坑与防骗全攻略：识别套路与黑产陷阱
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          看似极具诱惑力的“9.9 元永久不限流”，背后往往是等待收割的杀猪盘。本文为您拆解行业底层成本逻辑，教您轻松识别欺诈陷阱。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-amber-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <span>避坑常识第一原则</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            <strong>带宽是明码标价的物理资产！</strong>任何宣称“几元钱永久不限流量”的平台，其商业模式根本无法覆盖机房电费。违背商业规律的超低价，其终点唯有卷款失联或出卖用户隐私。
          </p>
        </div>
      </div>
    </header>

    <!-- 典型套路拆解 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-amber-600 rounded-full inline-block"></span>
        <span>翻墙领域三大经典“宰客”套路</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">1. 虚标倍率暗中偷量</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            名字写着 1.0x 标准倍率，后端数据库悄悄按照 1.8x 结算扣款，导致用户的套餐流量不知不觉几天内见底。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">2. 假专线劣质中转</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            在节点名字中疯狂标注“IEPL / IPLC”，实际走的是廉价公网直连，晚高峰丢包率高达 30%，卡顿无比。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">3. 盗刷黑卡代充陷阱</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            在社群兜售超低价代开 ChatGPT Plus 或 Netflix，实为盗刷海外信用卡，不久后引发官方秋后算账永久封号。
          </p>
        </div>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-amber-600 rounded-full inline-block"></span>
        <span>坚持透明实标、拒绝套路的服务商</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-amber-600 uppercase tracking-wider">真诚透明交付</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全天候透明实标</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云坚持透明实标原则：全线节点倍率与后台计费 100% 同步公开，绝无暗扣偷跑；官方提供精准的流量日志审计面板，每一兆消耗均清晰可核查。
            </p>
          </div>
          <BrandCTA brand={guangsu} />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-amber-600 rounded-full inline-block"></span>
        <span>避坑防骗常见疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {scamFaqs.map(faq => (
          <details class="group bg-white rounded-xl border border-slate-200 p-5 open:bg-slate-50 transition-colors">
            <summary class="font-semibold text-slate-900 cursor-pointer flex justify-between items-center list-none">
              <span>{faq.q}</span>
              <span class="text-amber-600 group-open:rotate-180 transition-transform duration-200">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </span>
            </summary>
            <p class="mt-3 text-slate-600 leading-relaxed text-sm pt-2 border-t border-slate-100">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`;

writePage('risk/avoid-scams.astro', scamContent);

// -------------------------------------------------------------
// 3. risk/alternatives.astro
// -------------------------------------------------------------
const altFaqs = [
  {
    q: '为什么说“主力生产力用户必须配备两家互不相关的机场”？',
    a: '任何单一家机场在面对重大不可抗力事件（如特定物理海缆断裂、核心机房火灾断电、或者关键敏感时期的网络震荡）时，都存在瞬时故障的可能。对于跨境电商运营、海外代码开发、学术科研等依赖网络的生产力用户，配备两家采用不同上游专线与机房集群的机场（主备容灾），是保障业务 24 小时绝对不中断的唯一工业级方案。'
  },
  {
    q: '双机场容灾方案如何设计最为经济高效？',
    a: '推荐采用**“主力专线月付套餐 + 备用不限时轻量流量包”**组合：1) 主力机场（如光速云）：购买常规按月付费的专线套餐，享受充沛带宽与原生流媒体解锁；2) 备用机场：购买一次性购买、永不过期的不限时流量包（如几十元 200GB），平时不产生月租成本，仅在主力机场偶发维护时秒切接管。'
  },
  {
    q: '在 Clash 中如何实现两家机场的“无缝自动故障切换（Failover）”？',
    a: '利用 Clash 的 `fallback` 策略组。在策略组中将主力机场的香港专线排在第 1 位，备用机场的香港节点排在第 2 位。平时所有流量 100% 走主力专线；一旦检测到主力专线健康检查包丢包超时，内核在几秒内自动无感切换到备用节点，用户端几乎察觉不到卡顿。'
  },
  {
    q: '两家机场的入口如果都是同一个电信运营商机房，算不算有效容灾？',
    a: '不算！有效容灾要求“入口物理分散”。最好一家主力采用深圳 BGP 入口，另一家备用采用上海/北京入口；或者一家走 IEPL 专线，另一家备用公网多线直连，从而彻底规避单点运营商割接带来的共振瘫痪。'
  },
  {
    q: '光速云作为主力机场，其容灾底色如何？',
    a: '光速云自身具备多条物理专线热备机制，深港、沪日、沪美等多路由冗余调度，在过去多年的运营中保持了极高的在线率，是业内公认最适合充当主力生产力通道的品牌之一。'
  },
  {
    q: '自建 VPS 节点可以作为商业专线机场的有效备用吗？',
    a: '可以，但维护成本较高。自建节点走的是公网，在敏感时期极易被封锁 IP；但由于完全由个人掌握，作为最后的应急调试通道具备一定存在价值。'
  }
];

const altJsonLd = JSON.stringify(makeFaqJsonLd(
  '/risk/alternatives/',
  '备用机场与多线容灾架构方案 - 双机场冷热备份与自动Failover | 百科机场',
  '针对跨境商务、科研开发等生产力用户的断网零容忍需求，深度讲解双机场容灾模型、不限时流量包兜底、Clash Fallback 策略与异地 BGP 协同。',
  [
    { name: '首页', url: '/' },
    { name: '风险与替代', url: '/risk/' },
    { name: '多线容灾与备用方案', url: '/risk/alternatives/' }
  ],
  altFaqs
));

const altContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${altJsonLd};
---

<BaseLayout
  title="备用机场与多线容灾架构方案 - 双机场冷热备份实战 | 百科机场"
  description="面向跨境电商、开发者与科研学者的网络高可用指南，详解“主力专线月付 + 备用不限时流量包”双机场容灾模型，告别突发断网危机。"
  canonical="https://jichangwiki.homes/risk/alternatives/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/risk/" class="hover:text-primary-600 transition-colors">风险与替代</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">多线容灾方案</span>
    </nav>

    <header class="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-indigo-900/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 mb-4">
          高可用生产力 · 业务零断联
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          备用机场与多线容灾架构：构建永不断线的网络系统
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          不要把所有鸡蛋放在同一个篮子里。对于跨境电商开店、外贸客户沟通、科研论文查阅而言，断网一小时的损失远超一年的梯子费用。本文为您设计高可靠容灾模型。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-indigo-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            <span>黄金容灾模型推荐</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            <strong>主力（月付高带宽专线，如光速云） + 备用（按量计费不限时小包）</strong>。<br/>
            在 Clash 中建立 Fallback 策略组，平时主力全速冲浪，主力偶发割接时备用秒级平滑接管，月度额外成本几乎为零。
          </p>
        </div>
      </div>
    </header>

    <!-- 容灾实战架构 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
        <span>双机场容灾部署三步走</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">1. 物理链路解耦</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            确保主力与备用机场不属于同一家技术团队，入口分别位于不同省份（如深港与沪日分离），实现物理隔离。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">2. 成本最小化配置</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            主力机场按月订阅享受充沛流量，备用机场选用永不过期的按量流量包，不使用不扣费，长期守候。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">3. 策略组自动切换</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            利用客户端 Fallback 策略组，设置 300 秒健康检测，实现主力断开时无感切换，恢复后自动回切。
          </p>
        </div>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
        <span>主力生产力旗舰首选品牌</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider">生产力高可用基石</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全天候主力网络护航</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云具备多条物理专线热备机制，深港、沪日、沪美等多路由冗余调度，在过去多年的运营中保持了极高的在线率，是业内公认最适合充当主力生产力通道的品牌之一。
            </p>
          </div>
          <BrandCTA brand={guangsu} />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
        <span>容灾与备用方案常见疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {altFaqs.map(faq => (
          <details class="group bg-white rounded-xl border border-slate-200 p-5 open:bg-slate-50 transition-colors">
            <summary class="font-semibold text-slate-900 cursor-pointer flex justify-between items-center list-none">
              <span>{faq.q}</span>
              <span class="text-indigo-600 group-open:rotate-180 transition-transform duration-200">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </span>
            </summary>
            <p class="mt-3 text-slate-600 leading-relaxed text-sm pt-2 border-t border-slate-100">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`;

writePage('risk/alternatives.astro', altContent);

// -------------------------------------------------------------
// 4. risk/refunds.astro
// -------------------------------------------------------------
const refFaqs = [
  {
    q: '为什么绝大多数翻墙机场在服务条款（TOS）中明确写明“一经售出，概不退款”？',
    a: '主要基于三个现实行业原因：1) 带宽资产无法逆向回收：专线带宽与机房服务器租金是按月向运营商预付的刚性开支；2) 防恶意白嫖：若支持无条件退款，会有大量投机用户在下载完数百 GB 电影或短时间使用后申请退款，造成带宽超载；3) 支付手续费损耗：第三方发卡平台与虚拟币通道退款流程复杂且手续费高昂。'
  },
  {
    q: '在什么情况下正规机场“应当”或“可以协商”给予用户退款或补偿？',
    a: '当发生以下由于服务商单方面重大过失导致的事故时：1) 购买后由于机场官方节点全盘故障，用户在 24-48 小时内完全无法建立任何有效连接；2) 购买的套餐与官方宣传严重不符（如标明全专线实际全为公网）；3) 机场官方主动宣布进行资产重组或停止运营。此时通常退还剩余未使用的折算费用。'
  },
  {
    q: '如何衡量一家机场的“售后客服质量与响应速度（SLA）”？',
    a: '优质机场应当提供工单（Ticket）支持或官方 Telegram 在线技术客服。工单响应时间在工作时间内通常小于 2-4 小时；而劣质小作坊往往没有工单系统，或工单提交后数天无人问津甚至被管理员直接拉黑。'
  },
  {
    q: '通过支付宝或微信付款后，如果机场涉嫌欺诈能申请争议申诉吗？',
    a: '可以尝试向微信支付/支付宝的“账单详情 -&gt; 对订单有疑惑 -&gt; 投诉商户”提交欺诈、虚假发货证据。虽然由于业务敏感性不一定能原路追回资金，但多起真实投诉会促使支付机构冻结该商户收款号，对其形成实质威慑。'
  },
  {
    q: '光速云在用户权益与售后支持方面有何承诺？',
    a: '光速云建立了规范的售后支持体系，专业工程师团队提供工单及时响应，并支持极低门槛的月付小额试水，最大限度降低用户消费试错风险。'
  },
  {
    q: '如何避免因不退款条款遭受损失？',
    a: '唯一的终极对策就是**“永远先买最低额度的月付套餐”**进行实测。用您自己的设备、在您自己常住的宽带与 5G 网络下实测几天，满意后再根据需要续费，从源头上杜绝退款纠纷。'
  }
];

const refJsonLd = JSON.stringify(makeFaqJsonLd(
  '/risk/refunds/',
  '机场退款政策与售后服务深度调查 - 霸王条款剖析与争议维权 | 百科机场',
  '全面调研翻墙机场行业“概不退款”背后的成本成因，剖析霸王条款边界、工单响应 SLA 评测标准，教用户如何科学试水与有效避坑。',
  [
    { name: '首页', url: '/' },
    { name: '风险与替代', url: '/risk/' },
    { name: '退款与售后政策', url: '/risk/refunds/' }
  ],
  refFaqs
));

const refContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${refJsonLd};
---

<BaseLayout
  title="机场退款政策与售后服务深度调查 - 霸王条款剖析与争议维权 | 百科机场"
  description="深度调查翻墙机场行业普遍存在的“不退款”条款成因与法律边界，详解工单 SLA 响应标准、小额月付试水与争议维权指引。"
  canonical="https://jichangwiki.homes/risk/refunds/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/risk/" class="hover:text-primary-600 transition-colors">风险与替代</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">退款与售后政策</span>
    </nav>

    <header class="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-slate-700 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-slate-700 text-slate-200 border border-slate-600 mb-4">
          权益与维权专题 · 服务条款深度调查
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          机场退款政策与售后服务深度调查：看清条款与权责
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          “一经售出，概不退款”是整个翻墙机场圈近乎通行的潜规则。本文带您看透其背后的真实成本机制，教您用正确的姿势守护消费者权益。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-slate-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>百科核心消费箴言</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            默认所有机场<strong>均不支持七天无理由退款</strong>！避免纠纷的唯一正确路径，是<strong>将“月付（十几元）”作为付费的试金石</strong>。实测满意再长期订阅，从根源上将试错成本降到最低。
          </p>
        </div>
      </div>
    </header>

    <!-- 行业现状调查 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-slate-800 rounded-full inline-block"></span>
        <span>退款难背后的三大行业客观限制</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">1. 专线带宽刚性成本</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            专线合同是按月向基础运营商预付的，已分配的带宽无法像实物商品一样回滚退货。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">2. 防恶意刷流薅羊毛</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            无理由退款极易被滥用为“临时下载几百 GB 资源随后退款”，严重损害正常付费用户的公摊带宽。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">3. 支付通道高额扣率</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            第三方发卡网与跨境通道的手续费高达 3%-8%，且单向收取不退还，退款操作难度极高。
          </p>
        </div>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-slate-800 rounded-full inline-block"></span>
        <span>提供完备工单支持的标杆服务商</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-slate-600 uppercase tracking-wider">售后规范体系</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全天候工单支持</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云建立了规范的售后支持体系，专业工程师团队提供工单及时响应，并支持极低门槛的月付小额试水，最大限度降低用户消费试错风险。
            </p>
          </div>
          <BrandCTA brand={guangsu} />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-slate-800 rounded-full inline-block"></span>
        <span>退款与售后常见疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {refFaqs.map(faq => (
          <details class="group bg-white rounded-xl border border-slate-200 p-5 open:bg-slate-50 transition-colors">
            <summary class="font-semibold text-slate-900 cursor-pointer flex justify-between items-center list-none">
              <span>{faq.q}</span>
              <span class="text-slate-600 group-open:rotate-180 transition-transform duration-200">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </span>
            </summary>
            <p class="mt-3 text-slate-600 leading-relaxed text-sm pt-2 border-t border-slate-100">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`;

writePage('risk/refunds.astro', refContent);

// -------------------------------------------------------------
// 5. risk/security.astro
// -------------------------------------------------------------
const secFaqs = [
  {
    q: '使用机场翻墙，机场主能看到我的网页浏览内容和账号密码吗？',
    a: '当今全球互联网已经有超过 98% 的流量全面升级为 TLS/HTTPS 强加密。在 HTTPS 传输下，机场服务器只能看到您连接的目标服务器 IP 与访问的域名（SNI，例如知道你访问了 google.com），但绝对无法看到您在网页中传输的任何具体内容、聊天记录或账号密码（这些在您本地浏览器中已完成端到端强加密）。'
  },
  {
    q: '在什么情况下机场主可能窃取用户信息？',
    a: '如果客户端诱导您安装了陌生的“根证书 (Root CA Certificate)”！一旦在电脑或手机上信任了该根证书，恶意代理服务器即可在后台执行“中间人攻击（MITM）”，合法解密并明文查看所有 HTTPS 加密流量。因此，**凡是要求手动安装信任根证书的非抓包类翻墙工具，100% 存在极高安全威胁，严禁安装！**'
  },
  {
    q: '机场通常会记录用户的哪些访问日志？会保留多久？',
    a: '正规专业的机场面板通常仅统计用户的总流量产生量（作为扣费依据）以及当前在线设备 IP 并发数，并开启了服务端的无日志（No-Logs）编译选项，不对任何具体的域名访问流向进行磁盘落盘；而劣质小作坊可能使用默认配置保留了详细的连接日志，存在被黑客攻破脱库的风险。'
  },
  {
    q: '在公共商场、咖啡厅 Wi-Fi 下使用专线代理安全吗？',
    a: '非常安全！公共未加密 Wi-Fi 极易遭受局域网 ARP 欺骗与旁路抓包。开启专线代理后，您设备的所有外网数据在离开网卡前就已经被 Trojan/Shadowsocks 强加密，黑客在公共 Wi-Fi 中只能截获不可解读的高熵乱码。'
  },
  {
    q: '光速云在用户隐私与数据安全方面遵循什么规范？',
    a: '光速云全线专线服务器执行严格的内存运行与零日志（No-Logs）审计规范，绝不安装任何中间人证书，全节点仅作透明数据包转发，全力捍卫用户的网络通讯自由与数字隐私安全。'
  },
  {
    q: '如何检测自己是否存在 WebRTC 本地真实 IP 泄露？',
    a: '在连接代理后，访问专门的检测网站（如 browserleaks.com/webrtc 或 whoer.net）。如果页面中显示的 WebRTC Public/Local IP 出现了中国大陆的宽带 IP，说明存在泄露。可在浏览器设置或安装 WebRTC Control 插件将其彻底禁用。'
  }
];

const secJsonLd = JSON.stringify(makeFaqJsonLd(
  '/risk/security/',
  '科学上网安全与隐私保护红线 - 中间人嗅探、根证书陷阱与日志审计 | 百科机场',
  '全面科普翻墙过程中的数据加密机制，揭秘中间人攻击与恶意根证书风险，详解 HTTPS 端到端加密原理、零日志规范与 WebRTC 泄露防范。',
  [
    { name: '首页', url: '/' },
    { name: '风险与替代', url: '/risk/' },
    { name: '安全与隐私保护', url: '/risk/security/' }
  ],
  secFaqs
));

const secContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${secJsonLd};
---

<BaseLayout
  title="科学上网安全与隐私保护红线 - 揭露中间人嗅探与根证书陷阱 | 百科机场"
  description="详解科学上网安全底线：HTTPS 端到端强加密、恶意根证书陷阱警示、机场日志保留审查真相及公共 Wi-Fi 防窃听完全指南。"
  canonical="https://jichangwiki.homes/risk/security/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/risk/" class="hover:text-primary-600 transition-colors">风险与替代</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">安全与隐私保护</span>
    </nav>

    <header class="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-indigo-900/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 mb-4">
          数字安全底线 · 密码学与隐私防线
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          科学上网安全与隐私保护指南：守住数字世界的绝对红线
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          翻墙是否会导致个人密码与隐私泄露？机场主能否偷窥我的聊天记录？本文从密码学与网络协议深度切入，教您识别危险陷阱，构筑坚不可摧的隐私堡垒。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-indigo-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            <span>隐私安全绝对红线 (Security Redline)</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            在现代 HTTPS 强加密下，<strong>机场绝对无法看到您的任何明文密码与通信内容</strong>；但<strong>严禁在任何设备上信任安装来路不明的“系统根证书 (Root CA)”</strong>，否则对方将获得全面解密您全部加密流量的最高特权！
          </p>
        </div>
      </div>
    </header>

    <!-- 核心安全矩阵 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
        <span>隐私安全三大防御关键点</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">1. 端到端 HTTPS 加密</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            银行、Google、微信均具备高强度 TLS 加密，代理节点仅作为数据搬运工，中途无法解密明文。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">2. 拒绝恶意根证书</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            任何正规代理协议（Clash/Shadowrocket）均不需要安装根证书。凡提示安装描述文件/证书的软件立即卸载。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">3. 杜绝 WebRTC 泄露</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            在浏览器中检查并关闭 WebRTC 接口，防止局域网真实运营商 IP 在特定网页调用时发生旁路泄露。
          </p>
        </div>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
        <span>坚持零日志审计的标杆品牌</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider">零日志隐私保障</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全天候隐私护航</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云全线专线服务器执行严格的内存运行与零日志（No-Logs）审计规范，绝不安装任何中间人证书，全节点仅作透明数据包转发，全力捍卫用户的网络通讯自由与数字隐私安全。
            </p>
          </div>
          <BrandCTA brand={guangsu} />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
        <span>安全与隐私常见疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {secFaqs.map(faq => (
          <details class="group bg-white rounded-xl border border-slate-200 p-5 open:bg-slate-50 transition-colors">
            <summary class="font-semibold text-slate-900 cursor-pointer flex justify-between items-center list-none">
              <span>{faq.q}</span>
              <span class="text-indigo-600 group-open:rotate-180 transition-transform duration-200">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </span>
            </summary>
            <p class="mt-3 text-slate-600 leading-relaxed text-sm pt-2 border-t border-slate-100">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`;

writePage('risk/security.astro', secContent);

console.log('ALL 5 RISK SECONDARY PAGES WRITTEN!');
