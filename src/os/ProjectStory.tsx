import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { type Project } from "@/data/portfolio";
import { BrandStrip } from "./BrandLogo";
import { ProjectCover } from "./ProjectCover";

export function StoryText({ project, showConcepts = true }: { project: Project; showConcepts?: boolean }) {
  return <div className="space-y-4">
    {project.metrics && <section aria-label="Scope of contribution"><h3 className="text-sm font-semibold">Scope of contribution</h3><dl className="mt-3 grid grid-cols-2 gap-3">{project.metrics.map(m => <div key={m.label} className="border-b border-border pb-3"><dt className="text-2xl font-bold">{m.value}</dt><dd className="text-xs text-muted-foreground">{m.label}</dd></div>)}</dl></section>}
    {project.summary && <section>{project.badge && <h3 className="mb-2 font-semibold">The case</h3>}<p className="text-[15px] leading-relaxed">{project.summary}</p></section>}
    {project.brandRow && <BrandStrip label={project.brandRow.label} names={project.brandRow.names}/>}
    {project.link && <Button asChild><a href={project.link} target="_blank" rel="noreferrer">{project.linkLabel ?? "View on Behance"}</a></Button>}
    {showConcepts && !!project.concepts?.length && <section aria-label="Campaign concepts"><h3 className="mb-3 font-semibold">Campaign concepts</h3><ProjectGallery project={project} concepts/></section>}
  </div>;
}

export function ProjectGallery({ project, concepts = false }: { project: Project; concepts?: boolean }) {
  const [index, setIndex] = useState<number | null>(null);
  const [start, setStart] = useState<number | null>(null);
  const images = concepts ? project.concepts?.map(c => c.src) ?? [] : project.images;
  const captions = concepts ? project.concepts?.map(c => c.caption) : project.captions;
  const count = images.length;
  const step = (delta: number) => setIndex(i => i === null ? null : (i + delta + count) % count);
  return <>
    {concepts ? <div className="space-y-5">{images.map((src, i) => <figure key={src}><Button variant="ghost" className="block aspect-video h-auto w-full overflow-hidden rounded-lg bg-logo-surface p-0" aria-label={`Enlarge campaign concept ${i+1}`} onClick={() => setIndex(i)}><img src={src} alt={captions?.[i]} className="h-full w-full object-contain" loading="lazy"/></Button><figcaption className="mt-2 text-sm leading-relaxed text-muted-foreground">{captions?.[i]}</figcaption></figure>)}</div> : <>
    <Button variant="ghost" className="block aspect-video h-auto w-full overflow-hidden rounded-lg bg-secondary p-0" aria-label={`Open photo 1 of ${project.title}`} disabled={!count} onClick={() => setIndex(0)}><ProjectCover project={project} contain/></Button>
    {count > 1 && <div className="mt-3 grid grid-cols-3 gap-2">{project.images.slice(1).map((src, i) => <Button key={src} variant="ghost" className="aspect-square h-auto overflow-hidden rounded-lg p-0" aria-label={`Open photo ${i+2} of ${project.title}`} onClick={() => setIndex(i+1)}><img src={src} alt={project.captions?.[i+1] ?? `${project.title} photo ${i+2}`} className="h-full w-full object-cover" loading="lazy"/></Button>)}</div>}
    </>}
    <Dialog open={index !== null} onOpenChange={open => { if (!open) setIndex(null); }}>
      <DialogContent className="photo-story native-dark z-[9500] flex max-h-[90dvh] w-[calc(100vw-24px)] max-w-4xl flex-col gap-0 overflow-hidden p-0" onKeyDown={e => { if(e.key === "ArrowRight") {e.preventDefault();step(1);} if(e.key === "ArrowLeft") {e.preventDefault();step(-1);} }}>
        <header className="flex shrink-0 items-center gap-2 border-b border-border px-4 py-2"><DialogTitle className="min-w-0 flex-1 text-sm">{project.title}</DialogTitle><Button variant="ghost" size="icon" aria-label="Close photo story" onClick={() => setIndex(null)}><X/></Button></header>
        <DialogDescription className="sr-only">{project.subtitle}. Photo and case story.</DialogDescription>
        <div className="min-h-0 overflow-y-auto overscroll-contain p-4" onTouchStart={e => setStart(e.touches[0]?.clientX ?? null)} onTouchEnd={e => { const x=e.changedTouches[0]?.clientX; if(start !== null && x !== undefined && Math.abs(x-start)>60) step(x<start?1:-1);setStart(null); }}>
          {index !== null && <figure><img src={images[index]} alt={captions?.[index] ?? `${project.title} photo ${index+1}`} className="max-h-[52dvh] w-full object-contain"/><figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">{captions?.[index] ?? `${project.title} · ${project.badge} · Photo ${index+1}`}</figcaption></figure>}
          <div className="my-4 flex items-center justify-between"><Button variant="secondary" size="icon" aria-label="Previous photo" onClick={() => step(-1)} disabled={count<2}><ChevronLeft/></Button><span className="text-xs text-muted-foreground">{(index ?? 0)+1} / {count}</span><Button variant="secondary" size="icon" aria-label="Next photo" onClick={() => step(1)} disabled={count<2}><ChevronRight/></Button></div>
          <p className="mb-2 text-sm text-muted-foreground">{project.subtitle}{project.role ? ` · ${project.role}` : ""} · {project.badge}</p><StoryText project={project} showConcepts={false}/>
        </div>
      </DialogContent>
    </Dialog>
  </>;
}