import { ContactForm } from "@/components/ContactForm";
import { Breadcrumb } from "@/components/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "当ブログへのお問い合わせはこちらからお願いいたします。",
};

export default function Contact() {
  return (
    <main className="max-w-4xl mx-auto p-6 text-gray-800 dark:text-gray-200">
      {/* パンくずリスト修正 */}
      <Breadcrumb items={[{ name: "ホーム", path: "/" }, { name: "お問い合わせ" }]} />
      
      <div className="mt-6">
        <h1 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
          お問い合わせ
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="mb-8 leading-relaxed">
            当ブログに関するご質問、お仕事のご依頼、記事へのご感想などがございましたら、<br className="hidden md:inline" />
            以下のフォームよりお気軽にお送りください。
          </p>

          <div className="not-prose">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}