import { describe, expect, it } from "vitest";
import { awards, projects, workProjects, workRoots, rootIds } from "@/data/portfolio";
import { existsSync, readFileSync } from "node:fs";

describe("selected competition additions", () => {
  it("keeps eight awards and sixteen competition photos, with two separate Admaker concepts", () => {
    expect(awards).toHaveLength(8);
    expect(awards.flatMap(a => a.images)).toHaveLength(16);
    const a = awards.find(a => a.id === "admaker");
    expect(a?.rank).toBe("1st Runner-Up");
    expect(a?.team).toBe("Arc Crew");
    expect(a?.images).toHaveLength(2);
    expect(a?.concepts?.map(c => c.src)).toEqual(["/media/awards/admaker-ebl-ajke-tui-de.jpg", "/media/awards/admaker-ebl-beyond-the-sky.jpg"]);
    expect(projects.find(p => p.id === "award-admaker")?.concepts).toEqual(a?.concepts);
    for (const c of a?.concepts ?? []) {
      expect(existsSync(`public${c.src}`)).toBe(true);
      expect([...readFileSync(`public${c.src}`).subarray(0, 3)]).toEqual([255, 216, 255]);
    }
  });
  it("keeps competition concepts out of every work record and collection", () => {
    expect(workProjects.flatMap(p => p.concepts ?? [])).toHaveLength(0);
    expect(workRoots.flatMap(rootIds).some(id => id.startsWith("award-"))).toBe(false);
  });
  it("preserves Marico Season 3 finalist and all six photographs", () => {
    const a = awards.find(a => a.id === "otw");
    expect(a?.rank).toBe("Finalist");
    expect(a?.team).toBe("Marketman");
    expect(a?.images).toHaveLength(6);
    expect(a?.link).toBe("https://www.linkedin.com/feed/update/urn:li:activity:7287835152670461953/");
  });
  it("preserves Nexus case subjects and the three curated first-party links", () => {
    expect(awards.find(a => a.id === "nexus")?.caseBrands).toEqual(["Polar", "NCC Bank"]);
    expect(awards.find(a => a.id === "nexus")?.link).toBe("https://www.linkedin.com/feed/update/urn:li:activity:7405617576900325377/");
    expect(awards.find(a => a.id === "bizmetrics")?.link).toBe("https://www.linkedin.com/feed/update/urn:li:activity:7421168154850144257/");
    expect(awards.find(a => a.id === "admaker")?.link).toBe("https://www.linkedin.com/feed/update/urn:li:activity:7492578751315116032/");
  });
});