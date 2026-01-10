import { getList, getAllCategories } from "@/libs/microcms";
import Link from "next/link";
import Image from "next/image";
import { SearchField } from "./SearchField";
import { UserProfile } from "./UserProfile"; // 追加

type SidebarProps = {
  showProfile?: boolean; // プロフィールを表示するかどうかのフラグ (省略時はtrue)
};

export const Sidebar = async ({ showProfile = true }: SidebarProps) => {
  const { contents: newPosts } = await getList({ limit: 5 });
  const categories = await getAllCategories();

  // カテゴリの表示順序を定義
  const categoryOrder = ["mobility", "stay", "money", "column"];
  
  const sortedCategories = [...categories].sort((a, b) => {
    const indexA = categoryOrder.indexOf(a.id);
    const indexB = categoryOrder.indexOf(b.id);
    
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return 0;
  });

  return (
    <aside className="w-full lg:w-80 flex flex-col gap-8">
      {/* 1. プロフィールブロック (showProfileがtrueの時だけ表示) */}
      {showProfile && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          {/* ▼▼▼ 修正: コンポーネント化して統一 ▼▼▼ */}
          <UserProfile isDetail={false} />
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