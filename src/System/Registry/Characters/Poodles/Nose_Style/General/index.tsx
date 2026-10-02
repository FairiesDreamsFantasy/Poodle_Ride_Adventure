
/**
 * Poodle Nose Style System
 */
export enum NoseStyle {
  BUTTON = 'BUTTON',
  ROUNDED = 'ROUNDED'
}

export enum NoseMoisture {
  WET = 'WET',
  DRY = 'DRY'
}

export enum NoseTemperature {
  COLD = 'COLD',
  WARM = 'WARM'
}

export enum NoseNostrils {
  WITH_NOSTRILS = 'WITH_NOSTRILS',
  WITHOUT_NOSTRILS = 'WITHOUT_NOSTRILS'
}

export interface NoseMetadata {
  style: NoseStyle;
  moisture: NoseMoisture;
  temperature: NoseTemperature;
  nostrils: NoseNostrils;
  hasMirrorShine: boolean;
}

export const POODLE_NOSE_STYLE_MAP: Record<string, NoseMetadata> = {
  'Abigay Rose Kone': {
    style: NoseStyle.BUTTON,
    moisture: NoseMoisture.DRY,
    temperature: NoseTemperature.WARM,
    nostrils: NoseNostrils.WITHOUT_NOSTRILS,
    hasMirrorShine: true
  },
  'Anninne-Amelia Rose Julisus': {
    style: NoseStyle.ROUNDED,
    moisture: NoseMoisture.DRY,
    temperature: NoseTemperature.WARM,
    nostrils: NoseNostrils.WITHOUT_NOSTRILS,
    hasMirrorShine: true
  },
  'Abigail Marigold Kenyatta': {
    style: NoseStyle.ROUNDED,
    moisture: NoseMoisture.DRY,
    temperature: NoseTemperature.WARM,
    nostrils: NoseNostrils.WITHOUT_NOSTRILS,
    hasMirrorShine: true
  },
  'Dymond Daisy Qin-Reynolds': {
    style: NoseStyle.ROUNDED,
    moisture: NoseMoisture.DRY,
    temperature: NoseTemperature.WARM,
    nostrils: NoseNostrils.WITHOUT_NOSTRILS,
    hasMirrorShine: true
  },
  'Classic White Poodle': {
    style: NoseStyle.ROUNDED,
    moisture: NoseMoisture.WET,
    temperature: NoseTemperature.COLD,
    nostrils: NoseNostrils.WITHOUT_NOSTRILS,
    hasMirrorShine: false
  },
  'Olga-Olivia': {
    style: NoseStyle.ROUNDED,
    moisture: NoseMoisture.WET,
    temperature: NoseTemperature.COLD,
    nostrils: NoseNostrils.WITH_NOSTRILS,
    hasMirrorShine: false
  }
};
