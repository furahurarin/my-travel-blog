import { getList } from '@/libs/microcms';

export async function GET() {
  // 全記事を取得 (limitを大きく設定)
  const { contents: posts } = await getList({ limit: 100 });
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://furahura-travel.com';

  // RSSのXMLを構築
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ふらふら旅行記</title>
    <link>${siteUrl}</link>
    <description>賢い移動と快適な旅を追求する旅行ブログ</description>
    <language>ja</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts.map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.category?.id}/${post.id}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.category?.id}/${post.id}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.content.replace(/<[^>]+>/g, "").slice(0, 120)}...]]></description>
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate', // 1時間キャッシュ
    },
  });
}