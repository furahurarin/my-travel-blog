import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

const notojp = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: '--font-noto-sans-jp',
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://furahura-travel.com'),
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
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
    /* ▼ ポイント1: className="light" を明示し、styleでcolor-schemeを強制 
       これでブラウザの自動ダークモード適用を強力に抑制します
    */
    <html lang="ja" className="light" style={{ colorScheme: 'light' }}>
      <body className={`${inter.variable} ${notojp.variable} font-sans bg-gray-50 text-gray-900 flex flex-col min-h-screen`}>
        {/* ▼ ヘッダー（すりガラス効果反映済み） */}
        <Header />
        
        <div className="flex-grow">
          {children}
        </div>

        {/* ▼ フッター（ダークモード記述削除済み） */}
        <Footer />
        
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}