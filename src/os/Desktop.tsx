import { useEffect } from "react";
import { FileText, Folder, Trophy, UserRound, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import wallpaper from "@/assets/wallpaper-indigo.jpg";
import { OSProvider, useOS } from "./store";
import type { AppId } from "./apps-registry";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { Window } from "./Window";
import { LockScreen } from "./LockScreen";
import { Spotlight, Launchpad, Shortcuts } from "./Overlays";
import { DesktopWidget } from "./DesktopWidget";
import { Finder } from "./apps/Finder";
import { Notes } from "./apps/Notes";
import { Messages } from "./apps/Messages";
import { Photos } from "./apps/Photos";
import { Preview } from "./apps/Preview";
import { Terminal } from "./apps/Terminal";
import { useIsMobile } from "@/hooks/use-mobile";
import { IOSShell } from "./mobile/IOS";
import { Settings, Calendar, Music, TrashApp, Recruiter } from "./apps/Misc";

export function AppBody({ id, payload }: { id: AppId; payload?: string | undefined }) {
  switch (id) {
    case "finder": return <Finder />;
    case "notes": return <Notes payload={payload} />;
    case "messages": return <Messages />;
    case "photos": return <Photos payload={payload} />;
    case "preview": return <Preview />;
    case "terminal": return <Terminal />;
    case "settings": return <Settings />;
    case "calendar": return <Calendar />;
    case "music": return <Music />;
    case "trash": return <TrashApp />;
    case "recruiter": return <Recruiter />;
    case "awards": return <Photos payload={payload ?? "cat:Competitions"} />;
    case "brands": return <Photos payload={payload ?? "album:agency"} />;
    default: return null;
  }
}

function Shell() {
  const os = useOS();
  const mobile = useIsMobile();
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") { e.preventDefault(); os.setOverlay(os.overlay === "spotlight" ? "none" : "spotlight"); }
      else if (mod && e.key.toLowerCase() === "l") { e.preventDefault(); os.setOverlay("launchpad"); }
      else if (mod && e.key.toLowerCase() === "m" && os.active) { e.preventDefault(); os.minimize(os.active); }
      else if (e.key === "Escape") os.setOverlay("none");
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [os]);

  const icons: { label: string; icon: React.ReactNode; app: AppId; payload?: string | undefined }[] = [
    { label: "Quick View", icon: <UserRound size={40} className="text-chrome-foreground" />, app: "recruiter" },
    { label: "Resume.pdf", icon: <FileText size={40} className="text-chrome-foreground" />, app: "preview" },
    { label: "Work", icon: <Folder size={44} className="fill-primary/60 text-primary" />, app: "photos", payload: "cat:★ Flagship" },
    { label: "Experience", icon: <Briefcase size={40} className="text-chrome-foreground" />, app: "finder" },
    { label: "Contact.txt", icon: <FileText size={40} className="text-chrome-foreground" />, app: "messages" },
    { label: "Awards", icon: <Trophy size={40} className="text-gold" />, app: "photos", payload: "cat:Awards & Achievements" },
  ];

  if (mobile) return <IOSShell />;
  return (
    <div className={cn("fixed inset-0 overflow-hidden", os.prefs.theme === "dark" && "dark")}>
      {os.prefs.wallpaper === "image"
        ? <img src={wallpaper} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        : <div className={cn("absolute inset-0", `wp-${os.prefs.wallpaper}`)} />}
      <h1 className="sr-only">Mahin OS — Raihan Mahin, brand marketing and creative portfolio</h1>
      <MenuBar />
      {os.prefs.showWidget && <DesktopWidget />}
      <div className="absolute right-4 top-12 flex flex-col gap-4">
        {icons.map((i) => (
          <Button variant="ghost" key={i.label} onDoubleClick={() => os.open(i.app, i.payload)} onClick={(e) => e.detail === 0 && os.open(i.app, i.payload)}
            className="flex h-auto w-20 flex-col items-center gap-1 rounded-lg p-1.5 focus:bg-chrome" title="Double-click to open">
            {i.icon}<span className="text-shadow-soft text-xs font-semibold text-chrome-foreground">{i.label}</span>
          </Button>))}
      </div>
      {os.windows.map((w) => <Window key={w.id} win={w}><AppBody id={w.id} payload={w.payload} /></Window>)}
      <Dock />
      {os.overlay === "spotlight" && <Spotlight />}
      {os.overlay === "launchpad" && <Launchpad />}
      {os.overlay === "shortcuts" && <Shortcuts />}
      {os.locked && <LockScreen />}
    </div>
  );
}

export function MahinOS() {
  return <OSProvider><Shell /></OSProvider>;
}
