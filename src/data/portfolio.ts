// Central content module for Mahin OS. Edit copy, projects and image URLs here.
// To add images later: put a URL (or imported asset) in any `images: []` / `thumbnail` field.

export const agencyName = "Independent Agency";

export const profile = {
  avatar: "/media/profile/mahin-profile.png",
  fullName: "Abu Raihan Mahin",
  shortName: "Raihan Mahin",
  nickname: "Mahin",
  headline: "Brand Marketing & Strategy Professional",
  subtitle: "Brand Marketing · GTM · Campaign Execution",
  // Owner-supplied wording (from his LinkedIn bio); not independently fetched.
  tagline: "Experience across 10+ brands spanning FMCG, consumer durables and fintech",
  bio: "I led Pureit’s logo rollout across seven-plus touchpoints as it moved from Unilever to A. O. Smith. At X Integrated, I managed customer engagement for five client accounts. Today, I co-run an agency producing short-form content for Lux, Lifebuoy and Dove.",
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
    role: "Co-Founder",
    org: agencyName,
    period: "Current",
    type: "Current",
    clients: ["Lux", "Lifebuoy", "Dove"],
    bullets: [
      "I co-run an independent agency. We produce AI-generated short-form content for Lux, Lifebuoy and Dove.",
    ],
  },
  {
    id: "bizlearner",
    role: "Marketing",
    org: "BizLearner — on Pureit",
    context: "Pureit (formerly Unilever, acquired by A. O. Smith)",
    period: "Aug 2024 – Jun 2026",
    type: "Part-time",
    clients: ["Unilever", "Pureit", "A. O. Smith"],
    bullets: [
      "At BizLearner, I led Pureit’s logo rollout across seven-plus touchpoints as it moved from Unilever to A. O. Smith.",
      "Conducted competitor benchmarking and feasibility research in Bangladesh and Sri Lanka.",
      "I developed 300+ launch materials collectively for Wave, Marina and Ultima Pro. For Ultima Pro, I helped coordinate messaging before and after launch across digital, PR and trade.",
      "Collaborative campaign and e-commerce work with brand, media and agency teams contributed to 6.5x digital sales growth.",
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
      "At X Integrated, I managed response strategy for Upay, City Bank, IDLC, Break Station and Petal, with 90% of responses on time.",
      "I brought proposed improvements to client meetings and contributed to consumer research and campaign ideas.",
    ],
  },
];

export type AgencyBrand = { id: string; brand: string; tagline: string; description: string; thumbnail?: string; video?: string };
export const agencyBrands: AgencyBrand[] = [
  { id: "lux", brand: "Lux", tagline: "Current agency workstream", description: "AI-generated content for Lux." },
  { id: "lifebuoy", brand: "Lifebuoy", tagline: "Current agency workstream", description: "AI-generated content for Lifebuoy." },
  { id: "dove", brand: "Dove", tagline: "Current agency workstream", description: "AI-generated content for Dove." },
];

