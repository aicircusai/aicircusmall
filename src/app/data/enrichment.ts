// Maps service names to their underlying AI provider
export const poweredByMap: Record<string, string> = {
  // AI Giants (self-powered)
  "ChatGPT — OpenAI": "OpenAI",
  "Claude — Anthropic": "Anthropic",
  "Gemini — Google": "Google DeepMind",
  "Grok — xAI": "xAI",
  "Meta AI": "Meta / Llama",
  "Copilot — Microsoft": "OpenAI + Microsoft",
  "Perplexity AI": "OpenAI + Claude",
  "NVIDIA AI": "NVIDIA CUDA",
  "Llama — Meta": "Meta Open Source",
  "Mistral AI": "Mistral",
  "DeepSeek": "DeepSeek",
  "Amazon Bedrock — AWS": "AWS Titan + Partners",
  "Google DeepMind": "Google DeepMind",
  "Apple Intelligence": "Apple + OpenAI",
  "Cohere": "Cohere",
  "IBM watsonx": "IBM + Llama",
  "Stability AI": "Stability AI",
  "Hugging Face": "Open Source",
  "xAI — Colossus": "xAI",
  "Baidu ERNIE": "Baidu ERNIE",
  "Alibaba Qwen": "Alibaba Qwen",
  "Samsung Gauss": "Samsung Gauss",
  "Inflection AI — Pi": "Inflection",
  "AI21 Labs": "AI21",

  // Multi-Agent
  "Anthropic Claude Agents": "Anthropic",
  "OpenAI Agents SDK": "OpenAI",
  "Google Vertex AI Agents": "Google Gemini",
  "Microsoft AutoGen": "OpenAI + Microsoft",
  "LangChain / LangGraph": "Any LLM",
  "CrewAI": "Any LLM",
  "Amazon Bedrock Agents": "AWS Titan + Partners",
  "AutoGPT": "GPT-4 / OpenAI",
  "BabyAGI": "GPT-4 / OpenAI",
  "Cohere Coral / Agents": "Cohere",
  "Mistral AI Agents": "Mistral",
  "Hugging Face Smolagents": "Open Source",
  "Salesforce AgentForce": "OpenAI + Salesforce",
  "ServiceNow AI Agents": "Proprietary",
  "Fetch.ai": "Proprietary",
  "xAI Grok Agents": "xAI",

  // Education
  "Khanmigo": "GPT-4 / OpenAI",
  "Coursera AI": "OpenAI",
  "Duolingo Max": "GPT-4 / OpenAI",
  "Synthesis": "Proprietary",
  "Socratic by Google": "Google AI",
  "Quizlet AI": "OpenAI",
  "Photomath": "Proprietary",
  "Elsa Speak": "Proprietary",

  // Healthcare
  "Ada Health": "Proprietary",
  "Babylon Health": "Proprietary",
  "Buoy Health": "OpenAI",
  "K Health": "Proprietary",
  "Novu Health": "OpenAI",
  "Lark Health": "Proprietary",
  "Hims & Hers AI": "OpenAI",
  "Spring Health": "Proprietary",

  // Shopping
  "Amazon AI": "Amazon Titan",
  "Google Shopping AI": "Google Gemini",
  "Vizit": "Proprietary",
  "Lily AI": "Proprietary",
  "Nosto": "Proprietary",
  "Clerk.io": "Proprietary",
  "Vue.ai": "Proprietary",
  "Honey AI": "Proprietary",

  // Real Estate
  "Zillow AI": "Proprietary",
  "Compass AI": "OpenAI",
  "HouseCanary": "Proprietary",
  "Redfin AI": "Proprietary",
  "Rex Homes": "Proprietary",
  "Entera": "Proprietary",
  "Ojo Labs": "Proprietary",
  "Skyline AI": "Proprietary",

  // Research
  "Elicit": "Claude / Anthropic",
  "Consensus": "GPT-4 / OpenAI",
  "Semantic Scholar": "Proprietary",
  "Scite": "Proprietary",
  "ResearchRabbit": "Proprietary",
  "Connected Papers": "Proprietary",
  "Iris.ai": "Proprietary",

  // Legal
  "Harvey AI": "GPT-4 / OpenAI",
  "CoCounsel": "Claude / Anthropic",
  "Lexis+ AI": "OpenAI",
  "DoNotPay": "GPT-4 / OpenAI",
  "LawGeex": "Proprietary",
  "Ironclad AI": "OpenAI",
  "Spellbook": "GPT-4 / OpenAI",
  "Luminance": "Proprietary",

  // Surgery
  "Touch Surgery": "Proprietary",
  "Medivis": "Proprietary",
  "Proprio Vision": "Proprietary",
  "Caresyntax": "Proprietary",
  "Activ Surgical": "Proprietary",
  "Digital Surgery": "Proprietary",
  "Theator": "Proprietary",
  "Hyperfine": "Proprietary",

  // Travel
  "Hopper AI": "Proprietary",
  "Kayak AI": "OpenAI",
  "Roam Around": "GPT-4 / OpenAI",
  "Mindtrip": "OpenAI",
  "Layla AI": "OpenAI",
  "Trips.AI": "GPT-4 / OpenAI",
  "GuideGeek": "GPT-4 / OpenAI",
  "Vacay Chatbot": "OpenAI",

  // Night Out
  "Discotech": "Proprietary",
  "Yelp AI": "OpenAI",
  "Resy AI": "Proprietary",
  "Eventbrite AI": "OpenAI",
  "Bandsintown AI": "Proprietary",
  "Fever": "Proprietary",
  "Ra.co AI": "Proprietary",
  "OpenTable AI": "OpenAI",

  // Maps
  "Google Maps AI": "Google Gemini",
  "Waze AI": "Proprietary",
  "What3Words": "Proprietary",
  "Mapbox AI": "Proprietary",
  "Here Technologies": "Proprietary",
  "Apple Maps AI": "Apple Intelligence",

  // AI Films
  "Runway ML": "Proprietary",
  "Pika Labs": "Proprietary",
  "Sora by OpenAI": "OpenAI Sora",
  "HeyGen": "Proprietary",
  "Kling AI": "Kuaishou",
  "Luma Dream Machine": "Luma AI",
  "Synthesia": "Proprietary",
  "Invideo AI": "OpenAI",

  // AI Music
  "Suno AI": "Proprietary",
  "Udio": "Proprietary",
  "Mubert": "Proprietary",
  "AIVA": "Proprietary",
  "Soundraw": "Proprietary",
  "Beatoven.ai": "Proprietary",
  "Boomy": "Proprietary",
  "Loudly": "Proprietary",

  // Jobs
  "LinkedIn AI": "OpenAI",
  "Otta": "Proprietary",
  "Pave": "Proprietary",
  "Karat": "Proprietary",
  "HireVue": "Proprietary",
  "Beamery": "OpenAI",
  "Eightfold.ai": "Proprietary",
  "Textio": "Proprietary",

  // Science
  "AlphaFold": "Google DeepMind",
  "Wolfram Alpha": "Proprietary",
  "Papers With Code": "Meta AI",
  "Isomorphic Labs": "Google DeepMind",
  "Insilico Medicine": "Proprietary",
  "Recursion": "Proprietary",
  "Ginkgo Bioworks": "Proprietary",

  // Space
  "NASA Earthdata AI": "Proprietary",
  "SpaceX AI": "Proprietary",
  "Stellarium Web": "Proprietary",
  "Eyes on the Solar System": "NASA",
  "Planet Labs": "Proprietary",
  "Spaceknow": "Proprietary",
  "Orbital Insight": "Proprietary",
  "ExoAnalytic": "Proprietary",

  // Business
  "Notion AI": "OpenAI",
  "Salesforce Einstein": "OpenAI + Salesforce",
  "HubSpot AI": "OpenAI",
  "Monday.com AI": "OpenAI",
  "Gong.io": "Proprietary",
  "Copy.ai": "GPT-4 / OpenAI",
  "Jasper AI": "GPT-4 / OpenAI",
  "Writer": "Proprietary",

  // IPO
  "Renaissance Capital": "Proprietary",
  "IPO Monitor": "Proprietary",
  "Robinhood IPO Access": "Proprietary",
  "Morningstar IPO": "Proprietary",
  "Crunchbase Pro": "OpenAI",
  "PitchBook": "Proprietary",
  "CB Insights": "OpenAI",
  "Forge Global": "Proprietary",

  // News
  "Perplexity News": "OpenAI + Claude",
  "Ground News": "Proprietary",
  "AllSides": "Proprietary",
  "Feedly AI": "OpenAI",
  "The Browser AI": "Proprietary",
  "Artifact": "Proprietary",
  "NewsGuard": "Proprietary",
  "Briefing.ai": "OpenAI",

  // Stocks
  "Bloomberg AI": "Proprietary",
  "Trade Ideas": "Proprietary",
  "Tickeron": "Proprietary",
  "Kavout": "Proprietary",
  "Danelfin": "Proprietary",
  "Kensho (S&P)": "Proprietary",
  "Alpaca AI": "Proprietary",
  "Composer": "Proprietary",

  // Sports
  "Whoop AI": "Proprietary",
  "Catapult Sports": "Proprietary",
  "Second Spectrum": "Proprietary",
  "Playermaker": "Proprietary",
  "HomeCourt": "Proprietary",
  "Freeletics": "Proprietary",
  "ShotTracker": "Proprietary",
  "Kinduct": "Proprietary",

  // Fashion
  "Stitch Fix AI": "Proprietary",
  "Vue.ai Fashion": "Proprietary",
  "Perfect Corp": "Proprietary",
  "Heuritech": "Proprietary",
  "Revieve": "Proprietary",
  "Findmine": "Proprietary",
  "CALA": "OpenAI",
  "Snap AI Lens": "Meta / Snap",

  // Gaming
  "Inworld AI": "Proprietary",
  "Scenario": "Stable Diffusion",
  "Modl.ai": "Proprietary",
  "Overwolf AI": "Proprietary",
  "Didimo": "Proprietary",
  "Ludo.ai": "GPT-4 / OpenAI",
  "Meshy": "Proprietary",
  "Promethean AI": "Proprietary",

  // Cybersecurity
  "CrowdStrike Falcon": "Proprietary",
  "Darktrace": "Proprietary",
  "SentinelOne": "Proprietary",
  "Vectra AI": "Proprietary",
  "Abnormal Security": "Proprietary",
  "Orca Security": "Proprietary",
  "Snyk": "OpenAI",
  "Recorded Future": "Proprietary",

  // Finance
  "Betterment": "Proprietary",
  "Wealthfront": "Proprietary",
  "Upstart": "Proprietary",
  "Zest AI": "Proprietary",
  "Featurespace": "Proprietary",
  "Kasisto KAI": "Proprietary",
  "Cleo": "GPT-4 / OpenAI",
  "Tally": "Proprietary",

  // Energy
  "Google DeepMind Energy": "Google DeepMind",
  "AutoGrid": "Proprietary",
  "SparkCognition": "Proprietary",
  "Pachama": "Proprietary",
  "Climeworks": "Proprietary",
  "Electricity Maps": "Proprietary",
  "Bidgee": "Proprietary",
  "WattTime": "Proprietary",

  // Architecture
  "Midjourney": "Proprietary",
  "Architechtures": "Proprietary",
  "Maket.ai": "Stable Diffusion",
  "Finch3D": "Proprietary",
  "Spacemaker AI": "Autodesk AI",
  "Planner 5D": "OpenAI",
  "TestFit": "Proprietary",
  "Hypar": "Proprietary",

  // Transportation
  "Waymo": "Google DeepMind",
  "Tesla Autopilot": "Proprietary",
  "Flexport AI": "OpenAI",
  "Optimal Dynamics": "Proprietary",
  "Motive": "Proprietary",
  "Gatik": "Proprietary",
  "Transmetrics": "Proprietary",
  "project44": "Proprietary",

  // Government
  "Palantir": "OpenAI + Proprietary",
  "Socrata": "Proprietary",
  "Civita App": "Proprietary",
  "Quorum": "OpenAI",
  "Mark43": "Proprietary",
  "Tyler Technologies": "Proprietary",
  "Aisera Gov": "OpenAI",
  "GovAI": "Proprietary",

  // Spirituality
  "Hallow": "Proprietary",
  "Calm AI": "Proprietary",
  "Headspace AI": "Proprietary",
  "Bible.ai": "OpenAI",
  "Muslim Pro AI": "Proprietary",
  "Insight Timer AI": "Proprietary",
  "Waking Up": "Proprietary",
  "Glorify": "OpenAI",

  // Dating
  "Hinge AI": "Proprietary",
  "eHarmony AI": "Proprietary",
  "Iris Dating": "Proprietary",
  "Rizz App": "GPT-4 / OpenAI",
  "Replika": "Proprietary",
  "Keeper": "Proprietary",
  "OkCupid AI": "Proprietary",
  "Teaser AI": "GPT-4 / OpenAI",

  // Pets
  "Petriage": "Proprietary",
  "Whistle AI": "Proprietary",
  "Fi Dog Collar": "Proprietary",
  "Pawp": "OpenAI",
  "Woofz": "Proprietary",
  "PetDx": "Proprietary",
  "Anipanion": "OpenAI",
  "Dogo": "Proprietary",

  // Insurance
  "Lemonade AI": "Proprietary",
  "Next Insurance": "Proprietary",
  "Tractable": "Proprietary",
  "Shift Technology": "Proprietary",
  "Cape Analytics": "Proprietary",
  "Cytora": "Proprietary",
  "Snapsheet": "Proprietary",
  "Hi Marley": "OpenAI",

  // Manufacturing
  "Sight Machine": "Proprietary",
  "Instrumental": "Proprietary",
  "Vanti Analytics": "Proprietary",
  "Landing AI": "Proprietary",
  "Symbio Robotics": "Proprietary",
  "Augury": "Proprietary",
  "Cognex": "Proprietary",
  "Sight Machine OEE": "Proprietary",

  // Agriculture
  "The Climate Corporation": "Proprietary",
  "John Deere AI": "Proprietary",
  "Granular": "Proprietary",
  "aWhere": "Proprietary",
  "Taranis": "Proprietary",
  "Prospera": "Proprietary",
  "Farmers Business Network": "Proprietary",
  "Blue River Technology": "Proprietary",
};

