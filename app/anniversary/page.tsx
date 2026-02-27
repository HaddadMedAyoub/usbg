import Image from "next/image";
import Link from "next/link";
import Countdown from "@/components/blocks/Countdown";
import AnimatedCounter from "@/components/blocks/AnimatedCounter";
import Confetti from "@/components/blocks/Confetti";

const timeline = [
  {
    year: "1936",
    title: "التأسيس",
    desc: "تأسيس الاتحاد الرياضي ببنقردان في قلب المدينة، ليكون أول نادٍ رياضي في المنطقة.",
    decade: "الثلاثينيات",
    highlight: false,
  },
  {
    year: "1950s",
    title: "الملعب البلدي",
    desc: "انطلاق المسيرة من الملعب البلدي القديم وسط المدينة، بين جدران الحجر وعلى أرضية رمل حملت عرق الأجيال.",
    decade: "الخمسينيات",
    highlight: false,
  },
  {
    year: "1970s",
    title: "نمو وتوسع",
    desc: "تعاقبت الأجيال وتوسعت قاعدة الجماهير، وأصبح النادي رمزًا للهوية في الجنوب الشرقي التونسي.",
    decade: "السبعينيات",
    highlight: false,
  },
  {
    year: "1990s",
    title: "صناعة المواهب",
    desc: "برزت أكاديمية الشبان كمصنع حقيقي للمواهب، مُخرِّجةً لاعبين تألقوا على المستوى الوطني.",
    decade: "التسعينيات",
    highlight: false,
  },
  {
    year: "2016",
    title: "ملحمة 07 مارس",
    desc: "الانتقال إلى الملعب الجديد بحي المطار، الذي أُطلق عليه اسم 07 مارس خلودًا لذكرى ملحمة أهالي بنقردان.",
    decade: "العقد الثاني",
    highlight: false,
  },
  {
    year: "2026",
    title: "الذكرى التسعون 🎉",
    desc: "تسعون عامًا من العطاء — فرسان الحدود يواصلون المسيرة بعزم وطموح لا يتوقف.",
    decade: "اليوم",
    highlight: true,
  },
];

const legends = [
  { name: "أسطورة النادي", role: "مهاجم · الجيل الذهبي", years: "1970–1985" },
  { name: "فارس الحدود", role: "حارس مرمى · قائد الفريق", years: "1985–1998" },
  { name: "صانع الألقاب", role: "وسط · أفضل لاعب في التاريخ", years: "1992–2005" },
  { name: "درع الجنوب", role: "مدافع · الأكثر ولاءً", years: "1998–2012" },
];

const wallpapers = [
  { file: "/downloads/wallpaper1.png", label: "خلفية 1" },
  { file: "/downloads/wallpaper2.png", label: "خلفية 2" },
  { file: "/downloads/wallpaper3.png", label: "خلفية 3" },
  { file: "/downloads/wallpaper4.png", label: "خلفية 4" },
];

