import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "広告掲載・運営ポリシー",
  description: "当サイトの広告掲載ポリシーおよび運営方針について記載しています。",
};

export default function DisclosurePage() {
  return (
    <main className="max-w-4xl mx-auto p-6 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
        広告掲載・運営ポリシー
      </h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-10">
        <section>
          {/* 青い線のデザインを適用 */}
          <h2 className="text-xl font-bold mb-4 border-l-4 border-blue-500 pl-3">広告配信について</h2>
          <p>
            当サイト「ふらふら旅行記」は、各種アフィリエイトプログラムや広告配信サービスに参加しています。<br />
            記事内で紹介している商品やサービスへのリンクには、プロモーション（広告）リンクが含まれる場合があります。
          </p>
          <p>
            当サイトは適格販売により紹介料を得ていますが、これにより読者様の購入価格が高くなることはありません。<br />
            得られた収益は、サーバー代やドメイン代、新たな旅行先の取材費など、より有益な情報を発信するための運営費として活用させていただいております。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 border-l-4 border-blue-500 pl-3">コンテンツの制作方針</h2>
          <p>
            当サイトのレビュー記事は、実際に筆者が体験・購入した事実に基づき、メリットだけでなくデメリットも含めて公平な視点で執筆することを心がけています。
          </p>
          <p>
            広告主からの依頼により記事を執筆する場合（PR案件）は、記事内の冒頭または分かりやすい位置に「PR」や「プロモーション」の表記を明示し、広告企画であることを読者様に誤解のないよう伝えます。
          </p>
        </section>
      </div>
    </main>
  );
}