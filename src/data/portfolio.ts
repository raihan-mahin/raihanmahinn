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
  bio: "I’ve worked on brand transitions, product launches and customer engagement, with a practical interest in designing website and app interfaces. At BizLearner, I helped carry Pureit’s brand transition across packaging, manuals and retail materials. At X Integrated Marketing Agency, I managed social media queries for five client accounts.",
  location: "Dhaka, Bangladesh",
  email: "raihanmahin.work@gmail.com",
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
    org: "BizLearner",
    context: "Supporting Unilever Pureit → A. O. Smith Pureit · Water & Air Wellness / Home Care",
    period: "Aug 2024 – Jun 2026",
    type: "Part-time",
    clients: ["Unilever", "Pureit", "A. O. Smith"],
    bullets: [
      "I supported campaign planning and competitor benchmarking / feasibility research in Bangladesh and Sri Lanka, working with brand managers, assistant managers and external agencies.",
      "I contributed to Pureit’s move from Unilever to A. O. Smith across 7+ touchpoints, including packaging, carton layouts (CLDs), manuals and marketing collateral, through my part-time Marketing role at BizLearner.",
      "I supported Marina, Wave and Ultima Pro CLDs and prepared Ultima Pro prelaunch materials with the team; 300+ communication assets collectively covered the three launches.",
      "I helped prepare POSM — leaflets, kiosks, danglers, shelf talkers and catalogs — Facebook campaign creative and display ads, and adapted e-commerce content.",
      "I supported PR and vendor coordination. Collaborative campaign and e-commerce work with brand, media and agency teams contributed to 6.5x digital sales growth.",
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
    context: "On-site · under executive supervision",
    bullets: [
      "Managed social media queries across five client accounts and wrote clear, helpful replies. Aimed to respond in under two minutes while checking accuracy and following up when needed. Worked on-site under executive supervision for Upay, City Bank, IDLC, Break Station and Petal, maintaining a 90% on-time response rate.",
      "I used feedback from client meetings and researched consumer pain points to improve responses.",
      "I contributed to campaign ideas, including a Banglalink tagline brainstorming brief; Banglalink was an ideation brief, not a sixth serviced account.",
    ],
  },
];

export type AgencyBrand = { id: string; brand: string; tagline: string; description: string; thumbnail?: string; video?: string };
export const agencyBrands: AgencyBrand[] = [
  { id: "lux", brand: "Lux", tagline: "Current agency workstream", description: "AI-generated content for Lux." },
  { id: "lifebuoy", brand: "Lifebuoy", tagline: "Current agency workstream", description: "AI-generated content for Lifebuoy." },
  { id: "dove", brand: "Dove", tagline: "Current agency workstream", description: "AI-generated content for Dove." },
];

