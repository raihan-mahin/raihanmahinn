import { describe, it, expect } from "vitest";
import { noteGroups, newNote, editNote } from "@/lib/note-presentation";
import { notes, qa } from "@/data/portfolio";
import { portfolioAnswer } from "@/lib/portfolio-chat";
describe("note dates and preservation", () => {
  const now = new Date("2026-11-09T12:00:00");
  it("groups real dates as today, yesterday and previous seven days without losing notes", () => {
    const list = [newNote(now), {...newNote(new Date("2026-11-08T12:00:00")),id:"y"}, {...newNote(new Date("2026-11-04T12:00:00")),id:"week"}];
    expect(noteGroups(list, now).map(g => [g.label,g.notes.map(n=>n.id)])).toEqual([["Today",[list[0]?.id]],["Yesterday",["y"]],["Previous 7 Days",["week"]]]);
  });
  it("keeps coarse seed dates out of real edit-date groups", () => {
    const groups = noteGroups(notes, now);
    expect(groups.map(g=>g.label)).toEqual(["Pinned","Portfolio notes"]);
    expect(groups.flatMap(g=>g.notes)).toHaveLength(notes.length);
  });
  it("records a real edit timestamp while preserving note identity and creation date", () => {
    const n = newNote(new Date("2026-11-08T12:00:00")); const updated = editNote(n,"# My edited note\nSaved content",now);
    expect(updated.id).toBe(n.id); expect(updated.createdAt).toBe(n.createdAt); expect(updated.updatedAt).toBe(now.toISOString()); expect(updated.body).toBe("# My edited note\nSaved content");
  });
});
describe("local portfolio answers", () => {
  it("preserves every existing exact quick answer", () => { for (const item of qa) expect(portfolioAnswer(item.q)).toBe(item.a); });
  it("does not invent an answer to an unsupported question", () => { expect(portfolioAnswer("Send a message to a real recruiter")).toContain("don't have a prewritten answer"); });
});