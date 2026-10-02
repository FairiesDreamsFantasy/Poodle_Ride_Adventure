import { CeilingPoint } from '../Geometry';

export interface Camera3D {
  x: number;
  y: number;
  z: number;
  yaw: number;   // rotation around Z (degrees)
  pitch: number; // up/down tilt (degrees)
  fov: number;   // field of view
}

/**
 * Projects a 3D coordinate point onto a 2D screen coordinate, incorporating pitch, yaw, and fov.
 * Includes optional spherical projection modeling mimicking the Poodle3DRenderer techniques.
 */
export function project3DPoint(
  point: CeilingPoint,
  camera: Camera3D,
  screenWidth: number,
  screenHeight: number,
  useSpherical: boolean = false
): { x: number; y: number; scale: number; visible: boolean } {
  // Translate point relative to camera coordinates
  const dx = point.x - camera.x;
  const dy = point.y - camera.y;
  const dz = point.z - camera.z;

  // Convert angles to radians
  const yawRad = (camera.yaw * Math.PI) / 180;
  const pitchRad = (camera.pitch * Math.PI) / 180;

  // Rotate around Z axis (yaw)
  const rx = dx * Math.cos(yawRad) - dy * Math.sin(yawRad);
  const ry = dx * Math.sin(yawRad) + dy * Math.cos(yawRad);

  // Rotate around Y axis (pitch)
  const rz = dz * Math.cos(pitchRad) - rx * Math.sin(pitchRad);
  const finalX = rx * Math.cos(pitchRad) + dz * Math.sin(pitchRad);
  const finalY = ry;
  const finalZ = rz;

  // Behind the camera check
  if (finalZ <= 0) {
    return { x: 0, y: 0, scale: 0, visible: false };
  }

  // Perspective calculation
  let scale = camera.fov / finalZ;

  if (useSpherical) {
    // Advanced 3D spherical projection adjustments
    const dist2D = Math.sqrt(finalX * finalX + finalY * finalY);
    const theta = Math.atan2(finalY, finalX);
    const sphericalRadius = Math.sin(dist2D / 2000) * 1000;
    
    const sx = screenWidth / 2 + sphericalRadius * Math.cos(theta) * scale;
    const sy = screenHeight / 2 + sphericalRadius * Math.sin(theta) * scale;
    
    return { x: sx, y: sy, scale, visible: true };
  }

  const sx = screenWidth / 2 + finalX * scale;
  const sy = screenHeight / 2 - finalY * scale; // invert Y for screen coords

  return {
    x: sx,
    y: sy,
    scale,
    visible: sx >= 0 && sx <= screenWidth && sy >= 0 && sy <= screenHeight
  };
}
