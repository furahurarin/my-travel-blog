"use client";

import { useRouter } from "next/navigation"; // next/routerではなくnext/navigationを使うのがポイント
import { useState } from "react";

export const SearchField = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // エンターキーで画面リロードされるのを防ぐ
    
    // 空白のみの場合は検索しない
    if (!keyword.trim()) return;

    // 検索ページへ移動（URLパラメータとしてキーワードを渡す）
    router.push(`/search?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 border-b pb-2 border-gray-200 dark:border-slate-700">
        サイト内検索
      </h3>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="キーワードを入力..."
          className="w-full pl-4 pr-10 py-2 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-600 transition-colors"
          aria-label="検索"
        >
          {/* 虫眼鏡アイコン */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>
    </div>
  );
};