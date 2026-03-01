"use client";
import { useState } from "react";
import { squad, coach, Player } from "@/content/data/squad";
import Link from "next/link";

const positionLabel: Record<string, string> = {
  GK:  "حارس مرمى",
  DEF: "مدافع",
  MID: "وسط",
  FWD: "مهاجم",
};

const positionLabelPlural: Record<string, string> = {
  GK:  "حراس المرمى",
  DEF: "المدافعون",
  MID: "الوسط",
  FWD: "المهاجمون",
};

const positionGradient: Record<string, string> = {
  GK:  "from-yellow-500/20 to-yellow-500/5 border-yellow-500/30",
  DEF: "from-blue-500/20 to-blue-500/5 border-blue-500/30",
  MID: "from-green-500/20 to-green-500/5 border-green-500/30",
  FWD: "from-red-500/20 to-red-500/5 border-red-500/30",
};

const positionDot: Record<string, string> = {
  GK:  "bg-yellow-400",
  DEF: "bg-blue-400",
  MID: "bg-green-400",
  FWD: "bg-red-400",
};

const positionRing: Record<string, string> = {
  GK:  "ring-yellow-400/50",
  DEF: "ring-blue-400/50",
  MID: "ring-green-400/50",
  FWD: "ring-red-400/50",
};

const positionBadge: Record<string, string> = {
  GK:  "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  DEF: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  MID: "bg-green-500/10 text-green-400 border-green-500/20",
  FWD: "bg-red-500/10 text-red-400 border-red-500/20",
};

const lineupSlots = [
  { id: "lw",  top: "20%", left: "15%" },
  { id: "st",  top: "20%", left: "50%" },
  { id: "rw",  top: "20%", left: "85%" },
  { id: "lm",  top: "46%", left: "15%" },
  { id: "cm",  top: "46%", left: "50%" },
  { id: "rm",  top: "46%", left: "85%" },
  { id: "lb",  top: "72%", left: "15%" },
  { id: "lcb", top: "72%", left: "35%" },
  { id: "rcb", top: "72%", left: "65%" },
  { id: "rb",  top: "72%", left: "85%" },
  { id: "gk",  top: "90%", left: "50%" },
];

const byPos = (p: string) =>
  squad.filter((x) => x.position === p).sort((a, b) => b.minutes - a.minutes);

const gks  = byPos("GK");
const defs = byPos("DEF");
const mids = byPos("MID");
const fwds = byPos("FWD");

const lineupPlayers: Record<string, Player> = {
  gk: gks[0],
  lb: defs[0], lcb: defs[1], rcb: defs[2], rb: defs[3],
  lm: mids[0], cm: mids[1],  rm: mids[2],
  lw: fwds[0], st: fwds[1],  rw: fwds[2],
};

const POSITIONS = ["ALL", "GK", "DEF", "MID", "FWD"] as const;

function PlayerAvatar({ player, size = "md" }: { player: Player; size?: "sm" | "md" | "lg" }) {
  const sizes     = { sm: "w-9 h-9",   md: "w-12 h-12", lg: "w-20 h-20" };
  const textSizes = { sm: "text-xs", md: "text-sm",  lg: "text-2xl"  };
  return (
    <div className={`${sizes[size]} rounded-full ring-2 ${positionRing[player.position]} shrink-0 flex items-center justify-center font-black text-white ${positionDot[player.position]} ${textSizes[size]}`}>
      {player.number ?? "?"}
    </div>
  );
}

