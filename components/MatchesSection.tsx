// components/MatchesSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getTeamLogo } from "@/lib/teamLogos";

const USBG = "Ben Guerdane";

type MatchRow = {
  id?: number;
  match_date: string | null;
  match_time?: string | null;
  home_team: string;
  away_team: string;
  home_score?: number | null;
  away_score?: number | null;
  competition?: string | null;
  result?: string | null;
  season?: string | null;
  venue?: string | null;
  created_at?: string | null;
};

const formColors: Record<"W" | "D" | "L", string> = {
  W: "bg-green-500",
  D: "bg-yellow-500",
  L: "bg-red-500",
};

function normalizeTeamName(name?: string | null) {
  if (!name) return "";
  return name.replace(" (Tun)", "").trim();
}

function isUSBGMatch(match: MatchRow) {
  const home = normalizeTeamName(match.home_team);
  const away = normalizeTeamName(match.away_team);
  return home === USBG || away === USBG;
}

function getSeasonYear(match?: MatchRow) {
  const season = match?.season || "";
  const parts = season.split("/");
  if (parts.length === 2) {
    const startYear = Number(parts[0]);
    const endYear = Number(parts[1]);
    if (!Number.isNaN(startYear) && !Number.isNaN(endYear)) {
      return { startYear, endYear };
    }
  }
  return { startYear: 2025, endYear: 2026 };
}

function parseCustomMatchDate(match?: MatchRow): Date | null {
  const value = match?.match_date?.trim();
  const timeValue = match?.match_time?.trim();

  if (!value) return null;

  const { startYear, endYear } = getSeasonYear(match);

  // Format: 27.02. 13:00
  let m = value.match(/^(\d{2})\.(\d{2})\.\s+(\d{2}):(\d{2})$/);
  if (m) {
    const [, day, month, hour, minute] = m;
    const monthNum = Number(month);
    const year = monthNum >= 7 ? startYear : endYear;
    const d = new Date(
      year,
      monthNum - 1,
      Number(day),
      Number(hour),
      Number(minute)
    );
    return isNaN(d.getTime()) ? null : d;
  }

  // Format: 21.03.  + separate match_time
  m = value.match(/^(\d{2})\.(\d{2})\.$/);
  if (m) {
    const [, day, month] = m;
    const monthNum = Number(month);
    const year = monthNum >= 7 ? startYear : endYear;

    let hour = 0;
    let minute = 0;

    if (timeValue) {
      const tm = timeValue.match(/^(\d{2}):(\d{2})$/);
      if (tm) {
        hour = Number(tm[1]);
        minute = Number(tm[2]);
      }
    }

    const d = new Date(year, monthNum - 1, Number(day), hour, minute);
    return isNaN(d.getTime()) ? null : d;
  }

  // Format: 30.12.2025
  m = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (m) {
    const [, day, month, year] = m;

    let hour = 0;
    let minute = 0;

    if (timeValue) {
      const tm = timeValue.match(/^(\d{2}):(\d{2})$/);
      if (tm) {
        hour = Number(tm[1]);
        minute = Number(tm[2]);
      }
    }

    const d = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      hour,
      minute
    );
    return isNaN(d.getTime()) ? null : d;
  }

  // Format: 30.12.2025 14:00
  m = value.match(/^(\d{2})\.(\d{2})\.(\d{4})\s+(\d{2}):(\d{2})$/);
  if (m) {
    const [, day, month, year, hour, minute] = m;
    const d = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute)
    );
    return isNaN(d.getTime()) ? null : d;
  }

  const fallback = new Date(value);
  return isNaN(fallback.getTime()) ? null : fallback;
}

function formatDate(match?: MatchRow) {
  const d = parseCustomMatchDate(match);
  if (!d) return "—";

  return d.toLocaleDateString("ar-TN", {
    day: "numeric",
    month: "long",
  });
}

function formatTime(match?: MatchRow) {
  if (match?.match_time) return match.match_time.slice(0, 5);

  const d = parseCustomMatchDate(match);
  if (!d) return "—";

  const hours = d.getHours();
  const minutes = d.getMinutes();

  if (hours === 0 && minutes === 0) return "—";

  return d.toLocaleTimeString("ar-TN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function TeamLogo({
  src,
  name,
  size = 56,
}: {
  src?: string;
  name: string;
  size?: number;
}) {
  const [imgSrc, setImgSrc] = useState(src || "/images/teams/placeholder.png");

  useEffect(() => {
    setImgSrc(src || "/images/teams/placeholder.png");
  }, [src]);

  return (
    <div
      className="relative overflow-hidden rounded-full bg-[#111] border border-[#2a2a2a] shrink-0"
      style={{ width: size, height: size }}
    >
      <Image
        src={imgSrc}
        alt={name}
        fill
        className="object-contain p-1"
        sizes={`${size}px`}
        onError={() => setImgSrc("/images/teams/placeholder.png")}
      />
    </div>
  );
}

