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
// 1. clients/clash-verge.astro
// -------------------------------------------------------------
const vergeFaqs = [
  {
    q: '原版 Clash for Windows (CFW) 停更后，为什么 Clash Verge Rev 是目前最佳替代者？',
    a: 'CFW 已于 2023 年底彻底停止维护，其内核陈旧且存在未修复的安全隐患。Clash Verge Rev 采用 Rust + Tauri 框架重构，内存占用显著低于 Electron，且默认集成最新的开源 Mihomo (Clash Meta) 核心，完美支持 Shadowsocks-2022、VLESS、Reality 等新协议，是 Windows 与 macOS 上当下最主流、维护最活跃的客户端。'
  },
  {
    q: 'Clash Verge Rev 的“TUN 模式”如何开启？有什么用？',
    a: '在设置中安装“服务模式（Service Mode）”后，开启“TUN 模式”。TUN 会接管整个操作系统的虚拟网卡流量，无需在浏览器或各个独立软件（如 Git、Telegram、Steam、Discord）中逐一配置代理端口，实现全局系统级透明分流。'
  },
  {
    q: 'Clash Verge Rev 导入订阅后报 `yaml: unmarshal errors` 怎么解决？',
    a: '通常是因为机场返回的订阅内容不规范或使用了旧版不兼容的语法。在订阅设置中将“内核切换”确保为“Mihomo/Meta”，或者右键订阅选择“配置转换”。若仍报错，可在机场后台复制“Clash 订阅格式”而不是 V2Ray 订阅。'
  },
  {
    q: '如何利用 Clash Verge Rev 的“扩展脚本 (Script)”或“配置合并 (Merge)”功能？',
    a: 'Clash Verge Rev 提供了强大的订阅扩展机制。您可以在不修改机场原始订阅的前提下，编写 JavaScript 脚本或 YAML 片段追加自定义分流规则（如强制走特定专线节点、屏蔽广告规则集），订阅更新时自定义规则不会丢失。'
  },
  {
    q: 'Clash Verge Rev 在 macOS 上启动时提示“已损坏，无法打开”怎么办？',
    a: '这是 macOS Gatekeeper 系统的安全签名拦截机制。请打开终端执行命令：`sudo xattr -rd com.apple.quarantine /Applications/Clash\\ Verge.app`，输入电脑锁屏密码后即可正常双击启动。'
  },
  {
    q: '光速云等专线机场能否在 Clash Verge Rev 中一键导入？',
    a: '完全支持。在光速云后台点击“便捷导入”->“导入到 Clash”，系统会自动唤醒 Clash Verge Rev 并下载最新优化的分流节点列表。'
  }
];

const vergeJsonLd = JSON.stringify(makeFaqJsonLd(
  '/clients/clash-verge/',
  'Clash Verge Rev 完全配置教程与下载指南 - 替代CFW的最佳开源客户端 | 百科机场',
  '全面详解 Clash Verge Rev 客户端的官方下载渠道、Tauri轻量架构优势、TUN虚拟网卡模式配置、扩展脚本Merge规则及常见报错排查。',
  [
    { name: '首页', url: '/' },
    { name: '客户端软件', url: '/clients/' },
    { name: 'Clash Verge Rev 教程', url: '/clients/clash-verge/' }
  ],
  vergeFaqs
));

const vergeContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${vergeJsonLd};
---

