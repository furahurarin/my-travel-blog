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
        
        <nav className="hidden md:flex gap-8">
          <Link href="/about" className="group text-sm font-medium text-gray-600 hover:text-blue-600 transition flex flex-col items-center">
            <span>About</span>
            <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute top-10">このブログについて</span>
          </Link>
          <Link href="/blog/all" className="group text-sm font-medium text-gray-600 hover:text-blue-600 transition flex flex-col items-center">
            <span>Articles</span>
            <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute top-10">記事一覧</span>
          </Link>
          <Link href="/contact" className="group text-sm font-medium text-gray-600 hover:text-blue-600 transition flex flex-col items-center">
            <span>Contact</span>
            <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute top-10">お問い合わせ</span>
          </Link>
        </nav>

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

        <div 
          className={`fixed inset-0 bg-white/95 backdrop-blur-lg transition-opacity duration-300 z-40 md:hidden flex flex-col items-center justify-center space-y-8 ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Link href="/about" onClick={closeMenu} className="flex flex-col items-center group">
            <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-600">About</span>
            <span className="text-xs text-gray-500 mt-1">このブログについて</span>
          </Link>
          <Link href="/blog/all" onClick={closeMenu} className="flex flex-col items-center group">
            <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-600">Articles</span>
            <span className="text-xs text-gray-500 mt-1">記事一覧</span>
          </Link>
          <Link href="/contact" onClick={closeMenu} className="flex flex-col items-center group">
            <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-600">Contact</span>
            <span className="text-xs text-gray-500 mt-1">お問い合わせ</span>
          </Link>
        </div>
      </div>
    </header>
  );
};