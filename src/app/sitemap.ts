import { MetadataRoute } from 'next';
import { getAllBlogs, getAllCategories } from '@/libs/microcms';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.furahura-travel.com';

  // ▼ 修正: 全件取得メソッドを使用（100件以上の記事に対応）
  const posts = await getAllBlogs();
  const categories = await getAllCategories();

  // 記事ページのURLを生成
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.category?.id}/${post.id}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // カテゴリページのURLを生成
  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/blog/${category.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.1,
    },
    ...categoryUrls,
    ...postUrls,
  ];
}