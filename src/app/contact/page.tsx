export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">お問い合わせ</h1>
      
      <div className="prose prose-lg dark:prose-invert">
        <p>
          当サイトに関するご質問やご指摘は、以下のGoogleフォームよりご連絡ください。
        </p>
        
        {/* Googleフォーム等の埋め込み、またはリンクをここに貼ります */}
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center my-8">
          <p className="mb-4">お問い合わせフォーム（準備中）</p>
          <a 
            href="#" 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            フォームを開く
          </a>
        </div>
      </div>
    </main>
  );
}