import { useRef, useState, type TouchEvent } from "react";
import { ChevronLeft, Search, Wifi, BatteryFull, Signal, ChevronUp, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import wallpaper from "@/assets/wallpaper-indigo.jpg";
import { profile, stats } from "@/data/portfolio";
import { APPS, type AppId } from "../apps-registry";
import { useOS } from "../store";
import { useClock } from "../useClock";
import { AppIcon } from "../ui";
import { Spotlight } from "../Overlays";
import { AppBody } from "../Desktop";

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
          <AppIcon id={id} className="size-[62px]" size={28} />
          <span className="text-shadow-soft max-w-full truncate text-[11.5px] font-medium text-chrome-foreground">{label(id)}</span>
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
      <img src={wallpaper} alt="" className="absolute inset-0 h-full w-full object-cover" />
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
        <button onClick={() => os.setOverlay("spotlight")} className="glass mx-auto mb-3 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-foreground"><Search size={13} />Search</button>
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
  const x0 = useRef<number | null>(null);
  const [dx, setDx] = useState(0);
  const back = () => os.closeAll();
  return (
    <div className={cn("fixed inset-0 z-30 flex flex-col bg-background text-foreground", dx === 0 && "animate-ios-in")}
      style={{ transform: dx ? `translateX(${dx}px)` : undefined }}
      onTouchStart={(e) => { const t = e.touches[0]; x0.current = t && t.clientX < 30 ? t.clientX : null; }}
      onTouchMove={(e) => { if (x0.current !== null) setDx(Math.max(0, (e.touches[0]?.clientX ?? 0) - x0.current)); }}
      onTouchEnd={() => { if (dx > 90) back(); setDx(0); x0.current = null; }}>
      <div className="glass-strong sticky top-0 z-10 border-x-0 border-t-0">
        <StatusBar />
        <div className="relative flex h-11 items-center px-2">
          <button onClick={back} className="flex items-center text-[17px] font-medium text-primary"><ChevronLeft size={26} />Home</button>
          <h1 className="pointer-events-none absolute inset-x-0 text-center text-[17px] font-semibold">{label(id)}</h1>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden"><AppBody id={id} payload={payload} /></div>
      <HomeIndicator onTap={back} />
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
