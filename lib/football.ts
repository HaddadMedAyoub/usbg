const BASE = "https://www.thesportsdb.com/api/v1/json/3";
const USBG_TEAM_ID = "139870";

export async function fetchUSBGFixtures() {
  const res = await fetch(
    `${BASE}/eventsseason.php?id=${USBG_TEAM_ID}&s=2025-2026`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  const events = data.events ?? [];

  const now = new Date();

  const lastResult = events
    .filter((e: any) => e.intHomeScore !== null && new Date(e.strTimestamp) < now)
    .sort((a: any, b: any) =>
      new Date(b.strTimestamp).getTime() - new Date(a.strTimestamp).getTime()
    )[0] ?? null;

  const nextMatch = events
    .filter((e: any) => e.intHomeScore === null && new Date(e.strTimestamp) > now)
    .sort((a: any, b: any) =>
      new Date(a.strTimestamp).getTime() - new Date(b.strTimestamp).getTime()
    )[0] ?? null;

  return { lastResult, nextMatch, allMatches: events };
}
