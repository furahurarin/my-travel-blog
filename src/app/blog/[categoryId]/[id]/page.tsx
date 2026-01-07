import { getDetail, getList } from "@/libs/microcms";
import { PriceComparison } from "@/components/PriceComparison";
import { Breadcrumb } from "@/components/Breadcrumb";
import { RelatedPosts } from "@/components/RelatedPosts";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import * as cheerio from "cheerio";

type Props = {
  params: Promise<{ categoryId: string; id: string }>;
};

// メタデータの生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getDetail(id).catch(() => null);

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

// 目次データの型定義
type TocItem = {
  text: string;
  id: string;
  tag: string;
};

export default async function BlogPost({ params }: Props) {
  const { categoryId, id } = await params;
  const post = await getDetail(id);

  if (!post.category || post.category.id !== categoryId) {
    notFound();
  }

  // 関連記事を取得
  const { contents: relatedPosts } = await getList({
    limit: 3,
    filters: `category[equals]${categoryId}[and]id[not_equals]${post.id}`,
  });

  // ▼ 目次の生成処理
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
    <main className="max-w-3xl mx-auto p-6">
      <Breadcrumb 
        items={[
          { name: "TOP", path: "/" }, 
          { name: post.category.name, path: `/blog/${post.category.id}` }, 
          { name: post.title }
        ]} 
      />

      <h1 className="text-3xl font-bold mb-4 mt-6 text-gray-900 dark:text-white">
        {post.title}
      </h1>
      
      <div className="flex justify-end gap-4 text-sm text-gray-500 dark:text-gray-400 mb-10">
        <time dateTime={post.publishedAt}>
          公開: {new Date(post.publishedAt).toLocaleDateString()}
        </time>
        {post.updatedAt && (
            <time dateTime={post.updatedAt}>
              更新: {new Date(post.updatedAt).toLocaleDateString()}
            </time>
        )}
      </div>
      
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

      {/* ▼ 目次の表示エリア */}
      {toc.length > 0 && (
        <div className="toc-box">
          <p className="toc-title">目次</p>
          <ul className="toc-list">
            {toc.map((item) => (
              <li key={item.id} className={`toc-${item.tag}`}>
                {/* シンプルにHTMLタグのみ。スタイルはCSS側で制御 */}
                <a href={`#${item.id}`}>
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 記事本文 */}
      {/* prose-lg と dark:prose-invert で基本の文字色を制御 */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: modifiedContent }}
      />

      <div className="mt-16">
        <h3 className="text-xl font-bold mb-6 border-b pb-2 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700">
          料金・メリットを比較
        </h3>
        <PriceComparison />
      </div>

      <RelatedPosts posts={relatedPosts} />
    </main>
  );
}