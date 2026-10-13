export const BABYLON_FALLEN_CONSTANTS = {
  NAME: "Babylon Is Finally Fallen",
  WIDTH: 200,
  HEIGHT: 250,
  PLACEMENT: {
    X_MIN: 800,
    X_MAX: 1000,
    Y_MIN: 100,
    Y_MAX: 350,
  },
  DOOR: {
    WIDTH: 20,
    HEIGHT: 18,
    EXTERIOR: {
      X: 800,
      Y_MIN: 215,
      Y_MAX: 235
    },
    INTERIOR: {
      X: 1,
      Y_MIN: 105,
      Y_MAX: 115
    }
  },
  RUG: {
    REDUCTION: 0.1, // 10% smaller than room
  },
  DESCRIPTIONS: {
    WALLS: {
      INTERIOR: "The room has an African theme with wall paintings of African worlds. The design is 'Babylon-Free'.",
      EXTERIOR: "The exterior walls maintain the default Foyer design.",
    },
    FLOOR: "The flooring is ceramic tile designed like African vegetation with a golden hue. A rug with African vegetation patterns covers most of the center area.",
    LIGHTING: "The lights have a gentle glow, enhancing the serene African atmosphere."
  }
};
