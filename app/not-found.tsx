import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 text-center">

      {/* big 404 */}
      <p
        className="font-black text-[#F7C600]/5 select-none pointer-events-none absolute"
        style={{ fontSize: "40vw", lineHeight: 1 }}
      >
        404
      </p>

      <div className="relative z-10">
        <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.45em] uppercase mb-4">
          خطأ 404
        </p>
        <h1 className="text-white font-black text-4xl sm:text-5xl mb-4">
          الصفحة غير موجودة
        </h1>
        <p className="text-gray-500 text-sm mb-10 max-w-xs leading-7">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-8 py-3 rounded-2xl bg-[#F7C600] text-black font-black text-sm hover:bg-white transition-colors"
          >
            العودة للرئيسية
          </Link>
          <Link
            href="/news"
            className="px-8 py-3 rounded-2xl border border-[#2a2a2a] text-gray-400 font-bold text-sm hover:border-[#F7C600]/30 hover:text-white transition-all"
          >
            آخر الأخبار
          </Link>
        </div>
      </div>

    </div>
  );
}
