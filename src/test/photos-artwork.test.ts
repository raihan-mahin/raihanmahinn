import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { photoRoots, workProjects, findAlbum, behanceWorks } from "@/data/portfolio";

describe("Campaigns & Creative", () => {
  const root = photoRoots.find((r) => r.id === "Campaigns & Creative")!;
  it("opens with Curated, then Outdoor, Pureit, Packaging, Print Materials", () => {
    expect(root.albums!.map((a) => a.title)).toEqual(["Curated", "Outdoor", "Pureit", "Packaging", "Print Materials"]);
  });
  it("puts Letterhead and the tri-fold brochure in Print Materials", () => {
    expect(root.albums!.find((a) => a.id === "print")!.ids).toEqual(["bh-letterhead", "bh-brochure"]);
  });
  it("keeps Oggy and Ninja Hattori out of Photos", () => {
    expect(workProjects.some((p) => p.id === "bh-oggy" || p.id === "bh-hattori")).toBe(false);
    expect(behanceWorks).toHaveLength(15);
  });
  it("sends the old Other Design link to Print Materials", () => {
    expect(findAlbum("other")?.album.title).toBe("Print Materials");
  });
  it("uses the larger local file with the original as fallback", () => {
    const art = workProjects.filter((p) => p.artwork && p.images[0]);
    expect(art).toHaveLength(12);
    for (const p of art) {
      expect(p.images[0]).toMatch(/^\/media\/behance\/hd\//);
      expect(existsSync(`public${p.images[0]}`)).toBe(true);
      expect(existsSync(`public${p.artworkFallback}`)).toBe(true);
    }
  });
});
