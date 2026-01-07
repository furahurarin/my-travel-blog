import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // 自分のサイトのURL（デプロイ後に環境変数で設定します）
  // 今は仮で example.com または localhost になっています
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';

  return {
    rules: {
      userAgent: '*', // すべての検索エンジンロボットに対して
      allow: '/',     // 全ページの閲覧を許可する
    },
    sitemap: `${baseURL}/sitemap.xml`, // サイトマップの場所を教える
  };
}