export type Award = { id: string; rank: string; title: string; organizer: string; year: string; focus: string; detail: string; scale?: string; images: string[]; link?: string; team?: string; pendingImages?: string[]; caseBrands?: string[]; captions?: string[] };
export const awards: Award[] = [
  { id: "bizmetrics", rank: "Champion", title: "BizMetrics 2026", organizer: "Beyond The Metrics / Islamic University of Technology", year: "2026", focus: "GTM for a new product concept", detail: "For Round 2, we pitched a DEET-free baby lotion that combined mosquito protection with moisturising. In the finale, we presented a full go-to-market plan for a new product concept.", team: "Arctic Wolves", link: "https://www.linkedin.com/feed/update/urn:li:activity:7421168154850144257/", pendingImages: ["/media/awards/bizmetrics-2026-champion-group-stage.jpg"], images: ["/media/awards/bizmetrics-2026-champion-group-stage.jpg"] },
  { id: "nexus", caseBrands: ["Polar", "NCC Bank"], rank: "Champion", title: "Nexus 2025", organizer: "KUET Business Club", year: "2025", focus: "Strategic cases — Polar & NCC Bank", detail: "Across three rounds, we worked on marketing briefs for Polar and NCC Bank. For the finale, we proposed NCC Star, a digital-first banking offer for students who wanted an easier way to open an account and make everyday payments.", team: "Arctic Wolves", link: "https://www.linkedin.com/feed/update/urn:li:activity:7405617576900325377/", pendingImages: ["/media/awards/nexus-2025-champion-group-stage.jpg"], images: ["/media/awards/nexus-2025-champion-group-stage.jpg"] },
  { id: "hult", rank: "Champion", title: "Hult Prize at NSU 2026", organizer: "NSU YEF", year: "2026", focus: "SDG-aligned concept & full GTM", detail: "We pitched an edible, biodegradable cup as an alternative to single-use cups. I was listed as CFO on the finale team, where we mapped out how to produce, price and bring the cups to market.", team: "Marketman", pendingImages: ["/media/awards/hult-prize-nsu-2026-champion-group-stage.jpg"], images: ["/media/awards/hult-prize-nsu-2026-champion-group-stage.jpg"] },
  { id: "admaker", caseBrands: ["Maya", "EBL"], rank: "1st Runner-Up", title: "Admaker Bangladesh 2026", organizer: "NSU YES!", year: "2026", focus: "Marketing strategy & OVC — Maya + EBL", detail: "In Round 1, we researched what kept customers from choosing EBL Islamic banking, including trust and how clearly the offer was explained. In the semifinal, we looked at why shoppers hesitate to try facial oils and built a simpler routine around Maya’s product. For the finale, we proposed a bill-splitting comedy series and a branded event activation for EBL Sky Banking.", scale: "1000+ teams", team: "Arc Crew", link: "https://www.linkedin.com/feed/update/urn:li:activity:7492578751315116032/", pendingImages: ["/media/awards/admaker-2026-runner-up-solo-award.jpg", "/media/awards/admaker-2026-runner-up-group-stage.jpg"], images: ["/media/awards/admaker-2026-runner-up-solo-award.jpg", "/media/awards/admaker-2026-runner-up-group-stage.jpg"] },
  { id: "marxcellence", caseBrands: ["Vertika", "Dhaka Bank"], rank: "1st Runner-Up", title: "Marxcellence 2026", organizer: "NSU MIBC", year: "2026", focus: "Brand strategy & OVC — Vertika + Dhaka Bank", detail: "We built brand strategies and online video commercials for the Vertika and Dhaka Bank briefs. I shared the first runner-up result on LinkedIn after competing in two events in one week.", team: "Arc Crew", pendingImages: ["/media/awards/marxcellence-2026-runner-up-solo-stage.jpg", "/media/awards/marxcellence-2026-runner-up-seated-trophy.jpg", "/media/awards/marxcellence-2026-runner-up-group-candid.jpg"], images: ["/media/awards/marxcellence-2026-runner-up-solo-stage.jpg", "/media/awards/marxcellence-2026-runner-up-seated-trophy.jpg", "/media/awards/marxcellence-2026-runner-up-group-candid.jpg"], link: "https://www.linkedin.com/posts/raihanmahin_first-runner-up-marxcellence-two-competitions-activity-7496950896132521984-LnjI" },
  { id: "innovade", caseBrands: ["NOVOAIR", "Yamaha"], rank: "1st Runner-Up", title: "Innovade 2026", organizer: "NSU MIBC", year: "2026", focus: "Airline expansion proposal & Yamaha supply-chain brief", detail: "In the semifinal, we proposed that NOVOAIR expand directly into Malaysia and enter Thailand through a partner airline. The finale brief asked how Yamaha Motor could make its global supply chain more resilient when major shipping routes were disrupted.", team: "Arctic Wolves", pendingImages: ["/media/awards/innovade-2026-runner-up-group.jpg"], images: ["/media/awards/innovade-2026-runner-up-group.jpg"] },
  { id: "brandaid", caseBrands: ["Monno Ceramics", "ZenFresh"], rank: "2nd Runner-Up", title: "BrandAid 2026", organizer: "EWU Business Club", year: "2026", focus: "Repositioning — Monno Ceramics & ZenFresh", detail: "We worked on repositioning briefs for Monno Ceramics and ZenFresh. For the ZenFresh finale, we explored how younger shoppers choose toothpaste and proposed more visible in-store displays and a mix of digital and outdoor promotion.", team: "Marketman", pendingImages: ["/media/awards/brandaid-2026-2nd-runner-up-group.jpg"], images: ["/media/awards/brandaid-2026-2nd-runner-up-group.jpg"] },
  { id: "otw", rank: "Finalist", title: "Over the Wall 2025", organizer: "Marico", year: "2025", focus: "Product concept & GTM", detail: "Team Marketman reached the top six out of 1,850 teams. We presented a new product concept and a go-to-market strategy.", scale: "1,850+ teams", team: "Marketman", link: "https://www.linkedin.com/feed/update/urn:li:activity:7287835152670461953/", pendingImages: ["/media/awards/marico-season3-team-presentation.jpg", "/media/awards/marico-season3-final-stage.jpg", "/media/awards/marico-season3-finalists-group.jpg", "/media/awards/marico-season3-marketman-banner.jpg", "/media/awards/marico-season4-season3-finalist-reunion.jpg", "/media/awards/marico-season4-season3-finalist-portrait.jpg"], images: ["/media/awards/marico-season3-team-presentation.jpg", "/media/awards/marico-season3-final-stage.jpg", "/media/awards/marico-season3-finalists-group.jpg", "/media/awards/marico-season3-marketman-banner.jpg", "/media/awards/marico-season4-season3-finalist-reunion.jpg", "/media/awards/marico-season4-season3-finalist-portrait.jpg"], captions: ["Team Marketman presenting its product concept and go-to-market strategy at the Season 3 final.", "Team Marketman on the Season 3 final stage with its presentation visible.", "Season 3 finalists gathered on the Marico Over the Wall stage.", "Team Marketman’s banner at Over the Wall Season 3.", "Season 3 finalists reunited at a Season 4 event beside a display recognizing their Season 3 result.", "Raihan at the Season 4 event beside the Season 3 finalist recognition display; not a Season 4 finalist result."] },
];

