import { useEffect, useId, useRef } from "react";
import { portraitGaze } from "@/lib/portrait-gaze";

const portrait = "/media/profile/mahin-desktop-avatar.png";

/** Original eye pixels move inside inset apertures; frames, lids and face stay fixed. */
export function DesktopPortrait() {
  const root = useRef<SVGSVGElement>(null);
  const eyes = useRef<SVGGElement>(null);
  const clip = useId().replace(/:/g, "");
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mouse = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };
    let last = 0;
    const animate = (now: number) => {
      const ease = 1 - Math.exp(-Math.min(now - (last || now - 16), 50) / 85);
      last = now;
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      const settled = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) < 0.005;
      if (settled) current = { ...target };
      eyes.current?.setAttribute("transform", `translate(${current.x} ${current.y})`);
      frame = settled ? 0 : requestAnimationFrame(animate);
      if (settled) last = 0;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(animate); };
    const neutral = () => { target = { x: 0, y: 0 }; schedule(); };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || motion.matches || !mouse.matches) return;
      const bounds = root.current?.getBoundingClientRect();
      if (!bounds) return;
      target = portraitGaze(event.clientX - (bounds.left + bounds.width * 637.5 / 1291), event.clientY - (bounds.top + bounds.height * 389 / 1218));
      schedule();
    };
    const preference = () => {
      if (motion.matches || !mouse.matches) {
        cancelAnimationFrame(frame);
        frame = 0; last = 0;
        target = current = { x: 0, y: 0 };
        eyes.current?.removeAttribute("transform");
      }
    };
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", neutral);
    window.addEventListener("blur", neutral);
    motion.addEventListener("change", preference);
    mouse.addEventListener("change", preference);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", neutral);
      window.removeEventListener("blur", neutral);
      motion.removeEventListener("change", preference);
      mouse.removeEventListener("change", preference);
    };
  }, []);

  return <svg ref={root} className="desktop-home-portrait" viewBox="0 0 1291 1218" aria-hidden="true" focusable="false">
    <defs><clipPath id={clip}>
      <path d="M512 387 Q541 362 572 391 Q549 404 513 393 Z" />
      <path d="M705 392 Q733 363 762 387 L762 394 Q731 403 705 396 Z" />
    </clipPath></defs>
    <image href={portrait} width="1291" height="1218" />
    <g clipPath={`url(#${clip})`}><g ref={eyes} data-portrait-eyes="true">
      <image href={portrait} width="1291" height="1218" />
    </g></g>
  </svg>;
}