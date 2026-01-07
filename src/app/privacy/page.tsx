import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "個人情報の取り扱いに関する方針（プライバシーポリシー）を記載しています。",
};

export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto p-6 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-8 border-b pb-4 border-gray-200 dark:border-gray-700">
        プライバシーポリシー
      </h1>

      <div className="prose dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold mb-3">1. 個人情報の利用目的</h2>
          <p>
            当ブログでは、お問い合わせや記事へのコメントの際、名前やメールアドレス等の個人情報を入力いただく場合がございます。<br />
            取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メールなどでご連絡する場合に利用するものであり、これらの目的以外では利用いたしません。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">2. 広告について</h2>
          <p>
            当ブログでは、第三者配信の広告サービス（Googleアドセンス、A8.netなど）を利用しており、ユーザーの興味に応じた商品やサービスの広告を表示するため、クッキー（Cookie）を使用しております。<br />
            クッキーを使用することで当サイトはお客様のコンピュータを識別できるようになりますが、お客様個人を特定できるものではありません。
          </p>
          <p className="mt-2">
            Cookieを無効にする方法やGoogleアドセンスに関する詳細は
            <a 
              href="https://policies.google.com/technologies/ads?hl=ja" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              「Googleポリシーと規約」
            </a>
            をご確認ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">3. アクセス解析ツールについて</h2>
          <p>
            当ブログでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。<br />
            このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。トラフィックデータは匿名で収集されており、個人を特定するものではありません。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">4. 免責事項</h2>
          <p>
            当ブログからのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。<br />
            また、当ブログのコンテンツ・情報について、できる限り正確な情報を掲載するよう努めておりますが、正確性や安全性を保証するものではありません。情報が古くなっていることもございます。<br />
            当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">5. 著作権について</h2>
          <p>
            当ブログで掲載している文章や画像などにつきましては、無断転載を禁止します。<br />
            当ブログは著作権や肖像権の侵害を目的としたものではありません。著作権や肖像権に関して問題がございましたら、お問い合わせフォームよりご連絡ください。迅速に対応いたします。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">6. リンクについて</h2>
          <p>
            当ブログは基本的にリンクフリーです。リンクを行う場合の許可や連絡は不要です。<br />
            ただし、インラインフレームの使用や画像の直リンクはご遠慮ください。
          </p>
        </section>
      </div>
    </main>
  );
}