export default function AnniversaryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">

      {/* ════════════════════════════
          HERO
      ════════════════════════════ */}
      <section className="relative min-h-[95dvh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-black">
        <Confetti />

        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#F7C600]/8 rounded-full blur-[160px]" />
        </div>

        {/* Ghost 90 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <span
            className="font-black text-transparent select-none"
            style={{
              fontSize: "clamp(12rem, 50vw, 28rem)",
              lineHeight: 1,
              WebkitTextStroke: "1px rgba(247,198,0,0.06)",
            }}
          >
            90
          </span>
        </div>

        {/* Logo */}
        <div className="relative z-10 mb-6">
          <Image
            src="/brand/logo.png"
            alt="USBG"
            width={120}
            height={120}
            className="object-contain drop-shadow-[0_0_80px_rgba(247,198,0,0.5)]"
            priority
          />
        </div>

        {/* Label */}
        <p className="relative z-10 text-[#F7C600]/60 text-[11px] font-bold tracking-[0.45em] uppercase mb-4">
          1936 — 2026
        </p>

        {/* Title */}
        <h1
          className="relative z-10 text-white font-black leading-tight mb-3"
          style={{ fontSize: "clamp(2rem, 9vw, 5rem)" }}
        >
          تسعينية
          <br />
          <span className="text-[#F7C600]">الاتحاد</span>
        </h1>

        {/* Tagline */}
        <div className="relative z-10 flex items-center gap-3 mb-10">
          <span className="h-px w-10 bg-[#F7C600]/30" />
          <p className="text-gray-400 text-sm sm:text-base font-semibold">
            فرسان الحدود — 90 عامًا من العطاء
          </p>
          <span className="h-px w-10 bg-[#F7C600]/30" />
        </div>

        {/* Scroll CTA */}
        <Link
          href="#countdown"
          className="relative z-10 px-8 py-3.5 bg-[#F7C600] text-black font-black text-sm rounded-lg shadow-[0_0_40px_rgba(247,198,0,0.35)] hover:bg-white hover:shadow-[0_0_50px_rgba(247,198,0,0.5)] transition-all duration-200"
        >
          اكتشف المسيرة ↓
        </Link>

        {/* Scroll line */}
        <div className="absolute bottom-8 z-10 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#F7C600]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#F7C600] animate-bounce" />
        </div>
      </section>

      {/* ════════════════════════════
          COUNTDOWN
      ════════════════════════════ */}
      <div id="countdown">
        <Countdown />
      </div>

      {/* ════════════════════════════
          ANIMATED STATS
      ════════════════════════════ */}
      <section className="py-16 px-4 bg-[#F7C600]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { target: 90, suffix: "", label: "عامًا من التاريخ" },
            { target: 1936, suffix: "", label: "سنة التأسيس" },
            { target: 11, suffix: "+", label: "جيلًا متعاقبًا" },
            { target: 7, suffix: "/03", label: "ملحمة بنقردان" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-black font-black leading-none" style={{ fontSize: "clamp(2.2rem, 8vw, 3.5rem)" }}>
                <AnimatedCounter target={s.target} suffix={s.suffix} />
              </span>
              <span className="text-black/55 text-xs sm:text-sm font-semibold">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════
          TIMELINE — DECADE CARDS
      ════════════════════════════ */}
      <section className="py-20 px-4 bg-[#050505]">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.4em] uppercase mb-3 text-center">
            المسيرة عبر الزمن
          </p>
          <h2 className="text-white font-black text-2xl sm:text-3xl mb-16 text-center">
            90 عامًا من التاريخ
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute right-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#F7C600]/20 to-transparent translate-x-1/2 hidden sm:block" />

            <div className="flex flex-col gap-8">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6 ${
                    i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Card */}
                  <div className="flex-1">
                    <div
                      className={`p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.01] ${
                        item.highlight
                          ? "bg-[#F7C600]/10 border-[#F7C600]/40 shadow-[0_0_30px_rgba(247,198,0,0.1)]"
                          : "bg-[#0a0a0a] border-[#1f1f1f] hover:border-[#F7C600]/20"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full ${item.highlight ? "bg-[#F7C600] text-black" : "bg-[#1a1a1a] text-[#F7C600]"}`}>
                          {item.year}
                        </span>
                        <span className="text-gray-700 text-[10px]">{item.decade}</span>
                      </div>
                      <h3 className={`font-black text-base mb-2 ${item.highlight ? "text-[#F7C600]" : "text-white"}`}>
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="hidden sm:flex items-center justify-center shrink-0 mt-6">
                    <div className={`w-3 h-3 rounded-full border-2 ${item.highlight ? "bg-[#F7C600] border-[#F7C600] shadow-[0_0_16px_rgba(247,198,0,0.8)]" : "bg-black border-[#F7C600]/30"}`} />
                  </div>

                  {/* Empty side */}
                  <div className="flex-1 hidden sm:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          HALL OF FAME
      ════════════════════════════ */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.4em] uppercase mb-3">
            الأبطال
          </p>
          <h2 className="text-white font-black text-2xl sm:text-3xl mb-10">
            قاعة المجد
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {legends.map((l, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-[#1f1f1f] bg-[#0a0a0a] hover:border-[#F7C600]/20 transition-colors text-center group"
              >
                {/* Avatar placeholder */}
                <div className="w-16 h-16 rounded-full bg-[#F7C600]/10 border-2 border-[#F7C600]/20 flex items-center justify-center group-hover:border-[#F7C600]/40 transition-colors">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <p className="text-white font-black text-sm">{l.name}</p>
                  <p className="text-gray-600 text-[11px] mt-0.5">{l.role}</p>
                  <p className="text-[#F7C600]/60 text-[10px] mt-1 font-semibold">{l.years}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-700 text-xs text-center mt-6">
            * أضف أسماء الأساطير الحقيقية لاحقًا في ملف الصفحة
          </p>
        </div>
      </section>

      {/* ════════════════════════════
          STADIUMS
      ════════════════════════════ */}
      <section className="py-16 px-4 bg-[#050505]">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.4em] uppercase mb-3">
            الملاعب
          </p>
          <h2 className="text-white font-black text-2xl sm:text-3xl mb-10">
            أرض الكفاح
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-[#1f1f1f] bg-[#0a0a0a] p-6 hover:border-[#F7C600]/20 transition-colors">
              <span className="text-3xl mb-4 block">🏟️</span>
              <p className="text-gray-600 text-[10px] font-bold tracking-widest uppercase mb-2">الملعب الأول</p>
              <h3 className="text-white font-black text-lg mb-3">الملعب البلدي</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                بدأت مسيرة الاتحاد من قلب المدينة، داخل أسوار الملعب البلدي القديم، بين جدران الحجر وعلى أرضية رمل حملت حبيباتها عرق وذكريات من مرّوا بالمكان.
              </p>
            </div>
            <div className="rounded-2xl border border-[#F7C600]/20 bg-[#F7C600]/5 p-6">
              <span className="text-3xl mb-4 block">🏟️</span>
              <p className="text-[#F7C600]/60 text-[10px] font-bold tracking-widest uppercase mb-2">الملعب الرسمي الحالي</p>
              <h3 className="text-[#F7C600] font-black text-lg mb-3">ملعب 07 مارس</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                الملعب الرسمي لفئة الأكابر — أُطلق عليه هذا الاسم خلودًا لذكرى ملحمة 07 مارس 2016، المعركة التي انتصر فيها أهالي بنقردان وكتبت تاريخًا مشرفًا في معاني الصمود.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          WALLPAPER DOWNLOADS
      ════════════════════════════ */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.4em] uppercase mb-3">
            هدية للجماهير
          </p>
          <h2 className="text-white font-black text-2xl sm:text-3xl mb-3">
            خلفيات الذكرى التسعين
          </h2>
          <p className="text-gray-600 text-sm mb-10">
            حمّل خلفيات حصرية بمناسبة الذكرى التسعين للاتحاد الرياضي ببنقردان
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {wallpapers.map((w, i) => (
              <div key={i} className="group flex flex-col gap-3">
                {/* Preview */}
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-[#1f1f1f] bg-[#0a0a0a] group-hover:border-[#F7C600]/30 transition-colors">
                  <Image
                    src={w.file}
                    alt={w.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                </div>

                {/* Download button */}
                <a
                  href={w.file}
                  download
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F7C600]/10 border border-[#F7C600]/20 text-[#F7C600] text-xs font-black hover:bg-[#F7C600] hover:text-black transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {w.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          MESSAGE / CLOSING QUOTE
      ════════════════════════════ */}
      <section className="py-24 px-4 bg-[#F7C600] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative max-w-2xl mx-auto text-center z-10">
          <Image
            src="/brand/logo.png"
            alt="USBG"
            width={80}
            height={80}
            className="object-contain mx-auto mb-8 drop-shadow-lg"
          />

          {/* Big quote */}
          <p className="text-black font-black text-2xl sm:text-3xl leading-relaxed mb-6">
            "أصفر وأسود —
            <br />
            تاريخ يتجدد
            <br />
            وطموح لا يتوقف"
          </p>
          <p className="text-black/40 text-xs font-bold tracking-[0.4em] uppercase mb-10">
            الاتحاد الرياضي ببنقردان · 1936 — 2026
          </p>

          {/* Share */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-black/60 text-sm font-semibold">شارك الاحتفال مع الجماهير</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=https://usbenguerdane.tn/anniversary`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-black text-white font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-[#111] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
                فيسبوك
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=الاتحاد الرياضي ببنقردان يحتفل بالذكرى التسعين 🎉 فرسان الحدود منذ 1936&url=https://usbenguerdane.tn/anniversary`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-black text-white font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-[#111] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
                تويتر
              </a>
              <Link
                href="/about"
                className="flex items-center gap-2 bg-black/10 text-black font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-black/20 transition-colors border border-black/15"
              >
                اقرأ قصتنا
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
