import { useState } from "preact/hooks";

const WA = "919166029301";

export default function CalculatorIsland() {
  const [cropType, setCropType] = useState("Wheat");
  const [area, setArea] = useState(1);
  const [unit, setUnit] = useState("Acres");
  const [result, setResult] = useState<{urea:number; dap:number; mop:number} | null>(null);

  const crops = ["Wheat", "Rice/Paddy", "Cotton", "Soybean", "Bajra", "Mustard"];

  const recommendations: Record<string, { urea: number; dap: number; mop: number }> = {
    "Wheat":    { urea: 130, dap: 65, mop: 40 },
    "Rice/Paddy":{ urea: 120, dap: 55, mop: 30 },
    "Cotton":   { urea: 100, dap: 75, mop: 50 },
    "Soybean":  { urea: 30,  dap: 80, mop: 40 },
    "Bajra":    { urea: 80,  dap: 50, mop: 30 },
    "Mustard":  { urea: 90,  dap: 60, mop: 30 },
  };

  const areaInAcres = unit === "Hectare" ? area * 2.47 : area;

  const calculate = () => {
    const base = recommendations[cropType] || recommendations["Wheat"];
    setResult({
      urea: Math.round(base.urea * areaInAcres),
      dap:  Math.round(base.dap  * areaInAcres),
      mop:  Math.round(base.mop  * areaInAcres),
    });
  };

  const enquireWA = () => {
    if (!result) return;
    const text = `Hi! Based on your calculator, for ${area} ${unit} of ${cropType}, I need: Urea ${result.urea}kg, DAP ${result.dap}kg, MOP ${result.mop}kg. Please help me order these.`;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div class="max-w-2xl mx-auto">
      <div class="card-paper p-6 md:p-10">
        <div class="space-y-6">
          <div>
            <label class="field-label">Crop Type</label>
            <select
              class="field"
              value={cropType}
              onChange={(e) => setCropType((e.target as HTMLSelectElement).value)}
            >
              {crops.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="field-label">Area</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                class="field"
                value={area}
                onInput={(e) => setArea(parseFloat((e.target as HTMLInputElement).value) || 1)}
              />
            </div>
            <div>
              <label class="field-label">Unit</label>
              <select
                class="field"
                value={unit}
                onChange={(e) => setUnit((e.target as HTMLSelectElement).value)}
              >
                <option value="Acres">Acres</option>
                <option value="Hectare">Hectare</option>
              </select>
            </div>
          </div>
          <button
            onClick={calculate}
            class="btn-primary w-full justify-center !py-4 !text-base"
          >
            Calculate Fertilizer Needs
          </button>
        </div>

        {result && (
          <div class="mt-10 p-6 md:p-8 bg-paper rounded-[12px] border border-border">
            <h3 class="text-xl text-primary mb-6">Recommended for {area} {unit} of {cropType}</h3>
            <div class="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Urea (46% N)", value: result.urea, color: "bg-[#fffdf8] border border-border text-primary" },
                { label: "DAP (18-46)", value: result.dap, color: "bg-accent/20 border border-accent/40 text-primary" },
                { label: "MOP (60% K)", value: result.mop, color: "bg-mustard/20 border border-mustard/40 text-ink" },
              ].map(item => (
                <div key={item.label} class={`${item.color} p-4 rounded-[12px] text-center`}>
                  <p class="font-display text-3xl tabular-nums">{item.value}</p>
                  <p class="text-xs font-bold mt-1">kg</p>
                  <p class="text-xs font-medium mt-2">{item.label}</p>
                </div>
              ))}
            </div>
            <button
              onClick={enquireWA}
              class="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white min-h-12 py-3 rounded-full font-bold text-base hover:shadow-lg transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/></svg>
              Order via WhatsApp
            </button>
          </div>
        )}
      </div>
      <p class="text-center text-text-muted text-xs mt-4">*Recommendations are general guidelines. Actual requirements may vary based on soil test results.</p>
    </div>
  );
}
