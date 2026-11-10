import { Button } from "@/components/ui/button";
import { Portrait } from "../Portrait";
import { useRef, useState, type TouchEvent } from "react";
import { Search, Wifi, BatteryFull, Signal, ChevronUp, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import wallpaper from "@/assets/wallpaper-indigo.jpg";
import { profile, highlights } from "@/data/portfolio";
import { APPS, MOBILE_APPS, type AppId } from "../apps-registry";
import { useOS } from "../store";
import { useClock } from "../useClock";
import { AppIcon } from "../ui";
import { Spotlight } from "../Overlays";
import { AppBody } from "../Desktop";
import { resolvePhotoCategory, type ProjectCategory } from "@/data/portfolio";
import { IOSPage, IOSNotes, IOSPhotos, IOSFiles, IOSSettings, IOSRecruiter } from "./MobileApps";
import { Messages } from "../apps/Messages";

const PAGE1 = MOBILE_APPS;
const DOCK: AppId[] = ["notes", "messages", "photos", "music"];
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
  const tileClass = "flex h-auto min-h-[80px] min-w-0 flex-col items-center justify-start gap-1.5 rounded-none p-0 animate-ios-zoom active:scale-90 hover:bg-transparent [&_svg]:size-[56px]";
  const tileLabel = "text-shadow-soft max-w-full truncate text-[12px] font-medium text-chrome-foreground";
  return <div className="grid w-full shrink-0 snap-center grid-cols-4 content-start gap-x-4 gap-y-4 px-6">
    {ids.map(id => <Button variant="ghost" key={id} onClick={() => os.open(id)} className={tileClass}><AppIcon id={id} className="size-[56px] shrink-0" /><span className={tileLabel}>{label(id)}</span></Button>)}
    <Button variant="ghost" asChild className={tileClass}><a aria-label="LinkedIn" href={profile.linkedin} target="_blank" rel="noreferrer"><span aria-hidden="true" className="flex size-[56px] shrink-0 items-center justify-center"><span className="linkedin-icon translate-x-[4px]">in</span></span><span className={tileLabel}>LinkedIn</span></a></Button>
  </div>;
}

function IOSHome() {
  const os = useOS();
  return (
    <div className="fixed inset-0 flex flex-col">
      {os.prefs.wallpaper === "image" ? <img src={wallpaper} alt="" className="absolute inset-0 h-full w-full object-cover" /> : <div className={cn("absolute inset-0", `wp-${os.prefs.wallpaper}`)} />}
      <div className="relative flex min-h-0 flex-1 flex-col">
        <StatusBar light />
        <div aria-label="Home apps" tabIndex={0} className="ios-home-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain pt-1 pb-4 [scrollbar-width:none]">
          <div className="flex w-full flex-col gap-3">
            <section className="home-profile mx-5 rounded-[22px] p-4 text-chrome-foreground">
              <div className="flex items-center gap-3"><Portrait className="size-[58px]" /><div className="min-w-0"><h2 className="text-[22px] font-bold">{profile.shortName}</h2><p className="mt-0.5 text-[12px] leading-snug opacity-75">{profile.headline}</p></div></div>
              <div className="mt-4 grid grid-cols-3 gap-2"><Button className="h-11 px-0 text-xs" onClick={() => os.open("recruiter")}>Quick View</Button><Button variant="secondary" className="h-11 px-0 text-xs" onClick={() => os.open("preview")}>Resume</Button><Button variant="secondary" className="h-11 px-0 text-xs" asChild><a href={`mailto:${profile.email}`}>Email</a></Button></div>
            </section>
            <section className="mx-5 rounded-[20px] bg-sticky px-4 py-3 text-sticky-foreground"><h2 className="text-[19px] font-bold">Start here 👋</h2><div className="mt-2 flex gap-5">{highlights.map(h => <p key={h.value} className="flex-1 text-[12px] leading-snug"><strong className="mr-1 text-[19px]">{h.value}</strong>{h.label}</p>)}</div><Button className="mt-3 h-11 w-full bg-island text-chrome-foreground hover:bg-island/90" onClick={() => os.open("photos", "cat:Featured")}>See all projects →</Button></section>
            <Grid ids={PAGE1} />
          </div>
        </div>
        <button onClick={() => os.setOverlay("spotlight")} className="glass mx-auto mb-3 flex min-h-9 shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-foreground"><Search size={13} />Search</button>
        <div className="glass mx-3 flex shrink-0 justify-around rounded-[2rem] px-3 py-3">
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
  const cat = payload?.startsWith("cat:") ? resolvePhotoCategory(payload.slice(4)) : undefined;
  const alb = payload?.startsWith("album:") ? payload.slice(6) : undefined;
  const pid = payload && !payload.startsWith("cat:") && !alb ? payload : undefined;
  let body: React.ReactNode;
  switch (id) {
    case "recruiter": body = <IOSRecruiter onHome={home} />; break;
    case "notes": body = <IOSNotes onHome={home} payload={payload} />; break;
    case "messages": body = <Messages mobile onHome={home} payload={payload}/>; break;
    case "photos": body = <IOSPhotos key={payload} onHome={home} initial={cat} initialAlbum={alb} initialPid={pid} />; break;
    case "awards": body = <IOSPhotos onHome={home} initial="Awards & Achievements" title="Awards" initialPid={pid} />; break;
    case "brands": body = <IOSPhotos onHome={home} initial="XYZ Agency" title="XYZ Agency" />; break;
    case "finder": body = <IOSFiles onHome={home} />; break;
    case "settings": body = <IOSSettings onHome={home} />; break;
    default: body = <IOSPage title={label(id)} backLabel="Home" onBack={home} large={false} inset={false}><div className="h-[calc(100dvh-140px)]"><AppBody id={id} payload={payload} /></div></IOSPage>;
  }
  return (
    <div className={cn("fixed inset-0 z-30 flex flex-col overflow-hidden bg-background text-foreground", ["recruiter", "finder", "notes", "messages", "settings", "music", "photos", "awards"].includes(id) && "native-dark")}>
      <div className="absolute inset-x-0 top-0 z-20"><StatusBar light={["recruiter", "finder", "notes", "messages", "settings", "music", "photos", "awards"].includes(id)} /></div>
      <div className="relative min-h-0 flex-1">{body}</div>
      <div className="absolute inset-x-0 bottom-0 z-20"><HomeIndicator light={["recruiter", "finder", "notes", "messages", "settings", "music", "photos", "awards"].includes(id)} onTap={home} /></div>
    </div>
  );
}

export function IOSShell() {
  const os = useOS();
  const top = os.windows.filter((w) => !w.minimized).sort((a, b) => b.z - a.z)[0];
  return (
    <div className={cn("fixed inset-0 overflow-hidden", os.prefs.theme === "dark" && "dark")}>
      <h1 className="sr-only">Mahin OS — Raihan Mahin portfolio</h1>
      <div inert={Boolean(top)} aria-hidden={Boolean(top)}><IOSHome /></div>
      {top && <IOSApp key={top.id} id={top.id} payload={top.payload} />}
      {os.overlay === "spotlight" && <Spotlight />}
      {os.locked && <IOSLock />}
    </div>
  );
}
