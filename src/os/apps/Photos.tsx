import { BrandStrip } from "../BrandLogo";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ExternalLink, Star, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects, projectCategories, type ProjectCategory } from "@/data/portfolio";
import { Badge, MediaPlaceholder, hash } from "../ui";

export function Photos({ payload }: { payload?: string | undefined }) {
  const [cat, setCat] = useState<ProjectCategory>("Featured");
  const [openId, setOpenId] = useState<string | null>(null);
  useEffect(() => {
    if (!payload) return;
    if (payload.startsWith("cat:")) { setCat(payload.slice(4) as ProjectCategory); setOpenId(null); }
    else if (projects.some((p) => p.id === payload)) setOpenId(payload);
  }, [payload]);
  const list = useMemo(() => projects.filter((p) => p.categories.includes(cat)), [cat]);
  const current = projects.find((p) => p.id === openId);

  return (
    <div className="flex h-full flex-col md:flex-row">
      <aside className="flex shrink-0 gap-1 overflow-x-auto border-b border-border bg-secondary/50 p-2 md:w-48 md:flex-col md:border-b-0 md:border-r">
        <p className="hidden px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground md:block">Albums</p>
        {projectCategories.map((c) => (
          <button key={c} onClick={() => { setCat(c); setOpenId(null); }}
            className={cn("flex shrink-0 items-center justify-between rounded-md px-2.5 py-1.5 text-left text-[13px] font-medium", cat === c && !current ? "bg-primary text-primary-foreground" : "hover:bg-accent")}>
            <span>{c}</span><span className="ml-2 text-[11px] opacity-60">{projects.filter((p) => p.categories.includes(c)).length}</span>
          </button>
        ))}
      </aside>
      <div className="min-h-0 flex-1 overflow-auto p-4">
        {current ? (
          <article className="mx-auto max-w-3xl animate-fade-up">
            <button onClick={() => setOpenId(null)} className="mb-3 flex items-center gap-1 text-sm font-medium text-primary"><ArrowLeft size={15} /> {cat}</button>
            <div className="aspect-video overflow-hidden rounded-xl"><MediaPlaceholder seed={hash(current.id)} src={current.images[0]} alt={current.title} label="Media coming soon" /></div>
            <div className="mt-4 flex flex-wrap items-center gap-2">{current.badge && <Badge tone={current.badge === "Champion" ? "gold" : "default"}>{current.badge}</Badge>}<Badge>{current.subtitle}</Badge></div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">{current.title}</h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {[["Role", current.role], ["Challenge", current.challenge], ["Contribution", current.contribution], ["Outcome", current.outcome]].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-secondary p-3"><dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{k}</dt><dd className="mt-1 text-sm">{v}</dd></div>
              ))}
            </dl>
            {current.brandRow && <BrandStrip className="mt-3 rounded-xl bg-secondary p-3" label={current.brandRow.label} names={current.brandRow.names} />}
            <h3 className="mt-5 text-sm font-bold">Gallery</h3>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => <div key={i} className="aspect-square overflow-hidden rounded-lg"><MediaPlaceholder seed={hash(current.id) + i + 1} src={current.images[i + 1]} label="Media coming soon" /></div>)}
            </div>
            {current.link && <a href={current.link} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">{current.linkLabel ?? "View on Behance"} <ExternalLink size={14} /></a>}
          </article>
        ) : (
          <>
            <div className="mb-3 flex items-end justify-between">
              <div><h2 className="text-xl font-bold tracking-tight">{cat}</h2><p className="text-xs text-muted-foreground">{list.length} items · media coming soon</p></div>
              <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex"><Upload size={12} /> Image slots ready</span>
            </div>
            {cat === "Agency Work" && <p className="mb-3 rounded-lg bg-accent px-3 py-2 text-xs text-accent-foreground">I currently run an agency. One of our current workstreams is producing AI-generated content for Lux, Lifebuoy and Dove. Media coming soon.</p>}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {list.map((p) => (
                <button key={p.id} onClick={() => setOpenId(p.id)} className="group overflow-hidden rounded-xl bg-card text-left shadow-soft ring-1 ring-border transition hover:-translate-y-0.5">
                  <div className={cn("relative overflow-hidden", "aspect-[4/3]")}>
                    <MediaPlaceholder seed={hash(p.id)} src={p.images[0]} alt={p.title}
                      label="Media coming soon" />
                    {p.badge && <span className="absolute left-2 top-2"><Badge tone={p.badge === "Champion" ? "gold" : p.badge === "Current work" ? "success" : "default"}>{p.badge === "Champion" && <Star size={10} className="mr-1" />}{p.badge}</Badge></span>}
                  </div>
                  <div className="p-2.5"><p className="line-clamp-2 text-[13px] font-semibold leading-snug">{p.title}</p><p className="mt-0.5 truncate text-[11px] text-muted-foreground">{p.subtitle}</p></div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
