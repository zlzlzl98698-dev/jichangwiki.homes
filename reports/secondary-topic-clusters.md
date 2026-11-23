# 百科机场二级专题集群与三级文章集群规划架构

> **架构层级**：一级支柱（Pillar） → 二级专题枢纽（Topic Hub） → 三级深度长尾文章（Cluster Article）

---

## 集群 1：商业推荐与选购转化闭环 (/airport/ & /pricing/)

```mermaid
flowchart TD
    P1["/airport/ 机场推荐支柱"] --> H1["/airport/recommend/ 推荐指南"]
    P1 --> H2["/airport/ranking/ 梯队排行榜"]
    P1 --> H3["/airport/reliable/ 靠谱防跑路"]
    P1 --> H4["/airport/stable/ 晚高峰稳定专线"]
    P1 --> H5["/airport/best/ 旗舰顶级机场"]

    H1 --> C1["2026 新手科学上网避坑指南"]
    H1 --> C2["深圳/上海主力专线机场实测"]
    H2 --> C3["亚太晚高峰 1000M 测速天梯图"]
    H3 --> C4["老牌机场财务健康度与运营分析"]
    H4 --> C5["企业级 SLA 专线与跨境远程办公"]
    H5 --> C6["极客与高净值用户的全专线配置"]
```

### 价值闭环：
- 用户搜索“机场推荐”进入 `/airport/recommend/` 查看 Answer-First 评级；
- 点击品牌卡片进入单品牌详情（`/brands/guangsu/`）或深度评测（`/reviews/guangsu/`）；
- 从评测页面的价格表直接点击合规赞助链接完成注册，形成商业闭环。

---

## 集群 2：前沿 AI 生产力与影音娱乐闭环 (/streaming-ai/)

```mermaid
flowchart TD
    P6["/streaming-ai/ 支柱"] --> HAI1["/streaming-ai/chatgpt/"]
    P6 --> HAI2["/streaming-ai/claude/"]
    P6 --> HAI3["/streaming-ai/gemini/"]
    P6 --> HNF["/streaming-ai/netflix/"]
    P6 --> HYT["/streaming-ai/youtube/"]

    HAI1 --> CA1["Cloudflare 企业风控与 IP 纯净度检测"]
    HAI1 --> CA2["国内正规充值 ChatGPT Plus 避封实战"]
    HAI2 --> CA3["Anthropic 账号防封与实体海外卡接码"]
    HAI3 --> CA4["Gemini 1.5 Pro 百万上下文吞吐优化"]
    HNF --> CN1["双 ISP 住宅 IP 与机房 IP 差异技术全景"]
    HYT --> CY1["晚高峰油管 Connection Speed 突破 100k 手册"]
```

---

## 集群 3：硬核线路、协议与客户端技术基石 (/network/ & /clients/ & /tutorials/)

```mermaid
flowchart TD
    P7["/network/ 线路支柱"] --> HIEPL["/network/iepl/"]
    P7 --> HIPLC["/network/iplc/"]
    P5["/clients/ 客户端支柱"] --> HVRG["/clients/clash-verge/"]
    P5 --> HRCK["/clients/shadowrocket/"]
    P8["/tutorials/ 教程支柱"] --> HTUN["/tutorials/tun-mode/"]
    P8 --> HROUT["/tutorials/routing-rules/"]

    HIEPL --> T1["Traceroute 路由跳数与真假 IEPL 鉴别"]
    HVRG --> T2["Clash Verge Rev 服务模式与 Wintun 驱动"]
    HTUN --> T3["终端 Git / Docker / WSL2 透明代理指南"]
    HROUT --> T4["Fake-IP 模式消除 DNS 往返延迟底层实战"]
```

---

## 集群 4：网络急救、排错与资产避险体系 (/troubleshooting/ & /risk/)

```mermaid
flowchart TD
    P9["/troubleshooting/ 排错支柱"] --> HTO["/troubleshooting/timeout/"]
    P9 --> HCF["/troubleshooting/connection-failed/"]
    P10["/risk/ 风险支柱"] --> HSD["/risk/shutdown/"]
    P10 --> HFL["/risk/alternatives/"]

    HTO --> E1["NTP 时间漂移与 TLS 防重放阻断全解析"]
    HCF --> E2["Windows 代理注册表残留一键修复脚本"]
    HSD --> R1["小作坊机场超售崩盘与资金链模型剖析"]
    HFL --> R2["Clash Fallback 策略组双机场冷热自动容灾"]
```
