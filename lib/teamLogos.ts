// lib/teamLogos.ts

const teamLogos: Record<string, string> = {
  "Ben Guerdane": "/images/teams/ben-guerdane.png",
  "AS Gabes": "/images/teams/as-gabes.png",
  "AS Marsa": "/images/teams/as-marsa.png",
  "AS Soliman": "/images/teams/as-soliman.png",
  "CA Bizertin": "/images/teams/bizertin.png",
  "Club Africain": "/images/teams/club-africain.gif",
  "Esperance Tunis": "/images/teams/esperance.png",
  "Etoile Sahel": "/images/teams/etoile-sahel.png",
  "JS Kairouan": "/images/teams/js-kairouan.png",
  "JS Omrane": "/images/teams/js-omrane.png",
  "Metlaoui": "/images/teams/metlaoui.png",
  "Olympique Beja": "/images/teams/olympique-beja.png",
  "CS Sfaxien": "/images/teams/sfaxien.gif",
  "Stade Tunisien": "/images/teams/stade-tunisien.png",
  "US Monastir": "/images/teams/usm-monastir.png",
  "Zarzis": "/images/teams/zarzis.png",
  "Msaken": "/images/teams/msaken.png",
  "Hamam-Sousse": "/images/teams/hammam-sousse.png",
  "Hammam-Lif": "/images/teams/hammam-lif.png",
  "PS Sakiet Eddaier": "/images/teams/ps-sakiet-eddaier.png",

  // aliases matching DB values
  "Monastir": "/images/teams/usm-monastir.png",
  "Soliman": "/images/teams/as-soliman.png",
};

// Normalize a name so different dashes / spaces / casing all match the same
// logo (e.g. "Hammam-Lif", "Hammam Lif", "hammam–lif" -> "hammamlif").
function normKey(s: string): string {
  return (s || "").toLowerCase().normalize("NFKD").replace(/[^a-z0-9]/g, "");
}

const normalizedLogos: Record<string, string> = Object.fromEntries(
  Object.entries(teamLogos).map(([k, v]) => [normKey(k), v])
);

export function getTeamLogo(team: string): string | undefined {
  return teamLogos[team] ?? normalizedLogos[normKey(team)];
}