import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          
          {/* 1. ブランド情報 */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-bold text-gray-800 mb-4">ふらふら旅行記</h2>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              Logic & Comfort.<br/>
              根拠のある旅は、快適だ。<br/>
              移動と滞在の「最適解」を検証する旅ログ。
            </p>
          </div>

          {/* 2. カテゴリ・記事を探す */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-4">カテゴリー</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="/blog/all" className="hover:text-blue-600 transition flex items-center gap-2">
                  <span>全記事一覧</span>
                </Link>
              </li>
              {/* 英語表記を削除し日本語のみに */}
              <li><Link href="/blog/mobility" className="hover:text-blue-600 transition">移動手段</Link></li>
              <li><Link href="/blog/hotel" className="hover:text-blue-600 transition">宿泊記</Link></li>
              <li><Link href="/blog/money" className="hover:text-blue-600 transition">マイル・費用</Link></li>
            </ul>
          </div>

          {/* 3. サイト情報・法的表記 */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-4">サイト情報</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-blue-600 transition">運営者情報</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 transition">お問い合わせ</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-600 transition">プライバシーポリシー</Link></li>
              <li><Link href="/disclosure" className="hover:text-blue-600 transition">広告掲載・運営ポリシー</Link></li>
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="pt-8 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Furafura Travel Log. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};