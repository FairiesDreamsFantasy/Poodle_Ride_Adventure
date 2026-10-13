// Crafted Ceiling Building Block
export interface CraftedCeilingDefinition {
  id: string;
  name: string;
  type: 'Skylight_Glass' | 'High_Beamed_Wood' | 'Open_Sky_Perimeter';
  height: number;
}

export const CRAFTED_CEILING: Record<string, CraftedCeilingDefinition> = {
  FoyerHighSkylight: {
    id: 'foyer_high_skylight',
    name: 'Foyer High Octagonal Skylight Ceiling',
    type: 'Skylight_Glass',
    height: 80,
  },
  MeditationBeamedCeiling: {
    id: 'meditation_beamed_ceiling',
    name: 'Meditation Hall Exposed Timber Beams',
    type: 'High_Beamed_Wood',
    height: 40,
  },
};

export default CRAFTED_CEILING;
