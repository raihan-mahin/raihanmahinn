// Central content module for Mahin OS. Edit copy, projects and image URLs here.
// To add images later: put a URL (or imported asset) in any `images: []` / `thumbnail` field.

export const profile = {
  fullName: "Abu Raihan Mahin",
  shortName: "Raihan Mahin",
  nickname: "Mahin",
  headline: "Brand Marketer · Creative Strategist · AI Content Creator",
  bio: "I connect business strategy with bold creative execution — from GTM launches and brand transitions to AI-powered short-form video and digital design.",
  location: "Dhaka, Bangladesh",
  email: "raihanmahin.ubl@gmail.com",
  linkedin: "https://bd.linkedin.com/in/raihan-mahin-150b7123a",
  behance: "https://www.behance.net/raihanmahin",
};

export type Experience = {
  id: string;
  role: string;
  org: string;
  context?: string;
  period: string;
  type: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    id: "agency-ai",
    role: "AI Content Creator (Agency-side)",
    org: "Creative agency work for Unilever brands",
    context: "Lux · Lifebuoy · Dove",
    period: "2026 – Present",
    type: "Current",
    bullets: [
      "Agency-side AI-generated reels and short-form content for Lux, Lifebuoy and Dove under Unilever brand work.",
      "Recent work added after the CV; not direct employment by Unilever.",
    ],
  },
  {
    id: "bizlearner",
    role: "Marketing",
    org: "BizLearner — on Pureit",
    context: "Pureit (formerly Unilever Bangladesh, acquired by A.O. Smith)",
    period: "Aug 2024 – Jun 2026",
    type: "Part-time",
    bullets: [
      "Supported the Pureit brand transition with a logo rollout across 7+ touchpoints.",
      "Ran competitor benchmarking and feasibility research for Bangladesh and Sri Lanka.",
      "Produced 300+ marketing assets for the Wave, Marina and Ultima Pro launches — POSM, manuals, e-commerce, website and trade.",
      "Contributed to a 6.5x digital sales increase in collaboration with brand, media and agency partners.",
    ],
  },
  {
    id: "legend",
    role: "Marketing Officer",
    org: "Legend International School",
    period: "Oct – Nov 2024",
    type: "Contract",
    bullets: ["Created promotions and campaign materials for school marketing."],
  },
  {
    id: "x-agency",
    role: "Junior Engagement Officer",
    org: "X Integrated Marketing Agency",
    period: "Oct 2023 – Oct 2024",
    type: "Part-time",
    bullets: [
      "Built customer response strategy for 5 accounts: Upay, City Bank, IDLC, Break Station and Petal.",
      "Maintained a 90% on-time response rate and supported agency research.",
    ],
  },
];

export type AgencyBrand = { id: string; brand: string; tagline: string; description: string; thumbnail?: string; video?: string };
export const agencyBrands: AgencyBrand[] = [
  { id: "lifebuoy", brand: "Lifebuoy", tagline: "Hygiene stories, made scroll-stopping", description: "AI-assisted short-form videos translating Lifebuoy's hygiene messaging into fast, social-first formats." },
  { id: "dove", brand: "Dove", tagline: "Real care, crafted with AI", description: "Digital short-form content for Dove, using AI production workflows while staying true to the brand's care-led tone." },
  { id: "lux", brand: "Lux", tagline: "Glamour in motion", description: "AI-generated reels for Lux with a premium, beauty-forward visual direction for social platforms." },
];

