import { createFileRoute, Link } from "@tanstack/react-router";
import { ScanLine, Sparkles, Cloud, Leaf, Camera, Bot, Pill, CloudSun, ShieldCheck, Languages, Smartphone, Zap, Award, HeartHandshake, BookOpen } from "lucide-react";
import leafImage from "../assets/leaf.jpeg";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Farm Assistant — Smart Crop Disease Detection" },
      { name: "description", content: "Detect crop diseases using AI, get treatment suggestions and weather-based farming advice instantly." },
      { property: "og:title", content: "AI Farm Assistant" },
      { property: "og:description", content: "Smart AI Farming Assistant for disease detection and weather-based advice." },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useTranslation();
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-secondary blur-3xl opacity-70" />
          <div className="absolute top-40 -left-24 w-80 h-80 rounded-full bg-accent blur-3xl opacity-60" />
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary text-primary-dark px-4 py-1.5 text-xs font-semibold">
              <Sparkles size={14} /> {t("hero_badge")}
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-primary-dark text-left">
              {t("hero_title_part1")} <span className="text-primary">{t("hero_title_part2")}</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl leading-relaxed text-left">
              {t("hero_desc")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/scan" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold shadow-soft hover:bg-primary-dark hover:-translate-y-0.5 transition">
                <ScanLine size={18} /> {t("scan_crop_btn")}
              </Link>
              <a href="#how" className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-6 py-3 font-semibold hover:bg-secondary transition">
                <BookOpen size={18} /> {t("learn_more_btn")}
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div><span className="text-2xl font-bold text-primary-dark">98%</span><div>Accuracy</div></div>
              <div className="w-px h-10 bg-border" />
              <div><span className="text-2xl font-bold text-primary-dark">50k+</span><div>Scans</div></div>
              <div className="w-px h-10 bg-border" />
              <div><span className="text-2xl font-bold text-primary-dark">12</span><div>Languages</div></div>
            </div>
          </div>

          {/* Hero visual - Hidden on mobile, shown on large screens */}
          <div className="relative animate-fade-up hidden lg:block" style={{ animationDelay: "120ms" }}>
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-primary to-primary-dark shadow-lift" />
              <div className="absolute inset-4 rounded-[2rem] bg-card p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary-dark">
                    <Leaf size={16} /> Crop Scan
                  </div>
                  <span className="text-xs text-muted-foreground">Live</span>
                </div>
                <div className="flex-1 rounded-2xl bg-secondary grid place-items-center relative overflow-hidden min-h-[300px]">

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(46,125,50,0.25),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(2,136,209,0.2),transparent_60%)]" />

                  <img
                    src={leafImage}
                    alt="Leaf"
                    className="w-full h-full object-cover relative z-10"
                  />

                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-secondary p-2"><div className="text-xs text-muted-foreground">Health</div><div className="font-bold text-primary-dark">96%</div></div>
                  <div className="rounded-xl bg-secondary p-2"><div className="text-xs text-muted-foreground">Risk</div><div className="font-bold text-primary-dark">Low</div></div>
                  <div className="rounded-xl bg-secondary p-2"><div className="text-xs text-muted-foreground">Yield</div><div className="font-bold text-primary-dark">+18%</div></div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-card rounded-2xl shadow-lift px-4 py-3 flex items-center gap-2 animate-float" style={{ animationDelay: "1s" }}>
                <CloudSun className="text-weather" size={20} /> <span className="text-sm font-semibold">28°C • Sunny</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl shadow-lift px-4 py-3 flex items-center gap-2 animate-float" style={{ animationDelay: "2s" }}>
                <Bot className="text-primary" size={20} /> <span className="text-sm font-semibold">AI Diagnosis Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-dark">{t("how_it_works")}</h2>
          <p className="mt-3 text-muted-foreground">{t("how_it_works_desc")}</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { n: 1, icon: Camera, title: "Upload Crop Image", desc: "Snap a photo or drag & drop a leaf image." },
            { n: 2, icon: Bot, title: "AI Detects Disease", desc: "Models analyze patterns in seconds." },
            { n: 3, icon: Pill, title: "Get Treatment Advice", desc: "Receive organic & chemical guidance." },
            { n: 4, icon: CloudSun, title: "Check Weather Planning", desc: "Plan irrigation and pest control." },
          ].map((s) => (
            <div key={s.n} className="group relative bg-card rounded-3xl p-6 border border-border hover:border-primary/30 hover:-translate-y-1 hover:shadow-soft transition-all">
              <div className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-primary text-primary-foreground grid place-items-center text-sm font-bold shadow-soft">{s.n}</div>
              <div className="w-12 h-12 rounded-2xl bg-secondary text-primary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition">
                <s.icon size={22} />
              </div>
              <h3 className="mt-4 font-semibold text-lg text-primary-dark">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-secondary/40 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-dark">{t("everything_you_need")}</h2>
            <p className="mt-3 text-muted-foreground">{t("everything_you_need_desc")}</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Bot, title: "AI Disease Detection", desc: "Identify diseases across 40+ crop types." },
              { icon: Cloud, title: "Weather Advice", desc: "Hyper-local forecasts tailored for your field." },
              { icon: Pill, title: "Treatment Guidance", desc: "Step-by-step organic & chemical solutions." },
              { icon: Languages, title: "Multi-language Support", desc: "Use the app in 12+ regional languages." },
              { icon: Smartphone, title: "Mobile Friendly", desc: "Works seamlessly on any device, offline-ready." },
              { icon: Zap, title: "Instant Results", desc: "Get diagnosis and advice in under 5 seconds." },
            ].map(f => (
              <div key={f.title} className="bg-card rounded-3xl p-6 border border-border hover:shadow-soft hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-secondary text-primary grid place-items-center"><f.icon size={22} /></div>
                <h3 className="mt-4 font-semibold text-primary-dark">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-dark">{t("why_choose_us")}</h2>
          <p className="mt-3 text-muted-foreground">{t("why_choose_us_desc")}</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Award, title: "Accurate AI Prediction" },
            { icon: HeartHandshake, title: "Farmer Friendly" },
            { icon: Zap, title: "Fast Results" },
            { icon: ShieldCheck, title: "Smart Farming Support" },
          ].map(f => (
            <div key={f.title} className="flex items-center gap-4 bg-card rounded-2xl p-5 border border-border hover:shadow-soft transition">
              <div className="w-12 h-12 rounded-xl bg-secondary text-primary grid place-items-center shrink-0"><f.icon size={22} /></div>
              <div className="font-semibold text-primary-dark">{f.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-primary-dark p-10 sm:p-14 text-center text-primary-foreground shadow-lift">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          <Leaf className="mx-auto mb-4 opacity-90" size={40} />
          <h2 className="text-3xl sm:text-4xl font-bold">{t("ready_to_scan")}</h2>
          <p className="mt-3 text-white/80 max-w-xl mx-auto">{t("ready_to_scan_desc")}</p>
          <Link to="/scan" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white text-primary-dark px-7 py-3.5 font-semibold hover:-translate-y-0.5 transition shadow-lift">
            <ScanLine size={18} /> {t("start_ai_scan")}
          </Link>
        </div>
      </section>
    </>
  );
}