<BaseLayout
  title="Clash Verge Rev 完全配置教程与下载指南 - 替代CFW的最佳开源客户端 | 百科机场"
  description="详解基于 Tauri 框架打造的现代化跨平台客户端 Clash Verge Rev，涵盖安全下载、TUN模式接管、Script规则合并与常见排错技巧。"
  canonical="https://jichangwiki.homes/clients/clash-verge/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/clients/" class="hover:text-primary-600 transition-colors">客户端软件</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">Clash Verge Rev</span>
    </nav>

    <header class="bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-blue-800/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
          主流跨平台神器 · PC/Mac 首选
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          Clash Verge Rev 完全配置指南：新一代跨平台代理客户端
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          原版 Clash for Windows 隐退后，基于 Rust + Tauri 的 <strong>Clash Verge Rev</strong> 已成为事实上的桌面端旗舰标准。本文带您快速上手安装、TUN 网卡全局接管与高级脚本分流。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-blue-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>百科核心评测结论 (Verdict)</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            Windows 与 macOS 用户<strong>强烈建议直接使用 Clash Verge Rev 作为日常主力</strong>。其轻量化 Tauri 架构彻底解决了老旧 Electron 客户端开机内存占用 400MB+ 的痛点，原生搭载的 Mihomo 内核全面兼容当今主流机场的所有高级特性与全自动化规则流。
          </p>
        </div>
      </div>
    </header>

    <!-- 安装与配置核心三步 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
        <span>Clash Verge Rev 极速入门三步法</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-2xl font-black text-blue-600 mb-2">STEP 1</div>
          <h3 class="font-bold text-slate-900 mb-2">认准官方 GitHub 发行版</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            请仅在官方开源仓库（clash-verge-rev/clash-verge-rev）下载 Release 包。Windows 建议选择 <code>x64-setup.exe</code>，macOS 根据芯片选择 <code>aarch64.dmg (M系列)</code> 或 <code>x64.dmg (Intel)</code>。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-2xl font-black text-blue-600 mb-2">STEP 2</div>
          <h3 class="font-bold text-slate-900 mb-2">导入机场订阅并选择模式</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            进入“订阅 (Profiles)”，粘贴光速云等优质服务商的订阅 URL 并保存。在“代理 (Proxies)”页面将运行模式切换为“规则 (Rule)”，首选香港或日本低延迟节点。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-2xl font-black text-blue-600 mb-2">STEP 3</div>
          <h3 class="font-bold text-slate-900 mb-2">安装服务模式并启用 TUN</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            进入“设置 (Settings)”中安装“服务模式 (Service Mode)”，随后开启“TUN 模式”。系统所有应用程序流量均将通过虚拟网卡智能分流，无需对单独软件设置代理。
          </p>
        </div>
      </div>
    </section>

    <!-- 优选机场推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
        <span>Clash Verge Rev 完美搭配服务商</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">原生深度适配</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云专线与 Clash Verge Rev</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云原生支持 Clash 规则集下发，自动分类“OpenAI / Claude”、“国际流媒体”、“节点自动选择”等策略组，导入即用，晚高峰百兆 4K 拖拽秒播。
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
        <span>Clash Verge Rev 常见问题 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {vergeFaqs.map(faq => (
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

writePage('clients/clash-verge.astro', vergeContent);

// -------------------------------------------------------------
// 2. clients/clash-meta.astro
// -------------------------------------------------------------
const metaFaqs = [
  {
    q: 'Clash Meta（Mihomo）与经典版 Clash Premium 核心有什么区别？',
    a: '经典版 Clash (Dreamacro) 闭源且早在 2023 年底停止开发，不支持 Shadowsocks-2022、VLESS Reality、Hysteria、TUIC 等任何新一代抗封锁协议。Clash Meta（现更名为 Mihomo）由开源社区持续演进，不仅全面向下兼容所有原版语法，还深度增强了 Sniffer 域名嗅探、规则集 Rule-Set、GEOIP.dat 高速解析与更强的 TUN 栈。'
  },
  {
    q: '使用 Clash Meta 核心有哪些立竿见影的体验升级？',
    a: '1) 支持新协议带来更强的穿墙抗封锁能力；2) 内置更加精密的 Sniffer 嗅探器，即使应用发起的是加密 DoH/DoT 或者是裸 IP 请求，也能还原出真实域名进行精准分流；3) 内存管理优化，高并发连接下不易出现内存泄露导致软件崩溃。'
  },
  {
    q: '如何判断我的客户端当前运行的是否为 Clash Meta 内核？',
    a: '在客户端界面的内核详情或日志窗口中查看版本信息。若显示 `Mihomo Meta` 或 `Clash.Meta` 字符串，且版本号为 1.18.x 或更高，即表示使用的是最新的 Meta 核心。'
  },
  {
    q: 'Clash Meta 配置文件中的 `rule-providers` 为什么比传统规则更强大？',
    a: '`rule-providers` 允许客户端异步从 GitHub 或 CDN 动态拉取最新的分类规则库（如 LoyalSoldier 的 GeoSite/GeoIP 规则），无需每次机场修改规则就重新覆盖整个本地配置文件，实现了配置与规则数据的解耦。'
  },
  {
    q: 'Clash Meta 核心占用 CPU 高怎么办？',
    a: '通常是因为开启了过于激进的“自动测速（URL-Test）”频率，或者在中继分组中设置了过短的定时健康检查间隔。建议将测速间隔从默认的 300 秒延长至 600-1200 秒，并关闭不必要的规则日志输出。'
  },
  {
    q: '光速云对 Clash Meta 核心的适配情况如何？',
    a: '光速云完全面向 Meta/Mihomo 规范优化下发配置，包含标准 Shadowsocks 与高效专线节点，并原生内置了精细的流媒体与 OpenAI 规则集，确保零兼容性故障。'
  }
];

const metaJsonLd = JSON.stringify(makeFaqJsonLd(
  '/clients/clash-meta/',
  'Clash Meta (Mihomo) 内核特性解析与配置全解 | 百科机场',
  '深入剖析开源代理核心 Clash Meta（现Mihomo）的架构创新，涵盖新协议支持、Sniffer域名嗅探、Rule-Providers规则集与高性能TUN配置。',
  [
    { name: '首页', url: '/' },
    { name: '客户端软件', url: '/clients/' },
    { name: 'Clash Meta 内核', url: '/clients/clash-meta/' }
  ],
  metaFaqs
));

const metaContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${metaJsonLd};
---

<BaseLayout
  title="Clash Meta (Mihomo) 内核特性解析与配置全解 | 百科机场"
  description="深度解析当今最主流的开源科学上网核心 Clash Meta（Mihomo），详解其支持的最新协议、高级分流规则集与底层优化机制。"
  canonical="https://jichangwiki.homes/clients/clash-meta/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/clients/" class="hover:text-primary-600 transition-colors">客户端软件</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">Clash Meta (Mihomo)</span>
    </nav>

    <header class="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-indigo-900/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 mb-4">
          下一代核心规范 · 开源进阶
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          Clash Meta (Mihomo) 核心技术解析与配置指南
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          原版 Clash 核心谢幕后，Clash Meta（现统一命名为 Mihomo）承担起全球开源代理生态的基石重任。它不仅挽救了庞大的 Clash 生态，更引领了分流协议的技术革新。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-indigo-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            <span>核心技术结论 (Verdict)</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            无论您使用哪款图形客户端（Clash Verge Rev、Clash Nyanpasu 或 CMFA），<strong>务必确认其底层内核为 Mihomo / Clash Meta</strong>。老旧的 Clash Premium 核心已无法解析新型 VLESS / Reality 与 Shadowsocks-2022 专线节点。
          </p>
        </div>
      </div>
    </header>

    <!-- Meta 核心四大升级 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
        <span>Clash Meta (Mihomo) 的四大革命性提升</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="text-lg font-bold text-slate-900 mb-2">1. 全新抗封锁协议矩阵</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            完美原生支持 Shadowsocks-2022（更安全的重放防护）、VLESS + Reality（直接借用真实海外大厂证书伪装）、Hysteria 2 与 TUIC（基于 UDP 的弱网高速回弹协议）。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="text-lg font-bold text-slate-900 mb-2">2. 智能 Sniffer (域名嗅探引擎)</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            支持对 TLS ClientHello (SNI) 和 HTTP Host 头部进行主动嗅探，解决应用直连 IP 导致分流规则失效的难题，确保精准将 Telegram、Netflix 流量引导至专属分流策略。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="text-lg font-bold text-slate-900 mb-2">3. 现代化 Rule-Providers 动态规则集</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            无需在配置文件中硬编码上千行规则，支持直接引用远程 GitHub/CDN 规则源文件，并提供定时自动增量更新，大幅降低配置文件体积与维护复杂度。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="text-lg font-bold text-slate-900 mb-2">4. 高性能 TUN 栈与 Full Cone NAT</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            内置优化过的 GVisor / Mixed TUN 网络协议栈，支持全锥形 NAT（Full Cone NAT），为外服电竞对战、语音开黑与 P2P 传输提供原生级的低延迟穿透支持。
          </p>
        </div>
      </div>
    </section>

    <!-- 优选品牌适配 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
        <span>深度兼容 Meta 特性的高质量专线服务商</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider">技术合规与前沿架构</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全线 Meta 协议接入</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云部署的 IEPL/IPLC 物理骨干专线完全遵循 Meta/Mihomo 的高性能配置规范，提供端到端低丢包保障与原生 AI 解锁，免除繁琐的手动调试。
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
        <span>Clash Meta (Mihomo) 常见疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {metaFaqs.map(faq => (
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

writePage('clients/clash-meta.astro', metaContent);

// -------------------------------------------------------------
// 3. clients/v2rayn.astro
// -------------------------------------------------------------
const v2raynFaqs = [
  {
    q: 'v2rayN 在当今代理生态中的核心定位是什么？',
    a: 'v2rayN 是 Windows 平台上最经典、功能最纯粹的代理图形客户端之一。它以直接集成 Xray-core、Sing-box 等底层核心为特色，虽然界面偏向传统的 Windows 原生窗体设计，但在快速单节点导入、二维码识别、手动协议参数微调以及深度网络调试方面，具备极高的稳定性和无可替代的灵活性。'
  },
  {
    q: 'v2rayN 支持直接导入 Clash 订阅吗？',
    a: '新版 v2rayN（6.x/7.x）已原生支持通过内置订阅转换器或者 Sing-box 核心直接解析 Clash 订阅。同时您也可以直接在机场后台复制专用的 V2Ray / Base64 / Xray 订阅链接进行导入。'
  },
  {
    q: 'v2rayN 开启后浏览器无法翻墙怎么办？',
    a: '请检查底部任务栏状态：1) 确保底部“系统代理”开关已切换为“自动配置系统代理”（图标变为红/蓝色）；2) 确保“路由”选项选择了“绕过大陆 (绕过大陆/黑名单)”模式；3) 检查对应节点真连接延迟是否返回正常数字而非 -1 或超时。'
  },
  {
    q: 'v2rayN 如何开启类似 Clash 的全局 TUN 虚拟网卡模式？',
    a: '在 v2rayN 顶部菜单选择“路由设置”或点击下方状态栏的“TUN 模式”，根据系统提示安装虚拟网卡驱动（Wintun），开启后即可实现无需设置系统代理的全局透明拦截。'
  },
  {
    q: 'v2rayN 的“测速”功能中，Ping 测速与真实下载测速有什么区别？',
    a: 'Ping 测速仅代表您的电脑与节点服务器完成 TCP 握手的时间，无法体现带宽大小；右键节点选择“测试服务器真连接延迟 (下载测速)”则会实际从海外节点拉取一段数据，返回真实的 HTTP 响应耗时与带宽状态。'
  },
  {
    q: '为什么有时候 v2rayN 退出后电脑微信、网页完全打不开了？',
    a: '这是由于客户端非正常退出（如意外关机或崩溃）未清理系统代理注册表引起的。再次启动 v2rayN，将底部系统代理切换为“清除系统代理”然后正常退出软件，或在 Windows 设置中搜索“代理设置”，手动关闭“使用代理服务器”开关即可复原。'
  }
];

const v2raynJsonLd = JSON.stringify(makeFaqJsonLd(
  '/clients/v2rayn/',
  'v2rayN Windows 完全配置与故障排查指南 | 百科机场',
  '全面讲解 Windows 平台经典代理工具 v2rayN 的最新版本安装、Xray内核配置、系统代理开关、TUN模式启用及无法上网排查。',
  [
    { name: '首页', url: '/' },
    { name: '客户端软件', url: '/clients/' },
    { name: 'v2rayN 教程', url: '/clients/v2rayn/' }
  ],
  v2raynFaqs
));

const v2raynContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${v2raynJsonLd};
---

<BaseLayout
  title="v2rayN Windows 完全配置与使用指南 - Xray核心实战与常见故障排查 | 百科机场"
  description="详解 Windows 经典客户端 v2rayN 的安装、订阅导入、Xray 核心调试、系统代理与 TUN 模式配置，轻松解决无法连网等常见疑难。"
  canonical="https://jichangwiki.homes/clients/v2rayn/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/clients/" class="hover:text-primary-600 transition-colors">客户端软件</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">v2rayN</span>
    </nav>

    <header class="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-slate-700 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-slate-700 text-slate-200 border border-slate-600 mb-4">
          经典硬核 · Windows 调试利器
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          v2rayN Windows 完全配置与使用指南
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          v2rayN 作为基于 .NET 打造的开源经典工具，原生整合了 Xray-core、V2Ray 与 Sing-box 核心。其直观的节点列表展示与极度透明的底层参数调校，深受技术玩家与极客用户的青睐。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-slate-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>v2rayN 核心适用场景</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            适合偏好简洁纯粹列表界面的 Windows 用户、需要频繁手动导入单个测试节点（vmess/vless/trojan 链接）的玩家，以及作为备用客户端排查复杂网络故障。
          </p>
        </div>
      </div>
    </header>

    <!-- 核心操作实战 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-slate-800 rounded-full inline-block"></span>
        <span>v2rayN 正确上手操作要领</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">1. 下载带 Core 整合包</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            初学者在 GitHub Release 中务必选择 <code>v2rayN-With-Core.zip</code>。该版本已预置全部底层引擎驱动，解压即可运行，免去手动配置内核的繁琐步骤。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">2. 订阅管理与更新</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            点击顶部菜单“订阅分组” -&gt; “订阅分组设置”，添加机场提供的订阅 URL 并保存。随后按下键盘 <code>Ctrl + U</code> 即可快速一键更新并拉取最新专线节点。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">3. 系统代理与路由</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            软件底部状态栏将“系统代理”设为“自动配置系统代理”，路由规则设为“绕过大陆”。双击选择一个延迟最低的香港或日本节点，即可畅享外网。
          </p>
        </div>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-slate-800 rounded-full inline-block"></span>
        <span>适合 v2rayN 导入的优质专线品牌</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-slate-600 uppercase tracking-wider">全协议支持</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全协议接入支持</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云后台不仅提供 Clash 聚合订阅，还支持标准 V2Ray/Trojan 原生订阅下发，完美匹配 v2rayN 客户端，毫秒级响应，晚高峰全速不丢包。
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
        <span>v2rayN 疑难解答 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {v2raynFaqs.map(faq => (
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

writePage('clients/v2rayn.astro', v2raynContent);

// -------------------------------------------------------------
// 4. clients/shadowrocket.astro
// -------------------------------------------------------------
const rocketFaqs = [
  {
    q: 'Shadowrocket（小火箭）为什么在中国大陆 App Store 搜不到？如何下载？',
    a: '受中国大陆应用商店政策限制，所有包含网络代理与 VPN 扩展特性的工具均未在大陆区 App Store 上架。您需要准备一个非大陆地区（推荐美国、香港或日本）的 Apple ID。切换登录外区 App Store 后，搜索“Shadowrocket”（售价通常为 $2.99 美元）即可购买下载。'
  },
  {
    q: '为什么严禁在“系统设置”中直接登录租借或非本人的海外 Apple ID？',
    a: '极其危险！千万不要在 iPhone 的【设置 -&gt; 最顶部个人头像（iCloud）】登录他人的 Apple ID，否则可能导致手机被远程恶意锁定或勒索（开启“查找我的 iPhone”）。正确做法是：仅在【App Store 应用商店】内点击个人头像退出并登录外区账号，下载完成后立即换回自己的国区账号。'
  },
  {
    q: 'Shadowrocket 导入机场订阅后，全局路由应该选哪个？',
    a: '主界面下方务必选择【配置 (Config)】模式，绝不要选【代理 (Proxy)】模式。配置模式下，小火箭会根据规则自动将国内网站（如百度、淘宝、微信）直连，仅将海外受限网站与流媒体转发至代理节点，既省流量又省电。'
  },
  {
    q: 'Shadowrocket 的“按需连接 (On-Demand)”功能有什么用？',
    a: '在设置中开启“按需连接”后，当手机连上蜂窝数据或 Wi-Fi 时，iOS 系统会在底层自动保持代理隧道开启；即使锁屏深睡眠或重启手机，也会自动重连，彻底避免日常忘记开代理的尴尬。'
  },
  {
    q: '小火箭如何测试真实节点速度与流媒体解锁？',
    a: '点击节点右侧的信息图标或在主界面下拉测试延迟（Ping 为 TCP 握手）。更深入的测试可以长按节点选择“诊断”，或直接在 Safari 浏览器中访问 Netflix、Disney+ 验证是否出现非自制剧播放按钮。'
  },
  {
    q: '光速云等专线服务商如何一键导入到 Shadowrocket？',
    a: '在 Safari 浏览器中登录光速云官网后台，点击“一键导入”按钮选择“导入到 Shadowrocket”，系统会自动调起小火箭并下载订阅；也可以复制聚合订阅链接，打开小火箭点击右上角“+”号，类型选择“Subscribe”粘贴 URL 完成导入。'
  }
];

const rocketJsonLd = JSON.stringify(makeFaqJsonLd(
  '/clients/shadowrocket/',
  'Shadowrocket (小火箭) iOS 终极配置使用指南 | 百科机场',
  '全面讲解苹果 iPhone / iPad 平台最普及的神器 Shadowrocket（小火箭）的购买下载、订阅导入、分流规则配置、按需连接与常见问题。',
  [
    { name: '首页', url: '/' },
    { name: '客户端软件', url: '/clients/' },
    { name: 'Shadowrocket 教程', url: '/clients/shadowrocket/' }
  ],
  rocketFaqs
));

const rocketContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${rocketJsonLd};
---

<BaseLayout
  title="Shadowrocket (小火箭) iOS 终极配置与使用指南 - 苹果翻墙必备神器 | 百科机场"
  description="面向 iPhone 与 iPad 用户的权威 Shadowrocket 教程，涵盖美区 Apple ID 获取技巧、订阅一键导入、规则配置、按需保活与安全防锁机指南。"
  canonical="https://jichangwiki.homes/clients/shadowrocket/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/clients/" class="hover:text-primary-600 transition-colors">客户端软件</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">Shadowrocket (小火箭)</span>
    </nav>

    <header class="bg-gradient-to-br from-amber-900 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-amber-800/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30 mb-4">
          iOS 平台国民级神器 · 稳定高能
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          Shadowrocket (小火箭) iOS 终极配置与实战指南
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          作为 iOS 生态中最受推崇的代理利器，Shadowrocket 凭借 $2.99 的亲民买断价格、极其出色的电池功耗控制与对主流协议的全面支持，成为了苹果用户的翻墙标配。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-amber-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <span>安全第一守则 (Security Alert)</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            绝对<strong>不要在 iPhone 系统的“设置 -&gt; iCloud”中登录陌生海外 Apple ID</strong>！仅允许在 App Store 应用商店内切换账号下载，下载完毕后务必立即登回个人私有账号，确保设备资产绝对安全。
          </p>
        </div>
      </div>
    </header>

    <!-- 小火箭四步上手流程 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-amber-500 rounded-full inline-block"></span>
        <span>Shadowrocket 新手上手四步核心闭环</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xl font-black text-amber-600 mb-2">01. 外区下载</div>
          <p class="text-slate-600 text-sm leading-relaxed">
            登录美区/日区 Apple ID，在 App Store 搜索购买正版 Shadowrocket（开发者为 Pan Guoqing）。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xl font-black text-amber-600 mb-2">02. 导入订阅</div>
          <p class="text-slate-600 text-sm leading-relaxed">
            点击主页右上角“+”号，类型选“Subscribe”，粘贴专线机场提供的订阅 URL 并完成保存。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xl font-black text-amber-600 mb-2">03. 设定配置模式</div>
          <p class="text-slate-600 text-sm leading-relaxed">
            全局路由选择【配置】，避免选中【代理】导致国内 App 也走代理从而触发风控或白白浪费流量。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xl font-black text-amber-600 mb-2">04. 开启连接</div>
          <p class="text-slate-600 text-sm leading-relaxed">
            拨动顶部开关，首次启用时根据 iOS 弹窗提示输入手机锁屏密码允许安装 VPN 配置文件。
          </p>
        </div>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-amber-500 rounded-full inline-block"></span>
        <span>小火箭最佳搭配专线服务商</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-amber-600 uppercase tracking-wider">移动端极致体验</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云 iOS 专属优化方案</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云后台原生支持 Shadowrocket 一键调起导入，节点自动按照“香港/日本/新加坡/美国”分组排序，搭配小火箭低能耗特性，全天常驻耗电低于 5%。
            </p>
          </div>
          <BrandCTA brand={guangsu} />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-amber-500 rounded-full inline-block"></span>
        <span>Shadowrocket 常见疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {rocketFaqs.map(faq => (
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

writePage('clients/shadowrocket.astro', rocketContent);

// -------------------------------------------------------------
// 5. clients/mihomo.astro
// -------------------------------------------------------------
const mihomoFaqs = [
  {
    q: 'Mihomo 到底是什么？它与 Clash 之间是什么关系？',
    a: 'Mihomo（中文常称为“虚空核心”，前身为 Clash Meta）是一个基于 Go 语言开发的强大开源通用代理内核。在原作者 Dreamacro 停止维护 Clash 原版核心后，全球核心开发者接力成立了 Mihomo 项目，旨在修复历史漏洞、扩展现代加密协议并兼容 Clash 现有的全套生态规范。'
  },
  {
    q: 'Mihomo 支持哪些原版 Clash 根本无法运行的新协议？',
    a: 'Mihomo 率先完整支持了 Shadowsocks-2022（BLAKE3-AES 派生）、VLESS Reality 伪装机制、Hysteria 2（极速 UDP 拥塞控制）、TUIC v5、WireGuard 协议嵌套以及 SSH 隧道等，抗封锁技术维度远超老旧内核。'
  },
  {
    q: '为什么说 Mihomo 的 Sniffer 能够根治“分流不准确”问题？',
    a: '传统分流仅基于应用发送给本地代理端口的域名。但许多现代应用（如 Telegram、WhatsApp、各类移动端 App）会直接向远端 IP 发起 TCP 请求。Mihomo 的 Sniffer 可以在握手阶段直接解析出内部携带的 TLS SNI 证书扩展域名，从而将裸 IP 还原回真实网站域名，命中精准规则。'
  },
  {
    q: '在 Linux 服务器或 OpenWrt 软路由上如何部署 Mihomo？',
    a: '可以直接从官方 Release 下载对应架构的单二进制文件（如 `mihomo-linux-amd64`），将其作为 systemd 服务常驻运行，并配合 Web 控制面板（如 Yacd 或 Metacubexd）进行无头（Headless）可视化管理。'
  },
  {
    q: 'Mihomo 配置文件中 `unified-delay: true` 有什么意义？',
    a: '开启该选项后，客户端在测速时会扣除本地到国内中继入口的网络延迟，直接计算“端到端真实 RTT”耗时，使得节点测速数值更加真实可信，避免因为本地网络抖动造成测速失准。'
  },
  {
    q: '光速云针对 Mihomo 内核做了哪些专属优化？',
    a: '光速云全线专线集群深度测试并通过了 Mihomo 1.18+ 的兼容性验证，支持全自动下发带有 Meta 特性的流媒体规则集与 Shadowsocks-2022 专线节点，连接建立延迟低于 50ms。'
  }
];

const mihomoJsonLd = JSON.stringify(makeFaqJsonLd(
  '/clients/mihomo/',
  'Mihomo 开源核心深度指南 - 架构特性、语法规范与部署实战 | 百科机场',
  '全面解构新一代代理核心 Mihomo 的底层架构设计，详解多协议支持、Sniffer域名嗅探引擎、高性能TUN栈与Linux/OpenWrt部署技巧。',
  [
    { name: '首页', url: '/' },
    { name: '客户端软件', url: '/clients/' },
    { name: 'Mihomo 核心指南', url: '/clients/mihomo/' }
  ],
  mihomoFaqs
));

const mihomoContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${mihomoJsonLd};
---

<BaseLayout
  title="Mihomo (虚空核心) 深度指南 - 架构特性、语法规范与部署实战 | 百科机场"
  description="全景解析开源代理核心 Mihomo（原Clash Meta），深度剖析新协议支持、Sniffer 域名还原、Rule-Providers 规则集及软路由/Linux 部署。"
  canonical="https://jichangwiki.homes/clients/mihomo/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/clients/" class="hover:text-primary-600 transition-colors">客户端软件</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">Mihomo 核心指南</span>
    </nav>

    <header class="bg-gradient-to-br from-purple-950 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-purple-900/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-400/30 mb-4">
          开源内核基石 · 极客首选
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          Mihomo (原 Clash Meta) 开源核心深度指南
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          Mihomo 是目前整个中文科学上网生态中最坚固的技术支柱。它承载着从图形客户端到软路由透明网关的全部流量分流与协议处理逻辑。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-purple-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
            <span>架构师评测视点</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            Mihomo 的核心优势在于对协议生态的极速跟进与出色的并发性能。无论是家庭软路由透明网关、极客 Linux 服务器，还是现代 GUI 壳程序，选择 Mihomo 作为内核就是选择了兼容性与吞吐力的绝对前沿。
          </p>
        </div>
      </div>
    </header>

    <!-- 核心技术特性矩阵 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-purple-600 rounded-full inline-block"></span>
        <span>Mihomo 底层三大核心引擎解密</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">Sniffer 域名嗅探器</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            实时提取 TLS SNI 报文特征，将传统代理盲区的裸 IP 请求精准还原为目标域名，彻底解决应用级分流失效与漏油问题。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">多协议引擎统一抽象</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            统一抽象 Shadowsocks、Trojan、VLESS、Hysteria2、TUIC、WireGuard 接口，使不同协议节点可在同一策略组内平滑切换与负载均衡。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">企业级 Rule-Set 规则集</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            支持基于二进制 MRS 格式的预编译规则集解析，规则加载速度提升 5 倍以上，大幅节约低配置路由器与 NAS 的内存开销。
          </p>
        </div>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-purple-600 rounded-full inline-block"></span>
        <span>Mihomo 完美契合的专线品牌</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-purple-600 uppercase tracking-wider">技术极客首选</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全专线与 Mihomo 深度共鸣</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云具备专业的网络工程团队，对 Mihomo 的每一项更新持续进行回归测试，确保新协议和专线节点能够发挥出极致的低延迟与高吞吐优势。
            </p>
          </div>
          <BrandCTA brand={guangsu} />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-purple-600 rounded-full inline-block"></span>
        <span>Mihomo 核心常见疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {mihomoFaqs.map(faq => (
          <details class="group bg-white rounded-xl border border-slate-200 p-5 open:bg-slate-50 transition-colors">
            <summary class="font-semibold text-slate-900 cursor-pointer flex justify-between items-center list-none">
              <span>{faq.q}</span>
              <span class="text-purple-600 group-open:rotate-180 transition-transform duration-200">
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

writePage('clients/mihomo.astro', mihomoContent);

// -------------------------------------------------------------
// 6. clients/sing-box.astro
// -------------------------------------------------------------
const singboxFaqs = [
  {
    q: 'sing-box 为什么被称为“下一代通用网络代理平台”？',
    a: 'sing-box 由 SagerNet 核心团队开发，摒弃了过往工具零散堆砌的包袱，从底层采用高度模块化、纯原生架构设计。它的内存开销极小、编译体积轻巧，同时也是业内首个在单一核心中完整原生支持 Shadowsocks、VMess、VLESS、Trojan、Hysteria2、TUIC、WireGuard 及高性能 TUN 栈的全能利器。'
  },
  {
    q: 'sing-box 与 Clash 体系在配置语法上有什么根本不同？',
    a: 'Clash 体系采用 YAML 格式进行配置，而 sing-box 原生采用严谨的 JSON 结构。sing-box 的入站（inbounds）、出站（outbounds）和路由规则（route.rules）层次极其清晰明确，虽然对初学者手动编写有一定门槛，但在自动化脚本生成与系统级透明网关集成方面极其稳定高效。'
  },
  {
    q: '如何在 iOS 或 Android 上体验 sing-box？',
    a: '官方提供了跨平台的图形客户端。在 iOS 端外区 App Store 可直接下载免费的 sing-box 官方客户端（完全免费且无任何内置广告）；在 Android 端同样可直接安装官方发布的 APK 包，利用图形界面轻松导入配置文件。'
  },
  {
    q: '机场没有提供 sing-box 订阅链接该怎么办？',
    a: '绝大多数现代化机场（如光速云）支持直接下发通用的 Clash 订阅。您可以通过开源在线/离线订阅转换工具（如 Subconverter）将 Clash 订阅一键无损转换为标准的 sing-box JSON 格式。'
  },
  {
    q: 'sing-box 的规则集（rule-set）如何运作？',
    a: 'sing-box 引入了二进制编译的 `.srs` 规则集文件，将原本成千上万行的文本域名列表预先构建为高效的布尔索引树，解析速度相比传统文本正则匹配提升十倍以上，极大降低了手机和低功耗嵌入式路由器的能耗。'
  },
  {
    q: '光速云专线是否适合配合 sing-box 使用？',
    a: '非常适合。光速云专线提供端到端稳定的低延迟物理直连，配合 sing-box 的轻量架构与高效 TUN 模式，能将端到端通信的软件开销降至最低，充分跑满千兆带宽。'
  }
];

const singboxJsonLd = JSON.stringify(makeFaqJsonLd(
  '/clients/sing-box/',
  'sing-box 完全入门与进阶指南 - 下一代通用代理平台实战 | 百科机场',
  '全面详解 sing-box 的底层极简架构优势、JSON配置结构、二进制SRS规则集、全平台客户端使用与机场订阅无损转换。',
  [
    { name: '首页', url: '/' },
    { name: '客户端软件', url: '/clients/' },
    { name: 'sing-box 教程', url: '/clients/sing-box/' }
  ],
  singboxFaqs
));

const singboxContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${singboxJsonLd};
---

<BaseLayout
  title="sing-box 完全入门与进阶指南 - 下一代通用代理平台实战 | 百科机场"
  description="深度解析模块化通用代理平台 sing-box，从架构理念、JSON原生配置规范、SRS规则集编译到多端图形客户端完全上手。"
  canonical="https://jichangwiki.homes/clients/sing-box/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/clients/" class="hover:text-primary-600 transition-colors">客户端软件</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">sing-box 教程</span>
    </nav>

    <header class="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-emerald-900/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-4">
          下一代平台 · 极致性能与简洁
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          sing-box 完全入门与进阶指南：下一代通用网络代理平台
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          sing-box 凭借其高度工程化的架构、极低的内存开销与全协议覆盖，正在重塑网络代理的技术标准。它既是开发者的通用库，也是极客用户的万能瑞士军刀。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-emerald-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>平台选型评测结论</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            如果您追求<strong>极致的内存占用、原生跨平台代码一致性与现代二进制规则分流</strong>，sing-box 是最具未来潜力的前瞻性平台。特别是在内存受限的嵌入式路由设备上，其表现大幅优于传统框架。
          </p>
        </div>
      </div>
    </header>

    <!-- 核心优势 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-emerald-600 rounded-full inline-block"></span>
        <span>sing-box 三大不可替代的架构优势</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">1. 极低资源消耗</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            底层采用精密的 Go 语言内存复用设计，后台常驻内存仅数十兆，彻底避免了由于连接数暴增带来的内存暴涨。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">2. 原生二进制 SRS 规则集</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            规则通过预编译为二进制结构分发，在保证千级规则库精度的同时，匹配速度达到纳秒级，几乎不产生 CPU 开销。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">3. 全平台一致的原生图形客户端</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            覆盖 iOS、macOS、Android、Windows，界面极度清爽纯粹，不含任何广告弹窗，支持一键安装配置。
          </p>
        </div>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-emerald-600 rounded-full inline-block"></span>
        <span>搭配 sing-box 体验极致性能的专线品牌</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider">高素质节点支撑</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全物理专线护航</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              配合 sing-box 的轻量化网络栈，光速云的 IPLC/IEPL 专线能够发挥出最低物理抖动与最高吞吐率，助您实现全天候 4K 零卡顿的极速跨境冲浪。
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
        <span>sing-box 核心疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {singboxFaqs.map(faq => (
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

writePage('clients/sing-box.astro', singboxContent);

console.log('ALL 6 CLIENTS SECONDARY PAGES WRITTEN!');
