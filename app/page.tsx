import Image from "next/image";
import Link from "next/link";
import Countdown from "@/components/blocks/Countdown";
import newsData from "@/content/news.json";
import matchesData from "@/content/matches.json";
import StandingsTable from "@/components/blocks/StandingsTable";
import MatchesSection from "@/components/MatchesSection";
import { getAllNews } from "@/lib/content";
import LineupSection from '@/components/blocks/LineupSection'
import ArticlesSlider from "@/components/blocks/ArticlesSlider";
import WeatherStrip from "@/components/blocks/WeatherBadge";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ar-TN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
}

export default function HomePage() {
  const latestNews = getAllNews().slice(0, 3);
  const upcomingMatch = matchesData.find((m) => m.status === "upcoming");
  const lastResult = matchesData.find((m) => m.status === "finished");

  return (
    <div className="flex flex-col">

      {/* ════════════════════════════════
    HERO
       ════════════════════════════════ */}
      <section className="relative min-h-[95dvh] flex flex-col items-center justify-center text-center px-4 bg-black overflow-hidden">

        {/* Background radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#F7C600]/6 rounded-full blur-[140px]" />
        </div>

        {/* Logo */}
        <div className="relative mb-8 z-10">
          <Image
            src="/brand/logo.png"
            alt="USBG"
            width={140}
            height={140}
            className="object-contain drop-shadow-[0_0_80px_rgba(247,198,0,0.3)]"
            priority
          />
        </div>

        {/* Top label */}
        <p className="z-10 text-[#F7C600]/60 text-[11px] font-bold tracking-[0.45em] uppercase mb-5">
          USBG · 1936 — 2026
        </p>

        {/* Main title */}
        <h1 className="z-10 text-white font-black leading-[1.15] mb-4" style={{ fontSize: "clamp(2.2rem, 9vw, 5rem)" }}>
          الاتحاد الرياضي
          <br />
          <span className="text-[#F7C600]">ببنقردان</span>
        </h1>

        {/* Subtitle */}
        <div className="z-10 flex items-center gap-3 mb-10">
          <span className="h-px w-8 bg-[#F7C600]/40" />
          <p className="text-gray-400 text-base sm:text-lg font-semibold tracking-wide">
            فرسان الحدود &mdash; 90 عامًا من المجد
          </p>
          <span className="h-px w-8 bg-[#F7C600]/40" />
        </div>

        {/* CTAs */}
        <div className="z-10 flex flex-wrap gap-3 justify-center">
          <Link
            href="/anniversary"
            className="px-8 py-3.5 bg-[#F7C600] text-black font-black text-sm rounded-lg hover:bg-white transition-all duration-200 shadow-[0_0_30px_rgba(247,198,0,0.25)] hover:shadow-[0_0_40px_rgba(247,198,0,0.5)] tracking-wide"
          >
            🎉 تسعينية الاتحاد
          </Link>
          <Link
            href="/about"
            className="px-8 py-3.5 bg-transparent border border-white/15 text-white font-semibold text-sm rounded-lg hover:border-white/40 hover:bg-white/5 transition-all duration-200 tracking-wide"
          >
            من نحن
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 z-10 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#F7C600]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#F7C600] animate-bounce" />
        </div>
      </section>

      <WeatherStrip />
        
      {/* ═══ COUNTDOWN ═══ */}
      <Countdown />

      {/* ═══ MATCHES ═══ */}
      <MatchesSection />

      {/* ═══ LINEUP ═══ */}
      {/* <LineupSection /> */}
      
      <StandingsTable />

      {/* ═══ NEWS ═══ */}
      <ArticlesSlider />



      {/* ═══ ABOUT STRIP ═══ */}
      <section className="py-14 px-4 bg-[#F7C600]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-black text-3xl font-black mb-4">أصفر وأسود منذ 1936</h2>
          <p className="text-black/70 text-base leading-relaxed mb-6">
            الاتحاد الرياضي ببنقردان — روح مدينة، وصوت الجنوب الشرقي، ونبض جماهير آمنت بأن الرياضة رسالة وانتماء.
          </p>
          <Link href="/about" className="bg-black text-[#F7C600] font-black px-8 py-3 rounded-md hover:bg-[#111] transition-colors inline-block">
            اقرأ قصتنا
          </Link>
        </div>
      </section>

    </div>
  );
}
