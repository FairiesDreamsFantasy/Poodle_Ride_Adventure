/**
 * DRM-Free ASP Engine Specification & Runtime Interface
 * Zero-telemetry, DRM-free execution profile for ASP sub-routines.
 */

export interface DRMFreeASPConfig {
  language: 'ASP';
  drmFree: true;
  offlineCompliant: true;
  telemetryFree: true;
  sandboxLevel: 'Standard' | 'Strict' | 'Bare-Metal';
}

export const DRMFreeASPProfile: DRMFreeASPConfig = {
  language: 'ASP',
  drmFree: true,
  offlineCompliant: true,
  telemetryFree: true,
  sandboxLevel: 'Bare-Metal'
};

export function getDRMFreeASPRuntime(): DRMFreeASPConfig {
  return DRMFreeASPProfile;
}