export type Award = { id: string; rank: string; title: string; organizer: string; year: string; focus: string; detail: string; scale?: string; images: string[]; link?: string; team?: string; pendingImages?: string[]; caseBrands?: string[] };
export const awards: Award[] = [
  { id: "bizmetrics", rank: "Champion", title: "BizMetrics 2026", organizer: "BTM, IUT", year: "2026", focus: "GTM for a new product concept", detail: "Developed a new product concept and its go-to-market plan.", pendingImages: ["/media/awards/bizmetrics-2026-champion-group-stage.jpg"], images: ["/media/awards/bizmetrics-2026-champion-group-stage.jpg"] },
  { id: "nexus", caseBrands: ["Polar", "NCC Bank"], rank: "Champion", title: "Nexus 2025", organizer: "KUET Business Club", year: "2025", focus: "Strategic cases — Polar & NCC Bank", detail: "Strategy cases for Polar and NCC Bank (competition cases).", team: "Arctic Wolves", pendingImages: ["/media/awards/nexus-2025-champion-group-stage.jpg"], images: ["/media/awards/nexus-2025-champion-group-stage.jpg"] },
  { id: "hult", rank: "Champion", title: "Hult Prize at NSU 2026", organizer: "NSU YEF", year: "2026", focus: "SDG-aligned concept & full GTM", detail: "Built an SDG-aligned venture concept with a complete go-to-market strategy.", pendingImages: ["/media/awards/hult-prize-nsu-2026-champion-group-stage.jpg"], images: ["/media/awards/hult-prize-nsu-2026-champion-group-stage.jpg"] },
  { id: "admaker", caseBrands: ["Maya", "EBL"], rank: "1st Runner-Up", title: "Admaker Bangladesh 2026", organizer: "NSU YES!", year: "2026", focus: "Marketing strategy & OVC — Maya + EBL", detail: "Marketing strategy and OVC for Maya and EBL (competition case).", scale: "1000+ teams", team: "Arc Crew", pendingImages: ["/media/awards/admaker-2026-runner-up-solo-award.jpg", "/media/awards/admaker-2026-runner-up-group-stage.jpg"], images: ["/media/awards/admaker-2026-runner-up-solo-award.jpg", "/media/awards/admaker-2026-runner-up-group-stage.jpg"] },
  { id: "marxcellence", caseBrands: ["Vertika", "Dhaka Bank"], rank: "1st Runner-Up", title: "Marxcellence 2026", organizer: "NSU MIBC", year: "2026", focus: "Brand strategy & OVC — Vertika + Dhaka Bank", detail: "Brand strategy and OVC for Vertika and Dhaka Bank (competition case).", scale: "1000+ teams", team: "Arc Crew", pendingImages: ["/media/awards/marxcellence-2026-runner-up-solo-stage.jpg", "/media/awards/marxcellence-2026-runner-up-seated-trophy.jpg", "/media/awards/marxcellence-2026-runner-up-group-candid.jpg"], images: ["/media/awards/marxcellence-2026-runner-up-solo-stage.jpg", "/media/awards/marxcellence-2026-runner-up-seated-trophy.jpg", "/media/awards/marxcellence-2026-runner-up-group-candid.jpg"], link: "https://www.linkedin.com/posts/raihanmahin_first-runner-up-marxcellence-two-competitions-activity-7496950896132521984-LnjI" },
  { id: "innovade", caseBrands: ["Yamaha"], rank: "1st Runner-Up", title: "Innovade 2026", organizer: "NSU MIBC", year: "2026", focus: "International Yamaha smart-tech case", detail: "International smart-tech case for Yamaha (competition case).", team: "Arctic Wolves", pendingImages: ["/media/awards/innovade-2026-runner-up-group.jpg"], images: ["/media/awards/innovade-2026-runner-up-group.jpg"] },
  { id: "brandaid", caseBrands: ["Monno Ceramics", "ZenFresh"], rank: "2nd Runner-Up", title: "BrandAid 2026", organizer: "EWU Business Club", year: "2026", focus: "Repositioning — Monno Ceramics & ZenFresh", detail: "Repositioning for Monno Ceramics and ZenFresh (competition case).", team: "Marketman", pendingImages: ["/media/awards/brandaid-2026-2nd-runner-up-group.jpg"], images: ["/media/awards/brandaid-2026-2nd-runner-up-group.jpg"] },
  { id: "otw", rank: "Finalist", title: "Over the Wall 2025", organizer: "Marico", year: "2025", focus: "Product concept & GTM", detail: "Product concept and go-to-market plan.", scale: "1850+ teams", pendingImages: [], images: [] },
];

export type PureitCase = { id: string; title: string; kind: string; challenge: string; contribution: string; outcome: string; images: string[] };
export const pureitCases: PureitCase[] = [
  { id: "pureit-transition", title: "Pureit Brand Transition", kind: "Brand transition", challenge: "Pureit's move to a new identity after its acquisition by A. O. Smith (formerly Unilever).", contribution: "At BizLearner, I led Pureit’s logo rollout across seven-plus touchpoints and benchmarked competitors in Bangladesh and Sri Lanka.", outcome: "Brand transition rolled out across 7+ touchpoints (team effort).", images: [] },
  { id: "pureit-wave", title: "Pureit Wave Launch", kind: "Product launch", challenge: "One of three Pureit product launches.", contribution: "Marketing assets for the launch, as part of 300+ assets across the three launches.", outcome: "Part of the 300+ assets delivered across three launches.", images: [] },
  { id: "pureit-marina", title: "Pureit Marina Launch", kind: "Product launch", challenge: "One of three Pureit product launches.", contribution: "Marketing assets for the launch, as part of 300+ assets across the three launches.", outcome: "Part of the 300+ assets delivered across three launches.", images: [] },
  { id: "pureit-ultima", title: "Pureit Ultima Pro Launch", kind: "Product launch", challenge: "One of three Pureit product launches.", contribution: "I helped coordinate Ultima Pro messaging before and after launch across digital, PR and trade, as part of 300+ assets collectively across three launches.", outcome: "Part of the 300+ assets delivered across three launches.", images: [] },
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
  { id: "mth", role: "Founder & Admin", org: "Music That Heals", period: "2020 – Present", detail: "I founded Music That Heals and built it into a 200K-member music community that also organizes live events." },
  { id: "yes", role: "General Member", org: "NSU Young Entrepreneurs Society", period: "2022 – 2023", detail: "Supported 2023 recruitment, the brand guideline, and Admaker." },
  { id: "drmc", role: "Volunteer", org: "DRMC Science Club", period: "2019 – 2020", detail: "Volunteered at the science festival and gaming segment with ~1,000 participants." },
];

