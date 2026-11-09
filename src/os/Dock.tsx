import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { APPS, DOCK, type AppId } from "./apps-registry";
import { useOS } from "./store";
import { AppIcon } from "./ui";

export function Dock() {
  const os = useOS();
  const [mx, setMx] = useState<number | null>(null);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [bouncing, setBouncing] = useState<AppId | null>(null);
  const base = 48;

  const scale = (id: string) => {
    if (!os.prefs.magnify || mx === null) return 1;
    const el = refs.current[id];
    if (!el) return 1;
    const r = el.getBoundingClientRect();
    const d = Math.abs(mx - (r.left + r.width / 2));
    return 1 + Math.max(0, 1 - d / 140) * 0.6;
  };

  const click = (id: AppId) => {
    const isOpen = os.windows.some((w) => w.id === id);
    if (!isOpen && id !== "launchpad") { setBouncing(id); setTimeout(() => setBouncing(null), 1200); }
    os.open(id);
  };

  return (
    <nav aria-label="Dock" className="fixed bottom-2 left-1/2 z-[8000] max-w-[calc(100vw-12px)] -translate-x-1/2">
      <div onMouseMove={(e) => setMx(e.clientX)} onMouseLeave={() => setMx(null)}
        className="glass shadow-soft flex items-end gap-1.5 overflow-x-auto rounded-2xl px-2 pb-1.5 pt-1.5 md:overflow-visible">
        {DOCK.map((id) => {
          const s = scale(id);
          const isOpen = os.windows.some((w) => w.id === id);
          return (
            <div key={id} className={cn("relative flex shrink-0 flex-col items-center", id === "trash" && "ml-1 border-l border-border pl-2.5")}>
              <button ref={(el) => { refs.current[id] = el; }} onClick={() => click(id)} aria-label={`Open ${APPS[id].name}`}
                className={cn("group relative origin-bottom transition-[width,height] duration-100", bouncing === id && "animate-bounce-dock")}
                style={{ width: base * s, height: base * s }}>
                <AppIcon id={id} className="size-full" size={Math.round(22 * s)} />
                <span className="glass-strong pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium text-foreground group-hover:block">{APPS[id].name}</span>
              </button>
              <span className={cn("mt-0.5 size-1 rounded-full", isOpen ? "bg-foreground/70" : "bg-transparent")} />
            </div>
          );
        })}
      </div>
    </nav>
  );
}
