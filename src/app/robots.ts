import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://furahura-travel.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // 管理画面やAPIエンドポイントなどは隠す（必要に応じて）
      disallow: ['/api/', '/draft'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}