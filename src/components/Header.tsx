"use client";

import Link from "next/link";
import { useState } from "react";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // メニュー項目を定義（ここを変更するだけで一括反映されます）
  const menuItems = [
    { label: "記事一覧", href: "/blog/all" },
    { label: "運営者情報", href: "/about" },
    { label: "お問い合わせ", href: "/contact" },
  ];

  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-all">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* ロゴエリア */}
        <Link 
          href="/" 
          className="text-lg md:text-xl font-bold text-gray-900 hover:opacity-80 transition relative z-50 tracking-tight"
          onClick={closeMenu}
        >
          ふらふら旅行記
        </Link>
        
        {/* PC用ナビゲーション */}
        <nav className="hidden md:flex gap-6 items-center">
          {menuItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition py-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ハンバーガーメニューボタン */}
        <button 
          onClick={toggleMenu}
          className="md:hidden z-50 p-2 text-gray-600 hover:bg-gray-100 rounded-md focus:outline-none"
          aria-label="メニューを開く"
          aria-expanded={isOpen}
        >
          <div className="w-6 h-5 flex flex-col justify-between relative">
            <span className={`h-0.5 bg-current transition-all duration-300 rounded-full ${isOpen ? 'rotate-45 translate-y-2.5 w-6' : 'w-6'}`} />
            <span className={`h-0.5 bg-current transition-all duration-300 rounded-full ${isOpen ? 'opacity-0' : 'w-6'}`} />
            <span className={`h-0.5 bg-current transition-all duration-300 rounded-full ${isOpen ? '-rotate-45 -translate-y-2 w-6' : 'w-6'}`} />
          </div>
        </button>

        {/* スマホ用メニューオーバーレイ */}
        <div 
          className={`fixed inset-0 bg-white/98 backdrop-blur-lg transition-all duration-300 z-40 md:hidden flex flex-col items-center justify-center space-y-8 ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          {menuItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              onClick={closeMenu} 
              className="text-xl font-bold text-gray-800 hover:text-blue-600 transition"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-8 border-t border-gray-100 w-40 text-center space-y-4">
            <Link href="/privacy" onClick={closeMenu} className="block text-xs text-gray-500 hover:text-gray-800">プライバシーポリシー</Link>
            <Link href="/disclosure" onClick={closeMenu} className="block text-xs text-gray-500 hover:text-gray-800">運営ポリシー</Link>
          </div>
        </div>
      </div>
    </header>
  );
};