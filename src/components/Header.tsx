import Link from "next/link";

export const Header = () => {
  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-all">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900 hover:opacity-80 transition">
          ふらふら旅行記
        </Link>
        <nav className="flex gap-4">
          <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600 transition">
            About
          </Link>
          <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};