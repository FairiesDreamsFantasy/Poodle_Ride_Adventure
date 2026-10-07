import { 
  Vector3D, 
  Camera3DRegistryConfig, 
  SphericalCoordinate, 
  DEFAULT_CAMERA_3D 
} from '../../../../../../../Registry/AI/Visuals/Animations/3-D/General/index.tsx';

export interface ProjectedPoint2D {
  screenX: number;
  screenY: number;
  depthZ: number;
  scaleFactor: number;
  visible: boolean;
}

/**
 * Converts Spherical Coordinates (r, theta, phi) to 3D Cartesian Coordinates (x, y, z)
 */
export function sphericalToCartesian(coord: SphericalCoordinate): Vector3D {
  return {
    x: coord.radius * Math.sin(coord.phiRad) * Math.cos(coord.thetaRad),
    y: coord.radius * Math.cos(coord.phiRad),
    z: coord.radius * Math.sin(coord.phiRad) * Math.sin(coord.thetaRad),
  };
}

/**
 * Rotates a 3D vector using Euler angles (yaw around Y, pitch around X, roll around Z)
 */
export function rotateEuler3D(vec: Vector3D, yawRad: number, pitchRad: number, rollRad: number): Vector3D {
  // Yaw (Y-axis rotation)
  const cy = Math.cos(yawRad);
  const sy = Math.sin(yawRad);
  const x1 = vec.x * cy + vec.z * sy;
  const y1 = vec.y;
  const z1 = -vec.x * sy + vec.z * cy;

  // Pitch (X-axis rotation)
  const cp = Math.cos(pitchRad);
  const sp = Math.sin(pitchRad);
  const x2 = x1;
  const y2 = y1 * cp - z1 * sp;
  const z2 = y1 * sp + z1 * cp;

  // Roll (Z-axis rotation)
  const cr = Math.cos(rollRad);
  const sr = Math.sin(rollRad);
  const x3 = x2 * cr - y2 * sr;
  const y3 = x2 * sr + y2 * cr;
  const z3 = z2;

  return { x: x3, y: y3, z: z3 };
}

/**
 * Perspective Projection Matrix transform from World 3D to Screen 2D
 */
export function project3DToScreen(
  point: Vector3D,
  camera: Camera3DRegistryConfig = DEFAULT_CAMERA_3D
): ProjectedPoint2D {
  const adjustedZ = point.z + camera.cameraDistance;

  if (adjustedZ <= camera.nearClip || adjustedZ >= camera.farClip) {
    return {
      screenX: camera.vanishingPoint.x,
      screenY: camera.vanishingPoint.y,
      depthZ: adjustedZ,
      scaleFactor: 0.0,
      visible: false,
    };
  }

  const scaleFactor = camera.focalLength / adjustedZ;
  const screenX = camera.vanishingPoint.x + point.x * scaleFactor;
  const screenY = camera.vanishingPoint.y + point.y * scaleFactor;

  return {
    screenX,
    screenY,
    depthZ: adjustedZ,
    scaleFactor,
    visible: true,
  };
}

export { DEFAULT_CAMERA_3D };
