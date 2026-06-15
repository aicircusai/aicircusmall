import { useState } from "react";
import { X, Copy, Check, ChevronDown, ChevronUp } from "lucide-react";

interface EmailTemplate {
  id: string;
  company: string;
  role: string;
  to: string;
  subject: string;
  body: string;
  type: "acquire" | "invest" | "license" | "partnership";
  typeColor: string;
  typeLabel: string;
}

const emails: EmailTemplate[] = [
  {
    id: "perplexity",
    company: "Perplexity AI",
    role: "Aravind Srinivas, CEO",
    to: "aravind@perplexity.ai",
    subject: "AI CIRCUS.AI MEGA MALL — Acquisition / Partnership Opportunity",
    type: "acquire",
    typeColor: "#00e5ff",
    typeLabel: "ACQUISITION",
    body: `Hi Aravind,

I'm Manju .M, founder of AI CIRCUS.AI MEGA MALL — a fully-built, live AI navigation platform that organises every AI service across 39 sectors into a single destination marketplace.

Think of it as the "mall of AI" — consumers discover and click through to tools like Perplexity, OpenAI, Claude, and 396+ others. We track referrals and earn affiliate commissions on every conversion.

Why I'm reaching out to you specifically:
Perplexity is already listed as a top-tier partner in our marketplace. The platform is positioned to become the go-to discovery layer for AI products — which aligns directly with Perplexity's mission to be the answer engine people trust.

What I'm offering:
• Full acquisition of the platform and its affiliate network infrastructure
• Alternatively: a strategic investment + licensing deal
• The prototype is live, designed, and ready to scale

The ask: $150K–$500K depending on deal structure. For a company of your scale, that's one month of runway — and you'd own the AI discovery marketplace outright.

I'd love 20 minutes to walk you through the platform. Happy to send a live demo link.

Best,
Manju .M
Founder, AI CIRCUS.AI MEGA MALL
LinkedIn: https://www.linkedin.com/in/manjumasand/
X: https://x.com/almasonteam`,
  },
  {
    id: "microsoft",
    company: "Microsoft / Copilot",
    role: "Satya Nadella, CEO",
    to: "satyan@microsoft.com",
    subject: "AI Discovery Marketplace — Acquisition Opportunity for Microsoft Copilot",
    type: "acquire",
    typeColor: "#00e5ff",
    typeLabel: "ACQUISITION",
    body: `Hi Satya,

I'm Manju .M, founder of AI CIRCUS.AI MEGA MALL — a live, fully-designed AI navigation marketplace covering 39 sectors and 396+ AI services worldwide.

The platform functions like a curated mall for AI: users browse sectors (Legal AI, Health AI, Finance AI, Gaming AI, etc.), discover services, and click through via tracked affiliate links. Every conversion earns a commission.

Why Microsoft:
Microsoft Copilot is reshaping how people interact with AI. AI CIRCUS.AI MEGA MALL is the discovery and distribution layer that feeds users into AI products — including Copilot. Owning this platform means Microsoft controls the top-of-funnel for AI product discovery globally.

What's on the table:
• Outright acquisition: $250K–$500K
• Strategic investment with licensing: $150K–$300K
• White-label licensing for Copilot ecosystem: $50K + revenue share

The prototype is live. 39 sectors. 396+ services. Affiliate tracking. Partner portal. Earnings dashboard. Revenue model built in.

I'm looking for the right acquirer who sees AI discovery as the next frontier. I believe that's Microsoft.

Can we connect for 20 minutes?

Warm regards,
Manju .M
Founder, AI CIRCUS.AI MEGA MALL
LinkedIn: https://www.linkedin.com/in/manjumasand/
X: https://x.com/almasonteam`,
  },
  {
    id: "google",
    company: "Google / DeepMind",
    role: "Sundar Pichai, CEO",
    to: "sundar@google.com",
    subject: "AI CIRCUS.AI MEGA MALL — The Discovery Layer for the AI Economy",
    type: "invest",
    typeColor: "#ffd60a",
    typeLabel: "INVESTMENT",
    body: `Hi Sundar,

I'm Manju .M, and I've built something that I believe Google should own: AI CIRCUS.AI MEGA MALL — the world's first curated AI services marketplace spanning 39 sectors and 396+ products.

Google already powers the world's search. But AI services are fragmented — there's no single destination where users discover, compare, and navigate the entire AI ecosystem. AI CIRCUS.AI MEGA MALL is that destination.

The platform is live:
• 39 AI sectors from Healthcare to Legal to Crypto to Space
• 396+ AI services curated and categorised
• Affiliate partner portal with commission tracking
• Earnings dashboard and revenue infrastructure
• Google Gemini listed as an Elite partner

Google Gemini deserves to be the platform's anchor product. Acquiring or investing in AI CIRCUS.AI MEGA MALL gives Google ownership of the AI discovery experience — not just one product, but the entire ecosystem map.

Investment ask: $150K–$300K for a majority stake, or full acquisition at $250K–$500K.

I'd love to show you the live platform. Can we find 20 minutes?

Best,
Manju .M
Founder, AI CIRCUS.AI MEGA MALL
LinkedIn: https://www.linkedin.com/in/manjumasand/
X: https://x.com/almasonteam`,
  },
  {
    id: "amazon",
    company: "Amazon / AWS",
    role: "Andy Jassy, CEO",
    to: "jassy@amazon.com",
    subject: "AI Marketplace Acquisition — Built and Ready to Scale on AWS",
    type: "acquire",
    typeColor: "#00e5ff",
    typeLabel: "ACQUISITION",
    body: `Hi Andy,

My name is Manju .M. I've built AI CIRCUS.AI MEGA MALL — a live, production-ready AI discovery marketplace with 39 sectors, 396+ services, and a fully-functional affiliate revenue engine.

Amazon built the world's largest product marketplace. I've built the world's first AI services marketplace.

Why Amazon:
• AWS is already the infrastructure backbone for most of the AI companies in our platform
• Amazon has the distribution, the trust, and the infrastructure to take this global
• This fits naturally alongside Amazon's marketplace DNA and AWS Marketplace strategy

What I've built:
→ 39 AI sectors: Legal, Health, Finance, Gaming, Space, Crypto, and more
→ 396+ AI services with affiliate tracking and UTM parameters
→ Partner portal: applications, commission management, featured placement tiers
→ Earnings dashboard: click tracking, conversion data, revenue reporting

Acquisition price: $250K–$500K. Revenue share licensing also available.

For Amazon, this is a rounding error — but it's a first-mover advantage in AI distribution that is worth 10–100x that in 3 years.

Can we talk?

Manju .M
Founder, AI CIRCUS.AI MEGA MALL
LinkedIn: https://www.linkedin.com/in/manjumasand/
X: https://x.com/almasonteam`,
  },
  {
    id: "salesforce",
    company: "Salesforce",
    role: "Marc Benioff, CEO",
    to: "marc@salesforce.com",
    subject: "AI Discovery Platform — Built for the Enterprise AI Economy",
    type: "license",
    typeColor: "#30d158",
    typeLabel: "LICENSE / PARTNER",
    body: `Hi Marc,

I'm Manju .M, founder of AI CIRCUS.AI MEGA MALL — a live AI navigation marketplace with 39 sectors, 396+ AI services, and a fully-built affiliate and partner revenue system.

Salesforce Einstein is already one of our Elite partners — featured at the top of our Business AI sector with $18,900 in tracked earnings in our demo dataset.

Why Salesforce:
Salesforce is betting on AI agents and the Einstein platform. AI CIRCUS.AI MEGA MALL is the discovery and distribution channel that sends enterprise buyers toward AI solutions. Licensing or acquiring this platform gives Salesforce a curated top-of-funnel for enterprise AI product discovery.

What I'm proposing:
• White-label licensing deal: $50K upfront + 15% revenue share
• Strategic investment: $150K–$300K for equity stake
• Acquisition: $250K–$500K

This is a platform that complements Salesforce's AppExchange vision — extended to the entire AI economy.

I'd love 15 minutes on a call to show you the live prototype.

Best,
Manju .M
Founder, AI CIRCUS.AI MEGA MALL
LinkedIn: https://www.linkedin.com/in/manjumasand/
X: https://x.com/almasonteam`,
  },
  {
    id: "yc",
    company: "Y Combinator",
    role: "Garry Tan, President",
    to: "garry@ycombinator.com",
    subject: "AI CIRCUS.AI MEGA MALL — Seeking $300K Pre-Seed / YC Application",
    type: "invest",
    typeColor: "#ffd60a",
    typeLabel: "INVESTMENT",
    body: `Hi Garry,

I'm Manju .M — non-technical founder, first-time builder. I've built AI CIRCUS.AI MEGA MALL: a live AI discovery marketplace with 39 sectors, 396+ services, and a fully-working affiliate revenue engine.

The problem: AI products are exploding but discovery is broken. There's no curated, navigable hub where users can find the best AI tool for any life domain — from legal to health to gaming to crypto.

What I've built (solo, in weeks):
• 39 AI sectors, 396+ services, fully categorised
• Affiliate partner portal with commission tracking
• Earnings dashboard with revenue reporting
• Featured placement monetisation (Basic/Pro/Elite tiers)
• Mobile-responsive, dark neon aesthetic — designed to delight

The business model: affiliate commissions (15–30% per conversion) + featured placement fees ($299–$999/mo) + future white-label licensing.

Why now: Every AI company needs distribution. We're the mall. They're the stores.

I'm looking for $150K–$300K to hire a technical co-founder and scale to 10,000 AI services across 100 sectors.

YC has backed Airbnb, Stripe, OpenAI. I'm building the discovery layer for the AI economy. I'd love to apply or talk.

Manju .M
Founder, AI CIRCUS.AI MEGA MALL
LinkedIn: https://www.linkedin.com/in/manjumasand/
X: https://x.com/almasonteam`,
  },
  {
    id: "a16z",
    company: "Andreessen Horowitz (a16z)",
    role: "Marc Andreessen / Ben Horowitz",
    to: "info@a16z.com",
    subject: "Pre-Seed Investment: AI CIRCUS.AI MEGA MALL — The Mall of AI",
    type: "invest",
    typeColor: "#ffd60a",
    typeLabel: "INVESTMENT",
    body: `Hi Marc / Ben,

Software is eating the world. AI is now the world. And nobody has built the mall for it — until now.

I'm Manju .M, founder of AI CIRCUS.AI MEGA MALL: a live, designed, and revenue-ready AI discovery marketplace with 39 sectors, 396+ AI services, and a working affiliate monetisation engine.

The concept is simple: Amazon is for products. Netflix is for films. AI CIRCUS.AI MEGA MALL is for AI services — every one, in every industry, in one navigable destination.

Why a16z:
You backed Airbnb when no one believed in stranger-sharing. You backed Coinbase when crypto was fringe. AI CIRCUS.AI MEGA MALL is the infrastructure layer that routes consumers and enterprises into the AI economy — every affiliate click, every featured placement, every white-label license is revenue.

The numbers (demo dataset):
• 12 seeded Elite/Pro partners generating $180K+ simulated annual revenue
• Commission rates: 20–30% per conversion
• Featured placement: $299–$999/month per partner slot
• TAM: every AI company on earth needs distribution

The ask: $150K–$300K pre-seed for technical co-founder + scaling to 10K services.

I'd love to present to your AI fund. Can we get 20 minutes?

Manju .M
Founder, AI CIRCUS.AI MEGA MALL
LinkedIn: https://www.linkedin.com/in/manjumasand/
X: https://x.com/almasonteam`,
  },
];

