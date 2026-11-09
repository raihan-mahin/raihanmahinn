import { useEffect, useState } from "react";
import { Plus, Pencil, Eye, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notes as seed } from "@/data/portfolio";
import { Render } from "../apps/Notes";
import { loadNotes, NOTES_KEY } from "@/lib/note-storage";
import { editNote, newNote, type DatedNote } from "@/lib/note-presentation";
import { NoteList, NoteSearch, NoteIcon } from "../NoteList";
export function IOSNotes({ onHome, payload }: { onHome: () => void; payload?: string | undefined }) {
  const [list,setList] = useState<DatedNote[]>(seed); const [sel,setSel] = useState<string | null>(payload ?? "about"); const [last,setLast] = useState(payload ?? "about"); const [q,setQ] = useState(""); const [edit,setEdit] = useState(false);
  useEffect(() => { setList(loadNotes()); },[]);
  useEffect(() => { if (payload) { setSel(payload); setLast(payload); setEdit(false); } }, [payload]);
  const save = (next: DatedNote[]) => { setList(next); try { localStorage.setItem(NOTES_KEY,JSON.stringify(next)); } catch { /* available in this session */ } };
  const create = () => { const n = newNote(); save([n,...list]); setSel(n.id); setLast(n.id); setEdit(true); };
  const current = list.find(n => n.id===sel); const filtered=list.filter(n => `${n.title} ${n.body}`.toLowerCase().includes(q.toLowerCase()));
  return <div className="native-dark notes-native absolute inset-0 flex flex-col pt-[48px] pb-[max(env(safe-area-inset-bottom),28px)]">
    <header className="relative flex h-11 shrink-0 items-center justify-between border-b border-border px-1"><Button variant="ghost" className="text-gold" onClick={() => { if(current) {setSel(null);setEdit(false);} else onHome(); }}><ChevronLeft/>{current ? "Notes" : "Home"}</Button><h1 className="pointer-events-none absolute inset-x-28 text-center text-sm font-semibold">Notes</h1><div className="flex"><Button variant="ghost" className="size-11 text-gold" aria-label="New note" onClick={create}><Plus/></Button>{current && <Button variant="ghost" className="size-11 text-gold" aria-label={edit?"View note":"Edit note"} onClick={() => setEdit(v=>!v)}>{edit?<Eye/>:<Pencil/>}</Button>}</div></header>
    {current ? <><div className="flex shrink-0 items-center justify-between px-4"><Button variant="link" className="h-8 p-0 text-gold" onClick={onHome}>Home</Button><p className="text-xs text-muted-foreground">{current.updatedAt ? new Date(current.updatedAt).toLocaleDateString() : current.date}</p></div><div className="min-h-0 flex-1 overflow-y-auto px-5 py-3"><div className="mb-2"><NoteIcon id={current.id}/></div>{edit ? <textarea aria-label="Note content" className="h-full min-h-64 w-full resize-none bg-transparent text-base leading-relaxed outline-none" value={current.body} onChange={e => save(list.map(n=>n.id===current.id?editNote(n,e.target.value):n))}/> : <Render body={current.body}/>}</div></> : <><div className="px-4 pt-3"><NoteSearch value={q} onChange={setQ}/></div><div className="min-h-0 flex-1 overflow-y-auto px-3"><NoteList notes={filtered} selected={last} onSelect={id => {setSel(id);setLast(id);setEdit(false);}}/><p className="py-5 text-center text-xs text-muted-foreground">{filtered.length} notes</p></div></>}
  </div>;
}