export type Award = { id: string; rank: string; title: string; organizer: string; year: string; focus: string; detail: string; scale?: string; images: string[]; link?: string };
export const awards: Award[] = [
  { id: "bizmetrics", rank: "Champion", title: "BizMetrics 2026", organizer: "BTM, IUT", year: "2026", focus: "GTM for a new product concept", detail: "Developed a new product concept and its go-to-market plan.", images: [] },
  { id: "nexus", rank: "Champion", title: "Nexus 2025", organizer: "KUET Business Club", year: "2025", focus: "Strategic cases — Polar & NCC Bank", detail: "Solved strategic business cases for Polar and NCC Bank.", images: [] },
  { id: "hult", rank: "Champion", title: "Hult Prize at NSU 2026", organizer: "NSU YEF", year: "2026", focus: "SDG-aligned concept & full GTM", detail: "Built an SDG-aligned venture concept with a complete go-to-market strategy.", images: [] },
  { id: "admaker", rank: "1st Runner-Up", title: "Admaker Bangladesh 2026", organizer: "NSU YES!", year: "2026", focus: "Marketing strategy & OVC — Maya + EBL", detail: "Marketing strategy and online video commercial for Maya and EBL.", scale: "1000+ teams", images: [] },
  { id: "marxcellence", rank: "1st Runner-Up", title: "Marxcellence 2026", organizer: "NSU MIBC", year: "2026", focus: "Brand strategy & OVC — Vertika + Dhaka Bank", detail: "Brand strategy and online video commercial for Vertika and Dhaka Bank.", scale: "1000+ teams", images: [], link: "https://www.linkedin.com/posts/raihanmahin_first-runner-up-marxcellence-two-competitions-activity-7496950896132521984-LnjI" },
  { id: "innovade", rank: "1st Runner-Up", title: "Innovade 2026", organizer: "NSU MIBC", year: "2026", focus: "International Yamaha smart-tech case", detail: "Tackled an international smart-technology case for Yamaha.", images: [] },
  { id: "brandaid", rank: "2nd Runner-Up", title: "BrandAid 2026", organizer: "EWU Business Club", year: "2026", focus: "Repositioning — Monno Ceramics & ZenFresh", detail: "Repositioning strategy for Monno Ceramics and ZenFresh.", images: [] },
  { id: "otw", rank: "Finalist", title: "Over the Wall 2025", organizer: "Marico", year: "2025", focus: "Product concept & GTM", detail: "Product concept and go-to-market plan.", scale: "1850+ teams", images: [] },
];

export type PureitCase = { id: string; title: string; kind: string; challenge: string; contribution: string; outcome: string; images: string[] };
export const pureitCases: PureitCase[] = [
  { id: "pureit-transition", title: "Pureit Brand Transition", kind: "Brand transition", challenge: "Move Pureit to its new identity after the brand moved from Unilever Bangladesh to A.O. Smith.", contribution: "Supported the logo rollout across 7+ touchpoints and benchmarked competitors in Bangladesh and Sri Lanka.", outcome: "New identity rolled out across 7+ brand touchpoints.", images: [] },
  { id: "pureit-wave", title: "Pureit Wave Launch", kind: "Product launch", challenge: "Launch-ready marketing material across retail, digital and trade.", contribution: "Designed launch assets — POSM, manuals, e-commerce, website and trade materials.", outcome: "Part of the 300+ assets delivered across three launches.", images: [] },
  { id: "pureit-marina", title: "Pureit Marina Launch", kind: "Product launch", challenge: "Consistent launch communication across channels.", contribution: "Produced POSM, e-commerce, website and trade assets for the launch.", outcome: "Part of the 300+ assets delivered across three launches.", images: [] },
  { id: "pureit-ultima", title: "Pureit Ultima Pro Launch", kind: "Product launch", challenge: "Premium purifier launch needing clear product storytelling.", contribution: "Created manuals, POSM, e-commerce and website assets.", outcome: "Contributed (with brand, media and agency partners) to 6.5x digital sales growth.", images: [] },
];

