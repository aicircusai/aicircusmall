import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LayoutGrid, X, Search } from "lucide-react";
import { categories, type Category } from "../data/categories";

interface SectorSwitcherProps {
  current: Category | null;
  onSelect: (cat: Category | null) => void;
}

export function SectorSwitcher({ current, onSelect }: SectorSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const filtered = q.trim()
    ? categories.filter(c =>
        c.name.toLowerCase().includes(q.toLowerCase()) ||
        c.tagline.toLowerCase().includes(q.toLowerCase())
      )
    : categories;

  function pick(cat: Category | null) {
    onSelect(cat);
    setOpen(false);
    setQ("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #ff1f78, #bf5af2)",
          boxShadow: "0 0 32px rgba(255,31,120,0.5), 0 4px 24px rgba(0,0,0,0.4)",
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: "13px",
          letterSpacing: "0.1em",
          color: "#fff",
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        title="Jump to any sector"
      >
        <LayoutGrid size={16} />
        <span>ALL SECTORS</span>
        <span
          className="px-1.5 py-0.5 rounded-full text-xs"
          style={{ background: "rgba(255,255,255,0.2)", fontSize: "10px" }}
        >
          {categories.length}
        </span>
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50"
              style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setOpen(false); setQ(""); }}
            />

            {/* Panel */}
            <motion.div
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl overflow-hidden"
              style={{
                background: "#0a0a15",
                border: "1px solid rgba(255,31,120,0.2)",
                borderBottom: "none",
                maxHeight: "85vh",
                display: "flex",
                flexDirection: "column",
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
            >
              {/* Handle bar */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3">
                <div>
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "22px", letterSpacing: "0.06em", color: "#fff" }}>
                    🎪 AI CIRCUS.AI MEGA MALL
                  </p>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.15em", color: "var(--muted-foreground)", marginTop: "2px" }}>
                    {categories.length} SECTORS · JUMP ANYWHERE
                  </p>
                </div>
                <button
                  onClick={() => { setOpen(false); setQ(""); }}
                  className="p-2 rounded-full transition-colors hover:bg-white/10"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Search */}
              <div className="px-5 pb-3">
                <div className="relative">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Find a sector…"
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl outline-none text-sm"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,31,120,0.25)",
                      color: "#eeeeff",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                    }}
                  />
                </div>
              </div>

              {/* Home pill */}
              <div className="px-5 pb-3">
                <button
                  onClick={() => pick(null)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all w-full"
                  style={{
                    background: current === null ? "rgba(255,31,120,0.2)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${current === null ? "rgba(255,31,120,0.5)" : "rgba(255,255,255,0.08)"}`,
                    color: current === null ? "#ff1f78" : "var(--muted-foreground)",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: "14px",
                    letterSpacing: "0.08em",
                  }}
                >
                  <span>🏠</span>
                  <span>MALL HOME</span>
                  {current === null && <span style={{ fontSize: "10px", marginLeft: "auto", fontFamily: "'JetBrains Mono', monospace" }}>YOU ARE HERE</span>}
                </button>
              </div>

              {/* Divider */}
              <div className="mx-5 mb-3" style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

              {/* Sector grid — scrollable */}
              <div className="overflow-y-auto px-5 pb-8" style={{ overscrollBehavior: "contain" }}>
                {filtered.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }}>
                    No sectors match "{q}"
                  </p>
                ) : (
                  <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
                    {filtered.map(cat => {
                      const isActive = current?.id === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => pick(cat)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150"
                          style={{
                            background: isActive ? cat.color + "18" : "rgba(255,255,255,0.03)",
                            border: `1px solid ${isActive ? cat.color + "55" : "rgba(255,255,255,0.06)"}`,
                            boxShadow: isActive ? `0 0 16px ${cat.glow}` : "none",
                          }}
                          onMouseEnter={e => {
                            if (!isActive) {
                              (e.currentTarget as HTMLElement).style.background = cat.color + "10";
                              (e.currentTarget as HTMLElement).style.borderColor = cat.color + "33";
                            }
                          }}
                          onMouseLeave={e => {
                            if (!isActive) {
                              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                            }
                          }}
                        >
                          <span style={{ fontSize: "20px", lineHeight: 1, flexShrink: 0 }}>{cat.emoji}</span>
                          <div className="min-w-0">
                            <p style={{
                              fontFamily: "'Barlow Condensed', sans-serif",
                              fontWeight: 800,
                              fontSize: "13px",
                              letterSpacing: "0.06em",
                              color: isActive ? cat.color : "#cccce8",
                              lineHeight: 1.2,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}>
                              {cat.name}
                            </p>
                            <p style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: "9px",
                              color: "var(--muted-foreground)",
                              marginTop: "2px",
                            }}>
                              {cat.services.length} services
                            </p>
                          </div>
                          {isActive && (
                            <span style={{ marginLeft: "auto", width: "6px", height: "6px", borderRadius: "50%", background: cat.color, boxShadow: `0 0 8px ${cat.color}`, flexShrink: 0 }} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
