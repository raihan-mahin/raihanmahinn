import { useState } from "react";
import { profile, recruiter, experience, education, skills } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { copyEmail } from "@/lib/resume";
import { Portrait } from "./Portrait";
import { BrandStrip } from "./BrandLogo";
import { useOS } from "./store";
export function RecruiterContent() {
  const os = useOS(); const [copied, setCopied] = useState(false); const [error, setError] = useState("");
  return <div className="recruiter-content mx-auto max-w-2xl px-5 pb-14 pt-5">
    <header className="text-center"><Portrait className="mx-auto size-[100px]" /><p className="mt-5 text-[10px] font-bold tracking-widest text-primary">RECRUITER QUICK VIEW · 30 SECONDS</p><h2 className="mt-2 text-[32px] font-bold">{profile.shortName}</h2><p className="mx-auto mt-1 max-w-sm text-[14px] leading-relaxed text-muted-foreground">{recruiter.subtitle}</p><p className="mt-2 text-xs text-muted-foreground">{profile.location}</p></header>
    <div className="mt-5 grid grid-cols-2 gap-2"><Button className="h-11" onClick={() => os.open("preview")}>View resume</Button><Button variant="secondary" asChild className="h-11"><a href={`mailto:${profile.email}`}>Email me</a></Button><Button variant="secondary" asChild className="h-11"><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></Button><Button variant="secondary" className="h-11" onClick={async () => { const ok = await copyEmail(); setCopied(ok); if (!ok) setError(profile.email); }}>{copied ? "Email copied" : "Copy email"}</Button></div>
    {error && <p role="status" className="mt-2 text-sm">{error}</p>}<p className="mt-6 text-[14px] leading-relaxed text-muted-foreground">{recruiter.summary}</p>
    <div className="mt-5 grid grid-cols-2 gap-2">{recruiter.stats.map(s => <div key={s.label} className="rounded-lg bg-card p-4"><p className="text-2xl font-bold">{s.value}</p><p className="mt-1 text-xs text-muted-foreground">{s.label}</p></div>)}</div>
    <section className="mt-7"><h3 className="section-label">Relevant roles</h3><div className="flex flex-wrap gap-2">{recruiter.roles.map(s => <span key={s} className="rounded-full bg-secondary px-3 py-1.5 text-xs">{s}</span>)}</div></section>
    <section className="mt-7"><h3 className="section-label">Highlights</h3><ul className="list-disc space-y-3 pl-4 text-sm leading-relaxed">{recruiter.highlights.map(h => <li key={h}>{h}</li>)}</ul></section>
    <section className="mt-7"><h3 className="section-label">At a glance</h3>{[["Location", profile.location], ["Current", `${experience[0]?.role} — ${experience[0]?.org}`], ["Recent experience", "BizLearner · Pureit"], ["Education", `${education[0]?.degree} · Expected Dec 2026`]].map(([k,v]) => <div key={k} className="flex gap-5 border-b border-border py-3 text-[13px]"><span className="w-24 shrink-0 text-muted-foreground">{k}</span><span>{v}</span></div>)}</section>
    <section className="mt-7"><h3 className="section-label">Core skills</h3><div className="flex flex-wrap gap-2">{Object.values(skills).flat().map(s => <span key={s} className="rounded-full bg-secondary px-3 py-1.5 text-xs">{s}</span>)}</div></section>
    <section className="mt-7"><h3 className="section-label">Professional work</h3><BrandStrip className="mb-4" label="Pureit transition from Unilever · through BizLearner" names={["Unilever", "Pureit", "A. O. Smith"]} />{experience.filter(e => e.clients && e.id !== "bizlearner").map(e => <BrandStrip key={e.id} className="mb-4" label={`${e.org} · Agency accounts`} names={e.clients ?? []} />)}</section>
    <section className="mt-7"><h3 className="section-label">Explore more</h3>{[["Projects","photos"],["Experience","finder"],["Skills & Notes","notes"],["Ask me a question","messages"]].map(([label,id]) => <Button key={id} variant="ghost" className="flex h-11 w-full justify-between border-b border-border px-0" onClick={() => os.open(id as "photos" | "finder" | "notes" | "messages", id === "notes" ? "skills" : undefined)}>{label}<span>→</span></Button>)}</section>
  </div>;
}
