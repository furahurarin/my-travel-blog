import { getList } from "@/libs/microcms";
import Link from "next/link";
import Image from "next/image";
import { Sidebar } from "@/components/Sidebar"; // ▼ 追加

export default async function Home() {
  const { contents } = await getList();

  // 最初の1記事目をピックアップ（大きく表示するため）
  const [firstPost, ...restPosts] = contents;

  return (
    <main className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* ▼▼▼ メインコンテンツエリア (左側) ▼▼▼ */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            最新記事
          </h2>

          {/* 1記事目を大きく表示 */}
          {firstPost && (
            <Link href={`/blog/${firstPost.category?.id}/${firstPost.id}`} className="group block mb-12">
              <div className="relative w-full h-64 md:h-96 mb-4 overflow-hidden rounded-xl">
                <Image
                  src={firstPost.eyecatch?.url ?? "/no-image.png"}
                  alt={firstPost.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                {firstPost.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                {firstPost.content.replace(/<[^>]+>/g, "").slice(0, 100)}...
              </p>
            </Link>
          )}

          {/* 2記事目以降をリスト表示 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {restPosts.map((post) => (
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
                  <time className="text-sm text-gray-500 dark:text-gray-400 mt-auto">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ▼▼▼ サイドバー (右側) ▼▼▼ */}
        <Sidebar />
      </div>
    </main>
  );
}