import { describe, expect, it } from "vitest";
import { photoRoots, rootIds, albumItems, highlights, albumCover, agencyBrands, awards, pureitCases, projects, notes, qa, experience, profile, workRoots, workProjects, resolvePhotoCategory } from "@/data/portfolio";

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
  it("current role is Co-Founder, one of four equal entries", () => {
    expect(experience).toHaveLength(4);
    expect(experience.find((e) => e.type === "Current")?.role).toBe("Co-Founder");
    expect(experience.find((e) => e.type === "Current")?.org).toBe("Independent Agency");
  });
  it("Featured holds no more than one agency item", () => {
    const featured = photoRoots.find(r => r.id === "★ Flagship")?.ids ?? [];
    expect(featured.filter((id) => id.startsWith("agency")).length).toBeLessThanOrEqual(1);
  });
  it("case competition brands never appear as professional clients", () => {
    const clients = experience.flatMap((e) => e.clients ?? []);
    for (const b of awards.flatMap((a) => a.caseBrands ?? [])) expect(clients).not.toContain(b);
    expect(experience.find((e) => e.id === "x-agency")?.clients).toEqual(["Upay", "City Bank", "IDLC", "Break Station", "Petal"]);
  });
});

describe("media", () => {
  it("preserves 12 Behance covers and adds six Marico photos", async () => {
    const { behanceWorks, awards } = await import("@/data/portfolio");
    expect(behanceWorks.filter((w) => w.thumbnail?.startsWith("/media/behance/"))).toHaveLength(12);
    expect(awards.find((a) => a.id === "otw")?.images).toHaveLength(6);
    expect(awards.find((a) => a.id === "otw")?.images[0]).toBe("/media/awards/marico-season3-team-presentation.jpg");
    expect(awards.flatMap((a) => a.images)).toHaveLength(16);
    for (const a of awards) expect(a.images).toEqual(a.pendingImages);
  });
});

describe("work collections and achievements", () => {
  it("keeps the six owner-selected career categories in order", () => {
    expect(workRoots.map(r => r.id)).toEqual(["★ Flagship", "Brand Strategy & Transition", "Product Launches", "Client Engagement", "Campaigns & Creative", "Community & Leadership"]);
  });
  it("excludes all competition records and photos from work collections", () => {
    for (const r of workRoots) for (const p of albumItems(rootIds(r))) {
      expect(p.id.startsWith("award-")).toBe(false);
      expect(p.images.some(src => src.startsWith("/media/awards/"))).toBe(false);
    }
    expect(workProjects.filter(p => p.id.startsWith("award-"))).toHaveLength(0);
  });
  it("keeps all eight achievements and sixteen documented photos", () => {
    const r = photoRoots.find(r => r.id === "Awards & Achievements");
    expect(r && rootIds(r)).toEqual(awards.map(a => `award-${a.id}`));
    expect(awards.flatMap(a => a.images)).toHaveLength(16);
    expect(awards.find(a => a.id === "admaker")?.images).toHaveLength(2);
    expect(awards.find(a => a.id === "marxcellence")?.images).toHaveLength(3);
  });
  it("Flagship prioritizes transition, launches and servicing without Music That Heals", () => {
    expect(photoRoots.find(r => r.id === "★ Flagship")?.ids).toEqual(["pureit-transition", "pureit-launches", "x-agency"]);
    expect(workProjects.some(p => p.id === "mth")).toBe(false);
  });
  it("each creative project occurs in only one creative folder", () => {
    const r = photoRoots.find(r => r.id === "Campaigns & Creative");
    const ids = r ? rootIds(r) : [];
    expect(new Set(ids).size).toBe(ids.length);
    for (const a of r?.albums ?? []) expect(albumCover(a.ids)).toMatch(/^\/media\/behance\//);
  });
  it("every collection id resolves and legacy shortcuts still work", () => {
    for (const r of photoRoots) expect(albumItems(rootIds(r))).toHaveLength(rootIds(r).length);
    expect(resolvePhotoCategory("Featured")).toBe("★ Flagship");
    expect(resolvePhotoCategory("Brand Design")).toBe("Campaigns & Creative");
    expect(resolvePhotoCategory("Competitions")).toBe("Awards & Achievements");
  });
  it("uses the chosen portrait rather than an achievement image", () => {
    expect(profile.avatar).toBe("/media/profile/mahin-profile.png");
  });
  it("homepage retains only the two requested highlights", () => {
    expect(highlights.map(h => [h.value, h.label])).toEqual([["10+", "brands worked with"], ["7", "national competition podiums"]]);
  });
});
