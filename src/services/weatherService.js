// src/services/weatherService.js

const WEATHER_KEY =
  import.meta.env.VITE_WEATHER_API_KEY;

// Cities
export const INDIAN_CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Patna",
  "Bhopal",
  "Chandigarh",
  "Nagpur",
  "Indore",
  "Darjeeling",
  "Siliguri",
  "Guwahati",
];

// ─────────────────────────────────────────────
// Fetch Weather
// ─────────────────────────────────────────────
export async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},IN&appid=${WEATHER_KEY}&units=metric&cnt=8`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Weather fetch failed");
  }

  return response.json();
}

// ─────────────────────────────────────────────
// Weather Summary
// ─────────────────────────────────────────────
export function summariseWeather(data) {
  if (!data || !data.list || data.list.length === 0) {
    return {
      city: data?.city?.name || "Unknown",
      currentTemp: 0,
      avgTemp: 0,
      maxTemp: 0,
      minTemp: 0,
      humidity: 0,
      windSpeed: 0,
      willRain: false,
      conditions: "N/A",
    };
  }

  const current = data.list[0];

  const temps = data.list.map((i) => i.main?.temp || 0);

  const conditions = data.list.map(
    (i) => i.weather?.[0]?.description || "unknown"
  );

  const willRain = conditions.some((c) =>
    c.toLowerCase().includes("rain")
  );

  return {
    city: data.city?.name || "Unknown",

    currentTemp: current?.main?.temp || 0,

    avgTemp:
      temps.length > 0
        ? temps.reduce((a, b) => a + b, 0) / temps.length
        : 0,

    maxTemp: temps.length > 0 ? Math.max(...temps) : 0,

    minTemp: temps.length > 0 ? Math.min(...temps) : 0,

    humidity: current?.main?.humidity || 0,

    windSpeed: current?.wind?.speed || 0,

    willRain,

    conditions: [...new Set(conditions)]
      .slice(0, 3)
      .join(", "),
  };
}