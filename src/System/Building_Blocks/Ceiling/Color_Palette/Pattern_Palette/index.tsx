export interface CeilingPattern {
  id: string;
  name: string;
  type: 'coffered' | 'vaulted' | 'geometric' | 'beams' | 'smooth' | 'stars' | 'tudor';
  description: string;
  repeatInterval: number; // feet
  gridLineColor: string;
}

export const CEILING_PATTERNS: CeilingPattern[] = [
  {
    id: 'pattern_smooth_plaster',
    name: 'Smooth Royal Plaster',
    type: 'smooth',
    description: 'A clean, high-contrast flat plaster finish that disperses light evenly.',
    repeatInterval: 0,
    gridLineColor: 'rgba(255, 255, 255, 0.1)'
  },
  {
    id: 'pattern_coffered_rose',
    name: 'Rose Gold Coffered Panels',
    type: 'coffered',
    description: 'An elegant grid of recessed square panels trimmed with subtle rose gold lining.',
    repeatInterval: 10,
    gridLineColor: 'rgba(184, 134, 11, 0.4)'
  },
  {
    id: 'pattern_vaulted_beams',
    name: 'Exposed Cedar Beams',
    type: 'beams',
    description: 'Heavy rustic cedar structural beams running longitudinally across the space.',
    repeatInterval: 12,
    gridLineColor: 'rgba(139, 69, 19, 0.5)'
  },
  {
    id: 'pattern_celestial_night',
    name: 'Celestial Star Map',
    type: 'stars',
    description: 'A deep twilight canvas adorned with glowing star maps and golden constellations.',
    repeatInterval: 20,
    gridLineColor: 'rgba(255, 255, 255, 0.3)'
  },
  {
    id: 'pattern_tudor_lattice',
    name: 'Tudor Diamond Lattice',
    type: 'tudor',
    description: 'Traditional ornamental cross-beams creating a beautiful diamond plaster grid.',
    repeatInterval: 8,
    gridLineColor: 'rgba(40, 40, 40, 0.6)'
  }
];
