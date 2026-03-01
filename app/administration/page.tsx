import Image from "next/image";

const administrations = [
  {
    era: "2025 — حتى الآن",
    title: "الهيئة المديرة",
    current: true,
    isMedical: false,
    members: [
      { name: "عمار الجريئ", role: "رئيس النادي", photo: "/images/administration/moudir.jpeg" },
      { name: "شهر الدين عون", role: "نائب الرئيس", photo: "/images/administration/chahreddineoun.jpeg" },
      { name: "لمجد جاءبالله", role: "الكاتب العام", photo: "/images/administration/lamjedjaballah.jpeg" },
      { name: "لزهر المحظي", role: "أمين المال", photo: "/images/administration/lazhermahdi.jpeg" },
      { name: "وليد فارس", role: "المدير الرياضي", photo: "/images/administration/walidfares.jpeg" },
    ],
  },
  {
    era: "2024 — 2025",
    title: "الهيئة المديرة",
    current: false,
    isMedical: false,
    members: [
      { name: "الفتحي هلال", role: "رئيس النادي", photo: "/images/administration/fathihlal.jpeg" },
      { name: "المنحي عبعاب", role: "نائب الرئيس", photo: "/images/administration/monjiabaab.jpeg" },
      { name: "حامد نبهان", role: "الكاتب العام", photo: "/images/administration/hamednabhan.jpeg" },
      { name: "فرح السالمي", role: "أمين المال", photo: "/images/administration/farahsalmi.jpeg" },
      { name: "ايمن شندول", role: "المدير الرياضي", photo: "/images/administration/aymenchandoul.jpeg" },
    ],
  },
  {
    title: "الطاقم الطبي",
    current: false,
    isMedical: true,
    members: [
      { name: " الدكتور عمارة لملوم ", role: "طبيب الفريق", photo: "/images/medical/amaralamloum.jpeg" },
      { name: " ياسين شواط", role: " اخصائي فيزيائي", photo: "/images/medical/yassinechouat.jpeg" },
      { name: "امان الجدي", role: "مساعد طبي", photo: "/images/medical/amenjadi.jpeg" },
    ],
  },
];

function MemberCard({ member, highlight, medical }: {
  member: { name: string; role: string; photo?: string };
  highlight: boolean;
  medical?: boolean;
}) {
  return (
    <div className={`p-4 rounded-2xl border text-center ${
      highlight ? "bg-[#F7C600]/5 border-[#F7C600]/20"
      : medical ? "bg-[#0a1a1a] border-[#0d2a2a]"
      : "bg-[#0a0a0a] border-[#1a1a1a]"
    }`}>
      <div className={`relative w-16 h-16 rounded-full overflow-hidden border-2 mx-auto mb-3 ${
        medical ? "border-[#22d3ee]/30" : "border-[#F7C600]/20"
      }`}>
        {member.photo ? (
          <Image src={member.photo} alt={member.name} fill className="object-cover object-top" unoptimized />
        ) : (
          <div className="w-full h-full bg-[#111] flex items-center justify-center">
            <span className="text-xl opacity-30">{medical ? "🩺" : "👤"}</span>
          </div>
        )}
      </div>
      <p className={`font-black text-xs ${
        highlight ? "text-white" : medical ? "text-cyan-400/70" : "text-gray-600"
      }`}>{member.name}</p>
      <p className="text-gray-700 text-[10px] mt-0.5">{member.role}</p>
    </div>
  );
}

export default function AdministrationPage() {
  return (
    <div className="min-h-screen bg-black px-4 py-20">
      <div className="max-w-4xl mx-auto">

        <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.5em] uppercase mb-3 text-center">
          الهيكل التنظيمي
        </p>
        <h1 className="text-white font-black text-3xl sm:text-4xl text-center mb-16">
          مجلس الإدارة
        </h1>

        {administrations.map((admin, i) => (
          <div key={i} className="mb-14">

            {/* Era header */}
            <div className="flex items-center gap-3 mb-6">
              {admin.current ? (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7C600]/10 border border-[#F7C600]/20 text-[#F7C600] text-[10px] font-black">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F7C600] animate-pulse" />
                  الحالي
                </span>
              ) : admin.isMedical ? (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-900/20 border border-cyan-800/30 text-cyan-500 text-[10px] font-black">
                  🩺 طبي
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-[#111] border border-[#1f1f1f] text-gray-700 text-[10px] font-black">
                  سابق
                </span>
              )}
              <p className={`font-black text-lg ${
                admin.current ? "text-white" : admin.isMedical ? "text-cyan-400/70" : "text-gray-600"
              }`}>{admin.title}</p>
              <span className="text-gray-700 text-xs">{admin.era}</span>
            </div>

            {admin.current ? (
              /* ── Current board: hierarchical layout ── */
              <div className="flex flex-col gap-4">
                <div className="flex justify-center">
                  <div className="w-1/2 sm:w-1/4">
                    <MemberCard member={admin.members[0]} highlight={true} />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-1/2 sm:w-1/4">
                    <MemberCard member={admin.members[1]} highlight={true} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:w-1/2 mx-auto w-full">
                  <MemberCard member={admin.members[2]} highlight={true} />
                  <MemberCard member={admin.members[3]} highlight={true} />
                </div>
                <div className="flex justify-center">
                  <div className="w-1/2 sm:w-1/4">
                    <MemberCard member={admin.members[4]} highlight={true} />
                  </div>
                </div>
              </div>

            ) : admin.isMedical ? (
              /* ── Medical team: doctor alone, physicians below ── */
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-1">
                  <span className="h-px flex-1 bg-[#111]" />
                  <span className="text-cyan-900 text-[10px] font-bold tracking-widest uppercase">الطاقم الطبي</span>
                  <span className="h-px flex-1 bg-[#111]" />
                </div>
                {/* Doctor alone */}
                <div className="flex justify-center">
                  <div className="w-1/2 sm:w-1/4">
                    <MemberCard member={admin.members[0]} highlight={false} medical={true} />
                  </div>
                </div>
                {/* Physicians side by side */}
                <div className="grid grid-cols-2 gap-3 sm:w-1/2 mx-auto w-full">
                  {admin.members.slice(1).map((m, j) => (
                    <MemberCard key={j} member={m} highlight={false} medical={true} />
                  ))}
                </div>
              </div>

            ) : (
              /* ── Past boards: flat grid ── */
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 mb-1">
                  <span className="h-px flex-1 bg-[#111]" />
                  <span className="text-gray-800 text-[10px] font-bold tracking-widest uppercase">هيئة سابقة</span>
                  <span className="h-px flex-1 bg-[#111]" />
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {admin.members.map((m, j) => {
                    const isLast = j === admin.members.length - 1;
                    const isOdd = admin.members.length % 2 !== 0;
                    return (
                      <div key={j} className={`${isLast && isOdd ? "w-1/2 sm:w-1/4" : "w-[calc(50%-6px)] sm:w-[calc(25%-9px)]"}`}>
                        <MemberCard member={m} highlight={false} medical={false} />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}
