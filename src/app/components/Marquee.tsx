import React from "react";

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Marquee({ items, speed = 40, className = "", style }: MarqueeProps) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} style={style}>
      <div
        className="inline-flex gap-0"
        style={{ animation: `marquee-scroll ${speed}s linear infinite` }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-5">
            <span style={{ color: "var(--primary)", opacity: 0.5 }}>✦</span>
            <span>{item}</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
