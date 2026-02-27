"use client";
import Image from "next/image";
import { useState } from "react";

export default function SponsorLogo({
  src,
  alt,
  fallback,
}: {
  src: string;
  alt: string;
  fallback: string;
}) {
  const [error, setError] = useState(false);

  return (
    <div className="relative w-12 h-12 rounded-xl bg-white/5 border border-[#F7C600]/20 flex items-center justify-center shrink-0 overflow-hidden">
      {!error && (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain p-1"
          unoptimized
          onError={() => setError(true)}
        />
      )}
      {error && (
        <span className="text-[#F7C600] font-black text-sm">
          {fallback}
        </span>
      )}
    </div>
  );
}
