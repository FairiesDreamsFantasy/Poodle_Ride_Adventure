/**
 * Pixelations Rendering Configuration for Central Glass and Brass Barrier
 * Useful for retro styled rendering or low-end rendering fallbacks.
 */
export const CentralGlassPixelationsRegistry = {
  id: 'Central_Glass_Pixelations',
  enabled: true,
  pixelSize: 4, // 4px retro texture blocks for light refractions
  refractionGrid: {
    columns: 16,
    rows: 4,
    flickerSpeed: 0.05, // Subtle shimmer speed
  },
};

export default CentralGlassPixelationsRegistry;
