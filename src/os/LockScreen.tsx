import { ArrowRight, Briefcase } from "lucide-react";
import { profile } from "@/data/portfolio";
import { useOS } from "./store";
import { useClock } from "./useClock";

export function LockScreen() {
  const os = useOS();
  const now = useClock();
  const enter = (recruiter = false) => { os.setLocked(false); os.open("notes", "about"); if (recruiter) setTimeout(() => os.open("recruiter"), 50); };
  return (
    <div className="fixed inset-0 z-[9500] flex flex-col items-center justify-between bg-chrome py-16 text-chrome-foreground backdrop-blur-2xl"
      onKeyDown={(e) => e.key === "Enter" && enter()} tabIndex={-1}>
      <div className="text-center animate-fade-up" suppressHydrationWarning>
        <p className="text-lg font-medium opacity-90">{now ? now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" }) : "\u00a0"}</p>
        <p className="text-shadow-soft text-[clamp(5rem,16vw,9rem)] font-bold leading-none tracking-tighter tabular-nums">
          {now ? now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).replace(/\s?[AP]M/i, "") : "\u00a0"}
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 px-6 text-center animate-fade-up">
        <div className="glass grid size-24 place-items-center rounded-full text-3xl font-bold text-foreground">RM</div>
        <div>
          <h1 className="text-shadow-soft text-3xl font-bold tracking-tight md:text-4xl">{profile.shortName}</h1>
          <p className="mt-1 text-sm font-medium opacity-85 md:text-base">{profile.headline}</p>
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <button autoFocus onClick={() => enter()} className="glass flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-foreground transition hover:scale-105">
            Click to enter <ArrowRight size={16} />
          </button>
          <button onClick={() => enter(true)} className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:scale-105">
            <Briefcase size={16} /> Recruiter? 30-second overview
          </button>
        </div>
      </div>
      <p className="text-xs opacity-70">Mahin OS · press Enter to unlock</p>
    </div>
  );
}
