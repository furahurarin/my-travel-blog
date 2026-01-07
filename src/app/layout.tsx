import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // ▼ 修正: 決定したドメインを設定
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://furahura-travel.com'),
  
  title: {
    template: '%s | ふらふら旅行記',
    default: 'ふらふら旅行記',
  },
  description: "賢い移動と快適な旅を追求する旅行ブログ",
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
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 flex flex-col min-h-screen`}>
        <Header />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}