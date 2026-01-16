import { getAllBlogs } from "@/libs/microcms";

export async function GET() {
  // ▼ 修正: 全件取得メソッドを使用
  const posts = await getAllBlogs();
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.furahura-travel.com";

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
      <pubDate>${new Date(post.publishedAt || post.createdAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.description || post.content.replace(/<[^>]+>/g, "").slice(0, 120)}...]]></description>
    </item>`).join('')}
  </channel>
  </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      // キャッシュ制御: 1時間キャッシュ、その後再検証
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}