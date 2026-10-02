import { ELEGANT_BARK_TEMPLATES } from '../../../../../Registry/Poodles/Templates/Elegant_Bark';
import { getEffectiveEchoState, isInternalReverbEnabled, isMeditationArea } from '../../../../../Sound/Reverberation_Effects_List/Algorithms/EchoLogic';

/**
 * System/AI/In-Game/Category/Sound/General/index.tsx
 * Controls dynamic reverberation mappings, acoustic priority curves,
 * and environmental echo configurations.
 */

export const getPoodleEchoDelaysAI = (animal: string): number[] => {
  if (animal === 'Anninne-Amelia Rose Julisus') {
    return ELEGANT_BARK_TEMPLATES.BOW.acousticEchoes.anninneAmeliaDelay;
  }
  return ELEGANT_BARK_TEMPLATES.BOW.acousticEchoes.standardDelay;
};

export const checkInternalReverbStatusAI = (area: string): boolean => {
  const isSpecificMeditation = isMeditationArea(area);
  return isInternalReverbEnabled(area, isSpecificMeditation);
};

export const getDynamicEchoToggleAI = (area: string, baseDisableInternalEcho: boolean): boolean => {
  return getEffectiveEchoState(area, baseDisableInternalEcho);
};
