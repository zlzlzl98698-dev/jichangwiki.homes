// scripts/append_article_sections.js
import fs from 'node:fs';
import path from 'node:path';

const articlesPath = path.resolve('src/data/articles.json');
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

const articleMap = {};
articles.forEach(a => {
  articleMap[a.id] = a;
});

// Append deeper sections to article 51
articleMap[51].sections.push(
  {
    heading: '四、 高级分流配置与 Lazy 规则集自动更新',
    content: `<p>Shadowrocket 支持极其强大的远程规则集（Rule Sets）。默认情况下，建议在“配置”页面选用经典 ACL4SSR 或 Hackl0us/SS-Rule-Snippet 规则库：</p>
<ul class="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700 my-2">
  <li><strong>国内直连组 (Direct)：</strong> 包含国内主流电商、银行、腾讯阿里系 IP，全部本地直连，完全不消耗机场流量；</li>
  <li><strong>海外加速组 (Proxy)：</strong> 包含 Google、Twitter、GitHub、Wikipedia 等常规受限网站，走标准专线节点；</li>
  <li><strong>流媒体与 AI 分组 (Media/AI)：</strong> 为 Netflix、Disney+、ChatGPT、Claude 分别绑定原生解锁节点，实现自动分流。</li>
</ul>
<p class="text-xs text-slate-600">在设置中开启“自动更新规则”，小火箭会在后台每天静默同步最新规则，确保新出现的国内域名不会被误走代理。</p>`
  },
  {
    heading: '五、 常见报错排障：小火箭连上后频繁断开或提示 VPN 错误',
    content: `<p>如果遇到滑动连接开关后 2 秒内自动断开，请按以下顺序排查：</p>
<ol class="list-decimal pl-5 space-y-1 text-xs text-slate-700 my-2">
  <li>检查 iPhone 系统时间是否准确开启了“自动设置”；</li>
  <li>前往 iOS“设置 -> 通用 -> VPN 与设备管理”，删除所有历史残留的废弃 VPN 描述文件后重新在小火箭中生成；</li>
  <li>检查是否开启了与其他代理软件（如 Quantumult X、Loon）的冲突监听，确保仅保留一个激活中的网络扩展。</li>
</ol>`
  }
);

// Append deeper sections to article 61
articleMap[61].sections.push(
  {
    heading: '四、 Fake-IP 在主机与外服游戏加速中的 UDP 转发优化',
    content: `<p>对于经常使用 Steam、PlayStation、Nintendo Switch 联机的用户，Fake-IP 模式需要特别注意 UDP 转发设置：</p>
<div class="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 my-2">
  <p>部分外服联机游戏采用 P2P 架构，客户端之间需要直接通信真实 IP。若节点不支持 FullCone NAT（完全圆锥型 NAT）或 Fake-IP 未正确过滤游戏语音服务器域名，可能导致语音连不上或 NAT 类型显示 Strict 严苛。在 Clash Verge Rev 中开启 TUN 模式的高级栈（gVisor 或 Mixed 模式），配合支持 FullCone 的优质 IEPL 专线，可将 NAT 类型直接拉满至 Type A / Open 开放级！</p>
</div>`
  },
  {
    heading: '五、 深度对比：Fake-IP vs Redir-Host 选型建议表',
    content: `<div class="overflow-x-auto rounded-xl border border-slate-200 my-3">
  <table class="w-full text-xs text-left">
    <thead class="bg-slate-100 font-bold border-b">
      <tr>
        <th class="p-2.5">对比维度</th>
        <th class="p-2.5">Fake-IP 增强模式</th>
        <th class="p-2.5">传统 Redir-Host 模式</th>
      </tr>
    </thead>
    <tbody class="divide-y bg-white">
      <tr>
        <td class="p-2.5 font-bold">域名解析响应时间</td>
        <td class="p-2.5 text-emerald-600 font-bold">0ms (秒开)</td>
        <td class="p-2.5 text-rose-600">150ms ~ 300ms (跨洋等待)</td>
      </tr>
      <tr>
        <td class="p-2.5 font-bold">本地 DNS 污染风险</td>
        <td class="p-2.5 text-emerald-600 font-bold">100% 免疫 (直接封装域名)</td>
        <td class="p-2.5 text-amber-600">需配合防污染 DoH</td>
      </tr>
      <tr>
        <td class="p-2.5 font-bold">特殊局域网兼容性</td>
        <td class="p-2.5 text-amber-600">需配置 fake-ip-filter 白名单</td>
        <td class="p-2.5 text-emerald-600 font-bold">天然完全兼容</td>
      </tr>
      <tr>
        <td class="p-2.5 font-bold">综合推荐度</td>
        <td class="p-2.5 text-emerald-600 font-bold">★★★★★ (现代主流首选)</td>
        <td class="p-2.5 text-slate-500">★★★☆☆ (仅兼容老设备)</td>
      </tr>
    </tbody>
  </table>
</div>`
  }
);

