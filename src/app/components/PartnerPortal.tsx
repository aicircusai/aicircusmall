import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BarChart2, Star, Link2, Download, CheckCircle,
  ExternalLink, Zap, Crown, MousePointerClick,
  DollarSign, Edit3, Save, X, ChevronRight, Shield, Copy, Check,
  CreditCard, Lock, Sparkles, Banknote, Building2, Globe,
} from "lucide-react";
import {
  loadPartners, updatePartnerPlan, updateCommission, seedDemoPartners,
  FEATURED_PLANS, type Partner, type FeaturedPlan,
} from "../data/partners";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const commissionTypes = ["% of first payment", "% of recurring revenue", "Flat CPA per signup", "Flat CPA per qualified lead"];

function fmt$(n: number) { return n >= 1000 ? `$${(n/1000).toFixed(1)}K` : `$${n.toFixed(2)}`; }

function PlanBadge({ planId }: { planId: Partner["planId"] }) {
  const map = {
    basic: { label: "BASIC", color: "#666688" },
    pro: { label: "PRO", color: "#00e5ff" },
    elite: { label: "ELITE ★", color: "#ffd60a" },
  };
  const p = map[planId];
  return (
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", color: p.color, background: p.color + "18", border: `1px solid ${p.color}44`, borderRadius: "4px", padding: "2px 6px" }}>
      {p.label}
    </span>
  );
}

function StatusDot({ status }: { status: Partner["status"] }) {
  const c = status === "approved" || status === "featured" ? "#30d158" : status === "pending" ? "#ffd60a" : "#ff453a";
  return <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: c, boxShadow: `0 0 6px ${c}`, marginRight: 6 }} />;
}

function makeSparkline(seed: number) {
  return Array.from({ length: 14 }, (_, i) => ({
    d: i,
    v: Math.max(0, Math.floor((seed % 20) + Math.sin(i * 0.8 + seed) * 8 + i * 0.5)),
  }));
}

// Toast notification
function Toast({ message, color, onDone }: { message: string; color: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-5 py-3 rounded-2xl"
      style={{ background: "#0c0c18", border: `1px solid ${color}55`, boxShadow: `0 0 30px ${color}44`, color }}
    >
      <CheckCircle size={16} />
      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "15px", letterSpacing: "0.08em" }}>{message}</span>
    </motion.div>
  );
}

