import fs from 'fs';
import path from 'path';

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

// ==========================================
// CATEGORY 7: 线路与节点 (/network/)
// ==========================================

writePage('network/index.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';

const title = '线路与节点技术专区｜IEPL、IPLC 专线原理与跨国路由拓扑';
const description = '百科机场网络线路专区：深度科普 IEPL/IPLC 物理内网专线、BGP 入口多线调度、香港/日本亚太出口延迟特征及流量倍率陷阱。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '线路与节点', url: '/network/' }
];

const subSections = [
  { name: 'IEPL 专线', url: '/network/iepl/', desc: '国际以太网私有专线技术与抗封锁原理', icon: '⚡' },
  { name: 'IPLC 专线', url: '/network/iplc/', desc: '点对点物理租用线路与 IEPL 本质区别', icon: '🔗' },
  { name: '香港节点', url: '/network/hong-kong/', desc: '亚太超低延迟（20-40ms）出口网络特性', icon: '🇭🇰' },
  { name: '日本节点', url: '/network/japan/', desc: '大带宽流媒体追剧与抗抖动优选', icon: '🇯🇵' },
  { name: '低延迟优化', url: '/network/low-latency/', desc: '跨境路由跳数优化与网络抖动排查', icon: '📉' },
  { name: '流量倍率', url: '/network/traffic-ratio/', desc: '警惕 3x-10x 高倍率暗扣流量套路', icon: '🔢' }
];
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-xl">
      <div class="max-w-3xl">
        <span class="px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold border border-blue-400/30">
          一级专题 · 网络骨干与节点可观测性
        </span>
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 mb-4">
          网络线路与节点全景：看懂专线与公网的核心差异
        </h1>
        <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
          机场商家的线路宣传往往充满“IEPL”、“IPLC”、“BGP”等专有名词。本专题剥离营销包装，从物理光纤、路由器跳数、QoS 策略与出境通道，让您看懂真实的网络质量。
        </p>
      </div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-12">
      {subSections.map((s) => (
        <a href={s.url} class="p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition group text-center">
          <div class="text-2xl mb-1 group-hover:scale-110 transition-transform">{s.icon}</div>
          <h2 class="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{s.name}</h2>
          <p class="text-[11px] text-slate-500 mt-1 line-clamp-2">{s.desc}</p>
        </a>
      ))}
    </div>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// Subpages for Network
