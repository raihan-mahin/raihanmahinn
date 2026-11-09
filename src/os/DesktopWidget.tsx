import { X } from "lucide-react";
import { profile, highlights } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Portrait } from "./Portrait";
import { useOS } from "./store";
export function DesktopWidget() {
  const os = useOS();
  return <aside aria-label="Start here" className="absolute left-6 top-14 w-[290px] text-chrome-foreground">
    <section className="home-profile rounded-2xl p-4"><div className="flex items-center gap-3"><Portrait className="size-[58px]"/><div><h2 className="text-xl font-bold">{profile.shortName}</h2><p className="mt-1 text-xs leading-snug opacity-75">{profile.headline}</p></div></div><div className="mt-4 grid grid-cols-3 gap-2"><Button size="sm" className="h-10 px-0" onClick={()=>os.open("recruiter")}>Quick View</Button><Button size="sm" variant="secondary" className="h-10 px-0" onClick={()=>os.open("preview")}>Resume</Button><Button size="sm" variant="secondary" className="h-10 px-0" asChild><a href={`mailto:${profile.email}`}>Email</a></Button></div></section>
    <section className="relative mt-5 -rotate-1 rounded-lg bg-sticky p-4 text-sticky-foreground shadow-soft"><Button variant="ghost" size="icon" aria-label="Close widget" className="absolute right-1 top-1 size-7" onClick={()=>os.setPrefs({showWidget:false})}><X/></Button><h2 className="text-lg font-bold">Start here 👋</h2><div className="my-3 flex gap-4">{highlights.map(h=><p key={h.value} className="flex-1 text-xs leading-snug"><strong className="block text-xl">{h.value}</strong>{h.label}</p>)}</div><Button className="h-10 w-full bg-island text-chrome-foreground hover:bg-island/90" onClick={()=>os.open("photos","cat:Featured")}>See all projects →</Button><div className="mt-3 grid grid-cols-2 gap-1">{[["About","notes","about"],["Experience","finder",""],["Competitions","photos","cat:Competitions"],["Skills","notes","skills"]].map(([label,id,payload])=><Button key={label} variant="ghost" size="sm" className="justify-start px-1 text-sticky-foreground" onClick={()=>os.open(id as "notes"|"finder"|"photos",payload||undefined)}>{label} →</Button>)}</div></section>
  </aside>;
}
