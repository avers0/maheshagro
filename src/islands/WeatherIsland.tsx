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
      <div class="card-paper p-6 md:p-10">
        <div class="mb-8">
          <p class="field-label" id="weather-city-label">Select Location</p>
          <div class="flex flex-wrap gap-3" role="group" aria-labelledby="weather-city-label">
            {cities.map(c => (
              <button
                key={c}
                class={`min-h-11 px-5 py-2 rounded-full font-semibold text-sm transition-all ${city === c ? "bg-primary text-white" : "bg-paper border border-border text-primary hover:border-mustard"}`}
                onClick={() => setCity(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <div class="py-16 flex justify-center">
            <div class="w-10 h-10 border-4 border-mustard border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : weather ? (
          <div>
            <div class="text-center mb-10">
              <div class="text-8xl mb-4">{weather.icon}</div>
              <h2 class="font-display text-7xl text-primary">{weather.temp}°C</h2>
              <p class="text-2xl text-text-muted mt-2">{weather.desc}</p>
              <p class="text-lg font-bold text-primary mt-1">{city}, Rajasthan</p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-paper p-5 rounded-[12px] border border-border text-center">
                <p class="field-label !mb-1">Humidity</p>
                <p class="font-display text-3xl text-primary">{weather.humidity}%</p>
              </div>
              <div class="bg-paper p-5 rounded-[12px] border border-border text-center">
                <p class="field-label !mb-1">Wind Speed</p>
                <p class="font-display text-3xl text-primary">{weather.wind} km/h</p>
              </div>
            </div>
            <div class="mt-8 p-5 bg-mustard/15 rounded-[12px] border-l-4 border-mustard">
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
