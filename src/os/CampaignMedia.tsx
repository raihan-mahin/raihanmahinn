import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { CampaignBrand, CampaignVideo } from "@/data/portfolio";

/** Muted looping preview that plays only while visible, not paused by the parent, and motion is allowed. */
function PreviewVideo({ video, paused }: { video: CampaignVideo; paused: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setVisible(true); return () => mq.removeEventListener("change", on); }
    const io = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => { io.disconnect(); mq.removeEventListener("change", on); };
  }, []);
  const active = visible && !paused && !reduced;
  useEffect(() => { if (active) setSeen(true); }, [active]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (active) { el.muted = true; void el.play().catch(() => {}); } else el.pause();
  }, [active, seen]);
  return <video ref={ref} src={seen ? video.src : undefined} poster={video.poster} muted loop playsInline preload="none" aria-hidden tabIndex={-1} className="pointer-events-none block h-full w-full"/>;
}

type ShelfItem = { key: string; brand: string; title: string; poster: string; width: number; height: number; video?: CampaignVideo };
const SPINE = 22, GAP = 6;
const smooth = (t: number) => t * t * (3 - 2 * t);

/** Campaign media as a 3D cover shelf; centred cover previews silently, tap it to open with sound. */
export function CampaignMedia({ brands }: { brands: CampaignBrand[] }) {
  const items: ShelfItem[] = brands.flatMap(b => [
    ...b.videos.map(v => ({ key: v.src, brand: b.brand, title: v.title, poster: v.poster, width: v.width, height: v.height, video: v })),
    ...(b.stills ?? []).map(s => ({ key: s.src, brand: b.brand, title: s.title, poster: s.src, width: s.width, height: s.height })),
  ]);
  const n = items.length;
  const [open, setOpen] = useState<ShelfItem | null>(null);
  const [pos, setPos] = useState(0);
  const [target, setTarget] = useState(0);
  const [width, setWidth] = useState(360);
  const shelf = useRef<HTMLDivElement>(null);
  const posRef = useRef(0), targetRef = useRef(0), raf = useRef(0);
  const drag = useRef<{ x: number; y: number; pos: number; moved: boolean; horizontal: boolean | null } | null>(null);
  const suppressClick = useRef(false);
  const opener = useRef<HTMLElement | null>(null);

  const animate = useCallback(() => {
    cancelAnimationFrame(raf.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { posRef.current = targetRef.current; setPos(posRef.current); return; }
    const tick = () => {
      const d = targetRef.current - posRef.current;
      if (Math.abs(d) < 0.002) { posRef.current = targetRef.current; setPos(posRef.current); return; }
      posRef.current += d * 0.14; setPos(posRef.current); raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, []);
  const go = useCallback((t: number) => { targetRef.current = t; setTarget(t); animate(); }, [animate]);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  useEffect(() => {
    const el = shelf.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => e && setWidth(e.contentRect.width));
    ro.observe(el);
    let acc = 0, timer = 0;
    const wheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // leave vertical scrolling alone
      e.preventDefault(); acc += e.deltaX;
      window.clearTimeout(timer); timer = window.setTimeout(() => { acc = 0; }, 160);
      if (Math.abs(acc) > 40) { go(targetRef.current + Math.sign(acc)); acc = 0; }
    };
    el.addEventListener("wheel", wheel, { passive: false });
    return () => { ro.disconnect(); el.removeEventListener("wheel", wheel); };
  }, [go]);

  const active = ((Math.round(target) % n) + n) % n;
  const current = items[active];
  const H = Math.min(420, Math.max(220, width * 0.95));
  const maxW = width - 5 * (SPINE + GAP) - 8;
  const geo = items.map((it, i) => {
    let r = (i - pos) % n; if (r < -n / 2) r += n; if (r >= n / 2) r -= n;
    const w = Math.min(H * it.width / it.height, maxW), h = w * it.height / it.width;
    const o = smooth(Math.max(0, 1 - Math.abs(r)));
    return { it, i, r, w, h, o, vis: SPINE + (w - SPINE) * o };
  });
  const order = [...geo].sort((a, b) => a.r - b.r);
  let c = 0; const centers = order.map((g, k) => { if (k) c += order[k - 1]!.vis / 2 + GAP + g.vis / 2; return c; });
  let anchor = centers[0]!;
  for (let k = 0; k < order.length - 1; k++) if (order[k]!.r <= 0 && order[k + 1]!.r > 0) anchor = centers[k]! + (centers[k + 1]! - centers[k]!) * (-order[k]!.r) / (order[k + 1]!.r - order[k]!.r);
  const xOf = new Map(order.map((g, k) => [g.i, centers[k]! - anchor]));

  const onDown = (e: PointerEvent) => { drag.current = { x: e.clientX, y: e.clientY, pos: posRef.current, moved: false, horizontal: null }; };
  const onMove = (e: PointerEvent) => {
    const d = drag.current; if (!d) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (d.horizontal === null && Math.hypot(dx, dy) > 6) { d.horizontal = Math.abs(dx) > Math.abs(dy); if (d.horizontal) shelf.current?.setPointerCapture(e.pointerId); }
    if (!d.horizontal) return;
    d.moved = true; cancelAnimationFrame(raf.current);
    posRef.current = d.pos - dx / (SPINE + GAP + 30); setPos(posRef.current);
  };
  const onUp = () => {
    const d = drag.current; drag.current = null;
    if (d?.moved) { suppressClick.current = true; setTimeout(() => { suppressClick.current = false; }, 0); go(Math.round(posRef.current)); }
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(targetRef.current + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(targetRef.current - 1); }
  };
  const press = (g: (typeof geo)[number]) => {
    if (suppressClick.current) return;
    const rel = Math.round(g.r);
    if (rel === 0 && Math.abs(pos - target) < 0.3) { opener.current = document.activeElement as HTMLElement | null; setOpen(g.it); } else go(targetRef.current + rel);
  };

  return <section aria-label="Campaign work" aria-roledescription="carousel" className="space-y-3">
    <div ref={shelf} role="group" aria-label="Campaign shelf. Use left and right arrow keys to browse." onKeyDown={onKey} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
      className="relative select-none overflow-hidden" style={{ height: H + 24, perspective: `${Math.round(width * 2.2)}px`, touchAction: "pan-y" }}>
      {geo.map(g => {
        const x = xOf.get(g.i) ?? 0, turn = 90 * (1 - g.o), isCenter = g.i === active;
        const hidden = Math.abs(g.r) > n / 2 - 0.6;
        return <button key={g.it.key} type="button" tabIndex={isCenter ? 0 : -1} aria-hidden={hidden || undefined}
          aria-label={isCenter ? `${g.it.video ? "Play" : "View"} ${g.it.brand} ${g.it.title}${g.it.video ? " video" : " image"}` : `Show ${g.it.brand} ${g.it.title}`}
          onClick={() => press(g)} className="absolute bottom-3 left-1/2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{ width: g.w, height: g.h, marginLeft: -g.w / 2, opacity: hidden ? 0 : 1, pointerEvents: hidden ? "none" : undefined, zIndex: Math.round(100 - Math.abs(g.r) * 10),
            transformStyle: "preserve-3d", transform: `translateX(${x}px) translateY(${-g.o * 10}px) translateZ(${g.o * 40 - SPINE / 2}px) rotateY(${turn}deg)` }}>
          <span className="absolute inset-0 overflow-hidden rounded-md bg-secondary shadow-lg" style={{ transform: `translateZ(${SPINE / 2}px)`, backfaceVisibility: "hidden" }}>
            {isCenter && g.it.video ? <PreviewVideo video={g.it.video} paused={open !== null || Math.abs(g.r) > 0.5}/> : <img src={g.it.poster} alt="" draggable={false} loading="lazy" className="block h-full w-full"/>}
            {isCenter && g.o > 0.9 && g.it.video && <span aria-hidden className="absolute bottom-2 right-2 grid size-10 place-items-center rounded-full bg-background/70 text-foreground backdrop-blur"><Play size={18} className="ml-0.5" fill="currentColor"/></span>}
          </span>
          <span aria-hidden className="absolute top-0 overflow-hidden rounded-sm" style={{ width: SPINE, height: g.h, left: (g.w - SPINE) / 2, transform: `rotateY(-90deg) translateZ(${g.w / 2}px)`, backfaceVisibility: "hidden",
            backgroundImage: `linear-gradient(90deg, rgb(0 0 0 / .45), rgb(255 255 255 / .12) 45%, rgb(0 0 0 / .35)), url(${g.it.poster})`, backgroundSize: "auto, cover", backgroundPosition: "center" }}/>
        </button>;
      })}
    </div>
    <div className="flex items-center justify-between gap-3">
      <Button variant="secondary" size="icon" aria-label="Previous" onClick={() => go(targetRef.current - 1)}><ChevronLeft/></Button>
      <p aria-live="polite" className="text-sm font-semibold">{current?.brand} <span className="font-normal text-muted-foreground">· {active + 1} / {n}</span></p>
      <Button variant="secondary" size="icon" aria-label="Next" onClick={() => go(targetRef.current + 1)}><ChevronRight/></Button>
    </div>
    <Dialog open={open !== null} onOpenChange={o => { if (!o) setOpen(null); }}>
      <DialogContent className="photo-story native-dark z-[9500] flex max-h-[92dvh] w-[calc(100vw-24px)] max-w-md flex-col gap-0 overflow-hidden p-0" onCloseAutoFocus={e => { e.preventDefault(); (shelf.current?.querySelector<HTMLElement>('button[tabindex="0"]') ?? opener.current)?.focus(); }}>
        <header className="flex shrink-0 items-center justify-end border-b border-border px-2 py-1"><DialogTitle className="sr-only">{open && `${open.brand} ${open.title}`}</DialogTitle><Button variant="ghost" size="icon" aria-label="Close video" onClick={() => setOpen(null)}><X/></Button></header>
        <DialogDescription className="sr-only">{open?.video ? "Campaign video with playback controls." : "Campaign image."}</DialogDescription>
        {open?.video ? <video key={open.key} src={open.video.src} poster={open.poster} controls playsInline autoPlay preload="metadata" aria-label={`${open.brand} ${open.title}`} className="mx-auto max-h-[80dvh] w-auto max-w-full bg-background" style={{ aspectRatio: `${open.width} / ${open.height}` }}/>
          : open && <img src={open.poster} alt={`${open.brand} ${open.title}`} className="mx-auto max-h-[80dvh] w-auto max-w-full" style={{ aspectRatio: `${open.width} / ${open.height}` }}/>}
      </DialogContent>
    </Dialog>
  </section>;
}
