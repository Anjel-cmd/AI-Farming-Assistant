import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  Upload,
  Camera,
  ScanLine,
  AlertTriangle,
  CheckCircle2,
  Leaf,
  Cloud,
  Droplets,
  Wind,
  Thermometer,
  Pill,
  Sprout,
  ShieldCheck,
  RefreshCw,
  Download,
  Save,
  Loader2,
} from "lucide-react";
import jsPDF from "jspdf";
import { useTranslation } from "react-i18next";

import {
  analyzeCropImage,
  getWeatherAdvice,
} from "../services/claudeService.js";

import {
  getWeather,
  summariseWeather,
  INDIAN_CITIES,
} from "../services/weatherService.js";

export const Route = createFileRoute("/scan")({
  head: () => ({
    meta: [
      { title: "Scan Your Crop — AI Farm Assistant" },
      {
        name: "description",
        content:
          "Upload a crop image to get AI-powered disease diagnosis, treatment advice, and weather guidance.",
      },
    ],
  }),
  component: ScanPage,
});

type Result = {
  diseaseName: string;
  severity: "Mild" | "Moderate" | "Severe";
  confidence: string;
  diseaseDetected: boolean;
  summary: string;
  cropType: string;
  affectedParts: string;
  treatment?: {
    organic?: string[];
    chemical?: string[];
    prevention?: string[];
  };
};

const TABS = ["Organic", "Chemical", "Prevention"] as const;


