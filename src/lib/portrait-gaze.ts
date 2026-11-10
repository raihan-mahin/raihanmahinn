/** Normalized, reversible head pose; source art and lower torso stay unchanged. */
export function portraitGaze(dx: number, dy: number) {
  return {
    x: Math.max(-1, Math.min(1, dx / 400)),
    y: Math.max(-1, Math.min(1, dy / 300)),
  };
}

export function portraitPoint(x: number, y: number, pose: { x: number; y: number }) {
  const t = Math.max(0, Math.min(1, (y - 650) / 220));
  const weight = 1 - t * t * (3 - 2 * t);
  const angle = pose.x * 0.075;
  const px = x - 640, py = y - 700;
  const rx = px * Math.cos(angle) - py * Math.sin(angle) + pose.x * 32 - px * Math.abs(pose.x) * 0.035;
  const ry = px * Math.sin(angle) + py * Math.cos(angle) + pose.y * 18 + py * pose.y * 0.025;
  return { x: x + weight * (rx - px), y: y + weight * (ry - py) };
}