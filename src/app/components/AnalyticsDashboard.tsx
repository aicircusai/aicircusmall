import { useState, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { TrendingUp, MousePointerClick, DollarSign, Users, RefreshCw, ExternalLink, Zap } from "lucide-react";
import { computeStats, seedDemoData, type DashboardStats } from "../data/tracker";
import { getCommission } from "../data/referral";

function fmt$(n: number) {
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${n.toFixed(2)}`;
}
function fmtDate(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

const CARD_STYLE = {
  background: "#0c0c18",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "16px",
  padding: "20px",
};

export function AnalyticsDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [tab, setTab] = useState<"overview" | "services" | "sectors" | "feed">("overview");

  function refresh() {
    seedDemoData();
    setStats(computeStats());
  }

  useEffect(() => { refresh(); }, []);

  if (!stats) return null;

  const statCards = [
    {
      label: "TOTAL CLICKS",
      value: stats.totalClicks.toLocaleString(),
      sub: `+${stats.clicksToday} today`,
      icon: <MousePointerClick size={18} />,
      color: "#00e5ff",
    },
    {
      label: "EST. CONVERSIONS",
      value: stats.estimatedConversions.toLocaleString(),
      sub: "at 2.5% avg rate",
      icon: <Users size={18} />,
      color: "#30d158",
    },
    {
      label: "EST. EARNINGS",
      value: fmt$(stats.totalEstimatedEarnings),
      sub: `${fmt$(stats.earningsToday)} today`,
      icon: <DollarSign size={18} />,
      color: "#ffd60a",
    },
    {
      label: "THIS WEEK",
      value: fmt$(stats.earningsThisWeek),
      sub: `${stats.clicksThisWeek} clicks`,
      icon: <TrendingUp size={18} />,
      color: "#ff1f78",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.25em", color: "#ffd60a", marginBottom: "6px" }}>
            REVENUE OPERATIONS
          </p>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(32px, 6vw, 60px)", fontWeight: 900, letterSpacing: "0.04em", color: "#fff", lineHeight: 1, textShadow: "0 0 40px rgba(255,214,10,0.4)" }}>
            💰 EARNINGS DASHBOARD
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "var(--muted-foreground)", marginTop: "6px" }}>
            Referral clicks · Estimated commissions · Partner performance
          </p>
        </div>
        <button
          onClick={refresh}
          className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.08em" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"}
        >
          <RefreshCw size={13} /> REFRESH
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
        {statCards.map(c => (
          <div key={c.label} style={CARD_STYLE}>
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.18em", color: "var(--muted-foreground)" }}>{c.label}</span>
              <span style={{ color: c.color }}>{c.icon}</span>
            </div>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "36px", fontWeight: 900, color: c.color, textShadow: `0 0 20px ${c.color}66`, lineHeight: 1, marginBottom: "4px" }}>{c.value}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "var(--muted-foreground)" }}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 mb-6 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        {(["overview", "services", "sectors", "feed"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2.5 text-sm transition-all"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.1em",
              color: tab === t ? "#ffd60a" : "var(--muted-foreground)",
              borderBottom: tab === t ? "2px solid #ffd60a" : "2px solid transparent",
              marginBottom: "-1px",
              textTransform: "uppercase",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {tab === "overview" && (
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
          {/* Clicks over time */}
          <div style={{ ...CARD_STYLE, gridColumn: "1 / -1" }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.18em", color: "var(--muted-foreground)", marginBottom: "16px" }}>CLICKS · LAST 30 DAYS</p>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={stats.clicksByDay}>
                <defs>
                  <linearGradient id="clickGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00e5ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" tickFormatter={fmtDate} tick={{ fill: "#666688", fontSize: 10, fontFamily: "JetBrains Mono" }} tickLine={false} axisLine={false} interval={4} />
                <YAxis tick={{ fill: "#666688", fontSize: 10, fontFamily: "JetBrains Mono" }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: "#0c0c18", border: "1px solid rgba(0,229,255,0.3)", borderRadius: "8px", fontFamily: "JetBrains Mono", fontSize: "11px", color: "#eeeeff" }}
                  formatter={(v: number) => [v, "clicks"]}
                  labelFormatter={fmtDate}
                />
                <Area type="monotone" dataKey="clicks" stroke="#00e5ff" strokeWidth={2} fill="url(#clickGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Earnings over time */}
          <div style={{ ...CARD_STYLE, gridColumn: "1 / -1" }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.18em", color: "var(--muted-foreground)", marginBottom: "16px" }}>EST. EARNINGS · LAST 30 DAYS (USD)</p>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={stats.clicksByDay}>
                <defs>
                  <linearGradient id="earnGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffd60a" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ffd60a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" tickFormatter={fmtDate} tick={{ fill: "#666688", fontSize: 10, fontFamily: "JetBrains Mono" }} tickLine={false} axisLine={false} interval={4} />
                <YAxis tick={{ fill: "#666688", fontSize: 10, fontFamily: "JetBrains Mono" }} tickLine={false} axisLine={false} tickFormatter={v => `$${v.toFixed(1)}`} />
                <Tooltip
                  contentStyle={{ background: "#0c0c18", border: "1px solid rgba(255,214,10,0.3)", borderRadius: "8px", fontFamily: "JetBrains Mono", fontSize: "11px", color: "#eeeeff" }}
                  formatter={(v: number) => [`$${v.toFixed(2)}`, "est. earnings"]}
                  labelFormatter={fmtDate}
                />
                <Area type="monotone" dataKey="earnings" stroke="#ffd60a" strokeWidth={2} fill="url(#earnGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* SERVICES TAB */}
      {tab === "services" && (
        <div style={CARD_STYLE}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.18em", color: "var(--muted-foreground)", marginBottom: "16px" }}>TOP 10 SERVICES BY EST. EARNINGS</p>
          <div className="flex flex-col gap-2">
            {stats.topServices.map((s, i) => {
              const comm = getCommission(s.name);
              const maxEarnings = stats.topServices[0]?.earnings ?? 1;
              const pct = (s.earnings / maxEarnings) * 100;
              return (
                <div key={s.name} className="flex items-center gap-3 py-2 px-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#666688", width: "20px", flexShrink: 0 }}>#{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "15px", color: "#eeeeff", letterSpacing: "0.04em" }}>{s.name}</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#ffd60a", flexShrink: 0 }}>{fmt$(s.earnings)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg, #ffd60a, #ff9500)", borderRadius: "999px" }} />
                      </div>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "var(--muted-foreground)", flexShrink: 0 }}>{s.clicks} clicks</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#30d158", flexShrink: 0 }}>
                        {comm.type === "cpa" ? `$${comm.rate} CPA` : `${comm.rate}% rev`}
                      </span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#666688", flexShrink: 0 }}>{comm.network}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTORS TAB */}
      {tab === "sectors" && (
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          <div style={CARD_STYLE}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.18em", color: "var(--muted-foreground)", marginBottom: "16px" }}>EARNINGS BY SECTOR</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={stats.topSectors} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#666688", fontSize: 10, fontFamily: "JetBrains Mono" }} tickLine={false} axisLine={false} tickFormatter={v => `$${v.toFixed(0)}`} />
                <YAxis dataKey="sectorName" type="category" tick={{ fill: "#aaaacc", fontSize: 10, fontFamily: "JetBrains Mono" }} tickLine={false} axisLine={false} width={120} />
                <Tooltip
                  contentStyle={{ background: "#0c0c18", border: "1px solid rgba(255,214,10,0.3)", borderRadius: "8px", fontFamily: "JetBrains Mono", fontSize: "11px", color: "#eeeeff" }}
                  formatter={(v: number) => [`$${v.toFixed(2)}`, "est. earnings"]}
                />
                <Bar dataKey="earnings" fill="#ffd60a" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={CARD_STYLE}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.18em", color: "var(--muted-foreground)", marginBottom: "16px" }}>CLICKS BY SECTOR</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={stats.topSectors} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#666688", fontSize: 10, fontFamily: "JetBrains Mono" }} tickLine={false} axisLine={false} />
                <YAxis dataKey="sectorName" type="category" tick={{ fill: "#aaaacc", fontSize: 10, fontFamily: "JetBrains Mono" }} tickLine={false} axisLine={false} width={120} />
                <Tooltip
                  contentStyle={{ background: "#0c0c18", border: "1px solid rgba(0,229,255,0.3)", borderRadius: "8px", fontFamily: "JetBrains Mono", fontSize: "11px", color: "#eeeeff" }}
                  formatter={(v: number) => [v, "clicks"]}
                />
                <Bar dataKey="clicks" fill="#00e5ff" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* FEED TAB */}
      {tab === "feed" && (
        <div style={CARD_STYLE}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.18em", color: "var(--muted-foreground)", marginBottom: "16px" }}>RECENT REFERRAL CLICKS</p>
          <div className="flex flex-col gap-2">
            {stats.recentClicks.map(click => {
              const est = click.estimatedEarnings;
              const t = new Date(click.ts);
              const timeStr = t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
              const dateStr = t.toLocaleDateString([], { month: "short", day: "numeric" });
              return (
                <div key={click.id} className="flex items-center gap-3 py-2.5 px-3 rounded-lg" style={{ background: "rgba(255,255,255,0.02)", borderLeft: "2px solid rgba(0,229,255,0.3)" }}>
                  <ExternalLink size={12} style={{ color: "#00e5ff", flexShrink: 0 }} />
                  <div className="flex-1 min-w-0">
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "14px", color: "#eeeeff" }}>{click.serviceName}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--muted-foreground)", marginLeft: "8px" }}>{click.sectorName}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#30d158" }}>+{fmt$(est)}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#555570" }}>{dateStr} {timeStr}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <p className="mt-8 text-center" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.1em", color: "#444460" }}>
        ESTIMATED EARNINGS · BASED ON INDUSTRY AVG CONVERSION RATES · ACTUAL PAYOUTS DEPEND ON AFFILIATE NETWORK CONFIRMATION
      </p>
    </div>
  );
}
