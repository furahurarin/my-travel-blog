import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 mt-12 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* コピーライト */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} ふらふら旅行記 All rights reserved.
        </div>

        {/* フッターリンク */}
        <div className="flex gap-6 text-sm">
          <Link 
            href="/privacy" 
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            プライバシーポリシー
          </Link>
          
          <Link 
            href="/contact" 
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            お問い合わせ
          </Link>
        </div>
      </div>
    </footer>
  );
};