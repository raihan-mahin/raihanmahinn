import { useEffect, useRef } from "react";
import { portraitGaze } from "@/lib/portrait-gaze";
import { createPortraitRenderer } from "@/lib/portrait-renderer";

const portrait = "/media/profile/mahin-desktop-avatar.png";

/** Continuous textured head mesh fades into the anchored chest, not separate slices. */
export function DesktopPortrait() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const original = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const element = canvas.current, image = original.current;
    if (!element || !image) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mouse = window.matchMedia("(hover: hover) and (pointer: fine)");
    let renderer: ReturnType<typeof createPortraitRenderer> = null;
    let frame = 0, last = 0, disposed = false;
    let target = { x: 0, y: 0 }, current = { x: 0, y: 0 };
    const enabled = () => !motion.matches && mouse.matches && !document.hidden;
    const draw = () => renderer?.draw(current);
    const animate = (now: number) => {
      frame = 0;
      if (!enabled()) return;
      const ease = 1 - Math.exp(-Math.min(now - (last || now - 16), 50) / 110);
      last = now;
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      const settled = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) < 0.001;
      if (settled) current = { ...target };
      draw();
      if (!settled) frame = requestAnimationFrame(animate); else last = 0;
    };
    const schedule = () => { if (renderer && enabled() && !frame) frame = requestAnimationFrame(animate); };
    const neutral = () => { target = { x: 0, y: 0 }; schedule(); };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !enabled()) return;
      const bounds = root.current?.getBoundingClientRect();
      if (!bounds) return;
      target = portraitGaze(event.clientX - (bounds.left + bounds.width * 640 / 1291), event.clientY - (bounds.top + bounds.height * 389 / 1218));
      schedule();
    };
    const resize = () => {
      const bounds = root.current?.getBoundingClientRect();
      if (!bounds) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      element.width = Math.round(bounds.width * ratio); element.height = Math.round(bounds.height * ratio);
      draw();
    };
    const initialize = () => {
      if (disposed || !enabled() || renderer || !image.complete || !image.naturalWidth) return;
      renderer = createPortraitRenderer(element, image);
      if (renderer) { resize(); element.hidden = false; image.style.visibility = "hidden"; }
    };
    const preference = () => {
      cancelAnimationFrame(frame); frame = 0; last = 0;
      target = current = { x: 0, y: 0 };
      if (enabled()) { initialize(); draw(); } else if (!document.hidden) { draw(); }
    };
    const observer = new ResizeObserver(resize); observer.observe(root.current ?? element);
    image.addEventListener("load", initialize); initialize();
    window.addEventListener("pointermove", move, true);
    document.documentElement.addEventListener("pointerleave", neutral);
    window.addEventListener("blur", neutral);
    document.addEventListener("visibilitychange", preference);
    motion.addEventListener("change", preference); mouse.addEventListener("change", preference);
    return () => {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect(); renderer?.dispose();
      image.removeEventListener("load", initialize);
      window.removeEventListener("pointermove", move, true);
      document.documentElement.removeEventListener("pointerleave", neutral);
      window.removeEventListener("blur", neutral); document.removeEventListener("visibilitychange", preference);
      motion.removeEventListener("change", preference); mouse.removeEventListener("change", preference);
    };
  }, []);
  return <div ref={root} className="desktop-home-portrait" aria-hidden="true">
    <img ref={original} src={portrait} alt="" draggable={false} />
    <canvas ref={canvas} hidden />
  </div>;
}