// Extra poweredBy for multi-agent (already in map above via the block)

// Seeded fake-but-realistic live user counts
const liveUserSeeds: Record<string, string> = {
  "ChatGPT — OpenAI": "3.2M",
  "Claude — Anthropic": "842K",
  "Gemini — Google": "1.1M",
  "Grok — xAI": "614K",
  "Meta AI": "2.8M",
  "Copilot — Microsoft": "1.9M",
  "Perplexity AI": "487K",
  "NVIDIA AI": "312K",
  "Hugging Face": "224K",
  "Mistral AI": "193K",
  "DeepSeek": "721K",
  "Khanmigo": "94K",
  "Duolingo Max": "1.4M",
  "Coursera AI": "387K",
  "ChatGPT": "3.2M",
  "Harvey AI": "28K",
  "Notion AI": "612K",
  "LinkedIn AI": "2.1M",
  "Suno AI": "341K",
  "Runway ML": "187K",
  "Pika Labs": "142K",
  "Salesforce Einstein": "891K",
  "HubSpot AI": "743K",
  "Lemonade AI": "214K",
  "Waymo": "41K",
  "Tesla Autopilot": "1.7M",
  "CrowdStrike Falcon": "318K",
  "Darktrace": "204K",
  "Betterment": "412K",
  "Replika": "198K",
  "Anthropic Claude Agents": "187K",
  "OpenAI Agents SDK": "312K",
  "Google Vertex AI Agents": "142K",
  "Microsoft AutoGen": "98K",
  "LangChain / LangGraph": "224K",
  "CrewAI": "86K",
  "Amazon Bedrock Agents": "201K",
  "AutoGPT": "74K",
  "BabyAGI": "31K",
  "Cohere Coral / Agents": "44K",
  "Mistral AI Agents": "57K",
  "Hugging Face Smolagents": "63K",
  "Salesforce AgentForce": "118K",
  "ServiceNow AI Agents": "89K",
  "Fetch.ai": "28K",
  "xAI Grok Agents": "93K",
};

// Deterministic pseudo-random based on service name
function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const ranges = [
  { min: 800, max: 9900, suffix: "" },
  { min: 10, max: 99, suffix: "K" },
  { min: 100, max: 980, suffix: "K" },
  { min: 1.0, max: 9.9, suffix: "M" },
];

export function getLiveUsers(serviceName: string): string {
  if (liveUserSeeds[serviceName]) return liveUserSeeds[serviceName];
  const h = hashString(serviceName);
  const tier = h % 10 < 3 ? 0 : h % 10 < 6 ? 1 : h % 10 < 9 ? 2 : 3;
  const r = ranges[tier];
  const val = r.min + (h % 1000) / 1000 * (r.max - r.min);
  const formatted = tier === 3 ? val.toFixed(1) : Math.floor(val).toLocaleString();
  return `${formatted}${r.suffix}`;
}

export function getPoweredBy(serviceName: string): string {
  return poweredByMap[serviceName] ?? "Proprietary";
}
