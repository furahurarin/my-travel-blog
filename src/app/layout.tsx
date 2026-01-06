import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header"; // ヘッダーを読み込み

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Travel Hack Blog",
  description: "旅行を賢く楽しむためのライフハックブログ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {/* 全ページ共通のヘッダーを表示 */}
        <Header />
        {children}
      </body>
    </html>
  );
}