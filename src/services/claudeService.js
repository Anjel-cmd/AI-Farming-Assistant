// src/services/claudeService.js

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

if (!API_KEY) {
  console.warn("WARNING: VITE_GROQ_API_KEY is not defined in the environment!");
}

const BASE_URL =
  "https://api.groq.com/openai/v1/chat/completions";

// ─────────────────────────────────────────────
// Convert file to base64
// ─────────────────────────────────────────────
async function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

// ─────────────────────────────────────────────
// Safe JSON parser
// ─────────────────────────────────────────────
function parseJSON(text) {
  try {
    return JSON.parse(text);
  } catch {
    try {
      const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return JSON.parse(cleaned);
    } catch (err) {
      console.error("INVALID JSON:", text);

      throw new Error("AI returned invalid JSON");
    }
  }
}

// ─────────────────────────────────────────────
// Core Groq API
// ─────────────────────────────────────────────
async function callGroq(messages, model) {
  const response = await fetch(BASE_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${API_KEY}`,
    },

    body: JSON.stringify({
      model,

      messages,

      temperature: 0.2,

      max_tokens: 2048,
    }),
  });

  const raw = await response.text();

  console.log("RAW GROQ RESPONSE:", raw);

  if (!response.ok) {
    console.error("GROQ API ERROR:", raw);
    throw new Error(`Groq API Error: ${response.status} ${response.statusText}`);
  }

  const data = JSON.parse(raw);
  return data.choices?.[0]?.message?.content || "";
}

// ─────────────────────────────────────────────
// MAIN SCAN FUNCTION
// ─────────────────────────────────────────────
export async function analyzeCropImage(file) {
  const image = await fileToDataURL(file);

  const prompt = `
You are an expert agricultural scientist and crop disease specialist.

Analyze the uploaded crop image carefully.

Return ONLY valid JSON.

{
  "cropType": "",
  "diseaseDetected": true,
  "diseaseName": "",
  "severity": "Mild",
  "confidence": "95",
  "affectedParts": "",
  "summary": "",
  "treatment": {
    "organic": [
      "",
      "",
      ""
    ],
    "chemical": [
      "",
      "",
      ""
    ],
    "prevention": [
      "",
      "",
      ""
    ]
  }
}

RULES:
- confidence must be number string only
- severity only: Mild, Moderate, Severe
- treatment arrays must contain short bullet advice
- summary should be concise
`;

  const text = await callGroq(
    [
      {
        role: "user",

        content: [
          {
            type: "text",

            text: prompt,
          },

          {
            type: "image_url",

            image_url: {
              url: image,
            },
          },
        ],
      },
    ],

    "meta-llama/llama-4-scout-17b-16e-instruct"
  );

  return parseJSON(text);
}

// ─────────────────────────────────────────────
// WEATHER AI ADVICE
// ─────────────────────────────────────────────
export async function getWeatherAdvice(
  weather,
  cropType = "",
  lang = "English"
) {
  const prompt = `
You are an agricultural weather advisor.

Crop: ${cropType}

Weather:
- Temperature: ${weather.currentTemp}°C
- Humidity: ${weather.humidity}%
- Rain Expected: ${weather.willRain}
- Conditions: ${weather.conditions}
- Wind: ${weather.windSpeed} m/s

Respond ONLY in valid JSON.

{
  "mainAdvice": "",
  "irrigationAdvice": "",
  "pestAlert": "",
  "bestCropForWeather": ""
}
`;

  const text = await callGroq(
    [
      {
        role: "user",

        content: prompt,
      },
    ],

    "llama-3.3-70b-versatile"
  );

  return parseJSON(text);
}