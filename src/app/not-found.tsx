import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="text-brand-600 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 mx-auto">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">ページが見つかりません</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        お探しのページは移動または削除された可能性があります。<br />
        URLをご確認いただくか、トップページから記事をお探しください。
      </p>
      <Link 
        href="/" 
        className="bg-brand-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-brand-700 transition-colors"
      >
        トップページに戻る
      </Link>
    </div>
  );
}