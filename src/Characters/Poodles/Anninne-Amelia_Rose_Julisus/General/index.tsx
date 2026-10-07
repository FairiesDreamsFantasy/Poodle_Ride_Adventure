/**
 * POODLE CORE FEATURES & DESIGN - Anninne-Amelia Rose Julisus
 * Centralized repository for the Poodle's identity, design, and core capabilities.
 */

export const POODLE_CORE = {
  identity: {
    name: "Anninne-Amelia Rose Julisus",
    audioName: "AnninneAmelia",
    description: "Anninne-Amelia is a massive 9.5-foot tall red-orange poodle standing 6 feet at the shoulder (9.5 feet total without her tiara, and 10.5 feet including her 12-inch golden tiara). She is a majestic masterpiece of red-orange beauty.",
    rastafarian: "Core Feature: She opposes Babylon, embracing a spirit of natural grace and elegance.",
    onlyDog: "Core Feature: She is designed only for riding, not for Babylonian leashes.",
  },
  design: {
    appearance: "Anninne-Amelia stands 6 feet at the shoulder. She has a red-orange rounded nose (warm and dry with a mirror shine), shiny blue eyes, and a girl-like head form (with dimensions excluding ears/hair) with long thick wavy red-orange hair. Her ears are not visible or present. Her neck never leans forward, and her head is always perched on top of her neck. Her skin is a shiny tan color. She wears a gold collar with horizontal green and red diamonds with rainbow borders and a horizontal diamond charm. Her golden tiara features a large vertical diamond-shaped gem at its center. Her body is 56 inches wide and 8 feet long, appearing as two spheres connected by thick fur. Your legs are molded into her fur, creating a fused appearance. Her paws have rounded paws with dark red-orange pads. Her tail is 3 feet long, standing at a precise 45-degree angle, with an enlarged ball tip.",
    dimensions: {
      shoulderHeightFeet: 6,
      totalHeightFeet: 10.5,
      totalHeightNoTiaraFeet: 9.5,
      lengthFeet: 8,
      widthInches: 56,
      headWidthInches: 46, // Excludes ears (precision update)
      headHeightInches: 43, // Excludes ears (precision update)
      tailLengthFeet: 3,
      tailAngleDegrees: 45
    }
  },
  mechanics: {
    gallopRhythm: "Core Feature: Iconic 1-2-3 gallop rhythm pattern (400ms).",
    gallopName: "Anninne-Amelia's Gallop",
    elegantBark: "Standardized Elegant Bark (Pitch-scaled for Anninne-Amelia).",
  }
};

export const ANNINNE_AMELIA_DESCRIPTION = POODLE_CORE.identity.description + " " + POODLE_CORE.design.appearance;
