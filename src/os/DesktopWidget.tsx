import { X } from "lucide-react";
import { highlights, photoRoots, rootIds } from "@/data/portfolio";
import { useOS } from "./store";

/** Sticky-note "Start here" widget, modelled on the reference desktop. */
export function DesktopWidget() {
  const os = useOS();
  return (
    <aside aria-label="Start here"
      className="pointer-events-auto absolute left-6 top-12 hidden w-[272px] -rotate-1 rounded-sm bg-sticky p-4 text-sticky-foreground shadow-soft animate-fade-up lg:block">
      <button onClick={() => os.setPrefs({ showWidget: false })} aria-label="Close widget" className="absolute right-2 top-2 grid size-6 place-items-center rounded opacity-60 hover:opacity-100"><X size={14} /></button>
      <h2 className="text-lg font-bold">Start here 👋</h2>
      <p className="mt-0.5 text-[13px] leading-snug">Brand marketing & strategy work, case competitions and design.</p>
      <dl className="mt-3 grid grid-cols-2 gap-1.5">
        {highlights.map((h) => (
          <div key={h.label} title={h.note} className="rounded-md bg-sticky-chip px-2 py-1.5">
            <dt className="text-[15px] font-bold leading-tight">{h.value}</dt>
            <dd className="text-[10.5px] font-medium leading-tight opacity-80">{h.label}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {photoRoots.map((r) => (
          <button key={r.id} onClick={() => os.open("photos", `cat:${r.id}`)} className="rounded-full bg-sticky-chip px-2.5 py-1 text-[12px] font-semibold hover:brightness-95">
            {r.id === "Featured" ? "★ " : ""}{r.id} <span className="opacity-60">{rootIds(r).length}</span>
          </button>
        ))}
      </div>
      <button onClick={() => os.open("photos", "cat:Featured")} className="mt-3 w-full rounded-lg bg-foreground py-2 text-[13px] font-semibold text-background hover:opacity-90">See all projects →</button>
    </aside>
  );
}
