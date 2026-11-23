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
// 1. vpn/recommend.astro
// -------------------------------------------------------------
const vpnRecFaqs = [
  {
    q: '为什么在中国大陆访问外网，分流代理（机场）比商业 VPN 更流行？',
    a: '传统商业 VPN（如 ExpressVPN、NordVPN）采用全局加密隧道与固定协议特征，极易被防火墙的主动探测与流量特征识别精准封锁，导致大面积连不上或频繁断流。而专业机场采用 Trojan、VLESS、Shadowsocks 等协议，配合 IEPL/IPLC 跨境内网专线与客户端灵活的规则分流（国内直连、海外走代理），在连接稳定性、延迟和日常体验上均大幅超越传统 VPN。'
  },
  {
    q: '传统商业 VPN 还有哪些适用场景？',
    a: '商业 VPN 的核心价值在于高匿名性、严格的零日志（Zero-Logs）政策、跨国公司的合规隐私保护以及公共 WiFi 下的数据防窃听。如果您从事极度敏感的海外商业保密工作且身处防火墙较宽松的网络环境，商业 VPN 仍有其特定价值。'
  },
  {
    q: '光速云作为专线代理，相比商业 VPN 优势在哪里？',
    a: '光速云采用企业级 IEPL/IPLC 物理内网专线过境，流量完全不经过公网 GFW 防火墙检测，抗封锁能力接近 100%；同时原生支持 Clash、Mihomo、Shadowrocket 等主流客户端，提供 200+ 流媒体与 AI 原生解锁节点，晚高峰 4K 拖拽零缓冲，起步月费仅需十余元，远低于传统商业 VPN 动辄每月 10-15 美元的价格。'
  },
  {
    q: '使用商业 VPN 是否容易导致国内 App 无法联网或极慢？',
    a: '是的。绝大多数传统商业 VPN 默认开启全局代理或基于虚拟网卡的 TUN 拦截，分流规则库简陋，会导致微信、支付宝、网银和国内各大电商平台访问极慢甚至触发风控异地登录警告。而分流代理配合 GEOIP 规则能实现毫秒级精准分流。'
  },
  {
    q: '海外大牌 VPN 宣传的“混淆协议（Obfuscation）”在大陆有效吗？',
    a: '效果非常有限且极不稳定。大陆防火墙已引入基于机器学习的未知流量熵值分析与主动探测技术。纯公网的混淆 VPN 在敏感时期通常几天内即被动态阻断 IP，日常可用率难以达到 70%。'
  },
  {
    q: '新手应该如何选择 VPN 替代品（机场）？',
    a: '建议首选成立时间长、具备全专线 SLA 质量保障、支持月付周期的品牌。如光速云提供小流量月付体验套餐（券后低至 ¥14.4），先在自己的设备和宽带运营商网络中实测满意后再考虑升级长周期。'
  }
];

const vpnRecJsonLd = JSON.stringify(makeFaqJsonLd(
  '/vpn/recommend/',
  'VPN推荐与选购指南 - 传统VPN与专线分流代理全方位横评 | 百科机场',
  '全面对比传统商业VPN与新一代专线代理机场的技术架构、穿墙能力、隐私保护与速度表现，帮助用户选择最适合中国大陆网络环境的高速翻墙工具。',
  [
    { name: '首页', url: '/' },
    { name: 'VPN与加速器', url: '/vpn/' },
    { name: 'VPN推荐', url: '/vpn/recommend/' }
  ],
  vpnRecFaqs
));

const vpnRecContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const topBrands = brands.filter(b => b.isTopPick);

const jsonLd = ${vpnRecJsonLd};
---

