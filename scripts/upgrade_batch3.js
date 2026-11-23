import fs from 'fs';
import path from 'path';

function writePage(relPath, content) {
  const fullPath = path.resolve('src/pages', relPath);
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf-8');
  console.log(`Successfully upgraded: src/pages/${relPath}`);
}

// =========================================================================
// 07. 线路与节点 PILLAR PAGE: src/pages/network/index.astro
// =========================================================================
const networkPillarContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';

const title = '线路与节点技术全景指南（2026）｜IEPL、IPLC 专线拓扑、BGP 接入与测速指标';
const description = '权威中文网络线路支柱专题：深度剖析企业级 IEPL 专线、IPLC 私网物理光纤、BGP 智能就近接入与公网隧道中转的技术差异。揭示晚高峰丢包 QoS 拥塞模型与节点倍率暗扣防范，建立客观科学的测速评价体系。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '线路与节点', url: '/network/' }
];

const subSections = [
  { name: 'IEPL 专线', url: '/network/iepl/', desc: '国际以太网私网：二层光纤内网直连，抗封锁无视敏感期', icon: '⚡' },
  { name: 'IPLC 专线', url: '/network/iplc/', desc: '国际私有租用线路：极低抖动与零公网审查，企业级基准', icon: '🛡️' },
  { name: '香港节点', url: '/network/hong-kong/', desc: '极速低延迟首选：物理近距优势，学术与日常首选', icon: '🇭🇰' },
  { name: '日本节点', url: '/network/japan/', desc: '流媒体与二次元万能：原生 IP 纯净度高，全解锁支持', icon: '🇯🇵' },
  { name: '低延迟优化', url: '/network/low-latency/', desc: '网络抖动调优：BGP 智能多线接入与晚高峰抗拥堵', icon: '📉' },
  { name: '线路倍率', url: '/network/traffic-ratio/', desc: '计费透明度核查：0.1x-5x 实际扣量模型与防坑指南', icon: '⚖️' }
];

