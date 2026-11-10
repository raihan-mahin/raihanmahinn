import { useRef, useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { motivationReels, musicPlaylist, type MotivationReel } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function ReelGallery({ reels = motivationReels }: { reels?: MotivationReel[] }) {
  const [selected, setSelected] = useState<MotivationReel | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [failed, setFailed] = useState<string[]>([]);
  const available = reels.filter(reel => reel.source && reel.sourceVerified === true && !failed.includes(reel.url));
  return <>
    {available.length === 0 ? <p className="text-sm text-muted-foreground">Videos are currently unavailable.</p> :
      <ul aria-label="Reels" className="grid grid-cols-2 gap-3">
        {available.map((reel, index) => <li key={reel.url} className="min-w-0">
          <Button variant="ghost" aria-label={`Open video ${index + 1}`} onClick={event => { opener.current = event.currentTarget; setSelected(reel); }} className="relative block aspect-[4/5] h-auto w-full overflow-hidden rounded-lg border border-border p-0">
            <video src={reel.source} poster={reel.poster} muted playsInline preload="metadata" aria-hidden="true" tabIndex={-1}
              onError={() => setFailed(previous => [...previous, reel.url])} className="pointer-events-none h-full w-full object-cover" />
            <span className="absolute inset-0 flex items-center justify-center"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-island/80 text-foreground"><Play size={24} aria-hidden="true" /></span></span>
          </Button>
        </li>)}
      </ul>}
    <Dialog open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}>
      <DialogContent aria-describedby={undefined} onCloseAutoFocus={event => { event.preventDefault(); opener.current?.focus(); }} className="native-dark w-[calc(100%-2rem)] max-w-3xl rounded-lg p-4 pt-12">
        <DialogTitle className="sr-only">Video player</DialogTitle>
        {selected && <video key={selected.url} src={selected.source} poster={selected.poster} controls playsInline preload="metadata" aria-label="Selected video" className="max-h-[75dvh] w-full bg-island object-contain" />}
      </DialogContent>
    </Dialog>
  </>;
}

export function Music({ mobile = false }: { mobile?: boolean }) {
  return <section aria-label="Music collection" className={cn("native-dark min-w-0 p-5 pb-12", !mobile && "h-full overflow-y-auto overscroll-contain")}>
    <h2 className="text-2xl font-bold leading-tight">Music that push me harder</h2>
    <section aria-label={musicPlaylist.title} className="mt-6">
      <h3 className="mb-3 text-base font-semibold">{musicPlaylist.title}</h3>
      <iframe title={musicPlaylist.title} src={musicPlaylist.embedUrl} loading="lazy" allow="encrypted-media; fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" className="block aspect-video w-full max-w-full rounded-lg border border-border bg-island" />
      <Button variant="link" asChild className="mt-2 h-auto whitespace-normal px-0 py-2 text-sm"><a href={musicPlaylist.url} target="_blank" rel="noopener noreferrer">Open in YouTube Music <ExternalLink size={14} aria-hidden="true" /></a></Button>
    </section>
    <section aria-label="Reels gallery" className="mt-6">
      <h3 className="mb-3 text-base font-semibold">Reels</h3>
      <ReelGallery />
    </section>
  </section>;
}