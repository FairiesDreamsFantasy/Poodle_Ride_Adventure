export interface Opponent {
  name: string;
  age: 'Boy' | 'Girl' | 'Adult';
  outfit: string;
  poodleColor: string;
  isBabylonFree: boolean;
}

const JAPANESE_GIRL_NAMES = [
  "Aiko", "Akari", "Asahi", "Emi", "Hana", "Haru", "Hina", "Ichika", "Kanon", "Koharu",
  "Mio", "Misaki", "Nanami", "Noa", "Riko", "Rin", "Sakura", "Sora", "Tsumugi", "Yua",
  "Yui", "Yuna"
];

const POODLE_COLORS = [
  "Pink", "Yellow", "Blue", "Orange", "Red-Orange", "Yellow-Green", "Yellow-Orange", "Violet",
  "Dark-Blue", "Dark-Green", "White", "Gray", "Black", "Brown", "Lavender", "Rose", "Gold",
  "Silver", "Bronze", "Emerald", "Jade", "Red-Violet", "Blue-Violet", "Blond", "Tan", "Peach", "Khaki"
];

export const generateOpponents = (): Opponent[] => {
  const opponents: Opponent[] = [];

  // 22 Boys
  for (let i = 1; i <= 22; i++) {
    opponents.push({
      name: `Boy ${i}`,
      age: 'Boy',
      outfit: 'Green onesie',
      poodleColor: POODLE_COLORS[i % POODLE_COLORS.length],
      isBabylonFree: true
    });
  }

  // 22 Girls
  for (let i = 0; i < 22; i++) {
    opponents.push({
      name: JAPANESE_GIRL_NAMES[i],
      age: 'Girl',
      outfit: 'Pink onesie',
      poodleColor: POODLE_COLORS[(i + 5) % POODLE_COLORS.length],
      isBabylonFree: true
    });
  }

  // Older Opponents
  opponents.push({
    name: "Xavier",
    age: 'Adult',
    outfit: 'Navy onesie',
    poodleColor: 'White',
    isBabylonFree: true
  });

  opponents.push({
    name: "Jela",
    age: 'Adult',
    outfit: 'Green dress, red apron, green onesie',
    poodleColor: 'White',
    isBabylonFree: true
  });

  // Spotted variations (88 count)
  for (let i = 1; i <= 88; i++) {
    opponents.push({
      name: `Spotted Rider ${i}`,
      age: Math.random() > 0.5 ? 'Boy' : 'Girl',
      outfit: 'Onesie',
      poodleColor: `Spotted ${POODLE_COLORS[i % POODLE_COLORS.length]}`,
      isBabylonFree: true
    });
  }

  return opponents;
};
