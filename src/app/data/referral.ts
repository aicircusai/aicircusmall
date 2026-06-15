// Commission rates per service (% of first payment or flat CPA in USD)
export interface CommissionConfig {
  type: "percent" | "cpa";
  rate: number; // percent (0–100) or flat USD
  cookieDays: number;
  network: string; // affiliate network or "direct"
  avgOrderUSD?: number; // for percent-based to estimate earnings
}

export const commissionMap: Record<string, CommissionConfig> = {
  // AI Giants
  "ChatGPT — OpenAI":       { type: "percent", rate: 20, cookieDays: 30, network: "OpenAI Affiliate", avgOrderUSD: 20 },
  "Claude — Anthropic":     { type: "percent", rate: 20, cookieDays: 30, network: "Anthropic Partner", avgOrderUSD: 20 },
  "Gemini — Google":        { type: "percent", rate: 15, cookieDays: 30, network: "Google Affiliate", avgOrderUSD: 20 },
  "Copilot — Microsoft":    { type: "percent", rate: 15, cookieDays: 30, network: "Microsoft Affiliate", avgOrderUSD: 30 },
  "Perplexity AI":          { type: "percent", rate: 25, cookieDays: 45, network: "PartnerStack", avgOrderUSD: 20 },
  "Cohere":                 { type: "cpa", rate: 150, cookieDays: 60, network: "Impact.com" },
  "Mistral AI":             { type: "cpa", rate: 80, cookieDays: 30, network: "Direct" },
  // Education
  "Khanmigo":               { type: "cpa", rate: 12, cookieDays: 30, network: "Impact.com" },
  "Coursera AI":            { type: "percent", rate: 45, cookieDays: 30, network: "ShareASale", avgOrderUSD: 49 },
  "Duolingo Max":           { type: "percent", rate: 20, cookieDays: 30, network: "Impact.com", avgOrderUSD: 13 },
  "Quizlet AI":             { type: "percent", rate: 30, cookieDays: 30, network: "CJ Affiliate", avgOrderUSD: 8 },
  "Elsa Speak":             { type: "percent", rate: 30, cookieDays: 45, network: "Impact.com", avgOrderUSD: 12 },
  // Healthcare
  "K Health":               { type: "cpa", rate: 25, cookieDays: 30, network: "Impact.com" },
  "Spring Health":          { type: "cpa", rate: 200, cookieDays: 60, network: "Direct" },
  "Lark Health":            { type: "cpa", rate: 150, cookieDays: 60, network: "Direct" },
  // Shopping
  "Amazon AI":              { type: "percent", rate: 4, cookieDays: 1, network: "Amazon Associates", avgOrderUSD: 80 },
  "Honey AI":               { type: "cpa", rate: 3, cookieDays: 7, network: "Impact.com" },
  // Real Estate
  "Zillow AI":              { type: "cpa", rate: 300, cookieDays: 90, network: "Direct" },
  "Compass AI":             { type: "cpa", rate: 500, cookieDays: 90, network: "Direct" },
  "HouseCanary":            { type: "cpa", rate: 200, cookieDays: 60, network: "Direct" },
  // Legal
  "Harvey AI":              { type: "cpa", rate: 500, cookieDays: 60, network: "Direct" },
  "CoCounsel":              { type: "cpa", rate: 300, cookieDays: 60, network: "Direct" },
  "DoNotPay":               { type: "percent", rate: 30, cookieDays: 30, network: "Impact.com", avgOrderUSD: 36 },
  "Spellbook":              { type: "cpa", rate: 200, cookieDays: 45, network: "PartnerStack" },
  // Travel
  "Hopper AI":              { type: "percent", rate: 2, cookieDays: 7, network: "CJ Affiliate", avgOrderUSD: 350 },
  "Kayak AI":               { type: "percent", rate: 1.5, cookieDays: 7, network: "CJ Affiliate", avgOrderUSD: 400 },
  "Mindtrip":               { type: "cpa", rate: 15, cookieDays: 30, network: "Impact.com" },
  // AI Films
  "Runway ML":              { type: "percent", rate: 20, cookieDays: 30, network: "PartnerStack", avgOrderUSD: 35 },
  "HeyGen":                 { type: "percent", rate: 25, cookieDays: 45, network: "PartnerStack", avgOrderUSD: 89 },
  "Synthesia":              { type: "percent", rate: 20, cookieDays: 30, network: "Impact.com", avgOrderUSD: 90 },
  "Invideo AI":             { type: "percent", rate: 30, cookieDays: 30, network: "ShareASale", avgOrderUSD: 25 },
  // AI Music
  "Suno AI":                { type: "percent", rate: 25, cookieDays: 30, network: "Direct", avgOrderUSD: 10 },
  "Udio":                   { type: "percent", rate: 25, cookieDays: 30, network: "Direct", avgOrderUSD: 10 },
  "Mubert":                 { type: "percent", rate: 30, cookieDays: 30, network: "PartnerStack", avgOrderUSD: 14 },
  "AIVA":                   { type: "percent", rate: 30, cookieDays: 30, network: "Direct", avgOrderUSD: 49 },
  "Soundraw":               { type: "percent", rate: 20, cookieDays: 30, network: "Impact.com", avgOrderUSD: 17 },
  // Jobs
  "LinkedIn AI":            { type: "cpa", rate: 50, cookieDays: 30, network: "Impact.com" },
  "HireVue":                { type: "cpa", rate: 500, cookieDays: 60, network: "Direct" },
  "Eightfold.ai":           { type: "cpa", rate: 1000, cookieDays: 90, network: "Direct" },
  // Business
  "Notion AI":              { type: "percent", rate: 20, cookieDays: 30, network: "PartnerStack", avgOrderUSD: 16 },
  "Jasper AI":              { type: "percent", rate: 25, cookieDays: 30, network: "Impact.com", avgOrderUSD: 59 },
  "Copy.ai":                { type: "percent", rate: 30, cookieDays: 30, network: "PartnerStack", avgOrderUSD: 36 },
  "Salesforce Einstein":    { type: "cpa", rate: 2000, cookieDays: 90, network: "Salesforce Partner" },
  "HubSpot AI":             { type: "percent", rate: 30, cookieDays: 90, network: "HubSpot Affiliate", avgOrderUSD: 90 },
  "Gong.io":                { type: "cpa", rate: 1500, cookieDays: 60, network: "Direct" },
  // Cybersecurity
  "CrowdStrike Falcon":     { type: "cpa", rate: 800, cookieDays: 90, network: "Impact.com" },
  "SentinelOne":            { type: "cpa", rate: 600, cookieDays: 60, network: "Direct" },
  "Snyk":                   { type: "cpa", rate: 300, cookieDays: 30, network: "PartnerStack" },
  // Finance
  "Betterment":             { type: "cpa", rate: 100, cookieDays: 30, network: "Impact.com" },
  "Wealthfront":            { type: "cpa", rate: 100, cookieDays: 30, network: "CJ Affiliate" },
  "Upstart":                { type: "cpa", rate: 200, cookieDays: 30, network: "Impact.com" },
  "Cleo":                   { type: "cpa", rate: 8, cookieDays: 30, network: "Impact.com" },
  // Insurance
  "Lemonade AI":            { type: "cpa", rate: 25, cookieDays: 30, network: "CJ Affiliate" },
  "Next Insurance":         { type: "cpa", rate: 80, cookieDays: 30, network: "Impact.com" },
  // Sports
  "Whoop AI":               { type: "percent", rate: 20, cookieDays: 30, network: "Impact.com", avgOrderUSD: 30 },
  "Freeletics":             { type: "percent", rate: 25, cookieDays: 30, network: "ShareASale", avgOrderUSD: 12 },
  // Fashion
  "Stitch Fix AI":          { type: "cpa", rate: 25, cookieDays: 7, network: "CJ Affiliate" },
  "Perfect Corp":           { type: "cpa", rate: 50, cookieDays: 30, network: "Impact.com" },
  // Multi-Agent
  "LangChain / LangGraph":  { type: "cpa", rate: 50, cookieDays: 30, network: "Direct" },
  "CrewAI":                 { type: "cpa", rate: 80, cookieDays: 30, network: "Direct" },
  "Salesforce AgentForce":  { type: "cpa", rate: 2000, cookieDays: 90, network: "Salesforce Partner" },
  "Microsoft AutoGen":      { type: "cpa", rate: 100, cookieDays: 30, network: "Microsoft Affiliate" },
  "Amazon Bedrock Agents":  { type: "percent", rate: 5, cookieDays: 30, network: "AWS Associates", avgOrderUSD: 500 },
};

export const DEFAULT_COMMISSION: CommissionConfig = {
  type: "cpa", rate: 15, cookieDays: 30, network: "Direct",
};

export function getCommission(serviceName: string): CommissionConfig {
  return commissionMap[serviceName] ?? DEFAULT_COMMISSION;
}

export function estimateEarningsPerConversion(serviceName: string): number {
  const c = getCommission(serviceName);
  if (c.type === "cpa") return c.rate;
  return ((c.rate / 100) * (c.avgOrderUSD ?? 50));
}

// Assumed conversion rate: 2.5% of clicks convert to signups/purchases
export const CONVERSION_RATE = 0.025;

export function buildReferralUrl(originalUrl: string, serviceName: string, sectorId: string): string {
  try {
    const url = new URL(originalUrl);
    url.searchParams.set("ref", "aicircusmall");
    url.searchParams.set("utm_source", "aicircusmall");
    url.searchParams.set("utm_medium", "referral");
    url.searchParams.set("utm_campaign", sectorId);
    url.searchParams.set("utm_content", serviceName.replace(/\s+/g, "_").toLowerCase());
    return url.toString();
  } catch {
    return originalUrl;
  }
}
