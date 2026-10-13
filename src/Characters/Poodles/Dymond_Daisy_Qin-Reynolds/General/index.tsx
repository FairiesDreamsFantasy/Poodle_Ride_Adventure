/**
 * POODLE CORE FEATURES & DESIGN - Dymond Daisy Qin-Reynolds
 * Centralized repository for the Poodle's identity, design, and core capabilities.
 */

export const POODLE_CORE = {
  identity: {
    name: "Dymond Daisy Qin-Reynolds",
    audioName: "Dymond",
    description: "Dymond Daisy Qin-Reynolds is a special course poodle. She is a light-yellow poodle standing 5 feet 5 inches at the shoulder and 7 feet long. She is a specialized masterpiece for the Story Book courses.",
  },
  design: {
    appearance: "Dymond is a light-yellow poodle with green eyes, a warm dry dark-pink nose with a mirror shine and no nostrils, and peach skin with a 10% yellowish undertone. Her girl-like head (excluding ears) is perched slightly on top of her neck. She wears a dynamic color collar with a horizontal diamond charm and a tiara with a glowing heart gem. Her body is 7 feet long and 5 feet 5 inches tall at the shoulder, appearing as two fused spheres. Your legs are molded into her fur. Her paws have rounded toes and dark-pink pads. Her tail is 38 inches long with a 24-inch diameter ball tip.",
    dimensions: {
      shoulderHeightFeet: 5.416, // 5'5"
      lengthFeet: 7,
      tailLengthInches: 38,
      tailBallDiameterInches: 24,
      headWidthInches: 45, // Excludes ears (precision update)
      headHeightInches: 40 // Excludes ears (precision update)
    }
  },
  mechanics: {
    elegantBark: "Standardized Elegant Bark (Warm tone).",
    headStability: "Head rendering uses poodleYOffset only, ensuring stable and majestic head position.",
  }
};

export const DYMOND_DESCRIPTION = POODLE_CORE.identity.description + " " + POODLE_CORE.design.appearance;
