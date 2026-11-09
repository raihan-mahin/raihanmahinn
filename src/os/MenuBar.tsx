import { useEffect, useRef, useState } from "react";
import { Search, Briefcase, Wifi, BatteryFull } from "lucide-react";
import { cn } from "@/lib/utils";
import { APPS } from "./apps-registry";
import { useOS } from "./store";
import { useClock } from "./useClock";
import { profile } from "@/data/portfolio";

type Item = { label: string; shortcut?: string; action: () => void; divider?: boolean };

export function MenuBar() {
  const os = useOS();
  const now = useClock();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const appName = os.active ? APPS[os.active].name : "Finder";

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpenMenu(null); };
    window.addEventListener("mousedown", h);
    return () => window.removeEventListener("mousedown", h);
  }, []);

  const menus: { name: string; items: Item[] }[] = [
    { name: appName, items: [
      { label: "About Mahin OS", action: () => os.open("notes", "about") },
      { label: "Settings…", shortcut: "⌘,", action: () => os.open("settings") },
      { label: "Lock Screen", action: () => os.setLocked(true), divider: true },
    ] },
    { name: "File", items: [
      { label: "New Finder Window", action: () => os.open("finder") },
      { label: "Open Notes", action: () => os.open("notes") },
      { label: "View Resume", action: () => os.open("preview") },
      { label: "Close Window", shortcut: "⌘W", action: () => os.active && os.close(os.active), divider: true },
    ] },
    { name: "View", items: [
      { label: os.prefs.theme === "dark" ? "Light Appearance" : "Dark Appearance", action: () => os.setPrefs({ theme: os.prefs.theme === "dark" ? "light" : "dark" }) },
      { label: os.prefs.showWidget ? "Hide Desktop Widget" : "Show Desktop Widget", action: () => os.setPrefs({ showWidget: !os.prefs.showWidget }) },
      { label: "Launchpad", action: () => os.setOverlay("launchpad"), divider: true },
      { label: "Spotlight", shortcut: "⌘K", action: () => os.setOverlay("spotlight") },
    ] },
    { name: "Window", items: [
      { label: "Minimize All", action: os.minimizeAll },
      { label: "Close All", action: os.closeAll },
      ...os.windows.map((w, i) => ({ label: `${w.minimized ? "◇ " : "✓ "}${APPS[w.id].name}`, action: () => os.open(w.id), divider: i === 0 })),
    ] },
    { name: "Help", items: [
      { label: "Keyboard Shortcuts", action: () => os.setOverlay("shortcuts") },
      { label: "Recruiter Overview", action: () => os.open("recruiter") },
      { label: "Ask Mahin (Messages)", action: () => os.open("messages") },
      { label: "Email Mahin", action: () => window.open(`mailto:${profile.email}`), divider: true },
    ] },
  ];

  return (
    <div ref={ref} className="glass-chrome fixed inset-x-0 top-0 z-[9000] flex h-7 items-center gap-1 px-2 text-[13px] font-medium">
      <button onClick={() => os.setLocked(true)} className="rounded px-2 font-bold tracking-tight hover:bg-chrome-foreground/15" aria-label="Lock screen">◆ Mahin OS</button>
      <nav className="hidden items-center md:flex" aria-label="Menu bar">
        {menus.map((m, i) => (
          <div key={m.name} className="relative">
            <button onClick={() => setOpenMenu(openMenu === m.name ? null : m.name)}
              onMouseEnter={() => openMenu && setOpenMenu(m.name)}
              className={cn("rounded px-2 py-0.5 hover:bg-chrome-foreground/15", i === 0 && "font-bold", openMenu === m.name && "bg-chrome-foreground/20")}>{m.name}</button>
            {openMenu === m.name && (
              <div role="menu" className="glass-strong shadow-window absolute left-0 top-7 min-w-56 rounded-lg p-1 text-foreground">
                {m.items.map((it) => (
                  <div key={it.label}>
                    {it.divider && <div className="my-1 h-px bg-border" />}
                    <button role="menuitem" onClick={() => { it.action(); setOpenMenu(null); }}
                      className="flex w-full items-center justify-between rounded px-2.5 py-1 text-left text-[13px] hover:bg-primary hover:text-primary-foreground">
                      <span>{it.label}</span>{it.shortcut && <span className="opacity-60">{it.shortcut}</span>}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-1">
        <button onClick={() => os.open("recruiter")} className="flex items-center gap-1 rounded px-2 py-0.5 hover:bg-chrome-foreground/15">
          <Briefcase size={13} /><span className="hidden sm:inline">Recruiters</span>
        </button>
        <span className="hidden px-1 sm:inline"><Wifi size={14} /></span>
        <span className="hidden px-1 sm:inline"><BatteryFull size={16} /></span>
        <button onClick={() => os.setOverlay("spotlight")} aria-label="Spotlight search" className="rounded px-2 py-0.5 hover:bg-chrome-foreground/15"><Search size={14} /></button>
        <span className="px-2 tabular-nums" suppressHydrationWarning>
          {now ? `${now.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}  ${now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}` : ""}
        </span>
      </div>
    </div>
  );
}
