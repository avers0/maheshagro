import { useState, useEffect } from "preact/hooks";
import Papa from "papaparse";

interface Product {
  name: string;
  description: string;
  image: string;
  category: string;
  brand: string;
}

const CATEGORIES = ["All Products", "Seeds", "Fertilizers", "Pesticides", "Tools"];

const WA_NUMBER = "919166029301";

function buildWAMessage(product: Product) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi, I am interested in: ${product.name} (${product.brand}). Please provide more details.`)}`;
}

export default function ProductsIsland() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [category, setCategory] = useState("All Products");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load CSV on mount
  useEffect(() => {
    Papa.parse("/products.csv", {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data as Product[];
        setProducts(data);
        setFiltered(data);
        setLoading(false);
      },
      error: (err) => {
        setError("Failed to load products. " + err.message);
        setLoading(false);
      },
    });
  }, []);

  // Filter whenever category or search changes
  useEffect(() => {
    let result = products;
    if (category !== "All Products") {
      result = result.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [category, search, products]);

  if (loading) {
    return (
      <div class="py-32 flex flex-col items-center gap-4 text-primary">
        <div class="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        <p class="font-medium text-sm uppercase tracking-widest">Loading Products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div class="py-32 text-center">
        <p class="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Sticky filter bar */}
      <div class="py-6 border-b border-border bg-white sticky top-[68px] z-30 shadow-sm">
        <div class="container mx-auto px-6">
          <div class="flex flex-col lg:flex-row gap-6 justify-between items-center">
            {/* Category tabs */}
            <div class="flex overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto gap-2 scrollbar-hide">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  class={`px-6 py-2.5 rounded-full font-bold whitespace-nowrap transition-all ${
                    category === cat
                      ? "bg-primary text-white shadow-lg"
                      : "bg-gray-100 text-gray-500 hover:bg-accent hover:text-primary"
                  }`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Search */}
            <div class="relative w-full lg:w-96">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
              <input
                type="text"
                placeholder="Search products or brands..."
                class="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50"
                value={search}
                onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div class="container mx-auto px-6 pt-8 pb-4">
        <p class="text-sm text-gray-500">
          Showing <span class="font-bold text-primary">{filtered.length}</span> product{filtered.length !== 1 ? "s" : ""}
          {category !== "All Products" && <> in <span class="font-bold text-primary">{category}</span></>}
          {search && <> matching <span class="font-bold text-primary">"{search}"</span></>}
        </p>
      </div>

      {/* Product grid */}
      <div class="container mx-auto px-6 pb-16">
        {filtered.length === 0 ? (
          <div class="py-24 text-center">
            <p class="text-gray-500 text-lg font-medium">No products found.</p>
            <button class="mt-4 text-primary font-bold underline" onClick={() => { setCategory("All Products"); setSearch(""); }}>Clear filters</button>
          </div>
        ) : (
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map((product, i) => (
              <div key={i} class="bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all group flex flex-col h-full">
                <div class="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={product.image || `https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=400`}
                    alt={product.name}
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=400`; }}
                  />
                  {product.category && (
                    <div class="absolute top-4 left-4">
                      <span class="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-sm">
                        {product.category}
                      </span>
                    </div>
                  )}
                </div>
                <div class="p-6 flex flex-col flex-grow">
                  <div class="mb-4">
                    {product.brand && <p class="text-xs font-bold text-primary uppercase tracking-wider mb-1">{product.brand}</p>}
                    <h3 class="text-xl font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                  </div>
                  {product.description && (
                    <p class="text-gray-500 text-sm line-clamp-2 mb-6 flex-grow">{product.description}</p>
                  )}
                  <a
                    href={buildWAMessage(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-green-500/20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/></svg>
                    <span>WhatsApp Enquire</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
