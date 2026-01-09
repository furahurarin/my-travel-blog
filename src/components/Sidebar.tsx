import { getList } from "@/libs/microcms";
import Link from "next/link";
import Image from "next/image";
import { SearchField } from "./SearchField";

export const Sidebar = async () => {
  // 最新記事の取得
  const { contents: newPosts } = await getList({ limit: 5 });
  
  // カテゴリの取得 (手動定義またはAPI取得)
  const categories = [
    { id: "hokuriku-tokyo", name: "北陸⇔東京" },
    { id: "hotel-tips", name: "ホテル・宿" },
    { id: "cards-insurance", name: "クレカ・保険" },
    { id: "misc", name: "その他" },
  ];

  return (
    <aside className="w-full lg:w-80 flex flex-col gap-8">
      {/* プロフィール */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-16 h-16 overflow-hidden rounded-full border-2 border-gray-100">
             {/* プロフィール画像があれば変更 */}
             <div className="w-full h-full bg-gray-200 flex items-center justify-center text-2xl">✈️</div>
          </div>
          <div>
            <p className="font-bold text-gray-900">ふらふら旅行記</p>
            <p className="text-xs text-gray-500">運営者</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          賢く旅するノウハウを発信中。移動手段の比較やお得なホテル予約術が得意です。
        </p>
        <Link href="/about" className="text-xs font-bold text-blue-600 hover:underline">
          プロフィール詳細 →
        </Link>
      </div>

      {/* 検索ボックス */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">サイト内検索</h3>
        <SearchField />
      </div>

      {/* 最新記事 */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">最新の記事</h3>
        <div className="flex flex-col gap-4">
          {newPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.category?.id}/${post.id}`} className="flex gap-3 group">
              <div className="relative w-20 h-16 shrink-0 overflow-hidden rounded-md">
                <Image
                  src={post.eyecatch?.url ?? "/no-image.png"}
                  alt={post.title}
                  fill
                  // ▼ 修正: サイドバー画像は小さいので80px幅のみで十分
                  sizes="80px"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 line-clamp-2 leading-snug">
                  {post.title}
                </p>
                <time className="text-xs text-gray-400 mt-1 block">
                  {new Date(post.publishedAt || post.createdAt).toLocaleDateString("ja-JP")}
                </time>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* カテゴリ */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">カテゴリ</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link 
                href={`/blog/${cat.id}`}
                className="flex justify-between items-center text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <span>{cat.name}</span>
                <span className="text-gray-300 text-xs">▶</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};