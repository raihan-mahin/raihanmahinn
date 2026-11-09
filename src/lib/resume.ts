import { profile, experience, awards, leadership, education, skills } from "@/data/portfolio";
export const resumeSections = () => [
  { title: "Experience", lines: experience.flatMap(e => [`${e.role} — ${e.org} | ${e.period}${e.type === e.period ? "" : ` | ${e.type}`}`, ...(e.context ? [e.context] : []), ...e.bullets]) },
  { title: "Competitions", lines: awards.map(a => `${a.rank} — ${a.title} (${a.organizer})${a.scale ? ` | ${a.scale}` : ""}`) },
  { title: "Leadership", lines: leadership.map(l => `${l.role}, ${l.org}: ${l.detail}`) },
  { title: "Education", lines: education.map(e => `${e.degree}, ${e.school} | ${e.period}`) },
  { title: "Skills", lines: Object.entries(skills).map(([k,v]) => `${k}: ${v.join(", ")}`) },
];
export async function createResumePDF() {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF(); let y = 17;
  const write = (text: string, size = 9) => {
    doc.setFontSize(size);
    const lines: string[] = doc.splitTextToSize(text.replaceAll("→", "to").replaceAll("—", "-").replaceAll("–", "-"), 178);
    if (y + lines.length * 4 > 282) { doc.addPage(); y = 17; }
    doc.text(lines, 16, y); y += lines.length * 4 + 2;
  };
  write(profile.fullName, 19); write(profile.headline, 11);
  write(`${profile.location} | ${profile.email}`); write(profile.linkedin); write(profile.bio);
  for (const section of resumeSections()) { y += 3; doc.setFont("helvetica", "bold"); write(section.title, 11); doc.setFont("helvetica", "normal"); for (const line of section.lines) write(line); }
  return doc;
}
export async function downloadResume() { (await createResumePDF()).save("Raihan-Mahin-Resume.pdf"); }
export async function copyEmail() {
  try { await navigator.clipboard.writeText(profile.email); return true; }
  catch { const input = document.createElement("textarea"); input.value = profile.email; document.body.append(input); input.select(); const ok = document.execCommand("copy"); input.remove(); return ok; }
}
