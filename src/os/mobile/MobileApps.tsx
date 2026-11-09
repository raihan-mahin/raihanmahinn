import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Search, Folder, Check, ExternalLink, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import wallpaper from "@/assets/wallpaper-indigo.jpg";
import { notes as seedNotes, projects, projectCategories, profile, experience, awards, agencyBrands, behanceWorks, type Note, type ProjectCategory, type Project } from "@/data/portfolio";
import { useOS, type Wallpaper } from "../store";
import { Badge, MediaPlaceholder, hash } from "../ui";
import { Render } from "../apps/Notes";
import type { AppId } from "../apps-registry";

/* ---------- iOS page scaffold: blurred nav bar, large title, edge-swipe back ---------- */
export function IOSPage({ title, backLabel, onBack, right, children, large = true, inset = true }:
  { title: string; backLabel: string; onBack: () => void; right?: ReactNode; children: ReactNode; large?: boolean; inset?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const x0 = useRef<number | null>(null);
  const [dx, setDx] = useState(0);
  return (
    <div className={cn("absolute inset-0 flex flex-col bg-background", dx === 0 && "animate-ios-in")}
      style={{ transform: dx ? `translateX(${dx}px)` : undefined }}
      onTouchStart={(e) => { const t = e.touches[0]; x0.current = t && t.clientX < 28 ? t.clientX : null; }}
      onTouchMove={(e) => { if (x0.current !== null) setDx(Math.max(0, (e.touches[0]?.clientX ?? 0) - x0.current)); }}
      onTouchEnd={() => { if (dx > 90) onBack(); setDx(0); x0.current = null; }}>
      <div className={cn("pt-safe sticky top-0 z-10 transition-colors", scrolled || !large ? "glass-strong border-x-0 border-t-0" : "border-b border-transparent")}>
        <div className="h-11" aria-hidden />
        <div className="relative flex h-11 items-center px-1">
          <button onClick={onBack} className="flex min-h-11 items-center pr-3 text-[17px] text-primary"><ChevronLeft size={28} strokeWidth={2.4} /><span className="-ml-0.5 max-w-28 truncate">{backLabel}</span></button>
          <h1 className={cn("pointer-events-none absolute inset-x-24 truncate text-center text-[17px] font-semibold transition-opacity", large && !scrolled ? "opacity-0" : "opacity-100")}>{title}</h1>
          <div className="ml-auto flex items-center pr-3">{right}</div>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain" onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 30)}>
        {large && <h2 className="px-4 pb-2 pt-1 text-[34px] font-bold leading-tight tracking-tight">{title}</h2>}
        <div className={cn(inset && "pb-10")}>{children}</div>
      </div>
    </div>
  );
}

export function Group({ header, footer, children }: { header?: string; footer?: string; children: ReactNode }) {
  return (
    <section className="mx-4 mb-6">
      {header && <h3 className="px-4 pb-1.5 text-[13px] uppercase text-muted-foreground">{header}</h3>}
      <div className="divide-y divide-border overflow-hidden rounded-xl bg-card">{children}</div>
      {footer && <p className="px-4 pt-1.5 text-[13px] text-muted-foreground">{footer}</p>}
    </section>
  );
}

export function Row({ icon, title, sub, value, onClick, chevron = true, right, href }:
  { icon?: ReactNode; title: string; sub?: string; value?: string; onClick?: () => void; chevron?: boolean; right?: ReactNode; href?: string }) {
  const inner = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="min-w-0 flex-1"><span className="block truncate text-[17px]">{title}</span>{sub && <span className="block truncate text-[13px] text-muted-foreground">{sub}</span>}</span>
      {value && <span className="shrink-0 text-[17px] text-muted-foreground">{value}</span>}
      {right}
      {chevron && <ChevronRight size={18} className="shrink-0 text-muted-foreground/60" />}
    </>
  );
  const cls = "flex min-h-11 w-full items-center gap-3 px-4 py-2.5 text-left active:bg-muted";
  if (href) return <a href={href} target="_blank" rel="noreferrer" className={cls}>{inner}</a>;
  return <button onClick={onClick} className={cls}>{inner}</button>;
}

