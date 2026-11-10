// Central content module for Mahin OS. Edit copy, projects and image URLs here.
// To add images later: put a URL (or imported asset) in any `images: []` / `thumbnail` field.

export const agencyName = "XYZ Agency";

const pureitStory = "I joined Unilever as a BizLearner and was assigned to Pureit. I started with audit work, competitor research in Bangladesh and campaign planning. Six months in, A. O. Smith acquired Pureit, and I took on a new challenge with the brand team. We had to carry the new company branding across everything from packaging and product manuals to in-store displays and online listings.\n\nThen I was handed the Sri Lanka rollout materials. People say pressure is a privilege. For me, it meant delivering materials in Sinhala and Tamil, two languages I didn’t speak. I got both versions ready for the rollout. The work taught me how much care it takes to keep a brand consistent while adapting it for another market.\n\nAlongside the transition, I worked with the sales team, helped refresh in-store materials and supported the launches of Marina, Wave and Ultima Pro. For Ultima Pro, I helped build the prelaunch materials from scratch. After the handover, I also supported A. O. Smith’s HR team with internal event planning.";
const xAgencyStory = "I handled social media queries for five clients: Upay, City Bank, IDLC, Break Station and Petal. The goal was to respond in under two minutes. I checked the details before replying, followed up when a question needed more work, and maintained a 90% on-time response rate.\n\nI also helped research recurring customer issues and used feedback from client meetings to improve our replies. That work taught me to pay attention when the same question kept coming up. Sometimes the reply was fine, but the brand’s message needed to be clearer. I also contributed ideas to a separate Banglalink tagline brief.";
const agencyStory = "We launched XYZ Agency with a focus on AI-generated reels. Our work started with Lux, Lifebuoy and Dove. Each brand has its own voice, so we shape the concept, visuals and edit around the brand behind each reel.";
const legendStory = "A highlight of my time at Legend was working with the Russian Embassy to launch and promote a special event at the school. Alongside that project, I planned and ran promotions to help more people learn about the school.\n\nI worked with the administration to give the school a consistent visual identity across everything from student ID cards and certificates to brochures, banners and event backdrops. It taught me that people get to know an institution through the things they see every day as much as through its biggest events.";

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
    bullets: ["We launched XYZ Agency with a focus on AI-generated reels. Our work started with Lux, Lifebuoy and Dove. Each brand has its own voice, so we shape the concept, visuals and edit around the brand behind each reel."],
  },
  {
    id: "bizlearner",
    role: "Marketing",
    org: "BizLearner",
    context: "Supporting Unilever Pureit → A. O. Smith Pureit · Water & Air Wellness / Home Care",
    period: "Aug 2024 – Jun 2026",
    type: "Part-time",
    clients: ["Unilever", "Pureit", "A. O. Smith"],
    bullets: ["I joined Unilever as a BizLearner and was assigned to Pureit. I started with audit work, competitor research in Bangladesh and campaign planning. Six months in, A. O. Smith acquired Pureit, and I took on a new challenge with the brand team. We had to carry the new company branding across everything from packaging and product manuals to in-store displays and online listings.", "Then I was handed the Sri Lanka rollout materials. People say pressure is a privilege. For me, it meant delivering materials in Sinhala and Tamil, two languages I didn’t speak. I got both versions ready for the rollout. The work taught me how much care it takes to keep a brand consistent while adapting it for another market.", "Alongside the transition, I worked with the sales team, helped refresh in-store materials and supported the launches of Marina, Wave and Ultima Pro. For Ultima Pro, I helped build the prelaunch materials from scratch. After the handover, I also supported A. O. Smith’s HR team with internal event planning.", "The transition covered 7+ touchpoints across Bangladesh and Sri Lanka; Sri Lanka was localisation, not competitor research. Pureit kept its identity. The team developed 300+ marketing assets across the three launches.", "Collaborative campaigns and e-commerce work with brand, media and agency teams contributed to 6.5× digital sales growth."],
  },
  {
    id: "legend",
    role: "Marketing Officer",
    org: "Legend International School",
    period: "Oct – Nov 2024",
    type: "Contract",
    bullets: ["A highlight of my time at Legend was working with the Russian Embassy to launch and promote a special event at the school. Alongside that project, I planned and ran promotions to help more people learn about the school.", "I worked with the administration to give the school a consistent visual identity across everything from student ID cards and certificates to brochures, banners and event backdrops. It taught me that people get to know an institution through the things they see every day as much as through its biggest events."],
  },
  {
    id: "x-agency",
    role: "Junior Engagement Officer",
    org: "X Integrated Marketing Agency",
    period: "Oct 2023 – Oct 2024",
    type: "Part-time",
    clients: ["Upay", "City Bank", "IDLC", "Break Station", "Petal"],
    context: "On-site · under executive supervision",
    bullets: ["I handled social media queries for five clients: Upay, City Bank, IDLC, Break Station and Petal. The goal was to respond in under two minutes. I checked the details before replying, followed up when a question needed more work, and maintained a 90% on-time response rate.", "I also helped research recurring customer issues and used feedback from client meetings to improve our replies. That work taught me to pay attention when the same question kept coming up. Sometimes the reply was fine, but the brand’s message needed to be clearer. I also contributed ideas to a separate Banglalink tagline brief."],
  },
];

