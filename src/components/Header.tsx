import Link from "next/link";

export const Header = () => {
  return (
    <header className="border-b bg-white dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white hover:opacity-80 transition">
          ふらふら旅行記
        </Link>
        <nav className="flex gap-4">
          <Link href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
            About
          </Link>
          <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};