import Link from "next/link";
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
      
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link 
            href={`/blog/${post.category?.id}/${post.id}`} 
            key={post.id} 
            className="group block"
          >
            <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition">
              <h4 className="font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2 line-clamp-2">
                {post.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};