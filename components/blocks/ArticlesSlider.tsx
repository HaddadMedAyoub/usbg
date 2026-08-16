// components/ArticlesSlider.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/articles";
import { getArticles } from "@/lib/articles";

function formatDate(value?: string | null) {
  if (!value) return "";
  const d = new Date(value);
  return isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("ar-TN", { year: "numeric", month: "long", day: "numeric" });
}

export default function ArticlesSlider() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getArticles(); // Supabase
        setArticles(data.slice(0, 12));
      } catch (e) {
        console.error("Error loading articles", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const slide = (direction: "left" | "right") => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cardWidth = slider.clientWidth * 0.7;
    const amount = direction === "left" ? -cardWidth : cardWidth;
    slider.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (loading) {
    return (
      <section className="py-10 px-4 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title mb-4">آخر الأخبار</h2>
          <p className="text-gray-500 text-sm text-center py-6">
            جاري تحميل الأخبار...
          </p>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section className="py-10 px-4 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title mb-4">آخر الأخبار</h2>
          <p className="text-gray-500 text-sm text-center py-6">
            لا توجد أخبار بعد.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 px-4 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">آخر الأخبار</h2>
          <Link
            href="/news"
            className="text-[#F7C600] text-sm font-semibold hover:underline"
          >
            كل الأخبار ←
          </Link>
        </div>

        <div className="relative">
          {/* Left arrow */}
          <button
            type="button"
            onClick={() => slide("left")}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-black/70 border border-[#333] text-white hover:bg-black/90"
          >
            ‹
          </button>

          {/* Right arrow */}
          <button
            type="button"
            onClick={() => slide("right")}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-black/70 border border-[#333] text-white hover:bg-black/90"
          >
            ›
          </button>

          {/* Slider */}
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 px-1
                       scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent"
          >
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={{
                  pathname: "/news/article",
                  query: { slug: article.slug },
                }}
                className="snap-start flex-none w-72 sm:w-80 md:w-96 bg-[#111] border border-[#1f1f1f]
                           rounded-2xl overflow-hidden group hover:border-[#F7C600] transition-colors duration-200"
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/3] bg-[#222]">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title_ar}
                      fill
                      sizes="(max-width: 768px) 80vw, 30vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[#F7C600] text-3xl font-black opacity-30">
                        US
                      </span>
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="p-4">
                  {article.published_at && (
                    <p className="text-gray-500 text-[11px] mb-1">
                      {formatDate(article.published_at)}
                    </p>
                  )}
                  <h3 className="text-white font-bold text-sm leading-snug mb-1 line-clamp-2 group-hover:text-[#F7C600] transition-colors">
                    {article.title_ar}
                  </h3>
                  {article.content_ar && (
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                      {article.content_ar}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
