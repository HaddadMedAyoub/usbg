import Link from "next/link";

type HeroProps = {
  title: string;
  subtitle: string;
  tagline: string;
};

export default function Hero({ title, subtitle, tagline }: HeroProps) {
  return (
    <section
      className="w-full"
      style={{ background: "var(--usbg-black, #0b0b0b)" }}
    >
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Small badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: "var(--usbg-yellow, #feda01)" }}
          />
          USBG • 90
        </div>

        <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white md:text-4xl">
          {title}
        </h1>

        <p className="mt-3 text-base font-semibold text-white/85">
          {subtitle}
        </p>

        <p className="mt-3 max-w-xl text-base leading-relaxed text-white/75">
          {tagline}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/anniversary"
            className="rounded-2xl px-5 py-3 text-sm font-semibold"
            style={{
              background: "var(--usbg-yellow, #feda01)",
              color: "var(--usbg-black, #0b0b0b)",
            }}
          >
            صفحة الذكرى
          </Link>

          <Link
            href="/news"
            className="rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-white"
          >
            آخر الأخبار
          </Link>
        </div>

        {/* Yellow accent line */}
        <div
          className="mt-8 h-1 w-24 rounded-full"
          style={{ background: "var(--usbg-yellow, #feda01)" }}
        />
      </div>
    </section>
  );
}