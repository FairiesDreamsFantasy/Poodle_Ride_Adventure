import { ELEGANT_BARK_TEMPLATES } from '../../../Registry/Poodles/Templates/Elegant_Bark';
import { getEffectiveEchoState, isInternalReverbEnabled, isMeditationArea } from '../../../Sound/Reverberation_Effects_List/Algorithms/EchoLogic';

/**
 * System/AI/In-Game/Reverb_Control/index.tsx
 * Controls and maps local reverberation settings, dynamic vocal echoes for barks,
 * and integrates with the active game sound environment.
 */

/**
 * Gets the echo delays configured for a specific poodle.
 * Anninne-Amelia has unique timings [120, 250]ms, others have [150, 300]ms.
 */
export const getPoodleEchoDelays = (animal: string): number[] => {
  if (animal === 'Anninne-Amelia Rose Julisus') {
    return ELEGANT_BARK_TEMPLATES.BOW.acousticEchoes.anninneAmeliaDelay;
  }
  return ELEGANT_BARK_TEMPLATES.BOW.acousticEchoes.standardDelay;
};

/**
 * Checks if the internal reverberation/echo system should be active for a given area.
 * Coordinates with the reverb mappings.
 */
export const checkInternalReverbStatus = (area: string): boolean => {
  const isSpecificMeditation = isMeditationArea(area);
  return isInternalReverbEnabled(area, isSpecificMeditation);
};

/**
 * Controls whether the poodle's elegant bark's internal echo is dynamically enabled
 * based on the active area profile.
 */
export const getDynamicEchoToggle = (area: string, baseDisableInternalEcho: boolean): boolean => {
  return getEffectiveEchoState(area, baseDisableInternalEcho);
};
