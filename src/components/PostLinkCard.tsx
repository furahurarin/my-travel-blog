import Link from "next/link";
import Image from "next/image";
import type { BlogCard } from "@/libs/microcms";

type Props = {
  post: BlogCard;
};

export const PostLinkCard = ({ post }: Props) => {
  const categoryId = post.category?.id ?? "misc";
  const href = `/blog/${categoryId}/${post.id}`;

  return (
    <div className="my-10">
      <Link
        href={href}
        className="block rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-56 h-40 sm:h-auto bg-gray-100">
            {post.eyecatch?.url ? (
              <Image
                src={post.eyecatch.url}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 100vw, 224px"
                className="object-cover"
              />
            ) : (
              <Image
                src="/no-image.png"
                alt={post.title}
                fill
                sizes="(max-width: 640px) 100vw, 224px"
                className="object-cover"
              />
            )}
          </div>

          <div className="flex-1 p-5">
            {post.category?.name ? (
              <p className="text-xs text-gray-500 mb-2">{post.category.name}</p>
            ) : null}

            <p className="text-base font-bold text-gray-900 leading-snug">{post.title}</p>

            {post.description ? (
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{post.description}</p>
            ) : null}

            <p className="text-sm font-bold text-blue-700 mt-4">記事を読む →</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
