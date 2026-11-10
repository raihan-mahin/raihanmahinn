export { IOSNotes } from "./IOSNotes";
export { IOSFiles } from "./IOSFiles";
import { Button } from "@/components/ui/button";
import { ProjectGallery, StoryText } from "../ProjectStory";
import { ProjectCover, coverFrame } from "../ProjectCover";
import { CollectionCover, collectionFrame } from "../CollectionCover";
import { RecruiterContent } from "../RecruiterContent";
import { BrandStrip } from "../BrandLogo";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Search, Folder, Check, ExternalLink, Star, Layers, PanelsTopLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import wallpaper from "@/assets/wallpaper-indigo.jpg";
import { photoRoots, workRoots, workProjects, resolvePhotoCategory, rootIds, albumItems, albumCover, findAlbum, projectById, notes as seedNotes, projects, profile, experience, awards, agencyBrands, behanceWorks, type Note, type ProjectCategory, type Project, type PhotoRoot } from "@/data/portfolio";
import { useOS, type Wallpaper } from "../store";
import { Badge, MediaPlaceholder, hash } from "../ui";
import { Render } from "../apps/Notes";
import type { AppId } from "../apps-registry";
import { SystemSettings } from "../apps/SystemSettings";

/* ---------- iOS page scaffold: blurred nav bar, large title, edge-swipe back ---------- */
export function IOSPage({ title, backLabel, onBack, right, children, large = true, inset = true, photos = false }:
  { title: string; backLabel: string; onBack: () => void; right?: ReactNode; children: ReactNode; large?: boolean; inset?: boolean; photos?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const x0 = useRef<number | null>(null);
  const [dx, setDx] = useState(0);
  return (
    <div className={cn("absolute inset-0 flex flex-col bg-background", dx === 0 && "animate-ios-in")}
      style={{ transform: dx ? `translateX(${dx}px)` : undefined }}
      onTouchStart={(e) => { const t = e.touches[0]; x0.current = t && t.clientX < 28 ? t.clientX : null; }}
      onTouchMove={(e) => { if (x0.current !== null) setDx(Math.max(0, (e.touches[0]?.clientX ?? 0) - x0.current)); }}
      onTouchEnd={() => { if (dx > 90) onBack(); setDx(0); x0.current = null; }}>
      <div className={cn("pt-safe sticky top-0 z-10 transition-colors", scrolled || !large ? "glass-strong border-x-0 border-t-0" : "border-b border-transparent", photos && "photos-header")}>
        <div className="h-11" aria-hidden />
        <div className="relative flex h-11 items-center px-1">
          <button onClick={onBack} className="flex min-h-11 items-center pr-3 text-[17px] text-primary"><ChevronLeft size={28} strokeWidth={2.4} /><span className="-ml-0.5 max-w-28 truncate">{backLabel}</span></button>
          {photos && large ? <div aria-hidden className={cn("pointer-events-none absolute inset-x-24 truncate text-center text-[17px] font-semibold", !scrolled && "opacity-0")}>{title}</div> : <h1 className={cn("pointer-events-none absolute inset-x-24 truncate text-center text-[17px] font-semibold transition-opacity", large && !scrolled ? "opacity-0" : "opacity-100")}>{title}</h1>}
          <div className="ml-auto flex items-center pr-3">{right}</div>
        </div>
      </div>
      <div className={cn("min-h-0 flex-1 overflow-y-auto overscroll-contain", photos && "photos-scroll")} tabIndex={photos ? 0 : undefined} onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 30)}>
        {large && (photos ? <h1 className="px-4 pb-2 pt-1 text-[34px] font-bold leading-tight">{title}</h1> : <h2 className="px-4 pb-2 pt-1 text-[34px] font-bold leading-tight tracking-tight">{title}</h2>)}
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

/* ---------- Photos / Awards / Brands ---------- */
function ProjectDetail({ p, back, onBack }: { p: Project; back: string; onBack: () => void }) {
  return (
    <IOSPage title="" backLabel={back} onBack={onBack} large={false} photos>
      <div className="px-4 pb-12">
        <ProjectGallery project={p}/>
        <div className="mt-4 flex flex-wrap items-center gap-2">{p.badge && <Badge>{p.badge}</Badge>}<span className="text-xs text-muted-foreground">{p.subtitle}</span></div>
        <h2 className="my-2 text-[26px] font-bold leading-tight">{p.title}</h2>
        {p.role && <p className="mb-4 text-sm text-muted-foreground">{p.role}</p>}
        <StoryText project={p}/>
      </div>
    </IOSPage>
  );
}

export function IOSPhotos({ onHome, initial, initialAlbum, initialPid }: { onHome: () => void; initial?: ProjectCategory | undefined; initialAlbum?: string | undefined; initialPid?: string | undefined; title?: string }) {
  const found = initialAlbum ? findAlbum(initialAlbum) : undefined;
  const [root, setRoot] = useState<ProjectCategory | null>(found?.root ?? initial ?? null);
  const [album, setAlbum] = useState<string | null>(found?.album.id ?? null);
  const [pid, setPid] = useState<string | null>(initialPid ?? null);
  const [tab, setTab] = useState<"Library" | "Collections">("Collections");
  const [searching, setSearching] = useState(false);
  const [q, setQ] = useState("");
  const r = photoRoots.find(x => x.id === root);
  const a = r?.albums?.find(x => x.id === album);
  const p = pid ? projectById(pid) : undefined;
  const back = () => { if (searching) { setSearching(false); setQ(""); } else if (pid) setPid(null); else if (album) setAlbum(null); else if (root) setRoot(null); else onHome(); };
  const itemGrid = (items: Project[], countPhotos = false) => <div className="grid grid-cols-2 items-start gap-x-3 gap-y-6">{items.map(x => <Button key={x.id} variant="ghost" className="photos-item h-auto min-w-0 flex-col items-stretch justify-start gap-0 whitespace-normal p-0 text-left" onClick={() => setPid(x.id)}><div className={`${coverFrame(x)} overflow-hidden rounded-[12px]`}><ProjectCover project={x}/></div><p className="mt-2 line-clamp-2 text-[15px] font-semibold leading-snug">{x.title.replace(/ — .*$/, "")}</p><p className="mt-1 text-[13px] text-muted-foreground">{countPhotos ? x.images.length ? `${x.images.length} ${x.images.length === 1 ? "photo" : "photos"} · ${x.badge}` : x.badge : x.subtitle}</p></Button>)}</div>;
  const collections = (entries: { id: string; title: string; ids: string[]; cover?: string | undefined; coverStyle?: PhotoRoot["coverStyle"]; gradient?: PhotoRoot["gradient"] }[], open: (id: string) => void) => <div className="grid grid-cols-2 gap-x-3 gap-y-7">{entries.map(x => {
    return <Button key={x.id} variant="ghost" className="photos-item h-auto min-w-0 flex-col items-stretch justify-start gap-0 whitespace-normal p-0 text-left" onClick={() => open(x.id)}><div className={`${collectionFrame(x)} overflow-hidden rounded-[12px]`}><CollectionCover collection={x}/></div><p className="mt-2 text-[15px] font-semibold leading-snug">{x.title}</p><p className="mt-1 text-[13px] text-muted-foreground">{x.ids.length} {x.ids.length === 1 ? "item" : "items"}</p></Button>;
  })}</div>;
  const source = root === "Awards & Achievements" ? albumItems(r ? rootIds(r) : []) : workProjects;
  const results = source.filter(x => `${x.title} ${x.subtitle} ${x.summary ?? ""}`.toLowerCase().includes(q.toLowerCase()));
  return <div className="native-dark photos-native absolute inset-0">
    {p ? <ProjectDetail p={p} back={a?.title ?? r?.id ?? tab} onBack={back}/> : <IOSPage title={searching ? "Search" : a?.title ?? r?.id ?? tab} backLabel={root ? "Collections" : "Home"} onBack={back} photos>
      <div className="px-4 pb-36">
        {searching ? <><label className="mb-5 flex h-11 items-center gap-2 rounded-lg bg-secondary px-3"><Search size={18}/><input autoFocus aria-label="Search Photos" placeholder={root === "Awards & Achievements" ? "Search awards" : "Search work"} value={q} onChange={e => setQ(e.target.value)} className="min-w-0 flex-1 bg-transparent outline-none" /></label>{itemGrid(results, root === "Awards & Achievements")}{!results.length && <p className="py-10 text-center text-muted-foreground">No results</p>}</> : r ? r.albums && !a ? collections(r.albums, setAlbum) : itemGrid(albumItems(a?.ids ?? rootIds(r)), root === "Awards & Achievements") : tab === "Library" ? itemGrid(workProjects) : <>
          <div className="mb-3 flex items-center justify-between"><h2 className="text-[20px] font-semibold">Projects</h2><Button variant="ghost" className="h-11 px-0 text-primary" onClick={() => { setTab("Library"); setRoot(null); setAlbum(null); }}>See All <ChevronRight size={18}/></Button></div>
          {collections(workRoots.map(x => ({ id: x.id, title: x.id, ids: rootIds(x), cover: x.cover, coverStyle: x.coverStyle, gradient: x.gradient })), id => { setRoot(resolvePhotoCategory(id)); setAlbum(null); })}
          <h3 className="mb-5 mt-12 text-[25px] font-bold leading-tight">Awards & Achievements</h3>
          {itemGrid(albumItems(awards.map(x => `award-${x.id}`)), true)}
        </>}
      </div>
    </IOSPage>}
    {!p && <div className="photos-bottom-bar absolute inset-x-0 z-20 flex items-center justify-between gap-4 px-4"><div role="tablist" aria-label="Photos views" className="photos-toolbar flex rounded-full p-1">{(["Library", "Collections"] as const).map(t => <Button key={t} role="tab" aria-selected={tab === t} variant="ghost" className="photos-tab h-[52px] flex-col gap-0.5 rounded-full px-5 text-[12px]" onClick={() => { setTab(t); setRoot(null); setAlbum(null); setSearching(false); setQ(""); }}>{t === "Library" ? <Layers/> : <PanelsTopLeft/>}{t}</Button>)}</div><Button variant="secondary" className="photos-toolbar size-[52px] shrink-0 rounded-full" aria-label="Search Photos" onClick={() => setSearching(v => !v)}><Search/></Button></div>}
  </div>;
}

/* ---------- Settings ---------- */
export function IOSSettings({ onHome }: { onHome: () => void }) {
  return <SystemSettings mobile onHome={onHome}/>;
}

export function IOSRecruiter({ onHome }: { onHome: () => void }) { return <div className="native-dark absolute inset-0"><IOSPage title="For Recruiters" backLabel="Home" onBack={onHome} large={false} inset={false}><RecruiterContent /></IOSPage></div>; }
