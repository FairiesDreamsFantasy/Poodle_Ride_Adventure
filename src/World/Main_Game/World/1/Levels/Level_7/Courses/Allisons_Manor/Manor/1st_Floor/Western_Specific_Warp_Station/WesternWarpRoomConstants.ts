/**
 * Constants for the Western Warp Room in Allison's Manor.
 * Part of the 1st Floor, Level 1.
 */
export const WESTERN_WARP_CONSTANTS = {
  NAME: "Western Warp Room",
  WIDTH: 250,
  HEIGHT: 185,
  
  // Door: x2 to x14 at y185 (North Wall)
  DOOR: {
    X_MIN: 2,
    X_MAX: 14,
    Y: 185,
    WIDTH: 13,
    HEIGHT: 20,
    DEPTH: 13,
    FRAME_WIDTH: 1 // 12 inches = 1 foot
  },

  // Rug: Center (125, 125)
  RUG: {
    X: 125,
    Y: 125,
    RADIUS: 60, // Arbitrary visual size, centered
    MATERIAL: "Feral cowhide with pig skin base",
    COLOR: "#5D4037" // Brown
  },

  // Rocking Pony
  ROCKING_PONY: {
    X: 125,
    Y: 125, // Centered near the rug
    LENGTH: 4.11, // excluding head/tail
    PEDESTAL: {
      WIDTH: 3.5,
      LENGTH: 5
    },
    SHOULDER_HEIGHT: 5, // Optimized for adults
    ORIENTATION: "WEST"
  },

  // Decorative Fence: y160, stretches from x0 to x230
  FENCE: {
    Y: 160,
    X_MAX: 230,
    THICKNESS: 1 // 12 inches
  },

  // Tables
  TABLE_WEST: {
    X: 5,
    Y: 157,
    WIDTH: 10,
    HEIGHT: 5
  },

  // Interactive Picture: Pablo's Pony Ride Field
  // East Wall (x250)
  PICTURE: {
    X: 250,
    Y_MIN: 2, // 2 feet from Southeast corner (y0)
    Y_MAX: 17, // Height 15ft
    WIDTH: 1, 
    HEIGHT: 15,
    REAL_WIDTH: 16 
  },

  MIRROR: {
    X: 250,
    Y_MIN: 0.25, 
    Y_MAX: 1.75, 
    WIDTH: 1,
    HEIGHT: 15
  },

  SEPARATOR: {
    Y_MIN: 20,
    Y_MAX: 21,
    X_MIN: 245, // 5 feet from East wall (x250)
    X_MAX: 250,
    THICKNESS: 1 // 12 inches
  }
};

export const WESTERN_WARP_DESCRIPTIONS = {
  START: "You enter the Western Warp Room. The air smells of polished wood and aged leather. The walls are painted with a vibrant sunrise over a western farm field. A massive pink rocking pony stands at the center on a thick cowhide rug.",
  SIGN: "Western Warp Room. A gold inscription on a dark-blue background features a parade of farm animals and a farmer riding into the distance.",
  RUG: "A large circular brown rug made of feral cowhide. It feels soft and genuine underfoot.",
  PONY: "A large pink rocking pony with a white mane and tail. Its blue eyes sparkle with a cartoonish charm. It sits on sturdy springs attached to a wooden pedestal.",
  WALLS: "The walls depict a continuous farm landscape. To the East, a bright sun rises over a painted fence and grass fields under a deep blue sky.",
  DOOR: "A cowboy-themed sliding door with a glass window showing a farm. It feels heavy and well-crafted."
};
