import fs from 'fs';
import path from 'path';

function writePage(relPath, content) {
  const fullPath = path.resolve('src/pages', relPath);
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf-8');
  console.log(`Generated: src/pages/${relPath}`);
}

function makeFaqJsonLd(url, title, desc, breadcrumbs, faqs) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://jichangwiki.homes' + url,
        'url': 'https://jichangwiki.homes' + url,
        'name': title,
        'description': desc,
        'breadcrumb': {
          '@type': 'BreadcrumbList',
          'itemListElement': breadcrumbs.map((b, i) => ({
            '@type': 'ListItem',
            'position': i + 1,
            'name': b.name,
            'item': 'https://jichangwiki.homes' + b.url
          }))
        }
      },
      {
        '@type': 'FAQPage',
        'mainEntity': faqs.map(f => ({
          '@type': 'Question',
          'name': f.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': f.a
          }
        }))
      }
    ]
  };
}

// -------------------------------------------------------------
// 1. tutorials/subscription.astro
// -------------------------------------------------------------
const subFaqs = [
  {
    q: '为什么说使用不知名的“免费在线订阅转换网站”存在巨大安全隐患？',
    a: '当您将机场订阅 URL 粘贴到公共在线转换平台时，订阅链接中包含的 Token 凭证与全部节点连接密码、端口、落地服务器 IP 将在对方服务器上以明文呈现。不良转换站会记录并抓取这些节点作为免费节点池转售或公开，导致您的套餐流量在不知不觉中被他人盗刷殆尽。'
  },
  {
    q: '如何最安全地进行订阅格式转换？',
    a: '1) 优先选择机场官方后台提供的原生多格式导出（如直接复制 Clash、V2Ray、Sing-box 格式，无需转换）；2) 在本地电脑通过 Docker 或单二进制文件自建开源的 Subconverter 后端转换服务；3) 使用支持内置转换的现代化客户端（如 Clash Verge Rev、v2rayN）。'
  },
  {
    q: '机场订阅导入客户端后更新失败（返回 404、500 或 Timeout）怎么排查？',
    a: '1) 检查是否已经欠费或套餐流量已用尽；2) 确认订阅链接是否被国内网络直接阻断，可尝试在连接已有可用代理的状态下开启“通过代理更新订阅”；3) 检查订阅 URL 中是否包含未正确转义的特殊字符或由于机场更换了订阅主域名导致旧链接失效。'
  },
  {
    q: '什么是聚合订阅？如何将多家机场的订阅合并为一个？',
    a: '聚合订阅是指将来自多个不同机场的节点合并到同一份配置文件中，并统一下发至客户端。这能方便用户在不同机场的专线之间实现主备自动切换（Fallback）或按地区统一负载均衡。'
  },
  {
    q: '光速云的订阅管理机制有何优势？',
    a: '光速云后台提供高防 CDN 订阅下发域名，不仅具备抗封锁的动态分发能力，而且原生支持 Clash、Shadowrocket、Sing-box 一键唤醒导入，杜绝使用第三方转换泄露密钥的风险。'
  },
  {
    q: '订阅链接泄露给朋友会导致封号吗？',
    a: '绝大多数正规机场后台都有严格的“设备并发连接数（IP 并发）限制”。如果与朋友同时跨多个不同公网宽带使用同一订阅，会频繁触发并发超限，导致连接阻断甚至触发反作弊系统临时冻结账号。'
  }
];

const subJsonLd = JSON.stringify(makeFaqJsonLd(
  '/tutorials/subscription/',
  '机场订阅链接导入、格式转换与安全防泄露指南 | 百科机场',
  '全面揭秘第三方在线订阅转换泄露节点的黑幕，详解 Clash/V2Ray/Sing-box 官方直连导入、本地 Docker 转换搭建与订阅排错技巧。',
  [
    { name: '首页', url: '/' },
    { name: '使用教程', url: '/tutorials/' },
    { name: '订阅管理指南', url: '/tutorials/subscription/' }
  ],
  subFaqs
));

const subContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${subJsonLd};
---

