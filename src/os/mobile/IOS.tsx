import { useRef, useState, type TouchEvent } from "react";
import { Search, Wifi, BatteryFull, Signal, ChevronUp, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import wallpaper from "@/assets/wallpaper-indigo.jpg";
import { profile, stats } from "@/data/portfolio";
import { APPS, type AppId } from "../apps-registry";
import { useOS } from "../store";
import { useClock } from "../useClock";
import { AppIcon } from "../ui";
import { Spotlight } from "../Overlays";
import { AppBody } from "../Desktop";
import type { ProjectCategory } from "@/data/portfolio";
import { IOSPage, IOSNotes, IOSPhotos, IOSFiles, IOSSettings } from "./MobileApps";

const PAGE1: AppId[] = ["photos", "notes", "finder", "messages", "brands", "awards", "preview", "recruiter", "settings", "calendar", "music", "terminal"];
const PAGE2: AppId[] = ["trash"];
const DOCK: AppId[] = ["messages", "photos", "notes", "preview"];
const label = (id: AppId) => APPS[id].mobileName ?? APPS[id].name;
const time = (d: Date | null) => (d ? d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).replace(/\s?[AP]M/i, "") : "");

function StatusBar({ light }: { light?: boolean }) {
  const now = useClock();
  return (
    <div className={cn("pt-safe relative z-20 flex h-12 shrink-0 items-center justify-between px-7 text-[15px] font-semibold", light ? "text-chrome-foreground" : "text-foreground")}>
      <span className="tabular-nums" suppressHydrationWarning>{time(now)}</span>
      <span aria-hidden className="absolute left-1/2 top-[max(env(safe-area-inset-top),8px)] h-[30px] w-[110px] -translate-x-1/2 rounded-full bg-island" />
      <span className="flex items-center gap-1.5"><Signal size={15} /><Wifi size={15} /><BatteryFull size={20} /></span>
    </div>
  );
}

function HomeIndicator({ onTap, light }: { onTap?: () => void; light?: boolean }) {
  return (
    <button aria-label="Go home" onClick={onTap} className="pb-safe flex w-full shrink-0 justify-center pt-2">
      <span className={cn("h-[5px] w-32 rounded-full", light ? "bg-chrome-foreground" : "bg-foreground")} />
    </button>
  );
}

