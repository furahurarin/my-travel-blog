import Link from "next/link";

export function Header() {
  return (
    <header className="border-b bg-white dark:bg-slate-900 dark:border-slate-800 sticky top-0 z-50 transition-colors">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
          ✈️ Travel Hack
        </Link>
        <nav className="text-sm font-medium text-gray-600 dark:text-gray-400 flex gap-4">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">新着記事</Link>
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">ランキング</Link>
        </nav>
      </div>
    </header>
  );
}