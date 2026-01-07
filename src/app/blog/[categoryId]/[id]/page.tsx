import { getDetail, getList } from "@/libs/microcms";
import { PriceComparison } from "@/components/PriceComparison";
import { Breadcrumb } from "@/components/Breadcrumb";
import { RelatedPosts } from "@/components/RelatedPosts";
import { Sidebar } from "@/components/Sidebar";
import { ShareButtons } from "@/components/ShareButtons";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { TableOfContents } from "@/components/TableOfContents";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import * as cheerio from "cheerio";
import { draftMode } from 'next/headers';

type Props = {
  params: Promise<{ categoryId: string; id: string }>;
  searchParams: Promise<{ draftKey?: string }>;
};

// メタデータの生成
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { id } = await params;
  const { draftKey } = await searchParams;
  
  const post = await getDetail(id, {
    draftKey: draftKey,
  }).catch(() => null);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: `${post.title}についての解説記事です。`,
    openGraph: {
      title: post.title,
      description: `${post.title}についての解説記事です。`,
      images: post.eyecatch ? [post.eyecatch.url] : [],
    },
  };
}

// 静的パスの生成
export async function generateStaticParams() {
  const { contents } = await getList();
  
  return contents
    .filter((post) => post.category)
    .map((post) => ({
      categoryId: post.category!.id,
      id: post.id,
    }));
}

type TocItem = {
  text: string;
  id: string;
  tag: string;
};

export default async function BlogPost({ params, searchParams }: Props) {
  const { categoryId, id } = await params;
  const { draftKey } = await searchParams;
  
  const { isEnabled } = await draftMode();

  const post = await getDetail(id, {
    draftKey: isEnabled && draftKey ? draftKey : undefined,
  }).catch(() => null);

  if (!post || (!draftKey && post.category?.id !== categoryId)) {
    notFound();
  }

  const { contents: relatedPosts } = await getList({
    limit: 3,
    filters: `category[equals]${categoryId}[and]id[not_equals]${post.id}`,
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://furahura-travel.com';
  const cleanDescription = post.content.replace(/<[^>]+>/g, "").slice(0, 120) + "...";

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.category?.id}/${post.id}`
    },
    headline: post.title,
    image: post.eyecatch ? [post.eyecatch.url] : [],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: 'ふらふら旅行記', 
      url: `${baseUrl}/about`
    },
    description: cleanDescription,
  };

  const $ = cheerio.load(post.content);
  const headings = $("h2, h3").toArray();
  const toc: TocItem[] = headings.map((data) => {
    const text = $(data).text();
    const id = `heading-${headings.indexOf(data)}`;
    $(data).attr("id", id);
    return {
      text,
      id,
      tag: data.tagName,
    };
  });
  
  const modifiedContent = $.html();

  return (
    <main className="max-w-7xl mx-auto p-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {isEnabled && (
        <div className="bg-yellow-400 text-yellow-900 p-2 text-center text-sm font-bold mb-4 rounded">
          現在プレビューモードで表示しています
        </div>
      )}

      <Breadcrumb 
        items={[
          { name: "TOP", path: "/" }, 
          { name: post.category?.name ?? "カテゴリなし", path: `/blog/${post.category?.id ?? "misc"}` }, 
          { name: post.title }
        ]} 
      />

      <div className="flex flex-col lg:flex-row gap-10 mt-6">
        
        {/* メインエリア */}
        <article className="flex-1 min-w-0">
          
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
              {/* ▼▼▼ 修正: "ja-JP" を指定 ▼▼▼ */}
              <time dateTime={post.publishedAt}>
                公開: {new Date(post.publishedAt).toLocaleDateString("ja-JP")}
              </time>
              {post.updatedAt && (
                  <time dateTime={post.updatedAt}>
                    更新: {new Date(post.updatedAt).toLocaleDateString("ja-JP")}
                  </time>
              )}
            </div>
            
            <ShareButtons title={post.title} id={post.id} categoryId={post.category?.id} />
          </div>

          <AffiliateDisclosure />
          
          {post.eyecatch && (
            <div className="mb-10 relative w-full h-64 md:h-96">
              <Image 
                src={post.eyecatch.url} 
                alt={post.title} 
                fill
                className="object-cover rounded-lg shadow-sm"
                priority 
              />
            </div>
          )}

          {toc.length > 0 && (
            <div className="mb-10">
              <TableOfContents toc={toc} />
            </div>
          )}

          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: modifiedContent }}
          />

          <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-8">
             <p className="text-center font-bold mb-4 text-gray-800 dark:text-gray-200">
               この記事をシェアする
             </p>
            <div className="flex justify-center">
              <ShareButtons title={post.title} id={post.id} categoryId={post.category?.id} />
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-xl font-bold mb-6 border-b pb-2 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700">
              料金・メリットを比較
            </h3>
            <PriceComparison />
          </div>

          <RelatedPosts posts={relatedPosts} />
        </article>

        {/* サイドバー */}
        <Sidebar />
      </div>
    </main>
  );
}