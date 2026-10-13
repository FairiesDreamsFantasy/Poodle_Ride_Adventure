/**
 * DRM-Free SQL Engine Specification & Runtime Interface
 * Zero-telemetry, DRM-free execution profile for SQL sub-routines.
 */

export interface DRMFreeSQLConfig {
  language: 'SQL';
  drmFree: true;
  offlineCompliant: true;
  telemetryFree: true;
  sandboxLevel: 'Standard' | 'Strict' | 'Bare-Metal';
}

export const DRMFreeSQLProfile: DRMFreeSQLConfig = {
  language: 'SQL',
  drmFree: true,
  offlineCompliant: true,
  telemetryFree: true,
  sandboxLevel: 'Bare-Metal'
};

export function getDRMFreeSQLRuntime(): DRMFreeSQLConfig {
  return DRMFreeSQLProfile;
}