// Append deeper sections to article 67
articleMap[67].sections.push(
  {
    heading: '四、 Linux 与软路由 OpenWrt 系统的 NTP 授时排查',
    content: `<p>如果您是在家庭软路由或 Linux 服务器上部署代理，系统时钟同样至关重要：</p>
<div class="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs my-2">
  <pre><code># 检查当前系统时钟与 NTP 同步状态
timedatectl status

# 强制启用 NTP 自动网络同步
sudo timedatectl set-ntp true

# 手动同步标准时间 (阿里云 NTP 服务)
sudo ntpdate ntp.aliyun.com</code></pre>
</div>
<p class="text-xs text-slate-600">在软路由 OpenWrt 系统后台中，进入“系统 -> 系统属性”，确保将 NTP 授时服务器配置为 <code>cn.pool.ntp.org</code> 和 <code>ntp.aliyun.com</code>，并勾选“提供 NTP 服务”，彻底杜绝软路由重启后时钟丢失导致的断网灾难。</p>`
  },
  {
    heading: '五、 节点全红全超时的其他三大隐蔽元凶',
    content: `<ul class="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700 my-2">
  <li><strong>订阅到期或流量耗尽：</strong> 登录机场后台查看套餐余量与到期时间，很多时候全红仅仅是因为月结日流量用完了；</li>
  <li><strong>本地安全杀毒软件拦截：</strong> 某些第三方安全软件误将代理内核的本地监听端口（7890）识别为后门程序并进行网络阻断，将 Clash 加入白名单即可；</li>
  <li><strong>运营商本地 DNS 故障：</strong> 宽带运营商 DNS 无法解析机场接入节点的域名，在网卡设置中手动将 DNS 改为 119.29.29.29 与 223.5.5.5 即可修复。</li>
</ul>`
  }
);

// Append deeper sections to article 70
articleMap[70].sections.push(
  {
    heading: '四、 一劳永逸：制作桌面一键修复网络 .bat 批处理脚本',
    content: `<p>为了防止以后再次遇到类似困扰，建议在电脑桌面新建一个名为 <code>修复网络.bat</code> 的文本文件，粘贴以下脚本代码并保存：</p>
<div class="bg-slate-900 text-emerald-300 p-4 rounded-xl font-mono text-xs my-2">
  <pre><code>@echo off
echo 正在清理系统代理残留设置...
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable /t REG_DWORD /d 0 /f
reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyServer /f >nul 2>&1
echo 正在刷新系统 DNS 缓存...
ipconfig /flushdns
echo 修复成功！您的浏览器网络已恢复正常！
pause</code></pre>
</div>
<p class="text-xs text-slate-600">以后遇到类似断网，右键以管理员身份运行这个批处理文件，2 秒内自动解决所有代理残留与 DNS 僵死问题！</p>`
  },
  {
    heading: '五、 终极防范：如何从根本上杜绝代理残留？',
    content: `<div class="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs sm:text-sm text-blue-950 my-2">
  <p><strong>1. 规范退出：</strong> 养成在软件托盘右键选择“Quit”正常退出客户端的习惯，不要通过任务管理器强制结束进程；</p>
  <p><strong>2. 开启 TUN 模式替代系统代理：</strong> 在 Clash Verge Rev 中安装 Service Mode 并开启 TUN 虚拟网卡，完全不需要修改 Windows 系统的 Internet 代理注册表，从根源上消除残留可能！</p>
</div>`
  }
);