<BaseLayout
  title="机场订阅链接导入、格式转换与安全防泄露指南 | 百科机场"
  description="详解科学上网订阅链接的安全使用规范，揭露在线转换盗刷节点内幕，推荐本地 Subconverter 安全搭建与多端一键直连教程。"
  canonical="https://jichangwiki.homes/tutorials/subscription/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/tutorials/" class="hover:text-primary-600 transition-colors">使用教程</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">订阅管理指南</span>
    </nav>

    <header class="bg-gradient-to-br from-blue-950 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-blue-900/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
          安全规范 · 订阅生命周期管理
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          机场订阅管理：安全导入、格式转换与防盗刷手册
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          订阅链接是您访问跨境网络的数字钥匙。不规范的使用习惯往往会导致节点被抓取、流量被恶意盗刷。本文手把手教您构筑安全的订阅管理链条。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-blue-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <span>订阅安全核心铁律</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            <strong>严禁将个人付费订阅粘贴至任何公共在线转换工具！</strong>请优先在机场后台使用官方直接适配的 Clash/Shadowrocket 订阅；如需转换，请使用本地开源 Subconverter 容器或客户端内置功能，彻底杜绝节点泄露。
          </p>
        </div>
      </div>
    </header>

    <!-- 安全指引 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
        <span>订阅管理三大最佳安全实践</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">1. 官方直接下发</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            正规机场后台均提供对应客户端的专用格式，一键唤醒，全流程经过 TLS 加密传输，零第三方介入。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">2. 本地化转换搭建</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            技术玩家推荐使用 Docker 在 NAS 或本地 PC 运行 <code>tindy2013/subconverter</code> 镜像，数据不出内网。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">3. 定期重置防盗刷</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            一旦发现流量异常损耗，立即在机场控制台点击“重置订阅链接”，使历史泄露的 Token 瞬间失效。
          </p>
        </div>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
        <span>具备企业级高防安全订阅的服务商</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">高防动态订阅保护</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全自动化订阅分发</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云部署了全球高防 CDN 订阅加速网络，原生适配全平台主流客户端一键唤醒，支持自定义策略组注入，免去任何第三方格式转换烦恼。
            </p>
          </div>
          <BrandCTA brand={guangsu} />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
        <span>订阅管理疑难解答 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {subFaqs.map(faq => (
          <details class="group bg-white rounded-xl border border-slate-200 p-5 open:bg-slate-50 transition-colors">
            <summary class="font-semibold text-slate-900 cursor-pointer flex justify-between items-center list-none">
              <span>{faq.q}</span>
              <span class="text-blue-600 group-open:rotate-180 transition-transform duration-200">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </span>
            </summary>
            <p class="mt-3 text-slate-600 leading-relaxed text-sm pt-2 border-t border-slate-100">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`;

writePage('tutorials/subscription.astro', subContent);

// -------------------------------------------------------------
// 2. tutorials/clash-configuration.astro
// -------------------------------------------------------------
const cfgFaqs = [
  {
    q: 'Clash 配置文件报 `yaml: line X: mapping values are not allowed here` 是什么原因？',
    a: 'YAML 语法对空格缩进极其敏感。此错误 100% 是由于在某一行使用了 Tab 制表符代替空格，或者冒号后忘记加空格（正确的语法是 `key: value` 而非 `key:value`）。建议使用 VS Code 或专业的 YAML 编辑器进行语法高亮检查。'
  },
  {
    q: '`url-test`、`fallback` 与 `load-balance` 策略组有什么不同？',
    a: '`url-test` 会定时向健康检查地址（如 `http://www.gstatic.com/generate_204`）发送测速包，自动选择延迟最低的节点；`fallback` 按照列表顺序优先使用第一个存活节点，当前者超时时才按序灾备降级；`load-balance` 会在多个节点间根据哈希或权重分散分发 TCP 连接。日常推荐将核心流媒体和 AI 设为 `fallback` 或固定节点以防出口 IP 频繁跳动。'
  },
  {
    q: '如何在不改动机场订阅的前提下追加自己的自定义规则？',
    a: '在 Clash Verge Rev 中使用“扩展配置 (Merge)”功能。在自定义规则中添加需要的规则片段，软件在每次拉取机场新订阅后会自动执行对象合并，您的自定义规则永远生效且不会被机场更新覆盖。'
  },
  {
    q: '为什么 `url-test` 策略组频繁切换导致网页会话掉线？',
    a: '这是由于测速容差（Tolerance）设置过小。如果容差设为 0，哪怕节点 A 仅比节点 B 快 1ms 也会触发切换。建议在配置中增加 `tolerance: 50`（毫秒），只有当延迟差距超过 50ms 时才执行节点切换，保持长连接稳定。'
  },
  {
    q: '光速云下发的默认 Clash 配置结构如何？',
    a: '光速云精心设计了策略组结构：分离了“国外媒体”、“OpenAI 智能服务”、“电竞对战”、“节点选择”与“故障回退”策略，用户直接导入即可享受到最符合人体工程学的分流逻辑。'
  },
  {
    q: '如何让某个特定软件或域名强制走直连（DIRECT）？',
    a: '在 rules 列表的靠前位置添加一行：`DOMAIN-SUFFIX,example.com,DIRECT` 或 `PROCESS-NAME,Telegram.exe,DIRECT`（仅 TUN/系统代理支持进程名规则）。注意规则是自顶向下匹配，命中了立即终止。'
  }
];

const cfgJsonLd = JSON.stringify(makeFaqJsonLd(
  '/tutorials/clash-configuration/',
  'Clash 进阶配置与规则语法完全手册 - 策略组、URL-Test与容灾设计 | 百科机场',
  '深度解析 Clash YAML 配置文件规范，手把手教您设计 Proxy-Group 策略组、调优 url-test 测速容差、配置 fallback 容灾及编写自定义规则。',
  [
    { name: '首页', url: '/' },
    { name: '使用教程', url: '/tutorials/' },
    { name: 'Clash 进阶配置', url: '/tutorials/clash-configuration/' }
  ],
  cfgFaqs
));

const cfgContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${cfgJsonLd};
---

<BaseLayout
  title="Clash 进阶配置与规则语法完全手册 - 策略组与容灾设计 | 百科机场"
  description="面向进阶用户的 Clash YAML 配置权威指南，详解 Proxy-Group 策略组拓扑、url-test 容差防抖动调优与 Merge 扩展规则实战。"
  canonical="https://jichangwiki.homes/tutorials/clash-configuration/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/tutorials/" class="hover:text-primary-600 transition-colors">使用教程</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">Clash 进阶配置</span>
    </nav>

    <header class="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-indigo-900/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 mb-4">
          极客进阶 · YAML 语法与策略组工程
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          Clash 进阶配置与规则语法手册：构建高可用网络系统
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          掌握 Clash 核心的配置语法，是实现网络体验彻底自由的关键一步。本文带您深入 YAML 规则树，打造具备自动容灾、流量分流与防抖动能力的高素质网络架构。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-indigo-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
            <span>架构设计核心心法</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            <strong>核心业务忌用过度自动化的 url-test！</strong>ChatGPT 和银行等高风控业务，出口 IP 频繁漂移是导致封号的元凶。建议将 AI 与流媒体绑定至稳定的固定专线节点，而仅将普通网页搜索放入自动优选组。
          </p>
        </div>
      </div>
    </header>

    <!-- 策略组类型对比 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
        <span>Clash 三大核心策略组应用场景</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xl font-bold text-indigo-600 mb-2">select (手动选择)</div>
          <h3 class="font-bold text-slate-900 mb-2">固定业务首选</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            用户手动指定节点，出口 IP 永不漂移，最适合 Claude、ChatGPT 以及特定国家合规业务。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xl font-bold text-blue-600 mb-2">url-test (自动测速)</div>
          <h3 class="font-bold text-slate-900 mb-2">网页浏览加速</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            定时向健康检查 URL 发包，自动调度至延迟最低节点，必须设置 <code>tolerance: 50</code> 防止频繁跳动。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xl font-bold text-emerald-600 mb-2">fallback (故障回退)</div>
          <h3 class="font-bold text-slate-900 mb-2">高可用容灾保障</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            平时优先走主力专线，仅当主力节点物理中断超时，才无感顺位切换到备用专线，稳定可靠。
          </p>
        </div>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
        <span>配置规范优雅的标准服务商</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider">结构严谨免维护</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全自动化标准规则下发</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云官方下发的 Clash 配置遵循严苛的工业级标准，开箱即具备流媒体、AI 与自动容灾策略组，免去初学者手动写 YAML 报错的烦恼。
            </p>
          </div>
          <BrandCTA brand={guangsu} />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
        <span>Clash 配置常见疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {cfgFaqs.map(faq => (
          <details class="group bg-white rounded-xl border border-slate-200 p-5 open:bg-slate-50 transition-colors">
            <summary class="font-semibold text-slate-900 cursor-pointer flex justify-between items-center list-none">
              <span>{faq.q}</span>
              <span class="text-indigo-600 group-open:rotate-180 transition-transform duration-200">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </span>
            </summary>
            <p class="mt-3 text-slate-600 leading-relaxed text-sm pt-2 border-t border-slate-100">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`;

writePage('tutorials/clash-configuration.astro', cfgContent);

// -------------------------------------------------------------
// 3. tutorials/routing-rules.astro
// -------------------------------------------------------------
const routeFaqs = [
  {
    q: 'Clash 分流规则匹配的优先级是怎样的？',
    a: 'Clash 规则引擎遵循“严格自顶向下、首次命中即终止（First-Match Wins）”的执行逻辑。如果将宽泛的 `GEOIP,CN,DIRECT` 放在最顶部，所有注册在大陆境内的海外镜像服务可能会被提前拦截；正确的顺序应当是：先放精准域名（DOMAIN / DOMAIN-SUFFIX），再放动态规则集（RULE-SET / GEOSITE），最后才是基于 IP 的 GEOIP 与 MATCH 兜底。'
  },
  {
    q: '什么是 DNS 泄露？分流规则是如何防止 DNS 污染与泄露的？',
    a: '当您访问受限海外网站时，如果本机的操作系统直接向国内运营商的 DNS 服务器（如 114.114.114.114 或本地宽带 DNS）发起了明文解析请求，防火墙会立即返回虚假的污染 IP，导致网页无法打开并记录您的访问行为。分流引擎通过建立国内/海外两套独立 DNS 递归通道（Fake-IP 或国内外独立分组解析），彻底杜绝 DNS 泄露。'
  },
  {
    q: 'Fake-IP 模式与 Redir-Host 模式有什么根本区别？',
    a: 'Redir-Host 模式必须等待远程 DNS 解析出真实 IP 才能建立连接，延迟较高且可能遭遇污染；Fake-IP 模式在本地收到 DNS 请求时瞬间返回一个内部保留的虚假 IP（如 198.18.0.x），立刻建立 TCP 连接，并将域名放入内部缓存，通过专线向海外落地服务器发送真实域名，极大地消除了本地 DNS 往返延迟。'
  },
  {
    q: '国内很多金融类 App 提示“检测到代理环境”怎么办？',
    a: '在 rules 中添加精准直连规则：将此类 App 的根域名或进程名设为 DIRECT，并在客户端中排除局域网。更彻底的做法是开启分应用代理，完全将金融类软件排除在代理接管范围之外。'
  },
  {
    q: '光速云的规则库更新频率如何？',
    a: '光速云原生支持动态远程 Rule-Providers 规则集，客户端会自动每天增量同步 LoyalSoldier 等全球维护最活跃的权威分流库，确保新域名即刻生效。'
  },
  {
    q: '最后一行的 `MATCH,PROXY` 与 `MATCH,DIRECT` 该怎么设？',
    a: '建议设置为 `MATCH,漏网之鱼` 策略组（或默认指向代理）。这样当遇到未在规则库收录的新型海外科研、冷门站点时，能自动走代理顺利打开，避免出现网页打不开的死循环。'
  }
];

const routeJsonLd = JSON.stringify(makeFaqJsonLd(
  '/tutorials/routing-rules/',
  '路由与分流规则深度实操手册 - GEOIP、Fake-IP与防DNS污染 | 百科机场',
  '系统讲解现代代理客户端的分流路由决策机制，涵盖自顶向下匹配法则、Fake-IP极速建连原理、DNS防泄漏配置与国内应用白名单实战。',
  [
    { name: '首页', url: '/' },
    { name: '使用教程', url: '/tutorials/' },
    { name: '路由规则实操', url: '/tutorials/routing-rules/' }
  ],
  routeFaqs
));

const routeContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${routeJsonLd};
---

<BaseLayout
  title="路由与分流规则深度实操手册 - GEOIP与Fake-IP原理实战 | 百科机场"
  description="深度解析代理客户端的核心路由分流决策算法，详解规则优先级、Fake-IP 无感秒开、DNS 污染防范与金融 App 豁免技巧。"
  canonical="https://jichangwiki.homes/tutorials/routing-rules/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/tutorials/" class="hover:text-primary-600 transition-colors">使用教程</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">路由规则实操</span>
    </nav>

    <header class="bg-gradient-to-br from-teal-950 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-teal-900/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-400/30 mb-4">
          智能调度核心 · 分流算法揭秘
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          路由与分流规则实操手册：精准调度与无感穿透
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          优秀的科学上网体验应当是“润物细无声”的——访问国内丝滑免风控，访问海外秒开无阻断。本文带您掌握底层的规则树设计与 Fake-IP DNS 核心机制。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-teal-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>分流规则设计黄金次序</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            规则严格遵循<strong>“自顶向下、首次命中即终止”</strong>：<br/>
            1. 自定义高优先级直连与阻断 (DOMAIN-KEYWORD / DOMAIN-SUFFIX)<br/>
            2. 垂直业务规则集 (OpenAI, Netflix, Telegram, GitHub)<br/>
            3. 大陆域名直连 (GEOSITE,CN,DIRECT)<br/>
            4. 大陆 IP 段直连 (GEOIP,CN,DIRECT)<br/>
            5. 兜底策略组 (MATCH,PROXY)
          </p>
        </div>
      </div>
    </header>

    <!-- 规则实战解析 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-teal-600 rounded-full inline-block"></span>
        <span>Fake-IP 模式为何能实现秒开？</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-md mb-3">传统模式</div>
          <h3 class="text-lg font-bold text-slate-900 mb-2">Redir-Host 阻塞等待</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            本地必须先等待远程 DNS 解析出真实 IP 地址后，操作系统才能开始发起 TCP 握手。网络往返时间（RTT）翻倍，且极易遭本地 DNS 劫持。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-md mb-3">现代模式</div>
          <h3 class="text-lg font-bold text-slate-900 mb-2">Fake-IP 毫秒级瞬时应答</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            本地 DNS 请求瞬间收到内核生成的虚拟 IP 响应，TCP 握手即刻建立，目标域名交由境外专线落地机房进行远端递归解析，零延迟防污染。
          </p>
        </div>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-teal-600 rounded-full inline-block"></span>
        <span>完美配合精准分流的高可靠品牌</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-teal-600 uppercase tracking-wider">智能分流保障</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全天候智能规则分流</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云官方下发的规则集经过海量大陆用户实测验证，国内微信网银 100% 毫秒直连，海外 OpenAI 与流媒体秒级调度，告别误杀与异地登录警告。
            </p>
          </div>
          <BrandCTA brand={guangsu} />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-teal-600 rounded-full inline-block"></span>
        <span>路由与分流常见疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {routeFaqs.map(faq => (
          <details class="group bg-white rounded-xl border border-slate-200 p-5 open:bg-slate-50 transition-colors">
            <summary class="font-semibold text-slate-900 cursor-pointer flex justify-between items-center list-none">
              <span>{faq.q}</span>
              <span class="text-teal-600 group-open:rotate-180 transition-transform duration-200">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </span>
            </summary>
            <p class="mt-3 text-slate-600 leading-relaxed text-sm pt-2 border-t border-slate-100">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`;

writePage('tutorials/routing-rules.astro', routeContent);

// -------------------------------------------------------------
// 4. tutorials/tun-mode.astro
// -------------------------------------------------------------
const tunFaqs = [
  {
    q: '什么是 TUN 模式？它与传统的“系统代理（System Proxy）”有何区别？',
    a: '系统代理仅修改 Windows/macOS 的 HTTP 代理注册表，只能接管标准的浏览器网页请求，对很多不读取系统代理的软件（如命令行终端 Git/Curl、Docker、Steam 游戏进程、Discord 语音通话）完全无效；TUN（Network TUNnel）模式会在操作系统底层创建一个虚拟网卡，强制接管系统三层全部网络流量，真正实现 100% 全应用无死角透明代理。'
  },
  {
    q: '在 Clash Verge Rev 中开启 TUN 模式前为什么必须安装“服务模式（Service Mode）”？',
    a: '创建并管理操作系统的三层虚拟网卡需要超级管理员（Administrator / Root）权限。服务模式会在系统中常驻一个安全的高权限后台服务，负责与 Wintun 驱动交互，避免普通用户权限不足导致创建虚拟网卡失败。'
  },
  {
    q: '开启 TUN 模式后为什么命令行（CMD / PowerShell）执行 Git 依然很慢？',
    a: '检查 Git 是否之前手动硬编码了旧的代理设置（如 `git config --global http.proxy`）。如果手动设置了指向一个已关闭的端口，即使开启了 TUN 也会报错或超时。执行 `git config --global --unset http.proxy` 清除旧配置即可让其顺畅走 TUN 虚拟网卡。'
  },
  {
    q: 'TUN 模式下的“网络协议栈（Stack）”选 gVisor、System 还是 Mixed？',
    a: '推荐选择 `Mixed` 或 `System`。System 栈基于操作系统原生内核协议栈，性能最高、延迟最低；gVisor 是 Google 开源的用户态协议栈，兼容性最好但 CPU 占用稍高；Mixed 模式对 TCP 使用 System 栈，对 UDP 使用特定优化，兼具了性能与稳定性。'
  },
  {
    q: '光速云专线是否完美支持 TUN 模式下的全应用接管？',
    a: '完全支持。光速云具备充沛的 UDP 端口转发能力与 Full Cone NAT 穿透，配合 TUN 模式可完美胜任终端代码拉取、外服电竞联机与大型海外生产力软件通讯。'
  },
  {
    q: '开启 TUN 模式后电脑无法访问公司局域网共享或打印机怎么办？',
    a: '请在 TUN 配置中确认勾选了“排除本地局域网（Bypass Private / LAN Networks）”选项，确保 `192.168.0.0/16`、`10.0.0.0/8` 等内网私有网段直接直连，不进入虚拟网卡。'
  }
];

const tunJsonLd = JSON.stringify(makeFaqJsonLd(
  '/tutorials/tun-mode/',
  'TUN 虚拟网卡模式完全配置指南 - 全局接管、终端加速与电竞实战 | 百科机场',
  '全面详解 TUN 虚拟网卡底层工作原理，指导用户安装服务模式与 Wintun 驱动，彻底解决命令行 Git、Docker 及外服游戏不走代理的痛点。',
  [
    { name: '首页', url: '/' },
    { name: '使用教程', url: '/tutorials/' },
    { name: 'TUN模式配置指南', url: '/tutorials/tun-mode/' }
  ],
  tunFaqs
));

const tunContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${tunJsonLd};
---

<BaseLayout
  title="TUN 虚拟网卡模式完全配置指南 - 全局接管与终端加速实战 | 百科机场"
  description="详解科学上网终极形态 TUN 模式：虚拟网卡底层原理、Wintun 驱动配置、Git/Docker 命令行透明代理及外服游戏加速全攻略。"
  canonical="https://jichangwiki.homes/tutorials/tun-mode/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/tutorials/" class="hover:text-primary-600 transition-colors">使用教程</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">TUN模式配置指南</span>
    </nav>

    <header class="bg-gradient-to-br from-violet-950 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-violet-900/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-400/30 mb-4">
          终极代理形态 · 100% 全应用透明接管
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          TUN 虚拟网卡模式完全实战指南：告别漏油与终端断连
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          很多时候即便开启了翻墙软件，Git、Docker、Steam 依然频繁报错超时。本文教您利用操作系统底层 TUN 虚拟网卡，实现全生态透明接管。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-violet-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            <span>TUN 模式核心评测结论</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            普通系统代理只是“君子协定”，软件可选择性忽略；<strong>TUN 模式是内核级“强制交通管制”</strong>，所有进出数据包在虚拟网卡层被无差别分流。开发者与极客用户强烈建议常驻开启 TUN 模式。
          </p>
        </div>
      </div>
    </header>

    <!-- 实操三大步 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-violet-600 rounded-full inline-block"></span>
        <span>开启 TUN 模式核心三部曲</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">1. 安装服务模式</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            在 Clash Verge Rev 设置中点击“安装服务模式”，授予管理员权限，建立守护进程。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">2. 选择协议栈</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            协议栈推荐选择 <code>Mixed</code> 或 <code>System</code>，以获得最低 CPU 占用与极致网络吞吐。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">3. 拨动开关测试</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            开启 TUN 模式开关，在终端中执行 <code>curl https://ipinfo.io</code> 验证输出是否已为专线落地 IP。
          </p>
        </div>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-violet-600 rounded-full inline-block"></span>
        <span>TUN 全局模式搭配的高素质专线</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-violet-600 uppercase tracking-wider">全协议吞吐支持</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全天候 TUN 全场景支撑</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云具备对 UDP 与 ICMP 报文的完整转发优化，配合 TUN 模式可让您的开发终端、AI 调试工具与外服游戏如同身处硅谷本地内网。
            </p>
          </div>
          <BrandCTA brand={guangsu} />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-violet-600 rounded-full inline-block"></span>
        <span>TUN 模式常见疑难 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {tunFaqs.map(faq => (
          <details class="group bg-white rounded-xl border border-slate-200 p-5 open:bg-slate-50 transition-colors">
            <summary class="font-semibold text-slate-900 cursor-pointer flex justify-between items-center list-none">
              <span>{faq.q}</span>
              <span class="text-violet-600 group-open:rotate-180 transition-transform duration-200">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </span>
            </summary>
            <p class="mt-3 text-slate-600 leading-relaxed text-sm pt-2 border-t border-slate-100">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`;

writePage('tutorials/tun-mode.astro', tunContent);

// -------------------------------------------------------------
// 5. tutorials/client-installation.astro
// -------------------------------------------------------------
const instFaqs = [
  {
    q: '全平台客户端下载首选官方渠道是什么？为什么严禁使用网盘搜来的安装包？',
    a: '正规开源客户端（Clash Verge Rev、v2rayN、Mihomo、sing-box）的唯一权威发布渠道是其官方 GitHub 仓库的 Release 页面；iOS 端唯一正规渠道是非大陆区 App Store。网盘搜来的破解版或安装包往往被黑产嵌入了静默挖矿脚本、键盘记录器或恶意推广木马，造成严重财产与隐私损失。'
  },
  {
    q: 'Windows 11 安装客户端提示“Windows 保护了你的电脑 (SmartScreen)”怎么办？',
    a: '开源客户端由于没有向微软购买昂贵的企业数字签名证书，Windows Defender 会默认提示未受信任。只要确认是从官方 GitHub Release 下载的安装包，点击提示窗口中的“更多信息”，再点击“仍要运行”即可正常安装。'
  },
  {
    q: 'macOS 安装提示“无法打开，因为 Apple 无法检查其是否包含恶意软件”怎么解决？',
    a: '打开系统【设置 -&gt; 隐私与安全性】，向下滚动到安全性一栏，会看到该客户端的拦截记录，点击“仍要打开”；或者打开终端执行：`sudo xattr -d com.apple.quarantine /Applications/应用名.app` 即可永久解除隔离机制。'
  },
  {
    q: '如何为家人或小白用户挑选上手门槛最低的客户端？',
    a: 'Windows / Mac 首选 Clash Verge Rev（界面清爽中文，一键配置）；Android 首选 FlClash（美观现代）或 Clash Meta for Android；iOS 首选 Shadowrocket（购买后扫码即用）。'
  },
  {
    q: '光速云针对新手提供了哪些配套客户端下载与辅助？',
    a: '光速云在用户中心提供了全平台最新正版客户端的一键高速镜像下载，彻底避免了因无法访问 GitHub 而下载不到软件的“先有鸡还是先有蛋”难题。'
  },
  {
    q: '同一台电脑上可以同时安装运行两个不同的翻墙客户端吗？',
    a: '可以同时安装，但严禁同时开启！因为多个客户端会争抢系统的默认代理端口（如 7890）与虚拟网卡网关，导致流量拦截冲突、严重死锁甚至系统断网。'
  }
];

const instJsonLd = JSON.stringify(makeFaqJsonLd(
  '/tutorials/client-installation/',
  '客户端安装与环境配置全平台教程 - 权威官方渠道与防坑指南 | 百科机场',
  '全平台客户端正版官方下载与安装指南，覆盖 Windows Defender 绕行、macOS 安全隔离绕过、iOS 账号切换及防木马打包避坑。',
  [
    { name: '首页', url: '/' },
    { name: '使用教程', url: '/tutorials/' },
    { name: '客户端安装指南', url: '/tutorials/client-installation/' }
  ],
  instFaqs
));

const instContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${instJsonLd};
---

<BaseLayout
  title="客户端安装与环境配置全平台教程 - 权威官方渠道与防坑指南 | 百科机场"
  description="面向多操作系统用户的科学上网客户端正规安装指南，详解 Windows/macOS/iOS/Android 官方安全下载、系统权限配置与避坑秘籍。"
  canonical="https://jichangwiki.homes/tutorials/client-installation/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/tutorials/" class="hover:text-primary-600 transition-colors">使用教程</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">客户端安装指南</span>
    </nav>

    <header class="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-emerald-900/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-4">
          入坑第一步 · 安全规范与全平台交付
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          客户端安装与环境配置全平台指南：正规下载与防坑
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          没有安全的客户端，再好的专线也只是空中楼阁。本文手把手指导您在 Windows、macOS、iOS 与 Android 上规范安装纯净开源程序，绕过误报陷阱。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-emerald-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>正版下载安全第一准则</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            认准官方开源仓库（GitHub Releases）与官方 App Store。严禁从不知名第三方软件站、百度搜索推广链接或陌生网盘下载客户端安装包，避免木马植入。
          </p>
        </div>
      </div>
    </header>

    <!-- 四大平台推荐组合 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-emerald-600 rounded-full inline-block"></span>
        <span>四大操作系统正规首选方案矩阵</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-lg font-bold text-slate-900 mb-2">💻 Windows</div>
          <p class="text-sm text-indigo-600 font-semibold mb-2">Clash Verge Rev</p>
          <p class="text-slate-600 text-xs leading-relaxed">官方 GitHub 下载 x64-setup.exe，安装服务模式，开启 TUN 模式享受全局代理。</p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-lg font-bold text-slate-900 mb-2">🍏 macOS</div>
          <p class="text-sm text-indigo-600 font-semibold mb-2">Clash Verge Rev</p>
          <p class="text-slate-600 text-xs leading-relaxed">根据 Apple Silicon 或 Intel 芯片选择相应 dmg 包，遇到安全拦截在终端执行隔离移除。</p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-lg font-bold text-slate-900 mb-2">📱 iOS (苹果)</div>
          <p class="text-sm text-indigo-600 font-semibold mb-2">Shadowrocket (小火箭)</p>
          <p class="text-slate-600 text-xs leading-relaxed">在外区 App Store 搜索购买正版（开发者 Pan Guoqing），配置模式全天低耗常驻。</p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-lg font-bold text-slate-900 mb-2">🤖 Android</div>
          <p class="text-sm text-indigo-600 font-semibold mb-2">FlClash / CMFA</p>
          <p class="text-slate-600 text-xs leading-relaxed">下载官方 APK，开启系统电池“无限制”与自启动权限，设置分应用代理杜绝误杀。</p>
        </div>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-emerald-600 rounded-full inline-block"></span>
        <span>提供多端客户端镜像支持的专线品牌</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider">小白友好配套</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全平台正版镜像专区</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云在控制台为用户贴心提供了全平台正版客户端的国内高速分发下载与图文图解指南，即使新手也能在 3 分钟内轻松搭建好翻墙环境。
            </p>
          </div>
          <BrandCTA brand={guangsu} />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-emerald-600 rounded-full inline-block"></span>
        <span>安装与配置常见疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {instFaqs.map(faq => (
          <details class="group bg-white rounded-xl border border-slate-200 p-5 open:bg-slate-50 transition-colors">
            <summary class="font-semibold text-slate-900 cursor-pointer flex justify-between items-center list-none">
              <span>{faq.q}</span>
              <span class="text-emerald-600 group-open:rotate-180 transition-transform duration-200">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </span>
            </summary>
            <p class="mt-3 text-slate-600 leading-relaxed text-sm pt-2 border-t border-slate-100">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>

    <AffiliateDisclosure />
  </div>
</BaseLayout>
`;

writePage('tutorials/client-installation.astro', instContent);

console.log('ALL 5 TUTORIALS SECONDARY PAGES WRITTEN!');
