import { describe, expect, it } from "vitest";
import { awards, behanceWorks, experience, notes, projectById, resolvePhotoCategory } from "@/data/portfolio";
import { mergeNotes } from "@/lib/note-storage";
import legacy from "@/data/legacy-note-seeds.json";

describe("approved portfolio factual corrections", () => {
  it("distinguishes Bangladesh research from Sri Lanka localisation", () => {
    const story = projectById("pureit-transition")?.summary;
    expect(story).toContain("competitor research in Bangladesh");
    expect(story).toContain("delivering materials in Sinhala and Tamil");
    expect(projectById("pureit-transition")?.metrics?.map(m => m.value)).toEqual(["7+", "2", "3", "300+"]);
    expect(projectById("pureit-transition")?.metrics?.[3]?.label).toBe("Marketing assets developed by the team across three launches");
  });
  it("keeps the two-minute target distinct from the achieved response rate", () => {
    expect(projectById("x-agency")?.metrics).toEqual([{ value: "Under 2 minutes", label: "Response target" }, { value: "90%", label: "On-time response rate" }, { value: "5", label: "Client accounts" }]);
    expect(experience.find(e => e.id === "x-agency")?.clients).toEqual(["Upay", "City Bank", "IDLC", "Break Station", "Petal"]);
  });
  it("resolves dedicated former agency names without mixing employers", () => {
    expect(resolvePhotoCategory("Co-Founder · Independent Agency")).toBe("XYZ Agency");
    expect(resolvePhotoCategory("Independent Agency")).toBe("XYZ Agency");
    expect(resolvePhotoCategory("Client Engagement")).toBe("X Integrated Marketing Agency");
    expect(projectById("agency")?.title).toBe("XYZ Agency");
  });
  it("keeps Legend contract dates without filler metrics", () => {
    expect(projectById("legend")?.subtitle).toBe("Marketing Officer · Oct–Nov 2024 · Contract");
    expect(projectById("legend")?.metrics).toBeUndefined();
  });
  it("preserves fifteen creative identities and sixteen award photos", () => {
    expect(behanceWorks).toHaveLength(15);
    expect(awards.flatMap(a => a.images)).toHaveLength(16);
  });
  it("migrates only untouched official defaults while preserving timestamps", () => {
    const old = legacy.find(n => n.id === "pureit" && n.body.includes("Sri Lanka"));
    if (!old) throw new Error("Historical Pureit seed required");
    const stored = { ...old, createdAt: "2026-11-01T10:00:00Z", updatedAt: "2026-11-01T10:00:00Z" };
    expect(mergeNotes([stored]).find(n => n.id === "pureit")).toEqual({ ...stored, ...notes.find(n => n.id === "pureit"), date: stored.date });
    const edited = { ...stored, body: "My personal notes" };
    expect(mergeNotes([edited]).find(n => n.id === "pureit")).toEqual(edited);
  });
});