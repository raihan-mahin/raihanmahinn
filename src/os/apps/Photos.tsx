import { useEffect, useState } from "react";
import { ChevronLeft, ExternalLink, Trophy, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { photoRoots, workRoots, workProjects, resolvePhotoCategory, rootIds, albumItems, findAlbum, projectById, type ProjectCategory, type Project } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { ProjectCover } from "../ProjectCover";
import { ProjectGallery, StoryText } from "../ProjectStory";
import { Badge, MediaPlaceholder, hash } from "../ui";

const tone = (b?: string) => (b === "Champion" ? "gold" : "default") as "gold" | "default";

export function ProjectArticle({ p }: { p: Project }) {
  return (
    <article className="mx-auto max-w-3xl animate-fade-up">
      <ProjectGallery project={p}/>
      <div className="mt-4 flex flex-wrap items-center gap-2">{p.badge && <Badge tone={tone(p.badge)}>{p.badge}</Badge>}<span className="text-xs text-muted-foreground">{p.subtitle}</span></div>
      <h2 className="mt-2 text-2xl font-bold">{p.title}</h2>
      {p.role && <p className="mb-4 mt-1 text-sm text-muted-foreground">{p.role}</p>}
      <StoryText project={p}/>

    </article>
  );
}

export function Photos({ payload }: { payload?: string | undefined }) {
  const [root, setRoot] = useState<ProjectCategory>("★ Flagship");
  const [album, setAlbum] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [view, setView] = useState<"Library" | "Collections">("Collections");
  const [q, setQ] = useState("");
  useEffect(() => {
    if (!payload) return;
    setQ(""); setView("Collections");
    if (payload.startsWith("cat:")) { setRoot(resolvePhotoCategory(payload.slice(4))); setAlbum(null); setOpenId(null); }
    else if (payload.startsWith("album:")) { const f = findAlbum(payload.slice(6)); if (f) { setRoot(f.root); setAlbum(f.album.id); setOpenId(null); } }
    else if (projectById(payload)) { setOpenId(payload); if (payload.startsWith("award-")) setRoot("Awards & Achievements"); }
  }, [payload]);
  const r = photoRoots.find(x => x.id === root);
  if (!r) return null;
  const a = r.albums?.find(x => x.id === album);
  const current = openId ? projectById(openId) : undefined;
  const isAwards = root === "Awards & Achievements";
  const source = q ? (isAwards ? albumItems(rootIds(r)) : workProjects) : view === "Library" ? workProjects : albumItems(a?.ids ?? rootIds(r));
  const items = source.filter(p => `${p.title} ${p.subtitle} ${p.summary ?? ""}`.toLowerCase().includes(q.toLowerCase()));
  const select = (id: ProjectCategory) => { setRoot(id); setAlbum(null); setOpenId(null); setQ(""); setView("Collections"); };
  const heading = current?.title ?? a?.title ?? (view === "Library" ? "Library" : r.id);
  return <div className="flex h-full">
    <aside className="w-52 shrink-0 overflow-y-auto border-r border-border bg-secondary/50 p-2">
      <p className="px-2 py-2 text-xs font-semibold text-muted-foreground">Library</p>
      <Button variant="ghost" className={cn("w-full justify-start", view === "Library" && "bg-accent")} onClick={() => { setView("Library"); setOpenId(null); setQ(""); }}>All Work <span className="ml-auto text-xs">{workProjects.length}</span></Button>
      <p className="px-2 pb-2 pt-5 text-xs font-semibold text-muted-foreground">Collections</p>
      {workRoots.map(x => <Button key={x.id} variant="ghost" className={cn("h-auto min-h-9 w-full justify-start whitespace-normal px-2 text-left text-xs", view === "Collections" && root === x.id && "bg-accent text-primary")} onClick={() => select(x.id)}><span className="flex-1">{x.id}</span><span className="text-muted-foreground">{rootIds(x).length}</span></Button>)}
      <p className="px-2 pb-2 pt-5 text-xs font-semibold text-muted-foreground">Achievements</p>
      <Button variant="ghost" className={cn("h-auto min-h-9 w-full whitespace-normal px-2 text-left text-xs", isAwards && view === "Collections" && "bg-accent text-primary")} onClick={() => select("Awards & Achievements")}><Trophy />Awards & Achievements <span className="ml-auto">8</span></Button>
    </aside>
    <div className="flex min-w-0 flex-1 flex-col">
      <header className="flex min-h-14 shrink-0 items-center gap-2 border-b border-border px-4">
        {(current || a) && <Button variant="ghost" size="icon" aria-label="Back to albums" onClick={() => current ? setOpenId(null) : setAlbum(null)}><ChevronLeft /></Button>}
        <div className="min-w-0 flex-1"><h2 className="truncate text-lg font-bold">{heading}</h2>{!current && <p className="text-xs text-muted-foreground">{items.length} {items.length === 1 ? "item" : "items"}</p>}</div>
        <label className="flex w-40 items-center gap-2 rounded-md bg-secondary px-2"><Search size={14}/><input aria-label="Search Photos" placeholder="Search" value={q} onChange={e => { setQ(e.target.value); setOpenId(null); }} className="h-8 min-w-0 w-full bg-transparent text-xs outline-none" /></label>
      </header>
      <div className="min-h-0 flex-1 overflow-auto p-5">
        {current ? <ProjectArticle p={current} /> : <>
          {!isAwards && view === "Collections" && <div className="mb-5 flex flex-wrap gap-1">{workRoots.map(x => <Button key={x.id} size="sm" variant={root === x.id ? "secondary" : "ghost"} className="text-[11px]" onClick={() => select(x.id)}>{x.id}</Button>)}</div>}
          {r.albums && !a && !q && view === "Collections" ? <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">{r.albums.map(x => {
            const cover = albumItems(x.ids)[0];
            return <Button key={x.id} variant="ghost" onClick={() => setAlbum(x.id)} className="h-auto min-w-0 flex-col items-stretch justify-start whitespace-normal p-0 text-left"><div className="aspect-square overflow-hidden rounded-lg">{cover && <ProjectCover project={cover}/>}</div><p className="mt-2 text-sm font-semibold">{x.title}</p><p className="text-xs text-muted-foreground">{x.ids.length} {x.ids.length === 1 ? "item" : "items"}</p></Button>;
          })}</div> : <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">{items.map(p => <Button key={p.id} variant="ghost" onClick={() => setOpenId(p.id)} className="h-auto min-w-0 flex-col items-stretch justify-start whitespace-normal p-0 text-left"><div className="relative aspect-square overflow-hidden rounded-lg"><ProjectCover project={p}/>{p.badge && <span className="absolute bottom-2 left-2"><Badge tone={tone(p.badge)}>{p.badge}</Badge></span>}</div><p className="mt-2 line-clamp-2 text-sm font-semibold">{p.title}</p><p className="text-xs text-muted-foreground">{p.subtitle}</p></Button>)}</div>}
          {!items.length && <p className="py-12 text-center text-sm text-muted-foreground">No matching work.</p>}
        </>}
      </div>
    </div>
  </div>;
}
