import { getList } from "@/libs/microcms";
import Link from "next/link";
import Image from "next/image";
import { Sidebar } from "@/components/Sidebar";
import type { Metadata } from "next";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  const title = q ? `「${q}」の検索結果` : "検索結果";

  return {
    title: title,
    description: "サイト内検索の結果ページです。",
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;

  // 検索クエリがある場合のみMicroCMSに問い合わせる
  const { contents: posts } = q 
    ? await getList({ q: q }) // MicroCMSの全文検索機能を使用
    : { contents: [] };

  return (
    <main className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* メインエリア */}
        <div className="flex-1">
          <div className="mb-8 border-b pb-4 border-gray-200 dark:border-slate-700">
            <span className="text-sm text-gray-500 dark:text-gray-400">Search Result</span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
              {q ? `「${q}」の検索結果：${posts.length}件` : "キーワードを入力してください"}
            </h1>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
              <p className="text-lg mb-2">記事が見つかりませんでした。</p>
              <p className="text-sm">別のキーワードで検索してみてください。</p>
            </div>
          ) : (
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
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-bold mb-2">
                      {post.category?.name}
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <time className="text-sm text-gray-500 dark:text-gray-400 mt-auto">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </time>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* サイドバー */}
        <Sidebar />
      </div>
    </main>
  );
}