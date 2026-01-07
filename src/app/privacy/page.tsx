export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">プライバシーポリシー</h1>
      
      <div className="prose prose-lg dark:prose-invert">
        <h3>個人情報の利用目的</h3>
        <p>
          当ブログでは、お問い合わせ等の際に名前やメールアドレス等の個人情報をご入力いただく場合がございます。<br />
          取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メール等でご連絡する場合に利用させていただくものであり、これらの目的以外では利用いたしません。
        </p>

        <h3>アクセス解析ツールについて</h3>
        <p>
          当ブログでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。<br />
          このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
        </p>
      </div>
    </main>
  );
}