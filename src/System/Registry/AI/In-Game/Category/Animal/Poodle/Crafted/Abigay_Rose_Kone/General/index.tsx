/**
 * System/Registry/AI/In-Game/Category/Animal/Poodle/Crafted/Abigay_Rose_Kone/General/index.tsx
 * Authoritative interaction constants and specifications for Abigay Rose Kone.
 */

export const AbigayRoseKoneAIConfig = {
  name: 'Abigay',
  fullName: 'Abigay Rose Kone',
  breed: 'Crafted Standard Poodle',
  furColor: 'white',
  noseType: 'Warm and Dry',
  mirrorShine: true,
  pettingVolumeMultiplier: 1.0712, // Standard baseline + amplified petting
  leanForwardVolumeMultiplier: 1.034,
  barkType: 'BOW',
  echoDelays: [150, 300],
  gallopRhythmMs: 400,
};

export const PoodleInteractions = {
  Abigay_Rose_Kone: AbigayRoseKoneAIConfig,
};
