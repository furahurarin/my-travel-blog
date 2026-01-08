import { getCategories, getList } from "@/libs/microcms";
import Link from "next/link";
import Image from "next/image";

export const Sidebar = async () => {
  // カテゴリ一覧を取得（エラー時は空配列）
  const categories = await getCategories()
    .then((res) => res.contents)
    .catch(() => []);
  
  // 最新記事を3件取得（エラー時は空配列）
  const latestPosts = await getList({ limit: 3 })
    .then((res) => res.contents)
    .catch(() => []);

  return (
    <div className="flex flex-col gap-8">
      {/* プロフィール */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm">
             {/* プロフィール画像があればここに設定 */}
             <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold">
               Me
             </div>
          </div>
          <div>
            <p className="font-bold text-gray-800">ふらふらりん</p>
            <p className="text-xs text-gray-500">医学生トラベラー</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          福井在住の医学生。SFC修行やマイル旅、資産運用について発信中。
        </p>
      </div>

      {/* カテゴリ一覧 */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
          <span className="w-1 h-4 bg-brand-500 rounded-full"></span>
          カテゴリ
        </h3>
        <ul className="space-y-1">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category.id}>
                {/* ★修正箇所: URLを /blog/category/... から /blog/... に変更 */}
                <Link 
                  href={`/blog/${category.id}`}
                  className="flex items-center justify-between text-sm text-gray-600 hover:text-brand-600 hover:bg-brand-50 px-3 py-2 rounded-lg transition-colors group"
                >
                  <span>{category.name}</span>
                  <span className="text-gray-300 group-hover:text-brand-300">→</span>
                </Link>
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-400 px-2">カテゴリがありません</li>
          )}
        </ul>
      </div>

      {/* 最新の記事 */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
          <span className="w-1 h-4 bg-brand-500 rounded-full"></span>
          最新の記事
        </h3>
        <ul className="space-y-4">
          {latestPosts.map((post) => (
            <li key={post.id} className="group">
              <Link href={`/blog/${post.category?.id}/${post.id}`} className="flex gap-3">
                <div className="relative w-20 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  {post.eyecatch && (
                    <Image
                      src={post.eyecatch.url}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 group-hover:text-brand-600 line-clamp-2 leading-snug transition-colors">
                    {post.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {/* 公開日がない場合のエラー回避 */}
                    {new Date(post.publishedAt || post.createdAt).toLocaleDateString("ja-JP")}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};