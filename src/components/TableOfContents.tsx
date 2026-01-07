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

  useEffect(() => {
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

  return (
    <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-5">
      <p className="font-bold mb-4 text-gray-800 dark:text-gray-100">目次</p>
      <ul className="space-y-3 text-sm">
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
            <a href={`#${item.id}`} className="block">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};