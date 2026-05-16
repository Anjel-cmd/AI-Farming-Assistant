import { Link } from "@tanstack/react-router";
import { Leaf, Menu, X, Globe } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/scan", label: "Scan Crop" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
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
              {l.label}
            </Link>
          ))}
          <button className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm text-foreground/70 hover:bg-secondary transition">
            <Globe size={15} /> EN
          </button>
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
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
