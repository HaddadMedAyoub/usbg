import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { label: "من نحن", href: "/about" },
  { label: "الفريق", href: "/team" },
  { label: "الأخبار", href: "/news" },
  { label: "الوسائط", href: "/media" },
  { label: "الذكرى 90", href: "/anniversary" },
  { label: "اتصل بنا", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#060606] border-t border-[#151515]">

      {/* Main footer grid */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-3 gap-10">

        {/* Brand column */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo.png"
              alt="USBG"
              width={52}
              height={52}
              className="object-contain"
            />
            <div>
              <p className="text-[#F7C600] font-black text-base tracking-wider">USBG</p>
              <p className="text-gray-600 text-[11px]">الاتحاد الرياضي ببنقردان</p>
            </div>
          </div>
          <p className="text-gray-600 text-xs leading-relaxed max-w-[220px]">
            فرسان الحدود — أصفر وأسود منذ ١٩٣٦. تاريخ يتجدد وطموح لا يتوقف.
          </p>
          {/* Sponsor mention */}
          <div className="mt-auto pt-4 border-t border-[#151515]">
            <p className="text-gray-700 text-[10px] uppercase tracking-widest mb-1.5">الراعي الرسمي</p>
            <p className="text-white text-xs font-bold">CMAF</p>
            <p className="text-gray-600 text-[11px]">شركة العطاء للنقل الطبي</p>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <p className="text-white font-black text-sm mb-5 tracking-wide">روابط سريعة</p>
          <ul className="flex flex-col gap-3">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-gray-500 hover:text-[#F7C600] text-sm transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#F7C600]/30 group-hover:bg-[#F7C600] transition-colors" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Club info */}
        <div>
          <p className="text-white font-black text-sm mb-5 tracking-wide">معلومات النادي</p>
          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-3">
              <span className="text-[#F7C600] mt-0.5 text-sm">📍</span>
              <div>
                <p className="text-white text-xs font-semibold">الموقع</p>
                <p className="text-gray-500 text-xs">بنقردان، ولاية مدنين، تونس</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#F7C600] mt-0.5 text-sm">🏟️</span>
              <div>
                <p className="text-white text-xs font-semibold">الملعب الرسمي</p>
                <p className="text-gray-500 text-xs">ملعب 07 مارس — حي المطار</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#F7C600] mt-0.5 text-sm">📅</span>
              <div>
                <p className="text-white text-xs font-semibold">سنة التأسيس</p>
                <p className="text-gray-500 text-xs">١٩٣٦ — ٩٠ سنة من العطاء</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#F7C600] mt-0.5 text-sm">🎽</span>
              <div>
                <p className="text-white text-xs font-semibold">الألوان</p>
                <p className="text-gray-500 text-xs">أصفر وأسود</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#111] px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-gray-700 text-[11px]">
          © {new Date().getFullYear()} الاتحاد الرياضي ببنقردان · جميع الحقوق محفوظة
        </p>
        <p className="text-gray-700 text-[11px]">
          صُنع بـ 🖤💛 كهدية للذكرى التسعين
        </p>
      </div>
    </footer>
  );
}