const faqItems = [
  {
    q: 'IEPL 和 IPLC 专线到底有什么区别？哪一个更好？',
    a: '两者均属于不经过公网 GFW 出口的物理专线，抗封锁性能均属顶级。技术细节差异：1. IPLC（International Private Leased Circuit）是传统的电信二层点对点私有租用电路，延迟极其稳定，但在物理断纤时无法自动路由切换；2. IEPL（International Ethernet Private Line）是基于以太网技术的现代高速专线，具备更强大的二层以太网承载与动态多路径保护（环网自动倒换），且支持单端口千兆以上弹性带宽。在现代代理网络中，两者实际使用体验差距极小，重点看服务商采购的专线带宽冗余度。'
  },
  {
    q: '什么是 BGP 入口？为什么移动、联通、电信的体验差异很大？',
    a: 'BGP（边界网关协议）入口是指服务商在国内设立的智能多线机房。它同时接入了中国电信、中国联通、中国移动三大运营商的核心骨干网。无论用户使用哪家宽带，都能就近直连至服务商的 BGP 服务器，再通过内网专线送达境外。如果机场没有 BGP 入口（仅提供单一电信中转机房），移动或联通用户访问时就会遭遇跨网互联互通瓶颈，导致延迟倍增甚至丢包。'
  },
  {
    q: '为什么白天测速跑满千兆，晚高峰（20:00-23:00）却卡得打不开网页？',
    a: '这是典型的“公网国际出口 QoS（服务质量）拥塞”现象。公网中转和直连节点在白天网络空闲时，能轻松跑满带宽；但到了晚间 20:00-23:00 全民上网高峰期，中国电信 163 骨干网等国际出口总带宽严重过载，运营商交换机启动强制 QoS 丢包限速，非高优先级民用数据包丢包率可飙升至 30% 以上。只有走独立物理光纤的 IEPL/IPLC 专线才能彻底免疫这种公共网络拥堵。'
  },
  {
    q: '为什么香港节点的 ping 延迟只有 20ms，但看 YouTube 经常不如 60ms 的日本节点？',
    a: '这是“物理距离延迟”与“节点负载及路由拥堵”的综合结果。ping 延迟只代表小数据包往返时间；香港节点物理距离最近，ping 确实最低，但也是全网用户最密集扎堆的节点，容易造成服务器并发连接数跑满、单线程丢包增高；而日本节点拥有充裕的海底光缆带宽和更纯净的落地机房，TCP 连接吞吐更平稳。'
  },
  {
    q: '机场经常标注的“0.2x”、“1.0x”、“3.0x”倍率是什么意思？',
    a: '倍率是流量扣费系数：实际扣除配额 = 真实产生流量 &times; 节点倍率。例如使用 1.0x 节点看 10GB 视频，扣除 10GB 套餐；使用 0.2x 低倍率节点看 10GB 视频，仅扣除 2GB（适合大文件下载）；但如果使用了 3.0x 或 5.0x 高倍率专线，看 10GB 视频将被扣除 30GB 或 50GB 套餐。用户选购时必须警惕高倍率陷阱。'
  },
  {
    q: '测速脚本显示的“单线程”与“多线程”测速有什么区别？',
    a: 'Speedtest 默认使用 8-16 个并发连接（多线程），能最大化占满链路带宽，适合测试线路的极限承载能力；而 Fast.com 或浏览单网页、播放 4K 视频、与 AI 对话高度依赖“单线程吞吐”。如果一个节点多线程跑 500M，但单线程只有 10M 且丢包率高，实际使用体验将极其糟糕。'
  },
  {
    q: '公网隧道中转（Relay）与物理专线（IEPL）如何通过抓包鉴别？',
    a: '进阶用户可以通过 <code>traceroute</code> 或 <code>mtr</code> 追踪数据包跳数：公网中转节点在经过境内中继服务器后，下一跳会进入公共国际出口交换机（IP 属于公网可路由段），并伴随跳数增多和延迟阶梯式跳跃；而纯内网专线在出境段通常表现为 1-2 跳内网私有 IP（如 10.x.x.x 或 192.168.x.x），随后直接到达境外落地机房，且全天延迟曲线几乎呈一条无波动的直线。'
  },
  {
    q: '冷门地区节点（如阿根廷、土耳其、尼日利亚）延迟为什么高达 300ms 以上？',
    a: '这属于正常的物理光纤传输延迟。从中国大陆至南美洲或非洲没有直达海底光缆，数据必须经由香港跨太平洋至美国西海岸，再穿越南美陆地光缆到达阿根廷，物理距离超过 20,000 公里。光在光纤中的传播速度约为每秒 20 万公里，加上途中数十台交换机转发耗时，300-400ms 的往返延迟完全符合物理定律，此类节点仅适用于跨区购买低价数字会员。'
  },
  {
    q: '为什么同一个节点，不同时间测出来的延迟会变动？',
    a: '导致延迟变动的原因有三：1. 用户本地宽带（如 Wi-Fi 信号干扰、光猫过热丢包）；2. 运营商动态调整了骨干网路由（如突发光缆割接导致数据包绕行其他省份）；3. 机场后端的智能调度系统根据服务器负载自动切换了不同入口或落地备用机房。'
  },
  {
    q: '什么是双线或多线负载均衡（Load Balance）？',
    a: '指在 Clash 等客户端中建立一个负载均衡策略组，将同地区的多条专线节点（如香港01、香港02、香港03）打包。客户端会根据轮询算法或源 IP 哈希将流量分摊到不同节点，不仅能防止单节点被打满拥塞，还能在某个节点离线时实现零感知的自动热切。'
  }
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://jichangwiki.homes/network/',
      'url': 'https://jichangwiki.homes/network/',
      'name': title,
      'description': description,
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
      'mainEntity': faqItems.map(item => ({
        '@type': 'Question',
        'name': item.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.a
        }
      }))
    }
  ]
};
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <!-- Hero Header -->
    <div class="bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-2xl border border-cyan-900/40 relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="max-w-3xl relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-400/30 mb-4">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          2026 深度升级支柱专题 · 物理网络拓扑中心
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-5 leading-tight">
          线路与节点技术全景：专线架构、BGP入口与测速真相
        </h1>
        <p class="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
          代理体验的优劣 80% 取决于底层物理网络。本专题深度拆解 IEPL/IPLC 跨境光纤物理专线、BGP 智能就近接入、晚高峰 QoS 丢包拥塞控制与节点倍率模型，助您穿透虚标数字看清真实网络质量。
        </p>
        <div class="flex flex-wrap gap-3 text-xs sm:text-sm text-slate-300">
          <span class="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            ⚡ IEPL vs IPLC 物理光纤解剖
          </span>
          <span class="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            🌐 BGP 三网智能就近调度机制
          </span>
          <span class="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            📉 晚高峰 QoS 丢包拥塞模型
          </span>
        </div>
      </div>
    </div>

    <!-- Answer-First Executive Verdict Box -->
    <div class="bg-white rounded-2xl border border-cyan-200/80 shadow-md p-6 sm:p-8 mb-12 relative">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
          ⚡
        </div>
        <div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900">
            线路拓扑技术天梯（Answer-First 核心速览）
          </h2>
          <p class="text-xs sm:text-sm text-slate-500">不同网络架构的抗封锁与抗抖动性能对比</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-cyan-900 mb-1 text-sm">👑 IPLC / IEPL 物理专线</div>
          <p class="text-xs text-slate-600">
            走运营商二层企业私网，完全不经过公网国际出口。<strong>零审查、零丢包、无视任何敏感时期封锁</strong>。
          </p>
        </div>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-blue-900 mb-1 text-sm">🥈 BGP 隧道公网中转</div>
          <p class="text-xs text-slate-600">
            国内三网接入优秀，但跨境段仍走公网加密隧道。平时速度极快，敏感时期可能被偶发干扰阻断。
          </p>
        </div>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-amber-900 mb-1 text-sm">🥉 单线普通中转</div>
          <p class="text-xs text-slate-600">
            仅单线接入（如仅限移动或电信），跨网访问延迟高，晚高峰易出现单线程丢包抖动。
          </p>
        </div>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-rose-900 mb-1 text-sm">❌ 公网直连（Direct）</div>
          <p class="text-xs text-slate-600">
            完全裸露在公网中，晚高峰丢包率通常在 20%-40% 以上，极易被全面阻断封锁。
          </p>
        </div>
      </div>
    </div>

    <!-- Secondary Hubs Grid -->
    <div class="mb-14">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900">线路与节点细分专题导航</h2>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">按特定线路类型深入了解技术参数、实测报告与选型建议</p>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {subSections.map((s) => (
          <a href={s.url} class="p-4 bg-white rounded-2xl border border-slate-200 hover:border-cyan-500 hover:shadow-lg transition group flex flex-col justify-between">
            <div>
              <div class="text-2xl mb-2 group-hover:scale-110 transition-transform">{s.icon}</div>
              <h3 class="text-sm font-bold text-slate-900 group-hover:text-cyan-600 transition mb-1">{s.name}</h3>
              <p class="text-[11px] text-slate-500 leading-snug">{s.desc}</p>
            </div>
            <div class="mt-3 pt-2 border-t border-slate-100 flex items-center text-[11px] font-semibold text-cyan-600 group-hover:translate-x-1 transition-transform">
              进入专题 &rarr;
            </div>
          </a>
        ))}
      </div>
    </div>

    <!-- Main Prose Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
      
      <!-- TOC Sidebar -->
      <div class="hidden lg:block lg:col-span-1">
        <div class="sticky top-20 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">本页导航目录</h3>
          <ul class="space-y-2 text-xs font-medium text-slate-600">
            <li><a href="#iepl-vs-iplc" class="hover:text-cyan-600 transition block py-1">1. IEPL 与 IPLC 物理光纤拓扑</a></li>
            <li><a href="#bgp-mechanics" class="hover:text-cyan-600 transition block py-1">2. BGP 智能就近调度机制</a></li>
            <li><a href="#qos-congestion" class="hover:text-cyan-600 transition block py-1">3. 晚高峰 QoS 丢包拥塞模型</a></li>
            <li><a href="#multiplier-rules" class="hover:text-cyan-600 transition block py-1">4. 线路倍率与实际扣费核算</a></li>
            <li><a href="#faqs" class="hover:text-cyan-600 transition block py-1">5. 核心常见问题解答（FAQ）</a></li>
          </ul>
        </div>
      </div>

      <!-- Main Prose Column -->
      <div class="lg:col-span-3 space-y-12">
        
        <!-- Section 1 -->
        <section id="iepl-vs-iplc" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            1. IEPL 与 IPLC 物理光纤拓扑：为什么专线能够完全无视封锁？
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-4">
            <p>
              很多人误以为专线是某种高级的加密软件算法，实际上它完全是<strong>物理硬件层面的专用点对点光纤基础设施</strong>：
            </p>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 not-prose text-xs text-slate-700 space-y-2">
              <div class="font-bold text-slate-900 text-sm">💡 数据包物理传输路径比对：</div>
              <div class="flex items-center gap-2 text-slate-600">
                <span class="w-20 font-semibold">公网直连:</span>
                <span>客户端 &rarr; 本地城域网 &rarr; 省级出口 &rarr; 国际公网互联关口局（GFW DPI 过滤） &rarr; 海底光缆 &rarr; 落地机房</span>
              </div>
              <div class="flex items-center gap-2 text-cyan-900 font-semibold">
                <span class="w-20">IEPL 专线:</span>
                <span>客户端 &rarr; 境内 BGP 机房 &rarr; [运营商内网二层物理光纤直接过境] &rarr; 境外落地机房</span>
              </div>
            </div>
            <p>
              在 IEPL 架构下，跨境传输走的是运营商租借给跨国银行、跨国金融机构的企业专用物理信道，完全独立于民用互联网，因而从物理根源上不存在任何国际出口审查与防火墙阻断。
            </p>
          </div>
        </section>

        <!-- Section 2 -->
        <section id="bgp-mechanics" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            2. BGP 智能就近调度机制：解决跨网互通延迟
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              中国电信、中国联通、中国移动三家运营商的骨干网在跨网互联时存在天然的结算壁垒与网间结算瓶颈。
            </p>
            <p>
              优质服务商（如光速云、红莓等）采用三网 BGP 聚合入口，在华南（广州/深圳）、华东（上海/杭州）、华北（北京/青岛）均设立接入节点。用户的 DNS 解析请求会根据用户 IP 自动调度到同省同运营商的接入机房，将国内网内延迟压低至 5-15ms 黄金区间。
            </p>
          </div>
        </section>

        <!-- Section 3 -->
        <section id="qos-congestion" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            3. 晚高峰 QoS 丢包拥塞模型：拒绝虚假的白天跑分
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              在每晚 20:00 至 23:00 的晚高峰时段，骨干网带宽负荷达到峰值。根据 TCP 拥塞控制协议（如 BBR、Cubic）的数学模型：
            </p>
            <div class="p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl not-prose my-3">
              Throughput &le; (MSS / RTT) &times; (1 / &radic;Loss_Rate)
            </div>
            <p class="text-xs sm:text-sm">
              上述公式表明：<strong>吞吐量与丢包率的平方根成反比</strong>。当线路丢包率仅为 1% 时，TCP 窗口开始频繁收缩重传；当丢包率达到 5% 时，即使你的物理宽带是 1000Mbps，实际有效传输速率也会暴跌至 20Mbps 以下，视频播放将陷入无休止的缓冲区加载。
            </p>
          </div>
        </section>

        <!-- Section 4 -->
        <section id="multiplier-rules" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            4. 线路倍率与实际扣费核算：算清真实使用成本
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              各家服务商对不同成本的线路设定了不同的倍率权重：
            </p>
            <ul class="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>0.1x - 0.5x</strong>：大流量冷门节点，通常用于下载大文件或系统升级镜像；</li>
              <li><strong>1.0x</strong>：基准主力线路，所有标准专线节点的理想倍率；</li>
              <li><strong>2.0x - 5.0x</strong>：高昂成本的超低延迟 IPLC 专线或罕见原生住宅 IP 节点。</li>
            </ul>
          </div>
        </section>

        <!-- Section 5: FAQs -->
        <section id="faqs" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-6 pb-2 border-b border-slate-200">
            5. 线路与节点技术常见问题（FAQ）
          </h2>
          <div class="space-y-4">
            {faqItems.map((item, index) => (
              <details class="group bg-white rounded-2xl border border-slate-200/80 p-5 open:ring-2 open:ring-cyan-500/20 transition shadow-sm">
                <summary class="font-extrabold text-slate-900 text-sm sm:text-base cursor-pointer flex items-center justify-between list-none">
                  <span class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 text-xs flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <span set:html={item.q}></span>
                  </span>
                  <span class="text-slate-400 group-open:rotate-180 transition-transform text-lg ml-2">&darr;</span>
                </summary>
                <div class="mt-4 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        <!-- Conversion CTA -->
        <div class="mt-12">
          <BrandCTA 
            brandName="光速云（Guangsu Cloud）" 
            affiliateURL="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"
            couponCode="AMM"
            entryPrice="折合 ¥8/月起（年付¥99）"
            customTitle="企业级专线 + BGP 智能多线接入 · 光速云"
            customDesc="拒绝虚高倍率与晚高峰丢包 QoS，精选高冗余跨境专线，全天候保持流畅生产力体验。"
          />
        </div>

        <!-- Compliance & Affiliate Disclosure -->
        <AffiliateDisclosure />

      </div>
    </div>

  </div>
</BaseLayout>
`;

writePage('network/index.astro', networkPillarContent);

// =========================================================================
// 08. 使用教程 PILLAR PAGE: src/pages/tutorials/index.astro
// =========================================================================
const tutorialsPillarContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';

const title = '机场从入门到精通使用教程指南（2026）｜订阅导入、Clash 配置、分流规则与 TUN 模式';
const description = '权威中文代理使用教程支柱专题：从 0 到 1 完整指导订阅导入、客户端安装、规则分流系统设计与 TUN 虚拟网卡接管。涵盖 Windows、Mac、iOS、Android 全平台配置避坑指南。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '使用教程', url: '/tutorials/' }
];

const subSections = [
  { name: '订阅链接导入', url: '/tutorials/subscription/', desc: '一步搞定节点同步：一键导入、Clash YAML 与 Base64 格式', icon: '📋' },
  { name: 'Clash 进阶配置', url: '/tutorials/clash-configuration/', desc: '参数全解析：混合端口、External Controller 与延迟测试', icon: '⚙️' },
  { name: '分流规则系统', url: '/tutorials/routing-rules/', desc: '国内直连海外代理：ACL4SSR 规则集与智能策略组定制', icon: '🔀' },
  { name: 'TUN 虚拟网卡模式', url: '/tutorials/tun-mode/', desc: '真全局接管：解决命令行终端与外服游戏无法走代理问题', icon: '🌐' },
  { name: '客户端安装总览', url: '/tutorials/client-installation/', desc: '各端安装防坑：驱动签名、环境依赖与权限配置全套指引', icon: '📦' }
];

const faqItems = [
  {
    q: '新手配置代理的第一步应该做什么？最常见的三大配置误区是什么？',
    a: '新手的第一步始终是：在服务商用户中心找到并复制“通用订阅链接（Subscription URL）”，然后下载推荐的开源客户端（如电脑端 Clash Verge Rev，手机端 v2rayNG 或小火箭）。常见三大误区：1. 盲目开启“全局代理（Global）”导致访问百度、淘宝变慢甚至封号；2. 订阅导入后没有在节点列表中手动选择一个可用节点；3. 忘记开启“系统代理（System Proxy）”开关，导致软件虽然在运行但流量完全未被接管。'
  },
  {
    q: '“规则模式（Rule）”与“全局模式（Global）”有什么本质区别？',
    a: '“规则模式”是生产力环境下的最佳默认选项。客户端会根据内置的分流规则表判断：属于中国大陆的域名和 IP（如 *.qq.com、*.baidu.com）直接走本地运营商直连（DIRECT），速度极快且不消耗套餐流量；仅属于海外受限名单的域名（如 Google、YouTube、GitHub）才经过代理节点传输。而“全局模式”强制所有流量（包括国内应用）全部绕道境外节点，极易造成国内 App 频繁验证码报错甚至微信异地登录风控。'
  },
  {
    q: '为什么命令行终端（CMD / PowerShell / Terminal）翻不了墙？如何配置？',
    a: '因为 Windows 的系统代理（System Proxy）默认仅接管调用系统 wininet API 的图形界面浏览器，完全不影响命令行终端环境。解决方案有两种：1. 开启客户端的 <strong>TUN 模式</strong>（底层虚拟网卡直接接管所有 TCP/UDP 流量，最推荐）；2. 在终端手动注入环境变量：<code>$env:HTTP_PROXY="http://127.0.0.1:7890"; $env:HTTPS_PROXY="http://127.0.0.1:7890"</code>。'
  },
  {
    q: '什么是 ACL4SSR 规则集？为什么很多人推荐？',
    a: 'ACL4SSR 是中文网络社区维护最完善、更新最活跃的开源分流规则集。它针对中国大陆用户的网络习惯进行了深度优化：细分了国内常见流媒体、网易云音乐灰色解锁、暴雪国服外服分流、主流广告域名拦截及各大海外平台的访问策略，避免了传统简单规则表经常发生的“误杀国内直连”或“海外服务漏代理”的缺陷。'
  },
  {
    q: '订阅链接泄露会有什么后果？如何安全重置？',
    a: '订阅链接相当于您在服务商处的“不记名消费提货券”。任何获得您订阅 URL 的人都可以直接将其导入自己的客户端中，消耗您的套餐流量，甚至并发占满您的设备连接数限制导致您自己掉线。一旦怀疑链接泄露，应立即登录服务商后台个人中心，点击“重置订阅信息 / 重置 Token”，旧链接将瞬间失效，然后重新复制新生成的链接导入客户端。'
  },
  {
    q: 'TUN 模式安装虚拟网卡失败、提示驱动错误怎么办？',
    a: '这通常是因为缺少管理员权限或被安全杀毒软件拦截。解决步骤：1. 完全退出 Clash Verge Rev；2. 鼠标右键以“管理员身份运行”客户端；3. 在设置界面的 Service Mode（服务模式）或 TUN Mode 旁点击“安装（Install）”按钮；4. 如果提示虚拟网卡冲突，打开 Windows 设备管理器，卸载名为 Wintun 或 TAP-Windows 的损坏适配器后重新安装。'
  },
  {
    q: '什么是 Fake-IP？它与传统 Redir-Host DNS 有什么优劣？',
    a: 'Fake-IP 是现代代理内核（Mihomo/sing-box）的革命性 DNS 机制。传统 Redir-Host 需要先在本地解析出真实 IP 再做分流，极易遭遇 GFW 的 DNS 污染与查询延迟；而 Fake-IP 机制在客户端收到 DNS 请求时，立即返回一个保留的假 IP（如 198.18.0.x），并在建立连接时将原始域名交给境外专线节点代为解析。这不仅彻底消除了本地 DNS 污染，还将网页首屏首包建立时间缩短了 50% 以上。'
  },
  {
    q: '为什么订阅更新时提示“SSL Handshake Failed”或“证书无效”？',
    a: '原因通常有两个：1. 您电脑的本地系统时间与网络标准北京时间偏差超过了 1-2 分钟，导致 TLS 证书有效期校验失败；2. 服务商的订阅分发域名证书临时出现配置问题。排查方法：先在 Windows 设置中点击“立即同步系统时间”；若依然报错，可在客户端订阅设置中临时勾选“跳过证书验证（Skip Certificate Verify）”。'
  },
  {
    q: '如何将电脑上的代理网络共享给同局域网的 Switch 或手机使用？',
    a: '步骤极其简单：1. 在电脑客户端设置中勾选“允许局域网连接（Allow LAN）”；2. 查看电脑在路由器局域网中的私有 IP（例如 192.168.1.100）；3. 在 Switch 或手机的 Wi-Fi 高级设置中，将“HTTP 代理”设置为“手动”，服务器填入电脑 IP（192.168.1.100），端口填入客户端的混合端口（默认通常为 7890），即可共享顺畅网络。'
  },
  {
    q: '客户端应该保持开机自动启动吗？会拖慢电脑速度吗？',
    a: '现代优秀的客户端（如基于 Tauri/Rust 的 Clash Verge Rev）后台空闲时内存占用通常仅有 30-50MB，CPU 占用低于 0.1%，完全不会拖慢现代电脑性能。建议勾选“开机自启”与“静默最小化至托盘”，保证日常办公与查阅文档时的无缝体验。'
  }
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://jichangwiki.homes/tutorials/',
      'url': 'https://jichangwiki.homes/tutorials/',
      'name': title,
      'description': description,
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
      'mainEntity': faqItems.map(item => ({
        '@type': 'Question',
        'name': item.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.a
        }
      }))
    }
  ]
};
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <!-- Hero Header -->
    <div class="bg-gradient-to-br from-slate-950 via-amber-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-2xl border border-amber-900/40 relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="max-w-3xl relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-400/30 mb-4">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          2026 深度升级支柱专题 · 实操任务中心
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-5 leading-tight">
          机场从入门到精通使用教程：分步实操与进阶调优
        </h1>
        <p class="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
          打造真正清晰可落地的分步操作中心。覆盖一键订阅导入、分流规则集编排、TUN 虚拟网卡全局接管与局域网多设备共享，让新手 3 分钟上手，让进阶极客深度掌控网络策略。
        </p>
        <div class="flex flex-wrap gap-3 text-xs sm:text-sm text-slate-300">
          <span class="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            📋 订阅导入与全协议解析指南
          </span>
          <span class="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            🔀 ACL4SSR 国内直连规则配置
          </span>
          <span class="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            🌐 TUN 虚拟网卡驱动故障自愈
          </span>
        </div>
      </div>
    </div>

    <!-- Answer-First Executive Verdict Box -->
    <div class="bg-white rounded-2xl border border-amber-200/80 shadow-md p-6 sm:p-8 mb-12 relative">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
          🧭
        </div>
        <div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900">
            从 0 到 1 极速上车工作流（Answer-First 核心速览）
          </h2>
          <p class="text-xs sm:text-sm text-slate-500">仅需 4 步完成从购买到顺畅访问国际网络</p>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-amber-900 mb-1 text-sm">第一步 · 复制订阅链接</div>
          <p class="text-xs text-slate-600">
            登录服务商用户后台（如光速云），找到“一键订阅”，点击复制 <strong>Clash 通用订阅地址</strong>。
          </p>
        </div>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-blue-900 mb-1 text-sm">第二步 · 导入并更新</div>
          <p class="text-xs text-slate-600">
            打开 <strong>Clash Verge Rev</strong>，进入“订阅/配置”界面粘贴链接，点击保存并下载完成同步。
          </p>
        </div>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-indigo-900 mb-1 text-sm">第三步 · 选节点与规则</div>
          <p class="text-xs text-slate-600">
            在“代理”界面点击测速，选择一个低延迟节点；将模式切换为 <strong>规则（Rule）</strong> 模式。
          </p>
        </div>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-emerald-900 mb-1 text-sm">第四步 · 开启系统代理</div>
          <p class="text-xs text-slate-600">
            在主界面打开 <strong>系统代理（System Proxy）</strong> 开关，即可顺畅打开 Google 与 YouTube。
          </p>
        </div>
      </div>
    </div>

    <!-- Secondary Hubs Grid -->
    <div class="mb-14">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900">使用教程二级专题导航</h2>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">按特定技术阶段深入阅读详尽教程与高级玩法</p>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {subSections.map((s) => (
          <a href={s.url} class="p-5 bg-white rounded-2xl border border-slate-200 hover:border-amber-500 hover:shadow-lg transition group flex flex-col justify-between">
            <div>
              <div class="text-3xl mb-3 group-hover:scale-110 transition-transform">{s.icon}</div>
              <h3 class="text-base font-bold text-slate-900 group-hover:text-amber-600 transition mb-1">{s.name}</h3>
              <p class="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-amber-600 group-hover:translate-x-1 transition-transform">
              阅读教程 &rarr;
            </div>
          </a>
        ))}
      </div>
    </div>

    <!-- Main Prose Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
      
      <!-- TOC Sidebar -->
      <div class="hidden lg:block lg:col-span-1">
        <div class="sticky top-20 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">本页导航目录</h3>
          <ul class="space-y-2 text-xs font-medium text-slate-600">
            <li><a href="#subscription-flow" class="hover:text-amber-600 transition block py-1">1. 订阅链接导入原理与避坑</a></li>
            <li><a href="#modes-difference" class="hover:text-amber-600 transition block py-1">2. 直连、规则与全局模式</a></li>
            <li><a href="#tun-mode-setup" class="hover:text-amber-600 transition block py-1">3. TUN 虚拟网卡深度配置</a></li>
            <li><a href="#lan-sharing" class="hover:text-amber-600 transition block py-1">4. 局域网共享与多设备联动</a></li>
            <li><a href="#faqs" class="hover:text-amber-600 transition block py-1">5. 核心常见问题解答（FAQ）</a></li>
          </ul>
        </div>
      </div>

      <!-- Main Prose Column -->
      <div class="lg:col-span-3 space-y-12">
        
        <!-- Section 1 -->
        <section id="subscription-flow" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            1. 订阅链接导入原理与避坑：规范同步节点
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-4">
            <p>
              订阅链接是客户端与服务商服务器通信的唯一凭据。客户端通过向订阅 URL 发起 HTTPS GET 请求，下载一段经过编码的节点清单配置文件（如 YAML 或 Base64）：
            </p>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 not-prose my-3 text-xs text-slate-700">
              <strong class="font-bold text-slate-900 block mb-1">⚠️ 导入时两大约束：</strong>
              <ul class="list-disc pl-4 space-y-1">
                <li><strong>保持自动更新频率合理</strong>：建议设置自动更新周期为 24 小时或 12 小时一次，避免频繁刷新被服务商 API 频率限制拦截；</li>
                <li><strong>保护 Token 私密性</strong>：绝不要在公共群聊中截图完整的订阅 URL，避免他人盗刷流量。</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Section 2 -->
        <section id="modes-difference" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            2. 直连、规则与全局模式：生产力环境必选规则分流
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              主流客户端均支持以下三种路由工作模式：
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 not-prose my-3 text-xs">
              <div class="p-3 bg-white rounded-xl border border-slate-200">
                <span class="font-bold text-slate-900 block mb-1">🔀 规则模式（Rule）</span>
                <p class="text-slate-600 text-[11px]">强烈推荐常驻！按智能规则分流，国内网站走直连极速，海外网站走代理，完美兼顾。</p>
              </div>
              <div class="p-3 bg-white rounded-xl border border-slate-200">
                <span class="font-bold text-slate-900 block mb-1">🌐 全局模式（Global）</span>
                <p class="text-slate-600 text-[11px]">所有流量全部强行走代理。仅在某些小众冷门网站规则遗漏无法打开时做临时测试使用。</p>
              </div>
              <div class="p-3 bg-white rounded-xl border border-slate-200">
                <span class="font-bold text-slate-900 block mb-1">直通模式（Direct）</span>
                <p class="text-slate-600 text-[11px]">所有网络请求直连互联网，不经过任何代理服务器，等同于关闭代理。</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 3 -->
        <section id="tun-mode-setup" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            3. TUN 虚拟网卡深度配置：搞定命令行与游戏全接管
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              很多开发者经常遭遇“浏览器能翻墙，但 Git Clone、Docker Pull、终端命令行报错”的问题。
            </p>
            <p>
              根本原因是系统代理仅作用于常规应用。在 Clash Verge Rev 中点击“开启服务模式”，随后激活 <strong>TUN 模式</strong> 开关，系统将在驱动层生成虚拟适配器，将网络层（L3）的所有数据包完整送入代理核心，彻底解决各类原生工具无法识别代理的顽疾。
            </p>
          </div>
        </section>

        <!-- Section 4 -->
        <section id="lan-sharing" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            4. 局域网共享与多设备联动：一台电脑搞定家庭设备
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              家中的电视盒子、任天堂 Switch、PlayStation 通常无法直接安装复杂的代理客户端。
            </p>
            <p>
              只需在电脑端勾选“允许局域网（Allow LAN）”，并在 Switch 的 Wi-Fi 属性中设置电脑的内网 IP 作为代理服务器，即可极低成本为游戏机与主机设备提供满速海外更新加速。
            </p>
          </div>
        </section>

        <!-- Section 5: FAQs -->
        <section id="faqs" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-6 pb-2 border-b border-slate-200">
            5. 使用教程常见问题（FAQ）
          </h2>
          <div class="space-y-4">
            {faqItems.map((item, index) => (
              <details class="group bg-white rounded-2xl border border-slate-200/80 p-5 open:ring-2 open:ring-amber-500/20 transition shadow-sm">
                <summary class="font-extrabold text-slate-900 text-sm sm:text-base cursor-pointer flex items-center justify-between list-none">
                  <span class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <span set:html={item.q}></span>
                  </span>
                  <span class="text-slate-400 group-open:rotate-180 transition-transform text-lg ml-2">&darr;</span>
                </summary>
                <div class="mt-4 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed" set:html={item.a}>
                </div>
              </details>
            ))}
          </div>
        </section>

        <!-- Conversion CTA -->
        <div class="mt-12">
          <BrandCTA 
            brandName="光速云（Guangsu Cloud）" 
            affiliateURL="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"
            couponCode="AMM"
            entryPrice="折合 ¥8/月起（年付¥99）"
            customTitle="免去繁琐配置 · 支持自研专属一键客户端"
            customDesc="新手无需手动配置复杂规则，下载专属客户端即可实现账号登录即用；进阶用户亦可自由导出通用 Clash 订阅。"
          />
        </div>

        <!-- Compliance & Affiliate Disclosure -->
        <AffiliateDisclosure />

      </div>
    </div>

  </div>
</BaseLayout>
`;

writePage('tutorials/index.astro', tutorialsPillarContent);

// =========================================================================
// 09. 故障排查 PILLAR PAGE: src/pages/troubleshooting/index.astro
// =========================================================================
const troubleshootingPillarContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';

const title = '网络代理故障排查与自愈诊断全解（2026）｜节点超时、连上无网、403订阅失败与DNS修复';
const description = '权威中文代理故障排查支柱专题：建立标准化问题诊断树。深度解决节点全部红字 Timeout、连接成功却打不开网页、订阅更新 403 证书错误及 7890 端口冲突，提供 100% 可验证的自愈修复步骤。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '故障排查', url: '/troubleshooting/' }
];

const subSections = [
  { name: '节点超时排查', url: '/troubleshooting/timeout/', desc: '全部红字 Timeout 自愈树：系统时间偏差、杀软拦截与服务商状态', icon: '⏱️' },
  { name: '订阅更新失败', url: '/troubleshooting/subscription-failed/', desc: '403/SSL 握手错误：域名污染、证书失效与跳过验证配置', icon: '❌' },
  { name: '连上无网排查', url: '/troubleshooting/connection-failed/', desc: '图标亮绿但打不开网页：TUN 驱动残留与系统代理清理指南', icon: '🔌' },
  { name: 'DNS 异常修复', url: '/troubleshooting/dns-error/', desc: '彻底根治 DNS 污染：Fake-IP 与海外 DoH 递归解析配置', icon: '🌐' },
  { name: '客户端无法启动', url: '/troubleshooting/client-startup/', desc: '闪退崩溃与端口冲突：7890 占用排查与内核残留进程清理', icon: '💥' }
];

const faqItems = [
  {
    q: '为什么所有节点突然全部变红显示“Timeout（连接超时）”？',
    a: '遇到节点全红，请按以下 4 步金标准快速定位：1. <strong>检查系统时间是否精准</strong>：Windows 系统时间如果与网络标准时间偏差超过 60 秒，TLS 握手协议会直接阻断，点击“立即同步时间”即可瞬间解决；2. <strong>检查服务商套餐是否欠费或到期</strong>；3. <strong>检查杀毒软件（如 360、火绒）是否拦截了代理内核的外网访问</strong>；4. <strong>检查本地 Wi-Fi 是否连接正常</strong>（能否打开国内百度首页）。若以上均正常，才属于服务商上游骨干网故障。'
  },
  {
    q: '软件显示连接成功且测速延迟正常，但浏览器就是打不开网页，怎么排查？',
    a: '这是极度高频的“代理接管失败”故障。核心排查三部曲：1. <strong>检查系统代理开关</strong>：打开 Windows 设置 &rarr; 网络和 Internet &rarr; 代理，核对“使用代理服务器”是否处于开启状态（且端口是否与客户端一致，如 127.0.0.1:7890）；2. <strong>排查浏览器第三方代理插件冲突</strong>：如果安装了 SwitchyOmega 等插件且未正确设置，会覆盖系统的代理规则；3. <strong>重置 WinSock 网络栈</strong>：以管理员身份运行 CMD，输入 <code>netsh winsock reset</code> 并重启电脑。'
  },
  {
    q: '订阅链接在客户端更新时报错“403 Forbidden”或“Network Error”怎么办？',
    a: '报错 403 通常代表两类问题：1. 您的订阅 Token 已经在服务商后台被重置或被系统判定为非法，需重新登录后台获取最新链接；2. 您的账户流量配额已耗尽或套餐已过期被停机。如果是“SSL Handshake Failed”，往往是因为服务商的订阅域名被 GFW 污染拦截，建议连接手机热点或在客户端中临时勾选“跳过证书验证”。'
  },
  {
    q: '提示“Port 7890 already in use（端口被占用）”导致客户端内核崩溃闪退？',
    a: '这是由于前一次客户端关闭时未正常注销内核，后台仍有残留的 <code>mihomo.exe</code> 或 <code>clash-meta.exe</code> 进程霸占了端口。极速解决办法：1. 按 Ctrl+Shift+Esc 打开任务管理器，找到并强制“结束进程”所有残留的 Clash/Mihomo 进程；2. 或者在客户端设置中将 Mixed Port（混合端口）直接改成 <code>7895</code> 或其他空闲数字即可。'
  },
  {
    q: '电脑关机或重启后，断开代理软件连国内百度、微信都上不了网了？',
    a: '这是经典的“系统代理未正确释放”故障。客户端异常关闭或被强制杀后台时，未能将 Windows 注册表中的代理开关改回关闭状态。修复步骤：打开系统“设置 &rarr; 网络和 Internet &rarr; 代理”，手动将“使用代理服务器”切换为<strong>关闭</strong>；或重新打开客户端，先开启系统代理再正常点击“退出”，即可恢复系统默认网络。'
  },
  {
    q: '为什么有些特定网站（如 ChatGPT、Netflix）报错打不开，其他网站却正常？',
    a: '这属于典型的“分流策略未生效”或“节点 IP 纯净度不满足要求”。排查方式：1. 检查客户端是否误开了“直连模式（Direct）”；2. 查看规则策略组，确保该网站的域名没有被误分流到国内直连通道；3. 该节点 IP 被目标平台（如 Cloudflare WAF）拉黑，在客户端中手动切换至专属的原生住宅解锁节点（如美国/日本专线）。'
  },
  {
    q: 'TUN 模式启用后本地网络卡死或蓝屏怎么办？',
    a: '这通常是 Wintun 驱动与系统杀毒软件（或第三方 VPN 驱动）发生底层网络钩子（Hook）冲突。解决建议：1. 卸载多余的第三方杀毒或虚拟网卡驱动；2. 在设备管理器中删除虚拟网卡，并在客户端中切换为兼容性更好的 gVisor 协议栈堆栈模式；3. 将 Windows 操作系统更新至最新稳定版。'
  },
  {
    q: '如何通过客户端日志（Log）快速找到真实报错原因？',
    a: '在 Clash Verge Rev 中点击左下角“日志（Logs）”，将日志级别调整为 <code>info</code> 或 <code>debug</code>。尝试打开打不开的网页，观察日志滚动的最新一行：如果显示 <code>[TCP] dial ... connect: connection refused</code> 说明节点服务器故障；如果显示 <code>dns resolve failed</code> 说明是本地 DNS 污染异常；如果没有任何数据包日志，说明系统代理根本未成功转发。'
  },
  {
    q: '遇到故障时，什么时候应该提交工单联系服务商客服？',
    a: '在确认了本地系统时间正常、网络正常、不同客户端与手机端均无法使用超过 15-30 分钟，且服务商官方 Telegram 频道没有发布系统维护通知时，应当提交工单。提单时请直接附上：<strong>您的宽带运营商（如广东电信）、报错客户端与版本、出现超时的具体节点名称</strong>，以便运维技术人员快速定准光缆与入口机房。'
  },
  {
    q: '为什么开启代理后局域网打印机或 NAS 突然搜不到了？',
    a: '因为开启全局代理或规则不当，将 <code>192.168.x.x</code> 等私有内网 IP 也送入了代理内核。解决方法：在客户端设置的“绕过代理列表（Bypass）”中，确保包含 <code>127.0.0.1</code>、<code>192.168.0.0/16</code>、<code>10.0.0.0/8</code> 和 <code>localhost</code> 等局域网私有网段。'
  }
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://jichangwiki.homes/troubleshooting/',
      'url': 'https://jichangwiki.homes/troubleshooting/',
      'name': title,
      'description': description,
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
      'mainEntity': faqItems.map(item => ({
        '@type': 'Question',
        'name': item.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.a
        }
      }))
    }
  ]
};
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <!-- Hero Header -->
    <div class="bg-gradient-to-br from-slate-950 via-rose-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-2xl border border-rose-900/40 relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="max-w-3xl relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-400/30 mb-4">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          2026 深度升级支柱专题 · 故障自愈诊断中心
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-5 leading-tight">
          网络代理故障排查指南：常见报错自愈诊断树
        </h1>
        <p class="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
          拒绝盲目重装与慌乱换软件。本专题构建标准化的排障决策树，系统梳理节点超时、连上无网、403 订阅失败、DNS 污染与 7890 端口冲突，助您 3 分钟内准确定位原因并实现网络自愈。
        </p>
        <div class="flex flex-wrap gap-3 text-xs sm:text-sm text-slate-300">
          <span class="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            ⏱️ 节点全红 Timeout 极速自愈
          </span>
          <span class="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            🔌 连上无网系统代理残留清理
          </span>
          <span class="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            ❌ 403 订阅鉴权与证书报错修复
          </span>
        </div>
      </div>
    </div>

    <!-- Answer-First Executive Verdict Box -->
    <div class="bg-white rounded-2xl border border-rose-200/80 shadow-md p-6 sm:p-8 mb-12 relative">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
          🚨
        </div>
        <div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900">
            黄金排障 4 步诊断树（Answer-First 核心速览）
          </h2>
          <p class="text-xs sm:text-sm text-slate-500">遇到网络故障时，按此标准顺序逐级排查</p>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-rose-900 mb-1 text-sm">第一步 · 检查本地基础网络</div>
          <p class="text-xs text-slate-600">
            先关闭代理，确认能否正常打开国内百度首页。如果无法打开，属于<strong>本地宽带或路由器故障</strong>。
          </p>
        </div>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-blue-900 mb-1 text-sm">第二步 · 核对系统时间</div>
          <p class="text-xs text-slate-600">
            90% 节点全红由于本地时间偏差引起。进入系统设置，点击<strong>“立即同步时钟”</strong>。
          </p>
        </div>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-indigo-900 mb-1 text-sm">第三步 · 检查系统代理开关</div>
          <p class="text-xs text-slate-600">
            确认客户端“系统代理”已开启，且未被第三方浏览器代理插件或杀软强制覆盖关闭。
          </p>
        </div>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-emerald-900 mb-1 text-sm">第四步 · 切换备用机场</div>
          <p class="text-xs text-slate-600">
            若单家服务商全线故障，一键切换至备用的<strong>不限时按量机场</strong>，保障业务不停顿。
          </p>
        </div>
      </div>
    </div>

    <!-- Secondary Hubs Grid -->
    <div class="mb-14">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900">故障排查细分专题导航</h2>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">按特定报错症状直接进入专属深度排查指南与解决方案</p>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {subSections.map((s) => (
          <a href={s.url} class="p-5 bg-white rounded-2xl border border-slate-200 hover:border-rose-500 hover:shadow-lg transition group flex flex-col justify-between">
            <div>
              <div class="text-3xl mb-3 group-hover:scale-110 transition-transform">{s.icon}</div>
              <h3 class="text-base font-bold text-slate-900 group-hover:text-rose-600 transition mb-1">{s.name}</h3>
              <p class="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-rose-600 group-hover:translate-x-1 transition-transform">
              排障自愈 &rarr;
            </div>
          </a>
        ))}
      </div>
    </div>

    <!-- Main Prose Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
      
      <!-- TOC Sidebar -->
      <div class="hidden lg:block lg:col-span-1">
        <div class="sticky top-20 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">本页导航目录</h3>
          <ul class="space-y-2 text-xs font-medium text-slate-600">
            <li><a href="#timeout-issue" class="hover:text-rose-600 transition block py-1">1. 节点全部 Timeout 核心修复</a></li>
            <li><a href="#connected-no-internet" class="hover:text-rose-600 transition block py-1">2. 连上但打不开网页排查</a></li>
            <li><a href="#subscription-error" class="hover:text-rose-600 transition block py-1">3. 订阅 403 与证书报错处理</a></li>
            <li><a href="#port-conflict" class="hover:text-rose-600 transition block py-1">4. 7890 端口冲突与崩溃清理</a></li>
            <li><a href="#faqs" class="hover:text-rose-600 transition block py-1">5. 核心疑难问题解答（FAQ）</a></li>
          </ul>
        </div>
      </div>

      <!-- Main Prose Column -->
      <div class="lg:col-span-3 space-y-12">
        
        <!-- Section 1 -->
        <section id="timeout-issue" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            1. 节点全部 Timeout 核心修复：先校准时钟，再查网络
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              在 TLS 1.3 与现代加密握手协议中，时间戳（Timestamp）校验具有强制性。如果本地时钟比国际原子时偏差超过 1 分钟，所有的加密会话建立均会被直接拒绝并抛出超时。
            </p>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 not-prose my-3 text-xs text-slate-700">
              <strong class="font-bold text-slate-900 block mb-1">极速修复操作：</strong>
              <p>Windows 用户：按 Win + I 打开设置 &rarr; 时间和语言 &rarr; 日期和时间 &rarr; 点击“立即同步”。同步成功后再在客户端点击批量测速，节点即刻全绿恢复。</p>
            </div>
          </div>
        </section>

        <!-- Section 2 -->
        <section id="connected-no-internet" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            2. 连上但打不开网页排查：系统代理残留与 Winsock 重置
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              若节点测速有延迟显示，但浏览器打开任何网页均报“DNS 无法解析”或“代理拒绝连接”：
            </p>
            <ol class="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>打开 Windows 设置 &rarr; 网络 &rarr; 代理，确认代理 IP 为 <code>127.0.0.1</code>，端口与软件内一致；</li>
              <li>以管理员身份打开 CMD 命令提示符，输入 <code>netsh winsock reset</code> 并按回车；</li>
              <li>重启操作系统，清除异常残留的底层网络钩子。</li>
            </ol>
          </div>
        </section>

        <!-- Section 3 -->
        <section id="subscription-error" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            3. 订阅 403 与证书报错处理：重新获取授权 Token
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              更新订阅提示“403 Forbidden”意味着服务商服务器识别到了请求，但拒绝交付节点：
            </p>
            <p class="text-xs sm:text-sm">
              请登录服务商后台确认：1. 套餐是否已经用光了本月流量或已到期；2. 账户是否因为多设备超限被临时限制；3. 在用户中心点击“重置订阅信息”，将生成的新 URL 重新导入客户端。
            </p>
          </div>
        </section>

        <!-- Section 4 -->
        <section id="port-conflict" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            4. 7890 端口冲突与崩溃清理：一键释放端口
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              当客户端提示“Port 7890 already in use”时，无需重启电脑：
            </p>
            <div class="p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl not-prose my-3">
              Get-Process | Where-Object &#123; $_.ProcessName -match "clash|mihomo" &#125; | Stop-Process -Force
            </div>
            <p class="text-xs sm:text-sm">
              在 PowerShell 中执行上述命令，即可瞬间强制释放被霸占的内核端口并重新启动客户端。
            </p>
          </div>
        </section>

        <!-- Section 5: FAQs -->
        <section id="faqs" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-6 pb-2 border-b border-slate-200">
            5. 故障排查常见问题（FAQ）
          </h2>
          <div class="space-y-4">
            {faqItems.map((item, index) => (
              <details class="group bg-white rounded-2xl border border-slate-200/80 p-5 open:ring-2 open:ring-rose-500/20 transition shadow-sm">
                <summary class="font-extrabold text-slate-900 text-sm sm:text-base cursor-pointer flex items-center justify-between list-none">
                  <span class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-rose-100 text-rose-700 text-xs flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <span set:html={item.q}></span>
                  </span>
                  <span class="text-slate-400 group-open:rotate-180 transition-transform text-lg ml-2">&darr;</span>
                </summary>
                <div class="mt-4 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed" set:html={item.a}>
                </div>
              </details>
            ))}
          </div>
        </section>

        <!-- Conversion CTA -->
        <div class="mt-12">
          <BrandCTA 
            brandName="光速云（Guangsu Cloud）" 
            affiliateURL="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"
            couponCode="AMM"
            entryPrice="折合 ¥8/月起（年付¥99）"
            customTitle="高稳定性抗故障 · 光速云专线网络"
            customDesc="企业级高可用架构，自研客户端内置智能故障自愈算法，遭遇异常节点秒级自动切换，大幅降低排障负担。"
          />
        </div>

        <!-- Compliance & Affiliate Disclosure -->
        <AffiliateDisclosure />

      </div>
    </div>

  </div>
