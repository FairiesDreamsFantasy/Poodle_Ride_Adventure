/**
 * Audio General Systems.
 */

export interface SoundState {
  muted: boolean;
  surroundSound: boolean;
}

export const DEFAULT_SOUND_STATE: SoundState = {
  muted: false,
  surroundSound: true
};

export interface EchoConfig {
  delay: number;
  volumeMultiplier: number;
}

/**
 * Default echo configuration mirroring the original hardcoded logic.
 * Primary Echo: 150ms delay, 40-60% volume.
 * Secondary Echo: 300ms delay, 20-30% volume.
 */
export const DEFAULT_ELEGANT_ECHOES: EchoConfig[] = [
  { delay: 0.15, volumeMultiplier: 0.4 },
  { delay: 0.30, volumeMultiplier: 0.2 },
];

/**
 * Enhanced echo configuration for reverb-rich environments (e.g., Foyers, Porches).
 */
export const ENHANCED_ELEGANT_ECHOES: EchoConfig[] = [
  { delay: 0.15, volumeMultiplier: 0.6 },
  { delay: 0.30, volumeMultiplier: 0.3 },
];

/**
 * playModularElegantEcho
 * Handles the logic for playing secondary vocalization echoes.
 * 
 * @param playSingleShot - Function that triggers a single instance of the bark.
 * @param isEnhanced - Whether to use the louder, reverb-rich echo profile.
 */
export function playModularElegantEcho(
  playSingleShot: (delay: number, volume: number) => void,
  isEnhanced: boolean = false
) {
  const config = isEnhanced ? ENHANCED_ELEGANT_ECHOES : DEFAULT_ELEGANT_ECHOES;
  
  config.forEach(echo => {
    playSingleShot(echo.delay, echo.volumeMultiplier);
  });
}
