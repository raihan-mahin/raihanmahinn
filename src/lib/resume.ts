import { profile } from "@/data/portfolio";
import { resumeContent } from "@/data/resume";
export const resumeSections = () => resumeContent.map(section => ({ title: section.title, lines: section.entries.flatMap(entry => [...(entry.text ? [entry.text + (entry.date ? ` | ${entry.date}` : "")] : []), ...(entry.bullets ?? []).map(line => `• ${line}`)]) }));
export async function createResumePDF() {
  const { jsPDF } = await import("jspdf");
  const { resumeFonts } = await import("./resume-fonts");
  const doc = new jsPDF(); let y = 17;
  doc.addFileToVFS("resume.ttf", resumeFonts.regular.split(",")[1] ?? "");
  doc.addFileToVFS("resume-bold.ttf", resumeFonts.bold.split(",")[1] ?? "");
  doc.addFont("resume.ttf", "resume", "normal");
  doc.addFont("resume-bold.ttf", "resume", "bold");
  doc.setFont("resume", "normal");
  const write = (text: string, size = 9) => {
    doc.setFontSize(size);
    const lines: string[] = doc.splitTextToSize(text, 178);
    if (y + lines.length * 4 > 282) { doc.addPage(); y = 17; }
    doc.text(lines, 16, y); y += lines.length * 4 + 2;
  };
  write(profile.fullName, 19); write(profile.headline, 11);
  write(`${profile.location} | ${profile.email}`); write(profile.linkedin);
  for (const section of resumeSections()) { y += 3; doc.setFont("resume", "bold"); write(section.title, 11); doc.setFont("resume", "normal"); for (const line of section.lines) write(line); }
  return doc;
}
export async function downloadResume() { (await createResumePDF()).save("Raihan-Mahin-Resume.pdf"); }
export async function copyEmail() {
  try { await navigator.clipboard.writeText(profile.email); return true; }
  catch { const input = document.createElement("textarea"); input.value = profile.email; document.body.append(input); input.select(); const ok = document.execCommand("copy"); input.remove(); return ok; }
}
