import Link from "next/link";

type Props = {
  totalCount: number; // 記事の総数
  current: number;    // 現在のページ番号
  basePath: string;   // リンクのベースURL (例: "/" や "/blog/travel")
  limit?: number;     // 1ページあたりの表示数 (デフォルト: 6)
};

export const Pagination = ({ totalCount, current, basePath, limit = 6 }: Props) => {
  // 総ページ数を計算
  const totalPages = Math.ceil(totalCount / limit);

  // 1ページしかない場合は何も表示しない
  if (totalPages <= 1) return null;

  // ページ番号の配列を作成 (例: [1, 2, 3])
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center gap-2 mt-12">
      {pages.map((p) => (
        <Link
          key={p}
          href={`${basePath}?page=${p}`}
          className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${
            p === current
              ? "bg-blue-600 border-blue-600 text-white font-bold pointer-events-none" // 現在のページ
              : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700" // 他のページ
          }`}
        >
          {p}
        </Link>
      ))}
    </div>
  );
};