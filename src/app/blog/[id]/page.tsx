import { getDetail, getList } from "@/libs/microcms";
import { PriceComparison } from "@/components/PriceComparison";
import { Breadcrumb } from "@/components/Breadcrumb";

export async function generateStaticParams() {
  const { contents } = await getList();
  return contents.map((post) => ({
    id: post.id,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getDetail(id);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <Breadcrumb items={[{ name: "ブログ記事", path: "/" }, { name: post.title }]} />

      {/* タイトル */}
      <h1 className="text-3xl font-bold mb-4 mt-6 text-gray-900 dark:text-white">
        {post.title}
      </h1>
      
      {/* 公開日 */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-10 text-right">
        {new Date(post.publishedAt).toLocaleDateString()}
      </p>
      
      {/* 記事本文 */}
      {/* ★修正点: dark:prose-invert を追加！これで文字が自動で白くなります */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* 比較表 */}
      <div className="mt-16">
        <h3 className="text-xl font-bold mb-6 border-b pb-2 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700">
          料金・メリットを比較
        </h3>
        <PriceComparison />
      </div>

    </main>
  );
}