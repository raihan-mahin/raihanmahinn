import { Button } from "@/components/ui/button";
import { downloadResume } from "@/lib/resume";
import { Download, FileText } from "lucide-react";
import { BrandStrip } from "../BrandLogo";
import { useState } from "react";
import { profile } from "@/data/portfolio";
import { resumeContent } from "@/data/resume";

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
          {resumeContent.map(section => <section key={section.title}>
            <h2 className="mt-4 text-xs font-bold uppercase tracking-widest text-primary">{section.title}</h2>
            {section.entries.map((entry, i) => <div key={i} className="mt-2">
              {entry.text && <p className={entry.date ? "font-bold" : ""}>{entry.text}</p>}
              {entry.date && <p className="text-xs">{entry.date}</p>}
              {entry.bullets && <ul className="ml-4 list-disc">{entry.bullets.map(line => <li key={line}>{line}</li>)}</ul>}
              {entry.brands && <BrandStrip className="my-2" names={entry.brands}/>}
            </div>)}
          </section>)}
        </article>
      </div>
    </div>
  );
}