export type AgencyBrand = { id: string; brand: string; tagline: string; description: string; thumbnail?: string; video?: string };
export const agencyBrands: AgencyBrand[] = [
  { id: "lux", brand: "Lux", tagline: "Short-form creative", description: "AI-generated reels for Lux, shaped around the brand’s voice." },
  { id: "lifebuoy", brand: "Lifebuoy", tagline: "Short-form creative", description: "AI-generated reels for Lifebuoy, shaped around the brand’s voice." },
  { id: "dove", brand: "Dove", tagline: "Short-form creative", description: "AI-generated reels for Dove, shaped around the brand’s voice." },
];

export type Award = { id: string; rank: string; title: string; organizer: string; year: string; focus: string; detail: string; scale?: string; images: string[]; link?: string; team?: string; pendingImages?: string[]; caseBrands?: string[]; captions?: string[] };
export const awards: Award[] = [
  { id: "bizmetrics", rank: "Champion", title: "BizMetrics 2026", organizer: "Beyond The Metrics / Islamic University of Technology", year: "2026", focus: "GTM for a new product concept", detail: "Could a baby lotion moisturise skin and help protect against mosquitoes? That was the idea we pitched in Round 2, with a DEET-free formula. In the finale, we presented a full plan for bringing a new product concept to market. The competition taught me to ask what makes a product worth choosing, then build a launch plan around that answer.", team: "Arctic Wolves", link: "https://www.linkedin.com/feed/update/urn:li:activity:7421168154850144257/", pendingImages: ["/media/awards/bizmetrics-2026-champion-group-stage.jpg"], images: ["/media/awards/bizmetrics-2026-champion-group-stage.jpg"] },
  { id: "nexus", caseBrands: ["Polar", "NCC Bank"], rank: "Champion", title: "Nexus 2025", organizer: "KUET Business Club", year: "2025", focus: "Strategic cases — Polar & NCC Bank", detail: "We took on briefs for Polar and NCC Bank across three rounds. In the finale, we pitched NCC Star, a digital banking offer designed to make account opening and everyday payments easier for students.", team: "Arctic Wolves", link: "https://www.linkedin.com/feed/update/urn:li:activity:7405617576900325377/", pendingImages: ["/media/awards/nexus-2025-champion-group-stage.jpg"], images: ["/media/awards/nexus-2025-champion-group-stage.jpg"] },
  { id: "hult", rank: "Champion", title: "Hult Prize at NSU 2026", organizer: "NSU YEF", year: "2026", focus: "SDG-aligned concept & full GTM", detail: "We pitched an edible, biodegradable cup as an alternative to single-use cups. As CFO on the finale team, I helped work through what it would take to produce, price and bring the idea to market.", team: "Marketman", pendingImages: ["/media/awards/hult-prize-nsu-2026-champion-group-stage.jpg"], images: ["/media/awards/hult-prize-nsu-2026-champion-group-stage.jpg"] },
  { id: "admaker", caseBrands: ["Maya", "EBL"], rank: "1st Runner-Up", title: "Admaker Bangladesh 2026", organizer: "NSU YES!", year: "2026", focus: "Marketing strategy & OVC — Maya + EBL", detail: "Three rounds took us from trust in Islamic banking to hesitation around facial oils. For Maya, we built the idea around a simpler skincare routine. In the finale, we turned a familiar problem, splitting the bill, into a comedy series and event concept for EBL Sky Banking.", scale: "1000+ teams", team: "Arc Crew", link: "https://www.linkedin.com/feed/update/urn:li:activity:7492578751315116032/", pendingImages: ["/media/awards/admaker-2026-runner-up-solo-award.jpg", "/media/awards/admaker-2026-runner-up-group-stage.jpg"], images: ["/media/awards/admaker-2026-runner-up-solo-award.jpg", "/media/awards/admaker-2026-runner-up-group-stage.jpg"] },
  { id: "marxcellence", caseBrands: ["Vertika", "Dhaka Bank"], rank: "1st Runner-Up", title: "Marxcellence 2026", organizer: "NSU MIBC", year: "2026", focus: "Brand strategy & OVC — Vertika + Dhaka Bank", detail: "We developed brand strategies and online video commercials for Vertika and Dhaka Bank. The work pushed us to turn each strategy into a story that could hold up on screen.", team: "Arc Crew", pendingImages: ["/media/awards/marxcellence-2026-runner-up-solo-stage.jpg", "/media/awards/marxcellence-2026-runner-up-seated-trophy.jpg", "/media/awards/marxcellence-2026-runner-up-group-candid.jpg"], images: ["/media/awards/marxcellence-2026-runner-up-solo-stage.jpg", "/media/awards/marxcellence-2026-runner-up-seated-trophy.jpg", "/media/awards/marxcellence-2026-runner-up-group-candid.jpg"], link: "https://www.linkedin.com/posts/raihanmahin_first-runner-up-marxcellence-two-competitions-activity-7496950896132521984-LnjI" },
  { id: "innovade", caseBrands: ["NOVOAIR", "Yamaha"], rank: "1st Runner-Up", title: "Innovade 2026", organizer: "NSU MIBC", year: "2026", focus: "Airline expansion proposal & Yamaha supply-chain brief", detail: "The semifinal asked how NOVOAIR could enter two new markets. We proposed direct expansion into Malaysia and a partner airline for Thailand. The finale shifted to Yamaha Motor and a different question. How do you keep a global supply chain moving when major shipping routes are disrupted?", team: "Arctic Wolves", pendingImages: ["/media/awards/innovade-2026-runner-up-group.jpg"], images: ["/media/awards/innovade-2026-runner-up-group.jpg"] },
  { id: "brandaid", caseBrands: ["Monno Ceramics", "ZenFresh"], rank: "2nd Runner-Up", title: "BrandAid 2026", organizer: "EWU Business Club", year: "2026", focus: "Repositioning — Monno Ceramics & ZenFresh", detail: "We tackled repositioning briefs for Monno Ceramics and ZenFresh. For the ZenFresh finale, we looked at how younger shoppers choose toothpaste and proposed a plan that connected better shelf visibility with digital and outdoor promotion.", team: "Marketman", pendingImages: ["/media/awards/brandaid-2026-2nd-runner-up-group.jpg"], images: ["/media/awards/brandaid-2026-2nd-runner-up-group.jpg"] },
  { id: "otw", rank: "Finalist", title: "Over the Wall 2025", organizer: "Marico", year: "2025", focus: "Product concept & GTM", detail: "Our team reached the top six in a field of roughly 1,850 teams. We presented a new product concept and a plan for bringing it to market.", scale: "1,850+ teams", team: "Marketman", link: "https://www.linkedin.com/feed/update/urn:li:activity:7287835152670461953/", pendingImages: ["/media/awards/marico-season3-team-presentation.jpg", "/media/awards/marico-season3-final-stage.jpg", "/media/awards/marico-season3-finalists-group.jpg", "/media/awards/marico-season3-marketman-banner.jpg", "/media/awards/marico-season4-season3-finalist-reunion.jpg", "/media/awards/marico-season4-season3-finalist-portrait.jpg"], images: ["/media/awards/marico-season3-team-presentation.jpg", "/media/awards/marico-season3-final-stage.jpg", "/media/awards/marico-season3-finalists-group.jpg", "/media/awards/marico-season3-marketman-banner.jpg", "/media/awards/marico-season4-season3-finalist-reunion.jpg", "/media/awards/marico-season4-season3-finalist-portrait.jpg"], captions: ["Team Marketman presenting its product concept and go-to-market strategy at the Season 3 final.", "Team Marketman on the Season 3 final stage with its presentation visible.", "Season 3 finalists gathered on the Marico Over the Wall stage.", "Team Marketman’s banner at Over the Wall Season 3.", "Season 3 finalists reunited at a Season 4 event beside a display recognizing their Season 3 result.", "Raihan at the Season 4 event beside the Season 3 finalist recognition display; not a Season 4 finalist result."] },
];

