"use client";

import { useState } from "react";

export const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // ▼▼▼ 下記のURLの末尾を、あなたのFormspree IDに書き換えてください ▼▼▼
      const response = await fetch("https://formspree.io/f/maqnrqrg", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-blue-50 dark:bg-slate-800 p-8 rounded-lg text-center border border-blue-100 dark:border-slate-700">
        <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">送信しました</p>
        <p className="text-gray-600 dark:text-gray-300">
          お問い合わせありがとうございます。<br />
          内容を確認次第、ご連絡させていただきます。
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-gray-500 hover:text-blue-600 underline"
        >
          フォームに戻る
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* お名前 */}
      <div>
        <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
          お名前
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          placeholder="山田 太郎"
        />
      </div>

      {/* メールアドレス */}
      <div>
        <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
          メールアドレス
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          placeholder="example@email.com"
        />
      </div>

      {/* メッセージ */}
      <div>
        <label htmlFor="message" className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
          お問い合わせ内容
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-y"
          placeholder="ここにお問い合わせ内容を入力してください"
        />
      </div>

      {/* 送信ボタン */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "送信中..." : "送信する"}
      </button>

      {status === "error" && (
        <p className="text-red-600 text-sm mt-2">
          送信に失敗しました。時間をおいて再度お試しください。
        </p>
      )}
    </form>
  );
};