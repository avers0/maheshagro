import { useState, useEffect } from "preact/hooks";

export default function WeatherIsland() {
  const [city, setCity] = useState("Jaipur");
  const [weather, setWeather] = useState<{temp:number;desc:string;humidity:number;wind:number;icon:string} | null>(null);
  const [loading, setLoading] = useState(false);

  const cities = ["Jaipur", "Kota", "Jodhpur", "Bikaner", "Ajmer", "Sangaria"];

  // Simulated weather (replace with real API key if needed)
  const fetchWeather = (c: string) => {
    setLoading(true);
    setTimeout(() => {
      const temps: Record<string, number> = { Jaipur: 35, Kota: 37, Jodhpur: 40, Bikaner: 42, Ajmer: 36, Sangaria: 38 };
      setWeather({
        temp: temps[c] || 35,
        desc: "Partly Cloudy",
        humidity: 45 + Math.floor(Math.random() * 20),
        wind: 12 + Math.floor(Math.random() * 15),
        icon: "🌤️",
      });
      setLoading(false);
    }, 800);
  };

  useEffect(() => { fetchWeather(city); }, [city]);

  return (
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-8 md:p-12">
        <div class="mb-8">
          <label class="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Select Location</label>
          <div class="flex flex-wrap gap-3">
            {cities.map(c => (
              <button
                key={c}
                class={`px-5 py-2.5 rounded-full font-bold text-sm transition-all ${city === c ? "bg-primary text-white shadow-lg" : "bg-gray-100 text-gray-500 hover:bg-accent hover:text-primary"}`}
                onClick={() => setCity(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <div class="py-16 flex justify-center">
            <div class="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : weather ? (
          <div>
            <div class="text-center mb-10">
              <div class="text-8xl mb-4">{weather.icon}</div>
              <h2 class="text-7xl font-black text-primary">{weather.temp}°C</h2>
              <p class="text-2xl text-gray-500 mt-2">{weather.desc}</p>
              <p class="text-lg font-bold text-primary mt-1">{city}, Rajasthan</p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-[#f8f5ef] p-6 rounded-2xl border border-gray-100 text-center">
                <p class="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Humidity</p>
                <p class="text-3xl font-black text-primary">{weather.humidity}%</p>
              </div>
              <div class="bg-[#f8f5ef] p-6 rounded-2xl border border-gray-100 text-center">
                <p class="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Wind Speed</p>
                <p class="text-3xl font-black text-primary">{weather.wind} km/h</p>
              </div>
            </div>
            <div class="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/10">
              <p class="text-sm font-medium text-primary">
                🌾 <strong>Farming Tip:</strong> {weather.humidity > 60
                  ? "High humidity today — watch out for fungal diseases. Consider preventive fungicide application."
                  : weather.temp > 38
                  ? "High temperature alert — ensure adequate irrigation and avoid spraying pesticides in peak heat."
                  : "Good conditions for field activities. Ideal for sowing and spraying."}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
