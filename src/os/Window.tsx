import { useRef, type ReactNode, type PointerEvent as RPE } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { APPS } from "./apps-registry";
import { useOS, type Win } from "./store";

export function Window({ win, children }: { win: Win; children: ReactNode }) {
  const { focus, close, minimize, toggleMax, move, resize, active } = useOS();
  const mobile = useIsMobile();
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const meta = APPS[win.id];
  const full = mobile || win.maximized;
  const isActive = active === win.id;

  const onDown = (e: RPE) => {
    if (full || (e.target as HTMLElement).closest("button")) return;
    drag.current = { dx: e.clientX - win.x, dy: e.clientY - win.y };
    const mv = (ev: PointerEvent) => {
      if (!drag.current) return;
      const x = Math.min(window.innerWidth - 80, Math.max(-win.w + 120, ev.clientX - drag.current.dx));
      const y = Math.min(window.innerHeight - 60, Math.max(28, ev.clientY - drag.current.dy));
      move(win.id, x, y);
    };
    const up = () => { drag.current = null; window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", mv);
    window.addEventListener("pointerup", up);
  };

  const onResize = (e: RPE) => {
    e.stopPropagation();
    const sx = e.clientX, sy = e.clientY, sw = win.w, sh = win.h;
    const mv = (ev: PointerEvent) => resize(win.id, Math.max(360, sw + ev.clientX - sx), Math.max(260, sh + ev.clientY - sy));
    const up = () => { window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", mv);
    window.addEventListener("pointerup", up);
  };


  if (win.minimized) return null;
  return (
    <section
      role="dialog"
      aria-label={meta.name}
      onPointerDown={() => !isActive && focus(win.id)}
      style={full ? { zIndex: win.z } : { zIndex: win.z, left: win.x, top: win.y, width: win.w, height: win.h }}
      className={cn(
        "glass-strong shadow-window animate-win-in fixed flex flex-col overflow-hidden text-foreground",
        full ? (mobile ? "inset-x-0 top-7 bottom-20 rounded-none md:rounded-xl" : "inset-x-2 top-9 bottom-24 rounded-xl") : "rounded-xl",
        !isActive && "opacity-[0.97]",
      )}
    >
      <header onPointerDown={onDown} onDoubleClick={() => !mobile && toggleMax(win.id)}
        className={cn("relative flex h-10 shrink-0 select-none items-center border-b border-border px-3", !full && "cursor-grab active:cursor-grabbing")}>
        <div className="group flex items-center gap-2">
          <button aria-label={`Close ${meta.name}`} onClick={() => close(win.id)} className={cn("grid size-3 place-items-center rounded-full text-[9px] font-bold leading-none text-foreground/0 ring-[0.5px] ring-foreground/20 group-hover:text-foreground/60", isActive ? "bg-tl-red" : "bg-muted group-hover:bg-tl-red")}>×</button>
          <button aria-label={`Minimize ${meta.name}`} onClick={() => minimize(win.id)} className={cn("grid size-3 place-items-center rounded-full text-[9px] font-bold leading-none text-foreground/0 ring-[0.5px] ring-foreground/20 group-hover:text-foreground/60", isActive ? "bg-tl-yellow" : "bg-muted group-hover:bg-tl-yellow")}>–</button>
          <button aria-label={`Maximize ${meta.name}`} onClick={() => toggleMax(win.id)} disabled={mobile} className={cn("grid size-3 place-items-center rounded-full text-[8px] font-bold leading-none text-foreground/0 ring-[0.5px] ring-foreground/20 group-hover:text-foreground/60 disabled:opacity-40", isActive ? "bg-tl-green" : "bg-muted group-hover:bg-tl-green")}>+</button>
        </div>
        <h2 className="pointer-events-none absolute inset-x-0 text-center text-[13px] font-semibold text-foreground/80">{meta.name}</h2>
      </header>
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      {!full && <div onPointerDown={onResize} aria-hidden className="absolute bottom-0 right-0 size-4 cursor-nwse-resize" />}
    </section>
  );
}
