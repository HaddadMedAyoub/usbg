import Image from "next/image";
import Link from "next/link";
import Countdown from "@/components/blocks/Countdown";
import AnimatedCounter from "@/components/blocks/AnimatedCounter";
import Confetti from "@/components/blocks/Confetti";
import InstagramShareButton from "@/components/ui/InstagramShareButton";
import WallpaperSlider from "@/components/blocks/WallpaperSlider";

const timeline = [
  {
    year: "1936",
    title: "التأسيس",
    desc: "تأسيس الاتحاد الرياضي ببنقردان في قلب المدينة، ليكون أول نادٍ رياضي في المنطقة.",
    decade: "الثلاثينيات",
    highlight: false,
  },
  {
    year: "1950",
    title: "الملعب البلدي",
    desc: "انطلاق المسيرة من الملعب البلدي القديم وسط المدينة، بين جدران الحجر وعلى أرضية رمل حملت عرق الأجيال.",
    decade: "الخمسينيات",
    highlight: false,
  },
  {
    year: "1970",
    title: "نمو وتوسع",
    desc: "تعاقبت الأجيال وتوسعت قاعدة الجماهير، وأصبح النادي رمزًا للهوية في الجنوب الشرقي التونسي.",
    decade: "السبعينيات",
    highlight: false,
  },
  {
    year: "1990",
    title: "صناعة المواهب",
    desc: "برزت أكاديمية الشبان كمصنع حقيقي للمواهب، مُخرِّجةً لاعبين تألقوا على المستوى الوطني.",
    decade: "التسعينيات",
    highlight: false,
  },
  {
    year: "2000",
    title: "ملعب 07 مارس",
    desc: "الانتقال إلى الملعب الجديد بحي المطار، الذي أُطلق عليه لاحقااسم 07 مارس خلودًا لذكرى ملحمة أهالي بنقردان.",
    decade: "الألفينيات",
    highlight: false,
  },
  {
    year: "2015",
    title: "الصعود إلى القسم الأول",
    desc: "لحظة تاريخية — يُحقق الاتحاد الصعود إلى القسم الأول للمرة الأولى، ليرفع اسم بنقردان على أعلى مستوى.",
    decade: "العقد الثاني",
    highlight: false,
  },
  {
    year: "2026",
    title: "الذكرى التسعون 🎉",
    desc: "نحتفل بتاريخ حافل بالصمود والوفاء. منذ 1936، صار النادي رمز المدينة وفخر الجنوب الشرقي، حيث جمع بين الانتماء، الروح الرياضية، والإصرار على البقاء",
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
        <div className="absolute inset-0 z-[50] pointer-events-none">
          <Confetti />
        </div>

        <div className="absolute inset-0 z-0">
          <Image
            src="/images/extra/bgflouage.jpg"
            alt="بنقردان"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/60" />
        </div>

        <div className="absolute inset-0 pointer-events-none z-[1]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#F7C600]/10 rounded-full blur-[160px]" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]">
          <span
            className="font-black text-transparent select-none"
            style={{
              fontSize: "clamp(12rem, 50vw, 28rem)",
              lineHeight: 1,
              WebkitTextStroke: "2px rgba(247, 198, 0, 0.18)",
            }}
          >
            90
          </span>
        </div>

        <div className="relative z-[10] mb-6">
          <Image
            src="/brand/logo.png"
            alt="USBG"
            width={120}
            height={120}
            className="object-contain drop-shadow-[0_0_80px_rgba(247,198,0,0.5)]"
            priority
          />
        </div>

        <p className="relative z-[10] text-[#F7C600]/70 text-[11px] font-bold tracking-[0.45em] uppercase mb-4">
          1936 — 2026
        </p>

        <h1
          className="relative z-[10] text-white font-black leading-tight mb-3 drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]"
          style={{ fontSize: "clamp(2rem, 9vw, 5rem)" }}
        >
          تسعينيّة
          <br />
          <span className="text-[#F7C600]">الاتّحاد</span>
        </h1>

        <div className="relative z-[10] flex items-center gap-3 mb-10">
          <span className="h-px w-10 bg-[#F7C600]/30" />
          <p className="text-gray-300 text-sm sm:text-base font-semibold drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
            فرسان الحدود — 90 عامًا من العطاء
          </p>
          <span className="h-px w-10 bg-[#F7C600]/30" />
        </div>

        <Link
          href="#countdown"
          className="relative z-[10] px-8 py-3.5 bg-[#F7C600] text-black font-black text-sm rounded-lg shadow-[0_0_40px_rgba(247,198,0,0.35)] hover:bg-white hover:shadow-[0_0_50px_rgba(247,198,0,0.5)] transition-all duration-200"
        >
          اكتشف المسيرة ↓
        </Link>

        <div className="absolute bottom-8 z-[10] flex flex-col items-center gap-2 opacity-30">
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
            { target: 11, suffix: "+", label: "موسمًا في الرابطة الأولى" },
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
          TIMELINE
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
            <div className="absolute right-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#F7C600]/20 to-transparent translate-x-1/2 hidden sm:block" />
            <div className="flex flex-col gap-8">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                >
                  <div className="flex-1">
                    <div
                      className={`p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.01] ${item.highlight
                        ? "bg-[#F7C600]/10 border-[#F7C600]/40 shadow-[0_0_30px_rgba(247,198,0,0.1)]"
                        : "bg-[#0a0a0a] border-[#1f1f1f] hover:border-[#F7C600]/20"
                        }`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full ${item.highlight ? "bg-[#F7C600] text-black" : "bg-[#1a1a1a] text-[#F7C600]"
                          }`}>
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
                  <div className="hidden sm:flex items-center justify-center shrink-0 mt-6">
                    <div className={`w-3 h-3 rounded-full border-2 ${item.highlight
                      ? "bg-[#F7C600] border-[#F7C600] shadow-[0_0_16px_rgba(247,198,0,0.8)]"
                      : "bg-black border-[#F7C600]/30"
                      }`} />
                  </div>
                  <div className="flex-1 hidden sm:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════
    NOSTALGIA PHOTO BREAK
    Full-width atmospheric image
    separating timeline from hall of fame
════════════════════════════ */}
      <section className="relative w-full h-[60vh] sm:h-[75vh] overflow-hidden">
        <Image
          src="/images/extra/nostalgie.png"
          alt="ذكريات الاتحاد الرياضي ببنقردان"
          fill
          className="object-cover object-center"
          unoptimized
        />
        {/* Dark gradient overlays for cinematic feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-transparent" />

        {/* Centered text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <span className="text-[#F7C600]/60 text-[10px] font-bold tracking-[0.5em] uppercase mb-3">
            روح واحدة · أجيال متعاقبة          </span>
          <p className="text-white font-black text-2xl sm:text-4xl leading-snug drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] max-w-xl">
            رجال صنعوا التاريخ
          </p>
          <p className="text-white text-sm mt-3 max-w-sm leading-relaxed">
            أحياء وراحلون، شباب وشيوخ — كتبوا اسم الاتحاد بالعرق والإخلاص
          </p>
          <div className="flex items-center gap-3 mt-5">
            <span className="h-px w-12 bg-[#F7C600]/30" />
            <span className="text-[#F7C600]/50 text-xs font-bold tracking-widest">  1936 — 2026
            </span>
            <span className="h-px w-12 bg-[#F7C600]/30" />
          </div>
        </div>

        {/* Bottom fade into hall of fame (black bg) */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* ════════════════════════════
          HALL OF FAME
     
      <section className="py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.4em] uppercase mb-3">الأبطال</p>
          <h2 className="text-white font-black text-2xl sm:text-3xl mb-10">قاعة المجد</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {legends.map((l, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-[#1f1f1f] bg-[#0a0a0a] hover:border-[#F7C600]/20 transition-colors text-center group"
              >
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
       ════════════════════════════ */}

      {/* ════════════════════════════
        STADIUMS — أرض الأمجاد
          ════════════════════════════ */}

      <section className="py-24 px-4 bg-[#050505] relative overflow-hidden">
        {/* Background grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #F7C600 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#F7C600]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.5em] uppercase mb-3">الملاعب</p>
            <h2 className="text-white font-black text-2xl sm:text-4xl mb-4">أرض الأمجاد</h2>
            <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
              ملعبان، حقبتان، وروح واحدة لا تتغير
            </p>
            <div className="flex items-center justify-center gap-3 mt-5">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#F7C600]/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#F7C600]/40" />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#F7C600]/30" />
            </div>
          </div>

          {/* Stadium cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Card 1 — Municipal Stadium */}
            <div className="group relative rounded-3xl border border-[#1f1f1f] bg-[#0a0a0a] overflow-hidden hover:border-[#F7C600]/20 transition-all duration-500 hover:shadow-[0_0_40px_rgba(247,198,0,0.05)]">
              {/* Top accent line */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#F7C600]/20 to-transparent" />

              {/* Card inner */}
              <div className="p-7">
                {/* Era badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full bg-[#1a1a1a] text-gray-500 border border-[#2a2a2a]">
                    الملعب الأول
                  </span>
                  <span className="text-gray-700 text-xs font-bold">1936 — 2000</span>
                </div>

                {/* Icon with subtle glow */}
                <div className="w-14 h-14 rounded-2xl bg-[#111] border border-[#222] flex items-center justify-center mb-5 group-hover:border-[#F7C600]/20 transition-colors">
                  <span className="text-2xl">🏟️</span>
                </div>

                <h3 className="text-white font-black text-xl mb-3 group-hover:text-[#F7C600]/90 transition-colors duration-300">
                  الملعب البلدي
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  بدأت مسيرة الاتحاد من قلب المدينة، داخل أسوار الملعب البلدي القديم، بين جدران الحجر وعلى أرضية رمل حملت حبيباتها عرق وذكريات من مرّوا بالمكان.
                </p>

                {/* Stats row */}
                <div className="flex gap-4 pt-5 border-t border-[#1a1a1a]">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[#F7C600]/50 text-[10px] font-bold uppercase tracking-widest">الموقع</span>
                    <span className="text-gray-400 text-xs font-semibold">وسط المدينة</span>
                  </div>
                  <div className="w-px bg-[#1f1f1f]" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[#F7C600]/50 text-[10px] font-bold uppercase tracking-widest">الحقبة</span>
                    <span className="text-gray-400 text-xs font-semibold">التأسيس والنشأة</span>
                  </div>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#1f1f1f] to-transparent" />
            </div>

            {/* Card 2 — Stade 07 Mars (highlighted) */}
            <div className="group relative rounded-3xl border border-[#F7C600]/25 overflow-hidden hover:border-[#F7C600]/40 transition-all duration-500 hover:shadow-[0_0_60px_rgba(247,198,0,0.12)]">

              {/* Background photo */}
              <div className="absolute inset-0">
                <Image
                  src="/images/extra/stadium7mars.jpeg"
                  alt="ملعب 07 مارس"
                  fill
                  className="object-cover object-center scale-[1.02] group-hover:scale-[1.06] transition-transform duration-700"
                  unoptimized
                  priority={false}
                />
              </div>

              {/* 🔧 Slightly darker overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/65 to-black/90" />
              <div className="absolute inset-0 bg-[#F7C600]/10 mix-blend-overlay opacity-40" />

              {/* Top gold accent line */}
              <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[#F7C600]/70 to-transparent" />

              {/* 🔧 Removed live badge — label already in era badge below */}

              {/* Content */}
              <div className="relative p-7 pt-8">
                <div className="flex items-center justify-between mb-6">
                  {/* 🔧 Single badge with pulse dot */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/45 border border-[#F7C600]/25 backdrop-blur">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F7C600] animate-pulse" />
                    <span className="text-[10px] font-black tracking-widest uppercase text-[#F7C600]">
                      الملعب الرسمي
                    </span>
                  </div>
                  <span className="text-[#F7C600]/70 text-xs font-bold">2000 — اليوم</span>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-black/45 border border-[#F7C600]/25 flex items-center justify-center mb-5 backdrop-blur">
                  <span className="text-2xl">🏟️</span>
                </div>

                <h3 className="text-[#F7C600] font-black text-xl mb-3">ملعب 07 مارس</h3>

                <p className="text-gray-200/80 text-sm leading-relaxed mb-6">
                  الملعب الرسمي لفئة الأكابر — أُطلق عليه هذا الاسم خلودًا لذكرى ملحمة 07 مارس 2016، المعركة التي انتصر فيها أهالي بنقردان وكتبت تاريخًا مشرفًا في معاني الصمود.
                </p>

                <div className="flex gap-4 pt-5 border-t border-[#F7C600]/15">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[#F7C600]/70 text-[10px] font-bold uppercase tracking-widest">الموقع</span>
                    <span className="text-gray-100/80 text-xs font-semibold">حي المطار</span>
                  </div>
                  <div className="w-px bg-[#F7C600]/15" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[#F7C600]/70 text-[10px] font-bold uppercase tracking-widest">التسمية</span>
                    <span className="text-gray-100/80 text-xs font-semibold">ملحمة 07 مارس 2016</span>
                  </div>
                </div>
              </div>

              <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[#F7C600]/25 to-transparent" />
            </div>



          </div>
        </div>
      </section>


      {/* ════════════════════════════
    WALLPAPER DOWNLOADS
════════════════════════════ */}
<WallpaperSlider wallpapers={wallpapers} />



{/* ════════════════════════════
    CLOSING QUOTE + SHARE
════════════════════════════ */}
<section className="py-20 px-4 bg-[#F7C600] relative overflow-hidden">
  {/* Dot texture */}
  <div className="absolute inset-0 opacity-[0.05]"
    style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

  {/* Ambient dark glow bottom */}
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-black/10 blur-[80px] rounded-full pointer-events-none" />

  <div className="relative max-w-xl mx-auto text-center z-10">

    {/* Logo */}
    <Image src="/brand/logo.png" alt="USBG" width={64} height={64}
      className="object-contain mx-auto mb-6 drop-shadow-lg" />

    {/* Divider */}
    <div className="flex items-center justify-center gap-3 mb-6">
      <span className="h-px w-12 bg-black/15" />
      <span className="text-black/30 text-[10px] font-bold tracking-[0.4em] uppercase">1936 — 2026</span>
      <span className="h-px w-12 bg-black/15" />
    </div>

    {/* Quote */}
    <blockquote className="text-black font-black text-xl sm:text-2xl leading-relaxed mb-2 tracking-tight">
      "أصفر وأسود، تاريخ يتجدد،
      <br />
      وطموح لا يتوقف"
    </blockquote>
    <p className="text-black/40 text-xs font-semibold mb-10">الاتحاد الرياضي ببنقردان</p>

    {/* Share block */}
    <div className="bg-black/8 border border-black/10 rounded-2xl px-6 py-5 flex flex-col items-center gap-4">
      <p className="text-black/60 text-xs font-bold uppercase tracking-widest">شارك الاحتفال</p>

      <div className="flex gap-2 justify-center flex-wrap">
        {/* Facebook — official blue */}
        <a
          href="https://www.facebook.com/sharer/sharer.php?u=https://usbenguerdane.tn/anniversary"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#1877F2] text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-[#1565D8] transition-colors shadow-sm"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
          </svg>
          فيسبوك
        </a>

        {/* Instagram */}
        <InstagramShareButton />

        {/* About */}
        <Link href="/about"
          className="flex items-center gap-2 bg-black/12 text-black font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-black/20 transition-colors border border-black/10">
          اقرأ قصتنا ←
        </Link>
      </div>

      <p className="text-black/30 text-[10px]">انسخ الرابط والصقه في قصتك على إنستغرام 📲</p>
    </div>

  </div>
</section>


    </div>
  );
}