const BH = profile.behance;
export type BehanceWork = { id: string; title: string; type: string; url: string; verified: boolean; thumbnail?: string };
export const behanceWorks: BehanceWork[] = [
  { id: "skin", title: "Skin Care Branding | Confidence Breakthrough Campaign", type: "Campaign", url: BH, verified: false },
  { id: "berger", title: "Billboard Design | Berger Sealer Campaign", type: "Billboard", url: BH, verified: false },
  { id: "pureit-cat", title: "Product Catalogue | Pureit", type: "Print", url: BH, verified: false },
  { id: "pureit-man", title: "Product Manual Design | Brand – Pureit", type: "Print", url: BH, verified: false },
  { id: "billboard", title: "Eye-Catching Billboard Design | Outdoor Advertising", type: "Billboard", url: BH, verified: false },
  { id: "bankcard", title: "Bank Card Branding & OVC – Creative Fintech Campaign", type: "Campaign", url: BH, verified: false },
  { id: "parachute", title: "Parachute Just for Baby | Baby Care Brand | Packaging", type: "Packaging", url: "https://www.behance.net/gallery/215718967/Parachute-Just-for-Baby-Baby-Care-Brand-Packaging", verified: true },
  { id: "letterhead", title: "Letterhead Design | Pad", type: "Stationery", url: "https://www.behance.net/gallery/210532369/Letterhead-Design-Pad", verified: true },
  { id: "promo-video", title: "Brand Promotion Video", type: "Video", url: BH, verified: false },
  { id: "promo-social", title: "Brand Promotion | Social Media Post", type: "Social", url: BH, verified: false },
  { id: "social", title: "Social Media Post", type: "Social", url: BH, verified: false },
  { id: "social-brand", title: "Social Media Post | Branding", type: "Social", url: BH, verified: false },
  { id: "oggy", title: "Cartoon Character Oggy Vector Art", type: "Illustration", url: "https://www.behance.net/gallery/181839773/Cartoon-Character-Oggy-Vector-Art", verified: true },
  { id: "hattori", title: "Cartoon Art Ninja Hattori Vector Art", type: "Illustration", url: "https://www.behance.net/gallery/181917209/Cartoon-Art-Ninja-Hattori-Vector-Art", verified: true },
  { id: "brochure", title: "Square Tri-Fold Threefold brochure", type: "Print", url: "https://www.behance.net/gallery/181822017/Square-Tri-Fold-Threefold-brochure", verified: true },
];

export const leadership = [
  { id: "mth", role: "Founder & Admin", org: "Music That Heals", period: "2020 – Present", detail: "Built and led a 200K-member music community and organised live events." },
  { id: "yes", role: "General Member", org: "NSU Young Entrepreneurs Society", period: "2022 – 2023", detail: "Supported 2023 recruitment, the brand guideline, and Admaker." },
  { id: "drmc", role: "Volunteer", org: "DRMC Science Club", period: "2019 – 2020", detail: "Volunteered at the science festival and gaming segment with ~1,000 participants." },
];

export const education = [
  { id: "nsu", degree: "BBA, Marketing (final year)", school: "North South University", period: "2022 – Expected Dec 2026" },
  { id: "drmc", degree: "HSC, Science", school: "Dhaka Residential Model College (DRMC)", period: "2018 – 2020" },
];

export const skills = {
  Strategy: ["Go-to-market (GTM)", "Product launches", "Brand strategy", "Market research", "Competitor benchmarking", "Consumer insights"],
  Creative: ["Marketing asset design", "AI reels & short-form video", "Photoshop", "Illustrator", "Canva", "Figma", "Presentation tools"],
  Business: ["Marketing", "Stakeholder management", "Campaign planning"],
};

export const stats = (() => {
  const championships = awards.filter((a) => a.rank === "Champion").length;
  return [
    { value: "300+", label: "Marketing assets" },
    { value: String(pureitCases.filter((c) => c.kind === "Product launch").length), label: "Launch projects" },
    { value: "7+", label: "Brand touchpoints" },
    { value: "6.5x", label: "Digital sales (team)" },
    { value: "200K", label: "Community members" },
    { value: String(awards.length), label: "Competition results" },
    { value: String(championships), label: "Championships" },
  ];
})();

export type ProjectCategory = "Featured" | "AI Brand Reels" | "Pureit & GTM" | "Brand Design" | "Case Competitions" | "Agency & Client Work" | "Community";
export const projectCategories: ProjectCategory[] = ["Featured", "AI Brand Reels", "Pureit & GTM", "Brand Design", "Case Competitions", "Agency & Client Work", "Community"];

export type Project = {
  id: string; title: string; subtitle: string; categories: ProjectCategory[]; role: string;
  challenge: string; contribution: string; outcome: string; images: string[]; link?: string; linkLabel?: string; badge?: string;
};

