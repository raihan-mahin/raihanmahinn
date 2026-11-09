import { describe, expect, it } from "vitest";
import { awards, experience, notes, photoRoots, profile, projectById, recruiter, resolvePhotoCategory, rootIds, workProjects } from "@/data/portfolio";
import { resumeContent } from "@/data/resume";
import { mergeNotes } from "@/lib/note-storage";
import legacy from "@/data/legacy-note-seeds.json";

describe("owner's latest factual rules", () => {
  it("uses the new public contact", () => expect(profile.email).toBe("raihanmahin.work@gmail.com"));
  it("removes launch and commentary records from work indexes", () => {
    for (const id of ["pureit-launches", "pureit-wave", "pureit-marina", "pureit-ultima", "insight-cirkle"]) expect(workProjects.some(p => p.id === id)).toBe(false);
    expect(photoRoots.some(r => r.id === ("Product Launches" as string))).toBe(false);
    expect(notes.some(n => n.id === "insights")).toBe(true);
  });
  it("recomputes the remaining collection counts", () => expect(photoRoots.map(r => rootIds(r).length)).toEqual([2, 1, 3, 15, 1, 8]));
  it("maps obsolete launch category to the retained Pureit category", () => expect(resolvePhotoCategory("Product Launches")).toBe("Brand Strategy & Transition"));
  it("preserves Pureit scope without making India a Pureit research market", () => {
    expect(projectById("pureit-transition")?.metrics?.map(m => m.value)).toEqual(["7+", "2", "3", "300+"]);
    expect(experience.find(e => e.id === "bizlearner")?.bullets.join(" ")).not.toContain("India");
  });
  it("labels the two-minute response as target alongside verified counts", () => expect(projectById("x-agency")?.metrics).toEqual([{ value: "Under 2 minutes", label: "Response target" }, { value: "90%", label: "On-time response" }, { value: "5", label: "Client accounts" }]));
  it("uses three confirmed markets in recruiter statistics", () => expect(recruiter.stats[2]).toEqual({ value: "3", label: "Markets", note: "Bangladesh · India · Sri Lanka" }));
  it("retains seven podiums and all sixteen original photographs without slides", () => {
    expect(awards.filter(a => a.rank !== "Finalist")).toHaveLength(7);
    expect(awards.flatMap(a => a.images)).toHaveLength(16);
    expect(awards.some(a => "concepts" in a)).toBe(false);
    expect(awards.find(a => a.id === "hult")?.team).toBe("Marketman");
    expect(awards.find(a => a.id === "bizmetrics")?.team).toBe("Arctic Wolves");
  });
  it("updates old built-in contact notes without modifying edited or new notes", () => {
    const old = legacy.find(n => n.id === "about" && n.body.includes("raihanmahin.ubl@gmail.com"));
    if (!old) throw new Error("Previous default required");
    const edited = { ...old, body: old.body + "\nMy addition" };
    const own = { ...old, id: "personal" };
    expect(mergeNotes([old]).find(n => n.id === "about")?.body).toContain(profile.email);
    expect(mergeNotes([edited]).find(n => n.id === "about")).toEqual(edited);
    expect(mergeNotes([own]).find(n => n.id === "personal")).toEqual(own);
  });
  it("keeps original CV employers and dates independent of website agency data", () => {
    const work = resumeContent.find(s => s.title === "WORK EXPERIENCE")?.entries;
    expect(work?.map(e => e.date)).toEqual(["Aug 2024 – Jun 2026", "Oct 2024 - Nov 2024", "Oct 2023 - Oct 2024"]);
    expect(work).toHaveLength(3);
    expect(resumeContent.find(s => s.title === "CASE COMPETITIONS & ACHIEVEMENTS")?.entries[0]?.bullets).toHaveLength(8);
  });
});
