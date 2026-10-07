/**
 * 2-D Animation and Rendering Registry for the Central Glass and Brass Barrier
 */
export const CentralGlass2DAnimationsRegistry = {
  id: 'Central_Glass_2D_Animations',
  renderMode: '2D_Canvas',
  lineThickness: 2, // 2-pixel precise stroke for details
  drawMethod: 'strokeRectAndFade',
  effects: {
    transparency: 0.65, // Elegant semi-transparent glass rendering
    brassStrokeStyle: '#ffd700', // Metallic Gold / Brass frame
    glassFillStyle: 'rgba(224, 247, 250, 0.2)', // Light turquoise-blue shine
  }
};

export default CentralGlass2DAnimationsRegistry;
