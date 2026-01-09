import { getList, getCategories, getAllCategories } from "@/libs/microcms";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Sidebar } from "@/components/Sidebar";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ categoryId: string }>;
};

// ▼ 追加: メタデータ生成（SEO対策）
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoryId } = await params;
  const categories = await getCategories({ filters: `id[equals]${categoryId}` });
  const category = categories.contents[0];

  if (!category) return { title: "カテゴリが見つかりません" };

  return {
    title: `${category.name}の記事一覧`,
    description: `${category.name}に関する旅行記事の一覧です。`,
    openGraph: {
      title: `${category.name}の記事一覧 | ふらふら旅行記`,
    },
  };
}

export async function generateStaticParams() {
  // ▼ 修正: 全カテゴリを取得してパスを生成 (getAllCategoriesを使用)
  const categories = await getAllCategories();
  return categories.map((cat) => ({
    categoryId: cat.id,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { categoryId } = await params;
  
  // カテゴリ名の取得
  const categories = await getCategories({ filters: `id[equals]${categoryId}` });
  const category = categories.contents[0];

  if (!category) notFound();

  // 記事一覧の取得
  // ▼ 修正: limitを増やして、10件以上表示できるようにする (本格的な運用ではページネーション推奨だが、まずは50件表示でカバー)
  const { contents: posts } = await getList({
    limit: 50,
    filters: `category[equals]${categoryId}`,
  });

  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 bg-gray-50 text-gray-900">
      <Breadcrumb items={[{ name: "TOP", path: "/" }, { name: category.name }]} />

      <div className="flex flex-col lg:flex-row gap-10 mt-6">
        <div className="flex-1 min-w-0">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {category.name}
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              {posts.length}件の記事が見つかりました
            </p>
          </div>

          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.category?.id}/${post.id}`}
                  className="group flex flex-col sm:flex-row bg-white rounded-xl shadow-sm hover:shadow-card-hover border border-gray-100 overflow-hidden transition-all duration-300"
                >
                  <div className="relative w-full sm:w-64 h-48 sm:h-auto shrink-0">
                    <Image
                      src={post.eyecatch?.url ?? "/no-image.png"}
                      alt={post.title}
                      fill
                      // ▼ 追加: 画像最適化
                      sizes="(max-width: 640px) 100vw, 300px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5 flex flex-col justify-center flex-grow">
                    <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {post.content.replace(/<[^>]+>/g, "").slice(0, 80)}...
                    </p>
                    <time className="text-xs text-gray-400 mt-auto">
                      {new Date(post.publishedAt || post.createdAt).toLocaleDateString("ja-JP")}
                    </time>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center py-20 text-gray-500">まだ記事がありません。</p>
            )}
          </div>
        </div>

        <Sidebar />
      </div>
    </main>
  );
}