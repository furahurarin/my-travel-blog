import Link from "next/link";
import { SearchField } from "@/components/SearchField";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 text-center">
      <div className="bg-gray-100 dark:bg-slate-800 p-4 rounded-full mb-6">
        <span className="text-4xl">🤔</span>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
        ページが見つかりませんでした
      </h1>
      
      <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
        お探しの記事は、URLが変更されたか、削除された可能性があります。<br />
        キーワード検索やトップページから記事を探してみてください。
      </p>

      {/* 検索窓の設置 */}
      <div className="w-full max-w-sm mb-10">
        <SearchField />
      </div>

      <Link 
        href="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-sm"
      >
        トップページに戻る
      </Link>
    </div>
  );
}