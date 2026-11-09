// Central content module for Mahin OS. Edit copy, projects and image URLs here.
// To add images later: put a URL (or imported asset) in any `images: []` / `thumbnail` field.

export const profile = {
  fullName: "Abu Raihan Mahin",
  shortName: "Raihan Mahin",
  nickname: "Mahin",
  headline: "Brand Marketing & Strategy Professional",
  subtitle: "Brand Marketing · GTM · Campaign Execution",
  // Owner-supplied wording (from his LinkedIn bio); not independently fetched.
  tagline: "Experience across 10+ brands spanning FMCG, consumer durables and fintech",
  bio: "I work across brand strategy, go-to-market planning, product launches, agency client servicing, campaign execution and creative communication. My experience includes Pureit's brand transition and launches, multi-brand customer engagement, and building marketing solutions across sectors.",
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
  clients?: string[];
};

export const experience: Experience[] = [
  {
    id: "agency",
    role: "Agency Lead",
    org: "Independent agency",
    period: "Current",
    type: "Current",
    clients: ["Lux", "Lifebuoy", "Dove"],
    bullets: [
      "I currently run an agency. One of our current workstreams is producing AI-generated content for Lux, Lifebuoy and Dove.",
    ],
  },
  {
    id: "bizlearner",
    role: "Marketing",
    org: "BizLearner — on Pureit",
    context: "Pureit (formerly Unilever, acquired by A. O. Smith)",
    period: "Aug 2024 – Jun 2026",
    type: "Part-time",
    clients: ["Pureit", "A. O. Smith"],
    bullets: [
      "Contributed to the Pureit brand transition and logo rollout across 7+ touchpoints.",
      "Market and competitor benchmarking for Bangladesh and Sri Lanka.",
      "Over 300 marketing assets across 3 launches: Pureit Wave, Marina and Ultima Pro.",
      "Supported Ultima Pro end-to-end communications.",
      "Collaborated with brand, media and agency teams, contributing to a 6.5x increase in digital sales.",
    ],
  },
  {
    id: "legend",
    role: "Marketing Officer",
    org: "Legend International School",
    period: "Oct – Nov 2024",
    type: "Contract",
    bullets: ["Supported promotional material and marketing execution."],
  },
  {
    id: "x-agency",
    role: "Junior Engagement Officer",
    org: "X Integrated Marketing Agency",
    period: "Oct 2023 – Oct 2024",
    type: "Part-time",
    clients: ["Upay", "City Bank", "IDLC", "Break Station", "Petal"],
    bullets: [
      "Customer response strategy for 5 accounts: Upay, City Bank, IDLC, Break Station and Petal.",
      "Maintained a 90% on-time response rate and supported agency research.",
    ],
  },
];

export type AgencyBrand = { id: string; brand: string; tagline: string; description: string; thumbnail?: string; video?: string };
export const agencyBrands: AgencyBrand[] = [
  { id: "lux", brand: "Lux", tagline: "Current agency workstream", description: "AI-generated content for Lux, produced as part of the agency's current work." },
  { id: "lifebuoy", brand: "Lifebuoy", tagline: "Current agency workstream", description: "AI-generated content for Lifebuoy, produced as part of the agency's current work." },
  { id: "dove", brand: "Dove", tagline: "Current agency workstream", description: "AI-generated content for Dove, produced as part of the agency's current work." },
];

