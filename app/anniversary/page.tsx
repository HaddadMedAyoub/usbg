import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import Countdown from "@/components/blocks/Countdown";

type ProgramItem = { time: string; title: string; desc?: string };
type DownloadItem = { label: string; href: string };

type AnniversaryContent = {
  dateISO: string;
  title: string;
  subtitle: string;
  message: string;
  program: ProgramItem[];
  statementTitle: string;
  statementBody: string;
  downloads: DownloadItem[];
};

function getAnniversaryContent(): AnniversaryContent {
  const p = path.join(process.cwd(), "content", "anniversary.json");
  const raw = fs.readFileSync(p, "utf8").replace(/^\uFEFF/, "").trim();
  return JSON.parse(raw);
}

export default function AnniversaryPage() {
  const data = getAnniversaryContent();

  return (
    <div className="w-full">
      {/* Hero section full width */}
      <section style={{ background: "var(--usbg-black, #0b0b0b)" }}>
        <div className="mx-auto max-w-5xl px-4 py-10">
          <p className="text-xs font-semibold text-white/70">USBG • 1936–2026</p>

          <h1 className="mt-2 text-3xl font-extrabold text-white">
            {data.title}
          </h1>

          <p className="mt-3 text-base font-semibold text-white/85">
            {data.subtitle}
          </p>

          <p className="mt-3 max-w-xl text-base leading-relaxed text-white/75">
            {data.message}
          </p>

          <div className="mt-6">
            <Countdown targetISO={data.dateISO} />
          </div>

          <div
            className="mt-8 h-1 w-24 rounded-full"
            style={{ background: "var(--usbg-yellow, #feda01)" }}
          />
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-5xl space-y-10 px-4 py-8">
        {/* Program */}
        <section>
          <h2 className="text-lg font-extrabold">برنامج الذكرى</h2>
          <div className="mt-4 space-y-3">
            {data.program.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold">{item.title}</p>
                    {item.desc ? (
                      <p className="mt-1 text-sm opacity-80">{item.desc}</p>
                    ) : null}
                  </div>

                  <div
                    className="shrink-0 rounded-xl px-3 py-1 text-sm font-extrabold"
                    style={{
                      background: "var(--usbg-yellow, #feda01)",
                      color: "var(--usbg-black, #0b0b0b)",
                    }}
                  >
                    {item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Statement */}
        <section className="rounded-3xl border p-5">
          <h2 className="text-lg font-extrabold">{data.statementTitle}</h2>
          <p className="mt-3 leading-relaxed opacity-85">{data.statementBody}</p>
        </section>

{/* Downloads */}
<section>
  <h2 className="text-lg font-extrabold">تحميلات</h2>

  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
    {data.downloads.map((d) => (
      <div
        key={d.href}
        className="overflow-hidden rounded-2xl border bg-white"
      >
        {/* Small Preview */}
        <div className="relative aspect-[3/4] w-full bg-black/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={d.href}
            alt={d.label}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Download Button */}
        <div className="p-2">
          <a
            href={d.href}
            download
            className="block w-full rounded-xl py-2 text-center text-xs font-semibold"
            style={{
              background: "var(--usbg-yellow, #feda01)",
              color: "var(--usbg-black, #0b0b0b)",
            }}
          >
            تحميل
          </a>
        </div>
      </div>
    ))}
  </div>
</section>
      </div>
    </div>
  );
}