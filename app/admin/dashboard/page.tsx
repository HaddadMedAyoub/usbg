//admin/dashoard/page.tsx
'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import DonorsTab from '../DonorsTab'
import ProductsTab from '../ProductsTab'
import RichTextEditor from '@/components/RichTextEditor'
import ArticleContent from "@/components/ArticleContent";
type Article = {
    id: string;
    title?: string | null;
    title_ar: string;
    excerpt_ar?: string | null;
    content?: string | null;
    content_ar?: string | null;
    content_html_ar?: string | null;
    content_json_ar?: any | null;
    category?: string | null;
    image?: string | null;
    images?: string[] | null;
    video_url?: string | null;
    slug: string;
    published_at: string | null;
};

type ArticleForm = {
    title_ar: string;
    title: string;
    slug: string;
    excerpt_ar: string;
    content_ar: string;
    content: string;
    content_html_ar: string;
    content_json_ar: any;
    category: string;
    image: string;
    images: string[];
    video_url: string;
};

const emptyForm: ArticleForm = {
    title_ar: "",
    title: "",
    slug: "",
    excerpt_ar: "",
    content_ar: "",
    content: "",
    content_html_ar: "",
    content_json_ar: null,
    category: "news",
    image: "",
    images: [],
    video_url: "",
};
export default function AdminDashboard() {
    const [tab, setTab] = useState<'articles' | 'lineup' | 'donors' | 'orders' | 'products'>('articles')
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [sessionReady, setSessionReady] = useState(false)
    const [view, setView] = useState<'list' | 'create' | 'edit'>('list')
    const [editingId, setEditingId] = useState<string | null>(null)
    const [form, setForm] = useState<ArticleForm>(emptyForm);
    const [players, setPlayers] = useState<any[]>([])
    const [orders, setOrders] = useState<any[]>([])
    const [orderFilter, setOrderFilter] = useState<'all' | 'new' | 'confirmed' | 'delivered'>('all')
    const [productCount, setProductCount] = useState(0)
    const [selectedPlayers, setSelectedPlayers] = useState<any[]>(Array(11).fill(null))
    const [lineup, setLineup] = useState({
        opponent: '', opponent_ar: '', match_date: '', formation: '4-3-3', players: [] as any[]
    })
    const router = useRouter()
    const initialized = useRef(false)

    useEffect(() => {
        if (initialized.current) return
        initialized.current = true

        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                router.push('/admin')
            } else {
                setSessionReady(true)
                fetchArticles()
                fetchPlayers()
                fetchOrders()
                fetchProductCount()
            }
        })
    }, [])

    async function fetchArticles() {
        const { data, error } = await supabase
            .from("articles")
            .select("*")
            .order("published_at", { ascending: false });

        if (error) {
            console.error(error);
            return;
        }

        setArticles((data as Article[]) || []);
    }

    async function fetchPlayers() {
        const { data, error } = await supabase
            .from('players')
            .select('*')
            .order('position', { ascending: true })
        console.log('players:', data, 'error:', error)
        setPlayers(data || [])
    }

    async function fetchOrders() {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false })
        if (error) { console.error(error); return }
        setOrders(data || [])
    }

    async function fetchProductCount() {
        const { count } = await supabase.from('products').select('*', { count: 'exact', head: true })
        setProductCount(count || 0)
    }

    async function updateOrderStatus(id: string, status: string) {
        await supabase.from('orders').update({ status }).eq('id', id)
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
    }

    async function deleteOrder(id: string) {
        if (!confirm('حذف هذا الطلب؟')) return
        await supabase.from('orders').delete().eq('id', id)
        setOrders(prev => prev.filter(o => o.id !== id))
    }


    function generateSlug(title: string) {
        return title
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-\u0600-\u06FF]/g, "")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "")
            .slice(0, 80);
    }
    function formatPublishedDate(value: string | null) {
        if (!value) return "بدون تاريخ";
        const time = new Date(value).getTime();
        if (Number.isNaN(time)) return "بدون تاريخ";
        return new Date(value).toLocaleDateString("ar-TN");
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

    function handleEdit(article: Article) {
        setForm({
            title_ar: article.title_ar || "",
            title: article.title || "",
            slug: article.slug || "",
            excerpt_ar: article.excerpt_ar || "",
            content_ar: article.content_ar || "",
            content: article.content || "",
            content_html_ar: article.content_html_ar || "",
            content_json_ar: article.content_json_ar || null,
            category: article.category || "news",
            image: article.image || "",
            images: article.images || [],
            video_url: article.video_url || "",
        });

        setEditingId(article.id);
        setView("edit");
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const cleanTitleAr = form.title_ar.trim();
        const cleanSlug = form.slug.trim();
        const cleanContentHtml = form.content_html_ar.trim();
        // If you pasted HTML directly, derive the plain-text version from it.
        const cleanContentAr =
            form.content_ar.trim() ||
            cleanContentHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
        const cleanExcerpt = form.excerpt_ar.trim();

        if (!cleanTitleAr) {
            alert("العنوان بالعربية مطلوب");
            return;
        }

        if (!cleanSlug) {
            alert("الـ slug مطلوب");
            return;
        }

        if (!cleanContentHtml && !cleanContentAr) {
            alert("محتوى المقال مطلوب");
            return;
        }

        setLoading(true);

        try {
            const slugQuery = supabase
                .from("articles")
                .select("id")
                .eq("slug", cleanSlug)
                .limit(1);

            const { data: existingSlug, error: slugError } =
                view === "edit" && editingId
                    ? await slugQuery.neq("id", editingId)
                    : await slugQuery;

            if (slugError) throw slugError;

            if (existingSlug && existingSlug.length > 0) {
                alert("هذا الـ slug مستخدم بالفعل، اختر slug آخر");
                setLoading(false);
                return;
            }

            const payload = {
                title_ar: cleanTitleAr,
                title: form.title.trim() || null,
                slug: cleanSlug,
                excerpt_ar: cleanExcerpt || null,
                content_ar: cleanContentAr || null,
                content: form.content.trim() || null,
                content_html_ar: cleanContentHtml || null,
                content_json_ar: form.content_json_ar || null,
                category: form.category || "news",
                image: form.image || null,
                images: form.images?.length ? form.images : null,
                video_url: form.video_url.trim() || null,
            };

            if (view === "edit" && editingId) {
                const { error } = await supabase
                    .from("articles")
                    .update(payload)
                    .eq("id", editingId);

                if (error) throw error;
            } else {
                const { error } = await supabase.from("articles").insert([
                    {
                        ...payload,
                        published_at: new Date().toISOString(),
                    },
                ]);

                if (error) throw error;
            }

            resetForm();
            await fetchArticles();
        } catch (error: any) {
            alert("خطأ: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('حذف هذا المقال؟')) return
        await supabase.from('articles').delete().eq('id', id)
        fetchArticles()
    }

    async function handleSaveLineup() {
        const filled = selectedPlayers.filter(Boolean)
        if (filled.length < 11) { alert('يجب اختيار 11 لاعبًا'); return }
        if (!lineup.opponent_ar || !lineup.match_date) { alert('يجب ملء جميع الحقول'); return }
        await supabase.from('lineups').update({ is_active: false }).eq('is_active', true)
        const { error } = await supabase.from('lineups').insert([{
            opponent: lineup.opponent,
            opponent_ar: lineup.opponent_ar,
            match_date: lineup.match_date,
            formation: lineup.formation,
            players: filled.map(({ slotKey, ...p }) => p),
            is_active: true
        }])
        if (error) alert('خطأ: ' + error.message)
        else {
            alert('✅ تم حفظ التشكيلة!')
            setSelectedPlayers(Array(11).fill(null))
            setLineup({ opponent: '', opponent_ar: '', match_date: '', formation: '4-3-3', players: [] })
        }
    }

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push('/admin')
    }

    function resetForm() {
        setForm(emptyForm);
        setEditingId(null);
        setView("list");
    }

    const isEditing = view === 'edit'

    const formationSlots = [
        { label: 'حارس المرمى', position: 'GK', count: 1 },
        { label: 'المدافعون', position: 'DEF', count: Number(lineup.formation.split('-')[0]) },
        { label: 'الوسط', position: 'MID', count: Number(lineup.formation.split('-')[1]) },
        { label: 'المهاجمون', position: 'FWD', count: Number(lineup.formation.split('-')[lineup.formation.split('-').length - 1]) },
    ]

    if (!sessionReady) return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
            <p className="text-gray-500 text-sm">جاري التحميل...</p>
        </div>
    )

    return (
        <div className="min-h-screen bg-[#0a0a0a]">

            {/* Top Bar */}
            <div className="border-b border-[#1a1a1a] px-6 py-4 flex items-center justify-between">
                <div>
                    <span className="text-[#F7C600] font-black text-xl">USBG</span>
                    <span className="text-gray-600 text-xs ml-2">لوحة التحكم</span>
                </div>
                <button onClick={handleLogout} className="text-gray-500 text-xs border border-[#2a2a2a] px-4 py-2 rounded-xl hover:border-red-400/40 hover:text-red-400 transition">
                    خروج
                </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-[#1a1a1a] px-6 overflow-x-auto scrollbar-hide [&>button]:shrink-0">
                <button
                    onClick={() => { setTab('articles'); setView('list') }}
                    className={`px-5 py-4 text-sm font-bold border-b-2 transition-colors ${tab === 'articles' ? 'border-[#F7C600] text-[#F7C600]' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                >
                    📰 المقالات
                </button>
                <button
                    onClick={() => setTab('lineup')}
                    className={`px-5 py-4 text-sm font-bold border-b-2 transition-colors ${tab === 'lineup' ? 'border-[#F7C600] text-[#F7C600]' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                >
                    ⚽ التشكيلة
                </button>
                <button
                    onClick={() => setTab('donors')}
                    className={`px-5 py-4 text-sm font-bold border-b-2 transition-colors ${tab === 'donors'
                        ? 'border-[#F7C600] text-[#F7C600]'
                        : 'border-transparent text-gray-500 hover:text-gray-300'
                        }`}
                >
                    💛 الداعمون
                </button>
                <button
                    onClick={() => { setTab('orders'); fetchOrders() }}
                    className={`px-5 py-4 text-sm font-bold border-b-2 transition-colors ${tab === 'orders'
                        ? 'border-[#F7C600] text-[#F7C600]'
                        : 'border-transparent text-gray-500 hover:text-gray-300'
                        }`}
                >
                    🛒 الطلبات
                    {orders.filter(o => o.status === 'new').length > 0 && (
                        <span className="mr-1.5 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-[#F7C600] text-black text-[10px] font-black">
                            {orders.filter(o => o.status === 'new').length}
                        </span>
                    )}
                </button>
                <button
                    onClick={() => setTab('products')}
                    className={`px-5 py-4 text-sm font-bold border-b-2 transition-colors ${tab === 'products'
                        ? 'border-[#F7C600] text-[#F7C600]'
                        : 'border-transparent text-gray-500 hover:text-gray-300'
                        }`}
                >
                    🛍️ المتجر
                </button>

            </div>

            <div className="max-w-4xl mx-auto p-6">

                {/* ── Overview ── */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    <div className="rounded-2xl border border-[#1a1a1a] bg-[#0d0d0d] px-4 py-3">
                        <p className="text-gray-500 text-[11px]">المقالات</p>
                        <p className="text-white font-black text-2xl mt-0.5">{articles.length}</p>
                    </div>
                    <div className="rounded-2xl border border-[#1a1a1a] bg-[#0d0d0d] px-4 py-3">
                        <p className="text-gray-500 text-[11px]">المنتجات</p>
                        <p className="text-white font-black text-2xl mt-0.5">{productCount}</p>
                    </div>
                    <div className="rounded-2xl border border-[#F7C600]/20 bg-[#F7C600]/[0.04] px-4 py-3">
                        <p className="text-gray-500 text-[11px]">طلبات جديدة</p>
                        <p className="text-[#F7C600] font-black text-2xl mt-0.5">{orders.filter(o => o.status === 'new').length}</p>
                    </div>
                </div>

                {/* ── ARTICLES TAB ── */}
                {tab === 'articles' && (
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-gray-500 text-xs">
                                {view === 'list'
                                    ? `${articles.length} مقال منشور`
                                    : isEditing
                                        ? 'تعديل المقال'
                                        : 'مقال جديد'}
                            </p>

                            <div className="flex gap-3">
                                {view === 'list' ? (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setForm(emptyForm);
                                            setEditingId(null);
                                            setView('create');
                                        }}
                                        className="bg-[#F7C600] text-black text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#F7C600]/90 transition"
                                    >
                                        + مقال جديد
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="text-gray-400 text-xs border border-[#2a2a2a] px-4 py-2 rounded-xl hover:border-[#F7C600]/40 hover:text-white transition"
                                    >
                                        رجوع
                                    </button>
                                )}
                            </div>
                        </div>

                        {(view === "create" || view === "edit") && (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-gray-400 text-xs block mb-1">العنوان بالعربية *</label>
                                        <input
                                            value={form.title_ar}
                                            onChange={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    title_ar: e.target.value,
                                                    slug: prev.slug || generateSlug(e.target.value),
                                                }))
                                            }
                                            className="w-full bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F7C600]/50"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="text-gray-400 text-xs block mb-1">العنوان بالفرنسية</label>
                                        <input
                                            value={form.title}
                                            onChange={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    title: e.target.value,
                                                    slug: prev.slug || generateSlug(e.target.value),
                                                }))
                                            }
                                            className="w-full bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F7C600]/50"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-gray-400 text-xs block mb-1">Slug *</label>
                                    <input
                                        value={form.slug}
                                        onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                                        className="w-full bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F7C600]/50"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="text-gray-400 text-xs block mb-1">المقتطف / الوصف القصير</label>
                                    <textarea
                                        value={form.excerpt_ar}
                                        onChange={(e) => setForm((prev) => ({ ...prev, excerpt_ar: e.target.value }))}
                                        rows={3}
                                        className="w-full bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F7C600]/50"
                                        placeholder="وصف قصير يظهر في قائمة الأخبار وداخل المقال"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-gray-400 text-xs block mb-2">المحتوى بالعربية *</label>
                                        <RichTextEditor
                                            value={form.content_html_ar || "<p></p>"}
                                            onChange={({ html, json, text }) => {
                                                setForm((prev) => ({
                                                    ...prev,
                                                    content_html_ar: html,
                                                    content_json_ar: json,
                                                    content_ar: text,
                                                }));
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-gray-400 text-xs block mb-2">
                                            أو الصق HTML مباشرة للمعاينة
                                        </label>
                                        <textarea
                                            value={form.content_html_ar}
                                            onChange={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    content_html_ar: e.target.value,
                                                }))
                                            }
                                            rows={10}
                                            dir="ltr"
                                            className="w-full bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-[#F7C600]/50"
                                            placeholder="<h2>عنوان</h2><p>محتوى المقال...</p>"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-gray-400 text-xs block mb-1">المحتوى بالفرنسية</label>
                                    <textarea
                                        value={form.content}
                                        onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                                        rows={4}
                                        className="w-full bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F7C600]/50"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-gray-400 text-xs block mb-1">التصنيف</label>
                                        <select
                                            value={form.category}
                                            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                                            className="w-full bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none"
                                        >
                                            <option value="news">أخبار</option>
                                            <option value="match">مباريات</option>
                                            <option value="announcement">بلاغات</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-gray-400 text-xs block mb-1">رابط الفيديو (YouTube)</label>
                                        <input
                                            value={form.video_url}
                                            onChange={(e) => setForm((prev) => ({ ...prev, video_url: e.target.value }))}
                                            className="w-full bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F7C600]/50"
                                            placeholder="https://youtube.com/watch?v=..."
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-gray-400 text-xs block mb-1">صورة المقال الرئيسية</label>
                                    {form.image ? (
                                        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-[#2a2a2a]">
                                            <img src={form.image} alt="preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setForm((prev) => ({ ...prev, image: "" }))}
                                                className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg"
                                            >
                                                حذف الصورة
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#2a2a2a] rounded-xl cursor-pointer hover:border-[#F7C600]/40 transition">
                                            <span className="text-gray-500 text-xs">اضغط لرفع صورة</span>
                                            <span className="text-gray-600 text-[10px] mt-1">JPG, PNG — max 5MB</span>
                                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                        </label>
                                    )}
                                    {uploadingImage && <p className="text-[#F7C600] text-xs mt-2">جاري الرفع...</p>}
                                </div>

                                <div className="rounded-2xl border border-[#2a2a2a] bg-[#111] p-5 space-y-4">
                                    <p className="text-[#F7C600] text-xs font-bold">معاينة المقال قبل النشر</p>

                                    <div className="space-y-3">
                                        <h3 className="text-white text-2xl font-black leading-10">
                                            {form.title_ar || "عنوان المقال سيظهر هنا"}
                                        </h3>

                                        {!!form.excerpt_ar && (
                                            <p className="text-gray-400 text-sm leading-7">
                                                {form.excerpt_ar}
                                            </p>
                                        )}

                                        {!!form.image && (
                                            <img
                                                src={form.image}
                                                alt={form.title_ar || "preview"}
                                                className="w-full max-h-80 object-cover rounded-2xl"
                                            />
                                        )}

                                        {!!form.video_url && (
                                            <div className="text-xs text-[#F7C600] break-all">
                                                فيديو: {form.video_url}
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-t border-[#2a2a2a] pt-4">
                                        {form.content_html_ar ? (
                                            <ArticleContent html={form.content_html_ar} text={form.content_ar} />
                                        ) : (
                                            <div className="text-gray-500 text-sm">
                                                ابدأ بكتابة محتوى المقال لعرض المعاينة هنا
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={loading || uploadingImage}
                                        className="flex-1 bg-[#F7C600] text-black font-bold py-3 rounded-xl text-sm hover:bg-[#F7C600]/90 transition disabled:opacity-50"
                                    >
                                        {loading ? "جاري الحفظ..." : isEditing ? "حفظ التعديلات" : "نشر المقال"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="px-5 py-3 rounded-xl border border-[#2a2a2a] text-gray-300 text-sm hover:border-[#F7C600]/40"
                                    >
                                        إلغاء
                                    </button>
                                </div>
                            </form>
                        )}

                        {view === 'list' && (
                            <div className="space-y-3">
                                {articles.map((a) => (
                                    <div
                                        key={a.id}
                                        className="flex items-center justify-between gap-4 bg-[#111] border border-[#1e1e1e] rounded-2xl px-5 py-4 hover:border-[#F7C600]/20 transition"
                                    >
                                        <div className="flex items-center gap-4 min-w-0">
                                            {a.image ? (
                                                <img
                                                    src={a.image}
                                                    alt={a.title_ar}
                                                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                                                />
                                            ) : (
                                                <div className="w-14 h-14 rounded-xl bg-[#1a1a1a] flex items-center justify-center shrink-0">
                                                    <span className="text-[#F7C600] text-xs font-black">ART</span>
                                                </div>
                                            )}

                                            <div className="min-w-0">
                                                <p className="text-white text-sm font-bold truncate">{a.title_ar}</p>
                                                <p className="text-gray-500 text-xs mt-1">
                                                    {formatPublishedDate(a.published_at)} ·{" "}
                                                    <span className="text-[#F7C600]/70">{a.category || "عام"}</span>
                                                </p>

                                                {a.excerpt_ar && (
                                                    <p className="text-gray-400 text-xs mt-2 line-clamp-2 max-w-xl">
                                                        {a.excerpt_ar}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex gap-3 shrink-0">
                                            <button
                                                onClick={() => handleEdit(a)}
                                                className="text-[#F7C600] text-xs hover:text-[#F7C600]/70"
                                            >
                                                تعديل
                                            </button>
                                            <button
                                                onClick={() => handleDelete(a.id)}
                                                className="text-red-400 text-xs hover:text-red-300"
                                            >
                                                حذف
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* ── LINEUP TAB ── */}
                {tab === 'lineup' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-500 text-xs">تشكيلة المباراة القادمة — ستظهر فورًا في الصفحة الرئيسية</p>
                            <span className="text-[#F7C600] text-xs bg-[#F7C600]/10 px-3 py-1 rounded-full font-bold">
                                {selectedPlayers.filter(Boolean).length} / 11
                            </span>
                        </div>

                        {/* Match Info */}
                        <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5 space-y-4">
                            <p className="text-white text-xs font-bold uppercase tracking-widest text-[#F7C600]">معلومات المباراة</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-gray-400 text-xs block mb-1">اسم الخصم بالعربية *</label>
                                    <input value={lineup.opponent_ar} onChange={e => setLineup({ ...lineup, opponent_ar: e.target.value })}
                                        placeholder="مثال: الترجي الرياضي"
                                        className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F7C600]/50" />
                                </div>
                                <div>
                                    <label className="text-gray-400 text-xs block mb-1">اسم الخصم بالفرنسية</label>
                                    <input value={lineup.opponent} onChange={e => setLineup({ ...lineup, opponent: e.target.value })}
                                        placeholder="Ex: Espérance Sportive"
                                        className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F7C600]/50" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-gray-400 text-xs block mb-1">تاريخ ووقت المباراة *</label>
                                    <input type="datetime-local" value={lineup.match_date} onChange={e => setLineup({ ...lineup, match_date: e.target.value })}
                                        className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F7C600]/50" />
                                </div>
                                <div>
                                    <label className="text-gray-400 text-xs block mb-1">التشكيلة</label>
                                    <select value={lineup.formation} onChange={e => { setLineup({ ...lineup, formation: e.target.value }); setSelectedPlayers(Array(11).fill(null)) }}
                                        className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none">
                                        <option value="4-3-3">4-3-3</option>
                                        <option value="4-4-2">4-4-2</option>
                                        <option value="3-5-2">3-5-2</option>
                                        <option value="4-2-3-1">4-2-3-1</option>
                                        <option value="5-3-2">5-3-2</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Player Selection by Position */}
                        {formationSlots.map(({ label, position, count }) => (
                            <div key={position} className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5 space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${position === 'GK' ? 'bg-yellow-500/20 text-yellow-400' :
                                        position === 'DEF' ? 'bg-blue-500/20 text-blue-400' :
                                            position === 'MID' ? 'bg-green-500/20 text-green-400' :
                                                'bg-red-500/20 text-red-400'
                                        }`}>{position}</span>
                                    <p className="text-white text-sm font-bold">{label}</p>
                                    <span className="text-gray-600 text-xs">({count} لاعبين)</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {Array.from({ length: Number(count) }).map((_, i) => {
                                        const slotKey = `${position}-${i}`
                                        const selected = selectedPlayers.find(p => p?.slotKey === slotKey)
                                        return (
                                            <div key={slotKey} className="relative">
                                                <select
                                                    value={selected?.id || ''}
                                                    onChange={e => {
                                                        const player = players.find(p => p.id === e.target.value)
                                                        setSelectedPlayers(prev => {
                                                            const filtered = prev.filter(p => p?.slotKey !== slotKey)
                                                            return player ? [...filtered, { ...player, slotKey }] : filtered
                                                        })
                                                    }}
                                                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F7C600]/50"
                                                >
                                                    <option value="">اختر لاعبًا...</option>
                                                    {players
                                                        .filter(p => p.position === position)
                                                        .filter(p => !selectedPlayers.some(s => s?.id === p.id && s?.slotKey !== slotKey))
                                                        .map(p => (
                                                            <option key={p.id} value={p.id}>
                                                                {p.number ? `#${p.number} ` : ''}{p.name_ar}
                                                            </option>
                                                        ))}
                                                </select>
                                                {selected && (
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#F7C600]" />
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}

                        <button onClick={handleSaveLineup}
                            disabled={selectedPlayers.filter(Boolean).length < 11}
                            className="w-full bg-[#F7C600] text-black font-bold py-4 rounded-xl text-sm hover:bg-[#F7C600]/90 transition disabled:opacity-40 disabled:cursor-not-allowed">
                            ⚽ نشر التشكيلة على الصفحة الرئيسية
                        </button>
                    </div>
                )}

                {tab === 'donors' && <DonorsTab />}

                {tab === 'products' && <ProductsTab />}

                {/* ── ORDERS TAB ── */}
                {tab === 'orders' && (() => {
                    const ST: Record<string, { label: string; cls: string; dot: string }> = {
                        new:       { label: 'جديد',       cls: 'bg-[#F7C600]/15 text-[#F7C600] border-[#F7C600]/30', dot: 'bg-[#F7C600]' },
                        confirmed: { label: 'مؤكد',       cls: 'bg-blue-500/15 text-blue-400 border-blue-500/30',   dot: 'bg-blue-400' },
                        delivered: { label: 'تم التسليم', cls: 'bg-green-500/15 text-green-400 border-green-500/30', dot: 'bg-green-400' },
                        cancelled: { label: 'ملغى',       cls: 'bg-red-500/15 text-red-400 border-red-500/30',      dot: 'bg-red-400' },
                    }
                    const counts: any = {
                        all: orders.length,
                        new: orders.filter(o => o.status === 'new').length,
                        confirmed: orders.filter(o => o.status === 'confirmed').length,
                        delivered: orders.filter(o => o.status === 'delivered').length,
                    }
                    const money = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + Number(o.total || 0), 0)
                    const filtered = orderFilter === 'all' ? orders : orders.filter(o => o.status === orderFilter)

                    return (
                        <div className="space-y-4">
                            {/* Overview */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="rounded-2xl border border-[#1e1e1e] bg-[#111] p-4">
                                    <p className="text-2xl font-black text-white">{counts.new}</p>
                                    <p className="text-gray-500 text-xs mt-0.5">طلبات جديدة</p>
                                </div>
                                <div className="rounded-2xl border border-[#1e1e1e] bg-[#111] p-4">
                                    <p className="text-2xl font-black text-white">{counts.all}</p>
                                    <p className="text-gray-500 text-xs mt-0.5">إجمالي الطلبات</p>
                                </div>
                                <div className="rounded-2xl border border-[#F7C600]/20 bg-[#F7C600]/[0.05] p-4">
                                    <p className="text-2xl font-black text-[#F7C600]">{money}</p>
                                    <p className="text-gray-500 text-xs mt-0.5">القيمة (د.ت)</p>
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                                    {([['all', 'الكل'], ['new', 'جديد'], ['confirmed', 'مؤكد'], ['delivered', 'تم التسليم']] as const).map(([k, label]) => (
                                        <button key={k} onClick={() => setOrderFilter(k)}
                                            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold border transition ${orderFilter === k ? 'bg-[#F7C600] text-black border-[#F7C600]' : 'border-[#2a2a2a] text-gray-400 hover:text-white'}`}>
                                            {label}{k !== 'all' && counts[k] > 0 ? ` (${counts[k]})` : ''}
                                        </button>
                                    ))}
                                </div>
                                <button onClick={fetchOrders} className="shrink-0 text-gray-400 text-xs border border-[#2a2a2a] px-3 py-1.5 rounded-xl hover:border-[#F7C600]/40 hover:text-white transition">↻ تحديث</button>
                            </div>

                            {/* List */}
                            {filtered.length === 0 ? (
                                <div className="text-center py-16 text-gray-600 text-sm">لا توجد طلبات {orderFilter !== 'all' ? 'بهذه الحالة' : 'بعد'}</div>
                            ) : (
                                <div className="space-y-3">
                                    {filtered.map((o) => {
                                        const st = ST[o.status] || ST.new
                                        const dim = o.status === 'delivered' || o.status === 'cancelled'
                                        return (
                                            <div key={o.id} className={`rounded-2xl border p-5 transition ${dim ? 'border-[#161616] bg-[#0d0d0d] opacity-70' : 'border-[#1e1e1e] bg-[#111]'}`}>
                                                <div className="flex items-start justify-between gap-3 mb-3">
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        {o.items?.[0]?.image ? (
                                                            <img src={o.items[0].image} className="w-11 h-11 rounded-xl object-cover shrink-0" alt="" />
                                                        ) : (
                                                            <div className="w-11 h-11 rounded-xl bg-[#1a1a1a] flex items-center justify-center shrink-0 text-lg">👕</div>
                                                        )}
                                                        <div className="min-w-0">
                                                            <p className="text-[#F7C600] font-black text-sm">{o.ref || String(o.id).slice(0, 8)}</p>
                                                            <p className="text-gray-600 text-[11px] mt-0.5">{new Date(o.created_at).toLocaleString('ar-TN')}</p>
                                                        </div>
                                                    </div>
                                                    <span className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold ${st.cls}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />{st.label}
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs mb-3">
                                                    <span className="text-white font-bold">{o.customer_name}</span>
                                                    <a href={`tel:${o.customer_phone}`} className="text-[#F7C600]" dir="ltr">{o.customer_phone}</a>
                                                    {o.customer_city && <span className="text-gray-400">{o.customer_city}</span>}
                                                </div>

                                                <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-3 flex flex-col gap-1.5 mb-3">
                                                    {(o.items || []).map((it: any, idx: number) => (
                                                        <div key={idx} className="flex justify-between text-xs">
                                                            <span className="text-gray-300">
                                                                {it.name}{it.size ? ` · ${it.size}` : ''} ×{it.qty}
                                                                {it.print_number ? <span className="text-[#F7C600]"> · 🖨️ رقم {it.print_number}</span> : ''}
                                                            </span>
                                                            <span className="text-white shrink-0">{it.price * it.qty} TND</span>
                                                        </div>
                                                    ))}
                                                    <div className="flex justify-between border-t border-[#1a1a1a] pt-1.5 mt-1">
                                                        <span className="text-gray-500 text-xs">المجموع</span>
                                                        <span className="text-[#F7C600] font-black text-sm">{o.total} TND</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    {o.status === 'new' && (
                                                        <button onClick={() => updateOrderStatus(o.id, 'confirmed')} className="flex-1 py-2 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30 text-xs font-bold hover:bg-blue-500/25 transition">تأكيد</button>
                                                    )}
                                                    {o.status !== 'delivered' && o.status !== 'cancelled' && (
                                                        <button onClick={() => updateOrderStatus(o.id, 'delivered')} className="flex-1 py-2 rounded-xl bg-green-500/15 text-green-400 border border-green-500/30 text-xs font-bold hover:bg-green-500/25 transition">✓ تم التسليم</button>
                                                    )}
                                                    {(o.status === 'delivered' || o.status === 'cancelled') && (
                                                        <button onClick={() => updateOrderStatus(o.id, 'new')} className="flex-1 py-2 rounded-xl border border-[#2a2a2a] text-gray-400 text-xs font-bold hover:text-white transition">إرجاع لجديد</button>
                                                    )}
                                                    {o.status !== 'cancelled' && o.status !== 'delivered' && (
                                                        <button onClick={() => updateOrderStatus(o.id, 'cancelled')} className="px-3 py-2 rounded-xl border border-[#2a2a2a] text-gray-500 text-xs hover:text-red-400 transition">إلغاء</button>
                                                    )}
                                                    <button onClick={() => deleteOrder(o.id)} className="px-3 py-2 rounded-xl border border-[#2a2a2a] text-red-400 text-xs hover:border-red-400/40 transition">حذف</button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )
                })()}

            </div>
        </div>
    )
}
