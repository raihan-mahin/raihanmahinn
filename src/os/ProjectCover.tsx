import { BrandLogo } from "./BrandLogo";
import { MediaPlaceholder, hash } from "./ui";
import type { Project } from "@/data/portfolio";

export function ProjectCover({ project, contain = false }: { project: Project; contain?: boolean }) {
  if (project.images[0]) return <MediaPlaceholder src={project.images[0]} seed={hash(project.id)} alt={project.title} className={contain ? "object-contain" : "object-cover"} />;
  return <div className="flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden bg-secondary p-3 text-center text-foreground">
    {project.brandRow && <div className="flex flex-wrap justify-center gap-2">{project.brandRow.names.slice(0, 3).map(name => <BrandLogo key={name} name={name} />)}</div>}
    <p className="max-w-full text-sm font-semibold leading-snug">{project.title.replace(/ — .*$/, "")}</p>
    <p className="line-clamp-2 text-[11px] text-muted-foreground">{project.badge ?? project.role ?? project.subtitle}</p>
  </div>;
}