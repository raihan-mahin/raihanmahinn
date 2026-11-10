import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { APPS, type AppId } from "./apps-registry";

export type Win = { id: AppId; z: number; x: number; y: number; w: number; h: number; minimized: boolean; maximized: boolean; payload?: string | undefined };
export type Wallpaper = "image" | "aurora" | "dusk" | "ocean";
export type Prefs = { theme: "light" | "dark"; wallpaper: Wallpaper; magnify: boolean; showWidget: boolean };
const DEFAULT_PREFS: Prefs = { theme: "light", wallpaper: "image", magnify: true, showWidget: true };

type Ctx = {
  windows: Win[];
  active: AppId | null;
  open: (id: AppId, payload?: string | undefined) => void;
  close: (id: AppId) => void;
  minimize: (id: AppId) => void;
  toggleMax: (id: AppId) => void;
  focus: (id: AppId) => void;
  move: (id: AppId, x: number, y: number) => void;
  resize: (id: AppId, w: number, h: number) => void;
  closeAll: () => void;
  minimizeAll: () => void;
  prefs: Prefs;
  setPrefs: (p: Partial<Prefs>) => void;
  resetPrefs: () => void;
  overlay: "none" | "spotlight" | "launchpad" | "shortcuts";
  setOverlay: (o: Ctx["overlay"]) => void;
  locked: boolean;
  setLocked: (l: boolean) => void;
};

const OSContext = createContext<Ctx | null>(null);
export const useOS = () => {
  const c = useContext(OSContext);
  if (!c) throw new Error("useOS outside provider");
  return c;
};

export function OSProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<Win[]>([]);
  const [zTop, setZTop] = useState(10);
  const [prefs, setPrefsState] = useState<Prefs>(DEFAULT_PREFS);
  const [overlay, setOverlay] = useState<Ctx["overlay"]>("none");
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("mahin-os-prefs");
      if (raw) setPrefsState({ ...DEFAULT_PREFS, ...JSON.parse(raw) });
    } catch { /* ignore */ }
  }, []);

  const setPrefs = useCallback((p: Partial<Prefs>) => {
    setPrefsState((prev) => {
      const next = { ...prev, ...p };
      try { localStorage.setItem("mahin-os-prefs", JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);
  const resetPrefs = useCallback(() => { setPrefsState(DEFAULT_PREFS); try { localStorage.removeItem("mahin-os-prefs"); } catch { /* ignore */ } }, []);

  const open = useCallback((id: AppId, payload?: string | undefined) => {
    if (id === "launchpad") { setOverlay("launchpad"); return; }
    setOverlay("none");
    setZTop((z) => {
      const nz = z + 1;
      setWindows((ws) => {
        const ex = ws.find((w) => w.id === id);
        if (ex) return ws.map((w) => (w.id === id ? { ...w, z: nz, minimized: false, payload: payload ?? w.payload } : w));
        const meta = APPS[id];
        const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
        const vh = typeof window !== "undefined" ? window.innerHeight : 800;
        const w = Math.min(meta.w, vw - 40);
        const h = Math.min(meta.h, vh - 140);
        const off = (ws.length % 5) * 28;
        const minX = vw >= 1024 && vw - w > 400 ? 380 : 20;
        const x = Math.max(minX, Math.min(vw - w - (vw >= 1024 ? 110 : 20), Math.round((vw - w) / 2) + off + 60));
        const y = Math.max(40, Math.round((vh - h) / 2) + off - 50);
        return [...ws, { id, z: nz, x, y, w, h, minimized: false, maximized: false, payload }];
      });
      return nz;
    });
  }, []);

  const focus = useCallback((id: AppId) => {
    setZTop((z) => { const nz = z + 1; setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, z: nz } : w))); return nz; });
  }, []);
  const close = useCallback((id: AppId) => setWindows((ws) => ws.filter((w) => w.id !== id)), []);
  const minimize = useCallback((id: AppId) => setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: true } : w))), []);
  const toggleMax = useCallback((id: AppId) => setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w))), []);
  const move = useCallback((id: AppId, x: number, y: number) => setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, x, y } : w))), []);
  const resize = useCallback((id: AppId, w0: number, h0: number) => setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, w: w0, h: h0 } : w))), []);
  const closeAll = useCallback(() => setWindows([]), []);
  const minimizeAll = useCallback(() => setWindows((ws) => ws.map((w) => ({ ...w, minimized: true }))), []);

  const active = useMemo(() => {
    const vis = windows.filter((w) => !w.minimized);
    if (!vis.length) return null;
    return vis.reduce((a, b) => (a.z > b.z ? a : b)).id;
  }, [windows]);

  const value: Ctx = { windows, active, open, close, minimize, toggleMax, focus, move, resize, closeAll, minimizeAll, prefs, setPrefs, resetPrefs, overlay, setOverlay, locked, setLocked };
  return <OSContext.Provider value={value}>{children}</OSContext.Provider>;
}