function ScanPage() {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [scanning, setScanning] = useState(false);

  const [result, setResult] = useState<Result | null>(null);

  const [tab, setTab] =
    useState<typeof TABS[number]>("Organic");

  const [city, setCity] = useState("");

  const [weather, setWeather] = useState<any>(null);

  const [weatherAdvice, setWeatherAdvice] =
    useState<any>(null);

  const [weatherLoading, setWeatherLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const camRef = useRef<HTMLInputElement>(null);

  function onSelect(f?: File) {
    if (!f) return;

    setResult(null);

    setFile(f);

    setPreview(URL.createObjectURL(f));
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();

    onSelect(e.dataTransfer.files?.[0]);
  }

  async function scan() {
    if (!file) return;

    try {
      setScanning(true);

      setResult(null);

      const aiResult = await analyzeCropImage(file);

      setResult(aiResult);
    } catch (err: any) {
      console.error(err);

      alert(`Analysis failed: ${err.message || "Unknown error"}`);
    } finally {
      setScanning(false);
    }
  }

async function loadWeather() {
  if (!city) {
    alert("Please select a city.");
    return;
  }

  try {
    setWeatherLoading(true);
    setWeather(null);
    setWeatherAdvice(null);

    const raw = await getWeather(city);

    const summary = summariseWeather(raw);

    setWeather(summary);

    const advice = await getWeatherAdvice(
      summary,
      result?.cropType || "general crops",
      "en"
    );

    setWeatherAdvice(advice);
  } catch (err: any) {
    console.error(err);

    alert(`Weather error: ${err.message || "Failed to fetch data"}`);
  } finally {
    setWeatherLoading(false);
  }
}

function reset() {
  setFile(null);

  setPreview(null);

  setResult(null);

  setWeather(null);

  setWeatherAdvice(null);

  setCity("");
}
function downloadReport() {
    if (!result) {
      alert("No report available.");
      return;
    }
    const doc = new jsPDF();

    // HEADER
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);

    doc.text(
      "AI Farm Assistant Report",
      20,
      20
    );

    doc.setDrawColor(34, 197, 94);

    doc.line(20, 28, 190, 28);

    let y = 40;

    // Crop Analysis
    doc.setFontSize(16);

    doc.setFont("helvetica", "bold");

    doc.text("Crop Analysis", 20, y);

    y += 12;

    doc.setFontSize(12);

    doc.setFont("helvetica", "normal");

    doc.text(
      `Crop Type: ${result.cropType}`,
      20,
      y
    );

    y += 8;
    doc.text(
      `Disease: ${
        result.diseaseDetected
          ? result.diseaseName
          : "Healthy Crop"
      }`,
      20,
      y
    );

    y += 8;

    doc.text(
      `Severity: ${result.severity}`,
      20,
      y
    );

    y += 8;

    doc.text(
      `Confidence: ${result.confidence}%`,
      20,
      y
    );
    y += 15;

    // Summary
    doc.setFont("helvetica", "bold");

    doc.text("Summary", 20, y);

    y += 10;

    doc.setFont("helvetica", "normal");

    const summaryLines =
      doc.splitTextToSize(
        result.summary,
        165
      );

    doc.text(summaryLines, 20, y);

    y += summaryLines.length * 7 + 10;

    // Treatment
    if (result.treatment) {
      doc.setFont("helvetica", "bold");

      doc.text("Treatment Advice", 20, y);

      y += 10;

      doc.setFont("helvetica", "normal");

      const allTreatments = [
        ...(result.treatment.organic || []),
        ...(result.treatment.chemical || []),
        ...(result.treatment.prevention || []),
      ];

      allTreatments.forEach(
        (item, index) => {
          const lines =
            doc.splitTextToSize(
              `${index + 1}. ${item}`,
              165
            );

          doc.text(lines, 20, y);

          y += lines.length * 7 + 5;
        }
      );
    }
    // Weather
  if (weather) {
    y += 5;

    doc.setFont("helvetica", "bold");
    doc.text("Weather Information", 20, y);

    y += 10;

    doc.setFont("helvetica", "normal");

    doc.text(`City: ${city}`, 20, y);
    y += 8;

    doc.text(
      `Temperature: ${weather.currentTemp}°C`,
      20,
      y
    );
    y += 8;

    doc.text(
      `Humidity: ${weather.humidity}%`,
      20,
      y
    );
    y += 8;

    doc.text(
      `Wind Speed: ${weather.windSpeed} m/s`,
      20,
      y
    );
    y += 8;

    doc.text(
      `Rain Expected: ${
        weather.willRain ? "Yes" : "No"
      }`,
      20,
      y
    );
  }

  // Footer
  doc.setFontSize(10);

  doc.text(
    "Generated by AI Farm Assistant",
    20,
    285
  );

  doc.save("farm-report.pdf");
}
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14 space-y-8">
      {/* HEADER */}
      <header className="text-center max-w-2xl mx-auto animate-fade-up">
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary text-primary-dark px-4 py-1.5 text-xs font-semibold">
          <Leaf size={14} />
          Crop Analysis Dashboard
        </span>

        <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-primary-dark">
          {t("scan_title")}
        </h1>

        <p className="mt-3 text-muted-foreground">
          {t("scan_desc")}
        </p>
      </header>

      {/* UPLOAD */}
      <section className="bg-card rounded-3xl border border-border p-6 sm:p-8 shadow-soft animate-fade-up">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          className="relative rounded-2xl border-2 border-dashed border-primary/30 bg-secondary/40 p-6 sm:p-10 min-h-[280px] flex flex-col items-center justify-center text-center"
        >
          {preview ? (
            <img
              src={preview}
              alt="Crop preview"
              className="max-h-72 rounded-xl object-contain shadow-soft"
            />
          ) : (
            <>
              <div className="w-16 h-16 rounded-2xl bg-card grid place-items-center text-primary shadow-soft">
                <Upload size={26} />
              </div>

              <h3 className="mt-4 font-semibold text-primary-dark text-lg">
                {t("scan_drag_drop")}
              </h3>

              <p className="text-sm text-muted-foreground mt-1">
                {t("scan_upload_hint")}
              </p>

              <div className="mt-5 flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => inputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm font-medium hover:bg-secondary transition"
                >
                  <Upload size={16} />
                  {t("scan_upload_btn")}
                </button>

                <button
                  onClick={() => camRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm font-medium hover:bg-secondary transition"
                >
                  <Camera size={16} />
                  {t("scan_camera_btn")}
                </button>
              </div>
            </>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) =>
              onSelect(e.target.files?.[0])
            }
          />

          <input
            ref={camRef}
            type="file"
            accept="image/*"
            capture="environment"
            hidden
            onChange={(e) =>
              onSelect(e.target.files?.[0])
            }
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <button
            onClick={scan}
            disabled={!file || scanning}
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3 font-semibold hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed shadow-soft transition"
          >
            {scanning ? (
              <>
                <Loader2
                  className="animate-spin"
                  size={18}
                />
                {t("scan_analyzing")}
              </>
            ) : (
              <>
                <ScanLine size={18} />
                {t("scan_crop_btn")}
              </>
            )}
          </button>

          {preview && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium hover:bg-secondary transition"
            >
              <RefreshCw size={16} />
              Reset
            </button>
          )}
        </div>
      </section>

      {/* RESULT */}
      {result && (
        <section className="animate-fade-up">
          {!result.diseaseDetected ? (
            <div className="bg-card border-l-4 border-success rounded-3xl p-6 sm:p-8 shadow-soft flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-success/15 text-success grid place-items-center shrink-0">
                <CheckCircle2 />
              </div>

              <div>
                <h3 className="text-xl font-bold text-success">
                  {t("scan_healthy")}
                </h3>

                <p className="text-muted-foreground mt-1">
                  {t("scan_healthy_desc")}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-3xl p-6 sm:p-8 border border-destructive/20 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-destructive/10 text-destructive grid place-items-center shrink-0">
                  <AlertTriangle />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <h3 className="text-2xl font-bold text-destructive">
                      {result.diseaseName}
                    </h3>

                    <span className="text-xs font-semibold rounded-full bg-destructive/10 text-destructive px-3 py-1">
                      {result.severity}
                    </span>
                  </div>

                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    {result.summary}
                  </p>

                  <div className="mt-5">
                    <div className="flex justify-between text-sm font-medium mb-1.5">
                      <span>{t("scan_confidence")}</span>

                      <span className="text-primary-dark">
                        {result.confidence}%
                      </span>
                    </div>

                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary-dark transition-all"
                        style={{
                          width: `${parseInt(
                            result.confidence
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* TREATMENT */}
      {result && result.diseaseDetected && (
        <section className="bg-card rounded-3xl border border-border p-6 sm:p-8 shadow-soft animate-fade-up">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-secondary text-primary grid place-items-center">
              <Pill size={20} />
            </div>

            <h2 className="text-xl font-bold text-primary-dark">
              {t("scan_treatment_advice")}
            </h2>
          </div>

          <div className="flex flex-nowrap overflow-x-auto gap-2 border-b border-border no-scrollbar">
            {TABS.map((t) => {
              const Icon =
                t === "Organic"
                  ? Sprout
                  : t === "Chemical"
                  ? Pill
                  : ShieldCheck;

              const active = tab === t;

              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                    active
                      ? "border-primary text-primary-dark"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon size={16} />
                  {t}
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            <ul className="space-y-3">
              {(
                tab === "Organic"
                  ? result.treatment?.organic || []
                  : tab === "Chemical"
                  ? result.treatment?.chemical || []
                  : result.treatment?.prevention || []
              ).map((it, i) => (
                <li
                  key={i}
                  className="flex gap-3 items-start bg-secondary/50 rounded-2xl p-4"
                >
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold grid place-items-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>

                  <span className="text-sm leading-relaxed">
                    {it}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* WEATHER */}
      <section
        className="rounded-3xl p-6 sm:p-8 text-weather-foreground shadow-lift animate-fade-up relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--weather), oklch(0.5 0.12 240))",
        }}
      >
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />

        <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Cloud />
              {t("scan_weather_advice")}
            </h2>

            <p className="text-white/80 text-sm mt-1">
              {t("scan_weather_desc")}
            </p>
          </div>

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full sm:w-auto bg-white/15 backdrop-blur border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-white outline-none"
          >
            <option value="" className="text-foreground">
              {t("scan_select_city")}
            </option>

            {INDIAN_CITIES.map((c: string) => (
              <option
                key={c}
                value={c}
                className="text-foreground"
              >
                {c}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={loadWeather}
          disabled={weatherLoading}
          className="mt-5 w-full sm:w-auto rounded-full bg-white text-black px-6 py-2.5 font-semibold disabled:opacity-50 flex items-center justify-center gap-2 shadow-lift hover:bg-white/90 transition"
        >
          {weatherLoading && <Loader2 size={16} className="animate-spin" />}
          {weatherLoading ? t("scan_fetching") : t("scan_get_weather")}
        </button>

        <div className="relative mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              icon: Thermometer,
              label: "Temperature",
              value: weather
                ? `${weather.currentTemp}°C`
                : "--",
            },
            {
              icon: Droplets,
              label: "Humidity",
              value: weather
                ? `${weather.humidity}%`
                : "--",
            },
            {
              icon: Cloud,
              label: "Rain Chance",
              value: weather
                ? weather.willRain
                  ? "Expected"
                  : "No Rain"
                : "--",
            },
            {
              icon: Wind,
              label: "Wind Speed",
              value: weather
                ? `${weather.windSpeed} m/s`
                : "--",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white/15 backdrop-blur rounded-2xl p-4 border border-white/20"
            >
              <s.icon size={20} className="opacity-90" />

              <div className="text-xs text-white/80 mt-2">
                {s.label}
              </div>

              <div className="text-lg font-bold mt-0.5">
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {weatherAdvice && (
          <div className="relative mt-6 grid sm:grid-cols-3 gap-3">
            {[
              {
                t: "Farming Tip",
                d: weatherAdvice.mainAdvice,
              },
              {
                t: "Irrigation",
                d: weatherAdvice.irrigationAdvice,
              },
              {
                t: "Pest Alert",
                d: weatherAdvice.pestAlert,
              },
            ].map((c) => (
              <div
                key={c.t}
                className="bg-white/10 rounded-2xl p-4 border border-white/15"
              >
                <div className="text-xs uppercase tracking-wide text-white/70 font-semibold">
                  {c.t}
                </div>

                <div className="text-sm mt-1.5 leading-relaxed">
                  {c.d}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ACTIONS */}
      <section className="flex flex-wrap gap-3 justify-center pt-2">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary transition"
        >
          <RefreshCw size={16} />
          {t("scan_another")}
        </button>

        <button
          onClick={downloadReport}
          disabled={!result}
          className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary disabled:opacity-50 transition"
        >
          <Download size={16} />
          {t("scan_download")}
        </button>

        <button className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary-dark transition">
          <Save size={16} />
          {t("scan_save")}
        </button>
      </section>
    </div>
  );
}