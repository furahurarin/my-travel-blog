import { getDetail, getList } from "@/libs/microcms";
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

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { id } = await params;
  const { draftKey } = await searchParams;
  const post = await getDetail(id, { draftKey }).catch(() => null);
  if (!post) return {};
  
  // ディスクリプションがあればそれを使い、なければ本文から抜粋（HTMLタグ除去）
  const descText = post.description || post.content.replace(/<[^>]+>/g, "").slice(0, 120) + "...";

  return {
    title: post.title,
    description: descText,
    openGraph: { title: post.title, description: descText, images: post.eyecatch ? [post.eyecatch.url] : [] },
  };
}

export async function generateStaticParams() {
  const { contents } = await getList();
  return contents.filter((post) => post.category).map((post) => ({ categoryId: post.category!.id, id: post.id }));
}

export default async function BlogPost({ params, searchParams }: Props) {
  const { categoryId, id } = await params;
  const { draftKey } = await searchParams;
  const { isEnabled } = await draftMode();
  const post = await getDetail(id, { draftKey: isEnabled && draftKey ? draftKey : undefined }).catch(() => null);

  if (!post || (!draftKey && post.category?.id !== categoryId)) notFound();

  // 関連記事：手動設定があればそれを優先、なければカテゴリから自動取得
  let relatedPosts = post.related_posts || [];
  if (relatedPosts.length === 0) {
    const { contents } = await getList({
      limit: 3,
      filters: `category[equals]${categoryId}[and]id[not_equals]${post.id}`,
    });
    relatedPosts = contents;
  }

  // 目次生成用のHTMLテキストを作成
  // body（ブロック）がある場合は文章ブロックを結合、なければ旧contentを使用
  const contentForToc = post.content || (post.body ? post.body.map(b => b.fieldId === 'richText' ? b.richText : '').join('') : '');
  
  const $ = cheerio.load(contentForToc);
  const headings = $("h2, h3").toArray();
  const toc = headings.map((data) => {
    const text = $(data).text();
    const id = `heading-${headings.indexOf(data)}`;
    $(data).attr("id", id);
    return { text, id, tag: data.tagName };
  });

  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 bg-gray-50 text-gray-900">
      <Breadcrumb items={[{ name: "TOP", path: "/" }, { name: post.category?.name ?? "カテゴリ", path: `/blog/${post.category?.id ?? "misc"}` }, { name: post.title }]} />
      <div className="flex flex-col lg:flex-row gap-10 mt-6">
        <article className="flex-1 min-w-0 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight text-gray-900">{post.title}</h1>
          <div className="flex justify-between items-center mb-6 text-sm text-gray-500">
            {/* ▼ 修正箇所: publishedAt が無い場合は createdAt を使用してエラー回避 ▼ */}
            <time>公開: {new Date(post.publishedAt || post.createdAt).toLocaleDateString("ja-JP")}</time>
            <ShareButtons title={post.title} id={post.id} categoryId={post.category?.id} />
          </div>
          
          {/* 広告表示設定がOFFでなければ開示テキストを表示 */}
          {post.show_ads !== false && <AffiliateDisclosure />}

          {post.eyecatch && (
            <div className="mb-10 relative w-full h-64 md:h-96 overflow-hidden rounded-xl shadow-card">
              <Image src={post.eyecatch.url} alt={post.title} fill className="object-cover" priority />
            </div>
          )}
          
          {toc.length > 0 && <div className="lg:hidden mb-10"><TableOfContents toc={toc} /></div>}

          {/* ▼ 本文表示エリア ▼ */}
          <div className="mt-8">
            {post.body && post.body.length > 0 ? (
              // 新しいブロック形式がある場合
              post.body.map((block, index) => {
                if (block.fieldId === "richText") {
                  return (
                    <div
                      key={index}
                      className="prose prose-lg max-w-none text-gray-800 mb-8"
                      dangerouslySetInnerHTML={{ __html: block.richText }}
                    />
                  );
                } else if (block.fieldId === "html") {
                  return (
                    <div
                      key={index}
                      className="w-full my-8"
                      dangerouslySetInnerHTML={{ __html: block.html }}
                    />
                  );
                }
                return null;
              })
            ) : (
              // 旧形式（フォールバック）
              <div className="prose prose-lg max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: post.content }} />
            )}
          </div>
          {/* ▲ ここまで ▲ */}

          <div className="mt-16 border-t border-gray-100 pt-8 flex flex-col items-center">
             <p className="font-bold mb-4 text-gray-800">この記事をシェアする</p>
             <ShareButtons title={post.title} id={post.id} categoryId={post.category?.id} />
          </div>
          
          <RelatedPosts posts={relatedPosts} />
        </article>
        <aside className="w-full lg:w-80 flex flex-col gap-8">
          <Sidebar />
          {toc.length > 0 && <div className="hidden lg:block sticky top-24"><TableOfContents toc={toc} /></div>}
        </aside>
      </div>
    </main>
  );
}