export type PureitCase = { id: string; title: string; kind: string; challenge: string; contribution: string; outcome: string; images: string[] };
export const pureitCases: PureitCase[] = [
  { id: "pureit-transition", title: "Pureit Brand Transition", kind: "Brand transition", challenge: "Pureit's move to a new identity after its acquisition by A. O. Smith (formerly Unilever).", contribution: "At BizLearner, I supported Pureit’s transition across packaging, carton layouts, manuals and marketing collateral. I benchmarked competitors in Bangladesh and Sri Lanka with brand and agency teams.", outcome: "Brand transition rolled out across 7+ touchpoints (team effort).", images: [] },
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
  { id: "mth", role: "Founder & Admin", org: "Music That Heals", period: "2020 – Present", detail: "I founded Music That Heals, a music community that also organizes live events." },
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
  Technical: ["Web development & website / app interface design (UI/UX)", "Marketing asset design", "Photoshop", "Illustrator", "Canva", "Figma", "Presentation tools"],
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
  subtitle: "Brand Marketing & Strategy Professional",
  summary: "Very few people get a front-row seat to a brand acquisition. I had one. I joined Unilever as a BizLearner, assigned to Pureit, and six months in, A. O. Smith acquired the brand.\n\nI helped carry Pureit through the transition while supporting three product launches. For Ultima Pro, I helped build the launch campaign materials from scratch.\n\nBefore Pureit, I managed customer engagement for five clients at X Integrated Marketing Agency. Today, I co-run an independent agency. Across those roles, I’ve worked with 10+ brands while pursuing my Marketing degree at NSU.",
  roles: ["Brand Marketing", "Sales & E-commerce", "Campaign Strategy", "Agency Client Servicing"],
  stats: [{ value: "10+", label: "Brands" }, { value: "7", label: "National Competition Podiums" }, { value: "3", label: "Markets", note: "Bangladesh · India · Sri Lanka" }, { value: "2+ years", label: "Marketing experience" }],
  highlights: ["Supported Pureit’s transition across 7+ brand touchpoints, from packaging to retail.", "Managed social media queries for five accounts at X Integrated, with a 90% on-time response rate.", "Helped develop 300+ marketing assets for three Pureit launches.", "Earned seven national competition podiums across product, brand and campaign briefs."],
};
export const listeningPlaylists = [
  { title: "Focus & Flow", query: "instrumental focus", symbol: "♫", tone: "focus" },
  { title: "After Hours", query: "late night jazz", symbol: "♪", tone: "night" },
  { title: "Energy Boost", query: "workout energy", symbol: "♬", tone: "energy" },
].map((p) => ({ ...p, url: `https://open.spotify.com/search/${encodeURIComponent(p.query)}` }));

