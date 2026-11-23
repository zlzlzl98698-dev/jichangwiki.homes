import fs from 'fs';
import path from 'path';

const brands = JSON.parse(fs.readFileSync('src/data/brands.json', 'utf-8'));

function writePage(relPath, content) {
  const fullPath = path.resolve('src/pages', relPath);
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf-8');
  console.log(`Successfully upgraded: src/pages/${relPath}`);
}

// =========================================================================
// 01. 机场推荐 PILLAR PAGE: src/pages/airport/index.astro
// =========================================================================
const airportPillarContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '机场推荐与排行指南（2026最新）｜靠谱稳定节点选型与多维对比天梯';
const description = '权威中文机场选购支柱专题：提供基于晚高峰实测、物理专线架构、SLA与计费透明度的机场推荐决策树。深度对比光速云、红莓网络等精选品牌，详解IEPL专线、流媒体解锁及防坑指南。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场推荐', url: '/airport/' }
];

const subSections = [
  { name: '机场推荐', url: '/airport/recommend/', desc: '按需求场景选购：轻度浏览、日常工作、高频影音与企业外贸', icon: '🎯' },
  { name: '机场排行', url: '/airport/ranking/', desc: '统一指标下的综合评测天梯：晚高峰吞吐率、丢包率与SLA', icon: '🏆' },
  { name: '靠谱机场', url: '/airport/reliable/', desc: '拒绝跑路风险：甄选2020-2023年起持续稳定运营老牌服务商', icon: '🛡️' },
  { name: '稳定机场', url: '/airport/stable/', desc: '抗封锁与抗抖动：企业级IEPL/IPLC内网专线深度精选', icon: '⚡' },
  { name: '好用的机场', url: '/airport/best/', desc: '新手友好免折腾：自研多端一键客户端与免配置通用订阅', icon: '✨' }
];

const featuredBrands = brands.slice(0, 8);
const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];

