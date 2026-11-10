import { describe, expect, it } from "vitest";
import { DOCK_BASE_WIDTH, DOCK_DURATION, DOCK_GAPS, dockLayout, dockScale } from "@/lib/dock-layout";

describe("reference dock geometry", () => {
  it("uses the requested 1.68/1.56/1.26 falloff and baseline at three slots", () => {
    [1.68, 1.56, 1.26, 1].forEach((expected, index) => expect(dockScale(index)).toBeCloseTo(expected));
    expect(DOCK_DURATION).toBe(180);
  });
  it("restores all twelve occupied targets and existing glass width on exit", () => {
    expect(dockLayout(null, 1280)).toEqual({ sizes: Array(12).fill(48), width: 651 });
  });
  it("expands glass by exactly the added occupied widths, with divider gaps intact", () => {
    const layout = dockLayout(640, 1280);
    expect(layout.width).toBeGreaterThan(DOCK_BASE_WIDTH + 100);
    expect(layout.width).toBeCloseTo(14 + layout.sizes.reduce((a, b) => a + b, 0) + DOCK_GAPS.reduce((a, b) => a + b, 0));
    expect(DOCK_GAPS.slice(-2)).toEqual([8, 17]);
  });
  it("is deterministic through repeated asymmetric and edge sweeps, without viewport overflow", () => {
    for (const viewport of [768, 1280]) for (let x = 150; x < viewport; x += 17) {
      const first = dockLayout(x, viewport);
      expect(dockLayout(x, viewport)).toEqual(first);
      expect(first.width).toBeLessThanOrEqual(viewport - 12 + 0.001);
      expect(first.sizes.every(size => size >= 48 && size <= 48 * 1.68)).toBe(true);
    }
  });
});