export type PureitCase = { id: string; title: string; kind: string; challenge: string; contribution: string; outcome: string; images: string[] };
export const pureitCases: PureitCase[] = [
  { id: "pureit-transition", title: "Pureit Brand Transition", kind: "Brand transition", challenge: "Carrying A. O. Smith’s company branding across Pureit materials while keeping Pureit’s identity.", contribution: pureitStory, outcome: "Brand transition rolled out across 7+ touchpoints (team effort).", images: [] },
];

const BH = profile.behance;
export type CampaignVideo = { title: string; src: string; poster: string; width: number; height: number };
export type CampaignBrand = { brand: string; videos: CampaignVideo[]; stills?: { title: string; src: string; width: number; height: number }[] };
const xyz = (name: string) => `/media/xyz-agency/${name}`;
const reel = (title: string, base: string, height = 1920): CampaignVideo => ({ title, src: xyz(`${base}.mp4`), poster: xyz(`${base}.jpg`), width: 1080, height });
/** XYZ Agency campaign work by brand (owner-supplied files; separate from Music reels). */
export const agencyCampaigns: CampaignBrand[] = [
  { brand: "Lux", videos: [reel("AirDrop", "lux-airdrop"), reel("Airport", "lux-airport"), reel("Truck", "lux-truck"), reel("Crazy", "lux-crazy", 1918)], stills: [{ title: "Puja Special Giveaway", src: xyz("lux-puja-giveaway.jpg"), width: 2048, height: 2048 }] },
  { brand: "Lifebuoy", videos: [reel("Puja", "lifebuoy-puja")] },
];

