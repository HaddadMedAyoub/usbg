import { getNewsBySlug } from "@/lib/content";

export default function NewsArticlePage({ params }: { params: { slug: string } }) {
  const { frontmatter, content } = getNewsBySlug(params.slug);

  return (
    <article className="prose prose-neutral max-w-none">
      <h1>{frontmatter.title}</h1>
      <p className="opacity-70">{frontmatter.date}</p>
      <p>{content}</p>
    </article>
  );
}