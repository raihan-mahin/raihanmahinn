import { useState } from "react";
import { Briefcase, FolderOpen, Megaphone, Trophy, User, LayoutGrid, List, FileText, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import { experience, projects, awards, agencyBrands, behanceWorks, notes } from "@/data/portfolio";
import { useOS } from "../store";
import { BrandStrip } from "../BrandLogo";
import type { AppId } from "../apps-registry";

type Entry = { id: string; name: string; kind: string; meta: string; detail: string; open: [AppId, string?]; brands?: string[] };
const sections: { key: string; icon: typeof Folder; items: Entry[] }[] = [
  { key: "Experience", icon: Briefcase, items: experience.map((e) => ({ id: e.id, name: `${e.role} — ${e.org}`, kind: e.type, meta: e.period, detail: e.bullets.join(" "), open: ["notes", "experience"], ...(e.clients ? { brands: e.clients } : {}) })) },
  { key: "Projects", icon: FolderOpen, items: projects.filter((p) => !p.id.startsWith("award-") && !p.id.startsWith("bh-")).map((p) => ({ id: p.id, name: p.title, kind: "Project", meta: p.subtitle, detail: p.summary ?? "", open: ["photos", p.id] })) },
  { key: "Brand Campaigns", icon: Megaphone, items: [
    ...agencyBrands.map((b) => ({ id: b.id, name: `${b.brand} — agency workstream`, kind: "Current work", meta: "Agency Lead", detail: b.description, open: ["photos", `agency-${b.id}`] as [AppId, string] })),
    ...behanceWorks.map((w) => ({ id: w.id, name: w.title, kind: w.type, meta: "Behance", detail: "Design work published on Behance.", open: ["photos", `bh-${w.id}`] as [AppId, string] })),
  ] },
  { key: "Competitions/Awards", icon: Trophy, items: awards.map((a) => ({ id: a.id, name: `${a.title} — ${a.rank}`, kind: a.rank, meta: a.organizer, detail: a.focus, open: ["photos", `award-${a.id}`] })) },
  { key: "About", icon: User, items: notes.map((n) => ({ id: n.id, name: `${n.title}.txt`, kind: "Note", meta: n.date, detail: n.body.split("\n").slice(1, 3).join(" "), open: ["notes", n.id] })) },
];

export function Finder() {
  const os = useOS();
  const [sec, setSec] = useState("Experience");
  const [view, setView] = useState<"list" | "grid">("list");
  const [sel, setSel] = useState<string | null>(null);
  const s = sections.find((x) => x.key === sec) ?? sections[0]!;
  const cur = s.items.find((i) => i.id === sel);
  return (
    <div className="flex h-full flex-col md:flex-row">
      <aside className="flex shrink-0 gap-1 overflow-x-auto border-b border-border bg-secondary/50 p-2 md:w-52 md:flex-col md:border-b-0 md:border-r">
        <p className="hidden px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground md:block">Favourites</p>
        {sections.map((x) => { const I = x.icon; return (
          <button key={x.key} onClick={() => { setSec(x.key); setSel(null); }} className={cn("flex shrink-0 items-center gap-2 rounded-md px-2.5 py-1.5 text-[13px] font-medium", sec === x.key ? "bg-accent text-accent-foreground" : "hover:bg-accent/60")}>
            <I size={15} className="text-primary" />{x.key}
          </button>); })}
      </aside>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
          <p className="text-sm font-bold">{sec} <span className="font-normal text-muted-foreground">· {s.items.length} items</span></p>
          <div className="flex rounded-md bg-secondary p-0.5">
            <button aria-label="List view" onClick={() => setView("list")} className={cn("rounded p-1", view === "list" && "bg-card shadow-soft")}><List size={14} /></button>
            <button aria-label="Grid view" onClick={() => setView("grid")} className={cn("rounded p-1", view === "grid" && "bg-card shadow-soft")}><LayoutGrid size={14} /></button>
          </div>
        </div>
        <div className="flex min-h-0 flex-1">
          <div className="min-w-0 flex-1 overflow-auto p-2">
            {view === "list" ? (
              <table className="w-full text-[13px]">
                <thead><tr className="text-left text-[11px] text-muted-foreground"><th className="px-2 py-1 font-semibold">Name</th><th className="hidden px-2 font-semibold sm:table-cell">Kind</th><th className="hidden px-2 font-semibold lg:table-cell">Info</th></tr></thead>
                <tbody>{s.items.map((it, i) => (
                  <tr key={it.id} onClick={() => setSel(it.id)} onDoubleClick={() => os.open(...it.open)} className={cn("cursor-default", sel === it.id ? "bg-primary text-primary-foreground" : i % 2 ? "bg-secondary/40" : "")}>
                    <td className="flex items-center gap-2 rounded-l-md px-2 py-1.5"><FileText size={14} className="shrink-0 opacity-70" /><span className="truncate">{it.name}</span></td>
                    <td className="hidden whitespace-nowrap px-2 sm:table-cell">{it.kind}</td><td className="hidden whitespace-nowrap rounded-r-md px-2 lg:table-cell">{it.meta}</td>
                  </tr>))}</tbody>
              </table>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-2">
                {s.items.map((it) => (
                  <button key={it.id} onClick={() => setSel(it.id)} onDoubleClick={() => os.open(...it.open)} className={cn("flex flex-col items-center gap-1 rounded-lg p-2 text-center", sel === it.id && "bg-accent")}>
                    <Folder size={42} className="fill-primary/30 text-primary" /><span className="line-clamp-2 text-[11px] font-medium leading-tight">{it.name}</span>
                  </button>))}
              </div>
            )}
            <p className="px-2 pt-3 text-[11px] text-muted-foreground">Tip: double-click to open.</p>
          </div>
          {cur && (
            <aside className="hidden w-60 shrink-0 overflow-auto border-l border-border p-4 lg:block">
              <Folder size={48} className="fill-primary/30 text-primary" />
              <h3 className="mt-2 text-sm font-bold leading-snug">{cur.name}</h3>
              <p className="text-xs text-muted-foreground">{cur.kind} · {cur.meta}</p>
              <p className="mt-3 text-xs leading-relaxed">{cur.detail}</p>
              {cur.brands && <BrandStrip className="mt-3" label="Brands" names={cur.brands} />}
              <button onClick={() => os.open(...cur.open)} className="mt-4 w-full rounded-md bg-primary py-1.5 text-xs font-semibold text-primary-foreground">Open</button>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
