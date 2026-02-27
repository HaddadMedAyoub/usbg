import Link from "next/link";
import Image from "next/image";
import SponsorLogo from "@/components/ui/SponsorLogo";

const quickLinks = [
  { label: "من نحن", href: "/about" },
  { label: "الفريق", href: "/team" },
  { label: "الأخبار", href: "/news" },
  { label: "الوسائط", href: "/media" },
  { label: "الذكرى 90", href: "/anniversary" },
  { label: "اتصل بنا", href: "/contact" },
];

const sponsors = [
  {
    name: "CMAF",
    nameFull: "شركة العطاء للنقل الطبي",
    logo: "/images/sponsors/cmaf.png",
  },
  {
    name: "العطاء",
    nameFull: "شركة العطاء للنقل الطبي",
    logo: "/images/sponsors/attaa.png",
  },
];

const clubInfo = [
  { icon: "📍", label: "الموقع", value: "بنقردان، ولاية مدنين، تونس" },
  { icon: "🏟️", label: "الملعب", value: "ملعب 07 مارس — حي المطار" },
  { icon: "📅", label: "التأسيس", value: "1936 — 90 عامًا من العطاء" },
  { icon: "🎽", label: "الألوان", value: "أصفر وأسود" },
];

export default function Footer() {
  return (
    <footer className="bg-[#040404]">

      {/* ══════════════════════════════
          TOP BRAND STRIP
      ══════════════════════════════ */}
      <div className="border-t border-[#F7C600]/20 bg-[#F7C600]/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Logo + name */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-[#F7C600]/10 rounded-full blur-xl" />
              <Image
                src="/brand/logo.png"
                alt="USBG"
                width={56}
                height={56}
                className="relative object-contain"
              />
            </div>
            <div>
              <p className="text-[#F7C600] font-black text-xl tracking-[0.1em]">USBG</p>
              <p className="text-gray-500 text-xs tracking-wide">الاتحاد الرياضي ببنقردان</p>
              <p className="text-gray-700 text-[10px] tracking-widest">فرسان الحدود · منذ 1936</p>
            </div>
          </div>

          <div className="hidden sm:block h-12 w-px bg-[#1a1a1a]" />

          <p className="text-gray-600 text-sm text-center sm:text-right max-w-xs leading-relaxed italic">
            "أصفر وأسود — تاريخ يتجدد وطموح لا يتوقف"
          </p>

          <div className="hidden sm:block h-12 w-px bg-[#1a1a1a]" />

          {/* Social links */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/UnionSportiveBenGuerdane"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-[#1877F2]/20 bg-[#1877F2]/5 hover:bg-[#1877F2]/10 hover:border-[#1877F2]/40 transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-lg bg-[#1877F2]/15 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-xs font-black">Facebook</p>
                <p className="text-gray-600 text-[10px]">تابع صفحتنا</p>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/unionsportivebenguerdane"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-[#E1306C]/20 bg-[#E1306C]/5 hover:bg-[#E1306C]/10 hover:border-[#E1306C]/40 transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-lg bg-[#E1306C]/15 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#E1306C]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163c-3.259 0-3.667.014-4.947.072-1.613.074-3.067.372-4.204 1.508C1.712 2.716 1.414 4.17 1.34 5.783 1.282 7.063 1.268 7.471 1.268 12c0 4.529.014 4.937.072 6.217.074 1.613.372 3.067 1.508 4.204 1.137 1.136 2.591 1.434 4.204 1.508 1.28.058 1.688.072 4.948.072s3.667-.014 4.947-.072c1.613-.074 3.067-.372 4.204-1.508 1.136-1.137 1.434-2.591 1.508-4.204.058-1.28.072-1.688.072-4.948s-.014-3.667-.072-4.947c-.074-1.613-.372-3.067-1.508-4.204C19.214 1.714 17.76 1.416 16.147 1.342 14.867 1.284 14.459 1.27 12 1.27z" />
                  <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-xs font-black">Instagram</p>
                <p className="text-gray-600 text-[10px]">تابع صفحتنا</p>
              </div>
            </a>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════
          MAIN GRID — 3 cols
      ══════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10 border-t border-[#0f0f0f]">

        {/* Col 1 — About */}
        <div className="flex flex-col gap-4">
          <p className="text-white font-black text-sm tracking-wide border-r-2 border-[#F7C600] pr-3">
            عن النادي
          </p>
          <p className="text-gray-600 text-xs leading-[1.9]">
            حكاية مدينة تلبس الأصفر والأسود،
            نبضُ الجنوب حين يعلو،
            وصوتُ الجماهير حين تصنع المجد.
            ليس ناديًا فقط، بل روحُ بنقردان إذا قررت أن تحلم… فتنتصر          </p>
          <Link
            href="/about"
            className="text-[#F7C600] text-xs font-bold flex items-center gap-1.5 hover:gap-3 transition-all duration-200 w-fit mt-auto"
          >
            اقرأ قصتنا
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>

        {/* Col 2 — Quick links */}
        <div className="flex flex-col gap-4">
          <p className="text-white font-black text-sm tracking-wide border-r-2 border-[#F7C600] pr-3">
            روابط سريعة
          </p>
          <ul className="flex flex-col gap-2.5">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-gray-500 hover:text-[#F7C600] text-xs transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#2a2a2a] group-hover:bg-[#F7C600] transition-colors shrink-0" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Club info */}
        <div className="flex flex-col gap-4">
          <p className="text-white font-black text-sm tracking-wide border-r-2 border-[#F7C600] pr-3">
            معلومات النادي
          </p>
          <ul className="flex flex-col gap-3.5">
            {clubInfo.map((item) => (
              <li key={item.label} className="flex items-start gap-2.5">
                <span className="text-[#F7C600] text-xs mt-0.5 shrink-0">{item.icon}</span>
                <div>
                  <p className="text-gray-600 text-[10px] uppercase tracking-wider font-semibold">
                    {item.label}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">{item.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* ══════════════════════════════
          SPONSORS — once, subtle
      ══════════════════════════════ */}
      <div className="border-t border-[#0a0a0a] px-6 py-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-700 text-[11px]">
            © {new Date().getFullYear()} الاتحاد الرياضي ببنقردان · جميع الحقوق محفوظة
          </p>

          {/* Sponsors — center */}
          <div className="flex items-center gap-4">
            <span className="text-gray-700 text-[10px] font-bold tracking-[0.3em] uppercase">
              الرعات الرسميون
            </span>
            <div className="h-3 w-px bg-[#222]" />
            {sponsors.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 opacity-35 hover:opacity-70 transition-opacity"
              >
                <SponsorLogo src={s.logo} alt={s.name} fallback={s.name.slice(0, 1)} />
                <span className="text-gray-500 text-[11px] font-bold">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
