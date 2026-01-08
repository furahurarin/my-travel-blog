import { getCategories } from "@/libs/microcms";
import Image from "next/image";
import Link from "next/link";
import { SearchField } from "./SearchField";

export const Sidebar = async () => {
  const { contents: categories } = await getCategories().catch(() => ({ contents: [] }));

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-20 h-20 mb-4"><Image src="/favicon.ico" alt="ロゴ" fill className="rounded-full object-cover border-2 border-gray-50" /></div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">ふらふら旅行記</h2>
          <p className="text-xs text-gray-600 leading-relaxed">北陸（福井・石川）から東京への移動手段をロジカルに解説。賢く快適な旅の手順をお届けします。</p>
        </div>
      </div>
      <SearchField />
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card">
        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-4 bg-brand-600 rounded-full"></span>カテゴリー
        </h3>
        <nav><ul className="space-y-1">
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={`/blog/${category.id}`} className="flex items-center justify-between text-sm text-gray-600 hover:text-brand-600 hover:bg-brand-50 px-3 py-2.5 rounded-xl transition-all group">
                <span>{category.name}</span><span className="text-gray-300 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </li>
          ))}
        </ul></nav>
      </div>
    </div>
  );
};