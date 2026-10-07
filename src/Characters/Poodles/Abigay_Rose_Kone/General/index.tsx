/**
 * POODLE CORE FEATURES & DESIGN
 * Centralized repository for the Poodle's identity, design, and core capabilities.
 * HARDCODED CORE: This file is a self-contained powerhouse for Abigay Rose Kone's identity.
 */

export const POODLE_CORE = {
  identity: {
    name: "Abigay Rose Kone",
    audioName: "Abigay",
    description: "Core Feature: Abigay, a massive white poodle standing 6 feet tall at the shoulder (with her iconic larger head perched on top of her neck reaching 9 feet, and a total height of 10 feet including her enlarged tiara), designed for riding with the power of science, not pseudoscience! She is a majestic, living masterpiece of 3D craftsmanship.",
    rastafarian: "Core Feature: She's surprisingly Rastafarian, embracing a spirit of peace, love, and natural living!",
    opposesBabylon: "Core Feature: She Opposes Babylon, rejecting artificial constraints and embracing the freedom of the open path.",
    onlyDog: "Core Feature: She's an only dog who can't be walked with a 'Babylonian leash', only for riding. This emphasizes her unique role as a partner and steed.",
    ageGroup: "Core Feature: This poodle is for everyone of any age who wished to ride Abigay, a massive white poodle, not for little kids (because a definition of a kid is a baby goat!). It's a sophisticated adventure for the young at heart.",
  },
  design: {
    appearance: "Abigay has a massive white coat, a cartoon pink button round nose (warm and dry with a horizontal oval shape and no nostrils), and shiny blue eyes. Her iconic larger head is perched on top of her neck. Her skin is a refined peach color. She wears a pink collar with horizontal white diamonds and a large diamond charm, and an enlarged pink tiara with a 4-inch heart-shaped gem. Her body is 50 inches wide and 8 feet long, appearing as two spheres connected by thick fur. Your legs are molded into her fur, creating a fused appearance. Her paws have rounded toes and pink pads. Her tail is 3 feet long, standing diagonally at an acute angle with an enlarged furry ball tip.",
    size: "Core Feature: A poodle this large (8 feet long) is large enough for me to ride, I can go anywhere (#1 on my wish list!!)",
    height: "Core Feature: She stands 6 feet tall at the shoulder; her iconic larger head is perched on top of her neck at 9 feet, and her enlarged tiara reaches a total height of 10 feet. This makes her a truly massive and majestic poodle, perfectly sized for riding.",
    dimensions: {
      shoulderHeightFeet: 6,
      headHeightFeet: 9,
      totalHeightFeet: 10,
      lengthFeet: 8,
      widthInches: 50,
      headWidthInches: 56.25, // 25% larger than typical, excludes ears (precision update)
      headHeightInches: 50, // 25% larger than typical, excludes ears (precision update)
      tailLengthFeet: 3,
      tailBallTipEnlargement: "10%",
      tiaraHeartGemSizeInches: 4
    }
  },
  rider: {
    role: "Me (as a rider) - Core Feature as a partner who rides his poodle!",
    height: "Core Feature: The rider stands 5 feet, 4 inches tall, perfectly proportioned for riding a 10-foot poodle.",
    love: "Pressing 'H' to confirm there's love.",
  },
  environment: {
    checkedFlooring: "Core Feature: Pink and white checked ceramic flooring design, creating a vibrant and clean aesthetic.",
    grandTapestry: "Core Feature: A grand, hand-woven tapestry depicting history, adding a sense of depth and heritage to the foyer.",
    artwork: "Core Feature: Embossed artwork and carvings that can be felt, providing a tactile dimension to the environment.",
    ambientSound: "Core Feature: Ambient sound of the streets from the north doors, grounding the adventure in a living world.",
    gardenAndFoyer: "Core Feature: The 2000x2000 feet foyer and garden are expansive areas designed for ease of expansion and exploration.",
    nightSky: "Core Feature: Ultra Black night sky with a vibrant array of stars and a majestic, glowing moon.",
    lighting: "Core Feature: Gentle Glow lighting that adapts to the time of day, creating a warm and inviting atmosphere even at night.",
  },
  mechanics: {
    gallopRhythm: "Core Feature: Iconic 1-2-3 gallop rhythm pattern (400ms).",
    gallopName: "Empress Abigay's Gallop",
    secondaryGallopName: "Grassy Swish",
    gallopSound: "galloping thump",
    keyboardLayout: "Core Feature: Primary Keyboard Layout (Cedella Layout).",
    screenReaderFirst: "Core Feature: Screen-Reader First Approach (Prioritized as a core priority).",
    glassBarrierTip: "Core Tip: An ability to effortlessly go around the glass barrier of an upper foyer.",
  },
  developerComments: {
    dream: "Is a game what I make as a game what I dreamed to play!",
    role: "I am Aaron Johnson (nickname: 'Fairy-Rider'), a core developer, and a core artist!",
    status: "Masterpiece Finalized & Hardened: Abigay stands at her ultimate scale of 10 feet tall (including tiara). All core features, including her iconic larger head and 4-inch heart gem, are now hardened and centralized within the Primary_Characters directory for maximum performance.",
    isMasterpieceHardened: true,
    gameDescription: "Poodle Ride Adventure is an immersive, accessible adventure where you, the Fairy-Rider, ride Abigay Rose Kone, a massive white poodle standing 6 feet at the shoulder with her iconic larger head perched on top of her neck reaching 9 feet. This masterpiece is officially Babylon-free, using vintage 3D craftsmanship for maximum efficiency and a high-quality experience."
  }
};

export const ABIGAY_DESCRIPTION = POODLE_CORE.identity.description + " " + POODLE_CORE.design.appearance;

export const GAME_CORE_FEATURES = {
  notifications: {
    barkToggle: "Core Feature: Pressing 1 to toggle a notification for 'The poodle barks elegantly' (Off by default).",
    directionToggle: "Core Feature: Pressing 4 to truncate direction notifications (On by default).",
    jumpNotifications: "Core Feature: Jump Notifications (Experimental Feature still in the works for the future...)",
  },
  controls: {
    barkS: "Poodle's elegant bark: Always available with an 'S' key. Press for single bark, hold for gallop pattern.",
    leanL: "Pressing 'L' for leaning forward or go back to an upright position.",
    graspC: "Pressing 'C' to grasp her collar, or a default grasping technique.",
    loveH: "Pressing 'H' to confirm there's love.",
    petP: "Pressing 'P' to pet a poodle.",
    statusShiftM: "Pressing 'Shift-M' to check system status.",
  },
  physics: {
    runningJump: "Core Feature: Iconic running jump refined to stick with her gallop for precision, reducing sound bloat and ensuring a smooth, rhythmic experience.",
    gallopPhysics: "Core Feature: Physics-based gallop that responds to terrain, providing a realistic feel of weight and momentum.",
  }
};
