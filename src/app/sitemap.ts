import { MetadataRoute } from 'next';
import { getList, getCategories } from '@/libs/microcms';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://furahura-travel.com';

  // 1. 全記事を取得 (limitを大きくして全件取得する設定)
  const { contents: posts } = await getList({ limit: 100 });
  
  // 2. 全カテゴリを取得
  const { contents: categories } = await getCategories({ limit: 100 });

  // 3. 記事ページのURLを生成
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.category?.id}/${post.id}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 4. カテゴリページのURLを生成
  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/blog/${category.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  // 5. 静的ページと合わせて返す
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