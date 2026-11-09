import { notes, type Note } from "@/data/portfolio";
import legacy from "@/data/legacy-note-seeds.json";

export const NOTES_KEY = "mahin-os-notes";
/** Only byte-identical known defaults are replaceable; all user edits survive. */
export function mergeNotes(stored: Note[], defaults = notes): Note[] {
  return [
    ...stored.map(n => {
      const current = defaults.find(s => s.id === n.id);
      const untouched = legacy.some(s => s.id === n.id && s.title === n.title && s.body === n.body);
      return current && untouched ? current : n;
    }),
    ...defaults.filter(n => !stored.some(s => s.id === n.id)),
  ];
}
export function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    if (!raw) return notes;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return notes;
    const valid = parsed.filter((n): n is Note => n && typeof n.id === "string" && typeof n.title === "string" && typeof n.body === "string" && typeof n.date === "string");
    const merged = mergeNotes(valid);
    localStorage.setItem(NOTES_KEY, JSON.stringify(merged));
    return merged;
  } catch { return notes; }
}