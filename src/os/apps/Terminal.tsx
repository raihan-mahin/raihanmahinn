import { useEffect, useRef, useState } from "react";
import { profile, projects, awards, skills, experience } from "@/data/portfolio";
import { useOS } from "../store";
import { APPS, type AppId } from "../apps-registry";

type Line = { kind: "in" | "out"; text: string };
const HELP = `Available commands:
  help        show this list
  about       who is Mahin
  experience  work timeline
  projects    project list
  awards      competition results
  skills      skills & tools
  contact     email & links
  open <app>  open an app (finder, notes, photos, preview…)
  date        current date & time
  history     command history
  clear       clear the screen`;

export function Terminal() {
  const os = useOS();
  const [lines, setLines] = useState<Line[]>([{ kind: "out", text: `Mahin OS Terminal — type 'help' to begin.` }]);
  const [val, setVal] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const end = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => end.current?.scrollIntoView(), [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim(); const [c, ...args] = cmd.split(/\s+/);
    let out = "";
    switch (c?.toLowerCase()) {
      case "": break;
      case "help": out = HELP; break;
      case "about": case "whoami": out = `${profile.fullName} (${profile.shortName})\n${profile.headline}\n${profile.location}\n\n${profile.bio}`; break;
      case "experience": out = experience.map((e) => `• ${e.period.padEnd(20)} ${e.role} — ${e.org}`).join("\n"); break;
      case "projects": out = projects.filter((p) => !p.id.startsWith("award-")).map((p) => `• ${p.title}  [${p.subtitle}]`).join("\n"); break;
      case "awards": out = awards.map((a) => `🏆 ${a.rank.padEnd(14)} ${a.title} — ${a.organizer}`).join("\n"); break;
      case "skills": out = Object.entries(skills).map(([k, v]) => `${k}: ${v.join(", ")}`).join("\n"); break;
      case "contact": out = `email     ${profile.email}\nlinkedin  ${profile.linkedin}\nbehance   ${profile.behance}`; break;
      case "date": out = new Date().toString(); break;
      case "history": out = hist.map((h, i) => `${i + 1}  ${h}`).join("\n") || "(empty)"; break;
      case "echo": out = args.join(" "); break;
      case "open": {
        const id = args[0]?.toLowerCase() as AppId;
        if (id && id in APPS) { os.open(id); out = `Opening ${APPS[id].name}…`; } else out = `open: unknown app '${args[0] ?? ""}'`;
        break;
      }
      case "clear": setLines([]); setHist((h) => [...h, cmd]); return;
      case "sudo": out = "Nice try. 😄 Permission denied."; break;
      default: out = `command not found: ${c}. Type 'help'.`;
    }
    setLines((l) => [...l, { kind: "in", text: cmd }, ...(out ? [{ kind: "out" as const, text: out }] : [])]);
    if (cmd) setHist((h) => [...h, cmd]);
  };

  return (
    <div className="h-full overflow-auto bg-terminal p-3 font-mono text-[13px] text-terminal-foreground" onClick={() => input.current?.focus()}>
      {lines.map((l, i) => <pre key={i} className="whitespace-pre-wrap">{l.kind === "in" ? <><span className="text-primary">mahin@os</span> ~ % {l.text}</> : l.text}</pre>)}
      <div className="flex"><span className="shrink-0 text-primary">mahin@os</span>&nbsp;~ %&nbsp;
        <input ref={input} autoFocus aria-label="Terminal input" value={val} onChange={(e) => setVal(e.target.value)} spellCheck={false}
          onKeyDown={(e) => {
            if (e.key === "Enter") { run(val); setVal(""); setHi(-1); }
            if (e.key === "ArrowUp" && hist.length) { e.preventDefault(); const n = hi < 0 ? hist.length - 1 : Math.max(0, hi - 1); setHi(n); setVal(hist[n] ?? ""); }
            if (e.key === "ArrowDown" && hi >= 0) { e.preventDefault(); const n = hi + 1; if (n >= hist.length) { setHi(-1); setVal(""); } else { setHi(n); setVal(hist[n] ?? ""); } }
          }} className="flex-1 bg-transparent caret-terminal-foreground outline-none" />
      </div>
      <div ref={end} />
    </div>
  );
}
