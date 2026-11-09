import { BrandStrip } from "../BrandLogo";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Search, Folder, Check, ExternalLink, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import wallpaper from "@/assets/wallpaper-indigo.jpg";
import { photoRoots, rootIds, albumItems, albumCover, findAlbum, projectById, notes as seedNotes, projects, profile, experience, awards, agencyBrands, behanceWorks, type Note, type ProjectCategory, type Project } from "@/data/portfolio";
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
function ProjectDetail({ p, back, onBack }: { p: Project; back: string; onBack: () => void }) {
  return (
    <IOSPage title="" backLabel={back} onBack={onBack} large={false}>
      <div className="aspect-[4/3] w-full bg-secondary"><MediaPlaceholder seed={hash(p.id)} src={p.images[0]} alt={p.title} className="object-contain" /></div>
      <div className="px-4 pt-4">
        <div className="flex flex-wrap items-center gap-1.5">{p.badge && <Badge tone={p.badge === "Champion" ? "gold" : "default"}>{p.badge}</Badge>}<span className="text-[13px] text-muted-foreground">{p.subtitle}</span></div>
        <h2 className="mt-1.5 text-[26px] font-bold leading-tight tracking-tight">{p.title}</h2>
        {p.role && <p className="text-[15px] text-muted-foreground">{p.role}</p>}
      </div>
      {p.images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none]">
          {p.images.slice(1).map((src, i) => <div key={src} className="aspect-square w-28 shrink-0 overflow-hidden rounded-xl"><MediaPlaceholder seed={hash(p.id) + i + 1} src={src} alt={`${p.title} photo ${i + 2}`} label="Pending" /></div>)}
        </div>
      )}
      <div className="mt-4">
        {p.summary && <Group><p className="px-4 py-3 text-[16px] leading-snug">{p.summary}</p></Group>}
        {p.brandRow && <Group><BrandStrip className="px-4 py-3" label={p.brandRow.label} names={p.brandRow.names} /></Group>}
        {p.link && <Group><Row title={p.linkLabel ?? "View on Behance"} href={p.link} chevron={false} right={<ExternalLink size={16} className="text-primary" />} /></Group>}
      </div>
    </IOSPage>
  );
}

