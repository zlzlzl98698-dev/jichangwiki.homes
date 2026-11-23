import fs from 'fs';

const missing = [
  { file: 'src/pages/clients/clash-meta.astro', varName: 'metaFaqs' },
  { file: 'src/pages/clients/clash-verge.astro', varName: 'vergeFaqs' },
  { file: 'src/pages/clients/mihomo.astro', varName: 'mihomoFaqs' },
  { file: 'src/pages/clients/shadowrocket.astro', varName: 'rocketFaqs' },
  { file: 'src/pages/clients/sing-box.astro', varName: 'singboxFaqs' },
  { file: 'src/pages/clients/v2rayn.astro', varName: 'v2raynFaqs' },
  { file: 'src/pages/network/hong-kong.astro', varName: 'hkFaqs' },
  { file: 'src/pages/network/iepl.astro', varName: 'ieplFaqs' },
  { file: 'src/pages/network/iplc.astro', varName: 'iplcFaqs' },
  { file: 'src/pages/network/japan.astro', varName: 'jpFaqs' },
  { file: 'src/pages/network/low-latency.astro', varName: 'latFaqs' },
  { file: 'src/pages/network/traffic-ratio.astro', varName: 'ratFaqs' },
  { file: 'src/pages/risk/alternatives.astro', varName: 'altFaqs' },
  { file: 'src/pages/risk/avoid-scams.astro', varName: 'scamFaqs' },
  { file: 'src/pages/risk/refunds.astro', varName: 'refFaqs' },
  { file: 'src/pages/risk/security.astro', varName: 'secFaqs' },
  { file: 'src/pages/risk/shutdown.astro', varName: 'shutFaqs' },
  { file: 'src/pages/streaming-ai/chatgpt.astro', varName: 'gptFaqs' },
  { file: 'src/pages/streaming-ai/claude.astro', varName: 'claudeFaqs' },
  { file: 'src/pages/streaming-ai/gemini.astro', varName: 'geminiFaqs' },
  { file: 'src/pages/streaming-ai/netflix.astro', varName: 'nflxFaqs' },
  { file: 'src/pages/streaming-ai/youtube.astro', varName: 'ytFaqs' },
  { file: 'src/pages/troubleshooting/client-startup.astro', varName: 'startFaqs' },
  { file: 'src/pages/troubleshooting/connection-failed.astro', varName: 'connFailFaqs' },
  { file: 'src/pages/troubleshooting/dns-error.astro', varName: 'dnsFaqs' },
  { file: 'src/pages/troubleshooting/subscription-failed.astro', varName: 'subFailFaqs' },
  { file: 'src/pages/troubleshooting/timeout.astro', varName: 'timeoutFaqs' },
  { file: 'src/pages/tutorials/clash-configuration.astro', varName: 'cfgFaqs' },
  { file: 'src/pages/tutorials/client-installation.astro', varName: 'instFaqs' },
  { file: 'src/pages/tutorials/routing-rules.astro', varName: 'routeFaqs' },
  { file: 'src/pages/tutorials/subscription.astro', varName: 'subFaqs' },
  { file: 'src/pages/tutorials/tun-mode.astro', varName: 'tunFaqs' },
  { file: 'src/pages/vpn/android.astro', varName: 'vpnAndFaqs' },
  { file: 'src/pages/vpn/free.astro', varName: 'vpnFreeFaqs' },
  { file: 'src/pages/vpn/gaming.astro', varName: 'vpnGameFaqs' },
  { file: 'src/pages/vpn/mobile.astro', varName: 'vpnMobFaqs' },
  { file: 'src/pages/vpn/recommend.astro', varName: 'vpnRecFaqs' },
];

for (const item of missing) {
  let content = fs.readFileSync(item.file, 'utf8');
  const injectCode = `\nconst ${item.varName} = jsonLd['@graph'][1].mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text }));`;
  if (!content.includes(item.varName + ' =')) {
    content = content.replace(/const jsonLd = (\{[\s\S]*?\});/, 'const jsonLd = $1;' + injectCode);
    fs.writeFileSync(item.file, content, 'utf8');
    console.log('Patched:', item.file);
  }
}
console.log('ALL PATCHED!');
