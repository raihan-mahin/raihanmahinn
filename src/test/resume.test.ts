import { describe, it, expect } from "vitest";
import { createResumePDF, resumeSections } from "@/lib/resume";
import { recruiter } from "@/data/portfolio";
describe("career export", () => {
  it("creates an actual PDF from the original CV", async () => {
    expect(resumeSections().find(s => s.title === "WORK EXPERIENCE")?.lines[0]).toBe("BizLearner, Marketing | Pureit, acquired by A.O.Smith | Prior Unilever Bangladesh | Part-time | Aug 2024 – Jun 2026");
    const doc = await createResumePDF();
    expect(doc.output()).toMatch(/^%PDF-/);
    expect(doc.getNumberOfPages()).toBeGreaterThan(0);
    expect(doc.getFont().fontName).toBe("resume");
  });
  it("uses 2+ years of non-additive documented marketing experience", () => {
    expect(recruiter.stats.map(s => s.value)).toEqual(["10+", "7", "3", "2+ years"]);
  });
});
