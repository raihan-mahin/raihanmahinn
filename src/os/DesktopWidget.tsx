import { ArrowUpRight, Mail, Linkedin } from "lucide-react";
import { profile, stats, awards, pureitCases } from "@/data/portfolio";
import { useOS } from "./store";
import type { AppId } from "./apps-registry";

export function DesktopWidget() {
  const os = useOS();
  const launches = pureitCases.filter((c) => c.kind === "Product launch").length;
  const champs = awards.filter((a) => a.rank === "Champion").length;
  const start: { emoji: string; title: string; sub: string; app: AppId; payload?: string | undefined }[] = [
    { emoji: "⚡", title: "30-second overview", sub: "For recruiters", app: "recruiter" },
    { emoji: "🤝", title: "Agency & client work", sub: "X Agency · 5 accounts", app: "photos", payload: "cat:Agency & Client Work" },
    { emoji: "🎨", title: "Behance design work", sub: "Billboards · print · packaging", app: "photos", payload: "cat:Brand Design" },
    { emoji: "🎵", title: "Music That Heals", sub: "200K-member community", app: "photos", payload: "cat:Community" },
    { emoji: "🏆", title: `${awards.length} competition results`, sub: `${champs} championships`, app: "photos", payload: "cat:Case Competitions" },
    { emoji: "💧", title: `Pureit: ${launches} launches`, sub: "+ brand transition", app: "photos", payload: "cat:Pureit & GTM" },
  ];
  return (
    <aside className="pointer-events-auto absolute left-6 top-12 hidden w-[340px] flex-col gap-3 lg:flex" aria-label="Intro widget">
      <div className="glass shadow-soft rounded-2xl p-5 text-foreground animate-fade-up">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Welcome</p>
        <h2 className="mt-1 text-3xl font-bold tracking-tight">Hi, I'm Mahin</h2>
        <p className="mt-1 text-sm font-semibold text-primary">{profile.headline}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{profile.tagline}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{profile.bio}</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {stats.slice(0, 6).map((s) => (
            <div key={s.label} className="rounded-xl bg-secondary px-2 py-2 text-center">
              <div className="text-lg font-bold leading-tight">{s.value}</div>
              <div className="text-[10px] font-medium leading-tight text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <a href={`mailto:${profile.email}`} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground"><Mail size={14} />Email</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-secondary py-2 text-xs font-semibold"><Linkedin size={14} />LinkedIn</a>
          <a href={profile.behance} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-secondary py-2 text-xs font-semibold">Bē Behance</a>
        </div>
      </div>
      <div className="glass shadow-soft rounded-2xl p-3 text-foreground animate-fade-up" style={{ animationDelay: "120ms" }}>
        <p className="px-2 pb-2 text-sm font-bold">Start here 👋</p>
        <div className="grid grid-cols-3 gap-1.5">
          {start.map((s) => (
            <button key={s.title} onClick={() => os.open(s.app, s.payload)} className="group rounded-xl bg-secondary p-2 text-left transition hover:bg-accent">
              <div className="flex items-start justify-between"><span className="text-xl">{s.emoji}</span><ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100" /></div>
              <div className="mt-1 text-[12px] font-bold leading-tight">{s.title}</div>
              <div className="text-[10px] leading-tight text-muted-foreground">{s.sub}</div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
