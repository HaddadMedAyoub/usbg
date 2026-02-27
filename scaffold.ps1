$ErrorActionPreference = "Stop"

if (!(Test-Path ".\package.json")) {
  Write-Host "ERROR: Run this from the project root (where package.json exists)." -ForegroundColor Red
  exit 1
}

# ---------- Folders ----------
$dirs = @(
  "app\about",
  "app\board",
  "app\team",
  "app\news\[slug]",
  "app\media",
  "app\contact",
  "app\anniversary",
  "components\shell",
  "components\blocks",
  "components\ui",
  "content\news",
  "lib",
  "public\brand",
  "public\images\placeholders"
)

foreach ($d in $dirs) { New-Item -ItemType Directory -Force -Path $d | Out-Null }

function Write-FileIfMissing($path, $content) {
  if (Test-Path $path) {
    Write-Host "SKIP (exists): $path" -ForegroundColor DarkGray
  } else {
    $parent = Split-Path $path -Parent
    if ($parent -and !(Test-Path $parent)) { New-Item -ItemType Directory -Force -Path $parent | Out-Null }
[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)   
 Write-Host "CREATE: $path" -ForegroundColor Green
  }
}

# ---------- lib ----------
Write-FileIfMissing "lib\routes.ts" @"
export const routes = [
  { href: "/", label: "الرئيسية" },
  { href: "/anniversary", label: "90 سنة" },
  { href: "/news", label: "الأخبار" },
  { href: "/team", label: "الفريق" },
  { href: "/media", label: "المعرض" },
  { href: "/about", label: "من نحن" },
  { href: "/board", label: "الهيئة المديرة" },
  { href: "/contact", label: "اتصل بنا" },
] as const;
"@

Write-FileIfMissing "lib\content.ts" @"
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
  return JSON.parse(fs.readFileSync(p, "utf8"));
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
"@

# ---------- content ----------
Write-FileIfMissing "content\site.json" @"
{
  "clubName": "USBG",
  "fullName": "Union Sportive de Ben Guerdane",
  "founded": 1936,
  "colors": { "primary": "#F7C600", "secondary": "#111111" },
  "stadium": "Stade 7 Mars",
  "city": "Ben Guerdane",
  "socials": {
    "facebook": "",
    "instagram": "",
    "youtube": ""
  }
}
"@

Write-FileIfMissing "content\news\2026-02-10-welcome.md" @"
---
title: "مرحبا بكم في موقع USBG 90"
date: "2026-02-10"
excerpt: "إطلاق النسخة الأولى من موقع الذكرى 90 سنة."
coverImage: "/images/placeholders/hero.jpg"
---

هذا مثال لخبر. يمكنك إضافة أخبار أخرى في مجلد content/news.
"@

# ---------- components (mobile-first shell) ----------
Write-FileIfMissing "components\shell\Header.tsx" @"
"use client";

import Link from "next/link";
import { useState } from "react";
import { routes } from "@/lib/routes";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="font-bold">
          USBG<span className="opacity-60">90</span>
        </Link>

        <button
          className="rounded-xl border px-3 py-2 text-sm"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="absolute inset-y-0 right-0 w-80 max-w-[85%] bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">القائمة</p>
              <button
                className="rounded-xl border px-3 py-2 text-sm"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            <nav className="mt-4 flex flex-col gap-2">
              {routes.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="rounded-xl px-3 py-3 text-right hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  {r.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
"@

Write-FileIfMissing "components\shell\Footer.tsx" @"
import { getSiteConfig } from "@/lib/content";

export default function Footer() {
  const site = getSiteConfig();

  return (
    <footer className="mt-12 border-t">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm opacity-80">
        <p className="text-center">
          © {new Date().getFullYear()} {site.clubName} — {site.city}
        </p>
      </div>
    </footer>
  );
}
"@

# ---------- app pages (placeholders, no overwrite of existing app/page.tsx) ----------
$placeholder = @"
export default function Page() {
  return (
    <div className="space-y-2">
      <h1 className="text-xl font-bold">قيد الإنشاء</h1>
      <p className="opacity-80">هذه الصفحة سنكملها لاحقًا.</p>
    </div>
  );
}
"@

Write-FileIfMissing "app\about\page.tsx" $placeholder
Write-FileIfMissing "app\board\page.tsx" $placeholder
Write-FileIfMissing "app\team\page.tsx" $placeholder
Write-FileIfMissing "app\media\page.tsx" $placeholder
Write-FileIfMissing "app\contact\page.tsx" $placeholder
Write-FileIfMissing "app\anniversary\page.tsx" $placeholder

Write-FileIfMissing "app\news\page.tsx" @"
import Link from "next/link";
import { getAllNews } from "@/lib/content";

export default function NewsListPage() {
  const news = getAllNews();

  return (
    <div>
      <h1 className="text-xl font-bold">الأخبار والبلاغات</h1>
      <div className="mt-4 grid gap-3">
        {news.map((n) => (
          <Link key={n.slug} href={`/news/${n.slug}`} className="rounded-2xl border p-4">
            <p className="text-sm opacity-70">{n.frontmatter.date}</p>
            <p className="mt-1 font-semibold">{n.frontmatter.title}</p>
            <p className="mt-1 text-sm opacity-80">{n.frontmatter.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
"@

Write-FileIfMissing "app\news\[slug]\page.tsx" @"
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
"@

Write-Host ""
Write-Host "✅ Scaffold done." -ForegroundColor Green
Write-Host "Next: add Header/Footer into app/layout.tsx (1 small edit)." -ForegroundColor Yellow