export type Award = { id: string; rank: string; title: string; organizer: string; year: string; focus: string; detail: string; scale?: string; images: string[]; link?: string; team?: string; pendingImages?: string[]; caseBrands?: string[] };
export const awards: Award[] = [
  { id: "bizmetrics", rank: "Champion", title: "BizMetrics 2026", organizer: "BTM, IUT", year: "2026", focus: "GTM for a new product concept", detail: "Developed a new product concept and its go-to-market plan.", pendingImages: ["/media/awards/bizmetrics-2026-champion-group-stage.jpg"], images: [] },
  { id: "nexus", caseBrands: ["Polar", "NCC Bank"], rank: "Champion", title: "Nexus 2025", organizer: "KUET Business Club", year: "2025", focus: "Strategic cases — Polar & NCC Bank", detail: "Strategic business cases with Polar and NCC Bank as case subjects.", team: "Arctic Wolves", pendingImages: ["/media/awards/nexus-2025-champion-group-stage.jpg"], images: [] },
  { id: "hult", rank: "Champion", title: "Hult Prize at NSU 2026", organizer: "NSU YEF", year: "2026", focus: "SDG-aligned concept & full GTM", detail: "Built an SDG-aligned venture concept with a complete go-to-market strategy.", pendingImages: ["/media/awards/hult-prize-nsu-2026-champion-group-stage.jpg"], images: [] },
  { id: "admaker", caseBrands: ["Maya", "EBL"], rank: "1st Runner-Up", title: "Admaker Bangladesh 2026", organizer: "NSU YES!", year: "2026", focus: "Marketing strategy & OVC — Maya + EBL", detail: "Marketing strategy and online video commercial (OVC) with Maya and EBL as case subjects.", scale: "1000+ teams", team: "Arc Crew", pendingImages: ["/media/awards/admaker-2026-runner-up-solo-award.jpg", "/media/awards/admaker-2026-runner-up-group-stage.jpg"], images: [] },
  { id: "marxcellence", caseBrands: ["Vertika", "Dhaka Bank"], rank: "1st Runner-Up", title: "Marxcellence 2026", organizer: "NSU MIBC", year: "2026", focus: "Brand strategy & OVC — Vertika + Dhaka Bank", detail: "Brand strategy and online video commercial (OVC) with Vertika and Dhaka Bank as case subjects.", scale: "1000+ teams", team: "Arc Crew", pendingImages: ["/media/awards/marxcellence-2026-runner-up-solo-stage.jpg", "/media/awards/marxcellence-2026-runner-up-seated-trophy.jpg", "/media/awards/marxcellence-2026-runner-up-group-candid.jpg"], images: [], link: "https://www.linkedin.com/posts/raihanmahin_first-runner-up-marxcellence-two-competitions-activity-7496950896132521984-LnjI" },
  { id: "innovade", caseBrands: ["Yamaha"], rank: "1st Runner-Up", title: "Innovade 2026", organizer: "NSU MIBC", year: "2026", focus: "International Yamaha smart-tech case", detail: "International smart-technology case with Yamaha as the case subject.", team: "Arctic Wolves", pendingImages: ["/media/awards/innovade-2026-runner-up-group.jpg"], images: [] },
  { id: "brandaid", caseBrands: ["Monno Ceramics", "ZenFresh"], rank: "2nd Runner-Up", title: "BrandAid 2026", organizer: "EWU Business Club", year: "2026", focus: "Repositioning — Monno Ceramics & ZenFresh", detail: "Repositioning strategy with Monno Ceramics and ZenFresh as case subjects.", team: "Marketman", pendingImages: ["/media/awards/brandaid-2026-2nd-runner-up-group.jpg"], images: [] },
  { id: "otw", rank: "Finalist", title: "Over the Wall 2025", organizer: "Marico", year: "2025", focus: "Product concept & GTM", detail: "Product concept and go-to-market plan.", scale: "1850+ teams", pendingImages: [], images: [] },
];

export type PureitCase = { id: string; title: string; kind: string; challenge: string; contribution: string; outcome: string; images: string[] };
export const pureitCases: PureitCase[] = [
  { id: "pureit-transition", title: "Pureit Brand Transition", kind: "Brand transition", challenge: "Pureit's move to a new identity after its acquisition by A. O. Smith (formerly Unilever).", contribution: "Contributed to the logo rollout across 7+ touchpoints, plus market and competitor benchmarking for Bangladesh and Sri Lanka.", outcome: "Brand transition rolled out across 7+ touchpoints (team effort).", images: [] },
  { id: "pureit-wave", title: "Pureit Wave Launch", kind: "Product launch", challenge: "One of three Pureit product launches.", contribution: "Marketing assets for the launch, as part of 300+ assets across the three launches.", outcome: "Part of the 300+ assets delivered across three launches.", images: [] },
  { id: "pureit-marina", title: "Pureit Marina Launch", kind: "Product launch", challenge: "One of three Pureit product launches.", contribution: "Marketing assets for the launch, as part of 300+ assets across the three launches.", outcome: "Part of the 300+ assets delivered across three launches.", images: [] },
  { id: "pureit-ultima", title: "Pureit Ultima Pro Launch", kind: "Product launch", challenge: "One of three Pureit product launches.", contribution: "Supported Ultima Pro end-to-end communications, as part of 300+ assets across the three launches.", outcome: "Part of the 300+ assets delivered across three launches.", images: [] },
];

