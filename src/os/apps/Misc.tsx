import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, SkipBack, SkipForward, RotateCcw, Trash2, Mail, Linkedin, FileText, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import wallpaper from "@/assets/wallpaper-indigo.jpg";
import { useOS, type Wallpaper } from "../store";
import { profile, stats, experience, awards, agencyBrands, education, leadership } from "@/data/portfolio";

export function Settings() {
  const { prefs, setPrefs, resetPrefs } = useOS();
  const wps: { id: Wallpaper; name: string; cls: string }[] = [
    { id: "image", name: "Indigo Silk", cls: "" }, { id: "aurora", name: "Aurora", cls: "wp-aurora" }, { id: "dusk", name: "Dusk", cls: "wp-dusk" }, { id: "ocean", name: "Ocean", cls: "wp-ocean" },
  ];
  const Toggle = ({ on, set, label }: { on: boolean; set: (v: boolean) => void; label: string }) => (
    <button role="switch" aria-checked={on} aria-label={label} onClick={() => set(!on)} className={cn("relative h-6 w-10 rounded-full transition", on ? "bg-success" : "bg-muted")}>
      <span className={cn("absolute top-0.5 size-5 rounded-full bg-card shadow-soft transition-all", on ? "left-[18px]" : "left-0.5")} />
    </button>
  );
  return (
    <div className="h-full space-y-5 overflow-auto p-5">
      <section>
        <h3 className="mb-2 text-sm font-bold">Appearance</h3>
        <div className="grid grid-cols-2 gap-3">
          {(["light", "dark"] as const).map((t) => (
            <button key={t} onClick={() => setPrefs({ theme: t })} className={cn("rounded-xl p-3 text-sm font-semibold capitalize ring-2", prefs.theme === t ? "ring-primary" : "ring-border")}>
              <div className={cn("mb-2 h-14 rounded-lg", t === "light" ? "bg-secondary" : "bg-terminal")} />{t}
            </button>))}
        </div>
      </section>
      <section>
        <h3 className="mb-2 text-sm font-bold">Wallpaper</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {wps.map((w) => (
            <button key={w.id} onClick={() => setPrefs({ wallpaper: w.id })} className={cn("overflow-hidden rounded-xl text-xs font-semibold ring-2", prefs.wallpaper === w.id ? "ring-primary" : "ring-border")}>
              {w.id === "image" ? <img src={wallpaper} alt="" className="h-16 w-full object-cover" /> : <div className={cn("h-16", w.cls)} />}
              <p className="py-1.5">{w.name}</p>
            </button>))}
        </div>
      </section>
      <section className="space-y-2 rounded-xl bg-secondary p-3 text-sm">
        <div className="flex items-center justify-between"><span>Dock magnification</span><Toggle label="Dock magnification" on={prefs.magnify} set={(v) => setPrefs({ magnify: v })} /></div>
        <div className="flex items-center justify-between"><span>Show “Hi, I'm Mahin” widget</span><Toggle label="Show widget" on={prefs.showWidget} set={(v) => setPrefs({ showWidget: v })} /></div>
      </section>
      <button onClick={resetPrefs} className="flex items-center gap-1.5 text-xs font-semibold text-primary"><RotateCcw size={13} />Reset to defaults</button>
      <p className="text-xs text-muted-foreground">Settings are saved on this device.</p>
    </div>
  );
}