/** Kept for detailed views (e.g. resume); not shown on the homepage. */
export const stats = [
  { value: "300+", label: "Marketing assets" },
  { value: "3", label: "Launch projects" },
  { value: "7+", label: "Brand touchpoints" },
  { value: "6.5x", label: "Digital sales (team)" },
];

export type ProjectCategory = "★ Flagship" | "Brand Strategy & Transition" | "X Integrated Marketing Agency" | "Co-Founder · Independent Agency" | "Legend International School" | "Campaigns & Creative" | "Community & Leadership" | "Awards & Achievements";
export const projectCategories: ProjectCategory[] = ["★ Flagship", "Brand Strategy & Transition", "X Integrated Marketing Agency", "Co-Founder · Independent Agency", "Legend International School", "Campaigns & Creative", "Community & Leadership"];

export type Project = {
  id: string; title: string; subtitle: string; role?: string;
  challenge?: string; contribution?: string; outcome?: string; summary?: string;
  images: string[]; captions?: string[]; metrics?: { value: string; label: string }[]; link?: string; linkLabel?: string; badge?: string;
  /** "Case brands" = competition case subjects (not clients); "Clients"/"Brands" = professional work. */
  brandRow?: { label: string; names: string[] };
  /** Work thumbnail gradient; original images stay in `images`. */
  gradient?: { from: string; to: string; tag: string; star?: boolean };
};

const behanceProjects = behanceWorks.map<Project>((w) => ({
  id: `bh-${w.id}`, title: w.title, subtitle: `${w.type} · Behance`, images: w.thumbnail ? [w.thumbnail] : [], link: w.url,
}));

