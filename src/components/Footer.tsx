import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* 1. サイト情報 */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              ふらふら旅行記
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              北陸から東京への賢い移動と、<br />
              失敗しない旅のノウハウを発信するブログメディア。
            </p>
          </div>

          {/* 2. サイトマップ的リンク */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Contents
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-gray-500 hover:text-brand-600 transition-colors">
                  トップページ
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-500 hover:text-brand-600 transition-colors">
                  運営者情報
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-500 hover:text-brand-600 transition-colors">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. 法的表記 */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-brand-600 transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/disclosure" className="text-sm text-gray-500 hover:text-brand-600 transition-colors">
                  運営方針・免責事項
                </Link>
              </li>
              <li>
                <a href="/feed.xml" className="text-sm text-gray-500 hover:text-brand-600 transition-colors flex items-center gap-1">
                  RSSフィード
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Furahura Travel Blog. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Travel smarter, wander freely.
          </p>
        </div>
      </div>
    </footer>
  );
};