import { awards, experience, messageCopy, messageThreads, profile, projectById, recruiter } from "@/data/portfolio";
import { portfolioAnswer } from "./portfolio-chat";

export type MessageThread = typeof messageThreads[number]["id"];
export type MessageAction = { label: string; app?: "photos" | "preview"; payload?: string; href?: string };
export type MessageReply = { text: string; actions?: MessageAction[] };
const photos = (label: string, payload: string): MessageAction => ({ label, app: "photos", payload });
const pureit = photos("Open Pureit case study", "pureit-transition");
const xyz = photos("Open XYZ portfolio", "agency");
const x = photos("Open X Integrated case study", "x-agency");
const competitions = photos("Explore competition stories", "cat:Awards & Achievements");
export function resolveMessageThread(payload?: string): MessageThread | undefined {
  return messageThreads.find(thread => thread.id === payload)?.id;
}
export function messageReply(thread: MessageThread, question: string): MessageReply {
  const q = question.trim().toLowerCase();
  if (/résumé|resume|cv\b/.test(q)) return { text: "Here’s my public résumé.", actions: [{ label: "View résumé", app: "preview" }] };
  if (/contact|touch|email|linkedin|reach/.test(q)) return { text: "I’d love to hear about a role or project. You can reach me by email or LinkedIn.", actions: [{ label: "Email", href: `mailto:${profile.email}` }, { label: "LinkedIn", href: profile.linkedin }] };
  if (/quick intro|quick summary|what do you do|about you/.test(q)) return { text: messageCopy.intro };
  if (/roles|hiring|fit/.test(q)) return { text: `I’m interested in ${recruiter.roles.join(", ")}.`, actions: [{ label: "View résumé", app: "preview" }] };
  if (/sri lanka|sinhala|tamil/.test(q)) return { text: messageCopy.sriLanka, actions: [pureit] };
  if (/launch|ultima|marina|wave/.test(q)) return { text: messageCopy.launches, actions: [pureit] };
  if (/pureit|transition/.test(q)) return { text: messageCopy.pureit, actions: [pureit] };
  if (/admaker/.test(q)) return { text: awards.find(a => a.id === "admaker")?.detail ?? "", actions: [photos("Open Admaker story", "award-admaker")] };
  if (/marico|over the wall/.test(q)) return { text: awards.find(a => a.id === "otw")?.detail ?? "", actions: [photos("Open Marico story", "award-otw")] };
  if (/competition|podium|awards|wins/.test(q)) return { text: portfolioAnswer("Competition wins?"), actions: [competitions] };
  if (/client accounts|five clients/.test(q)) return { text: `I handled social media queries for ${experience.find(e => e.id === "x-agency")?.clients?.join(", ")}.`, actions: [x] };
  if (/queries|response/.test(q)) return { text: messageCopy.xQueries, actions: [x] };
  if (/learn/.test(q) && thread === "x-integrated") return { text: messageCopy.xLearning, actions: [x] };
  if (/x integrated/.test(q)) return { text: `${messageCopy.xQueries} ${messageCopy.xLearning}`, actions: [x] };
  if (/lux|lifebuoy|xyz|reels|creating|working on now/.test(q)) return { text: projectById("agency")?.summary ?? "", actions: [xyz] };
  return { text: portfolioAnswer(question) };
}