//news/article/page.tsx
import { Suspense } from "react";
import NewsArticleClient from "./NewsArticleClient";

export default function NewsArticlePage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto px-6 py-12 text-white">جارٍ التحميل...</div>}>
      <NewsArticleClient />
    </Suspense>
  );
}