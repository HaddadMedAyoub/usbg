"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "من نحن", href: "/about" },
  { label: "الفريق", href: "/team" },
  { label: "الأخبار", href: "/news" },
  { label: "الوسائط", href: "/media" },
  { label: "المجلس", href: "/board" },
  { label: "اتصل بنا", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      {/* ── Top announcement bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#F7C600] h-8 flex items-center justify-center">
        <Link href="/anniversary" className="flex items-center gap-2 group">
          <span className="text-black text-[11px] font-black tracking-[0.2em] uppercase">
            🎉 الذكرى التسعون للاتحاد الرياضي ببنقردان — 1936 · 2026
          </span>
          <svg className="w-3.5 h-3.5 text-black/60 group-hover:translate-x-[-4px] transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      </div>

      {/* ── Main Header ── */}
      <header
        className={`fixed top-8 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-black/98 backdrop-blur-2xl"
            : "bg-black"
        }`}
        style={{ borderBottom: scrolled ? "1px solid #222" : "1px solid #1a1a1a" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-stretch h-[60px]">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-4 pl-6 border-l border-[#1f1f1f] group"
          >
            <Image
              src="/brand/logo.png"
              alt="USBG"
              width={38}
              height={38}
              className="object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <div className="flex flex-col justify-center leading-none">
              <span className="text-white font-black text-[15px] tracking-[0.08em]">
                الاتحاد الرياضي
              </span>
              <span className="text-[#F7C600] text-[11px] font-bold tracking-[0.15em] mt-0.5">
                ببنقردان
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-stretch flex-1 justify-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center px-5 text-[13px] font-semibold tracking-wide transition-all duration-200 group border-b-2 ${
                    isActive
                      ? "text-[#F7C600] border-[#F7C600]"
                      : "text-gray-400 border-transparent hover:text-white hover:border-white/20"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Right side — Season badge ── */}
          <div className="hidden lg:flex items-center pr-6 border-r border-[#1f1f1f]">
            <div className="flex items-center gap-2 bg-[#111] border border-[#2a2a2a] rounded-lg px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F7C600] animate-pulse" />
              <span className="text-white text-[11px] font-bold tracking-wide">موسم 25/26</span>
            </div>
          </div>

          {/* ── Mobile: Hamburger ── */}
          <div className="lg:hidden flex items-center mr-auto pr-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="القائمة"
              className="flex flex-col items-end justify-center w-10 h-10 gap-[5px]"
            >
              <span className={`block h-[2px] bg-white rounded-full transition-all duration-300 ${menuOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6"}`} />
              <span className={`block h-[2px] bg-[#F7C600] rounded-full transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-4"}`} />
              <span className={`block h-[2px] bg-white rounded-full transition-all duration-300 ${menuOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-6"}`} />
            </button>
          </div>

        </div>
      </header>

      {/* ── Mobile Menu — full screen overlay style ── */}
      <div
        className={`lg:hidden fixed inset-0 z-30 transition-all duration-400 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: "calc(2rem + 60px)" }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Menu panel */}
        <div
          className={`relative bg-[#0a0a0a] border-b border-[#222] transition-all duration-300 ${
            menuOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{ transitionDelay: `${i * 30}ms` }}
                className={`flex items-center justify-between px-6 py-4 border-b border-[#161616] transition-colors ${
                  isActive
                    ? "bg-[#F7C600]/5 text-[#F7C600]"
                    : "text-gray-300 hover:bg-white/[0.03] hover:text-white"
                }`}
              >
                <span className="font-semibold text-[15px]">{link.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F7C600]" />
                )}
              </Link>
            );
          })}

          {/* Anniversary CTA inside mobile menu */}
          <div className="p-4">
            <Link
              href="/anniversary"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#F7C600] text-black font-black text-sm rounded-lg hover:bg-white transition-colors"
            >
              🎉 الذكرى التسعون
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-[92px]" />
    </>
  );
}