export const projects: Project[] = [
  ...behanceProjects,
  { id: "pureit-transition", title: "Pureit Brand Transition", subtitle: "BizLearner · Aug 2024 – Jun 2026", role: "Part-time Marketing · supporting Pureit", summary: pureitCases[0]?.contribution + " My contribution included campaign planning, packaging and CLDs, manuals, marketing collateral, POSM, Facebook creative, display ads and adapting e-commerce content, alongside PR and vendor coordination. I worked with brand managers, assistant managers and external agencies, not as a direct Unilever employee.", metrics: [{ value: "7+", label: "Touchpoints supported" }, { value: "2", label: "Markets researched" }, { value: "3", label: "Launches supported" }, { value: "300+", label: "Assets across three launches (team scope)" }], images: ["/media/behance/234564039.jpg"], gradient: { from: "#e2483d", to: "#4a1036", tag: "#BrandTransition", star: true }, brandRow: { label: "Pureit transition · through BizLearner", names: ["Unilever", "Pureit", "A. O. Smith"] } },
  ...awards.map<Project>((a) => ({
    id: `award-${a.id}`, title: `${a.title} — ${a.rank}`, subtitle: `${a.organizer} · ${a.year}`, ...(a.team ? { role: `Team ${a.team}` } : {}),
    summary: a.detail, images: a.images, captions: a.captions ?? a.images.map((_, i) => `${a.title} · ${a.rank}${a.team ? ` · Team ${a.team}` : ""} · Photo ${i + 1}`), badge: a.rank,
    ...(a.caseBrands ? { brandRow: { label: "Case subjects (competition, not clients)", names: a.caseBrands } } : {}),
    ...(a.link ? { link: a.link, linkLabel: "Read the LinkedIn post" } : {}),
  })),
  { id: "agency", title: "Co-Founder", subtitle: `${agencyName} · Current`, role: "Co-Founder", summary: "I co-run an independent agency. We produce AI-generated short-form content for Lux, Lifebuoy and Dove.", images: [], gradient: { from: "#ff6b00", to: "#4a1200", tag: "#IndependentAgency" }, brandRow: { label: "Current brands", names: agencyBrands.map((b) => b.brand) } },
  ...agencyBrands.map<Project>((b) => ({ id: `agency-${b.id}`, title: b.brand, subtitle: "Agency work · Current", role: "Co-Founder", summary: b.description, images: b.thumbnail ? [b.thumbnail] : [] })),
  { id: "x-agency", title: "X Integrated Marketing Agency", subtitle: "Junior Engagement Officer · Oct 2023 – Oct 2024", role: "Junior Engagement Officer", metrics: [{ value: "Under 2 minutes", label: "Response target" }, { value: "90%", label: "On-time response" }, { value: "5", label: "Client accounts" }], summary: experience.find(e => e.id === "x-agency")?.bullets.join(" ") ?? "", images: [], gradient: { from: "#2478e8", to: "#11264d", tag: "#ClientServicing" }, brandRow: { label: "Client accounts", names: ["Upay", "City Bank", "IDLC", "Break Station", "Petal"] } },
  { id: "legend", title: "Legend International School", subtitle: "Marketing Officer · Oct – Nov 2024", role: "Marketing Officer (contract)", summary: "As a contract Marketing Officer, I helped develop promotional materials for Legend International School and supported the execution of school-level communications. The work covered both preparing the materials and helping the school deliver its messages.", metrics: [{ value: "2", label: "Areas of support" }, { value: "Oct–Nov 2024", label: "Contract period" }], images: [], gradient: { from: "#c9a227", to: "#1b1b1b", tag: "#SchoolMarketing" } },
  { id: "yes", title: "NSU Young Entrepreneurs Society", subtitle: "General Member · 2022 – 2023", role: "General Member", summary: "Helped with 2023 recruitment, the brand guideline and Admaker.", images: [], gradient: { from: "#00c7be", to: "#063b3a", tag: "#Leadership" } },
];

