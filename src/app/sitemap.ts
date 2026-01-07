import { MetadataRoute } from 'next';
import { getList } from '@/libs/microcms';

export const revalidate = 3600; // 1時間に1回更新

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 全記事を取得
  const { contents: posts } = await getList();
  
  // サイトのベースURL（デプロイ先のURLが決まったら書き換えてください）
  // 一旦 localhost または仮のURLにしておきます
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';

  const postUrls = posts.map((post) => ({
    url: `${baseURL}/blog/${post.category?.id}/${post.id}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    priority: 0.8,
  }));

  return [
    {
      url: baseURL,
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: `${baseURL}/about`,
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: `${baseURL}/contact`,
      lastModified: new Date(),
      priority: 0.5,
    },
    ...postUrls,
  ];
}