function IOSLock() {
  const os = useOS();
  const now = useClock();
  const y0 = useRef<number | null>(null);
  const [dy, setDy] = useState(0);
  const unlock = () => { os.setLocked(false); os.closeAll(); };
  return (
    <div className="fixed inset-0 z-50 flex flex-col text-chrome-foreground transition-transform"
      style={{ transform: `translateY(${Math.min(0, dy)}px)` }}
      onTouchStart={(e: TouchEvent) => { y0.current = e.touches[0]?.clientY ?? null; }}
      onTouchMove={(e: TouchEvent) => { if (y0.current !== null) setDy((e.touches[0]?.clientY ?? 0) - y0.current); }}
      onTouchEnd={() => { if (dy < -80) unlock(); setDy(0); y0.current = null; }}>
      <img src={wallpaper} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-chrome" />
      <div className="relative flex flex-1 flex-col">
        <StatusBar light />
        <div className="mt-6 flex flex-col items-center animate-fade-up" suppressHydrationWarning>
          <Lock size={18} className="opacity-80" />
          <p className="mt-2 text-lg font-semibold opacity-90">{now ? now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" }) : "\u00a0"}</p>
          <p className="text-shadow-soft text-[6.5rem] font-bold leading-none tracking-tighter tabular-nums">{time(now) || "\u00a0"}</p>
        </div>
        <div className="mx-4 mt-8 space-y-2">
          <button onClick={unlock} className="glass flex w-full items-start gap-3 rounded-2xl p-3 text-left text-foreground animate-fade-up">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">RM</div>
            <div className="min-w-0"><p className="flex justify-between text-[13px] font-bold"><span>{profile.shortName}</span><span className="font-normal text-muted-foreground">now</span></p>
              <p className="text-[13px] leading-snug">{profile.headline}. Tap to open my portfolio 👋</p></div>
          </button>
          <button onClick={() => { os.setLocked(false); os.closeAll(); os.open("recruiter"); }} className="glass flex w-full items-center gap-3 rounded-2xl p-3 text-left text-foreground">
            <AppIcon id="recruiter" className="size-10" size={18} /><div><p className="text-[13px] font-bold">Recruiter?</p><p className="text-[13px]">See the 30-second overview</p></div>
          </button>
        </div>
        <button onClick={unlock} className="mt-auto flex flex-col items-center gap-1 pb-3 text-sm font-semibold">
          <ChevronUp size={18} className="animate-bounce" />Swipe up or tap to unlock
        </button>
        <HomeIndicator light onTap={unlock} />
      </div>
    </div>
  );
}

function Grid({ ids }: { ids: AppId[] }) {
  const os = useOS();
  return (
    <div className="grid w-full shrink-0 snap-center grid-cols-4 content-start gap-x-4 gap-y-5 px-6">
      {ids.map((id, i) => (
        <button key={id} onClick={() => os.open(id)} className="flex flex-col items-center gap-1.5 animate-ios-zoom active:scale-90" style={{ animationDelay: `${i * 20}ms` }}>
          <AppIcon id={id} className="size-[64px]" />
          <span className="text-shadow-soft max-w-full truncate text-[12px] font-medium text-chrome-foreground">{label(id)}</span>
        </button>
      ))}
    </div>
  );
}

function IOSHome() {
  const os = useOS();
  const [page, setPage] = useState(0);
  return (
    <div className="fixed inset-0 flex flex-col">
      {os.prefs.wallpaper === "image" ? <img src={wallpaper} alt="" className="absolute inset-0 h-full w-full object-cover" /> : <div className={cn("absolute inset-0", `wp-${os.prefs.wallpaper}`)} />}
      <div className="relative flex min-h-0 flex-1 flex-col">
        <StatusBar light />
        <div className="flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden pt-3 [scrollbar-width:none]"
          onScroll={(e) => setPage(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}>
          <div className="flex w-full shrink-0 snap-center flex-col gap-5">
            <button onClick={() => os.open("notes", "about")} className="glass mx-6 rounded-3xl p-4 text-left text-foreground animate-ios-zoom">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Portfolio</p>
              <p className="text-2xl font-bold tracking-tight">Hi, I'm Mahin 👋</p>
              <p className="text-xs font-semibold text-primary">{profile.headline}</p>
              <div className="mt-3 grid grid-cols-4 gap-1.5">
                {[stats[0], stats[3], stats[4], stats[5]].map((s) => s && (
                  <div key={s.label} className="rounded-xl bg-secondary px-1 py-1.5 text-center"><p className="text-base font-bold leading-tight">{s.value}</p><p className="text-[9px] leading-tight text-muted-foreground">{s.label}</p></div>))}
              </div>
              <span role="button" tabIndex={0} onClick={(e) => { e.stopPropagation(); os.open("photos", "cat:Brand Design"); }}
                className="mt-2 flex min-h-11 items-center justify-center rounded-xl bg-primary text-[13px] font-semibold text-primary-foreground">🎨 Explore Behance projects</span>
            </button>
            <Grid ids={PAGE1} />
          </div>
          <div className="flex w-full shrink-0 snap-center flex-col gap-5">
            <div className="glass mx-6 rounded-3xl p-4 text-foreground">
              <p className="text-sm font-bold">Say hello</p>
              <div className="mt-2 grid grid-cols-3 gap-2 text-xs font-semibold">
                <a href={`mailto:${profile.email}`} className="rounded-xl bg-primary py-2 text-center text-primary-foreground">Email</a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="rounded-xl bg-secondary py-2 text-center">LinkedIn</a>
                <a href={profile.behance} target="_blank" rel="noreferrer" className="rounded-xl bg-secondary py-2 text-center">Behance</a>
              </div>
            </div>
            <Grid ids={PAGE2} />
          </div>
        </div>
        <div className="flex justify-center gap-2 py-2" aria-hidden>
          {[0, 1].map((i) => <span key={i} className={cn("size-[7px] rounded-full", page === i ? "bg-chrome-foreground" : "bg-chrome-foreground/40")} />)}
        </div>
        <button onClick={() => os.setOverlay("spotlight")} className="glass mx-auto mb-3 flex min-h-9 items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-foreground"><Search size={13} />Search</button>
        <div className="glass mx-3 flex justify-around rounded-[2rem] px-3 py-3">
          {DOCK.map((id) => <button key={id} aria-label={`Open ${label(id)}`} onClick={() => os.open(id)} className="active:scale-90"><AppIcon id={id} className="size-[60px]" size={28} /></button>)}
        </div>
        <HomeIndicator light />
      </div>
    </div>
  );
}

function IOSApp({ id, payload }: { id: AppId; payload?: string | undefined }) {
  const os = useOS();
  const home = () => os.closeAll();
  const cat = payload?.startsWith("cat:") ? (payload.slice(4) as ProjectCategory) : undefined;
  const pid = payload && !payload.startsWith("cat:") ? payload : undefined;
  let body: React.ReactNode;
  switch (id) {
    case "notes": body = <IOSNotes onHome={home} payload={payload} />; break;
    case "photos": body = <IOSPhotos key={payload} onHome={home} initial={cat} initialPid={pid} />; break;
    case "awards": body = <IOSPhotos onHome={home} initial="Case Competitions" title="Awards" initialPid={pid} />; break;
    case "brands": body = <IOSPhotos onHome={home} initial="Agency Work" title="Agency Work" />; break;
    case "finder": body = <IOSFiles onHome={home} />; break;
    case "settings": body = <IOSSettings onHome={home} />; break;
    default: body = <IOSPage title={label(id)} backLabel="Home" onBack={home} large={false} inset={false}><div className="h-[calc(100dvh-140px)]"><AppBody id={id} payload={payload} /></div></IOSPage>;
  }
  return (
    <div className="fixed inset-0 z-30 flex flex-col overflow-hidden bg-background text-foreground">
      <div className="absolute inset-x-0 top-0 z-20"><StatusBar /></div>
      <div className="relative min-h-0 flex-1">{body}</div>
      <div className="absolute inset-x-0 bottom-0 z-20"><HomeIndicator onTap={home} /></div>
    </div>
  );
}

export function IOSShell() {
  const os = useOS();
  const top = os.windows.filter((w) => !w.minimized).sort((a, b) => b.z - a.z)[0];
  return (
    <div className={cn("fixed inset-0 overflow-hidden", os.prefs.theme === "dark" && "dark")}>
      <h1 className="sr-only">Mahin OS — Raihan Mahin portfolio</h1>
      <IOSHome />
      {top && <IOSApp key={top.id} id={top.id} payload={top.payload} />}
      {os.overlay === "spotlight" && <Spotlight />}
      {os.locked && <IOSLock />}
    </div>
  );
}
