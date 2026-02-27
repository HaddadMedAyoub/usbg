import Image from "next/image";
import Link from "next/link";
import Countdown from "@/components/blocks/Countdown";
import StandingsTable from "@/components/blocks/StandingsTable";
import matchesData from "@/content/matches.json";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ar-TN", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function HomePage() {
  const upcomingMatches = matchesData.filter((m) => m.status === "upcoming").slice(0, 3);
  const recentResults = matchesData.filter((m) => m.status === "finished").slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">

      {/* ════════════════════════════════
          HERO
      ════════════════════════════════ */}
      <section className="relative min-h-[95dvh] flex flex-col items-center justify-center text-center px-4 bg-black overflow-hidden">

        {/* Background radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F7C600]/5 rounded-full blur-[120px]" />
        </div>

        {/* Logo */}
        <div className="relative mb-8 z-10">
          <Image
            src="/brand/logo.png"
            alt="USBG"
            width={130}
            height={130}
            className="object-contain drop-shadow-[0_0_60px_rgba(247,198,0,0.25)]"
            priority
          />
        </div>

        {/* Tagline */}
        <p className="z-10 text-[#F7C600]/70 text-xs font-bold tracking-[0.4em] uppercase mb-4">
          فرسان الحدود · منذ ١٩٣٦
        </p>

        {/* Title */}
        <h1 className="z-10 text-white font-black leading-[1.1] mb-3" style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)" }}>
          الاتحاد الرياضي
          <br />
          <span className="text-[#F7C600]">ببنقردان</span>
        </h1>

        <p className="z-10 text-gray-500 text-sm sm:text-base max-w-sm mb-10 leading-relaxed">
          ٩٠ عامًا من العطاء — تاريخ يتجدد وطموح لا يتوقف
        </p>

        {/* CTAs */}
        <div className="z-10 flex flex-wrap gap-3 justify-center">
          <Link
            href="/anniversary"
            className="px-7 py-3 bg-[#F7C600] text-black font-black text-sm rounded-lg hover:bg-white transition-all duration-200 shadow-[0_0_30px_rgba(247,198,0,0.3)]"
          >
            🎉 الذكرى التسعون
          </Link>
          <Link
            href="/about"
            className="px-7 py-3 bg-transparent border border-white/20 text-white font-semibold text-sm rounded-lg hover:border-white/50 hover:bg-white/5 transition-all duration-200"
          >
            من نحن
          </Link>
        </div>

        {/* Scroll arrow */}
        <div className="absolute bottom-8 z-10 flex flex-col items-center gap-2">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#F7C600]/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#F7C600]/40 animate-bounce" />
        </div>
      </section>

      {/* ════════════════════════════════
          COUNTDOWN
      ════════════════════════════════ */}
      <Countdown />

      {/* ════════════════════════════════
          MATCHES — NEXT FIXTURES
      ════════════════════════════════ */}
      <section className="py-16 px-4 bg-[#050505]">
        <div className="max-w-4xl mx-auto">

          {/* Section header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[#F7C600] text-[10px] font-bold tracking-[0.3em] uppercase mb-1">الجدول</p>
              <h2 className="text-white text-2xl font-black">المباريات القادمة</h2>
            </div>
            <Link href="/matches" className="text-gray-500 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1">
              كل المباريات
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {upcomingMatches.map((match, i) => (
              <div
                key={match.id}
                className={`rounded-xl border border-[#1f1f1f] bg-[#0d0d0d] p-5 flex items-center gap-4 ${
                  i === 0 ? "border-[#F7C600]/20 bg-[#F7C600]/[0.03]" : ""
                }`}
              >
                {/* Next badge */}
                {i === 0 && (
                  <span className="hidden sm:block text-[10px] font-black text-[#F7C600] bg-[#F7C600]/10 px-2.5 py-1 rounded-md tracking-wider shrink-0">
                    القادمة
                  </span>
                )}

                {/* Home team */}
                <div className="flex items-center gap-2 flex-1 justify-end">
                  <span className="text-white font-bold text-sm text-left">{match.home.name}</span>
                  <div className="relative w-8 h-8 shrink-0">
                    <Image src={match.home.logo} alt={match.home.name} fill className="object-contain" unoptimized />
                  </div>
                </div>

                {/* VS + date */}
                <div className="flex flex-col items-center shrink-0 min-w-[80px]">
                  <span className="text-[#F7C600] font-black text-base">VS</span>
                  <span className="text-gray-600 text-[10px] mt-0.5">{match.time}</span>
                  <span className="text-gray-700 text-[9px]">{formatDate(match.date)}</span>
                </div>

                {/* Away team */}
                <div className="flex items-center gap-2 flex-1">
                  <div className="relative w-8 h-8 shrink-0">
                    <Image src={match.away.logo} alt={match.away.name} fill className="object-contain" unoptimized />
                  </div>
                  <span className="text-white font-bold text-sm">{match.away.name}</span>
                </div>

                {/* Competition */}
                <span className="hidden md:block text-gray-700 text-[10px] font-semibold shrink-0 text-left max-w-[80px] text-center">
                  {match.competition}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          RECENT RESULTS
      ════════════════════════════════ */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <p className="text-[#F7C600] text-[10px] font-bold tracking-[0.3em] uppercase mb-1">النتائج</p>
            <h2 className="text-white text-2xl font-black">آخر المباريات</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recentResults.map((match) => {
              const usbgIsHome = match.home.name.includes("بنقردان");
              const usbgScore = usbgIsHome ? match.homeScore : match.awayScore;
              const oppScore = usbgIsHome ? match.awayScore : match.homeScore;
              const result =
                usbgScore! > oppScore! ? "W" : usbgScore! < oppScore! ? "L" : "D";

              return (
                <div
                  key={match.id}
                  className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-4"
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-700 text-[10px] font-semibold">{match.competition}</span>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded ${
                        result === "W"
                          ? "bg-green-500/15 text-green-400"
                          : result === "L"
                          ? "bg-red-500/15 text-red-400"
                          : "bg-gray-500/15 text-gray-400"
                      }`}
                    >
                      {result === "W" ? "فوز" : result === "L" ? "خسارة" : "تعادل"}
                    </span>
                  </div>

                  {/* Score row */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 flex-1 justify-end">
                      <span className={`font-bold text-xs ${usbgIsHome ? "text-[#F7C600]" : "text-gray-400"}`}>
                        {match.home.name}
                      </span>
                      <div className="relative w-7 h-7 shrink-0">
                        <Image src={match.home.logo} alt={match.home.name} fill className="object-contain" unoptimized />
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className={`text-xl font-black ${usbgIsHome ? "text-white" : "text-gray-500"}`}>
                        {match.homeScore}
                      </span>
                      <span className="text-gray-700 font-bold">—</span>
                      <span className={`text-xl font-black ${!usbgIsHome ? "text-white" : "text-gray-500"}`}>
                        {match.awayScore}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-1">
                      <div className="relative w-7 h-7 shrink-0">
                        <Image src={match.away.logo} alt={match.away.name} fill className="object-contain" unoptimized />
                      </div>
                      <span className={`font-bold text-xs ${!usbgIsHome ? "text-[#F7C600]" : "text-gray-400"}`}>
                        {match.away.name}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 text-[10px] text-center mt-3">{formatDate(match.date)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          STANDINGS
      ════════════════════════════════ */}
      <StandingsTable />

      {/* ════════════════════════════════
          ABOUT STRIP
      ════════════════════════════════ */}
      <section className="py-20 px-4 bg-[#F7C600] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />
        <div className="relative max-w-2xl mx-auto text-center z-10">
          <p className="text-black/50 text-xs font-bold tracking-[0.3em] uppercase mb-3">قصتنا</p>
          <h2 className="text-black font-black text-3xl sm:text-4xl mb-5 leading-tight">
            أصفر وأسود منذ ١٩٣٦
          </h2>
          <p className="text-black/70 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto">
            من قلب بنقردان، بوابة تونس نحو إفريقيا — نشأ الاتحاد ليكون فضاءً لصقل المواهب ومدرسةً للقيم.
          </p>
          <Link
            href="/about"
            className="inline-block bg-black text-[#F7C600] font-black text-sm px-8 py-3.5 rounded-lg hover:bg-[#111] transition-colors"
          >
            اقرأ قصتنا الكاملة
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════
          SPONSOR
      ════════════════════════════════ */}
      <section className="py-10 px-4 bg-[#050505] border-t border-[#111]">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <p className="text-gray-700 text-[10px] font-bold tracking-[0.35em] uppercase">الراعي الرسمي</p>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-1">
              <span className="text-white font-black text-lg tracking-widest">CMAF</span>
              <span className="text-gray-600 text-[11px] text-center">شركة العطاء للنقل الطبي</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
