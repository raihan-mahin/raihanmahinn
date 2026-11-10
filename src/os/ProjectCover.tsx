import { BrandLogo } from "./BrandLogo";
import { MediaPlaceholder, hash } from "./ui";
import type { Gradient, Project } from "@/data/portfolio";

export function GradientCover({ gradient }: { gradient: Gradient }) {
  return (
    <div className="gradient-cover relative h-full w-full overflow-hidden rounded-[inherit]" data-gradient-from={gradient.from} data-gradient-to={gradient.to}>
      <span aria-hidden="true" className="gradient-cover-hash pointer-events-none absolute -bottom-12 -right-1 text-[10rem] font-black leading-none">#</span>
      <span className="absolute left-3 right-10 top-3 break-words text-left text-xs font-bold leading-tight sm:text-sm">{gradient.tag}</span>
      {gradient.star && <span aria-hidden="true" className="gradient-cover-star absolute right-3 top-3 grid size-6 place-items-center rounded-full text-sm">★</span>}
    </div>
  );
}

/** Creative artwork keeps its intrinsic 808×632 frame; everything else stays square. */
export const isArtworkCover = (p?: Project) => !!p && !p.gradient && !!p.artwork && !!p.images[0];
export const coverFrame = (p?: Project) => isArtworkCover(p) ? "aspect-[808/632]" : "aspect-square";

export function ProjectCover({ project, contain = false }: { project: Project; contain?: boolean }) {
  if (project.gradient) return <GradientCover gradient={project.gradient} />;
  if (project.artwork && project.images[0]) return <div className="h-full w-full"><MediaPlaceholder src={project.images[0]} fallbackSrc={project.artworkFallback} seed={hash(project.id)} alt={project.title} className="object-cover" /></div>;
  if (project.images[0]) return <MediaPlaceholder src={project.images[0]} seed={hash(project.id)} alt={project.title} className={contain ? "object-contain" : "object-cover"} />;
  return <div className="flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden bg-secondary p-3 text-center text-foreground">
    {project.brandRow && <div className="flex flex-wrap justify-center gap-2">{project.brandRow.names.slice(0, 3).map(name => <BrandLogo key={name} name={name} />)}</div>}
    <p className="max-w-full text-sm font-semibold leading-snug">{project.title.replace(/ — .*$/, "")}</p>
    <p className="line-clamp-2 text-[11px] text-muted-foreground">{project.badge ?? project.role ?? project.subtitle}</p>
  </div>;
}