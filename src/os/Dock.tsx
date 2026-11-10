import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { APPS, DOCK, type AppId } from "./apps-registry";
import { useOS } from "./store";
import { profile } from "@/data/portfolio";
import { AppIcon } from "./ui";

export function Dock() {
  const os = useOS();
  const [mx, setMx] = useState<number | null>(null);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [bouncing, setBouncing] = useState<AppId | null>(null);
  const bounceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(bounceTimer.current), []);

  const move = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setMx(null); return; }
    setMx(e.clientX);
  };

  const scale = (id: string) => {
    if (!os.prefs.magnify || mx === null) return 1;
    const el = refs.current[id];
    if (!el) return 1;
    const r = el.getBoundingClientRect();
    const d = Math.abs(mx - (r.left + r.width / 2));
    const t = Math.max(0, 1 - d / 160);
    return 1 + (Math.cos((1 - t) * Math.PI) * 0.5 + 0.5) * 0.7 * (t > 0 ? 1 : 0);
  };

  const click = (id: AppId) => {
    const isOpen = os.windows.some((w) => w.id === id);
    if (!isOpen && id !== "launchpad") { clearTimeout(bounceTimer.current); setBouncing(id); bounceTimer.current = setTimeout(() => setBouncing(null), 1200); }
    os.open(id);
  };

  return (
    <nav aria-label="Dock" className="fixed bottom-2 left-1/2 z-[8000] max-w-[calc(100vw-12px)] -translate-x-1/2">
      <div onPointerMove={move} onPointerLeave={() => setMx(null)} onPointerCancel={() => setMx(null)}
        className="glass dock-gloss shadow-soft flex items-end gap-1 overflow-x-auto rounded-[22px] px-1.5 pb-1 pt-1.5 md:overflow-visible">
        {DOCK.map((id) => {
          const s = scale(id);
          const isOpen = os.windows.some((w) => w.id === id);
          return (
            <div key={id} className="flex items-end">
            {id === "trash" && <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="Open LinkedIn" title="LinkedIn" className="mx-1 mb-1"><span className="linkedin-icon !size-12 !text-[32px]">in</span></a>}
            <div className={cn("relative flex shrink-0 flex-col items-center", (id === "trash") && "ml-1 border-l border-foreground/20 pl-2")}>
              <Button variant="ghost" ref={(el) => { refs.current[id] = el; }} onClick={() => click(id)} aria-label={`Open ${APPS[id].name}`}
                className="group relative size-12 shrink-0 overflow-visible rounded-xl p-0 hover:bg-transparent [&_svg]:size-full">
                <span aria-hidden className="dock-magnify pointer-events-none block size-full" style={{ "--dock-scale": s } as CSSProperties}>
                  <span className={cn("block size-full", bouncing === id && "animate-bounce-dock")}><AppIcon id={id} className="size-full" /></span>
                </span>
                <span className="glass-strong pointer-events-none absolute -top-20 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium text-foreground group-hover:block group-focus-visible:block">{APPS[id].name}</span>
              </Button>
              <span className={cn("mt-0.5 size-1 rounded-full", isOpen ? "bg-foreground/70" : "bg-transparent")} />
            </div></div>
          );
        })}
      </div>
    </nav>
  );
}
