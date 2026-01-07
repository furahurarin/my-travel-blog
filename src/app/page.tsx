import { getList } from "@/libs/microcms";
import Link from "next/link";
import Image from "next/image";
import { Sidebar } from "@/components/Sidebar";
import { Pagination } from "@/components/Pagination"; // ▼ 追加

// 1ページあたりの表示件数
const LIMIT = 6;

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Home({ searchParams }: Props) {
  // 現在のページ番号を取得 (なければ1ページ目)
  const { page } = await searchParams;
  const current = parseInt(page ?? "1", 10);

  // MicroCMSから記事を取得 (offsetを使ってずらす)
  const { contents, totalCount } = await getList({
    limit: LIMIT,
    offset: (current - 1) * LIMIT,
  });

  return (
    <main className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* ▼▼▼ メインコンテンツエリア ▼▼▼ */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            最新記事
          </h2>

          {/* 記事一覧 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contents.map((post) => (
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
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-bold mb-2">
                    {post.category?.name}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-grow">
                    {post.content.replace(/<[^>]+>/g, "").slice(0, 80)}...
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
            basePath="/" 
            limit={LIMIT} 
          />
        </div>

        {/* ▼▼▼ サイドバー ▼▼▼ */}
        <Sidebar />
      </div>
    </main>
  );
}