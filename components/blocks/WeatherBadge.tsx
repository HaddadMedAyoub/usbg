"use client";

import { useEffect, useState } from "react";

type WeatherData = {
  temp: number;
  windKmh: number;
  weatherCode: number;
};

function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const url =
          "https://api.open-meteo.com/v1/forecast?latitude=33.1367&longitude=11.219&current=temperature_2m,wind_speed_10m,weather_code&temperature_unit=celsius&wind_speed_unit=kmh&timezone=auto";
        const res = await fetch(url);
        if (!res.ok) return;
        const json = await res.json();
        const current = json.current;
        if (!current) return;

        setWeather({
          temp: Math.round(current.temperature_2m),
          windKmh: Math.round(current.wind_speed_10m),
          weatherCode: current.weather_code ?? 0,
        });
      } catch (e) {
        console.error("Weather error", e);
      }
    };

    fetchWeather();
    const id = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return weather;
}

function getIconFromCode(code: number) {
  if ([61, 63, 65, 80, 81, 82, 51, 53, 55].includes(code)) return "🌧️";
  if ([71, 73, 75].includes(code)) return "🌨️";
  if ([2, 3, 45, 48].includes(code)) return "☁️";
  return "☀️";
}

export default function WeatherStrip() {
  const weather = useWeather();
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, "0");
      const m = now.getMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    updateTime();
    const id = setInterval(updateTime, 60 * 1000);
    return () => clearInterval(id);
  }, []);

return (
  <section className="relative z-10 -mt-10 mb-6 px-4">
    <div className="max-w-3xl mx-auto flex justify-center">
      <div
        className="relative flex items-center gap-4 rounded-2xl
                   bg-[#020617]/90 border border-[#38bdf8]/40
                   px-5 py-3 backdrop-blur-md 
                   shadow-[0_0_40px_rgba(15,118,178,0.45)] overflow-hidden"
      >
        {/* Dynamic background scene */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Base sky */}
          <div
            className={`w-full h-full transition-colors duration-500 ${
              weather
                ? [61,63,65,80,81,82,51,53,55].includes(weather.weatherCode)
                  ? "bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617]" // rainy
                  : [2,3,45,48].includes(weather.weatherCode)
                    ? "bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#020617]" // cloudy
                    : "bg-gradient-to-br from-[#0ea5e9] via-[#0f172a] to-[#020617]" // clear
                : "bg-gradient-to-br from-[#0f172a] via-[#0b1120] to-[#020617]"
            }`}
          />

          {/* Soft sun / moon glow */}
          {weather && ![61,63,65,80,81,82,51,53,55].includes(weather.weatherCode) && (
            <div className="absolute -top-6 -left-10 w-32 h-32 rounded-full bg-[#fde68a]/20 blur-2xl" />
          )}

          {/* Cloud band */}
          {weather && [2,3,45,48,61,63,65,80,81,82,51,53,55].includes(weather.weatherCode) && (
            <div className="absolute top-2 left-4 right-10 h-8 bg-white/10 rounded-full blur-md" />
          )}

          {/* Rain streaks */}
          {weather && [61,63,65,80,81,82,51,53,55].includes(weather.weatherCode) && (
            <div className="absolute inset-x-8 bottom-0 h-10 bg-[repeating-linear-gradient(135deg,rgba(56,189,248,0.5)_0,rgba(56,189,248,0.5)_1px,transparent_1px,transparent_4px)] opacity-40" />
          )}
        </div>

        {/* Foreground content */}
        <div className="relative flex items-center gap-4">
          {/* Icon bubble */}
          <div className="flex items-center justify-center w-9 h-9 rounded-full 
                          bg-black/40 border border-white/20">
            <span className="text-xl">
              {weather ? getIconFromCode(weather.weatherCode) : "☁️"}
            </span>
          </div>

          {weather ? (
            <>
              {/* Temp */}
              <div className="flex items-baseline gap-1">
                <span className="text-white text-[18px] font-bold">
                  {weather.temp}
                </span>
                <span className="text-[#facc15] text-[11px]">°م</span>
              </div>

              <span className="w-px h-6 bg-white/15" />

              {/* Wind */}
              <div className="flex items-baseline gap-1 text-sky-100 text-[11px]">
                <span>{weather.windKmh}</span>
                <span>كم/س</span>
              </div>

              <span className="w-px h-6 bg-white/15" />

              {/* Time */}
              <span className="text-sky-100 text-[11px]">{time}</span>
            </>
          ) : (
            <div className="h-5 w-20 bg-white/10 rounded-full animate-pulse" />
          )}
        </div>
      </div>
    </div>
  </section>
);


}