export const education = [
  { id: "nsu", degree: "BBA, Marketing (final year)", school: "North South University", period: "2022 – Expected Dec 2026" },
  { id: "drmc", degree: "HSC, Science", school: "Dhaka Residential Model College (DRMC)", period: "2018 – 2020" },
];

export const skills = {
  Strategy: ["Go-to-market (GTM)", "Product launch support", "Campaign planning & execution", "Consumer insights", "Market research", "Competitor benchmarking", "Feasibility research"],
  Collaboration: ["Cross-functional collaboration", "Stakeholder management", "Project coordination", "Vendor coordination", "Agency client servicing"],
  Technical: ["Website development", "Marketing asset design", "Photoshop", "Illustrator", "Canva", "Figma", "Presentation tools"],
};

// Detailed metrics (300+ assets, 6.5x, 7+ touchpoints, 3 launches) live in experience, case studies and the resume.
export const podiums = awards.filter((a) => a.rank !== "Finalist").length;
export const championships = awards.filter((a) => a.rank === "Champion").length;
/** Compact home achievements; recruiter metrics are separate. */
export const highlights = [
  { value: "10+", label: "brands worked with", note: "Owner-supplied summary" },
  { value: String(podiums), label: "national competition podiums", note: "3 champions · 3 first runners-up · 1 second runner-up" },
];
export const recruiter = {
  subtitle: "Brand Marketing & Strategy Professional | GTM, Brand Transitions & Integrated Marketing",
  summary: profile.bio,
  roles: ["Brand Marketing", "GTM & Launches", "Campaign Strategy", "Agency Client Servicing"],
  stats: [{ value: "10+", label: "Brands" }, { value: "7", label: "National Podiums" }, { value: "3", label: "Championships" }, { value: "200K", label: "Community" }],
  highlights: ["Pureit, through BizLearner: brand transition from Unilever to A. O. Smith, 7+ touchpoints and three product launches.", "X Integrated: five client accounts, consumer research, campaign ideation and 90% on-time responses.", "Seven national podiums, including three championships; separately, a finalist among 1850+ teams at Marico's Over the Wall 2025.", "Founder & Admin of Music That Heals, a 200K-member community."],
};
export const listeningPlaylists = [
  { title: "Focus & Flow", query: "instrumental focus", symbol: "♫", tone: "focus" },
  { title: "After Hours", query: "late night jazz", symbol: "♪", tone: "night" },
  { title: "Energy Boost", query: "workout energy", symbol: "♬", tone: "energy" },
].map((p) => ({ ...p, url: `https://open.spotify.com/search/${encodeURIComponent(p.query)}` }));

/** Kept for detailed views (e.g. resume); not shown on the homepage. */
export const stats = [
  { value: "300+", label: "Marketing assets" },
  { value: String(pureitCases.filter((c) => c.kind === "Product launch").length), label: "Launch projects" },
  { value: "7+", label: "Brand touchpoints" },
  { value: "6.5x", label: "Digital sales (team)" },
];

export type ProjectCategory = "★ Flagship" | "Brand Strategy & Transition" | "Product Launches" | "Client Engagement" | "Campaigns & Creative" | "Community & Leadership" | "Awards & Achievements";
export const projectCategories: ProjectCategory[] = ["★ Flagship", "Brand Strategy & Transition", "Product Launches", "Client Engagement", "Campaigns & Creative", "Community & Leadership"];

