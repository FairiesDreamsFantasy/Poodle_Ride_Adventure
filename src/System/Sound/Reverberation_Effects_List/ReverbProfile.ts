/**
 * ReverbProfile.ts
 * Defines the structure for environmental reverberation effects.
 */

export interface ReverbProfile {
  name: string;
  delayTime: number; // in seconds
  gain: number;      // intensity (0 to 1)
  feedback: number;  // feedback amount (0 to 1)
  filterFreq?: number; // optional low-pass filter frequency
  disableInternalEcho?: boolean; // If true, internal echoes of sounds (like barks) are disabled
}