export type PhotoAlbum = { id: string; title: string; ids: string[] };
export type PhotoRoot = { id: ProjectCategory; ids?: string[]; albums?: PhotoAlbum[]; cover?: string; coverStyle?: "flagship" | "transition"; gradient?: Gradient };
export type Gradient = { from: string; to: string; tag: string; star?: boolean };
/** Single source of truth for the Photos hierarchy (desktop + phone). */
export const photoRoots: PhotoRoot[] = [
  { id: "★ Flagship", ids: ["pureit-transition", "x-agency"], gradient: { from: "#e2483d", to: "#4a1036", tag: "#Flagship", star: true } },
  { id: "Brand Strategy & Transition", ids: ["pureit-transition"], gradient: { from: "#ff2d55", to: "#1b0b3a", tag: "#BrandTransition" } },
  { id: "X Integrated Marketing Agency", ids: ["x-agency"], gradient: { from: "#2478e8", to: "#11264d", tag: "#ClientServicing" } },
  { id: "Co-Founder · Independent Agency", ids: ["agency"], gradient: { from: "#ff6b00", to: "#4a1200", tag: "#IndependentAgency" } },
  { id: "Legend International School", ids: ["legend"], gradient: { from: "#c9a227", to: "#1b1b1b", tag: "#SchoolMarketing" } },
  { id: "Campaigns & Creative", gradient: { from: "#00a651", to: "#05351c", tag: "#Campaigns" }, albums: [
    { id: "pureit", title: "Pureit", ids: ["bh-pureit-cat", "bh-pureit-man"] },
    { id: "berger", title: "Berger & Outdoor", ids: ["bh-berger", "bh-billboard"] },
    { id: "packaging", title: "Packaging", ids: ["bh-parachute"] },
    { id: "campaigns", title: "Campaigns & Digital", ids: ["bh-skin", "bh-bankcard", "bh-promo-video", "bh-promo-social", "bh-social", "bh-social-brand"] },
    { id: "other", title: "Other Design", ids: ["bh-letterhead", "bh-brochure", "bh-oggy", "bh-hattori"] },
  ] },
  { id: "Community & Leadership", ids: ["yes"], gradient: { from: "#00c7be", to: "#063b3a", tag: "#Leadership" } },
  { id: "Awards & Achievements", ids: awards.map(a => `award-${a.id}`) },
];
/** Old OS links continue to resolve without mixing achievements into work. */
export function resolvePhotoCategory(value: string): ProjectCategory {
  const aliases: Record<string, ProjectCategory> = { Featured: "★ Flagship", "Product Launches": "Brand Strategy & Transition", "Pureit & GTM": "Brand Strategy & Transition", "Brand Design": "Campaigns & Creative", Competitions: "Awards & Achievements", "More Work": "X Integrated Marketing Agency", "Client Engagement": "X Integrated Marketing Agency", "Agency & Client Work": "X Integrated Marketing Agency" };
  return aliases[value] ?? projectCategories.find(c => c === value) ?? (value === "Awards & Achievements" ? value : "★ Flagship");
}
export const workRoots = photoRoots.filter(r => r.id !== "Awards & Achievements");
export const workProjects = projects.filter(p => !p.id.startsWith("award-"));
export const projectById = (id: string) => projects.find((p) => p.id === id);
export const albumItems = (ids: string[]) => ids.map(projectById).filter((p): p is Project => !!p);
export const rootIds = (r: PhotoRoot) => r.ids ?? (r.albums ?? []).flatMap((a) => a.ids);
export function findAlbum(id: string): { root: ProjectCategory; album: PhotoAlbum } | undefined {
  if (id === "agency") return { root: "X Integrated Marketing Agency", album: { id, title: "X Integrated Marketing Agency", ids: ["x-agency"] } };
  return photoRoots.flatMap((root) => (root.albums ?? []).map((album) => ({ root: root.id, album }))).find((entry) => entry.album.id === id);
}
/** First real image in an album (used as its cover). */
export const albumCover = (ids: string[]) => albumItems(ids).flatMap((p) => p.images)[0];

