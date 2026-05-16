import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Send, Leaf } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — AI Farm Assistant" },
      { name: "description", content: "Get in touch with the AI Farm Assistant team. We're here to help farmers grow smarter." },
      { property: "og:title", content: "Contact AI Farm Assistant" },
      { property: "og:description", content: "Reach out for support, partnerships, or feedback." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <header className="text-center max-w-2xl mx-auto animate-fade-up">
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary text-primary-dark px-4 py-1.5 text-xs font-semibold">
          <Leaf size={14}/> We'd love to hear from you
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-primary-dark">Get in Touch</h1>
        <p className="mt-3 text-muted-foreground">Have questions, feedback, or want to partner with us? Reach out.</p>
      </header>

      <div className="mt-12 grid lg:grid-cols-5 gap-6">
        {/* Contact info */}
        <div className="lg:col-span-2 space-y-4 animate-fade-up">
          {[
            { icon: Mail, title: "Email", value: "hello@aifarm.app", link: "mailto:hello@aifarm.app" },
            { icon: Phone, title: "Phone", value: "+91 98765 43210", link: "tel:+919876543210" },
            { icon: MapPin, title: "Address", value: "Green Tech Park, Bengaluru, India 560001" },
          ].map(c => (
            <a key={c.title} href={c.link ?? "#"} className="flex items-start gap-4 bg-card rounded-2xl p-5 border border-border hover:shadow-soft hover:-translate-y-0.5 transition-all">
              <div className="w-11 h-11 rounded-xl bg-secondary text-primary grid place-items-center shrink-0"><c.icon size={20}/></div>
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">{c.title}</div>
                <div className="font-semibold text-primary-dark mt-0.5">{c.value}</div>
              </div>
            </a>
          ))}
          <div className="rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-secondary to-accent p-8 text-center">
            <Leaf className="mx-auto text-primary animate-float" size={48} strokeWidth={1.4}/>
            <p className="mt-3 text-sm text-primary-dark font-medium">Helping farmers grow smarter, every day.</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-soft space-y-5 animate-fade-up">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name" name="name" placeholder="Your full name" required/>
            <Field label="Email" name="email" type="email" placeholder="you@example.com" required/>
          </div>
          <Field label="Subject" name="subject" placeholder="What's this about?" required/>
          <div>
            <label className="text-sm font-medium text-primary-dark">Message</label>
            <textarea name="message" required rows={5} placeholder="Tell us how we can help…"
              className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none"/>
          </div>
          <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold hover:bg-primary-dark shadow-soft transition">
            <Send size={16}/> Send Message
          </button>
          {sent && (
            <p className="text-sm text-success font-medium animate-fade-up">✓ Message sent! We'll get back to you within 24 hours.</p>
          )}
        </form>
      </div>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm font-medium text-primary-dark">{label}</label>
      <input {...props}
        className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"/>
    </div>
  );
}
