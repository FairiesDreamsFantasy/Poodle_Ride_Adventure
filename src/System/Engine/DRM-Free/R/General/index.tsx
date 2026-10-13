/**
 * DRM-Free R Engine Specification & Runtime Interface
 * Zero-telemetry, DRM-free execution profile for R sub-routines.
 */

export interface DRMFreeRConfig {
  language: 'R';
  drmFree: true;
  offlineCompliant: true;
  telemetryFree: true;
  sandboxLevel: 'Standard' | 'Strict' | 'Bare-Metal';
}

export const DRMFreeRProfile: DRMFreeRConfig = {
  language: 'R',
  drmFree: true,
  offlineCompliant: true,
  telemetryFree: true,
  sandboxLevel: 'Bare-Metal'
};

export function getDRMFreeRRuntime(): DRMFreeRConfig {
  return DRMFreeRProfile;
}
