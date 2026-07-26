// news/newsclient.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getArticles, Article } from "@/lib/articles";

export default function NewsClient() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        const data = await getArticles();
        setArticles(data || []);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function openArticle(slug: string) {
    router.push(`/news/article?slug=${encodeURIComponent(slug)}`);
  }

  const sorted = useMemo(() => {
    return [...articles].sort((a, b) => {
      const da = a.published_at ? new Date(a.published_at).getTime() : 0;
      const db = b.published_at ? new Date(b.published_at).getTime() : 0;
      return db - da;
    });
  }, [articles]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 text-white">
        جارٍ تحميل الأخبار...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.4em] uppercase mb-2">
        الأخبار
      </p>
      <h1 className="text-white font-black text-3xl mb-10">الأخبار والبلاغات</h1>

      <div className="grid gap-6">
        {sorted.map((article) => {
          const formattedDate = article.published_at
            ? new Date(article.published_at).toLocaleDateString("ar-TN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : null;

          return (
            <button
              key={article.slug}
              onClick={() => openArticle(article.slug)}
              className="group overflow-hidden rounded-3xl border border-[#1e1e1e] bg-[#111] text-right hover:border-[#F7C600]/30 hover:bg-[#131313] transition-all"
            >
              <div className="grid md:grid-cols-[280px_1fr]">
                <div className="h-[220px] md:h-full bg-[#181818] overflow-hidden">
                  {article.image ? (
                    <img
                      src={article.image}
                      alt={article.title_ar}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                      بدون صورة
                    </div>
                  )}
                </div>

                <div className="p-6 md:p-7 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    {article.category && (
                      <span className="inline-flex rounded-full border border-[#F7C600]/20 bg-[#F7C600]/10 px-3 py-1 text-xs font-bold text-[#F7C600]">
                        {article.category}
                      </span>
                    )}

                    {formattedDate && (
                      <span className="text-xs text-gray-500">{formattedDate}</span>
                    )}
                  </div>

                  <h2 className="text-white text-xl sm:text-2xl font-extrabold leading-8 mb-3 group-hover:text-[#F7C600] transition-colors">
                    {article.title_ar}
                  </h2>

                  <p className="text-sm text-gray-400 leading-7 line-clamp-3">
                    {article.excerpt_ar ||
                      article.content_ar?.slice(0, 180) ||
                      "اضغط لقراءة تفاصيل هذا المقال."}
                  </p>

                  <div className="mt-5 text-[#F7C600] text-sm font-bold">
                    قراءة المقال ←
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}