export default function MatchesSection() {
  const [lastMatches, setLastMatches] = useState<MatchRow[]>([]);
  const [nextMatches, setNextMatches] = useState<MatchRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const [{ data: last, error: lastError }, { data: next, error: nextError }] =
        await Promise.all([
          supabase.from("last_matches").select("*"),
          supabase.from("next_matches").select("*"),
        ]);

      if (lastError) {
        console.error("Error loading last matches:", lastError);
      }

      if (nextError) {
        console.error("Error loading next matches:", nextError);
      }

      setLastMatches((last || []) as MatchRow[]);
      setNextMatches((next || []) as MatchRow[]);
      setLoading(false);
    }

    load();
  }, []);

  const currentTime = Date.now();

  const allClubMatches = useMemo(() => {
    return [...lastMatches, ...nextMatches]
      .filter(isUSBGMatch)
      .filter((m) => parseCustomMatchDate(m))
      .sort((a, b) => {
        const da = parseCustomMatchDate(a)!.getTime();
        const db = parseCustomMatchDate(b)!.getTime();
        return da - db;
      });
  }, [lastMatches, nextMatches]);

  const clubNextMatches = useMemo(() => {
    return allClubMatches.filter((m) => {
      const matchDate = parseCustomMatchDate(m);
      return !!matchDate && matchDate.getTime() >= currentTime;
    });
  }, [allClubMatches, currentTime]);

  const clubLastMatches = useMemo(() => {
    return allClubMatches
      .filter((m) => {
        const matchDate = parseCustomMatchDate(m);
        return !!matchDate && matchDate.getTime() < currentTime;
      })
      .sort((a, b) => {
        const da = parseCustomMatchDate(a)!.getTime();
        const db = parseCustomMatchDate(b)!.getTime();
        return db - da;
      });
  }, [allClubMatches, currentTime]);

  const form = useMemo(() => {
    return clubLastMatches.slice(0, 5).map((m) => {
      const home = normalizeTeamName(m.home_team);
      const usbgScore = home === USBG ? m.home_score ?? 0 : m.away_score ?? 0;
      const oppScore = home === USBG ? m.away_score ?? 0 : m.home_score ?? 0;
      return usbgScore > oppScore ? "W" : usbgScore < oppScore ? "L" : "D";
    }) as ("W" | "D" | "L")[];
  }, [clubLastMatches]);

  const lastResult = clubLastMatches[0];
  const nextMatch = clubNextMatches[0];
  const upcomingMatches = clubNextMatches.slice(1, 4);

  if (loading) {
    return (
      <section className="py-14 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto">جاري تحميل المباريات...</div>
      </section>
    );
  }

  return (
    <section className="py-14 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">المباريات</h2>
          <Link
            href="/matches"
            className="text-[#F7C600] text-sm font-semibold hover:underline"
          >
            كل المباريات ←
          </Link>
        </div>

        {!!form.length && (
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <span className="text-gray-500 text-xs">آخر 5 مباريات</span>
            <div className="flex gap-1.5" dir="ltr">
              {form.map((f, i) => {
                const result = clubLastMatches[i];
                const opp =
                  normalizeTeamName(result.home_team) === USBG
                    ? normalizeTeamName(result.away_team)
                    : normalizeTeamName(result.home_team);

                const score = `${result.home_score ?? 0}-${result.away_score ?? 0}`;
                const label = { W: "فوز", L: "خسارة", D: "تعادل" }[f];
                const tooltip = `${label} ضد ${opp} (${score})`;

                return (
                  <span
                    key={`${f}-${i}`}
                    title={tooltip}
                    className={`w-7 h-7 rounded-md flex items-center justify-center text-white text-[11px] font-black cursor-default ${formColors[f]}`}
                  >
                    {f}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {nextMatch && (
          <div
            className={`rounded-2xl border p-6 mb-6 ${
              (nextMatch.competition || "").toLowerCase().includes("cup")
                ? "border-blue-500/30 bg-blue-500/5"
                : "border-[#F7C600]/20 bg-[#F7C600]/5"
            }`}
          >
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                المباراة القادمة
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-widest ${
                  (nextMatch.competition || "").toLowerCase().includes("cup")
                    ? "text-blue-400"
                    : "text-[#F7C600]"
                }`}
              >
                {nextMatch.competition || "مباراة"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col items-center gap-2 flex-1">
                <TeamLogo
                  src={getTeamLogo(normalizeTeamName(nextMatch.home_team))}
                  name={normalizeTeamName(nextMatch.home_team)}
                  size={56}
                />
                <span
                  className={`text-xs font-bold text-center leading-tight ${
                    normalizeTeamName(nextMatch.home_team) === USBG
                      ? "text-[#F7C600]"
                      : "text-white"
                  }`}
                >
                  {normalizeTeamName(nextMatch.home_team)}
                </span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <span className="text-white font-black text-2xl">VS</span>
                <span className="text-gray-400 text-xs">
                  {formatTime(nextMatch)}
                </span>
                <span className="text-gray-600 text-[10px] mt-1">
                  {formatDate(nextMatch)}
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 flex-1">
                <TeamLogo
                  src={getTeamLogo(normalizeTeamName(nextMatch.away_team))}
                  name={normalizeTeamName(nextMatch.away_team)}
                  size={56}
                />
                <span
                  className={`text-xs font-bold text-center leading-tight ${
                    normalizeTeamName(nextMatch.away_team) === USBG
                      ? "text-[#F7C600]"
                      : "text-white"
                  }`}
                >
                  {normalizeTeamName(nextMatch.away_team)}
                </span>
              </div>
            </div>

            <p className="text-gray-500 text-[11px] text-center mt-4">
              📍 {nextMatch.venue || "سيتم تحديد الملعب لاحقًا"}
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[#2a2a2a] bg-[#0b0b0b] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold">مباريات قادمة</h3>
              <span className="text-[11px] text-gray-500">
                {upcomingMatches.length} مباريات
              </span>
            </div>

            {upcomingMatches.length ? (
              <div className="space-y-3">
                {upcomingMatches.map((match, i) => (
                  <div
                    key={`${match.home_team}-${match.away_team}-${match.match_date}-${i}`}
                    className="rounded-xl border border-[#1f1f1f] bg-[#111] px-4 py-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <TeamLogo
                          src={getTeamLogo(normalizeTeamName(match.home_team))}
                          name={normalizeTeamName(match.home_team)}
                          size={28}
                        />
                        <span
                          className={`text-xs font-semibold truncate ${
                            normalizeTeamName(match.home_team) === USBG
                              ? "text-[#F7C600]"
                              : "text-white"
                          }`}
                        >
                          {normalizeTeamName(match.home_team)}
                        </span>
                      </div>

                      <div className="text-center shrink-0 px-2">
                        <div className="text-white text-xs font-black">VS</div>
                        <div className="text-[10px] text-gray-500">
                          {formatTime(match)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
                        <span
                          className={`text-xs font-semibold truncate ${
                            normalizeTeamName(match.away_team) === USBG
                              ? "text-[#F7C600]"
                              : "text-white"
                          }`}
                        >
                          {normalizeTeamName(match.away_team)}
                        </span>
                        <TeamLogo
                          src={getTeamLogo(normalizeTeamName(match.away_team))}
                          name={normalizeTeamName(match.away_team)}
                          size={28}
                        />
                      </div>
                    </div>

                    <div className="mt-2 text-[10px] text-gray-500 text-center">
                      {formatDate(match)}
                      {match.venue ? ` • ${match.venue}` : ""}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">لا توجد مباريات قادمة.</p>
            )}
          </div>

          <div className="rounded-2xl border border-[#2a2a2a] bg-[#0b0b0b] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold">النتيجة الأخيرة</h3>
              {lastResult && (
                <span className="text-[11px] text-gray-500">
                  {formatDate(lastResult)}
                </span>
              )}
            </div>

            {lastResult ? (
              <>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <TeamLogo
                      src={getTeamLogo(normalizeTeamName(lastResult.home_team))}
                      name={normalizeTeamName(lastResult.home_team)}
                      size={48}
                    />
                    <span
                      className={`text-xs font-bold text-center ${
                        normalizeTeamName(lastResult.home_team) === USBG
                          ? "text-[#F7C600]"
                          : "text-white"
                      }`}
                    >
                      {normalizeTeamName(lastResult.home_team)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-white text-2xl font-black">
                      {lastResult.home_score ?? 0}
                    </span>
                    <span className="text-gray-500 font-bold">-</span>
                    <span className="text-white text-2xl font-black">
                      {lastResult.away_score ?? 0}
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-2 flex-1">
                    <TeamLogo
                      src={getTeamLogo(normalizeTeamName(lastResult.away_team))}
                      name={normalizeTeamName(lastResult.away_team)}
                      size={48}
                    />
                    <span
                      className={`text-xs font-bold text-center ${
                        normalizeTeamName(lastResult.away_team) === USBG
                          ? "text-[#F7C600]"
                          : "text-white"
                      }`}
                    >
                      {normalizeTeamName(lastResult.away_team)}
                    </span>
                  </div>
                </div>

                <p className="text-center text-gray-500 text-xs mt-4">
                  {lastResult.competition || "مباراة"}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-500">لا توجد نتائج أخيرة.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}