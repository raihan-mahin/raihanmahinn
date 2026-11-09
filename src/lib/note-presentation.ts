import { notes as seeds, type Note } from "@/data/portfolio";
export type DatedNote = Note & { createdAt?: string; updatedAt?: string };
export const pinnedIds = ["about", "experience", "pureit"];
export function noteGroups(notes: DatedNote[], now = new Date()) {
  const labels = ["Pinned", "Today", "Yesterday", "Previous 7 Days", "Older", "Portfolio notes"];
  const buckets = new Map(labels.map(label => [label, [] as DatedNote[]]));
  for (const note of notes) {
    const stamp = note.updatedAt ?? note.createdAt ?? (/^\d{4}-\d{2}-\d{2}(T|$)/.test(note.date) ? note.date : undefined);
    let group = "Portfolio notes";
    if (pinnedIds.includes(note.id)) group = "Pinned";
    else if (stamp && Number.isFinite(Date.parse(stamp))) {
      const date = new Date(stamp); const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const day = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const diff = Math.round((today.getTime() - day.getTime()) / 86400000);
      group = diff === 0 ? "Today" : diff === 1 ? "Yesterday" : diff >= 2 && diff < 7 ? "Previous 7 Days" : "Older";
    }
    buckets.get(group)?.push(note);
  }
  return labels.map(label => ({ label, notes: buckets.get(label) ?? [] })).filter(g => g.notes.length);
}
export function newNote(now = new Date()): DatedNote {
  return { id: `n${now.getTime()}`, title: "New note", body: "# New note\n", date: now.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }), createdAt: now.toISOString(), updatedAt: now.toISOString() };
}
export function editNote(note: DatedNote, body: string, now = new Date()): DatedNote {
  return { ...note, body, title: (body.split("\n")[0] ?? "").replace(/^#+\s*/, "").slice(0, 50) || "Untitled", updatedAt: now.toISOString() };
}
export const noteIconKind = (id: string) => ({ about: "profile", now: "work", experience: "work", pureit: "project", launches: "project", skills: "skills", awards: "awards", community: "people", education: "education", website: "web", "x-accounts": "work", insights: "project" }[id] ?? (seeds.some(n => n.id === id) ? "project" : "note"));