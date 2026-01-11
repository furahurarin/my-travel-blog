"use client";

import { useEffect, useState } from "react";

type TocItem = {
  text: string;
  id: string;
  tag: string;
};

type Props = {
  toc: TocItem[];
};

export const TableOfContents = ({ toc }: Props) => {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(true); // 開閉状態の管理

  useEffect(() => {
    // IntersectionObserverの設定（スクロール連動）
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -60% 0px", // 画面の上部に来たらアクティブにする調整
      }
    );

    // 見出し要素を監視対象に登録
    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden transition-all duration-300">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 bg-gray-100 dark:bg-slate-700/50 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <p className="font-bold text-gray-800 dark:text-gray-100">目次</p>
        <span className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>
      
      <div 
        className={`transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="space-y-3 text-sm p-5 border-t border-gray-200 dark:border-slate-700">
          {toc.map((item) => (
            <li
              key={item.id}
              className={`
                transition-colors duration-200
                ${item.tag === "h3" ? "ml-4" : ""}
                ${
                  activeId === item.id
                    ? "text-blue-600 dark:text-blue-400 font-bold border-l-2 border-blue-600 pl-2"
                    : "text-gray-600 dark:text-gray-400 border-l-2 border-transparent pl-2 hover:text-gray-900 dark:hover:text-gray-200"
                }
              `}
            >
              <a 
                href={`#${item.id}`} 
                className="block py-1"
                onClick={(e) => {
                  // 必要であればここでスムーズスクロール等の制御を追加
                  // e.preventDefault();
                  // document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};