import Link from "next/link";
import Image from "next/image";

type Props = {
  isDetail?: boolean; // Aboutページのような詳細表示ならtrue
};

export const UserProfile = ({ isDetail = false }: Props) => {
  return (
    <div className={`flex ${isDetail ? "flex-col sm:flex-row items-start gap-6 p-6 bg-gray-50/50 rounded-xl border border-gray-100" : "flex-col items-center gap-4"}`}>
      
      {/* 画像エリア */}
      <div className={`relative shrink-0 overflow-hidden rounded-full border border-gray-100 bg-white shadow-sm ${isDetail ? "w-24 h-24" : "w-20 h-20"}`}>
        <Image
          src="/profile.png"
          alt="運営者プロフィール"
          fill
          className="object-cover"
          sizes={isDetail ? "96px" : "80px"}
        />
      </div>

      <div className={isDetail ? "flex-1" : "text-center"}>
        <div className={isDetail ? "mb-4" : "mb-3"}>
          <p className="font-bold text-gray-900 text-lg">ふらふら旅行記</p>
          <p className="text-xs text-blue-600 font-bold mt-1">Travel Analyst / 旅の検証・記録</p>
        </div>

        <div className={`text-sm text-gray-600 leading-relaxed text-justify ${isDetail ? "mb-4" : "mb-4"}`}>
          <p className="mb-2">
            「100円の安さ」よりも、「1時間の快適さ」を大切にしたい。
          </p>
          <p>
            北陸を拠点に、移動と宿のスペックを徹底的に調べ上げるのが趣味です。
            感覚だけでなく、時間・費用・疲労度といった「根拠」のある旅ログを残します。
          </p>
          {isDetail && (
             <div className="mt-4 space-y-2">
               <p>ANA Super Flyers Card (SFC) ホルダー。</p>
               {/* ▼▼▼ 復元: 免責事項 ▼▼▼ */}
               <p className="text-xs text-gray-400 border-t border-gray-200 pt-2 mt-2">
                 ※当ブログの記事は個人の検証結果に基づくものであり、最新の運行状況やサービス内容は各公式サイトをご確認ください。
               </p>
             </div>
          )}
        </div>

        {/* 詳細モード(About)以外の場合のみ、リンクを表示 */}
        {!isDetail && (
          <Link href="/about" className="text-xs font-bold text-blue-600 hover:underline inline-block">
            詳しいプロフィール →
          </Link>
        )}
      </div>
    </div>
  );
};