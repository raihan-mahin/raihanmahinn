import { useEffect, useMemo, useState } from "react";
import { Search, Pencil, Eye, Plus, RotateCcw } from "lucide-react";
import { notes as seed } from "@/data/portfolio";

import { loadNotes, NOTES_KEY as KEY } from "@/lib/note-storage";
import { Button } from "@/components/ui/button";
import { useOS } from "../store";
import { NoteList } from "../NoteList";
import { newNote, editNote, type DatedNote } from "@/lib/note-presentation";

const noteLinkClass = "rounded-sm text-primary underline underline-offset-2 focus-visible:outline focus-visible:outline-2";

function noteHref(value: string) {
  if (/^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(value)) return value;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export function Render({ body }: { body: string }) {
  const open = useOS().open;
  const inline = (line: string) => line.split(/(\[[^\]\n]+\]\([^\s)]+\)|https?:\/\/[^\s<>]+|[\w.+-]+@[\w.-]+\.[a-z]{2,})/gi).map((part, i) => {
    const token = part.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
    if (token?.[2] === "app:photos") {
      return <Button variant="link" type="button" key={i} className={noteLinkClass + " h-auto p-0 text-[inherit] font-normal"} onClick={() => open("photos")}>{token[1]}</Button>;
    }
    const value = token?.[2] ?? (/^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/i.test(part) ? "mailto:" + part : part);
    const href = noteHref(value);
    if (!href) return token?.[1] ?? part;
    const external = !href.toLowerCase().startsWith("mailto:");
    return <a key={i} className={noteLinkClass} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>{token?.[1] ?? part}</a>;
  });
  return (
    <div className="space-y-1.5 text-[15px] leading-relaxed">
      {body.split("\n").map((l, i) => {
        if (l.startsWith("# ")) return <h1 key={i} className="pb-1 text-2xl font-bold tracking-normal">{inline(l.slice(2))}</h1>;
        if (l.startsWith("## ")) return <h2 key={i} className="pt-2 text-base font-bold">{inline(l.slice(3))}</h2>;
        if (l.startsWith("- ")) return <p key={i} className="flex gap-2 pl-1"><span className="text-primary">•</span><span>{inline(l.slice(2))}</span></p>;
        if (!l.trim()) return <div key={i} className="h-2" />;
        return <p key={i}>{inline(l)}</p>;
      })}
    </div>
  );
}

export function Notes({ payload }: { payload?: string | undefined }) {
  const [list, setList] = useState<DatedNote[]>(seed);
  const [sel, setSel] = useState(payload ?? "about");
  const [q, setQ] = useState("");
  const [edit, setEdit] = useState(false);
  useEffect(() => { setList(loadNotes()); }, []);
  useEffect(() => { if (payload) { setSel(payload); setEdit(false); } }, [payload]);
  const save = (l: DatedNote[]) => { setList(l); try { localStorage.setItem(KEY, JSON.stringify(l)); } catch { /* ignore */ } };
  const filtered = useMemo(() => list.filter((n) => `${n.title} ${n.body}`.toLowerCase().includes(q.toLowerCase())), [list, q]);
  const cur = list.find((n) => n.id === sel) ?? list[0];

  return (
    <div className="flex h-full flex-col sm:flex-row">
      <aside className="flex max-h-52 shrink-0 flex-col border-b border-border bg-secondary/50 sm:max-h-none sm:w-64 sm:border-b-0 sm:border-r">
        <div className="flex items-center gap-1.5 p-2">
          <label className="flex flex-1 items-center gap-1.5 rounded-md bg-muted px-2 py-1"><Search size={13} className="text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search notes" aria-label="Search notes" className="w-full bg-transparent text-sm outline-none" /></label>
          <Button variant="ghost" aria-label="New note" onClick={() => { const n = newNote(); save([n, ...list]); setSel(n.id); setEdit(true); }} className="rounded-md p-1.5 hover:bg-accent"><Plus size={15} /></Button>
        </div>
        <div className="flex-1 overflow-auto px-2 pb-2"><NoteList notes={filtered} selected={cur?.id} onSelect={id => {setSel(id);setEdit(false);}}/><p className="py-3 text-center text-xs text-muted-foreground">{filtered.length} notes</p></div>
      </aside>
      {cur && (
        <div className="flex min-h-0 flex-1 flex-col bg-card">
          <div className="flex items-center justify-end gap-1 border-b border-border px-3 py-1.5">
            <Button variant="ghost" onClick={() => { save(seed); setSel("about"); }} className="flex items-center gap-1 rounded-md px-2 py-1 text-xs hover:bg-accent" title="Restore original notes"><RotateCcw size={13} />Reset</Button>
            <Button variant="ghost" onClick={() => setEdit(!edit)} className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-semibold">{edit ? <><Eye size={13} />View</> : <><Pencil size={13} />Edit</>}</Button>
          </div>
          <div className="min-h-0 flex-1 overflow-auto px-6 py-5 sm:px-10">
            <p className="mb-3 text-center text-xs text-muted-foreground">{cur.date}</p>
            {edit ? (
              <textarea aria-label="Note content" value={cur.body} onChange={(e) => {
                const body = e.target.value;
                save(list.map((n) => (n.id === cur.id ? editNote(n, body) : n)));
              }} className="h-full min-h-80 w-full resize-none bg-transparent font-mono text-sm outline-none" />
            ) : <Render body={cur.body} />}
          </div>
        </div>
      )}
    </div>
  );
}
