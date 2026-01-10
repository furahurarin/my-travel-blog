"use client";

import Link from "next/link";
import { useState, useEffect } from "react"; // useEffectを追加
import Image from "next/image";
import { usePathname } from "next/navigation"; // パス変更検知用

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // 【プロ仕様の挙動】
  // メニューが開いているときは、背面のスクロールを禁止する
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // スクロール禁止
    } else {
      document.body.style.overflow = ""; // 解除
    }
    // コンポーネント破棄時に必ず解除
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ページ遷移したら自動でメニューを閉じる
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  const menuItems = [
    { label: "ホーム", href: "/" },
    { label: "記事一覧", href: "/blog/all" },
    { label: "運営者情報", href: "/about" },
    { label: "お問い合わせ", href: "/contact" },
  ];

  return (
    <header 
      // メニューが開いているときは背景を「完全な白」にし、ボーダーも消す（一体感を出すため）
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        isOpen 
          ? "bg-white border-b-0" 
          : "bg-white/80 backdrop-blur-md border-b border-gray-100"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* ロゴエリア */}
        <Link 
          href="/" 
          className="hover:opacity-80 transition relative z-[60]"
          onClick={closeMenu}
        >
          <Image
            src="/logo.png"
            alt="ふらふら旅行記"
            width={180}    
            height={40}    
            className="w-auto h-8 md:h-10"
            priority
          />
        </Link>
        
        {/* ハンバーガーボタン */}
        <button 
          onClick={toggleMenu}
          className="z-[60] p-2 text-gray-600 hover:bg-gray-100 rounded-md focus:outline-none transition-colors"
          aria-label="メニューを開く"
          aria-expanded={isOpen}
        >
          <div className="w-6 h-5 flex flex-col justify-between relative">
            <span className={`h-0.5 bg-current transition-all duration-300 rounded-full ${isOpen ? 'rotate-45 translate-y-2.5 w-6' : 'w-6'}`} />
            <span className={`h-0.5 bg-current transition-all duration-300 rounded-full ${isOpen ? 'opacity-0' : 'w-6'}`} />
            <span className={`h-0.5 bg-current transition-all duration-300 rounded-full ${isOpen ? '-rotate-45 -translate-y-2 w-6' : 'w-6'}`} />
          </div>
        </button>

        {/* メニューオーバーレイ
          ・top-0: 画面の一番上から覆う
          ・bg-white: 透過なしの完全な白
          ・z-55: ヘッダー(z-50)より上、ロゴ(z-60)より下
          ・h-dvh: モバイルブラウザのアドレスバー考慮の高さ指定 (dynamic viewport height)
        */}
        <div 
          className={`fixed inset-0 top-0 bg-white z-[55] flex flex-col items-center justify-center space-y-8 transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
          // メニューが開いていないときはスクリーンリーダーから隠す
          aria-hidden={!isOpen}
        >
          <nav className="flex flex-col items-center space-y-6 w-full px-6">
            {menuItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                onClick={closeMenu} 
                className="text-xl sm:text-2xl font-bold text-gray-800 hover:text-blue-600 transition tracking-wide w-full text-center py-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="pt-10 border-t border-gray-100 w-40 text-center space-y-4">
            <Link href="/privacy" onClick={closeMenu} className="block text-sm text-gray-500 hover:text-gray-800">プライバシーポリシー</Link>
            <Link href="/disclosure" onClick={closeMenu} className="block text-sm text-gray-500 hover:text-gray-800">運営ポリシー</Link>
          </div>
        </div>
      </div>
    </header>
  );
};