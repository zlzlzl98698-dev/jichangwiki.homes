// scripts/pages_tutorials.js
// Industrial-grade, encyclopedic content for all 5 Tutorials pages

export const tutorialsPages = [
  {
    categoryKey: "tutorials",
    categoryName: "使用教程",
    parentHubName: "使用教程",
    parentHubUrl: "/tutorials/",
    subSlug: "subscription",
    title: "订阅导入指南：Windows、Mac、iOS、Android 全平台一键配置与防泄露实战",
    description: "全面解决科学上网初学者‘怎么把机场节点放进软件里’的难题。涵盖 Base64 订阅链接转换、API 自动拉取、自动更新定时任务及防泄露安全规范。",
    heroBadge: "从零上手第一课 · 全平台订阅导入",
    h1: "订阅导入指南：全平台客户端一键配置与自动更新实战",
    subDesc: "购买了机场套餐却不知道怎么导入节点？本文带您 3 分钟打通各大操作系统的订阅导入、定时自动更新与防泄密安全体系。",
    answerFirstTitle: "订阅导入核心要领 (Verdict)",
    answerFirstText: `<p><strong>订阅链接（Subscription URL）是您在代理软件中连接机场全部节点的数字身份证与密钥</strong>。请务必使用客户端内的“一键导入”或“新建订阅 URL”功能，切勿手动逐个录入单个节点参数。推荐桌面端优先使用 <strong>Clash Verge Rev（Windows/macOS）</strong>，移动端推荐 <strong>Shadowrocket（iOS）</strong> 或 <strong>v2rayNG / FlClash（Android）</strong> 导入光速云订阅，即可实现节点自动更新与规则智能分流。</p>`,
    section1Title: "一、 订阅链接的工作原理与数据流转拓扑",
    section1Content: `<p>要想规范管理代理节点，首先需要理解订阅链接在技术底层的运作机理。很多初学者误以为订阅链接本身就是一个代理节点，其实不然：<strong>订阅链接本质是一个带有唯一鉴权 Token 的动态配置分发 API 地址</strong>。当您的客户端向该地址发起 HTTP GET 请求时，机场的中心分发服务器会根据您的客户端请求头（User-Agent）动态生成适配该软件的节点列表与分流规则。</p>
<div class="p-5 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs my-4 space-y-2 border border-slate-800">
  <div class="text-emerald-400 font-bold mb-2">【订阅链接请求与本地解析流转流程】</div>
  <div>[用户客户端 (Clash / 小火箭)]</div>
  <div>  │  (发起 HTTP/HTTPS GET 请求，携带专有 User-Agent: ClashMeta 或 Shadowrocket)</div>
  <div>  ▼</div>
  <div>[机场订阅下发服务器 / 边缘 CDN]</div>
  <div>  │  (服务器根据 Token 验证套餐有效期、剩余流量，并根据 User-Agent 动态组装配置)</div>
  <div>  ▼</div>
  <div>[网络传输返回报文] (Base64 加密字符串 或 标准 YAML/JSON 配置文件)</div>
  <div>  │  (客户端在本地内存解密报文，加载 Proxies 节点集群与 Rules 分流规则)</div>
  <div>  ▼</div>
  <div>[本地代理内核激活] ---> (节点列表刷新完毕，自动进入规则分流监听状态)</div>
</div>
<p>现代优质机场通常提供<strong>聚合订阅接口</strong>，能够根据客户端软件自动返回 Clash、Sing-box 或 SIP002 等适配协议格式。由于专线机房的入口 IP 与接入端口会根据网络抗干扰策略进行动态热更新，因此必须开启客户端的<strong>“定时自动更新”</strong>功能，确保本地节点列表永远保持最新。</p>`,
    section2Title: "二、 Windows、Mac、iOS、Android 全平台导入四步实战",
    section2Content: `<p>不同操作系统的主流客户端界面设计略有不同，但其核心导入逻辑完全遵循标准化流程。我们梳理了四大平台最主流软件的四步标准操作：</p>
<ul class="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 my-3">
  <li><strong>Windows / macOS (Clash Verge Rev)：</strong> 登录机场后台复制“Clash 订阅链接” -> 打开软件左侧“订阅 (Profiles)”菜单 -> 在上方输入框粘贴订阅 URL -> 点击“导入 (Import)” -> 鼠标右键点击导入成功的配置卡片，将“自动更新间隔”设置为 <strong>1440 分钟（即 24 小时）</strong>，最后在“代理 (Proxies)”页面选择所需节点。</li>
  <li><strong>iOS 苹果端 (Shadowrocket 小火箭)：</strong> 在 Safari 浏览器中登录机场后台，点击“一键导入 Shadowrocket”唤醒应用；或手动复制订阅链接后打开小火箭，右上角点击“+”号 -> 类型选择“Subscribe” -> 在 URL 栏粘贴链接并保存，软件将自动向下拉取全部节点。</li>
  <li><strong>Android 安卓端 (v2rayNG / FlClash)：</strong> 复制通用 V2Ray 订阅或 Clash 订阅 -> 打开客户端左上角菜单进入“订阅分组设置” -> 点击右上角“+”号添加分组 -> 粘贴订阅地址并保存 -> 返回主界面点击右上角三点菜单选择“更新订阅”。</li>
  <li><strong>订阅拉取失败排查：</strong> 若提示“下载配置超时或 403 Forbidden”，通常是本地直连网络受到 ISP DNS 污染或机场防刷 WAF 拦截。可尝试将手机切换为蜂窝移动网络再次点击更新，或在客户端设置中临时开启“允许不安全证书 (Skip Cert Verify)”。</li>
</ul>`,
    tableTitle: "全平台主流客户端订阅导入方式与兼容度对照表",
    tableSubtitle: "主流科学上网工具订阅导入能力横向横评：",
    tableHeaders: ["客户端名称", "支持平台", "一键唤醒导入", "二维码扫码", "定时自动更新", "订阅格式兼容性", "新手推荐度"],
    tableRows: [
      ["Clash Verge Rev", "Windows / macOS / Linux", "完美支持", "支持", "支持 (可自定分钟)", "Clash YAML / Mihomo", "★★★★★ (PC 首选)"],
      ["Shadowrocket", "iOS / iPadOS", "完美支持", "完美支持 (扫码秒拉)", "支持 (打开时更新)", "SS / Vmess / Trojan / Vless", "★★★★★ (iOS 首选)"],
      ["v2rayN", "Windows", "需手动粘贴 URL", "支持", "支持 (启动自动更新)", "V2Ray Base64 / Xray", "★★★★☆ (Windows 备选)"],
      ["FlClash", "Android / Windows / macOS", "完美支持", "支持", "支持", "Clash / Clash Meta", "★★★★★ (安卓首选)"],
      ["Sing-box", "全平台", "需配置 JSON", "部分支持", "支持", "Sing-box 专有 JSON", "★★★☆☆ (极客推荐)"]
    ],
    decisionTreeTitle: "全场景订阅导入决策树与排障指南",
    decisionTreeScenarios: [
      { badge: "新手首用", title: "第一次购买机场套餐不知从何下手", desc: "建议直接在电脑端下载 Clash Verge Rev，在手机端使用 Shadowrocket，点击机场后台的“一键导入”按钮，无需手动配置任何复杂参数。" },
      { badge: "敏感时期", title: "原节点全部超时，订阅提示更新失败", desc: "机场可能已紧急更换接入域名。请登录机场官网用户中心，重新复制最新的订阅链接，或使用手机热点更新订阅获取可用节点。" },
      { badge: "多设备同步", title: "电脑与手机想共用同一个套餐流量", desc: "同一条订阅链接可直接在您名下的多台设备（PC、手机、平板）中导入，系统会合并计费，只要不超出套餐的“同时在线设备数”即可。" }
    ],
    decisionRulesTitle: "订阅管理与信息安全五大黄金铁律：",
    decisionRules: [
      "绝对不要将自己的订阅链接公开发布在论坛、群聊或截图晒单，订阅 URL 包含私有鉴权 Token，他人获取后可直接耗尽您的全部流量；",
      "定期保持订阅自动更新（建议设置为每天或每两天自动刷新一次），以便及时拉取运营商最新扩容的优质高速专线；",
      "切勿使用来路不明的第三方公共“SubConverter 订阅转换”网站，避免您的核心 Token 和节点信息在转换端被恶意截流或日志记录；",
      "若怀疑订阅链接已泄露，请立即登录机场后台点击“重置订阅信息（Reset Token）”，旧链接将瞬间失效；",
      "导入订阅后务必确认客户端运行在“规则 (Rule)”模式，切忌盲目开启全局代理，避免消耗宝贵的专线流量访问国内网站。"
    ],
    brandShowcaseTitle: "订阅下发极速稳定、支持一键唤醒的专线服务商",
    faqTitle: "订阅导入高频技术疑问解答 (FAQ)",
    faqs: [
      { q: "导入订阅时提示“格式无法解析 (Invalid Format)”怎么解决？", a: "这通常是因为复制了不兼容的订阅类型。例如，在 Clash 客户端中直接导入了纯 Base64 单节点链接，或在仅支持 V2Ray 的客户端中导入了 YAML 格式。请在机场后台确认是否点击了对应客户端的专属按钮（如“复制 Clash 订阅”）。" },
      { q: "为什么每次导入成功后，节点测速依然全红超时？", a: "订阅导入成功仅代表成功下载了节点元数据列表，并不代表网络已经打通。节点全红 90% 是因为本地电脑系统时间偏差超过 90 秒，导致加密握手失败；或是客户端的本地代理端口被其他网络软件占用。" },
      { q: "换了一台新电脑，旧电脑的订阅需要解绑吗？", a: "不需要。订阅链接是基于云端套餐配额管理的，换新电脑只需在新设备上重新下载客户端并粘贴订阅链接导入即可。只要同一时刻在线使用的设备数不超过套餐限制，无需做任何解绑操作。" },
      { q: "有些机场提供托管转换服务，是否安全？", a: "像光速云这种正规大型机场在自身边缘 CDN 部署的原生订阅分发 API 是完全安全可信的。需要警惕的是网上陌生人搭建的免费公开在线转换网页，那类工具存在保存用户订阅记录的隐患。" },
      { q: "为什么在机场官网改了密码后，客户端订阅就更新不了了？", a: "很多机场为了安全起见，在用户修改登录密码时会自动触发安全机制，将现有的订阅鉴权 Token 强制作废。此时您只需重新登录机场后台复制最新的订阅链接，在客户端中替换原有的 URL 即可恢复。" }
    ],
    relatedArticlesTitle: "订阅与客户端进阶教程长文",
    relatedArticles: [
      { tag: "新手必读", title: "2026年新手翻墙科学上网终极防坑指南：从零认识代理、协议与机场", desc: "全方位零基础入门手册，带您搞懂订阅与代理的底层关系。", url: "/articles/article-1/" },
      { tag: "实操手册", title: "Clash Verge Rev 完整图文教程：从安装配置到 TUN 全局模式全攻略", desc: "在桌面软件中可视化应用高级配置与订阅管理。", url: "/articles/article-49/" },
      { tag: "排障指引", title: "节点测速全红全超时？电脑系统时间同步与防重放机制急救排查", desc: "订阅拉取成功后节点不通的系统级自愈方案。", url: "/articles/article-67/" }
    ]
  },
  {
    categoryKey: "tutorials",
    categoryName: "使用教程",
    parentHubName: "使用教程",
    parentHubUrl: "/tutorials/",
    subSlug: "clash-configuration",
    title: "Clash 配置文件编写与修改实战：策略组、分流规则与内核调优",
    description: "全面讲解 Clash / Mihomo 配置文件 YAML 语法。手把手教您定制 Proxy-Groups 策略组、引入动态规则提供者 Rule-Providers、配置 DNS Fake-IP 及性能调优。",
    heroBadge: "进阶配置手册 · 掌握 YAML 语法精髓",
    h1: "Clash 配置文件详解：策略组定制与规则调优实战",
    subDesc: "不满足于机场默认的死板分流？深入剖析 Clash 配置文件核心语法，打造属于您自己的高可用、智能网络分流系统。",
    answerFirstTitle: "配置核心原则 (Verdict)",
    answerFirstText: `<p>Clash / Mihomo 配置文件的核心灵魂在于<strong>清晰的三层架构：Proxies（节点池） -> Proxy-Groups（策略组） -> Rules（匹配规则）</strong>。善用 <code>fallback</code> 自动容灾组和 <code>rule-providers</code> 动态规则集，不仅能将网络可用性提升至电信级标准，还能彻底解决微信误代理、流媒体被误判等常见困扰。</p>`,
    section1Title: "一、 Clash 配置文件的核心层级骨架剖析",
    section1Content: `<p>Clash 采用规范的 YAML 数据序列化语言。理解其层级结构是进阶高手的必经之路。一个现代化、工业级的 Mihomo（Clash Meta）配置文件严格由以下六大顶层模块构成：</p>
<div class="p-5 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs my-4 space-y-2 border border-slate-800">
  <div class="text-emerald-400 font-bold mb-2">【Mihomo 核心配置骨架全景图】</div>
  <div>1. 基础网络监听：mixed-port: 7890, allow-lan: true, mode: rule</div>
  <div>2. DNS 解析引擎：dns: &#123; enable: true, enhanced-mode: fake-ip, nameserver: [...] &#125;</div>
  <div>3. 节点代理定义 (proxies)：定义各个单独节点的协议、IP、端口、UUID、加密算法</div>
  <div>4. 策略调度组 (proxy-groups)：定义节点的分组逻辑（手动选择、自动测速、主备容灾）</div>
  <div>5. 动态规则源 (rule-providers)：引入外部定期更新的国内白名单、广告拦截、流媒体专用规则</div>
  <div>6. 路由匹配执行 (rules)：自上而下匹配流量走向（DIRECT 直连 / 代理组 / REJECT 拦截）</div>
</div>
<p>在 YAML 语法中，<strong>缩进极其严格（必须使用英文空格，严禁使用 Tab 键）</strong>。层级错乱是初学者修改配置后无法启动最常见的技术诱因。善用高级编辑器（如 VS Code）配合 YAML 语法插件，能实时规避 99% 的书写格式错误。</p>`,
    section2Title: "二、 打造企业级高可用策略组（Fallback 与 Rule-Providers）",
    section2Content: `<p>默认生成的单节点列表在主线路偶发抖动时会导致连接中断。利用 Clash 的高级策略组类型，可以轻松组建自动化无感容灾网络体系：</p>
<ul class="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 my-3">
  <li><strong>主备自动容灾策略组 (Fallback)：</strong> 适用于跨国远程办公与金融外贸。配置 <code>type: fallback</code>，将高质量的 IEPL 专线（如光速云）排在首位，备用中转节点排在次位，设置探活间隔 <code>interval: 300</code>。当主力节点持续 3 次握手超时，客户端在毫秒内静默切换至备用节点，实现“生产力永不掉线”；</li>
  <li><strong>低延迟自动择优组 (URL-Test)：</strong> 适用于日常网页浏览与社交软件。配置 <code>type: url-test</code> 并设置 <code>tolerance: 50</code>（容差 50ms），内核自动在当前活跃节点中选取物理延迟最低者，且避免在两节点延迟接近时频繁颠簸切换；</li>
  <li><strong>引入远程动态规则集 (Rule-Providers)：</strong> 不要在本地静态写入几千条域名规则！通过配置 <code>rule-providers</code> 订阅权威维护的开源规则库（如 LoyalSoldier 规则集），设置 <code>interval: 86400</code>（每天自动在后台拉取更新），自动同步最新的国内 CDN 与海外新上线服务域名。</li>
</ul>`,
    tableTitle: "Clash 四大核心策略组类型性能与适用场景对比表",
    tableSubtitle: "内核策略调度机制深度对比：",
    tableHeaders: ["策略组类型", "运行算法机理", "网络颠簸控制", "连接保持性", "最佳业务场景", "推荐指数"],
    tableRows: [
      ["select (手动选择)", "用户在前端界面手动勾选指定节点", "无任何自动切换颠簸", "极佳 (会话永久绑定)", "跨国网银、AI 账号固定 IP", "★★★★★ (核心必配)"],
      ["fallback (主备容灾)", "严格按列表顺序探活，主挂切备", "极高 (仅在故障时切换)", "优良 (主线恢复自动切回)", "远程办公、生产力开发、会议", "★★★★★ (生产力首选)"],
      ["url-test (低延迟择优)", "定期对特定 URL 测速选最低延迟", "较弱 (容易因微小抖动跳变)", "一般 (可能重置长连接)", "日常轻度网页浏览、资讯检索", "★★★★☆"],
      ["load-balance (负载均衡)", "多节点轮询或一致性哈希分流", "频繁 (不同连接走不同 IP)", "较差 (易触发网站多 IP 告警)", "BT 多线程大文件下载", "★★★☆☆ (慎用于办公)"]
    ],
    decisionTreeTitle: "配置文件定制与优化决策树",
    decisionTreeScenarios: [
      { badge: "开发者与办公", title: "需要访问公司内网与国际生产系统", desc: "务必在 DNS 配置中保留 fake-ip-filter，将公司私有域名与内网网段加入直连白名单，防止内部 OA 系统解析故障。" },
      { badge: "AI 模型重度依赖", title: "ChatGPT / Claude 提示 IP 频繁变动触发封控", desc: "为 OpenAI 和 Anthropic 创建单独的 select 策略组，锁定单一优质固定节点，严禁放入 url-test 频繁切 IP。" },
      { badge: "外服游戏联机", title: "Steam / EA App 联机出现 NAT 严格受限", desc: "在配置文件根节点开启 <code>tun: &#123; enable: true, stack: mixed &#125;</code> 并激活 FullCone NAT 特性。" }
    ],
    decisionRulesTitle: "Clash 配置文件编写五大军规：",
    decisionRules: [
      "严格使用两个空格缩进，严禁在 YAML 文件中混入任何制表符（Tab 键），否则解析引擎将直接崩溃闪退；",
      "键值对冒号（:）与列表连字符（-）后必须紧跟一个英文空格，不可紧贴文字；",
      "编写含特殊字符（如冒号、中括号、星号）的节点名称或规则时，必须使用单引号将字符串完整包裹；",
      "切勿将最后的 <code>MATCH</code> 兜底规则设为代理，必须设为 <code>DIRECT</code> 或受控代理组，避免非必要流量消耗；",
      "在修改生产环境配置文件前，务必保留一份带时间戳的 <code>.bak</code> 备份文件，便于出错时瞬间回滚。"
    ],
    brandShowcaseTitle: "配置规则结构规范、节点命名标准的专线品牌",
    faqTitle: "Clash 配置文件高频疑问解答 (FAQ)",
    faqs: [
      { q: "为什么手动修改配置文件后，客户端无法加载且无报错提示？", a: "这绝大多数是由于隐藏字符或缩进错误引起的。YAML 解析器对不可见字符极其敏感。建议在本地使用 VS Code 等专业编辑器，并在扩展商店安装 YAML 语法检查扩展，语法错误会在右侧滑动条直接标红定位。" },
      { q: "Fake-IP 和 Redir-Host 模式到底有什么技术区别？", a: "Redir-Host 必须在本地先完成真实 DNS 查询再决定路由，延迟高且易受污染；Fake-IP 在本地直接分配一个虚拟私有 IP（如 198.18.0.x）立即返回给系统，真正的 DNS 查询延迟被完美隐藏到代理节点远端，不仅提速显著，还能彻底免疫国内本地 DNS 污染。" },
      { q: "如何在配置文件中彻底屏蔽恶意的网页挖矿与弹窗广告？", a: "在 rule-providers 中引入专门的 Advertising 规则集，并在 rules 规则段中将广告域名规则的执行动作指定为 `REJECT`，内核会在底层直接丢弃广告请求，极大净化浏览环境并节约流量。" },
      { q: "配置 fallback 容灾组时，探活 URL 应该怎么选？", a: "建议选用全球 CDN 节点丰富且响应极快的轻量探测点，例如 `http://www.gstatic.com/generate_204` 或 `https://cp.cloudflare.com/generate_204`，避免使用本身加载较重或经常受到区域限速的大型门户页面。" },
      { q: "使用光速云的 Clash 配置文件有哪些原生优势？", a: "光速云的下发配置在云端完成了精细化分流预设，原生整合了 流媒体专线组、AI 生产力专线组 与 港日低延迟组，策略组内置了毫秒级容灾探活，用户无需手动编码即可享受高可用架构。" }
    ],
    relatedArticlesTitle: "配置与分流技术进阶长文",
    relatedArticles: [
      { tag: "实操手册", title: "Clash Verge Rev 完整图文教程：从安装配置到 TUN 全局模式全攻略", desc: "在桌面软件中可视化应用高级配置与规则管理。", url: "/articles/article-49/" },
      { tag: "架构设计", title: "生产力断网零容忍：主备双机场冷热自动容灾架构手把手搭建", desc: "利用 fallback 策略组搭建跨机场高可用集群。", url: "/articles/article-99/" },
      { tag: "排错指南", title: "退出代理后电脑微信、百度打不开？一键清理注册表代理残留脚本", desc: "修复系统代理残留与配置冲突导致的网络异常。", url: "/articles/article-70/" }
    ]
  },
  {
    categoryKey: "tutorials",
    categoryName: "使用教程",
    parentHubName: "使用教程",
    parentHubUrl: "/tutorials/",
    subSlug: "routing-rules",
    title: "分流规则设置指南：国内直连与海外代理的智能网络分流实战",
    description: "全面解决科学上网时‘微信掉线、淘宝定位错乱、百度变慢’的痛点。详解 DOMAIN-SUFFIX、GEOIP、IP-CIDR 分流语法与广告过滤规则集配置。",
    heroBadge: "智能无感分流 · 国内外互不干扰",
    h1: "分流规则设置指南：国内直连与海外代理智能分流实战",
    subDesc: "好的科学上网体验应当是“润物细无声”的——国内服务走极速千兆直连，海外受限服务自动走专线代理。本文带您搭建丝滑的分流规则体系。",
    answerFirstTitle: "分流核心哲学 (Verdict)",
    answerFirstText: `<p><strong>科学上网严禁全天候开启“全局代理（Global）”模式</strong>！正确的姿势是开启<strong>“规则分流（Rule）”</strong>，通过精确配置国内域名与 GeoIP 白名单，让国内的微信、钉钉、网银及视频直连本地宽带，海外的 Google、ChatGPT、YouTube 自动走专线代理，做到速度拉满、内外互不干扰。</p>`,
    section1Title: "一、 规则引擎匹配哲学：短路求值与优先级黄金阶梯",
    section1Content: `<p>要想构建一套条理清晰且高效的分流规则系统，必须牢记代理内核的核心匹配机制：<strong>“自上而下匹配，一旦命中立即短路退出（Short-Circuit Evaluation）”</strong>。如果一条过于宽泛的规则被摆在最上方，排在它后面的所有精细化规则都将彻底失效。</p>
<div class="p-5 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs my-4 space-y-2 border border-slate-800">
  <div class="text-emerald-400 font-bold mb-2">【分流规则执行优先级自顶向下阶梯】</div>
  <div>1. [最高优先级] 本地与局域网直连 (IP-CIDR, 192.168.0.0/16, DIRECT, no-resolve)</div>
  <div>2. [专用业务精准分流] AI 服务与流媒体 (RULE-SET, openai, OpenAI策略组)</div>
  <div>3. [广告与恶意域名阻断] 广告过滤 (RULE-SET, reject, REJECT)</div>
  <div>4. [国内域名白名单] 国内主流网站直连 (GEOSITE, cn, DIRECT)</div>
  <div>5. [国内 IP 地址库白名单] 国内 IP 直连 (GEOIP, CN, DIRECT, no-resolve)</div>
  <div>6. [最低优先级/兜底] 未匹配流量走海外代理或直连 (MATCH, PROXY 或 DIRECT)</div>
</div>
<p>特别需要强调 <code>no-resolve</code> 参数的极端重要性。在匹配 <code>IP-CIDR</code> 或 <code>GEOIP</code> 规则时加上 <code>no-resolve</code>，可以强制代理内核不对纯域名流量发起反向本地 DNS 解析，<strong>既大幅削减了 DNS 解析带来的延迟开销，又彻底杜绝了 DNS 污染与真实 IP 泄漏</strong>。</p>`,
    section2Title: "二、 告别微信慢与网银风控：高精度防漏分流方案构建",
    section2Content: `<p>许多用户经常遇到开启代理后“微信发图片缓慢”、“支付宝提示异地登录”或“国内打车软件定位飘到海外”的问题。这完全是由于分流规则覆盖不全、导致国内流量被误送至境外节点引起的：</p>
<ul class="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 my-3">
  <li><strong>精准放行国内通信巨头：</strong> 确保规则集中包含 <code>DOMAIN-SUFFIX,qq.com,DIRECT</code> 与 <code>DOMAIN-SUFFIX,wechat.com,DIRECT</code> 等规则，避免微信走代理导致聊天图片收发卡顿或异地多因子验证；</li>
  <li><strong>金融网银与证券直连保护：</strong> 银行 App（招行、工行等）与证券交易终端对访问 IP 变动极其敏感。通过引入专门的 <code>direct.list</code> 规则集，将所有银联、央行清算中心及各大银行域名强制绑定为 <code>DIRECT</code>；</li>
  <li><strong>解决 Steam / 战网游戏平台国区下载：</strong> 游戏平台的 CDN 服务器在国内拥有充沛的机房缓存。通过将 <code>steamcontent.com</code> 与 <code>battlenet.com.cn</code> 指定为直连，可以跑满本地千兆宽带下载，同时仅将商城与社区浏览流量分流至香港节点；</li>
  <li><strong>定期更新本地 GeoIP 数据库：</strong> 随着国内三大运营商新号段与云厂商 IP 的持续下发，必须定期让客户端更新本地的 <code>GeoIP.dat</code> 与 <code>GeoSite.dat</code> 数据库，防止新分配的国内 IP 被误当成海外地址。</li>
</ul>`,
    tableTitle: "常用分流规则语法特性与执行开销对照表",
    tableSubtitle: "内核规则执行效率与语法特性对比：",
    tableHeaders: ["规则类型", "语法示例", "匹配原理", "DNS 依赖性", "性能开销", "适用场景"],
    tableRows: [
      ["DOMAIN-SUFFIX", "DOMAIN-SUFFIX,google.com,Proxy", "域名后缀树查找", "无依赖 (直接比对字符串)", "极低 (首选)", "精准匹配海外大型服务"],
      ["GEOSITE", "GEOSITE,cn,DIRECT", "高效预编译域名集", "无依赖 (纯域名比对)", "极低", "大规模国内域名白名单"],
      ["GEOIP", "GEOIP,CN,DIRECT,no-resolve", "二叉树 IP 范围比对", "加 no-resolve 零依赖", "低", "数百万国内公网 IP 兜底"],
      ["DOMAIN-KEYWORD", "DOMAIN-KEYWORD,openai,AI", "全局字符串模糊搜索", "无依赖", "中等", "覆盖特定品牌的长尾子域名"],
      ["IP-CIDR", "IP-CIDR,192.168.0.0/16,DIRECT", "CIDR 子网掩码匹配", "需注意反向解析", "低", "局域网、内网穿透直连"]
    ],
    decisionTreeTitle: "分流场景选型决策树",
    decisionTreeScenarios: [
      { badge: "重度国内办公", title: "日常大量使用钉钉、腾讯会议与内网 OA", desc: "严格配置 GEOSITE,cn 与 GEOIP,CN 优先走 DIRECT 直连，保证视频会议画质不降级、局域网打印机随时可用。" },
      { badge: "科研与学术检索", title: "需要访问 Google Scholar 与各类英文学术论文", desc: "将 IEEE、Nature、arXiv 等学术域名加入代理组，并绑定香港或日本原生节点，避免论文检索频繁遭遇验证码。" },
      { badge: "跨境电商运营", title: "管理亚马逊店铺、Shopee 卖家后台", desc: "必须单独定制针对 Amazon 域名的固定节点策略，严禁加入 url-test 避免 IP 漂移导致店铺关联封禁。" }
    ],
    decisionRulesTitle: "分流规则编写五大守则：",
    decisionRules: [
      "永远将局域网网段（如 10.0.0.0/8、192.168.0.0/16）的 DIRECT 规则放在最顶端，防止局域网设备互访受阻；",
      "针对国内域名与 IP，务必附带 <code>no-resolve</code> 标志，杜绝不必要的本地 DNS 解析延迟；",
      "切勿把最终的 <code>MATCH</code> 兜底规则随意设为 PROXY，必须设为受控策略组或 DIRECT；",
      "尽量使用成熟维护的开源规则集（Rule-Providers），避免自己在本地手动维护数十万条琐碎规则；",
      "定期在浏览器中打开 <code>ipinfo.io</code> 与 <code>cip.cc</code>，分别测试海外与国内出站 IP，验证分流准确性。"
    ],
    brandShowcaseTitle: "分流预设完善、原生支持主流规则集的专线服务商",
    faqTitle: "分流规则高频技术疑问解答 (FAQ)",
    faqs: [
      { q: "为什么访问国内网站（如百度、淘宝）突然变慢或验证码频出？", a: "这 99% 是因为客户端误开成了“全局代理 (Global)”模式，导致所有本应直连的国内流量绕道海外机房再折返，延迟飙升且国内电商平台会将海外 IP 标记为可疑爬虫。请切换回“规则分流 (Rule)”模式。" },
      { q: "什么是 no-resolve 参数？为什么建议所有 IP 规则都加上它？", a: "默认情况下，当请求一个纯域名时，如果匹配到了 IP 规则，客户端必须先在本地解析出真实 IP 才能比对。这会导致未翻墙的 DNS 遭遇污染且消耗查询时间。加上 `no-resolve` 后，内核跳过本地解析，仅在流量直接是 IP 时才比对，大幅提升命中速度。" },
      { q: "如何给特定的软件（如特定的海外游戏）单独指定走某个代理节点？", a: "在支持进程匹配的客户端（如 Clash Verge Rev 开启 TUN 模式）中，可以使用 `PROCESS-NAME,game.exe,游戏策略组` 规则，将该进程的所有 TCP/UDP 流量强行指定至特定低延迟节点。" },
      { q: "国内规则库经常更新，我需要手动每次重新下载吗？", a: "不需要。只要在配置文件中使用 `rule-providers` 声明外部规则，并设置 `interval: 86400`，客户端会在后台每 24 小时自动静默拉取更新最新的域名库，完全无需人工干预。" },
      { q: "光速云的订阅自带哪些现成的分流策略组？", a: "光速云的专属订阅已预设了：国外媒体、国内媒体、AI 办公、学术科研、漏网之鱼 等多维智能分流组，开箱即用，无需用户编写任何一行代码即可享受丝滑的自动分流。" }
    ],
    relatedArticlesTitle: "分流与系统调优推荐长文",
    relatedArticles: [
      { tag: "排障自愈", title: "退出代理后电脑微信、百度打不开？一键清理注册表代理残留脚本", desc: "彻底清理系统代理注册表残留，恢复国内直连网络。", url: "/articles/article-70/" },
      { tag: "实操手册", title: "Clash Verge Rev 完整图文教程：从安装配置到 TUN 全局模式全攻略", desc: "详细掌握策略组与分流规则的可视化管理界面。", url: "/articles/article-49/" },
      { tag: "协议科普", title: "IEPL 国际以太网专线深度科普：二层物理光纤内网架构实测全解析", desc: "了解分流流量背后所依托的顶级跨境物理专线底座。", url: "/network/iepl/" }
    ]
  },
  {
    categoryKey: "tutorials",
    categoryName: "使用教程",
    parentHubName: "使用教程",
    parentHubUrl: "/tutorials/",
    subSlug: "tun-mode",
    title: "TUN 虚拟网卡模式完全指南：系统全局接管、游戏联机与防泄密实操",
    description: "全面讲解代理软件的终极形态——TUN 模式。剖析虚拟网络适配器接管所有 TCP/UDP 流量机理，解决 Git、命令行终端、游戏客户端不走代理与 WebRTC 真实 IP 泄漏问题。",
    heroBadge: "系统级全局接管 · 终极防泄漏",
    h1: "TUN 虚拟网卡模式完全指南：系统级全局接管与极客实战",
    subDesc: "配置了系统代理，但终端 Git 推送依然超时？Steam 商店打不开？开启 TUN 虚拟网卡，从操作系统网络协议栈层面实现透明全量接管。",
    answerFirstTitle: "TUN 模式核心评测结论 (Verdict)",
    answerFirstText: `<p><strong>常规系统代理仅对主动遵循系统代理设置的浏览器软件生效，而 TUN 模式通过在操作系统内核注册一块虚拟网卡，从第三层（网络层）透明拦截并接管计算机的全部 TCP/UDP 数据报文</strong>。对于开发者（Git、Docker、WSL2）、外服游戏玩家或追求 100% 杜绝 WebRTC 真实 IP 泄漏的隐私敏感用户，<strong>TUN 模式是必须开启的终极网络武器</strong>。</p>`,
    section1Title: "一、 虚拟网卡（TUN）工作机理：从三层协议栈接管全量报文",
    section1Content: `<p>要想明白 TUN 模式为何如此强悍，必须看清它与传统系统代理的本质技术鸿沟。普通的“系统代理”实际上只是修改了 Windows 注册表中的 <code>Internet Settings</code> 代理服务器地址。然而，大部分命令行工具（CMD、PowerShell、Git CLI）、Docker 容器以及大型 3D 游戏客户端根本<strong>不会去读取系统的代理设置</strong>，导致它们直接走公网直连而超时失败。</p>
<div class="p-5 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs my-4 space-y-2 border border-slate-800">
  <div class="text-emerald-400 font-bold mb-2">【传统系统代理 vs TUN 虚拟网卡数据流转对比】</div>
  <div>[传统系统代理]：</div>
  <div>  应用进程 ---> 检查是否遵循系统代理 -> (否) -> 直接公网发送 -> [被 GFW 拦截/超时]</div>
  <div>                                    -> (是: 浏览器) -> 发往本地 7890 端口 -> [代理成功]</div>
  <div>--------------------------------------------------------------------------------</div>
  <div>[TUN 虚拟网卡模式]：</div>
  <div>  应用进程 (任何软件/游戏/终端) ---> 发送操作系统底层 IP 数据报文</div>
  <div>    │</div>
  <div>    ▼ [操作系统内核网络栈] (默认路由表被重定向指向虚拟网卡)</div>
  <div>  [Wintun / Utun 虚拟网络适配器] (透明捕获 100% 进出报文，包括 TCP 与 UDP)</div>
  <div>    │</div>
  <div>    ▼ [代理核心 (Mihomo 内核)] (进行高效协议栈重组、Fake-IP 还原与规则分流)</div>
  <div>  [目标出口] ---> 国内流量回退物理网卡直连 / 海外流量加密走 IEPL 专线</div>
</div>
<p>在底层驱动方面，现代 Windows 平台优先采用由 WireGuard 团队研发的高性能 <strong>Wintun 驱动</strong>，比陈旧的 TAP 虚拟网卡在吞吐性能上提升数倍，单线程轻松跑满千兆带宽且 CPU 占用率极低。</p>`,
    section2Title: "二、 常见开发与游戏痛点治理：Git、WSL2、Docker 与外服联机",
    section2Content: `<p>开启 TUN 模式后，您将获得近乎“软路由”级别的全局透明代理体验，彻底解决各类底层网络顽疾：</p>
<ul class="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 my-3">
  <li><strong>终端命令行与 Git Clone 零配置提速：</strong> 无需再手动在命令行输入繁杂的 <code>git config --global http.proxy</code> 或 <code>set http_proxy</code>，终端内所有 <code>curl</code>、<code>npm install</code>、<code>pip</code>、<code>git clone</code> 流量全自动透明加速；</li>
  <li><strong>WSL2 虚拟子系统无缝联网：</strong> 微软 WSL2 默认采用虚拟交换机隔离架构，与宿主机代理隔离。开启 TUN 模式配合 WSL2 的镜像网络模式（Mirrored Networking），子系统 Linux 内部无需任何配置即可直接翻墙；</li>
  <li><strong>外服联机游戏 UDP 数据包转发与 FullCone NAT：</strong> 传统代理无法转发 UDP 协议，导致外服游戏根本无法连接。TUN 模式原生接管 UDP 报文，配合 Clash Verge Rev 的 FullCone 特性，能将游戏 NAT 类型提升至全锥形开放状态，大幅降低联机延迟；</li>
  <li><strong>杜绝 WebRTC 真实 IP 泄漏：</strong> 浏览器在进行音频/视频通信时，WebRTC 协议常常绕过系统代理直接探测本地真实公网 IP。TUN 模式从网卡层进行全局封堵，杜绝任何真实 IP 泄漏。</li>
</ul>`,
    tableTitle: "传统系统代理 vs TUN 虚拟网卡模式全方位能力指标对照表",
    tableSubtitle: "两大代理运行模式核心能力全维度深度横评：",
    tableHeaders: ["评估指标", "传统系统代理 (System Proxy)", "TUN 虚拟网卡模式 (TUN Mode)", "优势模式"],
    tableRows: [
      ["接管流量层级", "应用层 (Layer 7 HTTP/SOCKS)", "网络层 (Layer 3 IP 报文)", "TUN 模式完全胜出"],
      ["软件兼容性", "仅限遵循代理设置的浏览器/特定软件", "操作系统内所有软件、进程与系统服务 100% 接管", "TUN 模式完全胜出"],
      ["UDP 协议支持", "不支持 (无法支持游戏、VoIP 语音)", "原生完全支持 UDP 转发与 FullCone NAT", "TUN 模式完全胜出"],
      ["终端命令加速", "需手动设置环境变量方可生效", "零配置透明加速 (Git/Curl/NPM 秒连)", "TUN 模式完全胜出"],
      ["WebRTC 防漏能力", "容易发生真实公网 IP 旁路泄漏", "从网卡底层强行截获，100% 杜绝泄漏", "TUN 模式完全胜出"],
      ["系统权限要求", "仅需普通用户权限即可开启", "需管理员权限安装虚拟网卡内核驱动", "系统代理更轻量"]
    ],
    decisionTreeTitle: "TUN 模式应用场景与选型决策树",
    decisionTreeScenarios: [
      { badge: "开发者群体", title: "日常大量使用 Git、Docker 构建与 Python 依赖", desc: "强烈推荐常驻开启 TUN 模式，告别各类源镜像换源与终端代理报错，开发效率成倍提升。" },
      { badge: "游戏玩家", title: "畅玩 Steam 社区、Apex、外服暗黑与暴雪游戏", desc: "开启 TUN 模式后选择低延迟日本或香港 IEPL 专线，无需额外购买游戏加速器即可享受低 Ping 联机。" },
      { badge: "极简日常轻度用户", title: "仅在电脑上用 Chrome 查查资料、看 YouTube", desc: "保持默认的系统代理即可，无需安装底层驱动，运行轻量且对局域网打印机毫无干扰。" }
    ],
    decisionRulesTitle: "TUN 模式运行五大铁律：",
    decisionRules: [
      "在 Windows / Mac 安装 TUN 模式前，务必先以管理员权限安装好客户端内置的“服务模式（Service Mode）”；",
      "如果发现无法访问公司内部局域网共享或网络打印机，请在 TUN 设置中将内网网段添加至绕过列表（tun.ignore）；",
      "运行国内大型防作弊端游（如腾讯反作弊系统 ACE 或英雄联盟）时，若提示驱动拦截，可临时挂起 TUN 模式；",
      "推荐搭配具备低抖动、大带宽的 IEPL 企业专线（如光速云），以支撑全局接管带来的大流量突发；",
      "定期检查客户端版本更新，确保使用的是最新版 Wintun 驱动，保障网络吞吐最大化。"
    ],
    brandShowcaseTitle: "TUN 全局模式下跑满千兆带宽的专线品牌",
    faqTitle: "TUN 模式高频技术疑问解答 (FAQ)",
    faqs: [
      { q: "在 Clash Verge Rev 中开启 TUN 模式时报错提示服务模式未安装？", a: "TUN 模式需要在系统底层注册虚拟网络适配器，普通用户权限无法加载网卡驱动。请进入软件的“设置 (Settings)”菜单，找到“服务模式 (Service Mode)”，点击右侧的“安装 (Install)”并在系统弹出的 UAC 提示中点击“是”，安装成功显示绿色图标后即可无缝开启 TUN。" },
      { q: "开启 TUN 模式后电脑无法连接公司内网 NAS 或无线打印机？", a: "这是因为虚拟网卡将所有流量统一捕获了。解决方法非常简单：在 Clash 配置文件的 `tun:` 字段下，确保已添加内网私有地址段 `192.168.0.0/16`、`10.0.0.0/8` 与 `172.16.0.0/12` 到 `iproute2` 绕过规则中，内网通信就会直接走物理网卡。" },
      { q: "开启 TUN 模式会大幅度增加电脑的 CPU 占用和耗电吗？", a: "现代基于 Rust/Go 编译的内核以及 Wintun 驱动的效率极其优异。在日常打字、网页浏览时，CPU 占用率通常不足 0.5%；只有在发起数千兆大文件持续高速下载时才会有轻微 CPU 计算，对日常续航影响微乎其微。" },
      { q: "开启 TUN 模式后外服游戏还是连不上怎么回事？", a: "请检查两点：一是代理节点是否支持并开启了 UDP 转发（部分劣质机场为了省钱封禁了 UDP 协议）；二是分流规则中是否将游戏流量正确路由到了低延迟代理节点而非 DIRECT 直连。" },
      { q: "为什么光速云在 TUN 模式下的游戏体验特别好？", a: "光速云的全线节点均原生开放了 FullCone NAT 穿透，并且跨境段采用纯物理 IEPL 二层专线传输，端到端单程抖动低于 1.5ms，丢包率为 0%，在 TUN 接管下能为外服游戏提供比肩专业游戏加速器的丝滑表现。" }
    ],
    relatedArticlesTitle: "TUN 模式与系统进阶技术长文",
    relatedArticles: [
      { tag: "实操手册", title: "Clash Verge Rev 完整图文教程：从安装配置到 TUN 全局模式全攻略", desc: "手把手教您在 Windows 与 Mac 上安装服务模式与开启 TUN。", url: "/articles/article-49/" },
      { tag: "底层解密", title: "IEPL 国际以太网专线物理层拓扑大揭秘：二层物理光缆是如何过境的？", desc: "了解 TUN 模式下全量报文传输所依托的二层内网专线底座。", url: "/articles/article-82/" },
      { tag: "网络急救", title: "退出代理后电脑微信、百度打不开？一键清理注册表代理残留脚本", desc: "彻底解决虚拟网卡与代理设置残留引起的断网故障。", url: "/articles/article-70/" }
    ]
  },
  {
    categoryKey: "tutorials",
    categoryName: "使用教程",
    parentHubName: "使用教程",
    parentHubUrl: "/tutorials/",
    subSlug: "client-installation",
    title: "客户端安装指引：Windows、Mac、iOS、Android 零基础正版安装与避坑完全指南",
    description: "全面解决各平台代理客户端的下载、安装、签名信任与防钓鱼安全指引。针对小白用户提供清晰、规范、官方正版的安装路径。",
    heroBadge: "全平台正版安装 · 远离假冒木马",
    h1: "客户端安装指引：全平台零基础正版安全安装指南",
    subDesc: "在搜索引擎下载到了携带木马的假冒客户端？本文为您整理四大主流平台最权威、最干净的官方正版下载渠道、安全校验与安装避雷指南。",
    answerFirstTitle: "安装安全核心警示 (Verdict)",
    answerFirstText: `<p><strong>严禁在百度、360 等国内搜索引擎前排竞价广告中下载任何代理客户端安装包</strong>！这些广告包几乎全部被黑产团队捆绑了剪贴板劫持木马（专门监控并替换虚拟货币钱包地址）或挖矿程序。请务必通过<strong>官方 GitHub 开源仓库 Releases 页面</strong>或<strong>正规应用商店（美区 App Store / Google Play）</strong>下载经过 SHA256 校验的官方正版安装包。</p>`,
    section1Title: "一、 代理客户端开源生态与官方可信发行通道全景",
    section1Content: `<p>随着科学上网技术的成熟，代理客户端软件已全面演进为高度透明的开源项目。正规的客户端其源代码完全在 GitHub 上公开受全球数万开发者审查，具有极高的透明度和安全性。了解各大平台的旗舰开源项目与正确的发行通道至关重要：</p>
<div class="p-5 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs my-4 space-y-2 border border-slate-800">
  <div class="text-emerald-400 font-bold mb-2">【全平台官方正规发行通道导航】</div>
  <div>■ Windows / macOS / Linux 桌面平台：</div>
  <div>  - 核心旗舰：Clash Verge Rev (认准 GitHub: clash-verge-rev/clash-verge-rev)</div>
  <div>  - 特性：基于 Rust + Tauri 开发，内存占用仅 30MB，原生搭载最新 Mihomo 内核</div>
  <div>■ iOS / iPadOS 苹果移动平台：</div>
  <div>  - 唯一首选：Shadowrocket (俗称小火箭，认准美区/港区 App Store 正版，开发者 Shadow Launch Technology)</div>
  <div>  - 旗舰备选：Quantumult X / Loon / Stash</div>
  <div>■ Android 安卓平台：</div>
  <div>  - 简洁实用：v2rayNG (认准 GitHub: 2dust/v2rayNG)</div>
  <div>  - 跨平台现代 UI：FlClash (认准 GitHub: chen08209/FlClash)</div>
</div>
<p>在 GitHub 下载时，务必认准 <strong>Latest Release</strong> 标签，并核对仓库的 Star 数量（通常知名客户端 Star 数在数千到数万以上）。切勿下载任何陌生个人网盘、Telegram 闲聊群内转发的经过未知二次打包的 <code>.exe</code> 或 <code>.apk</code> 安装文件。</p>`,
    section2Title: "二、 操作系统安全防护与数字签名拦截排错实操",
    section2Content: `<p>由于代理软件的核心功能涉及网络底层流量重定向、虚拟网卡驱动安装与系统代理修改，各大操作系统的内置安全机制常常会弹出警告拦截。以下是官方正版软件在各平台的正常放行流程：</p>
<ul class="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 my-3">
  <li><strong>Windows SmartScreen 拦截提示“未知发布者”：</strong> 由于开源软件未向微软购买昂贵的企业 EV 代码签名证书，Windows Defender 会弹出蓝底警告窗。点击左侧的“更多信息 (More info)”，下方会出现“仍要运行 (Run anyway)”按钮，点击即可正常安装；</li>
  <li><strong>macOS 提示“已损坏，无法打开”或“开发者无法验证”：</strong> 苹果 macOS Gatekeeper 安全机制对未公证应用默认拦截。解决方法：打开“终端 (Terminal)”，输入 <code>sudo xattr -r -d com.apple.quarantine /Applications/Clash\ Verge\ Rev.app</code> 并回车输入开机密码，即可彻底解除隔离标志；</li>
  <li><strong>iOS 获取美区 App Store 账号技巧：</strong> 苹果国区应用商店早已将所有代理软件下架。用户只需在浏览器注册一个免信用卡绑定的美区 Apple ID，并在 App Store 退出当前账号后登录美区 ID，购买礼品卡充值后即可正规下载正版 Shadowrocket；</li>
  <li><strong>Android 报毒“包含高风险代码”：</strong> 部分国产深度定制系统（如华为鸿蒙、小米澎湃）会对翻墙类软件进行弹窗告警。只要确认 APK 来源于官方 GitHub Releases，选择“继续安装并允许所有网络权限”即可。</li>
</ul>`,
    tableTitle: "全平台客户端安装包规格与系统环境要求一览表",
    tableSubtitle: "主流客户端技术规格与运行环境对照：",
    tableHeaders: ["平台", "推荐软件", "内核引擎", "官方安装包格式", "最低系统版本", "系统架构支持", "安全校验方式"],
    tableRows: [
      ["Windows", "Clash Verge Rev", "Mihomo (Clash.Meta)", ".exe 安装包 / 免安装 .zip", "Windows 10 / 11 64位", "x64 / ARM64", "SHA256 散列值核对"],
      ["macOS", "Clash Verge Rev", "Mihomo (Clash.Meta)", ".dmg 镜像文件", "macOS 11.0 Big Sur 以上", "Intel x64 / Apple M系列", "去除隔离签名 (xattr)"],
      ["iOS", "Shadowrocket", "自研多协议引擎", "App Store 官方分发", "iOS 14.0 或更高版本", "ARM64", "苹果官方商店沙盒验证"],
      ["Android", "v2rayNG", "Xray-core", ".apk 安装包", "Android 8.0 以上", "armeabi-v7a / arm64-v8a", "APK 官方开发者证书验证"],
      ["Android", "FlClash", "Mihomo (Clash.Meta)", ".apk 安装包", "Android 7.0 以上", "全架构适配", "GitHub Release 签名"]
    ],
    decisionTreeTitle: "设备环境与客户端匹配决策树",
    decisionTreeScenarios: [
      { badge: "Windows 办公本", title: "日常办公追求省电低占用与简洁界面", desc: "毫不犹豫首选 Clash Verge Rev，基于 Tauri 架构打造，内存占用仅为老旧 Electron 客户端的十分之一。" },
      { badge: "新购苹果全家桶", title: "iPhone + Mac 联动跨国协同", desc: "手机端用 Shadowrocket，Mac 电脑安装 Clash Verge Rev，两端导入同一个光速云订阅，操作逻辑高度契合苹果生态。" },
      { badge: "极客与多协议测试", title: "需要测试 Sing-box、Hysteria2 等全新黑科技", desc: "可尝试 Sing-box 跨平台客户端，支持原生的最新协议解析，适合动手能力强的进阶玩家。" }
    ],
    decisionRulesTitle: "客户端下载与安装五大防坑铁律：",
    decisionRules: [
      "绝对不要在任何非官方 GitHub 页面、非官方 Telegram 频道下载被他人“精简/汉化/破解”的客户端安装包；",
      "绝不在任何所谓“绿色软件站”或中文搜索广告中下载所谓的“一键翻墙安装器”；",
      "切勿同意任何非必要的高危系统权限申请（如读取手机短信、读取通讯录、修改系统根证书）；",
      "正规代理软件仅需“虚拟网络适配器驱动”或“系统网络权限”，决不需要安装任何根 CA 证书；",
      "首次安装完成后，务必使用官网订阅测试连通性，并在设置中开启自动检查更新功能。"
    ],
    brandShowcaseTitle: "为各平台提供清晰安装指南与官方正版链接的专线品牌",
    faqTitle: "客户端安装高频技术疑问解答 (FAQ)",
    faqs: [
      { q: "为什么网上下载的 Clash 会被火绒或 360 拦截报毒？", a: "由于代理软件的核心行为包含“修改 Windows 系统网络代理”和“安装 Wintun 虚拟网卡驱动”，这与某些恶意木马劫持网络流量的行为在启发式分析中特征高度重合。只要您确认是从官方 GitHub 仓库下载的源码发布版，属于标准的误报行为，直接在杀软中添加信任即可。" },
      { q: "iOS 小火箭在国区 App Store 搜不到，淘宝买现成 Apple ID 安全吗？", a: "淘宝购买的共享 Apple ID 存在极高风险，很多账号会被恶意锁定并开启“查找我的 iPhone”进行敲诈。最安全稳妥的方法是自己在苹果官网花费 3 分钟免费注册一个属于自己的专属美区账号，全程无需绑定境外信用卡。" },
      { q: "Mac 电脑是 M 系列芯片（M1/M2/M3），应该下载哪个版本的安装包？", a: "在 GitHub Releases 下载页面中，文件名带有 `aarch64` 或 `arm64` 的是专门针对苹果 Apple Silicon（M 系列）芯片编译的原生架构版本；带有 `x64` 的则是老款 Intel 芯片版本。下载原生 arm64 版本运行效率最高、耗电最低。" },
      { q: "老版 Clash for Windows（CFW）还能继续用吗？为什么推荐换 Verge？", a: "CFW 开发者早在 2023 年底已停止维护并删库，其内置的 Clash 内核不再支持诸如 Reality、Hysteria2、AnyTLS 等最新的现代抗封锁协议，且旧版 Electron 存在潜在安全漏洞。全面迁移到活跃维护的 Clash Verge Rev 是目前整个行业的主流共识。" },
      { q: "光速云后台提供的客户端下载安全吗？", a: "完全安全。光速云后台用户中心收录的客户端均为官方 GitHub Releases 的原版分流镜像，未经任何二次篡改或反编译，方便国内无法直连 GitHub 的用户一键极速下载正版软件。" }
    ],
    relatedArticlesTitle: "客户端与使用教程深度推荐长文",
    relatedArticles: [
      { tag: "实操手册", title: "Clash Verge Rev 完整图文教程：从安装配置到 TUN 全局模式全攻略", desc: "最详尽的桌面端客户端安装与实操图文指南。", url: "/articles/article-49/" },
      { tag: "选型指南", title: "2026主流跨平台客户端横评：Clash Verge Rev vs v2rayN vs Sing-box 谁才是日常主力？", desc: "全方位对比主流客户端的内核性能与内存开销。", url: "/clients/clash-verge/" },
      { tag: "新手必读", title: "2026年新手翻墙科学上网终极防坑指南：从零认识代理、协议与机场", desc: "零基础了解科学上网全链路工具链与防坑指南。", url: "/articles/article-1/" }
    ]
  }
];