export type BehanceWork = { id: string; title: string; type: string; caption: string; url: string; verified: boolean; thumbnail?: string; /** 808px cover of the same Behance artwork (Behance CDN size 808), stored locally. */ full?: string };
export const behanceWorks: BehanceWork[] = [
  { id: "skin", title: "Confidence Breakthrough · Skincare Campaign", caption: "A skincare campaign around confidence.", type: "Campaign", url: "https://www.behance.net/gallery/242883541/Skin-Care-Branding-Confidence-Breakthrough-Campaign", verified: true, thumbnail: "/media/behance/242883541.jpg", full: "/media/behance/hd/242883541.jpg" },
  { id: "berger", title: "Berger Sealer · Billboard", caption: "Outdoor campaign creative for Berger Sealer.", type: "Billboard", url: "https://www.behance.net/gallery/239452045/Billboard-Design-Berger-Sealer-Campaign", verified: true, thumbnail: "/media/behance/239452045.png", full: "/media/behance/hd/239452045.png" },
  { id: "pureit-cat", title: "Pureit · Product Catalogue", caption: "A print catalogue for browsing the Pureit range.", type: "Print", url: "https://www.behance.net/gallery/234564039/Product-Catalogue-Pureit", verified: true, thumbnail: "/media/behance/234564039.jpg", full: "/media/behance/hd/234564039.jpg" },
  { id: "pureit-man", title: "Pureit · Product Manual", caption: "A manual layout for finding product instructions.", type: "Print", url: "https://www.behance.net/gallery/234562973/Product-Manual-Design-Brand-Pureit", verified: true, thumbnail: "/media/behance/234562973.jpg", full: "/media/behance/hd/234562973.jpg" },
  { id: "billboard", title: "Outdoor Advertising · Billboard Design", caption: "Billboard design with information that is clear at a glance.", type: "Billboard", url: "https://www.behance.net/gallery/234553883/Eye-Catching-Billboard-Design-Outdoor-Advertising", verified: true, thumbnail: "/media/behance/234553883.png", full: "/media/behance/hd/234553883.png" },
  { id: "bankcard", title: "Bank Card Branding · Fintech Campaign", caption: "Card branding and a companion online video commercial.", type: "Campaign", url: "https://www.behance.net/gallery/234546863/Bank-Card-Branding-OVC-Creative-Fintech-Campaign", verified: true, thumbnail: "/media/behance/234546863.png", full: "/media/behance/hd/234546863.png" },
  { id: "parachute", title: "Parachute Just for Baby · Packaging", caption: "Packaging design for the Parachute Just for Baby range.", type: "Packaging", url: "https://www.behance.net/gallery/215718967/Parachute-Just-for-Baby-Baby-Care-Brand-Packaging", verified: true, thumbnail: "/media/behance/215718967.png", full: "/media/behance/hd/215718967.png" },
  { id: "letterhead", title: "Letterhead Design", caption: "Letterhead design for branded correspondence.", type: "Stationery", url: "https://www.behance.net/gallery/210532369/Letterhead-Design-Pad", verified: true, thumbnail: "/media/behance/210532369.jpg", full: "/media/behance/hd/210532369.jpg" },
  { id: "promo-video", title: "Brand Promotion · Video", caption: "A promotional video for brand communication.", type: "Video", url: "https://www.behance.net/gallery/186704511/Brand-Promotion-Video", verified: true, thumbnail: "/media/behance/186704511.png", full: "/media/behance/hd/186704511.png" },
  { id: "promo-social", title: "Brand Promotion · Social Post", caption: "Promotion-led creative for social media.", type: "Social", url: "https://www.behance.net/gallery/186372427/Brand-Promotion-Social-Media-Post", verified: true, thumbnail: "/media/behance/186372427.jpg", full: "/media/behance/hd/186372427.jpg" },
  { id: "social", title: "Social Media Post", caption: "A standalone social media design.", type: "Social", url: "https://www.behance.net/gallery/183253499/Social-Media-Post", verified: true, thumbnail: "/media/behance/183253499.jpeg", full: "/media/behance/hd/183253499.jpeg" },
  { id: "social-brand", title: "Brand Identity · Social Post", caption: "A visual identity adapted for social media.", type: "Social", url: "https://www.behance.net/gallery/183014205/Social-Media-Post-Branding", verified: true, thumbnail: "/media/behance/183014205.jpg", full: "/media/behance/hd/183014205.jpg" },
  { id: "oggy", title: "Oggy · Vector Illustration", caption: "A vector illustration built around Oggy’s expressive silhouette.", type: "Illustration", url: "https://www.behance.net/gallery/181839773/Cartoon-Character-Oggy-Vector-Art", verified: true },
  { id: "hattori", title: "Ninja Hattori · Vector Illustration", caption: "A vector illustration focusing on Ninja Hattori’s pose and recognisable details.", type: "Illustration", url: "https://www.behance.net/gallery/181917209/Cartoon-Art-Ninja-Hattori-Vector-Art", verified: true },
  { id: "brochure", title: "Square Tri-Fold Brochure", caption: "A tri-fold brochure that presents information panel by panel.", type: "Print", url: "https://www.behance.net/gallery/181822017/Square-Tri-Fold-Threefold-brochure", verified: true },
];

