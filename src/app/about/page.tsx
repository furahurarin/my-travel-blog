export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">運営者情報・当サイトについて</h1>
      
      <div className="prose prose-lg dark:prose-invert">
        <p>
          当ブログをご覧いただきありがとうございます。<br />
          このサイトは、旅行における「移動・予約・支払い・失敗回避」に特化した役立ち情報を発信するブログです。
        </p>

        <h3>サイトの目的</h3>
        <p>
          「体験談」だけでなく、読んだ方が実際に再現できる「手順」として情報を提供することを大切にしています。<br />
          特に、北陸（福井・石川）から東京への移動や、効率的な空港・ラウンジの活用方法について詳しく解説します。
        </p>

        <h3>運営者</h3>
        <ul>
          <li>名前：Travel Blogger（※ここにご自身のお名前やHNを入れてください）</li>
          <li>連絡先：お問い合わせフォームよりお願いいたします。</li>
        </ul>
      </div>
    </main>
  );
}