import { RecruiterContent } from "../RecruiterContent";
export { Music } from "./Music";
import { BrandStrip } from "../BrandLogo";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, SkipBack, SkipForward, RotateCcw, Trash2, Mail, Linkedin, FileText, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import wallpaper from "@/assets/wallpaper-indigo.jpg";
import { useOS, type Wallpaper } from "../store";
import { profile, highlights, experience, awards, agencyBrands, education, leadership } from "@/data/portfolio";
import { SystemSettings } from "./SystemSettings";

export function Settings() {
  return <SystemSettings/>;
}

const EVENTS: { date: string; title: string; tone: "primary" | "gold" | "success" }[] = [
  { date: "2026-12-15", title: "Expected graduation — BBA Marketing, NSU", tone: "success" },
  { date: "2026-06-30", title: "Pureit (BizLearner) role ended", tone: "primary" },
  { date: "2024-08-01", title: "Started Marketing at BizLearner (Pureit)", tone: "primary" },
  { date: "2024-10-01", title: "Legend International School contract", tone: "primary" },
  { date: "2023-10-01", title: "Joined X Integrated Marketing Agency", tone: "primary" },
];

export function Calendar() {
  const [cursor, setCursor] = useState<Date | null>(null);
  useEffect(() => setCursor(new Date()), []);
  const days = useMemo(() => {
    if (!cursor) return [];
    const y = cursor.getFullYear(), m = cursor.getMonth();
    const first = new Date(y, m, 1).getDay(); const n = new Date(y, m + 1, 0).getDate();
    return [...Array(first).fill(null), ...Array.from({ length: n }, (_, i) => i + 1)] as (number | null)[];
  }, [cursor]);
  if (!cursor) return null;
  const today = new Date();
  const key = (d: number) => `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const shift = (n: number) => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + n, 1));
  return (
    <div className="flex h-full flex-col md:flex-row">
      <div className="flex min-h-0 flex-1 flex-col p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold">{cursor.toLocaleDateString(undefined, { month: "long" })} <span className="font-normal text-muted-foreground">{cursor.getFullYear()}</span></h2>
          <div className="flex gap-1">
            <button aria-label="Previous month" onClick={() => shift(-1)} className="rounded-md bg-secondary p-1"><ChevronLeft size={16} /></button>
            <button onClick={() => setCursor(new Date())} className="rounded-md bg-secondary px-2 text-xs font-semibold">Today</button>
            <button aria-label="Next month" onClick={() => shift(1)} className="rounded-md bg-secondary p-1"><ChevronRight size={16} /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 text-center text-[11px] font-semibold text-muted-foreground">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <div key={d} className="py-1">{d}</div>)}</div>
        <div className="grid flex-1 grid-cols-7 gap-px overflow-hidden rounded-lg bg-border">
          {days.map((d, i) => {
            const ev = d ? EVENTS.filter((e) => e.date === key(d)) : [];
            const isToday = d && today.toDateString() === new Date(cursor.getFullYear(), cursor.getMonth(), d).toDateString();
            return (
              <div key={i} className="min-h-12 bg-card p-1 text-right text-xs">
                {d && <span className={cn("inline-grid size-5 place-items-center rounded-full", isToday && "bg-tl-red font-bold text-primary-foreground")}>{d}</span>}
                {ev.map((e) => <p key={e.title} className="mt-0.5 truncate rounded bg-accent px-1 text-left text-[10px] font-semibold text-accent-foreground">{e.title}</p>)}
              </div>);
          })}
        </div>
      </div>
      <aside className="max-h-48 shrink-0 overflow-auto border-t border-border bg-secondary/50 p-4 md:max-h-none md:w-64 md:border-l md:border-t-0">
        <h3 className="mb-2 text-sm font-bold">Career milestones</h3>
        {[...EVENTS].sort((a, b) => b.date.localeCompare(a.date)).map((e) => (
          <button key={e.title} onClick={() => setCursor(new Date(e.date))} className="mb-2 block w-full border-l-2 border-primary pl-2 text-left">
            <p className="text-[11px] text-muted-foreground">{new Date(e.date).toLocaleDateString(undefined, { month: "short", year: "numeric" })}</p>
            <p className="text-xs font-semibold">{e.title}</p>
          </button>))}
      </aside>
    </div>
  );
}

const JUNK = ["generic-portfolio-template.zip", "boring_resume_v1_FINAL_final.docx", "stock-photo-handshake.jpg", "lorem-ipsum-case-study.pdf", "imposter-syndrome.tmp"];
export function TrashApp() {
  const [items, setItems] = useState(JUNK);
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <p className="text-sm font-bold">Trash <span className="font-normal text-muted-foreground">· {items.length} items</span></p>
        <div className="flex gap-2">
          <button onClick={() => setItems(JUNK)} className="rounded-md bg-secondary px-2 py-1 text-xs font-semibold">Restore all</button>
          <button onClick={() => setItems([])} disabled={!items.length} className="rounded-md bg-destructive px-2 py-1 text-xs font-semibold text-destructive-foreground disabled:opacity-40">Empty Trash</button>
        </div>
      </div>
      {items.length ? (
        <ul className="grid flex-1 grid-cols-[repeat(auto-fill,minmax(120px,1fr))] content-start gap-3 overflow-auto p-4">
          {items.map((f) => (
            <li key={f}><button onDoubleClick={() => setItems(items.filter((x) => x !== f))} title="Double-click to delete" className="flex w-full flex-col items-center gap-1 rounded-lg p-2 text-center hover:bg-accent">
              <FileText size={36} className="text-muted-foreground" /><span className="line-clamp-2 break-all text-[11px]">{f}</span></button></li>))}
        </ul>
      ) : <div className="grid flex-1 place-items-center text-center text-sm text-muted-foreground"><div><Trash2 className="mx-auto mb-2" size={36} />Trash is empty. Only the good stuff left. ✨</div></div>}
    </div>
  );
}

export function Recruiter() {
  return <div className="native-dark h-full overflow-auto"><RecruiterContent /></div>;
}
