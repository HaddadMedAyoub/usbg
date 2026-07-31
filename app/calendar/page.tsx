import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الرزنامة | USBG",
  description: "رزنامة مباريات الاتحاد الرياضي ببنقردان — الموسم 2025/2026",
};

// Logos we have for this season's opponents (Arabic name -> file).
const LOGOS: Record<string, string> = {
  "الأولمبي الباجي": "/images/teams/olympique-beja.png",
  "النادي الرياضي الصفاقسي": "/images/teams/sfaxien.gif",
  "الاتحاد الرياضي المنستيري": "/images/teams/usm-monastir.png",
  "النادي الأفريقي": "/images/teams/club-africain.gif",
  "الملعب التونسي": "/images/teams/stade-tunisien.png",
  "الترجي الرياضي الجرجيسي": "/images/teams/zarzis.png",
  "النجم الرياضي بالمتلوي": "/images/teams/metlaoui.png",
  "النادي الرياضي البنزرتي": "/images/teams/bizertin.png",
  "الترجي الرياضي التونسي": "/images/teams/esperance.png",
  "النجم الرياضي الساحلي": "/images/teams/etoile-sahel.png",
  "الشبيبة الرياضية بالعمران": "/images/teams/js-omrane.png",
  "المستقبل الرياضي بالمرسى": "/images/teams/as-marsa.png",
};

// First leg (rounds 1–15). The return leg (16–30) is the same fixtures with the
// venue flipped, so it's generated automatically below.
// home: true = داخل القواعد, false = خارج القواعد.
const FIRST_LEG: { opponent: string; home: boolean }[] = [
  { opponent: "النادي الرياضي بحمام الأنف", home: true },
  { opponent: "الأولمبي الباجي", home: false },
  { opponent: "النادي الرياضي الصفاقسي", home: true },
  { opponent: "الاتحاد الرياضي المنستيري", home: false },
  { opponent: "النادي الأفريقي", home: true },
  { opponent: "الأمل الرياضي بحمام سوسة", home: false },
  { opponent: "الملعب التونسي", home: true },
  { opponent: "الترجي الرياضي الجرجيسي", home: false },
  { opponent: "النجم الرياضي بالمتلوي", home: false },
  { opponent: "النادي الرياضي البنزرتي", home: true },
  { opponent: "التقدم الرياضي بساقية الدائر", home: false },
  { opponent: "الترجي الرياضي التونسي", home: true },
  { opponent: "النجم الرياضي الساحلي", home: false },
  { opponent: "الشبيبة الرياضية بالعمران", home: true },
  { opponent: "المستقبل الرياضي بالمرسى", home: false },
];

type Fixture = { round: number; opponent: string; home: boolean };

const fixtures: Fixture[] = [
  ...FIRST_LEG.map((f, i) => ({ round: i + 1, opponent: f.opponent, home: f.home })),
  ...FIRST_LEG.map((f, i) => ({ round: i + 16, opponent: f.opponent, home: !f.home })),
];

function FixtureRow({ f }: { f: Fixture }) {
  const logo = LOGOS[f.opponent];
  const jr = "J" + String(f.round).padStart(2, "0");
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors ${
        f.home
          ? "border-[#F7C600]/30 bg-[#F7C600]/[0.06] hover:bg-[#F7C600]/[0.1]"
          : "border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#2a2a2a]"
      }`}
    >
      <span className="w-9 shrink-0 text-[11px] font-black tracking-wider text-[#F7C600]/70">{jr}</span>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#222] bg-[#111]">
        {logo ? (
          <img src={logo} alt={f.opponent} className="h-full w-full object-contain p-0.5" />
        ) : (
          <span className="text-[11px] font-black text-gray-400">{f.opponent.replace(/^ال/, "").charAt(0)}</span>
        )}
      </div>
      <span className="flex-1 truncate text-sm font-bold text-white">{f.opponent}</span>
      <span
        className={`shrink-0 rounded-full px-2.5 py-0.5 text-[9px] font-black ${
          f.home ? "bg-[#F7C600] text-black" : "border border-[#333] text-gray-500"
        }`}
      >
        {f.home ? "داخل" : "خارج"}
      </span>
    </div>
  );
}

export default function CalendarPage() {
  const first = fixtures.slice(0, 15);
  const second = fixtures.slice(15);

  return (
    <div className="min-h-screen bg-black px-4 py-14" dir="rtl">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-3 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#F7C600]/40" />
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#F7C600]/60">USBG · 2025/2026</p>
          <span className="h-px w-8 bg-[#F7C600]/40" />
        </div>
        <h1 className="text-center text-4xl font-black text-white sm:text-5xl">
          الرزنامة
        </h1>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <span className="flex items-center gap-2 text-xs font-bold text-gray-300">
            <span className="h-3 w-3 rounded bg-[#F7C600]" /> داخل القواعد
          </span>
          <span className="flex items-center gap-2 text-xs font-bold text-gray-300">
            <span className="h-3 w-3 rounded border border-[#333] bg-[#0a0a0a]" /> خارج القواعد
          </span>
        </div>

        {/* Two legs */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <p className="mb-4 text-center text-sm font-black text-[#F7C600]">مرحلة الذهاب</p>
            <div className="flex flex-col gap-2">
              {first.map((f) => <FixtureRow key={f.round} f={f} />)}
            </div>
          </div>
          <div>
            <p className="mb-4 text-center text-sm font-black text-[#F7C600]">مرحلة الإياب</p>
            <div className="flex flex-col gap-2">
              {second.map((f) => <FixtureRow key={f.round} f={f} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
