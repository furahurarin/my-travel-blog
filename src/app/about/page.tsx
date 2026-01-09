import { Sidebar } from "@/components/Sidebar";
import { Breadcrumb } from "@/components/Breadcrumb";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "運営者情報 - このブログについて",
  description: "ふらふら旅行記のコンセプトと運営者プロフィール。",
};

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 text-gray-900">
      <Breadcrumb items={[{ name: "ホーム", path: "/" }, { name: "運営者情報" }]} />

      <div className="flex flex-col lg:flex-row gap-10 mt-6">
        
        <div className="flex-1 min-w-0">
          
          <h1 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">
            このブログについて
          </h1>

          <div className="prose prose-gray max-w-none space-y-12">
            
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-3">
                コンセプト：根拠で選ぶ、快適な旅。
              </h2>
              <p className="leading-relaxed text-gray-600">
                旅行の計画を立てるとき、こんな風に迷ったことはありませんか？
              </p>
              <ul className="list-disc pl-5 text-gray-600 my-4 space-y-2">
                <li>新幹線と飛行機、どっちが正解なんだろう？</li>
                <li>高いホテルに泊まって、本当に値段分の価値はあるのかな？</li>
                <li>マイルを貯めたいけど、結局どのカードが得なの？</li>
              </ul>
              <p className="leading-relaxed text-gray-600">
                このブログ「ふらふら旅行記」は、そんな迷いに対して、
                <strong>時間・費用・疲労度・リスク</strong>といった具体的な「根拠」を基に、最適解を検証するログ（記録）です。
              </p>
              <p className="leading-relaxed text-gray-600 mt-4">
                「100円の安さ」よりも「1時間の快適さ」を大切にしたい。<br />
                そんな大人のための、実用的な旅のノウハウを共有します。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-3">
                運営者について
              </h2>
              <div className="flex flex-col sm:flex-row gap-6 items-start p-6 rounded-xl border border-gray-100 bg-gray-50/50">
                <div className="relative w-24 h-24 shrink-0 bg-white rounded-full overflow-hidden shadow-sm border border-gray-100">
  <Image
    src="/profile.jpg"
    alt="プロフィール画像"
    fill
    className="object-cover"
    sizes="96px"
  />
</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">ふらふら旅行記</h3>
                  <p className="text-sm text-blue-600 font-bold mb-3">Travel Analyst / 旅の検証・記録</p>
                  <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                    北陸を拠点に活動する、こだわり強めの旅好き。<br />
                    「なんとなく」で選んで後悔するのが嫌いで、移動手段やホテルのスペックを徹底的に調べ上げるのが趣味です。<br />
                    ANA Super Flyers Card (SFC) ホルダー。
                  </p>
                  <p className="text-xs text-gray-400">
                    ※当ブログの記事は個人の検証結果に基づくものであり、最新の運行状況やサービス内容は各公式サイトをご確認ください。
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* プロフィールを非表示にする設定を追加 */}
        <Sidebar showProfile={false} />
      </div>
    </main>
  );
}