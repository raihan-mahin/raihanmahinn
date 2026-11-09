import { useEffect, useState } from "react";
import { ChevronLeft, ExternalLink, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { photoRoots, rootIds, albumItems, albumCover, findAlbum, projectById, type ProjectCategory, type Project } from "@/data/portfolio";
import { BrandStrip } from "../BrandLogo";
import { Badge, MediaPlaceholder, hash } from "../ui";

const tone = (b?: string) => (b === "Champion" ? "gold" : "default") as "gold" | "default";

export function ProjectArticle({ p }: { p: Project }) {
  return (
    <article className="mx-auto max-w-3xl animate-fade-up">
      <div className="aspect-video overflow-hidden rounded-xl bg-secondary"><MediaPlaceholder seed={hash(p.id)} src={p.images[0]} alt={p.title} className="object-contain" /></div>
      <div className="mt-4 flex flex-wrap items-center gap-2">{p.badge && <Badge tone={tone(p.badge)}>{p.badge}</Badge>}<span className="text-xs text-muted-foreground">{p.subtitle}</span></div>
      <h2 className="mt-1.5 text-2xl font-bold tracking-tight">{p.title}</h2>
      {p.role && <p className="mt-1 text-sm font-medium text-muted-foreground">{p.role}</p>}
      {p.summary && <p className="mt-3 text-[15px] leading-relaxed">{p.summary}</p>}
      {p.brandRow && <BrandStrip className="mt-4" label={p.brandRow.label} names={p.brandRow.names} />}
      {p.images.length > 1 && (
        <div className="mt-5 grid grid-cols-3 gap-2">
          {p.images.slice(1).map((src, i) => <div key={src} className="aspect-square overflow-hidden rounded-lg"><MediaPlaceholder seed={hash(p.id) + i + 1} src={src} alt={`${p.title} photo ${i + 2}`} /></div>)}
        </div>
      )}
      {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">{p.linkLabel ?? "View on Behance"} <ExternalLink size={14} /></a>}
    </article>
  );
}

function Tile({ p, onOpen }: { p: Project; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className="group text-left">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg ring-1 ring-border transition group-hover:ring-2 group-hover:ring-primary">
        <MediaPlaceholder seed={hash(p.id)} src={p.images[0]} alt={p.title} label="Photo pending" />
        {p.badge && <span className="absolute left-2 top-2"><Badge tone={tone(p.badge)}>{p.badge === "Champion" && <Star size={10} className="mr-1" />}{p.badge}</Badge></span>}
      </div>
      <p className="mt-1.5 line-clamp-1 text-[12px] font-semibold">{p.title}</p>
      <p className="truncate text-[11px] text-muted-foreground">{p.subtitle}</p>
    </button>
  );
}

export function Photos({ payload }: { payload?: string | undefined }) {
  const [root, setRoot] = useState<ProjectCategory>("Featured");
  const [album, setAlbum] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  useEffect(() => {
    if (!payload) return;
    if (payload.startsWith("cat:")) { setRoot(payload.slice(4) as ProjectCategory); setAlbum(null); setOpenId(null); }
    else if (payload.startsWith("album:")) { const f = findAlbum(payload.slice(6)); if (f) { setRoot(f.root); setAlbum(f.album.id); setOpenId(null); } }
    else if (projectById(payload)) setOpenId(payload);
  }, [payload]);
  const r = photoRoots.find((x) => x.id === root) ?? photoRoots[0]!;
  const a = r.albums?.find((x) => x.id === album);
  const current = openId ? projectById(openId) : undefined;
  const back = current ? () => setOpenId(null) : a ? () => setAlbum(null) : null;
  const heading = current ? current.title : a ? a.title : r.id;

  return (
    <div className="flex h-full">
      <aside className="w-44 shrink-0 border-r border-border bg-secondary/50 p-2">
        <p className="px-2 pb-1 pt-1 text-[11px] font-semibold text-muted-foreground">Library</p>
        {photoRoots.map((x) => (
          <button key={x.id} onClick={() => { setRoot(x.id); setAlbum(null); setOpenId(null); }}
            className={cn("flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-[13px]", root === x.id ? "bg-primary/15 font-semibold text-primary" : "hover:bg-accent")}>
            <span>{x.id}</span><span className="text-[11px] opacity-60">{rootIds(x).length}</span>
          </button>
        ))}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-11 shrink-0 items-center gap-2 border-b border-border px-4">
          {back && <button onClick={back} aria-label="Back" className="grid size-7 place-items-center rounded-md hover:bg-accent"><ChevronLeft size={18} /></button>}
          <h2 className="truncate text-[15px] font-bold">{heading}</h2>
        </div>
        <div className="min-h-0 flex-1 overflow-auto p-4">
          {current ? <ProjectArticle p={current} /> : r.albums && !a ? (
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
              {r.albums.map((x) => (
                <button key={x.id} onClick={() => setAlbum(x.id)} className="group text-left">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-soft ring-1 ring-border transition group-hover:ring-2 group-hover:ring-primary">
                    <MediaPlaceholder seed={hash(x.id)} src={albumCover(x.ids)} alt={`${x.title} album cover`} className="transition group-hover:scale-[1.03]" />
                  </div>
                  <p className="mt-2 text-[13px] font-semibold">{x.title}</p>
                  <p className="text-[11px] text-muted-foreground">{x.ids.length} {x.ids.length === 1 ? "item" : "items"}</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {albumItems(a ? a.ids : rootIds(r)).map((p) => <Tile key={p.id} p={p} onOpen={() => setOpenId(p.id)} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