export type Note = { id: string; title: string; date: string; body: string };
export const notes: Note[] = [
  { id: "about", title: "Hi, I'm Mahin 👋", date: "Nov 2026", body: `# Hi, I'm Mahin 👋
${profile.headline} · ${profile.location}

Very few people get a front-row seat to a brand acquisition. I had one. I joined Unilever as a BizLearner, assigned to Pureit, and six months in, A. O. Smith acquired the brand.

I helped carry Pureit through the transition and supported three product launches. For Ultima Pro, I helped build the launch materials from scratch.

Before Pureit, I managed customer engagement for five clients at X Integrated Marketing Agency. Today, I co-run an independent agency. In total, I’ve worked with 10+ brands while studying Marketing at NSU.

## At a glance
- 10+ brands worked with across FMCG, consumer durables and fintech
- Pureit brand transition (Unilever → A. O. Smith), via BizLearner
- 7 competition podiums, incl. 3 championships, plus a Marico finalist spot

## Contact
- [Email](mailto:${profile.email})
- [Behance](${profile.behance})
- [LinkedIn](${profile.linkedin})
- [Open Photos](app:photos)` },
  { id: "now", title: "Currently: Co-Founder", date: "Nov 2026", body: `# Co-Founder
I co-run an independent agency. We produce AI-generated short-form content for Lux, Lifebuoy and Dove.` },
  { id: "pureit", title: "Pureit Brand Transition", date: "Jun 2026", body: `# Pureit (via BizLearner) · Aug 2024 – Jun 2026
${experience.find(e => e.id === "bizlearner")?.bullets.map(b => `- ${b}`).join("\n")}` },
  { id: "skills", title: "Core Skills", date: "Nov 2026", body: `# Skills\n${Object.entries(skills).map(([k, v]) => `## ${k}\n${v.map((s) => `- ${s}`).join("\n")}`).join("\n\n")}` },
  { id: "awards", title: "Competitions & awards", date: "2026", body: `# 7 podiums + 1 Marico finalist\n${awards.map((a) => `- ${a.rank} — ${a.title} (${a.organizer}): ${a.focus}${a.scale ? `, ${a.scale}` : ""}`).join("\n")}` },
  { id: "community", title: "Community & leadership", date: "2026", body: `# Leadership\n${leadership.map((l) => `- ${l.role}, ${l.org} (${l.period}) — ${l.detail}`).join("\n")}` },
  { id: "insights", title: "Marketing Insights: Airtel → Cirkle", date: "2026", body: `# Marketing Insights\nMy LinkedIn take on the Airtel → Cirkle rebrand and what it means for long-term brand identity. Personal commentary, not a campaign I worked on.\n\n- [My LinkedIn profile](${profile.linkedin})` },
  { id: "education", title: "Education", date: "2026", body: `# Education\n${education.map((e) => `- ${e.degree} — ${e.school}, ${e.period}`).join("\n")}` },
  { id: "experience", title: "Where I’ve Worked", date: "2026", body: `# Experience\n${experience.map((e) => `## ${e.role} — ${e.org}\n${e.period} · ${e.type}\n${e.bullets.map((b) => `- ${b}`).join("\n")}`).join("\n\n")}` },
  { id: "launches", title: "Pureit Product Launches", date: "Jun 2026", body: "# Pureit Product Launches\nWave, Marina and Ultima Pro: 300+ communication assets across the three launches. Ultima Pro included pre-to-post launch communications. Collaborative digital campaigns and e-commerce work contributed to 6.5x digital sales growth." },
  { id: "x-accounts", title: "X Integrated Marketing Agency Accounts", date: "Oct 2024", body: `# X Integrated Marketing Agency Accounts\n${experience.find(e => e.id === "x-agency")?.bullets.join("\n\n")}` },
  { id: "website", title: "About This Site", date: "Nov 2026", body: "# About This Site\nMahin OS is my career portfolio, inspired by desktop and phone interfaces. Not affiliated with Apple. Design work sits in a separate Behance gallery." },
];

export const qa = [
  { q: "What do you do?", a: `I'm a brand marketing & strategy professional. ${profile.bio}` },
  { q: "What are you working on now?", a: "I co-run an independent agency. We produce AI-generated short-form content for Lux, Lifebuoy and Dove." },
  { q: "Tell me about Pureit", a: experience.find(e => e.id === "bizlearner")?.bullets.join(" ") ?? "" },
  { q: "X Integrated Marketing Agency work?", a: (experience.find(e => e.id === "x-agency")?.bullets.join(" ") ?? "") + " I also did a short marketing contract at Legend International School." },
  { q: "Competition wins?", a: "Seven podiums: champion at BizMetrics 2026, Nexus 2025 and Hult Prize at NSU 2026; 1st runner-up at Admaker Bangladesh, Marxcellence and Innovade 2026; 2nd runner-up at BrandAid 2026. I was also a finalist at Marico's Over the Wall 2025." },
  { q: "Your skills?", a: "GTM and launches, strategy, research, competitor benchmarking, consumer insights, campaign execution, agency client servicing, asset design (Photoshop, Illustrator, Canva, Figma) and stakeholder management." },
  { q: "Education?", a: "Final-year BBA in Marketing at North South University, expected December 2026. HSC Science from DRMC." },
  { q: "How can I reach you?", a: `Email ${profile.email}, or find me on LinkedIn and Behance.` },
];
