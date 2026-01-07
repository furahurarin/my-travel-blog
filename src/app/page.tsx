import { getList } from "@/libs/microcms";
import Link from "next/link";

export default async function Home() {
  const { contents } = await getList();

  if (!contents || contents.length === 0) {
    return <h1>記事がありません</h1>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        旅行ライフハックブログ
      </h1>
      
      <div className="grid gap-6">
        {contents.map((post) => {
          if (!post.category) return null;

          return (
            <Link 
              href={`/blog/${post.category.id}/${post.id}`} 
              key={post.id} 
              className="block group"
            >
              {/* ▼ 修正: bg-white -> bg-white dark:bg-gray-800 dark:border-gray-700 */}
              <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800 dark:border-gray-700">
                
                {/* カテゴリラベル（ダークモード時は少し色を抑える） */}
                <span className="inline-block px-2 py-1 mb-2 text-xs font-semibold text-blue-600 bg-blue-100 rounded dark:bg-blue-900/50 dark:text-blue-200">
                  {post.category.name}
                </span>
                
                {/* タイトル（ホバー時の色も調整） */}
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">
                  {post.title}
                </h2>
                
                {/* 日付 */}
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}