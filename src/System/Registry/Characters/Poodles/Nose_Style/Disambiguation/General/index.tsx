
import { POODLE_NOSE_STYLE_MAP, NoseMetadata, NoseNostrils, NoseMoisture, NoseTemperature, NoseStyle } from '../../General';

/**
 * Nose Style Disambiguation Logic
 */
export function getPoodleNoseMetadata(name: string): NoseMetadata | null {
  return POODLE_NOSE_STYLE_MAP[name] || null;
}

export function hasNostrils(name: string): boolean {
  const meta = getPoodleNoseMetadata(name);
  return meta?.nostrils === NoseNostrils.WITH_NOSTRILS;
}

export function isColdAndWet(name: string): boolean {
  const meta = getPoodleNoseMetadata(name);
  return meta?.temperature === NoseTemperature.COLD && meta?.moisture === NoseMoisture.WET;
}

export function isButtonNose(name: string): boolean {
  const meta = getPoodleNoseMetadata(name);
  return meta?.style === NoseStyle.BUTTON;
}
