// lib/players.ts
import { supabase } from "./supabase";

export type Player = {
  id?: string;
  slug: string;
  number: number | null;
  name: string;
  name_ar: string;
  position: "GK" | "DEF" | "MID" | "FWD";
  age: number | null;
  apps: number;
  minutes: number;
  goals: number;
  assists: number;
  yellow_cards: number;
  red_cards: number;
  nationality: string;
  photo: string | null;
  is_active: boolean;
  created_at?: string;
  bio?: string | null;
  bio_ar?: string | null;
};

export async function getPlayers(): Promise<Player[]> {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("is_active", true)
    .order("position", { ascending: true })
    .order("number", { ascending: true });

  if (error) {
    console.error("Error fetching players:", error);
    return [];
  }

  return (data ?? []) as Player[];
}

export async function getPlayerBySlug(slug: string): Promise<Player | null> {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Error fetching player:", error);
    return null;
  }

  return (data as Player) ?? null;
}
