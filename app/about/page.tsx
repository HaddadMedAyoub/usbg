import Image from "next/image";
import Link from "next/link";
import AnimatedCounter from "@/components/blocks/AnimatedCounter";

const goals = [
  {
    icon: "⚽",
    title: "تطوير كرة القدم",
    desc: "تطوير كرة القدم بمختلف أصنافها وفئاتها العمرية",
    num: "4",
    numLabel: "فئات عمرية",
  },
  {
    icon: "🌟",
    title: "صناعة المواهب",
    desc: "الاستثمار في تكوين الشبان وصناعة أبطال المستقبل",
    num: "90",
    numLabel: "عامًا من التكوين",
  },
  {
    icon: "🏆",
    title: "الحضور الوطني",
    desc: "تعزيز حضور النادي وسمعته على الصعيدين الوطني والدولي",
    num: "#1",
    numLabel: "نادي الجنوب الشرقي",
  },
  {
    icon: "🤝",
    title: "المجتمع والمدينة",
    desc: "المساهمة الفاعلة في الحياة الثقافية والاجتماعية لمدينة بنقردان",
    num: "1",
    numLabel: "مدينة، هوية واحدة",
  },
];

const values = [
  {
    label: "الانضباط",
    en: "Discipline",
    icon: "⚡",
    desc: "الالتزام بالقيم والمبادئ داخل الملعب وخارجه",
  },
  {
    label: "التضامن",
    en: "Solidarity",
    icon: "🤝",
    desc: "الوقوف معًا في وجه التحديات، فريقًا وجماهير وإدارة",
  },
  {
    label: "روح الفريق",
    en: "Team Spirit",
    icon: "🔥",
    desc: "الإيمان بأن النجاح الجماعي أعظم من كل بطولة فردية",
  },
];

