import { squad } from "@/content/data/squad";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const positionLabel: Record<string, string> = {
  GK:  "حارس مرمى",
  DEF: "مدافع",
  MID: "وسط",
  FWD: "مهاجم",
};

const positionBadge: Record<string, string> = {
  GK:  "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  DEF: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  MID: "bg-green-500/10 text-green-400 border-green-500/20",
  FWD: "bg-red-500/10 text-red-400 border-red-500/20",
};

const positionDot: Record<string, string> = {
  GK:  "bg-yellow-400",
  DEF: "bg-blue-400",
  MID: "bg-green-400",
  FWD: "bg-red-400",
};

export function generateStaticParams() {
  return squad.map((p) => ({ slug: p.slug }));
}

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {  
  const { slug } = await params;
  const player = squad.find((p) => p.slug === slug);
  if (!player) return notFound();

  const stats = [
    { label: "مباراة",       value: player.apps },
    { label: "دقيقة",        value: player.minutes },
    { label: "هدف",          value: player.goals },
    { label: "تمريرة حاسمة", value: player.assists },
    { label: "بطاقة صفراء",  value: player.yellowCards },
    { label: "بطاقة حمراء",  value: player.redCards },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-24">

      {/* ── Back ── */}
      <div className="px-4 pt-6 max-w-4xl mx-auto">
        <Link
          href="/team"
          className="inline-flex items-center gap-2 text-gray-500 text-sm hover:text-white transition"
        >
          → العودة إلى التشكيلة
        </Link>
      </div>

      {/* ── Hero ── */}
      <div className="relative px-4 pt-6 pb-10 max-w-4xl mx-auto">
        <div className="flex items-end gap-6">

          {/* Photo */}
          <div
            className={`w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden shrink-0 border-2 border-white/10 relative ${
              !player.photo ? positionDot[player.position] : ""
            }`}
          >
            {player.photo ? (
              <Image
                src={player.photo}
                alt={player.nameAr}
                fill
                className="object-cover object-top"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-black text-white text-4xl">
                {player.number ?? "?"}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 pb-2">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border ${positionBadge[player.position]}`}>
                {positionLabel[player.position]}
              </span>
              <span className="text-gray-600 text-xs">{player.nationality}</span>
            </div>
            <h1 className="text-white font-black text-3xl sm:text-4xl leading-tight">
              {player.nameAr}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {player.age ? `${player.age} سنة` : "العمر غير معروف"} ·{" "}
              <span className="text-[#F7C600] font-black text-xl">#{player.number ?? "–"}</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="px-4 max-w-4xl mx-auto mb-10">
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">إحصائيات الموسم</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-4 text-center"
            >
              <p className="text-[#F7C600] font-black text-2xl">{s.value}</p>
              <p className="text-gray-500 text-[10px] mt-1 leading-tight">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

{/* ── Bio ── */}
<div className="px-4 max-w-4xl mx-auto mb-10">
  <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">
    نبذة عن اللاعب
  </p>

  {player.bio ? (
    <div className="relative rounded-3xl border border-[#1a1a1a] bg-[#0a0a0a] p-6 overflow-hidden">
      {/* decorative quote */}
      <span
        className="absolute top-3 left-5 text-[#F7C600]/8 font-black select-none pointer-events-none"
        style={{ fontSize: "9rem", lineHeight: 1 }}
      >
        "
      </span>

      {/* accent line matching position */}
      <div className={`w-10 h-1 rounded-full mb-6 ${positionDot[player.position]}`} />

      {/* Split by \n so you can write multi-paragraph bios */}
      <div className="relative z-10 flex flex-col gap-4">
        {player.bio.split("\n").map((paragraph, i) => (
          <p
            key={i}
            className={`leading-9 font-medium ${
              i === 0
                ? "text-white text-base"          // first paragraph: bright
                : "text-gray-400 text-sm"         // rest: dimmer
            }`}
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* footer */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#1a1a1a]">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${positionDot[player.position]}`} />
          <p className="text-gray-500 text-xs">{player.nameAr}</p>
        </div>
        <span className="text-[#F7C600]/30 font-black text-2xl">
          #{player.number ?? "–"}
        </span>
      </div>
    </div>
  ) : (
    <div className="rounded-3xl border border-dashed border-[#2a2a2a] p-8 text-center">
      <p className="text-3xl mb-3 opacity-30">✍️</p>
      <p className="text-gray-600 text-sm">لا توجد نبذة بعد</p>
    </div>
  )}
</div>

      {/* ── Cards visual ── */}
      <div className="px-4 max-w-4xl mx-auto mb-10">
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">البطاقات</p>
        <div className="flex gap-4">
          {Array.from({ length: Math.min(player.yellowCards, 10) }).map((_, i) => (
            <span key={i} className="w-5 h-7 bg-yellow-400 rounded-sm block shadow-[0_0_8px_rgba(250,204,21,0.4)]" />
          ))}
          {Array.from({ length: Math.min(player.redCards, 5) }).map((_, i) => (
            <span key={i} className="w-5 h-7 bg-red-500 rounded-sm block shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
          ))}
          {player.yellowCards === 0 && player.redCards === 0 && (
            <p className="text-gray-600 text-sm">لا توجد بطاقات</p>
          )}
        </div>
      </div>

      {/* ── Photo Gallery ── */}
      {player.photos && player.photos.length > 0 && (
        <div className="px-4 max-w-4xl mx-auto mb-10">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">الصور</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {player.photos.map((src, i) => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-[#1a1a1a]">
                <Image
                  src={src}
                  alt={`${player.nameAr} ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── No photos placeholder ── */}
      {(!player.photos || player.photos.length === 0) && (
        <div className="px-4 max-w-4xl mx-auto mb-10">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">الصور</p>
          <div className="rounded-2xl border border-dashed border-[#2a2a2a] p-10 text-center">
            <p className="text-gray-600 text-sm">لا توجد صور بعد</p>
            <p className="text-gray-700 text-xs mt-1">
              أضف صوراً في <code className="text-gray-500">squad.ts</code> تحت{" "}
              <code className="text-gray-500">photos: ["/images/players/..."]</code>
            </p>
          </div>
        </div>
      )}

      {/* ── Back button ── */}
      <div className="px-4 max-w-4xl mx-auto">
        <Link
          href="/team"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border border-[#2a2a2a] text-gray-400 text-sm hover:border-[#F7C600]/30 hover:text-white hover:bg-[#F7C600]/5 transition-all"
        >
          → العودة إلى التشكيلة
        </Link>
      </div>
    </div>
  );
}
