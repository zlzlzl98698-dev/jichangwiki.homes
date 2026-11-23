// scripts/pages_troubleshooting.js
// Industrial-grade, encyclopedic content for all 5 Troubleshooting pages

export const troubleshootingPages = [
  {
    categoryKey: "troubleshooting",
    categoryName: "故障排查",
    parentHubName: "故障排查",
    parentHubUrl: "/troubleshooting/",
    subSlug: "timeout",
    title: "节点超时与全红排查指南：从系统时间同步到防重放机制五步自愈实战",
    description: "全面解决科学上网客户端节点测速全部显示 Timeout、0kb/s 或一片通红的诡异故障。深入剖析系统时钟偏差大于 90 秒导致的握手拒绝、节点端口封锁与本地杀软拦截。",
    heroBadge: "全红急救手册 · 五步自愈法",
    h1: "节点超时与全红排查指南：五步极速自愈完全手册",
    subDesc: "明明网络正常，节点测速却全红一片超时？别慌！90% 的全红故障并非机场跑路，而是您电脑系统时间偏差超标触发了现代协议的防重放安全机制。本文带您五步秒恢复。",
    answerFirstTitle: "节点全红核心直接答案 (Verdict)",
    answerFirstText: `<p>节点测速全红时，<strong>第一件事必须立刻同步电脑系统时间（Windows: 右键任务栏时间 -> 调整日期和时间 -> 立即同步；Mac: 系统设置 -> 通用 -> 日期与时间）</strong>！现代加密协议（VMess/VLESS/TLS 1.3）为了防止黑客攻击，在时间偏差超过 <strong>90 秒</strong> 时会 100% 拒绝建立连接。第二件事检查本地 7890 端口是否冲突，第三件事在机场后台核查套餐流量是否耗尽。</p>`,
    section1Title: "一、 为什么系统时间偏差会导致节点‘全线全死’？协议防重放机制深度解密",
    section1Content: `<p>许多用户遇到所有节点同时超时时，第一反应是“机场被墙了”或“机场跑路了”，然而这其中高达 90% 的案例属于本地系统层面的时间脱轨。要想真正理解这一现象，必须从现代代理加密协议的安全架构切入：</p>
<p>在网络安全领域，<strong>“重放攻击（Replay Attack）”</strong>是指黑客即便无法解密您的加密流量包，也可以将截获到的合法认证数据包原封不动地重新发送给服务器，以此骗取服务端的信任并劫持连接。为了从根本上杜绝重放攻击，<strong>VMess 协议、Shadowsocks-2022 以及 TLS 1.3 握手协议均在报文认证头中强制嵌入了 UTC Unix 时间戳</strong>。</p>
<div class="p-5 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs my-4 space-y-2 border border-slate-800">
  <div class="text-emerald-400 font-bold mb-2">【协议时间防重放校验失败流程图】</div>
  <div>[本地电脑发起握手] (携带本地时间戳: T_local = 2026-11-23 00:00:00)</div>
  <div>  │  (数据包通过网络跨国传输至机房)</div>
  <div>  ▼</div>
  <div>[远程专线服务器] (读取标准国家授时时间: T_server = 2026-11-23 00:02:15)</div>
  <div>  │  (计算绝对时间差: |T_server - T_local| = 135 秒 > 预设阈值 90 秒)</div>
  <div>  ▼</div>
  <div>[安全机制触发: 疑似重放攻击!] ---> (服务器静默丢弃数据包，拒绝完成三次握手)</div>
  <div>  │</div>
  <div>  ▼</div>
  <div>[客户端界面表现] ---> [所有节点测速瞬间变红，全线显示 Timeout 或 0ms / 无法连接]</div>
</div>
<p>特别是台式机主板上的 <strong>CR2032 纽扣电池</strong>老化电量耗尽、或者双系统切换（Windows 与 Ubuntu 默认硬件时钟采用不同标准）时，电脑重启后时间极易落后数分钟甚至数年，导致客户端全线报废。</p>`,
    section2Title: "二、 节点全红五步自愈标准作业程序（SOP）",
    section2Content: `<p>面对节点大面积超时，请严格按照以下标准排查链路，通常在 2 分钟内即可精准定位并恢复网络：</p>
<ul class="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 my-3">
  <li><strong>第一步：强制校准操作系统时钟：</strong> 进入 Windows 设置 -> 日期和时间 -> 确保打开“自动设置时间” -> 点击“立即同步”。若提示同步失败，可将时间服务器更改为国家授时中心地址 <code>ntp.aliyun.com</code> 或 <code>cn.pool.ntp.org</code>；</li>
  <li><strong>第二步：验证物理公网连通性：</strong> 临时关闭客户端的系统代理开关，在浏览器中尝试打开国内网页（如 <code>baidu.com</code>）或在命令行执行 <code>ping 223.5.5.5</code>。如果国内网络本身断网（如光猫断连、路由器欠费），需先解决物理宽带问题；</li>
  <li><strong>第三步：核查代理本地端口占用：</strong> 打开终端输入 <code>netstat -ano | findstr 7890</code>，检查 7890/7891 端口是否被迅雷、虚拟机或残留的旧版 Clash 进程占死。若有冲突，在客户端设置中将端口修改为 <code>17890</code> 并重启软件；</li>
  <li><strong>第四步：登录机场后台核验套餐资产：</strong> 打开机场官网（如光速云），查看用户中心的套餐状态。确认剩余流量是否已被大文件下载耗尽，或套餐是否已到期欠费；</li>
  <li><strong>第五步：刷新本地 DNS 缓存并更新订阅：</strong> 在终端运行 <code>ipconfig /flushdns</code> 清除被污染的 DNS 缓存，随后在客户端订阅列表右键点击“更新”，重新拉取最新的机房入驻节点列表。</li>
</ul>`,
    tableTitle: "节点超时故障排查决策矩阵表",
    tableSubtitle: "高频超时诱因、技术判定与应急策略：",
    tableHeaders: ["故障现象与特征", "底层核心诱因", "故障所属层级", "自愈排查 SOP", "自愈成功率", "平均修复耗时"],
    tableRows: [
      ["所有节点毫无例外全部显示 Timeout", "本地系统时间偏差 > 90 秒", "操作系统时钟层", "设置 -> 日期与时间 -> 立即同步", "90% 瞬间自愈", "30 秒"],
      ["仅部分特定国家节点显示红字超时", "该地区海外机房维护或海底光缆中断", "海外落地机房层", "切换至同机场其他可用国家节点", "100% 绕过", "5 秒"],
      ["更新订阅成功，但节点测速全为 0kb/s", "本地防火墙/杀毒软件拦截了内核", "本地系统安全层", "在杀毒软件中添加代理内核为白名单信任", "85% 解决", "1 分钟"],
      ["节点显示有绿色低延迟，但网页打不开", "DNS 污染或 Fake-IP 虚拟网卡缓存冲突", "DNS 解析与网络层", "运行 ipconfig /flushdns 并重启客户端", "90% 解决", "45 秒"],
      ["月初第一天突然所有节点不可用", "套餐流量重置周期或上月额度耗尽", "账户计费层", "登录官网核实流量额度，必要时续费重置", "100% 解决", "2 分钟"]
    ],
    decisionTreeTitle: "全红急救场景选型决策树",
    decisionTreeScenarios: [
      { badge: "主板电池故障", title: "每次电脑开机时间都会倒退回几年前", desc: "说明主板 CR2032 纽扣电池已彻底没电，断电后 CMOS 掉电。必须更换新电池，或设置开机自动静默运行 NTP 时间同步脚本。" },
      { badge: "敏感时期风浪", title: "公网直连节点全死，群里都在反馈卡顿", desc: "普通中转已被阻断。此时应优先切换到专线机场（如光速云）的 IEPL/IPLC 物理内网节点，彻底免疫公网风浪。" },
      { badge: "校园网/公司内网", title: "连接宿舍或公司 WiFi 后全部节点超时", desc: "网络管理员封锁了常见代理端口。在客户端开启 TUN 模式，并优先选择使用 443 伪装端口的 Reality 或 Trojan 节点。" }
    ],
    decisionRulesTitle: "超时排障五大黄金守则：",
    decisionRules: [
      "测速全红切忌盲目疯狂狂点测速，高频测速会触发机房的防 CC 机制导致临时封禁 IP；",
      "先看电脑右下角时间，精确到秒，确保与手机北京时间完全一致；",
      "绝不要在遇到故障时立刻将客户端卸载重装，重装并不能解决时间偏差与端口冲突；",
      "常备一条不同线路架构的应急订阅，防止单服务商临时检修时陷入断网孤岛；",
      "养成每月检查套餐剩余流量的习惯，避免在关键会议时突然因流量耗尽掉线。"
    ],
    brandShowcaseTitle: "具备多重冗余入口、全天候高可用不超时的专线品牌",
    faqTitle: "节点超时高频技术疑问解答 (FAQ)",
    faqs: [
      { q: "手机上同一个订阅一切正常，电脑上测速全超时？", a: "这 100% 证实了机场服务器是完全健康的！故障完全出在电脑本地端：第一检查电脑系统时间是否准确；第二检查电脑后台是否有 360、火绒或公司安全监控软件拦截了代理内核的网络进出权限。" },
      { q: "为什么测速显示的延迟忽高忽低，有时候 50ms 有时候 2000ms？", a: "这通常是由于客户端测速并发线程过高引起的瞬时拥堵。Clash 测速默认会同时并发探测几十个节点，本地路由器 CPU 或 Wi-Fi 带宽瞬间被占满。建议在安静状态下单测主力节点，以真实网页打开速度为准。" },
      { q: "系统时间同步总是提示“无法与时间服务器同步”怎么办？", a: "这是因为 Windows 默认的 `time.windows.com` 服务器在海外，国内访问经常丢包。在控制面板的“Internet 时间”设置中，将服务器手动修改为国内的 `ntp.aliyun.com`（阿里云授时）或 `cn.ntp.org.cn`，即可秒级同步成功。" },
      { q: "节点超时显示为 -1 或者 EOF 是什么意思？", a: "EOF 代表 End of File（连接意外被对端关闭）。这通常意味着数据包已经到达了入口机房，但在跨境转发阶段由于机房维护、或者您的客户端握手协议版本与服务端不匹配导致握手直接中断。更新订阅通常可解决。" },
      { q: "光速云的节点出现超时的情况多吗？如何保障高可用？", a: "光速云采用深圳、上海、广州多地 BGP 入口与 IEPL 跨国内网专线架构，每个地区均部署了多套冗余机房和自动熔断切换机制。即便某条海缆突发故障，系统可在 3 秒内将流量无感漂移到备用线路，全年可用性达 99.99%。" }
    ],
    relatedArticlesTitle: "深度排障与网络修复长文推荐",
    relatedArticles: [
      { tag: "深度排障", title: "节点测速全红全超时？电脑系统时间同步与防重放机制急救排查", desc: "万字长文深入剖析时间偏差防重放原理与批处理修复脚本。", url: "/articles/article-67/" },
      { tag: "网络自愈", title: "退出代理后电脑微信、百度打不开？一键清理注册表代理残留脚本", desc: "解决代理软件异常关闭导致的网络全局断网问题。", url: "/articles/article-70/" },
      { tag: "高可用架构", title: "生产力断网零容忍：主备双机场冷热自动容灾架构手把手搭建", desc: "配置双机场自动降级与健康检查策略。", url: "/articles/article-99/" }
    ]
  },
  {
    categoryKey: "troubleshooting",
    categoryName: "故障排查",
    parentHubName: "故障排查",
    parentHubUrl: "/troubleshooting/",
    subSlug: "subscription-failed",
    title: "订阅更新失败排查指南：DNS 污染、WAF 拦截与 Token 失效四步恢复",
    description: "全面解决代理客户端提示‘Failed to fetch subscription’、403 Forbidden 或下载超时的故障。剖析订阅域名被 ISP 污染、机场防刷防火墙拦截及鉴权令牌过期的根因。",
    heroBadge: "订阅拉取急救 · 四步排错法则",
    h1: "订阅更新失败排查指南：DNS 污染与 WAF 拦截四步自愈",
    subDesc: "点击更新订阅却弹出一长串红字报错？本文系统拆解订阅下发链路上四大常见卡点，教您利用应急方案秒拉最新节点。",
    answerFirstTitle: "订阅更新失败核心结论 (Verdict)",
    answerFirstText: `<p>订阅拉取报错（如 403 Forbidden 或 Timeout）时，<strong>第一应急操作是用手机连接个人热点（移动/联通网络）再次点击更新</strong>。大部分订阅失败是因为您当前宽带的本地 DNS 将机场订阅分发域名污染阻断；若依然报错，请登录机场后台确认套餐是否欠费，并点击“重置订阅链接”以重新生成鉴权 Token。</p>`,
    section1Title: "一、 订阅更新失败的技术归因：DNS 污染、WAF 拦截与 Token 失效",
    section1Content: `<p>客户端更新订阅是一次标准的 HTTP/HTTPS API 交互过程。该链路横跨本地网络、DNS 递归解析、跨境公网与机场边缘云防御体系，任何一个环节受阻都会导致拉取中断：</p>
<div class="p-5 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs my-4 space-y-2 border border-slate-800">
  <div class="text-emerald-400 font-bold mb-2">【订阅下发链路各环节阻断诱因全景】</div>
  <div>1. 本地 DNS 解析阶段：本地运营商 DNS 将机场订阅域名解析为 127.0.0.1 或不可达 IP (DNS污染)</div>
  <div>2. TLS 握手阶段：客户端本地证书库陈旧或缺少根 CA，提示 x509: certificate signed by unknown authority</div>
  <div>3. 边缘 WAF 防护阶段：Cloudflare 或自建高防将客户端的特定 User-Agent 标记为黑产爬虫，返回 403 Forbidden</div>
  <div>4. 业务鉴权阶段：用户在官网修改密码导致旧 Token 自动失效，或套餐流量超标，返回 401 Unauthorized</div>
</div>
<p>明确具体的错误代码和报错信息，是精准施策的第一步，切忌毫无头绪地来回重装客户端软件。</p>`,
    section2Title: "二、 订阅拉取失败四大应急恢复方案",
    section2Content: `<p>当常规更新持续受阻时，可以按照以下四大应急手段逐一突破：</p>
<ul class="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 my-3">
  <li><strong>方案一：临时挂靠现有节点更新订阅（自举更新）：</strong> 如果客户端里还有个别尚能连通的旧节点，先选中该节点并开启系统代理，随后在订阅设置中勾选“通过代理更新订阅”后再次点击拉取；</li>
  <li><strong>方案二：切换网络出口环境绕过 DNS 污染：</strong> 将电脑连接至手机 4G/5G 热点。手机移动通信蜂窝网络的 DNS 策略通常比家用宽带或校园网更为开放，能瞬间解析出订阅服务器的真实 IP；</li>
  <li><strong>方案三：在机场后台重置鉴权 Token：</strong> 登录机场官网用户中心，点击“重置订阅”，旧链接作废的同时系统会生成全新字符串。复制全新链接替换客户端中的旧 URL 即可解除鉴权失效；</li>
  <li><strong>方案四：手动下载配置文件本地离线导入：</strong> 将订阅链接直接复制到浏览器地址栏中按回车。如果浏览器能下载出一个 <code>.yaml</code> 文件，直接在客户端中选择“本地文件导入 (Import Local File)”，完全跳过在线拉取环节。</li>
</ul>`,
    tableTitle: "订阅更新报错代码与处置方案速查表",
    tableSubtitle: "高频报错类型深度拆解与对策：",
    tableHeaders: ["报错代码 / 现象", "底层技术机理", "影响范围", "即时处置方案", "彻底防范措施"],
    tableRows: [
      ["403 Forbidden", "触发机场边缘 WAF 防火墙防刷规则", "特定客户端 UA", "联系客服加白或临时使用浏览器下载配置", "选择防护策略友好的大型机场"],
      ["401 Unauthorized", "订阅 Token 已经过期或被后台重置", "该订阅全部设备", "登录官网重新复制最新订阅 URL", "定期检查个人中心账号状态"],
      ["x509: cert expired / unknown authority", "系统根证书缺失或本地时间严重脱轨", "本地系统层", "校准系统时间，客户端开启“跳过证书验证”", "更新操作系统并安装最新根证书"],
      ["Connection Timeout / EOF", "订阅下发域名被本地运营商 DNS 污染", "特定家用宽带/校园网", "切换手机移动热点，或使用公共 DNS (223.5.5.5)", "使用机场提供的备用免翻订阅分发域名"],
      ["Empty content / Null", "机场后端节点服务器暂时离线更新", "全网用户", "等待 5~10 分钟或查看官方公告群通知", "选择具备双活调度能力的高端机场"]
    ],
    decisionTreeTitle: "订阅排障场景决策树",
    decisionTreeScenarios: [
      { badge: "敏感时期风浪", title: "原有订阅域名全部无法连接", desc: "登录机场官网寻找“备用防封订阅域名”或加入 Telegram 官方公告频道获取最新紧急订阅更新发布源。" },
      { badge: "新购套餐用户", title: "刚买完套餐导入就提示下载失败", desc: "确认支付订单是否已经成功走完入账流程（部分虚拟货币或第三方支付有数分钟确认延迟）。" },
      { badge: "多客户端用户", title: "Clash 报错但小火箭能够更新", desc: "说明是特定客户端的 User-Agent 被规则拦截，可在客户端高级设置中自定义 UA 为 `ClashMeta` 或通用浏览器标识。" }
    ],
    decisionRulesTitle: "订阅维护五大军规：",
    decisionRules: [
      "不要在短时间内疯狂连续点击更新按钮，极易被防火墙自动封禁 IP 24 小时；",
      "定期登录官网查看是否有关于订阅域名变更的全局系统公告；",
      "保存一份可用的本地离线 YAML 配置文件作为极端情况下的断网急救盘；",
      "绝不使用来路不明的公共订阅转换工具，保护个人 Token 隐私；",
      "订阅更新成功后，立即发起单次节点测速检验有效性。"
    ],
    brandShowcaseTitle: "具备全球 CDN 多地冗余分发、订阅高可用的专线品牌",
    faqTitle: "订阅更新高频技术疑问解答 (FAQ)",
    faqs: [
      { q: "为什么在浏览器里能打开订阅链接，但在 Clash 里却提示更新失败？", a: "浏览器发起请求时携带的是标准的浏览器请求头（带有 Cookie、Accept 等丰富标识），而某些代理客户端发起的是极简的命令行 HTTP 请求。部分云防护 WAF 会将此类请求判定为恶意爬虫并阻断。解决方法是在客户端设置中开启“通过代理更新”或自定义请求头。" },
      { q: "使用公开的在线“订阅转换平台”安全吗？", a: "存在很大安全隐患！当您将订阅链接提交给第三方的订阅转换网站时，网站后台所有者可以轻易在日志中抓取您的真实 Token，进而盗刷您的流量甚至分析您的访问去向。推荐优先使用光速云等原生提供一键客户端下发的大型品牌。" },
      { q: "订阅更新后，原来收藏的节点或自定义策略组会被冲掉吗？", a: "在 Clash Verge Rev 中，如果您使用的是“订阅配置 (Remote Profile)”，每次在线更新确实会覆盖本地对该文件的修改。如果您需要保留自定义分流规则，应使用“扩展配置 (Merge/Script)”功能，将个人规则注入到订阅中，这样无论订阅如何更新，个人规则永远生效。" },
      { q: "为什么提示“订阅内容为空”？", a: "这通常是因为您的套餐账户已欠费停机，或者机场管理员在后台进行节点集群切割割接。登录机场官网控制台核验套餐剩余流量与有效期即可明确原因。" },
      { q: "光速云的订阅分发具备哪些技术优势？", a: "光速云在全球部署了由 Cloudflare Enterprise 与多地 Anycast AnyCDN 构成的多活分发网络，具备自动抵抗 DNS 污染、智能识别客户端 UA、自适应下发 Clash/Sing-box 格式配置的能力，订阅拉取成功率保持在 99.9% 以上。" }
    ],
    relatedArticlesTitle: "订阅与排障深度推荐长文",
    relatedArticles: [
      { tag: "排障自愈", title: "节点测速全红全超时？电脑系统时间同步与防重放机制急救排查", desc: "系统级自愈时间与网络连接问题。", url: "/articles/article-67/" },
      { tag: "实操手册", title: "Clash Verge Rev 完整图文教程：从安装配置到 TUN 全局模式全攻略", desc: "掌握配置导入与扩展配置注入实战。", url: "/articles/article-49/" },
      { tag: "防坑指南", title: "机场跑路五大经典预警征兆：看懂骨折促销背后的资金断裂陷阱", desc: "识别异常无法拉取订阅背后的服务商跑路风险。", url: "/articles/article-97/" }
    ]
  },
  {
    categoryKey: "troubleshooting",
    categoryName: "故障排查",
    parentHubName: "故障排查",
    parentHubUrl: "/troubleshooting/",
    subSlug: "connection-failed",
    title: "连接成功但无法上网排查指南：DNS 污染、代理死锁与注册表残留自愈",
    description: "全面解决代理软件显示连接成功且测速延迟正常，但浏览器提示‘无法连接到互联网’或微信断线的疑难杂症。详解系统代理死锁、注册表残留、Fake-IP 映射失效与 TUN 驱动冲突修复。",
    heroBadge: "断网急救完全手册 · 代理死锁自愈",
    h1: "连接成功但无法上网排查指南：代理死锁与网络重置完全实战",
    subDesc: "节点测速一片绿，延迟低至 40ms，但打开网页却转圈报错？本文深入剖析代理死锁机制，教您用三条命令快速自愈断网顽疾。",
    answerFirstTitle: "连通无法上网核心结论 (Verdict)",
    answerFirstText: `<p>节点测速有延迟但打不开网页，<strong>95% 是由于系统代理注册表端口残留（如软件异常崩溃导致 127.0.0.1:7890 无法被注销）或 DNS 死锁（Fake-IP 无法回源解析）引起</strong>。第一自愈动作：在客户端中彻底关闭系统代理开关，然后在 CMD 终端运行 <code>ipconfig /flushdns</code>；若仍无法打开，运行系统代理清理脚本即可瞬间复原。</p>`,
    section1Title: "一、 连上节点但网页打不开：DNS 污染与代理死锁（Proxy Deadlock）",
    section1Content: `<p>许多用户经常遇到这种极其困惑的现象：客户端里的节点测速显示 <code>45ms (绿色)</code>，证明本地到远程机房的 TCP 连通性完全正常，但打开 Chrome 却弹出 <code>ERR_PROXY_CONNECTION_FAILED</code> 或 <code>ERR_NAME_NOT_RESOLVED</code>。这背后的核心技术瓶颈通常由以下三大深层机制引发：</p>
<div class="p-5 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs my-4 space-y-2 border border-slate-800">
  <div class="text-emerald-400 font-bold mb-2">【代理死锁与流量死循环示意】</div>
  <div>[浏览器请求: google.com]</div>
  <div>  │  (发往本地系统代理 127.0.0.1:7890)</div>
  <div>  ▼</div>
  <div>[代理内核 (Clash)] 需要知道 google.com 的真实 IP 才能建立底层连接</div>
  <div>  │  (内核向海外上游 DNS 发起查询请求)</div>
  <div>  ▼</div>
  <div>[规则引擎死循环 (Proxy Deadlock)]</div>
  <div>  ★ 致命点：如果上游 DNS 查询请求本身也被分流规则判定为“需要走代理”，</div>
  <div>     但代理节点此刻正处于握手解析等待中 —— 形成了“需要代理才能查 DNS，但查不到 DNS 就无法建代理”的死锁！</div>
  <div>  ▼</div>
  <div>[结果] 浏览器等待 30 秒超时，弹出无法连接到互联网。</div>
</div>
<p>此外，非正常关机、软件强制闪退或杀毒软件强杀进程，会导致 Windows 系统的注册表代理开关保持在“开”状态，而本地监听端口早已关闭，造成全局断网。</p>`,
    section2Title: "二、 连通不断流：网络协议栈彻底重置与排障四步法",
    section2Content: `<p>面对“测速正常却打不开网页”的僵局，请执行以下四步彻底复位：</p>
<ul class="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 my-3">
  <li><strong>第一步：清除系统注册表代理残留（一键归零）：</strong> 打开“Windows 设置 -> 网络和 Internet -> 代理”，确保“使用代理服务器”开关处于<strong>关闭</strong>状态；或在管理员 CMD 运行注册表清理命令：<code>reg delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyServer /f</code>；</li>
  <li><strong>第二步：刷新 DNS 缓存并释放 DHCP 租约：</strong> 在命令提示符中依次输入：<code>ipconfig /flushdns</code>（清空 DNS 污染缓存）并按回车，随后输入 <code>ipconfig /renew</code> 重新从路由器获取正确的网关与 DNS 配置；</li>
  <li><strong>第三步：核查 Fake-IP 映射与直连规则：</strong> 检查客户端的模式是否被误设为了 <code>Global（全局）</code>。切换为 <code>Rule（规则）</code> 模式，确保国内流量走 DIRECT，防止国内域名在海外 DNS 超时；</li>
  <li><strong>第四步：重置底层 Winsock 网络协议栈：</strong> 若系统曾安装过多种虚拟网卡或加速器（如迅游、UU），底层网络套接字可能遭到钩子破坏。在管理员终端运行 <code>netsh winsock reset</code> 并重启计算机，彻底恢复网络驱动纯净状态。</li>
</ul>`,
    tableTitle: "测速正常却无法上网常见原因与排错对照表",
    tableSubtitle: "表象特征与底层修复对策：",
    tableHeaders: ["异常表象", "核心判定原因", "诊断测试手段", "针对性修复方案", "恢复耗时"],
    tableRows: [
      ["Chrome 报错 ERR_PROXY_CONNECTION_FAILED", "系统代理指向的端口无进程监听（旧端口残留）", "查看 Windows 代理设置中填写的端口", "关闭系统代理开关，重启客户端重新接管", "30 秒"],
      ["报错 ERR_NAME_NOT_RESOLVED", "上游 DNS 无法解析，Fake-IP 映射断裂", "在终端执行 ping 223.5.5.5 测试纯 IP", "修改配置文件 nameserver 为 119.29.29.29", "1 分钟"],
      ["国内网页秒开，所有海外网页无法访问", "分流规则中将海外流量误指向了失效的策略组", "在 Clash 核心日志查看流量命中匹配", "在代理面板中选择有效的国家节点", "15 秒"],
      ["微信能收到文字，但打不开任何网页与图片", "DNS 能够解析，但 HTTP/HTTPS 端口被强行阻断", "检查是否开启了第三方杀毒软件 Web 防护", "将代理客户端加入杀毒软件防火墙白名单", "45 秒"],
      ["开启 TUN 模式后电脑彻底断网", "虚拟网卡路由表冲突，默认网关被覆盖", "查看路由表 route print 查看 0.0.0.0 路由", "卸载服务模式重新安装最新 Wintun 驱动", "2 分钟"]
    ],
    decisionTreeTitle: "断网排障场景决策树",
    decisionTreeScenarios: [
      { badge: "开发者群体", title: "浏览器正常，但终端 Git / Docker 持续超时", desc: "说明系统代理仅接管了应用层。请在客户端直接开启 TUN 模式，透明接管命令行协议栈。" },
      { badge: "网课与会议", title: "腾讯会议/钉钉视频断流提示网络异常", desc: "确认分流规则中腾讯、阿里域名走 DIRECT，严禁走境外节点绕路。" },
      { badge: "极客用户", title: "双网卡（WiFi + 有线）同时连接导致冲突", desc: "禁用未使用的冗余物理网卡，防止系统默认路由度量值（Metric）混乱造成数据包发往错误接口。" }
    ],
    decisionRulesTitle: "网络自愈五大黄金法则：",
    decisionRules: [
      "正常关闭电脑前，必须先在客户端托盘图标中退出软件，切忌直接拔电源或硬关机导致代理配置残留；",
      "遇到断网先在终端 <code>ping 223.5.5.5</code>，如果连纯 IP 都不通，说明是物理宽带故障；",
      "保持规则分流（Rule 模式），杜绝滥用 Global 全局模式；",
      "电脑上不要同时常驻两款不同品牌的代理软件（如 Clash 与 v2rayN 同时开），端口冲突必断网；",
      "收藏备用注册表一键清理脚本，遇到网络异常秒级复位系统网络。"
    ],
    brandShowcaseTitle: "具备纯净 DNS 拓扑、分流规则精准不迷路的专线品牌",
    faqTitle: "连通无法上网高频疑问解答 (FAQ)",
    faqs: [
      { q: "为什么我退出了代理软件，电脑反而连百度都打不开了？", a: "这是最经典的“代理残留断网”问题。软件非正常退出时，没来得及将 Windows 注册表中的“使用代理服务器”复选框取消勾选。此时系统仍在把所有流量发往 127.0.0.1:7890，而后台软件已关，导致断网。只需在 Windows 设置中手动关闭代理，或运行一键清理脚本即可。" },
      { q: "什么是 DNS 死锁？如何从配置上彻底根治？", a: "DNS 死锁是指客户端在查询境外上游 DNS 时，由于规则配置不当，将 DNS 查询请求也强行扔进了尚未完成握手的代理通道中。根治方法：在配置文件的 `dns:` 模块中，为 `nameserver` 指定无需代理即可直连的纯净公共 DNS（如 223.5.5.5 与 119.29.29.29），确保 DNS 流量永远直连。" },
      { q: "测速节点延迟很低，但网页加载极慢甚至频繁白屏？", a: "这通常是因为商家对单线程进行了严苛限速，或者节点落地机房的出口带宽严重超售。测速 ping 包非常小因此延迟好看，但真实大流量 HTTP 请求就会严重排队丢包。选用像光速云这种不限单线程速率的高端 IEPL 专线即可解决。" },
      { q: "手机连接正常，但电脑开启热点给其他设备时其他设备上不了网？", a: "默认情况下，客户端仅监听本机 `127.0.0.1` 回环地址。若要让局域网其他设备共享代理，必须在客户端设置中开启“允许局域网连接 (Allow LAN)”，并在其他设备上配置电脑的局域网 IP 与端口。" },
      { q: "光速云的节点在防死锁和规则分流上有何优化？", a: "光速云官方下发的配置文件采用了工业级 Fake-IP 增强模式与智能防环路路由算法，国内 DNS 采用极速 Anycast 节点直连，海外解析由机房边缘网关就近处理，从根本上杜绝了 DNS 污染与代理死锁。" }
    ],
    relatedArticlesTitle: "深度排障与网络自愈长文推荐",
    relatedArticles: [
      { tag: "排障自愈", title: "退出代理后电脑微信、百度打不开？一键清理注册表代理残留脚本", desc: "万字长文提供一键批处理修复脚本，彻底解决断网。", url: "/articles/article-70/" },
      { tag: "节点排错", title: "节点测速全红全超时？电脑系统时间同步与防重放机制急救排查", desc: "排查节点通信握手层面的超时诱因。", url: "/articles/article-67/" },
      { tag: "实操手册", title: "Clash Verge Rev 完整图文教程：从安装配置到 TUN 全局模式全攻略", desc: "规范配置系统代理与 TUN 模式，避免配置冲突。", url: "/articles/article-49/" }
    ]
  },
  {
    categoryKey: "troubleshooting",
    categoryName: "故障排查",
    parentHubName: "故障排查",
    parentHubUrl: "/troubleshooting/",
    subSlug: "dns-error",
    title: "DNS 泄漏与解析失败排查指南：运营商劫持、Fake-IP 优化与纯净拓扑搭建",
    description: "全面排查科学上网时遇到的 DNS 污染、DNS 泄漏与域名解析失败。详解 WebRTC 真实 IP 暴露检测、运营商 UDP 53 端口投毒机理，以及 DoH / DoT 加密解析搭建方案。",
    heroBadge: "域名解析与防泄漏 · 纯净 DNS 指南",
    h1: "DNS 泄漏与解析失败排查指南：防污染与纯净拓扑实战",
    subDesc: "明明开了代理，访问海外服务依然弹出真实所在地？或者经常遭遇域名解析失败？本文带您彻底扫清 DNS 污染与泄漏隐患。",
    answerFirstTitle: "DNS 核心评测结论 (Verdict)",
    answerFirstText: `<p><strong>DNS 泄漏会导致您的真实地理位置与网络足迹在目标网站面前彻底裸奔</strong>！要杜绝 DNS 泄漏与污染，最佳架构方案是：<strong>在客户端开启 Fake-IP 模式 + 加密 DNS (DoH/DoT) + 配合 TUN 虚拟网卡接管</strong>。国内域名直连国内运营商 Anycast DNS，境外域名交由代理远端机房解析，在 <code>dnsleaktest.com</code> 实测中做到 100% 零泄漏。</p>`,
    section1Title: "一、 DNS 污染与 DNS 泄漏机理：运营商劫持与真实 IP 暴露风险",
    section1Content: `<p>DNS（域名系统）是互联网的寻址指南针。在没有防护的明文网络中，所有 DNS 查询均通过无状态、无加密的 <strong>UDP 53 端口</strong> 明文传输。这为外部审查与流量劫持留下了巨大敞口：</p>
<div class="p-5 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs my-4 space-y-2 border border-slate-800">
  <div class="text-emerald-400 font-bold mb-2">【DNS 污染与 DNS 泄漏发生机理对比】</div>
  <div>■ DNS 污染 (DNS Poisoning)：</div>
  <div>  用户电脑向境外发起 UDP 53 查询 -> GFW 旁路设备抢先伪造一个虚假的 IP (如 0.0.0.0) 返回 -> 浏览器连向错误地址报错</div>
  <div>■ DNS 泄漏 (DNS Leak)：</div>
  <div>  用户虽然连接了香港代理节点，但浏览海外网站时，电脑本地的 Windows 系统依然把 DNS 请求发送给了本地电信/联通 DNS！</div>
  <div>  ★ 危害：目标网站（如海外银行、OpenAI）通过检查查询您域名的 DNS 服务器所在地，瞬间识别出您来自中国大陆，直接风控封号！</div>
</div>
<p>此外，浏览器内的 <strong>WebRTC 协议</strong> 在建立 P2P 音视频通道时，会绕过常规代理直接发送 STUN 探测包，这也是导致真实公网 IP 发生旁路泄漏的高危源头。</p>`,
    section2Title: "二、 构建防污染、防泄漏的高安全性纯净 DNS 拓扑实战",
    section2Content: `<p>通过合理配置代理客户端内核的 DNS 引擎，可以彻底隔绝一切泄漏与污染：</p>
<ul class="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 my-3">
  <li><strong>拥抱 Fake-IP 增强模式：</strong> 将客户端 DNS 模式设置为 <code>enhanced-mode: fake-ip</code>。当应用程序发起域名请求时，内核不向公网发出任何真实查询，而是直接分配一个本地专用的保留虚拟 IP（如 <code>198.18.0.1</code>）立即响应。真实 DNS 解析被延迟到代理机房在海外端完成，既消除了本地解析延迟，又物理阻断了本地泄漏；</li>
  <li><strong>配置分流式上下游 DNS（国内走国内，国外走机房）：</strong> 在 <code>nameserver</code> 列表填入腾讯 DNSPod (<code>119.29.29.29</code>) 与阿里 DNS (<code>223.5.5.5</code>)；在 <code>fallback</code> 列表配置境外纯净 DoH 地址（如 <code>https://1.1.1.1/dns-query</code>）；</li>
  <li><strong>利用 fallback-filter 阻止污染 IP 注入：</strong> 开启 <code>geoip: true</code> 与 <code>ipcidr: [240.0.0.0/4]</code> 过滤，一旦返回的 IP 命中 GFW 常见的伪造地址池，内核直接丢弃该虚假结果，强行回退至境外安全信道；</li>
  <li><strong>关闭浏览器 WebRTC 泄漏风险：</strong> 在 Chrome 或 Edge 浏览器安装 <code>WebRTC Control</code> 扩展，或直接在客户端开启 TUN 模式从底层网卡全局拦截 WebRTC STUN 探测报文。</li>
</ul>`,
    tableTitle: "主流 DNS 解析方案抗污染与防泄漏能力对比表",
    tableSubtitle: "不同 DNS 处理架构技术参数对照：",
    tableHeaders: ["DNS 架构方案", "抗 GFW 污染能力", "防真实 IP 泄漏等级", "首包解析延迟", "配置复杂度", "综合推荐度"],
    tableRows: [
      ["传统本地 UDP 53 (ISP 默认)", "0% (完全暴露受劫持)", "0% (真实所在地大暴露)", "极低 (5ms)", "零配置", "★☆☆☆☆ (严禁用于翻墙)"],
      ["普通 DoH / DoT 加密 DNS", "较强 (防运营商劫持)", "中等 (可能被本地分流)", "中等 (带 TLS 握手)", "低", "★★★☆☆"],
      ["Redir-Host 真实解析分流", "良好 (需配置上游分流)", "较好 (依赖规则完整度)", "较慢 (需等真实返回)", "中等", "★★★☆☆"],
      ["Fake-IP + 远程机房代解析", "100% 物理免疫污染", "100% 绝对防泄漏 (首选)", "极限 (本地 0ms 响应)", "中等 (客户端预设)", "★★★★★ (生产力首选)"],
      ["SmartDNS + AdGuard 软路由", "极高", "极高", "极快 (本地并发缓存)", "极高 (需软路由硬件)", "★★★★☆ (极客首选)"]
    ],
    decisionTreeTitle: "DNS 选型与排错决策树",
    decisionTreeScenarios: [
      { badge: "AI 与海外网银重度用户", title: "登录 ChatGPT 频繁提示地区不支持", desc: "打开 <code>dnsleaktest.com</code> 进行标准测试。如果测试结果中出现了任何中国大陆的电信/联通 DNS 节点，必须立即开启 Fake-IP 模式。" },
      { badge: "公司局域网/内网办公", title: "开启代理后无法解析内部 OA 域名", desc: "在 Clash 配置的 fake-ip-filter 中添加公司的内网私有域名（如 <code>*.corp.local</code>），使内网域名强制回退本地真实解析。" },
      { badge: "极致网页极速秒开", title: "感觉代理连接虽然快，但点开新网页有卡顿", desc: "开启 Fake-IP 模式，将首包解析耗时直接降为 0 毫秒，体验点击即开的丝滑感。" }
    ],
    decisionRulesTitle: "DNS 安全防范五大铁律：",
    decisionRules: [
      "定期访问 <code>dnsleaktest.com</code> 检验出站 DNS，如果出现国内运营商节点立即排查；",
      "切勿在翻墙环境下将电脑主网卡的 DNS 静态写死为 8.8.8.8（明文 UDP 8.8.8.8 会被运营商在骨干网强行拦截抢答）；",
      "首选原生搭载 Fake-IP 机制的现代客户端（如 Clash Verge Rev）；",
      "配置 DNS 分流时，必须保持国内主 DNS 走直连，境外 fallback 走代理；",
      "搭配纯净住宅落地 IP 的专线机场（如光速云），保障出口 DNS 与出口 IP 归属地绝对一致。"
    ],
    brandShowcaseTitle: "具备边缘纯净 Anycast DNS、杜绝解析泄漏的专线服务商",
    faqTitle: "DNS 故障高频技术疑问解答 (FAQ)",
    faqs: [
      { q: "什么是 DNS 泄漏？为什么它比 IP 泄漏还要危险？", a: "DNS 泄漏是指当您访问境外网站时，虽然流量经过了代理，但您的操作系统却把域名查询请求发给了中国境内的运营商 DNS 服务器。这不仅让本地运营商精确记录了您访问了哪些境外网站的完整日志，还会让目标网站检测到您的 DNS 归属地在中国，直接以风控名义冻结您的账号。" },
      { q: "Fake-IP 模式分配的 198.18.0.x 地址打得开网页吗？", a: "完全可以。`198.18.0.0/15` 是 IETF 专门分配用于网络基准测试的保留私有地址。Clash 只是在本地用这个虚拟 IP 作为占位符给浏览器交差，当数据包发到代理核心时，核心会根据内部映射表自动将其还原为真实域名发往海外机房，用户感知不到任何异常。" },
      { q: "为什么访问部分国内应用时提示“网络环境异常”？", a: "这通常是因为没有将国内域名加入 `fake-ip-filter` 白名单，导致国内应用拿到了 198.18 虚拟 IP 从而触发了安全机制。只要在白名单中添加国内顶级域名，让国内服务走真实 DNS 解析即可。" },
      { q: "如何彻底关闭浏览器的 WebRTC 真实 IP 泄漏？", a: "在 Chrome 扩展商店搜索并安装 `WebRTC Control`，将其状态切换为蓝色（完全禁用 STUN/TURN），或者在客户端中开启 TUN 虚拟网卡模式，TUN 会直接在网卡底层将旁路 STUN 报文全部捕获，不给其直连本地网络的机会。" },
      { q: "光速云如何保障用户的 DNS 解析安全？", a: "光速云的所有专线节点均部署了私有递归 DNS 节点，出口 DNS 地址与落地节点机房物理 IP 100% 保持在同一个 BGP 自治系统（ASN）内，天然实现零泄漏、零污染，完美通过各大风控平台严苛检测。" }
    ],
    relatedArticlesTitle: "DNS 与网络安全深度长文推荐",
    relatedArticles: [
      { tag: "深度排障", title: "节点测速全红全超时？电脑系统时间同步与防重放机制急救排查", desc: "排查因解析失败与时间错误引起的全面超时。", url: "/articles/article-67/" },
      { tag: "排障自愈", title: "退出代理后电脑微信、百度打不开？一键清理注册表代理残留脚本", desc: "修复因 DNS 映射断裂导致的网络打不开故障。", url: "/articles/article-70/" },
      { tag: "协议科普", title: "IEPL 国际以太网专线深度科普：二层物理光纤内网架构实测全解析", desc: "了解内网专线如何从底层物理避免公网 DNS 嗅探。", url: "/network/iepl/" }
    ]
  },
  {
    categoryKey: "troubleshooting",
    categoryName: "故障排查",
    parentHubName: "故障排查",
    parentHubUrl: "/troubleshooting/",
    subSlug: "client-startup",
    title: "客户端闪退与启动报错排查指南：端口冲突、内核崩溃与环境修复实战",
    description: "全面解决科学上网客户端闪退、启动报错‘Port 7890 already in use’、内核无法拉起或服务模式安装失败。提供后台死锁进程查杀命令、配置文件重置与系统运行库修复方案。",
    heroBadge: "启动排障手册 · 秒级查杀复位",
    h1: "客户端闪退与启动报错排查指南：端口冲突与内核修复",
    subDesc: "双击客户端毫无反应？刚打开就闪退或者弹出一串英文报错？本文带您快速查杀后台僵尸进程、排查端口冲突与修复运行库环境。",
    answerFirstTitle: "启动报错核心解决结论 (Verdict)",
    answerFirstText: `<p>客户端启动闪退或报错 <code>already in use</code> 时，<strong>90% 是由于上次退出时后台代理内核（如 clash-meta.exe 或 mihomo.exe）成为僵尸进程残留并占死了 7890 端口</strong>。第一自愈动作：打开任务管理器，强制结束所有名为 <code>clash</code>、<code>mihomo</code>、<code>sing-box</code> 的后台进程；若依然闪退，删除损坏的本地缓存配置文件 <code>config.yaml</code> 即可恢复正常启动。</p>`,
    section1Title: "一、 客户端闪退与启动报错的技术诱因：端口冲突与内核崩溃",
    section1Content: `<p>现代代理客户端采用“前端 GUI 界面 + 后端代理内核（Core）”的分离式架构。前端界面（如基于 Tauri 或 Electron 开发的面板）在启动时，会通过 RPC 接口尝试唤醒后台内核并监听指定的本地端口。这一过程中常见的崩溃断点包括：</p>
<div class="p-5 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs my-4 space-y-2 border border-slate-800">
  <div class="text-emerald-400 font-bold mb-2">【客户端启动加载链路与常见崩溃点】</div>
  <div>1. 进程唤醒：前端启动 -> 尝试 spawn 后台 mihomo 内核进程 (被杀毒软件误杀拦截)</div>
  <div>2. 端口绑定：内核尝试 bind 0.0.0.0:7890 -> [报错: Port already in use] (被残留进程占死)</div>
  <div>3. 配置文件解析：内核读取 config.yaml -> [报错: YAML syntax error] (缩进错误或特殊非法字符)</div>
  <div>4. 底层驱动加载：尝试注册 Wintun 网卡 -> [报错: Access Denied] (缺少管理员 UAC 权限)</div>
</div>
<p>只要理清报错发生在哪个阶段，即可针对性地在数秒内完成自愈，无需盲目重新下载或盲目重装系统。</p>`,
    section2Title: "二、 客户端秒级自愈与环境修复四步工作法",
    section2Content: `<p>按照以下四个标准步骤，可以彻底清除环境冲突并修复启动异常：</p>
<ul class="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 my-3">
  <li><strong>第一步：命令行强杀僵尸内核进程（释放被占端口）：</strong> 按下 <code>Win + X</code> 打开“终端/PowerShell”，输入以下命令并回车强杀残留进程：<br/><code>taskkill /F /IM "clash-meta.exe" /IM "mihomo.exe" /IM "clash-verge.exe" /T</code><br/>端口瞬间被释放，再次双击软件即可顺畅启动；</li>
  <li><strong>第二步：查杀第三方抢占端口的软件：</strong> 若强杀后依然提示 7890 被占用，执行 <code>netstat -ano | findstr 7890</code> 查看占用端口的 PID，在任务管理器“详细信息”中找到该 PID 对应的程序（常见为迅雷下载加速模块、各类安卓模拟器），将其彻底关闭；</li>
  <li><strong>第三步：重置损坏的 YAML 配置文件：</strong> 进入 <code>C:\Users\用户名\.config\clash-verge</code>（Mac 为 <code>~/.config/clash-verge</code>），找到 <code>config.yaml</code> 并重命名为 <code>config.yaml.bak</code>。重新打开软件，客户端会自动生成一份全新的默认配置文件；</li>
  <li><strong>第四步：安装微软官方 VC++ 运行库合集：</strong> 若提示缺少 <code>MSVCP140.dll</code> 或 <code>VCRUNTIME140.dll</code>，说明操作系统缺少 C++ 运行环境。下载安装微软官方的“Visual C++ 2015-2022 Redistributable (x64)”安装包并重启电脑。</li>
</ul>`,
    tableTitle: "客户端启动高频报错现象与处置决策表",
    tableSubtitle: "高频崩溃诱因与修复方案对照：",
    tableHeaders: ["启动报错现象 / 代码", "根本技术诱因", "受影响操作系统", "极速处置 SOP", "根治与防复发建议"],
    tableRows: [
      ["Port 7890 already in use", "后台存在残留僵尸内核进程占死端口", "Windows / macOS", "通过任务管理器或 taskkill 命令强杀后台进程", "在退出软件时等待 3 秒让其优雅退出"],
      ["双击图标无反应 / 秒闪退", "配置文件 YAML 语法缩进严重破损", "全平台", "重命名或删除 .config 目录下的配置文件", "不要用系统记事本直接修改 YAML"],
      ["缺少 MSVCP140.dll 无法运行", "系统缺少 VC++ 2015-2022 动态链接库", "Windows 10 / 11", "安装微软官方 VC++ 运行库分发包", "安装正规纯净版 Windows 系统更新"],
      ["服务模式安装失败 (Install Failed)", "缺少管理员提升权限或系统安全策略限制", "Windows 10 / 11", "鼠标右键点击客户端，选择“以管理员身份运行”", "关闭杀毒软件的底层驱动保护拦截"],
      ["macOS 提示应用已损坏", "苹果 Gatekeeper 安全公证隔离标志未清除", "macOS 12 / 13 / 14", "终端运行 sudo xattr -r -d com.apple.quarantine", "认准官方 GitHub 正规 Release 安装包"]
    ],
    decisionTreeTitle: "启动排障决策树",
    decisionTreeScenarios: [
      { badge: "小白新手", title: "搞不懂命令行，不想看复杂代码", desc: "直接重启电脑。电脑重启会自动清除所有内存中的僵尸进程与端口占用，70% 的启动报错可瞬间恢复。" },
      { badge: "多开软件玩家", title: "需要同时运行其他开发环境或代理", desc: "在 Clash Verge Rev 的“设置”中，将“混合端口 (Mixed Port)”手动修改为一个冷门端口（如 <code>27890</code>），永久避开端口冲突。" },
      { badge: "系统精简版用户", title: "使用的是网上下载的 Ghost 精简版系统", desc: "精简版系统通常删除了关键系统服务。必须手动补齐 WebView2 运行时与 VC++ 运行库合集。" }
    ],
    decisionRulesTitle: "客户端运维五大铁律：",
    decisionRules: [
      "遇到启动报错先别急着卸载重装，优先通过任务管理器排查残留进程；",
      "严禁使用 Windows 自带的“记事本”编辑 YAML 文件（记事本会自动添加 UTF-8 BOM 导致内核报错）；",
      "右键以管理员身份运行一次客户端，确保底层驱动和服务模式能顺利注册；",
      "定期更新客户端至稳定的正式版本，避免使用未经测试的 Alpha 预览版；",
      "遇到无法解决的闪退，备份好订阅链接后，清空配置目录即可恢复出厂纯净状态。"
    ],
    brandShowcaseTitle: "客户端适配良好、配置语法标准且零报错的专线品牌",
    faqTitle: "客户端启动高频技术疑问解答 (FAQ)",
    faqs: [
      { q: "为什么每次关机再开机后，客户端就会报错端口被占用？", a: "这通常是因为 Windows 开启了“快速启动 (Fast Startup)”功能。快速启动会将内核状态写入休眠文件，导致关机时进程没有被完全释放。在控制面板电源选项中关闭“快速启动”，或者在开机时通过任务计划脚本释放端口即可解决。" },
      { q: "启动时提示“WebView2 runtime not found”怎么处理？", a: "现代基于 Tauri 的客户端（如 Clash Verge Rev）依赖微软的 Edge WebView2 引擎来渲染前端页面。如果使用的是精简版 Windows 系统，可以在微软官网免费下载“Evergreen Standalone Installer”进行一键安装补齐。" },
      { q: "安装服务模式（Service Mode）时反复失败报错？", a: "这是因为安装服务模式需要向 Windows 的 System32 目录写入驱动文件并注册系统服务。请务必右键以“管理员身份运行”客户端，并在杀毒软件弹出拦截通知时选择“允许所有操作”。" },
      { q: "为什么软件打开后界面是一片纯白或纯黑？", a: "这通常是显卡硬件加速（GPU Acceleration）与驱动冲突引起的。在快捷方式后加上启动参数 `--disable-gpu` 启动软件，或者在系统设置中更新显卡驱动即可恢复正常渲染。" },
      { q: "光速云后台推荐的客户端下载包是否包含运行库？", a: "光速云后台提供的客户端安装包均为官方完整整合版，内置了最新的稳定版 Mihomo 内核与常见驱动组件，最大程度避免了因缺失运行库而导致的启动失败。" }
    ],
    relatedArticlesTitle: "客户端与排障技术深度长文",
    relatedArticles: [
      { tag: "实操手册", title: "Clash Verge Rev 完整图文教程：从安装配置到 TUN 全局模式全攻略", desc: "全面掌握客户端安装、运行库配置与服务模式排障。", url: "/articles/article-49/" },
      { tag: "选型评测", title: "2026主流跨平台客户端横评：Clash Verge Rev vs v2rayN vs Sing-box 谁才是日常主力？", desc: "对比不同客户端的系统兼容性与稳定性表现。", url: "/clients/clash-verge/" },
      { tag: "网络自愈", title: "退出代理后电脑微信、百度打不开？一键清理注册表代理残留脚本", desc: "解决客户端非正常退出引起的网络残留断网。", url: "/articles/article-70/" }
    ]
  }
];
