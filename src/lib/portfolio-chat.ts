import { qa, profile, experience, recruiter } from "@/data/portfolio";
export const chatSuggestions = ["Quick summary?", "Experience?", "What roles fit you?", "Résumé?", "Contact?"];
export function portfolioAnswer(question: string) {
  const q = question.trim().toLowerCase();
  const exact = qa.find(item => item.q.toLowerCase() === q);
  if (exact) return exact.a;
  if (q === "quick summary?") return recruiter.summary;
  if (q === "experience?") return experience.map(e => `${e.role} — ${e.org} (${e.period})`).join("\n");
  if (q === "what roles fit you?") return recruiter.roles.join(" · ");
  if (q === "résumé?" || q === "resume?") return "Use View résumé below to open the public CV and download its PDF.";
  if (q === "contact?") return `Email ${profile.email}, or visit my LinkedIn profile using the links below.`;
  return "I don't have a prewritten answer for that question. Choose a suggested question or email me for more information.";
}