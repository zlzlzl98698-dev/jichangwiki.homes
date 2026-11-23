// scripts/pages_clients.js
// Industrial-grade, encyclopedic content for all 6 Client software pages

export const clientsPages = [
  {
    categoryKey: "clients",
    categoryName: "客户端软件",
    parentHubName: "客户端软件",
    parentHubUrl: "/clients/",
    subSlug: "clash-verge",
    title: "Clash Verge Rev 完整配置指南：新一代跨平台代理客户端实战手册",
    description: "原版 Clash for Windows 停更后最佳替代方案。深度解析 Rust+Tauri 架构轻量化优势、Mihomo 内核支持、TUN 服务模式安装、脚本扩展 Merge 编写与 macOS 权限报错排查。",
    heroBadge: "主流跨平台神器 · PC/Mac 首选",
    h1: "Clash Verge Rev 完全配置指南：新一代跨平台代理客户端",
    subDesc: "原版 Clash for Windows 隐退后，基于 Rust + Tauri 的 Clash Verge Rev 已成为事实上的桌面端旗舰标准。本文带您深入其内核机制、TUN 网卡全局接管与高级脚本分流。",
    answerFirstTitle: "百科核心评测结论 (Verdict)",
    answerFirstText: `<p>Windows 与 macOS 用户强烈建议直接使用 <strong>Clash Verge Rev</strong> 作为主力。其轻量化 Tauri 架构彻底解决了老旧 Electron 客户端开机内存占用 400MB+ 的痛点，原生搭载的 Mihomo 内核全面兼容当下主流机场的所有高级特性与全自动化规则流。</p>`,
    section1Title: "一、 架构技术革新：为什么原版 CFW 停更后必须迁移？",
    section1Content: `<p>2023 年底原版 Clash for Windows (CFW) 停止维护后，市面上涌现了多个衍生分支，其中 <strong>Clash Verge Rev</strong> 凭借卓越的架构升级脱颖而出：</p>
<ul class="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 my-3">
  <li><strong>Rust + Tauri 原生轻量化：</strong> 原版 CFW 基于笨重的 Chromium + Electron 运行时，开机常驻内存动辄 400MB ~ 800MB；Clash Verge Rev 使用系统原生 Webview2 / WebKit 配合 Rust 后端，空载内存仅 <strong>35MB ~ 50MB</strong>，启动速度提升 300%；</li>
  <li><strong>原生集成 Mihomo (Clash Meta) 核心：</strong> 支持 Shadowsocks-2022、VLESS Reality、Hysteria2、TUIC、WireGuard 全套新协议，彻底告别老旧内核协议无法解析的尴尬；</li>
  <li><strong>完善的服务模式 (Service Mode)：</strong> 一键安装本地系统级服务守护，支持开机自启 TUN 虚拟网卡，实现应用软件完全无感透明代理。</li>
</ul>
<p class="text-xs sm:text-sm text-slate-700">
  此外，Clash Verge Rev 拥有极其活跃的开源社区持续演进，修复了历史内核中存在的高危内存溢出与死锁漏洞，是保障现代操作系统网络安全的关键防线。
</p>`,
    section2Title: "二、 核心实操：从安装、内核切换到高级脚本扩展",
    section2Content: `<p>要想发挥 Clash Verge Rev 的最大威力，必须掌握三项核心技能：</p>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
  <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
    <h4 class="font-bold text-slate-900 text-sm mb-1">1. 内核切换机制</h4>
    <p class="text-xs text-slate-600 leading-relaxed">
      在设置中优先确认内核类型为 <strong>Mihomo (Meta)</strong>。若遇到小众协议订阅报错，可在订阅卡片右键选择“转换为 Meta 配置”，利用其内置的高级规则集解析引擎自动修正。
    </p>
  </div>
  <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
    <h4 class="font-bold text-slate-900 text-sm mb-1">2. TUN 虚拟网卡服务模式</h4>
    <p class="text-xs text-slate-600 leading-relaxed">
      在“设置 -> 服务模式”中点击“安装”，安装成功后开启“TUN 模式”，所有终端命令行（Git、PowerShell）、IDE 工具及 Steam/Epic 客户端流量实现全接管。
    </p>
  </div>
  <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
    <h4 class="font-bold text-slate-900 text-sm mb-1">3. 扩展脚本 (Script/Merge)</h4>
    <p class="text-xs text-slate-600 leading-relaxed">
      支持编写 JavaScript 或 YAML 片段追加自定义分流（如为 OpenAI、公司内网强制分配指定节点），订阅更新时自定义规则永不丢失。
    </p>
  </div>
</div>`,
    tableTitle: "主流桌面端代理客户端横向技术指标对比",
    tableSubtitle: "基于 Windows 11 与 macOS Sonoma 平台实测数据统计：",
    tableHeaders: ["客户端名称", "底层架构", "内存空载占用", "协议兼容度", "TUN 全局接管", "推荐指数"],
    tableRows: [
      ["Clash Verge Rev", "Rust + Tauri", "40MB ~ 60MB", "全协议 (SS2022/VLESS/H2)", "一键 Service Mode 原生支持", "★★★★★ (首推旗舰)"],
      ["Clash Nyanpasu", "Rust + Tauri", "50MB ~ 70MB", "全协议支持", "支持", "★★★★☆ (轻量小众)"],
      ["原版 CFW (已停更)", "Electron", "450MB ~ 800MB", "缺失新协议 (无Reality/H2)", "需手动驱动覆盖", "★★☆☆☆ (建议淘汰)"],
      ["v2rayN", "C# / .NET", "80MB ~ 120MB", "全协议支持 (Xray/Sbox)", "需配合 Core TUN", "★★★★☆ (Windows专用)"]
    ],
    decisionTreeTitle: "不同用户平台的客户端选型决策树",
    decisionTreeScenarios: [
      { badge: "Windows 办公", title: "多显示器办公或轻度生产力", desc: "直接安装 Clash Verge Rev x64 安装包，开启开机自启和最小化托盘，占用忽略不计。" },
      { badge: "macOS M系列", title: "苹果 Apple Silicon 用户", desc: "务必下载 aarch64.dmg 架构包，原生支持 M1-M4 芯片指令集，功耗极低。" },
      { badge: "开发者与玩家", title: "依赖 Git 推拉代码与外服游戏联机", desc: "务必安装 Service Mode 并开启 TUN 虚拟网卡，彻底免除在终端单独配置 http_proxy 环境变量的烦恼。" }
    ],
    decisionRulesTitle: "Clash Verge Rev 五大黄金使用守则：",
    decisionRules: [
      "认准官方 GitHub 仓库（clash-verge-rev/clash-verge-rev/releases），切勿在第三方伪造网站下载；",
      "macOS 启动若提示损坏，在终端执行 sudo xattr -rd com.apple.quarantine /Applications/Clash\\ Verge.app 即可解开限制；",
      "日常使用务必将代理模式保持在“规则 (Rule)”，避免选“全局”导致微信淘宝卡顿；",
      "建议在设置中开启“自动更新 Geo 数据库”，确保国内分流 IP 库时刻保持最新；",
      "若遇到连不上网络，在设置中先关闭系统代理和 TUN 模式再重新开启即可快速重置。"
    ],
    brandShowcaseTitle: "Clash Verge Rev 原生完美适配专线服务商",
    faqTitle: "Clash Verge Rev 常见疑难答疑 (FAQ)",
    faqs: [
      { q: "原版 CFW 停更后，为什么 Clash Verge Rev 是目前最佳替代者？", a: "CFW 已于 2023 年底彻底停止维护，其内核陈旧且存在未修复的安全隐患。Clash Verge Rev 采用 Rust + Tauri 框架重构，内存占用显著低于 Electron，且默认集成最新的开源 Mihomo (Clash Meta) 核心，完美支持 Shadowsocks-2022、VLESS、Reality 等新协议，是 Windows 与 macOS 上当下最主流、维护最活跃的客户端。" },
      { q: "Clash Verge Rev 的“TUN 模式”如何开启？有什么用？", a: "在设置中安装“服务模式（Service Mode）”后，开启“TUN 模式”。TUN 会接管整个操作系统的虚拟网卡流量，无需在浏览器或各个独立软件（如 Git、Telegram、Steam、Discord）中逐一配置代理端口，实现全局系统级透明分流。" },
      { q: "Clash Verge Rev 导入订阅后报 yaml: unmarshal errors 怎么解决？", a: "通常是因为机场返回的订阅内容不规范或使用了旧版不兼容的语法。在订阅设置中将“内核切换”确保为“Mihomo/Meta”，或者右键订阅选择“配置转换”。若仍报错，可在机场后台复制“Clash 订阅格式”而不是 V2Ray 订阅。" },
      { q: "如何在 Clash Verge Rev 中配置多机场主备容灾？", a: "通过其内置的“扩展脚本 (Script)”或 Merge 功能，新建一个规则合并项，将主机场（如光速云）与备用机场的节点混合为一个 fallback 自动健康检查策略组，主力专线故障时自动秒切备用。" },
      { q: "光速云等专线机场能否在 Clash Verge Rev 中一键导入？", a: "完全支持。在光速云后台点击“便捷导入”->“导入到 Clash”，系统会自动唤醒 Clash Verge Rev 并下载最新优化的分流节点列表。" }
    ],
    relatedArticlesTitle: "本客户端关联的三级深度实操长文推荐",
    relatedArticles: [
      { tag: "实操手册", title: "Clash Verge Rev 完整图文教程：从安装配置到 TUN 全局模式全攻略", desc: "手把手从零带您上手 Clash Verge Rev，详解内核配置与脚本分流实操。", url: "/articles/article-49/" },
      { tag: "技术原理", title: "Fake-IP 原理解析：它是如何消除本地 DNS 往返延迟实现秒开的？", desc: "剖析 198.18.0.0/16 虚拟保留池，理解客户端秒开网页背后的网络原理。", url: "/articles/article-61/" },
      { tag: "排障修复", title: "退出代理后电脑微信、百度打不开？一键清理注册表代理残留脚本", desc: "客户端异常退出导致系统断网？教您使用批处理命令一键修复 Windows 代理设置。", url: "/articles/article-70/" },
      { tag: "容灾架构", title: "生产力断网零容忍：主备双机场冷热自动容灾架构手把手搭建", desc: "在客户端中手把手配置主备双订阅 fallback 自动健康检查策略组。", url: "/articles/article-99/" }
    ]
  },
  {
    categoryKey: "clients",
    categoryName: "客户端软件",
    parentHubName: "客户端软件",
    parentHubUrl: "/clients/",
    subSlug: "clash-meta",
    title: "Clash Meta (Mihomo) 内核完全解析：下一代高级代理技术核心指南",
    description: "深入解读开源代理内核 Mihomo (原名 Clash.Meta)。全面支持 Shadowsocks-2022、VLESS Reality、Hysteria2、TUIC 协议与规则集 Rule-Providers 动态扩展。",
    heroBadge: "开源内核之王 · Mihomo 核心技术",
    h1: "Clash Meta (Mihomo) 内核完全解析与高级进阶",
    subDesc: "原版 Clash Premium 闭源内核停更后，社区主导的 Mihomo (Meta) 成为事实上的开源代理引擎标准。本文带您全面解析其协议创新与高级规则体系。",
    answerFirstTitle: "Mihomo 内核核心评价 (Verdict)",
    answerFirstText: `<p><strong>Mihomo（前身 Clash.Meta）是目前全球开源社区维护度最高、协议支持最全、性能最强悍的通用代理内核</strong>。无论您使用的是 Clash Verge Rev、FlClash、还是路由器上的 OpenClash，其底层数据引擎均来自于 Mihomo。它彻底终结了原版闭源内核停更的混乱时代，全面普及了 VLESS Reality、Hysteria 2 以及前沿 QUIC/UDP 协议，是现代科学上网的技术引擎之王。</p>`,
    section1Title: "一、 Mihomo 内核在抗封锁技术层面的三大革命性突破",
    section1Content: `<p>Mihomo 内核是由开源社区全球开发者在继承原版 Clash 架构基础上，经过彻底重构而生的新一代网络通信引擎。相较于早期的 Clash 内核，它实现了三大技术飞跃：</p>
<ul class="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 my-3">
  <li><strong>全协议生态无缝覆盖：</strong> 原生支持 Shadowsocks-2022（基于 blake3 密钥推导的防重放协议）、Xray 体系的 VLESS Reality（基于真实知名网站公钥伪装）、以及基于 UDP QUIC 的暴力多路复用协议 Hysteria 2 与 TUIC v5。面对 GFW 的深度包检测（DPI），Mihomo 能提供最丰富的伪装拟态手段；</li>
  <li><strong>动态规则集提供者（Rule-Providers）：</strong> 支持直接在配置中引用远程 GitHub 或 CDN 维护的规则集文件（如 GeoIP/GeoSite 数据库），客户端按需在后台静默增量更新，彻底告别旧版配置硬编码数万行规则导致启动卡死的尴尬；</li>
  <li><strong>自研高性能 TCP/UDP 内存重用池：</strong> 重构了高并发连接下的 Buffer 内存复用机制，在大文件千兆满速下载或多任务 BT 并发时，内存抖动降低 60%，杜绝内核内存泄漏崩盘。</li>
</ul>`,
    section2Title: "二、 核心高级配置进阶：Fake-IP 与 Sniffer 域名嗅探实战",
    section2Content: `<p>在编写或修改 Mihomo 配置文件时，掌握以下两大高级特性可将性能拉满：</p>
<div class="space-y-3 my-4">
  <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700">
    <span class="font-bold text-slate-900 block mb-1">1. enhanced-mode: fake-ip 零延迟模式</span>
    在 <code>dns</code> 模块中启用 Fake-IP，内核在本地立即分配 <code>198.18.0.0/16</code> 保留网段的虚拟 IP，实现 0ms 本地瞬时响应，彻底消灭跨洋 DNS 解析造成的 200ms+ 等待延迟。
  </div>
  <div class="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs sm:text-sm text-blue-950">
    <span class="font-bold text-blue-950 block mb-1">2. sniffer 域名嗅探器（解决纯 IP 无法分流痛点）</span>
    启用 <code>sniffer.enable: true</code>，内核会自动解析出 TLS Client Hello 握手包中的 SNI 域名，即使用户请求的是纯 IP 地址，内核也能准确识别出真实目标域名并匹配对应的分流策略组。
  </div>
</div>`,
    tableTitle: "Mihomo (Meta) vs 原版 Clash Premium 闭源内核技术对比表",
    tableSubtitle: "内核代际演进关键参数对照：",
    tableHeaders: ["核心能力维度", "Mihomo (Meta) 现代开源内核", "原版 Clash Premium (已停更)"],
    tableRows: [
      ["开源状态与维护", "100% 开源，社区每周高频更新", "闭源，2023年已彻底停止维护"],
      ["Shadowsocks-2022", "完全原生支持 (SS2022-16/32)", "完全不支持"],
      ["VLESS Reality 协议", "原生支持 (主流抗封锁标准)", "完全不支持"],
      ["Hysteria 2 / TUIC", "完美支持，抗弱网丢包极佳", "完全不支持"],
      ["Rule-Providers 规则集", "支持动态远程流式解析", "仅支持粗糙的旧版规则"],
      ["内存占用与稳定性", "自研内存池，极度稳定", "长周期运行易内存溢出"]
    ],
    decisionTreeTitle: "Mihomo 部署场景适配",
    decisionTreeScenarios: [
      { badge: "桌面 PC/Mac", title: "个人电脑日常图形化使用", desc: "首选基于最新 Mihomo 编译的 Clash Verge Rev，兼顾易用与强大性能。" },
      { badge: "软路由网关", title: "OpenWrt / 路由器全局透明分流", desc: "安装 OpenClash 并切换为 Meta 内核，实现全屋智能家居与主机游戏无感透明代理。" }
    ],
    decisionRulesTitle: "Mihomo 进阶配置三定律：",
    decisionRules: [
      "永远开启 dns.enhanced-mode: fake-ip 消除跨洋 DNS 往返延迟；",
      "在 tun 配置中务必指定 stack: mixed 确保吞吐与兼容性最高；",
      "使用 rule-providers 引用优质开源规则库，切勿硬编码数万行规则。"
    ],
    brandShowcaseTitle: "全面拥抱 Mihomo 高级特性的专线品牌",
    faqTitle: "Clash Meta / Mihomo 常见疑问 (FAQ)",
    faqs: [
      { q: "Mihomo 和 Clash.Meta 到底是什么关系？", a: "Mihomo 就是原先的 Clash.Meta。2023 年项目团队为了体现全新的开源独立演进更名为 Mihomo（水母），项目代码一脉相承，完全兼容原有配置。" },
      { q: "从原版 CFW 的配置迁移到 Mihomo 需要修改语法吗？", a: "Mihomo 100% 向下兼容原版 Clash 语法，旧配置可以直接运行，同时额外支持更多新协议与规则集参数。" }
    ],
    relatedArticlesTitle: "本内核关联的三级深度实操长文推荐",
    relatedArticles: [
      { tag: "协议解析", title: "Fake-IP 原理解析：它是如何消除本地 DNS 往返延迟实现秒开的？", desc: "深度解剖 Mihomo 核心 DNS Fake-IP 虚拟池拦截机制。", url: "/articles/article-61/" },
      { tag: "实操教程", title: "Clash Verge Rev 完整图文教程：从安装配置到 TUN 全局模式全攻略", desc: "了解如何使用图形化工具操控 Mihomo 内核全部功能。", url: "/articles/article-49/" }
    ]
  },
  {
    categoryKey: "clients",
    categoryName: "客户端软件",
    parentHubName: "客户端软件",
    parentHubUrl: "/clients/",
    subSlug: "v2rayn",
    title: "v2rayN 电脑版完全配置教程：Windows 经典多协议代理神器全攻略",
    description: "全面解读 Windows 平台经典代理客户端 v2rayN。支持 Xray、Sing-box 双核心切换、一键订阅导入、快捷键呼出、系统代理分流与证书排障。",
    heroBadge: "Windows 经典神器 · 功能集大成者",
    h1: "v2rayN 电脑版完全配置教程与高级排障",
    subDesc: "历经数年迭代，v2rayN 凭借直观的节点列表展示、双核心自由切换和极高的自定义权限，成为无数 Windows 资深极客的首选利器。",
    answerFirstTitle: "v2rayN 选型评测结论 (Verdict)",
    answerFirstText: `<p>如果您使用的是 Windows 操作系统，且习惯了<strong>一目了然的高密度平铺节点明细列表、对多核心（Xray-core / Sing-box core）底层参数有精细化调校需求，v2rayN 是最透明、最可靠、扩展性最强的经典神器</strong>。它纯绿色免安装、占用极小，完美支持全协议，是 Windows 技术极客的必备底座。</p>`,
    section1Title: "一、 v2rayN 的核心优势与底层双核心驱动架构",
    section1Content: `<p>在 Windows 代理软件生态中，v2rayN 始终保持着旺盛的生命力，其核心竞争力体现在两大硬核特性上：</p>
<ul class="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 my-3">
  <li><strong>Xray-core 与 Sing-box 自由双核驱动：</strong> v2rayN 本质上是一个成熟强大的图形化前端（GUI），它允许用户在设置中一键自由切换底层的运行时核心。无论是 Xray 独占的 XTLS / Reality 特性，还是 Sing-box 的高性能轻量网络栈，用户均可自由选择；</li>
  <li><strong>高密度紧凑型节点列表：</strong> 与现代卡片式软件不同，v2rayN 采用经典的表格视图，直接展示每个节点的协议、别名、服务器地址、端口、传输协议、真连接延迟与测试结果，按 <code>Ctrl+A</code> 全选后按 <code>Ctrl+O</code> 即可几秒内完成全部节点实测；</li>
  <li><strong>纯绿色便携免安装：</strong> 整个软件直接解压到非系统盘文件夹即可运行，所有配置保存在本地 <code>guiConfigs</code> 目录，随 U 盘即插即用。</li>
</ul>`,
    section2Title: "二、 v2rayN 极速入门上手与防断网实操指引",
    section2Content: `<p>使用 v2rayN 时，必须掌握以下规范化操作以避免断网：</p>
<ol class="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-700 my-3">
  <li><strong>添加订阅与批量测速：</strong> 点击顶部菜单<strong>“订阅分组”</strong> -> <strong>“订阅分组设置”</strong> -> 点击“添加”，在可选地址栏粘贴机场提供的 V2Ray/Clash 订阅链接，保存后点击顶部菜单<strong>“订阅分组 -> 更新全部订阅(不通过代理)”</strong>；</li>
  <li><strong>模式选择黄金设置：</strong> 观察软件底部状态栏，务必将<strong>“系统代理”选为“自动配置系统代理”</strong>；将<strong>“路由”务必选为“绕过大陆 (绕过大陆及局域网)”</strong>，切勿选择“全局”，否则国内应用会严重卡顿；</li>
  <li><strong>规范退出避免网络死锁：</strong> 关机或不用代理时，<strong>必须在任务栏右下角蓝色托盘图标右键选择“退出”</strong>，软件会自动复原 Windows 注册表代理设置。如果直接强制关机，可能导致开机后“微信能上但网页打不开”。</li>
</ol>`,
    tableTitle: "v2rayN vs Clash Verge Rev 对比选型表",
    tableSubtitle: "Windows 平台两大主流工具横向对比：",
    tableHeaders: ["评估维度", "v2rayN", "Clash Verge Rev"],
    tableRows: [
      ["界面交互风格", "传统 Windows 紧凑列表 (极客风)", "现代卡片式仪表盘 (简约美观)"],
      ["核心支持", "Xray / Sing-box 多核心自由切", "固定 Mihomo (Meta) 内核"],
      ["跨平台支持", "仅限 Windows 系统", "支持 Windows / macOS / Linux 全平台"],
      ["批量测速便捷度", "极快 (支持快捷键一键全测)", "良好 (策略组分类测速)"],
      ["推荐用户群", "资深极客、Windows 原生爱好者", "大众主流用户、双平台办公用户"]
    ],
    decisionTreeTitle: "v2rayN 常见场景适配",
    decisionTreeScenarios: [
      { badge: "深度测速", title: "对比所有节点真实延迟与真连接速率", desc: "按 Ctrl+A 全选节点按 Ctrl+O 进行批量测试，极度高效。" }
    ],
    decisionRulesTitle: "v2rayN 安全使用准则：",
    decisionRules: [
      "关机前右键托盘图标选择退出，防止注册表代理残留导致断网；",
      "遇到节点测速全 -1 时核查电脑系统时间是否精准同步；",
      "路由模式务必保持“绕过大陆”，保障国内网站直连。"
    ],
    brandShowcaseTitle: "v2rayN 原生深度兼容的优质专线品牌",
    faqTitle: "v2rayN 常见疑难答疑 (FAQ)",
    faqs: [
      { q: "v2rayN 测速显示 -1 或连接超时怎么排查？", a: "首先检查电脑系统时间是否与网络时间精准同步（偏差超 90 秒协议会自动拦截）；其次检查本地杀毒软件（如 360/火绒）是否拦截了 xray.exe 的网络通信权限。" },
      { q: "v2rayN 退出后网页打不开怎么解决？", a: "这是因为注册表代理键值残留。进入 Windows 设置 -> 网络和 Internet -> 代理，将“手动设置代理”彻底关闭即可瞬间恢复。" }
    ],
    relatedArticlesTitle: "本客户端关联的三级深度实操长文推荐",
    relatedArticles: [
      { tag: "排障修复", title: "节点测速全红全超时？电脑系统时间同步与防重放机制急救排查", desc: "解决 v2rayN 节点全部显示 -1 的终极急救方案。", url: "/articles/article-67/" },
      { tag: "排障修复", title: "退出代理后电脑微信、百度打不开？一键清理注册表代理残留脚本", desc: "v2rayN 异常崩溃导致断网的一键修复命令。", url: "/articles/article-70/" }
    ]
  },
  {
    categoryKey: "clients",
    categoryName: "客户端软件",
    parentHubName: "客户端软件",
    parentHubUrl: "/clients/",
    subSlug: "shadowrocket",
    title: "Shadowrocket 小火箭 iOS 终极指南：美区 ID 获取与按需连接配置",
    description: "全面解读 iOS/iPadOS 平台常青树 Shadowrocket（小火箭）。从正规美区 Apple ID 获取、一键扫码导入、规则集分流配置到按需连接（On Demand）全天候自动节电黑科技。",
    heroBadge: "iOS 生态霸主 · 小火箭实战手册",
    h1: "Shadowrocket 小火箭 iOS 终极指南与高阶技巧",
    subDesc: "在苹果生态中，小火箭凭借无可匹敌的协议兼容性与极佳的电量控制稳坐第一宝座。本文教您正规获取与全天候无感使用的全套秘笈。",
    answerFirstTitle: "Shadowrocket 核心速查结论 (Verdict)",
    answerFirstText: `<p><strong>Shadowrocket（俗称小火箭）是所有 iPhone 与 iPad 用户科学上网的不二之选</strong>。它完美兼容所有主流协议与订阅格式，且对 iOS 系统的电量优化极佳。配合其内置的<strong>按需连接（On Demand）</strong>功能，能够实现“出门用流量自动连代理、回家连 Wi-Fi 自动断开”，全天候无感运行且彻底杜绝后台发热耗电。</p>`,
    section1Title: "一、 正规美区 Apple ID 获取与防被锁机避坑警示",
    section1Content: `<p>由于国内 App Store 的监管政策，Shadowrocket 仅在海外区域（如美区、日区、港区）的 App Store 上架。新手在获取过程中必须严防安全陷阱：</p>
<div class="bg-rose-50 border border-rose-200 rounded-xl p-4 my-3 text-xs sm:text-sm text-rose-950">
  <span class="font-bold">⚠️ 生死警告：绝对不要在系统“设置”中登录公开账号！</span>
  部分电商平台或贴吧售卖的共享 Apple ID，一旦您误在 iPhone 的【系统设置】（iCloud）中登录，不法分子会立刻在云端远程锁定您的手机开启“丢失模式”，勒索巨额赎金！<strong>正规操作：仅且只能在【App Store】商店右上方点击头像登录切换账号！</strong>
</div>
<p class="text-xs sm:text-sm text-slate-700">
  <strong>最推荐的正规方案：</strong> 使用正规国内双币信用卡或在苹果官网购买正规的美区礼品卡（Apple Gift Card），自行注册属于自己的终身美区 ID，安全可靠永不翻车。
</p>`,
    section2Title: "二、 按需连接 (On Demand) 黑科技：iPhone 全天候无感续航",
    section2Content: `<p>很多 iPhone 用户日常使用代理最大的痛点就是：出门连了 Wi-Fi 忘记开代理，回家连了家里网络又忘记关，导致电池发热严重、掉电如流水。Shadowrocket 内置的<strong>按需连接（On Demand）</strong>功能彻底解决了这一难题：</p>
<div class="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2 text-xs sm:text-sm text-slate-700">
  <p><strong>实操配置：</strong> 进入小火箭“设置 -> 按需连接”，开启总开关：</p>
  <ul class="list-disc pl-5 space-y-1 text-xs">
    <li><strong>蜂窝网络连接：</strong> 开启（当使用 4G/5G 数据流量时自动拉起代理）；</li>
    <li><strong>指定 Wi-Fi 白名单直连：</strong> 在 Wi-Fi 规则中添加自己家里的无线网络名称（SSID），设置为“Disconnect (断开)”。回到家自动休眠 VPN，彻底杜绝后台多余耗电！</li>
  </ul>
</div>`,
    tableTitle: "iOS 平台主流网络代理客户端横向对比表",
    tableSubtitle: "Shadowrocket、Quantumult X、Stash、Loon 四大神器横评：",
    tableHeaders: ["客户端名称", "上手难度", "协议兼容度", "规则丰富度", "推荐评级"],
    tableRows: [
      ["Shadowrocket (小火箭)", "★☆☆☆☆ (极度友好)", "全协议完全覆盖 (最强)", "极高 (支持远程规则集)", "★★★★★ (大众首选王座)"],
      ["Stash (Clash for iOS)", "★★☆☆☆ (良好)", "支持 Clash Meta 协议", "极高 (兼容 Clash 配置)", "★★★★☆ (Clash重度党首选)"],
      ["Quantumult X (圈X)", "★★★★☆ (较复杂)", "主流协议覆盖良好", "极高 (强大脚本/重写)", "★★★★☆ (极客首选)"],
      ["Loon", "★★★☆☆ (中等)", "支持新协议良好", "优秀 (插件生态活跃)", "★★★★☆ (高颜值利器)"]
    ],
    decisionTreeTitle: "iOS 选型决策树",
    decisionTreeScenarios: [
      { badge: "新手与日常主力", title: "iPhone/iPad 日常翻墙与追剧", desc: "毫不犹豫首选 Shadowrocket，一键导入光速云订阅，稳定省电无折腾。" }
    ],
    decisionRulesTitle: "小火箭使用五大黄金法则：",
    decisionRules: [
      "仅在 App Store 商店内切换美区账号，严禁登录设置 iCloud；",
      "全局路由保持在“配置 (Config)”模式，勿选代理全局；",
      "定期在“配置”中点击更新规则集，确保国内直连名单最新；",
      "开启“按需连接”享受自动化断连与智能节电。"
    ],
    brandShowcaseTitle: "Shadowrocket 原生完美适配专线服务商",
    faqTitle: "Shadowrocket 常见问题解答 (FAQ)",
    faqs: [
      { q: "小火箭售价多少？购买后可以几台设备使用？", a: "Shadowrocket 在美区 App Store 售价为 2.99 美元。购买一次后，只要登录同一个 Apple ID，可以在您个人的所有 iPhone、iPad 乃至搭载 M 芯片的 Mac 电脑上免费无限次下载。" }
    ],
    relatedArticlesTitle: "iOS 进阶技术指南",
    relatedArticles: [
      { tag: "深度实操", title: "Shadowrocket 小火箭 iOS 终极指南：美区 ID 获取与按需连接配置", desc: "图文手把手玩转小火箭全部高级功能。", url: "/articles/article-51/" }
    ]
  },
  {
    categoryKey: "clients",
    categoryName: "客户端软件",
    parentHubName: "客户端软件",
    parentHubUrl: "/clients/",
    subSlug: "mihomo",
    title: "Mihomo 跨平台通用代理核心技术文档：架构原理与高级分流指南",
    description: "全面解读开源项目 Mihomo（原名 Clash.Meta）。深挖其核心路由调度、Fake-IP 虚拟池机制、分流规则集 Rule-Providers 及在全平台客户端中的最佳实践。",
    heroBadge: "下一代通用核心 · Mihomo 深度文档",
    h1: "Mihomo 跨平台通用代理核心技术文档与配置规范",
    subDesc: "作为现代科学上网工具背后的统一技术引擎，Mihomo 彻底改写了代理内核的发展历史。本文深入剖析其内部时序与进阶配置规则。",
    answerFirstTitle: "Mihomo 核心速查结论 (Verdict)",
    answerFirstText: `<p><strong>Mihomo 是当前技术实力最强、协议创新最快、跨平台适配最广的开源代理网络核心</strong>。它不仅承载了 Clash Verge Rev、FlClash、OpenClash 等所有顶级客户端的运行生命线，更通过 <strong>Fake-IP 0ms 响应、Sniffer 域名嗅探与 Rule-Providers 动态规则流</strong> 彻底重构了网络代理的体验基准。选择支持 Mihomo 特性的服务商（如光速云）是保障长期稳定通畅的关键。</p>`,
    section1Title: "一、 Mihomo 的数据处理流水线（Pipeline）工作时序剖析",
    section1Content: `<p>当一个网络数据包进入 Mihomo 内核时，它经历了一套严谨且极度优化的流水线调度：</p>
<ul class="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 my-3">
  <li><strong>1. 流量接入与透明拦截：</strong> 通过本地 SOCKS5/HTTP 混合端口、系统代理、或 TUN 虚拟网卡（基于 gVisor 或 System 原生网络栈）捕获操作系统的所有网络数据；</li>
  <li><strong>2. DNS 抢先解析与 Fake-IP 映射：</strong> 若启用 Fake-IP 模式，内核在 0 毫秒内从本地 <code>198.18.0.0/16</code> 网段返回一个伪造的虚拟 IP，并在内存中建立 <code>域名 <-> 假IP</code> 的哈希双向映射表；</li>
  <li><strong>3. 深度协议嗅探（Sniffing）：</strong> 分析初始握手包（TLS Client Hello / HTTP Host），提取目标真实域名；</li>
  <li><strong>4. 智能规则路由分流（Routing Engine）：</strong> 按照配置中声明的规则优先级（PROCESS-NAME -> DOMAIN -> GEOIP -> MATCH），将流量导向“直连 (DIRECT)”、“拦截 (REJECT)”或指定的专线策略组；</li>
  <li><strong>5. 出站加密与物理跨境：</strong> 将请求封装为指定协议（SS2022 / Reality / Trojan），通过光速云等物理 IEPL 专线直达境外目标网络。</li>
</ul>`,
    section2Title: "二、 打造高可用自动容灾策略组配置模板",
    section2Content: `<p>借助 Mihomo 强大的 <code>fallback</code> 健康检查机制，您可以手把手搭建一条自动倒换的高可用线路：</p>
<div class="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto my-3">
  <pre><code>proxy-groups:
  - name: "🚀 主力容灾自动切换"
    type: fallback
    url: 'http://cp.cloudflare.com/generate_204'
    interval: 30
    timeout: 2500
    proxies:
      - "光速云-香港IEPL专线01"   # 主用首选
      - "备用机场-日本BGP中转01"   # 备用容灾</code></pre>
</div>
<p class="text-xs sm:text-sm text-slate-700">
  内核每 30 秒执行一次网络探活。一旦主力节点发生突发中断，内核在 2.5 秒内自动无感切换至备用节点，用户端毫无察觉。
</p>`,
    tableTitle: "Mihomo 内核三大 DNS 模式深度对照表",
    tableSubtitle: "Fake-IP、Redir-Host 与标准 DNS 模式性能对比：",
    tableHeaders: ["DNS 运行模式", "响应延迟", "本地 DNS 污染免疫度", "复杂网络兼容性", "推荐指数"],
    tableRows: [
      ["Fake-IP 增强模式", "0ms (本地瞬间响应)", "100% 绝对免疫", "优秀 (需维护白名单)", "★★★★★ (主流默认首选)"],
      ["Redir-Host 模式", "150ms ~ 300ms (跨洋等待)", "需配合 DoH 防污染", "天然兼容", "★★★☆☆ (仅兼容老设备)"],
      ["普通直连 DNS", "30ms", "0% (易受本地运营商污染)", "极差", "★☆☆☆☆ (淘汰)"]
    ],
    decisionTreeTitle: "Mihomo 进阶选型场景",
    decisionTreeScenarios: [
      { badge: "极客与开发者", title: "需要最纯粹的内核调度能力", desc: "搭配使用 Clash Verge Rev，深度定制 Merge 脚本与自定义分流规则。" }
    ],
    decisionRulesTitle: "Mihomo 运行守则：",
    decisionRules: [
      "定期更新本地 GeoIP 与 GeoSite 数据库；",
      "在 TUN 配置中优先选择 mixed 栈兼顾游戏与高并发；",
      "维护好 fake-ip-filter 白名单保障局域网打印机与私有 IP 通畅。"
    ],
    brandShowcaseTitle: "全面深度支持 Mihomo 的专线品牌",
    faqTitle: "Mihomo 常见问题 (FAQ)",
    faqs: [
      { q: "Mihomo 内核会自动在后台更新吗？", a: "在 Clash Verge Rev 等现代客户端中，软件设置里提供了“更新内核”按钮，点击即可一键下载官方 GitHub 最新编译版二进制文件进行替换。" }
    ],
    relatedArticlesTitle: "核心关联技术手册",
    relatedArticles: [
      { tag: "DNS深度", title: "Fake-IP 原理解析：它是如何消除本地 DNS 往返延迟实现秒开的？", desc: "全面理解 0ms 秒开背后的核心机制。", url: "/articles/article-61/" },
      { tag: "容灾搭建", title: "生产力断网零容忍：主备双机场冷热自动容灾架构手把手搭建", desc: "fallback 策略组完整实操。", url: "/articles/article-99/" }
    ]
  },
  {
    categoryKey: "clients",
    categoryName: "客户端软件",
    parentHubName: "客户端软件",
    parentHubUrl: "/clients/",
    subSlug: "sing-box",
    title: "sing-box 通用代理平台完全指南：新一代全能通用代理核心从入门到精通",
    description: "全面剖析新一代跨平台代理神器 sing-box。基于纯 Go 语言从零编写，支持极其纯净的 JSON 配置体系、原生 TUN 网卡路由栈、全协议覆盖及在 iOS/Android/PC 上的实战技巧。",
    heroBadge: "全能新生态 · sing-box 通用引擎",
    h1: "sing-box 通用代理平台完全指南：下一代全能引擎",
    subDesc: "以轻盈、纯粹与极致性能著称的 sing-box，正在迅速重构整个代理客户端生态。本文带您深入其 JSON 架构模型，掌握新一代网络工具的驾驭之道。",
    answerFirstTitle: "sing-box 核心评价结论 (Verdict)",
    answerFirstText: `<p><strong>sing-box 是目前代理技术界最具极客气质与纯粹性能的下一代通用代理平台</strong>。由 SagerNet 团队完全使用纯 Go 语言从零开发，摒弃了传统工具的历史代码包袱。它不仅拥有全网最快最轻的原生 TUN 虚拟网卡栈，更采用结构严密的 <strong>JSON 配置规范</strong>，在 iOS、Android、Windows、macOS 与 Linux 上提供了一致且极具确定性的顶级体验。</p>`,
    section1Title: "一、 为什么说 sing-box 是“下一代代理平台”？三大核心技术突破",
    section1Content: `<p>相较于传统代理客户端，sing-box 展现了令人惊叹的现代工程设计水准：</p>
<ul class="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 my-3">
  <li><strong>1. 纯 Go 原生高性能 TUN 网卡栈：</strong> sing-box 自研了与 Linux/Windows/macOS 底层网络栈深度绑定的 TUN 模块，CPU 占用与内存消耗比传统方案降低 40% 以上，千兆吞吐时不发热不降速；</li>
  <li><strong>2. 结构严密的模块化 JSON 配置：</strong> 彻底淘汰了 YAML 中缩进敏感与容易因空格报错的缺陷，所有 <code>inbounds</code>、<code>outbounds</code>、<code>route</code>、<code>dns</code> 模块结构分明，具备严格的类型校验；</li>
  <li><strong>3. 全协议第一天原生支持：</strong> 包括 Shadowsocks-2022、VLESS、VMess、Trojan、Hysteria、Hysteria 2、TUIC、WireGuard、ShadowTLS，所有协议均在官方内核代码中统一维护，不存在协议拼凑与依赖冲突。</li>
</ul>`,
    section2Title: "二、 sing-box 在多平台的客户端形态与极速上手",
    section2Content: `<p>目前 sing-box 在各主流平台均已推出了官方图形化客户端：</p>
<div class="space-y-3 my-4">
  <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700">
    <span class="font-bold text-slate-900 block mb-1">iOS 平台（苹果 App Store）：</span>
    在美区搜索 <code>sing-box</code>，官方客户端完全免费下载！原生基于 Network.framework 构建，支持一键导入订阅，耗电量极低。
  </div>
  <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-950">
    <span class="font-bold text-emerald-950 block mb-1">Android 平台（Google Play / GitHub）：</span>
    界面采用 Material You 现代设计语言，原生集成系统 VpnService，无缝支持按应用单独分流。
  </div>
  <div class="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs sm:text-sm text-blue-950">
    <span class="font-bold text-blue-950 block mb-1">桌面端（Windows / macOS）：</span>
    除了官方 GUI 外，主流的 v2rayN 与各大第三方多协议客户端均已支持内置 sing-box 核心作为默认驱动。
  </div>
</div>`,
    tableTitle: "sing-box vs Clash 体系核心技术差异全方位对比",
    tableSubtitle: "两大现代代理阵营架构横评：",
    tableHeaders: ["技术维度", "sing-box 体系", "Clash (Mihomo) 体系"],
    tableRows: [
      ["配置文件格式", "严格结构化 JSON 格式 (类型安全)", "标准 YAML 格式 (对缩进敏感)"],
      ["TUN 虚拟网卡性能", "极高 (自研原生网络栈，极省电)", "优秀 (依赖 gVisor/Mixed 栈)"],
      ["协议更新速度", "极快 (新协议首发适配地)", "极快 (社区快速跟进)"],
      ["移动端官方免费 App", "支持 (iOS/Android 官方完全免费)", "无统一官方 App (由衍生工具主导)"],
      ["生态成熟度与开箱即用", "快速爆发期 (极客与高阶首选)", "极度成熟 (主流商业机场标配)"]
    ],
    decisionTreeTitle: "sing-box 用户选型指南",
    decisionTreeScenarios: [
      { badge: "极客极简党", title: "追求纯粹、低功耗与最新协议", desc: "在手机与电脑上配置 sing-box，享受无任何广告与冗余代码的极致纯粹感。" }
    ],
    decisionRulesTitle: "sing-box 进阶法则：",
    decisionRules: [
      "编写 JSON 配置时建议使用 VS Code 配合官方 JSON Schema 语法插件；",
      "移动端开启按应用分流，国内应用直接排查在 VPN 之外提升速度；",
      "订阅导入优先使用机场提供的专有 sing-box 格式。"
    ],
    brandShowcaseTitle: "原生支持 sing-box 订阅的代表服务商",
    faqTitle: "sing-box 常见疑问解答 (FAQ)",
    faqs: [
      { q: "sing-box 能够直接读取 Clash 的 YAML 订阅链接吗？", a: "不能直接读取。因为两者的语法模型完全不同（JSON vs YAML）。您可以使用机场后台专门提供的“导入到 sing-box”链接，或者使用 Sub-Store 等订阅转换工具将 Clash 配置一键转换为 sing-box 格式。" }
    ],
    relatedArticlesTitle: "核心关联技术手册",
    relatedArticles: [
      { tag: "协议原理", title: "Fake-IP 原理解析：它是如何消除本地 DNS 往返延迟实现秒开的？", desc: "sing-box 中 Fake-IP 最佳实践。", url: "/articles/article-61/" },
      { tag: "专线体验", title: "IEPL 国际以太网专线物理层拓扑大揭秘：二层物理光缆是如何过境的？", desc: "为 sing-box 注入低延迟骨干网络动力。", url: "/articles/article-82/" }
    ]
  }
];
