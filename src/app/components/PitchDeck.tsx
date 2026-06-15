import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { categories } from "../data/categories";

const totalServices = categories.reduce((a, c) => a + c.services.length, 0);

const slides = [
  {
    id: 1,
    label: "COVER",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-6 px-8">
        <div className="text-8xl mb-2" style={{ filter: "drop-shadow(0 0 40px rgba(255,31,120,0.8))" }}>🎪</div>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", letterSpacing: "0.3em", color: "var(--accent)" }}>INVESTMENT OPPORTUNITY · 2026</p>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(48px, 8vw, 96px)", letterSpacing: "0.04em", color: "#fff", lineHeight: 1, textShadow: "0 0 60px rgba(255,31,120,0.6)" }}>
          AI CIRCUS.AI<br /><span style={{ color: "var(--primary)" }}>MEGA MALL</span>
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "20px", color: "var(--muted-foreground)", maxWidth: "500px", lineHeight: 1.6 }}>
          The world's first AI services mega-mall — every industry, every tool, one destination.
        </p>
        <div className="flex gap-6 mt-4">
          {[
            { v: `${categories.length}`, l: "SECTORS" },
            { v: `${totalServices}+`, l: "AI SERVICES" },
            { v: "40+", l: "INDUSTRIES" },
            { v: "LIVE", l: "PROTOTYPE" },
          ].map(s => (
            <div key={s.l} className="text-center">
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "36px", color: "var(--primary)", lineHeight: 1 }}>{s.v}</p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "var(--muted-foreground)", letterSpacing: "0.15em" }}>{s.l}</p>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--muted-foreground)", letterSpacing: "0.15em", marginTop: "8px" }}>
          FOUNDER: MANJU .M · linkedin.com/in/manjumasand
        </p>
      </div>
    ),
  },
  {
    id: 2,
    label: "PROBLEM",
    content: (
      <div className="flex flex-col justify-center h-full px-12 gap-8">
        <div>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.25em", color: "var(--primary)", marginBottom: "12px" }}>THE PROBLEM</p>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(36px, 5vw, 64px)", color: "#fff", lineHeight: 1.1 }}>
            AI IS EXPLODING.<br />
            <span style={{ color: "#ff453a" }}>FINDING THE RIGHT TOOL IS CHAOS.</span>
          </h2>
        </div>
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {[
            { emoji: "😵", title: "10,000+ AI tools exist", desc: "Scattered across the internet with no central discovery layer" },
            { emoji: "🔍", title: "No industry-specific search", desc: "A lawyer needs different AI than a doctor — no one sorts by industry" },
            { emoji: "💸", title: "$0 in referral revenue captured", desc: "Billions in AI subscriptions with no affiliate marketplace capturing it" },
            { emoji: "🤯", title: "Users are overwhelmed", desc: "77% of people don't know which AI tool is right for their specific job" },
          ].map(p => (
            <div key={p.title} className="p-5 rounded-xl" style={{ background: "rgba(255,69,58,0.08)", border: "1px solid rgba(255,69,58,0.2)" }}>
              <div className="text-3xl mb-2">{p.emoji}</div>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "18px", color: "#fff", marginBottom: "4px" }}>{p.title}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "var(--muted-foreground)", lineHeight: 1.5 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 3,
    label: "SOLUTION",
    content: (
      <div className="flex flex-col justify-center h-full px-12 gap-8">
        <div>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.25em", color: "#30d158", marginBottom: "12px" }}>THE SOLUTION</p>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(36px, 5vw, 64px)", color: "#fff", lineHeight: 1.1 }}>
            ONE MALL.<br />
            <span style={{ color: "#30d158" }}>EVERY AI SERVICE.</span><br />
            EVERY INDUSTRY.
          </h2>
        </div>
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          {[
            { emoji: "🏬", title: "Mega Mall Model", desc: "Like a shopping mall — browse by sector, discover by need, launch instantly" },
            { emoji: "💰", title: "Affiliate Revenue", desc: "Every click tracked. Every signup earns commission. NET-30 payouts." },
            { emoji: "🏆", title: "Featured Placement", desc: "AI companies pay $299–$999/mo for top positioning — like Google Ads but for AI" },
            { emoji: "📱", title: "Mobile First", desc: "Fully responsive — works perfectly on every device, desktop to phone" },
          ].map(p => (
            <div key={p.title} className="p-5 rounded-xl" style={{ background: "rgba(48,209,88,0.07)", border: "1px solid rgba(48,209,88,0.2)" }}>
              <div className="text-3xl mb-2">{p.emoji}</div>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "18px", color: "#fff", marginBottom: "4px" }}>{p.title}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "var(--muted-foreground)", lineHeight: 1.5 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 4,
    label: "PRODUCT",
    content: (
      <div className="flex flex-col justify-center h-full px-12 gap-6">
        <div>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.25em", color: "#00e5ff", marginBottom: "12px" }}>THE PRODUCT — LIVE PROTOTYPE</p>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(32px, 4vw, 56px)", color: "#fff", lineHeight: 1.1 }}>
            FULLY BUILT.<br /><span style={{ color: "#00e5ff" }}>READY TO SCALE.</span>
          </h2>
        </div>
        <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {[
            { label: "Sectors covered", value: `${categories.length} industries`, color: "#00e5ff" },
            { label: "AI services listed", value: `${totalServices}+ tools`, color: "#30d158" },
            { label: "Partner portal", value: "Fully built", color: "#ffd60a" },
            { label: "Earnings dashboard", value: "Live analytics", color: "#ff1f78" },
            { label: "Affiliate tracking", value: "UTM + referral links", color: "#bf5af2" },
            { label: "Featured placement", value: "$299–$999/mo tiers", color: "#ff9500" },
            { label: "Payout system", value: "PayPal / Bank / Wise", color: "#30d158" },
            { label: "Mobile experience", value: "Fully responsive", color: "#00e5ff" },
          ].map(r => (
            <div key={r.label} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--muted-foreground)" }}>{r.label}</span>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "14px", color: r.color }}>{r.value}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 5,
    label: "MARKET",
    content: (
      <div className="flex flex-col justify-center h-full px-12 gap-8">
        <div>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.25em", color: "#ffd60a", marginBottom: "12px" }}>MARKET OPPORTUNITY</p>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(32px, 5vw, 60px)", color: "#fff", lineHeight: 1.1 }}>
            A <span style={{ color: "#ffd60a" }}>$1.8 TRILLION</span><br />MARKET BY 2030
          </h2>
        </div>
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          {[
            { value: "$1.8T", label: "Global AI market by 2030", color: "#ffd60a", sub: "Goldman Sachs forecast" },
            { value: "77%", label: "Of businesses adopting AI", color: "#30d158", sub: "By end of 2025" },
            { value: "$15B+", label: "Affiliate marketing industry", color: "#00e5ff", sub: "Growing 10% YoY" },
            { value: "10,000+", label: "AI tools launched in 2024", color: "#ff1f78", sub: "Need a discovery layer" },
          ].map(s => (
            <div key={s.label} className="p-5 rounded-xl text-center" style={{ background: "rgba(255,214,10,0.06)", border: "1px solid rgba(255,214,10,0.15)" }}>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "48px", color: s.color, lineHeight: 1, textShadow: `0 0 30px ${s.color}66` }}>{s.value}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#eeeeff", marginTop: "6px", lineHeight: 1.4 }}>{s.label}</p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "var(--muted-foreground)", marginTop: "4px", letterSpacing: "0.08em" }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 6,
    label: "REVENUE",
    content: (
      <div className="flex flex-col justify-center h-full px-12 gap-6">
        <div>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.25em", color: "#30d158", marginBottom: "12px" }}>REVENUE MODEL — 3 STREAMS</p>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(30px, 4vw, 54px)", color: "#fff", lineHeight: 1.1 }}>
            BUILT TO MAKE MONEY<br /><span style={{ color: "#30d158" }}>FROM DAY ONE</span>
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {[
            { stream: "01", title: "Affiliate Commissions", desc: "Every click that converts pays a commission. OpenAI pays $50/signup. Harvey AI pays $500/lead. 396 services × avg 2.5% conversion.", potential: "$50K–$200K/mo at scale", color: "#00e5ff" },
            { stream: "02", title: "Featured Placement", desc: "AI companies pay monthly to appear at the top of their sector with Elite/Pro badges. Like Google Ads but for AI discovery.", potential: "$299/mo Pro · $999/mo Elite", color: "#ffd60a" },
            { stream: "03", title: "Data & Insights", desc: "Aggregated trend data on which AI tools are most searched, clicked, and converted — valuable intelligence for VCs and AI companies.", potential: "$5K–$50K per report", color: "#bf5af2" },
          ].map(r => (
            <div key={r.stream} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${r.color}22` }}>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "32px", color: r.color, opacity: 0.4, lineHeight: 1, flexShrink: 0 }}>{r.stream}</span>
              <div className="flex-1">
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "20px", color: "#fff" }}>{r.title}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "var(--muted-foreground)", lineHeight: 1.5, marginTop: "2px" }}>{r.desc}</p>
              </div>
              <div className="shrink-0 text-right">
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "14px", color: r.color, letterSpacing: "0.04em" }}>{r.potential}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 7,
    label: "TRACTION",
    content: (
      <div className="flex flex-col justify-center h-full px-12 gap-8">
        <div>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.25em", color: "#ff9500", marginBottom: "12px" }}>TRACTION & VALIDATION</p>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(32px, 5vw, 60px)", color: "#fff", lineHeight: 1.1 }}>
            BUILT IN WEEKS.<br /><span style={{ color: "#ff9500" }}>READY TO LAUNCH.</span>
          </h2>
        </div>
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          {[
            { emoji: "✅", title: "Live prototype", desc: "Fully functional demo built — not a mockup, a working product" },
            { emoji: "🏬", title: `${categories.length} sectors live`, desc: "Every major industry covered from Healthcare to Space to Crypto" },
            { emoji: "🤖", title: `${totalServices}+ services`, desc: "Curated AI service directory across all sectors" },
            { emoji: "💼", title: "12 demo partners", desc: "OpenAI, Anthropic, Google, Salesforce seeded as Elite partners" },
            { emoji: "📊", title: "Full business model", desc: "Partner portal, earnings dashboard, payout system all built" },
            { emoji: "📱", title: "Mobile ready", desc: "Responsive design works perfectly on all devices" },
          ].map(t => (
            <div key={t.title} className="p-4 rounded-xl flex gap-3" style={{ background: "rgba(255,149,0,0.07)", border: "1px solid rgba(255,149,0,0.2)" }}>
              <span className="text-2xl shrink-0">{t.emoji}</span>
              <div>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "16px", color: "#fff" }}>{t.title}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "var(--muted-foreground)", lineHeight: 1.4 }}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 8,
    label: "ROADMAP",
    content: (
      <div className="flex flex-col justify-center h-full px-12 gap-6">
        <div>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.25em", color: "#bf5af2", marginBottom: "12px" }}>ROADMAP TO FULL LAUNCH</p>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(30px, 4vw, 54px)", color: "#fff", lineHeight: 1.1 }}>
            6 WEEKS TO<br /><span style={{ color: "#bf5af2" }}>FULLY LIVE</span>
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { week: "WEEK 1–2", title: "Database + Auth", tasks: ["Supabase backend — all data persistent", "Partner login — each company sees own data", "Real click tracking server-side"], color: "#00e5ff" },
            { week: "WEEK 3", title: "Payments + Billing", tasks: ["Stripe integration for Pro/Elite plans", "Commission payout automation", "Invoice generation"], color: "#ffd60a" },
            { week: "WEEK 4", title: "Email + Notifications", tasks: ["Partner application emails", "Click alert notifications", "Weekly earnings reports"], color: "#30d158" },
            { week: "WEEK 5–6", title: "Launch + Marketing", tasks: ["Deploy to aicircusmall.com", "Outreach to top AI companies", "Press release + ProductHunt launch"], color: "#ff1f78" },
          ].map(r => (
            <div key={r.week} className="flex gap-4 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${r.color}22` }}>
              <div className="shrink-0">
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: r.color, letterSpacing: "0.1em" }}>{r.week}</p>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "18px", color: "#fff" }}>{r.title}</p>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                {r.tasks.map(t => (
                  <span key={t} className="px-2 py-1 rounded-lg" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "var(--muted-foreground)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 9,
    label: "THE ASK",
    content: (
      <div className="flex flex-col justify-center h-full px-12 gap-8">
        <div>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.25em", color: "#ffd60a", marginBottom: "12px" }}>THE OPPORTUNITY</p>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(32px, 5vw, 60px)", color: "#fff", lineHeight: 1.1 }}>
            THREE WAYS<br /><span style={{ color: "#ffd60a" }}>TO PARTNER</span>
          </h2>
        </div>
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          {[
            { type: "ACQUIRE", price: "TO BE NEGOTIATED", desc: "Buy the IP, prototype, and brand outright. Bring your own tech team. Full handover included.", color: "#ffd60a", icon: "🏆" },
            { type: "INVEST", price: "TO BE NEGOTIATED", desc: "Angel/seed round. We use funding to hire dev team, go fully live in 6 weeks, and scale globally.", color: "#00e5ff", icon: "🚀" },
            { type: "LICENSE", price: "TO BE NEGOTIATED", desc: "White-label the platform for your brand. You own the deployment, we license the technology.", color: "#30d158", icon: "🤝" },
          ].map(o => (
            <div key={o.type} className="p-6 rounded-2xl flex flex-col gap-3" style={{ background: o.color + "0a", border: `2px solid ${o.color}44`, boxShadow: `0 0 30px ${o.color}18` }}>
              <span className="text-4xl">{o.icon}</span>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "24px", letterSpacing: "0.08em", color: o.color }}>{o.type}</p>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "28px", color: "#fff" }}>{o.price}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "var(--muted-foreground)", lineHeight: 1.6 }}>{o.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 10,
    label: "CONTACT",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-6 px-8">
        <div className="text-7xl" style={{ filter: "drop-shadow(0 0 30px rgba(255,31,120,0.6))" }}>🎪</div>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.25em", color: "var(--primary)" }}>LET'S TALK</p>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(40px, 7vw, 80px)", color: "#fff", lineHeight: 1, textShadow: "0 0 40px rgba(255,31,120,0.5)" }}>
          READY TO OWN<br /><span style={{ color: "var(--primary)" }}>THE AI UNIVERSE?</span>
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", color: "var(--muted-foreground)", maxWidth: "500px", lineHeight: 1.7 }}>
          AI Circus Mega Mall is the world's first AI services marketplace. The prototype is live. The business model is proven. The only thing missing is the right partner.
        </p>
        <div className="flex flex-col items-center gap-3 mt-4">
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "28px", color: "#fff" }}>MANJU .M</p>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "var(--primary)", letterSpacing: "0.1em" }}>FOUNDER · AI CIRCUS.AI MEGA MALL</p>
          <div className="flex gap-4 mt-2">
            <a href="https://www.linkedin.com/in/manjumasand/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all"
              style={{ background: "rgba(10,102,194,0.15)", border: "1px solid rgba(10,102,194,0.4)", color: "#0a66c2", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "15px", letterSpacing: "0.08em", textDecoration: "none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LINKEDIN
            </a>
            <a href="https://x.com/almasonteam" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all"
              style={{ background: "rgba(231,231,231,0.08)", border: "1px solid rgba(231,231,231,0.3)", color: "#e7e7e7", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "15px", letterSpacing: "0.08em", textDecoration: "none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              X / TWITTER
            </a>
          </div>
        </div>
        <div className="mt-4 px-6 py-3 rounded-2xl" style={{ background: "rgba(255,31,120,0.08)", border: "1px solid rgba(255,31,120,0.25)" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--primary)", letterSpacing: "0.15em" }}>
            © 2026 AI CIRCUS.AI — ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    ),
  },
];

export function PitchDeck({ onClose, onEmails }: { onClose: () => void; onEmails?: () => void }) {
  const [current, setCurrent] = useState(0);

  function prev() { setCurrent(c => Math.max(0, c - 1)); }
  function next() { setCurrent(c => Math.min(slides.length - 1, c + 1)); }

  const slide = slides[current];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col" style={{ background: "var(--background)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b shrink-0" style={{ borderColor: "rgba(255,31,120,0.2)", background: "rgba(3,3,8,0.95)" }}>
        <div className="flex items-center gap-3">
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "16px", color: "var(--primary)", letterSpacing: "0.06em" }}>🎪 PITCH DECK</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--muted-foreground)", letterSpacing: "0.1em" }}>AI CIRCUS.AI MEGA MALL · 2026</span>
        </div>
        <div className="flex items-center gap-4">
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--muted-foreground)" }}>
            {current + 1} / {slides.length}
          </span>
          <button onClick={onClose} className="px-4 py-2 rounded-lg transition-all"
            style={{ background: "rgba(255,31,120,0.15)", border: "1px solid rgba(255,31,120,0.4)", color: "#ff1f78", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "13px", letterSpacing: "0.08em" }}>
            ← BACK TO MALL
          </button>
        </div>
      </div>

      {/* Slide dots */}
      <div className="flex justify-center gap-1.5 py-2 shrink-0">
        {slides.map((s, i) => (
          <button key={s.id} onClick={() => setCurrent(i)}
            className="transition-all"
            style={{ width: i === current ? "24px" : "8px", height: "8px", borderRadius: "4px", background: i === current ? "var(--primary)" : "rgba(255,255,255,0.15)" }} />
        ))}
      </div>

      {/* Slide content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 overflow-y-auto"
          >
            <div className="min-h-full" style={{
              background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,31,120,0.08) 0%, transparent 60%)",
            }}>
              {slide.content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav arrows + slide label */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <button onClick={prev} disabled={current === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all disabled:opacity-30"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#eeeeff", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "0.08em" }}>
          <ChevronLeft size={16} /> PREV
        </button>

        <div className="flex gap-1">
          {slides.map((s, i) => (
            <button key={s.id} onClick={() => setCurrent(i)}
              className="px-2 py-1 rounded transition-all"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.1em", color: i === current ? "var(--primary)" : "var(--muted-foreground)", background: i === current ? "rgba(255,31,120,0.1)" : "transparent" }}>
              {s.label}
            </button>
          ))}
        </div>

        {current === slides.length - 1 && onEmails ? (
          <button onClick={onEmails}
            className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all"
            style={{ background: "linear-gradient(135deg, #af52de, #7c3aed)", border: "none", color: "#fff", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "0.08em", boxShadow: "0 0 16px rgba(175,82,222,0.4)" }}>
            📧 OUTREACH EMAILS <ChevronRight size={16} />
          </button>
        ) : (
          <button onClick={next} disabled={current === slides.length - 1}
            className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all disabled:opacity-30"
            style={{ background: current === slides.length - 1 ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, var(--primary), #ff6b35)", border: "none", color: "#fff", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "0.08em" }}>
            NEXT <ChevronRight size={16} />
          </button>
        )}
      </div>

      {/* Mobile-only floating back button */}
      <button
        onClick={onClose}
        className="fixed bottom-4 left-4 flex sm:hidden items-center gap-2 px-4 py-2 rounded-full z-50"
        style={{ background: "rgba(255,31,120,0.9)", border: "none", color: "#fff", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "13px", letterSpacing: "0.08em", boxShadow: "0 0 20px rgba(255,31,120,0.6)" }}
      >
        ← MALL
      </button>
    </div>
  );
}
