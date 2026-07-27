import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <>
      <style>{`
        @keyframes nf-breathe {
          0%,100% { opacity:.55; transform:translate(-50%,-50%) scale(1); }
          50%     { opacity:1;   transform:translate(-50%,-50%) scale(1.08); }
        }
        @keyframes nf-pulse {
          0%   { box-shadow:0 0 0 0 rgba(247,198,0,0.55); }
          70%  { box-shadow:0 0 0 10px rgba(247,198,0,0); }
          100% { box-shadow:0 0 0 0 rgba(247,198,0,0); }
        }
        @keyframes nf-rise {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .nf-breathe { animation: nf-breathe 7s ease-in-out infinite; }
        .nf-dot     { animation: nf-pulse 1.8s ease-out infinite; }
        .nf-card    { animation: nf-rise .7s cubic-bezier(.2,.7,.2,1) both; }
        .nf-ghost {
          -webkit-text-stroke: 2px rgba(247,198,0,0.05);
          color: transparent;
        }
      `}</style>

      <div className="relative min-h-[82vh] flex items-center justify-center overflow-hidden bg-black px-6 text-center">

        {/* ambient gold glow */}
        <div
          className="nf-breathe pointer-events-none absolute top-1/2 left-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(247,198,0,0.10) 0%, rgba(247,198,0,0) 62%)",
            filter: "blur(40px)",
          }}
        />

        {/* faint dotted texture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "radial-gradient(circle at center, #000 0%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, #000 0%, transparent 75%)",
          }}
        />

        {/* giant ghost question mark */}
        <span
          aria-hidden="true"
          className="nf-ghost pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[54%] select-none font-black leading-none"
          style={{ fontSize: "clamp(16rem, 44vw, 32rem)" }}
        >
          ؟
        </span>

        {/* card */}
        <div className="nf-card relative z-10 w-full max-w-md">
          {/* logo */}
          <div className="mx-auto mb-7 flex h-[72px] w-[72px] items-center justify-center rounded-[20px] border border-[#F7C600]/20 bg-[#F7C600]/[0.06] shadow-[0_0_50px_rgba(247,198,0,0.12)]">
            <Image src="/brand/logo.png" alt="USBG" width={46} height={46} className="object-contain" />
          </div>

          {/* status pill */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#F7C600]/20 bg-[#F7C600]/[0.08] px-4 py-1.5">
            <span className="nf-dot h-2 w-2 rounded-full bg-[#F7C600]" />
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#F7C600]">
              صفحة مفقودة
            </span>
          </div>

          {/* heading */}
          <h1 className="mb-4 font-black leading-[1.25] text-white" style={{ fontSize: "clamp(1.9rem, 7vw, 2.9rem)" }}>
            لم نجد هذه <span className="text-[#F7C600]">الصفحة</span>
          </h1>

          {/* text */}
          <p className="mx-auto mb-9 max-w-sm text-[15px] leading-[2] text-gray-400">
            قد يكون الرابط قديمًا أو غير صحيح. لا بأس — يمكنك العودة إلى الصفحة
            الرئيسية أو تصفّح آخر الأخبار.
          </p>

          {/* actions */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-2xl bg-[#F7C600] px-8 py-3 text-sm font-black text-black shadow-[0_0_30px_rgba(247,198,0,0.22)] transition-all hover:bg-white hover:shadow-[0_0_40px_rgba(247,198,0,0.45)]"
            >
              العودة للرئيسية
            </Link>
            <Link
              href="/news"
              className="rounded-2xl border border-white/15 px-8 py-3 text-sm font-bold text-gray-300 transition-all hover:border-[#F7C600]/40 hover:bg-white/[0.04] hover:text-white"
            >
              آخر الأخبار
            </Link>
          </div>

          {/* footer */}
          <p className="mt-11 text-xs tracking-wide text-[#555]">
            <span className="font-bold text-[#F7C600]">الاتحاد الرياضي ببنقردان</span>{" "}
            · فرسان الحدود منذ 1936
          </p>
        </div>
      </div>
    </>
  );
}