</BaseLayout>
`;

writePage('troubleshooting/index.astro', troubleshootingPillarContent);

// =========================================================================
// 10. 风险与替代 PILLAR PAGE: src/pages/risk/index.astro
// =========================================================================
const riskPillarContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';

const title = '机场风险预警与高可用替代方案指南（2026）｜跑路前兆识别、退款维权与双机场容灾';
const description = '权威中文代理风险防范支柱专题：深度剖析服务商跑路与临时上游断纤的本质区别。揭秘 TG 禁言与大额年付吸金等跑路前兆信号，提供支付维权证据保全流程与“双机场冗余容灾架构”实操设计。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '风险与替代', url: '/risk/' }
];

const subSections = [
  { name: '服务停运与失联', url: '/risk/shutdown/', desc: '跑路预警指标：群组禁言、工单关闭与核心节点异常长久失联', icon: '🚨' },
  { name: '机场避坑指南', url: '/risk/avoid-scams/', desc: '消费陷阱全拆解：大额多年付吸金、虚假专线与超售套路', icon: '🕳️' },
  { name: '高可用替代方案', url: '/risk/alternatives/', desc: '断网无缝切换：同价位、同架构优质备选服务商快速匹配', icon: '🔄' },
  { name: '退款与维权指南', url: '/risk/refunds/', desc: '资金纠纷应对：ToS 协议审计、支付网关申诉与证据保全', icon: '⚖️' },
  { name: '安全与隐私防范', url: '/risk/security/', desc: '数据泄密防范：HTTPS 穿透真相、DNS 嗅探与密码隔离原则', icon: '🔒' }
];

const faqItems = [
  {
    q: '如何区分服务商是“彻底跑路失联”还是“上游突发网络断纤事故”？',
    a: '主要看官方沟通渠道与事故应对：1. <strong>上游突发断纤运维事故</strong>：服务商通常会在 15-30 分钟内在官方 Telegram 频道发布公告，说明受影响的机房与修复预期，群组保持正常交流或开启慢速模式，且工单系统正常运转；2. <strong>彻底跑路失联</strong>：官方群组突然开启全员永久禁言、踢出质疑用户，官网域名解析被撤销或直接重定向至博彩/广告站，工单系统关闭且没有任何事故说明。'
  },
  {
    q: '为什么说“不买大额长期年付套餐”是防跑路的第一法则？',
    a: '代理行业具有极高的外部网络与政策不确定性。许多不良平台在运营陷入困境或面临大额专线续约资金缺口时，往往推出极其诱人的“3折终身特惠包”或“超低价多年付”。一旦资金吸收到位，运营者便套现离场。坚持“月付或小额年付（如百元以内）”，即便遭遇突发跑路，您的财务损失也极其微小且可控。'
  },
  {
    q: '机场运营者能不能看到我的银行密码、聊天记录等隐私信息？',
    a: '<strong>只要访问的是现代 HTTPS 网站，机场运营者绝对无法解密您的明文密码与数据内容</strong>。HTTPS 采用端到端传输加密（TLS 握手），密钥仅保存在您的浏览器与目标网站（如 Google、银行）之间，代理服务器仅能看到您连接的目标域名（SNI）和传输的数据包大小，无法看到任何传输的网页正文、账号密码或输入框文本。防范重点：绝不要在客户端安装任何机场要求安装的“自定义根证书（Root CA）”。'
  },
  {
    q: '如果正在使用的机场跑路了，通过微信/支付宝或信用卡能申请退款吗？',
    a: '难度较高，但有规范途径：如果是合规第三方跨境支付网关（如聚合支付平台），可在支付账单明细中找到商户订单号，向该支付通道官方客服发起投诉，说明“购买的虚拟软件服务未按期履约且商户失联欺诈”，支付平台在核实商户异常后可能会冻结其结算保证金并按比例退回；如果使用的是信用卡外币支付，可在 60 天内向发卡行申请“服务未提供（Dispute/Chargeback）”拒付调单。'
  },
  {
    q: '什么是高抗风险的“双机场冗余容灾架构（Dual-Provider Fallback）”？',
    a: '生产力用户的终极抗灾方案：在 Clash Verge Rev 中配置两个服务商的订阅：1. <strong>主力机场（A）</strong>：选用高 SLA 的企业级 IEPL 专线机场（如光速云或红莓），负责日常高频 4K 影音与工作；2. <strong>备用机场（B）</strong>：选用永不过期的不限时按量流量包（如 Snooker 147 永久包）。在策略组中配置自动回退（Fallback）：平时 100% 流量走主力，一旦 A 遭遇突发故障，客户端在 5 秒内自动无缝热切至 B，保障重要业务绝不断网。'
  },
  {
    q: '如何防范机场订阅链接被他人盗用？',
    a: '遵循三大安全隔离原则：1. 注册机场时使用独立的不常用邮箱，切勿使用单位企业邮箱；2. 机场注册密码务必独立生成，严禁与网银、常用邮箱密码相同（防止小作坊机场数据库被脱库撞库）；3. 绝不在任何公共技术交流群或第三方网页中粘贴包含完整 Token 的订阅 URL。'
  },
  {
    q: '机场跑路前通常有哪些最明显的危险信号？',
    a: '跑路前兆四大危险信号：1. 官网突然推出严重违背成本常理的超大额打折活动（如原价 300 元现仅需 50 元）；2. 大面积节点故障失联持续 72 小时以上且无技术进展通报；3. 官方 TG 频道突然开启全员永久禁言并隐藏管理员账号；4. 官方客服工单长时间处于未读状态或直接关闭工单提交入口。'
  },
  {
    q: '遇到服务商失联，应该如何在 5 分钟内快速寻找替代方案？',
    a: '请查阅本站的 <a href="/brands/alternatives/">品牌替代方案专题</a>。按原有的使用习惯筛选一家运营年限在 3 年以上的老牌成熟品牌，优先购买其首月月付或应急小额套餐，快速导入客户端恢复日常工作，切勿在慌乱中再次购买未知新品牌的长期年付。'
  },
  {
    q: '为什么绝不能使用个人搭建的“白嫖免费共享节点池”？',
    a: '网上公开收集的“免费万能节点池”通常由灰色黑产利用扫描脚本抓取的肉鸡或受感染机器搭建。连接这些未知来源的公共节点，您的明文 DNS 请求与原始 IP 将完全暴露，且随时面临中间人嗅探（MITM）和恶意网页脚本劫持注入的巨大风险。'
  },
  {
    q: '选择老牌知名品牌为什么能最大程度规避跑路风险？',
    a: '代理服务是典型的规模经济与长跑行业。老牌品牌（运营 3 年以上）拥有庞大的活跃付费订阅群体，每月拥有稳健充沛的现金流用于支付昂贵的专线物理带宽账单，且品牌知名度与商誉本身就是极高的无形资产，其“跑路套现”的边际收益远远低于持续稳定运营的长期收益。'
  }
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://jichangwiki.homes/risk/',
      'url': 'https://jichangwiki.homes/risk/',
      'name': title,
      'description': description,
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
      'mainEntity': faqItems.map(item => ({
        '@type': 'Question',
        'name': item.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.a
        }
      }))
    }
  ]
};
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <!-- Hero Header -->
    <div class="bg-gradient-to-br from-slate-950 via-zinc-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-2xl border border-zinc-800/80 relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-80 h-80 bg-zinc-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="max-w-3xl relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 text-zinc-300 text-xs font-semibold border border-zinc-700 mb-4">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          2026 深度升级支柱专题 · 风险与容灾中心
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-5 leading-tight">
          机场风险预警指南：跑路识别、维权与双机场容灾
        </h1>
        <p class="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
          理性消费与安全容灾是享受顺畅网络的前提。本专题深入剖析跑路失联与临时故障的区别，揭示危险收费套路与吸金前兆，提供支付维权证据保全流程与高可用的“双机场冗余容灾架构”设计实操。
        </p>
        <div class="flex flex-wrap gap-3 text-xs sm:text-sm text-slate-300">
          <span class="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            🚨 跑路四大早期预警信号
          </span>
          <span class="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            🔄 双机场冗余容灾拓扑设计
          </span>
          <span class="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            🔒 密码安全与隐私隔离三铁律
          </span>
        </div>
      </div>
    </div>

    <!-- Answer-First Executive Verdict Box -->
    <div class="bg-white rounded-2xl border border-zinc-300/80 shadow-md p-6 sm:p-8 mb-12 relative">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm">
          🛡️
        </div>
        <div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900">
            抗风险三大金科玉律（Answer-First 核心速览）
          </h2>
          <p class="text-xs sm:text-sm text-slate-500">如何确保资金安全与业务永不掉线</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-slate-900 mb-2 flex items-center gap-1.5 text-base">
            <span>🚫</span> 严控单笔消费金额
          </div>
          <p class="text-xs sm:text-sm text-slate-600">
            <strong>绝不购买超低价多年付或终身包</strong>。新接触平台坚持月付；老牌稳定服务商即便购买年付，总额控制在 100-200 元可承受沉没范围内。
          </p>
        </div>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-blue-900 mb-2 flex items-center gap-1.5 text-base">
            <span>🔄</span> 部署双机场容灾热备
          </div>
          <p class="text-xs sm:text-sm text-slate-600">
            核心工作流依赖者必须配置<strong>“主力高质专线 + 不限时按量备用”</strong>，两家服务商上游机房完全隔离，实现故障 5 秒无感热切。
          </p>
        </div>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-amber-900 mb-2 flex items-center gap-1.5 text-base">
            <span>🔒</span> 账户与数据严格隔离
          </div>
          <p class="text-xs sm:text-sm text-slate-600">
            使用独立邮箱与随机独立密码注册；严禁在客户端安装任何服务商颁发的自签名根证书，坚决捍卫数据通信隐私。
          </p>
        </div>
      </div>
    </div>

    <!-- Secondary Hubs Grid -->
    <div class="mb-14">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900">风险与替代二级专题导航</h2>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">按特定维度深入阅读风险识别指南、维权实操与同档位备选方案</p>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {subSections.map((s) => (
          <a href={s.url} class="p-5 bg-white rounded-2xl border border-slate-200 hover:border-slate-800 hover:shadow-lg transition group flex flex-col justify-between">
            <div>
              <div class="text-3xl mb-3 group-hover:scale-110 transition-transform">{s.icon}</div>
              <h3 class="text-base font-bold text-slate-900 group-hover:text-blue-600 transition mb-1">{s.name}</h3>
              <p class="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-slate-800 group-hover:translate-x-1 transition-transform">
              进入专题 &rarr;
            </div>
          </a>
        ))}
      </div>
    </div>

    <!-- Main Prose Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
      
      <!-- TOC Sidebar -->
      <div class="hidden lg:block lg:col-span-1">
        <div class="sticky top-20 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">本页导航目录</h3>
          <ul class="space-y-2 text-xs font-medium text-slate-600">
            <li><a href="#shutdown-signals" class="hover:text-slate-900 transition block py-1">1. 跑路失联四大早期危险信号</a></li>
            <li><a href="#dual-redundancy" class="hover:text-slate-900 transition block py-1">2. 双机场冗余容灾架构实操</a></li>
            <li><a href="#privacy-rules" class="hover:text-slate-900 transition block py-1">3. 密码安全与隐私隔离三铁律</a></li>
            <li><a href="#refund-dispute" class="hover:text-slate-900 transition block py-1">4. 支付争议与维权证据保全</a></li>
            <li><a href="#faqs" class="hover:text-slate-900 transition block py-1">5. 核心疑难问题解答（FAQ）</a></li>
          </ul>
        </div>
      </div>

      <!-- Main Prose Column -->
      <div class="lg:col-span-3 space-y-12">
        
        <!-- Section 1 -->
        <section id="shutdown-signals" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            1. 跑路失联四大早期危险信号：识别资金崩盘前兆
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              服务商跑路绝非毫无征兆的突发事件，往往在崩盘前 1-2 周就会释放强烈的危险信号：
            </p>
            <div class="space-y-3 not-prose my-3">
              <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span class="font-bold text-slate-900 text-sm block mb-1">⚠️ 信号一：夸张反常的大额促销吸金</span>
                <p class="text-xs text-slate-600">
                  平时鲜有打折的平台突然全场 2-3 折，或者推出“永久终身 VIP”、“买一年送两年”的大额套餐，本质是在关闭前做最后一波资金回笼。
                </p>
              </div>
              <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span class="font-bold text-slate-900 text-sm block mb-1">⚠️ 信号二：官方交流群永久禁言</span>
                <p class="text-xs text-slate-600">
                  遇到节点突发异常，管理人员不在频道解释原因，而是直接关闭 Telegram 群聊发言权限或频繁踢出反馈问题的用户。
                </p>
              </div>
              <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span class="font-bold text-slate-900 text-sm block mb-1">⚠️ 信号三：核心节点大面积离线超 72 小时</span>
                <p class="text-xs text-slate-600">
                  正规服务商遭遇光缆故障通常在几小时内倒换备用路由。若连续三天全线红字且没有任何修复进度说明，说明已无资金维护服务器。
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 2 -->
        <section id="dual-redundancy" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            2. 双机场冗余容灾架构实操：打造 99.99% 不掉线系统
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              在生产力环境中，将全部希望寄托在单一服务商上极其脆弱。科学的双机场拓扑：
            </p>
            <div class="p-4 bg-slate-900 text-white rounded-xl not-prose my-3 text-xs space-y-2">
              <div class="text-emerald-400 font-bold text-sm">💡 Clash 高可用策略组配置示例：</div>
              <div class="text-slate-300 font-mono text-[11px] leading-relaxed">
                proxy-groups:<br/>
                &nbsp;&nbsp;- name: 🚀 生产力高可用<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;type: fallback<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;proxies:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 专线主力-光速云-香港01<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 专线主力-光速云-日本01<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 容灾备用-不过期按量-香港<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;url: 'http://www.gstatic.com/generate_204'<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;interval: 180
              </div>
            </div>
            <p class="text-xs sm:text-sm text-slate-600">
              通过上述 Fallback 策略，日常优先跑满主力的高速物理专线；一旦主力遭遇突发网络波动，系统会在 180 秒内心跳感知并自动秒切至备用按量节点，无需人工干预。
            </p>
          </div>
        </section>

        <!-- Section 3 -->
        <section id="privacy-rules" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            3. 密码安全与隐私隔离三铁律：彻底斩断数据风险
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              享受跨境网络便利的同时，必须筑牢个人数据安全防线：
            </p>
            <ul class="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>密码独立原则</strong>：机场注册密码绝不能与您的主力邮箱、微信、Apple ID 或网银相同；</li>
              <li><strong>防中间人嗅探原则</strong>：绝不在手机或电脑安装任何机场提供的“HTTPS 根证书”；</li>
              <li><strong>设备权限最小化</strong>：客户端仅给予网络扩展权限，绝不授予通讯录、位置等无关隐私权限。</li>
            </ul>
          </div>
        </section>

        <!-- Section 4 -->
        <section id="refund-dispute" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            4. 支付争议与维权证据保全：守住合法权益
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              一旦遭遇欺诈或服务不交付，请第一时间保存以下三份关键证据：
            </p>
            <ol class="list-decimal pl-5 space-y-1 text-xs sm:text-sm">
              <li>购买时的套餐权益说明与服务承诺截图；</li>
              <li>支付网关账单明细（带有明确商户单号与交易流水号）；</li>
              <li>提交工单超过 48 小时未回应与节点全线超时的系统日志截图。</li>
            </ol>
          </div>
        </section>

        <!-- Section 5: FAQs -->
        <section id="faqs" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-6 pb-2 border-b border-slate-200">
            5. 风险防范与安全常见问题（FAQ）
          </h2>
          <div class="space-y-4">
            {faqItems.map((item, index) => (
              <details class="group bg-white rounded-2xl border border-slate-200/80 p-5 open:ring-2 open:ring-slate-800/20 transition shadow-sm">
                <summary class="font-extrabold text-slate-900 text-sm sm:text-base cursor-pointer flex items-center justify-between list-none">
                  <span class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-slate-200 text-slate-800 text-xs flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <span set:html={item.q}></span>
                  </span>
                  <span class="text-slate-400 group-open:rotate-180 transition-transform text-lg ml-2">&darr;</span>
                </summary>
                <div class="mt-4 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed" set:html={item.a}>
                </div>
              </details>
            ))}
          </div>
        </section>

        <!-- Conversion CTA -->
        <div class="mt-12">
          <BrandCTA 
            brandName="光速云（Guangsu Cloud）" 
            affiliateURL="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"
            couponCode="AMM"
            entryPrice="折合 ¥8/月起（年付¥99）"
            customTitle="老牌成熟运营 · 资金健康与高抗风险保障"
            customDesc="深耕跨境网络多年，拥有充沛的现金流与多地专线冗余储备，提供透明合规的官方直达渠道与专属优惠码 AMM。"
          />
        </div>

        <!-- Compliance & Affiliate Disclosure -->
        <AffiliateDisclosure />

      </div>
    </div>

  </div>
</BaseLayout>
`;

writePage('risk/index.astro', riskPillarContent);

console.log('BATCH 3 COMPLETED SUCCESSFULLY!');
