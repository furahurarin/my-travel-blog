"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/libs/microcms";

type Props = {
  contents: Blog[];
};

export const TopSlider = ({ contents }: Props) => {
  if (!contents || contents.length === 0) return null;

  return (
    <div className="w-full mb-12 relative group">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="rounded-2xl overflow-hidden shadow-2xl"
      >
        {contents.map((post, index) => (
          <SwiperSlide key={post.id}>
            <div className="relative w-full h-[400px] md:h-[500px]">
              <Link href={`/blog/${post.category?.id}/${post.id}`} className="block w-full h-full relative">
                <Image
                  src={post.eyecatch?.url ?? "/no-image.png"}
                  alt={post.title}
                  fill
                  // ▼ 修正: LCP対策。1枚目だけ優先読み込み(priority)、sizesで適切なサイズ指定
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-cover"
                />
                {/* グラデーションオーバーレイ */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white z-10">
                  <span className="inline-block px-3 py-1 mb-3 text-xs font-bold bg-brand-600 rounded-full">
                    {post.category?.name}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-2 drop-shadow-md">
                    {post.title}
                  </h2>
                  <div className="mt-3 text-sm text-gray-200 font-medium flex items-center gap-2">
                    <time>{new Date(post.publishedAt || post.createdAt).toLocaleDateString("ja-JP")}</time>
                    <span>|</span>
                    <span>詳細を見る →</span>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* カスタムスタイル: ページネーションの色などを調整する場合 */}
      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background-color: #2563eb !important;
        }
        .swiper-button-next, .swiper-button-prev {
          color: white !important;
          text-shadow: 0 1px 3px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
};