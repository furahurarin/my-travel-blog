import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/libs/microcms";

type Props = {
  posts: Blog[];
};

export const RelatedPosts = ({ posts }: Props) => {
  if (posts.length === 0) return null;

  return (
    <div className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-800">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
        こちらの記事もおすすめです
      </h3>
      
      {/* md:grid-cols-2 なのでPCでは2列表示 */}
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link 
            href={`/blog/${post.category?.id}/${post.id}`} 
            key={post.id} 
            className="group block"
          >
            <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              
              {/* ▼ 追加: アイキャッチ画像エリア */}
              <div className="relative w-full aspect-video">
                <Image
                  src={post.eyecatch?.url ?? "/no-image.png"}
                  alt={post.title}
                  fill
                  // ▼ 追加: スマホは100vw、PC(2列)は50vwをブラウザに伝える
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <h4 className="font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2 line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <time>{new Date(post.publishedAt || post.createdAt).toLocaleDateString("ja-JP")}</time>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};