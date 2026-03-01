"use client";
import { useEffect, useState } from "react";

const ANNIVERSARY = new Date("2026-02-28T23:00:00Z");

function getTimeSince() {
  const now = new Date();
  const diff = now.getTime() - ANNIVERSARY.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const labels = ["يوم", "ساعة", "دقيقة", "ثانية"];

export default function Countdown() {
  const [time, setTime] = useState<null | ReturnType<typeof getTimeSince>>(null);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setTime(getTimeSince());
    const interval = setInterval(() => {
      setTime(getTimeSince());
      setPulse(true);
      setTimeout(() => setPulse(false), 400);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const values = time
    ? [time.days, time.hours, time.minutes, time.seconds]
    : [0, 0, 0, 0];

  return (
    <section className="bg-[#111] py-14 px-4 relative overflow-hidden">
      {/* Subtle animated background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#F7C600] opacity-5 blur-3xl rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Celebration badge */}
        <div className="inline-flex items-center gap-2 bg-[#F7C600]/10 border border-[#F7C600]/30 rounded-full px-4 py-1 mb-4">
          <span className="text-[#F7C600] text-lg">🏆</span>
          <p className="text-[#F7C600] text-sm font-bold uppercase tracking-widest">نحتفل الآن</p>
          <span className="text-[#F7C600] text-lg">🏆</span>
        </div>

        <h2 className="text-white text-3xl font-black mb-2">
          90 سنة من العطاء
        </h2>
        <p className="text-gray-400 text-sm mb-2">الاتحاد الرياضي ببنقردان · 1936 — 2026</p>

        {/* Live since label */}
        <p className="text-[#F7C600]/70 text-xs mb-10 tracking-wide">
          ⏱ مضى على الاحتفال
        </p>

        <div className="grid grid-cols-4 gap-3 sm:gap-6">
          {values.map((val, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`bg-black border-2 rounded-xl w-full py-4 sm:py-6 flex items-center justify-center transition-all duration-300 ${
                  i === 3 && pulse
                    ? "border-[#F7C600] shadow-[0_0_30px_rgba(247,198,0,0.4)] scale-105"
                    : "border-[#F7C600]/60 shadow-[0_0_20px_rgba(247,198,0,0.1)]"
                }`}
              >
                <span className="text-[#F7C600] text-4xl sm:text-5xl font-black tabular-nums">
                  {time ? String(val).padStart(2, "0") : "--"}
                </span>
              </div>
              <span className="text-gray-400 text-xs sm:text-sm mt-2 font-semibold">
                {labels[i]}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom message */}
        <p className="text-gray-500 text-xs mt-10 italic">
          بدأ الاحتفال في 1 مارس 2026 🎉
        </p>
      </div>
    </section>
  );
}