// Append deeper sections to article 82
articleMap[82].sections.push(
  {
    heading: '四、 IEPL vs IPLC 专线物理特性横向对比表',
    content: `<div class="overflow-x-auto rounded-xl border border-slate-200 my-3">
  <table class="w-full text-xs text-left">
    <thead class="bg-slate-100 font-bold border-b">
      <tr>
        <th class="p-2.5">技术指标</th>
        <th class="p-2.5">IEPL (国际以太网专线)</th>
        <th class="p-2.5">IPLC (国际私有租用线路)</th>
        <th class="p-2.5">普通公网 BGP 隧道</th>
      </tr>
    </thead>
    <tbody class="divide-y bg-white">
      <tr>
        <td class="p-2.5 font-bold">物理介质层级</td>
        <td class="p-2.5 text-blue-600 font-bold">二层以太网链路 (VLAN)</td>
        <td class="p-2.5 text-blue-600 font-bold">一层物理裸光纤 (TDM)</td>
        <td class="p-2.5 text-slate-500">三层公网 IP 路由</td>
      </tr>
      <tr>
        <td class="p-2.5 font-bold">经过 GFW 审查?</td>
        <td class="p-2.5 text-emerald-600 font-bold">否 (内网物理绕过)</td>
        <td class="p-2.5 text-emerald-600 font-bold">否 (内网物理绕过)</td>
        <td class="p-2.5 text-rose-600 font-bold">是 (必须通过边界路由器)</td>
      </tr>
      <tr>
        <td class="p-2.5 font-bold">晚高峰丢包率</td>
        <td class="p-2.5 text-emerald-600 font-bold">&lt; 0.1% (近乎零丢包)</td>
        <td class="p-2.5 text-emerald-600 font-bold">&lt; 0.1% (极低)</td>
        <td class="p-2.5 text-rose-600 font-bold">15% ~ 35% (严重拥堵)</td>
      </tr>
      <tr>
        <td class="p-2.5 font-bold">敏感时期可用性</td>
        <td class="p-2.5 text-emerald-600 font-bold">100% 稳如磐石</td>
        <td class="p-2.5 text-emerald-600 font-bold">100% 稳如磐石</td>
        <td class="p-2.5 text-rose-600 font-bold">大面积断连或限速</td>
      </tr>
      <tr>
        <td class="p-2.5 font-bold">采购成本</td>
        <td class="p-2.5 text-amber-600 font-bold">极高 (8~15元/Mbps/月)</td>
        <td class="p-2.5 text-amber-600 font-bold">极高 (10~20元/Mbps/月)</td>
        <td class="p-2.5 text-emerald-600 font-bold">极低 (0.5~2元/Mbps/月)</td>
      </tr>
    </tbody>
  </table>
</div>`
  },
  {
    heading: '五、 专线海缆突发断裂时的电信级容灾机制',
    content: `<p>很多人担心：如果国际海底光缆发生地震断裂（如台湾海峡海缆故障），IEPL 专线也会断网吗？</p>
<p class="text-xs sm:text-sm text-slate-700">正规电信运营商的 IEPL 网络具备<strong>环网保护（APS 自动保护倒换）机制</strong>。一旦主用海缆中断，运营商在 50ms 毫秒内自动切换到备用陆缆（如经陆路中俄或者泛亚陆缆系统）恢复通信。这就是为什么光速云等具备双重冗余的专线机场能够做到真正 365 天无感运营的技术底蕴所在。</p>`
  }
);

// Append deeper sections to article 90
articleMap[90].sections.push(
  {
    heading: '四、 避坑警惕：“暗倍率”与倍率刺客的套路曝光',
    content: `<p>在部分不良机场中，存在极具欺骗性的“暗倍率”套路：</p>
<div class="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs text-rose-950 space-y-2 my-2">
  <p><strong>案例：</strong> 节点列表中明明显示 <code>香港01 [1.0x]</code>，但用户在下载了 1GB 文件后，进入用户后台刷新，发现已用流量赫然暴增了 <strong>3GB</strong>！这就是黑心站长在后端面板的计费节点中私下修改了倍率参数。辨别方法：每周定期在用户中心记录当前流量，用一个 100MB 标准文件测试下载，核算扣除量是否吻合。</p>
</div>`
  },
  {
    heading: '五、 常见任务场景的倍率最佳选择决策表',
    content: `<div class="overflow-x-auto rounded-xl border border-slate-200 my-3">
  <table class="w-full text-xs text-left">
    <thead class="bg-slate-100 font-bold border-b">
      <tr>
        <th class="p-2.5">任务场景</th>
        <th class="p-2.5">建议节点倍率</th>
        <th class="p-2.5">核心考量指标</th>
        <th class="p-2.5">推荐代表节点</th>
      </tr>
    </thead>
    <tbody class="divide-y bg-white">
      <tr>
        <td class="p-2.5 font-bold">Steam 游戏下载 / 系统更新</td>
        <td class="p-2.5 text-emerald-600 font-bold">0.1x ~ 0.2x</td>
        <td class="p-2.5">只看重带宽与省流，不看延迟</td>
        <td class="p-2.5">美国/欧洲低倍大带宽节点</td>
      </tr>
      <tr>
        <td class="p-2.5 font-bold">跨国视频会议 / Zoom / Discord</td>
        <td class="p-2.5 text-blue-600 font-bold">1.0x 标准倍率</td>
        <td class="p-2.5">追求超低延迟抖动与零丢包</td>
        <td class="p-2.5">香港/日本 IEPL 专线</td>
      </tr>
      <tr>
        <td class="p-2.5 font-bold">OpenAI / Claude / 海外银行</td>
        <td class="p-2.5 text-amber-600 font-bold">1.5x ~ 2.0x</td>
        <td class="p-2.5">追求住宅 ISP 纯净出口与防封</td>
        <td class="p-2.5">原生美区住宅专线</td>
      </tr>
    </tbody>
  </table>
</div>`
  }
);

