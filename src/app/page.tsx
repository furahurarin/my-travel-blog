// src/app/page.tsx
import { getList } from "@/libs/microcms";
import Link from "next/link";

export default async function Home() {
  // MicroCMSから記事一覧を取得
  const { contents } = await getList();

  if (!contents || contents.length === 0) {
    return <h1>記事がありません</h1>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">旅行ライフハックブログ</h1>
      
      <div className="grid gap-6">
        {contents.map((post) => (
          <Link href={`/blog/${post.id}`} key={post.id} className="block group">
            <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition bg-white">
              <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm">
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}