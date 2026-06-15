import { estimateEarningsPerConversion, CONVERSION_RATE } from "./referral";

export interface ClickEvent {
  id: string;
  serviceName: string;
  sectorId: string;
  sectorName: string;
  url: string;
  ts: number; // unix ms
  estimatedEarnings: number; // per click (conversion_rate × commission)
}

const STORAGE_KEY = "aicircus_clicks";

function load(): ClickEvent[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function save(events: ClickEvent[]) {
  // Keep last 10,000 events
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(-10000)));
}

export function trackClick(
  serviceName: string,
  sectorId: string,
  sectorName: string,
  url: string
): void {
  const events = load();
  const earningsPerConversion = estimateEarningsPerConversion(serviceName);
  events.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    serviceName,
    sectorId,
    sectorName,
    url,
    ts: Date.now(),
    estimatedEarnings: earningsPerConversion * CONVERSION_RATE,
  });
  save(events);
}

export function getClicks(): ClickEvent[] {
  return load();
}

export function clearClicks(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// ── Seeded demo data so the dashboard isn't empty on first load ──
const SEED_KEY = "aicircus_seeded";

export function seedDemoData(): void {
  if (localStorage.getItem(SEED_KEY)) return;

  const services = [
    { name: "ChatGPT — OpenAI",    sector: "aigiants",     sectorName: "AI GIANTS" },
    { name: "Claude — Anthropic",  sector: "aigiants",     sectorName: "AI GIANTS" },
    { name: "Gemini — Google",     sector: "aigiants",     sectorName: "AI GIANTS" },
    { name: "Perplexity AI",       sector: "aigiants",     sectorName: "AI GIANTS" },
    { name: "Harvey AI",           sector: "legal",        sectorName: "LEGAL" },
    { name: "Salesforce Einstein", sector: "business",     sectorName: "BUSINESS" },
    { name: "Runway ML",           sector: "aifilms",      sectorName: "AI FILMS" },
    { name: "HeyGen",              sector: "aifilms",      sectorName: "AI FILMS" },
    { name: "Suno AI",             sector: "aimusic",      sectorName: "AI MUSIC" },
    { name: "Coursera AI",         sector: "education",    sectorName: "EDUCATION" },
    { name: "Duolingo Max",        sector: "education",    sectorName: "EDUCATION" },
    { name: "HubSpot AI",          sector: "business",     sectorName: "BUSINESS" },
    { name: "Notion AI",           sector: "business",     sectorName: "BUSINESS" },
    { name: "Jasper AI",           sector: "business",     sectorName: "BUSINESS" },
    { name: "CrowdStrike Falcon",  sector: "cybersecurity",sectorName: "CYBERSECURITY" },
    { name: "LangChain / LangGraph", sector: "multiagent", sectorName: "MULTI-AGENT AI" },
    { name: "CrewAI",              sector: "multiagent",   sectorName: "MULTI-AGENT AI" },
    { name: "Betterment",          sector: "finance",      sectorName: "FINANCE & BANKING" },
    { name: "Hopper AI",           sector: "travel",       sectorName: "TRAVEL" },
    { name: "Zillow AI",           sector: "realestate",   sectorName: "REAL ESTATE" },
    { name: "K Health",            sector: "healthcare",   sectorName: "HEALTH CARE" },
    { name: "Whoop AI",            sector: "sports",       sectorName: "SPORTS & FITNESS" },
    { name: "Stitch Fix AI",       sector: "fashion",      sectorName: "FASHION & BEAUTY" },
    { name: "Synthesia",           sector: "aifilms",      sectorName: "AI FILMS" },
    { name: "Gong.io",             sector: "business",     sectorName: "BUSINESS" },
  ];

  const now = Date.now();
  const DAY = 86400000;
  const events: ClickEvent[] = [];

  // Generate realistic click history over last 30 days
  services.forEach(s => {
    const base = 20 + Math.floor(Math.random() * 80);
    for (let i = 0; i < base; i++) {
      const daysAgo = Math.random() * 30;
      const ts = now - daysAgo * DAY;
      events.push({
        id: `seed-${ts}-${Math.random().toString(36).slice(2)}`,
        serviceName: s.name,
        sectorId: s.sector,
        sectorName: s.sectorName,
        url: "",
        ts,
        estimatedEarnings: estimateEarningsPerConversion(s.name) * CONVERSION_RATE,
      });
    }
  });

  events.sort((a, b) => a.ts - b.ts);
  save(events);
  localStorage.setItem(SEED_KEY, "1");
}

// ── Analytics aggregation helpers ──

export interface DashboardStats {
  totalClicks: number;
  totalEstimatedEarnings: number;
  estimatedConversions: number;
  clicksToday: number;
  clicksThisWeek: number;
  earningsToday: number;
  earningsThisWeek: number;
  topServices: { name: string; sectorName: string; clicks: number; earnings: number }[];
  topSectors: { sectorName: string; clicks: number; earnings: number }[];
  clicksByDay: { date: string; clicks: number; earnings: number }[];
  recentClicks: ClickEvent[];
}

export function computeStats(): DashboardStats {
  const events = load();
  const now = Date.now();
  const DAY = 86400000;
  const todayStart = new Date(); todayStart.setHours(0,0,0,0);
  const weekStart = now - 7 * DAY;

  const totalClicks = events.length;
  const totalEstimatedEarnings = events.reduce((s, e) => s + e.estimatedEarnings, 0);
  const estimatedConversions = Math.round(totalClicks * CONVERSION_RATE);

  const todayEvents = events.filter(e => e.ts >= todayStart.getTime());
  const weekEvents = events.filter(e => e.ts >= weekStart);

  const clicksToday = todayEvents.length;
  const clicksThisWeek = weekEvents.length;
  const earningsToday = todayEvents.reduce((s, e) => s + e.estimatedEarnings, 0);
  const earningsThisWeek = weekEvents.reduce((s, e) => s + e.estimatedEarnings, 0);

  // Top services
  const serviceMap: Record<string, { name: string; sectorName: string; clicks: number; earnings: number }> = {};
  events.forEach(e => {
    if (!serviceMap[e.serviceName]) serviceMap[e.serviceName] = { name: e.serviceName, sectorName: e.sectorName, clicks: 0, earnings: 0 };
    serviceMap[e.serviceName].clicks++;
    serviceMap[e.serviceName].earnings += e.estimatedEarnings;
  });
  const topServices = Object.values(serviceMap).sort((a, b) => b.earnings - a.earnings).slice(0, 10);

  // Top sectors
  const sectorMap: Record<string, { sectorName: string; clicks: number; earnings: number }> = {};
  events.forEach(e => {
    if (!sectorMap[e.sectorId]) sectorMap[e.sectorId] = { sectorName: e.sectorName, clicks: 0, earnings: 0 };
    sectorMap[e.sectorId].clicks++;
    sectorMap[e.sectorId].earnings += e.estimatedEarnings;
  });
  const topSectors = Object.values(sectorMap).sort((a, b) => b.earnings - a.earnings).slice(0, 8);

  // Clicks by day (last 30 days)
  const dayMap: Record<string, { clicks: number; earnings: number }> = {};
  for (let d = 29; d >= 0; d--) {
    const date = new Date(now - d * DAY);
    const key = date.toISOString().slice(0, 10);
    dayMap[key] = { clicks: 0, earnings: 0 };
  }
  events.forEach(e => {
    const key = new Date(e.ts).toISOString().slice(0, 10);
    if (dayMap[key]) {
      dayMap[key].clicks++;
      dayMap[key].earnings += e.estimatedEarnings;
    }
  });
  const clicksByDay = Object.entries(dayMap).map(([date, v]) => ({ date, ...v }));

  const recentClicks = [...events].sort((a, b) => b.ts - a.ts).slice(0, 20);

  return {
    totalClicks, totalEstimatedEarnings, estimatedConversions,
    clicksToday, clicksThisWeek, earningsToday, earningsThisWeek,
    topServices, topSectors, clicksByDay, recentClicks,
  };
}
