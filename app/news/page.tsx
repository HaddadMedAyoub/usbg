//news/page.tsx
 import { Suspense } from "react";
import NewsClient from "./newsclient";

export default function NewsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto px-6 py-12 text-white">
          جارٍ تحميل الأخبار...
        </div>
      }
    >
      <NewsClient />
    </Suspense>
  );
}