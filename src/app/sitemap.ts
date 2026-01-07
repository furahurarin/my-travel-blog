import { MetadataRoute } from 'next';
import { getList } from '@/libs/microcms';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { contents: posts } = await getList();
  
  // ▼ 修正: 決定したドメインを設定
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://furahura-travel.com';

  const postUrls = posts.map((post) => ({
    // カテゴリの有無チェック（安全策）
    url: `${baseURL}/blog/${post.category?.id ?? 'misc'}/${post.id}`,
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