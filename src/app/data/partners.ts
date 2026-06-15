import { computeStats } from "./tracker";

export type PartnerStatus = "pending" | "approved" | "featured" | "suspended";

export interface FeaturedPlan {
  id: "basic" | "pro" | "elite";
  name: string;
  price: number; // USD/month
  perks: string[];
  color: string;
}

export const FEATURED_PLANS: FeaturedPlan[] = [
  {
    id: "basic",
    name: "BASIC LISTING",
    price: 0,
    color: "#666688",
    perks: ["Listed in your sector", "Standard card position", "Referral link tracking", "Monthly earnings report"],
  },
  {
    id: "pro",
    name: "PRO FEATURED",
    price: 299,
    color: "#00e5ff",
    perks: ["Top 3 position in sector", "FEATURED badge on card", "Cyan glow highlight", "Weekly earnings report", "Priority support"],
  },
  {
    id: "elite",
    name: "ELITE SPOTLIGHT",
    price: 999,
    color: "#ffd60a",
    perks: ["#1 position in sector", "ELITE badge with gold glow", "Homepage featured rotation", "Daily earnings report", "Dedicated account manager", "Co-marketing opportunities"],
  },
];

export interface Partner {
  id: string;
  company: string;
  website: string;
  contactName: string;
  contactEmail: string;
  category: string;
  commissionType: string;
  commissionRate: string;
  cookieDays: string;
  network: string;
  trackingUrl: string;
  notes: string;
  status: PartnerStatus;
  planId: "basic" | "pro" | "elite";
  appliedAt: number;
  approvedAt?: number;
  referralTag: string;
  totalClicks: number;
  totalEarnings: number;
}

const STORAGE_KEY = "aicircus_partners";

export function loadPartners(): Partner[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]"); }
  catch { return []; }
}

export function clearOldSeeds(): void {
  // Clear legacy seed keys so new AI Giants partners load
  ["aicircus_partners_seeded", "aicircus_partners_seeded_v2"].forEach(k => localStorage.removeItem(k));
}

function savePartners(partners: Partner[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(partners));
}

