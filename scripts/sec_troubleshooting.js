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
// 1. troubleshooting/timeout.astro
// -------------------------------------------------------------
const timeoutFaqs = [
  {
    q: '客户端测速显示全红、全部节点显示“Timeout / 超时”是为什么？',
    a: '全部节点同时超时通常有三大核心诱因：1) 机场订阅已过期或套餐内流量已全部耗尽；2) 本地电脑时间与互联网标准时间偏差超过 90 秒，导致 TLS 加密证书握手被目标服务器直接强行拒绝；3) 您所在的宽带运营商（如某些校园网、企业内网）屏蔽了 UDP 或所有非标代理端口。'
  },
  {
    q: '为什么一定要检查并校准“电脑/手机系统时间”？',
    a: '现代主流加密协议（Trojan、Shadowsocks-2022、VLESS Reality 等）全部高度依赖基于时间戳的防重放攻击校验机制。若设备系统时间偏差大于 60-90 秒，代理服务端会认为这是黑客伪造的历史重放攻击报文，立刻将握手静默丢弃，表现为全节点测速超时。'
  },
  {
    q: '个别节点显示超时，而其它节点正常，该怎么排查？',
    a: '说明本地网络和客户端配置是正常的，仅该节点后端发生了故障。可能原因：1) 该落地节点服务器正在维护、重启或更换 IP；2) 机场的对应内网专线正在调度切换；3) 节点触发了并发连接数上限。此时只需在客户端切换到同地区的其它备用节点即可。'
  },
  {
    q: '如何在 Windows / Mac 快速校准系统时间？',
    a: 'Windows：右键右下角时间 -&gt; “调整日期和时间” -&gt; 点击“立即同步”按钮；macOS：进入“系统设置 -&gt; 通用 -&gt; 日期与时间”，关闭后重新打开“自动设置时间与日期”。'
  },
  {
    q: '光速云针对节点超时有哪些高可用保障？',
    a: '光速云配备了分布于多地的冗余入口集群与自动化节点健康巡检系统，一旦检测到某条专线延迟异常或阻断，系统将在 15 秒内自动通过 BGP 路由重定向至备用专线，大幅降低超时概率。'
  },
  {
    q: '移动 4G/5G 热点能连上，但家里电信宽带连不上超时是怎么回事？',
    a: '这通常表明机场的国内入口服务器 IP 遭到了您所在省份特定宽带运营商的路由阻断或 QoS 限速。在客户端选择标注有“电信优化”或“多线 BGP”的节点，或者更新订阅获取最新入口即可解决。'
  }
];

const timeoutJsonLd = JSON.stringify(makeFaqJsonLd(
  '/troubleshooting/timeout/',
  '节点连接超时 (Timeout) 排查与修复指南 - 解决全红全死与时间校准 | 百科机场',
  '全面排查代理节点全部超时、Ping测速全红、TCP握手失败与端口被阻断难题，提供从时间戳同步到BGP入口调优的标准处置路径。',
  [
    { name: '首页', url: '/' },
    { name: '故障排查', url: '/troubleshooting/' },
    { name: '节点连接超时排查', url: '/troubleshooting/timeout/' }
  ],
  timeoutFaqs
));

const timeoutContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${timeoutJsonLd};
---