function AlbumGrid({ items, onOpen }: { items: { id: string; title: string; count: number; cover: string | undefined }[]; onOpen: (id: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-4 px-4">
      {items.map((c) => (
        <button key={c.id} onClick={() => onOpen(c.id)} className="text-left active:opacity-70">
          <div className="aspect-square overflow-hidden rounded-xl"><MediaPlaceholder seed={hash(c.id)} src={c.cover} alt={`${c.title} album`} label={c.title} /></div>
          <p className="mt-1.5 text-[15px] font-medium leading-tight">{c.title}</p><p className="text-[13px] text-muted-foreground">{c.count}</p>
        </button>))}
    </div>
  );
}

export function IOSPhotos({ onHome, initial, initialAlbum, initialPid, title = "Photos" }: { onHome: () => void; initial?: ProjectCategory | undefined; initialAlbum?: string | undefined; initialPid?: string | undefined; title?: string }) {
  const found = initialAlbum ? findAlbum(initialAlbum) : undefined;
  const [root, setRoot] = useState<ProjectCategory | null>(found?.root ?? initial ?? null);
  const [album, setAlbum] = useState<string | null>(found?.album.id ?? null);
  const [pid, setPid] = useState<string | null>(initialPid ?? null);
  const entry = initialAlbum ? "album" : initial ? "root" : "home";
  const r = photoRoots.find((x) => x.id === root);
  const a = r?.albums?.find((x) => x.id === album);
  const p = pid ? projectById(pid) : undefined;
  if (p) return <ProjectDetail p={p} back={a?.title ?? r?.id ?? title} onBack={() => (a || r ? setPid(null) : onHome())} />;
  if (r && (a || !r.albums)) {
    const items = albumItems(a ? a.ids : rootIds(r));
    const leaveToHome = entry === "album" || (entry === "root" && !a);
    const awardsList = r.id === "Competitions";
    return (
      <IOSPage title={a ? a.title : entry === "root" ? title : r.id} backLabel={leaveToHome ? "Home" : a ? r.id : "Albums"} onBack={() => (leaveToHome ? onHome() : a ? setAlbum(null) : setRoot(null))}>
        {awardsList ? (
          <Group footer="7 podium finishes + 1 Marico finalist. Award photos pending upload.">
            {items.map((x) => (
              <button key={x.id} onClick={() => setPid(x.id)} className="flex w-full items-center gap-3 px-4 py-2.5 text-left active:bg-accent">
                <div className="size-14 shrink-0 overflow-hidden rounded-lg"><MediaPlaceholder seed={hash(x.id)} src={x.images[0]} label="" /></div>
                <div className="min-w-0 flex-1"><p className="truncate text-[16px] font-semibold">{x.title.replace(/ — .*$/, "")}</p><p className="truncate text-[13px] text-muted-foreground">{x.badge} · {x.subtitle}</p></div>
              </button>))}
          </Group>
        ) : (
          <div className="grid grid-cols-3 gap-0.5">
            {items.map((x) => (
              <button key={x.id} onClick={() => setPid(x.id)} className="relative aspect-square overflow-hidden" aria-label={x.title}>
                <MediaPlaceholder seed={hash(x.id)} src={x.images[0]} label="" />
                {!x.images[0] && <span className="absolute inset-x-0 bottom-0 truncate bg-chrome px-1.5 py-1 text-[10px] font-semibold text-chrome-foreground">{x.title}</span>}
              </button>))}
          </div>
        )}
        <p className="pt-4 text-center text-[13px] text-muted-foreground">{items.length} items</p>
      </IOSPage>
    );
  }
  if (r?.albums) return (
    <IOSPage title={r.id} backLabel={entry === "root" ? "Home" : "Albums"} onBack={() => (entry === "root" ? onHome() : setRoot(null))}>
      <AlbumGrid items={r.albums.map((x) => ({ id: x.id, title: x.title, count: x.ids.length, cover: albumCover(x.ids) }))} onOpen={setAlbum} />
    </IOSPage>
  );
  return (
    <IOSPage title="Albums" backLabel="Home" onBack={onHome}>
      <AlbumGrid items={photoRoots.map((x) => ({ id: x.id, title: x.id, count: rootIds(x).length, cover: x.cover ?? albumCover(rootIds(x)) }))} onOpen={(id) => setRoot(id as ProjectCategory)} />
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
    { key: "Brand Campaigns", items: [...agencyBrands.map((b) => ({ name: `${b.brand} — agency workstream`, sub: "Current agency work", open: ["brands"] as [AppId] })), ...behanceWorks.map((w) => ({ name: w.title, sub: `${w.type} · Behance`, open: ["photos", `bh-${w.id}`] as [AppId, string] }))] },
    { key: "Competitions/Awards", items: awards.map((a) => ({ name: `${a.title} — ${a.rank}`, sub: a.organizer, open: ["awards"] })) },
    { key: "About", items: seedNotes.map((n) => ({ name: `${n.title}.txt`, sub: n.date, open: ["notes", n.id] })) },
  ];
  const cur = dirs.find((d) => d.key === dir);
  const fi = <Folder size={28} className="fill-primary/25 text-primary" />;
  if (cur?.key === "Experience") return (
    <IOSPage title="Experience" backLabel="Browse" onBack={() => setDir(null)}>
      {experience.map((e) => (
        <Group key={e.id}>
          <Row title={`${e.role} — ${e.org}`} sub={`${e.period} · ${e.type}`} onClick={() => os.open("notes", "experience")} />
          {e.clients && <BrandStrip className="px-4 py-3" label={e.id === "bizlearner" ? "Pureit · acquired by A. O. Smith" : e.id === "agency" ? "Current workstream brands" : "Accounts handled"} names={e.clients} />}
        </Group>
      ))}
    </IOSPage>
  );
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
