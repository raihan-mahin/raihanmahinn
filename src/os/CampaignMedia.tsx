import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight, Play, Volume2, VolumeX, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { CampaignBrand, CampaignVideo } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { playCampaignPreview } from "@/lib/campaign-playback";

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type ShelfItem = { key: string; brand: string; title: string; poster: string; width: number; height: number; video?: CampaignVideo };
const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/** Compact 3D cover shelf: adjacent projected faces determine spacing, not viewport edges. */
export function CoverShelf({ items, label, soundPreference }: { items: ShelfItem[]; label: string; soundPreference?: { current: boolean } }) {
  const n = items.length;
  const [open, setOpen] = useState<ShelfItem | null>(null);
  const [pos, setPos] = useState(0);
  const [target, setTarget] = useState(0);
  const [width, setWidth] = useState(360);
  const [muted, setMuted] = useState(soundPreference?.current ?? false);
  const [blocked, setBlocked] = useState(false);
  const preview = useRef<HTMLVideoElement>(null);
  const mutedRef = useRef(soundPreference?.current ?? false);
  const blockedRef = useRef(false);
  const visibleRef = useRef(false);
  const openRef = useRef(false);
  const selectedRef = useRef(0);
  const reportBlocked = useCallback((value: boolean) => { blockedRef.current = value; setBlocked(value); }, []);
  const playSelected = useCallback((index: number, gesture = false) => {
    const el = preview.current, item = items[index];
    if (!el) return;
    el.pause();
    if (!item?.video || openRef.current || reducedMotion() || (!gesture && !visibleRef.current)) return;
    if (el.getAttribute("src") !== item.video.src) { el.src = item.video.src; el.load(); }
    void playCampaignPreview(el, mutedRef.current || (blockedRef.current && !gesture), reportBlocked);
  }, [items, reportBlocked]);
  const shelf = useRef<HTMLDivElement>(null);
  const posRef = useRef(0), targetRef = useRef(0), raf = useRef(0), snapTimer = useRef(0);
  const drag = useRef<{ x: number; y: number; pos: number; t: number; lastX: number; v: number; horizontal: boolean | null } | null>(null);
  const dragged = useRef(false);

  const animate = useCallback(() => {
    cancelAnimationFrame(raf.current);
    if (reducedMotion()) { posRef.current = targetRef.current; setPos(posRef.current); return; }
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(48, now - last) / 16.67; last = now;
      const d = targetRef.current - posRef.current;
      if (Math.abs(d) < 0.001) { posRef.current = targetRef.current; setPos(posRef.current); return; }
      posRef.current += d * (1 - Math.pow(1 - 0.16, dt)); setPos(posRef.current); raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, []);
  const go = useCallback((t: number) => { const c = clamp(Math.round(t), 0, Math.max(0, n - 1)); targetRef.current = c; setTarget(c); selectedRef.current = c; playSelected(c, true); animate(); }, [animate, n, playSelected]);
  useEffect(() => () => { cancelAnimationFrame(raf.current); window.clearTimeout(snapTimer.current); }, []);

  useEffect(() => {
    const el = shelf.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => e && setWidth(e.contentRect.width));
    ro.observe(el);
    const wheel = (e: WheelEvent) => {
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? el.clientWidth : 1;
      const dx = e.deltaX * unit, dy = e.deltaY * unit;
      if (Math.abs(dx) <= Math.abs(dy) || n < 2) return; // vertical scrolling stays with the page
      e.preventDefault(); cancelAnimationFrame(raf.current);
      posRef.current = clamp(posRef.current + dx / 120, -0.3, n - 0.7); setPos(posRef.current);
      window.clearTimeout(snapTimer.current);
      snapTimer.current = window.setTimeout(() => go(posRef.current), 120);
    };
    el.addEventListener("wheel", wheel, { passive: false });
    return () => { ro.disconnect(); el.removeEventListener("wheel", wheel); };
  }, [go, n]);

  useEffect(() => {
    const el = shelf.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      visibleRef.current = !!entry?.isIntersecting;
      if (visibleRef.current) playSelected(selectedRef.current); else preview.current?.pause();
    }, { threshold: 0.15 });
    io.observe(el);
    return () => { io.disconnect(); preview.current?.pause(); };
  }, [playSelected]);
  useEffect(() => {
    openRef.current = open !== null;
    if (open) preview.current?.pause(); else playSelected(selectedRef.current);
  }, [open, playSelected]);
  const toggleSound = () => {
    const next = blockedRef.current ? false : !mutedRef.current;
    if (soundPreference) soundPreference.current = next;
    mutedRef.current = next; setMuted(next);
    if (next) { reportBlocked(false); if (preview.current) preview.current.muted = true; }
    else playSelected(selectedRef.current, true);
  };

  const active = clamp(target, 0, Math.max(0, n - 1));
  const current = items[active];
  const scrollHeight = shelf.current?.closest(".overflow-auto")?.clientHeight;
  const H = Math.round(clamp(Math.min(width * 0.9, (typeof window === "undefined" ? 900 : window.innerHeight) * 0.5, scrollHeight ? scrollHeight - 200 : 440), 240, 440));
  const maxW = Math.min(H, width * (width < 450 ? 0.36 : 0.46));
  const low = clamp(Math.floor(pos), 0, n - 1), high = clamp(low + 1, 0, n - 1);
  const nativeWidth = (index: number) => { const item = items[index]; return item ? Math.min(H * item.width / item.height, maxW) : 0; };
  const centerWidth = nativeWidth(low) + (nativeWidth(high) - nativeWidth(low)) * clamp(pos - low, 0, 1);
  const nativeHeight = (index: number) => { const item = items[index]; return item ? nativeWidth(index) * item.height / item.width : 0; };
  const centerHeight = nativeHeight(low) + (nativeHeight(high) - nativeHeight(low)) * clamp(pos - low, 0, 1);
  const extent = Math.max(0, width / 2 - (width < 450 ? 12 : 24));
  const gap = clamp(width * 0.015, 6, 12);
  const faces = items.map((it, i) => {
    const r = i - pos, d = Math.abs(r), side = Math.sign(r);
    const o = smooth(Math.max(0, 1 - d));
    const native = nativeWidth(i);
    const base = Math.min(native, centerWidth, centerHeight * it.width / it.height) * (1 - o) + native * o;
    const scale = o + (1 - o) * clamp(0.8 - 0.12 * Math.max(0, d - 1), 0.48, 0.8);
    const w = base * scale, h = w * it.height / it.width;
    const slice = 3;
    const turn = -side * (22 + Math.min(8, Math.max(0, d - 1) * 4)) * (1 - o);
    // Include shallow depth/perspective in the packing width; posters keep their full native ratio.
    const z = -Math.min(12, d * 4);
    const projected = w * Math.cos(turn * Math.PI / 180) * (width * 2 / (width * 2 - z));
    return { it, i, r, d, o, w, h, slice, turn, z, projected };
  });
  const positions: number[] = [];
  faces.forEach((g, i) => { positions[i] = i === 0 ? 0 : (positions[i - 1] ?? 0) + ((faces[i - 1]?.projected ?? 0) + g.projected) / 2 + gap; });
  const anchor = (positions[low] ?? 0) + ((positions[high] ?? 0) - (positions[low] ?? 0)) * clamp(pos - low, 0, 1);
  const geo = faces.map(g => ({ ...g, x: (positions[g.i] ?? 0) - anchor }));
  const centerGeometry = geo[active];

  const onDown = (e: PointerEvent) => { if (e.button > 0) return; dragged.current = false; drag.current = { x: e.clientX, y: e.clientY, pos: posRef.current, t: performance.now(), lastX: e.clientX, v: 0, horizontal: null }; };
  const onMove = (e: PointerEvent) => {
    const d = drag.current; if (!d) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (d.horizontal === null && Math.hypot(dx, dy) > 6) { d.horizontal = Math.abs(dx) > Math.abs(dy); if (d.horizontal) shelf.current?.setPointerCapture(e.pointerId); }
    if (!d.horizontal) return;
    dragged.current = true; cancelAnimationFrame(raf.current);
    const now = performance.now(); d.v = 0.7 * d.v + 0.3 * ((e.clientX - d.lastX) / Math.max(1, now - d.t)); d.t = now; d.lastX = e.clientX;
    let p = d.pos - dx / 90; if (p < 0) p *= 0.35; if (p > n - 1) p = n - 1 + (p - n + 1) * 0.35;
    posRef.current = p; setPos(p);
  };
  const onUp = () => { const d = drag.current; drag.current = null; if (d?.horizontal) go(posRef.current - d.v * 1.2); };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(targetRef.current + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(targetRef.current - 1); }
    if (e.key === "Home") { e.preventDefault(); go(0); }
    if (e.key === "End") { e.preventDefault(); go(n - 1); }
  };
  const press = (i: number) => { if (dragged.current) return; if (i === active && Math.abs(pos - target) < 0.3) { openRef.current = true; preview.current?.pause(); setOpen(items[i] ?? null); } else go(i); };

  if (!n) return null;
  return <div className="space-y-3">
    <div ref={shelf} role="group" aria-roledescription="carousel" aria-label={`${label} campaign shelf. Use left and right arrow keys to browse.`} onKeyDown={onKey}
      onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onClickCapture={e => { if (dragged.current) { e.stopPropagation(); e.preventDefault(); dragged.current = false; } }}
      className="relative select-none overflow-hidden" style={{ height: H + 20, perspective: `${Math.round(width * 2)}px`, touchAction: "pan-y" }}>
      {geo.map(g => {
        const x = g.x, isCenter = g.i === active, side = Math.sign(g.r) || 1;
        const hidden = Math.abs(x) + g.projected / 2 > extent && g.d >= 1;
        const shade = 1 - (1 - g.o) * clamp(0.3 + 0.08 * g.d, 0, 0.7);
        return <button key={g.it.key} type="button" tabIndex={isCenter ? 0 : -1} aria-hidden={hidden || undefined}
          aria-label={isCenter ? `${g.it.video ? "Play" : "View"} ${g.it.brand} ${g.it.title}${g.it.video ? " video with sound" : " image"}` : `Show ${g.it.brand} ${g.it.title}`}
          onClick={() => press(g.i)} draggable={false} className="absolute left-1/2 top-1/2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{ width: g.w, height: g.h, marginLeft: -g.w / 2, marginTop: -g.h / 2, opacity: hidden ? 0 : 1, pointerEvents: hidden ? "none" : undefined, zIndex: Math.round(100 - g.d * 10), willChange: "transform",
            transformStyle: "preserve-3d", transform: `translateX(${x}px) translateY(0px) translateZ(${g.z}px) rotateY(${g.turn}deg)` }}>
          <span className="absolute inset-0 overflow-hidden rounded-md bg-secondary shadow-xl" style={{ transform: `translateZ(${g.slice / 2}px)`, backfaceVisibility: "hidden", filter: `brightness(${shade})` }}>
            <img src={g.it.poster} alt="" draggable={false} className="block h-full w-full"/>
            {isCenter && g.o > 0.9 && g.it.video && <span aria-hidden className="absolute bottom-2 right-2 grid size-10 place-items-center rounded-full bg-background/70 text-foreground backdrop-blur"><Play size={18} className="ml-0.5" fill="currentColor"/></span>}
          </span>
          <span aria-hidden className="absolute top-0 overflow-hidden rounded-sm" style={{ width: g.slice, height: g.h, left: (g.w - g.slice) / 2, backfaceVisibility: "hidden",
            transform: `rotateY(${side > 0 ? -90 : 90}deg) translateZ(${g.w / 2}px)`, filter: `brightness(${shade})`,
            backgroundImage: `linear-gradient(90deg, rgb(0 0 0 / .35), rgb(255 255 255 / .1) 50%, rgb(0 0 0 / .3)), url(${g.it.poster})`, backgroundSize: "auto, cover", backgroundPosition: `center, ${side > 0 ? "left" : "right"} center` }}/>
        </button>;
      })}
      <video ref={preview} poster={current?.poster} loop playsInline preload="none" aria-hidden tabIndex={-1}
        className="pointer-events-none absolute left-1/2 top-1/2 rounded-md"
        style={{ width: centerGeometry?.w, height: centerGeometry?.h, marginLeft: -(centerGeometry?.w ?? 0) / 2, marginTop: -(centerGeometry?.h ?? 0) / 2,
          visibility: current?.video && (centerGeometry?.o ?? 0) > 0.98 ? "visible" : "hidden", zIndex: 101 }}/>
      {current?.video && (centerGeometry?.o ?? 0) > 0.98 && <span aria-hidden className="pointer-events-none absolute grid size-10 place-items-center rounded-full bg-background/70 text-foreground backdrop-blur"
        style={{ left: width / 2 + (centerGeometry?.w ?? 0) / 2 - 48, top: (H + 20) / 2 + (centerGeometry?.h ?? 0) / 2 - 48, zIndex: 102 }}><Play size={18} fill="currentColor"/></span>}
    </div>
    <div className="flex items-center justify-between gap-2">
      <Button variant="secondary" size="icon" aria-label="Previous" disabled={active === 0} onClick={() => go(targetRef.current - 1)}><ChevronLeft/></Button>
      <p aria-live="polite" className="text-sm text-muted-foreground">{active + 1} / {n}</p>
      <div className="flex gap-2">
        {current?.video && <Button variant="ghost" size={blocked ? "sm" : "icon"} aria-pressed={!muted && !blocked} aria-label={blocked || muted ? "Enable sound" : "Mute preview"} onClick={toggleSound}>{blocked || muted ? <VolumeX/> : <Volume2/>}{blocked && <span className="text-xs">Enable sound</span>}</Button>}
        <Button variant="secondary" size="icon" aria-label="Next" disabled={active === n - 1} onClick={() => go(targetRef.current + 1)}><ChevronRight/></Button>
      </div>
    </div>
    <Dialog open={open !== null} onOpenChange={o => { if (!o) setOpen(null); }}>
      <DialogContent className="photo-story native-dark z-[9500] flex max-h-[92dvh] w-[calc(100vw-24px)] max-w-md flex-col gap-0 overflow-hidden p-0" onCloseAutoFocus={e => { e.preventDefault(); shelf.current?.querySelector<HTMLElement>('button[tabindex="0"]')?.focus(); }}>
        <header className="flex shrink-0 items-center justify-end border-b border-border px-2 py-1"><DialogTitle className="sr-only">{open && `${open.brand} ${open.title}`}</DialogTitle><Button variant="ghost" size="icon" aria-label="Close video" onClick={() => setOpen(null)}><X/></Button></header>
        <DialogDescription className="sr-only">{open?.video ? "Campaign video with sound and playback controls." : "Campaign image."}</DialogDescription>
        {open?.video ? <video key={open.key} src={open.video.src} poster={open.poster} controls playsInline autoPlay preload="metadata" aria-label={`${open.brand} ${open.title}`} className="mx-auto max-h-[80dvh] w-auto max-w-full bg-background" style={{ aspectRatio: `${open.width} / ${open.height}` }}/>
          : open && <img src={open.poster} alt={`${open.brand} ${open.title}`} className="mx-auto max-h-[80dvh] w-auto max-w-full" style={{ aspectRatio: `${open.width} / ${open.height}` }}/>}
      </DialogContent>
    </Dialog>
  </div>;
}

