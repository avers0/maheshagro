import { useState, useEffect } from "preact/hooks";

// Live weather from Open-Meteo (free, no API key, CORS-enabled).
const CITIES = [
  { name: "Deoli", lat: 25.76, lon: 75.39 },
  { name: "Tonk", lat: 26.17, lon: 75.79 },
  { name: "Jaipur", lat: 26.91, lon: 75.79 },
  { name: "Kota", lat: 25.18, lon: 75.83 },
  { name: "Ajmer", lat: 26.45, lon: 74.64 },
  { name: "Bhilwara", lat: 25.35, lon: 74.63 },
];

interface Weather {
  temp: number;
  code: number;
  isDay: boolean;
  humidity: number;
  wind: number;
  days: { date: string; max: number; min: number; rain: number; code: number }[];
}

// WMO weather codes grouped into the conditions farmers care about
function describe(code: number, isDay = true): [string, string] {
  if (code === 0) return ["Clear sky", isDay ? "☀️" : "🌙"];
  if (code === 1) return ["Mainly clear", isDay ? "🌤️" : "🌙"];
  if (code === 2) return ["Partly cloudy", "⛅"];
  if (code === 3) return ["Overcast", "☁️"];
  if (code === 45 || code === 48) return ["Fog", "🌫️"];
  if (code >= 51 && code <= 57) return ["Drizzle", "🌦️"];
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return ["Rain", "🌧️"];
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return ["Snow", "❄️"];
  if (code >= 95) return ["Thunderstorm", "⛈️"];
  return ["Partly cloudy", "⛅"];
}

function dayLabel(date: string, index: number) {
  if (index === 0) return "Today";
  if (index === 1) return "Tomorrow";
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", { weekday: "long" });
}

function farmingTip(w: Weather) {
  const rainSoon = w.days.some(day => day.rain >= 60);
  if (rainSoon) return "Rain is likely in the next few days. Hold off on spraying and fertilizer top-dressing until it passes.";
  if (w.wind >= 15) return "Windy conditions. Spray in the calm early morning to avoid drift.";
  if (w.temp >= 38) return "High temperature. Irrigate on time and avoid spraying in the afternoon heat.";
  if (w.humidity >= 70) return "High humidity. Watch for fungal diseases and consider a preventive fungicide.";
  return "Good conditions for field work, sowing and spraying.";
}

export default function WeatherIsland() {
  const [city, setCity] = useState(CITIES[0]);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}`
      + "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day"
      + "&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code"
      + "&timezone=Asia%2FKolkata&forecast_days=3";
    fetch(url, { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error(String(response.status)); return response.json(); })
      .then(data => {
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          code: data.current.weather_code,
          isDay: data.current.is_day === 1,
          humidity: Math.round(data.current.relative_humidity_2m),
          wind: Math.round(data.current.wind_speed_10m),
          days: data.daily.time.map((date: string, i: number) => ({
            date,
            max: Math.round(data.daily.temperature_2m_max[i]),
            min: Math.round(data.daily.temperature_2m_min[i]),
            rain: data.daily.precipitation_probability_max[i] ?? 0,
            code: data.daily.weather_code[i],
          })),
        });
        setStatus("ready");
      })
      .catch(error => { if (error.name !== "AbortError") setStatus("error"); });
    return () => controller.abort();
  }, [city, retry]);

  const [desc, icon] = weather ? describe(weather.code, weather.isDay) : ["", ""];

  return (
    <div class="max-w-2xl mx-auto">
      <div class="card-paper p-6 md:p-10">
        <div class="mb-8">
          <p class="field-label" id="weather-city-label">Select Location</p>
          <div class="flex flex-wrap gap-2 sm:gap-3" role="group" aria-labelledby="weather-city-label">
            {CITIES.map(c => (
              <button
                key={c.name}
                type="button"
                aria-pressed={city.name === c.name}
                class={`min-h-11 px-5 py-2 rounded-full font-semibold text-sm transition-all ${city.name === c.name ? "bg-primary text-white" : "bg-paper border border-border text-primary hover:border-mustard"}`}
                onClick={() => setCity(c)}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {status === "loading" && (
          <div class="py-16 flex justify-center" role="status" aria-label="Loading weather">
            <div class="w-10 h-10 border-4 border-mustard border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {status === "error" && (
          <div class="rounded-[12px] border border-border bg-paper p-6 text-center" role="alert">
            <p class="text-primary">Couldn't load the weather right now. Check your internet connection and try again.</p>
            <button type="button" class="btn-primary mt-4" onClick={() => setRetry(value => value + 1)}>Try again</button>
          </div>
        )}

        {status === "ready" && weather && (
          <div>
            <div class="text-center mb-8">
              <div class="text-7xl mb-3" aria-hidden="true">{icon}</div>
              <p class="font-display text-7xl text-primary tabular-nums">{weather.temp}°C</p>
              <p class="text-xl text-text-muted mt-2">{desc}</p>
              <p class="text-lg font-bold text-primary mt-1"><span>{city.name}</span><span>, Rajasthan</span></p>
            </div>
            <div class="grid grid-cols-2 gap-3 sm:gap-4">
              <div class="bg-paper p-5 rounded-[12px] border border-border text-center">
                <p class="field-label !mb-1">Humidity</p>
                <p class="font-display text-3xl text-primary tabular-nums">{weather.humidity}%</p>
              </div>
              <div class="bg-paper p-5 rounded-[12px] border border-border text-center">
                <p class="field-label !mb-1">Wind Speed</p>
                <p class="font-display text-3xl text-primary tabular-nums">{weather.wind} km/h</p>
              </div>
            </div>

            <p class="field-label mt-8">Next 3 days</p>
            <div class="grid grid-cols-3 gap-2 sm:gap-3">
              {weather.days.map((day, i) => (
                <div key={day.date} class="rounded-[12px] border border-border bg-paper p-3 text-center sm:p-4">
                  <p class="text-xs font-semibold text-soil sm:text-sm">{dayLabel(day.date, i)}</p>
                  <p class="mt-1 text-2xl" aria-hidden="true">{describe(day.code)[1]}</p>
                  <p class="mt-1 font-semibold text-primary tabular-nums">{day.max}° <span class="font-normal text-text-muted">/ {day.min}°</span></p>
                  <p class="mt-1 text-xs text-text-muted"><span>Rain</span> <span class="tabular-nums">{day.rain}%</span></p>
                </div>
              ))}
            </div>

            <div class="mt-8 p-5 bg-mustard/15 rounded-[12px] border-l-4 border-mustard">
              <p class="text-sm font-medium text-primary">
                🌾 <strong>Farming Tip:</strong> <span>{farmingTip(weather)}</span>
              </p>
            </div>
            <p class="mt-4 text-center text-xs text-text-muted">
              <span>Live weather from</span> <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" class="underline decoration-mustard underline-offset-2">Open-Meteo</a><span>, updated every 15 minutes.</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
