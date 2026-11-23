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
// CATEGORY 4: VPN 与加速器 (/vpn/)
// ==========================================

writePage('vpn/index.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';

const title = 'VPN 与网络加速器专区｜技术原理、适用场景与机场差异科普';
const description = '百科机场 VPN 专区：深度区分商业 VPN、Shadowsocks/VLESS 代理协议及游戏网络加速器在底层封装、加解密强度与封锁对抗上的本质差异。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: 'VPN 与加速器', url: '/vpn/' }
];

const subSections = [
  { name: 'VPN 推荐', url: '/vpn/recommend/', desc: '什么时候选 VPN，什么时候选代理机场？', icon: '🛡️' },
  { name: '免费 VPN', url: '/vpn/free/', desc: '免费方案的流量劫持与隐私泄露风险', icon: '⚠️' },
  { name: '手机 VPN', url: '/vpn/mobile/', desc: 'iOS 与安卓系统的后台保活与低耗电方案', icon: '📱' },
  { name: '安卓 VPN', url: '/vpn/android/', desc: 'Android 分应用代理与 VLESS 协议选型', icon: '🤖' },
  { name: '游戏加速器', url: '/vpn/gaming/', desc: '全节点 UDP 转发与游戏电竞专线区别', icon: '🎮' }
];
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-xl">
      <div class="max-w-3xl">
        <span class="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-semibold border border-indigo-400/30">
          一级专题 · VPN 与加速工具科普
        </span>
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 mb-4">
          VPN 与代理机场：技术用途与适用场景界定
        </h1>
        <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
          许多新手将“VPN”、“机场”、“加速器”混为一谈。实际上，传统 VPN（OpenVPN/WireGuard）设计用于点对点企业级内网穿透与加密，特征明显易被阻断；而机场代理采用 VLESS/Trojan 等伪装协议，专为规避流量审查而设计。
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
      {subSections.map((s) => (
        <a href={s.url} class="p-5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-500 hover:shadow-md transition group">
          <div class="text-2xl mb-2 group-hover:scale-110 transition-transform">{s.icon}</div>
          <h2 class="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{s.name}</h2>
          <p class="text-xs text-slate-500 mt-1 line-clamp-2">{s.desc}</p>
        </a>
      ))}
    </div>

    <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm prose prose-slate max-w-none text-sm leading-relaxed mb-8">
      <h2>核心技术对比表：VPN vs 代理机场 vs 游戏加速器</h2>
      <div class="overflow-x-auto not-prose my-6">
        <table class="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
          <thead class="bg-slate-100 text-slate-700 font-bold">
            <tr>
              <th class="p-3">类型</th>
              <th class="p-3">底层工作层次</th>
              <th class="p-3">抗审查特征伪装</th>
              <th class="p-3">分流能力</th>
              <th class="p-3">最适合场景</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-600">
            <tr>
              <td class="p-3 font-bold text-slate-900">传统商业 VPN</td>
              <td class="p-3">网络层 (L3 / TUN)</td>
              <td class="p-3 text-rose-600 font-medium">弱 (协议握手特征极明显)</td>
              <td class="p-3">弱 (通常全局接管)</td>
              <td class="p-3">海外防公共 WiFi 窃听、企业内网访问</td>
            </tr>
            <tr>
              <td class="p-3 font-bold text-slate-900">机场代理 (VLESS/Clash)</td>
              <td class="p-3">应用层/传输层 (L4/L7)</td>
              <td class="p-3 text-emerald-600 font-medium">极强 (伪装成标准 TLS 网页流量)</td>
              <td class="p-3 text-emerald-600 font-medium">极强 (规则分流、国内直连)</td>
              <td class="p-3">跨境科学上网、AI 工具、流媒体追剧</td>
            </tr>
            <tr>
              <td class="p-3 font-bold text-slate-900">游戏加速器</td>
              <td class="p-3">专用 UDP 端口优化</td>
              <td class="p-3">无伪装 (仅优化合规游戏服务器路由)</td>
              <td class="p-3">仅针对特定游戏进程</td>
              <td class="p-3">Steam、主机游戏联机、降低电竞延迟</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// Subpages for VPN
