import { describe, expect, it } from "vitest";
import { agencyBrands, awards, pureitCases, projects, notes, qa, experience, profile } from "@/data/portfolio";

describe("portfolio content rules", () => {
  it("current agency reels are exactly Lux, Lifebuoy and Dove", () => {
    expect(agencyBrands.map((b) => b.brand).sort()).toEqual(["Dove", "Lifebuoy", "Lux"]);
  });
  it("never mentions TRESemmé anywhere", () => {
    const all = JSON.stringify({ agencyBrands, projects, notes, qa, experience });
    expect(all.toLowerCase()).not.toContain("tresemm");
  });
  it("keeps 8 competition results with 3 championships", () => {
    expect(awards).toHaveLength(8);
    expect(awards.filter((a) => a.rank === "Champion")).toHaveLength(3);
  });
  it("keeps the Pureit transition plus 3 launches", () => {
    expect(pureitCases.filter((c) => c.kind === "Product launch")).toHaveLength(3);
    expect(pureitCases.filter((c) => c.kind === "Brand transition")).toHaveLength(1);
  });
});

describe("positioning", () => {
  it("headline is exactly Brand Marketing & Strategy Professional", () => {
    expect(profile.headline).toBe("Brand Marketing & Strategy Professional");
  });
  it("never calls him an AI content creator", () => {
    const all = JSON.stringify({ profile, projects, notes, qa, experience }).toLowerCase();
    expect(all).not.toContain("ai content creator");
    expect(all).not.toContain("scroll-stopping");
  });
  it("current role is Agency Lead, one of four equal entries", () => {
    expect(experience).toHaveLength(4);
    expect(experience.find((e) => e.type === "Current")?.role).toBe("Agency Lead");
  });
  it("at most one agency item is Featured", () => {
    const f = projects.filter((p) => p.categories.includes("Featured") && p.categories.includes("Agency Work"));
    expect(f).toHaveLength(1);
  });
  it("case competition brands never appear as professional clients", () => {
    const clients = experience.flatMap((e) => e.clients ?? []);
    for (const b of awards.flatMap((a) => a.caseBrands ?? [])) expect(clients).not.toContain(b);
    expect(experience.find((e) => e.id === "x-agency")?.clients).toEqual(["Upay", "City Bank", "IDLC", "Break Station", "Petal"]);
  });
});

describe("media", () => {
  it("12 Behance works have downloaded covers; Over the Wall has no photo", async () => {
    const { behanceWorks, awards } = await import("@/data/portfolio");
    expect(behanceWorks.filter((w) => w.thumbnail?.startsWith("/media/behance/"))).toHaveLength(12);
    expect(awards.find((a) => a.id === "otw")?.pendingImages).toEqual([]);
  });
});