const faqItems = [
  {
    q: '2026年选购机场最关键的核心指标是什么？',
    a: '最核心的指标不是白天的峰值测速跑分，而是“晚高峰（20:00-23:00）的丢包率与网络抖动（Jitter）”，以及其物理传输架构是否为真正的内网专线（IEPL/IPLC）。大量廉价机场使用公网中转或直连，白天跑满千兆，晚高峰骨干网QoS拥堵时丢包率飙升至30%以上，导致网页转圈甚至完全超时。'
  },
  {
    q: '“机场推荐”与“机场排行”有什么本质区别？',
    a: '“机场推荐”侧重于需求场景适配与选型决策，根据您的预算（如月付10元或年付100元）、使用目的（如学术查资料、4K Netflix观影、Claude/ChatGPT AI交互、外贸跨境）推荐最匹配的服务；而“机场排行”则是在标准统一的量化指标（测速吞吐、SLA连通率、节点冗余度、客诉响应速度）下给出的横向综合评级天梯。'
  },
  {
    q: '新手应该买月付套餐还是年付套餐？',
    a: '强烈建议新手“首月月付，验证满意后再考虑长周期”。即使很多服务商提供诱人的年付折扣（如光速云折合¥8/月，但需年付¥99），首次接触某家服务商时，必须先在自己真实的本地网络环境（如家里电信、公司移动、手机联通）实测晚高峰表现，确认其AI解锁与流媒体支持符合预期后再按需订购长周期。'
  },
  {
    q: 'IEPL专线和普通公网中转体验差距有多大？',
    a: 'IEPL（国际以太网私网专线）在境内外节点之间走运营商内网物理光纤传输，数据流完全不经过公网国际出口（GFW审查与QoS限速），具有零丢包、低延迟抖动、无视特殊时期封锁的特点。而公网中转仅是在国内服务器做流量中继转发，最终跨国段依然走普通公网出口，敏感时期极易被集中阻断。'
  },
  {
    q: '为什么测速图跑出几百兆，实际看YouTube还是卡顿？',
    a: '这是典型的“单线程延迟抖动”与“节点DNS污染/流媒体限速”问题。测速脚本通常采用多线程并发下载突发流量，能瞬间占满带宽；但视频流媒体播放与网页加载高度依赖单线程持续稳定性和低丢包率。如果节点丢包率超过5%，TCP窗口就会频繁重传，导致缓冲区耗尽而出现卡顿转圈。'
  },
  {
    q: '机场提供的自研专属客户端好用还是第三方Clash好用？',
    a: '各有优势。服务商自研客户端（如光速云、红莓等提供的一键Windows/Mac/Android安装包）集成了节点自动同步、智能路由和简易开关，登录账号即可使用，极其适合新手；而第三方通用客户端（Clash Verge Rev、v2rayN、Shadowrocket）具备高度自由的分流规则自定义、TUN虚拟网卡及多机场聚合能力，适合进阶用户。'
  },
  {
    q: '如何识别一家机场是否处于跑路前兆？',
    a: '跑路前兆通常有四大明显信号：1. 官方Telegram群组突然开启全员永久禁言；2. 工单系统长时间无响应或直接关闭；3. 官网突然推出极其夸张的“终身永久不限时特惠包”或“超大折扣吸金促销”；4. 大量核心专线节点失联超过72小时且没有任何官方维护公告。'
  },
  {
    q: '什么是双机场冗余容灾策略？',
    a: '指同时配置两个来自不同服务商、不同上游架构的机场。例如主力使用高质量IEPL内网专线机场（如光速云或红莓网络）保障日常工作与流畅影音；备用配置一个按量计费不过期的不限时按量机场（如Snooker 147或极速云小额包）。一旦主力遇突发光纤故障或上游割接，可无缝秒级切换，保障网络绝对不中断。'
  },
  {
    q: '访问 ChatGPT / Claude 对机场节点有什么特殊要求？',
    a: 'AI 平台普遍接入了 Cloudflare 等严苛风控系统，对数据中心（Datacenter）机房广播 IP、大量并发访问的高风险 ASN 会直接拦截或触发封号。访问 AI 服务必须使用经过原生 IP 伪装、纯净度高且没有滥用记录的住宅/原生落地节点，并配合客户端分流规则将 OpenAI / Anthropic 域名强制走原生代理。'
  },
  {
    q: '机场的“倍率”是什么意思？会偷偷扣流量吗？',
    a: '倍率是机场计费时的流量系数。1.0x倍率表示消耗1GB真实流量扣除1GB套餐配额；0.2x低倍率节点消耗1GB仅扣除0.2GB（适合大文件下载）；而3.0x或5.0x高倍率节点消耗1GB将扣除3GB至5GB配额。部分不良机场将常用高速专线设为高倍率，用户未留意就会发现套餐流量光速用尽，选购时务必核实倍率透明度。'
  }
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://jichangwiki.homes/airport/',
      'url': 'https://jichangwiki.homes/airport/',
      'name': title,
      'description': description,
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
      'mainEntity': faqItems.map(item => ({
        '@type': 'Question',
        'name': item.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.a
        }
      }))
    }
  ]
};
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <!-- Hero Header -->
    <div class="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-2xl border border-blue-900/40 relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="max-w-3xl relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30 mb-4">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          2026 深度升级支柱专题 · 知识中心
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-5 leading-tight">
          机场推荐与排行：从网络拓扑到真实场景选型
        </h1>
        <p class="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
          面对市面上良莠不齐的代理服务商，“推荐”着眼于按需匹配最佳生产力工具，而“排行”则强调在统一指标下的横向技术基准。本专题拆解晚高峰速率、IEPL物理专线、SLA可用性、客户端兼容度与计费透明度，为您提供可靠、客观的选型决策全景。
        </p>
        <div class="flex flex-wrap gap-3 text-xs sm:text-sm text-slate-300">
          <span class="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            📊 覆盖 31+ 主流品牌档案
          </span>
          <span class="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            ⚡ 晚高峰丢包与抖动监控
          </span>
          <span class="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            🛡️ 杜绝跑路套现虚假跑分
          </span>
        </div>
      </div>
    </div>

    <!-- Answer-First Executive Verdict Box -->
    <div class="bg-white rounded-2xl border border-blue-200/80 shadow-md p-6 sm:p-8 mb-12 relative">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
          💡
        </div>
        <div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900">
            快速选型结论（Answer-First 核心速览）
          </h2>
          <p class="text-xs sm:text-sm text-slate-500">2026年中文代理选购的核心法则与最佳匹配</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-blue-900 mb-2 flex items-center gap-1.5 text-base">
            <span>🎯</span> 黄金匹配法则
          </div>
          <p class="text-xs sm:text-sm text-slate-600">
            <strong>日常轻办公/查资料</strong>：首选性价比高、支持自研客户端的服务商（如光速云，折算¥8/月，年付¥99）；<br/>
            <strong>跨境办公/4K重度影音</strong>：首选全IEPL企业内网专线服务商（如红莓网络、青云梯），晚高峰零丢包。
          </p>
        </div>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-amber-900 mb-2 flex items-center gap-1.5 text-base">
            <span>⚠️</span> 核心避坑三原则
          </div>
          <p class="text-xs sm:text-sm text-slate-600">
            1. <strong>不盲目购买多年付</strong>：新平台先首月测试；<br/>
            2. <strong>不迷信白天跑满千兆</strong>：只看晚高峰（20:00-23:00）的丢包率；<br/>
            3. <strong>严查倍率陷阱</strong>：防止5x倍率节点暗扣套餐流量。
          </p>
        </div>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-emerald-900 mb-2 flex items-center gap-1.5 text-base">
            <span>🛡️</span> 容灾双机场设计
          </div>
          <p class="text-xs sm:text-sm text-slate-600">
            生产力用户强烈建议采用“<strong>主力专线 + 不限时按量备用</strong>”双冗余方案。主力机场到期或遇骨干网故障时，一键秒切备用按量节点，确保重要业务永不掉线。
          </p>
        </div>
      </div>
    </div>

    <!-- Secondary Hubs Grid -->
    <div class="mb-14">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900">二级专题深度导航</h2>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">按特定细分维度深入了解推荐与排行细分领域</p>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {subSections.map((s) => (
          <a href={s.url} class="p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition group flex flex-col justify-between">
            <div>
              <div class="text-3xl mb-3 group-hover:scale-110 transition-transform">{s.icon}</div>
              <h3 class="text-base font-bold text-slate-900 group-hover:text-blue-600 transition mb-1">{s.name}</h3>
              <p class="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
              进入专题 &rarr;
            </div>
          </a>
        ))}
      </div>
    </div>

    <!-- Featured Brand Hero Spotlight (Guangsu Cloud) -->
    <div class="mb-14">
      <div class="p-6 sm:p-8 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-3xl text-white shadow-xl border border-blue-800/50">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div class="max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30 mb-3">
              🌟 本月编辑甄选高性价比主力推荐
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              光速云（Guangsu Cloud）· 2026 平衡旗舰
            </h2>
            <p class="text-slate-300 text-sm leading-relaxed mb-4">
              自研多端一键客户端（Windows/Mac/Android）开箱即用，提供高可用专线与多地BGP入口。年付特惠套餐仅需 ¥99（折合 ¥8.25/月，69GB/月），专为高性价比日常与轻办公打造；高速版月付仅需 ¥25/月，全节点原生IP覆盖，支持最新专属优惠码。
            </p>
            <div class="flex flex-wrap items-center gap-3 text-xs">
              <span class="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200">
                专属券码: <strong class="text-amber-300 font-mono">AMM</strong>
              </span>
              <span class="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200">
                起步价格: <strong class="text-emerald-400">¥8/月起（年付¥99）</strong>
              </span>
              <span class="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200">
                线路: 企业级专线 + BGP智能接入
              </span>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
            <a 
              href="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y" 
              target="_blank" 
              rel="nofollow sponsored noopener noreferrer"
              class="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg hover:shadow-blue-500/30 transition text-center"
            >
              前往光速云官网注册 &rarr;
            </a>
            <div class="flex gap-2">
              <a 
                href="/brands/guangsu/" 
                class="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 transition text-center"
              >
                查看品牌实体档案
              </a>
              <a 
                href="/reviews/guangsu/" 
                class="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 transition text-center"
              >
                深度实测报告
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Section: Decision Framework & Knowledge -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
      
      <!-- Left Anchor Navigation TOC -->
      <div class="hidden lg:block lg:col-span-1">
        <div class="sticky top-20 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">本页导航目录</h3>
          <ul class="space-y-2 text-xs font-medium text-slate-600">
            <li><a href="#decision-tree" class="hover:text-blue-600 transition block py-1">1. 四层用户选型决策树</a></li>
            <li><a href="#comparison-table" class="hover:text-blue-600 transition block py-1">2. 主流机场多维对比天梯表</a></li>
            <li><a href="#stability-speed" class="hover:text-blue-600 transition block py-1">3. 稳定性 vs 速度深度解构</a></li>
            <li><a href="#topology" class="hover:text-blue-600 transition block py-1">4. 物理专线与公网中转区别</a></li>
            <li><a href="#regions" class="hover:text-blue-600 transition block py-1">5. 节点地区匹配与流媒体AI</a></li>
            <li><a href="#traps" class="hover:text-blue-600 transition block py-1">6. 计费模式与虚假跑分防坑</a></li>
            <li><a href="#faqs" class="hover:text-blue-600 transition block py-1">7. 核心疑难解答（FAQ）</a></li>
          </ul>
          <div class="mt-6 pt-4 border-t border-slate-100">
            <span class="text-[11px] text-slate-400 block mb-2">需要深入排查或配置？</span>
            <div class="flex flex-col gap-1.5 text-xs text-blue-600">
              <a href="/tutorials/" class="hover:underline">&bull; 客户端与订阅配置教程</a>
              <a href="/troubleshooting/" class="hover:underline">&bull; 节点超时连不上自愈树</a>
              <a href="/risk/" class="hover:underline">&bull; 机场跑路预警与容灾方案</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Prose Column -->
      <div class="lg:col-span-3 space-y-12">
        
        <!-- Section 1: Decision Tree -->
        <section id="decision-tree" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            1. 四层用户选型决策树：您究竟需要什么样的机场？
          </h2>
          <p class="text-slate-600 text-sm leading-relaxed mb-6">
            很多用户挑选服务商时极易陷入“盲目追求最贵”或“贪图超低价一元包”的极端。客观事实是：<strong>脱离使用场景谈推荐没有任何意义</strong>。网络架构成本直接决定了定价策略，以下四层决策模型助您快速定锚需求：
          </p>

          <div class="space-y-4">
            <div class="p-5 bg-white rounded-xl border-l-4 border-l-blue-500 border border-slate-200 shadow-sm">
              <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-slate-900 text-base">梯队 A · 轻度体验与备用查资料（月预算 &le; ¥10）</span>
                <span class="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700">代表品牌：光速云年付、闪电猫</span>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed mb-3">
                <strong>用户画像</strong>：在校学生、查阅外文文献学术工作者、偶发性查询技术文档的开发者，月流量消耗通常低于 50GB。<br/>
                <strong>架构标准</strong>：高质量公网中转或入门级专线即可满足，关键看客户端是否友好、无需复杂规则维护。<br/>
                <strong>最佳策略</strong>：选择光速云年付（折合¥8/月，69GB/月）或购买不限时按量小包，性价比极高且稳定省心。
              </p>
            </div>

            <div class="p-5 bg-white rounded-xl border-l-4 border-l-indigo-500 border border-slate-200 shadow-sm">
              <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-slate-900 text-base">梯队 B · 稳定日常办公与轻度影音（月预算 ¥15 - ¥30）</span>
                <span class="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">代表品牌：光速云高速版、极速云、西瓜皮</span>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed mb-3">
                <strong>用户画像</strong>：日常工作高度依赖 Google Workspace、GitHub、Slack、Telegram，并有 YouTube 1080P/4K 日常观看需求。<br/>
                <strong>架构标准</strong>：必须具备国内 BGP 多线接入入口与企业级 IEPL 专线，晚高峰丢包率控制在 2% 以内。<br/>
                <strong>最佳策略</strong>：首推月付或季度订购，验证晚高峰稳定性与自研客户端的 TUN 模式接管能力。
              </p>
            </div>

            <div class="p-5 bg-white rounded-xl border-l-4 border-l-purple-500 border border-slate-200 shadow-sm">
              <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-slate-900 text-base">梯队 C · 4K/8K 流媒体重度与 AI 极客（月预算 ¥30 - ¥60）</span>
                <span class="text-xs font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700">代表品牌：红莓网络、青云梯、极客云</span>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed mb-3">
                <strong>用户画像</strong>：追求 Netflix/Disney+ 非自制剧全区解锁，重度调用 ChatGPT 4o、Claude 3.5 Sonnet、Gemini Advanced，对 IP 纯净度极其敏感。<br/>
                <strong>架构标准</strong>：纯物理专线集群 + 原生住宅双 ISP 落地 IP，DNS 零泄漏，杜绝 Cloudflare 1020 拦截。<br/>
                <strong>最佳策略</strong>：选择资历在 3 年以上、具备专属落地机房运维的老牌高质服务商。
              </p>
            </div>

            <div class="p-5 bg-white rounded-xl border-l-4 border-l-emerald-500 border border-slate-200 shadow-sm">
              <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-slate-900 text-base">梯队 D · 跨国商贸与企业高 SLA 团队（月预算 &ge; ¥60）</span>
                <span class="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">代表品牌：高端企业定制内网</span>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed mb-3">
                <strong>用户画像</strong>：外贸团队、海外电商独立站运营、实时金融量化交易，任何断网都将导致直接经济损失。<br/>
                <strong>架构标准</strong>：双物理内网 IPLC 专线热备互倒，拥有专属客服通道与 99.9% 连通率 SLA 承诺。<br/>
                <strong>最佳策略</strong>：必须采用双服务商甚至三服务商的聚合负载均衡策略。
              </p>
            </div>
          </div>
        </section>

        <!-- Section 2: Comparison Table -->
        <section id="comparison-table" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            2. 主流机场多维对比天梯表（真实数据与客观指标）
          </h2>
          <p class="text-slate-600 text-sm leading-relaxed mb-4">
            以下表格汇总了百科机场知识库内经过核查的精选品牌，客观列明起步资费口径、物理线路、自研客户端支持与推荐适用场景：
          </p>

          <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm mb-4">
            <table class="w-full text-left text-xs sm:text-sm">
              <thead class="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th class="p-3.5">品牌名称</th>
                  <th class="p-3.5">起步资费口径</th>
                  <th class="p-3.5">核心线路架构</th>
                  <th class="p-3.5">自研客户端</th>
                  <th class="p-3.5">AI/流媒体解锁</th>
                  <th class="p-3.5">晚高峰抗抖动</th>
                  <th class="p-3.5 text-center">档案 / 评测</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200/80 text-slate-700">
                <tr class="bg-blue-50/40 hover:bg-blue-50/70 transition">
                  <td class="p-3.5 font-bold text-slate-900 flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-blue-600"></span>
                    光速云 <span class="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded">主推</span>
                  </td>
                  <td class="p-3.5 font-mono text-emerald-700 font-bold">折合¥8/月（年付¥99）</td>
                  <td class="p-3.5">企业级专线 + BGP智能接入</td>
                  <td class="p-3.5 text-emerald-600 font-semibold">支持 (Win/Mac/Android)</td>
                  <td class="p-3.5">全绿解锁（ChatGPT/Netflix）</td>
                  <td class="p-3.5 font-bold text-emerald-600">优秀（&lt;2%丢包）</td>
                  <td class="p-3.5 text-center space-x-1 whitespace-nowrap">
                    <a href="/brands/guangsu/" class="text-blue-600 hover:underline">档案</a>
                    <span class="text-slate-300">|</span>
                    <a href="/reviews/guangsu/" class="text-blue-600 hover:underline">评测</a>
                  </td>
                </tr>
                <tr class="hover:bg-slate-50 transition">
                  <td class="p-3.5 font-bold text-slate-900">红莓网络</td>
                  <td class="p-3.5 font-mono text-slate-800">¥20/月起</td>
                  <td class="p-3.5">全IEPL企业内网专线</td>
                  <td class="p-3.5 text-emerald-600 font-semibold">提供专属客户端</td>
                  <td class="p-3.5">全解锁支持</td>
                  <td class="p-3.5 font-bold text-emerald-600">极优（&lt;1%丢包）</td>
                  <td class="p-3.5 text-center space-x-1 whitespace-nowrap">
                    <a href="/brands/hongmei/" class="text-blue-600 hover:underline">档案</a>
                    <span class="text-slate-300">|</span>
                    <a href="/reviews/hongmei/" class="text-blue-600 hover:underline">评测</a>
                  </td>
                </tr>
                <tr class="hover:bg-slate-50 transition">
                  <td class="p-3.5 font-bold text-slate-900">青云梯</td>
                  <td class="p-3.5 font-mono text-slate-800">¥18/月起</td>
                  <td class="p-3.5">BGP多线入口 + 跨境专线</td>
                  <td class="p-3.5 text-slate-500">通用第三方订阅</td>
                  <td class="p-3.5">大部分支持</td>
                  <td class="p-3.5 text-slate-700">良好</td>
                  <td class="p-3.5 text-center space-x-1 whitespace-nowrap">
                    <a href="/brands/qingyunti/" class="text-blue-600 hover:underline">档案</a>
                    <span class="text-slate-300">|</span>
                    <a href="/reviews/qingyunti/" class="text-blue-600 hover:underline">评测</a>
                  </td>
                </tr>
                <tr class="hover:bg-slate-50 transition">
                  <td class="p-3.5 font-bold text-slate-900">西瓜皮</td>
                  <td class="p-3.5 font-mono text-slate-800">¥15/月起</td>
                  <td class="p-3.5">公网中转 + 专线混合</td>
                  <td class="p-3.5 text-slate-500">通用第三方订阅</td>
                  <td class="p-3.5">支持主流流媒体</td>
                  <td class="p-3.5 text-slate-700">中等良好</td>
                  <td class="p-3.5 text-center space-x-1 whitespace-nowrap">
                    <a href="/brands/xiguapi/" class="text-blue-600 hover:underline">档案</a>
                    <span class="text-slate-300">|</span>
                    <a href="/reviews/xiguapi/" class="text-blue-600 hover:underline">评测</a>
                  </td>
                </tr>
                <tr class="hover:bg-slate-50 transition">
                  <td class="p-3.5 font-bold text-slate-900">闪电猫</td>
                  <td class="p-3.5 font-mono text-slate-800">¥9.9/月起</td>
                  <td class="p-3.5">高性价比公网中转</td>
                  <td class="p-3.5 text-emerald-600 font-semibold">支持专属客户端</td>
                  <td class="p-3.5">主要支持YouTube</td>
                  <td class="p-3.5 text-slate-600">普通可接受</td>
                  <td class="p-3.5 text-center space-x-1 whitespace-nowrap">
                    <a href="/brands/shandianmao/" class="text-blue-600 hover:underline">档案</a>
                    <span class="text-slate-300">|</span>
                    <a href="/reviews/shandianmao/" class="text-blue-600 hover:underline">评测</a>
                  </td>
                </tr>
                <tr class="hover:bg-slate-50 transition">
                  <td class="p-3.5 font-bold text-slate-900">二猫云</td>
                  <td class="p-3.5 font-mono text-slate-800">¥12/月起</td>
                  <td class="p-3.5">BGP隧道中转</td>
                  <td class="p-3.5 text-slate-500">通用第三方订阅</td>
                  <td class="p-3.5">支持主流流媒体</td>
                  <td class="p-3.5 text-slate-700">中等良好</td>
                  <td class="p-3.5 text-center space-x-1 whitespace-nowrap">
                    <a href="/brands/ermaoyun/" class="text-blue-600 hover:underline">档案</a>
                    <span class="text-slate-300">|</span>
                    <a href="/reviews/ermaoyun/" class="text-blue-600 hover:underline">评测</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-[11px] text-slate-500">
            * 资费数据基于各品牌官网公开套餐定期核验，年付折算价格需预缴全年总额。更多品牌可检索 <a href="/brands/" class="text-blue-600 underline">31+ 机场品牌完整数据库</a>。
          </p>
        </section>

        <!-- Section 3: Stability vs Speed -->
        <section id="stability-speed" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            3. 稳定性 vs 速度：为什么测速图不能代表真实体验？
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-4">
            <p>
              在各大社交媒体与测速频道中，色彩斑斓的“跑满 1000Mbps”测速截图极具视觉冲击力。然而，大量新手购买后却频繁遭遇卡顿。背后的核心技术机制在于：
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 not-prose">
              <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 class="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-1.5">
                  <span>📉</span> 突发吞吐率（Burst Speed）
                </h4>
                <p class="text-xs text-slate-600">
                  测速工具（如 Speedtest、YouTube 视频测速）通常开启 8-16 个并发 TCP 连接，短时间内下载多线程临时数据块，甚至可能受到服务商测速节点的专门 QOS 优先放行，极容易制造“千兆狂飙”的假象。
                </p>
              </div>
              <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 class="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-1.5">
                  <span>🛡️</span> 真实丢包与抖动（Loss & Jitter）
                </h4>
                <p class="text-xs text-slate-600">
                  真实生产力（如打开 GitHub、网页即时跳转、Zoom 会议、ChatGPT 流式输出）高度依赖单线程低延迟和超低丢包率。在 TCP 拥塞控制机制下，<strong>只要线路发生 3% 的丢包，有效吞吐率就会骤降 70% 以上</strong>。
                </p>
              </div>
            </div>
            <p>
              因此，评判一家机场是否优质，第一标准始终是<strong>“晚高峰（20:00 - 23:00）的丢包率是否稳定在 2% 以下”</strong>，第二标准是<strong>“连续 ping 200 次的往返时间抖动偏差（Jitter）是否在 15ms 以内”</strong>。
            </p>
          </div>
        </section>

        <!-- Section 4: Topology -->
        <section id="topology" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            4. 物理专线与公网中转区别：线路拓扑如何决定抗封锁能力？
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-4">
            <p>
              代理服务的底层传输拓扑决定了其抗风险能力的上限。目前市面上的线路主要分为三大层级：
            </p>
            <ol class="list-decimal pl-5 space-y-2">
              <li>
                <strong>公网直连（Direct）</strong>：客户端直接通过公网连接境外落地服务器。完全裸露在 GFW 视线内，敏感时期几分钟内即可被封锁 IP 或封端口，仅存在于超低价应急产品中。
              </li>
              <li>
                <strong>公网隧道中转（Relay / Tunnel）</strong>：用户连接境内中继服务器，中继服务器通过公网加密隧道将数据转发给境外落地。虽然改善了国内本地连接，但在跨国公网出口仍然要经过出口审查和 QoS 限速，晚高峰容易严重拥堵。
              </li>
              <li>
                <strong>IEPL / IPLC 内网专线（Private Leased Line）</strong>：境内与境外服务器之间租用运营商的物理光纤专线直连。数据全程走运营商企业内网点对点传输，<strong>不经过公网国际出口，不触发 GFW 深度包检测（DPI）</strong>。因此在任何特殊敏感时期均能保持极佳连通率。
              </li>
            </ol>
            <p>
              想要深入了解物理光纤与海底光缆的技术参数，可参阅我们的 <a href="/network/" class="text-blue-600 font-semibold underline">线路与节点支柱专题</a> 以及 <a href="/network/iepl/" class="text-blue-600 font-semibold underline">IEPL 专线深度解析</a>。
            </p>
          </div>
        </section>

        <!-- Section 5: Regions & Unlock -->
        <section id="regions" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            5. 节点地区匹配与流媒体AI：不同需求如何选择节点？
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-4">
            <div class="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div class="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                <span>🇭🇰</span> 香港节点（HKG）· 极速低延迟首选
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                物理距离最近，沿海省份 ping 通常在 15-35ms。非常适合日常网页浏览、Steam 下载和学术查询。缺点是 OpenAI（ChatGPT）官方不向香港地区提供服务，直接使用香港节点访问 AI 必定被拒。
              </p>
            </div>
            <div class="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div class="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                <span>🇯🇵</span> 日本节点（NRT/HND）· 流媒体与综合万能
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                延迟适中（35-65ms），日本原生 IP 纯净度普遍极高，完美解锁 Netflix 日区非自制剧、DMM、Bilibili 港澳台及 ChatGPT/Claude，是综合性能与内容丰富度的最佳平衡点。
              </p>
            </div>
            <div class="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div class="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                <span>🇸🇬</span> 新加坡节点（SIN）· 东南亚出海枢纽
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                跨境电商、TikTok 东南亚小店及外贸首选节点，支持中文环境，解锁大部分流媒体服务，网络路由非常干净。
              </p>
            </div>
            <div class="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div class="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                <span>🇺🇸</span> 美国节点（US）· AI平台终极资源池
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                延迟较高（130-180ms），但所有的 AI 原生工具（ChatGPT、Claude、Gemini、Midjourney）和海外流媒体原生片库都在美区第一时间完整开放，是不可或缺的兜底节点。
              </p>
            </div>
          </div>
          <p class="text-xs text-slate-500">
            详细 AI 平台封锁机制与原生住宅 IP 识别，请查阅 <a href="/streaming-ai/" class="text-blue-600 underline">AI与流媒体支柱专题</a>。
          </p>
        </section>

        <!-- Section 6: Traps & Avoidance -->
        <section id="traps" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            6. 计费模式与防坑指南：识别六大虚假宣传与跑路信号
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              购买代理服务是一项具有长期信任成本的消费行为。必须防范以下六大约定俗成的“暗坑”：
            </p>
            <ul class="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>年付平摊混淆真月付</strong>：宣传“8元/月”，实际必须一次性付清99元甚至更长时间，中途若服务商失联，剩余月份费用完全无法退回。</li>
              <li><strong>隐形节点倍率扣费</strong>：套餐标称 200GB/月，但主力节点全部标注 3.0x 或 5.0x 倍率，实际只能使用 40GB-66GB 真实流量。</li>
              <li><strong>超售严重导致晚高峰瘫痪</strong>：白天跑分破千兆，晚上 8 点后连 Google 首页都无法打开，客服回复“上游拔线”长期推诿。</li>
              <li><strong>自建山寨客户端植入广告</strong>：部分不良机场二次打包的开源客户端内嵌强制跳转广告甚至恶意挖矿脚本，务必认准官方签名认证。</li>
              <li><strong>TG群永久禁言与无工单</strong>：服务商在遭遇大面积故障时不发布通知，反而开启全员禁言，这是最危险的失联前兆。</li>
              <li><strong>拒绝任何形式的无理由退款</strong>：甚至没有 24 小时或首日流量在 2GB 内的无理由退换条款。</li>
            </ul>
          </div>
        </section>

        <!-- Section 7: FAQs -->
        <section id="faqs" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-6 pb-2 border-b border-slate-200">
            7. 机场推荐与选购常见问题（FAQ）
          </h2>
          <div class="space-y-4">
            {faqItems.map((item, index) => (
              <details class="group bg-white rounded-2xl border border-slate-200/80 p-5 open:ring-2 open:ring-blue-500/20 transition shadow-sm">
                <summary class="font-extrabold text-slate-900 text-sm sm:text-base cursor-pointer flex items-center justify-between list-none">
                  <span class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    {item.q}
                  </span>
                  <span class="text-slate-400 group-open:rotate-180 transition-transform text-lg ml-2">&darr;</span>
                </summary>
                <div class="mt-4 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        <!-- Bottom Conversion CTA -->
        <div class="mt-12">
          <BrandCTA 
            brandName="光速云（Guangsu Cloud）" 
            affiliateURL="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"
            couponCode="AMM"
            entryPrice="折合 ¥8/月起（年付¥99）"
            customTitle="开启稳定高速网络体验 · 光速云"
            customDesc="独享多端专属一键客户端，自研智能节点测速切换，2026 年度平衡旗舰首选。"
          />
        </div>

        <!-- Compliance & Affiliate Disclosure -->
        <AffiliateDisclosure />

      </div>
    </div>

  </div>
</BaseLayout>
`;

writePage('airport/index.astro', airportPillarContent);

// =========================================================================
// 02. 价格与套餐 PILLAR PAGE: src/pages/pricing/index.astro
// =========================================================================
const pricingPillarContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '机场价格与套餐对比指南（2026）｜便宜月付、不限时流量与性价比选型决策';
const description = '全网最客观的机场资费支柱专题：深度剖析一元机场、一分机场真实商业逻辑，规范对比实际月付价格、年付平摊成本与不限时按量包。揭秘节点倍率暗扣陷阱，提供按每GB真实成本决策指南。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '价格与套餐', url: '/pricing/' }
];

const subSections = [
  { name: '便宜机场', url: '/pricing/cheap/', desc: '低预算首选：月费 5-15 元高性价比梯队精选', icon: '💰' },
  { name: '一元机场', url: '/pricing/one-yuan/', desc: '极致低门槛：月付仅需 1 元的超低成本服务解密', icon: '🪙' },
  { name: '一分机场', url: '/pricing/one-cent/', desc: '微量测试首选：按需尝鲜与短期应急跳板', icon: '⚡' },
  { name: '月付机场', url: '/pricing/monthly/', desc: '灵活安全无顾虑：支持逐月付费的老牌抗风险服务', icon: '📅' },
  { name: '不限时机场', url: '/pricing/lifetime/', desc: '流量永不过期：按量计费不重置，备用容灾首选', icon: '⏳' },
  { name: '性价比机场', url: '/pricing/value/', desc: '速率与资费黄金平衡：单位 GB 成本与 SLA 综合评测', icon: '⚖️' }
];

const faqItems = [
  {
    q: '“实际月付”与“年付折算月付”到底有什么法律和财务区别？',
    a: '两者在财务抗风险和资金占用上有根本区别。“实际月付”是指用户无需承担长期预存风险，按自然月或 30 天周期按需充值续费，即使服务商中途故障或服务劣化，用户最大的财务损失仅为当月剩余几天的费用（如 15-25 元）。而“年付折算月付”（例如宣传“8元/月”，但实际必须一次性支付 99 元全年费用）属于预付消费模式，虽然单月均摊成本更低，但一旦服务商因跑路、上游拔线或失联终止运营，剩余 11 个月的预付资金将完全沉没且无法追回。'
  },
  {
    q: '一元机场为什么能做到这么便宜？他们怎么盈利？',
    a: '一元机场的盈利逻辑建立在“极端轻资产直连 + 恐怖超售率（Overbooking）+ 流量沉没”三大基石上：1. 采用低成本公网直连 VPS 或极其廉价的低 SLA 公网中继，无昂贵的 IEPL 专线成本；2. 疯狂超售，将 1Gbps 的带宽卖给数千人，赌大部分用户不会同时在线；3. 大量用户付费 1 元后仅测试几次便遗忘或放弃，沉淀资金形成服务商利润。其代价是晚高峰骨干网拥堵时丢包率严重飙升，因此一元机场绝不能作为主力生产力工具。'
  },
  {
    q: '不限时（按量不过期）套餐适合什么样的人群？',
    a: '不限时按量套餐是“双机场冗余容灾架构”中的完美基石。它的特点是一次性购买固定流量包（例如 200GB 或 500GB），永不过期、按月不重置清零。非常适合两类人群：1. 出差外贸族、学生等轻度使用者，每月仅消耗 5-10GB，买常规按月套餐极易浪费；2. 将其配置在 Clash 的兜底备用策略组中，作为主力专线机场突发故障时的瞬间切换备份。'
  },
  {
    q: '什么是节点“高倍率暗扣”？如何计算每 GB 真实使用成本？',
    a: '部分不良服务商在套餐界面标榜“超大流量 500GB 仅需 15 元”，但其实际可用节点中，大部分高速专线被设置了 2.0x、3.0x 甚至 5.0x 的高倍率。这意味着您下载 1GB 真实文件，套餐配额会被瞬间扣除 5GB，实际有效可用流量从 500GB 缩水为 100GB。计算真实单位成本公式为：真实单价 = 支付总额 &divide; (套餐标称流量 &divide; 常用节点倍率)。'
  },
  {
    q: '年付套餐通常打几折才算合理？',
    a: '行业内良性运营的服务商，年付通常提供 8 折至 8.5 折的优惠（例如月付 25 元，年付约为 240-250 元），或者多赠送 1-2 个月的使用时长。如果遇到宣称“月付 30 元，年付仅需 60 元（直接打 2 折）”且成立不足 1 年的新品牌，必须高度警惕其通过大额年付快速资金回笼跑路的风险。'
  },
  {
    q: '机场退款政策通常是怎样的？未消费能退款吗？',
    a: '大部分代理服务商基于虚拟商品性质，其服务协议（ToS）中均注明“一经售出概不退款”。然而，规范负责的老牌品牌通常会设立人性化退款兜底机制（如：购买 24 小时之内且使用流量不足 2GB-5GB，扣除支付网关手续费后原路退回）。购买前务必在注册页仔细阅读其 Terms of Service 中的退款条款。'
  },
  {
    q: '为什么同一家机场，月付套餐和年付套餐的节点列表不一样？',
    a: '部分高端品牌实行“等级隔离制”，例如基础月付仅开放普通公网中转节点，而年付或高阶旗舰套餐才开放专属 IEPL 物理专线与 IPLC 专线。购买前一定要核对套餐权益明细，确认所选价格档位是否包含自己需要的香港、日本专线和住宅解锁节点。'
  },
  {
    q: '机场优惠码（Coupon）通常在哪里可以找到？',
    a: '正规服务商的优惠码主要有三类渠道：1. 官方首页顶部滚动的全场折扣（如开学季、双十一）；2. 官方合作测评机构的长期专属优惠码（如本站光速云专属码 AMM）；3. 官方 Telegram 频道不定时发布的限量节日活动码。使用时需注意是“首期优惠（一次性）”还是“循环续费优惠（每次续费均打折）”。'
  },
  {
    q: '如果预算每月只有 15 元左右，怎么选最稳妥？',
    a: '建议选择运营年限超过 2 年、提供真月付或稳定年付折算的品牌。例如光速云的年付特惠版（¥99/年，折算仅 ¥8.25/月，69GB/月），或者西瓜皮、闪电猫的轻量月付套餐（¥9.9-¥15/月）。切忌为了便宜去买不知名个人新开的超低价年付。'
  },
  {
    q: '免费节点（白嫖机场）为什么存在巨大的隐私与安全隐患？',
    a: '网络服务器与国际带宽具有昂贵的硬性物理成本。所谓的“完全免费白嫖节点”，其背后的运营者往往通过三种途径变现：1. 劫持 HTTP 流量并注入网页钓鱼脚本与恶意广告；2. 记录用户的无加密请求日志并打包出售给灰色黑产；3. 将用户的客户端作为家庭肉鸡节点，对外发起 DDoS 攻击或转售宽带。切勿在免费节点上登录银行、电商或敏感私人账号。'
  }
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://jichangwiki.homes/pricing/',
      'url': 'https://jichangwiki.homes/pricing/',
      'name': title,
      'description': description,
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
      'mainEntity': faqItems.map(item => ({
        '@type': 'Question',
        'name': item.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.a
        }
      }))
    }
  ]
};
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <!-- Hero Header -->
    <div class="bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-2xl border border-emerald-900/40 relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="max-w-3xl relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30 mb-4">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          2026 深度升级支柱专题 · 资费透明中心
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-5 leading-tight">
          机场价格与套餐对比指南：科学预算与资费避坑
        </h1>
        <p class="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
          拒绝虚标与隐形倍率刺客。本专题建立统一的资费核算口径，深度剖析月付安全边界、年付平摊真实成本、不限时按量永久包价值模型与一元/一分机场商业本质，帮您花最合理的预算，获得最稳定的生产力体验。
        </p>
        <div class="flex flex-wrap gap-3 text-xs sm:text-sm text-slate-300">
          <span class="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            🏷️ 6 维价格计费口径核算
          </span>
          <span class="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            🔍 揭秘节点倍率缩水陷阱
          </span>
          <span class="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            💡 不限时按量容灾测算
          </span>
        </div>
      </div>
    </div>

    <!-- Answer-First Executive Verdict Box -->
    <div class="bg-white rounded-2xl border border-emerald-200/80 shadow-md p-6 sm:p-8 mb-12 relative">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
          💎
        </div>
        <div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900">
            预算与套餐选配结论（Answer-First 核心速览）
          </h2>
          <p class="text-xs sm:text-sm text-slate-500">2026年不同预算区间的最佳订购策略</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-emerald-900 mb-1 text-sm">&lt; ¥10 /月 · 极客尝鲜</div>
          <p class="text-xs text-slate-600">
            适合临时查文献与应急备用。首推<strong>光速云年付特惠</strong>（折合¥8.25/月，需年付¥99），或者不限时小包。慎买纯直连一元包当主力。
          </p>
        </div>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-blue-900 mb-1 text-sm">¥10 - ¥25 /月 · 黄金性价比</div>
          <p class="text-xs text-slate-600">
            最主流的个人日常办公档位。推荐西瓜皮、极速云、光速云高速版（¥25/月）。优先选择<strong>真实月付</strong>，验证晚高峰稳定性。
          </p>
        </div>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-purple-900 mb-1 text-sm">¥25 - ¥50 /月 · 高品质专线</div>
          <p class="text-xs text-slate-600">
            4K影音与AI极客标配。首选全IEPL专线服务商（如红莓网络、青云梯）。晚高峰保证零丢包，全节点解锁支持。
          </p>
        </div>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-amber-900 mb-1 text-sm">&gt; ¥50 /月 · 企业与定制</div>
          <p class="text-xs text-slate-600">
            跨国贸易与团队多设备。重点看设备连接数并发限制、专属客服通道与高连通性SLA保证，不盲目追求低价。
          </p>
        </div>
      </div>
    </div>

    <!-- Secondary Hubs Grid -->
    <div class="mb-14">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900">价格与套餐细分专题</h2>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">按特定资费形态深入了解分类推荐与成本明细</p>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {subSections.map((s) => (
          <a href={s.url} class="p-4 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition group flex flex-col justify-between">
            <div>
              <div class="text-2xl mb-2 group-hover:scale-110 transition-transform">{s.icon}</div>
              <h3 class="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition mb-1">{s.name}</h3>
              <p class="text-[11px] text-slate-500 leading-snug">{s.desc}</p>
            </div>
            <div class="mt-3 pt-2 border-t border-slate-100 flex items-center text-[11px] font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform">
              查看专题 &rarr;
            </div>
          </a>
        ))}
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
      
      <!-- TOC Sidebar -->
      <div class="hidden lg:block lg:col-span-1">
        <div class="sticky top-20 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">本页导航目录</h3>
          <ul class="space-y-2 text-xs font-medium text-slate-600">
            <li><a href="#price-definitions" class="hover:text-emerald-600 transition block py-1">1. 六大价格计费口径定义</a></li>
            <li><a href="#pricing-matrix" class="hover:text-emerald-600 transition block py-1">2. 主流品牌资费全景大表</a></li>
            <li><a href="#one-yuan-analysis" class="hover:text-emerald-600 transition block py-1">3. 一元/一分机场商业本质</a></li>
            <li><a href="#lifetime-model" class="hover:text-emerald-600 transition block py-1">4. 不限时按量流量包价值</a></li>
            <li><a href="#multiplier-traps" class="hover:text-emerald-600 transition block py-1">5. 节点倍率暗扣防范指南</a></li>
            <li><a href="#faqs" class="hover:text-emerald-600 transition block py-1">6. 价格常见问题解答（FAQ）</a></li>
          </ul>
        </div>
      </div>

      <!-- Main Prose Column -->
      <div class="lg:col-span-3 space-y-12">
        
        <!-- Section 1: Price Definitions -->
        <section id="price-definitions" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            1. 六大价格计费口径权威定义：拒绝文字游戏
          </h2>
          <p class="text-slate-600 text-sm leading-relaxed mb-4">
            在代理行业，服务商经常使用模糊的文字描述资费。本站制定严谨的六大计费口径，杜绝混淆：
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span class="font-bold text-slate-900 text-sm block mb-1">1. 实际月付价格（True Monthly）</span>
              <p class="text-xs text-slate-600 leading-relaxed">
                指无需一次性预付整年，支持按单月购买且随时可中断续费的实际扣款金额。这是最安全、抗跑路能力最强的付费方式。
              </p>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span class="font-bold text-slate-900 text-sm block mb-1">2. 年付折算月价（Amortized Monthly）</span>
              <p class="text-xs text-slate-600 leading-relaxed">
                将年付总额除以 12 个月得出的理论均摊月费（例如光速云 ¥99/年折合 ¥8.25/月）。<strong>严禁将此类价格宣传为“无需年付的真实月付”</strong>。
              </p>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span class="font-bold text-slate-900 text-sm block mb-1">3. 不限时按量套餐（Lifetime / Non-expiring）</span>
              <p class="text-xs text-slate-600 leading-relaxed">
                购买后流量永不过期，不会在月底被清零重置。单 GB 价格通常高于按月套餐，但适合低频用户和容灾备用。
              </p>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span class="font-bold text-slate-900 text-sm block mb-1">4. 按月重置流量包（Monthly Reset）</span>
              <p class="text-xs text-slate-600 leading-relaxed">
                无论当月是否用完，到了下一个计费周期或自然月 1 日，未消耗流量一律作废清零并重新充值配额。
              </p>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span class="font-bold text-slate-900 text-sm block mb-1">5. 优惠折后净价（Net Effective Price）</span>
              <p class="text-xs text-slate-600 leading-relaxed">
                输入官方专属折扣码（如 AMM）后实际在收银台结账的净支付价格。需确认是一次性首期打折还是循环续费打折。
              </p>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span class="font-bold text-slate-900 text-sm block mb-1">6. 真实倍率折算流量（Multiplier-Adjusted）</span>
              <p class="text-xs text-slate-600 leading-relaxed">
                套餐标称流量除以用户高频常用节点的平均倍率后，实际能从互联网传输的真实有效物理数据量。
              </p>
            </div>
          </div>
        </section>

        <!-- Section 2: Pricing Matrix -->
        <section id="pricing-matrix" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            2. 主流品牌资费全景大表（真实数据与核验口径）
          </h2>
          <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm mb-4">
            <table class="w-full text-left text-xs sm:text-sm">
              <thead class="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th class="p-3">品牌名称</th>
                  <th class="p-3">起步套餐名</th>
                  <th class="p-3">实际支付价格</th>
                  <th class="p-3">折算月价口径</th>
                  <th class="p-3">套餐流量与周期</th>
                  <th class="p-3">退款机制与承诺</th>
                  <th class="p-3 text-center">优惠码</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200/80 text-slate-700">
                <tr class="bg-emerald-50/40">
                  <td class="p-3 font-bold text-slate-900 flex items-center gap-1">
                    <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
                    光速云
                  </td>
                  <td class="p-3">年付特惠版</td>
                  <td class="p-3 font-mono font-bold text-slate-900">¥99.00 / 年</td>
                  <td class="p-3 font-mono text-emerald-700 font-bold">折合 ¥8.25/月</td>
                  <td class="p-3">69GB / 月（按月重置）</td>
                  <td class="p-3 text-xs text-slate-600">支持工单售后核验</td>
                  <td class="p-3 text-center font-mono font-bold text-amber-700">AMM</td>
                </tr>
                <tr>
                  <td class="p-3 font-bold text-slate-900">光速云高速版</td>
                  <td class="p-3">月付高速专线</td>
                  <td class="p-3 font-mono font-bold text-slate-900">¥25.00 / 月</td>
                  <td class="p-3 font-mono text-slate-800">¥25.00/月（真月付）</td>
                  <td class="p-3">150GB / 月</td>
                  <td class="p-3 text-xs text-slate-600">支持多端专属客户端</td>
                  <td class="p-3 text-center font-mono font-bold text-amber-700">AMM</td>
                </tr>
                <tr>
                  <td class="p-3 font-bold text-slate-900">光速云 Snooker 147</td>
                  <td class="p-3">不限时按量特惠包</td>
                  <td class="p-3 font-mono font-bold text-slate-900">¥147.00 / 一次性</td>
                  <td class="p-3 font-mono text-slate-600">按量永久不过期</td>
                  <td class="p-3">247GB / 永久不过期</td>
                  <td class="p-3 text-xs text-slate-600">完美备用容灾</td>
                  <td class="p-3 text-center font-mono font-bold text-amber-700">AMM</td>
                </tr>
                <tr>
                  <td class="p-3 font-bold text-slate-900">红莓网络</td>
                  <td class="p-3">基础专线月付</td>
                  <td class="p-3 font-mono font-bold text-slate-900">¥20.00 / 月</td>
                  <td class="p-3 font-mono text-slate-800">¥20.00/月（真月付）</td>
                  <td class="p-3">100GB / 月</td>
                  <td class="p-3 text-xs text-slate-600">全IEPL高SLA保证</td>
                  <td class="p-3 text-center font-mono text-slate-400">官方发放</td>
                </tr>
                <tr>
                  <td class="p-3 font-bold text-slate-900">极速云</td>
                  <td class="p-3">尝鲜月付包</td>
                  <td class="p-3 font-mono font-bold text-slate-900">¥15.00 / 月</td>
                  <td class="p-3 font-mono text-slate-800">¥15.00/月（真月付）</td>
                  <td class="p-3">120GB / 月</td>
                  <td class="p-3 text-xs text-slate-600">BGP中转集群</td>
                  <td class="p-3 text-center font-mono text-slate-400">待核实</td>
                </tr>
                <tr>
                  <td class="p-3 font-bold text-slate-900">一分机场</td>
                  <td class="p-3">超低门槛测试包</td>
                  <td class="p-3 font-mono font-bold text-slate-900">¥0.01 / 测试</td>
                  <td class="p-3 font-mono text-slate-600">极低体验门槛</td>
                  <td class="p-3">1GB - 5GB / 短期</td>
                  <td class="p-3 text-xs text-slate-600">仅限临时尝鲜验证</td>
                  <td class="p-3 text-center font-mono text-slate-400">无</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-[11px] text-slate-500">
            * 资费数据基于品牌官网与测试资料真实核对。若有优惠活动变动，以各服务商实时结账界面为准。
          </p>
        </section>

        <!-- Section 3: One Yuan Analysis -->
        <section id="one-yuan-analysis" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            3. 一元/一分机场商业本质：天上不会掉馅饼
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              “一元机场”与“一分机场”在很多技术社群拥有极高讨论度。其定价甚至低于一瓶矿泉水。但必须清楚认识到：
            </p>
            <ul class="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>带宽与硬件硬成本悖论</strong>：一台企业级千兆物理专线中继服务器每月成本在数万元以上。一元机场不可能为你提供高 SLA 的专线资源，通常是几百台公网 VPS 超售给上万名用户。</li>
              <li><strong>晚高峰体验坍塌</strong>：白天测试尚可，一旦进入晚高峰 20:00-23:00，骨干网公网丢包率急剧上升，几乎无法播放 1080P 视频。</li>
              <li><strong>随时失联的生命周期</strong>：此类低价平台往往由个人业余运维，一旦被大规模封锁 IP 导致更换成本超过收入，就会直接关站跑路。</li>
              <li><strong>正确定位</strong>：一元/一分机场适合作为<strong>“一次性测速玩票、临时抓取公开网页、或者极低成本的应急备用跳板”</strong>，绝不可作为日常工作或重要账号登录的主力。</li>
            </ul>
          </div>
        </section>

        <!-- Section 4: Lifetime Model -->
        <section id="lifetime-model" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            4. 不限时按量流量包价值模型：容灾备用的定海神针
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              不限时（按量不过期）套餐与传统按月重置套餐相比，具有独特的资产属性：
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-3">
              <div class="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200">
                <h4 class="font-bold text-slate-900 text-sm mb-1">👍 核心优势</h4>
                <p class="text-xs text-slate-600 leading-relaxed">
                  永不清零，哪怕一年只用 10GB 也不会浪费；作为 Clash 规则组的 Fallback 兜底节点，平时不消耗流量，主力挂掉时瞬间自动补位接管。
                </p>
              </div>
              <div class="p-4 bg-amber-50/50 rounded-xl border border-amber-200">
                <h4 class="font-bold text-slate-900 text-sm mb-1">⚠️ 潜在风险</h4>
                <p class="text-xs text-slate-600 leading-relaxed">
                  单次购买金额较高（通常在 100-200 元）；若服务商在 1-2 年内关门，未消耗的流量仍有沉没风险。因此<strong>必须选择光速云等具备长期稳定运营背书的成熟品牌</strong>。
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 5: Multiplier Traps -->
        <section id="multiplier-traps" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            5. 节点倍率暗扣防范指南：算清真实每 GB 账单
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              在购买任何套餐前，请务必登录用户后台查看其节点列表的“倍率（Multiplier）”标注：
            </p>
            <div class="overflow-x-auto rounded-lg border border-slate-200 bg-white p-4 not-prose my-3 text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="p-3 bg-slate-50 rounded-lg">
                  <span class="font-bold text-slate-900 block mb-1">0.1x - 0.5x 低倍率</span>
                  <p class="text-slate-600 text-[11px]">适合百度网盘大文件传输或系统镜像下载。消耗 10GB 仅扣 1GB-5GB 配额。</p>
                </div>
                <div class="p-3 bg-slate-50 rounded-lg">
                  <span class="font-bold text-slate-900 block mb-1">1.0x 标准倍率</span>
                  <p class="text-slate-600 text-[11px]">最规范的良心计费基准。传输多少扣除多少，无任何隐形缩水。</p>
                </div>
                <div class="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <span class="font-bold text-amber-900 block mb-1">2.0x - 5.0x 高倍率陷阱</span>
                  <p class="text-slate-600 text-[11px]">常被用于少数高成本专线，但若全站主力节点均为此倍率，实际可用流量直接缩水至五分之一。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 6: FAQs -->
        <section id="faqs" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-6 pb-2 border-b border-slate-200">
            6. 价格与套餐选购常见问题（FAQ）
          </h2>
          <div class="space-y-4">
            {faqItems.map((item, index) => (
              <details class="group bg-white rounded-2xl border border-slate-200/80 p-5 open:ring-2 open:ring-emerald-500/20 transition shadow-sm">
                <summary class="font-extrabold text-slate-900 text-sm sm:text-base cursor-pointer flex items-center justify-between list-none">
                  <span class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    {item.q}
                  </span>
                  <span class="text-slate-400 group-open:rotate-180 transition-transform text-lg ml-2">&darr;</span>
                </summary>
                <div class="mt-4 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        <!-- Conversion CTA -->
        <div class="mt-12">
          <BrandCTA 
            brandName="光速云（Guangsu Cloud）" 
            affiliateURL="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"
            couponCode="AMM"
            entryPrice="折合 ¥8/月起（年付¥99）"
            customTitle="兼顾极致性价比与全专线品质 · 光速云"
            customDesc="透明计费不设暗扣，支持专属优惠码 AMM，年付特惠版仅需 ¥99（69GB/月），体验全网公认的高性价比之选。"
          />
        </div>

        <!-- Compliance & Affiliate Disclosure -->
        <AffiliateDisclosure />

      </div>
    </div>

  </div>
</BaseLayout>
`;

writePage('pricing/index.astro', pricingPillarContent);

// =========================================================================
// 03. 机场品牌 PILLAR PAGE: src/pages/brands/index.astro
// =========================================================================
const brandsPillarContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BrandCard from '../../components/conversion/BrandCard.astro';
import BrandCTA from '../../components/conversion/BrandCTA.astro';
import AffiliateDisclosure from '../../components/conversion/AffiliateDisclosure.astro';
import brands from '../../data/brands.json';

const title = '机场品牌数据库与评测大全（2026）｜31家主流服务商全景档案与真伪识别';
const description = '汇聚 31 家主流代理服务商档案的官方数据库中心：提供运营年份、线路类型、自研客户端、解锁评级及官方域名正版防钓鱼核验。支持按老牌稳定系、性价比系与应急轻量系多维筛选。';

const breadcrumbs = [
  { name: '首页', url: '/' },
  { name: '机场品牌', url: '/brands/' }
];

const subSections = [
  { name: '品牌数据库', url: '/brands/directory/', desc: '全景检索大盘：31 家服务商完整技术参数与资质归档', icon: '🗂️' },
  { name: '品牌评测', url: '/brands/reviews/', desc: '深度独立评测：晚高峰真实丢包、流媒体与客观结论', icon: '📝' },
  { name: '官网与品牌识别', url: '/brands/official/', desc: '防钓鱼认证：官方正版域名、李鬼镜像辨析与安全指引', icon: '🌐' },
  { name: '品牌套餐', url: '/brands/prices/', desc: '横向资费对照：31 家起步价格、周期与折算月价明细', icon: '💳' },
  { name: '品牌优惠码', url: '/brands/coupons/', desc: '最新折扣汇总：官方长期合作码与限时减免券核销', icon: '🎟️' },
  { name: '品牌替代方案', url: '/brands/alternatives/', desc: '失联断网不慌：同等价位与同等线路备用品牌无缝切换', icon: '🔄' }
];

const faqItems = [
  {
    q: '本站收录的 31 家机场品牌数据来源是什么？如何保证客观？',
    a: '本站品牌数据库的数据来源由四部分严格交叉验证：1. 品牌官方用户协议与套餐参数公开声明；2. 知识库长期收集的真实测速日志与流媒体/AI 解锁样本；3. 资深技术编辑对客户端代码签名与 DNS 解析的实测抓包；4. 品牌真实历史运营年份与 TG 社区透明度回溯。我们对商业推荐进行显式披露，但绝不对未取得真实证据的技术参数伪造评级。'
  },
  {
    q: '为什么单品牌既有“品牌档案页”又有“深度评测页”？两者的区别是什么？',
    a: '这是两套完全不同的信息载体。品牌档案页（如 /brands/guangsu/）是标准化的“实体资料卡”，聚焦于结构化技术参数（协议、入口、客户端、套餐价格、优惠码、客服渠道、数据状态）；而独立评测页（如 /reviews/guangsu/）则是长篇“客观实测报告”，深度记录晚高峰抗丢包曲线、4K 缓冲实录、流媒体解锁抓包及适用人群避坑指南。'
  },
  {
    q: '如何识别李鬼山寨机场与钓鱼镜像网站？',
    a: '山寨钓鱼网站通常有以下典型特征：1. 域名与官方域名极其相似，仅差一个字母或使用极其廉价的小众后缀（如 .xyz、.top）；2. 页面完全复制正版官网样式，但注册充值通道被替换为个人微信/支付宝个人转账码；3. 网站缺少 SSL 证书或证书颁发者与官网不一致；4. 官方 Telegram 群组链接失效或导向诈骗机器人。请通过本站 <a href="/brands/official/">官网与品牌识别专题</a> 核验正版域名。'
  },
  {
    q: '自研专属客户端与第三方开源客户端（Clash/v2rayN）哪个更安全？',
    a: '安全性和易用性需要权衡。第三方开源客户端（如 Clash Verge Rev、v2rayN）代码完全开源透明，由全球开发者审计，不存在后门或隐私偷跑隐患，且不受单一机场绑架；而自研专属客户端虽然免去了手动导入配置的繁琐，但必须确认其具备正规的代码签名认证，切勿安装来源不明、被杀毒软件报毒的无签名客户端。'
  },
  {
    q: '老牌机场（运营 &gt; 3年）真的比新开机场更靠谱吗？',
    a: '统计概率上具有压倒性优势。代理行业具有极高的沉淀门槛与运维成本。绝大多数跑路或失联事件发生在成立不足 6-12 个月的“个人小作坊”机场中；而平稳运营超过 3 年的老牌品牌（如红莓、极客云、光速云等）积累了庞大的付费用户体量、成熟的多地专线运维团队和抗风险资金池，其跑路套现的边际成本极高。'
  },
  {
    q: '如何核实一家机场的优惠码（Coupon）是否仍然有效？',
    a: '在服务商收银台结算时，输入优惠码并点击“验证/应用”。有效优惠码会在订单总额明细中实时扣减对应金额（例如光速云专属码 AMM 会直接抵扣减免）。如果提示“优惠码不存在”或“已达使用上限”，说明该活动已过期或不适用于当前套餐周期。'
  },
  {
    q: '如果我正在使用的机场突然失联，应该如何快速寻找替代方案？',
    a: '第一步切勿慌张购买大额长期年付；第二步查阅本站的 <a href="/brands/alternatives/">品牌替代方案专题</a>，按您原有的线路习惯（如原先使用 IEPL 专线）筛选同档位服务商；第三步优先订购首月月付或购买一份永久不过期的不限时按量备用包，完成无缝切换后再观察原服务商的故障修复公告。'
  },
  {
    q: '为什么有些机场品牌支持微信/支付宝，有些只支持虚拟币（USDT）？',
    a: '这是支付网关合规与风控成本的体现。支持微信/支付宝通常意味着服务商接入了合规的第三方跨境商业支付通道，具备更高的商业运营门槛与用户友好度；而纯虚拟币（USDT）支付的服务商虽然具备极高的匿名性，但对于国内普通用户门槛较高，且一旦发生跑路纠纷将没有任何合规维权途径。'
  },
  {
    q: '品牌档案中的“待核实”标签代表什么？',
    a: '“待核实”代表该品牌的某项参数（例如宣称拥有 IPLC 专线、宣称全节点解锁 Netflix、或者某个优惠码折扣率）由于官方未公开物理拓扑或我们尚未在严苛环境下完成闭环测试，因此秉持实事求是的原则标记为待核验状态，绝不轻信或照搬未经证实的官方宣传口径。'
  },
  {
    q: '怎样判断一家机场的技术实力是在线还是外包？',
    a: '看其解决骨干网突发故障的速度。当上游海底光缆发生中断或特定地区骨干网拥堵时，具备自研技术团队的服务商通常能在 15-30 分钟内完成 BGP 智能路由切换或热备线路倒换，并在 TG 频道发布清晰的技术说明；而纯粹的“面板二道贩子”只能被动等待上游通知，且无法向用户解释故障原因。'
  }
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://jichangwiki.homes/brands/',
      'url': 'https://jichangwiki.homes/brands/',
      'name': title,
      'description': description,
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
      'mainEntity': faqItems.map(item => ({
        '@type': 'Question',
        'name': item.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.a
        }
      }))
    }
  ]
};
---

