import fs from "node:fs";
import path from "node:path";

type Frontmatter = {
  title: string;
  date: string;
  excerpt?: string;
  coverImage?: string;
};

function parseFrontmatter(md: string): { frontmatter: Partial<Frontmatter>; content: string } {
  if (!md.startsWith("---")) return { frontmatter: {}, content: md };
  const end = md.indexOf("\n---", 3);
  if (end === -1) return { frontmatter: {}, content: md };

  const raw = md.slice(3, end).trim();
  const content = md.slice(end + 4).trim();

  const frontmatter: Record<string, string> = {};
  for (const line of raw.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^"|"$/g, "");
    frontmatter[key] = value;
  }
  return { frontmatter, content };
}

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getSiteConfig() {
  const p = path.join(CONTENT_DIR, "site.json");
  const raw = fs.readFileSync(p, "utf8");
  const clean = raw.replace(/^\uFEFF/, "").trim(); 
  return JSON.parse(clean);
}

export function getAllNews() {
  const newsDir = path.join(CONTENT_DIR, "news");
  if (!fs.existsSync(newsDir)) return [];

  const files = fs.readdirSync(newsDir).filter((f) => f.endsWith(".md"));
  const items = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(newsDir, file), "utf8");
    const { frontmatter, content } = parseFrontmatter(raw);
    return { slug, frontmatter, content };
  });

  items.sort((a, b) => (b.frontmatter.date ?? "").localeCompare(a.frontmatter.date ?? ""));
  return items;
}

export function getNewsBySlug(slug: string) {
  const p = path.join(CONTENT_DIR, "news", `${slug}.md`);
  const raw = fs.readFileSync(p, "utf8");
  const { frontmatter, content } = parseFrontmatter(raw);
  return { slug, frontmatter, content };
}
