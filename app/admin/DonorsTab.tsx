'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Donor = {
  id: string
  name_ar: string
  name: string
  image: string
  total_amount: number
  donations: { amount: number; date: string }[]
}

export default function DonorsTab() {
  const [donors, setDonors] = useState<Donor[]>([])
  const [view, setView] = useState<'list' | 'add' | 'redonation'>('list')
  const [uploadingImage, setUploadingImage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null)
  const [reAmount, setReAmount] = useState('')

  const [form, setForm] = useState({
    name_ar: '',
    name: '',
    image: '',
    amount: '',
  })

  useEffect(() => { fetchDonors() }, [])

  const getDonationUnits = (amount: number) => Math.floor(Number(amount || 0) / 100)

  const totalDonationUnits = donors.reduce(
    (sum, donor) => sum + getDonationUnits(donor.total_amount),
    0
  )

  async function fetchDonors() {
    const { data } = await supabase
      .from('donors')
      .select('*')
      .order('total_amount', { ascending: false })
    setDonors(data || [])
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingImage(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'usbg_articles')
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: formData }
    )
    const data = await res.json()
    setForm(prev => ({ ...prev, image: data.secure_url }))
    setUploadingImage(false)
  }

  async function handleAddDonor(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const amount = parseFloat(form.amount)

    const { error } = await supabase.from('donors').insert([{
      name_ar: form.name_ar,
      name: form.name,
      image: form.image,
      total_amount: amount,
      donations: [{ amount, date: new Date().toISOString() }],
    }])

    if (error) alert('خطأ: ' + error.message)
    else {
      setForm({ name_ar: '', name: '', image: '', amount: '' })
      setView('list')
      fetchDonors()
    }
    setLoading(false)
  }

  async function handleRedonation(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedDonor) return
    setLoading(true)

    const addedAmount = parseFloat(reAmount)
    const updatedDonations = [
      ...(selectedDonor.donations || []),
      { amount: addedAmount, date: new Date().toISOString() }
    ]

    const { error } = await supabase
      .from('donors')
      .update({
        total_amount: Number(selectedDonor.total_amount) + addedAmount,
        donations: updatedDonations,
      })
      .eq('id', selectedDonor.id)

    if (error) alert('خطأ: ' + error.message)
    else {
      setReAmount('')
      setSelectedDonor(null)
      setView('list')
      fetchDonors()
    }
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('حذف هذا الداعم؟')) return
    await supabase.from('donors').delete().eq('id', id)
    fetchDonors()
  }

  const inputCls = "w-full bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F7C600]/50"

  // ── LIST VIEW ──
  if (view === 'list') return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-gray-500 text-xs">{donors.length} داعم مسجل</p>
          <p className="text-[#F7C600] text-xs font-bold mt-1">
            إجمالي التبرعات المحسوبة بـ 100 د.ت: {totalDonationUnits}
          </p>
        </div>

        <button
          onClick={() => setView('add')}
          className="bg-[#F7C600] text-black text-xs font-bold px-4 py-2 rounded-xl"
        >
          + إضافة داعم
        </button>
      </div>

      {donors.map(donor => {
        const donationUnits = getDonationUnits(donor.total_amount)

        return (
          <div key={donor.id} className="flex items-center justify-between bg-[#111] border border-[#1e1e1e] rounded-2xl px-5 py-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center shrink-0">
                {donor.image ? (
                  <img src={donor.image} alt={donor.name_ar} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[#F7C600] font-black">{donor.name_ar.charAt(0)}</span>
                )}
              </div>

              <div>
                <p className="text-white text-sm font-bold">{donor.name_ar}</p>
                <p className="text-[#F7C600] font-black text-sm">
                  {Number(donor.total_amount).toLocaleString('ar-TN')} د.ت
                </p>
                <p className="text-gray-600 text-xs">
                  {donationUnits} total donations
                </p>
                <p className="text-gray-500 text-[11px]">
                  100 × {donationUnits}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setSelectedDonor(donor); setView('redonation') }}
                className="text-[#F7C600] text-xs hover:text-[#F7C600]/70"
              >
                + تبرع جديد
              </button>
              <button
                onClick={() => handleDelete(donor.id)}
                className="text-red-400 text-xs hover:text-red-300"
              >
                حذف
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )

  // ── ADD DONOR VIEW ──
  if (view === 'add') return (
    <form onSubmit={handleAddDonor} className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-gray-500 text-xs">إضافة داعم جديد</p>
        <button
          type="button"
          onClick={() => setView('list')}
          className="text-gray-400 text-xs border border-[#2a2a2a] px-4 py-2 rounded-xl"
        >
          ← العودة
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-gray-400 text-xs block mb-1">الاسم بالعربية *</label>
          <input
            value={form.name_ar}
            onChange={e => setForm({ ...form, name_ar: e.target.value })}
            className={inputCls}
            required
          />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">الاسم بالفرنسية</label>
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className="text-gray-400 text-xs block mb-1">المبلغ الأولي (د.ت) *</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}
          className={inputCls}
          required
        />
      </div>

      <div>
        <label className="text-gray-400 text-xs block mb-1">صورة الداعم</label>
        {form.image ? (
          <div className="relative w-24 h-24 rounded-full overflow-hidden">
            <img src={form.image} alt="preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => setForm({ ...form, image: '' })}
              className="absolute inset-0 bg-black/60 text-white text-xs flex items-center justify-center opacity-0 hover:opacity-100 transition"
            >
              حذف
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#2a2a2a] rounded-xl cursor-pointer hover:border-[#F7C600]/40 transition">
            <span className="text-gray-500 text-xs">اضغط لرفع صورة</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        )}
        {uploadingImage && <p className="text-[#F7C600] text-xs mt-2">جاري الرفع...</p>}
      </div>

      <button
        type="submit"
        disabled={loading || uploadingImage}
        className="w-full bg-[#F7C600] text-black font-bold py-3 rounded-xl text-sm hover:bg-[#F7C600]/90 transition disabled:opacity-50"
      >
        {loading ? 'جاري الحفظ...' : '💛 إضافة الداعم'}
      </button>
    </form>
  )

  // ── RE-DONATION VIEW ──
  if (view === 'redonation' && selectedDonor) {
    const donationUnits = getDonationUnits(selectedDonor.total_amount)

    return (
      <form onSubmit={handleRedonation} className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-gray-500 text-xs">تسجيل تبرع جديد</p>
          <button
            type="button"
            onClick={() => { setView('list'); setSelectedDonor(null) }}
            className="text-gray-400 text-xs border border-[#2a2a2a] px-4 py-2 rounded-xl"
          >
            ← العودة
          </button>
        </div>

        <div className="flex items-center gap-4 bg-[#111] border border-[#F7C600]/20 rounded-2xl px-5 py-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-[#1a1a1a] flex items-center justify-center shrink-0">
            {selectedDonor.image
              ? <img src={selectedDonor.image} alt="" className="w-full h-full object-cover" />
              : <span className="text-[#F7C600] font-black">{selectedDonor.name_ar.charAt(0)}</span>
            }
          </div>

          <div>
            <p className="text-white font-black">{selectedDonor.name_ar}</p>
            <p className="text-gray-500 text-xs">
              الإجمالي الحالي:{' '}
              <span className="text-[#F7C600] font-bold">
                {Number(selectedDonor.total_amount).toLocaleString('ar-TN')} د.ت
              </span>
            </p>
            <p className="text-gray-600 text-xs">
              {donationUnits} total donations
            </p>
            <p className="text-gray-500 text-[11px]">
              100 × {donationUnits}
            </p>
          </div>
        </div>

        <div>
          <label className="text-gray-400 text-xs block mb-1">المبلغ الجديد (د.ت) *</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={reAmount}
            onChange={e => setReAmount(e.target.value)}
            className={inputCls}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#F7C600] text-black font-bold py-3 rounded-xl text-sm hover:bg-[#F7C600]/90 transition disabled:opacity-50"
        >
          {loading ? 'جاري الحفظ...' : '✅ تسجيل التبرع'}
        </button>
      </form>
    )
  }

  return null
}