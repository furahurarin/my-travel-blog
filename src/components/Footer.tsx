import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-lg font-bold text-gray-800 mb-2">ふらふら旅行記</h2>
            {/* ▼ タグライン修正 */}
            <p className="text-xs text-gray-500 tracking-wide">
              Logic & Comfort.<br/>
              根拠のある旅は、快適だ。
            </p>
          </div>
          <div className="flex gap-6 text-sm font-medium text-gray-600">
            <Link href="/about" className="hover:text-brand-600 transition">About</Link>
            <Link href="/blog/all" className="hover:text-brand-600 transition">Articles</Link>
            <Link href="/contact" className="hover:text-brand-600 transition">Contact</Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Furafura Travel Log. All rights reserved.
        </div>
      </div>
    </footer>
  );
};