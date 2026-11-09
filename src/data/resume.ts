/** Owner-supplied original CV body; only line wrapping and privacy omissions differ. */
export type ResumeEntry = { text: string; date?: string; bullets?: string[]; brands?: string[] };
export type ResumeSection = { title: string; entries: ResumeEntry[] };
export const resumeContent: ResumeSection[] = [
  { title: "PROFILE SUMMARY", entries: [{ text: "Final-year Marketing student with experience across Unilever Pureit/A.O. Smith Pureit, agency servicing, and entrepreneurship. Worked on product launches, campaign execution, and e-commerce growth, backed by multiple GTM-focused case competition wins." }] },
  { title: "SKILLS", entries: [
    { text: "Hard Skills: Go-To-Market Strategy, Product Launch Support, Campaign Planning & Execution, Market Research, Competitor Benchmarking, Consumer Insights, Feasibility Analysis, Website Development" },
    { text: "Soft Skills: Cross-functional Collaboration, Stakeholder Management, Project Management, Vendor Coordination, Communication" },
    { text: "Technical Skills: Adobe Illustrator, Adobe Photoshop, Canva, Microsoft Word, Microsoft PowerPoint, Microsoft Excel, Figma" },
  ] },
  { title: "WORK EXPERIENCE", entries: [
    { text: "BizLearner, Marketing | Pureit, acquired by A.O.Smith | Prior Unilever Bangladesh | Part-time", date: "Aug 2024 – Jun 2026", brands: ["Unilever", "Pureit", "A. O. Smith"], bullets: [
      "Executed brand transition strategy for Pureit's move from Unilever to A.O. Smith, leading logo migration across 7+ touchpoints and conducting competitor benchmarking and feasibility analysis across 2 markets (Bangladesh, Sri Lanka).",
      "Developed 300+ marketing and communication assets for 3 product launches (Wave, Marina, Ultima Pro) spanning POSM, Artworks, manuals, website content, and e-commerce contents & trade-facing communication materials.",
      "Supported the end-to-end pre-launch to post-launch asset ecosystem for Ultima Pro from scratch, ensuring communication consistency across digital, PR, and trade-facing touchpoints.",
      "Collaborated with brand, media, and external agency partners to execute digital campaign and e-commerce content, contributing to a 6.5x increase in digital sales.",
    ] },
    { text: "Marketing Officer | Legend International School | Contractual", date: "Oct 2024 - Nov 2024", bullets: ["Supported institutional marketing activities through promotional material development and execution support for school-level communication initiatives."] },
    { text: "Junior Engagement Officer | X Integrated Marketing Agency | Part-time", date: "Oct 2023 - Oct 2024", brands: ["Upay", "City Bank", "IDLC", "Break Station", "Petal"], bullets: [
      "Managed customer queries and response strategy for 5 client accounts (Upay, City Bank, IDLC, Break Station, Petal), maintaining a 90% on-time response rate and presenting improvements in client meetings.",
      "Supported agency-led research projects to identify consumer pain points and propose brand solutions, while contributing creative input to campaign ideation.",
    ] },
  ] },
  { title: "CASE COMPETITIONS & ACHIEVEMENTS", entries: [{ text: "", bullets: [
    "Champion, BizMetrics 2026 (BTM, IUT) — built an end-to-end GTM strategy for a new product concept.",
    "Champion, Nexus 2025 (KUET Business Club) — solved strategic marketing cases for Polar and NCC Bank.",
    "Champion, Hult Prize at NSU 2026 (NSU YEF) — built an SDG-aligned product with a full GTM strategy.",
    "1st Runner-Up, Admaker Bangladesh 2026 (NSU YES ! — 1,000+ teams!) — crafted marketing strategy and OVC for Maya & EBL.",
    "1st Runner-Up, Marxcellence 2026 (NSU MIBC ! — 1,000+ teams) — built brand strategy and OVC for Vertika & Dhaka Bank.",
    "1st Runner-Up, Innovade 2026 (NSU MIBC ! — 1,000+ teams) — solved an international case for Yamaha's smart tech line.",
    "2nd Runner-Up, BrandAid 2026 (EWU Business Club) — built a brand repositioning strategy for Monno Ceramics & ZenFresh.",
    "Finalist, Over the Wall 2025 (Marico — 1,850+ teams) — developed a product concept and GTM strategy..",
  ] }] },
  { title: "LEADERSHIP & EXTRACURRICULARS", entries: [{ text: "", bullets: [
    "Founder Admin, Music That Heals (2020-Present) — built and led a 200K-member music community; organized live events.",
    "General Member, NSU Young Entrepreneurs Society (2022-23) — developed brand guidelines for Recruitment '23; supported Admaker Bangladesh '23.",
    "Volunteer, DRMC Science Club (2019-20) — co-organized a large-scale science festival; managed the gaming sector for 1,000 participants.",
  ] }] },
  { title: "EDUCATION", entries: [
    { text: "North South University (NSU)", date: "2022 - Expected Dec 2026" },
    { text: "Bachelor of Business Administration, Major in Marketing" },
    { text: "Dhaka Residential Model College (DRMC)", date: "2018 - 2020" },
    { text: "Higher Secondary Certificate, Science" },
  ] },
];
