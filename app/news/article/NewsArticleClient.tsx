// news/article/NewsArticleClient.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getArticleBySlug, Article } from "@/lib/articles";
import ArticleContent from "@/components/ArticleContent";

function getYoutubeEmbed(url?: string | null) {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtube.com")) {
      const v = parsed.searchParams.get("v");
      return v ? `https://www.youtube.com/embed/${v}` : null;
    }

    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    return null;
  } catch {
    return null;
  }
}

export default function NewsArticleClient() {
  const router = useRouter();

  const [slug, setSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState<Article | null>(null);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setSlug(params.get("slug"));
  }, []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        if (!slug) {
          setArticle(null);
          return;
        }
        const a = await getArticleBySlug(slug);
        setArticle(a);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [slug]);

  const formattedDate = useMemo(() => {
    if (!article?.published_at) return null;
    return new Date(article.published_at).toLocaleDateString("ar-TN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [article?.published_at]);

  const youtubeEmbed = getYoutubeEmbed(article?.video_url);

  async function handleShare() {
    if (!article || typeof window === "undefined") return;

    const shareData = {
      title: article.title_ar,
      text: article.excerpt_ar || article.title_ar,
      url: window.location.href,
    };

    try {
      setSharing(true);

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("تم نسخ رابط المقال.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSharing(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-16 text-white">
        جارٍ التحميل...
      </div>
    );
  }

  if (!slug || !article) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="rounded-3xl border border-[#232323] bg-[#111] p-8 text-white">
          <h2 className="text-2xl font-black mb-3">المقال غير موجود</h2>
          <p className="text-gray-400 mb-6">
            لم نتمكن من العثور على هذا المقال.
          </p>
          <button
            onClick={() => router.push("/news")}
            className="rounded-full bg-[#F7C600] px-5 py-2.5 text-black font-bold"
          >
            الرجوع إلى الأخبار
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[#0b0b0b]">
      <div className="max-w-5xl mx-auto px-6 py-8 sm:py-12">
        <div className="mb-8 flex items-center justify-between gap-4">
          <button
            className="text-gray-400 hover:text-white underline underline-offset-4 transition"
            onClick={() => router.push("/news")}
          >
            الرجوع إلى الأخبار
          </button>

          <button
            onClick={handleShare}
            disabled={sharing}
            className="rounded-full border border-[#2a2a2a] bg-[#151515] px-4 py-2 text-sm text-white hover:border-[#F7C600]/40 transition"
          >
            {sharing ? "..." : "مشاركة"}
          </button>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-[#1f1f1f] bg-[#101010] shadow-[0_16px_60px_rgba(0,0,0,0.35)]">
          {article.image && (
            <div className="relative h-[260px] sm:h-[380px] md:h-[460px] overflow-hidden">
              <img
                src={article.image}
                alt={article.title_ar}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>
          )}

          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              {article.category && (
                <span className="inline-flex items-center rounded-full border border-[#F7C600]/30 bg-[#F7C600]/10 px-3 py-1 text-xs font-bold text-[#F7C600]">
                  {article.category}
                </span>
              )}

              {formattedDate && (
                <span className="text-sm text-gray-400">{formattedDate}</span>
              )}
            </div>

            <h1 className="mb-5 text-white font-black text-3xl sm:text-4xl leading-snug">
              {article.title_ar}
            </h1>

            {article.excerpt_ar && (
              <p className="mb-8 text-lg leading-8 text-gray-300 border-r-4 border-[#F7C600] pr-4">
                {article.excerpt_ar}
              </p>
            )}

            <ArticleContent
              html={article.content_html_ar}
              text={article.content_ar}
            />

            {youtubeEmbed && (
              <section className="mt-10">
                <h2 className="mb-4 text-white text-xl font-black">فيديو</h2>
                <div className="overflow-hidden rounded-2xl border border-[#232323] bg-black aspect-video">
                  <iframe
                    src={youtubeEmbed}
                    title={article.title_ar}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </section>
            )}

            {!!article.images?.length && (
              <section className="mt-10">
                <h2 className="mb-4 text-white text-xl font-black">معرض الصور</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {article.images.map((img, idx) => (
                    <div
                      key={`${img}-${idx}`}
                      className="overflow-hidden rounded-2xl border border-[#232323] bg-[#0d0d0d]"
                    >
                      <img
                        src={img}
                        alt={`${article.title_ar} ${idx + 1}`}
                        className="w-full h-[240px] object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}