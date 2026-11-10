import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { APPS, DOCK, type AppId } from "./apps-registry";
import { useOS } from "./store";
import { profile } from "@/data/portfolio";
import { AppIcon } from "./ui";
import { DOCK_GAPS, dockLayout } from "@/lib/dock-layout";

export function Dock() {
  const os = useOS();
  const [mx, setMx] = useState<number | null>(null);
  const [viewport, setViewport] = useState(1280);
  const [bouncing, setBouncing] = useState<AppId | null>(null);
  const bounceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(bounceTimer.current), []);
  useEffect(() => {
    const reset = () => { setViewport(window.innerWidth); setMx(null); };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(any-hover: none), (pointer: coarse)");
    reset();
    window.addEventListener("resize", reset);
    window.addEventListener("blur", reset);
    reduced.addEventListener("change", reset);
    coarse.addEventListener("change", reset);
    return () => {
      window.removeEventListener("resize", reset);
      window.removeEventListener("blur", reset);
      reduced.removeEventListener("change", reset);
      coarse.removeEventListener("change", reset);
    };
  }, []);

  const move = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce), (any-hover: none), (pointer: coarse)").matches) { setMx(null); return; }
    setMx(e.clientX);
  };

  const layout = dockLayout(os.prefs.magnify ? mx : null, viewport);
  const entries: (AppId | "linkedin")[] = DOCK.flatMap(id => id === "trash" ? ["linkedin", id] : [id]);

  const click = (id: AppId) => {
    const isOpen = os.windows.some((w) => w.id === id);
    if (!isOpen && id !== "launchpad") { clearTimeout(bounceTimer.current); setBouncing(id); bounceTimer.current = setTimeout(() => setBouncing(null), 900); }
    os.open(id);
  };

  return (
    <nav aria-label="Dock" className="fixed bottom-2 left-1/2 z-[8000] max-w-[calc(100vw-12px)] -translate-x-1/2">
      <div onPointerMove={move} onPointerLeave={() => setMx(null)} onPointerCancel={() => setMx(null)}
        className="glass dock-gloss shadow-soft flex items-end gap-1 overflow-x-auto rounded-[22px] px-1.5 pb-1 pt-1.5 md:overflow-visible">
        {entries.map((id, index) => {
          const dimensions = { "--dock-size": `${layout.sizes[index]}px`, "--dock-gap": `${DOCK_GAPS[index]}px` } as CSSProperties;
          if (id === "linkedin") return <div key={id} className="dock-item relative mb-1 shrink-0" style={dimensions}>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="Open LinkedIn" className="dock-target group relative block rounded-xl">
              <span aria-hidden className="linkedin-icon dock-linkedin">in</span>
              <span className="dock-tooltip glass-strong">LinkedIn</span>
            </a>
          </div>;
          const isOpen = os.windows.some((w) => w.id === id);
          return (
            <div key={id} style={dimensions} className={cn("dock-item relative flex shrink-0 flex-col items-center", id === "trash" && "dock-trash")}>
              <Button variant="ghost" onClick={() => click(id)} aria-label={`Open ${APPS[id].name}`}
                className="dock-target group relative shrink-0 overflow-visible rounded-xl p-0 hover:bg-transparent [&_svg]:size-full">
                <span aria-hidden className="pointer-events-none block size-full">
                  <span className={cn("block size-full", bouncing === id && "animate-bounce-dock")}><AppIcon id={id} className="size-full" /></span>
                </span>
                <span className="dock-tooltip glass-strong">{APPS[id].name}</span>
              </Button>
              <span className={cn("mt-0.5 size-1 rounded-full", isOpen ? "bg-foreground/70" : "bg-transparent")} />
            </div>
          );
        })}
      </div>
    </nav>
  );
}
