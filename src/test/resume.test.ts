import { describe, it, expect } from "vitest";
import { createResumePDF, resumeSections } from "@/lib/resume";
import { recruiter } from "@/data/portfolio";
describe("career export", () => {
  it("creates an actual PDF with the current Co-Founder role", async () => {
    expect(resumeSections()[0]?.lines[0]).toContain("Co-Founder — Independent Agency");
    const doc = await createResumePDF();
    expect(doc.output()).toMatch(/^%PDF-/);
    expect(doc.output()).toContain("Abu Raihan Mahin");
  });
  it("uses 2+ years of non-additive documented marketing experience", () => {
    expect(recruiter.stats.map(s => s.value)).toEqual(["10+", "7", "3", "2+ years"]);
  });
});