export type Project = {
  id: string; title: string; subtitle: string; role?: string;
  challenge?: string; contribution?: string; outcome?: string; summary?: string;
  images: string[]; link?: string; linkLabel?: string; badge?: string;
  /** "Case brands" = competition case subjects (not clients); "Clients"/"Brands" = professional work. */
  brandRow?: { label: string; names: string[] };
};

const behanceProjects = behanceWorks.map<Project>((w) => ({
  id: `bh-${w.id}`, title: w.title, subtitle: `${w.type} · Behance`, images: w.thumbnail ? [w.thumbnail] : [], link: w.url,
}));

export const projects: Project[] = [
  ...behanceProjects,
  { id: "pureit-transition", title: "Pureit Brand Transition", subtitle: "BizLearner · Aug 2024 – Jun 2026", role: "Marketing (BizLearner)", summary: "At BizLearner, I led Pureit’s logo rollout across seven-plus touchpoints as it moved from Unilever to A. O. Smith. I benchmarked competitors in Bangladesh and Sri Lanka.", images: ["/media/behance/234564039.jpg"], brandRow: { label: "Brands", names: ["Unilever", "Pureit", "A. O. Smith"] } },
  { id: "pureit-launches", title: "Pureit Wave, Marina & Ultima Pro", subtitle: "3 product launches", role: "Marketing (BizLearner)", summary: "I developed launch materials for Wave, Marina and Ultima Pro — 300+ collectively. For Ultima Pro, I helped coordinate messaging before and after launch across digital, PR and trade. Collaborative campaign and e-commerce work contributed to 6.5x digital sales growth.", images: ["/media/behance/234562973.jpg"], brandRow: { label: "Brands", names: ["Unilever", "Pureit", "A. O. Smith"] } },
  ...awards.map<Project>((a) => ({
    id: `award-${a.id}`, title: `${a.title} — ${a.rank}`, subtitle: `${a.organizer} · ${a.year}`, ...(a.team ? { role: `Team ${a.team}` } : {}),
    summary: `${a.detail}${a.scale ? ` ${a.scale}.` : ""}`, images: a.images, badge: a.rank,
    ...(a.caseBrands ? { brandRow: { label: "Case subjects (competition, not clients)", names: a.caseBrands } } : {}),
    ...(a.link ? { link: a.link, linkLabel: "View LinkedIn post" } : {}),
  })),
  { id: "agency", title: "Co-Founder", subtitle: `${agencyName} · Current`, role: "Co-Founder", summary: "I co-run an independent agency. We produce AI-generated short-form content for Lux, Lifebuoy and Dove.", images: [], brandRow: { label: "Current brands", names: agencyBrands.map((b) => b.brand) } },
  ...agencyBrands.map<Project>((b) => ({ id: `agency-${b.id}`, title: b.brand, subtitle: "Agency work · Current", role: "Co-Founder", summary: b.description, images: b.thumbnail ? [b.thumbnail] : [] })),
  { id: "x-agency", title: "X Integrated Marketing Agency", subtitle: "Junior Engagement Officer · Oct 2023 – Oct 2024", role: "Junior Engagement Officer", summary: experience.find(e => e.id === "x-agency")?.bullets.join(" ") ?? "", images: [], brandRow: { label: "Client accounts", names: ["Upay", "City Bank", "IDLC", "Break Station", "Petal"] } },
  { id: "legend", title: "Legend International School", subtitle: "Marketing Officer · Oct – Nov 2024", role: "Marketing Officer (contract)", summary: "Promotional material and marketing execution on a short contract.", images: [] },
  { id: "mth", title: "Music That Heals", subtitle: "Founder & Admin · 2020 – Present", role: "Founder & Admin", summary: "I founded Music That Heals and built it into a 200K-member music community that also organizes live events.", images: [] },
  { id: "yes", title: "NSU Young Entrepreneurs Society", subtitle: "General Member · 2022 – 2023", role: "General Member", summary: "Helped with 2023 recruitment, the brand guideline and Admaker.", images: [] },
  { id: "insight-cirkle", title: "From Airtel to Cirkle", subtitle: "LinkedIn thought piece", role: "Author", summary: "A personal LinkedIn post on the Airtel → Cirkle rebrand and long-term brand identity. Commentary, not a campaign he worked on.", images: [], link: "https://www.linkedin.com/posts/raihanmahin_from-airtel-to-cirkle-a-meaningless-rebrand-activity-7496206091739967488-a0Tp", linkLabel: "Read on LinkedIn" },
];

