import { useState } from "react";
import { CheckCircle, Zap, DollarSign, BarChart3, Link } from "lucide-react";
import { submitPartnerApplication } from "../data/partners";

const networks = ["Impact.com", "PartnerStack", "ShareASale", "CJ Affiliate", "Direct / Custom API"];
const commissionTypes = ["% of first payment", "% of recurring revenue", "Flat CPA per signup", "Flat CPA per qualified lead"];
const categories = [
  "AI Giants & Platforms", "Education", "Health Care", "Shopping", "Real Estate",
  "Research", "Legal", "Surgery", "Travel", "Night Out", "Maps & Nav",
  "AI Films", "AI Music", "Jobs", "Science", "Space", "Business", "IPO",
  "News", "Stocks", "Sports & Fitness", "Fashion & Beauty", "Gaming & Esports",
  "Cybersecurity", "Finance & Banking", "Energy & Climate", "Architecture & Design",
  "Transportation", "Government & Civic", "Religion & Spirit", "Dating & Love",
  "Pets & Animals", "Insurance", "Manufacturing", "Agriculture", "Multi-Agent AI",
];

export function PartnerSignup({ onSuccess }: { onSuccess?: () => void } = {}) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    company: "", website: "", contactName: "", contactEmail: "",
    category: "", commissionType: "", commissionRate: "",
    cookieDays: "30", network: "", trackingUrl: "", notes: "",
  });

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submitPartnerApplication(form);
    setSubmitted(true);
    setTimeout(() => onSuccess?.(), 3000);
  }

  const perks = [
    { icon: <BarChart3 size={18} />, title: "Live Analytics", desc: "See real-time clicks, impressions, and conversion data from your listing" },
    { icon: <Link size={18} />, title: "UTM Tracking", desc: "Every referral tagged with utm_source=aicircusmall so you can verify in your own dashboard" },
    { icon: <DollarSign size={18} />, title: "Flexible Commission", desc: "Set CPA, revenue share, or hybrid — you control the rate" },
    { icon: <Zap size={18} />, title: "Featured Placement", desc: "Upgrade to Featured status — appear first in your sector with a gold badge" },
  ];

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 flex flex-col items-center text-center gap-6">
        <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "rgba(48,209,88,0.15)", border: "2px solid #30d158" }}>
          <CheckCircle size={40} style={{ color: "#30d158" }} />
        </div>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "48px", fontWeight: 900, letterSpacing: "0.06em", color: "#30d158", textShadow: "0 0 30px rgba(48,209,88,0.5)" }}>
          APPLICATION RECEIVED
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "var(--muted-foreground)", lineHeight: 1.7 }}>
          Thanks, <strong style={{ color: "#eeeeff" }}>{form.company}</strong>! Our partnerships team will review your application and reach out to <strong style={{ color: "#eeeeff" }}>{form.contactEmail}</strong> within <strong style={{ color: "#eeeeff" }}>2 business days</strong> to set up your affiliate tracking link and confirm your commission structure.
        </p>
        <div className="p-4 rounded-xl w-full" style={{ background: "rgba(255,214,10,0.08)", border: "1px solid rgba(255,214,10,0.25)" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#ffd60a", letterSpacing: "0.1em" }}>
            YOUR REFERRAL TAG WILL BE: <strong>?ref=aicircusmall&utm_content={form.company.toLowerCase().replace(/\s+/g, "_")}</strong>
          </p>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "14px", letterSpacing: "0.1em", color: "var(--muted-foreground)" }}
        >
          ← Submit another application
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.25em", color: "#30d158", marginBottom: "8px" }}>FOR AI SERVICE PROVIDERS</p>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, letterSpacing: "0.04em", color: "#fff", lineHeight: 1, textShadow: "0 0 40px rgba(48,209,88,0.3)" }}>
          JOIN THE <span style={{ color: "#30d158" }}>CIRCUS</span>
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "var(--muted-foreground)", marginTop: "10px", maxWidth: "500px", margin: "10px auto 0" }}>
          List your AI service, set your commission rate, and reach millions of users actively searching for AI tools.
        </p>
      </div>

      {/* Perks */}
      <div className="grid gap-4 mb-10" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
        {perks.map(p => (
          <div key={p.title} className="p-5 rounded-xl" style={{ background: "#0c0c18", border: "1px solid rgba(48,209,88,0.15)" }}>
            <div className="mb-3" style={{ color: "#30d158" }}>{p.icon}</div>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "16px", letterSpacing: "0.06em", color: "#eeeeff", marginBottom: "4px" }}>{p.title}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "var(--muted-foreground)", lineHeight: 1.5 }}>{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="rounded-2xl p-8" style={{ background: "#0c0c18", border: "1px solid rgba(48,209,88,0.2)" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", color: "#30d158", marginBottom: "24px" }}>PARTNER APPLICATION</p>

        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {[
            { key: "company", label: "COMPANY / SERVICE NAME", placeholder: "e.g. Harvey AI", required: true },
            { key: "website", label: "WEBSITE URL", placeholder: "https://yourservice.ai", required: true },
            { key: "contactName", label: "CONTACT NAME", placeholder: "Your name", required: true },
            { key: "contactEmail", label: "CONTACT EMAIL", placeholder: "partner@yourservice.ai", required: true },
          ].map(f => (
            <div key={f.key}>
              <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.18em", color: "var(--muted-foreground)", display: "block", marginBottom: "6px" }}>{f.label}</label>
              <input
                required={f.required}
                value={form[f.key as keyof typeof form]}
                onChange={e => set(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full px-4 py-2.5 rounded-xl outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#eeeeff", fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }}
                onFocus={e => (e.target.style.borderColor = "#30d158")}
                onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
              />
            </div>
          ))}

          {/* Category dropdown */}
          <div>
            <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.18em", color: "var(--muted-foreground)", display: "block", marginBottom: "6px" }}>SECTOR / CATEGORY</label>
            <select
              required
              value={form.category}
              onChange={e => set("category", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl outline-none transition-all"
              style={{ background: "#12121f", border: "1px solid rgba(255,255,255,0.08)", color: form.category ? "#eeeeff" : "#666688", fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }}
            >
              <option value="">Select a sector…</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Commission type */}
          <div>
            <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.18em", color: "var(--muted-foreground)", display: "block", marginBottom: "6px" }}>COMMISSION TYPE</label>
            <select
              required
              value={form.commissionType}
              onChange={e => set("commissionType", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl outline-none"
              style={{ background: "#12121f", border: "1px solid rgba(255,255,255,0.08)", color: form.commissionType ? "#eeeeff" : "#666688", fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }}
            >
              <option value="">Select type…</option>
              {commissionTypes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Rate + Cookie */}
          <div>
            <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.18em", color: "var(--muted-foreground)", display: "block", marginBottom: "6px" }}>COMMISSION RATE (% OR $)</label>
            <input
              required
              value={form.commissionRate}
              onChange={e => set("commissionRate", e.target.value)}
              placeholder="e.g. 25 (%) or 150 ($)"
              className="w-full px-4 py-2.5 rounded-xl outline-none transition-all"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#eeeeff", fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }}
              onFocus={e => (e.target.style.borderColor = "#30d158")}
              onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
            />
          </div>

          <div>
            <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.18em", color: "var(--muted-foreground)", display: "block", marginBottom: "6px" }}>COOKIE WINDOW (DAYS)</label>
            <input
              value={form.cookieDays}
              onChange={e => set("cookieDays", e.target.value)}
              placeholder="30"
              className="w-full px-4 py-2.5 rounded-xl outline-none transition-all"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#eeeeff", fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }}
              onFocus={e => (e.target.style.borderColor = "#30d158")}
              onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
            />
          </div>

          {/* Affiliate network */}
          <div>
            <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.18em", color: "var(--muted-foreground)", display: "block", marginBottom: "6px" }}>AFFILIATE NETWORK</label>
            <select
              value={form.network}
              onChange={e => set("network", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl outline-none"
              style={{ background: "#12121f", border: "1px solid rgba(255,255,255,0.08)", color: form.network ? "#eeeeff" : "#666688", fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }}
            >
              <option value="">Select network…</option>
              {networks.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          {/* Tracking URL */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.18em", color: "var(--muted-foreground)", display: "block", marginBottom: "6px" }}>YOUR AFFILIATE / TRACKING BASE URL (OPTIONAL)</label>
            <input
              value={form.trackingUrl}
              onChange={e => set("trackingUrl", e.target.value)}
              placeholder="https://yourservice.ai/?via=aicircusmall"
              className="w-full px-4 py-2.5 rounded-xl outline-none transition-all"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#eeeeff", fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }}
              onFocus={e => (e.target.style.borderColor = "#30d158")}
              onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
            />
          </div>

          {/* Notes */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.18em", color: "var(--muted-foreground)", display: "block", marginBottom: "6px" }}>ADDITIONAL NOTES</label>
            <textarea
              value={form.notes}
              onChange={e => set("notes", e.target.value)}
              placeholder="Anything else we should know about your program…"
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl outline-none transition-all resize-none"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#eeeeff", fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }}
              onFocus={e => (e.target.style.borderColor = "#30d158")}
              onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-4 rounded-xl transition-all"
          style={{ background: "linear-gradient(135deg, #30d158, #00e5ff)", color: "#000", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "18px", letterSpacing: "0.12em", boxShadow: "0 0 30px rgba(48,209,88,0.4)" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 0 50px rgba(48,209,88,0.6)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(48,209,88,0.4)"}
        >
          SUBMIT PARTNER APPLICATION →
        </button>
      </form>
    </div>
  );
}