// Mock payment modal
function UpgradeModal({
  plan, partner, onConfirm, onClose,
}: {
  plan: FeaturedPlan; partner: Partner; onConfirm: () => void; onClose: () => void;
}) {
  const [step, setStep] = useState<"review" | "card" | "processing" | "done">("review");
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "", name: "" });

  function fmtCard(v: string) {
    return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  }
  function fmtExpiry(v: string) {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
  }

  function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setStep("processing");
    setTimeout(() => { setStep("done"); }, 2200);
    setTimeout(() => { onConfirm(); }, 4000);
  }

  const inputStyle = {
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
    color: "#eeeeff", fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
    borderRadius: "10px", padding: "10px 14px", outline: "none", width: "100%",
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        className="relative w-full max-w-md rounded-2xl overflow-hidden"
        style={{ background: "#0c0c18", border: `1px solid ${plan.color}44`, boxShadow: `0 0 60px ${plan.color}22` }}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-1 rounded-lg opacity-50 hover:opacity-100 transition-opacity" style={{ color: "#eeeeff" }}>
          <X size={16} />
        </button>

        {step === "review" && (
          <div className="p-7">
            <div className="flex items-center gap-3 mb-5">
              {plan.id === "elite" ? <Crown size={22} style={{ color: plan.color }} /> : <Star size={22} style={{ color: plan.color }} />}
              <div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.2em", color: "var(--muted-foreground)" }}>UPGRADE TO</p>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "24px", color: plan.color }}>{plan.name}</h3>
              </div>
            </div>

            <div className="p-4 rounded-xl mb-5" style={{ background: plan.color + "0c", border: `1px solid ${plan.color}25` }}>
              <div className="flex justify-between items-center mb-3">
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--muted-foreground)" }}>COMPANY</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#eeeeff" }}>{partner.company}</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--muted-foreground)" }}>PLAN</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: plan.color }}>{plan.name}</span>
              </div>
              <div className="flex justify-between items-center pt-3" style={{ borderTop: `1px solid ${plan.color}20` }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--muted-foreground)" }}>BILLED MONTHLY</span>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "28px", color: plan.color }}>${plan.price}/mo</span>
              </div>
            </div>

            <ul className="flex flex-col gap-2 mb-5">
              {plan.perks.map(perk => (
                <li key={perk} className="flex items-start gap-2">
                  <CheckCircle size={13} style={{ color: plan.color, flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "var(--muted-foreground)" }}>{perk}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setStep("card")}
              className="w-full py-3 rounded-xl transition-all"
              style={{ background: `linear-gradient(135deg, ${plan.color}, ${plan.id === "elite" ? "#ff9500" : "#30d158"})`, color: "#000", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "17px", letterSpacing: "0.1em", boxShadow: `0 0 24px ${plan.color}55` }}
            >
              PROCEED TO PAYMENT →
            </button>
            <p className="text-center mt-3 flex items-center justify-center gap-1" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "var(--muted-foreground)", letterSpacing: "0.1em" }}>
              <Lock size={9} /> CANCEL ANYTIME · NO CONTRACTS
            </p>
          </div>
        )}

        {step === "card" && (
          <form onSubmit={handlePay} className="p-7">
            <div className="flex items-center gap-2 mb-5">
              <CreditCard size={18} style={{ color: plan.color }} />
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "20px", color: "#eeeeff" }}>PAYMENT DETAILS</h3>
            </div>

            <div className="flex flex-col gap-4 mb-5">
              <div>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.15em", color: "var(--muted-foreground)", display: "block", marginBottom: "5px" }}>CARDHOLDER NAME</label>
                <input required style={inputStyle} placeholder="Jane Smith" value={card.name} onChange={e => setCard(c => ({ ...c, name: e.target.value }))}
                  onFocus={e => (e.target.style.borderColor = plan.color)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
              </div>
              <div>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.15em", color: "var(--muted-foreground)", display: "block", marginBottom: "5px" }}>CARD NUMBER</label>
                <input required style={inputStyle} placeholder="4242 4242 4242 4242" value={card.number}
                  onChange={e => setCard(c => ({ ...c, number: fmtCard(e.target.value) }))}
                  onFocus={e => (e.target.style.borderColor = plan.color)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
              </div>
              <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <div>
                  <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.15em", color: "var(--muted-foreground)", display: "block", marginBottom: "5px" }}>EXPIRY</label>
                  <input required style={inputStyle} placeholder="MM/YY" value={card.expiry}
                    onChange={e => setCard(c => ({ ...c, expiry: fmtExpiry(e.target.value) }))}
                    onFocus={e => (e.target.style.borderColor = plan.color)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                </div>
                <div>
                  <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.15em", color: "var(--muted-foreground)", display: "block", marginBottom: "5px" }}>CVC</label>
                  <input required style={inputStyle} placeholder="123" maxLength={4} value={card.cvc}
                    onChange={e => setCard(c => ({ ...c, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                    onFocus={e => (e.target.style.borderColor = plan.color)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button type="button" onClick={() => setStep("review")} className="px-4 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", color: "var(--muted-foreground)", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "13px" }}>← BACK</button>
              <button type="submit" className="flex-1 py-2.5 rounded-xl transition-all" style={{ background: plan.color, color: "#000", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "16px", letterSpacing: "0.08em", boxShadow: `0 0 20px ${plan.color}55` }}>
                PAY ${plan.price}/MO →
              </button>
            </div>
            <p className="text-center mt-3 flex items-center justify-center gap-1" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "var(--muted-foreground)" }}>
              <Lock size={9} /> DEMO ONLY — NO REAL CHARGES
            </p>
          </form>
        )}

        {step === "processing" && (
          <div className="p-10 flex flex-col items-center gap-5">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ border: `2px solid ${plan.color}44`, borderTopColor: plan.color, animation: "spin 0.8s linear infinite" }}>
              <Zap size={24} style={{ color: plan.color }} />
            </div>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "20px", color: "#eeeeff" }}>PROCESSING PAYMENT…</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--muted-foreground)", letterSpacing: "0.12em" }}>SECURING YOUR LISTING</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {step === "done" && (
          <div className="p-10 flex flex-col items-center gap-4 text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: plan.color + "18", border: `2px solid ${plan.color}` }}>
              {plan.id === "elite" ? <Crown size={36} style={{ color: plan.color }} /> : <Star size={36} style={{ color: plan.color }} />}
            </div>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "32px", color: plan.color, textShadow: `0 0 30px ${plan.color}66` }}>YOU'RE {plan.id === "elite" ? "ELITE" : "FEATURED"}!</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
              <strong style={{ color: "#eeeeff" }}>{partner.company}</strong> now appears with{" "}
              {plan.id === "elite" ? "a gold ELITE badge at the #1 position" : "a FEATURED badge in the top 3"}{" "}
              in your sector.
            </p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--muted-foreground)", letterSpacing: "0.1em" }}>REDIRECTING TO PORTAL…</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function PayoutTab({ partner, onToast }: { partner: Partner; onToast: (msg: string, color: string) => void }) {
  const [method, setMethod] = useState<"paypal" | "bank" | "wise">("paypal");
  const [email, setEmail] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNum, setAccountNum] = useState("");
  const [routing, setRouting] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    onToast("Payout settings saved!", "#30d158");
    setTimeout(() => setSaved(false), 3000);
  }

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
    color: "#eeeeff", fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
    borderRadius: "10px", padding: "10px 14px", outline: "none", width: "100%",
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.15em",
    color: "var(--muted-foreground)", display: "block", marginBottom: "5px",
  };

  return (
    <div className="flex flex-col gap-5 max-w-lg">
      {/* Pending balance */}
      <div className="p-5 rounded-xl" style={{ background: "rgba(255,214,10,0.06)", border: "1px solid rgba(255,214,10,0.2)" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.2em", color: "#ffd60a", marginBottom: "8px" }}>PENDING BALANCE</p>
        <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "48px", color: "#ffd60a", lineHeight: 1, textShadow: "0 0 30px rgba(255,214,10,0.5)" }}>
          ${partner.totalEarnings.toFixed(2)}
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "var(--muted-foreground)", marginTop: "6px" }}>
          Payouts processed NET-30 · Minimum threshold: $50.00
        </p>
        <div className="flex items-center gap-2 mt-3 p-2 rounded-lg" style={{ background: "rgba(48,209,88,0.08)", border: "1px solid rgba(48,209,88,0.2)" }}>
          <CheckCircle size={12} style={{ color: "#30d158", flexShrink: 0 }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#30d158", letterSpacing: "0.08em" }}>
            NEXT PAYOUT: {new Date(Date.now() + 18 * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>
      </div>

      {/* Method selector */}
      <div>
        <p style={{ ...labelStyle, marginBottom: "10px" }}>SELECT PAYOUT METHOD</p>
        <div className="flex gap-2">
          {([
            { id: "paypal" as const, label: "PayPal", icon: <Globe size={14} />, color: "#003087" },
            { id: "bank" as const, label: "Bank Transfer", icon: <Building2 size={14} />, color: "#30d158" },
            { id: "wise" as const, label: "Wise", icon: <Banknote size={14} />, color: "#9fe870" },
          ]).map(m => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "12px", letterSpacing: "0.06em",
                background: method === m.id ? "rgba(48,209,88,0.12)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${method === m.id ? "#30d158" : "rgba(255,255,255,0.08)"}`,
                color: method === m.id ? "#30d158" : "var(--muted-foreground)",
              }}
            >
              {m.icon} {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="flex flex-col gap-4 p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        {method === "paypal" && (
          <div>
            <label style={labelStyle}>PAYPAL EMAIL</label>
            <input required style={inputStyle} placeholder="you@paypal.com" value={email} onChange={e => setEmail(e.target.value)}
              onFocus={e => (e.target.style.borderColor = "#30d158")} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
          </div>
        )}
        {method === "wise" && (
          <div>
            <label style={labelStyle}>WISE EMAIL OR ACCOUNT ID</label>
            <input required style={inputStyle} placeholder="you@wise.com" value={email} onChange={e => setEmail(e.target.value)}
              onFocus={e => (e.target.style.borderColor = "#30d158")} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
          </div>
        )}
        {method === "bank" && (
          <>
            <div>
              <label style={labelStyle}>BANK NAME</label>
              <input required style={inputStyle} placeholder="e.g. Chase, Bank of America" value={bankName} onChange={e => setBankName(e.target.value)}
                onFocus={e => (e.target.style.borderColor = "#30d158")} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
            </div>
            <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div>
                <label style={labelStyle}>ACCOUNT NUMBER</label>
                <input required style={inputStyle} placeholder="••••••••" value={accountNum} onChange={e => setAccountNum(e.target.value)}
                  onFocus={e => (e.target.style.borderColor = "#30d158")} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
              </div>
              <div>
                <label style={labelStyle}>ROUTING NUMBER</label>
                <input required style={inputStyle} placeholder="9 digits" value={routing} onChange={e => setRouting(e.target.value)}
                  onFocus={e => (e.target.style.borderColor = "#30d158")} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
              </div>
            </div>
          </>
        )}
        <button
          type="submit"
          className="w-full py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          style={{ background: saved ? "rgba(48,209,88,0.2)" : "#30d158", color: saved ? "#30d158" : "#000", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "16px", letterSpacing: "0.1em", border: saved ? "1px solid #30d158" : "none" }}
          onMouseEnter={e => { if (!saved) (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(48,209,88,0.5)"; }}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "none"}
        >
          {saved ? <><Check size={16} /> PAYOUT SETTINGS SAVED</> : "SAVE PAYOUT SETTINGS →"}
        </button>
        <p className="text-center flex items-center justify-center gap-1" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "var(--muted-foreground)" }}>
          <Lock size={9} /> DEMO MODE — NO REAL PAYMENTS PROCESSED
        </p>
      </form>

      {/* Payout history */}
      <div className="p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
        <p style={{ ...labelStyle, marginBottom: "12px" }}>PAYOUT HISTORY</p>
        {[
          { date: "May 30, 2026", amount: 1240.50, status: "PAID", method: "PayPal" },
          { date: "Apr 30, 2026", amount: 890.00, status: "PAID", method: "PayPal" },
          { date: "Mar 30, 2026", amount: 1105.75, status: "PAID", method: "PayPal" },
        ].map(p => (
          <div key={p.date} className="flex items-center justify-between py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#eeeeff" }}>{p.date}</p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "var(--muted-foreground)" }}>{p.method}</p>
            </div>
            <div className="text-right">
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "16px", color: "#30d158" }}>${p.amount.toFixed(2)}</p>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#30d158", letterSpacing: "0.1em" }}>{p.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PartnerPortal({ onApply }: { onApply: () => void }) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [tab, setTab] = useState<"overview" | "commission" | "featured" | "link" | "payout">("overview");
  const [editComm, setEditComm] = useState(false);
  const [commType, setCommType] = useState("");
  const [commRate, setCommRate] = useState("");
  const [cookieDays, setCookieDays] = useState("");
  const [upgrading, setUpgrading] = useState<FeaturedPlan | null>(null);
  const [toast, setToast] = useState<{ msg: string; color: string } | null>(null);
  const [copied, setCopied] = useState(false);

  function reload() {
    seedDemoPartners();
    const ps = loadPartners();
    setPartners(ps);
    if (!activeId && ps.length) setActiveId(ps[0].id);
  }

  useEffect(() => { reload(); }, []);

  const active = partners.find(p => p.id === activeId) ?? null;

  function startEdit() {
    if (!active) return;
    setCommType(active.commissionType);
    setCommRate(active.commissionRate);
    setCookieDays(active.cookieDays);
    setEditComm(true);
  }

  function saveCommission() {
    if (!active) return;
    updateCommission(active.id, commType, commRate, cookieDays);
    setEditComm(false);
    reload();
    setToast({ msg: "Commission settings saved!", color: "#30d158" });
  }

  function handleUpgradeConfirm() {
    if (!active || !upgrading) return;
    updatePartnerPlan(active.id, upgrading.id);
    setUpgrading(null);
    reload();
    setToast({ msg: `Upgraded to ${upgrading.name}!`, color: upgrading.color });
  }

  function copyTag() {
    if (!active) return;
    navigator.clipboard.writeText(active.referralTag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setToast({ msg: "Referral tag copied to clipboard!", color: "#00e5ff" });
  }

  function copyFullUrl() {
    if (!active) return;
    const url = `${active.website || "https://yourservice.ai"}?ref=aicircusmall&utm_source=aicircusmall&utm_medium=referral&utm_campaign=${active.category.toLowerCase().replace(/\s+/g, "_")}&utm_content=${active.company.toLowerCase().replace(/\s+/g, "_")}`;
    navigator.clipboard.writeText(url);
    setToast({ msg: "Full tracking URL copied!", color: "#ffd60a" });
  }

  function downloadReport() {
    if (!active) return;
    const rows = [
      ["Metric", "Value"],
      ["Company", active.company],
      ["Plan", active.planId],
      ["Total Clicks", active.totalClicks.toString()],
      ["Est. Conversions", Math.round(active.totalClicks * 0.025).toString()],
      ["Est. Earnings", `$${active.totalEarnings.toFixed(2)}`],
      ["Commission Type", active.commissionType],
      ["Commission Rate", active.commissionRate],
      ["Cookie Window", active.cookieDays + " days"],
      ["Network", active.network || "Direct"],
      ["Referral Tag", active.referralTag],
    ];
    const csv = rows.map(r => r.join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `${active.company.replace(/\s+/g, "-")}-report.csv`;
    a.click();
    setToast({ msg: "CSV report downloaded!", color: "#bf5af2" });
  }

  const sparkData = active ? makeSparkline(active.totalClicks) : [];

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: <BarChart2 size={13} /> },
    { id: "commission" as const, label: "Commission", icon: <DollarSign size={13} /> },
    { id: "featured" as const, label: "Featured", icon: <Star size={13} /> },
    { id: "link" as const, label: "My Link", icon: <Link2 size={13} /> },
    { id: "payout" as const, label: "Payout", icon: <Banknote size={13} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast key={toast.msg} message={toast.msg} color={toast.color} onDone={() => setToast(null)} />}
      </AnimatePresence>

      {/* Upgrade modal */}
      <AnimatePresence>
        {upgrading && active && (
          <UpgradeModal plan={upgrading} partner={active} onConfirm={handleUpgradeConfirm} onClose={() => setUpgrading(null)} />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.25em", color: "#30d158", marginBottom: "6px" }}>PARTNER PORTAL</p>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(32px,6vw,58px)", fontWeight: 900, letterSpacing: "0.04em", color: "#fff", lineHeight: 1, textShadow: "0 0 40px rgba(48,209,88,0.3)" }}>
            🤝 MY LISTINGS
          </h1>
        </div>
        <button
          onClick={onApply}
          className="flex items-center gap-2 px-5 py-3 rounded-xl transition-all"
          style={{ background: "linear-gradient(135deg,#30d158,#00e5ff)", color: "#000", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "14px", letterSpacing: "0.1em", boxShadow: "0 0 24px rgba(48,209,88,0.4)" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(48,209,88,0.6)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(48,209,88,0.4)"}
        >
          + ADD NEW LISTING
        </button>
      </div>

      {partners.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-5">
          <span className="text-6xl">🤝</span>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "24px", color: "var(--muted-foreground)" }}>No partners yet</p>
          <button onClick={onApply} className="px-6 py-3 rounded-xl" style={{ background: "linear-gradient(135deg,#30d158,#00e5ff)", color: "#000", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "15px", letterSpacing: "0.1em" }}>APPLY TO JOIN</button>
        </div>
      ) : (
        <div className="grid gap-6" style={{ gridTemplateColumns: "280px 1fr" }}>
          {/* Sidebar */}
          <div className="flex flex-col gap-3">
            {partners.map(p => (
              <button
                key={p.id}
                onClick={() => { setActiveId(p.id); setTab("overview"); setEditComm(false); }}
                className="text-left p-4 rounded-xl transition-all border"
                style={{
                  background: activeId === p.id ? "rgba(48,209,88,0.08)" : "#0c0c18",
                  borderColor: activeId === p.id ? "#30d158aa" : "rgba(255,255,255,0.06)",
                  boxShadow: activeId === p.id ? "0 0 20px rgba(48,209,88,0.15)" : "none",
                }}
                onMouseEnter={e => { if (activeId !== p.id) (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; }}
                onMouseLeave={e => { if (activeId !== p.id) (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "16px", letterSpacing: "0.04em", color: "#eeeeff" }}>{p.company}</span>
                  <PlanBadge planId={p.planId} />
                </div>
                <div className="flex items-center gap-2">
                  <StatusDot status={p.status} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--muted-foreground)" }}>{p.category}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#ffd60a" }}>{fmt$(p.totalEarnings)}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--muted-foreground)" }}>{p.totalClicks} clicks</span>
                </div>
              </button>
            ))}
          </div>

          {/* Main panel */}
          {active && (
            <div className="rounded-2xl overflow-hidden" style={{ background: "#0c0c18", border: "1px solid rgba(255,255,255,0.07)" }}>
              {/* Panel header */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-6 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "28px", letterSpacing: "0.04em", color: "#eeeeff" }}>{active.company}</h2>
                    <PlanBadge planId={active.planId} />
                    <StatusDot status={active.status} />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--muted-foreground)" }}>{active.status.toUpperCase()}</span>
                  </div>
                  <a href={active.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:opacity-70 transition-opacity" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#30d158" }}>
                    {active.website} <ExternalLink size={11} />
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "28px", fontWeight: 900, color: "#ffd60a", textShadow: "0 0 20px rgba(255,214,10,0.5)", lineHeight: 1 }}>{fmt$(active.totalEarnings)}</p>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "var(--muted-foreground)", letterSpacing: "0.12em" }}>EST. EARNINGS</p>
                  </div>
                  <div className="text-right">
                    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "28px", fontWeight: 900, color: "#00e5ff", lineHeight: 1 }}>{active.totalClicks.toLocaleString()}</p>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "var(--muted-foreground)", letterSpacing: "0.12em" }}>TOTAL CLICKS</p>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                {tabs.map(t => (
                  <button
                    key={t.id}
                    onClick={() => { setTab(t.id); setEditComm(false); }}
                    className="flex items-center gap-1.5 px-5 py-3 transition-all"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "13px",
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      color: tab === t.id ? "#30d158" : "var(--muted-foreground)",
                      borderBottom: tab === t.id ? "2px solid #30d158" : "2px solid transparent",
                      marginBottom: "-1px",
                    }}
                  >{t.icon}{t.label}</button>
                ))}
              </div>

              <div className="p-6">
                {/* ─── OVERVIEW ─── */}
                {tab === "overview" && (
                  <div className="flex flex-col gap-5">
                    <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))" }}>
                      {[
                        { label: "TOTAL CLICKS", value: active.totalClicks.toLocaleString(), color: "#00e5ff", icon: <MousePointerClick size={14} /> },
                        { label: "EST. CONVERSIONS", value: Math.round(active.totalClicks * 0.025).toString(), color: "#30d158", icon: <CheckCircle size={14} /> },
                        { label: "EST. EARNINGS", value: fmt$(active.totalEarnings), color: "#ffd60a", icon: <DollarSign size={14} /> },
                        { label: "COOKIE WINDOW", value: `${active.cookieDays}d`, color: "#bf5af2", icon: <Shield size={14} /> },
                      ].map(s => (
                        <div key={s.label} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                          <div className="flex items-center justify-between mb-2">
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", letterSpacing: "0.15em", color: "var(--muted-foreground)" }}>{s.label}</span>
                            <span style={{ color: s.color }}>{s.icon}</span>
                          </div>
                          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "26px", fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.15em", color: "var(--muted-foreground)", marginBottom: "12px" }}>CLICKS · LAST 14 DAYS</p>
                      <ResponsiveContainer width="100%" height={100}>
                        <AreaChart data={sparkData}>
                          <defs>
                            <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#30d158" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#30d158" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                          <XAxis dataKey="d" hide />
                          <YAxis hide />
                          <Tooltip
                            contentStyle={{ background: "#0c0c18", border: "1px solid rgba(48,209,88,0.3)", borderRadius: "8px", fontFamily: "JetBrains Mono", fontSize: "11px", color: "#eeeeff" }}
                            formatter={(v: number) => [v, "clicks"]}
                          />
                          <Area type="monotone" dataKey="v" stroke="#30d158" strokeWidth={2} fill="url(#sg)" dot={false} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <button
                      onClick={downloadReport}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl self-start transition-all"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--muted-foreground)", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "0.08em" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(191,90,242,0.1)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(191,90,242,0.4)"; (e.currentTarget as HTMLElement).style.color = "#bf5af2"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "var(--muted-foreground)"; }}
                    >
                      <Download size={13} /> DOWNLOAD CSV REPORT
                    </button>
                  </div>
                )}

                {/* ─── COMMISSION ─── */}
                {tab === "commission" && (
                  <div className="flex flex-col gap-5 max-w-lg">
                    <div className="p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="flex items-center justify-between mb-4">
                        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.15em", color: "var(--muted-foreground)" }}>CURRENT COMMISSION</p>
                        {!editComm && (
                          <button
                            onClick={startEdit}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all"
                            style={{ background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.25)", color: "#00e5ff", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "12px", letterSpacing: "0.08em" }}
                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,229,255,0.18)"}
                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,229,255,0.08)"}
                          >
                            <Edit3 size={12} /> EDIT
                          </button>
                        )}
                      </div>

                      {editComm ? (
                        <div className="flex flex-col gap-3">
                          <div>
                            <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.15em", color: "var(--muted-foreground)", display: "block", marginBottom: "5px" }}>COMMISSION TYPE</label>
                            <select value={commType} onChange={e => setCommType(e.target.value)} className="w-full px-3 py-2 rounded-lg outline-none" style={{ background: "#12121f", border: "1px solid rgba(0,229,255,0.3)", color: "#eeeeff", fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }}>
                              {commissionTypes.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                          </div>
                          <div>
                            <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.15em", color: "var(--muted-foreground)", display: "block", marginBottom: "5px" }}>RATE (% or $)</label>
                            <input value={commRate} onChange={e => setCommRate(e.target.value)} className="w-full px-3 py-2 rounded-lg outline-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,229,255,0.3)", color: "#eeeeff", fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }}
                              onFocus={e => (e.target.style.borderColor = "#00e5ff")} onBlur={e => (e.target.style.borderColor = "rgba(0,229,255,0.3)")} />
                          </div>
                          <div>
                            <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.15em", color: "var(--muted-foreground)", display: "block", marginBottom: "5px" }}>COOKIE WINDOW (DAYS)</label>
                            <input value={cookieDays} onChange={e => setCookieDays(e.target.value)} className="w-full px-3 py-2 rounded-lg outline-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,229,255,0.3)", color: "#eeeeff", fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }}
                              onFocus={e => (e.target.style.borderColor = "#00e5ff")} onBlur={e => (e.target.style.borderColor = "rgba(0,229,255,0.3)")} />
                          </div>
                          <div className="flex gap-2 mt-1">
                            <button
                              onClick={saveCommission}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-lg flex-1 justify-center transition-all"
                              style={{ background: "#30d158", color: "#000", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "14px", letterSpacing: "0.08em" }}
                              onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(48,209,88,0.5)"}
                              onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "none"}
                            >
                              <Save size={13} /> SAVE CHANGES
                            </button>
                            <button onClick={() => setEditComm(false)} className="px-3 py-2 rounded-lg transition-all" style={{ background: "rgba(255,255,255,0.05)", color: "var(--muted-foreground)" }}
                              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"}
                              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3">
                          {[
                            { label: "Type", value: active.commissionType },
                            { label: "Rate", value: active.commissionRate + (active.commissionType.includes("%") ? "%" : " USD") },
                            { label: "Cookie", value: active.cookieDays + " days" },
                            { label: "Network", value: active.network || "Direct" },
                          ].map(row => (
                            <div key={row.label} className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--muted-foreground)" }}>{row.label}</span>
                              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#eeeeff" }}>{row.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Earnings breakdown */}
                    <div className="p-5 rounded-xl" style={{ background: "rgba(255,214,10,0.05)", border: "1px solid rgba(255,214,10,0.15)" }}>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.15em", color: "#ffd60a", marginBottom: "10px" }}>EARNINGS PROJECTION</p>
                      {[
                        { label: "Monthly clicks (est.)", value: Math.round(active.totalClicks * 1.1).toLocaleString() },
                        { label: "Conversion rate", value: "2.5%" },
                        { label: "Conversions/mo", value: Math.round(active.totalClicks * 1.1 * 0.025).toString() },
                        { label: "Commission per conv.", value: active.commissionType.includes("%") ? `${active.commissionRate}% of order` : `$${active.commissionRate}` },
                      ].map(row => (
                        <div key={row.label} className="flex justify-between items-center py-1.5" style={{ borderBottom: "1px solid rgba(255,214,10,0.08)" }}>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--muted-foreground)" }}>{row.label}</span>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#ffd60a" }}>{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ─── FEATURED PLACEMENT ─── */}
                {tab === "featured" && (
                  <div className="flex flex-col gap-5">
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
                      Upgrade your placement to appear at the top of your sector with a visible badge. More visibility = more clicks = more revenue.
                    </p>
                    <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
                      {FEATURED_PLANS.map(plan => {
                        const isActive = active.planId === plan.id;
                        return (
                          <div
                            key={plan.id}
                            className="rounded-xl p-5 flex flex-col gap-3 transition-all"
                            style={{
                              background: isActive ? plan.color + "12" : "#12121f",
                              border: `2px solid ${isActive ? plan.color : "rgba(255,255,255,0.07)"}`,
                              boxShadow: isActive ? `0 0 24px ${plan.color}33` : "none",
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "18px", letterSpacing: "0.06em", color: plan.color }}>{plan.name}</span>
                              {isActive && <CheckCircle size={16} style={{ color: plan.color }} />}
                              {plan.id === "elite" && !isActive && <Crown size={16} style={{ color: plan.color, opacity: 0.6 }} />}
                              {plan.id === "pro" && !isActive && <Sparkles size={16} style={{ color: plan.color, opacity: 0.6 }} />}
                            </div>
                            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "32px", fontWeight: 900, color: plan.color, lineHeight: 1 }}>
                              {plan.price === 0 ? "FREE" : `$${plan.price}/mo`}
                            </p>
                            <ul className="flex flex-col gap-1.5 flex-1">
                              {plan.perks.map(perk => (
                                <li key={perk} className="flex items-start gap-2">
                                  <ChevronRight size={11} style={{ color: plan.color, flexShrink: 0, marginTop: 3 }} />
                                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "var(--muted-foreground)" }}>{perk}</span>
                                </li>
                              ))}
                            </ul>
                            {!isActive ? (
                              <button
                                onClick={() => plan.price > 0 ? setUpgrading(plan) : (updatePartnerPlan(active.id, plan.id), reload(), setToast({ msg: "Downgraded to Basic plan", color: "#666688" }))}
                                className="mt-auto w-full py-2.5 rounded-lg transition-all"
                                style={{ background: plan.color, color: "#000", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "14px", letterSpacing: "0.08em", boxShadow: `0 0 16px ${plan.color}55` }}
                                onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 0 28px ${plan.color}88`}
                                onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px ${plan.color}55`}
                              >
                                {plan.price === 0 ? "DOWNGRADE" : `UPGRADE → ${plan.name}`}
                              </button>
                            ) : (
                              <div className="mt-auto w-full py-2 rounded-lg text-center" style={{ background: plan.color + "22", border: `1px solid ${plan.color}55` }}>
                                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "13px", color: plan.color }}>✓ CURRENT PLAN</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ─── PAYOUT SETTINGS ─── */}
                {tab === "payout" && active && (
                  <PayoutTab partner={active} onToast={(msg, color) => setToast({ msg, color })} />
                )}

                {/* ─── MY LINK ─── */}
                {tab === "link" && (
                  <div className="flex flex-col gap-5 max-w-lg">
                    <div className="p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.18em", color: "var(--muted-foreground)", marginBottom: "10px" }}>YOUR REFERRAL TAG</p>
                      <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "#12121f", border: "1px solid rgba(0,229,255,0.2)" }}>
                        <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#00e5ff", flex: 1, wordBreak: "break-all" }}>{active.referralTag}</code>
                        <button
                          onClick={copyTag}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0"
                          style={{ background: copied ? "rgba(48,209,88,0.2)" : "rgba(0,229,255,0.1)", border: `1px solid ${copied ? "rgba(48,209,88,0.5)" : "rgba(0,229,255,0.3)"}`, color: copied ? "#30d158" : "#00e5ff", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.08em" }}
                        >
                          {copied ? <><Check size={12} /> COPIED!</> : <><Copy size={12} /> COPY</>}
                        </button>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="flex items-center justify-between mb-2">
                        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.18em", color: "var(--muted-foreground)" }}>FULL TRACKING URL</p>
                        <button
                          onClick={copyFullUrl}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all"
                          style={{ background: "rgba(255,214,10,0.08)", border: "1px solid rgba(255,214,10,0.25)", color: "#ffd60a", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.08em" }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,214,10,0.18)"}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,214,10,0.08)"}
                        >
                          <Copy size={11} /> COPY URL
                        </button>
                      </div>
                      <div className="p-3 rounded-lg" style={{ background: "#12121f", border: "1px solid rgba(255,214,10,0.2)" }}>
                        <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#ffd60a", wordBreak: "break-all", lineHeight: 1.8 }}>
                          {`${active.website || "https://yourservice.ai"}?ref=aicircusmall&utm_source=aicircusmall&utm_medium=referral&utm_campaign=${active.category.toLowerCase().replace(/\s+/g, "_")}&utm_content=${active.company.toLowerCase().replace(/\s+/g, "_")}`}
                        </code>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl" style={{ background: "rgba(48,209,88,0.06)", border: "1px solid rgba(48,209,88,0.2)" }}>
                      <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "15px", letterSpacing: "0.06em", color: "#30d158", marginBottom: "8px" }}>HOW TRACKING WORKS</p>
                      {[
                        "User clicks your card on AI Circus Mega Mall",
                        "Our referral URL fires — cookie set for " + active.cookieDays + " days",
                        "User signs up or purchases on your site",
                        "Conversion confirmed via " + (active.network || "your affiliate platform"),
                        "Commission credited to your account (NET-30)",
                      ].map((step, i) => (
                        <div key={i} className="flex items-start gap-3 mb-2">
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#30d158", width: "20px", flexShrink: 0 }}>{i + 1}.</span>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "var(--muted-foreground)" }}>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
