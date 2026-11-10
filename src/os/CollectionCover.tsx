import { ArrowRight, Star } from "lucide-react";
import { albumItems, type PhotoRoot } from "@/data/portfolio";
import { BrandLogo } from "./BrandLogo";
import { GradientCover, ProjectCover, coverFrame } from "./ProjectCover";
import { MediaPlaceholder } from "./ui";

export function CollectionCover({ collection }: { collection: { title: string; ids: string[]; cover?: string | undefined; coverStyle?: PhotoRoot["coverStyle"]; gradient?: PhotoRoot["gradient"] } }) {
  if (collection.gradient) return <GradientCover gradient={collection.gradient} />;
  if (collection.coverStyle === "flagship") return <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-primary p-4 text-primary-foreground"><Star size={64} strokeWidth={1.4} aria-hidden/><span className="text-xl font-semibold">Flagship</span></div>;
  if (collection.coverStyle === "transition") return <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-secondary p-4"><BrandLogo name="Pureit"/><ArrowRight size={20} className="text-muted-foreground" aria-hidden/><BrandLogo name="A. O. Smith"/></div>;
  if (collection.cover) return <MediaPlaceholder src={collection.cover} alt={collection.title}/>;
  const project = albumItems(collection.ids)[0];
  return project ? <ProjectCover project={project}/> : null;
}
type CoverSource = { ids: string[]; cover?: string | undefined; coverStyle?: PhotoRoot["coverStyle"]; gradient?: PhotoRoot["gradient"] };
/** Frame matching what CollectionCover renders: artwork keeps its own ratio. */
export const collectionFrame = (c: CoverSource) => c.gradient || c.coverStyle || c.cover ? "aspect-square" : coverFrame(albumItems(c.ids)[0]);
