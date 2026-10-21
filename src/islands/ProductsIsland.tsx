import { useEffect, useMemo, useState } from "preact/hooks";
import Papa from "papaparse";

interface Product {
  item_code?: string;
  name: string;
  category: string;
  brand: string;
  selling_price?: string;
  mrp?: string;
  image?: string;
  description?: string;
  show_online?: string;
  listing_type?: string;
}

const GROUPS = ["All products", "Seeds", "Fertilizers", "Crop protection", "Spray equipment"];
const PAGE_SIZE = 24;
const WA_NUMBER = "919166029301";
const BASE_URL = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

function groupFor(category: string) {
  const value = category.trim().toLowerCase();
  if (value === "seeds") return "Seeds";
  if (value === "fertilizers") return "Fertilizers";
  if (value === "spraymachine") return "Spray equipment";
  return "Crop protection";
}

function enquiryUrl(product?: Product, category?: string, need?: string, location?: string) {
  if (product) {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi, I would like to enquire about ${product.name}${product.brand ? ` (${product.brand})` : ""}. Please share current details and availability.`)}`;
  }
  const subject = category && category !== "All products" ? category.toLowerCase() : "agricultural products";
  const details = [need?.trim() && `I need: ${need.trim()}.`, location?.trim() && `My location: ${location.trim()}.`].filter(Boolean).join(" ");
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi, I would like to enquire about ${subject}. ${details} Please share current options and availability.`.replace(/\s+/g, " ").trim())}`;
}

function priceLabel(value?: string) {
  if (!value) return null;
  const amount = Number(value.replaceAll(",", ""));
  return Number.isFinite(amount) && amount > 0 ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(amount) : null;
}

