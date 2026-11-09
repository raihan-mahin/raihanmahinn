import { describe, expect, it } from "vitest";
import { awards, workRoots, rootIds } from "@/data/portfolio";
import { existsSync } from "node:fs";

describe("selected competition additions", () => {
  it("keeps eight awards and sixteen competition photos, without slide assets", () => {
    expect(awards).toHaveLength(8);
    expect(awards.flatMap(a => a.images)).toHaveLength(16);
    const a = awards.find(a => a.id === "admaker");
    expect(a?.rank).toBe("1st Runner-Up");
    expect(a?.team).toBe("Arc Crew");
    expect(a?.images).toHaveLength(2);
    for (const src of awards.flatMap(a => a.images)) expect(existsSync(`public${src}`)).toBe(true);
  });
  it("keeps every competition out of work collections", () => {
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