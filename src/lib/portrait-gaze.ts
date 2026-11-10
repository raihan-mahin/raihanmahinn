/** Motion is in original 1291 × 1218 artwork pixels, not rendered CSS pixels. */
export const GAZE_LIMIT = { x: 5, y: 2.5 };
export function portraitGaze(dx: number, dy: number) {
  return {
    x: Math.max(-1, Math.min(1, dx / 400)) * GAZE_LIMIT.x,
    y: Math.max(-1, Math.min(1, dy / 300)) * GAZE_LIMIT.y,
  };
}