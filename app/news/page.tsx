import Link from "next/link";
import { getAllNews } from "@/lib/content";

export default function NewsListPage() {
  const news = getAllNews();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.4em] uppercase mb-2">
        الأخبار
      </p>
      <h1 className="text-white font-black text-2xl sm:text-3xl mb-8">
        الأخبار والبلاغات
      </h1>

      <div className="grid gap-4">
        {news.map((n) => (
          <Link
            key={n.slug}
            href={`/news/${n.slug}`}
            className="flex gap-4 items-start rounded-2xl border border-[#2a2a2a] p-4 hover:border-[#F7C600]/30 hover:bg-[#F7C600]/5 transition-all duration-200"
          >
            {/* Thumbnail */}
            <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-[#1a1a1a] flex items-center justify-center">
              {n.frontmatter.coverImage ? (
                <img
                  src={n.frontmatter.coverImage}
                  alt={n.frontmatter.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[#F7C600] text-2xl font-black">US</span>
              )}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-gray-500 text-xs mb-1">{n.frontmatter.date}</p>
              <p className="text-white font-bold text-sm leading-snug line-clamp-2">
                {n.frontmatter.title}
              </p>
              {n.frontmatter.excerpt ? (
                <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                  {n.frontmatter.excerpt}
                </p>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
