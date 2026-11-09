import { X } from "lucide-react";
import { profile, highlights, workRoots, rootIds } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Portrait } from "./Portrait";
import { useOS } from "./store";
export function DesktopWidget() {
  const os = useOS();
  return <aside aria-label="Start here" className="absolute left-6 top-12 w-[280px] text-chrome-foreground">
    <section className="home-profile rounded-2xl p-4"><div className="flex items-center gap-3"><Portrait className="size-[58px]"/><div><h2 className="text-xl font-bold">Hi, I’m Mahin</h2><p className="mt-1 text-xs leading-snug opacity-75">{profile.headline}</p></div></div><div className="mt-4 grid grid-cols-3 gap-2"><Button size="sm" className="h-10 px-0" onClick={()=>os.open("recruiter")}>Quick View</Button><Button size="sm" variant="secondary" className="h-10 px-0" onClick={()=>os.open("preview")}>Resume</Button><Button size="sm" variant="secondary" className="h-10 px-0" asChild><a href={`mailto:${profile.email}`}>Email</a></Button></div></section>
    <section className="relative mt-4 -rotate-1 rounded-lg bg-sticky p-4 text-sticky-foreground shadow-soft"><Button variant="ghost" size="icon" aria-label="Close widget" className="absolute right-1 top-1 size-7" onClick={()=>os.setPrefs({showWidget:false})}><X/></Button><h2 className="text-lg font-bold">Start here 👋</h2><div className="my-3 flex gap-4">{highlights.map(h=><p key={h.value} className="flex-1 text-xs leading-snug"><strong className="block text-xl">{h.value}</strong>{h.label}</p>)}</div><div className="space-y-0.5">{workRoots.map(r => <Button key={r.id} variant="ghost" size="sm" className="h-auto min-h-7 w-full justify-between whitespace-normal px-0 text-left text-xs text-sticky-foreground" onClick={() => os.open("photos", `cat:${r.id}`)}><span>{r.id}</span><span className="opacity-60">{rootIds(r).length} →</span></Button>)}<Button variant="ghost" size="sm" className="w-full justify-between px-0 text-xs text-sticky-foreground" onClick={() => os.open("photos", "cat:Awards & Achievements")}>Awards & Achievements <span>8 →</span></Button></div></section>
  </aside>;
}