// Append deeper sections to article 97
articleMap[97].sections.push(
  {
    heading: '三、 真实机场跑路惨烈案例复盘：从估值千万到一夜蒸发',
    content: `<p>回顾翻墙历史上的几次经典跑路事件（如速鹰、喵帕斯、喵喵加速等知名大站）：</p>
<div class="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 leading-relaxed my-2">
  <p>某曾拥有 10 万订阅的“神级大站”，在跑路前一个月开始以“双十一终极大促”为由，在全网推广“99 元终身套餐”。不到两周时间疯狂揽资数千万元，随后在没有任何预兆的情况下，服务器全部关机，Telegram 频道更名为搞笑频道，全员禁言，无数刚购买了终身套餐的用户欲哭无泪。<strong>记住：在灰产领域，没有哪家个人机场的信誉值得你透支一整年的信任！</strong></p>
</div>`
  },
  {
    heading: '四、 科学上网防跑路三大黄金自保军规',
    content: `<div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 space-y-2 text-xs sm:text-sm text-emerald-950 font-sans">
  <p><strong>军规 1：永远坚持月付消费：</strong> 将跑路造成的最大损失严格锁死在单月十多元的零花钱级别；</p>
  <p><strong>军规 2：主力与备用分家：</strong> 绝不在同一家机场购买两个套餐，主力选用光速云专线，备用选用另一家小众不限时，物理隔离风险；</p>
  <p><strong>军规 3：警惕任何形式的“终身会员”或“三年大促”：</strong> 终身会员等于终结运营的倒计时。听到终身二字，请立刻拔腿就跑！</p>
</div>`
  }
);

// Append deeper sections to article 99
articleMap[99].sections.push(
  {
    heading: '四、 进阶技巧：多策略组嵌套与负载均衡（Load-Balance）拓展',
    content: `<p>除了 fallback 故障转移策略组外，对于需要同时拉取多个 Git 仓库或多线程下载的高阶用户，还可以在 Clash 中配置 <strong>load-balance 负载均衡组</strong>：</p>
<div class="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs my-2">
  <pre><code>proxy-groups:
  - name: "⚖️ 自动负载均衡组"
    type: load-balance
    strategy: consistent-hashing
    url: 'http://cp.cloudflare.com/generate_204'
    interval: 30
    proxies:
      - "光速云-香港01"
      - "光速云-香港02"
      - "光速云-日本01"</code></pre>
</div>
<p class="text-xs text-slate-600">该策略会将不同连接哈希分摊到多条物理专线上，不仅避免单节点带宽满载，还能实现多节点并发吞吐最大化！</p>`
  },
  {
    heading: '五、 容灾系统的定期演练与维护清单',
    content: `<div class="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 space-y-2 my-2">
  <p><strong>1. 每月检查备用订阅有效性：</strong> 确保备用不限时流量包没有因为长时间不用而过期；</p>
  <p><strong>2. 手动模拟断网切换：</strong> 在客户端中手动将主力节点右键测速或者临时禁用，观察浏览器是否在 2 秒内顺利走通备用节点；</p>
  <p><strong>3. 保持客户端内核最新：</strong> 定期更新 Mihomo 内核，享受更灵敏的健康检查探活算法。</p>
</div>`
  }
);

fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
console.log('Appended all deep sections successfully!');
