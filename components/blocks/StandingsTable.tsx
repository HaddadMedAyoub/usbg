"use client";
import Image from "next/image";
import { useState } from "react";
import standingData from "@/content/standing.json";

function TeamLogo({
  src,
  name,
  shortName,
}: {
  src: string | undefined;
  name: string;
  shortName: string;
}) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <span className="w-6 h-6 rounded-full bg-[#F7C600]/20 text-[#F7C600] text-[9px] font-black flex items-center justify-center flex-shrink-0">
        {shortName.slice(0, 2)}
      </span>
    );
  }

  return (
    <div className="relative w-6 h-6 flex-shrink-0">
      <Image
        src={src}
        alt={name}
        fill
        className="object-contain"
        unoptimized
        onError={() => setError(true)}
      />
    </div>
  );
}

export default function StandingsTable() {
  return (
    <section className="py-14 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">ترتيب الدوري</h2>
          <span className="text-gray-500 text-xs">
            الجولة {standingData.matchday} · {standingData.season}
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
          <table className="w-full text-sm min-w-[520px]">
            <thead>
              <tr className="bg-[#111] text-gray-400 text-xs border-b border-[#2a2a2a]">
                <th className="py-3 px-3 text-right w-8">#</th>
                <th className="py-3 px-3 text-right">الفريق</th>
                <th className="py-3 px-3 text-center">ل.م</th>
                <th className="py-3 px-3 text-center">ف</th>
                <th className="py-3 px-3 text-center">ت</th>
                <th className="py-3 px-3 text-center">خ</th>
                <th className="py-3 px-3 text-center">ف.ه</th>
                <th className="py-3 px-3 text-center font-bold text-[#F7C600]">ن</th>
              </tr>
            </thead>
            <tbody>
              {standingData.table.map((row) => (
                <tr
                  key={row.pos}
                  className={`border-b border-[#1a1a1a] transition-colors ${
                    row.isClub
                      ? "bg-[#F7C600]/10 border-[#F7C600]/30"
                      : "hover:bg-[#111]"
                  }`}
                >
                  {/* Position */}
                  <td className="py-2.5 px-3">
                    <span
                      className={`text-xs font-black w-6 h-6 flex items-center justify-center rounded ${
                        row.pos <= 2
                          ? "bg-green-500/20 text-green-400"
                          : row.pos >= 15
                          ? "bg-red-500/20 text-red-400"
                          : "text-gray-400"
                      }`}
                    >
                      {row.pos}
                    </span>
                  </td>

                  {/* Team name + logo */}
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <TeamLogo
                        src={row.logo}
                        name={row.team}
                        shortName={row.shortName}
                      />
                      <span
                        className={`font-bold text-xs sm:text-sm ${
                          row.isClub ? "text-[#F7C600]" : "text-white"
                        }`}
                      >
                        {row.team}
                      </span>
                    </div>
                  </td>

                  {/* Stats */}
                  <td className="py-2.5 px-3 text-center text-gray-400 text-xs">{row.mp}</td>
                  <td className="py-2.5 px-3 text-center text-green-400 text-xs font-semibold">{row.w}</td>
                  <td className="py-2.5 px-3 text-center text-gray-400 text-xs">{row.d}</td>
                  <td className="py-2.5 px-3 text-center text-red-400 text-xs font-semibold">{row.l}</td>
                  <td className="py-2.5 px-3 text-center text-gray-400 text-xs">
                    {row.gd > 0 ? `+${row.gd}` : row.gd}
                  </td>
                  <td
                    className={`py-2.5 px-3 text-center font-black text-sm ${
                      row.isClub ? "text-[#F7C600]" : "text-white"
                    }`}
                  >
                    {row.pts}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-4 text-xs text-gray-500 justify-center flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-green-500/30 inline-block" />
            ترقية
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#F7C600]/20 inline-block" />
            الاتحاد ببنقردان
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-red-500/30 inline-block" />
            هبوط
          </span>
        </div>
      </div>
    </section>
  );
}
