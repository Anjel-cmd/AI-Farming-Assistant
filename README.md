# 🌱 AI Farming Assistant

> Empowering 140M+ Indian farm families with AI-powered crop intelligence

![AI Farming Assistant](https://img.shields.io/badge/AI-Farming%20Assistant-2d6a4f?style=for-the-badge&logo=leaf)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Groq](https://img.shields.io/badge/Groq-AI-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 📖 About

AI Farming Assistant is a multilingual AI-powered web app that acts as a personal agronomist for every Indian farmer. Upload a photo of your crop, get instant disease diagnosis, treatment advice, and weather-based planting guidance — all in your local language.

Built for the hackathon with real-world social impact in mind.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Crop Disease Detection** | Upload a leaf photo → instant AI diagnosis using Groq Vision |
| 💊 **Treatment Advice** | Organic + chemical treatment options with dosage in local language |
| 🌤️ **Weather-Based Planning** | Real-time weather → sow / irrigate / harvest advice per district |
| 🌐 **Multilingual Support** | Hindi, Tamil, and English — switch anytime |
| 📱 **Mobile Friendly** | Works on any device including low-end Android phones |

---

## 🖼️ Screenshots

> Upload a leaf photo and get instant AI-powered disease diagnosis with treatment advice

```
📷 Upload → 🔍 Diagnose → 💊 Treat → 🌤️ Plan
```

---

## 🛠️ Tech Stack

- **Frontend** — React + Vite
- **AI Model** — Groq API (llama-4-scout for vision, llama-3.3-70b for text)
- **Weather** — OpenWeather API
- **Styling** — Custom CSS with Google Fonts
- **Deployment** — Vercel / Netlify / Cloudflare

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ → https://nodejs.org
- Groq API key (free) → https://console.groq.com
- OpenWeather API key (free) → https://openweathermap.org/api

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Anjel-cmd/AI-Farming-Assistant.git
cd AI-Farming-Assistant

# 2. Install dependencies
npm install

# 3. Create .env file in project root
```

### Environment Variables

Create a `.env` file in the root folder:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_WEATHER_API_KEY=your_openweather_api_key_here
```

> ⚠️ Never commit your `.env` file. It is already in `.gitignore`.

### Run Locally

```bash
npm run dev
```

Open http://localhost:8080 in your browser.

---

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Deploy to Vercel
npm install -g vercel
vercel --prod
```

### Deploy to Vercel (recommended)

1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Add environment variables:
   - `VITE_GROQ_API_KEY`
   - `VITE_WEATHER_API_KEY`
5. Click Deploy

---

## 📁 Project Structure

```
ai-farming-assistant/
├── public/
├── src/
│   ├── App.jsx                  ← Main app
│   ├── main.jsx                 ← Entry point
│   ├── index.css                ← Global styles
│   ├── components/
│   │   ├── Header.jsx           ← Header + language toggle
│   │   ├── ImageUpload.jsx      ← Crop photo upload
│   │   ├── DiseaseResult.jsx    ← Disease diagnosis display
│   │   ├── TreatmentCard.jsx    ← Treatment advice
│   │   └── WeatherTip.jsx       ← Weather planning
│   └── services/
│       ├── claudeService.js     ← Groq AI API calls
│       └── weatherService.js    ← OpenWeather API
├── .env                         ← API keys (not committed)
├── .gitignore
├── package.json
└── vite.config.js
```

---

## 🌍 Supported Languages

| Language | Code |
|---|---|
| English | `en` |
| Hindi | `hi` |
| Tamil | `ta` |

---

## 🤝 How It Works

```
1. Farmer uploads a crop leaf photo
        ↓
2. Groq Vision AI (llama-4-scout) analyzes the image
        ↓
3. Disease name, severity, and confidence are returned
        ↓
4. Groq Text AI (llama-3.3-70b) generates treatment advice
        ↓
5. OpenWeather API fetches local weather forecast
        ↓
6. AI generates sow / irrigate / harvest recommendation
        ↓
7. All results shown in farmer's local language
```

---

## 💡 Impact

- 🇮🇳 **140M+** Indian farming families can benefit
- 🌾 **18%** of India's GDP comes from agriculture
- 📉 **30%** of crops lost to disease every year — this app helps reduce that
- 📱 Works on basic Android phones via mobile-optimized UI
- 🌐 Multilingual — reaches farmers who don't speak English

---

## 🔑 API Keys Setup

### Groq API (Free)
1. Go to https://console.groq.com
2. Sign up for free
3. Click "Create API Key"
4. Copy and paste into `.env`

### OpenWeather API (Free)
1. Go to https://openweathermap.org/api
2. Sign up for free
3. Go to "My API Keys"
4. Copy and paste into `.env`

---

## 📄 License

MIT License — feel free to use, modify, and distribute.

---

## 👨‍💻 Author

Built with ❤️ for Indian farmers at a hackathon.

> *"From a leaf photo to a farmer's livelihood — one AI call at a time."*

---

## ⭐ Support

If you found this useful, please give it a ⭐ on GitHub!

[![GitHub stars](https://img.shields.io/github/stars/Anjel-cmd/AI-Farming-Assistant?style=social)](https://github.com/Anjel-cmd/AI-Farming-Assistant)