export const leadership = [
  { id: "mth", role: "Founder & Admin", org: "Music That Heals", period: "2020 – Present", detail: "I founded Music That Heals, a music community that also organizes live events." },
  { id: "yes", role: "General Member", org: "NSU Young Entrepreneurs Society", period: "2022 – 2023", detail: "Supported recruitment brand guidelines and Admaker at NSU Young Entrepreneurs Society." },
  { id: "drmc", role: "Volunteer", org: "DRMC Science Club", period: "2019 – 2020", detail: "Volunteered at the science festival and gaming segment with ~1,000 participants." },
];

export const education = [
  { id: "nsu", degree: "BBA, Marketing (final year)", school: "North South University", period: "2022 – Expected Dec 2026" },
  { id: "drmc", degree: "HSC, Science", school: "Dhaka Residential Model College (DRMC)", period: "2018 – 2020" },
];

export const skills = {
  Strategy: ["Brand strategy", "Go-to-market planning", "Consumer insights", "Market research", "Competitor benchmarking"],
  Execution: ["Product launch support", "Campaign execution", "Retail materials", "Localisation", "Project & vendor coordination"],
  "Client work": ["Customer engagement", "Agency client servicing", "Stakeholder collaboration", "Customer feedback research"],
  "Creative tools": ["Marketing asset design", "Photoshop", "Illustrator", "Canva", "Figma", "Presentation tools", "Website & app interface design"],
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
  highlights: ["Supported Pureit’s transition across 7+ touchpoints and three product launches.", "Managed five client accounts at X Integrated Marketing Agency, with a 90% on-time response rate.", "Earned seven national competition podiums."],
};
export const musicPlaylist = {
  title: "YouTube Music Playlist",
  embedUrl: "https://www.youtube.com/embed/hRxyvtvxC9c?list=PLMz3Ghq38K5gnDSoKaOMzWZthOOl0M1Db&index=4&playsinline=1&rel=0",
  url: "https://music.youtube.com/playlist?list=PLMz3Ghq38K5gnDSoKaOMzWZthOOl0M1Db",
};
export type MotivationReel = {
  url: string;
  /** Add only an original file provided for reuse or a verified stable public download. */
  source?: string;
  /** Set only after verifying native playback and permission to reuse the source. */
  sourceVerified?: boolean;
  poster?: string;
};
export const motivationReels: MotivationReel[] = [
  "https://www.instagram.com/reel/DeMQdiPDrIT/",
  "https://www.instagram.com/reel/DfjHOPGuXIo/",
  "https://www.instagram.com/reel/DfJMntJKKb5/",
  "https://www.instagram.com/reel/DfUDCG9Nc5a/",
].map(url => ({ url }));

