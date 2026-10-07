/**
 * 3-D Perspective Projection Animation Registry for the Central Glass and Brass Barrier
 */
export const CentralGlass3DAnimationsRegistry = {
  id: 'Central_Glass_3D_Animations',
  projectionMode: 'SphericalPerspective',
  zDepthScaling: true,
  depthFadeFactor: 0.125,
  shadingModel: 'FlatWithAmbientHighlights',
  specularReflection: {
    intensity: 0.85,
    mirrorShine: true, // Matching the warm and dry nose mirror shine aesthetic
    shininessExponent: 32,
  }
};

export default CentralGlass3DAnimationsRegistry;
