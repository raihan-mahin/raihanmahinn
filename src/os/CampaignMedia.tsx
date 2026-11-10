import { useState } from "react";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { CampaignBrand, CampaignVideo } from "@/data/portfolio";

/** Brand-grouped campaign posters; one native player opens at a time (only after a tap). */
export function CampaignMedia({ brands }: { brands: CampaignBrand[] }) {
  const [open, setOpen] = useState<{ brand: string; video: CampaignVideo } | null>(null);
  return <section aria-label="Campaign work" className="space-y-5">
    {brands.map(b => <div key={b.brand}>
      <h3 className="mb-3 text-base font-semibold">{b.brand}</h3>
      <div className="grid grid-cols-2 items-start gap-3">
        {b.videos.map(v => <Button key={v.src} variant="ghost" aria-label={`Play ${b.brand} ${v.title} video`} onClick={() => setOpen({ brand: b.brand, video: v })} className="h-auto min-w-0 flex-col items-stretch gap-2 whitespace-normal p-0 text-left">
          <span className="relative block overflow-hidden rounded-lg" style={{ aspectRatio: `${v.width} / ${v.height}` }}>
            <img src={v.poster} alt="" loading="lazy" className="h-full w-full object-cover"/>
            <span aria-hidden className="absolute inset-0 grid place-items-center"><span className="grid size-12 place-items-center rounded-full bg-background/70 text-foreground backdrop-blur"><Play className="ml-0.5" fill="currentColor"/></span></span>
          </span>
          <span className="text-sm font-semibold">{v.title}</span>
        </Button>)}
      </div>
      {b.stills?.map(s => <figure key={s.src} className="mt-4"><img src={s.src} alt={`${b.brand} ${s.title}`} loading="lazy" width={s.width} height={s.height} className="h-auto w-full rounded-lg"/><figcaption className="mt-2 text-sm font-semibold">{s.title}</figcaption></figure>)}
    </div>)}
    <Dialog open={open !== null} onOpenChange={o => { if (!o) setOpen(null); }}>
      <DialogContent className="photo-story native-dark z-[9500] flex max-h-[92dvh] w-[calc(100vw-24px)] max-w-md flex-col gap-0 overflow-hidden p-0">
        <header className="flex shrink-0 items-center gap-2 border-b border-border px-4 py-2"><DialogTitle className="min-w-0 flex-1 text-sm">{open && `${open.brand} · ${open.video.title}`}</DialogTitle><Button variant="ghost" size="icon" aria-label="Close video" onClick={() => setOpen(null)}><X/></Button></header>
        <DialogDescription className="sr-only">Campaign video with playback controls.</DialogDescription>
        {open && <video key={open.video.src} src={open.video.src} poster={open.video.poster} controls playsInline autoPlay preload="metadata" aria-label={`${open.brand} ${open.video.title}`} className="mx-auto max-h-[80dvh] w-auto max-w-full bg-background" style={{ aspectRatio: `${open.video.width} / ${open.video.height}` }}/>}
      </DialogContent>
    </Dialog>
  </section>;
}