writePage('network/iepl.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = 'IEPL 专线是什么意思？IEPL 专线机场技术原理与优势解析';
const description = 'IEPL（International Ethernet Private Line）国际以太网专线详解：如何做到不过 GFW、晚高峰 0% 丢包？与普通公网隧道中转的体验差异。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '线路与节点', url: '/network/' }, { name: 'IEPL 专线科普', url: '/network/iepl/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>IEPL 专线深度解析：为什么高端机场都标配 IEPL？</h1>
    <p>IEPL（International Ethernet Private Line）是指<strong>跨国以太网私有专线</strong>。在物理层面上，运营商通过海底光缆或跨境陆缆为客户划分出专用的虚拟以太网信道。</p>
    <h2>IEPL 专线的两大杀手锏：</h2>
    <ol>
      <li><strong>完全不经过公网 GFW：</strong>流量由国内中转点进入专线后直达境外机房，不与普通公众宽带争抢出境带宽。</li>
      <li><strong>晚高峰极低延迟与 0 丢包：</strong>由于专线享有最高 QoS 优先级，即使在晚 8 点到 11 点，也能保持稳定低延迟。</li>
    </ol>
    <div class="not-prose my-6 p-4 bg-blue-50 rounded-xl border border-blue-200 text-xs">
      <a href="/brands/guangsu/" class="font-bold text-blue-700 underline">查看采用企业级 IEPL 专线的代表品牌：光速云详情 &rarr;</a>
    </div>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('network/iplc.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = 'IPLC 与 IEPL 专线的区别｜哪种专线机场更好？';
const description = 'IPLC（International Private Leased Circuit）与 IEPL 有什么区别？百科机场为您拆解点对点物理电路与以太网二层电路在延迟、成本与稳定性上的异同。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '线路与节点', url: '/network/' }, { name: 'IPLC 专线对比', url: '/network/iplc/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>IPLC vs IEPL：两大高端专线对比科普</h1>
    <p><strong>IPLC</strong> 是传统的国际私有租用线路（基于 SDH/SONET 物理点对点），成本极其昂贵；<strong>IEPL</strong> 是其现代以太网演进版本。对于最终用户而言，两者的使用体验极其接近，核心都在于<strong>内网不过墙、低抖动</strong>。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('network/hong-kong.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = '香港节点优缺点剖析｜20-40ms 极低延迟与流媒体限制';
const description = '香港节点是国内用户最常连接的出口。百科机场分析香港专线节点超低延迟优势，以及 ChatGPT/Gemini 对香港 IP 的限制与解决策略。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '线路与节点', url: '/network/' }, { name: '香港节点分析', url: '/network/hong-kong/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>香港节点全景分析：物理距离最近，但需注意 AI 限制</h1>
    <p>香港节点凭借地理优势，广东沿海连接延迟仅 15-25ms，北方连接也在 45ms 以内，是<strong>网页秒开与日常刷网页的首选</strong>。但由于部分 AI 工具（如 Gemini）不向香港地区开放，需要配合日美节点分流。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('network/japan.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = '日本节点网络优势｜流媒体全解锁与跨境大带宽首选';
const description = '日本东京/大阪节点特性解析：延迟通常在 50-70ms 之间，出口带宽充裕，是 Netflix 日区全解锁与各大主流 AI 工具的黄金中间点。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '线路与节点', url: '/network/' }, { name: '日本节点分析', url: '/network/japan/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>日本节点特性解析：流媒体追剧与 AI 的平衡之选</h1>
    <p>日本拥有亚洲最成熟的数据中心互联网交换中心（JPIX/BBIX）。相比香港节点，日本节点对各大 AI 工具（ChatGPT/Claude/Gemini）均能提供原生支持，且延迟通常在 60ms 左右，极具实用价值。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('network/low-latency.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = '低延迟网络优化指南｜如何降低代理延迟与网络抖动';
const description = '测速延迟 20ms 但打开网页却很慢？深度科普代理客户端握手延迟、TCP 握手时间与真实网页加载速度的区别。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '线路与节点', url: '/network/' }, { name: '低延迟优化', url: '/network/low-latency/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>降低代理延迟与抖动的五大关键配置</h1>
    <p>在客户端中看到的“节点延迟”，通常只是客户端与代理入口之间的 TCP Ping，并不代表完整端到端的网页响应速度。开启本地 DNS 缓存并选用多线 BGP 入口能大幅提升感知速度。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('network/traffic-ratio.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = '流量倍率套路揭秘｜1x 与 5x 倍率如何暗中扣减你的流量';
const description = '看了一个视频流量扣了 5 倍？深度揭秘机场节点倍率陷阱：如何看懂 0.5x、1x、3x 倍率，识别商家虚高流量宣传。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '线路与节点', url: '/network/' }, { name: '流量倍率揭秘', url: '/network/traffic-ratio/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>流量倍率套路拆解：警惕高倍率节点的隐形扣费</h1>
    <p>部分不良机场宣称“月给 1000G”，但其好用的专线节点倍率全标为 3x 或 5x。这意味着实际消耗 1GB 流量，后台直接扣除 5GB 额度。选购时应优先选择<strong>全节点 1x 真实倍率或明确标示倍率</strong>的规范品牌。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// ==========================================
// CATEGORY 8: 使用教程 (/tutorials/)
// ==========================================

writePage('tutorials/index.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';

const title = '代理使用教程与配置指南｜从订阅导入到高级分流全流程';
const description = '百科机场教程专区：提供图文清晰的操作指南，覆盖订阅链接导入、Clash 规则分流、TUN 虚拟网卡模式及常见客户端安装。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '使用教程', url: '/tutorials/' }
];

const subSections = [
  { name: '订阅导入指南', url: '/tutorials/subscription/', desc: '通用订阅一键导入 Clash/小火箭详细步骤', icon: '📥' },
  { name: 'Clash 配置详解', url: '/tutorials/clash-configuration/', desc: '策略组修改、节点选择与外部配置扩展', icon: '⚙️' },
  { name: '分流规则设置', url: '/tutorials/routing-rules/', desc: '国内直连、海外代理与黑白名单精细分流', icon: '🔀' },
  { name: 'TUN 虚拟网卡', url: '/tutorials/tun-mode/', desc: '接管命令行、开发工具与全局网络流量', icon: '🛡️' },
  { name: '客户端安装', url: '/tutorials/client-installation/', desc: '全平台软件安装与系统权限授权指引', icon: '💻' }
];
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-xl">
      <div class="max-w-3xl">
        <span class="px-3 py-1 rounded-full bg-teal-500/20 text-teal-200 text-xs font-semibold border border-teal-400/30">
          一级专题 · 新手与进阶实操指引
        </span>
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 mb-4">
          代理客户端使用教程：从零上手到精细分流
        </h1>
        <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
          不堆砌晦涩代码，以标准化步骤、环境说明及避坑要点为核心。无论您使用 Windows、Mac 还是 iPhone，都能按照指引在 3 分钟内完成配置并顺利上网。
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
      {subSections.map((s) => (
        <a href={s.url} class="p-5 bg-white rounded-2xl border border-slate-200 hover:border-teal-500 hover:shadow-md transition group">
          <div class="text-2xl mb-2 group-hover:scale-110 transition-transform">{s.icon}</div>
          <h2 class="text-base font-bold text-slate-900 group-hover:text-teal-600 transition-colors">{s.name}</h2>
          <p class="text-xs text-slate-500 mt-1 line-clamp-2">{s.desc}</p>
        </a>
      ))}
    </div>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// Subpages for Tutorials
writePage('tutorials/subscription.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = '机场订阅链接导入通用指南｜一键导入与 Subconverter 转换';
const description = '新手必读：如何在 Clash Verge Rev、v2rayN 和 Shadowrocket 中导入机场订阅链接？订阅格式不匹配时如何安全转换。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '使用教程', url: '/tutorials/' }, { name: '订阅导入指南', url: '/tutorials/subscription/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>机场订阅导入通用步骤（Clash / 小火箭 / v2rayN）</h1>
    <ol>
      <li>登录机场用户中心，复制专属 <strong>Clash 订阅链接</strong> 或 <strong>通用订阅链接</strong>。</li>
      <li>打开客户端，进入“订阅/配置”界面，粘贴链接并点击“下载/更新”。</li>
      <li>在代理列表选择延迟低的绿色节点（如香港 IEPL），开启“系统代理”即可。</li>
    </ol>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('tutorials/clash-configuration.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = 'Clash 配置文件自定义教程｜策略组设置与节点自动测速选优';
const description = '详解 Clash 的 YAML 配置文件结构：Proxy Group 策略组、URL-Test 自动测速切换以及自定义规则的添加与维护。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '使用教程', url: '/tutorials/' }, { name: 'Clash 配置详解', url: '/tutorials/clash-configuration/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>Clash 配置文件深度定制：掌握策略组与自动优选</h1>
    <p>通过在 Clash 中配置 <code>url-test</code> 策略组，可以让客户端每隔一段时间对组内节点发起健康检查，并自动切换至当前延迟最低的节点，避免手动切点的繁琐。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('tutorials/routing-rules.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = '分流规则设置指南｜ACL4SSR、国内直连与海外代理分离';
const description = '为什么连了代理访问百度变慢了？如何设置智能分流让大陆网站直连、海外网站走代理？全面科普 ACL4SSR 规则集。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '使用教程', url: '/tutorials/' }, { name: '分流规则设置', url: '/tutorials/routing-rules/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>智能分流规则设置：实现国内直连与海外代理无缝并存</h1>
    <p>智能分流的核心原理是根据目标 IP 的 GeoIP 数据库与域名后缀（如 .cn）进行判定。国内服务直连保证了微信和网银的本地速度与账号安全；海外受限网站自动分流走专线节点。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('tutorials/tun-mode.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = 'TUN 虚拟网卡模式详解｜接管终端命令行与全系统网络流量';
const description = 'Git 报错连不上？终端无法走代理？深度解析 TUN 虚拟网卡模式与传统系统代理的区别，教你一键开启真正全局代理。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '使用教程', url: '/tutorials/' }, { name: 'TUN 模式详解', url: '/tutorials/tun-mode/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>TUN 虚拟网卡模式：解决开发工具与游戏不走代理的终极方案</h1>
    <p>普通“系统代理”仅在 HTTP/HTTPS 端口级别对浏览器生效，很多命令行工具（如 curl、git、docker）或游戏会直接绕过系统代理。开启 <strong>TUN 模式</strong> 会在系统中创建虚拟网卡，从操作系统网络驱动层接管全部数据包。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('tutorials/client-installation.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = '客户端安装全平台指引｜Windows/Mac/iOS/安卓安全下载安装';
const description = '手把手教您在不同设备上安全安装代理客户端：避开山寨被篡改安装包，正确授予网络权限与安装必备证书。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '使用教程', url: '/tutorials/' }, { name: '客户端安装指引', url: '/tutorials/client-installation/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>全平台客户端安全下载与安装授权全流程</h1>
    <p>切勿在非官方网盘或未核实的软件站下载所谓的“破解版客户端”。认准 GitHub 官方发布页或正规应用商店。Mac 用户首次安装需在“安全性与隐私”中点击“仍要打开”。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// ==========================================
// CATEGORY 9: 故障排查 (/troubleshooting/)
// ==========================================

writePage('troubleshooting/index.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';

const title = '网络故障排查与自愈专区｜Timeout、403 与连不上解决手册';
const description = '百科机场故障排查中心：提供标准排障诊断树，精准定位节点超时 Timeout、订阅更新失败 403、连上无网及 DNS 污染等高频异常。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '故障排查', url: '/troubleshooting/' }
];

const subSections = [
  { name: '连接超时 (Timeout)', url: '/troubleshooting/timeout/', desc: '节点全部红字 Timeout 超时五步自愈法', icon: '⏱️' },
  { name: '订阅更新失败', url: '/troubleshooting/subscription-failed/', desc: '更新订阅报 403 / Network Error 诊断', icon: '❌' },
  { name: '连上节点但无网络', url: '/troubleshooting/connection-failed/', desc: '节点正常但网页打不开排障实操', icon: '🔌' },
  { name: 'DNS 污染与错误', url: '/troubleshooting/dns-error/', desc: 'DNS 泄漏、DNS 劫持与本地解析修复', icon: '🌐' },
  { name: '客户端打不开闪退', url: '/troubleshooting/client-startup/', desc: '7890 端口冲突、权限不足与内核闪退', icon: '💥' }
];
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-xl">
      <div class="max-w-3xl">
        <span class="px-3 py-1 rounded-full bg-rose-500/20 text-rose-200 text-xs font-semibold border border-rose-400/30">
          一级专题 · 代理故障自诊断中心
        </span>
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 mb-4">
          网络故障排查手册：按症状排障，拒绝盲目重装
        </h1>
        <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
          连不上网时，不要慌张。绝大多数问题都出在<strong>系统时间不同步、端口被其他软件占用、DNS 污染或订阅链接过期</strong>。对照以下手册逐步排查即可秒级自愈。
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
      {subSections.map((s) => (
        <a href={s.url} class="p-5 bg-white rounded-2xl border border-slate-200 hover:border-rose-500 hover:shadow-md transition group">
          <div class="text-2xl mb-2 group-hover:scale-110 transition-transform">{s.icon}</div>
          <h2 class="text-base font-bold text-slate-900 group-hover:text-rose-600 transition-colors">{s.name}</h2>
          <p class="text-xs text-slate-500 mt-1 line-clamp-2">{s.desc}</p>
        </a>
      ))}
    </div>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// Subpages for Troubleshooting
writePage('troubleshooting/timeout.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = 'Clash/小火箭节点全部 Timeout 超时怎么办？五步秒级修复法';
const description = '测速全部标红 Timeout 超时？90% 用户都是系统时间偏差导致。百科机场为您总结节点超时的五大自查自愈步骤。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '故障排查', url: '/troubleshooting/' }, { name: '连接超时排查', url: '/troubleshooting/timeout/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>节点全部超时 (Timeout) 五步秒级排障自愈法</h1>
    <ol>
      <li><strong>检查电脑/手机系统时间：</strong>这是最常见的诱因！VLESS/VMess 加密协议要求客户端与服务器时间误差不能超过 60 秒。进入系统设置点击“立即同步时间”。</li>
      <li><strong>检查套餐是否到期或流量用尽：</strong>登录机场后台确认账号状态。</li>
      <li><strong>更新订阅链接：</strong>节点服务器 IP 可能发生例行更换，点击“更新订阅”。</li>
      <li><strong>切换代理模式：</strong>从 Rule（规则模式）切换至 Global（全局）排除分流规则干扰。</li>
      <li><strong>重启代理核心：</strong>关闭软件并结束后台残留进程后重新启动。</li>
    </ol>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('troubleshooting/subscription-failed.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = '机场订阅更新失败报 403 / Network Error 解决方法';
const description = '更新订阅提示 403 Forbidden、Network Error 或解析失败？深度分析订阅域名被封、证书错误及转换接口异常修复。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '故障排查', url: '/troubleshooting/' }, { name: '订阅失败排查', url: '/troubleshooting/subscription-failed/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>订阅更新失败 (403 / Network Error) 解决手册</h1>
    <p>订阅更新失败通常由以下原因引起：</p>
    <ul>
      <li><strong>订阅域名被墙：</strong>开启现有的全局代理或开启热点再点击更新。</li>
      <li><strong>账号欠费停机：</strong>服务商返回 403 拒绝访问，需检查套餐有效期。</li>
      <li><strong>短链接解析异常：</strong>部分托管转换平台临时抽风，建议直接使用机场后台原生的直出订阅。</li>
    </ul>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('troubleshooting/connection-failed.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = '连上节点但打不开网页排查｜国内软件能用但海外网站无法访问';
const description = '客户端显示延迟正常，但浏览器无论海外还是国内网站都打不开？详解系统代理未生效与浏览器插件劫持排障。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '故障排查', url: '/troubleshooting/' }, { name: '连上无网排查', url: '/troubleshooting/connection-failed/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>连上节点但无法上网？三大核心诱因排查</h1>
    <ol>
      <li><strong>系统代理开关未打开：</strong>确保 Clash 界面中的“System Proxy”已高亮开启。</li>
      <li><strong>浏览器扩展插件干扰：</strong>某些 Chrome 插件（如 SwitchyOmega）可能强制接管了代理设置，将其关闭或设为“使用系统代理”。</li>
      <li><strong>防火墙阻拦核心进程：</strong>Windows Defender 弹窗时点击了拒绝，需在防火墙白名单中放行 mihomo.exe / xray.exe。</li>
    </ol>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('troubleshooting/dns-error.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = 'DNS 污染与解析错误排查｜DNS 泄漏检测与 DoH 安全配置';
const description = '为什么访问 Google 提示隐私连接错误或 DNS 解析失败？科普 GFW 的 DNS 投毒污染原理及如何配置加密 DNS (DoH/DoT)。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '故障排查', url: '/troubleshooting/' }, { name: 'DNS 错误排查', url: '/troubleshooting/dns-error/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>DNS 污染与解析错误排查与加密 DNS 配置</h1>
    <p>DNS 污染是指网络运营商的递归 DNS 服务器返回了错误的虚假海外 IP 地址。解决之道是在客户端中开启 <strong>Fake-IP 模式</strong> 或配置 <strong>DNS over HTTPS (DoH)</strong>（如 1.1.1.1 或 8.8.8.8），杜绝明文 UDP 53 端口查询。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('troubleshooting/client-startup.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = '客户端闪退与打不开修复｜7890 端口冲突与权限修复指南';
const description = '双击客户端无反应、报错 Port 7890 already in use？百科机场教您如何在命令行释放被占用的端口并修复服务模式。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '故障排查', url: '/troubleshooting/' }, { name: '客户端打不开修复', url: '/troubleshooting/client-startup/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>客户端闪退与 7890 端口冲突彻底解决步骤</h1>
    <p>常见原因是之前的客户端异常关闭，导致后台内核还在占用 7890 端口。打开任务管理器，强制结束所有名为 <code>clash-verge.exe</code>、<code>mihomo.exe</code> 或 <code>xray.exe</code> 的后台进程，或在软件设置中将混合端口改为 7895 即可正常启动。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// ==========================================
// CATEGORY 10: 风险与替代 (/risk/)
// ==========================================

writePage('risk/index.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';

const title = '风险防范与平替专区｜机场跑路预警、避坑防骗与维权指南';
const description = '百科机场安全风控专区：客观辨识机场服务停运与临时故障、拆解年付割韭菜陷阱、指导售后维权并提供可靠的双机场平替冗余方案。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '风险与替代', url: '/risk/' }
];

const subSections = [
  { name: '服务停运与失联', url: '/risk/shutdown/', desc: '跑路预警信号与临时节点故障的理性区分', icon: '🚨' },
  { name: '机场避坑指南', url: '/risk/avoid-scams/', desc: '极度夸大宣传、虚假承诺与低价割韭菜防范', icon: '🕳️' },
  { name: '替代备选方案', url: '/risk/alternatives/', desc: '构建双机场容灾备份与平滑迁移工作流', icon: '🔄' },
  { name: '退款与售后规则', url: '/risk/refunds/', desc: '工单维权时效、虚拟商品退款争议处理', icon: '📜' },
  { name: '安全与隐私防范', url: '/risk/security/', desc: '防范中间人劫持、密码撞库与流量日志审计', icon: '🔒' }
];
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-xl">
      <div class="max-w-3xl">
        <span class="px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 text-xs font-semibold border border-amber-400/30">
          一级专题 · 安全风控与避坑备选
        </span>
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 mb-4">
          机场风险防范与备选体系：理性质疑，科学容灾
        </h1>
        <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
          不应仅凭单一节点短暂失联就轻断“跑路”，也不应轻信任何商家所谓的“百年老店、绝不跑路”承诺。建立风险防范意识与备用灾备线路才是保障网络业务连续性的唯一正解。
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
      {subSections.map((s) => (
        <a href={s.url} class="p-5 bg-white rounded-2xl border border-slate-200 hover:border-amber-500 hover:shadow-md transition group">
          <div class="text-2xl mb-2 group-hover:scale-110 transition-transform">{s.icon}</div>
          <h2 class="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{s.name}</h2>
          <p class="text-xs text-slate-500 mt-1 line-clamp-2">{s.desc}</p>
        </a>
      ))}
    </div>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// Subpages for Risk
writePage('risk/shutdown.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = '如何判断机场跑路还是临时故障？跑路前兆与止损方法';
const description = '节点连不上了就是跑路吗？百科机场教您科学区分上游机房故障维护与真正的跑路前兆（如超大折扣吸金、TG群禁言）。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '风险与替代', url: '/risk/' }, { name: '服务停运与预警', url: '/risk/shutdown/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>理性区分：机场临时故障与真正跑路前兆</h1>
    <h2>真正的跑路前兆包括：</h2>
    <ul>
      <li>突然推出极低价格的三年付/永久超级大甩卖。</li>
      <li>官方 Telegram 频道与交流群突然开启全员永久禁言。</li>
      <li>工单系统连续多日无人回复且官网主域名解析被删除。</li>
    </ul>
    <p>若只是部分节点超时且官方正在发公告修复，多属上游断纤或清洗，切勿轻信未经证实的网络谣言。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('risk/avoid-scams.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = '机场避坑防骗指南｜五大常见代理智商税与虚假宣传';
const description = '“千兆不限速、100%永久解锁、永不被墙”？拆解代理行业的五大夸大营销谎言，教您做聪明的理性消费者。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '风险与替代', url: '/risk/' }, { name: '机场避坑指南', url: '/risk/avoid-scams/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>代理行业五大常见避坑防雷指南</h1>
    <ol>
      <li><strong>避免盲目购买超长周期年付：</strong>哪怕再便宜，新品牌只买月付。</li>
      <li><strong>警惕“永久不限流量”谎言：</strong>跨境带宽物理成本每月客观存在，过度的永久版常为短期圈钱。</li>
      <li><strong>小心隐藏倍率套路：</strong>结账前务必核对节点列表中的真实倍率。</li>
    </ol>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('risk/alternatives.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = '备用机场选择指南｜主力宕机时的紧急逃生通道配置';
const description = '关键工作不能断网！百科机场教您如何花最少的成本（如配置按量付费或不限时套餐），搭建高可靠性的备选逃生路线。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '风险与替代', url: '/risk/' }, { name: '替代备选方案', url: '/risk/alternatives/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>搭建备用逃生通道：双机场冗余配置实战</h1>
    <p>建议常备两个不同架构的机场：主力使用<strong>光速云等 IEPL 专线机场</strong>保证高体验；备用准备一个<strong>不限时套餐（如星岛梦、Firefly不限时）</strong>平时不扣月租，主力波动时直接在客户端切点。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('risk/refunds.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = '机场退款与售后规则科普｜虚拟商品服务争议与工单规范';
const description = '买了机场发现不能用可以退款吗？深度解析各机场退款政策通用惯例，指导如何提交专业工单快速解决问题。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '风险与替代', url: '/risk/' }, { name: '退款与售后规则', url: '/risk/refunds/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>代理行业退款与售后维权通用规则</h1>
    <p>网络代理属于数字虚拟商品，绝大多数商家在服务条款（TOS）中明确标注“特价商品或已使用流量不支持无理由退款”。若遇到连不上，应第一时间在工单中附带客户端日志及本地网络运营商说明。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('risk/security.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = '代理网络安全与隐私防范｜流量是否会被机场主窃听？';
const description = '使用代理访问银行或聊天安全吗？科普 HTTPS 端到端加密机制、机场日志审计与如何防止中间人劫持。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '风险与替代', url: '/risk/' }, { name: '安全与隐私防范', url: '/risk/security/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>代理安全与隐私：机场主能看到我的上网密码吗？</h1>
    <p>现代互联网绝大多数网页均采用 <strong>HTTPS (TLS) 端到端加密</strong>。机场服务器作为中间代理，只能看到你访问的目标服务器域名和 IP（如你正在访问 google.com），<strong>根本无法解密你的账号密码或传输正文</strong>。只要不随意在设备上信任来路不明的自签名根证书，数据便是安全的。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

console.log('Categories 7, 8, 9, 10 completed.');
