// app/team/player/page.tsx
import { Suspense } from "react";
import PlayerClient from "./PlayerClient";

export default function PlayerPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-6 py-12 text-white">
          جارٍ التحميل...
        </div>
      }
    >
      <PlayerClient />
    </Suspense>
  );
}
