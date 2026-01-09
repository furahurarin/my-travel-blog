import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://furahura-travel.com'),
  title: {
    template: '%s | ふらふら旅行記',
    default: 'ふらふら旅行記｜移動と滞在の「最適解」を検証する旅ログ',
  },
  description: "「安さ」と「快適さ」のバランスにお悩みの方へ。時間・費用・疲労度・遅延リスクなどの「根拠」を基に、移動手段（新幹線・飛行機）やホテル選びを検証する記録。なんとなくで選んで後悔したくない、大人のための実用ノウハウ。",
  openGraph: {
    siteName: 'ふらふら旅行記',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}