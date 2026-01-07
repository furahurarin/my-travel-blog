import Link from "next/link";

type Props = {
  url: string;
  children: React.ReactNode; // ボタンのメインテキスト
  subText?: string;          // ボタン上のマイクロコピー（例: ＼当サイト限定特典あり／）
  color?: "blue" | "orange" | "green"; // 色のバリエーション
  isExternal?: boolean;      // 外部リンクかどうか
};

export const CtaButton = ({ url, children, subText, color = "orange", isExternal = true }: Props) => {
  
  // 色のスタイル定義
  const colorStyles = {
    blue: "bg-blue-600 hover:bg-blue-700 shadow-blue-200",
    orange: "bg-orange-500 hover:bg-orange-600 shadow-orange-200",
    green: "bg-green-600 hover:bg-green-700 shadow-green-200",
  };

  return (
    <div className="my-8 flex flex-col items-center">
      {/* マイクロコピー（あれば表示） */}
      {subText && (
        <span className="text-sm font-bold text-gray-600 dark:text-gray-300 mb-1">
          {subText}
        </span>
      )}
      
      <Link 
        href={url}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={`
          ${colorStyles[color]} 
          text-white font-bold text-lg py-4 px-10 rounded-full 
          shadow-lg transform transition-transform duration-200 hover:-translate-y-1 
          flex items-center gap-2 w-full md:w-auto justify-center
        `}
      >
        {children}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </Link>
    </div>
  );
};