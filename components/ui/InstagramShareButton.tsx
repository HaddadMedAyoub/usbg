"use client";
import { useState } from "react";

export default function InstagramShareButton() {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    const url = "https://usbenguerdane.tn/anniversary";

    // Step 1 — copy the link
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }

    // Step 2 — show copied state
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);

    // Step 3 — open Instagram after 400ms so copy finishes first
    setTimeout(() => {
      window.open("https://www.instagram.com", "_blank");
    }, 400);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white font-bold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
    >
      {copied ? (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          تم النسخ — افتح القصة 📲
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163c-3.259 0-3.667.014-4.947.072-1.613.074-3.067.372-4.204 1.508C1.712 2.716 1.414 4.17 1.34 5.783 1.282 7.063 1.268 7.471 1.268 12c0 4.529.014 4.937.072 6.217.074 1.613.372 3.067 1.508 4.204 1.137 1.136 2.591 1.434 4.204 1.508 1.28.058 1.688.072 4.948.072s3.667-.014 4.947-.072c1.613-.074 3.067-.372 4.204-1.508 1.136-1.137 1.434-2.591 1.508-4.204.058-1.28.072-1.688.072-4.948s-.014-3.667-.072-4.947c-.074-1.613-.372-3.067-1.508-4.204C19.214 1.714 17.76 1.416 16.147 1.342 14.867 1.284 14.459 1.27 12 1.27z" />
            <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
          شارك على إنستغرام
        </>
      )}
    </button>
  );
}
