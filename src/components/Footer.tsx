import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16 text-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="col-span-1">
            <h3 className="text-lg font-bold text-gray-900 mb-4">ふらふら旅行記</h3>
            <p className="text-sm text-gray-500 leading-relaxed">北陸から東京への賢い移動と、失敗しない旅のノウハウを発信するブログメディア。</p>
          </div>
          <div className="col-span-1">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Contents</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-gray-500 hover:text-brand-600 transition">トップページ</Link></li>
              <li><Link href="/about" className="text-sm text-gray-500 hover:text-brand-600 transition">運営者情報</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-500 hover:text-brand-600 transition">お問い合わせ</Link></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm text-gray-500 hover:text-brand-600 transition">プライバシーポリシー</Link></li>
              <li><Link href="/disclosure" className="text-sm text-gray-500 hover:text-brand-600 transition">免責事項・運営方針</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400">
          <p className="text-xs">&copy; {new Date().getFullYear()} Furahura Travel Blog. All rights reserved.</p>
          <p className="text-xs italic font-serif opacity-70">Travel smarter, wander freely.</p>
        </div>
      </div>
    </footer>
  );
};