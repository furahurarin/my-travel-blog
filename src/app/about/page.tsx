import { Sidebar } from "@/components/Sidebar";
import { Breadcrumb } from "@/components/Breadcrumb";
import Image from "next/image"; // 画像用にインポートを追加
import type { Metadata } from "next";

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
            
            {/* コンセプトセクション */}
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

            {/* 運営者プロフィールセクション（画像の修正を含む） */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-3">
                運営者について
              </h2>
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                {/* ▼▼▼ 画像修正箇所: アスペクト比と位置ズレを防ぐ設定 ▼▼▼ */}
                <div className="relative w-32 h-32 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-md bg-white">
                  <Image
                    src="/profile.png" // 拡張子をpngに修正
                    alt="ふらふら旅行記・運営者"
                    fill
                    className="object-cover object-center" // 画像を枠いっぱいに広げ、中心を合わせる
                    sizes="(max-width: 640px) 128px, 128px"
                    priority
                  />
                </div>
                {/* ▲▲▲ 修正ここまで ▲▲▲ */}

                <div className="flex-1 text-center sm:text-left">
                  <p className="font-bold text-lg text-gray-900 mb-1">ふらふら旅行記</p>
                  <p className="text-sm text-blue-600 font-bold mb-3">Travel Analyst / 旅の検証</p>
                  <p className="text-gray-600 text-sm leading-relaxed text-justify">
                    北陸拠点。移動と宿を中心に、旅の満足度を上げる方法を数字と条件で検証しています。
                    ただの感想だけでなく、時間・費用・疲労などの「判断材料」を残すのが方針です。
                    失敗しないホテル選びや、損をしないマイルの使い方も発信中。
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* サイドバー（プロフィールはメインコンテンツにあるので非表示） */}
        <Sidebar showProfile={false} />
      </div>
    </main>
  );
}