<BaseLayout title={title} description={description} breadcrumbs={breadcrumbs} jsonLd={jsonLd}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <!-- Hero Header -->
    <div class="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-2xl border border-indigo-900/40 relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="max-w-3xl relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30 mb-4">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          2026 深度升级支柱专题 · 品牌档案中心
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-5 leading-tight">
          机场品牌数据库与评测大全：31 家服务商全景档案
        </h1>
        <p class="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
          打造最透明、可检索的中文代理服务商全景档案库。聚合 31 家主流品牌的运营历史、协议规范、物理线路拓扑、自研客户端支持与最新正版官网验证，为您的选购决策提供全面客观的技术背书。
        </p>
        <div class="flex flex-wrap gap-3 text-xs sm:text-sm text-slate-300">
          <span class="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            📚 31 家服务商唯一档案归档
          </span>
          <span class="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            🛡️ 官网正版域名防钓鱼核验
          </span>
          <span class="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            🔬 严格区分实测与待核实声明
          </span>
        </div>
      </div>
    </div>

    <!-- Answer-First Executive Verdict Box -->
    <div class="bg-white rounded-2xl border border-indigo-200/80 shadow-md p-6 sm:p-8 mb-12 relative">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
          📑
        </div>
        <div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900">
            品牌鉴别与选购框架（Answer-First 核心速览）
          </h2>
          <p class="text-xs sm:text-sm text-slate-500">如何快速评估一家机场的品牌资质与技术可靠度</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-indigo-900 mb-2 flex items-center gap-1.5 text-base">
            <span>🏛️</span> 运营年限（资质金标准）
          </div>
          <p class="text-xs sm:text-sm text-slate-600">
            优先选择<strong>运营时间超过 2-3 年的老牌服务商</strong>（如光速云、红莓网络等）。新成立平台（&lt;6个月）跑路和抗风险能力极低，只建议以月付尝鲜。
          </p>
        </div>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-blue-900 mb-2 flex items-center gap-1.5 text-base">
            <span>💻</span> 自研 vs 第三方生态
          </div>
          <p class="text-xs sm:text-sm text-slate-600">
            支持一键自研多端客户端（Win/Mac/Android）的品牌，研发投入高、新手体验极佳；同时必须保证提供通用订阅链接以兼容 Clash/v2rayN 等专业工具。
          </p>
        </div>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          <div class="font-bold text-amber-900 mb-2 flex items-center gap-1.5 text-base">
            <span>🛡️</span> 官网防钓鱼与正品核验
          </div>
          <p class="text-xs sm:text-sm text-slate-600">
            搜索引擎充斥大量山寨李鬼镜像站。进入官网前务必通过本站档案核对<strong>正规授权推广链接或官方反代域名</strong>，保护资金与隐私安全。
          </p>
        </div>
      </div>
    </div>

    <!-- Secondary Hubs Grid -->
    <div class="mb-14">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900">品牌专区二级专题导航</h2>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">按特定维度深入品牌档案、深度评测与防伪鉴别</p>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {subSections.map((s) => (
          <a href={s.url} class="p-4 bg-white rounded-2xl border border-slate-200 hover:border-indigo-500 hover:shadow-lg transition group flex flex-col justify-between">
            <div>
              <div class="text-2xl mb-2 group-hover:scale-110 transition-transform">{s.icon}</div>
              <h3 class="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition mb-1">{s.name}</h3>
              <p class="text-[11px] text-slate-500 leading-snug">{s.desc}</p>
            </div>
            <div class="mt-3 pt-2 border-t border-slate-100 flex items-center text-[11px] font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
              进入专题 &rarr;
            </div>
          </a>
        ))}
      </div>
    </div>

    <!-- Master Brands Directory Grid (All 31 Brands) -->
    <div class="mb-14">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900">31 家收录品牌全景速查大盘</h2>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">点击品牌卡片进入实体档案，点击评测链接查看独立实测报告</p>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {brands.map((b) => (
          <BrandCard brand={b} />
        ))}
      </div>
    </div>

    <!-- Main Prose & Knowledge Section -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
      
      <!-- TOC Sidebar -->
      <div class="hidden lg:block lg:col-span-1">
        <div class="sticky top-20 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">本页导航目录</h3>
          <ul class="space-y-2 text-xs font-medium text-slate-600">
            <li><a href="#brand-criteria" class="hover:text-indigo-600 transition block py-1">1. 品牌资质评估五大维度</a></li>
            <li><a href="#phishing-protection" class="hover:text-indigo-600 transition block py-1">2. 识别山寨钓鱼网站指南</a></li>
            <li><a href="#client-types" class="hover:text-indigo-600 transition block py-1">3. 自研与第三方客户端辨析</a></li>
            <li><a href="#directory-vs-review" class="hover:text-indigo-600 transition block py-1">4. 品牌档案与深度评测的区别</a></li>
            <li><a href="#faqs" class="hover:text-indigo-600 transition block py-1">5. 品牌常见问题解答（FAQ）</a></li>
          </ul>
        </div>
      </div>

      <!-- Main Prose Column -->
      <div class="lg:col-span-3 space-y-12">
        
        <!-- Section 1 -->
        <section id="brand-criteria" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            1. 品牌资质评估五大维度：如何判断一家机场的真正成色？
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-4">
            <p>
              在面对上百家名称相似的代理品牌时，不能仅凭几张华丽的宣传海报做出决定。我们建议用户从以下五个核心维度进行系统性穿透分析：
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-3">
              <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span class="font-bold text-slate-900 text-sm block mb-1">① 运营存活时间与历史声誉</span>
                <p class="text-xs text-slate-600">
                  行业统计显示，超过 80% 的服务中断和失联发生在首年。能够平稳跨越多次骨干网重组与特殊敏感时期考验并运营 3 年以上的品牌，其运维底蕴极高。
                </p>
              </div>
              <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span class="font-bold text-slate-900 text-sm block mb-1">② 线路资源的真实专线化率</span>
                <p class="text-xs text-slate-600">
                  核验其是否真正在三大运营商拥有 BGP 接入点与正规内网专线。谨防“公网直连套个中继”冒充高端 IEPL 的虚假包装。
                </p>
              </div>
              <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span class="font-bold text-slate-900 text-sm block mb-1">③ 官方交流社群的透明度</span>
                <p class="text-xs text-slate-600">
                  健康的品牌通常拥有活跃开放的 Telegram 用户交流群。一旦遇到故障，群内有及时的维护通知和客诉响应，而非粗暴开启永久禁言。
                </p>
              </div>
              <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span class="font-bold text-slate-900 text-sm block mb-1">④ 客户端软件工程研发实力</span>
                <p class="text-xs text-slate-600">
                  是否愿意投入高成本研发跨平台自研一键客户端，并取得正规代码签名证书。这代表了品牌长期深耕市场的决心。
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 2 -->
        <section id="phishing-protection" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            2. 识别山寨钓鱼网站指南：保护资金与订阅安全
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              由于部分知名机场（如光速云、红莓等）在中文网络声誉良好，大量黑产团队通过 SEO 快照劫持或投放在线广告建立“李鬼山寨站”。
            </p>
            <div class="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 not-prose my-3">
              <strong class="block mb-1 font-bold text-sm text-amber-900">⚠️ 防钓鱼三大防线：</strong>
              <ol class="list-decimal pl-4 space-y-1">
                <li><strong>核验本站认证链接</strong>：本站所有品牌档案中的官网与注册入口均经过签名哈希比对与官方确认，点击即可直达。</li>
                <li><strong>警惕个人转账与异常支付</strong>：正规服务商多采用跨境自动化支付网关，若页面要求直接向个人微信/支付宝扫码转账并人工发货，必定为山寨欺诈站。</li>
                <li><strong>不要在山寨站输入已有账号密码</strong>：防止撞库导致在其他平台的账户被盗。</li>
              </ol>
            </div>
          </div>
        </section>

        <!-- Section 3 -->
        <section id="client-types" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            3. 自研与第三方客户端辨析：新手与极客各取所需
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              在品牌选择中，客户端形态是影响日常使用体验的关键：
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-3">
              <div class="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                <span class="font-bold text-slate-900 text-sm block mb-1">🚀 自研专属一键客户端</span>
                <p class="text-xs text-slate-600 leading-relaxed">
                  <strong>优势</strong>：免去配置订阅 URL、节点延迟自动排序、一键开关，小白用户 1 分钟上手。<br/>
                  <strong>代表</strong>：光速云（提供 Win / Mac / Android 独立专属安装包）。
                </p>
              </div>
              <div class="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                <span class="font-bold text-slate-900 text-sm block mb-1">🛠️ 通用第三方开源客户端</span>
                <p class="text-xs text-slate-600 leading-relaxed">
                  <strong>优势</strong>：支持自定义分流规则、TUN 虚拟网卡全局接管、可同时导入多家机场实现故障无缝回退。<br/>
                  <strong>代表</strong>：Clash Verge Rev、v2rayN、Shadowrocket。
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 4 -->
        <section id="directory-vs-review" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
            4. 品牌档案与深度评测的区别：如何高效获取决策信息？
          </h2>
          <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              在百科机场架构中，我们对两类内容进行了清晰的边界划分：
            </p>
            <ul class="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>品牌档案实体页（/brands/{'{slug}'}/）</strong>：适合快速检索，查询品牌成立年份、节点覆盖国家、支持协议、官网认证地址、最新优惠码及套餐资费概览。</li>
              <li><strong>深度评测报告页（/reviews/{'{slug}'}/）</strong>：适合深入阅读，包含晚高峰丢包与速率实测曲线图、Netflix/Claude/ChatGPT 解锁实录、自研客户端代码安全性分析与长远抗风险建议。</li>
            </ul>
          </div>
        </section>

        <!-- Section 5: FAQs -->
        <section id="faqs" class="scroll-mt-20">
          <h2 class="text-2xl font-black text-slate-900 mb-6 pb-2 border-b border-slate-200">
            5. 品牌数据库与辨析常见问题（FAQ）
          </h2>
          <div class="space-y-4">
            {faqItems.map((item, index) => (
              <details class="group bg-white rounded-2xl border border-slate-200/80 p-5 open:ring-2 open:ring-indigo-500/20 transition shadow-sm">
                <summary class="font-extrabold text-slate-900 text-sm sm:text-base cursor-pointer flex items-center justify-between list-none">
                  <span class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <span set:html={item.q}></span>
                  </span>
                  <span class="text-slate-400 group-open:rotate-180 transition-transform text-lg ml-2">&darr;</span>
                </summary>
                <div class="mt-4 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed" set:html={item.a}>
                </div>
              </details>
            ))}
          </div>
        </section>

        <!-- Conversion CTA -->
        <div class="mt-12">
          <BrandCTA 
            brandName="光速云（Guangsu Cloud）" 
            affiliateURL="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"
            couponCode="AMM"
            entryPrice="折合 ¥8/月起（年付¥99）"
            customTitle="查验正规授权渠道 · 光速云"
            customDesc="收录于 31 家品牌官方数据库之首，提供通过正版认证的官方直达注册通道与专属优惠码 AMM。"
          />
        </div>

        <!-- Compliance & Affiliate Disclosure -->
        <AffiliateDisclosure />

      </div>
    </div>

  </div>
</BaseLayout>
`;

writePage('brands/index.astro', brandsPillarContent);

console.log('BATCH 1 COMPLETED SUCCESSFULLY!');