export type PhotoAlbum = { id: string; title: string; ids: string[] };
export type PhotoRoot = { id: ProjectCategory; ids?: string[]; albums?: PhotoAlbum[]; cover?: string; coverStyle?: "flagship" | "transition" };
/** Single source of truth for the Photos hierarchy (desktop + phone). */
export const photoRoots: PhotoRoot[] = [
  { id: "★ Flagship", ids: ["pureit-transition", "pureit-launches", "x-agency", "mth"], coverStyle: "flagship" },
  { id: "Brand Strategy & Transition", ids: ["pureit-transition", "insight-cirkle"], coverStyle: "transition" },
  { id: "Product Launches", ids: ["pureit-launches"], cover: "/media/behance/234562973.jpg" },
  { id: "Client Engagement", albums: [{ id: "agency", title: "Agency & Client Work", ids: ["x-agency", "agency", "legend"] }] },
  { id: "Campaigns & Creative", cover: "/media/behance/242883541.jpg", albums: [
    { id: "pureit", title: "Pureit", ids: ["bh-pureit-cat", "bh-pureit-man"] },
    { id: "berger", title: "Berger & Outdoor", ids: ["bh-berger", "bh-billboard"] },
    { id: "packaging", title: "Packaging", ids: ["bh-parachute"] },
    { id: "campaigns", title: "Campaigns & Digital", ids: ["bh-skin", "bh-bankcard", "bh-promo-video", "bh-promo-social", "bh-social", "bh-social-brand"] },
    { id: "other", title: "Other Design", ids: ["bh-letterhead", "bh-brochure", "bh-oggy", "bh-hattori"] },
  ] },
  { id: "Community & Leadership", ids: ["mth", "yes"] },
  { id: "Awards & Achievements", ids: awards.map(a => `award-${a.id}`) },
];
/** Old OS links continue to resolve without mixing achievements into work. */
export function resolvePhotoCategory(value: string): ProjectCategory {
  const aliases: Record<string, ProjectCategory> = { Featured: "★ Flagship", "Brand Design": "Campaigns & Creative", Competitions: "Awards & Achievements", "More Work": "Client Engagement" };
  return aliases[value] ?? projectCategories.find(c => c === value) ?? (value === "Awards & Achievements" ? value : "★ Flagship");
}
export const workRoots = photoRoots.filter(r => r.id !== "Awards & Achievements");
export const workProjects = projects.filter(p => !p.id.startsWith("award-"));
export const projectById = (id: string) => projects.find((p) => p.id === id);
export const albumItems = (ids: string[]) => ids.map(projectById).filter((p): p is Project => !!p);
export const rootIds = (r: PhotoRoot) => r.ids ?? (r.albums ?? []).flatMap((a) => a.ids);
export const findAlbum = (id: string) => photoRoots.flatMap((r) => (r.albums ?? []).map((a) => ({ root: r.id, album: a }))).find((x) => x.album.id === id);
/** First real image in an album (used as its cover). */
export const albumCover = (ids: string[]) => albumItems(ids).flatMap((p) => p.images)[0];

