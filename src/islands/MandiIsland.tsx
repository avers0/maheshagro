import { useState } from "preact/hooks";

interface MandiPrice {
  commodity: string;
  market: string;
  price: string;
  variety: string;
}

const SAMPLE_DATA: MandiPrice[] = [
  { commodity: "Wheat", market: "Jaipur Mandi", price: "₹2,250/qtl", variety: "Lok-1" },
  { commodity: "Mustard", market: "Jaipur Mandi", price: "₹5,100/qtl", variety: "RH-749" },
  { commodity: "Soybean", market: "Kota Mandi", price: "₹4,600/qtl", variety: "JS-335" },
  { commodity: "Cotton", market: "Sangaria Mandi", price: "₹6,800/qtl", variety: "H-1323 BG2" },
  { commodity: "Bajra", market: "Jaipur Mandi", price: "₹2,100/qtl", variety: "HHB-67" },
  { commodity: "Paddy", market: "Kota Mandi", price: "₹2,150/qtl", variety: "1121 Basmati" },
];

export default function MandiIsland() {
  const [search, setSearch] = useState("");
  const filtered = search
    ? SAMPLE_DATA.filter(p =>
        p.commodity.toLowerCase().includes(search.toLowerCase()) ||
        p.market.toLowerCase().includes(search.toLowerCase())
      )
    : SAMPLE_DATA;

  return (
    <div class="max-w-4xl mx-auto">
      <div class="card-paper p-6 md:p-10">
        <div class="flex flex-col sm:flex-row gap-4 mb-8">
          <div class="relative flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" aria-hidden="true"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
            <input
              type="text"
              placeholder="Search commodity or market..."
              aria-label="Search commodity or market"
              class="field !pl-12"
              value={search}
              onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
            />
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b-2 border-primary/20">
                <th class="text-left py-3 px-4 text-xs font-bold uppercase tracking-[0.12em] text-soil">Commodity</th>
                <th class="text-left py-3 px-4 text-xs font-bold uppercase tracking-[0.12em] text-soil">Variety</th>
                <th class="text-left py-3 px-4 text-xs font-bold uppercase tracking-[0.12em] text-soil">Market</th>
                <th class="text-right py-3 px-4 text-xs font-bold uppercase tracking-[0.12em] text-soil">Price</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={i} class="border-b border-dashed border-border hover:bg-paper transition-colors">
                  <td class="py-4 px-4 font-display text-lg text-primary">{item.commodity}</td>
                  <td class="py-4 px-4 text-text-muted text-sm">{item.variety}</td>
                  <td class="py-4 px-4 text-text-muted text-sm">{item.market}</td>
                  <td class="py-4 px-4 text-right font-semibold tabular-nums text-primary-light whitespace-nowrap">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p class="text-center text-text-muted py-8">No results found.</p>
          )}
        </div>
        <p class="text-xs text-text-muted mt-6">*Prices are indicative. Please contact us for current market rates.</p>
      </div>
    </div>
  );
}
