/**
 * Glass Decorative Rhino Picture Registry
 * Located facing south between 0 to 20 feet markers from the west wall of Sky Foyer.
 */
export const GlassDecorativeRhinoPictureRegistry = {
  id: 'Glass_Decorative_Rhino_Picture',
  title: 'Etched Glass Rhino Portrait',
  description: 'A beautiful decorative picture of a black rhinoceros etched into a heavy frosted glass pane, visible when viewing from the north wall, facing south between 0 to 20 feet markers from the west wall of Sky Foyer.',
  viewConstraints: {
    fromWall: 'North',
    facingDirection: 'South',
    markersFeet: {
      min: 0,
      max: 20,
      refWall: 'West'
    }
  },
  artStyle: 'Frosted Glass Etching',
};

export default GlassDecorativeRhinoPictureRegistry;
