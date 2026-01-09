import { getList } from "@/libs/microcms";
import Link from "next/link";
import Image from "next/image";
import { Sidebar } from "@/components/Sidebar";
import { TopSlider } from "@/components/TopSlider";

const CATEGORY_SECTIONS = [
  { id: "hokuriku-tokyo", title: "北陸⇔東京の移動手段", subtitle: "新幹線・飛行機・バスを徹底比較" },
  { id: "hotel-tips", title: "賢いホテル選び", subtitle: "失敗しない宿選びと予約のコツ" },
  { id: "cards-insurance", title: "クレカ・旅行保険", subtitle: "旅をお得に、安心にする一枚" },
];

export default async function Home() {
  const sliderData = await getList({ limit: 5 });

  const categoryPostsPromises = CATEGORY_SECTIONS.map((cat) =>
    getList({
      limit: 3,
      filters: `category[equals]${cat.id}`,
    })
  );
  
  const categoryPostsResults = await Promise.all(categoryPostsPromises);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-10">
      
      <h1 className="sr-only">ふらふら旅行記 - 北陸から東京への賢い移動と旅のノウハウ</h1>

      <TopSlider contents={sliderData.contents} />

      <div className="flex flex-col lg:flex-row gap-12">
        
        <div className="flex-1 space-y-16">
          
          {CATEGORY_SECTIONS.map((cat, index) => {
            const posts = categoryPostsResults[index].contents;
            if (posts.length === 0) return null;

            return (
              <section key={cat.id}>
                <div className="flex items-end justify-between mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                      {cat.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {cat.subtitle}
                    </p>
                  </div>
                  <Link 
                    href={`/blog/${cat.id}`} 
                    className="hidden sm:inline-block text-sm font-bold text-brand-600 hover:text-brand-800 transition-colors"
                  >
                    もっと見る →
                  </Link>
                </div>

                <div className="space-y-6">
                  {posts.map((post) => (
                    <Link 
                      key={post.id} 
                      href={`/blog/${post.category?.id}/${post.id}`}
                      className="group flex flex-col sm:flex-row bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-card-hover border border-gray-100 dark:border-slate-700 overflow-hidden transition-all duration-300"
                    >
                      <div className="relative w-full sm:w-48 h-48 sm:h-auto shrink-0 overflow-hidden">
                        <Image
                          src={post.eyecatch?.url ?? "/no-image.png"}
                          alt={post.title}
                          fill
                          // ▼ 追加: モバイルは全幅、PCは固定幅(約200px)であることをブラウザに伝える
                          sizes="(max-width: 640px) 100vw, 200px"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      
                      <div className="p-5 flex flex-col justify-center flex-grow">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-600 transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                          {post.content.replace(/<[^>]+>/g, "").slice(0, 60)}...
                        </p>
                        <div className="text-xs text-gray-400 flex items-center gap-2 mt-auto">
                          <time>{new Date(post.publishedAt || post.createdAt).toLocaleDateString("ja-JP")}</time>
                          <span className="text-brand-500 font-medium">続きを読む</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-4 sm:hidden text-center">
                  <Link 
                    href={`/blog/${cat.id}`} 
                    className="inline-block w-full py-2 text-sm font-bold text-brand-600 border border-brand-200 rounded-lg bg-brand-50"
                  >
                    {cat.title}をもっと見る
                  </Link>
                </div>
              </section>
            );
          })}

          <div className="p-8 bg-gray-50 dark:bg-slate-900 rounded-2xl text-center border border-dashed border-gray-300 dark:border-gray-700">
             <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
               もっと記事を探す
             </h3>
             <p className="text-sm text-gray-500 mb-6">
               すべての記事を新着順でチェックできます
             </p>
             <Link 
               href="/blog/all"
               className="inline-block bg-brand-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-brand-700 hover:-translate-y-1 transition-all"
             >
               新着記事一覧へ
             </Link>
          </div>
        </div>

        <Sidebar />
      </div>
    </main>
  );
}