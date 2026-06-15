import { useState, useMemo, useEffect } from "react";
import circusBannerImg from "../imports/ChatGPT_Image_Jun_15__2026__06_49_30_AM.png";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Search, Zap, X } from "lucide-react";
import { categories, type Category, type AIService } from "./data/categories";
import { loadPartners, seedDemoPartners, clearOldSeeds } from "./data/partners";
import { CategoryTile } from "./components/CategoryTile";
import { ServiceCard } from "./components/ServiceCard";
import { Marquee } from "./components/Marquee";
import { SectorSwitcher } from "./components/SectorSwitcher";
import { LaunchModal } from "./components/LaunchModal";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import { PartnerSignup } from "./components/PartnerSignup";
import { PartnerPortal } from "./components/PartnerPortal";
import { PitchDeck } from "./components/PitchDeck";
import { OutreachEmails } from "./components/OutreachEmails";

const marqueeItems = [
  "AI GIANTS", "MULTI-AGENT AI", "EDUCATION", "HEALTH CARE", "SHOPPING", "REAL ESTATE", "LEGAL",
  "SURGERY", "TRAVEL", "NIGHT OUT", "AI FILMS", "INSTANT AI MOVIES", "AI MUSIC",
  "JOBS", "SCIENCE", "SPACE", "BUSINESS", "IPO", "NEWS", "STOCKS", "RESEARCH", "MAPS",
  "SPORTS & FITNESS AI", "FASHION & BEAUTY", "GAMING & ESPORTS", "CYBERSECURITY",
  "FINANCE & BANKING", "ENERGY & CLIMATE", "ARCHITECTURE", "TRANSPORTATION",
  "GOVERNMENT & CIVIC", "RELIGION & SPIRIT", "DATING & LOVE", "PETS & ANIMALS",
  "INSURANCE", "MANUFACTURING", "AGRICULTURE", "AI CERTIFICATION", "CRYPTO & WEB3 AI",
];

