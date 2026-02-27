import GalleryGrid from "@/components/blocks/GalleryGrid";
import Link from "next/link";

export default function MediaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">

      {/* ── Hero ── */}
      <section className="relative py-24 px-4 flex flex-col items-center justify-center text-center overflow-hidden bg-black">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#F7C600]/6 rounded-full blur-[120px]" />
        </div>

        {/* Ghost text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span
            className="font-black text-transparent select-none"
            style={{
              fontSize: "clamp(5rem, 25vw, 16rem)",
              WebkitTextStroke: "1px rgba(247,198,0,0.04)",
            }}
          >
            MEDIA
          </span>
        </div>

        <p className="relative z-10 text-[#F7C600]/60 text-[11px] font-bold tracking-[0.4em] uppercase mb-4">
          USBG · معرض الصور
        </p>
        <h1
          className="relative z-10 text-white font-black leading-tight mb-4"
          style={{ fontSize: "clamp(2rem, 8vw, 4rem)" }}
        >
          الوسائط
        </h1>
        <div className="relative z-10 flex items-center gap-3 mb-4">
          <span className="h-px w-12 bg-[#F7C600]/40" />
          <p className="text-[#F7C600] font-bold text-sm sm:text-base">
            صور وذكريات من مسيرة الاتحاد
          </p>
          <span className="h-px w-12 bg-[#F7C600]/40" />
        </div>
        <p className="relative z-10 text-gray-600 text-sm max-w-sm">
          أرشيف بصري يوثّق رحلة فرسان الحدود عبر المواسم والمناسبات
        </p>
      </section>

      {/* ── Facebook CTA ── */}
      <div className="bg-[#050505] border-y border-[#111] py-4 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <p className="text-gray-500 text-sm">
            تابع المزيد من الصور والفيديوهات على صفحتنا الرسمية
          </p>
          <a
            href="https://www.facebook.com/UnionSportiveBenGuerdane"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white text-xs font-black rounded-lg hover:bg-[#1464d8] transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
            Facebook · UnionSportiveBenGuerdane
          </a>
        </div>
      </div>

      {/* ── Gallery ── */}
      <section className="py-14 px-4 bg-black flex-1">
        <div className="max-w-6xl mx-auto">
          <GalleryGrid />
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-12 px-4 bg-[#050505] border-t border-[#111]">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-gray-600 text-sm mb-4">
            هل لديك صور من مباريات أو فعاليات النادي؟
          </p>
          <Link
            href="/contact"
            className="inline-block px-7 py-3 bg-[#F7C600] text-black font-black text-sm rounded-lg hover:bg-white transition-colors"
          >
            أرسلها لنا
          </Link>
        </div>
      </section>

    </div>
  );
}