/** Kept for detailed views (e.g. resume); not shown on the homepage. */
export const stats = [
  { value: "300+", label: "Marketing assets" },
  { value: "3", label: "Launch projects" },
  { value: "7+", label: "Brand touchpoints" },
  { value: "6.5x", label: "Digital sales (team)" },
];

export type ProjectCategory = "★ Flagship" | "Brand Strategy & Transition" | "X Integrated Marketing Agency" | "XYZ Agency" | "Legend International School" | "Campaigns & Creative" | "Community & Leadership" | "Awards & Achievements";
export const projectCategories: ProjectCategory[] = ["★ Flagship", "Brand Strategy & Transition", "X Integrated Marketing Agency", "XYZ Agency", "Legend International School", "Campaigns & Creative", "Community & Leadership"];

export type Project = {
  id: string; title: string; subtitle: string; role?: string;
  challenge?: string; contribution?: string; outcome?: string; summary?: string;
  images: string[]; /** Creative artwork: shown uncropped; `artworkFallback` is the known-good smaller file. */ artwork?: boolean; campaigns?: CampaignBrand[]; artworkFallback?: string | undefined; captions?: string[]; metrics?: { value: string; label: string }[]; link?: string; linkLabel?: string; badge?: string;
  /** "Case brands" = competition case subjects (not clients); "Clients"/"Brands" = professional work. */
  brandRow?: { label: string; names: string[] };
  /** Work thumbnail gradient; original images stay in `images`. */
  gradient?: { from: string; to: string; tag: string; star?: boolean };
};

/** Behance works kept on Behance/Files but not shown anywhere in Photos. */
export const photosHiddenWorks = ["oggy", "hattori"];
const behanceProjects = behanceWorks.filter((w) => !photosHiddenWorks.includes(w.id)).map<Project>((w) => ({
  id: `bh-${w.id}`, title: w.title, subtitle: `${w.type} · Behance`, summary: w.caption, images: w.full ? [w.full] : w.thumbnail ? [w.thumbnail] : [], artwork: true, artworkFallback: w.thumbnail, link: w.url,
}));

export const projects: Project[] = [
  ...behanceProjects,
  { id: "pureit-transition", title: "Pureit Brand Transition", subtitle: "Marketing BizLearner · Aug 2024–Jun 2026", role: "Part-time Marketing · supporting Pureit", summary: pureitStory, metrics: [{ value: "7+", label: "Touchpoints covered in the transition" }, { value: "2", label: "Markets · Bangladesh and Sri Lanka" }, { value: "3", label: "Product launches supported" }, { value: "300+", label: "Marketing assets developed by the team across three launches" }], images: ["/media/behance/234564039.jpg"], gradient: { from: "#e2483d", to: "#4a1036", tag: "#BrandTransition", star: true }, brandRow: { label: "Pureit transition · through BizLearner", names: ["Unilever", "Pureit", "A. O. Smith"] } },
  ...awards.map<Project>((a) => ({
    id: `award-${a.id}`, title: `${a.title} — ${a.rank}`, subtitle: `${a.organizer} · ${a.year}`, ...(a.team ? { role: `Team ${a.team}` } : {}),
    summary: a.detail, images: a.images, captions: a.captions ?? a.images.map((_, i) => `${a.title} · ${a.rank}${a.team ? ` · Team ${a.team}` : ""} · Photo ${i + 1}`), badge: a.rank,
    ...(a.caseBrands ? { brandRow: { label: "Case subjects (competition, not clients)", names: a.caseBrands } } : {}),
    ...(a.link ? { link: a.link, linkLabel: "Read the LinkedIn post" } : {}),
  })),
  { id: "agency", title: agencyName, subtitle: "Co-Founder", role: "Co-Founder", summary: agencyStory, images: [], gradient: { from: "#ff6b00", to: "#4a1200", tag: "#IndependentAgency" }, campaigns: agencyCampaigns, brandRow: { label: "Current brands", names: agencyBrands.map((b) => b.brand) } },
  ...agencyBrands.map<Project>((b) => ({ id: `agency-${b.id}`, title: b.brand, subtitle: b.tagline, role: "Co-Founder", summary: b.description, images: b.thumbnail ? [b.thumbnail] : [] })),
  { id: "x-agency", title: "X Integrated Marketing Agency", subtitle: "Junior Engagement Officer · Oct 2023–Oct 2024", role: "Junior Engagement Officer", metrics: [{ value: "Under 2 minutes", label: "Response target" }, { value: "90%", label: "On-time response rate" }, { value: "5", label: "Client accounts" }], summary: xAgencyStory, images: [], gradient: { from: "#2478e8", to: "#11264d", tag: "#ClientServicing" }, brandRow: { label: "Client accounts", names: ["Upay", "City Bank", "IDLC", "Break Station", "Petal"] } },
  { id: "legend", title: "Legend International School", subtitle: "Marketing Officer · Oct–Nov 2024 · Contract", role: "Marketing Officer (contract)", summary: legendStory, images: [], gradient: { from: "#c9a227", to: "#1b1b1b", tag: "#SchoolMarketing" } },
  { id: "yes", title: "NSU Young Entrepreneurs Society", subtitle: "General Member · 2022 – 2023", role: "General Member", summary: "Supported recruitment brand guidelines and Admaker at NSU Young Entrepreneurs Society.", images: [], gradient: { from: "#00c7be", to: "#063b3a", tag: "#Leadership" } },
];

