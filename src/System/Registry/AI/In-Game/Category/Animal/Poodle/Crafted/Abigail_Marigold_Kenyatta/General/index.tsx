/**
 * System/Registry/AI/In-Game/Category/Animal/Poodle/Crafted/Abigail_Marigold_Kenyatta/General/index.tsx
 * Authoritative interaction constants and specifications for Abigail Marigold Kenyatta.
 */

export const AbigailMarigoldKenyattaAIConfig = {
  name: 'Abigail',
  fullName: 'Abigail Marigold Kenyatta',
  breed: 'Crafted Standard Poodle',
  furColor: 'shaded cream/marigold',
  noseType: 'Warm and Dry',
  mirrorShine: true,
  pettingVolumeMultiplier: 1.050,
  leanForwardVolumeMultiplier: 1.034,
  barkType: 'BOW',
  echoDelays: [150, 300],
  gallopRhythmMs: 300, // Standardization "AA" (300ms 1-2-3 rhythm)
};

export const PoodleInteractions = {
  Abigail_Marigold_Kenyatta: AbigailMarigoldKenyattaAIConfig,
};
