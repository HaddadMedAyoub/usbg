import Link from "next/link";
import Image from "next/image";
import SponsorLogo from "@/components/ui/SponsorLogo";

const socials = [
  {
    name: "Facebook",
    handle: "UnionSportiveBenGuerdane",
    href: "https://www.facebook.com/UnionSportiveBenGuerdane",
    color: "#1877F2",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
];

const info = [
  {
    icon: "📍",
    label: "العنوان",
    value: "بنقردان، ولاية مدنين، تونس",
    sub: "الجنوب الشرقي التونسي",
  },
  {
    icon: "🏟️",
    label: "الملعب الرسمي",
    value: "ملعب 07 مارس",
    sub: "حي المطار، بنقردان",
  },
  {
    icon: "📅",
    label: "تأسس سنة",
    value: "1936",
    sub: "90 عامًا من العطاء",
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">

      {/* ════════════════════════════
          HERO
      ════════════════════════════ */}
      <section className="relative py-24 px-4 flex flex-col items-center justify-center text-center overflow-hidden">

        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#F7C600]/6 rounded-full blur-[120px]" />
        </div>

        {/* Ghost text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span
            className="font-black text-transparent select-none"
            style={{
              fontSize: "clamp(4rem, 22vw, 14rem)",
              WebkitTextStroke: "1px rgba(247,198,0,0.04)",
            }}
          >
            CONTACT
          </span>
        </div>

        <p className="relative z-10 text-[#F7C600]/60 text-[11px] font-bold tracking-[0.4em] uppercase mb-4">
          USBG · تواصل معنا
        </p>
        <h1
          className="relative z-10 text-white font-black leading-tight mb-4"
          style={{ fontSize: "clamp(2rem, 8vw, 4rem)" }}
        >
          اتصل <span className="text-[#F7C600]">بنا</span>
        </h1>
        <div className="relative z-10 flex items-center gap-3 mb-4">
          <span className="h-px w-12 bg-[#F7C600]/40" />
          <p className="text-gray-400 font-semibold text-sm sm:text-base">
            نحن هنا للإجابة على استفساراتكم
          </p>
          <span className="h-px w-12 bg-[#F7C600]/40" />
        </div>
      </section>

      {/* ════════════════════════════
          MAIN CONTENT
      ════════════════════════════ */}
      <section className="py-10 px-4 bg-[#050505]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ── Left: Info cards ── */}
          <div className="flex flex-col gap-5">
            <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.4em] uppercase mb-2">
              معلومات النادي
            </p>

            {info.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl border border-[#1f1f1f] bg-[#0a0a0a] hover:border-[#F7C600]/20 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F7C600]/10 border border-[#F7C600]/20 flex items-center justify-center text-xl shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-gray-600 text-[10px] font-bold tracking-widest uppercase mb-1">
                    {item.label}
                  </p>
                  <p className="text-white font-black text-base">{item.value}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}

            {/* Sponsors */}
            <div className="flex flex-col gap-3">
              <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.4em] uppercase mb-1">
                الرعاة الرسميون
              </p>
              {[
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
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-5 rounded-2xl border border-[#F7C600]/15 bg-[#F7C600]/5 hover:border-[#F7C600]/30 transition-colors"
                >
                  <SponsorLogo
                    src={s.logo}
                    alt={s.name}
                    fallback={s.name.slice(0, 1)}
                  />
                  <div>
                    <p className="text-[#F7C600]/60 text-[10px] font-bold tracking-widest uppercase mb-0.5">
                      راعٍ رسمي
                    </p>
                    <p className="text-[#F7C600] font-black text-base">{s.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{s.nameFull}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ── Right: Social + Map ── */}
          <div className="flex flex-col gap-5">
            <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.4em] uppercase mb-2">
              تابعنا
            </p>

            {/* Facebook card */}
            <a
              href="https://www.facebook.com/UnionSportiveBenGuerdane"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl border border-[#1f1f1f] bg-[#0a0a0a] hover:border-[#1877F2]/40 hover:bg-[#1877F2]/5 transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#1877F2]/10 border border-[#1877F2]/20 flex items-center justify-center shrink-0 group-hover:bg-[#1877F2]/20 transition-colors">
                <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-white font-black text-sm">Facebook</p>
                <p className="text-gray-600 text-xs mt-0.5">UnionSportiveBenGuerdane</p>
              </div>
              <svg className="w-4 h-4 text-gray-700 group-hover:text-[#1877F2] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            {/* Map embed */}
            <div className="rounded-2xl overflow-hidden border border-[#1f1f1f] flex-1 min-h-[240px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d834.0!2d11.2062667!3d33.152719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13ab050062c169c1%3A0xfbc255134e04a437!2sStade%20de%20Ben%20Guerdane!5e1!3m2!1sfr!2stn!4v1740000000000"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "280px", filter: "grayscale(1) invert(1) contrast(0.85)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ملعب بن قردان — Stade de Ben Guerdane"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          SEND MESSAGE SECTION
      ════════════════════════════ */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.4em] uppercase mb-3 text-center">
            راسلنا
          </p>
          <h2 className="text-white font-black text-2xl sm:text-3xl mb-3 text-center">
            لديك استفسار؟
          </h2>
          <p className="text-gray-600 text-sm text-center mb-10">
            تواصل معنا عبر صفحتنا على فيسبوك وسنرد في أقرب وقت ممكن
          </p>

          {/* CTA to Facebook messenger */}
          <div className="flex flex-col gap-4">
            <a
              href="https://m.me/UnionSportiveBenGuerdane"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-[#1877F2] text-white font-black text-sm rounded-xl hover:bg-[#1464d8] transition-colors shadow-[0_0_30px_rgba(24,119,242,0.2)]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
              راسلنا على Facebook
            </a>

            <a
              href="https://www.facebook.com/UnionSportiveBenGuerdane"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-[#0a0a0a] border border-[#2a2a2a] text-white font-black text-sm rounded-xl hover:border-[#F7C600]/30 hover:bg-[#F7C600]/5 transition-all duration-200"
            >
              تابع صفحتنا الرسمية
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          CLOSING STRIP
      ════════════════════════════ */}
      <section className="py-12 px-4 bg-[#F7C600] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 z-10">
          <div className="flex items-center gap-4">
            <Image
              src="/brand/logo.png"
              alt="USBG"
              width={50}
              height={50}
              className="object-contain"
            />
            <div>
              <p className="text-black font-black text-base">الاتحاد الرياضي ببنقردان</p>
              <p className="text-black/50 text-xs">فرسان الحدود · منذ 1936</p>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <Link
              href="/about"
              className="px-5 py-2.5 bg-black text-[#F7C600] font-black text-xs rounded-lg hover:bg-[#111] transition-colors"
            >
              من نحن
            </Link>
            <Link
              href="/anniversary"
              className="px-5 py-2.5 bg-black/10 border border-black/15 text-black font-black text-xs rounded-lg hover:bg-black/20 transition-colors"
            >
              🎉 تسعينية الاتحاد
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
