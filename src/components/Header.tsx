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

  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-all">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-xl font-bold text-gray-900 hover:opacity-80 transition relative z-50"
          onClick={closeMenu}
        >
          ふらふら旅行記
        </Link>
        
        {/* デスクトップ用メニュー */}
        <nav className="hidden md:flex gap-6">
          <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">
            About
          </Link>
          <Link href="/blog/all" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">
            Blog
          </Link>
          <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">
            Contact
          </Link>
        </nav>

        {/* ハンバーガーボタン */}
        <button 
          onClick={toggleMenu}
          className="md:hidden z-50 p-2 text-gray-600 hover:bg-gray-100 rounded-md focus:outline-none"
          aria-label="メニューを開く"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2 w-6' : 'w-6'}`} />
            <span className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-6'}`} />
            <span className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5 w-6' : 'w-6'}`} />
          </div>
        </button>

        {/* モバイル用メニューオーバーレイ */}
        <div 
          className={`fixed inset-0 bg-white/95 backdrop-blur-lg transition-opacity duration-300 z-40 md:hidden flex flex-col items-center justify-center space-y-8 ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Link href="/" onClick={closeMenu} className="text-lg font-bold text-gray-800 hover:text-blue-600">
            Home
          </Link>
          <Link href="/about" onClick={closeMenu} className="text-lg font-bold text-gray-800 hover:text-blue-600">
            About
          </Link>
          <Link href="/blog/all" onClick={closeMenu} className="text-lg font-bold text-gray-800 hover:text-blue-600">
            Blog
          </Link>
          <Link href="/contact" onClick={closeMenu} className="text-lg font-bold text-gray-800 hover:text-blue-600">
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};