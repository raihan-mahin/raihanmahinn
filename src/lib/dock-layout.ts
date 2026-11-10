/** Baseline geometry includes LinkedIn and the wider Trash divider gap. */
export const DOCK_BASE_SIZE = 48;
export const DOCK_DURATION = 180;
export const DOCK_GAPS = [0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 8, 17];
const PADDING = 14;
export const DOCK_BASE_WIDTH = 651;
const centers = DOCK_GAPS.map((_, index) =>
  7 + DOCK_GAPS.slice(0, index + 1).reduce((a, b) => a + b, 0) + index * 48 + 24);

/** Smooth interpolation of the measured reference falloff, in baseline slots. */
export function dockScale(distance: number) {
  const d = Math.abs(distance);
  const peaks = [0.68, 0.56, 0.26, 0];
  if (d >= 3) return 1;
  const i = Math.floor(d);
  const mix = (1 - Math.cos(Math.PI * (d - i))) / 2;
  return 1 + (peaks[i] ?? 0) * (1 - mix) + (peaks[i + 1] ?? 0) * mix;
}

export function dockLayout(pointer: number | null, viewport: number) {
  const baseline = { sizes: centers.map(() => 48), width: DOCK_BASE_WIDTH };
  if (pointer === null) return baseline;
  const build = (q: number) => {
    const extras = centers.map(center => 48 * (dockScale((center - q) / 52) - 1));
    const total = extras.reduce((a, b) => a + b, 0);
    const fit = total > 0 ? Math.min(1, Math.max(0, viewport - 12 - DOCK_BASE_WIDTH) / total) : 1;
    const sizes = extras.map(extra => 48 + extra * fit);
    const width = PADDING + sizes.reduce((a, b) => a + b, 0) + DOCK_GAPS.reduce((a, b) => a + b, 0);
    // Map a baseline coordinate into this candidate occupied-width layout.
    // This never reads animated DOM geometry, so repeated events cannot feed back.
    let mapped = q;
    sizes.forEach((size, i) => {
      mapped += (size - 48) * Math.max(0, Math.min(1, (q - (centers[i] ?? 0) + 24) / 48));
    });
    return { sizes, width, x: (viewport - width) / 2 + mapped };
  };
  let low = -200;
  let high = DOCK_BASE_WIDTH + 200;
  for (let i = 0; i < 36; i++) {
    const mid = (low + high) / 2;
    if (build(mid).x < pointer) low = mid; else high = mid;
  }
  const { sizes, width } = build((low + high) / 2);
  return { sizes, width };
}