import { getAllNews, getNewsBySlug } from "@/lib/content";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
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

  const { frontmatter, content } = getNewsBySlug(slug);

  return (
    <article className="prose prose-neutral max-w-none">
      <h1>{frontmatter.title}</h1>
      <p className="opacity-70">{frontmatter.date}</p>
      <p>{content}</p>
    </article>
  );
}