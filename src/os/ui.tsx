import { ImagePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { APPS, type AppId } from "./apps-registry";

export function AppIcon({ id, className, size = 22 }: { id: AppId; className?: string; size?: number }) {
  const m = APPS[id];
  const I = m.icon;
  return (
    <div className={cn("icon-tile grid place-items-center", m.tile, className)}>
      <I size={size} strokeWidth={2} />
    </div>
  );
}

export function MediaPlaceholder({ seed = 0, label = "Images coming soon", className, src, alt }: { seed?: number; label?: string; className?: string; src?: string | undefined; alt?: string }) {
  if (src) return <img src={src} alt={alt ?? ""} loading="lazy" className={cn("h-full w-full object-cover", className)} />;
  return (
    <div className={cn(`ph-${Math.abs(seed) % 6}`, "relative grid h-full w-full place-items-center overflow-hidden text-primary-foreground", className)}>
      <div className="ph-stripes absolute inset-0" />
      <div className="relative flex flex-col items-center gap-1.5 text-center text-chrome-foreground">
        <ImagePlus size={22} className="opacity-90" />
        <span className="rounded-full bg-chrome px-2.5 py-0.5 text-[11px] font-semibold tracking-wide backdrop-blur">{label}</span>
      </div>
    </div>
  );
}

export function Badge({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "gold" | "success" }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
      tone === "gold" && "bg-gold text-foreground ring-1 ring-gold/50",
      tone === "success" && "bg-success text-primary-foreground",
      tone === "default" && "bg-card text-accent-foreground ring-1 ring-border")}>{children}</span>
  );
}

export const hash = (s: string) => [...s].reduce((a, c) => a + c.charCodeAt(0), 0);
