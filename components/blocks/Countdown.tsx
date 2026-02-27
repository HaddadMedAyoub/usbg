"use client";
import { useEffect, useState } from "react";

const TARGET = new Date("1936-05-01"); // placeholder — update with real anniversary date
const ANNIVERSARY = new Date("2026-03-03"); // 90th anniversary target

function getTimeLeft() {
  const now = new Date();
  const diff = ANNIVERSARY.getTime() - now.getTime();
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
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const values = [time.days, time.hours, time.minutes, time.seconds];

  return (
    <section className="bg-[#111] py-14 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[#F7C600] text-sm font-bold uppercase tracking-widest mb-2">العد التنازلي</p>
        <h2 className="text-white text-3xl font-black mb-2">90 سنة من العطاء</h2>
        <p className="text-gray-400 text-sm mb-10">الاتحاد الرياضي ببنقردان · 1936 — 2026</p>

        <div className="grid grid-cols-4 gap-3 sm:gap-6">
          {values.map((val, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="bg-black border-2 border-[#F7C600] rounded-xl w-full py-4 sm:py-6 flex items-center justify-center shadow-[0_0_20px_rgba(247,198,0,0.15)]">
                <span className="text-[#F7C600] text-4xl sm:text-5xl font-black tabular-nums">
                  {String(val).padStart(2, "0")}
                </span>
              </div>
              <span className="text-gray-400 text-xs sm:text-sm mt-2 font-semibold">{labels[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