export default function ProductsIsland() {
  const [products, setProducts] = useState<Product[]>([]);
  const [group, setGroup] = useState("All products");
  const [brand, setBrand] = useState("All brands");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [need, setNeed] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("category")?.toLowerCase();
    const match = GROUPS.find(item => item.toLowerCase() === value);
    if (match) setGroup(match);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    Papa.parse<Product>(`${BASE_URL}products.csv`, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: result => {
        if (cancelled) return;
        if (result.errors.length > 0) { setError(true); setLoading(false); return; }
        setProducts(result.data.filter(item => item.name?.trim() && item.name.trim().toLowerCase() !== "sample product" && (item.show_online?.trim().toLowerCase() === "yes" || ["directory", "catalogue"].includes(item.listing_type?.trim().toLowerCase() || ""))));
        setLoading(false);
      },
      error: () => { if (!cancelled) { setError(true); setLoading(false); } },
    });
    return () => { cancelled = true; };
  }, [retry]);

  const brands = useMemo(() => ["All brands", ...Array.from(new Set(products.map(item => item.brand?.trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b))], [products]);
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter(item => {
      if (group !== "All products" && groupFor(item.category || "") !== group) return false;
      if (brand !== "All brands" && item.brand !== brand) return false;
      return !query || `${item.name} ${item.brand} ${item.category} ${item.item_code || ""}`.toLowerCase().includes(query);
    });
  }, [products, group, brand, search]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const chooseGroup = (next: string) => {
    setGroup(next);
    setBrand("All brands");
    setPage(1);
    window.history.replaceState(null, "", next === "All products" ? `${BASE_URL}products#catalogue` : `${BASE_URL}products?category=${encodeURIComponent(next)}#catalogue`);
  };

  if (loading) return <div class="container-custom py-14" role="status"><p class="text-primary">Loading products…</p></div>;
  if (error) return (
    <div class="container-custom"><div class="rounded-[14px] border border-border bg-paper p-8 md:p-10" role="alert">
      <h3 class="text-xl text-primary">We couldn’t load the catalogue</h3>
      <p class="mt-3 text-text-muted">Please try again or contact our team for product details.</p>
      <div class="mt-6 flex flex-wrap gap-3"><button type="button" class="btn-accent" onClick={() => setRetry(value => value + 1)}>Try again</button><a href={enquiryUrl()} target="_blank" rel="noopener noreferrer" class="btn-outline">Ask on WhatsApp</a></div>
    </div></div>
  );

  if (products.length === 0) return (
    <div class="container-custom">
      <div class="rounded-[14px] border border-border bg-paper p-6 sm:p-8 md:p-10">
        <div class="max-w-2xl">
          <h3 class="text-2xl text-primary">{group === "All products" ? "Tell us what you need" : `Ask about ${group.toLowerCase()}`}</h3>
          <p class="mt-3 leading-relaxed text-text-muted">Our online listings are not available yet. Share your crop, product name, or preferred brand, and we’ll help you find current options.</p>
        </div>
        <div class="mt-7 flex flex-wrap gap-2" role="group" aria-label="Product category">
          {GROUPS.map(item => <button key={item} type="button" aria-pressed={group === item} class={`min-h-11 rounded-full px-4 text-sm font-semibold transition-colors ${group === item ? "bg-primary text-white" : "bg-[#fffdf8] border border-border text-primary hover:border-mustard"}`} onClick={() => chooseGroup(item)}>{item}</button>)}
        </div>
        <div class="mt-7 grid gap-4 md:grid-cols-2">
          <label class="block text-sm font-semibold text-primary">Crop, product, or brand
            <input type="text" value={need} onInput={event => setNeed((event.target as HTMLInputElement).value)} placeholder="e.g. wheat seed or preferred brand" class="field mt-2 font-normal" />
          </label>
          <label class="block text-sm font-semibold text-primary">Your location <span class="font-normal text-text-muted">(optional)</span>
            <input type="text" value={location} onInput={event => setLocation((event.target as HTMLInputElement).value)} placeholder="Village or town" class="field mt-2 font-normal" />
          </label>
        </div>
        <div class="mt-6 flex flex-wrap items-center gap-4">
          <a href={enquiryUrl(undefined, group, need, location)} target="_blank" rel="noopener noreferrer" class="btn-accent justify-center">Send enquiry on WhatsApp</a>
          <a href="tel:+919166029301" class="inline-flex min-h-11 items-center font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4">Or call +91 91660 29301</a>
        </div>
      </div>
    </div>
  );

  return <div class="container-custom">
    <div class="border-y border-border py-5">
      <div class="flex flex-wrap gap-2" role="group" aria-label="Product category">
        {GROUPS.map(item => <button key={item} type="button" aria-pressed={group === item} class={`min-h-11 rounded-full px-5 text-sm font-semibold transition-colors ${group === item ? "bg-primary text-white" : "bg-[#fffdf8] border border-border text-primary hover:border-mustard"}`} onClick={() => chooseGroup(item)}>{item}</button>)}
      </div>
      <div class="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(11rem,14rem)]">
        <label class="block"><span class="sr-only">Search products and brands</span><input type="search" value={search} onInput={event => { setSearch((event.target as HTMLInputElement).value); setPage(1); }} placeholder="Search products or brands" class="field" /></label>
        <label class="block"><span class="sr-only">Filter by brand</span><select value={brand} onChange={event => { setBrand((event.target as HTMLSelectElement).value); setPage(1); }} class="field">{brands.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
      </div>
    </div>
    <p class="py-6 text-sm text-text-muted" role="status">{filtered.length} {filtered.length === 1 ? "product" : "products"} found</p>
    {filtered.length === 0 ? <div class="rounded-[14px] border border-border bg-paper p-8 md:p-10"><h3 class="text-xl text-primary">No matching products</h3><p class="mt-2 text-text-muted">Try another search or ask our team for help.</p><div class="mt-5 flex flex-wrap gap-3"><button type="button" class="btn-accent" onClick={() => { setGroup("All products"); setBrand("All brands"); setSearch(""); setPage(1); }}>Clear filters</button><a href={enquiryUrl()} class="btn-outline" target="_blank" rel="noopener noreferrer">Ask our team</a></div></div> : <>
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((item, index) => <article key={`${item.item_code || item.name}-${index}`} class="card-paper group flex h-full flex-col overflow-hidden transition-all hover:-translate-y-0.5 hover:border-mustard hover:shadow-card">
          {item.image && <div class="flex h-56 shrink-0 items-center justify-center overflow-hidden bg-white p-4 sm:h-60"><img src={item.image.startsWith("/") ? `${BASE_URL}${item.image.slice(1)}` : item.image} alt={item.name} class="max-h-full max-w-full object-contain object-center" loading="lazy" /></div>}
          <div class="flex flex-1 flex-col p-6">
            <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-soil">{item.brand || groupFor(item.category)}</p>
            <h3 class="mt-2 text-lg leading-snug text-primary">{item.name}</h3>
            <p class="mt-3 text-xs text-text-muted">{item.category}</p>
            {item.listing_type !== "directory" && priceLabel(item.selling_price) ? <p class="mt-5 font-display text-2xl text-primary tabular-nums">{priceLabel(item.selling_price)}</p> : <p class="mt-5 text-sm font-semibold text-primary">Ask for price</p>}
            {item.listing_type !== "directory" && priceLabel(item.mrp) && priceLabel(item.mrp) !== priceLabel(item.selling_price) && <p class="mt-1 text-xs text-text-muted">MRP {priceLabel(item.mrp)}</p>}
            <a href={enquiryUrl(item)} target="_blank" rel="noopener noreferrer" aria-label={`Enquire about ${item.name} on WhatsApp`} class="btn-primary mt-6 justify-center">Enquire on WhatsApp</a>
          </div>
        </article>)}
      </div>
      {pageCount > 1 && <nav class="mt-9 flex items-center justify-center gap-4" aria-label="Product pages"><button type="button" disabled={page === 1} onClick={() => { setPage(value => value - 1); document.getElementById("catalogue")?.scrollIntoView(); }} class="btn-outline disabled:cursor-not-allowed disabled:opacity-40">Previous</button><span class="text-sm text-text-muted">Page {page} of {pageCount}</span><button type="button" disabled={page === pageCount} onClick={() => { setPage(value => value + 1); document.getElementById("catalogue")?.scrollIntoView(); }} class="btn-outline disabled:cursor-not-allowed disabled:opacity-40">Next</button></nav>}
    </>}
  </div>;
}
