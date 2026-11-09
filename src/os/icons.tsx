/* Original SVG interpretations of familiar desktop app icons (custom drawings, not Apple assets).
   Illustration colours live here as artwork, not UI theme tokens. */
import { useEffect, useId, useState } from "react";
import type { AppId } from "./apps-registry";

const R = 22.5;
function Tile({ id, from, to, children, stroke = true }: { id: string; from: string; to: string; children?: React.ReactNode; stroke?: boolean }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={from} /><stop offset="1" stopColor={to} /></linearGradient>
        <linearGradient id={`${id}gl`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".38" /><stop offset=".5" stopColor="#fff" stopOpacity="0" /></linearGradient>
        <clipPath id={`${id}clip`}><rect x="4" y="4" width="92" height="92" rx={R} /></clipPath>
      </defs>
      <rect x="4" y="5.5" width="92" height="92" rx={R} fill="#000" opacity=".18" />
      <g clipPath={`url(#${id}clip)`}>
        <rect x="4" y="4" width="92" height="92" fill={`url(#${id}bg)`} />
        {children}
        <rect x="4" y="4" width="92" height="46" fill={`url(#${id}gl)`} opacity=".6" />
      </g>
      {stroke && <rect x="4.5" y="4.5" width="91" height="91" rx={R - 0.5} fill="none" stroke="#000" strokeOpacity=".12" />}
    </>
  );
}

function gearPath(cx: number, cy: number, rOut: number, rIn: number, teeth: number) {
  const pts: string[] = [];
  for (let i = 0; i < teeth * 2; i++) {
    const a = (Math.PI * i) / teeth;
    const r = i % 2 === 0 ? rOut : rIn;
    const a1 = a - Math.PI / teeth / 2.2, a2 = a + Math.PI / teeth / 2.2;
    pts.push(`${cx + r * Math.cos(a1)},${cy + r * Math.sin(a1)}`, `${cx + r * Math.cos(a2)},${cy + r * Math.sin(a2)}`);
  }
  return `M${pts.join("L")}Z`;
}

function CalendarFace({ id }: { id: string }) {
  const [d, setD] = useState<Date | null>(null);
  useEffect(() => setD(new Date()), []);
  return (
    <Tile id={id} from="#ffffff" to="#eceef2">
      <text x="50" y="31" textAnchor="middle" fontSize="15" fontWeight="600" fill="#f2433a" fontFamily="Geist, system-ui">{d ? d.toLocaleDateString("en", { weekday: "short" }).toUpperCase() : ""}</text>
      <text x="50" y="80" textAnchor="middle" fontSize="50" fontWeight="300" fill="#1d1d1f" fontFamily="Geist, system-ui" letterSpacing="-2">{d ? d.getDate() : ""}</text>
    </Tile>
  );
}

