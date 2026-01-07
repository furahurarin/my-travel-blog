import Link from "next/link";

export const AffiliateDisclosure = () => {
  return (
    <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs text-gray-500 dark:text-gray-400 px-3 py-2 rounded mb-6 flex items-center justify-between">
      <span>
        この記事はプロモーションが含まれています
      </span>
      <Link 
        href="/disclosure" 
        className="underline hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
      >
        運営方針
      </Link>
    </div>
  );
};