export type Note = { id: string; title: string; date: string; body: string };
export const notes: Note[] = [
  { id: "about", title: "Hi, I'm Mahin 👋", date: "Nov 2026", body: `# Hi, I'm Mahin 👋
${profile.headline} · ${profile.location}

${profile.bio}

## At a glance
- 10+ brands worked with across FMCG, consumer durables and fintech
- Pureit brand transition (Unilever → A. O. Smith), via BizLearner
- 7 competition podiums, incl. 3 championships, plus a Marico finalist spot

## Explore this computer
- Photos: GTM, brand transitions, competitions and client work
- Finder: experience, projects and awards
- Preview: my resume
- Messages: ask me anything

${profile.email} · behance.net/raihanmahin` },
  { id: "now", title: "Currently: Co-Founder", date: "Nov 2026", body: `# Co-Founder
I co-run an independent agency. We produce AI-generated short-form content for Lux, Lifebuoy and Dove.` },
  { id: "pureit", title: "Pureit Brand Transition", date: "Jun 2026", body: `# Pureit (via BizLearner) · Aug 2024 – Jun 2026
At BizLearner, I led Pureit’s logo rollout across seven-plus touchpoints as it moved from Unilever to A. O. Smith.

- Benchmarked the market and competitors in Bangladesh and Sri Lanka
- Created 300+ launch assets across Wave, Marina and Ultima Pro
- Supported Ultima Pro's end-to-end communications
- Worked with brand, media and agency teams as digital sales grew 6.5x` },
  { id: "skills", title: "Core Skills", date: "Nov 2026", body: `# Skills\n${Object.entries(skills).map(([k, v]) => `## ${k}\n${v.map((s) => `- ${s}`).join("\n")}`).join("\n\n")}` },
  { id: "awards", title: "Competitions & awards", date: "2026", body: `# 7 podiums + 1 Marico finalist\n${awards.map((a) => `- ${a.rank} — ${a.title} (${a.organizer}): ${a.focus}${a.scale ? `, ${a.scale}` : ""}`).join("\n")}` },
  { id: "community", title: "Community & leadership", date: "2026", body: `# Leadership\n${leadership.map((l) => `- ${l.role}, ${l.org} (${l.period}) — ${l.detail}`).join("\n")}` },
  { id: "insights", title: "Marketing Insights: Airtel → Cirkle", date: "2026", body: "# Marketing Insights\nMy LinkedIn take on the Airtel → Cirkle rebrand and what it means for long-term brand identity. Personal commentary, not a campaign I worked on.\n\n- Read: linkedin.com/posts/raihanmahin (From Airtel to Cirkle)" },
  { id: "education", title: "Education", date: "2026", body: `# Education\n${education.map((e) => `- ${e.degree} — ${e.school}, ${e.period}`).join("\n")}` },
  { id: "experience", title: "Where I’ve Worked", date: "2026", body: `# Experience\n${experience.map((e) => `## ${e.role} — ${e.org}\n${e.period} · ${e.type}\n${e.bullets.map((b) => `- ${b}`).join("\n")}`).join("\n\n")}` },
  { id: "launches", title: "Pureit Product Launches", date: "Jun 2026", body: "# Pureit Product Launches\nWave, Marina and Ultima Pro: 300+ communication assets across the three launches. Ultima Pro included pre-to-post launch communications. Collaborative digital campaigns and e-commerce work contributed to 6.5x digital sales growth." },
  { id: "x-accounts", title: "X Agency Accounts", date: "Oct 2024", body: "# X Agency Accounts\nUpay, City Bank, IDLC, Break Station and Petal. Managed response strategy with 90% on-time responses, bringing proposed improvements to client meetings alongside consumer research and campaign ideas." },
  { id: "website", title: "About This Site", date: "Nov 2026", body: "# About This Site\nMahin OS is my career portfolio, inspired by desktop and phone interfaces. Not affiliated with Apple. Design work sits in a separate Behance gallery." },
];

export const qa = [
  { q: "What do you do?", a: `I'm a brand marketing & strategy professional. ${profile.bio}` },
  { q: "What are you working on now?", a: "I co-run an independent agency. We produce AI-generated short-form content for Lux, Lifebuoy and Dove." },
  { q: "Tell me about Pureit", a: "Through BizLearner (Aug 2024 – Jun 2026) I led Pureit’s logo rollout across seven-plus touchpoints after the A. O. Smith acquisition. I developed 300+ launch assets collectively for Wave, Marina and Ultima Pro. Collaborative campaign and e-commerce work contributed to 6.5x digital sales growth." },
  { q: "Agency & client work?", a: "At X Integrated Marketing Agency (Oct 2023 – Oct 2024) I managed response strategy for Upay, City Bank, IDLC, Break Station and Petal, with 90% of responses on time. I also did a short marketing contract at Legend International School." },
  { q: "Competition wins?", a: "Seven podiums: champion at BizMetrics 2026, Nexus 2025 and Hult Prize at NSU 2026; 1st runner-up at Admaker Bangladesh, Marxcellence and Innovade 2026; 2nd runner-up at BrandAid 2026. I was also a finalist at Marico's Over the Wall 2025." },
  { q: "Your skills?", a: "GTM and launches, strategy, research, competitor benchmarking, consumer insights, campaign execution, agency client servicing, asset design (Photoshop, Illustrator, Canva, Figma) and stakeholder management." },
  { q: "Community work?", a: "I founded Music That Heals in 2020 and grew it into a 200K-member music community with live events." },
  { q: "Education?", a: "Final-year BBA in Marketing at North South University, expected December 2026. HSC Science from DRMC." },
  { q: "How can I reach you?", a: `Email ${profile.email}, or find me on LinkedIn and Behance.` },
];
