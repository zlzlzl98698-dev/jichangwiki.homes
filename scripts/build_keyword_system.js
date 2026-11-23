import fs from 'fs';
import path from 'path';

const keywordsDir = path.resolve('data/keywords');
if (!fs.existsSync(keywordsDir)) {
  fs.mkdirSync(keywordsDir, { recursive: true });
}

// 10 Domains and their subhubs
const domains = [
  {
    id: 'airport',
    name: '机场推荐',
    hubs: [
      { slug: 'recommend', name: '机场推荐', intent: 'Commercial Investigation' },
      { slug: 'ranking', name: '机场排行', intent: 'Comparative Evaluation' },
      { slug: 'reliable', name: '靠谱机场', intent: 'Risk Aversion' },
      { slug: 'stable', name: '稳定机场', intent: 'High-Availability' },
      { slug: 'best', name: '好用的机场', intent: 'High-End Intent' }
    ]
  },
  {
    id: 'pricing',
    name: '价格与套餐',
    hubs: [
      { slug: 'cheap', name: '便宜机场', intent: 'Transactional (Budget)' },
      { slug: 'one-yuan', name: '一元机场', intent: 'Curiosity & Scam Check' },
      { slug: 'one-cent', name: '一分机场', intent: 'Free Trial Scam Check' },
      { slug: 'monthly', name: '月付机场', intent: 'Transactional (Monthly)' },
      { slug: 'lifetime', name: '不限时机场', intent: 'Pay As You Go' },
      { slug: 'value', name: '性价比机场', intent: 'Value Optimization' }
    ]
  },
  {
    id: 'brands',
    name: '机场品牌',
    hubs: [
      { slug: 'directory', name: '品牌数据库', intent: 'Navigational' },
      { slug: 'reviews', name: '品牌评测', intent: 'Commercial Investigation' },
      { slug: 'official', name: '官网识别', intent: 'Security & Verification' },
      { slug: 'prices', name: '品牌套餐', intent: 'Price Comparison' },
      { slug: 'coupons', name: '品牌优惠码', intent: 'Coupon Redemption' },
      { slug: 'alternatives', name: '替代方案', intent: 'Disaster Recovery' }
    ]
  },
  {
    id: 'vpn',
    name: 'VPN与加速器',
    hubs: [
      { slug: 'recommend', name: 'VPN推荐', intent: 'Commercial Investigation' },
      { slug: 'free', name: '免费VPN真相', intent: 'Risk Education' },
      { slug: 'mobile', name: '手机VPN指南', intent: 'Mobile Optimization' },
      { slug: 'android', name: '安卓VPN指南', intent: 'Platform Specific' },
      { slug: 'gaming', name: '游戏加速指南', intent: 'Low Latency Gaming' }
    ]
  },
  {
    id: 'clients',
    name: '客户端软件',
    hubs: [
      { slug: 'clash-verge', name: 'Clash Verge Rev', intent: 'How-to / Tutorial' },
      { slug: 'clash-meta', name: 'Clash Meta (Mihomo)', intent: 'Technical Analysis' },
      { slug: 'v2rayn', name: 'v2rayN', intent: 'How-to / Windows' },
      { slug: 'shadowrocket', name: 'Shadowrocket (小火箭)', intent: 'How-to / iOS' },
      { slug: 'mihomo', name: 'Mihomo 核心', intent: 'Technical Deep Dive' },
      { slug: 'sing-box', name: 'sing-box', intent: 'How-to / Platform' }
    ]
  },
  {
    id: 'streaming-ai',
    name: 'AI与流媒体',
    hubs: [
      { slug: 'chatgpt', name: 'ChatGPT 解锁指南', intent: 'Troubleshooting & Unblock' },
      { slug: 'claude', name: 'Claude 防封指南', intent: 'Account Risk & Setup' },
      { slug: 'gemini', name: 'Google Gemini 指南', intent: 'Geo-restriction Bypass' },
      { slug: 'netflix', name: 'Netflix 4K 解锁', intent: 'Streaming Unblock' },
      { slug: 'youtube', name: 'YouTube 4K 流畅指南', intent: 'Bandwidth & Premium' }
    ]
  },
  {
    id: 'network',
    name: '线路与节点',
    hubs: [
      { slug: 'iepl', name: 'IEPL 专线解析', intent: 'Technical Architecture' },
      { slug: 'iplc', name: 'IPLC 专线解析', intent: 'Enterprise Latency' },
      { slug: 'hong-kong', name: '香港节点评测', intent: 'Regional Analysis' },
      { slug: 'japan', name: '日本节点指南', intent: 'Regional Analysis' },
      { slug: 'low-latency', name: '低延迟专线指南', intent: 'Performance Tuning' },
      { slug: 'traffic-ratio', name: '倍率机制解析', intent: 'Cost Calculation' }
    ]
  },
  {
    id: 'tutorials',
    name: '使用教程',
    hubs: [
      { slug: 'subscription', name: '订阅管理指南', intent: 'How-to / Management' },
      { slug: 'clash-configuration', name: 'Clash 进阶配置', intent: 'Configuration / YAML' },
      { slug: 'routing-rules', name: '路由规则实操', intent: 'Routing & Split' },
      { slug: 'tun-mode', name: 'TUN模式配置指南', intent: 'Global Proxy' },
      { slug: 'client-installation', name: '客户端安装指南', intent: 'Installation' }
    ]
  },
  {
    id: 'troubleshooting',
    name: '故障排查',
    hubs: [
      { slug: 'timeout', name: '节点超时排查', intent: 'Troubleshooting / Clock' },
      { slug: 'subscription-failed', name: '订阅更新失败', intent: 'Troubleshooting / Cert' },
      { slug: 'connection-failed', name: '连接故障排查', intent: 'Troubleshooting / Proxy' },
      { slug: 'dns-error', name: 'DNS错误排查', intent: 'Troubleshooting / DNS' },
      { slug: 'client-startup', name: '启动故障排查', intent: 'Troubleshooting / Port' }
    ]
  },
  {
    id: 'risk',
    name: '风险与替代',
    hubs: [
      { slug: 'shutdown', name: '跑路风险防范', intent: 'Risk Aversion' },
      { slug: 'avoid-scams', name: '避坑防骗指南', intent: 'Scam Detection' },
      { slug: 'alternatives', name: '多线容灾方案', intent: 'High Availability' },
      { slug: 'refunds', name: '退款与售后政策', intent: 'Consumer Rights' },
      { slug: 'security', name: '安全与隐私保护', intent: 'Security & Privacy' }
    ]
  }
];

