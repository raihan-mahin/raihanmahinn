import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { agencyCampaigns, projects } from "@/data/portfolio";
describe("XYZ Agency campaign media", () => {
  it("groups the five videos and one still by brand", () => {
    expect(agencyCampaigns.map(b => [b.brand, b.videos.map(v => v.title)])).toEqual([["Lux", ["AirDrop", "Airport", "Truck", "Crazy"]], ["Lifebuoy", ["Puja"]]]);
    expect(agencyCampaigns[0]?.stills?.[0]?.src).toBe("/media/xyz-agency/lux-puja-giveaway.jpg");
    expect(projects.find(p => p.id === "agency")?.campaigns).toBe(agencyCampaigns);
  });
  it("points at files that exist with matching posters", () => {
    for (const b of agencyCampaigns) for (const v of b.videos) {
      expect(v.poster).toBe(v.src.replace(".mp4", ".jpg"));
      expect(existsSync(`public${v.src}`) && existsSync(`public${v.poster}`)).toBe(true);
    }
  });
});
