import { getCategories } from "@/libs/microcms";
import Image from "next/image";
import Link from "next/link";

export const Sidebar = async () => {
  const { contents: categories } = await getCategories().catch(() => ({ contents: [] }));

  return (
    <aside className="w-full lg:w-80 flex flex-col gap-8">
      {/* プロフィールカード */}
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4">
            <Image
              src="/favicon.ico" // ※お好きな画像があれば差し替えてください
              alt="プロフィール画像"
              fill
              className="rounded-full object-cover border-2 border-gray-100 dark:border-slate-600"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            ふらふら旅行記
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center leading-relaxed">
            賢く移動して、気ままに旅する。<br />
            北陸（福井・石川）から東京への移動手段や、失敗しない旅行の手順をロジカルに解説します。
          </p>
        </div>
      </div>

      {/* カテゴリ一覧 */}
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 border-b pb-2 border-gray-200 dark:border-slate-700">
          カテゴリ
        </h3>
        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/blog/${category.id}`}
                className="flex items-center justify-between text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span>{category.name}</span>
                <span className="text-xs bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-full text-gray-500 dark:text-gray-400">
                  ▶
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};