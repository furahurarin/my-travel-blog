export function PriceComparison() {
  return (
    <div className="my-8 border-2 border-blue-100 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
      {/* ヘッダー部分 */}
      <div className="bg-blue-50 dark:bg-slate-800 p-4 text-center font-bold text-blue-800 dark:text-blue-300">
        福井 → 東京（片道・大人）
      </div>
      
      <div className="grid grid-cols-2 divide-x divide-gray-100 dark:divide-slate-700">
        {/* 新幹線エリア */}
        <div className="p-4 flex flex-col items-center bg-white dark:bg-slate-900 transition-colors">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">北陸新幹線</p>
          <p className="text-xl font-bold text-gray-800 dark:text-gray-100">約15,810円</p>
          <ul className="text-xs text-gray-500 dark:text-gray-400 mt-3 list-disc list-inside space-y-1">
            <li>駅弁が楽しみ</li>
            <li>本数が多くて安心</li>
          </ul>
        </div>

        {/* 飛行機エリア（おすすめ） */}
        <div className="p-4 flex flex-col items-center bg-yellow-50 dark:bg-slate-800/50 relative transition-colors">
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 py-1 font-bold rounded-bl">
            おすすめ
          </span>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">JAL (早割/U25)</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">約14,200円〜</p>
          <ul className="text-xs text-gray-600 dark:text-gray-300 mt-3 list-disc list-inside space-y-1">
            <li>座ってる時間が短い</li>
            <li>マイルが貯まる</li>
          </ul>
          
          {/* アフィリエイトリンクボタン */}
          <a 
            href="https://www.jal.co.jp/jp/ja/"
            target="_blank"
            rel="nofollow sponsored"
            className="mt-4 w-full text-center bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white text-sm font-bold py-2 px-4 rounded transition"
          >
            運賃を見てみる
          </a>
        </div>
      </div>
      <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center p-2 bg-gray-50 dark:bg-slate-900">
        ※時期や予約タイミングにより変動します
      </p>
    </div>
  );
}