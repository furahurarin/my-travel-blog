"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Blog } from "@/libs/microcms";

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
        loop={true}
        speed={1000}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          // PC画面では、少し次のスライドが見えるようにして「続きがある感」を出す
          768: {
            slidesPerView: 1.2,
            spaceBetween: 30,
            centeredSlides: true,
          },
        }}
        className="w-full h-[300px] md:h-[450px] rounded-2xl shadow-card overflow-hidden"
      >
        {contents.map((post) => (
          <SwiperSlide key={post.id} className="relative w-full h-full bg-gray-100">
            <Link href={`/blog/${post.category?.id}/${post.id}`} className="block w-full h-full group/slide">
              {/* 背景画像 */}
              <Image
                src={post.eyecatch?.url ?? "/no-image.png"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover/slide:scale-105"
                priority
              />
              {/* 画像の上に文字を乗せるためのグラデーション */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* 記事タイトル・情報 */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 text-white">
                <span className="inline-block bg-brand-600 text-xs font-bold px-2 py-1 rounded mb-3 shadow-md">
                  {post.category?.name}
                </span>
                <h2 className="text-xl md:text-3xl font-bold leading-tight drop-shadow-md line-clamp-2 md:line-clamp-none">
                  {post.title}
                </h2>
                <div className="mt-3 text-sm text-gray-200 font-medium flex items-center gap-2">
                   {/* ▼▼▼ 修正: "ja-JP" を指定 ▼▼▼ */}
                   <time>{new Date(post.publishedAt).toLocaleDateString("ja-JP")}</time>
                   <span>|</span>
                   <span>詳細を見る →</span>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}

        {/* 矢印ナビゲーション */}
        <div className="swiper-button-prev !text-white !hidden md:!flex after:!text-2xl hover:bg-black/30 w-12 h-12 rounded-full transition-all" />
        <div className="swiper-button-next !text-white !hidden md:!flex after:!text-2xl hover:bg-black/30 w-12 h-12 rounded-full transition-all" />
      </Swiper>
    </div>
  );
};