export default function TeamPage() {
  const [selected, setSelected] = useState<Player | null>(null);
  const [activePos, setActivePos] = useState<string>("ALL");

  const filtered =
    activePos === "ALL" ? squad : squad.filter((p) => p.position === activePos);

  return (
    <div className="min-h-screen bg-black text-white pb-24">

      {/* ══ Header ══ */}
      <div className="relative px-4 pt-12 pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7C600]/8 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.45em] uppercase mb-3">
            الموسم 2025 / 2026
          </p>
          <h1 className="text-white font-black text-4xl sm:text-5xl mb-2">التشكيلة</h1>
          <p className="text-gray-500 text-sm">
            {squad.length} لاعب · المدرب{" "}
            <span className="text-white font-semibold">{coach.nameAr}</span>
          </p>
          <div className="flex gap-6 mt-6">
            {[
              { label: "لاعب",   value: squad.length },
              { label: "هدف",    value: squad.reduce((s, p) => s + p.goals, 0) },
              { label: "دقيقة",  value: squad.reduce((s, p) => s + p.minutes, 0).toLocaleString("ar-TN") },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-[#F7C600] font-black text-2xl">{stat.value}</p>
                <p className="text-gray-500 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ Pitch ══ */}
      <div className="px-4 max-w-4xl mx-auto mb-14">
        <div className="flex items-center justify-between mb-3">
          <p className="text-gray-500 text-xs uppercase tracking-widest">التشكيلة الأساسية</p>
          <span className="text-[#F7C600]/60 text-[10px] font-bold border border-[#F7C600]/20 px-2 py-0.5 rounded-full">
            4 — 3 — 3
          </span>
        </div>

        <div
          className="relative w-full rounded-2xl overflow-hidden border border-[#1f1f1f]"
          style={{
            paddingBottom: "138%",
            background: "radial-gradient(ellipse at 50% 50%, #0d3d0d 0%, #071a07 60%, #040f04 100%)",
          }}
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 138" preserveAspectRatio="none">
            <rect x="3" y="3" width="94" height="132" fill="none" stroke="white" strokeWidth="0.6" opacity="0.15"/>
            <line x1="3" y1="69" x2="97" y2="69" stroke="white" strokeWidth="0.4" opacity="0.15"/>
            <circle cx="50" cy="69" r="11" fill="none" stroke="white" strokeWidth="0.4" opacity="0.15"/>
            <circle cx="50" cy="69" r="0.8" fill="white" opacity="0.2"/>
            <rect x="24" y="3" width="52" height="19" fill="none" stroke="white" strokeWidth="0.4" opacity="0.12"/>
            <rect x="24" y="116" width="52" height="19" fill="none" stroke="white" strokeWidth="0.4" opacity="0.12"/>
            <rect x="36" y="3" width="28" height="8" fill="none" stroke="white" strokeWidth="0.4" opacity="0.1"/>
            <rect x="36" y="127" width="28" height="8" fill="none" stroke="white" strokeWidth="0.4" opacity="0.1"/>
          </svg>

          {lineupSlots.map((slot) => {
            const player = lineupPlayers[slot.id];
            if (!player) return null;
            return (
              <button
                key={slot.id}
                onClick={() => setSelected(player)}
                className="absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2 group z-10"
                style={{ top: slot.top, left: slot.left }}
              >
                <PlayerAvatar player={player} size="sm" />
                <span className="text-white text-[9px] font-bold bg-black/70 px-1.5 py-0.5 rounded-full whitespace-nowrap backdrop-blur-sm max-w-[60px] truncate">
                  {player.nameAr.split(" ").slice(-1)[0]}
                </span>
              </button>
            );
          })}

          <div className="absolute bottom-3 left-3 flex flex-col gap-1 z-10">
            {(["GK", "DEF", "MID", "FWD"] as const).map((p) => (
              <div key={p} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${positionDot[p]}`} />
                <span className="text-white/40 text-[9px]">{positionLabelPlural[p]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ Player Popup ══ */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm px-4 pb-4"
          onClick={() => setSelected(null)}
        >
          <div
            className={`bg-[#0f0f0f] border rounded-3xl p-6 w-full max-w-sm bg-gradient-to-b ${positionGradient[selected.position]} shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 mb-5">
              <PlayerAvatar player={selected} size="lg" />
              <div className="flex-1">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border ${positionBadge[selected.position]}`}>
                  {positionLabel[selected.position]}
                </span>
                <h2 className="text-white font-black text-xl leading-tight mt-2">
                  {selected.nameAr}
                </h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  {selected.nationality} · {selected.age ? `${selected.age} سنة` : "–"}
                </p>
              </div>
              <span className="text-[#F7C600] font-black text-3xl opacity-30">
                #{selected.number ?? "–"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { value: selected.apps,    label: "مباراة" },
                { value: selected.minutes, label: "دقيقة"  },
                { value: selected.goals,   label: "هدف"    },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 rounded-2xl p-3 text-center">
                  <p className="text-[#F7C600] font-black text-xl">{s.value}</p>
                  <p className="text-gray-500 text-[10px] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-white/5 rounded-2xl p-3 flex items-center gap-2">
                <span className="w-4 h-5 bg-yellow-400 rounded-sm shrink-0" />
                <div>
                  <p className="text-white font-black text-lg leading-none">{selected.yellowCards}</p>
                  <p className="text-gray-500 text-[10px]">بطاقة صفراء</p>
                </div>
              </div>
              <div className="bg-white/5 rounded-2xl p-3 flex items-center gap-2">
                <span className="w-4 h-5 bg-red-500 rounded-sm shrink-0" />
                <div>
                  <p className="text-white font-black text-lg leading-none">{selected.redCards}</p>
                  <p className="text-gray-500 text-[10px]">بطاقة حمراء</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelected(null)}
                className="flex-1 py-3 rounded-2xl border border-white/10 text-gray-400 text-sm hover:bg-white/5 hover:text-white transition"
              >
                إغلاق
              </button>
              <Link
                href={`/team/${selected.slug}`}
                className="flex-1 py-3 rounded-2xl bg-[#F7C600] text-black text-sm font-black text-center hover:bg-white transition"
              >
                الملف الكامل ←
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ══ Full Squad ══ */}
      <div className="px-4 max-w-4xl mx-auto">
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-1">
          {POSITIONS.map((p) => (
            <button
              key={p}
              onClick={() => setActivePos(p)}
              className={`shrink-0 px-5 py-2 rounded-full text-xs font-bold border transition-all duration-200 ${
                activePos === p
                  ? "bg-[#F7C600] text-black border-[#F7C600] shadow-[0_0_20px_rgba(247,198,0,0.3)]"
                  : "border-[#2a2a2a] text-gray-400 hover:border-[#F7C600]/30 hover:text-white"
              }`}
            >
              {p === "ALL" ? "الكل" : positionLabelPlural[p]}
            </button>
          ))}
        </div>

        {activePos === "ALL" ? (
          (["GK", "DEF", "MID", "FWD"] as const).map((pos) => (
            <div key={pos} className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className={`w-2 h-2 rounded-full ${positionDot[pos]}`} />
                <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">
                  {positionLabelPlural[pos]}
                </p>
                <span className="text-gray-700 text-xs">
                  {squad.filter((p) => p.position === pos).length}
                </span>
              </div>
              <PlayerList
                players={squad.filter((p) => p.position === pos)}
                onSelect={setSelected}
                positionBadge={positionBadge}
                positionLabel={positionLabel}
              />
            </div>
          ))
        ) : (
          <PlayerList
            players={filtered}
            onSelect={setSelected}
            positionBadge={positionBadge}
            positionLabel={positionLabel}
          />
        )}

        {/* Coach card */}
        <div className="mt-8 rounded-2xl border border-[#2a2a2a] bg-[#0a0a0a] px-5 py-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#F7C600]/10 border border-[#F7C600]/20 flex items-center justify-center text-xl shrink-0">
            🧑‍💼
          </div>
          <div>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest">المدرب الرئيسي</p>
            <p className="text-white font-black text-base mt-0.5">{coach.nameAr}</p>
          </div>
          <span className="mr-auto text-2xl">{coach.nationality}</span>
        </div>
      </div>
    </div>
  );
}

function PlayerList({
  players,
  onSelect,
  positionBadge,
  positionLabel,
}: {
  players: Player[];
  onSelect: (p: Player) => void;
  positionBadge: Record<string, string>;
  positionLabel: Record<string, string>;
}) {
  return (
    <div className="flex flex-col gap-2">
      {players.map((player, i) => (
        <button
          key={i}
          onClick={() => onSelect(player)}
          className="flex items-center gap-3 rounded-2xl border border-[#1a1a1a] bg-[#080808] px-4 py-3 hover:border-[#F7C600]/20 hover:bg-[#F7C600]/3 transition-all duration-200 text-right w-full group"
        >
          {/* Number avatar */}
          <div className={`w-10 h-10 rounded-full ring-2 ${positionRing[player.position]} shrink-0 flex items-center justify-center font-black text-white text-xs ${positionDot[player.position]}`}>
            {player.number ?? "?"}
          </div>

          <div className="flex-1 min-w-0 text-right">
            <p className="text-white font-bold text-sm truncate group-hover:text-[#F7C600] transition-colors">
              {player.nameAr}
            </p>
            <p className="text-gray-600 text-xs mt-0.5">
              {player.nationality} · {player.age ? `${player.age} سنة` : "–"}
            </p>
          </div>

          <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border shrink-0 ${positionBadge[player.position]}`}>
            {positionLabel[player.position]}
          </span>

          <div className="flex gap-3 shrink-0">
            <div className="text-center hidden sm:block">
              <p className="text-white font-black text-sm">{player.apps}</p>
              <p className="text-gray-600 text-[9px]">م</p>
            </div>
            <div className="text-center">
              <p className="text-[#F7C600] font-black text-sm">{player.goals}</p>
              <p className="text-gray-600 text-[9px]">هدف</p>
            </div>
          </div>

          <span className="text-gray-700 text-xs group-hover:text-[#F7C600] transition-colors shrink-0">←</span>
        </button>
      ))}
    </div>
  );
}
