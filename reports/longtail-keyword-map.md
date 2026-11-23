# 165个长尾关键词映射与搜索意图矩阵报告

- **报告生成时间**: 2026-11-22
- **数据来源**: `data/keywords/longtail-master.csv`, `data/keywords/article-keyword-map.json`
- **覆盖领域**: 10 个一级导航，55 个二级专题

---

## 一、 关键词系统架构与统计

本站关键词智能库采用三级网状聚类模型：
- **一级支柱词（Pillars, 10个）**：代表宽泛行业领域（如“机场推荐”、“客户端软件”、“网络协议”）；
- **二级专题词（SubHubs, 55个）**：代表特定细分赛道（如“便宜机场”、“Clash Verge”、“Fake-IP”）；
- **三级长尾词（Longtail Articles, 165个）**：代表用户在搜索引擎和 AI 对话中的具体真实提问。

### 意图类型分布统计 (Search Intent)

```
[========================= 68% =========================] 信息型 (Informational, 112词)
[========= 24% =========] 商业调查型 (Commercial Investigation, 40词)
[==== 8% ====] 事务型/转化型 (Transactional, 13词)
```

1. **信息型 (Informational, 68%)**：
   - 用户意图：寻求技术原理、客户端安装步骤、报错排查手册、分流规则配置。
   - 承载策略：采用客观中立科普腔调，提供高密度的代码块、图表、对比表，并在关键使用场景自然提及工具与服务。
2. **商业调查型 (Commercial Investigation, 24%)**：
   - 用户意图：寻找“便宜又好用的机场”、“月付机场推荐”、“IEPL 专线哪家强”、“光速云怎么样”。
   - 承载策略：提供横向评测维度、价格梯度对比、退款政策披露及多品牌参数表。
3. **事务型/转化型 (Transactional, 8%)**：
   - 用户意图：“光速云优惠码”、“机场官网注册入口”、“购买不限时流量包”。
   - 承载策略：直达商业注册页，提供优惠码一键复制，明确标明赞助商标识与服务条款。

---

## 二、 关键词优先级分布与落地追踪

| 优先级 | 数量 | 描述与定位 | 生产状态 |
| :--- | :--- | :--- | :--- |
| **P0** | 15 个 | 全站核心刚需、最高搜索量及重大技术卡点词 | **已 100% 生产并上线验证** |
| **P1** | 55 个 | 55 个二级专题对应的第一主力支撑长尾词 | 已完成意图映射与大纲规划，待生产 |
| **P2** | 95 个 | 细分边缘场景、老旧协议迁移与冷门终端排查 | 选题储备库就绪，按周常节奏更新 |

---

## 三、 核心长尾关键词与落地文章映射一览 (部分展示)

| 文章 ID | 核心长尾关键词 | 搜索意图 | 归属二级专题 | 落地状态 |
| :--- | :--- | :--- | :--- | :--- |
| `article-1` | 2026新手翻墙教程 科学上网入门 | Informational | `/tutorials/client-installation/` | **已上线** |
| `article-16` | 5元机场推荐 便宜翻墙可用性实测 | Commercial | `/pricing/cheap/` | **已上线** |
| `article-19` | 月付机场推荐 为什么月付防跑路 | Commercial | `/pricing/monthly/` | **已上线** |
| `article-34` | ChatGPT 1020 报错 Cloudflare 拦截解决 | Informational | `/streaming-ai/chatgpt/` | **已上线** |
| `article-36` | Claude 封号风控解决 原生IP配置 | Informational | `/streaming-ai/claude/` | **已上线** |
| `article-38` | Netflix 只能看自制剧 解锁机理剖析 | Informational | `/streaming-ai/netflix/` | **已上线** |
| `article-49` | Clash Verge Rev 配置教程 TUN 模式 | Informational | `/clients/clash-verge/` | **已上线** |
| `article-51` | Shadowrocket 小火箭 美区 ID 配置教程 | Informational | `/clients/shadowrocket/` | **已上线** |
| `article-61` | Fake-IP 是什么 原理解析 DNS 防污染 | Informational | `/tutorials/routing-rules/` | **已上线** |
| `article-67` | 机场节点超时 测速全红 系统时间同步 | Informational | `/troubleshooting/timeout/` | **已上线** |
| `article-70` | 关掉代理微信打不开 注册表代理残留修复 | Informational | `/troubleshooting/connection-failed/` | **已上线** |
| `article-82` | IEPL 专线原理 二层物理专线拓扑 | Informational | `/network/iepl/` | **已上线** |
| `article-90` | 机场节点倍率计算 0.2x 节点下载省流 | Informational | `/network/traffic-ratio/` | **已上线** |
| `article-97` | 机场跑路前兆 骨折促销资金链断裂 | Informational | `/risk/shutdown/` | **已上线** |
| `article-99` | 双机场主备容灾配置 自动故障转移 | Informational | `/risk/alternatives/` | **已上线** |