// Read 165 backlog titles
const backlogFile = path.resolve('reports/secondary-article-backlog.md');
const backlogContent = fs.readFileSync(backlogFile, 'utf8');
const articleMatches = [...backlogContent.matchAll(/(\d+)\.\s+`([^`]+)`/g)];

const articles = articleMatches.map((m, idx) => {
  const id = parseInt(m[1]);
  const title = m[2];
  
  // Categorize by index ranges based on secondary-article-backlog.md
  let categoryId = 'airport';
  if (id <= 15) categoryId = 'airport';
  else if (id <= 33) categoryId = 'pricing';
  else if (id <= 48) categoryId = 'streaming-ai';
  else if (id <= 66) categoryId = 'clients';
  else if (id <= 81) categoryId = 'troubleshooting';
  else if (id <= 96) categoryId = 'network';
  else categoryId = 'risk';

  const domain = domains.find(d => d.id === categoryId) || domains[0];
  const hub = domain.hubs[idx % domain.hubs.length];
  
  // Create slug
  const slug = title
    .replace(/[：:，,、？?（）()\/]/g, ' ')
    .trim()
    .split(/\s+/)
    .slice(0, 4)
    .join('-')
    .toLowerCase();

  const priority = id <= 35 ? 'P0' : id <= 90 ? 'P1' : 'P2';
  const status = id <= 25 ? 'published' : 'planned';

  return {
    id,
    title,
    slug: `article-${id}`,
    category: categoryId,
    parentHubUrl: `/${categoryId}/${hub.slug}/`,
    targetUrl: `/articles/article-${id}/`,
    primaryKeyword: title.slice(0, 16),
    secondaryKeywords: [title.slice(0, 10), hub.name, '科学上网'],
    longtailQuestions: [`${title}的具体步骤是什么？`, `${title}如何避免踩坑？`],
    searchIntent: hub.intent,
    priority,
    status,
    relatedBrands: ['guangsu', 'feimao', 'ermao']
  };
});

// 1. data/keywords/longtail-master.csv
let csvRows = ['id,primary_keyword,secondary_keywords,longtail_questions,search_intent,target_category,subhub_path,priority,status'];
for (const a of articles) {
  const row = [
    a.id,
    `"${a.primaryKeyword}"`,
    `"${a.secondaryKeywords.join(';')}"`,
    `"${a.longtailQuestions.join(';')}"`,
    `"${a.searchIntent}"`,
    `"${a.category}"`,
    `"${a.parentHubUrl}"`,
    a.priority,
    a.status
  ].join(',');
  csvRows.push(row);
}
fs.writeFileSync(path.join(keywordsDir, 'longtail-master.csv'), csvRows.join('\n'), 'utf8');
console.log('Generated: data/keywords/longtail-master.csv');

// 2. data/keywords/article-keyword-map.json
fs.writeFileSync(path.join(keywordsDir, 'article-keyword-map.json'), JSON.stringify(articles, null, 2), 'utf8');
console.log('Generated: data/keywords/article-keyword-map.json');

// 3. data/keywords/cluster-map.json
const clusterMap = domains.map(d => ({
  domainId: d.id,
  domainName: d.name,
  pillarUrl: `/${d.id}/`,
  subHubs: d.hubs.map(h => ({
    hubSlug: h.slug,
    hubName: h.name,
    hubUrl: `/${d.id}/${h.slug}/`,
    coreIntent: h.intent,
    articles: articles.filter(a => a.parentHubUrl === `/${d.id}/${h.slug}/`).map(a => ({
      id: a.id,
      title: a.title,
      targetUrl: a.targetUrl,
      priority: a.priority
    }))
  }))
}));
fs.writeFileSync(path.join(keywordsDir, 'cluster-map.json'), JSON.stringify(clusterMap, null, 2), 'utf8');
console.log('Generated: data/keywords/cluster-map.json');

// 4. data/keywords/content-priority.csv
let priorityRows = ['priority,id,title,target_url,category,word_count_target,status'];
for (const a of articles) {
  const wordTarget = a.priority === 'P0' ? 4500 : a.priority === 'P1' ? 3500 : 2500;
  priorityRows.push([a.priority, a.id, `"${a.title}"`, a.targetUrl, a.category, wordTarget, a.status].join(','));
}
fs.writeFileSync(path.join(keywordsDir, 'content-priority.csv'), priorityRows.join('\n'), 'utf8');
console.log('Generated: data/keywords/content-priority.csv');

console.log('ALL KEYWORD SYSTEM ASSETS CREATED SUCCESSFULLY!');
