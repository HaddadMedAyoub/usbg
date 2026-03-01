import Link from "next/link";
import Image from "next/image";
import SponsorLogo from "@/components/ui/SponsorLogo";

const quickLinks = [
  { label: "من نحن", href: "/about" },
  //{ label: "الفريق", href: "/team" },
  { label: "الأخبار", href: "/news" },
  { label: "المكتبة الرقمية", href: "/media" },
  { label: "الذكرى 90", href: "/anniversary" },
  { label: "اتصل بنا", href: "/contact" },
  { label: "ادارة الجمعية ", href: "/administration" },

];

const sponsors = [
  {
    name: "شركة العطاء للنقل الطبي",
    nameFull: "شركة العطاء للنقل الطبي",
    logo: "/images/sponsors/alataa.png",
  },
  {
    name: "CMAF",
    nameFull: "CMAF",
    logo: "/images/sponsors/cmaf.png",
  },
  {
    name: "ARAF CO",
    nameFull: "STE ARAF CO",
    logo: "/images/sponsors/arafco.png", // ← adjust extension if needed (.jpg / .jpeg / .webp)
  },
];


const clubInfo = [
  { icon: "📍", label: "الموقع", value: "بنقردان، ولاية مدنين، تونس" },
  { icon: "🏟️", label: "الملعب", value: "ملعب 07 مارس — حي المطار" },
  { icon: "📍", label: "التأسيس", value: "ص ب عدد 331 , بنقردان 4160" },
];

export default function Footer() {
  return (
    <footer className="bg-[#040404] border-t border-[#F7C600]/15">

      {/* ══════════════════════════════
          MAIN GRID
      ══════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-8">

        {/* Col 1 — Brand */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 mb-1">
            <Image src="/brand/logo.png" alt="USBG" width={40} height={40} className="object-contain" />
            <div>
              <p className="text-[#F7C600] font-black text-base tracking-[0.1em]">USBG</p>
              <p className="text-gray-600 text-[10px]">فرسان الحدود · منذ 1936</p>
            </div>
          </div>
          <p className="text-gray-600 text-xs leading-relaxed">
            ليس ناديًا فقط، بل روحُ بنقردان إذا قررت أن تحلم… فتنتصر
          </p>
          {/* Social icons only — no text */}
          <div className="flex gap-2 mt-1">
            <a href="https://www.facebook.com/UnionSportiveBenGuerdane" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-[#1877F2]/10 border border-[#1877F2]/20 flex items-center justify-center hover:bg-[#1877F2]/20 transition-colors">
              <svg className="w-3.5 h-3.5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/unionsportivebenguerdane" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-[#E1306C]/10 border border-[#E1306C]/20 flex items-center justify-center hover:bg-[#E1306C]/20 transition-colors">
              <svg className="w-3.5 h-3.5 text-[#E1306C]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163c-3.259 0-3.667.014-4.947.072-1.613.074-3.067.372-4.204 1.508C1.712 2.716 1.414 4.17 1.34 5.783 1.282 7.063 1.268 7.471 1.268 12c0 4.529.014 4.937.072 6.217.074 1.613.372 3.067 1.508 4.204 1.137 1.136 2.591 1.434 4.204 1.508 1.28.058 1.688.072 4.948.072s3.667-.014 4.947-.072c1.613-.074 3.067-.372 4.204-1.508 1.136-1.137 1.434-2.591 1.508-4.204.058-1.28.072-1.688.072-4.948s-.014-3.667-.072-4.947c-.074-1.613-.372-3.067-1.508-4.204C19.214 1.714 17.76 1.416 16.147 1.342 14.867 1.284 14.459 1.27 12 1.27z" />
                <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Col 2 — Quick links */}
        <div className="flex flex-col gap-3">
          <p className="text-[#F7C600] font-black text-xs tracking-widest uppercase border-r-2 border-[#F7C600] pr-3">
            روابط سريعة
          </p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}
                  className="text-gray-500 hover:text-[#F7C600] text-xs transition-colors duration-200 flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#2a2a2a] group-hover:bg-[#F7C600] transition-colors shrink-0" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Club info */}
        <div className="flex flex-col gap-3">
          <p className="text-[#F7C600] font-black text-xs tracking-widest uppercase border-r-2 border-[#F7C600] pr-3">
            معلومات النادي
          </p>
          <ul className="flex flex-col gap-2.5">
            {clubInfo.map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <span className="text-[11px] shrink-0">{item.icon}</span>
                {item.label === "الشعار" ? (
                  <Image src="/brand/logo.png" alt="USBG" width={28} height={28} className="object-contain" />
                ) : (
                  <p className="text-gray-500 text-xs">{item.value}</p>
                )}
              </li>
            ))}

          </ul>
        </div>

      </div>

      {/* ══════════════════════════════
          BOTTOM BAR
      ══════════════════════════════ */}
      <div className="border-t border-[#0f0f0f] px-6 py-3">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-700 text-[10px]">
            © {new Date().getFullYear()} الاتحاد الرياضي ببنقردان · جميع الحقوق محفوظة
          </p>
          <div className="flex items-center gap-3">
            <span className="text-gray-700 text-[10px] font-bold tracking-[0.3em] uppercase">الرعاة</span>
            <div className="h-3 w-px bg-[#222]" />
            {sponsors.map((s, i) => (
              <div key={i} className="flex items-center gap-1.5 opacity-35 hover:opacity-70 transition-opacity">
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
