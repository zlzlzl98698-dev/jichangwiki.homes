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
// 1. network/iepl.astro
// -------------------------------------------------------------
const ieplFaqs = [
  {
    q: '什么是 IEPL 专线？它的物理通信原理是什么？',
    a: 'IEPL（International Ethernet Private Line，国际以太网专线）是基础电信运营商（如中国电信、中国联通、PCCW 等）通过二层物理光缆网络，在大陆境内入口局（如深圳、上海）到海外机房（如香港、东京）之间建立的点对点独享物理通道。数据完全在运营商的内网光纤中传输，物理上不经过公网国际互联出口（NAP），因此天然免受国家级防火墙（GFW）的公网主动探测与流量识别封锁。'
  },
  {
    q: 'IEPL 与普通公网直连（BGP中转/CN2）有何本质区别？',
    a: '公网直连在晚高峰必须与全国数以亿计的国际公网流量挤占有限的国际海缆带宽，丢包率往往激增至 15%-30%；而 IEPL 专线属于运营商合同保障的内网私有带宽，端到端丢包率低于 0.1%，物理延迟恒定且晚高峰零抖动。'
  },
  {
    q: '为什么 IEPL 专线在特殊敏感时期依然能保持 100% 可用？',
    a: '因为 GFW 部署于中国公网国际出入口网关。IEPL 的物理报文直接在点对点内网以太网帧中封装传输，不暴露在公网路由器上，因此防火墙无法对其进行深度包检测（DPI）或下发 RST 阻断指令。'
  },
  {
    q: '很多不良机场声称是“全 IEPL 专线”，实际上如何辨别真伪？',
    a: '辨别真伪的方法：1) 抓包或 traceroute 测试国内入口到海外出口的跳数，真专线通常在内网 2-3 跳内即完成跨境交接，无公网骨干网路由；2) 晚高峰（21:00）进行大文件持续测速并监测 Ping 抖动，真专线 Ping 曲线极其平直无突刺；3) 检查价格，真专线每 Gbps 带宽月租极其昂贵，几块钱几百 GB 的套餐绝不可能为全专线。'
  },
  {
    q: '光速云的 IEPL 专线质量如何？',
    a: '光速云与主流一级运营商签署了高规格商业 IEPL 专线带宽协议，具备深圳-香港、上海-东京等多条主力物理内网链路，提供 99.9% SLA 在线率保障，是业内少有的真专线代表。'
  },
  {
    q: 'IEPL 专线会断线吗？在什么情况下会出现波动？',
    a: '虽然免受 GFW 封锁，但若发生不可抗力物理事件（如海底光缆被渔船挂断、地震导致陆缆中断，或运营商入口机房断电升级），专线也会中断。负责任的机场（如光速云）会配置多条不同物理路径的专线热备，秒级自动故障切换。'
  }
];

const ieplJsonLd = JSON.stringify(makeFaqJsonLd(
  '/network/iepl/',
  'IEPL 国际以太网专线深度解析 - 物理内网、抗封锁原理与真伪辨别 | 百科机场',
  '全面科普 IEPL 专线的网络拓扑、二层以太网物理传输机理、抗 GFW 封锁优势，教用户如何科学鉴别真假专线，避免踩坑虚假宣传。',
  [
    { name: '首页', url: '/' },
    { name: '线路与节点', url: '/network/' },
    { name: 'IEPL 专线解析', url: '/network/iepl/' }
  ],
  ieplFaqs
));

const ieplContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${ieplJsonLd};
---

