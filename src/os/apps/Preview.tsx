import { Button } from "@/components/ui/button";
import { downloadResume } from "@/lib/resume";
import { Download, FileText } from "lucide-react";
import { BrandStrip } from "../BrandLogo";
import { useState } from "react";
import { profile, experience, awards, leadership, education, skills } from "@/data/portfolio";

export function Preview() {
  const [error, setError] = useState("");
  return (
    <div className="flex h-full flex-col bg-muted">
      <div className="flex items-center justify-between border-b border-border bg-card px-3 py-1.5">
        <p className="flex min-w-0 items-center gap-2 text-xs font-semibold text-muted-foreground"><FileText size={16} className="shrink-0"/><span className="truncate">Raihan-Mahin-Resume.pdf</span></p>
        <Button onClick={() => { void downloadResume().catch(() => setError("Could not download PDF. Please try again.")); }} className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground"><Download size={16} />Download PDF</Button>
      </div>
      {error && <p role="status" className="p-2 text-sm">{error}</p>}
      <div className="min-h-0 flex-1 overflow-auto p-3 sm:p-4">
        <article className="print-area resume-sheet mx-auto max-w-[680px] rounded bg-card p-5 sm:p-8 text-[12.5px] leading-relaxed text-card-foreground shadow-soft">
          <header className="border-b-2 border-primary pb-3">
            <h1 className="text-2xl font-bold tracking-tight">{profile.fullName}</h1>
            <p className="font-semibold text-primary">{profile.headline}</p>
            <p className="mt-1 text-xs">{profile.location} · {profile.email} · linkedin.com/in/raihan-mahin-150b7123a · behance.net/raihanmahin</p>
          </header>
          <p className="mt-3">{profile.bio}</p>
          <h2 className="mt-4 text-xs font-bold uppercase tracking-widest text-primary">Experience</h2>
          {experience.map((e) => (
            <div key={e.id} className="mt-2">
              <div className="flex flex-wrap justify-between gap-2"><p className="font-bold">{e.role} — {e.org}</p><p className="shrink-0 text-xs">{e.period}</p></div>
              {e.context && <p className="text-xs italic">{e.context} · {e.type}</p>}
              <ul className="ml-4 list-disc">{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
              {e.clients && <BrandStrip className="my-2" names={e.clients}/> }
            </div>
          ))}
          <h2 className="mt-4 text-xs font-bold uppercase tracking-widest text-primary">Competitions & Awards</h2>
          <ul className="ml-4 mt-1 list-disc">{awards.map((a) => <li key={a.id}><b>{a.rank}</b>, {a.title} ({a.organizer}) — {a.focus}{a.scale ? `, ${a.scale}` : ""}</li>)}</ul>
          <h2 className="mt-4 text-xs font-bold uppercase tracking-widest text-primary">Leadership</h2>
          <ul className="ml-4 mt-1 list-disc">{leadership.map((l) => <li key={l.id}><b>{l.role}, {l.org}</b> ({l.period}) — {l.detail}</li>)}</ul>
          <h2 className="mt-4 text-xs font-bold uppercase tracking-widest text-primary">Education</h2>
          {education.map((e) => <p key={e.id}><b>{e.degree}</b>, {e.school} · {e.period}</p>)}
          <h2 className="mt-4 text-xs font-bold uppercase tracking-widest text-primary">Skills</h2>
          {Object.entries(skills).map(([k, v]) => <p key={k}><b>{k}:</b> {v.join(", ")}</p>)}
        </article>
      </div>
    </div>
  );
}
