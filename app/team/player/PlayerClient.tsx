// app/team/player/PlayerClient.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPlayerBySlug, Player } from "@/lib/players";

export default function PlayerClient() {
  const router = useRouter();

  const [slug, setSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState<Player | null>(null);

  // 1) Read slug from ?slug=... in the URL (works with static export)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const s = params.get("slug");
    setSlug(s);
  }, []);

  // 2) Fetch player from Supabase when slug is ready
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        if (!slug) {
          setPlayer(null);
          setLoading(false);
          return;
        }
        const p = await getPlayerBySlug(slug);
        setPlayer(p);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-white">
        جارٍ التحميل...
      </div>
    );
  }

  if (!slug || !player) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-white">
        اللاعب غير موجود.
        <button
          className="ml-3 underline"
          onClick={() => router.push("/team")}
        >
          الرجوع للتشكيلة
        </button>
      </div>
    );
  }

  // 3) Player detail layout – start simple, you can paste your fancy layout here
  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      <button
        className="text-gray-400 underline mb-6"
        onClick={() => router.push("/team")}
      >
        الرجوع للتشكيلة
      </button>

      <h1 className="text-white font-black text-3xl sm:text-4xl leading-snug mb-3">
        {player.name_ar}
      </h1>

      <p className="text-gray-500 text-sm mb-6">
        {player.nationality} · {player.age ? `${player.age} سنة` : "العمر غير معروف"} ·{" "}
        <span className="text-[#F7C600] font-black text-xl">
          #{player.number ?? "–"}
        </span>
      </p>

      {player.photo && (
        <img
          src={player.photo}
          alt={player.name_ar}
          className="w-full rounded-2xl mb-8 object-cover max-h-80"
        />
      )}

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-10">
        {[
          { label: "مباراة", value: player.apps },
          { label: "دقيقة", value: player.minutes },
          { label: "هدف", value: player.goals },
          { label: "تمريرة حاسمة", value: player.assists },
            
        ].map((s) => (
          <div
            key={s.label}
            className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-4 text-center"
          >
            <p className="text-[#F7C600] font-black text-2xl">{s.value}</p>
            <p className="text-gray-500 text-[10px] mt-1 leading-tight">
              {s.label}
            </p>
          </div>
        ))}
      </div>
      {(player.bio_ar || player.bio) && (
  <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-6">
    <h2 className="text-white font-bold text-lg mb-3">نبذة عن اللاعب</h2>

    <p className="text-gray-300 leading-relaxed text-sm">
      {player.bio_ar ?? player.bio}
    </p>
  </div>
)}
    </article>
  );
}