const itemsFor = (b: CampaignBrand): ShelfItem[] => [
  ...b.videos.map(v => ({ key: v.src, brand: b.brand, title: v.title, poster: v.poster, width: v.width, height: v.height, video: v })),
  ...(b.stills ?? []).map(s => ({ key: s.src, brand: b.brand, title: s.title, poster: s.src, width: s.width, height: s.height })),
];

/** Brand tabs over one shelf; brands without uploaded media show an honest empty state. */
export function CampaignMedia({ brands, extraBrands = [], intro }: { brands: CampaignBrand[]; extraBrands?: string[]; intro?: string }) {
  const soundPreference = useRef(false);
  const names = [...brands.map(b => b.brand), ...extraBrands.filter(x => !brands.some(b => b.brand === x))];
  const [tab, setTab] = useState(names[0] ?? "");
  const brand = brands.find(b => b.brand === tab);
  const items = brand ? itemsFor(brand) : [];
  return <section aria-label="Campaign work" className="space-y-4">
    <div role="tablist" aria-label="Brands" className="flex gap-1 rounded-full bg-secondary p-1">
      {names.map(name => <button key={name} role="tab" type="button" aria-selected={tab === name} onClick={() => setTab(name)}
        className={cn("h-9 flex-1 rounded-full text-sm font-medium transition-colors", tab === name ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>{name}</button>)}
    </div>
    {intro && <p className="text-sm text-muted-foreground">{intro}</p>}
    <div role="tabpanel" aria-label={tab}>
      {items.length ? <CoverShelf key={tab} items={items} label={tab} soundPreference={soundPreference}/> : <p className="rounded-lg border border-border py-10 text-center text-sm text-muted-foreground">No {tab} work uploaded yet.</p>}
    </div>
  </section>;
}
