import Link from "next/link";
import { getAllNews } from "@/lib/content";

export default function NewsListPage() {
  const news = getAllNews();

  return (
    <div>
      <h1 className="text-xl font-bold">Ø§Ù„Ø£Ø®Ø¨Ø§Ø± ÙˆØ§Ù„Ø¨Ù„Ø§ØºØ§Øª</h1>
      <div className="mt-4 grid gap-3">
        {news.map((n) => (
          <Link key={n.slug} href={/news/} className="rounded-2xl border p-4">
            <p className="text-sm opacity-70">{n.frontmatter.date}</p>
            <p className="mt-1 font-semibold">{n.frontmatter.title}</p>
            <p className="mt-1 text-sm opacity-80">{n.frontmatter.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
