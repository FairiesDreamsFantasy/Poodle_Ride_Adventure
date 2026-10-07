/**
 * Calculates mathematically precise 3D spatial panning vector (x, y, z)
 * relative to the player's position and orientation/rotation.
 */
export const calculateDoorSpatialPan = (
  doorX: number,
  doorY: number,
  playerX: number,
  playerY: number,
  rotationDeg: number = 0,
  direction?: string
): { x: number; y: number; z: number } => {
  const dx = doorX - playerX;
  const dy = doorY - playerY;

  // Resolve effective orientation angle (0 = North, 90 = East, 180 = South, 270 = West)
  let angleDeg = rotationDeg;
  if (angleDeg === undefined || angleDeg === null) {
    if (direction === 'East') angleDeg = 90;
    else if (direction === 'South') angleDeg = 180;
    else if (direction === 'West') angleDeg = 270;
    else angleDeg = 0;
  }

  const rad = (angleDeg * Math.PI) / 180;

  // In world space: +Y is North, +X is East.
  // Rotated relative coordinates in listener coordinate frame:
  const localX = dx * Math.cos(rad) - dy * Math.sin(rad);
  const localForward = dx * Math.sin(rad) + dy * Math.cos(rad);

  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist === 0) return { x: 0, y: 0, z: 0 };

  // Normalize into standard stereo pan bounds [-1, 1]
  const scale = Math.min(1, dist / 150);
  const panX = (localX / dist) * scale;
  const panZ = -(localForward / dist) * scale; // -Z is forward in WebAudio listener coords

  return { x: panX, y: 0, z: panZ };
};