<BaseLayout
  title="VPN推荐与选购指南 - 传统商业VPN与专线代理机场深度横评 | 百科机场"
  description="全面对比传统商业VPN与专线分流代理的技术原理、抗封锁能力、速度延迟与隐私安全，为您揭示为何专线代理是中国大陆环境下更优的科学上网方案。"
  canonical="https://jichangwiki.homes/vpn/recommend/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/vpn/" class="hover:text-primary-600 transition-colors">VPN与加速器</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">VPN推荐</span>
    </nav>

    <!-- Answer-First 核心速查区 -->
    <header class="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-indigo-800/40 relative overflow-hidden">
      <div class="absolute -right-10 -bottom-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 mb-4">
          SEO/GEO 专题指南 · 架构对比与推荐
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          VPN 推荐与选购指南：传统 VPN 与分流代理架构全方位横评
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          在大中华区跨境网络环境中，传统商业 VPN 与现代分流代理（机场）有着根本性的技术分野。本文为您解密底层传输协议、抗主动探测机制以及国内直连分流策略，帮助您避开断连陷阱，获得最高性价比的翻墙体验。
        </p>

        <!-- TL;DR 专家结论框 -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-indigo-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>百科核心选型结论 (Verdict)</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            在中国大陆网络环境下，<strong>不推荐将传统海外商业 VPN（如 Express、Nord）作为日常主力上网工具</strong>。其协议特征明显、公网阻断频繁且缺乏中国大陆精细化分流规则。推荐采用基于 <strong>Trojan / Shadowsocks 协议并部署于 IEPL/IPLC 物理专线</strong> 的现代分流代理（如光速云），既能实现 4K 秒开、流媒体完美解锁，又能确保微信、网银等国内流量直连免风控。
          </p>
        </div>
      </div>
    </header>

    <!-- 核心横向评测矩阵 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
        <span>技术对比：传统商业 VPN vs 现代专线分流代理 (机场)</span>
      </h2>
      <div class="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
        <table class="w-full text-left text-sm text-slate-600">
          <thead class="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
            <tr>
              <th class="p-4">对比维度</th>
              <th class="p-4">传统商业 VPN (如 Express/Nord)</th>
              <th class="p-4 text-indigo-700 bg-indigo-50/50">现代专线代理 (如光速云)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr>
              <td class="p-4 font-medium text-slate-900">核心传输协议</td>
              <td class="p-4">OpenVPN, WireGuard, IKEv2, 自研混淆</td>
              <td class="p-4 font-semibold text-indigo-600 bg-indigo-50/20">Trojan, Shadowsocks-2022, VLESS</td>
            </tr>
            <tr>
              <td class="p-4 font-medium text-slate-900">抗 GFW 封锁机制</td>
              <td class="p-4">公网混淆，特征易受机器学习与深度包检测识别，大断连频繁</td>
              <td class="p-4 font-semibold text-emerald-600 bg-indigo-50/20">IEPL/IPLC 跨境内网专线，物理规避公网防火墙检查</td>
            </tr>
            <tr>
              <td class="p-4 font-medium text-slate-900">网络分流能力</td>
              <td class="p-4">多为全局代理，分流规则简陋，易导致微信、网银异常风控</td>
              <td class="p-4 font-semibold text-emerald-600 bg-indigo-50/20">精准 GEOIP + 域名规则分流，国内完全直连，海外智能加速</td>
            </tr>
            <tr>
              <td class="p-4 font-medium text-slate-900">晚高峰延迟与丢包</td>
              <td class="p-4">公网国际出口拥堵严重，丢包率常超 15%，延迟 200ms+</td>
              <td class="p-4 font-semibold text-emerald-600 bg-indigo-50/20">专线端到端直通，丢包率 &lt; 0.5%，延迟低至 30-50ms</td>
            </tr>
            <tr>
              <td class="p-4 font-medium text-slate-900">流媒体与 AI 解锁</td>
              <td class="p-4">机房 IP 滥用严重，频繁遭 Netflix/ChatGPT 识别拉黑</td>
              <td class="p-4 font-semibold text-indigo-600 bg-indigo-50/20">定期轮换落地原生住宅/商业 IP，稳定解锁 4K 流媒体与 ChatGPT</td>
            </tr>
            <tr>
              <td class="p-4 font-medium text-slate-900">月均使用成本</td>
              <td class="p-4">普遍在 ¥60 - ¥100/月 ($8-$14/mo)，必须年付才有折扣</td>
              <td class="p-4 font-semibold text-emerald-600 bg-indigo-50/20">主流价格 ¥15 - ¥35/月，支持弹性月付与按需购买</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 优选代理与推荐产品展示 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
        <span>经过大陆多运营商严苛实测的优秀专线代表</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        {topBrands.filter(b => b.id !== 'guangsu').slice(0, 2).map(b => (
          <BrandCard brand={b} />
        ))}
      </div>
      <BrandCTA brand={guangsu} />
    </section>

    <!-- 深度技术解析内容 -->
    <article class="prose prose-slate max-w-none mb-14 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <h3 class="text-xl font-bold text-slate-900">为什么 WireGuard 和 OpenVPN 在大陆几乎无法直接工作？</h3>
      <p class="text-slate-600 leading-relaxed">
        WireGuard 虽然由于内核级实现而具备超高吞吐率，但其协议握手特征极度固定。中国国家级防火墙（GFW）针对 UDP 51820 端口及 WireGuard 报文特征进行了专门的指纹阻断，一旦在公网上检测到握手包，将在几分钟内对服务器 IP 实行端口阻断或全局丢包。
      </p>
      <p class="text-slate-600 leading-relaxed">
        OpenVPN 同样存在明显的握手协商明文特征。即使许多商业 VPN 宣称研发了 XOR 混淆或 Stealth 技术，现代 GFW 采用的机器学习流量分类器能够根据数据包的熵值分布、包大小序列（Packet Size Distribution）迅速判定出“未知高熵隧道”，从而触发深度探测或限速丢包。
      </p>

      <h3 class="text-xl font-bold text-slate-900 mt-6">IEPL/IPLC 专线是如何彻底解决这一困局的？</h3>
      <p class="text-slate-600 leading-relaxed">
        IEPL（国际以太网专线）和 IPLC（国际私有租用线路）是电信运营商直接在大陆入口局（如深圳、上海）到海外机房（如香港、东京）之间铺设的物理内网点对点通道。
      </p>
      <ul class="text-slate-600 list-disc pl-5 space-y-2">
        <li><strong>不过公网审查点：</strong> 用户流量从国内入口服务器通过内网专线直接传输至境外落地机房，完全不经过公网国际互联出入口（NAP）。</li>
        <li><strong>零晚高峰抖动：</strong> 专线享有电信级 SLA 带宽承诺，不受晚高峰国际公网出口拥塞影响，延迟极低（深圳-香港约 5-8ms）。</li>
        <li><strong>协议透明转发：</strong> 由于在内网传输，即使采用轻量加密的 Shadowsocks 协议也具备极高的安全性，无需消耗大量 CPU 进行重度伪装。</li>
      </ul>
    </article>

    <!-- 常见问题 FAQ 模块 (Schema + 交互) -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
        <span>VPN 与代理选型常见问题解答 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {vpnRecFaqs.map(faq => (
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

    <!-- 三级集群与面包屑导流 -->
    <nav class="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-10">
      <h3 class="text-base font-bold text-slate-900 mb-4">VPN 专题相关页面索引</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm">
        <a href="/vpn/free/" class="text-indigo-600 hover:underline">免费 VPN 风险与揭秘</a>
        <a href="/vpn/mobile/" class="text-indigo-600 hover:underline">手机端翻墙指南</a>
        <a href="/vpn/android/" class="text-indigo-600 hover:underline">安卓系统翻墙配置</a>
        <a href="/vpn/gaming/" class="text-indigo-600 hover:underline">游戏加速器与代理</a>
        <a href="/airport/recommend/" class="text-indigo-600 hover:underline">高速机场推荐</a>
        <a href="/pricing/value/" class="text-indigo-600 hover:underline">高性价比机场排行</a>
      </div>
    </nav>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`;

writePage('vpn/recommend.astro', vpnRecContent);

// -------------------------------------------------------------
// 2. vpn/free.astro
// -------------------------------------------------------------
const vpnFreeFaqs = [
  {
    q: '为什么说“免费 VPN 是最昂贵的”？它的盈利模式是什么？',
    a: '运营跨境国际出口服务器需要承担昂贵的机房租金与带宽成本。免费 VPN 不可能长期做慈善，其核心盈利途径包括：在客户端内置高频弹窗广告、转售用户的未加密浏览历史给广告联盟、将用户的设备 IP 悄悄加入住宅代理网络（P2P 挖矿或代刷僵尸网络），甚至植入木马窃取支付凭据。'
  },
  {
    q: '所谓的“永久免费翻墙软件”有哪些典型套路？',
    a: '典型套路包括：1) 钓鱼拉人头：要求分享到 5 个微信群才能领取 500MB 流量；2) 极度限速：免费线路强制限制至 50-100KB/s，无法播放视频；3) 强制付费升级陷阱：购买会员后几天软件便失联跑路；4) 节点经常失效，用户需频繁重新下载带有病毒的更新包。'
  },
  {
    q: '预算有限的情况下，有哪些真正安全的低成本替代方案？',
    a: '推荐选择老牌正规机场的廉价轻量套餐。例如光速云的特惠年付仅需 ¥99（相当于每月仅 ¥8.25），或者支持灵活按月订购的十多元基础套餐。每月几瓶饮料的成本，就能换来物理专线直连、无日志记录及 4K 高清体验，彻底杜绝隐私泄露风险。'
  },
  {
    q: '各大主流应用商店里的高评分“Free VPN”可信吗？',
    a: '绝大多数不可信。很多开发者利用刷好评工具在 Google Play 或 App Store 上架简陋的 OpenVPN 包装壳，其背后注册地为开曼群岛、塞舌尔等离岸空壳公司，实际数据所有权和流量流向完全不透明。'
  },
  {
    q: '自建免费节点（如利用 Cloudflare Workers / VLESS）好用吗？',
    a: 'Cloudflare 节点的公网 IP 在大陆已被严重审查和 QOS 限速，晚高峰丢包率常常超过 50%，延迟高达 300ms 以上，且需要花费大量时间折腾优选 IP，维护成本极高，只适合技术折腾，不适合作为日常主力生产力工具。'
  },
  {
    q: '如果我只是偶尔查一次学术资料，该怎么选择？',
    a: '可以考虑提供免费试用额度或小额充值的正规机场平台，或者购买支持不限时按量计费的流量包，用多少扣多少，比使用来路不明的免费 VPN 软件安全得多。'
  }
];

const vpnFreeJsonLd = JSON.stringify(makeFaqJsonLd(
  '/vpn/free/',
  '免费VPN真相揭秘与安全平替指南 - 广告、限速、隐私窃取套路深度剖析 | 百科机场',
  '深入揭露免费VPN软件的商业盈利套路、隐私转售风险与网络限速内幕，并为您提供每月仅需几元的高可靠低成本平替方案。',
  [
    { name: '首页', url: '/' },
    { name: 'VPN与加速器', url: '/vpn/' },
    { name: '免费VPN真相', url: '/vpn/free/' }
  ],
  vpnFreeFaqs
));

const vpnFreeContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${vpnFreeJsonLd};
---

<BaseLayout
  title="免费VPN真相揭秘 - 广告、限速、隐私窃取套路与安全平替 | 百科机场"
  description="免费VPN真的不要钱吗？揭露免费翻墙软件背后的流量转售、木马捆绑与数据窃取黑幕，为您推荐高性价比、安全可信的低门槛替代方案。"
  canonical="https://jichangwiki.homes/vpn/free/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/vpn/" class="hover:text-primary-600 transition-colors">VPN与加速器</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">免费VPN真相</span>
    </nav>

    <header class="bg-gradient-to-br from-rose-950 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-rose-900/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-400/30 mb-4">
          安全避坑专题 · 隐私与风险深度调查
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          免费 VPN 真相揭秘：天下真有免费的翻墙午餐吗？
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          带宽是明码标价的物理资产，跨境带宽更是昂贵稀缺资源。当一款软件声称“永久免费且不限流量”时，你的隐私、个人数据和设备算力往往就是支付给它的隐形货币。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-rose-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <span>百科核心安全预警</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            严禁在任何“免费 VPN”环境下登录 Google、银行网银、加密货币钱包或输入核心账号密码！研究表明，超 80% 的免费翻墙工具存在明文抓包、嵌入第三方广告 SDK 收集设备 IMEI，甚至将用户设备作为代理跳板（Botnet）的行为。
          </p>
        </div>
      </div>
    </header>

    <!-- 风险全景揭秘 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-rose-600 rounded-full inline-block"></span>
        <span>免费 VPN 的四大黑色变现产业链</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold mb-4">1</div>
          <h3 class="text-lg font-bold text-slate-900 mb-2">流量劫持与隐私数据售卖</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            在服务端架设中间人（MITM）代理，解密或嗅探用户的 HTTP 请求，记录访问足迹并将其打包成大数据用户画像，非法出售给跨境黑产或广告营销联盟。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold mb-4">2</div>
          <h3 class="text-lg font-bold text-slate-900 mb-2">设备沦为住宅代理出口 (P2P 挖矿)</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            在软件后台植入守护进程，当连接 Wi-Fi 时悄悄将您的设备宽带共享出去，成为黑客扫描攻击、网络爬虫或注册垃圾号的肉鸡节点，导致您的宽带被运营商风控。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mb-4">3</div>
          <h3 class="text-lg font-bold text-slate-900 mb-2">极端降速与“付费会员”杀猪盘</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            免费线路强制限速在 100KB/s 以下，页面弹窗疯狂提示“升级 VIP 享百兆极速”。待用户充值数百元年费后，不出一个月服务器关闭失联，换壳重来。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mb-4">4</div>
          <h3 class="text-lg font-bold text-slate-900 mb-2">高风险木马与钓鱼广告捆绑</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            非开源的 Windows/Android 客户端中捆绑静默安装器，强制推送博彩广告、金融诈骗链接或在浏览器后台篡改电商推广返利 Cookie。
          </p>
        </div>
      </div>
    </section>

    <!-- 安全高性价比替代方案 -->
    <section class="mb-14">
      <div class="bg-indigo-50 border border-indigo-200 rounded-3xl p-8">
        <div class="max-w-3xl">
          <h2 class="text-2xl font-bold text-indigo-950 mb-3">安全平替方案：每月不到一杯奶茶钱的正规专线</h2>
          <p class="text-slate-700 text-sm leading-relaxed mb-6">
            想要兼顾隐私安全与 4K 流畅体验，无需承受高昂开支。选择采用开源客户端（如 Clash Verge、Shadowrocket）配置的正规专线品牌，完全自主掌握分流配置，所有代码透明可查。
          </p>
          <div class="bg-white p-5 rounded-2xl border border-indigo-150 mb-6 shadow-sm">
            <h4 class="font-bold text-slate-900 text-sm mb-2">光速云特惠方案 (专线接入 · 零日志审计)</h4>
            <ul class="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
              <li>特惠年付仅需 ¥99（折合 ¥8.25/月），包含每月 69GB 企业专线流量</li>
              <li>采用标准 Trojan/Shadowsocks 协议，支持开源客户端，绝无流氓后台</li>
              <li>物理隔离内网专线，晚高峰 4K 拖拽零缓冲，稳定解锁 ChatGPT 与 Netflix</li>
            </ul>
          </div>
          <BrandCTA brand={guangsu} />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-rose-600 rounded-full inline-block"></span>
        <span>免费翻墙工具常见疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {vpnFreeFaqs.map(faq => (
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

writePage('vpn/free.astro', vpnFreeContent);

// -------------------------------------------------------------
// 3. vpn/mobile.astro
// -------------------------------------------------------------
const vpnMobFaqs = [
  {
    q: '为什么手机端翻墙比电脑端更容易遇到断连或耗电过快？',
    a: '移动操作系统（特别是 iOS 和国内深度定制的 Android ROM）具备极其激进的后台电池管理与内存冻结机制。传统 VPN 全局虚拟网卡（TUN）长连接会导致 CPU 无法进入深睡眠（Deep Sleep），造成耗电剧增；同时在 Wi-Fi 与蜂窝移动网络（4G/5G）频繁切换时，系统套接字断开容易引发连接挂死。'
  },
  {
    q: 'iOS（苹果手机）上翻墙最佳解决方案是什么？',
    a: '在 iOS 上强烈推荐使用基于 Network Extension 框架开发的专业代理客户端，首选 Shadowrocket（小火箭，性价比极高）或 Stash / Quantumult X。配合专线机场的订阅链接，不仅功耗极低（全天常驻耗电小于 5%），而且支持根据网络状态自动重新连线。'
  },
  {
    q: '安卓手机后台经常被系统杀进程怎么办？',
    a: '请在手机“电池管理/应用耗电管理”中找到客户端（如 Clash Meta for Android、FlClash），将后台运行权限设置为“无限制/允许后台高耗电”，并在“应用启动管理”中关闭自动管理，开启“允许自启动”与“允许后台活动”；最后在任务卡片多任务视图中给应用加锁。'
  },
  {
    q: '在手机上开启代理会影响国内微信、抖音或外卖软件的速度吗？',
    a: '如果使用配置正确的规则分流模式（Rule Mode），完全不会。分流引擎会读取本地 GEOIP 数据库，所有国内主流应用、网站和直连 IP 完全走本地网络出口，速度丝毫不受影响；仅有访问海外域名或 AI 服务时才会智能调度至代理节点。'
  },
  {
    q: '为什么手机连接公共 WiFi 后代理无法上网？',
    a: '很多商场或酒店的公共 WiFi 存在“Web 认证登录页（Captive Portal）”。当开启全局代理或规则代理拦截了 DNS 请求时，可能导致认证页面无法弹出。此时应先在客户端中暂停代理，完成网页登录认证后，再重新开启代理。'
  },
  {
    q: '手机端如何测试节点的真实延迟与流媒体可用性？',
    a: '客户端自带的连通性测试（Ping）通常只是 TCP 握手延迟或简单的 HTTP HEAD 测试。真实性能建议在 Shadowrocket 或 Clash 中开启真实连接，并在手机 Safari/Chrome 中直接打开 fast.com 测速或访问 netflix.com 查看是否有原生播放按钮。'
  }
];

const vpnMobJsonLd = JSON.stringify(makeFaqJsonLd(
  '/vpn/mobile/',
  '手机VPN翻墙完全指南 - iOS与Android保活、省电与网络切换优化 | 百科机场',
  '针对苹果 iPhone 与各大品牌安卓手机在移动网络环境下的翻墙痛点，系统讲解后台保活策略、电池续航优化、Wi-Fi/5G无缝切换及客户端选型。',
  [
    { name: '首页', url: '/' },
    { name: 'VPN与加速器', url: '/vpn/' },
    { name: '手机VPN指南', url: '/vpn/mobile/' }
  ],
  vpnMobFaqs
));

const vpnMobContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${vpnMobJsonLd};
---

<BaseLayout
  title="手机VPN与翻墙完全指南 - iOS与Android后台保活、省电与无感切换 | 百科机场"
  description="详解 iPhone 与安卓手机在 4G/5G 移动蜂窝环境下的翻墙优化技巧，解决频繁断连、后台被杀、电量飞崩和国内应用卡顿等核心痛点。"
  canonical="https://jichangwiki.homes/vpn/mobile/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/vpn/" class="hover:text-primary-600 transition-colors">VPN与加速器</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">手机VPN指南</span>
    </nav>

    <header class="bg-gradient-to-br from-cyan-900 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-cyan-800/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 mb-4">
          移动端专题 · 体验与功耗调优
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          手机 VPN 移动翻墙指南：iOS 与 Android 深度调优方案
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          手机随身携带，随时面对 Wi-Fi 与蜂窝数据切换、系统省电休眠、应用进程回收等复杂环境。本文教您如何打造全天候无感常驻、超低耗电、秒速重连的移动翻墙环境。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-cyan-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            <span>移动端最佳实践速查</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            <strong>iOS 平台：</strong>首选 Shadowrocket（小火箭），利用其系统级 Network Extension 保证全天耗电 &lt; 5%；<br/>
            <strong>Android 平台：</strong>首选 Clash Meta for Android 或 FlClash，务必在系统设置中开启“无限制电池优化”和“允许后台活动”；<br/>
            <strong>网络服务商：</strong>选择节点延迟极低且包含多线 BGP 入口的专线机场（如光速云），防止信号基站切换导致 TCP 握手长时间挂死。
          </p>
        </div>
      </div>
    </header>

    <!-- 优化实战模块 -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 class="text-xl font-bold text-slate-900 mb-4 flex items-center space-x-2">
          <span class="p-2 bg-indigo-50 text-indigo-600 rounded-lg">🍎</span>
          <span>iOS (iPhone / iPad) 优化配置指南</span>
        </h2>
        <ul class="space-y-3 text-sm text-slate-600">
          <li class="flex items-start space-x-2">
            <span class="font-bold text-slate-900">1.</span>
            <span><strong>按需连接 (On-Demand)：</strong>在 Shadowrocket 设置中开启“按需连接”，无论重启手机还是锁屏唤醒，系统会自动在后台保持代理连接状态。</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-bold text-slate-900">2.</span>
            <span><strong>全局路由选“配置”：</strong>绝不选“全局代理”，选择“配置/规则模式”，确保微信视频通话、网银和国服手游走直连线路。</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-bold text-slate-900">3.</span>
            <span><strong>排除局域网：</strong>勾选“跳过代理局域网地址”，防止 AirDrop、隔空投送及智能家居控制受到干扰。</span>
          </li>
        </ul>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 class="text-xl font-bold text-slate-900 mb-4 flex items-center space-x-2">
          <span class="p-2 bg-emerald-50 text-emerald-600 rounded-lg">🤖</span>
          <span>Android (华为/小米/OPPO/vivo) 防杀后台</span>
        </h2>
        <ul class="space-y-3 text-sm text-slate-600">
          <li class="flex items-start space-x-2">
            <span class="font-bold text-slate-900">1.</span>
            <span><strong>电池无限制：</strong>进入系统设置 -&gt; 应用管理 -&gt; 对应客户端 -&gt; 耗电管理 -&gt; 允许高耗电行为 / 无限制。</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-bold text-slate-900">2.</span>
            <span><strong>最近任务加锁：</strong>划出多任务卡片页面，长按或下拉客户端卡片，点击锁形图标完成后台常驻锁定。</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="font-bold text-slate-900">3.</span>
            <span><strong>分应用代理 (App Bypass)：</strong>可在客户端中勾选仅代理浏览器、Twitter、YouTube 等软件，彻底排除国内 App。</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- 推荐匹配服务商 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-cyan-600 rounded-full inline-block"></span>
        <span>移动端优化首选推荐专线品牌</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-cyan-600 uppercase tracking-wider">移动网络适配特性</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云移动端专属优势</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云具备全国三大运营商多地 BGP 入口与高速 IPLC 专线，无论您使用的是中国移动、中国电信还是中国联通 5G 网络，都能就近接入低延迟骨干内网，换基站瞬时重连不掉线。
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
        <span>手机翻墙常见问题 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {vpnMobFaqs.map(faq => (
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

writePage('vpn/mobile.astro', vpnMobContent);

// -------------------------------------------------------------
// 4. vpn/android.astro
// -------------------------------------------------------------
const vpnAndFaqs = [
  {
    q: '安卓手机翻墙目前首选推荐哪款客户端？',
    a: '目前安卓生态首选推荐两款开源现代化客户端：1) Clash Meta for Android（CMFA，基于 Mihomo 内核，规则与协议支持极全）；2) FlClash（跨平台新锐，界面现代简洁，对新人和多订阅管理极其友好）。两款均完全开源、免费且不含任何商业推广广告。'
  },
  {
    q: '在国产安卓手机（MIUI/HyperOS、HarmonyOS、ColorOS）上安装 APK 会报毒提示风险，是真的吗？',
    a: '通常是误报或系统级白名单策略。国产手机厂商对未在官方应用商店上架的包含 VPNService 权限的 APK 包通常会弹出“未受信任”或“高危风险”警示。只要确保 APK 是从 GitHub 官方 Release 页面下载的开源程序，即可放心忽略警告并选择“继续安装”。'
  },
  {
    q: '安卓上如何开启“分应用代理”？有什么好处？',
    a: '在客户端设置中找到“分应用代理（Access Control / Bypass Mode）”，开启后您可以自由勾选仅代理 Chrome、Telegram、X、YouTube、Gmail 等海外软件。好处是：国内应用完全走原生网络，不仅彻底规避了银行 App 的异地风控，还能大幅减少代理流量消耗与电池开销。'
  },
  {
    q: '华为 HarmonyOS（鸿蒙系统）能正常使用科学上网客户端吗？',
    a: '在当前的鸿蒙 4.0 及以下系统（兼容安卓 AOSP 框架）中，可以直接侧载安装运行 Clash Meta 或 v2rayNG。针对未来纯血鸿蒙（HarmonyOS NEXT），需等待客户端开发者基于 OpenHarmony 原生网络框架适配，目前可通过路由器局域网透明代理或备用安卓机作为热点解决。'
  },
  {
    q: '安卓端如何顺畅登录 Google 账户并使用 Google Play 商店？',
    a: '如果手机没有出厂内置谷歌服务（GMS），需先使用各机型对应的谷歌安装器或系统自带设置中的“开启 Google 基础服务”开关。在代理客户端中，确保配置规则包含 Google 全家桶走代理，且节点具备低延迟与纯净 IP，即可顺利完成账户验证。'
  },
  {
    q: 'Clash Meta for Android 的 VpnService 经常断流需要怎么排查？',
    a: '断流通常是因为系统省电策略杀死了后台 TUN 守护进程。请检查：1) 电池优化已设为“无限制”；2) 关闭“锁定屏幕后清理后台应用”；3) 检查代理机场节点是否触发了并发连接数限制；4) 在客户端设置中尝试开启“自动重启服务”。'
  }
];

const vpnAndJsonLd = JSON.stringify(makeFaqJsonLd(
  '/vpn/android/',
  '安卓手机翻墙与VPN客户端配置手册 - APK下载、分应用代理与防杀后台 | 百科机场',
  '全面讲解安卓（Android）平台科学上网客户端选型（CMFA、FlClash、v2rayNG）、APK官方安全下载渠道、分应用代理分流技巧及国内各品牌手机优化攻略。',
  [
    { name: '首页', url: '/' },
    { name: 'VPN与加速器', url: '/vpn/' },
    { name: '安卓VPN指南', url: '/vpn/android/' }
  ],
  vpnAndFaqs
));

const vpnAndContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${vpnAndJsonLd};
---

<BaseLayout
  title="安卓手机翻墙与VPN客户端配置手册 - APK安全下载与深度优化 | 百科机场"
  description="面向 Android 用户的全方位科学上网指引，涵盖开源客户端挑选、安全侧载安装、分应用代理设置与国产 ROM 专属保活教程。"
  canonical="https://jichangwiki.homes/vpn/android/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/vpn/" class="hover:text-primary-600 transition-colors">VPN与加速器</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">安卓VPN指南</span>
    </nav>

    <header class="bg-gradient-to-br from-teal-900 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-teal-800/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-400/30 mb-4">
          Android 专享手册 · 开源实战
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          安卓手机翻墙与 VPN 客户端配置手册：安全、分流与稳定
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          Android 系统的开放性为代理协议提供了无限可能，但同时也面临着应用报毒、后台杀进程和 GMS 谷歌框架冲突等问题。本文为您呈现经过多品牌手机实测的最佳配置流程。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-teal-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>安卓端核心选型结论</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            强烈建议<strong>放弃任何非开源的所谓“破解版、永久免费版 APK”</strong>。直接下载官方 GitHub 开源发行的 <strong>Clash Meta for Android</strong> 或 <strong>FlClash</strong>，配合采用 <strong>IEPL 专线</strong> 的正规服务商订阅（如光速云），即可获得与高端 PC 媲美的超高速跨境浏览体验。
          </p>
        </div>
      </div>
    </header>

    <!-- 主流客户端对比 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-teal-600 rounded-full inline-block"></span>
        <span>安卓三大开源主力客户端横向评估</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div class="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-md mb-3">综合首选 · 功能最强</div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">Clash Meta for Android</h3>
            <p class="text-slate-600 text-sm leading-relaxed mb-4">
              基于 Mihomo 核心深度开发，完整支持 Shadowsocks-2022、VLESS Reality、Hysteria2 等最新前沿协议，规则分流能力处于安卓生态天花板级别。
            </p>
          </div>
          <div class="text-xs text-slate-500 pt-3 border-t border-slate-100">适用：中高级用户、极客玩家、追求极致分流</div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div class="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-md mb-3">现代美观 · 新人首选</div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">FlClash (Flutter 打造)</h3>
            <p class="text-slate-600 text-sm leading-relaxed mb-4">
              采用 Flutter 框架编写，UI 极简流畅，视觉风格现代优雅。支持一键导入订阅、节点延迟测速与暗色模式，上手零门槛。
            </p>
          </div>
          <div class="text-xs text-slate-500 pt-3 border-t border-slate-100">适用：新手用户、注重界面颜值、多设备界面统一</div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div class="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-md mb-3">轻量经典 · 单节点测试</div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">v2rayNG</h3>
            <p class="text-slate-600 text-sm leading-relaxed mb-4">
              经典的 Xray 核心 Android 实现，虽然界面朴素，但在单节点直接导入、二维码扫描测试以及特定协议调试方面非常可靠实用。
            </p>
          </div>
          <div class="text-xs text-slate-500 pt-3 border-t border-slate-100">适用：单节点调试、应急备用、轻量设备</div>
        </div>
      </div>
    </section>

    <!-- 推荐品牌 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-teal-600 rounded-full inline-block"></span>
        <span>安卓客户端完美适配的服务商</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-teal-600 uppercase tracking-wider">一键导入体验</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全自动安卓订阅支持</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云后台提供专为安卓客户端优化的直接聚合订阅链接，点击“一键导入到 Clash”即可自动完成节点分组与流媒体规则配置，告别手动转码困扰。
            </p>
          </div>
          <BrandCTA brand={guangsu} />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-teal-600 rounded-full inline-block"></span>
        <span>安卓翻墙核心疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {vpnAndFaqs.map(faq => (
          <details class="group bg-white rounded-xl border border-slate-200 p-5 open:bg-slate-50 transition-colors">
            <summary class="font-semibold text-slate-900 cursor-pointer flex justify-between items-center list-none">
              <span>{faq.q}</span>
              <span class="text-teal-600 group-open:rotate-180 transition-transform duration-200">
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

writePage('vpn/android.astro', vpnAndContent);

// -------------------------------------------------------------
// 5. vpn/gaming.astro
// -------------------------------------------------------------
const vpnGameFaqs = [
  {
    q: '为什么普通网页翻墙机场不适合直接用来打外服游戏？',
    a: '网页浏览和 4K 视频看重的是“吞吐带宽（Bandwidth）”，对几十毫秒的握手延迟不敏感；而外服竞技游戏（如 Steam、Apex Legends、Valorant、CS2）看重的是“超低物理延迟、零抖动（Jitter）与绝对的 Full Cone NAT / UDP 转发”。普通机场大多缺乏专用的游戏加速内网调度，UDP 转发容易丢包导致角色瞬移或跳 Ping。'
  },
  {
    q: '专线代理（如光速云）可以胜任游戏加速吗？',
    a: '如果机场提供部署了 IPLC/IEPL 物理内网直通且开启了完整 UDP Full Cone 支持的特定游戏专线节点，完全可以媲美甚至超越商业游戏加速器。光速云的香港、日本专线端到端延迟低至 30-50ms，且物理专线丢包率趋近于 0，用来加速 Steam、外服对战非常稳定。'
  },
  {
    q: 'Clash 或客户端中打游戏需要注意开启什么开关？',
    a: '必须在客户端中开启 TUN 虚拟网卡模式（以接管游戏进程的全部网络流量），并在配置文件中确认开启了 `udp: true` 支持。同时，优先选择节点名称中带有“游戏优化”、“Game”或低倍率香港/日本专线节点。'
  },
  {
    q: '商业游戏加速器（如网易 UU、雷神）与自选代理专线该怎么选？',
    a: '如果您只在主机（PS5、Switch、Xbox）或 PC 上玩国服及主流外服游戏，不涉及查资料、看 YouTube、使用 Discord，商业游戏加速器开箱即用；如果您希望一个软件/服务同时搞定海外资料查阅、4K 视频播放、AI 生产力及外服联机低延迟，配置良好的高质量专线代理是性价比更高、更全能的选择。'
  },
  {
    q: '为什么玩游戏时 Discord 语音经常断开或无法连接？',
    a: 'Discord 的语音通话走的是特定的 WebRTC UDP 协议通道。如果代理节点屏蔽了 UDP 协议或客户端分流规则未将 Discord 域名/端口纳入代理范围，就会导致文字聊天正常但语音一直显示“RTC 连接中”。选择开启全 UDP 转发的专线机场即可解决。'
  },
  {
    q: 'NAT 类型严格（Strict / NAT 3）如何优化为开放（Open / NAT 1）？',
    a: '需客户端内核（如 Mihomo / Clash Meta）支持 Full Cone NAT，并在入站与转发设置中开启此特性；同时落地节点服务器端口映射必须支持锥形 NAT。这样在 Switch/PS5 联机中才能获得 NAT Type A/B 的极佳联机匹配体验。'
  }
];

const vpnGameJsonLd = JSON.stringify(makeFaqJsonLd(
  '/vpn/gaming/',
  '游戏加速器与外服联机代理指南 - 延迟、抖动、NAT类型与UDP优化 | 百科机场',
  '深入剖析外服游戏联机网络机制，对比商业游戏加速器与IEPL专线代理在延迟、丢包率、Full Cone NAT支持及Discord语音联动上的差异。',
  [
    { name: '首页', url: '/' },
    { name: 'VPN与加速器', url: '/vpn/' },
    { name: '游戏加速指南', url: '/vpn/gaming/' }
  ],
  vpnGameFaqs
));

const vpnGameContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${vpnGameJsonLd};
---

<BaseLayout
  title="游戏加速器与外服联机代理指南 - 低延迟、零丢包与UDP优化 | 百科机场"
  description="针对 Steam、Apex、Valorant 及主机联机玩家的外服加速硬核指南，详解物理专线低延迟、Full Cone NAT 与 UDP 游戏加速实测调优。"
  canonical="https://jichangwiki.homes/vpn/gaming/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/vpn/" class="hover:text-primary-600 transition-colors">VPN与加速器</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">游戏加速指南</span>
    </nav>

    <header class="bg-gradient-to-br from-violet-950 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-violet-900/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-400/30 mb-4">
          游戏竞技专线 · 延迟与网络调优
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          游戏加速器与外服联机代理指南：告别跳 Ping、丢包与 NAT 限制
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          外服电竞联机对网络质量有着极其苛刻的要求。本文从底层解析 TCP 与 UDP 差异、物理专线传输延迟、Full Cone NAT 穿透以及 Discord 语音联动的关键配置。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-violet-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>游戏玩家核心选型结论</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            普通公网直连翻墙节点<strong>绝不适合</strong>外服竞技游戏，其晚高峰高丢包率会导致严重回弹瞬移。若想兼顾日常科学上网与低延迟外服电竞，建议选用支持 <strong>全 UDP 转发与 Full Cone NAT 的优质 IPLC 专线服务商（如光速云）</strong>，配合客户端 TUN 虚拟网卡模式，实现媲美专业加速器的竞技级体验。
          </p>
        </div>
      </div>
    </header>

    <!-- 游戏网络核心指标 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-violet-600 rounded-full inline-block"></span>
        <span>电竞游戏网络四大硬核指标对比</span>
      </h2>
      <div class="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
        <table class="w-full text-left text-sm text-slate-600">
          <thead class="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
            <tr>
              <th class="p-4">网络指标</th>
              <th class="p-4">普通公网代理</th>
              <th class="p-4">商业游戏加速器</th>
              <th class="p-4 text-violet-700 bg-violet-50/50">顶级 IPLC 专线 (光速云)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr>
              <td class="p-4 font-medium text-slate-900">物理抖动与丢包率</td>
              <td class="p-4 text-rose-600">5% - 20% 严重抖动</td>
              <td class="p-4 text-emerald-600">&lt; 1% 极稳定</td>
              <td class="p-4 font-semibold text-emerald-600 bg-violet-50/20">&lt; 0.5% 物理级零丢包</td>
            </tr>
            <tr>
              <td class="p-4 font-medium text-slate-900">UDP 支持状态</td>
              <td class="p-4 text-amber-600">多数受限或仅限 TCP</td>
              <td class="p-4 text-emerald-600">深度优化 UDP 转发</td>
              <td class="p-4 font-semibold text-emerald-600 bg-violet-50/20">全面开启 UDP Full Cone</td>
            </tr>
            <tr>
              <td class="p-4 font-medium text-slate-900">全网生态通用性</td>
              <td class="p-4">仅网页与视频</td>
              <td class="p-4 text-rose-600">仅游戏进程，不支持日常翻墙</td>
              <td class="p-4 font-semibold text-emerald-600 bg-violet-50/20">游戏、Discord、网页、AI全能合一</td>
            </tr>
            <tr>
              <td class="p-4 font-medium text-slate-900">香港/日本节点延迟</td>
              <td class="p-4">80 - 150ms 波动</td>
              <td class="p-4">35 - 55ms</td>
              <td class="p-4 font-semibold text-violet-600 bg-violet-50/20">30 - 45ms 极速物理专线</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 推荐产品 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-violet-600 rounded-full inline-block"></span>
        <span>游戏兼顾日常使用的高素质品牌</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-violet-600 uppercase tracking-wider">电竞级直通网络</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云电竞专线实测</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云具备端到端真实物理专线保障，不仅能为 Steam、战网、Epic 等平台提供全速下载，还能在 Apex、CS2 及 Discord 开黑联机中保持稳定的低 Ping 与无杂音高品质语音。
            </p>
          </div>
          <BrandCTA brand={guangsu} />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-violet-600 rounded-full inline-block"></span>
        <span>游戏加速常见疑难 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {vpnGameFaqs.map(faq => (
          <details class="group bg-white rounded-xl border border-slate-200 p-5 open:bg-slate-50 transition-colors">
            <summary class="font-semibold text-slate-900 cursor-pointer flex justify-between items-center list-none">
              <span>{faq.q}</span>
              <span class="text-violet-600 group-open:rotate-180 transition-transform duration-200">
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

writePage('vpn/gaming.astro', vpnGameContent);

console.log('ALL 5 VPN SECONDARY PAGES WRITTEN!');
