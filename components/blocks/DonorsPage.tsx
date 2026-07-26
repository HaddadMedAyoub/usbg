'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

// ─────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────
type Donation = { amount: number; date: string }

type Donor = {
    share_url: string
    id: string
    name_ar: string
    name: string
    image: string
    total_amount: number
    donations: Donation[]
    created_at: string
}
const getTickets = (amount: number) => Math.floor(Number(amount || 0) / 100)
// ─────────────────────────────────────────
//  ANIMATED COUNTER HOOK
// ─────────────────────────────────────────
function useCountUp(target: number, duration = 1800, trigger: boolean) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        if (!trigger) return
        let start = 0
        const step = target / (duration / 16)
        const timer = setInterval(() => {
            start += step
            if (start >= target) { setCount(target); clearInterval(timer) }
            else setCount(Math.floor(start))
        }, 16)
        return () => clearInterval(timer)
    }, [target, trigger, duration])
    return count
}

// ─────────────────────────────────────────
//  STAT CARD
// ─────────────────────────────────────────
function StatCard({ label, value, suffix = '', prefix = '', triggered }: {
    label: string; value: number; suffix?: string; prefix?: string; triggered: boolean
}) {
    const count = useCountUp(value, 1600, triggered)
    return (
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-[#1f1f1f] bg-[#0a0a0a] hover:border-[#F7C600]/30 transition-all duration-300 group">
            <p className="text-[#F7C600] font-black text-3xl sm:text-4xl mb-1 tabular-nums">
                {prefix}{count.toLocaleString('ar-TN')}{suffix}
            </p>
            <p className="text-gray-500 text-xs tracking-widest uppercase font-bold">{label}</p>
        </div>
    )
}

// ─────────────────────────────────────────
//  MEDAL BADGE
// ─────────────────────────────────────────
function MedalBadge({ rank }: { rank: number }) {
    if (rank === 0) return (
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#F7C600] border-2 border-black flex items-center justify-center shadow-lg shadow-[#F7C600]/30 z-10">
            <span className="text-black font-black text-xs">1</span>
        </div>
    )
    if (rank === 1) return (
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gray-400 border-2 border-black flex items-center justify-center shadow-lg z-10">
            <span className="text-black font-black text-xs">2</span>
        </div>
    )
    if (rank === 2) return (
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-orange-700 border-2 border-black flex items-center justify-center z-10">
            <span className="text-white font-black text-xs">3</span>
        </div>
    )
    return null
}

// ─────────────────────────────────────────
//  PROGRESS BAR
// ─────────────────────────────────────────
function ProgressBar({ value, max }: { value: number; max: number }) {
    const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0
    return (
        <div className="w-full h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden mt-3">
            <div
                className="h-full bg-gradient-to-r from-[#F7C600]/60 to-[#F7C600] rounded-full transition-all duration-1000"
                style={{ width: `${pct}%` }}
            />
        </div>
    )
}

// ─────────────────────────────────────────
//  DONOR CARD
// ─────────────────────────────────────────
function DonorCard({ donor, rank, maxAmount, expanded, onToggle }: {
    donor: Donor
    rank: number
    maxAmount: number
    expanded: boolean

    onToggle: () => void
}) {
    const isTop3 = rank < 3
    const tickets = getTickets(donor.total_amount)
    const handleShareFacebook = (e: React.MouseEvent) => {
        e.stopPropagation()

        const donorLink = `${window.location.origin}/donors/${donor.id}`

        const message = `ساهم معنا واطّلع على صفحة المتبرع ${donor.name_ar}`

        const shareUrl =
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(donorLink)}&quote=${encodeURIComponent(message)}`

        window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=700')
    }

    return (
        <div
            className={`relative flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer group
                ${isTop3
                    ? 'border-[#F7C600]/25 bg-gradient-to-b from-[#F7C600]/[0.04] to-[#0a0a0a]'
                    : 'border-[#1f1f1f] bg-[#0a0a0a] hover:border-[#F7C600]/20'
                }
                ${expanded ? 'ring-1 ring-[#F7C600]/20' : ''}
            `}
            onClick={onToggle}
        >
            {/* Ghost rank number */}
            <span className="absolute bottom-3 left-4 text-[5rem] font-black text-white/[0.015] leading-none select-none pointer-events-none">
                {(rank + 1).toString().padStart(2, '0')}
            </span>

            {/* Top glow for #1 */}
            {rank === 0 && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#F7C600]/60 to-transparent" />
            )}

            <div className="relative p-6 flex items-start gap-4 z-10">
                {/* Avatar */}
                <div className="relative shrink-0">
                    <MedalBadge rank={rank} />
                    <div
                        className={`w-16 h-16 rounded-full overflow-hidden border-2
                            ${rank === 0 ? 'border-[#F7C600]/50 shadow-lg shadow-[#F7C600]/20' : 'border-[#2a2a2a]'}
                            bg-[#111] flex items-center justify-center`}
                    >
                        {donor.image ? (
                            <img
                                src={donor.image}
                                alt={donor.name_ar}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-[#F7C600] font-black text-2xl">
                                {donor.name_ar.charAt(0)}
                            </span>
                        )}
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <p className="text-white font-black text-base leading-tight">
                                {donor.name_ar}
                            </p>
                            {donor.name && (
                                <p className="text-gray-600 text-xs mt-0.5">
                                    {donor.name}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col items-end gap-2 shrink-0">
                            <div className="text-right">
                                <p className="text-[#F7C600] font-black text-lg leading-tight tabular-nums">
                                    {Number(donor.total_amount).toLocaleString('ar-TN')}
                                </p>
                                <p className="text-gray-600 text-[10px]">د.ت</p>
                            </div>
                        </div>
                    </div>

                    {/* Progress */}
                    <ProgressBar value={donor.total_amount} max={maxAmount} />

                    {/* Stats row */}
                    <div className="flex items-center justify-between mt-3">
                        <span className="text-gray-600 text-[10px] font-semibold">
                            {tickets} تذكرة ·{' '}
                            {new Date(donor.created_at).toLocaleDateString('ar-TN', {
                                year: 'numeric',
                                month: 'short',
                            })}
                        </span>
                        <span
                            className={`text-[10px] font-black transition-transform duration-300 ${expanded ? 'rotate-180' : ''
                                } text-[#F7C600]/50`}
                        >
                            ▾
                        </span>
                    </div>
                </div>
            </div>

            {/* Expanded section */}
            {expanded && (
                <div className="px-6 pb-5 z-10 relative border-t border-[#1a1a1a]">
                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-[#111] border border-[#1a1a1a] p-4">
                            <p className="text-[#F7C600] text-[10px] font-bold tracking-[0.3em] uppercase mb-2">
                                التذاكر
                            </p>
                            <p className="text-white font-black text-2xl tabular-nums">
                                {tickets}
                            </p>
                            <p className="text-gray-600 text-xs mt-1">
                                عدد التذاكر المحسوبة
                            </p>
                        </div>

                        <div className="rounded-2xl bg-[#111] border border-[#1a1a1a] p-4">
                            <p className="text-[#F7C600] text-[10px] font-bold tracking-[0.3em] uppercase mb-2">
                                المعادلة
                            </p>
                            <p className="text-white font-black text-2xl tabular-nums">
                                100 × {tickets}
                            </p>
                            <p className="text-gray-600 text-xs mt-1">
                                كل 100 د.ت = تذكرة واحدة
                            </p>
                        </div>
                    </div>

                    <div className="mt-3 rounded-2xl bg-gradient-to-r from-[#F7C600]/10 to-transparent border border-[#F7C600]/15 px-4 py-3">
                        <p className="text-gray-400 text-xs leading-relaxed">
                            إجمالي الدعم الحالي{' '}
                            <span className="text-[#F7C600] font-black">
                                {Number(donor.total_amount).toLocaleString('ar-TN')} د.ت
                            </span>{' '}
                            ويعادل{' '}
                            <span className="text-white font-black">
                                {tickets} تذكرة
                            </span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

// ─────────────────────────────────────────
//  PODIUM — TOP 3
// ─────────────────────────────────────────
function Podium({ donors }: { donors: Donor[] }) {
    const order = [1, 0, 2]
    const heights = ['h-20', 'h-32', 'h-14']
    const labels = ['2', '1', '3']

    return (
        <div className="flex items-end justify-center gap-3 mt-8 mb-4">
            {order.map((idx, displayPos) => {
                const donor = donors[idx]
                if (!donor) return <div key={displayPos} className="w-24" />
                return (
                    <div key={donor.id} className="flex flex-col items-center gap-3 w-28">
                        <div className="relative">
                            <div className={`w-14 h-14 rounded-full overflow-hidden border-2 bg-[#111]
                                ${idx === 0 ? 'border-[#F7C600] shadow-lg shadow-[#F7C600]/30' : 'border-[#2a2a2a]'}
                            `}>
                                {donor.image ? (
                                    <img src={donor.image} alt={donor.name_ar} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-[#F7C600] font-black text-xl w-full h-full flex items-center justify-center">
                                        {donor.name_ar.charAt(0)}
                                    </span>
                                )}
                            </div>
                            {idx === 0 && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-lg">👑</div>
                            )}
                        </div>
                        <p className="text-white font-black text-xs text-center leading-tight line-clamp-2">
                            {donor.name_ar}
                        </p>
                        <p className="text-[#F7C600] font-black text-xs tabular-nums text-center">
                            {Number(donor.total_amount).toLocaleString('ar-TN')} د.ت
                        </p>
                        <p className="text-gray-600 text-[10px] font-bold text-center mt-1">
                            {getTickets(donor.total_amount)} تذكرة
                        </p>
                        <div className={`w-full ${heights[displayPos]} rounded-t-xl flex items-center justify-center
                            ${idx === 0
                                ? 'bg-gradient-to-b from-[#F7C600]/30 to-[#F7C600]/10 border border-[#F7C600]/30'
                                : idx === 1
                                    ? 'bg-gradient-to-b from-gray-500/20 to-gray-500/5 border border-gray-500/20'
                                    : 'bg-gradient-to-b from-orange-800/20 to-orange-800/5 border border-orange-800/20'
                            }
                        `}>
                            <span className={`font-black text-2xl
                                ${idx === 0 ? 'text-[#F7C600]' : idx === 1 ? 'text-gray-400' : 'text-orange-700'}
                            `}>{labels[displayPos]}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

// ─────────────────────────────────────────
//  MAIN PAGE
// ─────────────────────────────────────────
export default function DonorsPage() {
    const [donors, setDonors] = useState<Donor[]>([])
    const [loading, setLoading] = useState(true)
    const [expandedId, setExpandedId] = useState<string | null>(null)
    const [statsTriggered, setStatsTriggered] = useState(false)
    const statsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        supabase
            .from('donors')
            .select('*')
            .order('total_amount', { ascending: false })
            .then(({ data }) => {
                setDonors(data || [])
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        const el = statsRef.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setStatsTriggered(true) },
            { threshold: 0.3 }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [loading])

    const totalAmount = donors.reduce((s, d) => s + Number(d.total_amount), 0)
    const totalTickets = donors.reduce((s, d) => s + getTickets(d.total_amount), 0)
    const maxAmount = donors[0]?.total_amount || 1
    const top3 = donors.slice(0, 3)
    const rest = donors.slice(3)

    return (
        <div className="flex flex-col min-h-screen bg-black" dir="rtl">

            {/* ════════════════════════════
                HERO
            ════════════════════════════ */}
            <section className="relative min-h-[80dvh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-black">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#F7C600]/6 rounded-full blur-[130px]" />
                    <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#F7C600]/3 rounded-full blur-[100px]" />
                    <div className="absolute top-20 left-10 w-[200px] h-[200px] bg-[#F7C600]/2 rounded-full blur-[80px]" />
                </div>
                <div
                    className="absolute inset-0 opacity-[0.015] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #F7C600 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                    }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                    <span
                        className="font-black text-transparent select-none whitespace-nowrap"
                        style={{
                            fontSize: 'clamp(5rem, 22vw, 16rem)',
                            WebkitTextStroke: '1px rgba(247,198,0,0.04)',
                        }}
                    >
                        DONORS
                    </span>
                </div>
                <div className="relative z-10 mb-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#F7C600]/20 rounded-full blur-2xl scale-150" />
                        <Image
                            src="/brand/logo.png"
                            alt="USBG"
                            width={100}
                            height={100}
                            className="relative object-contain drop-shadow-[0_0_60px_rgba(247,198,0,0.4)]"
                            priority
                        />
                    </div>
                </div>
                <p className="relative z-10 text-[#F7C600]/50 text-[11px] font-bold tracking-[0.5em] uppercase mb-4">
                    USBG · الداعمون
                </p>
                <h1
                    className="relative z-10 text-white font-black leading-[1.1] mb-5"
                    style={{ fontSize: 'clamp(2.5rem, 10vw, 5.5rem)' }}
                >
                    أبطال خارج
                    <span className="text-[#F7C600]"> الملعب</span>
                </h1>
                <div className="relative z-10 flex items-center gap-4 mb-6">
                    <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#F7C600]/50" />
                    <p className="text-gray-400 font-bold text-base sm:text-lg tracking-wide">
                        مع الاتحاد .. الدعم شرف والانتماء فخر
                    </p>
                    <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#F7C600]/50" />
                </div>
                <p className="relative z-10 text-gray-600 text-sm sm:text-base max-w-md leading-relaxed">
                    هؤلاء هم الذين آمنوا بالمشروع قبل أن تكتمل الصورة — شكرًا لكم
                </p>
                <div className="absolute bottom-8 z-10 flex flex-col items-center gap-2 opacity-30">
                    <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#F7C600]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F7C600] animate-bounce" />
                </div>
            </section>

            {/* ════════════════════════════
                STATS
            ════════════════════════════ */}
            <section className="py-16 px-4 bg-[#050505]" ref={statsRef}>
                <div className="max-w-4xl mx-auto">
                    {loading ? (
                        <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-24 rounded-2xl bg-[#111] animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <StatCard label="إجمالي الدعم" value={totalAmount} suffix=" د.ت" triggered={statsTriggered} />
                            <StatCard label="عدد الداعمين" value={donors.length} triggered={statsTriggered} />
                            <StatCard label="عدد التذاكر" value={totalTickets} triggered={statsTriggered} />
                        </div>
                    )}
                </div>
            </section>

            {/* ════════════════════════════
                PODIUM TOP 3
            ════════════════════════════ */}
            {!loading && top3.length >= 2 && (
                <section className="py-20 px-4 bg-black">
                    <div className="max-w-2xl mx-auto">
                        <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.4em] uppercase mb-3 text-center">
                            أعلى الداعمين
                        </p>
                        <h2 className="text-white font-black text-2xl sm:text-3xl text-center leading-tight">
                            منصة <span className="text-[#F7C600]">الشرف</span>
                        </h2>
                        <Podium donors={top3} />
                        <div className="flex items-center gap-4 mt-10">
                            <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#1f1f1f]" />
                            <span className="text-gray-700 text-[10px] font-bold tracking-widest uppercase">كامل القائمة</span>
                            <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#1f1f1f]" />
                        </div>
                    </div>
                </section>
            )}

            {/* ════════════════════════════
                HOW TO DONATE
            ════════════════════════════ */}
            <section className="py-20 px-4 bg-[#050505]">
                <div className="max-w-2xl mx-auto">
                    <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.4em] uppercase mb-3 text-center">
                        كيف تدعم
                    </p>
                    <h2 className="text-white font-black text-2xl sm:text-3xl text-center mb-12 leading-tight">
                        انضم إلى قائمة <span className="text-[#F7C600]">الشرف</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* Bank Card */}
                        <div className="relative flex flex-col gap-5 p-6 rounded-2xl border border-[#1f1f1f] bg-[#0a0a0a] hover:border-[#F7C600]/25 transition-all duration-300 group overflow-hidden">
                            <span className="absolute bottom-3 left-4 text-[5rem] font-black text-[#F7C600]/[0.03] leading-none select-none group-hover:text-[#F7C600]/[0.06] transition-colors">🏦</span>
                            <div className="w-12 h-12 rounded-xl bg-[#F7C600]/10 border border-[#F7C600]/20 flex items-center justify-center text-2xl group-hover:bg-[#F7C600]/20 transition-colors">🏦</div>
                            <div>
                                <p className="text-[#F7C600] text-[10px] font-bold tracking-[0.3em] uppercase mb-1">التحويل البنكي</p>
                                <p className="text-white font-black text-base mb-4">الحساب الرسمي STB</p>
                                <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4 mb-3">
                                    <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-2 font-bold">RIB</p>
                                    <p className="text-white font-black text-sm tracking-[0.1em] tabular-nums leading-relaxed break-all" dir="ltr">
                                        10 902 0301 5004 9078 831
                                    </p>
                                </div>
                                <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4">
                                    <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-2 font-bold">اسم الحساب</p>
                                    <p className="text-white font-bold text-sm">الاتحاد الرياضي ببنقردان</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Card */}
                        <div className="relative flex flex-col gap-5 p-6 rounded-2xl border border-[#1f1f1f] bg-[#0a0a0a] hover:border-[#F7C600]/25 transition-all duration-300 group overflow-hidden">
                            <span className="absolute bottom-3 left-4 text-[5rem] font-black text-[#F7C600]/[0.03] leading-none select-none group-hover:text-[#F7C600]/[0.06] transition-colors">📞</span>
                            <div className="w-12 h-12 rounded-xl bg-[#F7C600]/10 border border-[#F7C600]/20 flex items-center justify-center text-2xl group-hover:bg-[#F7C600]/20 transition-colors">📞</div>

                            <div>
                                <p className="text-[#F7C600] text-[10px] font-bold tracking-[0.3em] uppercase mb-1">تواصل معنا</p>
                                <p className="text-white font-black text-base mb-4">المسؤول عن الدعم</p>

                                {/* Phone */}
                                <a
                                    href="tel:+21624378501"
                                    className="flex items-center gap-3 bg-[#111] border border-[#1a1a1a] rounded-xl p-4 mb-3
        hover:bg-[#F7C600]/10 hover:border-[#F7C600]/40 active:scale-[0.98]
        transition-all duration-200 cursor-pointer group/phone"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-[#F7C600]/10 border border-[#F7C600]/20 flex items-center justify-center shrink-0 group-hover/phone:bg-[#F7C600]/30 transition-colors">
                                        <span className="text-base">📱</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-0.5">اضغط للاتصال</p>
                                        <p className="text-white font-black text-sm tabular-nums tracking-wide" dir="ltr">+216 24 378 501</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-[#F7C600]/10 border border-[#F7C600]/20 rounded-lg px-3 py-1.5 group-hover/phone:bg-[#F7C600]/20 transition-colors shrink-0">
                                        <span className="text-[#F7C600] text-[10px] font-black">اتصال</span>
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#F7C600" strokeWidth="2.5">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </a>

                                {/* WhatsApp */}
                                <a
                                    href="https://wa.me/21624378501"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 bg-[#111] border border-[#1a1a1a] rounded-xl p-4
        hover:bg-green-500/10 hover:border-green-500/40 active:scale-[0.98]
        transition-all duration-200 cursor-pointer group/wa"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 group-hover/wa:bg-green-500/30 transition-colors">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#22c55e">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-0.5">اضغط للمراسلة</p>
                                        <p className="text-white font-black text-sm tabular-nums tracking-wide" dir="ltr">+216 24 378 501</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-1.5 group-hover/wa:bg-green-500/20 transition-colors shrink-0">
                                        <span className="text-green-400 text-[10px] font-black">واتساب</span>
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </a>

                            </div>
                        </div>

                    </div>

                    {/* Bottom note */}
                    <div className="flex items-start gap-3 mt-5 bg-[#F7C600]/[0.04] border border-[#F7C600]/10 rounded-2xl px-5 py-4">
                        <span className="text-[#F7C600] text-base mt-0.5 shrink-0">💡</span>
                        <p className="text-gray-500 text-xs leading-relaxed">
                            بعد إتمام التحويل، تواصل معنا برقم الهاتف أو واتساب مع ذكر اسمك الكامل والمبلغ المحوَّل لإضافتك إلى قائمة الداعمين.
                        </p>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════
                FULL DONORS LIST
            ════════════════════════════ */}
            <section className="py-8 px-4 bg-black pb-24">
                <div className="max-w-2xl mx-auto">
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="h-28 rounded-2xl bg-[#0a0a0a] border border-[#1a1a1a] animate-pulse" />
                            ))}
                        </div>
                    ) : donors.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-4">
                            <div className="w-16 h-16 rounded-full bg-[#F7C600]/10 border border-[#F7C600]/20 flex items-center justify-center">
                                <span className="text-2xl">💛</span>
                            </div>
                            <p className="text-gray-500 text-sm font-bold">لم يُسجَّل أي داعم بعد</p>
                            <p className="text-gray-700 text-xs">كن أول الداعمين للاتحاد</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {top3.map((donor, i) => (
                                <DonorCard
                                    key={donor.id}
                                    donor={donor}
                                    rank={i}
                                    maxAmount={maxAmount}
                                    expanded={expandedId === donor.id}
                                    onToggle={() => setExpandedId(expandedId === donor.id ? null : donor.id)}
                                />
                            ))}
                            {rest.length > 0 && (
                                <>
                                    <div className="flex items-center gap-3 py-2">
                                        <span className="flex-1 h-px bg-[#1a1a1a]" />
                                        <span className="text-gray-700 text-[10px] tracking-widest uppercase font-bold">
                                            {rest.length} داعم آخر
                                        </span>
                                        <span className="flex-1 h-px bg-[#1a1a1a]" />
                                    </div>
                                    {rest.map((donor, i) => (
                                        <DonorCard
                                            key={donor.id}
                                            donor={donor}
                                            rank={i + 3}
                                            maxAmount={maxAmount}
                                            expanded={expandedId === donor.id}
                                            onToggle={() => setExpandedId(expandedId === donor.id ? null : donor.id)}
                                        />
                                    ))}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* ════════════════════════════
                CLOSING CTA
            ════════════════════════════ */}
            <section className="py-24 px-4 bg-[#F7C600] relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                    <span className="font-black text-transparent select-none" style={{ fontSize: 'clamp(8rem, 30vw, 20rem)', WebkitTextStroke: '1px rgba(0,0,0,0.06)' }}>💛</span>
                </div>
                <div className="relative max-w-2xl mx-auto text-center z-10">
                    <Image src="/brand/logo.png" alt="USBG" width={70} height={70} className="object-contain mx-auto mb-8 drop-shadow-lg" />
                    <p className="text-black font-black leading-tight mb-4" style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)' }}>
                        "معًا نبني<br />مستقبل الاتحاد"
                    </p>
                    <p className="text-black/40 text-xs font-bold tracking-[0.4em] uppercase mb-10">USBG · 1936 — 2026</p>
                    <div className="flex gap-3 justify-center flex-wrap">
                        <Link href="/anniversary" className="bg-black text-[#F7C600] font-black text-sm px-7 py-3.5 rounded-lg hover:bg-[#111] transition-colors shadow-lg">
                            🎉 تسعينية الاتحاد
                        </Link>
                        <Link href="/team" className="bg-black/10 border border-black/15 text-black font-black text-sm px-7 py-3.5 rounded-lg hover:bg-black/20 transition-colors">
                            الفريق
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    )
}
