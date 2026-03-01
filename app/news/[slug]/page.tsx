import { getAllNews, getNewsBySlug } from "@/lib/content";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const news = getAllNews();
  return news.map((n) => ({ slug: n.slug }));
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) return notFound();

  let article;
  try {
    article = getNewsBySlug(slug);
  } catch {
    return notFound();
  }

  const { frontmatter, content } = article;

  return (
    <article className="max-w-2xl mx-auto p-6">
      <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.4em] uppercase mb-3">
        أخبار النادي
      </p>
      <h1 className="text-white font-black text-2xl sm:text-3xl leading-snug mb-2">
        {frontmatter.title}
      </h1>
      <p className="text-gray-500 text-sm mb-6">{frontmatter.date}</p>

      {frontmatter.coverImage ? (
        <img
          src={frontmatter.coverImage}
          alt={frontmatter.title}
          className="w-full rounded-2xl mb-8 object-cover max-h-72"
        />
      ) : null}

      <div className="text-gray-300 leading-8 whitespace-pre-wrap text-sm">
        {content}
      </div>
    </article>
  );
}
