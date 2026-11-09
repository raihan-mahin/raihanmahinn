import { Search, UserRound, Briefcase, Rocket, Sparkles, Trophy, Users, GraduationCap, Globe, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { noteGroups, noteIconKind, type DatedNote } from "@/lib/note-presentation";
export function NoteIcon({ id }: { id: string }) {
  const kind = noteIconKind(id);
  const Icon = { profile: UserRound, work: Briefcase, project: Rocket, skills: Sparkles, awards: Trophy, people: Users, education: GraduationCap, web: Globe, note: FileText }[kind] ?? FileText;
  return <Icon aria-hidden className={cn("size-4 shrink-0", kind === "awards" ? "text-gold" : kind === "people" ? "text-success" : "text-primary")} />;
}
export function NoteSearch({ value, onChange }: { value: string; onChange: (q: string) => void }) {
  return <label className="flex min-w-0 flex-1 items-center gap-2 rounded-lg bg-muted px-3 py-2"><Search size={16} className="text-muted-foreground"/><input aria-label="Search notes" placeholder="Search" value={value} onChange={e => onChange(e.target.value)} className="min-w-0 w-full bg-transparent text-sm outline-none"/></label>;
}
export function NoteList({ notes, selected, onSelect }: { notes: DatedNote[]; selected?: string | null | undefined; onSelect: (id: string) => void }) {
  return <div>{noteGroups(notes).map(group => <section key={group.label}><h2 className="px-3 pb-1 pt-4 text-xs font-semibold text-muted-foreground">{group.label}</h2>{group.notes.map(note => <Button key={note.id} variant="ghost" onClick={() => onSelect(note.id)} className={cn("h-auto w-full flex-col items-stretch gap-1 whitespace-normal rounded-none border-b border-border px-3 py-2.5 text-left", selected === note.id && "bg-gold/20")}><span className="flex min-w-0 items-center gap-2"><NoteIcon id={note.id}/><span className="min-w-0 truncate text-sm font-semibold">{note.title}</span></span><span className="line-clamp-1 text-xs text-muted-foreground">{note.updatedAt ? new Date(note.updatedAt).toLocaleDateString() : note.date} · {note.body.replace(/[#\n]/g, " ")}</span></Button>)}</section>)}{!notes.length && <p className="p-4 text-sm text-muted-foreground">No notes match.</p>}</div>;
}