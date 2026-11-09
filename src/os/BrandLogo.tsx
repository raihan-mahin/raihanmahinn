import { useState } from "react";
import { brandLogos } from "@/data/brandLogos";
import { cn } from "@/lib/utils";

/** Small logo chip with readable label; falls back to text-only if the image is missing or fails. */
export function BrandLogo({ name, className, logoOnly = true }: { name: string; className?: string; logoOnly?: boolean }) {
  const logo = brandLogos[name];
  const [failed, setFailed] = useState(false);
  return (
    <span title={name} className={cn("inline-flex h-9 items-center gap-1.5 rounded-lg bg-card px-2 text-xs font-semibold text-card-foreground ring-1 ring-border", className)}>
      {logo && !failed && (
        <span className="grid h-6 place-items-center rounded bg-background px-1">
          <img src={logo.src} alt={`${name} logo`} loading="lazy" onError={() => setFailed(true)}
            className={cn("h-5 object-contain", logo.wide ? "w-14" : "max-w-12")} />
        </span>
      )}
      <span className={logoOnly && logo && !failed ? "sr-only" : undefined}>{name}</span>
    </span>
  );
}

export function BrandStrip({ label, names, className }: { label?: string; names: string[]; className?: string }) {
  return (
    <div className={className}>
      {label && <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>}
      <div className="mt-1.5 flex flex-wrap gap-1.5">{names.map((n) => <BrandLogo key={n} name={n} />)}</div>
    </div>
  );
}