export function submitPartnerApplication(data: Omit<Partner, "id"|"status"|"planId"|"appliedAt"|"referralTag"|"totalClicks"|"totalEarnings">): Partner {
  const partners = loadPartners();
  const partner: Partner = {
    ...data,
    id: `partner-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    status: "approved", // auto-approve for demo
    planId: "basic",
    appliedAt: Date.now(),
    approvedAt: Date.now(),
    referralTag: `?ref=aicircusmall&utm_content=${data.company.toLowerCase().replace(/\s+/g, "_")}`,
    totalClicks: Math.floor(Math.random() * 80) + 5,
    totalEarnings: Math.random() * 400 + 20,
  };
  partners.push(partner);
  savePartners(partners);
  return partner;
}

export function updatePartnerPlan(id: string, planId: "basic" | "pro" | "elite"): void {
  const partners = loadPartners();
  const p = partners.find(p => p.id === id);
  if (p) {
    p.planId = planId;
    p.status = planId === "elite" ? "featured" : planId === "pro" ? "approved" : "approved";
  }
  savePartners(partners);
}

export function updateCommission(id: string, commissionType: string, commissionRate: string, cookieDays: string): void {
  const partners = loadPartners();
  const p = partners.find(p => p.id === id);
  if (p) { p.commissionType = commissionType; p.commissionRate = commissionRate; p.cookieDays = cookieDays; }
  savePartners(partners);
}

export function getFeaturedServices(): Set<string> {
  const partners = loadPartners();
  const names = new Set<string>();
  partners.filter(p => p.planId === "pro" || p.planId === "elite").forEach(p => names.add(p.company));
  ["Harvey AI", "Salesforce Einstein", "HeyGen", "Suno AI", "CrowdStrike Falcon", "Notion AI",
   "Perplexity AI", "Mistral AI", "Coinbase", "Whoop"].forEach(n => names.add(n));
  return names;
}

export function getEliteServices(): Set<string> {
  const partners = loadPartners();
  const names = new Set<string>();
  partners.filter(p => p.planId === "elite").forEach(p => names.add(p.company));
  ["OpenAI", "Anthropic Claude", "Google Gemini", "Salesforce Einstein",
   "ChatGPT — OpenAI", "Claude — Anthropic", "Gemini — Google"].forEach(n => names.add(n));
  return names;
}

// Seed demo partners — v3 includes AI Giants as elite partners
const SEED_KEY = "aicircus_partners_seeded_v3";

interface SeedEntry {
  company: string; website: string; contactName: string; contactEmail: string;
  category: string; commissionType: string; commissionRate: string;
  cookieDays: string; network: string; trackingUrl: string; notes: string;
  planId: Partner["planId"]; status: PartnerStatus; clicks: number; earnings: number;
}

export function seedDemoPartners(): void {
  if (localStorage.getItem(SEED_KEY)) return;
  const demos: SeedEntry[] = [
    // ── AI GIANTS — Elite ──
    { company: "OpenAI", website: "https://openai.com", contactName: "Sam Altman", contactEmail: "affiliates@openai.com", category: "AI Giants & Platforms", commissionType: "Flat CPA per signup", commissionRate: "50", cookieDays: "90", network: "Impact.com", trackingUrl: "https://openai.com/?via=aicircusmall", notes: "", planId: "elite", status: "featured", clicks: 8420, earnings: 42100 },
    { company: "Anthropic Claude", website: "https://claude.ai", contactName: "Dario Amodei", contactEmail: "partners@anthropic.com", category: "AI Giants & Platforms", commissionType: "% of first payment", commissionRate: "30", cookieDays: "90", network: "Impact.com", trackingUrl: "https://claude.ai/?via=aicircusmall", notes: "", planId: "elite", status: "featured", clicks: 6210, earnings: 31050 },
    { company: "Google Gemini", website: "https://gemini.google.com", contactName: "Sundar Pichai", contactEmail: "partners@google.com", category: "AI Giants & Platforms", commissionType: "% of recurring revenue", commissionRate: "20", cookieDays: "60", network: "CJ Affiliate", trackingUrl: "https://gemini.google.com/?via=aicircusmall", notes: "", planId: "elite", status: "featured", clicks: 5890, earnings: 29450 },
    { company: "Perplexity AI", website: "https://perplexity.ai", contactName: "Aravind Srinivas", contactEmail: "partners@perplexity.ai", category: "AI Giants & Platforms", commissionType: "% of first payment", commissionRate: "25", cookieDays: "60", network: "PartnerStack", trackingUrl: "", notes: "", planId: "pro", status: "approved", clicks: 3140, earnings: 9420 },
    { company: "Mistral AI", website: "https://mistral.ai", contactName: "Arthur Mensch", contactEmail: "partners@mistral.ai", category: "AI Giants & Platforms", commissionType: "% of first payment", commissionRate: "20", cookieDays: "45", network: "Direct / Custom API", trackingUrl: "", notes: "", planId: "pro", status: "approved", clicks: 1820, earnings: 3640 },
    // ── Industry Partners ──
    { company: "Salesforce Einstein", website: "https://salesforce.com", contactName: "Marc Benioff", contactEmail: "affiliates@salesforce.com", category: "Business", commissionType: "Flat CPA per qualified lead", commissionRate: "2000", cookieDays: "90", network: "ShareASale", trackingUrl: "", notes: "", planId: "elite", status: "featured", clicks: 2100, earnings: 18900 },
    { company: "Harvey AI", website: "https://harvey.ai", contactName: "Winston Weinberg", contactEmail: "partners@harvey.ai", category: "Legal", commissionType: "Flat CPA per qualified lead", commissionRate: "500", cookieDays: "60", network: "Direct / Custom API", trackingUrl: "https://harvey.ai/?via=aicircusmall", notes: "", planId: "pro", status: "approved", clicks: 980, earnings: 12250 },
    { company: "HeyGen", website: "https://heygen.com", contactName: "Joshua Xu", contactEmail: "growth@heygen.com", category: "AI Films", commissionType: "% of first payment", commissionRate: "25", cookieDays: "45", network: "PartnerStack", trackingUrl: "", notes: "", planId: "pro", status: "approved", clicks: 1540, earnings: 6160 },
    { company: "Suno AI", website: "https://suno.ai", contactName: "Mikey Shulman", contactEmail: "partners@suno.ai", category: "AI Music", commissionType: "% of first payment", commissionRate: "25", cookieDays: "30", network: "Direct / Custom API", trackingUrl: "", notes: "", planId: "basic", status: "approved", clicks: 870, earnings: 2175 },
    { company: "CrowdStrike Falcon", website: "https://crowdstrike.com", contactName: "George Kurtz", contactEmail: "channel@crowdstrike.com", category: "Cybersecurity", commissionType: "Flat CPA per signup", commissionRate: "800", cookieDays: "90", network: "Impact.com", trackingUrl: "", notes: "", planId: "pro", status: "approved", clicks: 640, earnings: 9600 },
    { company: "Whoop", website: "https://whoop.com", contactName: "Will Ahmed", contactEmail: "partners@whoop.com", category: "Sports & Fitness AI", commissionType: "% of first payment", commissionRate: "20", cookieDays: "30", network: "ShareASale", trackingUrl: "", notes: "", planId: "basic", status: "approved", clicks: 720, earnings: 2880 },
    { company: "Coinbase", website: "https://coinbase.com", contactName: "Brian Armstrong", contactEmail: "affiliates@coinbase.com", category: "Crypto & Web3 AI", commissionType: "Flat CPA per signup", commissionRate: "100", cookieDays: "30", network: "Impact.com", trackingUrl: "", notes: "", planId: "pro", status: "approved", clicks: 1230, earnings: 12300 },
  ];
  const partners: Partner[] = demos.map((d, i) => ({
    company: d.company, website: d.website, contactName: d.contactName, contactEmail: d.contactEmail,
    category: d.category, commissionType: d.commissionType, commissionRate: d.commissionRate,
    cookieDays: d.cookieDays, network: d.network, trackingUrl: d.trackingUrl, notes: d.notes,
    id: `seed-${i}`,
    status: d.status,
    planId: d.planId,
    appliedAt: Date.now() - (i + 1) * 86400000 * 3,
    approvedAt: Date.now() - (i + 1) * 86400000 * 2,
    referralTag: `?ref=aicircusmall&utm_content=${d.company.toLowerCase().replace(/\s+/g, "_")}`,
    totalClicks: d.clicks,
    totalEarnings: d.earnings,
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(partners));
  localStorage.setItem(SEED_KEY, "1");
}
