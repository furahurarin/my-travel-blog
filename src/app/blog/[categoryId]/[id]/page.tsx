import { getDetail, getList } from "@/libs/microcms";
import { PriceComparison } from "@/components/PriceComparison";
import { Breadcrumb } from "@/components/Breadcrumb";
import { RelatedPosts } from "@/components/RelatedPosts";
import { notFound } from "next/navigation";
import { Metadata } from "next"; // ▼ 追加

type Props = {
  params: Promise<{ categoryId: string; id: string }>;
};

// ▼ 追加: 記事ごとのメタデータ（タイトルなど）を生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getDetail(id).catch(() => null);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: `${post.title}についての解説記事です。`, // ※本来はMicroCMSにdescription項目を作って連携するのがベストです
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

// ページコンポーネント
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
      
      {/* アイキャッチ画像があれば表示 */}
      {post.eyecatch && (
        <div className="mb-10">
          <img 
            src={post.eyecatch.url} 
            alt={post.title} 
            className="w-full h-auto rounded-lg shadow-sm"
            width={post.eyecatch.width}
            height={post.eyecatch.height}
          />
        </div>
      )}
      
      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
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