writePage('vpn/recommend.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';

const title = 'VPN 推荐与选购指南｜海外出差、隐私安全与代理机场选型';
const description = '什么时候应该使用传统商业 VPN？什么时候应该选择代理机场？百科机场为您梳理 ExpressVPN/NordVPN 与专业机场代理在穿透能力与流媒体解锁上的客观抉择。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: 'VPN 与加速器', url: '/vpn/' }, { name: 'VPN 推荐', url: '/vpn/recommend/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>VPN 推荐与选购指南：商业 VPN 与代理机场的客观抉择</h1>
    <p>在中国大陆网络环境下，许多用户购买 ExpressVPN、NordVPN 等海外知名商业 VPN 后发现连不上。这是因为这些 VPN 协议并非针对 GFW 设计。如果您核心需求是访问 ChatGPT、YouTube 或日常学术办公，<strong>基于 VLESS/专线架构的机场代理体验远远优于传统海外 VPN</strong>。</p>
    <h2>推荐决策树：</h2>
    <ul>
      <li><strong>在国内访问海外网页与 AI：</strong>首选国内 BGP 中转或 IEPL 专线的代理机场（如光速云、星岛梦）。</li>
      <li><strong>在海外咖啡馆防数据窃听：</strong>使用大厂商业 VPN 进行全盘强加密。</li>
    </ul>
    <div class="not-prose my-6 p-4 bg-blue-50 rounded-xl border border-blue-200 text-xs">
      <a href="/airport/recommend/" class="font-bold text-blue-700 underline">点击查看：更适合大陆网络环境的专线代理机场推荐 &rarr;</a>
    </div>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('vpn/free.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = '免费 VPN 靠谱吗？免费代理背后的隐私与安全陷阱';
const description = '天下没有免费的午餐。百科机场深度拆解免费 VPN 的盈利模式：包含流量分析注入广告、明文数据打包转售以及公网设备被当成肉鸡节点的巨大隐患。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: 'VPN 与加速器', url: '/vpn/' }, { name: '免费 VPN', url: '/vpn/free/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>免费 VPN 深度解析：看似零成本，实则代价高昂</h1>
    <p>运行服务器与跨境带宽具有高昂的物理成本。所谓“完全免费 VPN”，绝大多数通过以下方式变现：</p>
    <ol>
      <li><strong>倒卖用户浏览记录与 IP 轨迹给广告联盟。</strong></li>
      <li><strong>在网页流量中强行插入横幅广告甚至劫持电商返利。</strong></li>
      <li><strong>将用户的终端网络变成商用代理（如 Luminati）的出口肉鸡节点。</strong></li>
    </ol>
    <p>建议预算有限的用户选择单月 5-7 元的平价月付机场，远比使用来源不明的免费 VPN 更安全。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('vpn/mobile.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = '手机 VPN 与移动端代理指南｜iOS 与安卓省电与后台保活';
const description = '手机使用代理掉电快、后台经常被杀？百科机场为您讲解 iOS 系统的 NetworkExtension 机制与安卓电池白名单配置，实现手机全天候稳定代理。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: 'VPN 与加速器', url: '/vpn/' }, { name: '手机 VPN 指南', url: '/vpn/mobile/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>手机端代理优化指南：省电、保活与自动分流</h1>
    <p>手机端使用代理的核心痛点是：耗电剧增以及锁屏后连接中断。</p>
    <h2>核心优化技巧：</h2>
    <ul>
      <li><strong>优先选用轻量协议：</strong>VLESS 协议相比旧版 VMess 协议计算开销降低 40% 以上，显著改善发热与耗电。</li>
      <li><strong>合理配置分流规则：</strong>设置“绕过大陆局域网”，让微信、抖音、淘宝走本地网络，只有被墙域名才走代理。</li>
      <li><strong>锁定后台与电池白名单：</strong>安卓设备务必关闭系统的“智能省电”限制。</li>
    </ul>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('vpn/android.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = '安卓 VPN 客户端推荐与配置｜v2rayNG、FlClash 与分应用代理';
const description = 'Android 平台主流代理软件横评：详细对比 v2rayNG、FlClash、Clash Meta for Android 及 sing-box 客户端，讲解分应用代理配置。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: 'VPN 与加速器', url: '/vpn/' }, { name: '安卓 VPN', url: '/vpn/android/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>安卓平台代理客户端横评与分应用代理实操</h1>
    <p>Android 平台生态开放，可选择的客户端非常丰富。主流推荐：</p>
    <ul>
      <li><strong>v2rayNG：</strong>成熟经典，支持单个节点链接导入，操作最简明。</li>
      <li><strong>FlClash / Clash Meta：</strong>支持强大的 Clash 规则集分流与测速面板。</li>
      <li><strong>Hiddify / Karing：</strong>界面现代友好，跨平台通用。</li>
    </ul>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('vpn/gaming.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = '游戏加速器 vs 机场专线｜跨国游戏联机延迟与 UDP 转发科普';
const description = '为什么用机场打游戏经常丢包连不上？游戏加速器与机场代理在技术上有何不同？深度科普 UDP Fullcone NAT、电竞专线与 TUN 模式的区别。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: 'VPN 与加速器', url: '/vpn/' }, { name: '游戏加速器', url: '/vpn/gaming/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>游戏加速器与机场代理的区别：为什么机场打游戏容易卡？</h1>
    <p>很多用户尝试用 Clash 或小火箭给 Steam、Apex 或外服游戏加速，往往遇到 NAT 严格或频繁断开。这是因为：</p>
    <ol>
      <li><strong>UDP 协议支持差异：</strong>多数网页代理优先优化 TCP，而绝大多数跨国联机游戏强依赖 UDP 协议包。</li>
      <li><strong>NAT 类型限制：</strong>游戏加速器专门配置了 Fullcone NAT 打洞支持，而普通代理服务器通常限制了 UDP 对称型 NAT。</li>
    </ol>
    <p><strong>结论：</strong>打外服电竞联机请认准专业的游戏加速器；看视频查资料首选专线代理机场。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// ==========================================
// CATEGORY 5: 客户端软件 (/clients/)
// ==========================================

writePage('clients/index.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';

const title = '代理客户端软件大全｜2026 跨平台工具下载与配置知识库';
const description = '聚合 2026 最新主流代理客户端：Clash Verge Rev、v2rayN、Shadowrocket 小火箭、sing-box、FlClash、Hiddify 等。覆盖 Windows、macOS、Android、iOS 与软路由。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '客户端软件', url: '/clients/' }
];

const clientItems = [
  { name: 'Clash Verge Rev', path: '/clients/clash-verge/', platform: 'Windows / Mac / Linux', desc: '现代 Mihomo 内核跨平台首选客户端' },
  { name: 'Clash Meta / 内核', path: '/clients/clash-meta/', platform: '跨平台内核生态', desc: 'Mihomo 核心技术文档与配置格式' },
  { name: 'v2rayN', path: '/clients/v2rayn/', platform: 'Windows 桌面', desc: '经典多核心客户端，支持 Xray 与 sing-box' },
  { name: 'Shadowrocket (小火箭)', path: '/clients/shadowrocket/', platform: 'iOS / iPadOS', desc: '苹果生态最普及的强大规则代理工具' },
  { name: 'Mihomo', path: '/clients/mihomo/', platform: '跨平台 GUI / CLI', desc: '高性能分流与策略组管理' },
  { name: 'sing-box', path: '/clients/sing-box/', platform: '全平台通用核心', desc: '新一代高性能轻量代理框架' }
];
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-xl">
      <div class="max-w-3xl">
        <span class="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-200 text-xs font-semibold border border-cyan-400/30">
          一级专题 · 客户端软件大全与版本指南
        </span>
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 mb-4">
          2026 主流代理客户端选型与下载指南
        </h1>
        <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
          机场负责提供高速线路，客户端负责在本地解析流量并进行智能分流。选择一款安全、持续维护的开源客户端是保障网络顺畅的基础。
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {clientItems.map((c) => (
        <a href={c.path} class="p-6 bg-white rounded-2xl border border-slate-200 hover:border-cyan-500 hover:shadow-lg transition group">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-semibold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-md">{c.platform}</span>
            <span class="text-slate-400 group-hover:text-cyan-600 transition">&rarr;</span>
          </div>
          <h2 class="text-lg font-bold text-slate-900 group-hover:text-cyan-600 transition-colors mt-2">{c.name}</h2>
          <p class="text-xs text-slate-500 mt-1 leading-relaxed">{c.desc}</p>
        </a>
      ))}
    </div>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// Subpages for Clients
writePage('clients/clash-verge.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = 'Clash Verge Rev 下载与使用教程｜Mihomo 内核配置与 TUN 模式';
const description = '2026 最受推荐的跨平台客户端 Clash Verge Rev 详细指南：包含 Windows/Mac(Intel/M芯片)/Linux 下载、订阅导入、TUN 虚拟网卡开启及常见报错排查。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '客户端软件', url: '/clients/' }, { name: 'Clash Verge Rev', url: '/clients/clash-verge/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>Clash Verge Rev 核心使用指南与常见问题</h1>
    <p>在原 Clash for Windows 停更后，基于 <strong>Mihomo (Clash.Meta) 内核</strong>的 <strong>Clash Verge Rev</strong> 已成为桌面端主流替代方案。</p>
    <h2>一、版本下载架构注意事项</h2>
    <ul>
      <li><strong>Windows：</strong>普通 64 位电脑下载 <code>x64-setup.exe</code> 安装包。</li>
      <li><strong>macOS：</strong>M1/M2/M3/M4 芯片务必下载 <code>aarch64.dmg</code>；Intel 芯片下载 <code>x64.dmg</code>。下载错误会导致应用闪退或性能损耗。</li>
    </ul>
    <h2>二、核心功能亮点</h2>
    <ol>
      <li><strong>TUN 虚拟网卡模式：</strong>一键接管无法设置代理的终端命令行或游戏流量。</li>
      <li><strong>脚本与配置扩展：</strong>支持对订阅文件进行灵活的代码覆写（Merge/Script）。</li>
    </ol>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('clients/clash-meta.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = 'Clash Meta (Mihomo) 内核生态解析｜高级分流规则与协议特性';
const description = 'Mihomo（原 Clash.Meta）内核全面科普：深入解析其对 VLESS、Reality、Hysteria2 等下一代协议的支持能力，以及与传统 Clash 内核的技术演进。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '客户端软件', url: '/clients/' }, { name: 'Clash Meta / Mihomo', url: '/clients/clash-meta/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>Mihomo (Clash.Meta) 内核生态与演进全解</h1>
    <p>Mihomo 是当前代理开源生态中迭代最积极的通用代理核心之一。它完美继承了 Clash 经典的 YAML 规则结构，并率先原生支持了 VLESS、Trojan、Shadowsocks 等复杂拓扑。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('clients/v2rayn.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = 'v2rayN Windows 客户端使用教程｜多协议支持与订阅导入';
const description = 'Windows 平台上最经典强大的开源客户端 v2rayN：支持 Xray、sing-box 核心，详细讲解节点添加、路由规则设置、系统代理与开机自启动。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '客户端软件', url: '/clients/' }, { name: 'v2rayN', url: '/clients/v2rayn/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>v2rayN Windows 客户端新手与进阶指南</h1>
    <p>v2rayN 凭借小巧轻便、支持协议丰富与自定义路由强大的特点，长期作为 Windows 平台的稳定基石。支持单节点链接快速粘贴与批量节点测速。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('clients/shadowrocket.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = 'Shadowrocket 小火箭配置教程｜美区 App Store 购买与扫码导入';
const description = 'iOS 生态装机必备的 Shadowrocket（小火箭）全面指南：美区 Apple ID 获取方法、订阅扫码添加、场景策略分流与证书安装配置。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '客户端软件', url: '/clients/' }, { name: 'Shadowrocket', url: '/clients/shadowrocket/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>Shadowrocket (小火箭) 完整配置实操指南</h1>
    <p>Shadowrocket 是 iOS 上最流行的代理工具。需要使用非国区（如美区、港区）Apple ID 在 App Store 进行购买安装。支持扫描二维码或粘贴通用订阅链接一键更新。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('clients/mihomo.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = 'Mihomo 跨平台代理工具详解｜GUI 客户端与自动化脚本';
const description = '深度剖析 Mihomo 在各操作系统平台的落地客户端：包括 Mihomo Party、Clash Nyanpasu 及服务模式下的高效内存管理。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '客户端软件', url: '/clients/' }, { name: 'Mihomo', url: '/clients/mihomo/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>Mihomo 跨平台生态与常用前端对比</h1>
    <p>随着内核标准化，围绕 Mihomo 内核诞生了一批优质图形界面客户端，如 Clash Verge Rev、Clash Nyanpasu 和 FlClash，用户可根据自身审美与习惯进行选择。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('clients/sing-box.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = 'sing-box 客户端使用指南｜新一代全功能通用代理平台';
const description = 'sing-box 为什么备受推崇？详解其对全平台原生客户端（SFI/SFA/SFM）的支持、JSON 格式规则编写、极低内存占用与高吞吐性能。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: '客户端软件', url: '/clients/' }, { name: 'sing-box', url: '/clients/sing-box/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>sing-box 新一代代理核心与原生客户端指南</h1>
    <p>sing-box 由 Nekoray/SagerNet 团队打造，采用全新的 JSON 配置体系与极其纯净的底层架构，在内存开销与跨平台原生适配（iOS/Android/macOS）上处于行业前沿。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// ==========================================
// CATEGORY 6: AI 与流媒体 (/streaming-ai/)
// ==========================================

writePage('streaming-ai/index.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AvailabilityMatrix from '../../components/charts/AvailabilityMatrix.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';

const title = 'AI 与流媒体专区｜ChatGPT、Claude、Netflix 全区解锁实测与节点推荐';
const description = '百科机场 AI 与海外流媒体专区：实测主流机场在 ChatGPT/Claude/Gemini 纯净原生 IP 解锁表现，以及 Netflix 奈飞、Disney+、YouTube 4K 流畅体验。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: 'AI与流媒体', url: '/streaming-ai/' }
];

const subSections = [
  { name: 'ChatGPT 节点', url: '/streaming-ai/chatgpt/', desc: '原生 IP 解锁、降级检测与防封禁策略', icon: '🤖' },
  { name: 'Claude 访问', url: '/streaming-ai/claude/', desc: 'Anthropic 严格风控对抗与防封号指南', icon: '🧠' },
  { name: 'Gemini 支持', url: '/streaming-ai/gemini/', desc: 'Google AI 区域限制解除与美西节点优选', icon: '✨' },
  { name: 'Netflix 奈飞', url: '/streaming-ai/netflix/', desc: '非自制剧全区解锁与家宽住宅 IP 判定', icon: '🎬' },
  { name: 'YouTube 4K', url: '/streaming-ai/youtube/', desc: '大带宽秒开、8K 测试与 YouTube 送中解决', icon: '📺' }
];
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-xl">
      <div class="max-w-3xl">
        <span class="px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-semibold border border-purple-400/30">
          一级专题 · AI 生产力与海外视听解锁
        </span>
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 mb-4">
          AI 工具与流媒体解锁：从原生 IP 质量到分流规则
        </h1>
        <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
          能够“打开 Google”并不意味着能顺利使用“ChatGPT”或观看“Netflix 独播剧”。各大平台利用 IP 数据库（如 IPinfo、MaxMind）严格识别数据中心与代理特征。
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
      {subSections.map((s) => (
        <a href={s.url} class="p-5 bg-white rounded-2xl border border-slate-200 hover:border-purple-500 hover:shadow-md transition group">
          <div class="text-2xl mb-2 group-hover:scale-110 transition-transform">{s.icon}</div>
          <h2 class="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors">{s.name}</h2>
          <p class="text-xs text-slate-500 mt-1 line-clamp-2">{s.desc}</p>
        </a>
      ))}
    </div>

    <AvailabilityMatrix 
      brandName="主流综合服务样本"
      capabilities={{
        chatgpt: '部分节点支持 (需特定原生节点)',
        claude: '支持 (Anthropic风控较严)',
        gemini: '部分支持 (需选对出口)',
        netflix: '全区解锁',
        disney: '全区解锁',
        youtube: '4K流畅'
      }}
    />

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

// Subpages for AI/Streaming
writePage('streaming-ai/chatgpt.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = 'ChatGPT 机场节点推荐｜原生 IP 解锁、无降级与防 1020 报错';
const description = '为什么 ChatGPT 经常报 Unable to load site、1020 错误或被静默降级为 GPT-3.5？深度剖析 OpenAI 落地 IP 检测机制与靠谱节点推荐。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: 'AI与流媒体', url: '/streaming-ai/' }, { name: 'ChatGPT 节点指南', url: '/streaming-ai/chatgpt/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>ChatGPT 节点选择与防封号实操指南</h1>
    <p>OpenAI 对请求入口实施多重风控策略：</p>
    <ul>
      <li><strong>Cloudflare Turnstile 验证循环：</strong>多因出口 IP 历史信誉过低，被标记为垃圾爬虫。</li>
      <li><strong>静默降级：</strong>虽然能登录，但生成的回答质量低下，且不显示 GPT-4o 切换选项。</li>
    </ul>
    <p><strong>解决办法：</strong>选择<strong>光速云</strong>、<strong>飞猫云</strong>、<strong>灵动云</strong>等实测具备 OpenAI 纯净落地的专线节点，并固定在香港或新加坡/美西单点登录。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('streaming-ai/claude.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = 'Claude 访问与防封节点推荐｜Anthropic 纯净出口实测';
const description = 'Claude 对 IP 审查最为严苛。百科机场为您解析 Claude 账号被封禁的核心原因、防连坐技巧与高纯净度出口节点配置。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: 'AI与流媒体', url: '/streaming-ai/' }, { name: 'Claude 访问指南', url: '/streaming-ai/claude/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>Claude (Anthropic) 严苛风控对抗与节点选择指南</h1>
    <p>Anthropic 采用全球最激进的风控模型之一。若节点 IP 存在被滥用历史，新注册账号往往在数小时内被冻结。选购节点需确认：</p>
    <ol>
      <li>节点 IP 属于原生原生机房或商用 ISP，无黑名单标记。</li>
      <li>登录过程中不要频繁横跨多个国家（如上一秒香港、下一秒美国）。</li>
    </ol>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('streaming-ai/gemini.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = 'Gemini 区域限制解除与节点优选｜Google AI 不支持地区解决';
const description = '提示“Gemini is not supported in your country”？百科机场为您拆解 Google 账号地区归属判定与美西、日区原生节点选择。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: 'AI与流媒体', url: '/streaming-ai/' }, { name: 'Gemini 节点指南', url: '/streaming-ai/gemini/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>Gemini 地区受限报错解决方法与节点实测</h1>
    <p>Google Gemini 不仅检查当前 IP，还会结合 Google 账号的注册地区和浏览器定位。使用香港节点常会提示不受支持，建议切换至<strong>美国洛杉矶、日本东京或台湾</strong>节点访问。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('streaming-ai/netflix.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = 'Netflix 奈飞全区解锁实测｜如何看非自制剧与原生 IP 判定';
const description = '只能看 Netflix 自制剧（如怪奇物语）？说明当前节点被奈飞判定为代理。百科机场科普如何通过原生解锁节点观看全区独播内容。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: 'AI与流媒体', url: '/streaming-ai/' }, { name: 'Netflix 解锁指南', url: '/streaming-ai/netflix/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>Netflix 奈飞全区解锁与原生 IP 检测原理</h1>
    <p>Netflix 拥有强大的 VPN 检测机制。若 IP 被判定为机房代理，Netflix 不会报错，而是“静默隐藏”版权受限的非自制剧集。选购机场时需认准标有“NF全解锁”或“原生IP”的节点。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

writePage('streaming-ai/youtube.astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
const title = 'YouTube 4K 流畅与“送中”问题解决｜大带宽测速与位置修复';
const description = '为什么明明连着香港节点，YouTube Premium 却失效甚至没有后台播放功能？深度科普 Google“送中”机制与解决教程。';
const breadcrumbs = [{ name: '首页', url: '/' }, { name: 'AI与流媒体', url: '/streaming-ai/' }, { name: 'YouTube 4K指南', url: '/streaming-ai/youtube/' }];
---
<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-slate">
    <h1>YouTube 4K 秒开与“送中”现象彻底排查</h1>
    <p>所谓“送中”，是指 Google 通过用户 GPS 或网络特征将当前节点 IP 判定为“中国大陆地区”，导致 YouTube Premium 会员权益暂时失效、视频出现内嵌广告。遇到此情况可在分流规则中将 Google 搜索与 YouTube 分离，或切换至纯净专线节点。</p>
    <AffiliateDisclosure />
  </div>
</BaseLayout>
`);

console.log('Categories 4, 5, 6 completed.');
