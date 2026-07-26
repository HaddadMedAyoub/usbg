// components/blocks/StandingsTable.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getTeamLogo } from "@/lib/teamLogos";

type StandingRow = {
  id: number;
  season: string;
  team: string;
  rank: number;
  played: number;
  won: number;
  draw: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
  updated_at: string;
};

const USBG = "Ben Guerdane";

function TeamLogo({
  src,
  name,
}: {
  src?: string;
  name: string;
}) {
  const [imgSrc, setImgSrc] = useState(src || "/images/teams/placeholder.png");

  useEffect(() => {
    setImgSrc(src || "/images/teams/placeholder.png");
  }, [src]);

  return (
    <div className="relative w-7 h-7 shrink-0 overflow-hidden rounded-full bg-[#111] border border-[#2a2a2a]">
      <Image
        src={imgSrc}
        alt={name}
        fill
        className="object-contain p-1"
        sizes="28px"
        onError={() => setImgSrc("/images/teams/placeholder.png")}
      />
    </div>
  );
}

export default function StandingsTable() {
  const [rows, setRows] = useState<StandingRow[]>([]);
  const [season, setSeason] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStandings() {
      setLoading(true);

      const { data, error } = await supabase
        .from("standings")
        .select("*")
        .eq("season", "2025/2026")
        .order("rank", { ascending: true });

      if (error) {
        console.error("Error loading standings:", error);
        setRows([]);
        setLoading(false);
        return;
      }

      const standings = (data as StandingRow[]) || [];
      setRows(standings);
      setSeason(standings[0]?.season || "");
      setLoading(false);
    }

    loadStandings();
  }, []);

  if (loading) {
    return (
      <section className="py-14 px-4 bg-black text-white">
        <div className="max-w-5xl mx-auto">جاري تحميل الترتيب...</div>
      </section>
    );
  }

  return (
    <section className="py-14 px-4 bg-black">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">ترتيب البطولة</h2>
          {season && (
            <span className="text-sm text-gray-400">{season}</span>
          )}
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#2a2a2a] bg-[#0b0b0b]">
          <table className="w-full min-w-[760px] text-sm text-white">
            <thead className="bg-[#111] border-b border-[#2a2a2a]">
              <tr>
                <th className="py-3 px-3 text-left text-xs text-gray-400">#</th>
                <th className="py-3 px-3 text-left text-xs text-gray-400">الفريق</th>
                <th className="py-3 px-3 text-center text-xs text-gray-400">النقاط</th>
                <th className="py-3 px-3 text-center text-xs text-gray-400">ل</th>
                <th className="py-3 px-3 text-center text-xs text-gray-400">ف</th>
                <th className="py-3 px-3 text-center text-xs text-gray-400">ت</th>
                <th className="py-3 px-3 text-center text-xs text-gray-400">خ</th>
                <th className="py-3 px-3 text-center text-xs text-gray-400">له</th>
                <th className="py-3 px-3 text-center text-xs text-gray-400">عليه</th>
                <th className="py-3 px-3 text-center text-xs text-gray-400">+/-</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => {
                const isClub = row.team === USBG;

                return (
                  <tr
                    key={row.id}
                    style={
                      isClub
                        ? {
                          boxShadow:
                            "0 0 18px 2px rgba(247,198,0,0.18), inset 0 0 0 1px rgba(247,198,0,0.25)",
                          background:
                            "linear-gradient(90deg, rgba(247,198,0,0.13) 0%, rgba(247,198,0,0.06) 100%)",
                        }
                        : {}
                    }
                    className={`border-b transition-colors ${isClub
                        ? "border-[#F7C600]/40 border-l-[3px] border-l-[#F7C600]"
                        : "border-[#1a1a1a] hover:bg-[#111]"
                      }`}
                  >
                    {/* Rank */}
                    <td className="py-3 px-3">
                      <span
                        className={`text-xs font-black w-6 h-6 flex items-center justify-center rounded ${row.rank <= 2
                        
                            ? "bg-green-500/20 text-green-400"
                            : row.rank >= 14
                              ? "bg-red-500/20 text-red-400"
                              : isClub
                                ? "bg-[#F7C600]/20 text-[#F7C600]"
                                : "text-gray-400"
                          }`}
                      >
                        {row.rank}
                      </span>
                    </td>

                    {/* Team */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <TeamLogo src={getTeamLogo(row.team)} name={row.team} />

                        <span
                          className={`font-bold text-xs sm:text-sm ${isClub
                              ? "text-[#F7C600] drop-shadow-[0_0_6px_rgba(247,198,0,0.6)]"
                              : "text-white"
                            }`}
                        >
                          {row.team}
                        </span>
                      </div>
                    </td>

                    {/* POINTS (moved here) */}
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`font-black text-sm ${isClub
                            ? "text-[#F7C600] drop-shadow-[0_0_8px_rgba(247,198,0,0.8)]"
                            : "text-white"
                          }`}
                      >
                        {row.points}
                      </span>
                    </td>

                    {/* Played */}
                    <td className="py-3 px-3 text-center text-gray-300 text-xs">
                      {row.played}
                    </td>

                    {/* Won */}
                    <td className="py-3 px-3 text-center text-green-400 text-xs font-semibold">
                      {row.won}
                    </td>

                    {/* Draw */}
                    <td className="py-3 px-3 text-center text-gray-300 text-xs">
                      {row.draw}
                    </td>

                    {/* Lost */}
                    <td className="py-3 px-3 text-center text-red-400 text-xs font-semibold">
                      {row.lost}
                    </td>

                    {/* GF */}
                    <td className="py-3 px-3 text-center text-gray-300 text-xs">
                      {row.gf}
                    </td>

                    {/* GA */}
                    <td className="py-3 px-3 text-center text-gray-300 text-xs">
                      {row.ga}
                    </td>

                    {/* GD */}
                    <td className="py-3 px-3 text-center text-gray-300 text-xs">
                      {row.gd > 0 ? `+${row.gd}` : row.gd}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-green-500/20 border border-green-400/30" />
            مراكز الصدارة
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-red-500/20 border border-red-400/30" />
            مراكز الهبوط
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-[#F7C600]/20 border border-[#F7C600]/30" />
            اتحاد بن قردان
          </div>
        </div>
      </div>
    </section>
  );
}