export const projects: Project[] = [
  ...agencyBrands.map<Project>((b) => ({
    id: `reel-${b.id}`, title: `${b.brand} AI Reels`, subtitle: b.tagline, categories: ["AI Brand Reels", "Featured"],
    role: "AI content creator (agency-side)", challenge: "Produce scroll-stopping short-form content at the pace of social.",
    contribution: b.description, outcome: "Ongoing work — reels to be added.", images: b.thumbnail ? [b.thumbnail] : [], badge: "Current work",
  })),
  ...pureitCases.map<Project>((c, i) => ({
    id: c.id, title: c.title, subtitle: c.kind, categories: i === 0 ? ["Pureit & GTM", "Featured"] : ["Pureit & GTM"],
    role: "Marketing — BizLearner on Pureit", challenge: c.challenge, contribution: c.contribution, outcome: c.outcome, images: c.images,
  })),
  ...awards.map<Project>((a) => ({
    id: `award-${a.id}`, title: `${a.title} — ${a.rank}`, subtitle: a.organizer, categories: a.rank === "Champion" ? ["Case Competitions", "Featured"] : ["Case Competitions"],
    role: "Team member / strategist", challenge: a.focus, contribution: a.detail, outcome: `${a.rank}${a.scale ? ` among ${a.scale}` : ""}`, images: a.images, badge: a.rank, ...(a.link ? { link: a.link, linkLabel: "View LinkedIn post" } : {}),
  })),
  ...behanceWorks.map<Project>((w) => ({
    id: `bh-${w.id}`, title: w.title, subtitle: w.type, categories: ["Brand Design"], role: "Designer",
    challenge: "Visual design work published on Behance.", contribution: `${w.type} design.`, outcome: w.verified ? "View the full project on Behance." : "Find it on the Behance profile.",
    images: w.thumbnail ? [w.thumbnail] : [], link: w.url,
  })),
  { id: "x-agency", title: "Customer Response Strategy", subtitle: "X Integrated Marketing Agency", categories: ["Agency & Client Work"], role: "Junior Engagement Officer", challenge: "Consistent, timely responses across 5 brand accounts.", contribution: "Response strategy for Upay, City Bank, IDLC, Break Station and Petal; agency research.", outcome: "90% on-time response rate.", images: [] },
  { id: "legend", title: "School Promotions", subtitle: "Legend International School", categories: ["Agency & Client Work"], role: "Marketing Officer (contract)", challenge: "Promote the school within a short contract.", contribution: "Promotions and campaign materials.", outcome: "Campaign materials delivered.", images: [] },
  { id: "mth", title: "Music That Heals", subtitle: "Community · 2020 – Present", categories: ["Community", "Featured"], role: "Founder & Admin", challenge: "Grow a music community with real engagement.", contribution: "Built and led the community and organised live events.", outcome: "200K-member community.", images: [] },
  { id: "insight-cirkle", title: "From Airtel to Cirkle — Rebrand Analysis", subtitle: "LinkedIn thought piece · Marketing Insights", categories: ["Community"], role: "Author (personal commentary)", challenge: "Is the Airtel → Cirkle rebrand a sound long-term brand identity move?", contribution: "Wrote a public LinkedIn post analysing the rebrand and long-term brand identity strategy. Personal commentary — not a campaign he worked on.", outcome: "Published on LinkedIn.", images: [], link: "https://www.linkedin.com/posts/raihanmahin_from-airtel-to-cirkle-a-meaningless-rebrand-activity-7496206091739967488-a0Tp", linkLabel: "Read on LinkedIn" },
  { id: "yes", title: "NSU Young Entrepreneurs Society", subtitle: "2022 – 2023", categories: ["Community"], role: "General Member", challenge: "Support club growth and flagship events.", contribution: "2023 recruitment, brand guideline and Admaker support.", outcome: "Contributed to recruitment and Admaker.", images: [] },
];

