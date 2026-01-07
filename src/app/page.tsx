import { getList } from "@/libs/microcms";
import Link from "next/link";
import Image from "next/image";
import { Sidebar } from "@/components/Sidebar";
import { Pagination } from "@/components/Pagination";

// 1ページあたりの表示件数
const LIMIT = 6;

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;
  const current = parseInt(page ?? "1", 10);

  const { contents, totalCount } = await getList({
    limit: LIMIT,
    offset: (current - 1) * LIMIT,
  });

  return (
    <main className="max-w-7xl mx-auto p-6">
      
      {/* ▼▼▼ SEO用ヘッダー (sr-onlyクラスで視覚的に隠す) ▼▼▼ */}
      {/* Googleには「これがサイトの主題です」と伝わるが、画面には一切表示されない */}
      <h1 className="sr-only">ふらふら旅行記 - 北陸から東京への賢い移動と旅のノウハウ</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* メインエリア */}
        <div className="flex-1">
          
          {/* いきなり記事一覧の見出しからスタート */}
          <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100 dark:border-gray-800">
             <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
               最新記事
             </h2>
             <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
               New Posts
             </span>
          </div>

          {/* 記事一覧 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contents.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.category?.id}/${post.id}`}
                className="group flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={post.eyecatch?.url ?? "/no-image.png"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 bg-brand-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md">
                    {post.category?.name}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-brand-600 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-grow">
                    {post.content.replace(/<[^>]+>/g, "").slice(0, 80)}...
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <time>
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </time>
                    <span className="group-hover:translate-x-1 transition-transform">
                      続きを読む →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Pagination 
            totalCount={totalCount} 
            current={current} 
            basePath="/" 
            limit={LIMIT} 
          />
        </div>

        <Sidebar />
      </div>
    </main>
  );
}