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
      <div class="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-8 md:p-12">
        <div class="space-y-6">
          <div>
            <label class="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Crop Type</label>
            <select
              class="w-full px-6 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
              value={cropType}
              onChange={(e) => setCropType((e.target as HTMLSelectElement).value)}
            >
              {crops.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Area</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                class="w-full px-6 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                value={area}
                onInput={(e) => setArea(parseFloat((e.target as HTMLInputElement).value) || 1)}
              />
            </div>
            <div>
              <label class="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Unit</label>
              <select
                class="w-full px-6 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
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
            class="w-full py-4 bg-primary text-white rounded-2xl font-black text-lg hover:shadow-xl hover:shadow-primary/20 active:scale-95 transition-all"
          >
            Calculate Fertilizer Needs
          </button>
        </div>

        {result && (
          <div class="mt-10 p-8 bg-[#f8f5ef] rounded-2xl border border-gray-200">
            <h3 class="font-black text-primary text-lg mb-6 uppercase tracking-widest">Recommended for {area} {unit} of {cropType}</h3>
            <div class="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Urea (46% N)", value: result.urea, color: "bg-blue-100 text-blue-700" },
                { label: "DAP (18-46)", value: result.dap, color: "bg-green-100 text-green-700" },
                { label: "MOP (60% K)", value: result.mop, color: "bg-orange-100 text-orange-700" },
              ].map(item => (
                <div key={item.label} class={`${item.color} p-4 rounded-2xl text-center`}>
                  <p class="text-3xl font-black">{item.value}</p>
                  <p class="text-xs font-bold mt-1">kg</p>
                  <p class="text-xs font-medium mt-2">{item.label}</p>
                </div>
              ))}
            </div>
            <button
              onClick={enquireWA}
              class="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg active:scale-95 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/></svg>
              Order via WhatsApp
            </button>
          </div>
        )}
      </div>
      <p class="text-center text-gray-400 text-xs mt-4">*Recommendations are general guidelines. Actual requirements may vary based on soil test results.</p>
    </div>
  );
}
