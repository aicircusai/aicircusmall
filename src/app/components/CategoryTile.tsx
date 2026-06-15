import type { Category } from "../data/categories";

interface CategoryTileProps {
  category: Category;
  onClick: () => void;
  index: number;
}

export function CategoryTile({ category, onClick, index }: CategoryTileProps) {
  return (
    <button
      onClick={onClick}
      className="group relative rounded-2xl p-6 text-left transition-all duration-300 overflow-hidden border"
      style={{
        background: "var(--card)",
        borderColor: "rgba(255,255,255,0.06)",
        animationDelay: `${index * 40}ms`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = category.color + "66";
        el.style.boxShadow = `0 0 32px ${category.glow}, inset 0 0 32px ${category.color}08`;
        el.style.transform = "translateY(-3px) scale(1.01)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(255,255,255,0.06)";
        el.style.boxShadow = "none";
        el.style.transform = "translateY(0) scale(1)";
      }}
    >
      {/* glow orb in corner */}
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
        style={{ background: category.color }}
      />

      <div
        className="text-4xl mb-4 leading-none"
        style={{ filter: `drop-shadow(0 0 8px ${category.glow})` }}
      >
        {category.emoji}
      </div>

      <h3
        className="text-foreground mb-1"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "20px",
          fontWeight: 800,
          letterSpacing: "0.06em",
          color: category.color,
        }}
      >
        {category.name}
      </h3>

      <p
        className="text-muted-foreground"
        style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px" }}
      >
        {category.tagline}
      </p>

      <div className="flex items-center justify-between mt-4">
        <span
          className="text-xs"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: category.color,
            opacity: 0.7,
          }}
        >
          {category.services.length} services
        </span>
        <span
          className="text-xs opacity-50 group-hover:opacity-100 transition-opacity"
          style={{ color: category.color }}
        >
          ENTER →
        </span>
      </div>
    </button>
  );
}
