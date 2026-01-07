import { ContactForm } from "@/components/ContactForm"; // ▼ 作成した部品を読み込み
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "当ブログへのお問い合わせはこちらからお願いいたします。",
};

export default function Contact() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white border-b pb-4 border-gray-200 dark:border-gray-700">
        お問い合わせ
      </h1>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
        <p className="mb-8 text-gray-600 dark:text-gray-300 leading-relaxed">
          当ブログに関するご質問、お仕事のご依頼、記事へのご感想などがございましたら、<br className="hidden md:inline" />
          以下のフォームよりお気軽にお送りください。
        </p>

        {/* ▼▼▼ デザインされたフォーム部品を表示 ▼▼▼ */}
        <ContactForm />
      </div>
    </main>
  );
}