import { useEffect, useMemo, useState } from "react";
import { Search, FileText, Trophy, Images, StickyNote } from "lucide-react";
import { cn } from "@/lib/utils";
import { APPS, DOCK, MOBILE_APPS, type AppId } from "./apps-registry";
import { useOS } from "./store";
import { AppIcon } from "./ui";
import { useIsMobile } from "@/hooks/use-mobile";
import { notes, workProjects, awards, profile } from "@/data/portfolio";

type Result = { key: string; label: string; sub: string; icon: React.ReactNode; run: () => void };

export function Spotlight() {
  const os = useOS();
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const mobile = useIsMobile();
  const results = useMemo<Result[]>(() => {
    const s = q.toLowerCase().trim();
    const appIds = mobile ? MOBILE_APPS : [...DOCK, "recruiter"] as AppId[];
    const all: Result[] = [
      ...appIds.map((id) => ({ key: `a-${id}`, label: APPS[id].name, sub: "Application", icon: <AppIcon id={id} className="size-6" size={13} />, run: () => os.open(id) })),
      ...notes.map((n) => ({ key: `n-${n.id}`, label: n.title, sub: "Note", icon: <StickyNote size={18} />, run: () => os.open("notes", n.id) })),
      ...awards.map((a) => ({ key: `w-${a.id}`, label: `${a.title} — ${a.rank}`, sub: "Competition", icon: <Trophy size={18} />, run: () => os.open("photos", `award-${a.id}`) })),
      ...workProjects.map((p) => ({ key: `p-${p.id}`, label: p.title, sub: p.subtitle, icon: <Images size={18} />, run: () => os.open("photos", p.id) })),
      { key: "linkedin", label: "LinkedIn", sub: "Profile", icon: <span>in</span>, run: () => {window.open(profile.linkedin, "_blank", "noopener,noreferrer");os.setOverlay("none");} },
      { key: "resume", label: "Resume", sub: "Document", icon: <FileText size={18} />, run: () => os.open("preview") },
    ];
    if (!s) return all.slice(0, 8);
    return all.filter((r) => `${r.label} ${r.sub}`.toLowerCase().includes(s)).slice(0, 10);
  }, [q, os, mobile]);

  useEffect(() => setSel(0), [q]);
  return (
    <div className="fixed inset-0 z-[9200] flex items-start justify-center bg-chrome/30 px-4 pt-[18vh] backdrop-blur-[2px] animate-fade-up" onMouseDown={() => os.setOverlay("none")}>
      <div className="glass-strong shadow-window w-full max-w-xl overflow-hidden rounded-2xl" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-label="Spotlight">
        <div className="flex items-center gap-3 px-4">
          <Search size={20} className="text-muted-foreground" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Spotlight Search — apps, projects, awards, notes"
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(results.length - 1, s + 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(0, s - 1)); }
              if (e.key === "Enter" && results[sel]) { results[sel].run(); }
            }}
            className="h-14 flex-1 bg-transparent text-lg font-medium text-foreground outline-none placeholder:text-muted-foreground" />
        </div>
        {results.length > 0 ? (
          <ul className="max-h-[50vh] overflow-auto border-t border-border p-1.5">
            {results.map((r, i) => (
              <li key={r.key}>
                <button onMouseEnter={() => setSel(i)} onClick={r.run}
                  className={cn("flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left", i === sel ? "bg-primary text-primary-foreground" : "text-foreground")}>
                  <span className="grid size-6 place-items-center">{r.icon}</span>
                  <span className="flex-1 truncate text-sm font-medium">{r.label}</span>
                  <span className="text-xs opacity-70">{r.sub}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : <p className="border-t border-border p-4 text-sm text-muted-foreground">No results for “{q}”.</p>}
      </div>
    </div>
  );
}

export function Launchpad() {
  const os = useOS();
  const [q, setQ] = useState("");
  const ids = ([...DOCK.filter((d) => d !== "launchpad"), "recruiter"] as AppId[]).filter((id) => APPS[id].name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="fixed inset-0 z-[9100] flex flex-col items-center bg-chrome px-6 pt-16 backdrop-blur-3xl animate-ios-zoom" onClick={() => os.setOverlay("none")}>
      <input autoFocus value={q} onClick={(e) => e.stopPropagation()} onChange={(e) => setQ(e.target.value)} placeholder="Search"
        className="glass w-64 rounded-lg px-3 py-1.5 text-center text-sm text-foreground outline-none placeholder:text-muted-foreground" />
      <div className="mt-12 grid w-full max-w-4xl grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-4 md:grid-cols-6">
        {ids.map((id, i) => (
          <button key={id} onClick={(e) => { e.stopPropagation(); os.open(id); }} className="flex flex-col items-center gap-2 animate-fade-up" style={{ animationDelay: `${i * 25}ms` }}>
            <AppIcon id={id} className="size-16 transition hover:scale-110 md:size-20" />
            <span className="text-shadow-soft text-sm font-medium text-chrome-foreground">{APPS[id].name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Shortcuts() {
  const os = useOS();
  const rows = [["⌘/Ctrl + K", "Spotlight"], ["⌘/Ctrl + L", "Launchpad"], ["Esc", "Close overlay"], ["⌘/Ctrl + W", "Close active window"], ["⌘/Ctrl + M", "Minimize active window"], ["Double-click titlebar", "Maximize"]];
  return (
    <div className="fixed inset-0 z-[9200] grid place-items-center bg-chrome/40 p-4" onClick={() => os.setOverlay("none")}>
      <div className="glass-strong shadow-window w-full max-w-sm rounded-2xl p-5 text-foreground" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-3 text-lg font-bold">Keyboard shortcuts</h2>
        {rows.map(([k, v]) => <div key={k} className="flex justify-between border-b border-border py-2 text-sm last:border-0"><span className="font-mono text-xs">{k}</span><span className="text-muted-foreground">{v}</span></div>)}
      </div>
    </div>
  );
}
