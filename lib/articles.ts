// lib/articles.ts
import { supabase } from "./supabase";

export type Article = {
  id?: string | number;
  slug: string;
  title_ar: string;
  excerpt_ar?: string | null;
  content_ar?: string | null;
  content_html_ar?: string | null;
  content_json_ar?: any | null;
  image?: string | null;
  images?: string[] | null;
  video_url?: string | null;
  category?: string | null;
  published_at: string | null;
};

// Get all articles
export async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching articles:", error);
    return [];
  }

  return data ?? [];
}

// Get single article by slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Error fetching article:", error);
    return null;
  }

  return data ?? null;
}

// Get articles by category
export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("category", category)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching category articles:", error);
    return [];
  }

  return data ?? [];
}