const EVENTS: { date: string; title: string; tone: "primary" | "gold" | "success" }[] = [
  { date: "2026-12-15", title: "Expected graduation — BBA Marketing, NSU", tone: "success" },
  { date: "2026-06-30", title: "Pureit (BizLearner) role ended", tone: "primary" },
  { date: "2024-08-01", title: "Started Marketing at BizLearner (Pureit)", tone: "primary" },
  { date: "2024-10-01", title: "Legend International School contract", tone: "primary" },
  { date: "2023-10-01", title: "Joined X Integrated Marketing Agency", tone: "primary" },
  { date: "2020-01-01", title: "Founded Music That Heals", tone: "gold" },
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

const TRACKS = [
  { t: "Healing Frequencies", a: "Music That Heals · Community Mix", d: 214 },
  { t: "Live Night Sessions", a: "Music That Heals · Event Recording", d: 248 },
  { t: "200K Strong", a: "Music That Heals · Anthem", d: 186 },
  { t: "Dhaka Rain Lo-fi", a: "Community Picks", d: 201 },
];
export function Music() {
  const [i, setI] = useState(0); const [playing, setPlaying] = useState(false); const [pos, setPos] = useState(0);
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setPos((p) => { if (p + 1 >= (TRACKS[i]?.d ?? 0)) { setI((x) => (x + 1) % TRACKS.length); return 0; } return p + 1; }), 1000);
    return () => clearInterval(t);
  }, [playing, i]);
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const tr = TRACKS[i] ?? TRACKS[0]!;
  return (
    <div className="flex h-full flex-col sm:flex-row">
      <div className="flex flex-col items-center justify-center gap-3 p-6 sm:w-72">
        <div className={cn("ic-music grid size-40 place-items-center rounded-2xl text-4xl font-bold text-primary-foreground shadow-window", playing && "animate-pulse")}>♫</div>
        <div className="text-center"><p className="font-bold">{tr.t}</p><p className="text-xs text-muted-foreground">{tr.a}</p></div>
        <div className="w-full"><div className="h-1 rounded-full bg-muted"><div className="h-1 rounded-full bg-primary" style={{ width: `${(pos / tr.d) * 100}%` }} /></div>
          <div className="mt-1 flex justify-between text-[10px] tabular-nums text-muted-foreground"><span>{fmt(pos)}</span><span>{fmt(tr.d)}</span></div></div>
        <div className="flex items-center gap-4">
          <button aria-label="Previous" onClick={() => { setI((i - 1 + TRACKS.length) % TRACKS.length); setPos(0); }}><SkipBack size={20} /></button>
          <button aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying(!playing)} className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground">{playing ? <Pause size={20} /> : <Play size={20} />}</button>
          <button aria-label="Next" onClick={() => { setI((i + 1) % TRACKS.length); setPos(0); }}><SkipForward size={20} /></button>
        </div>
        <p className="text-[10px] text-muted-foreground">Demo player · no audio</p>
      </div>
      <div className="min-h-0 flex-1 overflow-auto border-t border-border p-4 sm:border-l sm:border-t-0">
        <h3 className="text-lg font-bold">Music That Heals</h3>
        <p className="mb-3 text-xs text-muted-foreground">Founded 2020 · 200K-member community · live events</p>
        {TRACKS.map((t, k) => (
          <button key={t.t} onClick={() => { setI(k); setPos(0); setPlaying(true); }} className={cn("flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm", k === i ? "bg-accent text-accent-foreground" : "hover:bg-secondary")}>
            <span className="w-4 text-xs text-muted-foreground">{k + 1}</span><span className="flex-1 font-medium">{t.t}</span><span className="text-xs tabular-nums text-muted-foreground">{fmt(t.d)}</span>
          </button>))}
      </div>
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
  const os = useOS();
  const champs = awards.filter((a) => a.rank === "Champion");
  return (
    <div className="h-full overflow-auto p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">30-second overview</p>
      <h2 className="mt-1 text-3xl font-bold tracking-tight">{profile.shortName}</h2>
      <p className="font-semibold text-muted-foreground">{profile.headline} · {profile.location}</p>
      <p className="mt-3 text-sm leading-relaxed">{profile.bio}</p>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {stats.filter((s) => s.label !== "Launch projects" && s.label !== "Brand touchpoints").slice(0, 4).map((s) => (
          <div key={s.label} className="rounded-xl bg-secondary p-3"><p className="text-2xl font-bold">{s.value}</p><p className="text-[11px] text-muted-foreground">{s.label}</p></div>))}
      </div>
      <h3 className="mt-5 text-sm font-bold">Highlights</h3>
      <ul className="mt-2 space-y-2 text-sm">
        <li className="rounded-lg bg-accent p-3"><b>Now:</b> agency-side AI reels & short-form content for {agencyBrands.map((b) => b.brand).join(", ")} (Unilever brands).</li>
        <li className="rounded-lg bg-secondary p-3"><b>Pureit (BizLearner):</b> brand transition across 7+ touchpoints, 300+ assets for 3 launches, part of a team that drove 6.5x digital sales.</li>
        <li className="rounded-lg bg-secondary p-3"><b>{awards.length} competition results</b>, {champs.length} championships: {champs.map((c) => c.title).join(", ")}.</li>
        <li className="rounded-lg bg-secondary p-3"><b>Community:</b> {leadership[0]?.detail}</li>
        <li className="rounded-lg bg-secondary p-3"><b>Education:</b> {education[0]?.degree}, {education[0]?.school} ({education[0]?.period}).</li>
      </ul>
      <h3 className="mt-5 text-sm font-bold">Experience</h3>
      <ol className="mt-2 border-l-2 border-primary/40 pl-4">
        {experience.map((e) => <li key={e.id} className="mb-2"><p className="text-sm font-semibold">{e.role} — {e.org}</p><p className="text-xs text-muted-foreground">{e.period} · {e.type}</p></li>)}
      </ol>
      <div className="mt-5 flex flex-wrap gap-2">
        <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"><Mail size={15} />{profile.email}</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold"><Linkedin size={15} />LinkedIn</a>
        <a href={profile.behance} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold"><ExternalLink size={15} />Behance</a>
        <button onClick={() => os.open("preview")} className="flex items-center gap-1.5 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold"><FileText size={15} />Resume</button>
      </div>
    </div>
  );
}
