import { useEffect, useRef } from "react";
import { IRIS_RADIUS, PORTRAIT_EYES, PUPIL_RADIUS, portraitGaze, portraitTransform } from "@/lib/portrait-gaze";

const portrait = "/media/profile/mahin-desktop-avatar.png";

/** Static full image underneath; feathered head-only copy tilts in CSS 3D with drawn pupils on top. */
export function DesktopPortrait() {
  const root = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const eyes = useRef<SVGGElement>(null);
  useEffect(() => {
    const element = head.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mouse = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0, last = 0;
    let target = { x: 0, y: 0 }, current = { x: 0, y: 0 };
    const enabled = () => !motion.matches && mouse.matches && !document.hidden;
    const draw = () => {
      const t = portraitTransform(current);
      element.style.transform = `rotateX(${t.rotateX}deg) rotateY(${t.rotateY}deg)`;
      eyes.current?.querySelectorAll(".portrait-iris").forEach(g => g.setAttribute("transform", `translate(${t.pupilX} ${t.pupilY})`));
    };
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
    const schedule = () => { if (enabled() && !frame) frame = requestAnimationFrame(animate); };
    const neutral = () => { target = { x: 0, y: 0 }; schedule(); };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !enabled()) return;
      const bounds = root.current?.getBoundingClientRect();
      if (!bounds) return;
      target = portraitGaze(event.clientX - (bounds.left + bounds.width * 640 / 1291), event.clientY - (bounds.top + bounds.height * 389 / 1218));
      schedule();
    };
    const preference = () => {
      cancelAnimationFrame(frame); frame = 0; last = 0;
      target = current = { x: 0, y: 0 };
      draw();
    };
    window.addEventListener("pointermove", move, true);
    document.documentElement.addEventListener("pointerleave", neutral);
    window.addEventListener("blur", neutral);
    document.addEventListener("visibilitychange", preference);
    motion.addEventListener("change", preference); mouse.addEventListener("change", preference);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move, true);
      document.documentElement.removeEventListener("pointerleave", neutral);
      window.removeEventListener("blur", neutral); document.removeEventListener("visibilitychange", preference);
      motion.removeEventListener("change", preference); mouse.removeEventListener("change", preference);
    };
  }, []);
  return <div ref={root} className="desktop-home-portrait" aria-hidden="true">
    <img src={portrait} alt="" draggable={false} />
    <div className="portrait-stage"><div ref={head} className="portrait-head">
      <img src={portrait} alt="" draggable={false} />
      <svg viewBox="0 0 1291 1218"><defs>
        <radialGradient id="portrait-iris-fill"><stop offset="0%" stopColor="#3c1e0c" /><stop offset="70%" stopColor="#2a1408" /><stop offset="100%" stopColor="#120804" /></radialGradient>
        <filter id="portrait-eye-soft"><feGaussianBlur stdDeviation="1.2" /></filter>
        {PORTRAIT_EYES.map((e, i) => <clipPath key={i} id={`portrait-eye-${i}`}><ellipse cx={e.x} cy={e.y + 1} rx={27} ry={11} /></clipPath>)}
      </defs><g ref={eyes}>{PORTRAIT_EYES.map((e, i) => <g key={i} clipPath={`url(#portrait-eye-${i})`}>
        <ellipse cx={e.x} cy={e.y + 1} rx={26} ry={13} fill="#bea99d" filter="url(#portrait-eye-soft)" />
        <g className="portrait-iris"><circle cx={e.x} cy={e.y} r={IRIS_RADIUS} fill="url(#portrait-iris-fill)" />
          <circle cx={e.x} cy={e.y} r={PUPIL_RADIUS} fill="#050201" />
          <circle cx={e.x + 6} cy={e.y - 6} r={3} fill="#e8e4e6" opacity={0.85} /></g>
      </g>)}</g></svg>
    </div></div>
  </div>;
}
