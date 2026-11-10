/** Normalized pose in [-1,1]; converted to CSS 3D tilt and pupil offsets. */
export function portraitGaze(dx: number, dy: number) {
  return { x: Math.max(-1, Math.min(1, dx / 400)), y: Math.max(-1, Math.min(1, dy / 300)) };
}
// Measured from the PNG (1291×1218): eye centres ~(546,389) and (734,390), openings ~29×10 px half-size;
// chin ends ~y705, neck near-parallel to ~y815 where shoulders flare. Head layer is cut at y800.
export const PORTRAIT_TILT_DEG = 7;
// Photographed iris ~r19 fills the opening vertically, so it is painted over with eye-white and redrawn,
// clipped to the opening so the new iris can never cross the lids or glasses frame.
export const PORTRAIT_EYES = [{ x: 547, y: 388 }, { x: 735, y: 390 }] as const;
export const IRIS_RADIUS = 18, PUPIL_RADIUS = 7, PUPIL_RANGE = { x: 8, y: 2 };
export function portraitTransform(pose: { x: number; y: number }) {
  return {
    rotateY: pose.x * PORTRAIT_TILT_DEG, rotateX: -pose.y * PORTRAIT_TILT_DEG,
    pupilX: pose.x * PUPIL_RANGE.x, pupilY: pose.y * PUPIL_RANGE.y,
  };
}
