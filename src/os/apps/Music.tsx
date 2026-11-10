import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motivationReels } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Music({ mobile = false }: { mobile?: boolean }) {
  const [selected, setSelected] = useState(0);
  const reel = motivationReels[selected];
  if (!reel) return null;

  return <section aria-label="Curated reels" className={cn("native-dark min-w-0 p-5 pb-12", !mobile && "h-full overflow-y-auto overscroll-contain")}>
    <h2 className="text-2xl font-bold leading-tight">Things That Push Me Harder</h2>
    <p className="mt-2 text-sm text-muted-foreground">Four reels I come back to when I need a push.</p>
    <ol aria-label="Choose a reel" className="my-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
      {motivationReels.map((item, index) => <li key={item.url}>
        <Button variant={selected === index ? "default" : "secondary"} aria-pressed={selected === index} aria-controls="music-reel-player" onClick={() => setSelected(index)} className="w-full">{item.label}</Button>
      </li>)}
    </ol>
    <div id="music-reel-player" className="mx-auto w-full max-w-[400px]">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold">{reel.label}</h3>
        <Button variant="link" asChild className="h-auto p-0 text-sm"><a href={reel.url} target="_blank" rel="noopener noreferrer">Open on Instagram <ExternalLink size={14} aria-hidden="true" /></a></Button>
      </div>
      <iframe key={reel.embedUrl} title={`${reel.label} — Instagram player`} src={reel.embedUrl} loading="lazy" allow="fullscreen" referrerPolicy="strict-origin-when-cross-origin" className="block h-[620px] w-full max-w-full rounded-lg border border-border bg-card" />
    </div>
  </section>;
}