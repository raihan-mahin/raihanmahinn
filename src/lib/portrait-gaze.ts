/** Normalized, reversible head pose; source art and lower torso stay unchanged. */
export function portraitGaze(dx: number, dy: number) {
  return {
    x: Math.max(-1, Math.min(1, dx / 400)),
    y: Math.max(-1, Math.min(1, dy / 300)),
  };
}

// Fade band measured from the PNG: chin shadow ends ~y705, neck stays near-parallel to ~y815 where
// shoulders flare; collar appears ~y920. Warp reaches zero at y800, before the flare.
export function portraitPoint(x: number, y: number, pose: { x: number; y: number }) {
  const t = Math.max(0, Math.min(1, (y - 710) / 90));
  const weight = 1 - t * t * (3 - 2 * t);
  const angle = pose.x * 0.075;
  const px = x - 640, py = y - 700;
  const rx = px * Math.cos(angle) - py * Math.sin(angle) + pose.x * 32 - px * Math.abs(pose.x) * 0.035 - pose.x * 0.06 * px * px / 320;
  const ry = px * Math.sin(angle) + py * Math.cos(angle) + pose.y * 18 + py * pose.y * 0.025;
  return { x: x + weight * (rx - px), y: y + weight * (ry - py) };
}