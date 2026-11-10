import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { CampaignBrand, CampaignVideo } from "@/data/portfolio";

/** Muted looping preview that plays only while visible, not paused by the parent, and motion is allowed. */
function PreviewVideo({ video, paused }: { video: CampaignVideo; paused: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
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
  const [seen, setSeen] = useState(false);
  useEffect(() => { if (active) setSeen(true); }, [active]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (active) { el.muted = true; void el.play().catch(() => {}); } else el.pause();
  }, [active]);
  return <video ref={ref} src={seen ? video.src : undefined} poster={video.poster} muted loop playsInline autoPlay={active} preload="none" aria-hidden tabIndex={-1} className="pointer-events-none h-full w-full object-cover"/>;
}

/** Brand-grouped campaign previews; one native player with sound opens at a time after a tap. */
export function CampaignMedia({ brands }: { brands: CampaignBrand[] }) {
  const [open, setOpen] = useState<{ brand: string; video: CampaignVideo } | null>(null);
  return <section aria-label="Campaign work" className="space-y-5">
    {brands.map(b => <div key={b.brand}>
      <h3 className="mb-3 text-base font-semibold">{b.brand}</h3>
      <div className="grid grid-cols-2 items-start gap-3">
        {b.videos.map(v => <Button key={v.src} variant="ghost" aria-label={`Play ${b.brand} ${v.title} video`} onClick={() => setOpen({ brand: b.brand, video: v })} className="block h-auto min-w-0 whitespace-normal p-0">
          <span className="relative block overflow-hidden rounded-lg" style={{ aspectRatio: `${v.width} / ${v.height}` }}>
            <PreviewVideo video={v} paused={open !== null}/>
            <span aria-hidden className="absolute bottom-2 right-2 grid size-10 place-items-center rounded-full bg-background/70 text-foreground backdrop-blur"><Play size={18} className="ml-0.5" fill="currentColor"/></span>
          </span>
        </Button>)}
      </div>
      {b.stills?.map(s => <img key={s.src} src={s.src} alt={`${b.brand} ${s.title}`} loading="lazy" width={s.width} height={s.height} className="mt-4 h-auto w-full rounded-lg"/>)}
    </div>)}
    <Dialog open={open !== null} onOpenChange={o => { if (!o) setOpen(null); }}>
      <DialogContent className="photo-story native-dark z-[9500] flex max-h-[92dvh] w-[calc(100vw-24px)] max-w-md flex-col gap-0 overflow-hidden p-0">
        <header className="flex shrink-0 items-center justify-end border-b border-border px-2 py-1"><DialogTitle className="sr-only">{open && `${open.brand} ${open.video.title}`}</DialogTitle><Button variant="ghost" size="icon" aria-label="Close video" onClick={() => setOpen(null)}><X/></Button></header>
        <DialogDescription className="sr-only">Campaign video with playback controls.</DialogDescription>
        {open && <video key={open.video.src} src={open.video.src} poster={open.video.poster} controls playsInline autoPlay preload="metadata" aria-label={`${open.brand} ${open.video.title}`} className="mx-auto max-h-[80dvh] w-auto max-w-full bg-background" style={{ aspectRatio: `${open.video.width} / ${open.video.height}` }}/>}
      </DialogContent>
    </Dialog>
  </section>;
}