export function AppleStyleAppIcon({ app, className }: { app: AppId; className?: string }) {
  const id = useId().replace(/:/g, "");
  let body: React.ReactNode;
  switch (app) {
    case "finder":
      body = (
        <Tile id={id} from="#6fd0ff" to="#1f8bf0">
          <path d="M53 4 C47 30 44 44 50 58 C46 70 47 84 52 96 L96 96 L96 4Z" fill="#e9f3fb" />
          <path d="M53 4 C47 30 44 44 50 58 C46 70 47 84 52 96" fill="none" stroke="#123a66" strokeWidth="3" strokeLinecap="round" />
          <rect x="31" y="30" width="5" height="16" rx="2.5" fill="#123a66" /><rect x="64" y="30" width="5" height="16" rx="2.5" fill="#123a66" />
          <path d="M24 64 Q50 82 76 64" fill="none" stroke="#123a66" strokeWidth="3.5" strokeLinecap="round" />
        </Tile>);
      break;
    case "notes":
      body = (
        <Tile id={id} from="#ffffff" to="#f4f2ec">
          <rect x="4" y="4" width="92" height="27" fill="#ffd23f" /><rect x="4" y="27" width="92" height="4" fill="#e9b81d" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <circle key={i} cx={14 + i * 10.3} cy="34.5" r="1.3" fill="#b9b6ae" />)}
          {[48, 60, 72, 84].map((y) => <line key={y} x1="14" x2="86" y1={y} y2={y} stroke="#d8d5ce" strokeWidth="1.6" />)}
        </Tile>);
      break;
    case "photos": {
      const cols = ["#ff9f0a", "#ffd60a", "#8fd14f", "#34c7a5", "#40a9ff", "#7a6cff", "#d45cff", "#ff4f6d"];
      body = (
        <Tile id={id} from="#ffffff" to="#f3f4f6">
          <g style={{ mixBlendMode: "multiply" }}>
            {cols.map((c, i) => <ellipse key={c} cx="50" cy="31" rx="10.5" ry="19" fill={c} opacity=".85" transform={`rotate(${i * 45} 50 50)`} />)}
          </g>
        </Tile>);
      break;
    }
    case "messages":
      body = (
        <Tile id={id} from="#6ef07a" to="#11b832">
          <path d="M50 22 C29 22 17 34 17 48 C17 57 22 64 30 69 C29 75 26 79 22 82 C30 82 37 79 41 75 C44 76 47 76 50 76 C71 76 83 63 83 49 C83 34 71 22 50 22Z" fill="#fff" />
        </Tile>);
      break;
    case "preview":
      body = (
        <Tile id={id} from="#f7f9fc" to="#dfe6ef">
          <g transform="rotate(-8 50 48)"><rect x="18" y="22" width="56" height="44" rx="3" fill="#fff" stroke="#c9d1dc" />
            <rect x="22" y="26" width="48" height="36" fill="#8ccaff" /><path d="M22 62 L38 44 L50 56 L58 48 L70 62Z" fill="#3fae5a" /><circle cx="60" cy="35" r="4" fill="#ffd84d" /></g>
          <circle cx="62" cy="62" r="14" fill="#cfe9ff" fillOpacity=".55" stroke="#4a5563" strokeWidth="4.5" />
          <line x1="72" y1="72" x2="84" y2="84" stroke="#2f3640" strokeWidth="7" strokeLinecap="round" />
        </Tile>);
      break;
    case "terminal":
      body = (
        <Tile id={id} from="#4a4d52" to="#232528">
          <rect x="12" y="16" width="76" height="66" rx="7" fill="#0c0d0e" stroke="#5c6066" />
          <path d="M22 32 L32 40 L22 48" fill="none" stroke="#e8e8e8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="36" y="45" width="16" height="4" rx="1" fill="#e8e8e8" />
        </Tile>);
      break;
    case "calendar":
      return <svg viewBox="0 0 100 100" className={className} aria-hidden><CalendarFace id={id} /></svg>;
    case "music":
      body = (
        <Tile id={id} from="#ff6b81" to="#f5254a">
          <path d="M40 30 L72 23 L72 63" fill="none" stroke="#fff" strokeWidth="5.5" strokeLinejoin="round" />
          <line x1="40" y1="30" x2="40" y2="70" stroke="#fff" strokeWidth="5.5" />
          <ellipse cx="33" cy="71" rx="9" ry="7" fill="#fff" /><ellipse cx="65" cy="64" rx="9" ry="7" fill="#fff" />
        </Tile>);
      break;
    case "settings":
      body = (
        <Tile id={id} from="#c9cdd3" to="#7d838c">
          <circle cx="50" cy="50" r="38" fill="#5a5f66" />
          <path d={gearPath(50, 50, 35, 29, 30)} fill="#d7dbe0" />
          <circle cx="50" cy="50" r="24" fill="#8a9098" />
          <path d={gearPath(50, 50, 21, 15, 8)} fill="#e6e9ec" />
          <circle cx="50" cy="50" r="7" fill="#6b7179" />
        </Tile>);
      break;
    case "trash":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden>
          <defs><linearGradient id={`${id}t`} x1="0" x2="1"><stop offset="0" stopColor="#dfe3ea" stopOpacity=".55" /><stop offset=".5" stopColor="#fff" stopOpacity=".85" /><stop offset="1" stopColor="#c8ced8" stopOpacity=".55" /></linearGradient></defs>
          <path d="M20 20 L80 20 L74 92 Q50 97 26 92Z" fill={`url(#${id}t)`} stroke="#9aa3b0" strokeWidth="1.5" />
          {[30, 38, 46, 54, 62, 70].map((x) => <line key={x} x1={x} y1="24" x2={x + (x - 50) * -0.08} y2="90" stroke="#9aa3b0" strokeOpacity=".7" strokeWidth="1.3" />)}
          <ellipse cx="50" cy="20" rx="31" ry="6" fill="#eef1f5" stroke="#9aa3b0" strokeWidth="1.5" />
          <ellipse cx="50" cy="20" rx="25" ry="3.5" fill="#b9c0cb" />
        </svg>);
    case "launchpad": {
      const c = ["#ff5f57", "#febc2e", "#28c840", "#34aadc", "#5856d6", "#ff2d55", "#ff9500", "#4cd964", "#007aff"];
      body = (
        <Tile id={id} from="#5d6470" to="#2c3038">
          {c.map((col, i) => <rect key={col} x={20 + (i % 3) * 22} y={20 + Math.floor(i / 3) * 22} width="16" height="16" rx="4" fill={col} />)}
        </Tile>);
      break;
    }
    case "awards":
      body = (
        <Tile id={id} from="#ffd66b" to="#f19a1a">
          <path d="M34 24 H66 V40 C66 52 58 58 50 58 C42 58 34 52 34 40Z" fill="#fff8e1" />
          <path d="M34 28 H24 C24 40 30 44 36 44 M66 28 H76 C76 40 70 44 64 44" fill="none" stroke="#fff8e1" strokeWidth="4" />
          <rect x="46" y="57" width="8" height="12" fill="#fff8e1" /><rect x="34" y="69" width="32" height="8" rx="2" fill="#fff8e1" />
        </Tile>);
      break;
    case "brands":
      body = (
        <Tile id={id} from="#ff5fa2" to="#8a3ffc">
          <rect x="20" y="42" width="60" height="36" rx="4" fill="#fff" />
          <g transform="rotate(-14 20 40)"><rect x="20" y="28" width="60" height="12" rx="2" fill="#fff" />
            {[26, 40, 54, 68].map((x) => <path key={x} d={`M${x} 28 L${x + 7} 28 L${x + 3} 40 L${x - 4} 40Z`} fill="#2b2b33" />)}</g>
          <path d="M44 52 L60 60 L44 68Z" fill="#c13cff" />
        </Tile>);
      break;
    case "recruiter":
      body = (
        <Tile id={id} from="#5aa8ff" to="#2a5bd7">
          <rect x="40" y="24" width="20" height="12" rx="4" fill="none" stroke="#fff" strokeWidth="5" />
          <rect x="18" y="34" width="64" height="44" rx="8" fill="#fff" /><rect x="18" y="50" width="64" height="5" fill="#cfe0ff" /><rect x="45" y="47" width="10" height="11" rx="2" fill="#2a5bd7" />
        </Tile>);
      break;
  }
  return <svg viewBox="0 0 100 100" className={className} aria-hidden>{body}</svg>;
}