<BaseLayout
  title="IEPL 国际以太网专线深度解析 - 物理内网架构与抗封锁原理 | 百科机场"
  description="深度拆解科学上网顶级线路 IEPL 的物理层传输原理、二层内网直连优势，对比公网中转差异，手把手教您识破假专线套路。"
  canonical="https://jichangwiki.homes/network/iepl/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/network/" class="hover:text-primary-600 transition-colors">线路与节点</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">IEPL 专线解析</span>
    </nav>

    <header class="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-indigo-900/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 mb-4">
          顶级网络架构 · 物理专线解析
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          IEPL 国际以太网专线深度解析：物理内网与抗封锁原理
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          在翻墙机场领域，IEPL 被公认为稳定性的天花板。本文从电信工程学视角，为您揭秘二层以太网直连的底层物理拓扑及其绝对抗封锁的秘密。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-indigo-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>IEPL 核心技术结论 (Verdict)</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            IEPL 是<strong>端到端二层以太网物理专线，其数据流完全在运营商骨干内网中封闭传输，不经过中国大陆公网国际出口</strong>。因此，无论外界封锁政策如何收紧，真 IEPL 专线均能维持 99.9% 的连通率与毫秒级极速响应。
          </p>
        </div>
      </div>
    </header>

    <!-- 架构对比表 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
        <span>IEPL 物理专线 vs 传统公网线路技术指标对比</span>
      </h2>
      <div class="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
        <table class="w-full text-left text-sm text-slate-600">
          <thead class="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
            <tr>
              <th class="p-4">关键属性</th>
              <th class="p-4">普通公网中转 / 直连</th>
              <th class="p-4 text-indigo-700 bg-indigo-50/50">IEPL 物理内网专线 (光速云)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr>
              <td class="p-4 font-bold text-slate-900">网络 OSI 层次</td>
              <td class="p-4">三层 IP 公网路由</td>
              <td class="p-4 font-semibold text-indigo-600 bg-indigo-50/20">二层以太网链路（Layer 2 Ethernet）</td>
            </tr>
            <tr>
              <td class="p-4 font-bold text-slate-900">过境通信路径</td>
              <td class="p-4">经过公网国际海缆出口 (受 GFW 审查)</td>
              <td class="p-4 font-semibold text-emerald-600 bg-indigo-50/20">运营商物理专用内网管道 (完全绕过 GFW)</td>
            </tr>
            <tr>
              <td class="p-4 font-bold text-slate-900">晚高峰丢包率</td>
              <td class="p-4 text-rose-600">10% - 30% 严重抖动</td>
              <td class="p-4 font-semibold text-emerald-600 bg-indigo-50/20">&lt; 0.1% 电信级恒定零丢包</td>
            </tr>
            <tr>
              <td class="p-4 font-bold text-slate-900">特殊时期抗封锁率</td>
              <td class="p-4 text-amber-600">极易被大面积阻断</td>
              <td class="p-4 font-semibold text-emerald-600 bg-indigo-50/20">100% 免疫公网封锁与 IP 污染</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
        <span>真 IEPL 专线品质保障代表</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider">真专线企业级交付</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全物理 IEPL 专线集群</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云具备端到端真实物理 IEPL 专线资源，涵盖深港、沪日、沪美等多路由热备链路，晚高峰百兆带宽不缩水，提供全天候 4K 零卡顿的极速保障。
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
        <span>IEPL 常见疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {ieplFaqs.map(faq => (
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

writePage('network/iepl.astro', ieplContent);

// -------------------------------------------------------------
// 2. network/iplc.astro
// -------------------------------------------------------------
const iplcFaqs = [
  {
    q: 'IPLC 专线与 IEPL 专线有什么区别？',
    a: 'IPLC（International Private Leased Circuit，国际私有租用线路）是更为传统的一层（物理层/时分复用 TDM）点对点通信专线；而 IEPL 是基于以太网（二层）包装的新型专线。在日常翻墙使用体验上，二者几乎完全一致：均属于不过公网审查的运营商内网管道，具备超低延迟与零丢包的绝佳特性。'
  },
  {
    q: '为什么 IPLC 能够做到极低延迟？',
    a: 'IPLC 物理专线走的是最短距离的点对点光纤海缆路由。例如深圳入口到香港机房的 IPLC 专线，物理单程光缆距离仅数十公里，内网传输耗时仅需 3-6ms，彻底避免了公网路由器上百毫秒的逐跳排队延迟。'
  },
  {
    q: 'IPLC 专线成本为什么这么昂贵？',
    a: '因为 IPLC 属于电信运营商向跨国金融机构、跨国银行出租的高等级商业资产，带宽按兆（Mbps）按月计费，成本通常是普通公网 IDC 带宽的数十倍乃至上百倍。'
  },
  {
    q: '为什么有些 IPLC 节点 Ping 显示只有 10ms，但打开网页还是慢？',
    a: '在客户端显示的延迟往往只是“你电脑到机场国内入口”的延迟。如果机场的海外落地机房到目标网站（如 Google 亚太服务器）之间路由劣化，或者落地服务器带宽超售拥堵，就会出现“Ping 值好看但下载速度慢”的假象。优质机场会确保端到端全链路充沛带宽。'
  },
  {
    q: '光速云等专线服务商对 IPLC 的应用如何？',
    a: '光速云在关键亚太黄金节点上广泛部署 IPLC 专线通道，不仅实现端到端物理直达，而且配合双线容灾备份，让用户始终享受到银行级的跨境数据传输品质。'
  },
  {
    q: '使用 IPLC 会导致本地真实 IP 暴露给目标网站吗？',
    a: '完全不会。目标海外网站只能看到机场落地机房的出口 IP，绝对无法探测到您通过内网专线接入的国内真实宽带 IP。'
  }
];

const iplcJsonLd = JSON.stringify(makeFaqJsonLd(
  '/network/iplc/',
  'IPLC 国际私有租用线路完全科普 - 原理、物理延迟与企业级优势 | 百科机场',
  '全面讲解 IPLC 私有专线的物理链路架构、毫秒级超低延迟成因、与 IEPL 的异同对比，以及为何它是追求极致稳定用户的首选方案。',
  [
    { name: '首页', url: '/' },
    { name: '线路与节点', url: '/network/' },
    { name: 'IPLC 专线解析', url: '/network/iplc/' }
  ],
  iplcFaqs
));

const iplcContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${iplcJsonLd};
---

<BaseLayout
  title="IPLC 国际私有专线完全科普 - 物理架构与企业级低延迟 | 百科机场"
  description="详解 IPLC 国际私有租用线路技术原理，揭秘不过公网审查、物理端到端直通与毫秒级延迟的底层逻辑，推荐高可靠正规专线品牌。"
  canonical="https://jichangwiki.homes/network/iplc/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/network/" class="hover:text-primary-600 transition-colors">线路与节点</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">IPLC 专线解析</span>
    </nav>

    <header class="bg-gradient-to-br from-blue-950 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-blue-900/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
          企业级物理私网 · 银行级高规格
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          IPLC 国际私有专线完全科普：物理架构与毫秒级延迟
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          IPLC 作为跨国大企业与金融机构的传统专线网络，近年来被引入高端翻墙代理领域。本文带您了解其物理层点对点光纤直通与抗干扰优势。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-blue-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>IPLC 核心认知 (Key Insight)</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            IPLC 是<strong>真正的点对点内网专线</strong>。数据从中国大陆入口直达海外机房，中途没有任何防火墙审查与公网拥塞。对于外服竞技游戏、金融交易及高频远程办公而言，IPLC 是消除抖动的终极保障。
          </p>
        </div>
      </div>
    </header>

    <!-- 优势展示 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
        <span>IPLC 专线的三大核心价值</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">物理极限低延迟</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            走最短距离海底光缆直连，深港仅需 5ms 物理传输时延，沪日仅需 25ms，操作反馈近乎零滞后。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">企业级 SLA 承诺</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            运营商级别 99.9% 在线率保证，杜绝公网因国际出口施工或链路调整带来的大面积瘫痪。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">全天候恒定吞吐</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            晚间八点到十一点的晚高峰，公网普遍降速 70%，而 IPLC 物理独享带宽能够跑满用户宽带上限。
          </p>
        </div>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
        <span>配备高品质 IPLC 专线的优选服务商</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">企业级网络支撑</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全天候 IPLC 护航</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云具备总带宽充沛的顶级 IPLC/IEPL 骨干网，无论面对重大敏感节点还是海缆事故，均能通过多物理专线自动调度实现无感秒切。
            </p>
          </div>
          <BrandCTA brand={guangsu} />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
        <span>IPLC 常见疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {iplcFaqs.map(faq => (
          <details class="group bg-white rounded-xl border border-slate-200 p-5 open:bg-slate-50 transition-colors">
            <summary class="font-semibold text-slate-900 cursor-pointer flex justify-between items-center list-none">
              <span>{faq.q}</span>
              <span class="text-blue-600 group-open:rotate-180 transition-transform duration-200">
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

writePage('network/iplc.astro', iplcContent);

// -------------------------------------------------------------
// 3. network/hong-kong.astro
// -------------------------------------------------------------
const hkFaqs = [
  {
    q: '为什么香港节点是大陆用户日常翻墙使用频率最高的主力节点？',
    a: '因为香港在地理位置上紧邻广东，物理光缆距离极短。配合深圳入口的深港内网专线，延迟通常只有 10-30ms，体验几乎与访问国内网站无异；同时香港承载了 Google 亚太核心 CDN、YouTube、Telegram 等海量基础设施，页面打开速度最快。'
  },
  {
    q: '香港节点有哪些业务“绝对无法使用”？',
    a: '香港节点无法使用 OpenAI ChatGPT、Google Gemini 等未在香港开放服务的 AI 工具；此外部分只对特定欧美地区开放的流媒体（如 HBO Max、BBC iPlayer）也无法观看。'
  },
  {
    q: '为什么有些香港节点在测速时只有几兆甚至经常超时？',
    a: '因为劣质机场采用的是未经优化的公网香港直连（如普通 163 骨干网），晚高峰国际出口极度拥堵塞死；或者是香港落地服务器超售了数千用户，导致机房端口网卡打满。真正好用的香港节点必须依赖专线直连并限制单服务器并发。'
  },
  {
    q: '在香港节点上看 YouTube 会遇到广告吗？',
    a: '在香港 IP 环境下播放 YouTube 视频会有常规广告。如果您购买了 YouTube Premium 会员，则无论在哪个节点都能享受全平台免广告。'
  },
  {
    q: '光速云的香港节点具备哪些特点？',
    a: '光速云配备了多条深港 IPLC/IEPL 高速专线，支持 1000Mbps 极速下行，并且部署了原生住宅 IP 用于解锁 Netflix 港区独占影视，日常秒开 Google 与各类海外学术站点。'
  },
  {
    q: '玩外服游戏时，香港节点是通用最佳选择吗？',
    a: '针对绝大多数部署在香港或亚太服务器的游戏（如英雄联盟台服/港服、CS2 港服、Steam 联机），香港专线节点延迟最低（通常 20-40ms），是首选竞技加速节点。'
  }
];

const hkJsonLd = JSON.stringify(makeFaqJsonLd(
  '/network/hong-kong/',
  '香港机场节点深度评测与选型指南 - 超低延迟主力线与局限性剖析 | 百科机场',
  '全面评测香港代理节点的物理延迟优势、深港专线路由特性、日常网页秒开体验，并客观指明其在 ChatGPT 等 AI 场景下的天然禁区。',
  [
    { name: '首页', url: '/' },
    { name: '线路与节点', url: '/network/' },
    { name: '香港节点评测', url: '/network/hong-kong/' }
  ],
  hkFaqs
));

const hkContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${hkJsonLd};
---

<BaseLayout
  title="香港机场节点深度评测与选型指南 - 超低延迟主力线与适用场景 | 百科机场"
  description="详解香港节点的网络延迟优势、深港 IEPL 专线机制、YouTube 秒开体验，以及在 ChatGPT、Gemini 等 AI 领域的局限性与搭配策略。"
  canonical="https://jichangwiki.homes/network/hong-kong/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/network/" class="hover:text-primary-600 transition-colors">线路与节点</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">香港节点评测</span>
    </nav>

    <header class="bg-gradient-to-br from-cyan-950 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-cyan-900/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 mb-4">
          亚太主力航道 · 极速低延迟
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          香港机场节点深度评测：超低延迟主力线的优势与禁区
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          香港节点是大陆用户翻墙列表中无可争议的“绝对主力”。其得天独厚的地理优势让网页加载如同内网般迅捷。然而，其在特定 AI 场景下的限制同样需要清醒认知。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-cyan-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>香港节点核心速评 (Verdict)</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            日常看网页、搜 Google、刷 Twitter、看 YouTube 4K、玩港服游戏，<strong>香港专线节点是综合体验最好的第一选择</strong>；但<strong>严禁使用香港节点访问 ChatGPT、Claude 与 Gemini</strong>，否则会立刻触发地域拦截报错。
          </p>
        </div>
      </div>
    </header>

    <!-- 优缺点剖析 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-cyan-600 rounded-full inline-block"></span>
        <span>香港节点的长处与天然局限</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-md mb-3">核心优势</div>
          <h3 class="text-lg font-bold text-slate-900 mb-2">极致低延迟与亚太骨干</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            深港专线端到端延迟低至 15-30ms，本地 Ping 极低，对代码拉取（GitHub）、学术搜索、高清视讯通话与外服联机对战极为友好。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="inline-block px-3 py-1 bg-rose-50 text-rose-700 text-xs font-bold rounded-md mb-3">核心局限</div>
          <h3 class="text-lg font-bold text-slate-900 mb-2">AI 官方服务全面受限</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            OpenAI、Google、Anthropic 等海外 AI 巨头均未将中国香港列入支持区域。使用香港 IP 访问官方接口将直接报错返回 403。
          </p>
        </div>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-cyan-600 rounded-full inline-block"></span>
        <span>顶级香港专线配置代表品牌</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-cyan-600 uppercase tracking-wider">深港毫秒直连</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全天候深港专线集群</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云部署了数条高规格深港物理专线，香港节点全线支持千兆下行与原生港区 Netflix 解锁，极速响应，告别公网晚高峰卡顿。
            </p>
          </div>
          <BrandCTA brand={guangsu} />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-cyan-600 rounded-full inline-block"></span>
        <span>香港节点常见疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {hkFaqs.map(faq => (
          <details class="group bg-white rounded-xl border border-slate-200 p-5 open:bg-slate-50 transition-colors">
            <summary class="font-semibold text-slate-900 cursor-pointer flex justify-between items-center list-none">
              <span>{faq.q}</span>
              <span class="text-cyan-600 group-open:rotate-180 transition-transform duration-200">
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

writePage('network/hong-kong.astro', hkContent);

// -------------------------------------------------------------
// 4. network/japan.astro
// -------------------------------------------------------------
const jpFaqs = [
  {
    q: '为什么日本节点被称为翻墙生态中的“全能六边形战士”？',
    a: '因为日本节点完美平衡了“低延迟”与“全业务兼容性”：1) 延迟极低：上海经中日海缆至东京的专线物理延迟仅需 25-35ms；2) AI 全面支持：日本属于 OpenAI ChatGPT、Claude 及 Google Gemini 的官方服务区；3) 影音游戏神选：支持日本 Netflix 独家动画、DMM、ABEMA 以及各大日服电竞手游。'
  },
  {
    q: '北方用户（北京、山东、辽宁等）用日本节点比香港节点更快吗？',
    a: '是的！中国北方地区由于地理纬度与中日海缆入口（青岛、上海）更近，直达日本东京的物理距离与网络跳数往往优于千里迢迢绕道广东深圳再去香港。北方用户直连日本专线通常延迟在 30-45ms 之间，极为平滑。'
  },
  {
    q: '访问日区 DMM 或某些特定日本二次元游戏被封锁怎么办？',
    a: '日本部分版权内容平台（如 DMM、部分限定手游）对海外 IP 甚至普通日本机房 IP 设有极其严格的屏蔽策略。需要使用机场专门部署的“日本原生住宅 IP”或通过 SNI 伪装的日本专线节点才能正常加载。'
  },
  {
    q: '日本节点的倍率通常是多少？',
    a: '优质机场（如光速云）的常规日本专线节点通常为 1.0x 标准倍率；某些带有高端住宅双 ISP 原生广播的特殊日本优化节点可能设置为 1.5x 倍率，用户可根据实际业务灵活选用。'
  },
  {
    q: '光速云的日本专线节点质量如何？',
    a: '光速云具备上海-东京直连的顶级沪日 IEPL 专线，全节点原生支持 ChatGPT、Netflix 日区、ABEMA 解锁，晚高峰物理零丢包，是日常兼顾办公与娱乐的首选主力。'
  },
  {
    q: '如果我同时需要极速冲浪与使用 ChatGPT，香港和日本怎么配？',
    a: '推荐在客户端中配置策略组：将 OpenAI、Claude 专属分流指向“日本专线”，而将默认海外网页、YouTube 视频分流指向“香港专线”。如此既能享受香港的极限低延迟，又能确保 AI 对话永不报错。'
  }
];

const jpJsonLd = JSON.stringify(makeFaqJsonLd(
  '/network/japan/',
  '日本机场节点全能实测指南 - 低延迟、AI原生解锁与二次元影音 | 百科机场',
  '全方位评测日本代理节点的综合素质，详解沪日专线超低物理延迟、北方网络天然适配、ChatGPT/Claude全业务合规支持及日区流媒体解锁。',
  [
    { name: '首页', url: '/' },
    { name: '线路与节点', url: '/network/' },
    { name: '日本节点指南', url: '/network/japan/' }
  ],
  jpFaqs
));

const jpContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${jpJsonLd};
---

<BaseLayout
  title="日本机场节点全能实测指南 - 低延迟、AI解锁与二次元首选 | 百科机场"
  description="全景拆解日本代理节点的六边形全能优势，涵盖沪日专线超低延迟、北方宽带天然适配、ChatGPT/Claude 完美解锁与日区专属流媒体支持。"
  canonical="https://jichangwiki.homes/network/japan/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/network/" class="hover:text-primary-600 transition-colors">线路与节点</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">日本节点指南</span>
    </nav>

    <header class="bg-gradient-to-br from-rose-950 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-rose-900/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-400/30 mb-4">
          全能六边形战士 · 业务无死角
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          日本机场节点全能指南：低延迟、AI 解锁与二次元影音
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          如果只能选择一个地区的节点作为常驻默认出口，<strong>日本节点</strong>往往是资深玩家一致推荐的最优解。它兼具了极佳的物理延迟与全方位的业务兼容性。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-rose-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>日本节点核心评定</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            日本专线节点既能保证 30-45ms 的超低物理延迟，又原生解锁 <strong>ChatGPT、Claude、Gemini 以及 Netflix 日区片库与 DMM</strong>。尤其对于华东、华北及东北地区用户而言，日本专线是无可争议的性能首选。
          </p>
        </div>
      </div>
    </header>

    <!-- 核心四大价值 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-rose-600 rounded-full inline-block"></span>
        <span>日本节点的四大统治级优势</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">1. 全球 AI 官方合规支持</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            日本完全处于 OpenAI 与 Anthropic 的官方开放版图内，避免了香港节点被拒之门外的尴尬，日常对话零报错。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">2. 沪日专线极速低延迟</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            上海至东京海底光缆物理距离短，专线端到端仅需 25-30ms，体验极为跟手，适合日常代码提交与远程桌面连接。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">3. 北方用户天然优先选</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            华北与东北地区由于地理经纬度优势，直通日本的光缆路由远优于南下广东，延迟表现比香港更低、更平稳。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">4. 原生二次元与日漫片库</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            完整解锁 Netflix 日本独家连载新番、ABEMA、DMM、TVer 以及各类日系 RPG 手机游戏，娱乐生活全满足。
          </p>
        </div>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-rose-600 rounded-full inline-block"></span>
        <span>日本专线代表性优质品牌</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-rose-600 uppercase tracking-wider">沪日顶级专线保障</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全天候日本专线集群</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云具备上海-东京直连的顶级沪日 IEPL 专线，全节点原生支持 ChatGPT、Netflix 日区、ABEMA 解锁，晚高峰物理零丢包，是日常兼顾办公与娱乐的首选主力。
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
        <span>日本节点常见疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {jpFaqs.map(faq => (
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

writePage('network/japan.astro', jpContent);

// -------------------------------------------------------------
// 5. network/low-latency.astro
// -------------------------------------------------------------
const latFaqs = [
  {
    q: '影响翻墙真实网络延迟的核心要素有哪些？',
    a: '真实端到端网络延迟由四个部分严格累加：1) 本地最后 1 公里延迟（电脑至家用路由器与光猫）；2) 国内骨干网延迟（本地 ISP 调度至机场入口机房）；3) 跨境传输物理延迟（专线光缆物理传播耗时，光在玻璃纤维中每千公里约需 5ms）；4) 落地出口至目标服务 CDN 延迟。公网直连还会附加严重的路由绕路与排队延迟。'
  },
  {
    q: '为什么有些节点 Ping 测速只有 20ms，但打开网页却有明显顿挫感？',
    a: '因为客户端测速很多时候仅测量了 TCP 握手时间（RTT），并未反映出 TLS 握手开销与 DNS 解析时间。如果机场的 DNS 服务器配置不当（发生上百毫秒的远程 DNS 递归查询），或者落地节点并发队列过长，就会出现“低 Ping 但慢卡”的现象。'
  },
  {
    q: '如何实现真正的“超低延迟”翻墙网络？',
    a: '关键在于选用部署了全国多地 BGP 入口与高质量 IEPL/IPLC 物理专线的正规服务商。BGP 入口能够让电信、联通、移动用户就近接入最近的骨干网机房，随后直接通过物理专线光缆直达境外，中间跳数缩减至 3-5 跳，将物理抖动与延迟降至极限。'
  },
  {
    q: '外服竞技游戏对网络延迟的容忍红线是多少？',
    a: '对于 CS2、Apex、Valorant 等第一人称射击（FPS）竞技游戏，总延迟低于 50ms 为优秀体验，低于 80ms 为合格；一旦超过 100ms 将出现明显的开枪判定滞后；若丢包率超过 1%，则会出现瞬移拉回，严重破坏竞技体验。'
  },
  {
    q: '光速云专线在低延迟方面的实测表现如何？',
    a: '光速云配备了覆盖华南、华东的多线 BGP 高速入口与直通深港、沪日的 IEPL 专线，华南访问香港低至 15ms，华东访问日本低至 28ms，抖动低于 1ms，达到电竞级水准。'
  },
  {
    q: '无线 Wi-Fi 对低延迟有何负面影响？如何优化？',
    a: 'Wi-Fi 存在信道竞争与环境无线干扰，容易偶发几十毫秒的延迟突刺。对于追求极致低延迟的极客或电竞玩家，建议使用有线网线直连路由器，或开启 5GHz / Wi-Fi 6 频段并固定独立信道。'
  }
];

const latJsonLd = JSON.stringify(makeFaqJsonLd(
  '/network/low-latency/',
  '超低延迟专线深度调优指南 - 物理时延、BGP多线入口与电竞级优化 | 百科机场',
  '全面科普网络延迟产生的底层原理，解析光速物理极限、BGP三网多线入口调优、DNS解析加速及电竞级低抖动专线选型。',
  [
    { name: '首页', url: '/' },
    { name: '线路与节点', url: '/network/' },
    { name: '低延迟专线指南', url: '/network/low-latency/' }
  ],
  latFaqs
));

const latContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${latJsonLd};
---

<BaseLayout
  title="超低延迟专线深度调优指南 - 物理时延与BGP多线入口实测 | 百科机场"
  description="详解科学上网低延迟背后的技术秘密：光纤物理传播极限、BGP 多线动态调度、DNS 毫秒级解析与外服电竞超低抖动网络构建。"
  canonical="https://jichangwiki.homes/network/low-latency/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/network/" class="hover:text-primary-600 transition-colors">线路与节点</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">低延迟专线指南</span>
    </nav>

    <header class="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-emerald-900/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-4">
          极限网络性能 · 电竞级调优
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          超低延迟专线深度调优指南：突破物理时延极限
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          网络延迟是光信号在光纤玻璃介质中的真实物理竞赛。本文为您系统拆解从家庭光猫、BGP 骨干入口到跨境专线的全链路低延迟工程方案。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-emerald-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            <span>低延迟黄金法则</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            端到端延迟的核心在于<strong>“BGP 就近接入 + 最短物理专线路由 + 本地 DNS 极速预解析”</strong>。选用具备多地 BGP 专线入口的服务商（如光速云），能够让不同省份与运营商的用户均在物理极限内获得毫秒级跟手体验。
          </p>
        </div>
      </div>
    </header>

    <!-- 延迟全链路拆解 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-emerald-600 rounded-full inline-block"></span>
        <span>端到端网络延迟的四大组成部分</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xl font-bold text-emerald-600 mb-2">01. 本地局域网</div>
          <p class="text-slate-600 text-sm leading-relaxed">设备至家用路由器光猫，有线直连通常 &lt; 1ms，无线 Wi-Fi 约为 2-8ms。</p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xl font-bold text-emerald-600 mb-2">02. 国内骨干网</div>
          <p class="text-slate-600 text-sm leading-relaxed">本地宽带至专线入口机房，BGP 智能动态选路可缩减至 10-25ms。</p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xl font-bold text-emerald-600 mb-2">03. 跨境物理专线</div>
          <p class="text-slate-600 text-sm leading-relaxed">深港 5ms，沪日 25ms，物理点对点直达，不参与公网排队与重传。</p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xl font-bold text-emerald-600 mb-2">04. 境外落地直连</div>
          <p class="text-slate-600 text-sm leading-relaxed">落地机房直通 Google、Cloudflare 边缘 CDN，将海外跳数压缩至极点。</p>
        </div>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-emerald-600 rounded-full inline-block"></span>
        <span>电竞级超低延迟专线品牌代表</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider">极致跟手体验</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全天候低延迟专线集群</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云部署了覆盖全国核心枢纽的 BGP 接入机房，通过企业级 IEPL/IPLC 专线实现华南 15ms、华东 28ms 接入香港日本，网络抖动逼近于零。
            </p>
          </div>
          <BrandCTA brand={guangsu} />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-emerald-600 rounded-full inline-block"></span>
        <span>低延迟专线常见疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {latFaqs.map(faq => (
          <details class="group bg-white rounded-xl border border-slate-200 p-5 open:bg-slate-50 transition-colors">
            <summary class="font-semibold text-slate-900 cursor-pointer flex justify-between items-center list-none">
              <span>{faq.q}</span>
              <span class="text-emerald-600 group-open:rotate-180 transition-transform duration-200">
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

writePage('network/low-latency.astro', latContent);

// -------------------------------------------------------------
// 6. network/traffic-ratio.astro
// -------------------------------------------------------------
const ratFaqs = [
  {
    q: '什么是机场节点的“倍率机制（Traffic Ratio）”？它是如何计算流量的？',
    a: '倍率是机场用于衡量不同节点运营成本与调控带宽负载的系数。实际扣除流量 = 用户真实消耗流量 × 节点倍率。例如：您在一个 0.5x 低倍率节点下载了 10GB 文件，您的账户仅会被扣除 5GB 额度；反之，若在 3.0x 高倍率节点下载 10GB 文件，账户将被扣除 30GB 额度。'
  },
  {
    q: '为什么有些节点是 0.1x / 0.5x，而有些节点高达 2x / 3x？',
    a: '低倍率节点通常是成本较低的大带宽公网直连线路或冷门地区节点，机场通过低倍率引导用户在下载大文件时使用，以分流主力带宽压力；而高倍率节点通常采购了成本极其高昂的企业级 IPLC 专线或海外原生高纯净住宅 IP，高倍率反映了其高昂的物理带宽硬件成本。'
  },
  {
    q: '日常看 4K 视频或下载大文件，如何利用倍率机制省流量？',
    a: '在客户端中，您可以将 YouTube 或 Steam 下载流量规则手动定向到 0.5x 或 1.0x 的标准专线节点；而仅在进行敏感金融交易、登录 Claude 或玩高精度竞技游戏时才选用 1.5x-2.0x 的高阶专线，从而让套餐流量使用效率翻倍。'
  },
  {
    q: '有些黑心机场存在“虚标倍率”或暗中偷跑流量的情况吗？',
    a: '确实存在某些不良小机场，节点名称标注为 1.0x，但后台计费系统设置了 1.5x 甚至更高的暗扣系数。建议用户在后台记录流量读数，在客户端下载一个已知大小的官方测试文件进行对照核算。'
  },
  {
    q: '光速云的节点倍率机制是怎样的？',
    a: '光速云坚持透明实标原则。主流亚太主力专线节点均保持 1.0x 真实标准倍率，计费明细在用户后台清晰可查，不存在任何隐性偷跑流量行为。'
  },
  {
    q: '在规则分流模式下，被直连的国内流量会计入机场倍率消耗吗？',
    a: '绝对不会！在正确配置的规则（Rule）模式下，访问百度、淘宝、微信等国内流量完全不经过机场节点，直接由本地宽带发出，消耗的是 0 机场流量。'
  }
];

const ratJsonLd = JSON.stringify(makeFaqJsonLd(
  '/network/traffic-ratio/',
  '机场节点倍率机制与流量精打细算指南 - 0.5x至3x系数完全解密 | 百科机场',
  '系统科普翻墙机场节点倍率计算法则，揭秘高低倍率背后的成本差异，教您如何科学配置策略组，实现大文件下载省流与专线高质兼得。',
  [
    { name: '首页', url: '/' },
    { name: '线路与节点', url: '/network/' },
    { name: '倍率机制解析', url: '/network/traffic-ratio/' }
  ],
  ratFaqs
));

const ratContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${ratJsonLd};
---

<BaseLayout
  title="机场节点倍率机制与流量精打细算指南 - 0.5x至3x系数完全解密 | 百科机场"
  description="详解机场节点倍率（Traffic Ratio）计费机制，教您看懂低倍率省流节点与高倍率专线节点的应用场景，避免流量不知不觉耗尽。"
  canonical="https://jichangwiki.homes/network/traffic-ratio/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/network/" class="hover:text-primary-600 transition-colors">线路与节点</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">倍率机制解析</span>
    </nav>

    <header class="bg-gradient-to-br from-amber-950 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-amber-900/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30 mb-4">
          精打细算学堂 · 计费与调控内幕
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          机场节点倍率机制全解：0.5x 到 3x 背后的成本账本
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          节点名称后缀的“1.0x”、“0.5x”或“3.0x”究竟意味着什么？理解倍率机制，能让您在流量有限的套餐中玩出双倍的使用价值。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-amber-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>倍率计算核心公式</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            <strong>实际扣费流量 = 本次物理产生流量 × 节点倍率系数</strong>。<br/>
            大流量下载看 4K，选用 0.5x 节点能让 100GB 当 200GB 用；关键业务访问，选用 1.0x 顶级标准专线（如光速云）享受极致稳定。
          </p>
        </div>
      </div>
    </header>

    <!-- 倍率梯度矩阵 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-amber-600 rounded-full inline-block"></span>
        <span>常见节点倍率梯度与适用场景</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xl font-bold text-emerald-600 mb-2">0.2x - 0.5x 低倍率</div>
          <h3 class="font-bold text-slate-900 mb-2">大文件下载利器</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            主要用于分流非高峰期大文件下载、Steam 游戏更新或冷门备份。虽然延迟稍高，但扣量极少，堪称省流利器。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xl font-bold text-blue-600 mb-2">1.0x 标准倍率</div>
          <h3 class="font-bold text-slate-900 mb-2">日常主力主力专线</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            主流机场的核心专线节点，扣除真实 1:1 流量，兼顾低延迟、高带宽与流媒体解锁，最适合日常全天候常驻。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xl font-bold text-rose-600 mb-2">2.0x - 3.0x 高倍率</div>
          <h3 class="font-bold text-slate-900 mb-2">特殊定制与住宅原生</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            配备了高成本海外住宅原生 IP 或特定企业保密专线，适合敏感金融操作或高难度 AI 注册等特殊高阶场景。
          </p>
        </div>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-amber-600 rounded-full inline-block"></span>
        <span>倍率透明真实的旗舰品牌</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-amber-600 uppercase tracking-wider">透明实标无套路</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全线标准 1.0x 专线</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云亚太主力专线节点保持 1.0x 真实倍率，流量计算清晰透明，拒绝暗中偷跑或暗调倍率，让您的每一分钱都花在实处。
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
        <span>倍率机制常见疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {ratFaqs.map(faq => (
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

writePage('network/traffic-ratio.astro', ratContent);

console.log('ALL 6 NETWORK SECONDARY PAGES WRITTEN!');
