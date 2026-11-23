import fs from 'fs';
import path from 'path';

const brands = JSON.parse(fs.readFileSync('src/data/brands.json', 'utf-8'));

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writePage(relPath, content) {
  const fullPath = path.resolve('src/pages', relPath);
  ensureDir(fullPath);
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf-8');
}

// 1. Homepage: src/pages/index.astro
const homepageContent = `---
import BaseLayout from '../layouts/BaseLayout.astro';
import BrandCard from '../components/conversion/BrandCard.astro';
import BrandCTA from '../components/conversion/BrandCTA.astro';
import PerformanceReport from '../components/charts/PerformanceReport.astro';
import AvailabilityMatrix from '../components/charts/AvailabilityMatrix.astro';
import NetworkPathObservatory from '../components/charts/NetworkPathObservatory.astro';
import AffiliateDisclosure from '../components/conversion/AffiliateDisclosure.astro';
import brands from '../data/brands.json';

const title = '百科机场｜2026 中文机场推荐、客户端教程与品牌客观评测知识库';
const description = '百科机场 (jichangwiki.homes) 是专业的中文网络代理知识百科。提供 31+ 机场品牌客观测评、晚高峰实测数据、Clash/v2rayN/小火箭客户端下载配置教程、IEPL/IPLC专线科普与避坑指南。';

const guangsu = brands.find(b => b.id === 'guangsu') || brands[0];
const topPicks = brands.slice(0, 10);
const cheapPicks = brands.filter(b => b.minMonthlyPrice && b.minMonthlyPrice <= 15).slice(0, 6);

const categories = [
  { name: '机场推荐', url: '/airport/', icon: '🚀', desc: '按新手、预算、稳定性与场景选购' },
  { name: '价格与套餐', url: '/pricing/', icon: '💰', desc: '便宜机场、月付与不限时流量' },
  { name: '机场品牌', url: '/brands/', icon: '🏢', desc: '31+ 品牌档案库与客观评测' },
  { name: 'VPN与加速器', url: '/vpn/', icon: '🛡️', desc: '商业VPN、自建与游戏加速差异' },
  { name: '客户端软件', url: '/clients/', icon: '📱', desc: 'Clash、v2rayN、Shadowrocket下载' },
  { name: 'AI与流媒体', url: '/streaming-ai/', icon: '🎬', desc: 'ChatGPT、Claude与Netflix解锁' },
  { name: '线路与节点', url: '/network/', icon: '🌐', desc: 'IEPL、IPLC专线原理与倍率' },
  { name: '使用教程', url: '/tutorials/', icon: '📖', desc: '订阅导入、分流规则与TUN模式' },
  { name: '故障排查', url: '/troubleshooting/', icon: '🔧', desc: 'Timeout超时与连接失败诊断' },
  { name: '风险与替代', url: '/risk/', icon: '⚠️', desc: '跑路失联预警与避坑维权' }
];
---

<BaseLayout title={title} description={description}>
  
  <!-- Hero Section -->
  <section class="bg-gradient-to-b from-blue-50/50 via-white to-slate-50 py-12 sm:py-16 border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-4">
        <span>📚 中文代理知识百科与客观实测</span>
        <span>·</span>
        <span>拒绝虚构与机械换词</span>
      </div>
      
      <h1 class="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-5 max-w-4xl mx-auto">
        百科机场：懂线路、讲数据、重避坑的<span class="text-blue-600">中文网络知识库</span>
      </h1>
      
      <p class="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
        涵盖 31+ 机场品牌数据档案、万字客观评测、晚高峰测速报告、Clash/小火箭客户端配置教程及 AI/流媒体解锁矩阵。
      </p>

      <!-- Search Bar -->
      <div class="max-w-xl mx-auto mb-8">
        <a href="/search/" class="flex items-center justify-between w-full p-3.5 bg-white rounded-2xl shadow-md border border-slate-200 hover:border-blue-400 text-slate-400 hover:text-slate-600 transition group">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span class="text-sm">搜索光速云、IEPL专线、Clash教程、ChatGPT节点...</span>
          </div>
          <span class="px-2.5 py-1 rounded bg-slate-100 text-xs font-medium text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600">搜索</span>
        </a>
      </div>

      <!-- Quick Trust Badges -->
      <div class="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
        <span class="flex items-center gap-1">✓ 统一价格与折算口径</span>
        <span class="flex items-center gap-1">✓ 严格区分测速状态</span>
        <span class="flex items-center gap-1">✓ 拒绝无依据跑路谣传</span>
        <span class="flex items-center gap-1">✓ 全站透明推广声明</span>
      </div>
    </div>
  </section>

  <!-- 10 Primary Navigation Category Grid -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">10 大一级专题核心知识库</h2>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">每个专题均配备独立二级栏目与深度内容集群</p>
      </div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
      {categories.map((cat) => (
        <a href={cat.url} class="group p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all">
          <div class="text-2xl mb-2 group-hover:scale-110 transition-transform">{cat.icon}</div>
          <div class="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{cat.name}</div>
          <div class="text-[11px] text-slate-500 mt-1 line-clamp-1">{cat.desc}</div>
        </a>
      ))}
    </div>
  </section>

  <!-- Primary Promotion Spotlight: 光速云 -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-8">
    <BrandCTA 
      brandName={guangsu.name}
      affiliateURL={guangsu.affiliateURL}
      couponCode="AMM"
      entryPrice={guangsu.entryPrice}
      variant="banner"
    />
  </section>

  <!-- Featured 10 Top Brands -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
      <div>
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">重点品牌展示与综合精选</h2>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">覆盖光速云、暮光加速、飞猫云、星岛梦、隐形人等核心品牌</p>
      </div>
      <a href="/brands/directory/" class="text-xs font-semibold text-blue-600 hover:underline">
        查看完整 31+ 品牌数据库 &rarr;
      </a>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {topPicks.map((b) => (
        <BrandCard brand={b} />
      ))}
    </div>
  </section>

  <!-- Technical Observatories Showcase -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-slate-100/70 rounded-3xl my-8">
    <div class="text-center max-w-2xl mx-auto mb-8">
      <span class="text-xs font-semibold text-blue-600 uppercase tracking-wider">Dark Network Observatory</span>
      <h2 class="text-2xl font-bold text-slate-900 mt-1">专业网络实验室可视化系统</h2>
      <p class="text-xs sm:text-sm text-slate-500 mt-2">
        拒绝廉价广告海报，采用基础设施监控逻辑，客观呈现晚高峰测速与真实解锁矩阵。
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <PerformanceReport 
        brandName="光速云 (主推)"
        testTime="2026-10-19 实测"
        speedItems={guangsu.performanceTests}
        avgLatency="45ms"
        maxDownload="529 Mbps"
        dataStatus="measured"
      />
      <AvailabilityMatrix 
        brandName="光速云 (主推)"
        capabilities={guangsu.streamingCapabilities}
      />
    </div>
  </section>

  <!-- Client Software Quick Links -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">常用代理客户端软件与教程</h2>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">覆盖 Windows、Android、iOS、macOS 与软路由开源生态</p>
      </div>
      <a href="/clients/" class="text-xs font-semibold text-blue-600 hover:underline">
        查看全部客户端 &rarr;
      </a>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      <a href="/clients/clash-verge/" class="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-500 text-center transition">
        <div class="text-xl mb-1">⚡</div>
        <div class="font-bold text-xs text-slate-900">Clash Verge Rev</div>
        <div class="text-[10px] text-slate-500 mt-0.5">跨平台现代首选</div>
      </a>
      <a href="/clients/v2rayn/" class="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-500 text-center transition">
        <div class="text-xl mb-1">💻</div>
        <div class="font-bold text-xs text-slate-900">v2rayN</div>
        <div class="text-[10px] text-slate-500 mt-0.5">Windows 经典利器</div>
      </a>
      <a href="/clients/shadowrocket/" class="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-500 text-center transition">
        <div class="text-xl mb-1">🚀</div>
        <div class="font-bold text-xs text-slate-900">Shadowrocket</div>
        <div class="text-[10px] text-slate-500 mt-0.5">iOS 小火箭</div>
      </a>
      <a href="/clients/sing-box/" class="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-500 text-center transition">
        <div class="text-xl mb-1">📦</div>
        <div class="font-bold text-xs text-slate-900">sing-box</div>
        <div class="text-[10px] text-slate-500 mt-0.5">下一代通用核心</div>
      </a>
      <a href="/clients/clash-meta/" class="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-500 text-center transition">
        <div class="text-xl mb-1">⚙️</div>
        <div class="font-bold text-xs text-slate-900">Mihomo / Meta</div>
        <div class="text-[10px] text-slate-500 mt-0.5">开源内核指南</div>
      </a>
      <a href="/tutorials/subscription/" class="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-500 text-center transition">
        <div class="text-xl mb-1">📖</div>
        <div class="font-bold text-xs text-slate-900">订阅导入教程</div>
        <div class="text-[10px] text-slate-500 mt-0.5">新手一键导入指南</div>
      </a>
    </div>
  </section>

  <!-- Full Compliance Disclosure -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-8">
    <AffiliateDisclosure />
  </section>

</BaseLayout>
`;

writePage('index.astro', homepageContent);
console.log('Homepage written successfully.');