export type PhotoAlbum = { id: string; title: string; ids: string[] };
export type PhotoRoot = { id: ProjectCategory; ids?: string[]; albums?: PhotoAlbum[]; cover?: string; coverStyle?: "flagship" | "transition"; gradient?: Gradient };
export type Gradient = { from: string; to: string; tag: string; star?: boolean };
/** Single source of truth for the Photos hierarchy (desktop + phone). */
export const photoRoots: PhotoRoot[] = [
  { id: "★ Flagship", ids: ["pureit-transition", "x-agency"], gradient: { from: "#e2483d", to: "#4a1036", tag: "#Flagship", star: true } },
  { id: "Brand Strategy & Transition", ids: ["pureit-transition"], gradient: { from: "#ff2d55", to: "#1b0b3a", tag: "#BrandTransition" } },
  { id: "X Integrated Marketing Agency", ids: ["x-agency"], gradient: { from: "#2478e8", to: "#11264d", tag: "#ClientServicing" } },
  { id: "XYZ Agency", ids: ["agency"], gradient: { from: "#ff6b00", to: "#4a1200", tag: "#IndependentAgency" } },
  { id: "Legend International School", ids: ["legend"], gradient: { from: "#c9a227", to: "#1b1b1b", tag: "#SchoolMarketing" } },
  { id: "Campaigns & Creative", gradient: { from: "#00a651", to: "#05351c", tag: "#Campaigns" }, albums: [
    { id: "campaigns", title: "Curated", ids: ["bh-skin", "bh-bankcard", "bh-promo-video", "bh-promo-social", "bh-social", "bh-social-brand"] },
    { id: "berger", title: "Outdoor", ids: ["bh-berger", "bh-billboard"] },
    { id: "pureit", title: "Pureit", ids: ["bh-pureit-cat", "bh-pureit-man"] },
    { id: "packaging", title: "Packaging", ids: ["bh-parachute"] },
    { id: "print", title: "Print Materials", ids: ["bh-letterhead", "bh-brochure"] },
  ] },
  { id: "Community & Leadership", ids: ["yes"], gradient: { from: "#00c7be", to: "#063b3a", tag: "#Leadership" } },
  { id: "Awards & Achievements", ids: awards.map(a => `award-${a.id}`) },
];
/** Old OS links continue to resolve without mixing achievements into work. */
export function resolvePhotoCategory(value: string): ProjectCategory {
  const aliases: Record<string, ProjectCategory> = { Featured: "★ Flagship", "Product Launches": "Brand Strategy & Transition", "Pureit & GTM": "Brand Strategy & Transition", "Brand Design": "Campaigns & Creative", Competitions: "Awards & Achievements", "Independent Agency": "XYZ Agency", "Co-Founder · Independent Agency": "XYZ Agency", "Brands": "XYZ Agency", "More Work": "X Integrated Marketing Agency", "Client Engagement": "X Integrated Marketing Agency", "Agency & Client Work": "X Integrated Marketing Agency" };
  return aliases[value] ?? projectCategories.find(c => c === value) ?? (value === "Awards & Achievements" ? value : "★ Flagship");
}
export const workRoots = photoRoots.filter(r => r.id !== "Awards & Achievements");
export const workProjects = projects.filter(p => !p.id.startsWith("award-"));
export const projectById = (id: string) => projects.find((p) => p.id === id);
export const albumItems = (ids: string[]) => ids.map(projectById).filter((p): p is Project => !!p);
export const rootIds = (r: PhotoRoot) => r.ids ?? (r.albums ?? []).flatMap((a) => a.ids);
export function findAlbum(id: string): { root: ProjectCategory; album: PhotoAlbum } | undefined {
  if (id === "other") id = "print";
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
- Three markets: Bangladesh, India and Sri Lanka
- Seven national podiums and Marico top six

## Contact
Want to talk about a role, a project or something you saw here? Reach me by email or on LinkedIn.

- [Email](mailto:${profile.email})
- [Behance](${profile.behance})
- [LinkedIn](${profile.linkedin})
- [Open Photos](app:photos)` },
  { id: "now", title: "Currently: Co-Founder at XYZ Agency", date: "Nov 2026", body: `# Co-Founder — ${agencyName}
${agencyStory}` },
  { id: "pureit", title: "Pureit Brand Transition", date: "Jun 2026", body: `# Pureit (via BizLearner) · Aug 2024 – Jun 2026
${pureitStory}` },
  { id: "skills", title: "Core Skills", date: "Nov 2026", body: `# Skills\n${Object.entries(skills).map(([k, v]) => `## ${k}\n${v.map((s) => `- ${s}`).join("\n")}`).join("\n\n")}` },
  { id: "awards", title: "Competitions & awards", date: "2026", body: `# 7 podiums + 1 Marico finalist\n${awards.map((a) => `- ${a.rank} — ${a.title} (${a.organizer}): ${a.focus}${a.scale ? `, ${a.scale}` : ""}`).join("\n")}` },
  { id: "community", title: "Community & leadership", date: "2026", body: `# Leadership\n${leadership.map((l) => `- ${l.role}, ${l.org} (${l.period}) — ${l.detail}`).join("\n")}` },
  { id: "insights", title: "Marketing Insights: Airtel → Cirkle", date: "2026", body: `# Marketing Insights\nMy LinkedIn take on the Airtel → Cirkle rebrand and what it means for long-term brand identity. Personal commentary, not a campaign I worked on.\n\n- [My LinkedIn profile](${profile.linkedin})` },
  { id: "education", title: "Education", date: "2026", body: `# Education\n${education.map((e) => `- ${e.degree} — ${e.school}, ${e.period}`).join("\n")}` },
  { id: "experience", title: "Where I’ve Worked", date: "2026", body: `# Experience\n${experience.map((e) => `## ${e.role} — ${e.org}\n${e.period} · ${e.type}\n${e.bullets.map((b) => `- ${b}`).join("\n")}`).join("\n\n")}` },
  { id: "launches", title: "Pureit Product Launches", date: "Jun 2026", body: "# Pureit Product Launches\nMarina, Wave and Ultima Pro: 300+ marketing assets developed by the team across the three launches. For Ultima Pro, I helped build the prelaunch materials from scratch." },
  { id: "x-accounts", title: "X Integrated Marketing Agency Accounts", date: "Oct 2024", body: `# X Integrated Marketing Agency Accounts\n${experience.find(e => e.id === "x-agency")?.bullets.join("\n\n")}` },
  { id: "website", title: "About This Site", date: "Nov 2026", body: "# About This Site\nPhotos holds my work and competition stories. Notes shares career context and personal commentary. Files brings projects and the résumé together. Mahin OS is inspired by desktop and phone interfaces and is not affiliated with Apple." },
];

export const qa = [
  { q: "What do you do?", a: `I'm a brand marketing & strategy professional. ${profile.bio}` },
  { q: "What are you working on now?", a: agencyStory },
  { q: "Tell me about Pureit", a: experience.find(e => e.id === "bizlearner")?.bullets.join(" ") ?? "" },
  { q: "X Integrated Marketing Agency work?", a: (experience.find(e => e.id === "x-agency")?.bullets.join(" ") ?? "") + " I also did a short marketing contract at Legend International School." },
  { q: "Competition wins?", a: "Seven podiums: champion at BizMetrics 2026, Nexus 2025 and Hult Prize at NSU 2026; 1st runner-up at Admaker Bangladesh, Marxcellence and Innovade 2026; 2nd runner-up at BrandAid 2026. I was also a finalist at Marico's Over the Wall 2025." },
  { q: "Your skills?", a: "GTM and launches, strategy, research, competitor benchmarking, consumer insights, campaign execution, agency client servicing, asset design (Photoshop, Illustrator, Canva, Figma) and stakeholder management." },
  { q: "Education?", a: "Final-year BBA in Marketing at North South University, expected December 2026. HSC Science from DRMC." },
  { q: "How can I reach you?", a: `Want to talk about a role, a project or something you saw here? Reach me by email or on LinkedIn. Email: ${profile.email}. LinkedIn: ${profile.linkedin}` },
];

/** Single-case collections that open their story directly instead of a redundant one-item grid. */
export const directCollectionProject: Partial<Record<ProjectCategory, string>> = { "XYZ Agency": "agency" };
