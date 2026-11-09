import { describe, expect, it } from "vitest";
import { photoRoots, rootIds, albumItems, highlights, albumCover, agencyBrands, awards, pureitCases, projects, notes, qa, experience, profile } from "@/data/portfolio";

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
  it("Featured holds no more than one agency item", () => {
    const featured = photoRoots.find((r) => r.id === "Featured")!.ids!;
    expect(featured.filter((id) => id.startsWith("agency")).length).toBeLessThanOrEqual(1);
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
    expect(awards.find((a) => a.id === "otw")?.images).toEqual([]);
    expect(awards.flatMap((a) => a.images)).toHaveLength(10);
    for (const a of awards) expect(a.images).toEqual(a.pendingImages);
  });
});

describe("photos hierarchy & homepage", () => {
  it("has exactly four top-level albums and no Pureit & GTM root", () => {
    expect(photoRoots.map((r) => r.id)).toEqual(["Featured", "Brand Design", "Competitions", "More Work"]);
  });
  it("every album id resolves to a project", () => {
    for (const r of photoRoots) expect(albumItems(rootIds(r))).toHaveLength(rootIds(r).length);
  });
  it("Brand Design sub-albums all have a real Behance cover", () => {
    const bd = photoRoots.find((r) => r.id === "Brand Design")!;
    expect(bd.albums!.map((a) => a.title)).toEqual(["Pureit", "Berger & Outdoor", "Packaging", "Campaigns & Digital", "Other Design"]);
    for (const a of bd.albums!) expect(albumCover(a.ids)).toMatch(/^\/media\/behance\//);
  });
  it("Competitions holds all 8 awards", () => {
    expect(rootIds(photoRoots.find((r) => r.id === "Competitions")!)).toHaveLength(8);
  });
  it("homepage shows exactly the four owner-chosen highlights", () => {
    expect(highlights.map((h) => [h.value, h.label])).toEqual([
      ["10+", "Brands Worked With"], ["7", "Competition Podiums"], ["1", "Marico Competition Finalist"], ["Pureit", "Unilever → A. O. Smith"],
    ]);
  });
});
