export default function Loading() {
  return (
    <main className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* メインエリアのスケルトン */}
        <div className="flex-1">
          {/* タイトル部分 */}
          <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-48 mb-6 animate-pulse" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 記事カードのスケルトン x 6 */}
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="flex flex-col h-full bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden"
              >
                {/* サムネイル */}
                <div className="w-full h-48 bg-gray-200 dark:bg-slate-700 animate-pulse" />
                
                <div className="p-4 flex flex-col flex-grow gap-4">
                  {/* カテゴリラベル */}
                  <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-20 animate-pulse" />
                  {/* タイトル */}
                  <div className="space-y-2">
                    <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-full animate-pulse" />
                    <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-2/3 animate-pulse" />
                  </div>
                  {/* 本文抜粋 */}
                  <div className="space-y-2 mt-2">
                    <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-full animate-pulse" />
                    <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-full animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* サイドバーのスケルトン（PCのみ表示） */}
        <aside className="hidden lg:block w-80 flex flex-col gap-8">
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6 h-64 animate-pulse" />
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6 h-48 animate-pulse" />
        </aside>

      </div>
    </main>
  );
}