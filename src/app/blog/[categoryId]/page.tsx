import { getList } from "@/libs/microcms";
import Link from "next/link";
import Image from "next/image";
import { Sidebar } from "@/components/Sidebar";
import { Pagination } from "@/components/Pagination"; // ▼ 追加
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// 1ページあたりの表示件数
const LIMIT = 6;

type Props = {
  params: Promise<{ categoryId: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoryId } = await params;
  
  const { contents } = await getList({
    limit: 1,
    filters: `category[equals]${categoryId}`,
  });

  const categoryName = contents[0]?.category?.name;

  if (!categoryName) {
    return { title: "カテゴリが見つかりません" };
  }

  return {
    title: `${categoryName}の記事一覧`,
    description: `${categoryName}に関する記事の一覧ページです。`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { categoryId } = await params;
  const { page } = await searchParams;
  const current = parseInt(page ?? "1", 10);

  // そのカテゴリの記事を取得
  const { contents: posts, totalCount } = await getList({
    limit: LIMIT,
    offset: (current - 1) * LIMIT,
    filters: `category[equals]${categoryId}`,
  });

  if (posts.length === 0 && current === 1) {
    notFound();
  }
  
  // カテゴリ名は1件目の記事などから取るか、別途取得するが、ここでは簡易的に処理
  // (postsが空の場合のケアが必要だが、MicroCMSはカテゴリ情報だけを取得するAPI呼び出しが別途必要なため、
  //  ここでは既存の記事から名前を取るアプローチを継続。空の場合はヘッダーだけ表示)
  const categoryName = posts[0]?.category?.name ?? "Category";

  return (
    <main className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* メインエリア */}
        <div className="flex-1">
          <div className="mb-8 border-b pb-4 border-gray-200 dark:border-slate-700">
            <span className="text-sm text-gray-500 dark:text-gray-400">Category</span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
              {categoryName}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.category?.id}/${post.id}`}
                className="group flex flex-col h-full bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={post.eyecatch?.url ?? "/no-image.png"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-grow">
                    {post.content.replace(/<[^>]+>/g, "").slice(0, 50)}...
                  </p>
                  <time className="text-sm text-gray-500 dark:text-gray-400 mt-auto">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </time>
                </div>
              </Link>
            ))}
          </div>

          {/* ▼ 追加: ページネーション */}
          <Pagination 
            totalCount={totalCount} 
            current={current} 
            basePath={`/blog/${categoryId}`} 
            limit={LIMIT} 
          />
        </div>

        {/* サイドバー */}
        <Sidebar />
      </div>
    </main>
  );
}