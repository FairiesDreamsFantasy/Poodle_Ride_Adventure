/**
 * POODLE CORE FEATURES & DESIGN - Abigail Marigold Kenyatta
 * Centralized repository for the Poodle's identity, design, and core capabilities.
 */

export const POODLE_CORE = {
  identity: {
    name: "Abigail Marigold Kenyatta",
    audioName: "Abigail",
    description: "Abigail Marigold Kenyatta is an elegant ally poodle standing 5 feet 3 inches at the shoulder and 7 feet long. She is a refined masterpiece with a slender athletic form.",
  },
  design: {
    appearance: "Abigail has a refined cream or marigold shaded coat, a slender athletic head form (excluding ears), a warm dry pink nose with a mirror shine and no nostrils, and royal blue eyes. Her skin is a peach color. She wears a magnificent rose-gold tiara adorned with floral white decorations and a pink flower-shaped gem at its center. She wears a luxurious rose-gold collar with an embossed diamond pattern. Your legs are molded into her fur, creating a fused appearance. Her tail is 3 feet long and she is designed only for riding.",
    dimensions: {
      shoulderHeightFeet: 5.25, // 5'3"
      lengthFeet: 7,
      headWidthInches: 41.5, // Slender athletic head, excludes ears (precision update)
      headHeightInches: 38, // Slender athletic head, excludes ears (precision update)
      tailLengthFeet: 3
    }
  },
  mechanics: {
    gallopRhythm: "Standardization AA: 300ms (1-2-3) rhythm.",
    elegantBark: "Standardized Elegant Bark (Pitch-scaled for Abigail).",
    headStability: "Head position is locked to the poodle's rhythm and is independent of the rider's lean.",
  }
};

export const ABIGAIL_DESCRIPTION = POODLE_CORE.identity.description + " " + POODLE_CORE.design.appearance;
