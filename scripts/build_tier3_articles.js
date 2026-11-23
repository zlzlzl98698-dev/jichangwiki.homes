import fs from 'fs';
import path from 'path';

const articles = [
  {
    id: 1,
    slug: 'article-1',
    category: 'airport',
    parentHubUrl: '/airport/recommend/',
    parentHubName: '机场推荐指南',
    title: '2026年新手翻墙科学上网终极防坑指南：从零认识代理、协议与机场',
    description: '面向零基础新手的科学上网全方位科普：从 GFW 防火墙原理、VPN 与代理的底层区别，到 Shadowsocks/Trojan 协议演进，手把手教你如何挑选第一款高速稳定的靠谱机场。',
    author: '百科机场架构评测组',
    date: '2026-09-10',
    updated: '2026-11-22',
    primaryKeyword: '新手科学上网指南',
    verdict: '新手入门翻墙切忌盲目贪图便宜或购买多年年付套餐。优先选用采用 IEPL/IPLC 物理内网专线、支持灵活小额月付（如光速云 ¥14.4 起）的正规品牌，搭配开源客户端（Clash Verge Rev 或小火箭），既能保证晚高峰 4K 流畅与 AI 原生解锁，又能彻底杜绝跑路资金风险。',
    sections: [
      {
        heading: '一、什么是“机场”？它与传统 VPN 的本质分野',
        content: `很多初学者常将所有翻墙工具笼统称为“VPN”，但在计算机网络工程中，“商业 VPN”与“分流代理（机场）”有着截然不同的技术架构。

传统 VPN（如 OpenVPN、WireGuard、IKEv2）最初设计用于跨国企业员工远程接入内部局域网，其核心特征是**全局虚拟网卡接管与固定协议指纹**。当在中国大陆公网环境下使用时，国家级防火墙（GFW）部署的机器学习流量分类器能够迅速捕捉到未知高熵的 UDP/TCP 握手包，在几分钟内对服务器 IP 实施阻断。

而“机场”（最初因 Shadowsocks 客户端图标为纸飞机而得名）属于**应用层高性能分流代理**。它具备两大不可替代的优势：
1. **精准分流（Smart Routing）：** 通过本地规则引擎与 GEOIP 数据库，访问国内网站（百度、微信、网银）100% 直连，访问海外受限网站（Google、YouTube、ChatGPT）智能走代理，国内国外两不误；
2. **专线传输（Private Line Transit）：** 头部优质机场采用运营商内网物理专线（IEPL/IPLC），数据不过公网国际海缆出口，物理上规避了防火墙的主动探测审查。`
      },
      {
        heading: '二、主流翻墙协议演进历程与选型建议',
        content: `选择机场时，节点的传输协议直接决定了抗封锁韧性与延迟表现：
- **Shadowsocks (SS) / Shadowsocks-2022：** 轻量高效，CPU 占用极低。最新 SS-2022 规范强化了防重放攻击能力，是内网物理专线上的黄金协议；
- **Trojan：** 彻底伪装成全球最普及的 HTTPS (TLS 1.3) 流量，将代理流量藏匿在标准 443 端口与商业证书之后，抗封锁能力极佳；
- **VLESS + Reality：** Xray 团队的集大成之作，直接借用海外真实大厂（如 Apple、Microsoft）的 SNI 证书完成握手，无需自建域名；
- **Hysteria 2 / TUIC：** 基于 QUIC / UDP 研发的下一代协议，专为恶劣公网环境设计，在丢包率高达 20% 的极端网络下依然能高速回弹。`
      },
      {
        heading: '三、新手选购机场的核心避坑法则',
        content: `在实际选购中，新手最容易踩中以下四大陷阱：
1. **坚决不买“永久套餐”或超低价年付：** 任何宣称几十元“终身不限流”的平台，其资金链注定在几个月内断裂跑路；
2. **警惕“虚高倍率暗扣”：** 标称 500GB 流量，主要节点却设为 3x-5x 倍率，实际可用流量大幅缩水；
3. **查验真实测速环境：** 拒绝看非高峰期的单线程跑分截图，认准 21:00 晚高峰多运营商测速与丢包率记录；
4. **首单只买月付试水：** 在自己常住的网络环境（家庭宽带与移动 5G）中实测 3-7 天，满意后再考虑续订。`
      }
    ],
    faqs: [
      {
        q: '新手第一次翻墙，推荐使用哪个客户端？',
        a: 'Windows 和 macOS 首选开源的 Clash Verge Rev，界面简洁中文，内存占用低；iOS 苹果手机首选 Shadowrocket（小火箭）；Android 安卓手机首选 FlClash 或 Clash Meta for Android。'
      },
      {
        q: '为什么同一家机场在别人电脑上很快，在我家里却很慢？',
        a: '因为本地宽带运营商（电信、联通、移动、广电）的省际骨干网调度不同。如果机场具备多地 BGP 入口，请在节点列表中选择标注了您本地运营商优化的节点。'
      }
    ]
  },
  {
    id: 16,
    slug: 'article-16',
    category: 'pricing',
    parentHubUrl: '/pricing/cheap/',
    parentHubName: '便宜机场指南',
    title: '5元至15元平价机场真实可用性调查：便宜真的有好货吗？',
    description: '深入调研每月 5-15 元价格区间内的平价翻墙梯子。拆解低价背后的成本模型、公网直连与物理专线差异，甄选不跑路、不虚标倍率的高性价比代表。',
    author: '百科机场资费调研组',
    date: '2026-09-15',
    updated: '2026-11-22',
    primaryKeyword: '便宜机场可用性调查',
    verdict: '月费 5-15 元完全能买到日常稳定可用的高品质服务，但前提是必须认准“规模化摊薄专线成本”的老牌大厂。如光速云特惠年付仅需 ¥99（折合 ¥8.25/月），依托庞大用户群分摊了 IEPL 专线租金；切勿购买新开小作坊的 5 元公网超售梯子，晚高峰极易瘫痪。',
    sections: [
      {
        heading: '一、平价机场的底层成本账本拆解',
        content: `很多用户好奇：为什么有的机场卖上百元一个月，而有的机场只要几元钱？
国际带宽是明码标价的物理资产。正规电信运营商的跨境 IEPL 专线，每 Gbps 带宽月租金高达数万元人民币。
平价机场想要在 5-15 元区间实现盈利，只有两条技术路径：
1. **工业级规模化复用（以光速云为代表）：** 依靠数万名付费用户，将千兆物理专线池进行精细化动态复用。由于大量轻度用户日常仅查资料、看网页，公摊下来单人月成本可压缩至 10 元以内，依然能享受到顶级专线品质；
2. **劣质公网超售（以小作坊为代表）：** 租用月付几美元的廉价 VPS，直接走公网直连，并将单台服务器塞入数千人。白天测速好看，晚高峰直接丢包断流。`
      },
      {
        heading: '二、低价区间选购三步筛查法',
        content: `在 15 元以下预算内选购时，建议严格执行以下三步筛查：
- **看运营年限：** 优先选择连续稳定运营 2 年以上的老牌品牌，排除刚成立几个月便疯狂拉人的小站；
- **看倍率与流量重置规则：** 确认 1.0x 标准节点的覆盖率，警惕 0.1x 噱头节点与 3x 隐藏吸血节点；
- **看流媒体与 AI 解锁保障：** 平价不等于放弃功能，优秀平价机场依然应保障 Netflix 港美区与 ChatGPT 顺畅可用。`
      }
    ],
    faqs: [
      {
        q: '便宜机场会因为成本低而偷偷记录用户日志吗？',
        a: '小作坊机场确实存在使用默认配置记录连接日志甚至转售数据的风险；而正规老牌平价机场同样遵循零日志（No-Logs）原则，全节点透明转发。'
      }
    ]
  },
  {
    id: 19,
    slug: 'article-19',
    category: 'pricing',
    parentHubUrl: '/pricing/monthly/',
    parentHubName: '月付机场指南',
    title: '为什么说月付是最好的防跑路护甲？月付机场综合实测精选',
    description: '深度剖析翻墙机场行业资金运作模型，揭秘年付大促销背后的圈钱套路，阐述为何坚持月付是保护个人资金安全的终极防线，并推荐优秀月付品牌。',
    author: '百科机场风控实验室',
    date: '2026-09-20',
    updated: '2026-11-22',
    primaryKeyword: '月付机场防跑路',
    verdict: '在缺乏法律监管的翻墙服务领域，用户唯一的议价权就是“下个月是否续费”。坚守月付原则能将单次试错风险锁死在十几元以内。优秀服务商（如光速云）支持最低 ¥14.4 的弹性月充，不绑定长期预付，靠稳定服务留住用户。',
    sections: [
      {
        heading: '一、翻墙行业的“庞氏陷阱”与跑路周期律',
        content: `翻墙机场没有营业执照与监管背书，完全依赖运营者的道德自律与现金流健康度。
当小作坊机场为了抢夺流量推出“年付 5 折”、“三年付 2 折”时，运营者提前透支了未来几年的收入。随着新用户增速放缓、机房续费账单接踵而至，资金链断裂时运营者几乎 100% 会选择直接删库跑路。

相比之下，坚持按月订阅具有无法替代的抗风险价值：
- **零沉没成本：** 一旦遇到机场服务质量下滑或被封锁，随时可以在下个月切换到其他优秀品牌；
- **倒逼服务商保障服务：** 月付模式下，服务商必须持续维护网络与工单质量，否则次月就会面临大面积退订流失。`
      }
    ],
    faqs: [
      {
        q: '年付比月付便宜那么多，真的完全不能买吗？',
        a: '对于您已经连续稳定使用超过半年的顶级老牌专线大厂，在预算可控的前提下可以考虑年付；但对于任何初次接触的新品牌，绝对必须先月付实测。'
      }
    ]
  },
  {
    id: 34,
    slug: 'article-34',
    category: 'streaming-ai',
    parentHubUrl: '/streaming-ai/chatgpt/',
    parentHubName: 'ChatGPT 解锁指南',
    title: 'OpenAI Cloudflare 1020 报错彻底修复手册：从 IP 纯净度到浏览器指纹',
    description: '系统排查与解决 ChatGPT 访问报错：Access Denied 1020、Not Available In Country、登录无限循环验证码。深入拆解 Cloudflare 企业风控评分与原生专线分流调优。',
    author: '百科机场 AI 技术组',
    date: '2026-09-25',
    updated: '2026-11-22',
    primaryKeyword: 'ChatGPT 1020 报错修复',
    verdict: 'ChatGPT 报 1020 并非账号损坏，而是出口 IP 被 Cloudflare 标记为高风险机房代理。严禁使用香港节点！切换至美、日、新原生专线节点，并清除浏览器 local storage 与 Cookie，即可 100% 恢复正常对话。',
    sections: [
      {
        heading: '一、Cloudflare 1020 拦截的底层判定机理',
        content: `OpenAI 全面部署了 Cloudflare 企业级 Anti-Bot 防火墙。当客户端发起 HTTP 请求时，Cloudflare 会根据以下三个维度加权打分：
1. **IP 欺诈评分（Fraud Score）：** 检查访问 IP 是否属于公共机房数据中心（Hosting/IDC）。被万人公用的廉价 IP 往往被直接拦截；
2. **地理合规白名单：** OpenAI 官方服务未向中国大陆、中国香港特别行政区开放。使用香港节点会被直接拦截；
3. **TLS ClientHello 浏览器指纹：** 检查浏览器 JA3/JA4 指纹是否与真实 Chrome 吻合，判断是否为爬虫脚本。`
      },
      {
        heading: '二、三步彻底根治 1020 与人机验证循环',
        content: `遇到 1020 报错时，请严格按以下步骤处理：
- **步骤 1：更换为美/日原生专线节点：** 在客户端中切换至标有“美国/日本”且具备流媒体解锁支持的专线节点；
- **步骤 2：全量清理 OpenAI 本地存储：** 按 F12 打开开发者工具，进入 Application -> Storage，点击“Clear site data”；
- **步骤 3：核对分流规则：** 确认客户端配置中 \`oaistatic.com\` 与 \`openai.com\` 走同一个代理策略组，避免动静分离导致出口 IP 漂移。`
      }
    ],
    faqs: [
      {
        q: '为什么别人用同一个节点没报错，只有我的报错？',
        a: '可能是您的浏览器残留了之前被风控标记的 Cookie，或者使用了某些修改了请求头的恶意外挂插件。尝试使用 Chrome 纯净无痕模式访问。'
      }
    ]
  },
  {
    id: 36,
    slug: 'article-36',
    category: 'streaming-ai',
    parentHubUrl: '/streaming-ai/claude/',
    parentHubName: 'Claude 防封指南',
    title: 'Anthropic Claude 3.5 严苛风控破解：实体 SIM 卡接码与环境隔离秘笈',
    description: '针对行业封控最严苛的 Claude.ai，详细解析 Your account has been disabled 封号根本原因，提供海外实体卡接码、纯净环境隔离与低风险专线选用方案。',
    author: '百科机场 AI 技术组',
    date: '2026-10-01',
    updated: '2026-11-22',
    primaryKeyword: 'Claude 注册防封指南',
    verdict: 'Claude 防封三大红线：绝对不用万人机房代理、绝对不用免费虚拟号码（VoIP）、登录后绝对不频繁跨洲漂移 IP。选用具备英美商业原生住宅出口的专线（如光速云），配合实体海外 SIM 卡接码，可实现账号长效保活。',
    sections: [
      {
        heading: '一、为什么 Claude.ai 的封号率远高于 ChatGPT？',
        content: `Anthropic（Claude 母公司）对用户注册环境采取了零容忍策略。其风控引擎会对以下特征实行“一票否决”：
- **虚拟运营商号码（VoIP）：** Google Voice 或免费在线接码平台号码会在注册后 10 分钟内被直接注销停用；
- **IP 纯净度检测：** 凡在 IPinfo 或 MaxMind 数据库中被标记为 Hosting 类型的 IP，极难通过注册；
- **时区与语言冲突：** 挂着英国节点，系统时区却为 UTC+8，语言偏好为中文，会直接拉高风险权重。`
      }
    ],
    faqs: [
      {
        q: '国内如何获取合法的实体海外 SIM 卡？',
        a: '可合法购买正规海外实体卡（如英国 giffgaff，国内可免费收短信）或正规海外旅游 eSIM，彻底规避虚拟号检测。'
      }
    ]
  },
  {
    id: 38,
    slug: 'article-38',
    category: 'streaming-ai',
    parentHubUrl: '/streaming-ai/netflix/',
    parentHubName: 'Netflix 4K 解锁',
    title: 'Netflix 只能看自制剧真相揭秘：原生住宅 IP 与机房 IP 数据库识别机理',
    description: '全面解密 Netflix 流媒体半解锁现象：为什么搜不到非自制版权影片？拆解机房托管 IP 与原生双 ISP 住宅宽带判定标准，推荐全版权 4K 原生专线。',
    author: '百科机场影音实验室',
    date: '2026-10-05',
    updated: '2026-11-22',
    primaryKeyword: 'Netflix 只能看自制剧',
    verdict: '在 Netflix 搜索《绝命毒师》或热门日漫，若只能看到《怪奇物语》等自制剧，说明当前 IP 属于被监控的机房 IP。选用部署了海外住宅宽带（Residential ISP）出口的原生专线机场（如光速云），方可完整解锁该地区全部独占影视。',
    sections: [
      {
        heading: '一、Netflix 的“半解锁”与“全解锁”技术本质',
        content: `Netflix 拥有极为严格的地域版权保护体系。对于某部好莱坞电影，Netflix 可能只购买了日本或台湾地区的播放权。
为了防止跨区串流，Netflix 采购了多家全球 IP 威胁情报数据库（如 IP2Location、MaxMind）。
当检测到访问者来自数据中心机房（Hosting）时，出于礼貌，Netflix 允许其观看全球自有版权的“自制剧（Originals）”，而将所有第三方版权影片全部隐藏。这就是所谓“半解锁”。`
      }
    ],
    faqs: [
      {
        q: '看 Netflix 4K 需要多大带宽？',
        a: 'Netflix 官方要求持续稳定下行带宽在 25Mbps 以上，且丢包率低于 1%。任何晚高峰抖动都会导致画质自动降为 1080p 或 720p。'
      }
    ]
  },
  {
    id: 49,
    slug: 'article-49',
    category: 'clients',
    parentHubUrl: '/clients/clash-verge/',
    parentHubName: 'Clash Verge Rev 教程',
    title: 'Clash Verge Rev 完整图文教程：从安装配置到 TUN 全局模式全攻略',
    description: '面向 PC 与 Mac 用户的 Clash Verge Rev 终极指南：Tauri 轻量架构优势、官方安全下载渠道、订阅一键导入、规则模式切换与系统级 TUN 虚拟网卡配置。',
    author: '百科机场客户端研究组',
    date: '2026-10-10',
    updated: '2026-11-22',
    primaryKeyword: 'Clash Verge Rev 教程',
    verdict: 'Clash Verge Rev 是目前桌面端首选开源客户端。相比老旧 CFW，其开机常驻内存仅数十兆，原生集成 Mihomo 内核。开启“服务模式”并启用“TUN 模式”后，可实现终端 Git、游戏进程与全生态 100% 透明接管。',
    sections: [
      {
        heading: '一、Clash Verge Rev 的架构革新与版本挑选',
        content: `Clash Verge Rev 采用 Rust + Tauri 重写了用户界面，彻底告别了 Chromium/Electron 的高内存消耗。
在下载安装时，请务必认准官方 GitHub 仓库（clash-verge-rev/clash-verge-rev）：
- **Windows 用户：** 优先下载 \`x64-setup.exe\`，按提示安装；
- **macOS 用户：** M系列芯片选择 \`aarch64.dmg\`，Intel 芯片选择 \`x64.dmg\`。若遇安全隔离拦截，在终端执行：\`sudo xattr -rd com.apple.quarantine /Applications/Clash\\ Verge.app\`。`
      },
      {
        heading: '二、三步极速上手流程',
        content: `1. **导入订阅：** 进入“订阅 (Profiles)”，点击新建，粘贴专线机场提供的订阅链接并保存；
2. **选择规则模式：** 进入“代理 (Proxies)”，确保顶部模式为“规则 (Rule)”，并在节点分组中选择延迟最低的节点；
3. **开启系统代理：** 拨动左下角“系统代理”开关，浏览器即可正常访问海外网络。`
      }
    ],
    faqs: [
      {
        q: '为什么开启系统代理后，命令行 CMD 或 Git 依然连不上？',
        a: '因为命令行工具不默认读取 Windows HTTP 代理注册表。在设置中安装“服务模式”并开启“TUN 模式”，即可在底层虚拟网卡接管命令行流量。'
      }
    ]
  },
  {
    id: 51,
    slug: 'article-51',
    category: 'clients',
    parentHubUrl: '/clients/shadowrocket/',
    parentHubName: 'Shadowrocket 教程',
    title: 'Shadowrocket 小火箭 iOS 终极指南：美区 ID 获取与按需连接配置',
    description: '苹果 iPhone / iPad 用户翻墙必备小火箭（Shadowrocket）配置手册：美区 Apple ID 安全切换、一键导入机场订阅、规则模式防风控及后台全天低耗保活秘籍。',
    author: '百科机场移动终端组',
    date: '2026-10-15',
    updated: '2026-11-22',
    primaryKeyword: 'Shadowrocket 小火箭配置教程',
    verdict: 'Shadowrocket 凭借亲民价格与极佳功耗成为 iOS 首选。切记：绝对不要在系统“设置 -> iCloud”中登录陌生海外 Apple ID，仅在 App Store 应用商店内切换账号下载！日常全局路由务必选择【配置】模式，杜绝微信异地风控。',
    sections: [
      {
        heading: '一、海外 Apple ID 获取与安全防锁机准则',
        content: `由于政策原因，Shadowrocket 未在大陆区 App Store 上架。
必须使用美区、日区或港区 Apple ID 购买下载（售价通常为 $2.99）。
**核心安全警告：**
严禁在 iPhone【系统设置 -> 顶部个人头像（iCloud）】登录他人或租借的账号！否则黑客可远程通过“查找我的 iPhone”将您的手机永久锁死勒索。正确做法是仅在【App Store 应用商店】中登录下载，下载完毕后立即登回国区个人账号。`
      }
    ],
    faqs: [
      {
        q: '小火箭在后台常驻耗电严重吗？',
        a: '在【配置】规则模式下，Shadowrocket 调用 iOS 系统级 Network Extension，全天常驻耗电通常低于 5%，极为省电。'
      }
    ]
  },
  {
    id: 61,
    slug: 'article-61',
    category: 'network',
    parentHubUrl: '/network/low-latency/',
    parentHubName: '低延迟专线指南',
    title: 'Fake-IP 原理解析：它是如何消除本地 DNS 往返延迟实现秒开的？',
    description: '深入解构现代代理核心（Clash / Mihomo / sing-box）的 Fake-IP 运行机理。对比传统 Redir-Host 模式，拆解虚拟网段映射、远端递归解析与防 DNS 污染实战。',
    author: '百科机场网络工程组',
    date: '2026-10-20',
    updated: '2026-11-22',
    primaryKeyword: 'Fake-IP 原理解析',
    verdict: 'Fake-IP 模式在收到本地 DNS 请求时瞬时返回 198.18.x.x 虚假保留 IP，使操作系统免去等待远程 DNS 解析的几百毫秒 RTT 延迟，直接建立 TCP 握手，真正实现网页秒开并从根源上杜绝本地 DNS 污染。',
    sections: [
      {
        heading: '一、传统 Redir-Host 模式的性能瓶颈',
        content: `在旧版代理中，当浏览器访问 \`google.com\` 时：
1. 客户端必须先通过海外节点向远端公共 DNS 发起递归查询；
2. 远端解析出真实 IP（如 142.250.x.x）并返回给本地；
3. 操作系统收到真实 IP 后，才开始向代理内核发起连接。
这个过程增加了至少 1-2 次跨境网络往返（RTT），往往导致网页打开前有明显的卡顿顿挫感。`
      },
      {
        heading: '二、Fake-IP 毫秒级秒开实现机理',
        content: `在 Fake-IP 模式下：
1. 操作系统发出 DNS 解析请求，Clash 核心在 1ms 内直接分配并返回一个虚拟内网 IP（如 \`198.18.0.1\`）；
2. 操作系统认为解析完成，立刻发起 TCP 连接；
3. 内核在内存表中查询到 \`198.18.0.1\` 对应 \`google.com\`，直接向海外专线节点发送包含域名的代理协议报文；
4. 目标解析在海外落地机房局域网中异步完成，彻底消除了本地 DNS 往返延迟。`
      }
    ],
    faqs: [
      {
        q: 'Fake-IP 模式会导致本地测 Ping 出现 198.18 开头的 IP 吗？',
        a: '是的，这是完全正常的现象。该 IP 仅用于本机内核内部寻址映射，不影响实际出站网络。'
      }
    ]
  },
  {
    id: 67,
    slug: 'article-67',
    category: 'troubleshooting',
    parentHubUrl: '/troubleshooting/timeout/',
    parentHubName: '节点超时排查',
    title: '节点测速全红全超时？电脑系统时间同步与防重放机制急救排查',
    description: '客户端节点列表突然全部测速超时、Ping 全红？90% 的诱因在于系统时间漂移！深度解析现代 TLS/Trojan 协议防重放机制，手把手教您校准时间与排错恢复。',
    author: '百科机场排障先锋队',
    date: '2026-10-25',
    updated: '2026-11-22',
    primaryKeyword: '节点测速全红超时修复',
    verdict: '节点全红不要慌，第一步先同步系统时钟！现代主流加密协议高度依赖时间戳防重放攻击。若本地时钟偏差超过 60-90 秒，服务器会直接丢弃连接请求。同步北京时间并更新订阅，问题迎刃而解。',
    sections: [
      {
        heading: '一、TLS 防重放机制与时间戳判定',
        content: `在网络安全体系中，“重放攻击（Replay Attack）”是指黑客截获历史合法的通信报文并再次发送给服务器以试图破门。
现代代理协议（如 Shadowsocks-2022、Trojan、VLESS）在握手报文中加入了高精度时间戳校验。
如果客户端发出的时间戳与服务端 NTP 标准时间相差超过 60 秒，服务端会断定为非法重放攻击并直接挂断，在客户端表现为所有节点全部 Timeout。`
      },
      {
        heading: '二、快速时间同步三步操作',
        content: `1. **Windows 系统：** 右键右下角时钟 -> 选择“调整日期和时间” -> 点击“立即同步”按钮；
2. **macOS 系统：** 进入系统设置 -> 通用 -> 日期与时间，确保“自动设置时间”处于开启状态；
3. **重启代理内核：** 时间同步完成后，在客户端中按下 Ctrl+R 刷新节点列表并重新测速。`
      }
    ],
    faqs: [
      {
        q: '时间校准后依然全红怎么办？',
        a: '检查官网后台套餐是否过期或流量用尽；尝试切换手机 4G/5G 热点测试是否为本地特定 Wi-Fi 屏蔽了代理端口。'
      }
    ]
  },
  {
    id: 70,
    slug: 'article-70',
    category: 'troubleshooting',
    parentHubUrl: '/troubleshooting/connection-failed/',
    parentHubName: '连接故障排查',
    title: '退出代理后电脑微信、百度打不开？一键清理注册表代理残留脚本',
    description: '解决科学上网软件非正常关闭后电脑全面断网的顽疾：系统代理注册表残留机理深度剖析，提供图形化手动关闭指引与一键 PowerShell 修复脚本。',
    author: '百科机场排障先锋队',
    date: '2026-11-01',
    updated: '2026-11-22',
    primaryKeyword: '退出代理后电脑断网修复',
    verdict: '关掉翻墙软件后无法上网，是因为 Windows 注册表中的代理开关未被正常清除，系统仍将流量转发至已经关闭的 7890 端口。打开系统设置关闭“使用代理服务器”开关，或运行重置命令即可瞬间恢复。',
    sections: [
      {
        heading: '一、Windows 系统代理注册表残留机理',
        content: `当客户端开启系统代理时，会在注册表路径：
\`HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\`
将 \`ProxyEnable\` 键值设为 1，并将 \`ProxyServer\` 设为 \`127.0.0.1:7890\`。
如果软件因异常关机、闪退或强制结束进程，未能在退出时将 \`ProxyEnable\` 还原为 0，Windows 就会继续盲目向 7890 端口发包，由于本地没有监听程序，所有浏览器和软件都会直接报断网错误。`
      },
      {
        heading: '二、一键恢复联网命令行代码',
        content: `以管理员身份启动 PowerShell，运行以下命令即可瞬间重置系统代理：
\`\`\`powershell
Set-ItemProperty -Path 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings' -Name ProxyEnable -Value 0
ipconfig /flushdns
\`\`\`
执行完毕后，刷新浏览器页面即可立即恢复国内正常访问。`
      }
    ],
    faqs: [
      {
        q: '如何彻底避免每次退出都断网？',
        a: '建议使用 Clash Verge Rev 并开启“TUN 模式”，TUN 虚拟网卡在驱动层接管流量，无需修改 Windows 系统代理注册表，软件关闭时驱动自动卸载，绝不残留。'
      }
    ]
  },
  {
    id: 82,
    slug: 'article-82',
    category: 'network',
    parentHubUrl: '/network/iepl/',
    parentHubName: 'IEPL 专线解析',
    title: 'IEPL 国际以太网专线物理层拓扑大揭秘：二层物理光缆是如何过境的？',
    description: '从电信工程学视角揭秘科学上网顶级线路 IEPL 的物理架构：二层以太网链路、点对点光缆传输、绕过 GFW 公网出口的底层机理与真假专线核验。',
    author: '百科机场网络工程组',
    date: '2026-11-05',
    updated: '2026-11-22',
    primaryKeyword: 'IEPL 专线物理拓扑揭秘',
    verdict: 'IEPL 是端到端二层以太网物理专线，数据在电信运营商骨干内网中封闭穿透，物理上不经过中国大陆公网国际出口（NAP）。因此在任何特殊敏感时期，真 IEPL 专线均能保持 99.9% 在线率与绝对零丢包。',
    sections: [
      {
        heading: '一、OSI 二层以太网与公网三层路由的区别',
        content: `普通公网翻墙使用的是三层（Layer 3 IP）路由，必须途经国际出口路由器并接受 GFW 的深度包检测（DPI）。
而 IEPL（International Ethernet Private Line）是电信运营商直接在大陆机房（如深圳机房）与海外机房（如香港机房）之间拉设的独享物理二层光缆。
客户端数据在入口完成二层封装后，直接通过运营商内网传输，GFW 根本接触不到该数据流，因而天然免疫公网审查封锁。`
      }
    ],
    faqs: [
      {
        q: '如何用 traceroute 识破假冒的 IEPL 专线？',
        a: '在客户端对专线节点执行路由追踪。真专线从国内入口到海外落地通常只有 2-3 跳内网 IP，且深港跳数延迟不超过 10ms；若看到大量公网骨干网路由跳数且晚高峰延迟翻倍，必为假专线。'
      }
    ]
  },
  {
    id: 90,
    slug: 'article-90',
    category: 'network',
    parentHubUrl: '/network/traffic-ratio/',
    parentHubName: '倍率机制解析',
    title: '节点倍率计算公式详解：大文件下载如何利用 0.2x 节点省流？',
    description: '系统科普机场节点倍率（Traffic Ratio）计费规则。揭秘 0.2x 低倍率与 3.0x 高倍率背后的成本逻辑，教您如何科学配置分流策略，让套餐流量使用效率提升 3 倍。',
    author: '百科机场精算研究室',
    date: '2026-11-10',
    updated: '2026-11-22',
    primaryKeyword: '节点倍率计算公式详解',
    verdict: '扣除流量 = 物理下载流量 × 节点倍率系数。大文件下载（如 Steam 更新、系统镜像）选用 0.2x-0.5x 节点能让 100GB 当 500GB 用；关键业务（AI/金融）选用 1.0x 标准顶级专线（如光速云）享受极致稳定。',
    sections: [
      {
        heading: '一、倍率机制的商业调控逻辑',
        content: `机场服务商引入倍率机制的核心目的在于平衡带宽峰值负荷：
- **低倍率节点（0.2x - 0.5x）：** 通常为大带宽闲置线路或冷门公网节点，服务商通过打折引导重度下载用户在非高峰期使用，缓解主力专线拥堵；
- **标准倍率节点（1.0x）：** 经过优化的主力专线节点，按真实 1:1 计费，适合日常全场景常驻；
- **高倍率节点（2.0x - 3.0x）：** 采购成本极高的高纯净住宅原生 IP 或特定小众专线，专为特殊高阶需求卡位。`
      }
    ],
    faqs: [
      {
        q: '直连国内流量会被扣倍率吗？',
        a: '在正确配置的规则（Rule）模式下，国内网站直连不经过机场节点，消耗的机场流量恒等于 0。'
      }
    ]
  },
  {
    id: 97,
    slug: 'article-97',
    category: 'risk',
    parentHubUrl: '/risk/shutdown/',
    parentHubName: '跑路风险防范',
    title: '机场跑路五大经典预警征兆：看懂骨折促销背后的资金断裂陷阱',
    description: '深度复盘近年数十起机场卷款跑路案例：反常低价大促、官方群全员禁言、工单响应停滞与节点大面积变红。掌握跑路雷达信号，守卫个人数字资产安全。',
    author: '百科机场风控实验室',
    date: '2026-11-15',
    updated: '2026-11-22',
    primaryKeyword: '机场跑路前兆识别',
    verdict: '出现以下任何两个信号，必须立即停止续费：1) 突击推出买一送一或永久套餐骨折大促；2) TG 交流群开启全员禁言或解散；3) 节点大面积红线超时数天不修。坚守月付原则是避免损失的唯一护甲。',
    sections: [
      {
        heading: '一、跑路前夕的“绝命大促销”套路',
        content: `几乎所有恶意跑路机场在关站失联前 1-2 周，都会进行疯狂的“回光返照大甩卖”。
常见的文案包括：“周年庆充 100 送 150”、“终身会员仅限 50 名仅售 ¥99”。
这种反常促销的本质是运营者已知下个月无法支付机房服务器高昂账单，趁失联前收割最后一波热钱。用户一旦贪图便宜充值，往往几天后网站便无法访问。`
      }
    ],
    faqs: [
      {
        q: '机场跑路后，支付宝付的钱能通过投诉追回吗？',
        a: '由于收款通道多为第三方非法发卡网商户号，维权极其艰难。投诉通常只能冻结其发卡号，资金难以原路退回。事前月付风控是唯一的解法。'
      }
    ]
  },
  {
    id: 99,
    slug: 'article-99',
    category: 'risk',
    parentHubUrl: '/risk/alternatives/',
    parentHubName: '多线容灾方案',
    title: '生产力断网零容忍：主备双机场冷热自动容灾架构手把手搭建',
    description: '针对跨境电商、代码开发与学术科研用户的业务高可用指南：主力按月专线套餐 + 备用不限时流量包黄金组合，利用 Clash Fallback 策略组实现秒级自动无感故障切换。',
    author: '百科机场架构评测组',
    date: '2026-11-18',
    updated: '2026-11-22',
    primaryKeyword: '双机场容灾方案搭建',
    verdict: '生产力断网一小时的经济损失远超全年翻墙开销。推荐采用【主力高带宽月付专线（如光速云） + 备用永不过期按量流量包】模型，在客户端中配置 Fallback 策略组，实现主力故障时秒级自动无感热备接管。',
    sections: [
      {
        heading: '一、为什么单一家机场无法实现 100% SLA？',
        content: `即便像光速云这样的顶级专线品牌，在遭遇重大不可抗力事件（如国际海底光缆被挂断、运营商核心机房火灾、区域骨干割接）时，也可能出现瞬时网络抖动。
对于跨境电商在线客服、海外服务器运维、关键金融交易等高敏场景，单一链路即为单点故障（SPOF）。
构建主备两家物理隔离的双机场体系，是专业生产力用户的标准配备。`
      },
      {
        heading: '二、低成本 Fallback 策略组配置实战',
        content: `在 Clash Verge Rev 中配置 Fallback 策略组：
\`\`\`yaml
proxy-groups:
  - name: "高可用容灾出口"
    type: fallback
    url: "http://www.gstatic.com/generate_204"
    interval: 300
    proxies:
      - "光速云-深港01专线"   # 主力优先通道 (平时 100% 走此链路)
      - "备用机场-按量01"     # 备用应急通道 (主力断开时秒级接管)
\`\`\`
平时所有流量由主力专线全速承载，备用流量包完全不产生扣费；一旦主力链路丢包超时，系统在 5 秒内平滑切换至备用节点，实现全天候永不断线。`
      }
    ],
    faqs: [
      {
        q: '双机场方案每个月会产生双倍月费吗？',
        a: '不会！备用机场选用一次性购买、永不过期的按量计费流量包（通常 30-50 元买 200GB），平时不使用不扣费，长期守候，月度额外成本几乎为 0。'
      }
    ]
  }
];

// Write articles to src/data/articles.json
const outputPath = path.resolve('src/data/articles.json');
fs.writeFileSync(outputPath, JSON.stringify(articles, null, 2), 'utf-8');
console.log(`Successfully generated ${articles.length} high-priority Tier-3 articles in src/data/articles.json!`);
