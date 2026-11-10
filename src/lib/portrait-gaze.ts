/** Normalized pose in [-1,1]; converted to CSS 3D tilt and pupil offsets. */
export function portraitGaze(dx: number, dy: number) {
  return { x: Math.max(-1, Math.min(1, dx / 400)), y: Math.max(-1, Math.min(1, dy / 300)) };
}
// Measured from the PNG (1291×1218): eye centres ~(546,389) and (734,390), openings ~29×10 px half-size;
// chin ends ~y705, neck near-parallel to ~y815 where shoulders flare. Head layer is cut at y800.
export const PORTRAIT_TILT_DEG = 7;
export const PORTRAIT_EYES = [{ x: 546, y: 389 }, { x: 734, y: 390 }] as const;
export const PUPIL_RADIUS = 8, PUPIL_RANGE = { x: 12, y: 3 };
export function portraitTransform(pose: { x: number; y: number }) {
  return {
    rotateY: pose.x * PORTRAIT_TILT_DEG, rotateX: -pose.y * PORTRAIT_TILT_DEG,
    pupilX: pose.x * PUPIL_RANGE.x, pupilY: pose.y * PUPIL_RANGE.y,
  };
}