export type Note = { id: string; title: string; date: string; body: string };
export const notes: Note[] = [
  { id: "about", title: "About Mahin", date: "Nov 2026", body: `# Hi, I'm Raihan Mahin 👋\n${profile.headline}\n\n${profile.bio}\n\nBased in ${profile.location}. Final-year BBA Marketing student at North South University.\n\n- Email: ${profile.email}\n- Behance: behance.net/raihanmahin` },
  { id: "now", title: "Currently: AI reels for Unilever brands", date: "Nov 2026", body: "# Current work\nAgency-side, I create AI-generated reels and digital short-form content for Unilever brands.\n\n- Lux\n- Lifebuoy\n- Dove\n\nThis is agency work — not direct employment with Unilever. Reels will be added here soon." },
  { id: "pureit", title: "Pureit — transition & 3 launches", date: "Jun 2026", body: "# Pureit (BizLearner) · Aug 2024 – Jun 2026\nPureit was previously under Unilever Bangladesh and was acquired by A.O. Smith.\n\n- Logo rollout across 7+ touchpoints during the brand transition\n- Competitor benchmarking & feasibility for Bangladesh and Sri Lanka\n- 300+ assets for Wave, Marina and Ultima Pro launches (POSM, manuals, e-commerce, website, trade)\n- Contributed to 6.5x digital sales growth together with brand, media and agency partners" },
  { id: "skills", title: "Skills & tools", date: "Nov 2026", body: `# Skills\n${Object.entries(skills).map(([k, v]) => `## ${k}\n${v.map((s) => `- ${s}`).join("\n")}`).join("\n\n")}` },
  { id: "awards", title: "Competitions & awards", date: "2026", body: `# ${awards.length} results · ${awards.filter((a) => a.rank === "Champion").length} championships\n${awards.map((a) => `- ${a.rank} — ${a.title} (${a.organizer}): ${a.focus}${a.scale ? `, ${a.scale}` : ""}`).join("\n")}` },
  { id: "community", title: "Community & leadership", date: "2026", body: `# Leadership\n${leadership.map((l) => `- ${l.role}, ${l.org} (${l.period}) — ${l.detail}`).join("\n")}` },
  { id: "insights", title: "Marketing Insights: Airtel → Cirkle", date: "2026", body: "# Marketing Insights\nA LinkedIn thought piece by Mahin analysing the Airtel to Cirkle rebrand and its long-term brand identity strategy.\n\nThis is personal commentary — not a campaign Mahin worked on.\n\n- Read: linkedin.com/posts/raihanmahin (From Airtel to Cirkle)" },
  { id: "education", title: "Education", date: "2026", body: `# Education\n${education.map((e) => `- ${e.degree} — ${e.school}, ${e.period}`).join("\n")}` },
  { id: "experience", title: "Experience timeline", date: "2026", body: `# Experience\n${experience.map((e) => `## ${e.role} — ${e.org}\n${e.period} · ${e.type}\n${e.bullets.map((b) => `- ${b}`).join("\n")}`).join("\n\n")}` },
];

export const qa = [
  { q: "What do you do?", a: `I'm a ${profile.headline.toLowerCase()}. ${profile.bio}` },
  { q: "What are you working on now?", a: "Agency-side, I'm creating AI-generated reels and short-form content for Unilever brand work — Lux, Lifebuoy and Dove. It's agency-side work, not direct employment with Unilever." },
  { q: "Tell me about Pureit", a: "At BizLearner (Aug 2024 – Jun 2026) I worked on Pureit: a brand transition with a logo rollout across 7+ touchpoints, 300+ assets for the Wave, Marina and Ultima Pro launches, and competitor benchmarking for Bangladesh and Sri Lanka. Together with brand, media and agency partners, we saw digital sales grow 6.5x." },
  { q: "Competition wins?", a: `${awards.length} results, including ${awards.filter((a) => a.rank === "Champion").length} championships: BizMetrics 2026, Nexus 2025 and Hult Prize at NSU 2026. Plus 1st Runner-Up at Admaker, Marxcellence and Innovade 2026.` },
  { q: "Your skills?", a: "GTM and launches, strategy, research, competitor benchmarking, consumer insights, asset design (Photoshop, Illustrator, Canva, Figma), AI reels and stakeholder management." },
  { q: "Community work?", a: "I founded Music That Heals in 2020 and grew it into a 200K-member music community with live events." },
  { q: "Education?", a: "Final-year BBA in Marketing at North South University, expected December 2026. HSC Science from DRMC." },
  { q: "How can I reach you?", a: `Email ${profile.email}, or find me on LinkedIn and Behance.` },
];
