import { describe, it, expect } from "vitest";
import { experience, projects, workRoots, rootIds, workProjects, awards, recruiter, notes } from "@/data/portfolio";
import { MOBILE_APPS } from "@/os/apps-registry";
import { mergeNotes } from "@/lib/note-storage";
import legacy from "@/data/legacy-note-seeds.json";

describe("latest owner facts", () => {
  it("keeps BizLearner part-time with five collaborative responsibility groups", () => {
    const e = experience.find(e => e.id === "bizlearner");
    expect(e?.org).toBe("BizLearner"); expect(e?.type).toBe("Part-time");
    expect(e?.bullets).toHaveLength(5);
    expect(e?.period).toBe("Aug 2024 – Jun 2026");
  });
  it("keeps Banglalink out of the five serviced accounts", () => {
    expect(experience.find(e=>e.id==="x-agency")?.clients).toEqual(["Upay","City Bank","IDLC","Break Station","Petal"]);
  });
  it("exposes concrete Pureit contribution scope", () => {
    expect(projects.find(p=>p.id==="pureit-transition")?.metrics?.map(m=>m.value)).toEqual(["7+","2","3","300+"]);
  });
  it("removes Music That Heals from every work feed and count", () => {
    expect(workProjects.some(p=>p.id==="mth")).toBe(false);
    expect(workRoots.flatMap(rootIds)).not.toContain("mth");
  });
  it("keeps Marico as Season 3 finalist Team Marketman", () => {
    const a=awards.find(a=>a.id==="otw");
    expect(a?.rank).toBe("Finalist");expect(a?.team).toBe("Marketman");expect(a?.scale).toBe("1,850+ teams");
    expect(a?.images.map(s=>s.split("/").at(-1))).toEqual(["marico-season3-team-presentation.jpg","marico-season3-final-stage.jpg","marico-season3-finalists-group.jpg","marico-season3-marketman-banner.jpg","marico-season4-season3-finalist-reunion.jpg","marico-season4-season3-finalist-portrait.jpg"]);
  });
  it("defines only the eight phone apps", () => {
    expect(MOBILE_APPS).toEqual(["finder","notes","messages","photos","settings","calendar","recruiter","music"]);
  });
  it("refreshes untouched old Notes and retains modified Notes", () => {
    const previous=legacy.find(n=>n.id==="about");
    if(!previous) throw new Error("Historical intro required");
    expect(mergeNotes([previous]).find(n=>n.id==="about")?.body).toBe(notes.find(n=>n.id==="about")?.body);
    const edited={...previous,body:"My own note"};
    expect(mergeNotes([edited]).find(n=>n.id==="about")?.body).toBe("My own note");
  });
  it("counts seven podiums and three championships separately",()=> {
    expect(recruiter.stats.map(s=>s.value)).toEqual(["10+","7","3","2+ years"]);
  });
});
