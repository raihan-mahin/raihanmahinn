import { useRef } from "react";
import { ExternalLink, Mountain, Orbit, Sparkles, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motivationReels, musicPlaylist, type MotivationReel } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const artwork = [
  { Icon: Mountain, label: "Mountain artwork", tone: "bg-secondary text-gold" },
  { Icon: Orbit, label: "Orbit artwork", tone: "bg-accent text-foreground" },
  { Icon: Waves, label: "Wave artwork", tone: "bg-muted text-success" },
  { Icon: Sparkles, label: "Spark artwork", tone: "bg-card text-gold" },
];

export function ReelGallery({ reels = motivationReels }: { reels?: MotivationReel[] }) {
  const videos = useRef(new Map<string, HTMLVideoElement>());
  return <ul aria-label="Reels" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
    {reels.map((reel, index) => {
      const art = artwork[index % artwork.length];
      if (!art) return null;
      const { Icon } = art;
      const visual = <div role="img" aria-label={art.label} className={cn("flex aspect-[4/5] w-full items-center justify-center rounded-lg border border-border", art.tone)}><Icon size={56} strokeWidth={1} aria-hidden="true" /></div>;
      return <li key={reel.url} className="min-w-0">
        {reel.source ? <video
          ref={node => { if (node) videos.current.set(reel.url, node); else videos.current.delete(reel.url); }}
          src={reel.source} poster={reel.poster} controls playsInline preload="metadata"
          aria-label={`Video with ${art.label.toLowerCase()}`}
          onPlay={event => { for (const video of videos.current.values()) if (video !== event.currentTarget) video.pause(); }}
          className="aspect-[4/5] w-full rounded-lg bg-island object-contain"
        /> : <a href={reel.url} target="_blank" rel="noopener noreferrer" aria-label={`Open original reel — ${art.label.toLowerCase()}`} className="block rounded-lg focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4">{visual}</a>}
        <Button variant="link" asChild className="mt-1 h-auto w-full whitespace-normal px-0 py-2 text-xs">
          <a href={reel.url} target="_blank" rel="noopener noreferrer" aria-label={`Open original reel — ${art.label.toLowerCase()}`}>Open original reel <ExternalLink size={12} aria-hidden="true" /></a>
        </Button>
      </li>;
    })}
  </ul>;
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