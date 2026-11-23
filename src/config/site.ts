/**
 * 全站基础信息与搜索引擎验证配置
 * Formal Site Configuration & Search Engine Verification
 */
export interface SiteVerificationConfig {
  google?: string;
  bing?: string;
  shenma?: string;
  baidu?: string;
}

export interface SiteConfig {
  name: string;
  domain: string;
  url: string;
  description: string;
  author: string;
  verification: SiteVerificationConfig;
}

export const siteConfig: SiteConfig = {
  name: '百科机场',
  domain: 'jichangwiki.homes',
  url: 'https://jichangwiki.homes',
  description: '专业的中文机场知识百科、客户端教程与品牌客观评测数据库。',
  author: '百科机场编辑委员会',
  // 站长平台验证代码预留（获取后填入相应字段，静态编译时将自动嵌入 <head>，无需改动核心组件）
  verification: {
    google: '',  // 示例: google-site-verification=xxxx
    bing: '',    // 示例: msvalidate.01=xxxx
    shenma: '',  // 示例: shenma-site-verification=xxxx
    baidu: '',   // 示例: baidu-site-verification=codeva-xxxx
  }
};