const typeColors: Record<string, string> = {
  acquire: "#00e5ff",
  invest: "#ffd60a",
  license: "#30d158",
  partnership: "#af52de",
};

interface OutreachEmailsProps {
  onClose: () => void;
}

export function OutreachEmails({ onClose }: OutreachEmailsProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>("perplexity");
  const [filter, setFilter] = useState<"all" | "acquire" | "invest" | "license">("all");

  const filtered = filter === "all" ? emails : emails.filter(e => e.type === filter);

  function copyEmail(id: string, text: string) {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="min-h-screen px-4 py-8 max-w-4xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(24px, 5vw, 40px)", letterSpacing: "0.06em", color: "#eeeeff" }}>
            📧 OUTREACH EMAILS
          </h1>
          <p style={{ color: "rgba(238,238,255,0.5)", fontSize: "14px", marginTop: "4px" }}>
            7 personalised emails for top AI companies, investors & VCs
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full transition-all"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: "all" as const, label: "ALL (7)", color: "#eeeeff" },
          { id: "acquire" as const, label: "ACQUISITION", color: "#00e5ff" },
          { id: "invest" as const, label: "INVESTMENT", color: "#ffd60a" },
          { id: "license" as const, label: "LICENSE / PARTNER", color: "#30d158" },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className="px-3 py-1.5 rounded-full text-xs transition-all"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.08em",
              background: filter === f.id ? f.color + "20" : "rgba(255,255,255,0.04)",
              border: `1px solid ${filter === f.id ? f.color + "60" : "rgba(255,255,255,0.1)"}`,
              color: filter === f.id ? f.color : "rgba(255,255,255,0.4)",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Email cards */}
      <div className="flex flex-col gap-3">
        {filtered.map(email => {
          const isOpen = expanded === email.id;
          return (
            <div
              key={email.id}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${isOpen ? email.typeColor + "40" : "rgba(255,255,255,0.08)"}`,
                borderRadius: "12px",
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
            >
              {/* Card header */}
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setExpanded(isOpen ? null : email.id)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="px-2 py-0.5 rounded-full shrink-0 text-xs"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      background: email.typeColor + "15",
                      border: `1px solid ${email.typeColor}40`,
                      color: email.typeColor,
                    }}
                  >
                    {email.typeLabel}
                  </span>
                  <div className="min-w-0">
                    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "16px", letterSpacing: "0.04em", color: "#eeeeff" }}>
                      {email.company}
                    </p>
                    <p style={{ fontSize: "12px", color: "rgba(238,238,255,0.4)", marginTop: "2px" }}>
                      {email.role} · {email.to}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <button
                    onClick={e => { e.stopPropagation(); copyEmail(email.id, `TO: ${email.to}\nSUBJECT: ${email.subject}\n\n${email.body}`); }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all text-xs"
                    style={{
                      background: copied === email.id ? "#30d15820" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${copied === email.id ? "#30d15860" : "rgba(255,255,255,0.1)"}`,
                      color: copied === email.id ? "#30d158" : "rgba(255,255,255,0.5)",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {copied === email.id ? <><Check size={11} /> COPIED!</> : <><Copy size={11} /> COPY</>}
                  </button>
                  {isOpen ? <ChevronUp size={16} style={{ color: "rgba(255,255,255,0.3)" }} /> : <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.3)" }} />}
                </div>
              </button>

              {/* Expanded email */}
              {isOpen && (
                <div
                  className="px-5 pb-5"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="px-3 py-2 rounded-lg mb-3 mt-3"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <p style={{ fontSize: "11px", color: "rgba(238,238,255,0.4)", fontFamily: "'JetBrains Mono', monospace" }}>
                      SUBJECT: {email.subject}
                    </p>
                  </div>
                  <pre
                    style={{
                      fontSize: "13px",
                      color: "rgba(238,238,255,0.75)",
                      lineHeight: "1.7",
                      whiteSpace: "pre-wrap",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {email.body}
                  </pre>
                  <button
                    onClick={() => copyEmail(email.id + "_full", `TO: ${email.to}\nSUBJECT: ${email.subject}\n\n${email.body}`)}
                    className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm"
                    style={{
                      background: copied === email.id + "_full" ? "#30d15820" : email.typeColor + "15",
                      border: `1px solid ${copied === email.id + "_full" ? "#30d15860" : email.typeColor + "40"}`,
                      color: copied === email.id + "_full" ? "#30d158" : email.typeColor,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {copied === email.id + "_full" ? <><Check size={14} /> COPIED TO CLIPBOARD</> : <><Copy size={14} /> COPY FULL EMAIL</>}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer tip */}
      <div
        className="mt-8 p-4 rounded-xl"
        style={{ background: "rgba(255,214,10,0.05)", border: "1px solid rgba(255,214,10,0.15)" }}
      >
        <p style={{ fontSize: "12px", color: "rgba(255,214,10,0.7)", lineHeight: "1.6", fontFamily: "'DM Sans', sans-serif" }}>
          <strong style={{ color: "#ffd60a" }}>SENDING TIP:</strong> Find the CEO/founder on LinkedIn first, connect with a short note, then send the email. Response rates are 3–5× higher with a warm connection. Lead with the live demo link — let the product speak first.
        </p>
      </div>
    </div>
  );
}
