"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

// ⚠️ Club's WhatsApp order number — international format, digits only, no "+".
const ORDER_PHONE = "21627113285";

const categories = [
  { id: "all",          label: "الكل",         icon: "⚡" },
  { id: "shirts",       label: "القمصان",       icon: "👕" },
  { id: "training",     label: "التدريب",       icon: "🏃" },
  { id: "accessories",  label: "الإكسسوارات",  icon: "🧢" },
  { id: "collectibles", label: "التذكارات",     icon: "🏆" },
];

type Product = {
  id: string;
  category: string;
  name_ar: string;
  name: string | null;
  price: number;
  badge: string | null;
  sizes: string[] | null;
  description: string | null;
  image: string | null;
  images: string[] | null;
  in_stock: boolean;
};

const badgeStyle: Record<string, string> = {
  "جديد":  "bg-green-500/20 text-green-400 border-green-500/30",
  "حصري":  "bg-[#F7C600]/20 text-[#F7C600] border-[#F7C600]/30",
  "محدود": "bg-red-500/20 text-red-400 border-red-500/30",
};

const CARD_BG = "radial-gradient(ellipse at 50% 60%, #F7C60015 0%, #080808 70%)";

// Placeholder t-shirt shown when a product has no photo yet.
function Placeholder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="#F7C600">
      <path d="M30 10 L10 25 L20 35 L25 30 L25 80 L75 80 L75 30 L80 35 L90 25 L70 10 L60 20 Q50 25 40 20 Z" />
    </svg>
  );
}

type CartItem = { product: Product; size: string | null; qty: number };

