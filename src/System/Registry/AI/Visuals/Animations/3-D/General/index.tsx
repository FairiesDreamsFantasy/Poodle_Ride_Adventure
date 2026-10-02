/**
 * 3D Projective Geometry, Camera Matrix & Spherical Coordinate Registry
 * Mathematical formulations for spherical perspective and tensor rotations.
 */

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface Camera3DRegistryConfig {
  focalLength: number;
  cameraDistance: number;
  fieldOfViewRad: number;
  nearClip: number;
  farClip: number;
  vanishingPoint: { x: number; y: number };
}

export interface SphericalCoordinate {
  radius: number;
  thetaRad: number; // Azimuthal angle [0, 2pi]
  phiRad: number;   // Polar angle [0, pi]
}

export const DEFAULT_CAMERA_3D: Readonly<Camera3DRegistryConfig> = Object.freeze({
  focalLength: 480.0,
  cameraDistance: 1200.0,
  fieldOfViewRad: (65 * Math.PI) / 180,
  nearClip: 1.0,
  farClip: 10000.0,
  vanishingPoint: { x: 0.0, y: -40.0 },
});

export const SPHERICAL_ORIGIN: Readonly<SphericalCoordinate> = Object.freeze({
  radius: 1.0,
  thetaRad: 0.0,
  phiRad: Math.PI / 2,
});
