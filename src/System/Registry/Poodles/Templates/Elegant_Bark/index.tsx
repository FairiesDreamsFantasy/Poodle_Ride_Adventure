/**
 * System/Registry/Poodles/Templates/Elegant_Bark/index.tsx
 * Templates for poodles' elegant bark vocalization types, including BOW and Classic options.
 */

export const ELEGANT_BARK_TEMPLATES = {
  BOW: {
    id: 'BOW',
    name: 'Elegant Bow Bark',
    description: 'Unified standardized bow bark representing a unique scaled pitch representing specific vocal signatures.',
    defaultVolumeBaseline: 0.5,
    yipVolume: 0.5125, // 2.5% above baseline (0.5 * 1.025)
    amplifyPettingFactor: 1.04, // standard 4% petting sound amplification
    acousticEchoes: {
      standardDelay: [150, 300], // Abigay, Dymond, Abigail
      anninneAmeliaDelay: [120, 250], // Anninne-Amelia
      dynamicToggle: true, // toggles dynamically depending on active area
    }
  },
  Classic: {
    id: 'Classic',
    name: 'Classic Bark',
    description: 'Classic / Genericy barks available as a toggle via the Poodle Selection menu.',
    defaultVolumeBaseline: 0.5,
    acousticEchoes: {
      standardDelay: [0],
      dynamicToggle: false,
    }
  }
};

export default ELEGANT_BARK_TEMPLATES;
