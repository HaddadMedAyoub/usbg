"use client";
import { useState } from "react";
import Image from "next/image";
import galleryData from "@/content/gallery.json";

const categories = ["الكل", "فريق", "ملعب", "تدريب", "تاريخ"];

export default function GalleryGrid() {
  const [active, setActive] = useState("الكل");
  const [lightbox, setLightbox] = useState<null | { src: string; caption: string }>(null);

  const filtered =
    active === "الكل"
      ? galleryData.photos
      : galleryData.photos.filter((p) => p.category === active);

  return (
    <>
      {/* ── Filter tabs ── */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-xs font-black tracking-wide transition-all duration-200 border ${
              active === cat
                ? "bg-[#F7C600] text-black border-[#F7C600] shadow-[0_0_20px_rgba(247,198,0,0.3)]"
                : "bg-transparent text-gray-500 border-[#2a2a2a] hover:border-[#F7C600]/40 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Grid ── */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
        {filtered.map((photo, i) => (
          <div
            key={i}
            onClick={() => setLightbox({ src: photo.src, caption: photo.caption })}
            className="relative group break-inside-avoid rounded-xl overflow-hidden border border-[#1f1f1f] cursor-zoom-in"
          >
            <div className="relative w-full">
              <Image
                src={photo.src}
                alt={photo.caption}
                width={600}
                height={400}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-end p-3">
              <p className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                {photo.caption}
              </p>
              <span className="mt-2 text-[#F7C600] text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-widest uppercase">
                {photo.category}
              </span>
            </div>

            {/* Zoom icon */}
            <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* ── Empty state ── */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <span className="text-5xl">📷</span>
          <p className="text-gray-600 text-sm">لا توجد صور في هذا القسم بعد</p>
        </div>
      )}

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-5 left-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={() => setLightbox(null)}
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative max-w-4xl w-full max-h-[80dvh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.caption}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[80dvh] object-contain rounded-xl"
              unoptimized
            />
          </div>

          {/* Caption */}
          <div className="mt-4 text-center" onClick={(e) => e.stopPropagation()}>
            <p className="text-white font-bold text-sm">{lightbox.caption}</p>
          </div>
        </div>
      )}
    </>
  );
}
