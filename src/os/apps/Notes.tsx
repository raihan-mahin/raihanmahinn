import { useEffect, useMemo, useState } from "react";
import { Search, Pencil, Eye, Plus, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { notes as seed, type Note } from "@/data/portfolio";

const KEY = "mahin-os-notes";

export function Render({ body }: { body: string }) {
  return (
    <div className="space-y-1.5 text-[15px] leading-relaxed">
      {body.split("\n").map((l, i) => {
        if (l.startsWith("# ")) return <h1 key={i} className="pb-1 text-2xl font-bold tracking-tight">{l.slice(2)}</h1>;
        if (l.startsWith("## ")) return <h2 key={i} className="pt-2 text-base font-bold">{l.slice(3)}</h2>;
        if (l.startsWith("- ")) return <p key={i} className="flex gap-2 pl-1"><span className="text-primary">•</span><span>{l.slice(2)}</span></p>;
        if (!l.trim()) return <div key={i} className="h-2" />;
        return <p key={i}>{l}</p>;
      })}
    </div>
  );
}

export function Notes({ payload }: { payload?: string | undefined }) {
  const [list, setList] = useState<Note[]>(seed);
  const [sel, setSel] = useState(payload ?? "about");
  const [q, setQ] = useState("");
  const [edit, setEdit] = useState(false);
  useEffect(() => { try { const r = localStorage.getItem(KEY); if (r) { const stored: Note[] = JSON.parse(r); setList([...stored, ...seed.filter(n => !stored.some(s => s.id === n.id))]); } } catch { /* ignore */ } }, []);
  useEffect(() => { if (payload) { setSel(payload); setEdit(false); } }, [payload]);
  const save = (l: Note[]) => { setList(l); try { localStorage.setItem(KEY, JSON.stringify(l)); } catch { /* ignore */ } };
  const filtered = useMemo(() => list.filter((n) => `${n.title} ${n.body}`.toLowerCase().includes(q.toLowerCase())), [list, q]);
  const cur = list.find((n) => n.id === sel) ?? list[0];

  return (
    <div className="flex h-full flex-col sm:flex-row">
      <aside className="flex max-h-52 shrink-0 flex-col border-b border-border bg-secondary/50 sm:max-h-none sm:w-64 sm:border-b-0 sm:border-r">
        <div className="flex items-center gap-1.5 p-2">
          <label className="flex flex-1 items-center gap-1.5 rounded-md bg-muted px-2 py-1"><Search size={13} className="text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search notes" aria-label="Search notes" className="w-full bg-transparent text-sm outline-none" /></label>
          <button aria-label="New note" onClick={() => { const n = { id: `n${Date.now()}`, title: "New note", date: "Today", body: "# New note\n" }; save([n, ...list]); setSel(n.id); setEdit(true); }} className="rounded-md p-1.5 hover:bg-accent"><Plus size={15} /></button>
        </div>
        <ul className="flex-1 overflow-auto px-2 pb-2">
          {["Pinned", "Recent"].map(section => <li key={section}><p className="px-3 pb-1 pt-3 text-[11px] font-semibold text-muted-foreground">{section}</p><ul>{filtered.filter(n => section === "Pinned" ? ["about", "experience", "pureit"].includes(n.id) : !["about", "experience", "pureit"].includes(n.id)).map((n) => (
            <li key={n.id}><button onClick={() => { setSel(n.id); setEdit(false); }} className={cn("w-full rounded-lg px-3 py-2 text-left", cur?.id === n.id ? "bg-gold/30" : "hover:bg-accent")}>
              <p className="truncate text-[13px] font-bold">{n.title}</p>
              <p className="truncate text-xs text-muted-foreground"><span className="font-semibold">{n.date}</span> {n.body.replace(/^#+\s*|\n#*\s*-?\s*/gm, " ").slice(0, 60)}</p>
            </button></li>
          ))}</ul></li>)}
          {!filtered.length && <li className="p-3 text-xs text-muted-foreground">No notes match.</li>}
        </ul>
      </aside>
      {cur && (
        <div className="flex min-h-0 flex-1 flex-col bg-card">
          <div className="flex items-center justify-end gap-1 border-b border-border px-3 py-1.5">
            <button onClick={() => { save(seed); setSel("about"); }} className="flex items-center gap-1 rounded-md px-2 py-1 text-xs hover:bg-accent" title="Restore original notes"><RotateCcw size={13} />Reset</button>
            <button onClick={() => setEdit(!edit)} className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-semibold">{edit ? <><Eye size={13} />View</> : <><Pencil size={13} />Edit</>}</button>
          </div>
          <div className="min-h-0 flex-1 overflow-auto px-6 py-5 sm:px-10">
            <p className="mb-3 text-center text-xs text-muted-foreground">{cur.date}</p>
            {edit ? (
              <textarea aria-label="Note content" value={cur.body} onChange={(e) => {
                const body = e.target.value; const title = (body.split("\n")[0] ?? "").replace(/^#+\s*/, "").slice(0, 50) || "Untitled";
                save(list.map((n) => (n.id === cur.id ? { ...n, body, title } : n)));
              }} className="h-full min-h-80 w-full resize-none bg-transparent font-mono text-sm outline-none" />
            ) : <Render body={cur.body} />}
          </div>
        </div>
      )}
    </div>
  );
}