<BaseLayout
  title="节点连接超时 (Timeout) 排查与修复指南 - 解决全红全死 | 百科机场"
  description="针对科学上网节点测速全部超时、连接失败全红报错，系统排查系统时间偏差、协议防重放机制、端口封锁与运营商QoS限制。"
  canonical="https://jichangwiki.homes/troubleshooting/timeout/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/troubleshooting/" class="hover:text-primary-600 transition-colors">故障排查</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">节点超时排查</span>
    </nav>

    <header class="bg-gradient-to-br from-rose-950 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-rose-900/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-400/30 mb-4">
          急救排障手册 · 节点全死攻坚
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          节点连接超时 (Timeout) 深度排查指南：从全红到绿灯
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          打开客户端测速，节点列表赫然全红全部 Timeout？不要慌张。按照本文给出的工业级故障排查树，5 分钟内精准定位并恢复网络连接。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-rose-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <span>排障第一黄金定律 (Golden Rule)</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            节点全红的第一反应，<strong>90% 的概率是您的电脑系统时间与标准北京时间偏差超过了 90 秒</strong>！请立刻点击系统右下角时钟进行“立即同步时间”。TLS 防重放机制严禁时间漂移。
          </p>
        </div>
      </div>
    </header>

    <!-- 四步排障流程 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-rose-600 rounded-full inline-block"></span>
        <span>超时故障四步闭环诊断法</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xl font-bold text-rose-600 mb-2">第 1 步：校准时间</div>
          <p class="text-slate-600 text-sm leading-relaxed">Windows/Mac 系统设置中点击同步时间，确保本地时间与标准 NTP 时间误差在 1 秒以内。</p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xl font-bold text-rose-600 mb-2">第 2 步：核对账户</div>
          <p class="text-slate-600 text-sm leading-relaxed">登录机场官网后台，检查套餐是否已到期、剩余流量是否耗尽、订阅状态是否正常激活。</p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xl font-bold text-rose-600 mb-2">第 3 步：更新订阅</div>
          <p class="text-slate-600 text-sm leading-relaxed">在客户端中右键订阅选择“更新”，拉取最新专线入口 IP 与端口，淘汰历史失效节点。</p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="text-xl font-bold text-rose-600 mb-2">第 4 步：换网交叉测试</div>
          <p class="text-slate-600 text-sm leading-relaxed">用手机开启 4G/5G 热点让电脑连接测试，排查是否为当前 Wi-Fi 或宽带运营商的局部阻断。</p>
        </div>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-rose-600 rounded-full inline-block"></span>
        <span>具备多物理专线容灾的高可靠品牌</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-rose-600 uppercase tracking-wider">高可用容灾保障</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全天候自动健康调度</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云具备专业的自动化节点巡检系统，一旦检测到某条专线延迟异常或阻断，系统将在 15 秒内自动通过 BGP 路由重定向至备用专线，大幅降低超时概率。
            </p>
          </div>
          <BrandCTA brand={guangsu} />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-rose-600 rounded-full inline-block"></span>
        <span>节点超时常见疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {timeoutFaqs.map(faq => (
          <details class="group bg-white rounded-xl border border-slate-200 p-5 open:bg-slate-50 transition-colors">
            <summary class="font-semibold text-slate-900 cursor-pointer flex justify-between items-center list-none">
              <span>{faq.q}</span>
              <span class="text-rose-600 group-open:rotate-180 transition-transform duration-200">
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

writePage('troubleshooting/timeout.astro', timeoutContent);

// -------------------------------------------------------------
// 2. troubleshooting/subscription-failed.astro
// -------------------------------------------------------------
const subFailFaqs = [
  {
    q: '点击更新订阅时提示 `Get Subscription: x509: certificate signed by unknown authority` 怎么解决？',
    a: '该报错表示客户端在向订阅服务器拉取配置时，本地操作系统未信任其 SSL/TLS 证书。解决方案：1) 检查客户端设置中是否开启了“跳过证书验证 (Insecure / Allow Insecure)”；2) 检查本机是否安装了某些杀毒软件（如火绒、360、Kaspersky）开启了“HTTPS 流量扫描”并篡改了本地根证书；3) 更新操作系统补丁以同步最新的根证书库。'
  },
  {
    q: '更新订阅报 404 Not Found 或 502 Bad Gateway 是什么原因？',
    a: '404 表示订阅链接中的 Token 已经失效、被重置或 URL 路径拼写错误；502 / 500 则代表机场的订阅生成后端服务器正在升级维护或数据库崩溃。请登录官网后台重新复制最新的订阅链接。'
  },
  {
    q: '为什么必须开启代理才能更新订阅？不开启代理就提示 Timeout？',
    a: '因为机场为了防止订阅接口被防火墙爬虫频繁封锁，很多时候将订阅下发域名部署在海外 CDN（如 Cloudflare）或特定海外机房。若国内网络对该域名解析不畅，在客户端中开启已有可用代理，并勾选“通过代理更新订阅”即可秒速拉取。'
  },
  {
    q: '更新订阅后节点列表变成了空列表（0 个节点）怎么办？',
    a: '这通常是订阅下发的内容格式不匹配，或者返回了纯文本错误页面（如“请先购买套餐”或“账户已逾期”）。用浏览器直接打开该订阅链接，查看网页返回的具体提示文字，便能一目了然。'
  },
  {
    q: '光速云针对订阅更新稳定做了哪些优化？',
    a: '光速云配置了覆盖全球的高防双向 Anycast CDN 加速分发，即便在网络封锁最严峻的特殊时期，也能确保订阅服务器在国内三大运营商网络下毫秒级响应。'
  },
  {
    q: '订阅链接在浏览器能打开，但在 Clash 中导入失败怎么办？',
    a: '说明返回的内容是通用 Base64 编码而非 Clash 专用的 YAML 格式。在光速云后台务必点击“导入到 Clash”专属格式按钮，而非复制原始通用格式链接。'
  }
];

const subFailJsonLd = JSON.stringify(makeFaqJsonLd(
  '/troubleshooting/subscription-failed/',
  '订阅更新失败完全排查与修复指南 - SSL证书、404报错与域名防墙 | 百科机场',
  '针对代理客户端在更新订阅时遇到的各种报错（x509证书、404 Not Found、Timeout超时、空节点列表），系统梳理根因并提供精准解决方案。',
  [
    { name: '首页', url: '/' },
    { name: '故障排查', url: '/troubleshooting/' },
    { name: '订阅更新失败排查', url: '/troubleshooting/subscription-failed/' }
  ],
  subFailFaqs
));

const subFailContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${subFailJsonLd};
---

<BaseLayout
  title="订阅更新失败完全排查与修复指南 - 解决SSL证书与404报错 | 百科机场"
  description="详解科学上网客户端订阅更新失败的各种疑难场景：x509 证书阻断、404 令牌失效、502 网关超时与内容解析异常的标准修复教程。"
  canonical="https://jichangwiki.homes/troubleshooting/subscription-failed/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/troubleshooting/" class="hover:text-primary-600 transition-colors">故障排查</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">订阅更新失败</span>
    </nav>

    <header class="bg-gradient-to-br from-amber-950 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-amber-900/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30 mb-4">
          连通性排错 · 订阅接口攻坚
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          订阅更新失败完全指南：错误代码解析与精准修复
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          无法拉取最新节点是所有代理故障中最让人头疼的瓶颈。本文为您系统拆解证书信任链、格式匹配机制与高防订阅分发逻辑。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-amber-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>排障核心抓手</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            将无法更新的订阅 URL <strong>直接粘贴到浏览器地址栏回车访问</strong>。若浏览器返回了明确的 YAML 文本，说明是客户端证书或网络设置问题；若浏览器同样打不开或提示欠费，则表明需要在机场后台重置或续费。
          </p>
        </div>
      </div>
    </header>

    <!-- 常见报错速查表 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-amber-600 rounded-full inline-block"></span>
        <span>订阅更新四大典型报错处置手册</span>
      </h2>
      <div class="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
        <table class="w-full text-left text-sm text-slate-600">
          <thead class="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
            <tr>
              <th class="p-4">报错信息</th>
              <th class="p-4">根本诱因</th>
              <th class="p-4 text-amber-700 bg-amber-50/50">标准修复操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr>
              <td class="p-4 font-bold text-rose-600">x509: certificate signed...</td>
              <td class="p-4">系统根证书过期或杀毒软件劫持解密 HTTPS</td>
              <td class="p-4 font-semibold text-amber-700 bg-amber-50/20">在客户端配置中开启“跳过证书验证”或关闭杀软网页监控</td>
            </tr>
            <tr>
              <td class="p-4 font-bold text-rose-600">404 Not Found</td>
              <td class="p-4">订阅 Token 已被重置或套餐已失效下架</td>
              <td class="p-4 font-semibold text-amber-700 bg-amber-50/20">登录官网后台重新复制最新的订阅链接粘贴替换</td>
            </tr>
            <tr>
              <td class="p-4 font-bold text-slate-800">Connection Timeout</td>
              <td class="p-4">订阅域名遭到国内公网直接干扰阻断</td>
              <td class="p-4 font-semibold text-amber-700 bg-amber-50/20">在已有代理开启状态下，勾选“通过代理更新订阅”重试</td>
            </tr>
            <tr>
              <td class="p-4 font-bold text-slate-800">yaml: unmarshal errors</td>
              <td class="p-4">下发的不是 Clash 配置文件，而是纯文本或 Base64</td>
              <td class="p-4 font-semibold text-amber-700 bg-amber-50/20">在机场后台确认选择“Clash 订阅导出”格式</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-amber-600 rounded-full inline-block"></span>
        <span>具备企业级高防安全订阅的服务商</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-amber-600 uppercase tracking-wider">高防动态订阅保护</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全自动化订阅分发</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云配置了覆盖全球的高防双向 Anycast CDN 加速分发，即便在网络封锁最严峻的特殊时期，也能确保订阅服务器在国内三大运营商网络下毫秒级响应。
            </p>
          </div>
          <BrandCTA brand={guangsu} />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-amber-600 rounded-full inline-block"></span>
        <span>订阅更新常见疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {subFailFaqs.map(faq => (
          <details class="group bg-white rounded-xl border border-slate-200 p-5 open:bg-slate-50 transition-colors">
            <summary class="font-semibold text-slate-900 cursor-pointer flex justify-between items-center list-none">
              <span>{faq.q}</span>
              <span class="text-amber-600 group-open:rotate-180 transition-transform duration-200">
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

writePage('troubleshooting/subscription-failed.astro', subFailContent);

// -------------------------------------------------------------
// 3. troubleshooting/connection-failed.astro
// -------------------------------------------------------------
const connFailFaqs = [
  {
    q: '客户端显示已连接、节点延迟也正常，但网页提示“无网络连接 / 无法访问此网站”？',
    a: '这是最为典型的“假连接”现象。核心排查点：1) Windows 系统代理未成功勾选或端口错位（检查系统代理端口是否与客户端一致，如 7890）；2) 客户端的运行模式误选为了未配置出站规则的模式，确保切换为“规则 (Rule)”；3) 本地杀毒软件或防火墙拦截了客户端核心组件（clash-core / mihomo）的网络出站权限。'
  },
  {
    q: '为什么有时候关掉翻墙软件后，电脑微信、百度全都打不开了？',
    a: '因为客户端在非正常关闭或崩溃时，留在 Windows 注册表中的“系统代理开关”没有被自动还原关闭。此时系统依然将所有网络流量强行转发给已经死掉的 127.0.0.1:7890 端口，自然全网断联。解决方法：在 Windows 设置中搜索“代理设置”，手动将“使用代理服务器”开关关闭即可恢复。'
  },
  {
    q: '在浏览器中访问 Google 提示 `ERR_PROXY_CONNECTION_FAILED` 怎么解决？',
    a: '这表明浏览器尝试连接本地代理端口失败。检查客户端是否已经在后台静默崩溃退出；或者检查是否有两个翻墙软件同时运行造成端口争抢冲突。'
  },
  {
    q: '如何利用命令行一键修复损坏的 Windows 网络代理与 Winsock 目录？',
    a: '以管理员身份运行 PowerShell 或 CMD，依次执行：`netsh winsock reset`、`netsh int ip reset`、`ipconfig /flushdns`，随后重启电脑，网络协议栈即可彻底重置还原。'
  },
  {
    q: '光速云针对连接稳定性提供了哪些技术保障？',
    a: '光速云全线专线支持一键导入与客户端自动环境探测，并且在官方文档中配备了全自动网络诊断修复小脚本，帮助用户一键清理注册表残留代理。'
  },
  {
    q: '为什么手机连上之后，只有文字聊天正常，图片和视频全刷不出来？',
    a: '说明大流量吞吐受到了严重阻断或 MTU 设置过大导致分片丢弃。在客户端设置中尝试开启“TUN 模式”，并将 MTU 调整为 1400 或 1280 即可解决。'
  }
];

const connFailJsonLd = JSON.stringify(makeFaqJsonLd(
  '/troubleshooting/connection-failed/',
  '连上代理却无法上网完全解决方案 - 系统代理残留与假连接排查 | 百科机场',
  '全面解决科学上网客户端显示已连接但实际打不开网页的顽疾，深入剖析系统代理注册表残留、Winsock目录损坏、防火墙阻断与端口冲突修复。',
  [
    { name: '首页', url: '/' },
    { name: '故障排查', url: '/troubleshooting/' },
    { name: '连接故障解决', url: '/troubleshooting/connection-failed/' }
  ],
  connFailFaqs
));

const connFailContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${connFailJsonLd};
---

<BaseLayout
  title="连上代理却无法上网完全解决方案 - 系统代理残留与假连接排查 | 百科机场"
  description="详解科学上网已连接但无法打开网页的核心根因，手把手指导注册表代理修复、Winsock 重置、端口冲突化解及退出断网修复。"
  canonical="https://jichangwiki.homes/troubleshooting/connection-failed/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/troubleshooting/" class="hover:text-primary-600 transition-colors">故障排查</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">连接故障排查</span>
    </nav>

    <header class="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-indigo-900/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 mb-4">
          经典假连接攻坚 · 注册表与网络栈
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          连上代理却无法上网完全解决手册：击破假连接顽疾
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          节点 Ping 只有 30ms，但打开网页却提示“无法访问互联网”？退出软件后整个电脑甚至彻底断网？本文教您从网络栈深处彻底扫清障碍。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-indigo-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>两步极速自救法</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            1. 打开系统【设置 -&gt; 网络和 Internet -&gt; 代理】，确认“使用代理服务器”是否处于打开状态且端口与客户端一致；<br/>
            2. 若退出软件后断网，直接在此处<strong>关闭“使用代理服务器”开关</strong>，即可瞬间恢复国内正常联网。
          </p>
        </div>
      </div>
    </header>

    <!-- 三大修复路径 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
        <span>连接假死三大核心处置流程</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">1. 检查运行模式与规则</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            在客户端将模式切为“规则 (Rule)”，并在代理页面选中一个具体可用节点（如香港01），不要留在未定义的默认空白分组。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">2. 放行系统防火墙</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            检查 Windows Defender 防火墙，确保 <code>clash-verge.exe</code> 与内核程序均已被允许在专用和公用网络上通信。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">3. 重置 Winsock 协议栈</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            管理员终端执行 <code>netsh winsock reset</code> 并重启电脑，彻底清除因异常退出造成的虚拟网卡驱动死锁。
          </p>
        </div>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
        <span>高稳定性免维护的旗舰专线</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider">真连接品质保障</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全天候稳定高可用</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云部署的专线节点具备全链路端口健康检查，下发配置文件经过反复联调，开箱即用，从根源上杜绝假连接与断网异常。
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
        <span>连接假死常见疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {connFailFaqs.map(faq => (
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

writePage('troubleshooting/connection-failed.astro', connFailContent);

// -------------------------------------------------------------
// 4. troubleshooting/dns-error.astro
// -------------------------------------------------------------
const dnsFaqs = [
  {
    q: '什么是 GFW 的“DNS 污染”？它的攻击机理是什么？',
    a: '当您在浏览器中尝试解析被封锁的域名（如 google.com）时，发往公共 DNS 的标准 UDP 53 端口明文请求在途经国际出口路由器时，GFW 会抢在合法 DNS 应答之前，伪造并抢先下发一个虚假的、不可达的 IP 地址（如某个保留地址或无效机房 IP），导致客户端连接该虚假 IP 从而发生超时阻断。'
  },
  {
    q: '为什么说 DoH (DNS over HTTPS) 和 DoT 能够有效防止 DNS 劫持？',
    a: 'DoH 将 DNS 查询请求封装在经 TLS 强加密的 HTTPS 数据流中（走 443 端口），DoT 则运行在加密的 853 端口上。由于传输全程经过强加密，中间网络路由器无法窥探或篡改其中的域名内容，从而彻底终结了明文伪造劫持。'
  },
  {
    q: 'Clash 经常遇到 `DNS resolve failed` 怎么调优配置？',
    a: '在客户端的 DNS 设置中：1) 将 `enhanced-mode` 切换为 `fake-ip`；2) 确保 `nameserver` 包含国内高速纯净 DNS（如 `223.5.5.5`、`119.29.29.29`）；3) 在 `fallback` 中配置经加密的海外 DoH 节点（如 `https://1.1.1.1/dns-query`、`https://dns.google/dns-query`）。'
  },
  {
    q: '如何快速清理本地系统累积的错误 DNS 缓存？',
    a: 'Windows 打开 CMD 运行：`ipconfig /flushdns`；macOS 打开终端执行：`sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`。'
  },
  {
    q: '光速云在防 DNS 污染与泄露方面做了哪些架构防护？',
    a: '光速云官方下发的配置内置了精细的国内外分离 DNS 解析架构，国内域名直接由阿里/腾讯 DNS 毫秒级直达，海外流量完全经由专线送至落地机房进行远端安全解析，100% 杜绝污染。'
  },
  {
    q: '修改本地系统的 Hosts 文件会对代理分流造成冲突吗？',
    a: '会！Hosts 文件的解析优先级高于系统 DNS。如果在 Hosts 中手动硬编码了过期的海外 IP，客户端将直接尝试连接该失效 IP，导致代理分流规则失效。排错时建议将 Hosts 还原为默认状态。'
  }
];

const dnsJsonLd = JSON.stringify(makeFaqJsonLd(
  '/troubleshooting/dns-error/',
  'DNS 污染与解析失败排查指南 - DoH加密、Fake-IP与分流防泄露 | 百科机场',
  '全面科普国家级防火墙 DNS 污染机制，详解 DoH/DoT 加密解析配置、Fake-IP 缓存调优、Hosts 冲突清理与内外网双轨 DNS 构建。',
  [
    { name: '首页', url: '/' },
    { name: '故障排查', url: '/troubleshooting/' },
    { name: 'DNS错误排查', url: '/troubleshooting/dns-error/' }
  ],
  dnsFaqs
));

const dnsContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${dnsJsonLd};
---

<BaseLayout
  title="DNS 污染与解析失败排查指南 - DoH加密与防泄露实战 | 百科机场"
  description="深度拆解科学上网中的 DNS 污染与解析失败故障，详解 DoH/DoT 加密防篡改、Fake-IP 极速解析配置与内外网双轨分离实操。"
  canonical="https://jichangwiki.homes/troubleshooting/dns-error/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/troubleshooting/" class="hover:text-primary-600 transition-colors">故障排查</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">DNS错误排查</span>
    </nav>

    <header class="bg-gradient-to-br from-teal-950 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-teal-900/40 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-400/30 mb-4">
          域名解析防线 · 加密与防污染
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          DNS 污染与解析失败排查手册：终结域名劫持
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          DNS 是互联网的导航罗盘。在跨境网络中，明文 DNS 往往是最脆弱的第一道关卡。本文为您揭密 GFW 抢答伪造机制，手把手构建绝对纯净的解析通道。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-teal-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>防污染核心策略 (Core Strategy)</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            绝不要在翻墙环境下使用普通 UDP 53 明文 DNS！通过在客户端中配置<strong>“国内走阿里/腾讯加密 DoH，海外经专线走远端落地解析”</strong>的双轨架构，即可 100% 免疫污染并消除解析延迟。
          </p>
        </div>
      </div>
    </header>

    <!-- 污染原理与修复 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-teal-600 rounded-full inline-block"></span>
        <span>DNS 污染攻防对比</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="inline-block px-3 py-1 bg-rose-50 text-rose-700 text-xs font-bold rounded-md mb-3">明文脆弱通道</div>
          <h3 class="text-lg font-bold text-slate-900 mb-2">传统 UDP 53 明文抢答</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            查询请求裸奔在公网中，防火墙检测到目标包含受限域名，立刻抢在正确服务器返回前注入伪造 IP，导致网页永久无法打开。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-md mb-3">强加密防线</div>
          <h3 class="text-lg font-bold text-slate-900 mb-2">DoH / Fake-IP 双轨安全架构</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            将 DNS 报文封装在 TLS 443 加密流中，本地 Fake-IP 零延迟响应，远端机房安全递归，彻底摧毁伪造抢答的基础。
          </p>
        </div>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-teal-600 rounded-full inline-block"></span>
        <span>原生搭载防污染配置的高素质专线</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-teal-600 uppercase tracking-wider">防污染架构下发</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全天候双轨 DNS 守护</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云官方下发的配置严格遵循内外网分离安全准则，国内主流网站解析毫秒直达，海外受限服务远端落地代理解析，保障 100% 纯净访问。
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
        <span>DNS 故障常见疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {dnsFaqs.map(faq => (
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

writePage('troubleshooting/dns-error.astro', dnsContent);

// -------------------------------------------------------------
// 5. troubleshooting/client-startup.astro
// -------------------------------------------------------------
const startFaqs = [
  {
    q: 'Clash Verge Rev 启动时提示 `Port 7890 already in use` 怎么解决？',
    a: '该提示表示本机的 7890 端口已经被其他正在运行的程序（如后台未完全退出的 Clash 僵尸进程、v2rayN、或者之前运行的代理软件）抢先占用了。打开 Windows 任务管理器，在“详细信息”中搜索并强制结束所有包含 `clash`、`mihomo` 或 `xray` 的进程，然后再重新启动客户端；或者在设置中将混合端口改为其他数字（如 7895）。'
  },
  {
    q: '双击客户端无反应，或者启动后闪退消失是怎么回事？',
    a: '常见诱因：1) Windows 系统缺少微软官方的 **Microsoft Edge WebView2 Runtime** 运行库组件（Tauri 界面渲染所必需），到微软官网下载安装即可解决；2) 客户端的本地配置文件（config.yaml）存在非法语法乱码损坏，在 `%appdata%/clash-verge/` 目录下删除损坏的配置文件让软件重新生成。'
  },
  {
    q: 'macOS 提示“应用程序无法打开，请移至废纸篓”怎么处理？',
    a: '打开 Mac“终端”，输入命令：`sudo xattr -rd com.apple.quarantine /Applications/Clash\\ Verge.app`，输入电脑锁屏密码回车，即可移除系统的安全隔离属性顺利运行。'
  },
  {
    q: '客户端报 `Start Core Failed` 是什么原因？',
    a: '表明底层代理核心（Mihomo/Clash）未能成功启动。通常是因为安全杀毒软件误杀了位于资源目录中的 `mihomo-windows-amd64.exe`，或者由于之前异常关机导致核心守护进程锁死。在杀毒软件白名单中添加信任，或重新安装客户端覆盖核心文件。'
  },
  {
    q: '光速云对客户端启动故障有哪些辅助支持？',
    a: '光速云客服知识库提供了各平台一键修复包与必备运行库合集（包含完整 WebView2 与 VC++ Redistributable），帮助小白用户一键完成运行环境补齐。'
  },
  {
    q: '开机自启开启后，为什么有时候无法自动联网？',
    a: '在开机刚进入系统时，无线网卡可能尚未完成 Wi-Fi 握手连接，若客户端过早尝试发起代理可能导致瞬时报错。在客户端设置中开启“延迟自启（如延迟 10 秒启动）”即可完美解决。'
  }
];

const startJsonLd = JSON.stringify(makeFaqJsonLd(
  '/troubleshooting/client-startup/',
  '客户端启动崩溃与闪退修复手册 - 7890端口占用与WebView2缺失 | 百科机场',
  '全面排查代理客户端双击无反应、启动闪退、Port 7890 端口占用报错、Start Core Failed 及 WebView2 运行库缺失等系统级疑难。',
  [
    { name: '首页', url: '/' },
    { name: '故障排查', url: '/troubleshooting/' },
    { name: '客户端启动故障排查', url: '/troubleshooting/client-startup/' }
  ],
  startFaqs
));

const startContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const jsonLd = ${startJsonLd};
---

<BaseLayout
  title="客户端启动崩溃与闪退修复手册 - 解决7890端口占用与闪退 | 百科机场"
  description="针对科学上网软件双击打不开、瞬间闪退、7890 端口冲突与 Start Core Failed 报错，提供从系统运行库补齐到进程强杀的权威修复方案。"
  canonical="https://jichangwiki.homes/troubleshooting/client-startup/"
>
  <script type="application/ld+json" set:html={jsonLd} />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex items-center text-sm text-slate-500 mb-6 space-x-2">
      <a href="/" class="hover:text-primary-600 transition-colors">首页</a>
      <span>/</span>
      <a href="/troubleshooting/" class="hover:text-primary-600 transition-colors">故障排查</a>
      <span>/</span>
      <span class="text-slate-800 font-medium">启动故障排查</span>
    </nav>

    <header class="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-xl border border-slate-700 relative overflow-hidden">
      <div class="relative z-10 max-w-4xl">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-slate-700 text-slate-200 border border-slate-600 mb-4">
          系统环境攻坚 · 运行库与进程治理
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          客户端启动崩溃与闪退修复手册：彻底扫清运行阻碍
        </h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          双击软件图标毫无反应？启动后瞬间闪退？提示 7890 端口被占用？本文带您从系统进程与运行库底层切入，手把手恢复客户端健康。
        </p>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
          <div class="flex items-center space-x-2 text-slate-300 font-bold mb-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>排障核心速查 (Quick Fix)</span>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">
            1. 提示端口占用：打开任务管理器，强制结束所有残存的 <code>clash.exe</code> 或 <code>mihomo.exe</code> 进程；<br/>
            2. 双击无反应闪退：90% 是因为精简版 Windows 缺少 <strong>Microsoft Edge WebView2 Runtime</strong> 组件，下载安装官方运行库即可秒愈。
          </p>
        </div>
      </div>
    </header>

    <!-- 三大修复动作 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-slate-800 rounded-full inline-block"></span>
        <span>启动异常三大标准修复动作</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">1. 强杀残留僵尸进程</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            以管理员运行 PowerShell 执行：<code>Stop-Process -Name "clash*","mihomo*" -Force -ErrorAction SilentlyContinue</code>，彻底释放被锁定的 7890 端口。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">2. 安装 WebView2 运行库</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            从微软官方网站下载安装 Evergreen 独立安装程序，为 Tauri 框架提供完备的系统 WebView 呈现引擎。
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">3. 重置配置文件目录</h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            按下 Win + R 输入 <code>%appdata%</code>，将损坏的 <code>clash-verge</code> 配置文件夹重命名备份，重启客户端让其自动生成纯净默认配置。
          </p>
        </div>
      </div>
    </section>

    <!-- 优选服务商推荐 -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-slate-800 rounded-full inline-block"></span>
        <span>提供配套运行库镜像支持的高可靠品牌</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BrandCard brand={guangsu} />
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-slate-600 uppercase tracking-wider">新手运行保障</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 mb-3">光速云全套环境配套支持</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              光速云在控制台为用户准备了经过严格校验的官方客户端安装包与必备系统运行库，并附带傻瓜式配置说明，助您告别启动报错烦恼。
            </p>
          </div>
          <BrandCTA brand={guangsu} />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
        <span class="w-2 h-6 bg-slate-800 rounded-full inline-block"></span>
        <span>启动故障常见疑问 (FAQ)</span>
      </h2>
      <div class="space-y-4">
        {startFaqs.map(faq => (
          <details class="group bg-white rounded-xl border border-slate-200 p-5 open:bg-slate-50 transition-colors">
            <summary class="font-semibold text-slate-900 cursor-pointer flex justify-between items-center list-none">
              <span>{faq.q}</span>
              <span class="text-slate-600 group-open:rotate-180 transition-transform duration-200">
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

writePage('troubleshooting/client-startup.astro', startContent);

console.log('ALL 5 TROUBLESHOOTING SECONDARY PAGES WRITTEN!');
