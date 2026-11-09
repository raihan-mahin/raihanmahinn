import { Folder, StickyNote, MessageCircle, Images, FileText, Terminal, Settings, CalendarDays, Trash2, Music, LayoutGrid, Briefcase, Trophy, Clapperboard, type LucideIcon } from "lucide-react";

export type AppId = "finder" | "notes" | "messages" | "photos" | "preview" | "terminal" | "settings" | "calendar" | "music" | "trash" | "launchpad" | "recruiter" | "awards" | "brands";

export type AppMeta = { id: AppId; name: string; mobileName?: string; icon: LucideIcon; tile: string; w: number; h: number };

export const APPS: Record<AppId, AppMeta> = {
  finder: { id: "finder", name: "Finder", mobileName: "Files", icon: Folder, tile: "ic-finder", w: 900, h: 560 },
  notes: { id: "notes", name: "Notes", icon: StickyNote, tile: "ic-notes", w: 860, h: 560 },
  messages: { id: "messages", name: "Messages", icon: MessageCircle, tile: "ic-messages", w: 520, h: 600 },
  photos: { id: "photos", name: "Photos", icon: Images, tile: "ic-photos", w: 980, h: 640 },
  preview: { id: "preview", name: "Preview", mobileName: "Resume", icon: FileText, tile: "ic-preview", w: 760, h: 680 },
  terminal: { id: "terminal", name: "Terminal", icon: Terminal, tile: "ic-terminal", w: 680, h: 420 },
  settings: { id: "settings", name: "Settings", icon: Settings, tile: "ic-settings", w: 620, h: 480 },
  calendar: { id: "calendar", name: "Calendar", icon: CalendarDays, tile: "ic-calendar", w: 820, h: 560 },
  music: { id: "music", name: "Music", icon: Music, tile: "ic-music", w: 720, h: 480 },
  trash: { id: "trash", name: "Trash", icon: Trash2, tile: "ic-trash", w: 560, h: 400 },
  launchpad: { id: "launchpad", name: "Launchpad", icon: LayoutGrid, tile: "ic-launchpad", w: 0, h: 0 },
  recruiter: { id: "recruiter", name: "Recruiter Overview", mobileName: "30-sec", icon: Briefcase, tile: "ic-recruiter", w: 720, h: 600 },
  awards: { id: "awards", name: "Awards", icon: Trophy, tile: "ic-awards", w: 980, h: 640 },
  brands: { id: "brands", name: "Agency Work", mobileName: "Agency", icon: Clapperboard, tile: "ic-brands", w: 980, h: 640 },
};

export const DOCK: AppId[] = ["finder", "launchpad", "notes", "messages", "photos", "preview", "terminal", "calendar", "music", "settings", "trash"];
