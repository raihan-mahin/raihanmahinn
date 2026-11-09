import { describe, expect, it } from "vitest";
import { agencyBrands, awards, pureitCases, projects, notes, qa, experience } from "@/data/portfolio";

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

describe("media", () => {
  it("12 Behance works have downloaded covers; Over the Wall has no photo", async () => {
    const { behanceWorks, awards } = await import("@/data/portfolio");
    expect(behanceWorks.filter((w) => w.thumbnail?.startsWith("/media/behance/"))).toHaveLength(12);
    expect(awards.find((a) => a.id === "otw")?.pendingImages).toEqual([]);
  });
});
