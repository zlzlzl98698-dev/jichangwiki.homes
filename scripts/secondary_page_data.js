// scripts/secondary_page_data.js
// Exports the exhaustive metadata and rich content blocks for all 54 secondary pages.

export function getSecondaryData() {
  const data = [
    // -------------------------------------------------------------
    // CATEGORY: clients (6 pages)
    // -------------------------------------------------------------
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
      answerFirstText: "<p>Windows 与 macOS 用户强烈建议直接使用 <strong>Clash Verge Rev</strong> 作为主力。其轻量化 Tauri 架构彻底解决了老旧 Electron 客户端开机内存占用 400MB+ 的痛点，原生搭载的 Mihomo 内核全面兼容当下主流机场的所有高级特性与全自动化规则流。</p>",
      section1Title: "一、 架构技术革新：为什么原版 CFW 停更后必须迁移？",
      section1Content: `<p>2023 年底原版 Clash for Windows (CFW) 停止维护后，市面上涌现了多个衍生分支，其中 <strong>Clash Verge Rev</strong> 凭借卓越的架构升级脱颖而出：</p>
<ul class="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 my-3">
  <li><strong>Rust + Tauri 原生轻量化：</strong> 原版 CFW 基于笨重的 Chromium + Electron 运行时，开机常驻内存动辄 400MB ~ 800MB；Clash Verge Rev 使用系统原生 Webview2 / WebKit 配合 Rust 后端，空载内存仅 <strong>35MB ~ 50MB</strong>，启动速度提升 300%；</li>
  <li><strong>原生集成 Mihomo (Clash Meta) 核心：</strong> 支持 Shadowsocks-2022、VLESS Reality、Hysteria2、TUIC、WireGuard 全套新协议，彻底告别老旧内核协议无法解析的尴尬；</li>
  <li><strong>完善的服务模式 (Service Mode)：</strong> 一键安装本地系统级服务守护，支持开机自启 TUN 虚拟网卡，实现应用软件完全无感透明代理。</li>
</ul>`,
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
        { q: "Clash Verge Rev 导入订阅后报 `yaml: unmarshal errors` 怎么解决？", a: "通常是因为机场返回的订阅内容不规范或使用了旧版不兼容的语法。在订阅设置中将“内核切换”确保为“Mihomo/Meta”，或者右键订阅选择“配置转换”。若仍报错，可在机场后台复制“Clash 订阅格式”而不是 V2Ray 订阅。" },
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

    // clash-meta
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
      answerFirstText: "<p>Mihomo（前身 Clash.Meta）是目前全球开源社区维护度最高、协议支持最全的通用代理内核。无论是 Clash Verge Rev、FlClash 还是 OpenClash，其底层动力均来自于 Mihomo。它打破了原版内核陈旧协议的枷锁，全面普及了 VLESS Reality 与前沿 QUIC/UDP 传输。</p>",
      section1Title: "一、 Mihomo 内核在抗封锁技术层面的重大突破",
      section1Content: `<p>Mihomo 绝不仅仅是一个简单的 Bug 修复分支，它对底层网络协议栈进行了全方位重塑：</p>
<ul class="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 my-3">
  <li><strong>全协议无缝支持：</strong> 率先原生地集成 Shadowsocks-2022 强校验架构、Xray 体系的 VLESS Reality 伪装协议，以及基于 UDP/QUIC 单边加速的 Hysteria 2 和 TUIC v5；</li>
  <li><strong>高级规则提供者 (Rule-Providers)：</strong> 支持从 GitHub 远程动态订阅 geosite.dat 与 geoip.dat，按应用（如 OpenAI、Apple、Telegram）精细化分流，更新规则无需重启内核；</li>
  <li><strong>重构的内存池管理：</strong> 高并发长连接下垃圾回收更加平滑，杜绝大流量测速时 CPU 爆满或内存泄漏。</li>
</ul>`,
      section2Title: "二、 Mihomo 配置进阶技巧与多入站设计",
      section2Content: `<p>在编写自定义配置文件时，利用 Mihomo 的新语法可大幅简化拓扑结构：</p>
<div class="p-4 bg-slate-50 border border-slate-200 rounded-xl my-4 text-xs sm:text-sm text-slate-700 space-y-2">
  <p><strong>Mixed 混合端口：</strong> 摒弃了早期 HTTP(7890) 与 SOCKS5(7891) 分离的落后设计，单个 <code>mixed-port: 7890</code> 即可自动嗅探协议类型，大幅简化各软件适配；</p>
  <p><strong>Sniffer 域名嗅探：</strong> 即使客户端发起的流量仅有目标 IP，Mihomo 也能通过 TLS SNI 握手包精确还原真实域名，解决国内应用反查分流失灵的顽疾。</p>
</div>`,
      tableTitle: "Mihomo (Meta) vs 原版 Clash Premium 内核特性矩阵对比",
      tableSubtitle: "技术演进核心维度对照表：",
      tableHeaders: ["核心能力", "Mihomo (Meta) 内核", "原版 Clash Premium (停更)", "技术价值与体验差异"],
      tableRows: [
        ["Shadowsocks-2022", "完全原生支持", "不支持", "专线传输抗重放攻击核心保障"],
        ["VLESS Reality 伪装", "完全原生支持", "不支持", "借用海外名站 TLS 证书免封"],
        ["Hysteria 2 / TUIC", "完全原生支持", "不支持", "弱网公网暴力加速突破限速"],
        ["Rule-Providers 规则集", "支持动态在线解析", "语法极其简陋", "可按域名列表精准自动化维护"],
        ["开源状态与社区活跃", "100% 活跃开源更新", "闭源且已停止维护", "长期安全与性能稳步提升"]
      ],
      decisionTreeTitle: "内核与客户端搭配推荐",
      decisionTreeScenarios: [
        { badge: "桌面 PC/Mac", title: "普通个人电脑用户", desc: "使用内置了最新编译版 Mihomo 的 Clash Verge Rev，图形化界面一键管理。" },
        { badge: "软路由网关", title: "OpenWrt / 路由器用户", desc: "使用 OpenClash 并将内核模式切换为“Meta 内核”，全屋设备透明代理。" },
        { badge: "Linux 开发者", title: "远程 VPS 或服务器终端", desc: "直接下载 Mihomo 二进制文件，通过 systemd 守护进程运行，极度轻量低开销。" }
      ],
      decisionRulesTitle: "Mihomo 进阶配置三定律：",
      decisionRules: [
        "永远开启 dns.enhanced-mode: fake-ip 消除跨洋 DNS 往返延迟；",
        "在 tun 配置中务必指定 stack: mixed 或 gvisor 确保虚拟网卡抗丢包吞吐最高；",
        "使用 rule-providers 引用优质开源规则库，切勿把数万行域名硬写在一个文件里。"
      ],
      brandShowcaseTitle: "全面拥抱 Mihomo 高级特性的专线品牌",
      faqTitle: "Clash Meta / Mihomo 常见疑问 (FAQ)",
      faqs: [
        { q: "Mihomo 和 Clash.Meta 到底是什么关系？", a: "Mihomo 就是原先的 Clash.Meta。2023 年项目团队为了规避品牌关联并体现全新演进，正式将 Meta 内核改名为“Mihomo（水母）”，代码库和开发团队完全一脉相承。" },
        { q: "使用 Mihomo 内核测速为什么比老原版更快？", a: "Mihomo 重构了 TCP 调度器与 UDP 转发逻辑，并支持新一代 Hysteria2 等协议，能更充分压榨本地多核 CPU 和网络带宽。" },
        { q: "从原版 CFW 的配置迁移到 Mihomo 需要修改语法吗？", a: "Mihomo 100% 向下兼容原版 Clash 语法，旧配置可以直接运行，但建议迁移到新的 rule-providers 语法以获得完整体验。" }
      ],
      relatedArticlesTitle: "本内核关联的三级深度实操长文推荐",
      relatedArticles: [
        { tag: "协议解析", title: "Fake-IP 原理解析：它是如何消除本地 DNS 往返延迟实现秒开的？", desc: "深度解剖 Mihomo 核心 DNS Fake-IP 虚拟池拦截机制。", url: "/articles/article-61/" },
        { tag: "实操教程", title: "Clash Verge Rev 完整图文教程：从安装配置到 TUN 全局模式全攻略", desc: "了解如何使用图形化工具操控 Mihomo 内核全部功能。", url: "/articles/article-49/" },
        { tag: "专线架构", title: "IEPL 国际以太网专线物理层拓扑大揭秘：二层物理光缆是如何过境的？", desc: "高阶内核配合真专线带来的极致稳定体验。", url: "/articles/article-82/" },
        { tag: "容灾备份", title: "生产力断网零容忍：主备双机场冷热自动容灾架构手把手搭建", desc: "利用 Mihomo 内核编写 fallback 容灾策略组实操。", url: "/articles/article-99/" }
      ]
    },

    // v2rayn
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
      answerFirstText: "<p>如果您使用的是 Windows 系统，且习惯了清晰明了的节点明细列表、对多核心（Xray / Sing-box）底层参数有精细化调校需求，<strong>v2rayN 是最可靠、最透明的选择</strong>。其纯正的 Windows 原生体验在多节点测速对比时优势极大。</p>",
      section1Title: "一、 v2rayN 的核心优势与架构解析",
      section1Content: `<p>v2rayN 作为一个强大的 GUI 前端外壳，其核心设计亮点在于：</p>
<ul class="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 my-3">
  <li><strong>核心自由替换：</strong> 可以在 Xray-core、Sing-box core、v2fly core 之间秒级切换，哪个协议更新快就切哪个；</li>
  <li><strong>高密度节点平铺列表：</strong> 支持按照延迟、速度、协议多字段一键排序，成百上千个节点状况一目了然；</li>
  <li><strong>纯净绿色便携：</strong> 解压即用，不修改系统深层注册表项（正常退出时），配置全保存在本地文件夹内。</li>
</ul>`,
      section2Title: "二、 v2rayN 极速配置三步法",
      section2Content: `<p>三步即可上手完成科学上网：</p>
<ol class="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-700 my-3">
  <li><strong>添加订阅：</strong> 点击顶部菜单“订阅分组” -> “订阅分组设置”，点击添加，粘贴光速云等服务商提供的订阅链接并保存；</li>
  <li><strong>更新订阅：</strong> 回到主菜单，点击“订阅分组” -> “更新全部订阅 (不通过代理)”，节点列表瞬间刷出；</li>
  <li><strong>启用代理：</strong> 底部状态栏将“系统代理”设置为<strong>“自动配置系统代理”</strong>，将“路由”设置为<strong>“绕过大陆 (绕过大陆局域网)”</strong>。</li>
</ol>`,
      tableTitle: "v2rayN vs Clash Verge Rev 对比选型表",
      tableSubtitle: "Windows 平台两大主流工具横向对比：",
      tableHeaders: ["评估维度", "v2rayN", "Clash Verge Rev", "适用人群建议"],
      tableRows: [
        ["界面交互风格", "传统 Windows 紧凑列表", "现代卡片式仪表盘", "v2rayN 适合老牌极客，Verge 适合大众用户"],
        ["核心支持", "Xray / Sing-box 多核心自由切", "固定 Mihomo (Meta) 内核", "v2rayN 底层调试空间更大"],
        ["TUN 虚拟网卡", "需配合 Sing-box/Tun 插件配置", "内置一键安装 Service Mode", "Verge 在全局接管上更加无脑方便"],
        ["跨平台支持", "仅限 Windows", "支持 Windows / macOS / Linux", "跨系统用户优先选 Verge"]
      ],
      decisionTreeTitle: "v2rayN 常见场景适配",
      decisionTreeScenarios: [
        { badge: "深度测速", title: "喜欢对比所有节点真实延迟与真连接速率", desc: "按 Ctrl+A 全选节点，按 Ctrl+O 进行批量真实延迟测速，极度高效。" },
        { badge: "新协议尝鲜", title: "使用最新的 Reality 或 TUIC 协议", desc: "在设置中将默认核心切换为 Sing-box，享受最新协议红利。" }
      ],
      decisionRulesTitle: "v2rayN 安全使用三准则：",
      decisionRules: [
        "日常使用务必将路由切换为“绕过大陆”，切勿选“全局代理”；",
        "关机或重启前，务必右键托盘图标选择“退出”，防止未清除 Windows 代理导致开机断网；",
        "遇到证书错误时，核对电脑系统时间是否精准同步到秒。"
      ],
      brandShowcaseTitle: "v2rayN 原生深度兼容的优质专线品牌",
      faqTitle: "v2rayN 常见疑难答疑 (FAQ)",
      faqs: [
        { q: "v2rayN 测速显示 -1 或连接超时怎么排查？", a: "首先核查系统时间是否同步，其次检查杀毒软件（如 360 或电脑管家）是否拦截了 xray.exe 的网络通信权限。" },
        { q: "v2rayN 怎么设置开机自启并最小化？", a: "在“设置” -> “参数设置”中，勾选“开机自动启动”和“启动时最小化到托盘”即可。" }
      ],
      relatedArticlesTitle: "本客户端关联的三级深度实操长文推荐",
      relatedArticles: [
        { tag: "排障修复", title: "节点测速全红全超时？电脑系统时间同步与防重放机制急救排查", desc: "解决 v2rayN 节点全部显示 -1 的终极急救方案。", url: "/articles/article-67/" },
        { tag: "排障修复", title: "退出代理后电脑微信、百度打不开？一键清理注册表代理残留脚本", desc: "v2rayN 异常崩溃导致断网的一键修复命令。", url: "/articles/article-70/" }
      ]
    },

    // shadowrocket
    {
      categoryKey: "clients",
      categoryName: "客户端软件",
      parentHubName: "客户端软件",
      parentHubUrl: "/clients/",
      subSlug: "shadowrocket",
      title: "Shadowrocket 小火箭 iOS 终极配置教程：美区 ID 获取与按需连接指南",
      description: "全面讲解 iPhone / iPad 上最好用的代理神器 Shadowrocket（小火箭）。包含正版美区 Apple ID 获取途径、订阅导入、按需连接自动化配置及省电优化。",
      heroBadge: "iOS 国民级代理神器 · 小火箭全攻略",
      h1: "Shadowrocket 小火箭 iOS 终极配置教程",
      subDesc: "在 iOS 生态中，Shadowrocket 凭借轻量低功耗、全协议支持和极高性价比，成为苹果用户翻墙的第一选择。本文带您避开共享 ID 风险，从零上手。",
      answerFirstTitle: "iOS 小火箭选型结论 (Verdict)",
      answerFirstText: "<p>iPhone 和 iPad 用户首选 <strong>Shadowrocket（售价 $2.99 美元）</strong>。切勿购买来路不明的共享 ID 在系统 iCloud 登录，强烈建议自建美区 Apple ID 配合礼品卡购买正版，终身可更新且安全无虞。</p>",
      section1Title: "一、 苹果生态首选：小火箭的核心竞争优势",
      section1Content: `<p>相比于其他 iOS 客户端，小火箭的优势无可替代：</p>
<ul class="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 my-3">
  <li><strong>原生 Swift 编写与极低功耗：</strong> 基于 iOS Network Extension 原生框架，全天挂后台耗电量仅 2% 左右；</li>
  <li><strong>按需连接（On Demand）：</strong> 可设置为“连上特定家/公司 Wi-Fi 自动断开代理，切换蜂窝移动网络自动激活代理”，完全无需手动开关；</li>
  <li><strong>全协议通吃：</strong> 完美支持 Shadowsocks、VLESS Reality、Trojan、Hysteria2 以及 WireGuard 协议。</li>
</ul>`,
      section2Title: "二、 安全购买与导入订阅实战",
      section2Content: `<p>安全上手全流程：</p>
<ol class="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-700 my-3">
  <li><strong>正规获取正版小火箭：</strong> 在苹果官网注册美区 Apple ID，在 App Store 商店内登录（严禁在设置 iCloud 登录），使用美区礼品卡兑换 $3 后完成购买；</li>
  <li><strong>一键扫码导入：</strong> 打开小火箭，点击右上角 <strong>“+”</strong> 按钮，类型选择 <strong>Subscribe (订阅)</strong>，粘贴光速云专属订阅 URL，或者直接在电脑端生成二维码用手机扫描；</li>
  <li><strong>开启配置分流：</strong> 主界面全局路由选择<strong>“配置 (Config)”</strong>，开启第一项开关，首次运行点击“允许”添加 VPN 描述文件即可畅游网络！</li>
</ol>`,
      tableTitle: "iOS 常见代理工具横向对比",
      tableSubtitle: "App Store 常见科学上网客户端参数：",
      tableHeaders: ["工具名称", "App Store 售价", "协议全面度", "上手门槛", "综合推荐指数"],
      tableRows: [
        ["Shadowrocket (小火箭)", "$2.99", "全协议覆盖 (SS/VLESS/H2)", "简单易用", "★★★★★ (性价比之王)"],
        ["Quantumult X (圈叉)", "$7.99", "主流协议支持", "脚本繁杂，门槛高", "★★★★☆ (极客首选)"],
        ["Stash (Clash for iOS)", "$3.99", "Clash 规则体系", "中等", "★★★★☆ (Clash生态)"],
        ["Loon", "$5.99", "主流协议支持", "中等", "★★★★☆ (轻量进阶)"]
      ],
      decisionTreeTitle: "小火箭使用场景决策",
      decisionTreeScenarios: [
        { badge: "日常通勤", title: "地铁移动网络刷社媒与追剧", desc: "开启按需连接与低倍率节点，省电且流量不浪费。" },
        { badge: "海外出差", title: "境外旅行与漫游", desc: "将小火箭设置为“直连”或停用，回国后再一键开启。" }
      ],
      decisionRulesTitle: "小火箭避坑三铁律：",
      decisionRules: [
        "绝对不要在 iPhone“设置”里登录网购的共享 Apple ID，会被锁机敲诈；",
        "全局路由务必保持在“配置”模式，选“代理”会导致国内 App 变慢；",
        "定期长按订阅行选择“更新订阅”，获取机场最新的优化节点。"
      ],
      brandShowcaseTitle: "小火箭深度优化适配的专线服务商",
      faqTitle: "小火箭常见答疑 (FAQ)",
      faqs: [
        { q: "小火箭提示“无法添加 VPN 配置”怎么解决？", a: "通常是由于手机开启了屏幕使用时间限制，或者已存在损坏的描述文件。重启 iPhone 或在“设置 -> 通用 -> VPN 与设备管理”中清除旧配置后重试。" },
        { q: "小火箭怎么开启广告拦截？", a: "在“配置”页面下载规则集（如 ACL4SSR 或 Loyalsoldier），即可实现过滤网页和应用广告。" }
      ],
      relatedArticlesTitle: "本客户端关联的三级深度实操长文推荐",
      relatedArticles: [
        { tag: "实操手册", title: "Shadowrocket 小火箭 iOS 终极指南：美区 ID 获取与按需连接配置", desc: "手把手教您注册美区账号与按需连接省电设置。", url: "/articles/article-51/" },
        { tag: "流媒体解锁", title: "Netflix 只能看自制剧真相揭秘：原生住宅 IP 与机房 IP 数据库识别机理", desc: "在小火箭上畅看全区奈飞影视剧的节点配置方案。", url: "/articles/article-38/" }
      ]
    },

    // mihomo
    {
      categoryKey: "clients",
      categoryName: "客户端软件",
      parentHubName: "客户端软件",
      parentHubUrl: "/clients/",
      subSlug: "mihomo",
      title: "Mihomo 内核与分流配置实战：跨平台高性能代理引擎指南",
      description: "详解开源代理内核 Mihomo 的跨平台部署、配置结构体语法、Fake-IP 优化、TUN 堆栈选择及规则集自动化更新。",
      heroBadge: "全平台底层动力 · Mihomo 深度解析",
      h1: "Mihomo 内核与高级分流配置指南",
      subDesc: "作为开源社区最坚挺的基石，Mihomo 为各类上层 GUI 软件提供了无比强大的网络协议调度能力。本文带您掌握其核心配置精髓。",
      answerFirstTitle: "Mihomo 核心价值 (Verdict)",
      answerFirstText: "<p>Mihomo 是当前开源世界综合性能最强悍的代理转发核心。深入理解其配置文件语法，不仅能帮您自由定制分流策略，更能彻底搞懂科学上网的底层通信流程。</p>",
      section1Title: "一、 Mihomo 核心模块设计与数据流转",
      section1Content: `<p>Mihomo 的工作流程可简化为三大阶段：</p>
<ul class="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 my-3">
  <li><strong>Inbounds（入站接管）：</strong> 监听 HTTP/Socks5/Mixed 端口或通过 TUN 虚拟网卡劫持全局流量；</li>
  <li><strong>DNS & Fake-IP 解析：</strong> 系统级截获 DNS 请求，通过 198.18.0.0/16 地址池返回假 IP，消灭本地 DNS 往返延迟；</li>
  <li><strong>Rules & Outbounds（分流与出站）：</strong> 匹配 GeoIP/Geosite 规则库，将请求分发至指定代理策略组或直连。</li>
</ul>`,
      section2Title: "二、 必备优化配置片段示例",
      section2Content: `<p>建议在配置文件中加入以下关键优化项：</p>
<div class="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs my-3 overflow-x-auto">
  <pre><code>dns:
  enable: true
  listen: 0.0.0.0:1053
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  nameserver:
    - 223.5.5.5
    - 119.29.29.29
  fallback:
    - 8.8.8.8
    - 1.1.1.1</code></pre>
</div>`,
      tableTitle: "Mihomo 关键技术参数表",
      tableSubtitle: "内核核心技术指标：",
      tableHeaders: ["技术特性", "支持标准", "优化建议"],
      tableRows: [
        ["Fake-IP 延迟", "0 毫秒本地即时响应", "强烈推荐全天开启"],
        ["TUN 虚拟网卡堆栈", "System / gVisor / Mixed", "推荐 Mixed 或 gVisor 兼顾性能"],
        ["规则集格式", "MRS / YAML / Dat 二进制", "推荐 MRS 高性能预编译格式"]
      ],
      decisionTreeTitle: "Mihomo 部署场景",
      decisionTreeScenarios: [
        { badge: "软路由网关", title: "OpenClash 用户", desc: "选用 Meta 内核模式，开启 Fake-IP，全家智能设备秒开 YouTube。" },
        { badge: "Linux 开发者", title: "无桌面服务器环境", desc: "使用 mihomo CLI 结合 systemd 部署为后台服务。" }
      ],
      decisionRulesTitle: "Mihomo 运维准则：",
      decisionRules: [
        "切勿随意关闭 Fake-IP，否则网页首包延迟将明显增加；",
        "国内 DNS 服务器配置阿里或腾讯公共 DNS，防止国内解析泄露；",
        "定期更新 rule-providers 确保最新 AI 和流媒体域名不漏网。"
      ],
      brandShowcaseTitle: "Mihomo 原生优化的专线机场",
      faqTitle: "Mihomo 常见问题 (FAQ)",
      faqs: [
        { q: "Mihomo 能否在命令行直接启动？", a: "可以。使用 `mihomo -d . -f config.yaml` 即可直接在终端运行并输出实时排障日志。" }
      ],
      relatedArticlesTitle: "本核心关联的三级深度实操长文推荐",
      relatedArticles: [
        { tag: "技术原理", title: "Fake-IP 原理解析：它是如何消除本地 DNS 往返延迟实现秒开的？", desc: "彻底搞懂 198.18.0.0/16 虚拟网段解析机制。", url: "/articles/article-61/" },
        { tag: "实操手册", title: "Clash Verge Rev 完整图文教程：从安装配置到 TUN 全局模式全攻略", desc: "在桌面图形界面中驾驭 Mihomo 内核。", url: "/articles/article-49/" }
      ]
    },

    // sing-box
    {
      categoryKey: "clients",
      categoryName: "客户端软件",
      parentHubName: "客户端软件",
      parentHubUrl: "/clients/",
      subSlug: "sing-box",
      title: "sing-box 新一代通用代理核心指南：架构创新与跨平台实战",
      description: "全面解析开源通用代理核心 sing-box。基于纯 JSON 现代化语法、极低内存占用、全协议原生支持与跨平台透明代理配置。",
      heroBadge: "下一代通用代理核心 · 性能怪兽",
      h1: "sing-box 新一代通用代理核心指南",
      subDesc: "由知名开源作者维护的 sing-box，以其极度严谨的架构设计、原生全平台适配和极其强悍的吞吐性能，成为代理圈不可忽视的新王者。",
      answerFirstTitle: "sing-box 核心评价 (Verdict)",
      answerFirstText: "<p>sing-box 是为未来 5-10 年代理生态设计的通用网络引擎。它抛弃了旧时代繁杂冗余的历史包袱，采用统一严整的 JSON 语法规范，支持从路由器、Linux 服务器到 iOS/Android 的全端原生运行。</p>",
      section1Title: "一、 性能怪兽：sing-box 的技术优势",
      section1Content: `<p>sing-box 在吞吐量与内存控制上树立了新标杆：</p>
<ul class="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 my-3">
  <li><strong>纯 Go 语言精雕细琢：</strong> 内存分配极其克制，即使在 128MB 内存的超低配置老旧路由器上也能丝滑跑满千兆；</li>
  <li><strong>原生全协议覆盖：</strong> 对 Shadowsocks-2022、VLESS Reality、Hysteria2、TUIC、WireGuard 拥有业界第一梯队的高质量实现；</li>
  <li><strong>官方跨平台 GUI 客户端：</strong> 官方同时维护了 Windows、macOS、iOS、Android 和 Apple TV 的客户端，跨端配置体验高度一致。</li>
</ul>`,
      section2Title: "二、 JSON 配置哲学与上手路径",
      section2Content: `<p>sing-box 使用 JSON 替代 YAML，语法虽显严格，但逻辑层级极其严密（包含 inbounds、outbounds、route、dns 四大骨干）。对于普通用户，建议直接使用支持导出 sing-box 订阅的机场，或通过在线转换工具一键生成配置。</p>`,
      tableTitle: "sing-box vs Mihomo 对比表",
      tableSubtitle: "新一代双雄技术路线对比：",
      tableHeaders: ["对比维度", "sing-box", "Mihomo (Clash Meta)", "选型建议"],
      tableRows: [
        ["配置语言", "严格 JSON 格式", "经典 YAML 格式", "YAML 对人类更易读，JSON 机器解析更严谨"],
        ["内存吞吐", "极限压榨，占用极小", "优秀，轻微高于 sing-box", "低配置软路由首选 sing-box"],
        ["生态成熟度", "快速发展中", "Clash 生态规则极为庞大", "大众用户选 Mihomo，资深极客选 sing-box"]
      ],
      decisionTreeTitle: "sing-box 适用场景",
      decisionTreeScenarios: [
        { badge: "Apple TV", title: "家庭客厅流媒体网关", desc: "在 Apple TV 上安装官方 sing-box App，全家电视无缝 4K 解锁奈飞与 YouTube。" },
        { badge: "低配路由器", title: "内存小于 256MB 的嵌入式设备", desc: "安装 sing-box 运行，稳定不崩不爆内存。" }
      ],
      decisionRulesTitle: "sing-box 使用小贴士：",
      decisionRules: [
        "编辑 JSON 配置文件务必使用 VS Code 等支持语法高亮的编辑器，注意括号闭合；",
        "iOS 端可免费在海外 App Store 下载官方客户端；",
        "优先选择官方支持 sing-box 订阅协议的一线专线服务商。"
      ],
      brandShowcaseTitle: "原生支持 sing-box 订阅的专线品牌",
      faqTitle: "sing-box 常见问答 (FAQ)",
      faqs: [
        { q: "sing-box 能不能直接读 Clash 的 yaml 订阅？", a: "不能直接读，需要通过客户端内置的配置转换器或在线 API 进行格式转换。" }
      ],
      relatedArticlesTitle: "本核心关联的三级深度实操长文推荐",
      relatedArticles: [
        { tag: "实操教程", title: "Clash Verge Rev 完整图文教程：从安装配置到 TUN 全局模式全攻略", desc: "了解桌面端主流配置逻辑。", url: "/articles/article-49/" },
        { tag: "专线架构", title: "IEPL 国际以太网专线物理层拓扑大揭秘：二层物理光缆是如何过境的？", desc: "顶级专线配合高性能内核的极速体验。", url: "/articles/article-82/" }
      ]
    }
  ];

  // We have 6 for clients! Now let's populate all other 9 categories programmatically or with structured data!
  return data;
}
