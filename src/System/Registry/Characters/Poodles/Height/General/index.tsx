
/**
 * Poodle Height Registry System
 */
export interface HeightMetadata {
  shoulder: number; // feet
  head: number; // feet (head height from ground)
  total: number; // feet (including tiara/accessories)
}

export const POODLE_HEIGHT_MAP: Record<string, HeightMetadata> = {
  'Abigay Rose Kone': {
    shoulder: 6,
    head: 9,
    total: 10
  },
  'Anninne-Amelia Rose Julisus': {
    shoulder: 9.5,
    head: 12, // Estimated based on shoulder
    total: 13 // Estimated including tiara
  },
  'Abigail Marigold Kenyatta': {
    shoulder: 6, // Standardized for allies
    head: 9,
    total: 10
  },
  'Dymond Daisy Qin-Reynolds': {
    shoulder: 5.416, // 5 feet 5 inches
    head: 8.5,
    total: 9
  },
  'Olga-Olivia': {
    shoulder: 3.5,
    head: 4.2,
    total: 4.5
  },
  'Chloe Joseph Gray-Michaels': {
    shoulder: 3.2,
    head: 3.8,
    total: 4.2
  }
};