const BH = profile.behance;
export type BehanceWork = { id: string; title: string; type: string; url: string; verified: boolean; thumbnail?: string };
export const behanceWorks: BehanceWork[] = [
  { id: "skin", title: "Skin Care Branding | Confidence Breakthrough Campaign", type: "Campaign", url: "https://www.behance.net/gallery/242883541/Skin-Care-Branding-Confidence-Breakthrough-Campaign", verified: true, thumbnail: "/media/behance/242883541.jpg" },
  { id: "berger", title: "Billboard Design | Berger Sealer Campaign", type: "Billboard", url: "https://www.behance.net/gallery/239452045/Billboard-Design-Berger-Sealer-Campaign", verified: true, thumbnail: "/media/behance/239452045.png" },
  { id: "pureit-cat", title: "Product Catalogue | Pureit", type: "Print", url: "https://www.behance.net/gallery/234564039/Product-Catalogue-Pureit", verified: true, thumbnail: "/media/behance/234564039.jpg" },
  { id: "pureit-man", title: "Product Manual Design | Brand – Pureit", type: "Print", url: "https://www.behance.net/gallery/234562973/Product-Manual-Design-Brand-Pureit", verified: true, thumbnail: "/media/behance/234562973.jpg" },
  { id: "billboard", title: "Eye-Catching Billboard Design | Outdoor Advertising", type: "Billboard", url: "https://www.behance.net/gallery/234553883/Eye-Catching-Billboard-Design-Outdoor-Advertising", verified: true, thumbnail: "/media/behance/234553883.png" },
  { id: "bankcard", title: "Bank Card Branding & OVC – Creative Fintech Campaign", type: "Campaign", url: "https://www.behance.net/gallery/234546863/Bank-Card-Branding-OVC-Creative-Fintech-Campaign", verified: true, thumbnail: "/media/behance/234546863.png" },
  { id: "parachute", title: "Parachute Just for Baby | Baby Care Brand | Packaging", type: "Packaging", url: "https://www.behance.net/gallery/215718967/Parachute-Just-for-Baby-Baby-Care-Brand-Packaging", verified: true, thumbnail: "/media/behance/215718967.png" },
  { id: "letterhead", title: "Letterhead Design | Pad", type: "Stationery", url: "https://www.behance.net/gallery/210532369/Letterhead-Design-Pad", verified: true, thumbnail: "/media/behance/210532369.jpg" },
  { id: "promo-video", title: "Brand Promotion Video", type: "Video", url: "https://www.behance.net/gallery/186704511/Brand-Promotion-Video", verified: true, thumbnail: "/media/behance/186704511.png" },
  { id: "promo-social", title: "Brand Promotion | Social Media Post", type: "Social", url: "https://www.behance.net/gallery/186372427/Brand-Promotion-Social-Media-Post", verified: true, thumbnail: "/media/behance/186372427.jpg" },
  { id: "social", title: "Social Media Post", type: "Social", url: "https://www.behance.net/gallery/183253499/Social-Media-Post", verified: true, thumbnail: "/media/behance/183253499.jpeg" },
  { id: "social-brand", title: "Social Media Post | Branding", type: "Social", url: "https://www.behance.net/gallery/183014205/Social-Media-Post-Branding", verified: true, thumbnail: "/media/behance/183014205.jpg" },
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
  Creative: ["Marketing asset design", "Photoshop", "Illustrator", "Canva", "Figma", "Presentation tools"],
  Business: ["Agency client servicing", "Campaign execution", "Stakeholder management", "Campaign planning"],
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

export type ProjectCategory = "Featured" | "Agency Work" | "Pureit & GTM" | "Brand Design" | "Case Competitions" | "Agency & Client Work" | "Community";
export const projectCategories: ProjectCategory[] = ["Featured", "Pureit & GTM", "Agency & Client Work", "Case Competitions", "Brand Design", "Agency Work", "Community"];

export type Project = {
  id: string; title: string; subtitle: string; categories: ProjectCategory[]; role: string;
  challenge: string; contribution: string; outcome: string; images: string[]; link?: string; linkLabel?: string; badge?: string;
  /** "Case brands" = competition case subjects (not clients); "Clients" = professional work. */
  brandRow?: { label: string; names: string[] };
};

export const projects: Project[] = [
  ...pureitCases.map<Project>((c, i) => ({
    id: c.id, title: c.title, subtitle: c.kind, categories: i <= 1 ? ["Pureit & GTM", "Featured"] : ["Pureit & GTM"],
    role: "Marketing — BizLearner on Pureit", challenge: c.challenge, contribution: c.contribution, outcome: c.outcome, images: c.images,
    brandRow: { label: "Brands", names: ["Pureit", "A. O. Smith"] },
  })),
  ...awards.map<Project>((a) => ({
    id: `award-${a.id}`, title: `${a.title} — ${a.rank}`, subtitle: a.organizer, categories: a.rank === "Champion" ? ["Case Competitions", "Featured"] : ["Case Competitions"], ...(a.caseBrands ? { brandRow: { label: "Case brands (competition case subjects, not clients)", names: a.caseBrands } } : {}),
    role: a.team ? `Team ${a.team} — team member / strategist` : "Team member / strategist", challenge: a.focus, contribution: a.detail, outcome: `${a.rank}${a.scale ? ` among ${a.scale}` : ""}`, images: a.images, badge: a.rank, ...(a.link ? { link: a.link, linkLabel: "View LinkedIn post" } : {}),
  })),
  ...behanceWorks.map<Project>((w) => ({
    id: `bh-${w.id}`, title: w.title, subtitle: w.type, categories: w.id === "pureit-cat" || w.id === "berger" ? ["Brand Design", "Featured"] : ["Brand Design"], role: "Designer",
    challenge: "Visual design work published on Behance.", contribution: `${w.type} design.`, outcome: w.verified ? "View the full project on Behance." : "Find it on the Behance profile.",
    images: w.thumbnail ? [w.thumbnail] : [], link: w.url,
  })),
  { id: "agency", title: "Agency Lead — Current Work", subtitle: "Independent agency · Current", categories: ["Agency Work", "Agency & Client Work", "Featured"], role: "Agency Lead", challenge: "Running an agency.", contribution: "One of our current workstreams is producing AI-generated content for Lux, Lifebuoy and Dove.", outcome: "Ongoing — media coming soon.", images: [], brandRow: { label: "Current workstream brands", names: agencyBrands.map((b) => b.brand) } },
  ...agencyBrands.map<Project>((b) => ({
    id: `agency-${b.id}`, title: b.brand, subtitle: "Current agency workstream", categories: ["Agency Work"], role: "Agency Lead",
    challenge: "AI-generated content workstream.", contribution: b.description, outcome: "Ongoing — media coming soon.", images: b.thumbnail ? [b.thumbnail] : [],
  })),
  { id: "x-agency", title: "Multi-brand Customer Engagement", subtitle: "X Integrated Marketing Agency", categories: ["Agency & Client Work", "Featured"], brandRow: { label: "Professional clients", names: ["Upay", "City Bank", "IDLC", "Break Station", "Petal"] }, role: "Junior Engagement Officer", challenge: "Consistent, timely responses across 5 brand accounts.", contribution: "Response strategy for Upay, City Bank, IDLC, Break Station and Petal; agency research.", outcome: "90% on-time response rate.", images: [] },
  { id: "legend", title: "School Promotions", subtitle: "Legend International School", categories: ["Agency & Client Work"], role: "Marketing Officer (contract)", challenge: "Short marketing contract for the school.", contribution: "Supported promotional material and marketing execution.", outcome: "Contract completed (Oct – Nov 2024).", images: [] },
  { id: "mth", title: "Music That Heals", subtitle: "Community · 2020 – Present", categories: ["Community", "Featured"], role: "Founder & Admin", challenge: "Grow a music community with real engagement.", contribution: "Built and led the community and organised live events.", outcome: "200K-member community.", images: [] },
  { id: "insight-cirkle", title: "From Airtel to Cirkle — Rebrand Analysis", subtitle: "LinkedIn thought piece · Marketing Insights", categories: ["Community"], role: "Author (personal commentary)", challenge: "Is the Airtel → Cirkle rebrand a sound long-term brand identity move?", contribution: "Wrote a public LinkedIn post analysing the rebrand and long-term brand identity strategy. Personal commentary — not a campaign he worked on.", outcome: "Published on LinkedIn.", images: [], link: "https://www.linkedin.com/posts/raihanmahin_from-airtel-to-cirkle-a-meaningless-rebrand-activity-7496206091739967488-a0Tp", linkLabel: "Read on LinkedIn" },
  { id: "yes", title: "NSU Young Entrepreneurs Society", subtitle: "2022 – 2023", categories: ["Community"], role: "General Member", challenge: "Support club growth and flagship events.", contribution: "2023 recruitment, brand guideline and Admaker support.", outcome: "Contributed to recruitment and Admaker.", images: [] },
];

export type Note = { id: string; title: string; date: string; body: string };
export const notes: Note[] = [
  { id: "about", title: "About Mahin", date: "Nov 2026", body: `# Hi, I'm Raihan Mahin 👋\n${profile.headline}\n${profile.tagline}\n\n${profile.bio}\n\nBased in ${profile.location}. Final-year BBA Marketing student at North South University.\n\n- Email: ${profile.email}\n- Behance: behance.net/raihanmahin` },
  { id: "now", title: "Currently: Agency Lead", date: "Nov 2026", body: `# Current work
I currently run an agency. One of our current workstreams is producing AI-generated content for:

- Lux
- Lifebuoy
- Dove

Media will be added here later.` },
  { id: "pureit", title: "Pureit — transition & 3 launches", date: "Jun 2026", body: `# Pureit (BizLearner) · Aug 2024 – Jun 2026
Pureit (formerly Unilever) was acquired by A. O. Smith.

- Contributed to the brand transition and logo rollout across 7+ touchpoints
- Market and competitor benchmarking for Bangladesh and Sri Lanka
- Over 300 marketing assets across 3 launches: Wave, Marina and Ultima Pro
- Supported Ultima Pro end-to-end communications
- Collaborated with brand, media and agency teams, contributing to a 6.5x increase in digital sales` },
  { id: "skills", title: "Skills & tools", date: "Nov 2026", body: `# Skills\n${Object.entries(skills).map(([k, v]) => `## ${k}\n${v.map((s) => `- ${s}`).join("\n")}`).join("\n\n")}` },
  { id: "awards", title: "Competitions & awards", date: "2026", body: `# ${awards.length} results · ${awards.filter((a) => a.rank === "Champion").length} championships\n${awards.map((a) => `- ${a.rank} — ${a.title} (${a.organizer}): ${a.focus}${a.scale ? `, ${a.scale}` : ""}`).join("\n")}` },
  { id: "community", title: "Community & leadership", date: "2026", body: `# Leadership\n${leadership.map((l) => `- ${l.role}, ${l.org} (${l.period}) — ${l.detail}`).join("\n")}` },
  { id: "insights", title: "Marketing Insights: Airtel → Cirkle", date: "2026", body: "# Marketing Insights\nA LinkedIn thought piece by Mahin analysing the Airtel to Cirkle rebrand and its long-term brand identity strategy.\n\nThis is personal commentary — not a campaign Mahin worked on.\n\n- Read: linkedin.com/posts/raihanmahin (From Airtel to Cirkle)" },
  { id: "education", title: "Education", date: "2026", body: `# Education\n${education.map((e) => `- ${e.degree} — ${e.school}, ${e.period}`).join("\n")}` },
  { id: "experience", title: "Experience timeline", date: "2026", body: `# Experience\n${experience.map((e) => `## ${e.role} — ${e.org}\n${e.period} · ${e.type}\n${e.bullets.map((b) => `- ${b}`).join("\n")}`).join("\n\n")}` },
];

export const qa = [
  { q: "What do you do?", a: `I'm a brand marketing & strategy professional. ${profile.tagline}. ${profile.bio}` },
  { q: "What are you working on now?", a: "I currently run an agency. One of our current workstreams is producing AI-generated content for Lux, Lifebuoy and Dove." },
  { q: "Tell me about Pureit", a: "At BizLearner (Aug 2024 – Jun 2026) I worked on Pureit: contributing to the brand transition and logo rollout across 7+ touchpoints, market and competitor benchmarking for Bangladesh and Sri Lanka, over 300 marketing assets across the Wave, Marina and Ultima Pro launches, and Ultima Pro end-to-end communications. Working with brand, media and agency teams, we contributed to a 6.5x increase in digital sales." },
  { q: "Agency & client work?", a: "At X Integrated Marketing Agency (Oct 2023 – Oct 2024) I handled customer response strategy for 5 accounts — Upay, City Bank, IDLC, Break Station and Petal — with a 90% on-time response rate. I also did a short marketing contract at Legend International School." },
  { q: "Competition wins?", a: `${awards.length} results, including ${awards.filter((a) => a.rank === "Champion").length} championships: BizMetrics 2026, Nexus 2025 and Hult Prize at NSU 2026. Plus 1st Runner-Up at Admaker, Marxcellence and Innovade 2026.` },
  { q: "Your skills?", a: "GTM and launches, strategy, research, competitor benchmarking, consumer insights, campaign execution, agency client servicing, asset design (Photoshop, Illustrator, Canva, Figma) and stakeholder management." },
  { q: "Community work?", a: "I founded Music That Heals in 2020 and grew it into a 200K-member music community with live events." },
  { q: "Education?", a: "Final-year BBA in Marketing at North South University, expected December 2026. HSC Science from DRMC." },
  { q: "How can I reach you?", a: `Email ${profile.email}, or find me on LinkedIn and Behance.` },
];
