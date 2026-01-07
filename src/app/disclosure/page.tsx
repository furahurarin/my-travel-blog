export default function DisclosurePage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">広告掲載・アフィリエイトについて</h1>
      
      <div className="prose prose-lg dark:prose-invert">
        <h3>広告の配信について</h3>
        <p>
          当サイトは、Amazonアソシエイト・プログラムをはじめとするアフィリエイトプログラムに参加しています。<br />
          記事内で紹介している商品やサービスへのリンクには、アフィリエイトリンクが含まれる場合があります。
        </p>
        <p>
          これにより、当サイトは適格販売により紹介料を得ていますが、読者様の負担が増えることはありません。<br />
          得られた収益は、より有益な旅行情報を発信するための取材費や運営費として活用させていただきます。
        </p>
      </div>
    </main>
  );
}