import Image from "next/image";
import Link from "next/link";
import Countdown from "@/components/blocks/Countdown";
import newsData from "@/content/news.json";
import matchesData from "@/content/matches.json";
import StandingsTable from "@/components/blocks/StandingsTable";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ar-TN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
}

export default function HomePage() {
  const latestNews = newsData.slice(0, 3);
  const upcomingMatch = matchesData.find((m) => m.status === "upcoming");
  const lastResult = matchesData.find((m) => m.status === "finished");

  return (
    <div className="flex flex-col">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[92dvh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-black">
        {/* Diagonal yellow stripe decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-[600px] bg-[#F7C600] opacity-5 rotate-12 rounded-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-[600px] bg-[#F7C600] opacity-5 rotate-12 rounded-3xl" />
        </div>

        {/* Logo */}
        <div className="relative mb-6 drop-shadow-[0_0_40px_rgba(247,198,0,0.4)]">
          <Image
            src="/brand/logo.png"
            alt="شعار الاتحاد"
            width={140}
            height={140}
            className="object-contain"
            priority
          />
        </div>

        {/* Title */}
        <p className="text-[#F7C600] text-sm font-bold tracking-[0.3em] uppercase mb-3">
          منذ ١٩٣٦
        </p>
        <h1 className="text-white text-4xl sm:text-6xl font-black leading-tight mb-4">
          الاتحاد الرياضي<br />
          <span className="text-[#F7C600]">ببنقردان</span>
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-md mb-8">
          أصفر وأسود — تاريخ يتجدد وطموح لا يتوقف
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/anniversary" className="btn-primary text-sm">
            🎉 الذكرى التسعون
          </Link>
          <Link href="/about" className="btn-outline text-sm">
            من نحن
          </Link>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 flex flex-col items-center gap-1 animate-bounce">
          <span className="text-gray-600 text-xs">اكتشف أكثر</span>
          <svg className="w-4 h-4 text-[#F7C600]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ═══ COUNTDOWN ═══ */}
      <Countdown />

      {/* ═══ MATCHES ═══ */}
      <section className="py-14 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title">المباريات</h2>
            <Link href="/matches" className="text-[#F7C600] text-sm font-semibold hover:underline">
              كل المباريات ←
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Upcoming Match */}
            {upcomingMatch && (
              <div className="card-dark p-6 rounded-xl border border-[#F7C600]/20">
                <p className="text-[#F7C600] text-xs font-bold mb-4 uppercase tracking-wider">
                  المباراة القادمة · {upcomingMatch.competition}
                </p>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <Image src={upcomingMatch.home.logo} alt={upcomingMatch.home.name} width={48} height={48} />
                    <span className="text-white text-xs font-bold text-center">{upcomingMatch.home.name}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[#F7C600] text-2xl font-black">VS</span>
                    <span className="text-gray-500 text-xs mt-1">{upcomingMatch.time}</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <Image src={upcomingMatch.away.logo} alt={upcomingMatch.away.name} width={48} height={48} />
                    <span className="text-white text-xs font-bold text-center">{upcomingMatch.away.name}</span>
                  </div>
                </div>
                <p className="text-gray-500 text-xs text-center mt-4">
                  📅 {formatDate(upcomingMatch.date)} · 📍 {upcomingMatch.venue}
                </p>
              </div>
            )}

            {/* Last Result */}
            {lastResult && (
              <div className="card-dark p-6 rounded-xl">
                <p className="text-gray-400 text-xs font-bold mb-4 uppercase tracking-wider">
                  آخر نتيجة · {lastResult.competition}
                </p>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <Image src={lastResult.home.logo} alt={lastResult.home.name} width={48} height={48} />
                    <span className="text-white text-xs font-bold text-center">{lastResult.home.name}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-white text-3xl font-black">
                      {lastResult.homeScore} — {lastResult.awayScore}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <Image src={lastResult.away.logo} alt={lastResult.away.name} width={48} height={48} />
                    <span className="text-white text-xs font-bold text-center">{lastResult.away.name}</span>
                  </div>
                </div>
                <p className="text-gray-500 text-xs text-center mt-4">
                  📅 {formatDate(lastResult.date)}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <StandingsTable />

      {/* ═══ NEWS ═══ */}
      <section className="py-14 px-4 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title">آخر الأخبار</h2>
            <Link href="/news" className="text-[#F7C600] text-sm font-semibold hover:underline">
              كل الأخبار ←
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {latestNews.map((article) => (
              <Link key={article.id} href={`/news/${article.slug}`} className="card-dark rounded-xl overflow-hidden group hover:border-[#F7C600] transition-colors">
                <div className="relative h-44 bg-[#222]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="text-gray-500 text-xs mb-2">{formatDate(article.date)}</p>
                  <h3 className="text-white font-bold text-sm leading-snug mb-2 group-hover:text-[#F7C600] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
