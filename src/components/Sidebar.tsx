import { getList, getAllCategories } from "@/libs/microcms";
import Link from "next/link";
import Image from "next/image";
import { SearchField } from "./SearchField";

type SidebarProps = {
  showProfile?: boolean; // プロフィールを表示するかどうかのフラグ (省略時はtrue)
};

export const Sidebar = async ({ showProfile = true }: SidebarProps) => {
  const { contents: newPosts } = await getList({ limit: 5 });
  const categories = await getAllCategories();

  // ▼▼▼ 修正: カテゴリの表示順序を定義して並び替え ▼▼▼
  const categoryOrder = ["mobility", "stay", "money", "column"];
  
  const sortedCategories = [...categories].sort((a, b) => {
    const indexA = categoryOrder.indexOf(a.id);
    const indexB = categoryOrder.indexOf(b.id);
    
    // 両方とも定義リストにある場合、その順序に従う
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    
    // 定義リストにあるものを優先して上に表示
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    
    // どちらもリストにない場合は元の順序を維持
    return 0;
  });

  return (
    <aside className="w-full lg:w-80 flex flex-col gap-8">
      {/* 1. プロフィールブロック (showProfileがtrueの時だけ表示) */}
      {showProfile && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-16 h-16 overflow-hidden rounded-full border-2 border-gray-100 bg-gray-50">
  <Image
    src="/profile.png"
    alt="プロフィール画像"
    fill
    className="object-cover"
    sizes="64px"
  />
</div>
            <div>
              <p className="font-bold text-gray-900">ふらふら旅行記</p>
              <p className="text-xs text-gray-500">Travel Analyst / 旅の検証</p>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 leading-relaxed mb-4 text-justify">
            <p className="mb-3">
              「100円の安さ」よりも、「1時間の快適さ」を大切にしたい。
            </p>
            <p>
              北陸拠点。移動と宿を中心に、旅の満足度を上げる方法を数字と条件で検証しています。
              感想だけでなく、時間・費用・疲労などの判断材料を残すのが方針です。
            </p>
          </div>

          <Link href="/about" className="text-xs font-bold text-blue-600 hover:underline">
            詳しいプロフィール →
          </Link>
        </div>
      )}

      {/* 2. サイト内検索 (常に表示) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">サイト内検索</h3>
        <SearchField />
      </div>

      {/* 3. 最新の記事 (常に表示) */}
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

      {/* 4. カテゴリ (定義順に表示) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">カテゴリ</h3>
        <ul className="space-y-2">
          {sortedCategories.map((cat) => (
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