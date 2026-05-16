import { Link } from "@tanstack/react-router";
import { Leaf, Github, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 bg-primary-dark text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-white/10"><Leaf size={20}/></span>
            AI Farm Assistant
          </div>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            Built with AI for smarter farming 🌱
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">About</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>Our Mission</li><li>How AI Helps</li><li>Press</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/scan" className="hover:text-white">Scan Crop</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Follow</h4>
          <div className="flex gap-3">
            {[Twitter, Instagram, Github].map((I, i) => (
              <a key={i} href="#" className="grid place-items-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition"><I size={16}/></a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} AI Farm Assistant. All rights reserved.
      </div>
    </footer>
  );
}
