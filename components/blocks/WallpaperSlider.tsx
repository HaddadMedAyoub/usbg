"use client";
import { useRef, useState } from "react";
import Image from "next/image";

export default function WallpaperSlider({ wallpapers }: { wallpapers: { file: string; label: string }[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 260 : -260, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  return (
    <section className="py-20 px-4 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle, #F7C600 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.5em] uppercase mb-2">هدية للجماهير</p>
            <h2 className="text-white font-black text-2xl sm:text-3xl">خلفيات الذكرى التسعين</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll("right")} disabled={!canScrollRight}
              className="w-9 h-9 rounded-full border border-[#F7C600]/20 bg-[#0a0a0a] flex items-center justify-center text-[#F7C600] hover:bg-[#F7C600] hover:text-black transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={() => scroll("left")} disabled={!canScrollLeft}
              className="w-9 h-9 rounded-full border border-[#F7C600]/20 bg-[#0a0a0a] flex items-center justify-center text-[#F7C600] hover:bg-[#F7C600] hover:text-black transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        <div ref={scrollRef} onScroll={onScroll}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}>
          {wallpapers.map((w, i) => (
            <div key={i} className="group flex-shrink-0 flex flex-col gap-2" style={{ scrollSnapAlign: "start", width: "clamp(180px, 40vw, 220px)" }}>
              <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-[#1f1f1f] bg-[#0a0a0a] group-hover:border-[#F7C600]/30 transition-all duration-300">
                <Image src={w.file} alt={w.label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/60 backdrop-blur rounded-full p-3 border border-[#F7C600]/30">
                    <svg className="w-5 h-5 text-[#F7C600]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </div>
                </div>

              </div>
              <a href={w.file} download className="flex items-center justify-center gap-1.5 py-2 rounded-xl border border-[#F7C600]/15 text-[#F7C600]/80 text-[11px] font-black hover:bg-[#F7C600] hover:text-black hover:border-[#F7C600] transition-all duration-200">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                تحميل
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
