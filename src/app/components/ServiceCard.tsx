import { useEffect, useState } from "react";
import { ExternalLink, Zap, Users, Crown, Star } from "lucide-react";
import type { AIService } from "../data/categories";
import { getLiveUsers, getPoweredBy } from "../data/enrichment";
import { getFeaturedServices, getEliteServices } from "../data/partners";

interface ServiceCardProps {
  service: AIService;
  accentColor: string;
  glowColor: string;
  index: number;
  onLaunch: (service: AIService) => void;
}

function usePulsingCount(base: string) {
  const [display, setDisplay] = useState(base);
  useEffect(() => {
    const interval = setInterval(() => {
      const num = parseFloat(base.replace(/[KM,]/g, ""));
      const suffix = base.includes("M") ? "M" : base.includes("K") ? "K" : "";
      const delta = (Math.random() - 0.5) * (suffix === "M" ? 0.2 : suffix === "K" ? 2 : 5);
      const next = Math.max(0, num + delta);
      const formatted = suffix === "M" ? next.toFixed(1) : Math.round(next).toLocaleString();
      setDisplay(`${formatted}${suffix}`);
    }, 2800 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, [base]);
  return display;
}

const providerColors: Record<string, string> = {
  "OpenAI": "#10a37f", "GPT-4 / OpenAI": "#10a37f",
  "Anthropic": "#cc785c", "Claude / Anthropic": "#cc785c",
  "Google DeepMind": "#4285f4", "Google Gemini": "#4285f4", "Google AI": "#4285f4",
  "xAI": "#e7e7e7", "Meta / Llama": "#0082fb", "Meta Open Source": "#0082fb",
  "OpenAI + Microsoft": "#6264a7", "OpenAI + Claude": "#a78bfa",
  "NVIDIA CUDA": "#76b900", "Mistral": "#ff7000", "DeepSeek": "#4f8ef7",
  "AWS Titan + Partners": "#ff9900", "Apple Intelligence": "#a0a0a0", "Apple + OpenAI": "#a0a0a0",
  "IBM + Llama": "#1f70c1", "Stable Diffusion": "#7c3aed", "Any LLM": "#888899",
  "Open Source": "#888899", "Proprietary": "#555570",
};

export function ServiceCard({ service, accentColor, glowColor, index, onLaunch }: ServiceCardProps) {
  const poweredBy = getPoweredBy(service.name);
  const baseUsers = getLiveUsers(service.name);
  const liveCount = usePulsingCount(baseUsers);
  const pColor = providerColors[poweredBy] ?? "#888899";
  const isElite = getEliteServices().has(service.name);
  const isFeatured = !isElite && getFeaturedServices().has(service.name);

  return (
    <button
      onClick={() => onLaunch(service)}
      className="group w-full text-left block rounded-xl p-5 border transition-all duration-300 cursor-pointer relative overflow-hidden"
      style={{
        background: isElite ? "rgba(255,214,10,0.04)" : isFeatured ? "rgba(0,229,255,0.03)" : "var(--card)",
        borderColor: isElite ? "rgba(255,214,10,0.35)" : isFeatured ? "rgba(0,229,255,0.25)" : "rgba(255,255,255,0.06)",
        boxShadow: isElite ? "0 0 24px rgba(255,214,10,0.12)" : isFeatured ? "0 0 16px rgba(0,229,255,0.08)" : "none",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = accentColor + "55";
        el.style.boxShadow = `0 0 24px ${glowColor}`;
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(255,255,255,0.06)";
        el.style.boxShadow = "none";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Elite/Featured corner ribbon */}
      {isElite && (
        <div className="absolute top-0 right-0 flex items-center gap-1 px-2 py-1 rounded-bl-lg" style={{ background: "rgba(255,214,10,0.9)" }}>
          <Crown size={10} style={{ color: "#000" }} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "9px", letterSpacing: "0.12em", color: "#000" }}>ELITE</span>
        </div>
      )}
      {isFeatured && (
        <div className="absolute top-0 right-0 flex items-center gap-1 px-2 py-1 rounded-bl-lg" style={{ background: "rgba(0,229,255,0.85)" }}>
          <Star size={10} style={{ color: "#000" }} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "9px", letterSpacing: "0.12em", color: "#000" }}>FEATURED</span>
        </div>
      )}

      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="inline-block px-2 py-0.5 rounded" style={{ background: accentColor + "22", color: accentColor, fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.08em" }}>
          {service.tag}
        </span>
        <ExternalLink size={13} className="opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 shrink-0" style={{ color: accentColor }} />
      </div>

      {/* Name */}
      <h3 className="text-foreground leading-tight mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "19px", fontWeight: 700, letterSpacing: "0.02em" }}>
        {service.name}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12.5px" }}>
        {service.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-center gap-1.5 min-w-0">
          <Zap size={10} style={{ color: pColor, flexShrink: 0 }} />
          <span className="truncate" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.04em", color: pColor }}>
            {poweredBy}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: "#00ff88", boxShadow: "0 0 6px #00ff88", animation: "pulse 2s ease-in-out infinite" }} />
          <Users size={10} style={{ color: "#00ff88", opacity: 0.8 }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.04em", color: "#00ff88" }}>
            {liveCount}
          </span>
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </button>
  );
}