function SearchField({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <label className="mx-4 mb-4 flex h-9 items-center gap-1.5 rounded-[10px] bg-muted px-2.5 text-muted-foreground">
      <Search size={16} /><input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} aria-label={placeholder} className="w-full bg-transparent text-[17px] text-foreground outline-none placeholder:text-muted-foreground" />
    </label>
  );
}

/* ---------- Notes ---------- */
export function IOSNotes({ onHome, payload }: { onHome: () => void; payload?: string | undefined }) {
  const [list, setList] = useState<Note[]>(seedNotes);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<string | null>(payload ?? null);
  useEffect(() => { try { const r = localStorage.getItem("mahin-os-notes"); if (r) setList(JSON.parse(r)); } catch { /* ignore */ } }, []);
  const filtered = list.filter((n) => `${n.title} ${n.body}`.toLowerCase().includes(q.toLowerCase()));
  const cur = list.find((n) => n.id === sel);
  if (cur) return (
    <IOSPage title="" backLabel="Notes" onBack={() => setSel(null)} large={false}>
      <p className="pt-2 text-center text-[13px] text-muted-foreground">{cur.date}</p>
      <div className="px-5 pt-2"><Render body={cur.body} /></div>
    </IOSPage>
  );
  return (
    <IOSPage title="Notes" backLabel="Home" onBack={onHome}>
      <SearchField value={q} onChange={setQ} placeholder="Search" />
      <Group header="Mahin's notes" footer={`${filtered.length} notes`}>
        {filtered.map((n) => <Row key={n.id} title={n.title} sub={`${n.date}  ${n.body.replace(/^#+\s*|\n#*\s*-?\s*/gm, " ").trim().slice(0, 70)}`} onClick={() => setSel(n.id)} />)}
        {!filtered.length && <p className="px-4 py-3 text-[15px] text-muted-foreground">No results</p>}
      </Group>
    </IOSPage>
  );
}

/* ---------- Photos / Awards / Brands ---------- */
const cardAlbums: ProjectCategory[] = ["Agency Work", "Case Competitions"];
function ProjectDetail({ p, back, onBack }: { p: Project; back: string; onBack: () => void }) {
  return (
    <IOSPage title="" backLabel={back} onBack={onBack} large={false}>
      <div className="aspect-[4/3] w-full"><MediaPlaceholder seed={hash(p.id)} src={p.images[0]} alt={p.title} label="Media coming soon" /></div>
      <div className="px-4 pt-4">
        <div className="flex flex-wrap gap-1.5">{p.badge && <Badge tone={p.badge === "Champion" ? "gold" : p.badge === "Current work" ? "success" : "default"}>{p.badge}</Badge>}<Badge>{p.subtitle}</Badge></div>
        <h2 className="mt-2 text-[28px] font-bold leading-tight tracking-tight">{p.title}</h2>
      </div>
      <div className="mt-4">
        <Group>
          {[["Role", p.role], ["Challenge", p.challenge], ["Contribution", p.contribution], ["Outcome", p.outcome]].map(([k, v]) => (
            <div key={k} className="px-4 py-3"><p className="text-[13px] text-muted-foreground">{k}</p><p className="text-[16px] leading-snug">{v}</p></div>))}
        </Group>
        {p.brandRow && <Group><div className="px-4 py-3"><p className="text-[13px] text-muted-foreground">{p.brandRow.label}</p><div className="mt-2 flex flex-wrap gap-1.5">{p.brandRow.names.map((n) => <span key={n} className="rounded-md bg-secondary px-2 py-1 text-[13px] font-semibold">{n}</span>)}</div></div></Group>}
        {p.link && <Group><Row title={p.linkLabel ?? "View on Behance"} href={p.link} chevron={false} right={<ExternalLink size={16} className="text-primary" />} /></Group>}
      </div>
    </IOSPage>
  );
}