export default function App() {
  const [selected, setSelected] = useState<Category | null>(null);
  const [search, setSearch] = useState("");
  const [launching, setLaunching] = useState<AIService | null>(null);
  const [view, setView] = useState<"mall" | "analytics" | "partner" | "apply" | "pitch" | "emails">("mall");
  const [partnerCount, setPartnerCount] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    clearOldSeeds();
    seedDemoPartners();
    setPartnerCount(loadPartners().length);
  }, [view]);

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return categories;
    const q = search.toLowerCase();
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.services.some(
          (s) => s.name.toLowerCase().includes(q) || s.tag.toLowerCase().includes(q)
        )
    );
  }, [search]);

  const filteredServices = useMemo(() => {
    if (!selected) return [];
    if (!search.trim()) return selected.services;
    const q = search.toLowerCase();
    return selected.services.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tag.toLowerCase().includes(q)
    );
  }, [selected, search]);

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "var(--background)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <SectorSwitcher
        current={selected}
        onSelect={(cat) => { setSelected(cat); setSearch(""); }}
      />
      <LaunchModal
        service={launching}
        accentColor={selected?.color ?? "#ff1f78"}
        glow={selected?.glow ?? "rgba(255,31,120,0.4)"}
        sectorId={selected?.id ?? "mall"}
        sectorName={selected?.name ?? "AI CIRCUS.AI MEGA MALL"}
        onClose={() => setLaunching(null)}
      />
      {/* Top nav bar */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 border-b"
        style={{
          background: "rgba(3,3,8,0.92)",
          backdropFilter: "blur(16px)",
          borderColor: "rgba(255,31,120,0.15)",
        }}
      >
        {/* Left: logo + breadcrumb */}
        <div className="flex items-center gap-0 min-w-0">
          <button
            onClick={() => { setSelected(null); setSearch(""); setView("mall"); }}
            className="flex items-center gap-2 shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                letterSpacing: "0.06em",
                fontSize: "clamp(14px, 2.5vw, 20px)",
                color: "var(--primary)",
                textShadow: "0 0 20px rgba(255,31,120,0.8)",
                whiteSpace: "nowrap",
              }}
            >
              🎪 AI CIRCUS.AI · MEGA MALL
            </span>
          </button>

          {/* Breadcrumb */}
          <AnimatePresence>
            {selected && (
              <motion.div
                className="flex items-center gap-2 ml-3 min-w-0"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "14px" }}>›</span>
                <span
                  className="truncate px-2 py-0.5 rounded-full text-xs"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: "12px",
                    letterSpacing: "0.08em",
                    color: selected.color,
                    background: selected.color + "18",
                    border: `1px solid ${selected.color}33`,
                    maxWidth: "180px",
                  }}
                >
                  {selected.emoji} {selected.name}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2">
          {/* Partner signup CTA — always visible */}
          <button
            onClick={() => { setView("apply"); setSelected(null); }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all shrink-0"
            style={{
              background: "linear-gradient(135deg, rgba(255,31,120,0.8), rgba(255,31,120,0.5))",
              border: "1px solid rgba(255,31,120,0.6)",
              color: "#fff",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: "12px",
              letterSpacing: "0.08em",
              boxShadow: "0 0 12px rgba(255,31,120,0.3)",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(255,31,120,0.6)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 0 12px rgba(255,31,120,0.3)"}
          >
            <span>+</span>
            <span className="hidden sm:inline"> LIST YOUR AI</span>
          </button>

          {/* Nav links — desktop only, bottom nav handles mobile */}
          <div className="hidden sm:flex items-center gap-1">
            {/* Vision — opens external site in new tab */}
            <a
              href="https://sand-poise-23509582.figma.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "12px", letterSpacing: "0.08em", color: "#af52de", background: "transparent", border: "1px solid transparent", textDecoration: "none" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#af52de15"; (e.currentTarget as HTMLElement).style.borderColor = "#af52de44"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "transparent"; }}
            >
              🔮 VISION
            </a>
            {([
              { id: "analytics" as const, label: "💰 EARNINGS", color: "#ffd60a" },
              { id: "partner" as const, label: "🤝 PARTNERS", color: "#30d158" },
              { id: "pitch" as const, label: "📊 PITCH", color: "#bf5af2" },
            ]).map(n => (
              <button
                key={n.id}
                onClick={() => { setView(n.id); setSelected(null); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "12px", letterSpacing: "0.08em",
                  color: view === n.id ? n.color : "var(--muted-foreground)",
                  background: view === n.id ? n.color + "15" : "transparent",
                  border: `1px solid ${view === n.id ? n.color + "44" : "transparent"}`,
                }}
              >
                {n.label}
                {n.id === "partner" && partnerCount > 0 && (
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", background: "#30d15822", border: "1px solid #30d15855", color: "#30d158", borderRadius: "999px", padding: "1px 5px" }}>{partnerCount}</span>
                )}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search AI services…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-8 py-2 rounded-full text-sm outline-none transition-all"
              style={{
                background: "var(--muted)",
                color: "var(--foreground)",
                border: "1px solid rgba(255,31,120,0.2)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                width: "clamp(120px, 30vw, 240px)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--primary)";
                e.target.style.boxShadow = "0 0 12px rgba(255,31,120,0.3)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,31,120,0.2)";
                e.target.style.boxShadow = "none";
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={12} />
              </button>
            )}
          </div>

          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
            style={{
              background: "rgba(0,229,255,0.1)",
              border: "1px solid rgba(0,229,255,0.3)",
              color: "var(--accent)",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.06em",
            }}
          >
            <Zap size={11} />
            {categories.length} SECTORS
          </div>
        </div>
      </header>

      {/* Analytics & Partner views */}
      {view === "analytics" && (
        <motion.div key="analytics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <AnalyticsDashboard />
        </motion.div>
      )}
      {view === "partner" && (
        <motion.div key="partner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <PartnerPortal onApply={() => setView("apply")} />
        </motion.div>
      )}
      {view === "apply" && (
        <motion.div key="apply" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <PartnerSignup onSuccess={() => setView("partner")} />
        </motion.div>
      )}
      {view === "pitch" && (
        <motion.div key="pitch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <PitchDeck onClose={() => setView("mall")} onEmails={() => setView("emails")} />
        </motion.div>
      )}
      {view === "emails" && (
        <motion.div key="emails" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <OutreachEmails onClose={() => setView("pitch")} />
        </motion.div>
      )}

      {view === "mall" && <AnimatePresence mode="wait">
        {!selected ? (
          /* ─── MALL HOME VIEW ─── */
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            {/* ── AI CIRCUS BRAND BANNER ── */}
            <div className="w-full">
              <img
                src={circusBannerImg}
                alt="AI Circus Mega Mall — The World's Biggest AI Destination"
                className="w-full h-auto block"
              />
            </div>

            {/* Hero */}
            <div
              className="relative overflow-hidden pt-10 pb-12 px-6 text-center"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,31,120,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(0,229,255,0.12) 0%, transparent 70%)",
              }}
            >
              {/* grid overlay */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <p
                  className="mb-3 tracking-[0.3em] uppercase"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    color: "var(--accent)",
                  }}
                >
                  The AI Services Universe
                </p>
                <h1
                  className="mb-4 leading-none"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "clamp(52px, 10vw, 120px)",
                    fontWeight: 900,
                    letterSpacing: "0.04em",
                    color: "var(--foreground)",
                    textShadow:
                      "0 0 60px rgba(255,31,120,0.5), 0 0 120px rgba(255,31,120,0.2)",
                  }}
                >
                  AI CIRCUS.AI{" "}
                  <span style={{ color: "var(--primary)" }}>MEGA MALL</span>
                </h1>
                <p
                  className="max-w-xl mx-auto text-muted-foreground"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px" }}
                >
                  Every AI service, every industry — one destination. Navigate the
                  world's most complete AI marketplace.
                </p>
              </motion.div>

              {/* Stats row */}
              <motion.div
                className="flex flex-wrap justify-center gap-6 mt-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {[
                  { label: "SECTORS", value: `${categories.length}` },
                  {
                    label: "AI SERVICES",
                    value: `${categories.reduce((a, c) => a + c.services.length, 0)}+`,
                  },
                  { label: "INDUSTRIES", value: "EVERY ONE" },
                  { label: "STATUS", value: "LIVE" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center gap-1 px-4"
                    style={{ borderLeft: "1px solid rgba(255,31,120,0.2)" }}
                  >
                    <span
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "28px",
                        fontWeight: 800,
                        color: "var(--primary)",
                        textShadow: "0 0 20px rgba(255,31,120,0.5)",
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "9px",
                        color: "var(--muted-foreground)",
                        letterSpacing: "0.15em",
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Marquee */}
            <div
              className="py-3 border-y"
              style={{
                borderColor: "rgba(255,31,120,0.15)",
                background: "rgba(255,31,120,0.04)",
              }}
            >
              <Marquee
                items={marqueeItems}
                speed={50}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "var(--muted-foreground)",
                }}
              />
            </div>

            {/* Category grid */}
            <div className="px-6 py-10 max-w-7xl mx-auto">
              {search && (
                <p
                  className="mb-6 text-sm text-muted-foreground"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {filteredCategories.length} sectors match "{search}"
                </p>
              )}

              {filteredCategories.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                  <span className="text-5xl">🎪</span>
                  <p className="text-muted-foreground text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    No sectors found for "{search}"
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {/* AI Giants — full-width hero tile */}
                  {filteredCategories.filter(c => c.id === "aigiants").map((cat, i) => (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0, duration: 0.45 }}
                    >
                      <button
                        onClick={() => { setSelected(cat); setSearch(""); }}
                        className="group relative w-full rounded-2xl p-8 text-left transition-all duration-300 overflow-hidden border"
                        style={{
                          background: "var(--card)",
                          borderColor: "rgba(255,214,10,0.25)",
                          boxShadow: "0 0 60px rgba(255,214,10,0.08)",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.borderColor = "#ffd60a99";
                          el.style.boxShadow = "0 0 80px rgba(255,214,10,0.25), inset 0 0 60px rgba(255,214,10,0.04)";
                          el.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.borderColor = "rgba(255,214,10,0.25)";
                          el.style.boxShadow = "0 0 60px rgba(255,214,10,0.08)";
                          el.style.transform = "translateY(0)";
                        }}
                      >
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #ffd60a 0%, transparent 50%), radial-gradient(circle at 80% 50%, #ff1f78 0%, transparent 50%)" }} />
                        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #ffd60a66, transparent)" }} />
                        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #ffd60a33, transparent)" }} />
                        <div className="relative flex flex-wrap items-center justify-between gap-6">
                          <div className="flex items-center gap-6">
                            <span className="text-6xl" style={{ filter: "drop-shadow(0 0 20px rgba(255,214,10,0.8))" }}>👑</span>
                            <div>
                              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.25em", color: "#ffd60a", marginBottom: "4px" }}>FEATURED SECTOR</p>
                              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 900, letterSpacing: "0.06em", color: "#ffd60a", textShadow: "0 0 30px rgba(255,214,10,0.6)", lineHeight: 1 }}>AI GIANTS</h3>
                              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "var(--muted-foreground)", marginTop: "6px" }}>The titans powering every AI service on Earth</p>
                            </div>
                          </div>
                          <span className="px-3 py-1.5 rounded-full text-xs opacity-60 group-hover:opacity-100 transition-opacity shrink-0" style={{ background: "rgba(255,214,10,0.15)", border: "1px solid rgba(255,214,10,0.4)", color: "#ffd60a", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px" }}>ENTER →</span>
                        </div>

                        {/* Scrolling giants name strip */}
                        <div className="relative mt-5 overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)" }}>
                          <div className="flex gap-0 whitespace-nowrap" style={{ animation: "giants-scroll 28s linear infinite" }}>
                            {[
                              "OpenAI","Anthropic","Google DeepMind","xAI · Grok","Meta AI","Microsoft Copilot",
                              "NVIDIA","Perplexity","Apple Intelligence","Hugging Face","Mistral","DeepSeek",
                              "Amazon Bedrock","IBM watsonx","Stability AI","Cohere","Baidu ERNIE","Alibaba Qwen",
                              "Samsung Gauss","Inflection Pi","AI21 Labs","Llama",
                              "OpenAI","Anthropic","Google DeepMind","xAI · Grok","Meta AI","Microsoft Copilot",
                              "NVIDIA","Perplexity","Apple Intelligence","Hugging Face","Mistral","DeepSeek",
                              "Amazon Bedrock","IBM watsonx","Stability AI","Cohere","Baidu ERNIE","Alibaba Qwen",
                              "Samsung Gauss","Inflection Pi","AI21 Labs","Llama",
                            ].map((name, i) => (
                              <span key={i} className="inline-flex items-center gap-3 px-4">
                                <span style={{ color: "#ffd60a", opacity: 0.35, fontSize: "7px" }}>◆</span>
                                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,214,10,0.65)" }}>
                                  {name}
                                </span>
                              </span>
                            ))}
                          </div>
                          <style>{`
                            @keyframes giants-scroll {
                              0% { transform: translateX(0); }
                              100% { transform: translateX(-50%); }
                            }
                          `}</style>
                        </div>

                      </button>
                    </motion.div>
                  ))}

                  {/* Multi-Agent — full-width hero tile */}
                  {filteredCategories.filter(c => c.id === "multiagent").map((cat) => (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08, duration: 0.45 }}
                    >
                      <button
                        onClick={() => { setSelected(cat); setSearch(""); }}
                        className="group relative w-full rounded-2xl p-8 text-left transition-all duration-300 overflow-hidden border"
                        style={{
                          background: "var(--card)",
                          borderColor: "rgba(0,229,255,0.2)",
                          boxShadow: "0 0 60px rgba(0,229,255,0.05)",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.borderColor = "rgba(0,229,255,0.55)";
                          el.style.boxShadow = "0 0 80px rgba(0,229,255,0.2), inset 0 0 60px rgba(0,229,255,0.03)";
                          el.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.borderColor = "rgba(0,229,255,0.2)";
                          el.style.boxShadow = "0 0 60px rgba(0,229,255,0.05)";
                          el.style.transform = "translateY(0)";
                        }}
                      >
                        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle at 15% 50%, #00e5ff 0%, transparent 50%), radial-gradient(circle at 85% 50%, #bf5af2 0%, transparent 50%)" }} />
                        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.5), transparent)" }} />
                        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.2), transparent)" }} />

                        <div className="relative flex flex-wrap items-center justify-between gap-6">
                          <div className="flex items-center gap-6">
                            <span className="text-6xl" style={{ filter: "drop-shadow(0 0 20px rgba(0,229,255,0.8))" }}>🕸️</span>
                            <div>
                              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.25em", color: "#00e5ff", marginBottom: "4px" }}>ADVANCED SECTOR</p>
                              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(26px, 5vw, 48px)", fontWeight: 900, letterSpacing: "0.06em", color: "#00e5ff", textShadow: "0 0 30px rgba(0,229,255,0.6)", lineHeight: 1 }}>MULTI-AGENT ORCHESTRATION</h3>
                              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "var(--muted-foreground)", marginTop: "6px" }}>AI agents collaborating, delegating, and executing complex tasks autonomously</p>
                            </div>
                          </div>
                          <span className="px-3 py-1.5 rounded-full text-xs opacity-60 group-hover:opacity-100 transition-opacity shrink-0" style={{ background: "rgba(0,229,255,0.12)", border: "1px solid rgba(0,229,255,0.35)", color: "#00e5ff", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px" }}>ENTER →</span>
                        </div>

                        {/* Scrolling provider strip */}
                        <div className="relative mt-5 overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)" }}>
                          <div className="flex gap-0 whitespace-nowrap" style={{ animation: "agents-scroll 26s linear infinite" }}>
                            {[
                              "Anthropic MCP","OpenAI Agents SDK","Google Vertex Agents","Microsoft AutoGen",
                              "LangGraph","CrewAI","Amazon Bedrock Agents","AutoGPT","BabyAGI",
                              "Cohere Agents","Mistral Agents","Hugging Face Smolagents","Salesforce AgentForce",
                              "ServiceNow Agents","Fetch.ai","xAI Grok Agents",
                              "Anthropic MCP","OpenAI Agents SDK","Google Vertex Agents","Microsoft AutoGen",
                              "LangGraph","CrewAI","Amazon Bedrock Agents","AutoGPT","BabyAGI",
                              "Cohere Agents","Mistral Agents","Hugging Face Smolagents","Salesforce AgentForce",
                              "ServiceNow Agents","Fetch.ai","xAI Grok Agents",
                            ].map((name, i) => (
                              <span key={i} className="inline-flex items-center gap-3 px-4">
                                <span style={{ color: "#00e5ff", opacity: 0.35, fontSize: "7px" }}>◆</span>
                                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(0,229,255,0.65)" }}>
                                  {name}
                                </span>
                              </span>
                            ))}
                          </div>
                          <style>{`
                            @keyframes agents-scroll {
                              0% { transform: translateX(0); }
                              100% { transform: translateX(-50%); }
                            }
                          `}</style>
                        </div>
                      </button>
                    </motion.div>
                  ))}

                  {/* All other sectors grid */}
                  <div
                    className="grid gap-4"
                    style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
                  >
                    {filteredCategories.filter(c => c.id !== "aigiants" && c.id !== "multiagent").map((cat, i) => (
                      <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.4 }}
                      >
                        <CategoryTile
                          category={cat}
                          onClick={() => { setSelected(cat); setSearch(""); }}
                          index={i}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ─── FOUNDER SECTION ─── */}
            <div className="px-6 py-16 max-w-5xl mx-auto">
              <div
                className="relative rounded-3xl overflow-hidden p-10"
                style={{
                  background: "linear-gradient(135deg, rgba(255,31,120,0.07) 0%, rgba(0,229,255,0.05) 50%, rgba(255,214,10,0.06) 100%)",
                  border: "1px solid rgba(255,31,120,0.2)",
                  boxShadow: "0 0 80px rgba(255,31,120,0.06)",
                }}
              >
                {/* Decorative top line */}
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,31,120,0.6), rgba(0,229,255,0.4), transparent)" }} />

                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  {/* Avatar */}
                  <div className="shrink-0">
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center text-4xl"
                      style={{
                        background: "radial-gradient(circle, rgba(255,31,120,0.3) 0%, rgba(0,229,255,0.15) 100%)",
                        border: "2px solid rgba(255,31,120,0.4)",
                        boxShadow: "0 0 30px rgba(255,31,120,0.3)",
                      }}
                    >
                      🎪
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex-1 text-center md:text-left">
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.25em", color: "var(--primary)", marginBottom: "8px" }}>
                      A MESSAGE FROM THE FOUNDER
                    </p>
                    <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(28px, 5vw, 48px)", letterSpacing: "0.04em", color: "#eeeeff", lineHeight: 1, marginBottom: "16px" }}>
                      WHY AI CIRCUS.AI<br />
                      <span style={{ color: "var(--primary)" }}>MEGA MALL?</span>
                    </h2>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "var(--muted-foreground)", lineHeight: 1.8, maxWidth: "600px", marginBottom: "16px" }}>
                      "We are living through the greatest technological revolution in human history. Every industry — from healthcare to law, from farming to space exploration — is being transformed by AI. But finding the right AI tool for your specific need was chaos.
                    </p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "var(--muted-foreground)", lineHeight: 1.8, maxWidth: "600px", marginBottom: "20px" }}>
                      AI Circus Mega Mall was built to be the one destination for every human on Earth to find, compare, and access the AI services that will change their life. Every industry. Every tool. One mall."
                    </p>

                    {/* Founder name + socials */}
                    <div style={{ borderLeft: "3px solid var(--primary)", paddingLeft: "16px" }}>
                      <button
                        onClick={() => { setView("vision"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "26px", letterSpacing: "0.06em", color: "rgba(255,214,10,0.9)", marginBottom: "4px", background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left", textDecoration: "underline", textDecorationColor: "rgba(255,214,10,0.3)", textUnderlineOffset: "4px" }}
                        title="View AI CIRCUS.AI Vision"
                      >FOUNDER · CREATOR · AL MASON</button>
                      <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "26px", letterSpacing: "0.06em", color: "#eeeeff" }}>MANJU .M</p>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "var(--primary)", letterSpacing: "0.1em", marginBottom: "12px" }}>FOUNDER · AI CIRCUS.AI MEGA MALL</p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <a
                          href="https://www.linkedin.com/in/manjumasand/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all"
                          style={{ background: "rgba(10,102,194,0.15)", border: "1px solid rgba(10,102,194,0.4)", color: "#0a66c2", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "0.06em", textDecoration: "none" }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(10,102,194,0.28)"}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(10,102,194,0.15)"}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                          LINKEDIN
                        </a>
                        <a
                          href="https://x.com/almasonteam"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all"
                          style={{ background: "rgba(231,231,231,0.08)", border: "1px solid rgba(231,231,231,0.25)", color: "#e7e7e7", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "0.06em", textDecoration: "none" }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(231,231,231,0.16)"}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(231,231,231,0.08)"}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                          X / TWITTER
                        </a>
                        <a
                          href="https://www.tiktok.com/@global.poker.table"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all"
                          style={{ background: "rgba(255,0,80,0.08)", border: "1px solid rgba(255,0,80,0.3)", color: "#ff0050", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "0.06em", textDecoration: "none" }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,0,80,0.18)"}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,0,80,0.08)"}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
                          TIKTOK
                        </a>
                        <a
                          href="https://www.instagram.com/ishmaverick"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all"
                          style={{ background: "rgba(225,48,108,0.08)", border: "1px solid rgba(225,48,108,0.3)", color: "#e1306c", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "0.06em", textDecoration: "none" }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(225,48,108,0.18)"}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(225,48,108,0.08)"}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                          INSTAGRAM
                        </a>
                        <a
                          href="mailto:business@aicircus.ai"
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all"
                          style={{ background: "rgba(255,31,120,0.08)", border: "1px solid rgba(255,31,120,0.3)", color: "#ff1f78", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "0.06em", textDecoration: "none" }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,31,120,0.18)"}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,31,120,0.08)"}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                          business@aicircus.ai
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Stats column */}
                  <div className="flex flex-row md:flex-col gap-4 shrink-0">
                    {[
                      { value: `${categories.length}`, label: "SECTORS" },
                      { value: `${categories.reduce((a, c) => a + c.services.length, 0)}+`, label: "SERVICES" },
                      { value: "40+", label: "INDUSTRIES" },
                      { value: "LIVE", label: "STATUS" },
                    ].map(s => (
                      <div key={s.label} className="text-center p-3 rounded-xl" style={{ background: "rgba(255,31,120,0.06)", border: "1px solid rgba(255,31,120,0.15)", minWidth: "80px" }}>
                        <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "24px", color: "var(--primary)", lineHeight: 1 }}>{s.value}</p>
                        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", color: "var(--muted-foreground)", letterSpacing: "0.12em", marginTop: "2px" }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA row */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-8 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <button
                    onClick={() => { setView("apply"); setSelected(null); }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all"
                    style={{ background: "linear-gradient(135deg, var(--primary), #ff6b35)", color: "#fff", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "14px", letterSpacing: "0.1em", boxShadow: "0 0 20px rgba(255,31,120,0.4)" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 0 35px rgba(255,31,120,0.6)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(255,31,120,0.4)"}
                  >
                    🤝 BECOME A PARTNER
                  </button>
                  <button
                    onClick={() => { setView("analytics"); setSelected(null); }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all"
                    style={{ background: "rgba(255,214,10,0.1)", border: "1px solid rgba(255,214,10,0.35)", color: "#ffd60a", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "14px", letterSpacing: "0.1em" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,214,10,0.18)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,214,10,0.1)"}
                  >
                    💰 VIEW EARNINGS
                  </button>
                </div>
              </div>
            </div>

            {/* Footer marquee */}
            <div
              className="py-3 border-t"
              style={{
                borderColor: "rgba(0,229,255,0.12)",
                background: "rgba(0,229,255,0.03)",
              }}
            >
              <Marquee
                items={marqueeItems.slice().reverse()}
                speed={65}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  color: "rgba(0,229,255,0.3)",
                }}
              />
            </div>

            {/* Footer */}
            <footer className="text-center py-8 px-6 pb-24 md:pb-8 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <p
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: "16px",
                  letterSpacing: "0.2em",
                  color: "#ffd60a",
                  textShadow: "0 0 20px rgba(255,214,10,0.4)",
                }}
              >
                🎪 AI CIRCUS.AI MEGA MALL — THE AI SERVICES UNIVERSE — EVERY INDUSTRY UNDER THE EARTH
              </p>
              <p
                className="mt-3"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  color: "#ffd60a",
                }}
              >
                © 2026 AI CIRCUS.AI — ALL RIGHTS RESERVED
              </p>
            </footer>
          </motion.div>
        ) : (
          /* ─── CATEGORY VIEW ─── */
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.35 }}
            className="max-w-7xl mx-auto px-6 py-8 pb-24 md:pb-8"
          >
            {/* Category header */}
            <div
              className="relative rounded-2xl p-8 mb-8 overflow-hidden"
              style={{
                background: `radial-gradient(ellipse 60% 80% at 80% 50%, ${selected.glow.replace("0.4", "0.12")} 0%, transparent 70%), var(--card)`,
                border: `1px solid ${selected.color}33`,
              }}
            >
              <div
                className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-15"
                style={{ background: selected.color }}
              />

              <button
                onClick={() => { setSelected(null); setSearch(""); }}
                className="flex items-center gap-2 mb-6 text-sm transition-opacity hover:opacity-70"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: selected.color,
                  letterSpacing: "0.06em",
                  fontSize: "11px",
                }}
              >
                <ArrowLeft size={14} />
                BACK TO MALL
              </button>

              <div className="flex flex-wrap items-end gap-6">
                <div>
                  <div className="text-6xl mb-3" style={{ filter: `drop-shadow(0 0 16px ${selected.glow})` }}>
                    {selected.emoji}
                  </div>
                  <h2
                    className="leading-none"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "clamp(40px, 7vw, 80px)",
                      fontWeight: 900,
                      letterSpacing: "0.06em",
                      color: selected.color,
                      textShadow: `0 0 40px ${selected.glow}`,
                    }}
                  >
                    {selected.name}
                  </h2>
                  <p
                    className="mt-2 text-muted-foreground"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px" }}
                  >
                    {selected.tagline}
                  </p>
                </div>

                <div className="ml-auto">
                  <div className="relative">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Filter services…"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-8 pr-3 py-2 rounded-lg text-sm outline-none transition-all"
                      style={{
                        background: "var(--muted)",
                        color: "var(--foreground)",
                        border: `1px solid ${selected.color}33`,
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px",
                        width: "200px",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = selected.color;
                        e.target.style.boxShadow = `0 0 12px ${selected.glow}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = selected.color + "33";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Services grid */}
            {filteredServices.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <span className="text-5xl">{selected.emoji}</span>
                <p className="text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  No services match "{search}"
                </p>
              </div>
            ) : (
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                }}
              >
                {filteredServices.map((service, i) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.35 }}
                  >
                    <ServiceCard
                      service={service}
                      accentColor={selected.color}
                      glowColor={selected.glow}
                      index={i}
                      onLaunch={setLaunching}
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Quick-jump strip */}
            <div className="mt-12 mb-6 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center justify-between mb-4">
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.18em", color: "var(--muted-foreground)" }}>
                  ✦ QUICK JUMP
                </p>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--muted-foreground)", opacity: 0.5 }}>
                  tap <span style={{ color: "var(--primary)" }}>ALL SECTORS</span> for all {categories.length}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {/* Home */}
                <button
                  onClick={() => { setSelected(null); setSearch(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-150 border"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "12px", letterSpacing: "0.08em",
                    background: "rgba(255,31,120,0.08)", borderColor: "rgba(255,31,120,0.25)", color: "var(--primary)",
                  }}
                >
                  🏠 <span>MALL HOME</span>
                </button>
                {/* 8 adjacent sectors */}
                {(() => {
                  const idx = categories.findIndex(c => c.id === selected.id);
                  const others = categories.filter(c => c.id !== selected.id);
                  const prev = idx > 0 ? categories.slice(Math.max(0, idx - 4), idx) : [];
                  const next = categories.slice(idx + 1, idx + 5);
                  return [...prev, ...next].slice(0, 8);
                })().map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setSelected(cat); setSearch(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-150 border"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "12px", letterSpacing: "0.06em",
                      background: cat.color + "0d", borderColor: cat.color + "30", color: cat.color,
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = cat.color + "22"; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 10px ${cat.glow}`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = cat.color + "0d"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                  >
                    {cat.emoji} <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>}

      {/* ─── SCROLL TO TOP BUTTON ─── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed right-5 z-50 flex items-center justify-center rounded-full shadow-lg transition-all"
            style={{
              bottom: "80px",
              width: "44px",
              height: "44px",
              background: "linear-gradient(135deg, var(--primary), #ff6b35)",
              border: "none",
              color: "#fff",
              boxShadow: "0 0 20px rgba(255,31,120,0.5)",
              cursor: "pointer",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(255,31,120,0.8)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(255,31,120,0.5)"}
            title="Back to top"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── MOBILE BOTTOM NAV ─── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden border-t"
        style={{
          background: "rgba(3,3,8,0.96)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(255,31,120,0.2)",
        }}
      >
        {[
          { id: "mall" as const, emoji: "🏠", label: "MALL", color: "var(--primary)" },
          { id: "analytics" as const, emoji: "💰", label: "EARN", color: "#ffd60a" },
          { id: "partner" as const, emoji: "🤝", label: "PARTNERS", color: "#30d158" },
          { id: "pitch" as const, emoji: "📊", label: "PITCH", color: "#bf5af2" },
        ].map(n => {
          const isActive = view === n.id && !selected;
          return (
            <button
              key={n.id}
              onClick={() => { setView(n.id); setSelected(null); setSearch(""); }}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-all"
              style={{
                color: isActive ? n.color : "var(--muted-foreground)",
                background: isActive ? n.color + "10" : "transparent",
              }}
            >
              <span style={{ fontSize: "18px", lineHeight: 1 }}>{n.emoji}</span>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "9px", letterSpacing: "0.1em", color: isActive ? n.color : "inherit" }}>{n.label}</span>
              {isActive && <span style={{ width: "16px", height: "2px", borderRadius: "1px", background: n.color, marginTop: "1px" }} />}
            </button>
          );
        })}
        {/* Vision — direct external link */}
        <a
          href="https://sand-poise-23509582.figma.site/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-all"
          style={{ color: "var(--muted-foreground)", textDecoration: "none" }}
        >
          <span style={{ fontSize: "18px", lineHeight: 1 }}>🔮</span>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "9px", letterSpacing: "0.1em" }}>VISION</span>
        </a>
      </div>
    </div>
  );
}
