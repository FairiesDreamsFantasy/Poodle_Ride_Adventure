/**
 * Polygons Registry for the Central Glass and Brass Barrier
 * Defines vertex coordinates and face structures for 3D modeling and rendering.
 */
export const CentralGlassPolygonsRegistry = {
  id: 'Central_Glass_Polygons',
  faces: [
    {
      name: 'North_Face_Main',
      vertices: [
        { x: -728, y: 4, z: -728 },
        { x: 728, y: 4, z: -728 },
        { x: 728, y: 0, z: -728 },
        { x: -728, y: 0, z: -728 },
      ],
      color: 'rgba(224, 247, 250, 0.35)',
    },
    {
      name: 'North_Face_Handrail',
      vertices: [
        { x: -728, y: 4, z: -728 },
        { x: 728, y: 4, z: -728 },
        { x: 728, y: 4.1, z: -726 },
        { x: -728, y: 4.1, z: -726 },
      ],
      color: '#ffd700', // Polished brass top cap
    }
  ],
};

export default CentralGlassPolygonsRegistry;
