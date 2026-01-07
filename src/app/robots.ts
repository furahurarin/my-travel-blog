import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // ▼ 修正: 決定したドメインを設定
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://furahura-travel.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseURL}/sitemap.xml`,
  };
}