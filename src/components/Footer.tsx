import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Travel Hack Blog
          </div>

          <nav className="flex flex-wrap gap-6 text-sm">
            <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:underline">
              運営者情報
            </Link>
            <Link href="/disclosure" className="text-gray-600 dark:text-gray-400 hover:underline">
              広告表記
            </Link>
            <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:underline">
              プライバシー
            </Link>
            <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:underline">
              お問い合わせ
            </Link>
          </nav>

        </div>
      </div>
    </footer>
  );
};