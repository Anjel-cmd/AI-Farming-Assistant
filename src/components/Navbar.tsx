import { Link } from "@tanstack/react-router";
import { Leaf, Menu, X, Globe } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'bn', label: 'Bengali' },
  { code: 'te', label: 'Telugu' },
  { code: 'mr', label: 'Marathi' },
  { code: 'ta', label: 'Tamil' },
  { code: 'gu', label: 'Gujarati' },
  { code: 'ur', label: 'Urdu' },
  { code: 'kn', label: 'Kannada' },
  { code: 'or', label: 'Odia' },
  { code: 'ml', label: 'Malayalam' },
  { code: 'pa', label: 'Punjabi' },
  { code: 'as', label: 'Assamese' }
];

const links = [
  { to: "/", label: "nav_home" },
  { to: "/scan", label: "nav_scan" },
  { to: "/contact", label: "nav_contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }
    if (langOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [langOpen]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
    setLangOpen(false);
    setMobileLangOpen(false);
    setOpen(false);
  };
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-background/80 border-b border-border/60 shadow-[0_2px_12px_-8px_rgba(27,94,32,0.25)]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-primary-dark">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-secondary text-primary">
            <Leaf size={20} />
          </span>
          <span className="text-lg">AI Farm Assistant</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link key={l.to} to={l.to}
              className="px-4 py-2 rounded-full text-sm font-medium text-foreground/70 hover:text-primary-dark hover:bg-secondary transition"
              activeProps={{ className: "px-4 py-2 rounded-full text-sm font-semibold text-primary-dark bg-secondary" }}
              activeOptions={{ exact: true }}
            >
              {t(l.label)}
            </Link>
          ))}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm text-foreground/70 hover:bg-secondary transition"
            >
              <Globe size={15} /> {(i18n.language || 'en').toUpperCase()}
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-card p-1 shadow-lg z-50 animate-fade-up">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition ${
                      (i18n.language || 'en') === lang.code 
                        ? "bg-primary text-primary-foreground font-medium" 
                        : "text-foreground/80 hover:bg-secondary"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <button onClick={() => setOpen(o => !o)} className="md:hidden p-2 rounded-lg hover:bg-secondary" aria-label="Menu">
          {open ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-up">
          <div className="px-4 py-3 flex flex-col gap-1">
            {links.map(l => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium hover:bg-secondary"
                activeProps={{ className: "px-4 py-3 rounded-xl text-sm font-semibold bg-secondary text-primary-dark" }}
                activeOptions={{ exact: true }}>
                {t(l.label)}
              </Link>
            ))}
            
            <div className="px-4 py-3 border-t border-border mt-2">
              <button 
                onClick={() => setMobileLangOpen(!mobileLangOpen)}
                className="w-full flex items-center justify-between rounded-xl text-sm font-medium hover:bg-secondary transition"
              >
                <div className="flex items-center gap-2 text-foreground/80">
                  <Globe size={18} /> Language ({(i18n.language || 'en').toUpperCase()})
                </div>
              </button>
              
              {mobileLangOpen && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`text-left px-3 py-2.5 text-sm rounded-lg transition ${
                        (i18n.language || 'en') === lang.code 
                          ? "bg-primary text-primary-foreground font-medium" 
                          : "text-foreground/80 bg-secondary/50 hover:bg-secondary"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
