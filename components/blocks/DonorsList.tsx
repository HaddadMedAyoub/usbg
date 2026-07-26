'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

type Donor = {
  id: string
  name_ar: string
  name: string
  image: string
  total_amount: number
  donations: { amount: number; date: string }[]
}

export default function DonorsList() {
  const [donors, setDonors] = useState<Donor[]>([])

  useEffect(() => {
    supabase
      .from('donors')
      .select('*')
      .order('total_amount', { ascending: false })
      .then(({ data }) => setDonors(data || []))
  }, [])

  const totalCollected = donors.reduce((sum, d) => sum + Number(d.total_amount), 0)

  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.4em] uppercase mb-3 text-center">
          الداعمون
        </p>
        <h2 className="text-white font-black text-2xl sm:text-3xl mb-4 text-center">
          أبطال خلف الكواليس
        </h2>

        {/* Total */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#F7C600]/10 border border-[#F7C600]/20 rounded-2xl px-8 py-4 text-center">
            <p className="text-[#F7C600] font-black text-2xl">
              {totalCollected.toLocaleString('ar-TN')} د.ت
            </p>
            <p className="text-gray-500 text-xs mt-1">إجمالي الدعم المقدم</p>
          </div>
        </div>

        {/* Donors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {donors.map((donor, i) => (
            <div
              key={donor.id}
              className="relative flex flex-col items-center gap-4 p-6 rounded-2xl border border-[#1f1f1f] bg-[#0a0a0a] hover:border-[#F7C600]/30 transition-all group"
            >
              {/* Rank badge for top 3 */}
              {i < 3 && (
                <span className="absolute top-3 left-3 text-xs font-black px-2 py-0.5 rounded-full bg-[#F7C600]/20 text-[#F7C600]">
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
                </span>
              )}

              {/* Avatar */}
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#F7C600]/20 bg-[#111] flex items-center justify-center shrink-0">
                {donor.image ? (
                  <Image src={donor.image} alt={donor.name_ar} width={64} height={64} className="object-cover w-full h-full" />
                ) : (
                  <span className="text-[#F7C600] font-black text-xl">
                    {donor.name_ar.charAt(0)}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="text-center">
                <p className="text-white font-black text-base">{donor.name_ar}</p>
                {donor.name && <p className="text-gray-600 text-xs">{donor.name}</p>}
                <p className="text-[#F7C600] font-black text-lg mt-2">
                  {Number(donor.total_amount).toLocaleString('ar-TN')} د.ت
                </p>
                <p className="text-gray-600 text-[10px] mt-1">
                  {donor.donations?.length || 1} تبرع
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