export default function StorePage() {
  const [products, setProducts]               = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [activeCategory, setActiveCategory]   = useState("all");
  const [wishlist, setWishlist]               = useState<string[]>([]);
  const [cart, setCart]                       = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen]               = useState(false);
  const [selected, setSelected]               = useState<Product | null>(null);
  const [selectedSize, setSelectedSize]       = useState<string | null>(null);
  const [galleryIdx, setGalleryIdx]           = useState(0);
  const touchX = useRef(0);
  const [addedId, setAddedId]                 = useState<string | null>(null);

  // Checkout
  const [showCheckout, setShowCheckout]       = useState(false);
  const [custName, setCustName]               = useState("");
  const [custPhone, setCustPhone]             = useState("");
  const [custCity, setCustCity]               = useState("");
  const [placing, setPlacing]                 = useState(false);
  const [confirmRef, setConfirmRef]           = useState<string | null>(null);

  // Direct "order now" (skip cart) + optional shirt number printing
  const [buyNow, setBuyNow] = useState<
    { product: Product; size: string | null; qty: number; printNumber: boolean; number: string } | null
  >(null);
  const [printNumber, setPrintNumber] = useState(false);
  const [shirtNumber, setShirtNumber] = useState("");

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("in_stock", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      setProducts((data as Product[]) || []);
      setLoadingProducts(false);
    }
    load();
  }, []);

  const filtered = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.product.price * i.qty, 0);

  // What the checkout is ordering: a single "buy now" item, or the cart.
  const checkoutItems: { product: Product; size: string | null; qty: number; printNumber?: boolean; number?: string }[] =
    buyNow ? [buyNow] : cart;
  const checkoutCount = checkoutItems.reduce((s, i) => s + i.qty, 0);
  const checkoutTotal = checkoutItems.reduce((s, i) => s + i.product.price * i.qty, 0);

  function toggleWishlist(id: string) {
    setWishlist((w) => w.includes(id) ? w.filter((x) => x !== id) : [...w, id]);
  }

  function openProduct(p: Product) {
    setSelected(p);
    setSelectedSize(null);
    setGalleryIdx(0);
    setPrintNumber(false);
    setShirtNumber("");
  }

  // Direct order: skip the cart, go straight to checkout for this one product.
  function orderNow(product: Product) {
    setBuyNow({
      product,
      size: selectedSize,
      qty: 1,
      printNumber,
      number: shirtNumber.trim(),
    });
    setSelected(null);
    setShowCheckout(true);
  }

  function closeCheckout() {
    if (placing) return;
    setShowCheckout(false);
    setBuyNow(null);
  }

  function addToCart(product: Product, size: string | null) {
    setCart((c) => {
      const existing = c.find((i) => i.product.id === product.id && i.size === size);
      if (existing) return c.map((i) => i.product.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { product, size, qty: 1 }];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
    setSelected(null);
    setSelectedSize(null);
  }

  function removeFromCart(productId: string, size: string | null) {
    setCart((c) => c.filter((i) => !(i.product.id === productId && i.size === size)));
  }

  async function placeOrder() {
    if (!custName.trim() || !custPhone.trim()) {
      alert("الرجاء إدخال الاسم ورقم الهاتف");
      return;
    }
    if (checkoutItems.length === 0) return;

    setPlacing(true);
    const ref = "USBG-" + Math.random().toString(36).slice(2, 7).toUpperCase();
    const items = checkoutItems.map((i) => {
      const printed = !!(i.printNumber && i.number);
      return {
        id: i.product.id,
        name: i.product.name_ar,
        size: i.size,
        qty: i.qty,
        price: i.product.price,
        ...(printed ? { print_number: i.number } : {}),
      };
    });

    try {
      const { error } = await supabase.from("orders").insert([
        {
          ref,
          customer_name: custName.trim(),
          customer_phone: custPhone.trim(),
          customer_city: custCity.trim() || null,
          items,
          total: checkoutTotal,
          status: "new",
        },
      ]);
      if (error) throw error;

      const lines = checkoutItems.map((i) => {
        const printed = !!(i.printNumber && i.number);
        return `• ${i.product.name_ar}${i.size ? ` (مقاس ${i.size})` : ""} ×${i.qty}${printed ? ` — طباعة رقم ${i.number}` : ""} — ${i.product.price * i.qty} TND`;
      });
      const msg =
        `🛒 طلب جديد من متجر USBG\n` +
        `رقم الطلب: ${ref}\n\n` +
        `${lines.join("\n")}\n\n` +
        `المجموع: ${checkoutTotal} TND\n` +
        `الدفع: عند الاستلام\n\n` +
        `الاسم: ${custName.trim()}\n` +
        `الهاتف: ${custPhone.trim()}` +
        (custCity.trim() ? `\nالمدينة: ${custCity.trim()}` : "");
      window.open(`https://wa.me/${ORDER_PHONE}?text=${encodeURIComponent(msg)}`, "_blank");

      setConfirmRef(ref);
      setCart([]);
      setBuyNow(null);
      setShowCheckout(false);
      setCartOpen(false);
      setCustName("");
      setCustPhone("");
      setCustCity("");
    } catch {
      alert("تعذّر إرسال الطلب. حاول مرة أخرى.");
    } finally {
      setPlacing(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pb-32">
      <style>{`@keyframes storeFade{from{opacity:0}to{opacity:1}}.store-fade{animation:storeFade .28s ease}`}</style>

      {/* ══ Hero ══ */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F7C600]/10 via-black to-black pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#F7C600 0,#F7C600 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#F7C600 0,#F7C600 1px,transparent 1px,transparent 40px)",
          }}
        />
        <div className="relative z-10 px-4 pt-14 pb-12 max-w-4xl mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7C600]/10 border border-[#F7C600]/20 text-[#F7C600] text-[10px] font-black">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F7C600] animate-pulse" />
                  متوفر الآن
                </span>
                <span className="text-gray-600 text-[10px] uppercase tracking-widest">المتجر الرسمي</span>
              </div>
              <h1 className="text-white font-black text-5xl sm:text-6xl leading-none mb-3">
                USBG <span className="text-[#F7C600]">Store</span>
              </h1>
              <p className="text-gray-500 text-sm max-w-xs leading-6">
                المنتجات الرسمية للاتحاد الرياضي ببنقردان · الموسم 2025/2026
              </p>
            </div>
            <span className="text-[#F7C600]/5 font-black hidden sm:block select-none" style={{ fontSize: "9rem", lineHeight: 1 }}>90</span>
          </div>

          <div className="flex gap-8 mt-8 pt-8 border-t border-[#1a1a1a]">
            {[
              { value: products.length, label: "منتج" },
              { value: "TND",           label: "العملة" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-[#F7C600] font-black text-xl">{s.value}</p>
                <p className="text-gray-600 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}

            {/* Cart button */}
            <button
              onClick={() => setCartOpen(true)}
              className="mr-auto flex items-center gap-2 px-4 py-2 rounded-2xl border border-[#2a2a2a] hover:border-[#F7C600]/30 transition-all relative"
            >
              <span className="text-sm">🛒</span>
              <span className="text-white font-bold text-sm">السلة</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-[#F7C600] text-black text-[10px] font-black flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ══ Sticky Category Tabs ══ */}
      <div className="sticky top-0 z-20 bg-black/90 backdrop-blur-md border-b border-[#1a1a1a] px-4 py-3">
        <div className="max-w-4xl mx-auto flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-[#F7C600] text-black border-[#F7C600] shadow-[0_0_20px_rgba(247,198,0,0.25)]"
                  : "border-[#2a2a2a] text-gray-500 hover:border-[#F7C600]/30 hover:text-white"
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ══ Product Grid ══ */}
      <div className="px-4 max-w-4xl mx-auto mt-8">
        {loadingProducts ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-10 h-10 rounded-full border-2 border-[#F7C600]/30 border-t-[#F7C600] animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 text-gray-600 text-sm">لا توجد منتجات متاحة حالياً</div>
        ) : (
          <>
            <p className="text-gray-600 text-xs mb-5">{filtered.length} منتج</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="group rounded-3xl border border-[#1a1a1a] bg-[#080808] overflow-hidden hover:border-[#F7C600]/20 transition-all duration-300"
                >
                  {/* Visual */}
                  <div
                    className="relative aspect-square flex items-center justify-center overflow-hidden cursor-pointer"
                    style={{ background: CARD_BG }}
                    onClick={() => openProduct(product)}
                  >
                    {product.image ? (
                      <img src={product.image} alt={product.name_ar} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <Placeholder className="w-24 h-24 opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500" />
                    )}

                    {product.badge && (
                      <span className={`absolute top-3 right-3 text-[10px] font-black px-2 py-0.5 rounded-full border ${badgeStyle[product.badge] ?? "bg-[#F7C600]/20 text-[#F7C600] border-[#F7C600]/30"}`}>
                        {product.badge}
                      </span>
                    )}

                    {/* Wishlist */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                      className="absolute top-3 left-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                    >
                      <span className="text-sm">{wishlist.includes(product.id) ? "❤️" : "🤍"}</span>
                    </button>

                    {addedId === product.id && (
                      <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                        <span className="text-green-400 text-xs font-black bg-black/50 px-3 py-1 rounded-full">✓ أضيف للسلة</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 border-t border-[#1a1a1a]">
                    <p className="text-white font-black text-sm leading-tight truncate">{product.name_ar}</p>
                    {product.name && <p className="text-gray-600 text-[10px] mt-0.5 tracking-wide truncate">{product.name}</p>}
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-[#F7C600] font-black text-base">
                        {product.price} <span className="text-gray-600 text-[10px] font-normal">TND</span>
                      </p>
                      <button
                        onClick={() => openProduct(product)}
                        className="px-3 py-1.5 rounded-xl bg-[#F7C600]/10 text-[#F7C600] text-[10px] font-black border border-[#F7C600]/20 hover:bg-[#F7C600] hover:text-black transition-all"
                      >
                        أضف للسلة
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ══ How to order ══ */}
      <div className="px-4 max-w-4xl mx-auto mt-16">
        <div className="relative rounded-3xl border border-[#F7C600]/15 bg-[#0a0a0a] overflow-hidden p-8 sm:p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-[#F7C600]/5 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F7C600]/10 border border-[#F7C600]/20 text-[#F7C600] text-xs font-black mb-6">
              🛒 كيف تطلب
            </span>
            <h2 className="text-white font-black text-2xl sm:text-4xl mb-3">اطلب الآن، وادفع عند الاستلام</h2>
            <p className="text-gray-500 text-sm leading-7 max-w-md mx-auto mb-8">
              أضف منتجاتك إلى السلة، أكمل الطلب بإدخال اسمك ورقمك، وستتواصل معك إدارة النادي لتأكيد الطلب وترتيب التوصيل. الدفع يكون نقداً عند استلام طلبك.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-4 pt-8 border-t border-[#1a1a1a]">
              {[
                { icon: "🚚", label: "توصيل سريع",   sub: "لجميع أنحاء تونس" },
                { icon: "✅", label: "منتجات رسمية", sub: "بختم النادي الرسمي" },
                { icon: "💵", label: "دفع آمن",      sub: "عند الاستلام" },
              ].map((f) => (
                <div key={f.label} className="text-center">
                  <span className="text-2xl block mb-2">{f.icon}</span>
                  <p className="text-white font-black text-xs">{f.label}</p>
                  <p className="text-gray-600 text-[10px] mt-0.5 leading-tight">{f.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ Product Detail Modal ══ */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm px-4 pb-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Product gallery */}
            {(() => {
              const imgs = selected.images && selected.images.length
                ? selected.images
                : selected.image ? [selected.image] : [];
              const n = imgs.length;
              const idx = n ? ((galleryIdx % n) + n) % n : 0;
              const go = (d: number) => { if (n) setGalleryIdx((idx + d + n) % n); };
              return (
                <>
                  <div
                    className="relative h-64 shrink-0 flex items-center justify-center overflow-hidden select-none"
                    style={{ background: CARD_BG }}
                    onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
                    onTouchEnd={(e) => {
                      const dx = e.changedTouches[0].clientX - touchX.current;
                      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
                    }}
                  >
                    {n ? (
                      <img key={idx} src={imgs[idx]} alt={selected.name_ar} className="store-fade w-full h-full object-cover" />
                    ) : (
                      <Placeholder className="w-32 h-32 opacity-30" />
                    )}

                    {selected.badge && (
                      <span className={`absolute top-4 right-4 text-[10px] font-black px-2 py-0.5 rounded-full border ${badgeStyle[selected.badge] ?? "bg-[#F7C600]/20 text-[#F7C600] border-[#F7C600]/30"}`}>
                        {selected.badge}
                      </span>
                    )}
                    <button
                      onClick={() => setSelected(null)}
                      className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-gray-300 hover:text-white text-xs"
                    >
                      ✕
                    </button>

                    {n > 1 && (
                      <>
                        <button
                          onClick={() => go(-1)}
                          aria-label="السابق"
                          className="absolute top-1/2 right-3 -translate-y-1/2 w-9 h-9 rounded-full bg-black/45 backdrop-blur flex items-center justify-center text-white text-lg leading-none hover:bg-black/70 transition-colors"
                        >
                          ‹
                        </button>
                        <button
                          onClick={() => go(1)}
                          aria-label="التالي"
                          className="absolute top-1/2 left-3 -translate-y-1/2 w-9 h-9 rounded-full bg-black/45 backdrop-blur flex items-center justify-center text-white text-lg leading-none hover:bg-black/70 transition-colors"
                        >
                          ›
                        </button>
                        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur text-white text-[11px] font-bold tabular-nums">
                          {idx + 1} / {n}
                        </span>
                      </>
                    )}
                  </div>

                  {n > 1 && (
                    <div className="flex gap-2 px-6 pt-4 overflow-x-auto scrollbar-hide shrink-0">
                      {imgs.map((url, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setGalleryIdx(i)}
                          className={`w-14 h-14 rounded-lg overflow-hidden border shrink-0 transition-all ${idx === i ? "border-[#F7C600] ring-1 ring-[#F7C600]/40" : "border-[#2a2a2a] opacity-60 hover:opacity-100"}`}
                        >
                          <img src={url} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              );
            })()}

            <div className="p-6 overflow-y-auto flex-1 min-h-0">
              {selected.name && <p className="text-gray-500 text-xs mb-1">{selected.name}</p>}
              <h3 className="text-white font-black text-xl mb-1">{selected.name_ar}</h3>
              <p className="text-[#F7C600] font-black text-2xl mb-4">
                {selected.price} <span className="text-gray-600 text-sm font-normal">TND</span>
              </p>

              {selected.description && <p className="text-gray-400 text-sm leading-7 mb-5">{selected.description}</p>}

              {/* Size selector */}
              {selected.sizes && selected.sizes.length > 0 && (
                <div className="mb-5">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">المقاس</p>
                  <div className="flex gap-2 flex-wrap">
                    {selected.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 rounded-xl border text-xs font-black transition-all ${
                          selectedSize === size
                            ? "bg-[#F7C600] text-black border-[#F7C600]"
                            : "border-[#2a2a2a] text-gray-400 hover:border-[#F7C600]/40"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {!selectedSize && <p className="text-gray-700 text-[10px] mt-2">اختر مقاساً للمتابعة</p>}
                </div>
              )}

              {/* Shirt number printing */}
              {selected.category === "shirts" && (
                <div className="mb-5">
                  <button
                    type="button"
                    onClick={() => setPrintNumber((v) => !v)}
                    className={`flex items-center justify-between w-full rounded-2xl border px-4 py-3 transition-colors ${printNumber ? "border-[#F7C600]/40 bg-[#F7C600]/[0.06]" : "border-[#2a2a2a] hover:border-[#F7C600]/30"}`}
                  >
                    <span className="text-sm font-bold text-white">طباعة رقم على القميص؟</span>
                    <span className={`w-10 h-6 rounded-full flex items-center p-0.5 transition-all ${printNumber ? "bg-[#F7C600] justify-end" : "bg-[#2a2a2a] justify-start"}`}>
                      <span className="w-5 h-5 rounded-full bg-black" />
                    </span>
                  </button>
                  {printNumber && (
                    <div className="mt-3">
                      <label className="text-gray-500 text-[11px] block mb-1">الرقم المطلوب *</label>
                      <input
                        value={shirtNumber}
                        onChange={(e) => setShirtNumber(e.target.value.replace(/[^0-9]/g, "").slice(0, 2))}
                        inputMode="numeric"
                        placeholder="مثال: 10"
                        className="w-full bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm text-white text-center outline-none focus:border-[#F7C600]/40"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => toggleWishlist(selected.id)}
                  className="w-12 h-12 rounded-2xl border border-[#2a2a2a] flex items-center justify-center hover:border-red-500/30 transition-all shrink-0"
                >
                  {wishlist.includes(selected.id) ? "❤️" : "🤍"}
                </button>
                <button
                  onClick={() => orderNow(selected)}
                  disabled={(!!(selected.sizes && selected.sizes.length > 0) && !selectedSize) || (printNumber && !shirtNumber.trim())}
                  className="flex-1 py-3 rounded-2xl bg-[#F7C600] text-black font-black text-sm hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  اطلب الآن ←
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ Cart Sidebar ══ */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-start bg-black/70 backdrop-blur-sm"
          onClick={() => setCartOpen(false)}
        >
          <div
            className="bg-[#0a0a0a] border-l border-[#1a1a1a] w-full max-w-sm h-full flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-[#1a1a1a]">
              <div>
                <h3 className="text-white font-black text-lg">السلة</h3>
                <p className="text-gray-600 text-xs mt-0.5">{totalItems} منتج</p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="w-8 h-8 rounded-full border border-[#2a2a2a] flex items-center justify-center text-gray-500 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
                  <span className="text-4xl mb-4 opacity-20">🛒</span>
                  <p className="text-gray-600 text-sm">السلة فارغة</p>
                </div>
              ) : (
                cart.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#111] rounded-2xl p-3 border border-[#1a1a1a]">
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center shrink-0" style={{ background: CARD_BG }}>
                      {item.product.image ? (
                        <img src={item.product.image} alt={item.product.name_ar} className="w-full h-full object-cover" />
                      ) : (
                        <Placeholder className="w-8 h-8 opacity-40" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-xs truncate">{item.product.name_ar}</p>
                      {item.size && <p className="text-gray-600 text-[10px]">مقاس: {item.size}</p>}
                      <p className="text-[#F7C600] font-black text-sm mt-0.5">{item.product.price * item.qty} TND</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-white font-black text-xs">×{item.qty}</span>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.size)}
                        className="text-gray-700 hover:text-red-400 transition-colors text-[10px]"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 border-t border-[#1a1a1a]">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-500 text-sm">المجموع</span>
                  <span className="text-[#F7C600] font-black text-lg">{totalPrice} TND</span>
                </div>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full py-4 rounded-2xl bg-[#F7C600] text-black font-black text-sm hover:bg-white transition-colors"
                >
                  إتمام الطلب ←
                </button>
                <button
                  onClick={() => setCart([])}
                  className="w-full py-2 mt-2 text-gray-600 text-xs hover:text-red-400 transition-colors"
                >
                  تفريغ السلة
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══ Checkout Modal ══ */}
      {showCheckout && (
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm px-4 pb-4"
          onClick={closeCheckout}
        >
          <div
            className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-[#1a1a1a]">
              <div>
                <h3 className="text-white font-black text-lg">إتمام الطلب</h3>
                <p className="text-gray-600 text-xs mt-0.5">{checkoutCount} منتج · {checkoutTotal} TND</p>
              </div>
              <button
                onClick={closeCheckout}
                className="w-8 h-8 rounded-full border border-[#2a2a2a] flex items-center justify-center text-gray-500 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex flex-col gap-4">
              <div className="rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] p-4 flex flex-col gap-2">
                {checkoutItems.map((item, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400 truncate pl-2">
                        {item.product.name_ar}{item.size ? ` · ${item.size}` : ""} ×{item.qty}
                      </span>
                      <span className="text-white font-bold shrink-0">{item.product.price * item.qty} TND</span>
                    </div>
                    {item.printNumber && item.number && (
                      <p className="text-[#F7C600]/80 text-[11px] mt-0.5">🖨️ طباعة رقم {item.number}</p>
                    )}
                  </div>
                ))}
                <div className="flex justify-between border-t border-[#1a1a1a] pt-2 mt-1">
                  <span className="text-gray-500 text-xs">المجموع</span>
                  <span className="text-[#F7C600] font-black">{checkoutTotal} TND</span>
                </div>
              </div>

              <div>
                <label className="text-gray-500 text-xs block mb-1">الاسم الكامل *</label>
                <input value={custName} onChange={(e) => setCustName(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-2xl px-4 py-3 text-sm text-white text-right outline-none focus:border-[#F7C600]/40" placeholder="اسمك الكامل" />
              </div>
              <div>
                <label className="text-gray-500 text-xs block mb-1">رقم الهاتف *</label>
                <input value={custPhone} onChange={(e) => setCustPhone(e.target.value)} type="tel" dir="ltr" className="w-full bg-[#111] border border-[#2a2a2a] rounded-2xl px-4 py-3 text-sm text-white text-right outline-none focus:border-[#F7C600]/40" placeholder="+216 ..." />
              </div>
              <div>
                <label className="text-gray-500 text-xs block mb-1">المدينة / العنوان</label>
                <input value={custCity} onChange={(e) => setCustCity(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-2xl px-4 py-3 text-sm text-white text-right outline-none focus:border-[#F7C600]/40" placeholder="بنقردان، مدنين..." />
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-[#F7C600]/20 bg-[#F7C600]/5 p-4">
                <span className="text-xl">💵</span>
                <div>
                  <p className="text-white font-bold text-sm">الدفع عند الاستلام</p>
                  <p className="text-gray-500 text-[11px] mt-0.5 leading-5">ستتواصل معك إدارة النادي لتأكيد الطلب وترتيب التوصيل.</p>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-[#1a1a1a]">
              <button
                onClick={placeOrder}
                disabled={placing}
                className="w-full py-4 rounded-2xl bg-[#F7C600] text-black font-black text-sm hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {placing ? "جارٍ الإرسال..." : "تأكيد الطلب عبر واتساب"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ Order Confirmation ══ */}
      {confirmRef && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 backdrop-blur-sm px-4"
          onClick={() => setConfirmRef(null)}
        >
          <div
            className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-3xl w-full max-w-sm p-8 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center text-3xl">✅</div>
            <h3 className="text-white font-black text-xl mb-2">تم استلام طلبك</h3>
            <p className="text-gray-400 text-sm mb-3">شكراً لك! رقم طلبك هو:</p>
            <p className="text-[#F7C600] font-black text-lg tracking-wider mb-5">{confirmRef}</p>
            <p className="text-gray-500 text-xs leading-6 mb-6">
              ستتواصل معك إدارة النادي عبر الهاتف لتأكيد الطلب وترتيب التوصيل، والدفع عند الاستلام.
            </p>
            <button
              onClick={() => setConfirmRef(null)}
              className="w-full py-3 rounded-2xl bg-[#F7C600] text-black font-black text-sm hover:bg-white transition-colors"
            >
              تم
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
