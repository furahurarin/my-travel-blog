// src/components/TopSlider.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/libs/microcms";

type Props = {
  contents: Blog[];
};

export const TopSlider = ({ contents }: Props) => {
  if (contents.length === 0) return null;

  return (
    <div className="mb-12 relative group">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        pagination={{ 
          clickable: true,
          bulletClass: 'swiper-pagination-bullet bg-white opacity-50',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-white !opacity-100'
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-xl"
      >
        {contents.map((post) => (
          <SwiperSlide key={post.id} className="relative w-full h-full">
            <Link href={`/blog/${post.category?.id}/${post.id}`} className="block w-full h-full relative">
              
              {/* 背景画像 */}
              <div className="absolute inset-0">
                <Image
                  src={post.eyecatch?.url ?? "/no-image.png"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {/* グラデーションオーバーレイ */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>

              {/* テキストコンテンツ */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 text-white z-10">
                <div className="max-w-3xl">
                  {post.category && (
                    <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 shadow-sm">
                      {post.category.name}
                    </span>
                  )}
                  <h2 className="text-2xl sm:text-4xl font-bold leading-tight mb-3 drop-shadow-md">
                    {post.title}
                  </h2>
                  <div className="mt-3 text-sm text-gray-200 font-medium flex items-center gap-2">
                    {/* ▼▼▼ 修正: publishedAt が undefined の場合は createdAt を使用 ▼▼▼ */}
                    <time>{new Date(post.publishedAt || post.createdAt).toLocaleDateString("ja-JP")}</time>
                    <span>|</span>
                    <span>詳細を見る →</span>
                  </div>
                </div>
              </div>

            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* カスタムCSS用スタイル（ページネーション位置調整など） */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 24px !important;
          text-align: right !important;
          padding-right: 32px;
        }
      `}</style>
    </div>
  );
};