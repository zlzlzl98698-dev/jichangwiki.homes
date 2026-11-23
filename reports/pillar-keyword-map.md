# 10 大一级专题关键词地图与搜索意图边界矩阵

## 一、关键词边界划分原则

为了避免站内页面互相竞争同一个主要关键词（Keyword Cannibalization），我们对 10 大一级专题制定了极其严格的搜索意图边界：

| 序号 | 专题名称 | 主关键词 | 次级关键词 | 长尾搜索词组 | 关键词边界（避免内容竞争） | 承接下游深度页面 |
|---|---|---|---|---|---|---|
| 01 | 机场推荐 | 机场推荐 | 机场排行, 稳定机场, 靠谱机场, 好用的机场 | 2026好用机场有哪些, 新手选什么机场, 晚高峰稳定机场推荐 | 侧重“选哪家以及为什么”，不涉及每档具体套餐计算（归/pricing/），不展开单品牌万字评测（归/reviews/） | `/airport/recommend/`, `/airport/ranking/`, `/brands/guangsu/` |
| 02 | 价格与套餐 | 机场价格与套餐 | 便宜机场, 一元机场, 月付机场, 不限时机场, 性价比机场 | 便宜机场5元一个月, 不限时流量不过期套餐, 一元机场靠谱吗, 年付折算月付骗局 | 侧重“钱怎么花、资费怎么算、倍率怎么扣”，不展开物理光纤专线原理（归/network/） | `/pricing/cheap/`, `/pricing/monthly/`, `/pricing/lifetime/` |
| 03 | 机场品牌 | 机场品牌大全 | 机场品牌库, 机场评测, 品牌官网, 优惠码, 品牌替代 | 31家机场清单对比, 机场品牌排行榜, 光速云官网是多少, 机场折扣码汇总 | 侧重“品牌档案实体资料检索与查询”，不包含具体客户端安装教程（归/tutorials/） | `/brands/directory/`, `/brands/reviews/`, `/brands/official/` |
| 04 | VPN与加速器 | VPN 推荐 | 免费 VPN, 手机 VPN, 安卓 VPN, 游戏加速器, 商业 VPN | VPN和机场有什么区别, 免费VPN安全吗, 手机怎么挂VPN不耗电, 游戏加速器能代替机场吗 | 侧重“传统VPN、代理协议与游戏专线的技术与法律差异”，不涉及 Clash 详细配置（归/clients/） | `/vpn/recommend/`, `/vpn/free/`, `/vpn/gaming/` |
| 05 | 客户端软件 | 代理客户端下载 | Clash Verge, Clash Meta, v2rayN, Shadowrocket, sing-box | Clash Verge下载安装, 小火箭美区购买, sing-box怎么用, Mac M3用什么客户端 | 侧重“软件版本下载、内核架构与平台兼容”，不重复故障排查细节（归/troubleshooting/） | `/clients/clash-verge/`, `/clients/v2rayn/`, `/clients/shadowrocket/` |
| 06 | AI与流媒体 | ChatGPT 机场 | Claude 机场, Gemini 节点, Netflix 解锁, YouTube 4K | ChatGPT提示1020怎么办, Claude防封号节点, 奈飞如何看非自制剧, YouTube送中解决 | 侧重“原生IP质量、流媒体与AI风控对抗验证”，不重复线路延迟与中转测速（归/network/） | `/streaming-ai/chatgpt/`, `/streaming-ai/netflix/`, `/streaming-ai/youtube/` |
| 07 | 线路与节点 | IEPL 专线 | IPLC 专线, 香港节点, 日本节点, 低延迟节点, 线路倍率 | IEPL和IPLC哪个好, 专线为什么不过墙, 机场3倍率怎么算, 晚高峰丢包怎么测 | 侧重“物理光纤、BGP中转、二层三层专线技术原理”，不涉及具体软件配置步骤（归/tutorials/） | `/network/iepl/`, `/network/iplc/`, `/network/hong-kong/` |
| 08 | 使用教程 | 机场使用教程 | 订阅导入, Clash 配置, 分流规则, TUN 模式, 客户端安装 | 机场订阅怎么导入Clash, 小火箭怎么扫码, TUN模式有什么用, 如何设置国内直连海外代理 | 侧重“从零开始的可执行操作全流程与参数解析”，不重复报错诊断（归/troubleshooting/） | `/tutorials/subscription/`, `/tutorials/clash-configuration/`, `/tutorials/tun-mode/` |
| 09 | 故障排查 | 节点超时排查 | 订阅更新失败, 连上无网, DNS 错误, 客户端打不开, 7890端口冲突 | 节点全部红字Timeout怎么解决, 订阅报错403是什么原因, 为什么连上了打不开网页, Clash闪退 | 侧重“现象到原因到修复的标准化排障树”，不涉及品牌购买推荐（归/airport/） | `/troubleshooting/timeout/`, `/troubleshooting/subscription-failed/`, `/troubleshooting/connection-failed/` |
| 10 | 风险与替代 | 机场跑路预警 | 机场避坑, 备用机场, 机场退款, 机场安全性, 隐私窃听 | 怎么看机场是不是跑路了, 机场买几年合适, 机场主能看到我的密码吗, 机场不支持退款怎么办 | 侧重“安全风控、容灾双机场设计、维权与隐私防范”，不展开具体品牌深度评测（归/reviews/） | `/risk/shutdown/`, `/risk/avoid-scams/`, `/risk/alternatives/` |
