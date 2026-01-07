"use client";

import { useState } from "react";

type Props = {
  title: string;
  id: string;
  categoryId?: string;
};

export const ShareButtons = ({ title, id, categoryId }: Props) => {
  // 本番環境のドメイン（設定がなければlocalhostになります）
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${baseUrl}/blog/${categoryId ?? "misc"}/${id}`;

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-2 my-6">
      <p className="text-xs text-gray-500 dark:text-gray-400 font-bold">SHARE</p>
      <div className="flex gap-3">
        
        {/* X (Twitter) */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black hover:bg-gray-800 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
          title="Xでシェア"
        >
          {/* X Icon SVG */}
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1877F2] hover:bg-[#166fe5] text-white p-2 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
          title="Facebookでシェア"
        >
          {/* FB Icon SVG */}
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        </a>

        {/* LINE */}
        <a
          href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#06C755] hover:bg-[#05b34c] text-white p-2 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
          title="LINEで送る"
        >
          {/* LINE Icon SVG */}
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
            <path fillRule="evenodd" d="M12 2C6.48 2 2 5.86 2 10.62c0 4.26 3.56 7.82 8.35 8.52.32.07.76.22.87.5.13.33.09.84-.04 1.47l-.14.7c-.16.82-.76 2.68 1.43 1.47 2.19-1.21 6.07-3.55 8.28-6.1C22.21 15.22 24 13.04 24 10.62 24 5.86 19.52 2 12 2zm1.48 10.3c0 .35-.29.64-.64.64h-5.8c-.35 0-.64-.29-.64-.64v-5.8c0-.35.29-.64.64-.64.35 0 .64.29.64.64v5.16h5.16c.35 0 .64.29.64.64z" clipRule="evenodd" />
            <path d="M20.25 10.6c0-4.04-4.07-7.32-9.09-7.32-5.02 0-9.09 3.28-9.09 7.32 0 3.63 3.22 6.66 7.59 7.2.33.05.78.14 1.08.33.15.09.24.22.28.4l.2.98c.08.4.15.82-.12 1.15-.22.28-.6.37-.93.37-.2 0-.4-.03-.59-.1-1.3-.47-2.65-1.2-3.8-2.12-.25-.2-.6-.2-.84.02-.24.23-.23.6.02.83 1.58 1.25 3.4 2.1 5.3 2.1.3 0 .6-.03.9-.1 1.62.9 3.73 1.57 4.26 1.7.2.05.4.08.6.08 1.26 0 2.06-.96 2.3-2.13.06-.27.1-.55.14-.82.04-.26.24-.46.5-.5 4.35-.64 7.6-3.66 7.6-7.3z" className="opacity-0" /> {/* Hack for shape */}
             <text x="50%" y="55%" dominantBaseline="central" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">LINE</text>
          </svg>
        </a>

        {/* URLコピー */}
        <button
          onClick={handleCopy}
          className={`p-2 rounded-full w-10 h-10 flex items-center justify-center transition-all ${
            isCopied ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300"
          }`}
          title="リンクをコピー"
        >
          {isCopied ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};