const colors = [
  { color: "#F7C600", name: "الأصفر", meaning: "العزيمة والقوة والطموح" },
  { color: "#0a0a0a", name: "الأسود", meaning: "الصمود والهيبة والعمق" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">

      {/* ════════════════════════════
          HERO
      ════════════════════════════ */}
      <section className="relative min-h-[75dvh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-black">

        {/* Background glow layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#F7C600]/6 rounded-full blur-[130px]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#F7C600]/3 rounded-full blur-[100px]" />
        </div>

        {/* Ghost text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span
            className="font-black text-transparent select-none whitespace-nowrap"
            style={{
              fontSize: "clamp(5rem, 22vw, 16rem)",
              WebkitTextStroke: "1px rgba(247,198,0,0.05)",
            }}
          >
            USBG
          </span>
        </div>

        {/* Logo */}
        <div className="relative z-10 mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-[#F7C600]/20 rounded-full blur-2xl scale-150" />
            <Image
              src="/brand/logo.png"
              alt="USBG"
              width={110}
              height={110}
              className="relative object-contain drop-shadow-[0_0_60px_rgba(247,198,0,0.4)]"
              priority
            />
          </div>
        </div>

        <p className="relative z-10 text-[#F7C600]/50 text-[11px] font-bold tracking-[0.5em] uppercase mb-4">
          USBG · منذ 1936
        </p>

        <h1
          className="relative z-10 text-white font-black leading-[1.1] mb-5"
          style={{ fontSize: "clamp(2.5rem, 10vw, 5.5rem)" }}
        >
          من
          <span className="text-[#F7C600]"> نحن</span>
        </h1>

        <div className="relative z-10 flex items-center gap-4 mb-6">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#F7C600]/50" />
          <p className="text-gray-300 font-bold text-base sm:text-lg tracking-wide">
            الاتحاد الرياضي ببنقردان
          </p>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#F7C600]/50" />
        </div>

        <p className="relative z-10 text-gray-600 text-sm sm:text-base max-w-md leading-relaxed">
          روح مدينة، وصوت الجنوب الشرقي، ونبض جماهير آمنت بأن الرياضة رسالة وانتماء
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 z-10 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#F7C600]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#F7C600] animate-bounce" />
        </div>
      </section>

      {/* ════════════════════════════
          BIG OPENING QUOTE
      ════════════════════════════ */}
      <section className="py-20 px-4 bg-[#050505]">
        <div className="max-w-3xl mx-auto">

          {/* Quote mark */}
          <div className="text-[#F7C600]/20 font-black text-[8rem] leading-none select-none mb-[-2rem]">"</div>

          <div className="border-r-4 border-[#F7C600] pr-8">
            <p className="text-white text-xl sm:text-2xl font-black leading-[1.8] mb-8">
              الاتحاد الرياضي ببنقردان هو أكثر من مجرد نادٍ لكرة القدم؛
              <span className="text-[#F7C600]"> هو روح مدينة</span>،
              وصوت الجنوب الشرقي، ونبض جماهير آمنت بأن الرياضة
              <span className="text-[#F7C600]"> رسالة وانتماء</span>
              {" "}قبل أن تكون نتائج وألقاب.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F7C600]/10 border border-[#F7C600]/30 flex items-center justify-center shrink-0">
                <Image src="/brand/logo.png" alt="USBG" width={24} height={24} className="object-contain" />
              </div>
              <div>
                <p className="text-white text-sm font-bold">الاتحاد الرياضي ببنقردان</p>
                <p className="text-gray-600 text-xs">تأسس سنة 1936 · فرسان الحدود</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          ANIMATED STATS
      ════════════════════════════ */}
      <section className="py-16 px-4 bg-[#F7C600] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { target: 90, suffix: "", label: "عامًا من العطاء" },
            { target: 1936, suffix: "", label: "سنة التأسيس" },
            { target: 1, suffix: "#", label: "نادي الجنوب الشرقي" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-black font-black leading-none" style={{ fontSize: "clamp(2rem, 8vw, 4rem)" }}>
                {stat.suffix === "#" ? "#" : ""}
                <AnimatedCounter target={stat.target} />
                {stat.suffix !== "#" ? stat.suffix : ""}
              </span>
              <span className="text-black/55 text-xs sm:text-sm font-semibold">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════
          STORY
      ════════════════════════════ */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <div>
            <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.4em] uppercase mb-4">
              قصتنا
            </p>
            <h2 className="text-white font-black text-2xl sm:text-3xl mb-8 leading-tight">
              من قلب بنقردان،
              <br />
              <span className="text-[#F7C600]">بوابة تونس نحو إفريقيا</span>
            </h2>
            <div className="flex flex-col gap-6 text-gray-400 text-sm sm:text-base leading-[2]">
              <p>
                نشأ الاتحاد ليكون فضاءً لصقل المواهب، ومدرسةً للقيم:
                <span className="text-white font-semibold"> الانضباط، التضامن، وروح الفريق.</span>
              </p>
              <p>
                تعاقبت الأجيال، وتغيّرت الظروف، لكن بقيت هوية النادي ثابتة —
                نادٍ شعبي قريب من جمهوره، يدافع عن ألوانه بشرف، ويؤمن بأن
                <span className="text-[#F7C600] font-semibold"> الطموح لا تحدّه الجغرافيا.</span>
              </p>
              <p>
                إن الاتحاد الرياضي ببنقردان ليس مجرد فريق في بطولة، بل هو قصة
                مدينة صنعت من الرياضة هوية، ومن التحديات قوة، ومن الجماهير
                <span className="text-white font-semibold"> سندًا لا ينكسر.</span>
              </p>
            </div>
          </div>

          {/* Right — visual card */}
          <div className="flex flex-col gap-4">
            {/* Club info card */}
            <div className="rounded-2xl border border-[#1f1f1f] bg-[#0a0a0a] p-6">
              <p className="text-[#F7C600] text-[10px] font-bold tracking-widest uppercase mb-5">بطاقة النادي</p>
              <div className="flex flex-col gap-4">
                {[
                  { label: "الاسم الرسمي", value: "الاتحاد الرياضي ببنقردان" },
                  { label: "الاختصار", value: "USBG" },
                  { label: "سنة التأسيس", value: "1936" },
                  { label: "المدينة", value: "بنقردان، ولاية مدنين" },
                  { label: "الملعب", value: "ملعب 07 مارس" },
                  { label: "الألوان", value: "أصفر وأسود" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between border-b border-[#151515] pb-3 last:border-0 last:pb-0">
                    <span className="text-gray-600 text-xs">{row.label}</span>
                    <span className="text-white text-sm font-bold">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          COLORS SECTION
      ════════════════════════════ */}
      <section className="py-16 px-4 bg-[#050505]">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.4em] uppercase mb-3 text-center">
            هويتنا البصرية
          </p>
          <h2 className="text-white font-black text-2xl sm:text-3xl mb-10 text-center">
            أصفر وأسود
          </h2>
          <div className="grid grid-cols-2 gap-5 max-w-xl mx-auto">
            {colors.map((c) => (
              <div key={c.name} className="rounded-2xl overflow-hidden border border-[#1f1f1f]">
                <div className="h-24 w-full" style={{ backgroundColor: c.color }} />
                <div className="bg-[#0a0a0a] p-4">
                  <p className="text-white font-black text-base mb-1">{c.name}</p>
                  <p className="text-gray-600 text-xs leading-relaxed">{c.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          VALUES
      ════════════════════════════ */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.4em] uppercase mb-3 text-center">
            ما نؤمن به
          </p>
          <h2 className="text-white font-black text-2xl sm:text-3xl mb-12 text-center">
            قيمنا
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <div
                key={i}
                className="relative flex flex-col gap-5 p-7 rounded-2xl border border-[#1f1f1f] bg-[#0a0a0a] hover:border-[#F7C600]/30 transition-all duration-300 hover:bg-[#F7C600]/[0.03] group overflow-hidden"
              >
                {/* Background number */}
                <span className="absolute bottom-3 left-4 text-[5rem] font-black text-[#F7C600]/[0.04] leading-none select-none group-hover:text-[#F7C600]/[0.07] transition-colors">
                  {i + 1}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#F7C600]/10 border border-[#F7C600]/20 flex items-center justify-center text-2xl group-hover:bg-[#F7C600]/20 transition-colors">
                  {v.icon}
                </div>

                <div>
                  <p className="text-white font-black text-lg mb-1">{v.label}</p>
                  <p className="text-[#F7C600]/50 text-[10px] tracking-widest uppercase mb-3">{v.en}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          GOALS
      ════════════════════════════ */}
      <section className="py-20 px-4 bg-[#050505]">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.4em] uppercase mb-3">
            ما نسعى إليه
          </p>
          <h2 className="text-white font-black text-2xl sm:text-3xl mb-12">
            أهدافنا
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {goals.map((goal, i) => (
              <div
                key={i}
                className="relative flex items-start gap-5 p-6 rounded-2xl border border-[#1f1f1f] bg-[#0a0a0a] hover:border-[#F7C600]/25 transition-all duration-300 group overflow-hidden"
              >
                {/* Ghost number */}
                <span className="absolute bottom-2 left-4 text-[4rem] font-black text-white/[0.02] leading-none select-none">
                  0{i + 1}
                </span>

                {/* Icon box */}
                <div className="w-14 h-14 rounded-xl bg-[#F7C600]/10 border border-[#F7C600]/20 flex flex-col items-center justify-center shrink-0 group-hover:bg-[#F7C600]/20 transition-colors gap-0.5">
                  <span className="text-xl">{goal.icon}</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white font-black text-base">{goal.title}</p>
                    <span className="text-[#F7C600] font-black text-lg">{goal.num}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{goal.desc}</p>
                  <p className="text-[#F7C600]/40 text-[10px] font-semibold mt-2">{goal.numLabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          CLOSING QUOTE
      ════════════════════════════ */}
      <section className="py-24 px-4 bg-[#F7C600] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Ghost USBG */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span
            className="font-black text-transparent select-none"
            style={{
              fontSize: "clamp(8rem, 30vw, 20rem)",
              WebkitTextStroke: "1px rgba(0,0,0,0.06)",
            }}
          >
            90
          </span>
        </div>

        <div className="relative max-w-2xl mx-auto text-center z-10">
          <Image
            src="/brand/logo.png"
            alt="USBG"
            width={70}
            height={70}
            className="object-contain mx-auto mb-8 drop-shadow-lg"
          />
          <p className="text-black font-black leading-tight mb-4" style={{ fontSize: "clamp(1.8rem, 6vw, 3rem)" }}>
            "أصفر وأسود —
            <br />
            تاريخ يتجدد
            <br />
            وطموح لا يتوقف"
          </p>
          <p className="text-black/40 text-xs font-bold tracking-[0.4em] uppercase mb-10">
            USBG · 1936 — 2026
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/anniversary"
              className="bg-black text-[#F7C600] font-black text-sm px-7 py-3.5 rounded-lg hover:bg-[#111] transition-colors shadow-lg"
            >
              🎉 تسعينية الاتحاد
            </Link>
            <Link
              href="/team"
              className="bg-black/10 border border-black/15 text-black font-black text-sm px-7 py-3.5 rounded-lg hover:bg-black/20 transition-colors"
            >
              الفريق
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
