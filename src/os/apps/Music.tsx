import { useEffect, useRef, useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { motivationReels, musicPlaylist, type MotivationReel } from "@/data/portfolio";
import { cn } from "@/lib/utils";

// Public embed media bounds checked at 400px: 54px header, then the full media.
// No iframe DOM access: all framing is outside Instagram's cross-origin document.
const publicFrames: Record<string, "landscape" | "portrait"> = {
  DeMQdiPDrIT: "landscape", DfUDCG9Nc5a: "portrait",
};

export function InstagramPlayer({ reel }: { reel: MotivationReel }) {
  const container = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const [fallback, setFallback] = useState(false);
  const id = new URL(reel.url).pathname.split("/")[2] ?? "";
  const frame = publicFrames[id];
  useEffect(() => {
    const node = container.current;
    if (!node) return;
    const observer = new ResizeObserver(entries => setWidth(entries[0]?.contentRect.width ?? 0));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div className="space-y-3">
    {!frame || fallback ? <p className="text-sm text-muted-foreground">Public playback is unavailable. Open the original reel on Instagram.</p> : <>
      <div ref={container} className={cn("relative overflow-hidden rounded-lg bg-island", frame === "landscape" ? "aspect-video" : "aspect-[4/5]")}>
        {width > 0 && <iframe title="Instagram reel player" src={`${reel.url}embed/`} allow="encrypted-media; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" onError={() => setFallback(true)}
          className="absolute left-0 border-0" style={{ width: 400, height: 1000, top: -54 * width / 400, transform: `scale(${width / 400})`, transformOrigin: "top left" }} />}
      </div>
      <p className="text-xs text-muted-foreground">If playback is blocked or asks you to log in, open the original reel.</p>
      <Button variant="link" onClick={() => setFallback(true)} className="flex h-auto px-0 py-1 text-xs">Player not working?</Button>
    </>}
    <Button variant="link" asChild className="h-auto whitespace-normal px-0 py-2 text-sm"><a href={reel.url} target="_blank" rel="noopener noreferrer">Open original reel <ExternalLink size={14} aria-hidden="true" /></a></Button>
  </div>;
}

export function ReelGallery({ reels = motivationReels }: { reels?: MotivationReel[] }) {
  const [selected, setSelected] = useState<MotivationReel | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [failed, setFailed] = useState<string[]>([]);
  const native = (reel: MotivationReel) => reel.source && reel.sourceVerified === true && !failed.includes(reel.url);
  return <>
    {reels.length === 0 ? <p className="text-sm text-muted-foreground">Videos are currently unavailable.</p> :
      <ul aria-label="Reels" className="grid grid-cols-2 gap-3">
        {reels.map((reel, index) => <li key={reel.url} className="min-w-0">
          <Button variant="ghost" aria-label={`Open video ${index + 1}`} onClick={event => { opener.current = event.currentTarget; setSelected(reel); }} className="relative block aspect-[4/5] h-auto w-full overflow-hidden rounded-lg border border-border p-0">
            {native(reel) ? <><video src={reel.source} poster={reel.poster} muted playsInline preload="metadata" aria-hidden="true" tabIndex={-1}
              onError={() => setFailed(previous => [...previous, reel.url])} className="pointer-events-none h-full w-full object-cover" />
            <span className="absolute inset-0 flex items-center justify-center"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-island/80 text-foreground"><Play size={24} aria-hidden="true" /></span></span></> : <span className="flex h-full flex-col items-center justify-center gap-2 bg-muted text-foreground"><Play size={24} aria-hidden="true" /><span className="text-sm">Watch</span></span>}
          </Button>
          <Button variant="link" asChild className="h-auto w-full whitespace-normal px-0 py-2 text-xs"><a href={reel.url} target="_blank" rel="noopener noreferrer" aria-label={`Open original reel ${index + 1}`}>Original reel <ExternalLink size={12} aria-hidden="true" /></a></Button>
        </li>)}
      </ul>}
    <Dialog open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}>
      <DialogContent aria-describedby={undefined} onCloseAutoFocus={event => { event.preventDefault(); opener.current?.focus(); }} className="native-dark max-h-[90dvh] w-[calc(100%-2rem)] max-w-[440px] overflow-y-auto rounded-lg p-4 pt-12">
        <DialogTitle className="sr-only">Video player</DialogTitle>
        {selected && (native(selected) ? <video key={selected.url} src={selected.source} poster={selected.poster} controls playsInline preload="metadata" aria-label="Selected video" onError={() => setFailed(previous => [...previous, selected.url])} className="max-h-[75dvh] w-full bg-island object-contain" /> : <InstagramPlayer key={selected.url} reel={selected} />)}
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