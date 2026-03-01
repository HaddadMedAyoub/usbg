"use client";
import Image from "next/image";
import Link from "next/link";
import { upcomingMatches, results, lastResult, USBG } from "@/content/data/fixtures";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("ar-TN", {
    day: "numeric", month: "long",
  });
}

const formColors: Record<string, string> = {
  W: "bg-green-500",
  D: "bg-yellow-500",
  L: "bg-red-500",
};

// last 5 results for USBG form
const form = results.slice(0, 5).map((r) => {
  const usbgScore = r.home.name === USBG ? r.homeScore : r.awayScore;
  const oppScore = r.home.name === USBG ? r.awayScore : r.homeScore;
  return usbgScore > oppScore ? "W" : usbgScore < oppScore ? "L" : "D";
});

export default function MatchesSection() {
  return (
    <section className="py-14 px-4 bg-black">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">المباريات</h2>
          <Link href="/matches" className="text-[#F7C600] text-sm font-semibold hover:underline">
            كل المباريات ←
          </Link>
        </div>

        {/* Form strip */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-gray-500 text-xs uppercase tracking-widest">آخر 5 مباريات</span>
          <div className="flex gap-1.5">
            {form.map((f, i) => {
              const result = results[i];
              const opp = result.home.name === USBG ? result.away.name : result.home.name;
              const score = `${result.homeScore}–${result.awayScore}`;
              const label = { W: "فوز", L: "خسارة", D: "تعادل" }[f];
              const tooltip = `${label} ضد ${opp} (${score})`;

              return (
                <span
                  key={i}
                  title={tooltip}
                  className={`w-7 h-7 rounded-md flex items-center justify-center text-white text-[11px] font-black cursor-default ${formColors[f]}`}
                >
                  {f}
                </span>
              );
            })}
          </div>
        </div>


        {/* Next match — big card */}
        {(() => {
          const next = upcomingMatches[0];
          const isCup = next.competition === "cup";
          return (
            <div className={`rounded-2xl border p-6 mb-6 ${isCup ? "border-blue-500/30 bg-blue-500/5" : "border-[#F7C600]/20 bg-[#F7C600]/5"}`}>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  المباراة القادمة
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${isCup ? "text-blue-400" : "text-[#F7C600]"}`}>
                  {isCup ? "كأس تونس" : "الرابطة المحترفة الأولى"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                {/* Home */}
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-14 h-14 relative">
                    <Image src={next.home.logo} alt={next.home.name} fill className="object-contain" unoptimized />
                  </div>
                  <span className={`text-xs font-bold text-center leading-tight ${next.home.name === USBG ? "text-[#F7C600]" : "text-white"}`}>
                    {next.home.name}
                  </span>
                </div>

                {/* VS */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-white font-black text-2xl">VS</span>
                  <span className="text-gray-500 text-xs">{next.time}</span>
                  <span className="text-gray-600 text-[10px] mt-1">{formatDate(next.date)}</span>
                </div>

                {/* Away */}
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-14 h-14 relative">
                    <Image src={next.away.logo} alt={next.away.name} fill className="object-contain" unoptimized />
                  </div>
                  <span className={`text-xs font-bold text-center leading-tight ${next.away.name === USBG ? "text-[#F7C600]" : "text-white"}`}>
                    {next.away.name}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-[10px] text-center mt-4">📍 {next.venue}</p>
            </div>
          );
        })()}

        {/* Upcoming fixtures — clean list */}
        <div className="mb-6">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">المباريات القادمة</p>
          <div className="flex flex-col gap-2">
            {upcomingMatches.slice(1).map((m, i) => {
              const isCup = m.competition === "cup";
              const opp = m.home.name === USBG ? m.away : m.home;
              const isHome = m.home.name === USBG;
              return (
                <div key={i} className="flex items-center justify-between rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 relative shrink-0">
                      <Image src={opp.logo} alt={opp.name} fill className="object-contain" unoptimized />
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold">{opp.name}</p>
                      <p className="text-gray-600 text-[10px]">{isHome ? "홈" : "خارج الديار"}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[10px] font-bold ${isCup ? "text-blue-400" : "text-[#F7C600]/60"}`}>
                      {isCup ? "كأس" : "ر.م.أ"}
                    </span>
                    <span className="text-gray-400 text-xs">{formatDate(m.date)} · {m.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Last result */}
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">آخر نتيجة</p>
          <div className="flex items-center justify-between rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] px-4 py-4">
            <div className="flex flex-col items-center gap-1 flex-1">
              <div className="w-10 h-10 relative">
                <Image src={lastResult.home.logo} alt={lastResult.home.name} fill className="object-contain" unoptimized />
              </div>
              <span className={`text-[10px] font-bold text-center ${lastResult.home.name === USBG ? "text-[#F7C600]" : "text-white"}`}>
                {lastResult.home.name}
              </span>
            </div>
            <div className="flex flex-col items-center px-4">
              <span className="text-white font-black text-2xl tabular-nums">
                {lastResult.homeScore} — {lastResult.awayScore}
              </span>
              <span className="text-gray-600 text-[10px] mt-1">{formatDate(lastResult.date)}</span>
            </div>
            <div className="flex flex-col items-center gap-1 flex-1">
              <div className="w-10 h-10 relative">
                <Image src={lastResult.away.logo} alt={lastResult.away.name} fill className="object-contain" unoptimized />
              </div>
              <span className={`text-[10px] font-bold text-center ${lastResult.away.name === USBG ? "text-[#F7C600]" : "text-white"}`}>
                {lastResult.away.name}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
