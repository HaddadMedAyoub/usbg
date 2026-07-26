'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type Donor = {
  id: string
  name_ar: string
  name: string
  image: string
  total_amount: number
  donations: { amount: number; date: string }[]
  created_at: string
}

const getTickets = (amount: number) => Math.floor(Number(amount || 0) / 100)

export default function DonorClient() {
  const [id, setId] = useState<string | null>(null)
  const [donor, setDonor] = useState<Donor | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    setId(params.get('id'))
  }, [])

  useEffect(() => {
    if (!id) return

    supabase
      .from('donors')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        setDonor(data)
        setLoading(false)
      })
  }, [id])

  useEffect(() => {
    if (donor) document.title = `${donor.name_ar} | داعمو USBG`
  }, [donor])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#F7C600]/30 border-t-[#F7C600] animate-spin" />
      </div>
    )
  }

  if (!donor) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-500 text-sm">الداعم غير موجود</p>
      </div>
    )
  }

  const totalTickets = getTickets(donor.total_amount)

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-20" dir="rtl">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#F7C600]/6 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <div className="relative rounded-3xl border border-[#F7C600]/25 bg-gradient-to-b from-[#F7C600]/[0.05] to-[#0a0a0a] p-8 flex flex-col items-center gap-5 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#F7C600]/60 to-transparent" />
          <span className="absolute bottom-4 left-4 text-[5rem] font-black text-white/[0.02] leading-none select-none">💛</span>

          <Image
            src="/brand/logo.png"
            alt="USBG"
            width={40}
            height={40}
            className="object-contain opacity-60"
          />

          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#F7C600]/50 shadow-lg shadow-[#F7C600]/20 bg-[#111] flex items-center justify-center">
              {donor.image ? (
                <img src={donor.image} alt={donor.name_ar} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[#F7C600] font-black text-4xl">
                  {donor.name_ar.charAt(0)}
                </span>
              )}
            </div>
            <div className="absolute -bottom-1 -left-1 w-7 h-7 rounded-full bg-[#F7C600] border-2 border-black flex items-center justify-center">
              <span className="text-black text-xs">💛</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-white font-black text-2xl leading-tight">{donor.name_ar}</p>
            {donor.name && <p className="text-gray-500 text-sm mt-1">{donor.name}</p>}
          </div>

          <div className="bg-[#F7C600]/10 border border-[#F7C600]/20 rounded-2xl px-8 py-4 text-center w-full">
            <p className="text-[#F7C600] font-black text-3xl tabular-nums">
              {Number(donor.total_amount).toLocaleString('ar-TN')}
            </p>
            <p className="text-gray-500 text-xs mt-1 font-bold tracking-widest uppercase">
              دينار تونسي
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="bg-[#111] border border-[#1a1a1a] rounded-xl px-4 py-3 text-center">
              <p className="text-white font-black text-lg">{totalTickets}</p>
              <p className="text-gray-600 text-[10px] tracking-widest font-bold">تذكرة</p>
            </div>
            <div className="bg-[#111] border border-[#1a1a1a] rounded-xl px-4 py-3 text-center">
              <p className="text-white font-black text-lg">{new Date(donor.created_at).getFullYear()}</p>
              <p className="text-gray-600 text-[10px] uppercase tracking-widest font-bold">منذ</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-px w-10 bg-[#F7C600]/20" />
            <p className="text-[#F7C600]/50 text-[10px] font-bold tracking-[0.4em] uppercase">
              داعم الاتحاد الرياضي ببنقردان
            </p>
            <span className="h-px w-10 bg-[#F7C600]/20" />
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-[#1f1f1f] bg-[#0a0a0a] p-5">
          <p className="text-[#F7C600] text-[10px] font-bold tracking-[0.3em] uppercase mb-3">
            سجل التذاكر
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#111] rounded-xl px-4 py-4 text-center border border-[#1a1a1a]">
              <p className="text-white font-black text-2xl">
                {totalTickets}
              </p>
              <p className="text-gray-600 text-[11px] mt-1">إجمالي التذاكر</p>
            </div>

            <div className="bg-[#111] rounded-xl px-4 py-4 text-center border border-[#1a1a1a]">
              <p className="text-white font-black text-2xl tabular-nums">
                100 × {totalTickets}
              </p>
              <p className="text-gray-600 text-[11px] mt-1">كل 100 د.ت = تذكرة</p>
            </div>
          </div>

          <div className="mt-3 rounded-xl bg-gradient-to-r from-[#F7C600]/10 to-transparent border border-[#F7C600]/15 px-4 py-3">
            <p className="text-gray-400 text-xs leading-relaxed">
              إجمالي مساهمة هذا الداعم هو{' '}
              <span className="text-[#F7C600] font-black">
                {Number(donor.total_amount).toLocaleString('ar-TN')} د.ت
              </span>{' '}
              ويعادل{' '}
              <span className="text-white font-black">
                {totalTickets} تذكرة
              </span>
            </p>
          </div>
        </div>

        <Link
          href="/donors"
          className="mt-5 w-full flex items-center justify-center gap-2 border border-[#1f1f1f] text-gray-500 text-sm font-bold py-3 rounded-2xl hover:border-[#F7C600]/20 hover:text-white transition-all"
        >
          ← العودة إلى قائمة الداعمين
        </Link>
      </div>
    </div>
  )
}