export function IOSPhotos({ onHome, initial, initialPid, title = "Photos" }: { onHome: () => void; initial?: ProjectCategory | undefined; initialPid?: string | undefined; title?: string }) {
  const [album, setAlbum] = useState<ProjectCategory | null>(initial ?? null);
  const [pid, setPid] = useState<string | null>(initialPid ?? null);
  const items = useMemo(() => (album ? projects.filter((p) => p.categories.includes(album)) : []), [album]);
  const p = projects.find((x) => x.id === pid);
  if (p) return <ProjectDetail p={p} back={initial ? title : album ?? title} onBack={() => (album ? setPid(null) : onHome())} />;
  if (album) {
    const cards = cardAlbums.includes(album);
    return (
      <IOSPage title={initial ? title : album} backLabel={initial ? "Home" : "Albums"} onBack={() => (initial ? onHome() : setAlbum(null))}>
        {album === "Agency Work" && <p className="mx-4 mb-4 rounded-xl bg-accent p-3 text-[14px] leading-snug text-accent-foreground">I currently run an agency. One of our current workstreams is producing AI-generated content for Lux, Lifebuoy and Dove. Media coming soon.</p>}
        {cards ? (
          <div className="grid grid-cols-1 gap-3 px-4">
            {items.map((x) => (
              <button key={x.id} onClick={() => setPid(x.id)} className="flex overflow-hidden rounded-2xl bg-card text-left shadow-soft active:scale-[0.98]">
                <div className="w-28 shrink-0"><MediaPlaceholder seed={hash(x.id)} src={x.images[0]} label="Media soon" /></div>
                <div className="min-w-0 flex-1 p-3">
                  {x.badge && <Badge tone={x.badge === "Champion" ? "gold" : x.badge === "Current work" ? "success" : "default"}>{x.badge === "Champion" && <Star size={10} className="mr-1" />}{x.badge}</Badge>}
                  <p className="mt-1 text-[16px] font-semibold leading-snug">{x.title.replace(/ — .*$/, "")}</p>
                  <p className="text-[13px] text-muted-foreground">{x.subtitle}</p>
                  <p className="mt-1 line-clamp-2 text-[13px]">{x.challenge}</p>
                </div>
              </button>))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-0.5">
            {items.map((x) => (
              <button key={x.id} onClick={() => setPid(x.id)} className="relative aspect-square overflow-hidden" aria-label={x.title}>
                <MediaPlaceholder seed={hash(x.id)} src={x.images[0]} label="Soon" />
                <span className="absolute inset-x-0 bottom-0 truncate bg-chrome px-1.5 py-1 text-[10px] font-semibold text-chrome-foreground">{x.title}</span>
              </button>))}
          </div>
        )}
        <p className="pt-4 text-center text-[13px] text-muted-foreground">{items.length} items · media coming soon</p>
      </IOSPage>
    );
  }
  return (
    <IOSPage title="Albums" backLabel="Home" onBack={onHome}>
      <div className="grid grid-cols-2 gap-x-3 gap-y-4 px-4">
        {projectCategories.map((c) => {
          const n = projects.filter((x) => x.categories.includes(c)).length;
          return (
            <button key={c} onClick={() => setAlbum(c)} className="text-left active:opacity-70">
              <div className="aspect-square overflow-hidden rounded-xl"><MediaPlaceholder seed={hash(c)} label="Media coming soon" /></div>
              <p className="mt-1.5 text-[15px] font-medium leading-tight">{c}</p><p className="text-[13px] text-muted-foreground">{n}</p>
            </button>);
        })}
      </div>
    </IOSPage>
  );
}

/* ---------- Files ---------- */
export function IOSFiles({ onHome }: { onHome: () => void }) {
  const os = useOS();
  const [dir, setDir] = useState<string | null>(null);
  const dirs: { key: string; items: { name: string; sub: string; open: [AppId, string?] }[] }[] = [
    { key: "Experience", items: experience.map((e) => ({ name: `${e.role} — ${e.org}`, sub: `${e.period} · ${e.type}`, open: ["notes", "experience"] })) },
    { key: "Projects", items: projects.filter((p) => !p.id.startsWith("award-") && !p.id.startsWith("bh-")).map((p) => ({ name: p.title, sub: p.subtitle, open: ["photos", p.id] })) },
    { key: "Brand Campaigns", items: [...agencyBrands.map((b) => ({ name: `${b.brand} — agency workstream`, sub: "Current agency work", open: ["brands"] as [AppId] })), ...behanceWorks.map((w) => ({ name: w.title, sub: `${w.type} · Behance`, open: ["photos", "cat:Brand Design"] as [AppId, string] }))] },
    { key: "Competitions/Awards", items: awards.map((a) => ({ name: `${a.title} — ${a.rank}`, sub: a.organizer, open: ["awards"] })) },
    { key: "About", items: seedNotes.map((n) => ({ name: `${n.title}.txt`, sub: n.date, open: ["notes", n.id] })) },
  ];
  const cur = dirs.find((d) => d.key === dir);
  const fi = <Folder size={28} className="fill-primary/25 text-primary" />;
  if (cur) return (
    <IOSPage title={cur.key} backLabel="Browse" onBack={() => setDir(null)}>
      <Group footer={`${cur.items.length} items`}>{cur.items.map((it) => <Row key={it.name} title={it.name} sub={it.sub} onClick={() => os.open(...it.open)} />)}</Group>
    </IOSPage>
  );
  return (
    <IOSPage title="Browse" backLabel="Home" onBack={onHome}>
      <Group header="Locations"><Row icon={fi} title="Mahin's Portfolio" sub={`${dirs.reduce((a, d) => a + d.items.length, 0)} items`} chevron={false} /></Group>
      <Group header="Folders">{dirs.map((d) => <Row key={d.key} icon={fi} title={d.key} value={String(d.items.length)} onClick={() => setDir(d.key)} />)}</Group>
    </IOSPage>
  );
}

/* ---------- Settings ---------- */
export function IOSSettings({ onHome }: { onHome: () => void }) {
  const { prefs, setPrefs, resetPrefs } = useOS();
  const wps: { id: Wallpaper; name: string }[] = [{ id: "image", name: "Indigo Silk" }, { id: "aurora", name: "Aurora" }, { id: "dusk", name: "Dusk" }, { id: "ocean", name: "Ocean" }];
  return (
    <IOSPage title="Settings" backLabel="Home" onBack={onHome}>
      <Group>
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="grid size-14 place-items-center rounded-full bg-primary text-lg font-bold text-primary-foreground">RM</div>
          <div><p className="text-[20px] font-semibold">{profile.shortName}</p><p className="text-[13px] text-muted-foreground">{profile.headline}</p></div>
        </div>
      </Group>
      <Group header="Appearance">
        {(["light", "dark"] as const).map((t) => <Row key={t} title={t === "light" ? "Light" : "Dark"} chevron={false} onClick={() => setPrefs({ theme: t })} right={prefs.theme === t ? <Check size={18} className="text-primary" /> : undefined} />)}
      </Group>
      <Group header="Wallpaper">
        <div className="grid grid-cols-4 gap-2 p-3">
          {wps.map((w) => (
            <button key={w.id} onClick={() => setPrefs({ wallpaper: w.id })} className={cn("overflow-hidden rounded-lg ring-2", prefs.wallpaper === w.id ? "ring-primary" : "ring-transparent")} aria-label={w.name}>
              {w.id === "image" ? <img src={wallpaper} alt="" className="aspect-[9/16] w-full object-cover" /> : <div className={cn("aspect-[9/16]", `wp-${w.id}`)} />}
            </button>))}
        </div>
      </Group>
      <Group header="Contact">
        <Row title="Email" value="" sub={profile.email} href={`mailto:${profile.email}`} />
        <Row title="LinkedIn" sub="raihan-mahin-150b7123a" href={profile.linkedin} />
        <Row title="Behance" sub="behance.net/raihanmahin" href={profile.behance} />
      </Group>
      <Group header="About" footer="Mahin OS is a portfolio inspired by desktop and phone interfaces. Not affiliated with Apple.">
        <Row title="Name" value={profile.shortName} chevron={false} />
        <Row title="Location" value="Dhaka, BD" chevron={false} />
        <Row title="Reset settings" chevron={false} onClick={resetPrefs} />
      </Group>
    </IOSPage>
  );
}
