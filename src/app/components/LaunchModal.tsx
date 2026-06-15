import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, X, ArrowLeft, Zap, Users } from "lucide-react";
import { getLiveUsers, getPoweredBy } from "../data/enrichment";
import { buildReferralUrl } from "../data/referral";
import { trackClick } from "../data/tracker";
import type { AIService } from "../data/categories";

interface LaunchModalProps {
  service: AIService | null;
  accentColor: string;
  glow: string;
  sectorId: string;
  sectorName: string;
  onClose: () => void;
}

export function LaunchModal({ service, accentColor, glow, sectorId, sectorName, onClose }: LaunchModalProps) {
  if (!service) return null;

  const poweredBy = getPoweredBy(service.name);
  const liveUsers = getLiveUsers(service.name);
  const referralUrl = buildReferralUrl(service.url, service.name, sectorId);

  function handleLaunch() {
    trackClick(service!.name, sectorId, sectorName, referralUrl);
    window.open(referralUrl, "_blank", "noopener,noreferrer");
    onClose();
  }

  return (
    <AnimatePresence>
      {service && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 24, stiffness: 300 }}
            onClick={onClose}
          >
            <div
              className="relative w-full max-w-md rounded-2xl overflow-hidden"
              style={{
                background: "#0c0c18",
                border: `1px solid ${accentColor}44`,
                boxShadow: `0 0 60px ${glow}, 0 24px 80px rgba(0,0,0,0.6)`,
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Top accent line */}
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-full transition-colors hover:bg-white/10"
                style={{ color: "var(--muted-foreground)" }}
              >
                <X size={16} />
              </button>

              <div className="p-7">
                {/* Tag */}
                <span
                  className="inline-block px-2 py-0.5 rounded mb-4"
                  style={{
                    background: accentColor + "22",
                    color: accentColor,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                  }}
                >
                  {service.tag}
                </span>

                {/* Name */}
                <h2
                  className="mb-2"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "32px",
                    fontWeight: 900,
                    letterSpacing: "0.04em",
                    color: accentColor,
                    textShadow: `0 0 24px ${glow}`,
                    lineHeight: 1,
                  }}
                >
                  {service.name}
                </h2>

                {/* Description */}
                <p
                  className="text-muted-foreground mb-5"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", lineHeight: 1.6 }}
                >
                  {service.description}
                </p>

                {/* Stats row */}
                <div
                  className="flex items-center gap-4 mb-6 p-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center gap-1.5">
                    <Zap size={11} style={{ color: accentColor }} />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: accentColor }}>
                      {poweredBy}
                    </span>
                  </div>
                  <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.1)" }} />
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: "#00ff88", boxShadow: "0 0 6px #00ff88" }} />
                    <Users size={11} style={{ color: "#00ff88" }} />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#00ff88" }}>
                      {liveUsers} live
                    </span>
                  </div>
                </div>

                {/* THE KEY MESSAGE */}
                <div
                  className="flex items-start gap-3 p-4 rounded-xl mb-6"
                  style={{
                    background: "rgba(255,31,120,0.08)",
                    border: "1px solid rgba(255,31,120,0.25)",
                  }}
                >
                  <span className="text-2xl shrink-0">🎪</span>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 800,
                        fontSize: "15px",
                        letterSpacing: "0.06em",
                        color: "#ff1f78",
                        marginBottom: "4px",
                      }}
                    >
                      YOUR MALL STAYS OPEN
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "12.5px",
                        color: "var(--muted-foreground)",
                        lineHeight: 1.5,
                      }}
                    >
                      This service opens in a <strong style={{ color: "#eeeeff" }}>new browser tab</strong>.
                      To return to AI Circus Mega Mall, just{" "}
                      <strong style={{ color: "#eeeeff" }}>click back on this tab</strong> in your browser.
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleLaunch}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl transition-all duration-200"
                    style={{
                      background: `linear-gradient(135deg, ${accentColor}cc, ${accentColor})`,
                      color: "#000",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 800,
                      fontSize: "16px",
                      letterSpacing: "0.1em",
                      boxShadow: `0 0 24px ${glow}`,
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${glow}`}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${glow}`}
                  >
                    <ExternalLink size={16} />
                    OPEN {service.name.toUpperCase().split("—")[0].trim()}
                    <span style={{ fontSize: "11px", opacity: 0.7, fontWeight: 600 }}>↗ NEW TAB</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-200 border"
                    style={{
                      background: "transparent",
                      borderColor: "rgba(255,255,255,0.1)",
                      color: "var(--muted-foreground)",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: "14px",
                      letterSpacing: "0.1em",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.color = "#eeeeff"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--muted-foreground)"; }}
                  >
                    <ArrowLeft size={14} />
                    STAY IN MALL
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
