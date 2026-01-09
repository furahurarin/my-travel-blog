// ▼ 修正1: getAllBlogs をインポートに追加
import { getDetail, getList, getAllBlogs, type Blog, type BodyBlock } from "@/libs/microcms";
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
import parse from "html-react-parser";

type Props = {
  params: Promise<{ categoryId: string; id: string }>;
  searchParams: Promise<{ draftKey?: string }>;
};

// ... (generateMetadata は変更なし) ...
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { id } = await params;
  const { draftKey } = await searchParams;
  const post = await getDetail(id, { draftKey }).catch(() => null);
  if (!post) return {};
  
  const descText = post.description || post.content.replace(/<[^>]+>/g, "").slice(0, 120) + "...";

  return {
    title: post.title,
    description: descText,
    openGraph: { title: post.title, description: descText, images: post.eyecatch ? [post.eyecatch.url] : [] },
  };
}

export async function generateStaticParams() {
  // ▼ 修正2: getList({ limit: 1000 }) はエラーになるため、全件取得用関数 getAllBlogs() を使用
  // getAllBlogs は { contents: [] } ではなく、配列そのもの [] を返します
  const contents = await getAllBlogs();
  
  return contents.filter((post) => post.category).map((post) => ({ 
    categoryId: post.category!.id, 
    id: post.id 
  }));
}

// ... (以下、カスタムフィールド用コンポーネントや BlogPost 関数などは変更なし) ...

// --- カスタムフィールド用レンダリングコンポーネント ---

const RenderLinkButton = ({ url, label, color }: { url: string; label: string; color: string[] }) => {
  const colorKey = color?.[0] || "blue";
  const btnStyles: Record<string, string> = {
    blue: "bg-blue-700 hover:bg-blue-800 text-white",
    red: "bg-red-700 hover:bg-red-800 text-white",
    orange: "bg-orange-600 hover:bg-orange-700 text-white",
  };
  const styleClass = btnStyles[colorKey] || btnStyles.blue;

  return (
    <div className="my-10 text-center">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center w-full max-w-md ${styleClass} font-bold py-4 px-6 rounded-lg shadow-sm transition-colors duration-200 no-underline`}
      >
        <span>{label}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </a>
    </div>
  );
};

const RenderPointBox = ({ content, type }: { content: string; type: string[] }) => {
  const typeKey = type?.[0] || "info";
  const styles: Record<string, { wrapper: string; title: string }> = {
    info: { wrapper: "bg-slate-50 border-slate-500", title: "MEMO" },
    alert: { wrapper: "bg-red-50 border-red-600", title: "注意" },
    check: { wrapper: "bg-emerald-50 border-emerald-600", title: "POINT" },
  };
  const style = styles[typeKey] || styles.info;

  return (
    <div className={`my-8 p-5 border-l-4 rounded-r-md ${style.wrapper}`}>
      <div className="font-bold text-sm text-gray-700 mb-2 uppercase tracking-wider">{style.title}</div>
      <div className="prose prose-sm max-w-none text-gray-800">{parse(content)}</div>
    </div>
  );
};

// --- メインコンポーネント ---

export default async function BlogPost({ params, searchParams }: Props) {
  const { categoryId, id } = await params;
  const { draftKey } = await searchParams;
  const { isEnabled } = await draftMode();
  
  // 記事詳細の取得
  const post = await getDetail(id, { 
    draftKey: isEnabled && draftKey ? draftKey : undefined 
  }).catch(() => null);

  // 404判定
  if (!post || (!draftKey && post.category?.id !== categoryId)) notFound();

  // 関連記事の取得
  let relatedPosts = post.related_posts || [];
  if (relatedPosts.length === 0) {
    const { contents } = await getList({
      limit: 3,
      filters: `category[equals]${categoryId}[and]id[not_equals]${post.id}`,
    });
    relatedPosts = contents;
  }

  // 本文ソースの統合
  const rawContent = post.body && post.body.length > 0 
    ? post.body.map(block => block.fieldId === 'richText' ? block.richText : '').join('')
    : post.content || '';

  // 目次の生成
  const $ = cheerio.load(rawContent);
  const headings = $("h2, h3").toArray();
  const toc = headings.map((data, i) => {
    const text = $(data).text();
    const headingId = `heading-${i}`;
    $(data).attr("id", headingId);
    return { text, id: headingId, tag: data.tagName };
  });

  // 日付の確定
  const publishDate = post.publishedAt || post.createdAt;

  // ▼ 追加: SEO用 JSON-LD (構造化データ)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.eyecatch ? [post.eyecatch.url] : [],
    datePublished: publishDate,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: 'ふらふら旅行記',
    },
    description: post.description || post.content.replace(/<[^>]+>/g, "").slice(0, 120) + "...",
  };

  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 bg-gray-50 text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb 
        items={[
          { name: "TOP", path: "/" }, 
          { name: post.category?.name ?? "カテゴリ", path: `/blog/${post.category?.id ?? "misc"}` }, 
          { name: post.title }
        ]} 
      />
      
      <div className="flex flex-col lg:flex-row gap-10 mt-6">
        <article className="flex-1 min-w-0 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight text-gray-900">
            {post.title}
          </h1>
          
          <div className="flex justify-between items-center mb-6 text-sm text-gray-500">
            <time>公開: {new Date(publishDate).toLocaleDateString("ja-JP")}</time>
            <ShareButtons title={post.title} id={post.id} categoryId={post.category?.id} />
          </div>
          
          {post.show_ads !== false && <AffiliateDisclosure />}

          {post.eyecatch && (
            <div className="mb-10 relative w-full h-64 md:h-96 overflow-hidden rounded-xl shadow-card">
              <Image 
                src={post.eyecatch.url} 
                alt={post.title} 
                fill 
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
              />
            </div>
          )}
          
          {toc.length > 0 && (
            <div className="lg:hidden mb-10">
              <TableOfContents toc={toc} />
            </div>
          )}

          <div className="mt-8">
            {post.body && post.body.length > 0 ? (
              post.body.map((block, index) => {
                switch (block.fieldId) {
                  case "richText":
                    return (
                      <div key={index} className="prose prose-lg max-w-none text-gray-800 mb-8">
                        {parse(block.richText)}
                      </div>
                    );
                  case "html":
                    return (
                      <div 
                        key={index} 
                        className="w-full my-8 flex justify-center" 
                        dangerouslySetInnerHTML={{ __html: block.html }} 
                      />
                    );
                  case "linkButton":
                    return (
                      <RenderLinkButton 
                        key={index} 
                        url={block.url} 
                        label={block.label} 
                        color={block.color} 
                      />
                    );
                  case "pointBox":
                    return (
                      <RenderPointBox 
                        key={index} 
                        content={block.content} 
                        type={block.type} 
                      />
                    );
                  default:
                    return null;
                }
              })
            ) : (
              <div className="prose prose-lg max-w-none text-gray-800">
                {parse(post.content || "")}
              </div>
            )}
          </div>

          <div className="mt-16 border-t border-gray-100 pt-8 flex flex-col items-center">
             <p className="font-bold mb-4 text-gray-800">この記事をシェアする</p>
             <ShareButtons title={post.title} id={post.id} categoryId={post.category?.id} />
          </div>
          
          <RelatedPosts posts={relatedPosts} />
        </article>

        <aside className="w-full lg:w-80 flex flex-col gap-8">
          <Sidebar />
          {toc.length > 0 && (
            <div className="hidden lg:block sticky top-24">
              <TableOfContents toc={toc} />
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}