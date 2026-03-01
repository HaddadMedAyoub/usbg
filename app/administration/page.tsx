const administrations = [
  {
    era: "2025 — حتى الآن",
    title: "الهيئة المديرة",
    current: true,
    isMedical: false,
    members: [
      { name: "عمار الجريئ",     role: "رئيس النادي"  },
      { name: "شهر الدين عون",   role: "نائب الرئيس"  },
      { name: "لمجد جاءبالله",   role: "الكاتب العام" },
      { name: "لزهر المحظي",     role: "أمين المال"   },
    ],
  },
  {
    title: "الطاقم الطبي",
    current: false,
    isMedical: true,
    members: [
      { name: "الدكتور عمارة لملوم", role: "طبيب الفريق"    },
      { name: "ياسين شواط",          role: "اخصائي فيزيائي" },
      { name: "امان الجدي",           role: "مساعد طبي"      },
    ],
  },
];

function MemberCard({ member, highlight, medical }: {
  member: { name: string; role: string };
  highlight: boolean;
  medical?: boolean;
}) {
  return (
    <div className={`px-5 py-4 rounded-2xl border text-center transition-all ${
      highlight
        ? "bg-[#F7C600]/5 border-[#F7C600]/20 hover:bg-[#F7C600]/10"
        : medical
        ? "bg-[#0a1a1a] border-cyan-900/30 hover:border-cyan-800/50"
        : "bg-[#0a0a0a] border-[#1a1a1a]"
    }`}>
      <p className={`font-black text-sm leading-snug ${
        highlight ? "text-white" : medical ? "text-cyan-300/80" : "text-gray-400"
      }`}>
        {member.name}
      </p>
      <p className={`text-[11px] mt-1.5 ${
        highlight ? "text-[#F7C600]/60" : medical ? "text-cyan-900" : "text-gray-700"
      }`}>
        {member.role}
      </p>
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
            {/* Section header */}
            <div className="flex items-center gap-3 mb-6">
              {admin.current ? (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7C600]/10 border border-[#F7C600]/20 text-[#F7C600] text-[10px] font-black">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F7C600] animate-pulse" />
                  الحالي
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-900/20 border border-cyan-800/30 text-cyan-600 text-[10px] font-black">
                  🩺 طبي
                </span>
              )}
              <p className={`font-black text-lg ${
                admin.current ? "text-white" : "text-cyan-400/70"
              }`}>
                {admin.title}
              </p>
              {admin.era && (
                <span className="text-gray-700 text-xs">{admin.era}</span>
              )}
            </div>

            {admin.current ? (
              <div className="flex flex-col gap-3">
                {/* President — full width */}
                <MemberCard member={admin.members[0]} highlight={true} />
                {/* Vice president — full width */}
                <MemberCard member={admin.members[1]} highlight={true} />
                {/* Secretary + Treasurer — side by side */}
                <div className="grid grid-cols-2 gap-3">
                  <MemberCard member={admin.members[2]} highlight={true} />
                  <MemberCard member={admin.members[3]} highlight={true} />
                </div>
              </div>

            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 mb-1">
                  <span className="h-px flex-1 bg-[#0f1f1f]" />
                  <span className="text-cyan-900 text-[10px] font-bold tracking-widest uppercase">
                    الطاقم الطبي
                  </span>
                  <span className="h-px flex-1 bg-[#0f1f1f]" />
                </div>
                {/* Doctor — full width */}
                <MemberCard member={admin.members[0]} highlight={false} medical={true} />
                {/* Rest — side by side */}
                <div className="grid grid-cols-2 gap-3">
                  {admin.members.slice(1).map((m, j) => (
                    <MemberCard key={j} member={m} highlight={false} medical={true} />
                  ))}
                </div>
              </div>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}
