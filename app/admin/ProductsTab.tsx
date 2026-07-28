'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export const PRODUCT_CATEGORIES = [
  { id: 'shirts', label: 'القمصان' },
  { id: 'training', label: 'التدريب' },
  { id: 'accessories', label: 'الإكسسوارات' },
  { id: 'collectibles', label: 'التذكارات' },
]
const ALL_SIZES = ['S', 'M', 'L', 'XL', 'XXL']
const BADGES = ['جديد', 'حصري', 'محدود']

type Product = {
  id: string
  name_ar: string
  name: string | null
  category: string
  price: number
  image: string | null
  sizes: string[] | null
  badge: string | null
  description: string | null
  in_stock: boolean
  sort_order: number
}

const emptyForm = {
  name_ar: '', name: '', category: 'shirts', price: '', image: '',
  sizes: [] as string[], badge: '', description: '', in_stock: true, sort_order: '0',
}

export default function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([])
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ ...emptyForm })
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchProducts() }, [])

  async function fetchProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
    if (error) { console.error(error); return }
    setProducts((data as Product[]) || [])
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('upload_preset', 'usbg_articles')
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: fd }
      )
      const data = await res.json()
      if (data.secure_url) setForm(prev => ({ ...prev, image: data.secure_url }))
      else alert('تعذّر رفع الصورة')
    } finally {
      setUploading(false)
    }
  }

  function toggleSize(sz: string) {
    setForm(prev => ({
      ...prev,
      sizes: prev.sizes.includes(sz) ? prev.sizes.filter(s => s !== sz) : [...prev.sizes, sz],
    }))
  }

  function startCreate() { setForm({ ...emptyForm }); setEditingId(null); setView('create') }

  function startEdit(p: Product) {
    setForm({
      name_ar: p.name_ar || '', name: p.name || '', category: p.category || 'shirts',
      price: String(p.price ?? ''), image: p.image || '', sizes: p.sizes || [],
      badge: p.badge || '', description: p.description || '', in_stock: p.in_stock,
      sort_order: String(p.sort_order ?? 0),
    })
    setEditingId(p.id)
    setView('edit')
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name_ar.trim()) { alert('اسم المنتج بالعربية مطلوب'); return }
    const price = parseFloat(form.price)
    if (Number.isNaN(price)) { alert('السعر غير صحيح'); return }

    setSaving(true)
    const payload = {
      name_ar: form.name_ar.trim(),
      name: form.name.trim() || null,
      category: form.category,
      price,
      image: form.image || null,
      sizes: form.sizes,
      badge: form.badge || null,
      description: form.description.trim() || null,
      in_stock: form.in_stock,
      sort_order: Number(form.sort_order) || 0,
    }

    const { error } =
      view === 'edit' && editingId
        ? await supabase.from('products').update(payload).eq('id', editingId)
        : await supabase.from('products').insert([payload])

    setSaving(false)
    if (error) { alert('خطأ: ' + error.message); return }
    setView('list'); setEditingId(null); setForm({ ...emptyForm }); fetchProducts()
  }

  async function remove(id: string) {
    if (!confirm('حذف هذا المنتج؟')) return
    await supabase.from('products').delete().eq('id', id)
    fetchProducts()
  }

  const inputCls = 'w-full bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F7C600]/50'

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-500 text-xs">
          {view === 'list' ? `${products.length} منتج` : view === 'edit' ? 'تعديل المنتج' : 'منتج جديد'}
        </p>
        {view === 'list' ? (
          <button onClick={startCreate} className="bg-[#F7C600] text-black text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#F7C600]/90 transition">
            + منتج جديد
          </button>
        ) : (
          <button onClick={() => { setView('list'); setEditingId(null) }} className="text-gray-400 text-xs border border-[#2a2a2a] px-4 py-2 rounded-xl hover:border-[#F7C600]/40 hover:text-white transition">
            رجوع
          </button>
        )}
      </div>

      {(view === 'create' || view === 'edit') && (
        <form onSubmit={save} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-xs block mb-1">اسم المنتج بالعربية *</label>
              <input value={form.name_ar} onChange={e => setForm(p => ({ ...p, name_ar: e.target.value }))} className={inputCls} required />
            </div>
            <div>
              <label className="text-gray-400 text-xs block mb-1">الاسم بالفرنسية</label>
              <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-gray-400 text-xs block mb-1">الفئة</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className={inputCls}>
                {PRODUCT_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-xs block mb-1">السعر (TND) *</label>
              <input value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} type="number" step="1" dir="ltr" className={inputCls} required />
            </div>
            <div>
              <label className="text-gray-400 text-xs block mb-1">الشارة</label>
              <select value={form.badge} onChange={e => setForm(p => ({ ...p, badge: e.target.value }))} className={inputCls}>
                <option value="">بدون</option>
                {BADGES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-xs block mb-1">الترتيب</label>
              <input value={form.sort_order} onChange={e => setForm(p => ({ ...p, sort_order: e.target.value }))} type="number" dir="ltr" className={inputCls} />
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-xs block mb-2">المقاسات المتوفرة</label>
            <div className="flex gap-2 flex-wrap">
              {ALL_SIZES.map(sz => (
                <button type="button" key={sz} onClick={() => toggleSize(sz)}
                  className={`w-11 h-10 rounded-xl border text-xs font-black transition-all ${form.sizes.includes(sz) ? 'bg-[#F7C600] text-black border-[#F7C600]' : 'border-[#2a2a2a] text-gray-400 hover:border-[#F7C600]/40'}`}>
                  {sz}
                </button>
              ))}
            </div>
            <p className="text-gray-700 text-[10px] mt-2">اتركها فارغة للمنتجات بدون مقاسات (قبعة، وشاح...)</p>
          </div>

          <div>
            <label className="text-gray-400 text-xs block mb-1">الوصف</label>
            <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} className={inputCls} />
          </div>

          <div>
            <label className="text-gray-400 text-xs block mb-1">صورة المنتج</label>
            {form.image ? (
              <div className="relative w-full h-48 rounded-xl overflow-hidden border border-[#2a2a2a]">
                <img src={form.image} alt="preview" className="w-full h-full object-cover" />
                <button type="button" onClick={() => setForm(p => ({ ...p, image: '' }))} className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg">
                  حذف الصورة
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#2a2a2a] rounded-xl cursor-pointer hover:border-[#F7C600]/40 transition">
                <span className="text-gray-500 text-xs">اضغط لرفع صورة</span>
                <span className="text-gray-600 text-[10px] mt-1">JPG, PNG</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            )}
            {uploading && <p className="text-[#F7C600] text-xs mt-2">جاري الرفع...</p>}
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.in_stock} onChange={e => setForm(p => ({ ...p, in_stock: e.target.checked }))} className="w-4 h-4 accent-[#F7C600]" />
            <span className="text-gray-300 text-sm">متوفر في المتجر</span>
          </label>

          <div className="flex gap-3">
            <button type="submit" disabled={saving || uploading} className="flex-1 bg-[#F7C600] text-black font-bold py-3 rounded-xl text-sm hover:bg-[#F7C600]/90 transition disabled:opacity-50">
              {saving ? 'جاري الحفظ...' : view === 'edit' ? 'حفظ التعديلات' : 'إضافة المنتج'}
            </button>
            <button type="button" onClick={() => { setView('list'); setEditingId(null) }} className="px-5 py-3 rounded-xl border border-[#2a2a2a] text-gray-300 text-sm hover:border-[#F7C600]/40">
              إلغاء
            </button>
          </div>
        </form>
      )}

      {view === 'list' && (
        <div className="space-y-3">
          {products.length === 0 ? (
            <div className="text-center py-16 text-gray-600 text-sm">لا توجد منتجات بعد — أضف أول منتج</div>
          ) : (
            products.map(p => (
              <div key={p.id} className="flex items-center justify-between gap-4 bg-[#111] border border-[#1e1e1e] rounded-2xl px-5 py-4 hover:border-[#F7C600]/20 transition">
                <div className="flex items-center gap-4 min-w-0">
                  {p.image ? (
                    <img src={p.image} alt={p.name_ar} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-[#1a1a1a] flex items-center justify-center shrink-0">
                      <span className="text-[#F7C600] text-xs font-black">👕</span>
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-white text-sm font-bold truncate">
                      {p.name_ar}
                      {!p.in_stock && <span className="mr-2 text-red-400 text-[10px]">(غير متوفر)</span>}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      <span className="text-[#F7C600] font-black">{p.price} TND</span>
                      {' · '}{PRODUCT_CATEGORIES.find(c => c.id === p.category)?.label || p.category}
                      {p.badge && <span className="text-[#F7C600]/70"> · {p.badge}</span>}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 shrink-0">
                  <button onClick={() => startEdit(p)} className="text-[#F7C600] text-xs hover:text-[#F7C600]/70">تعديل</button>
                  <button onClick={() => remove(p.id)} className="text-red-400 text-xs hover:text-red-300">حذف</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
