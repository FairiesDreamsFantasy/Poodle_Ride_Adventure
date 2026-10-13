import { RAINBOW_GLASS_DOOR_DESCRIPTION } from './Description';
import { RAINBOW_GLASS_DOOR_DIMENSIONS } from './Description/Dimensions';
import { renderRainbowSlidingDoors } from './Animations';
import { RainbowGlassSoundSynthesizer } from './Sound/Synthesizer';

export const RainbowGlassSlidingDoors = {
  description: RAINBOW_GLASS_DOOR_DESCRIPTION,
  dimensions: RAINBOW_GLASS_DOOR_DIMENSIONS,
  render: renderRainbowSlidingDoors,
  sound: RainbowGlassSoundSynthesizer,
  
  totalWidthFeet: RAINBOW_GLASS_DOOR_DIMENSIONS.totalWidthFeet,
  heightFeet: RAINBOW_GLASS_DOOR_DIMENSIONS.heightFeet,
  panelWidthFeet: RAINBOW_GLASS_DOOR_DIMENSIONS.panelWidthFeet,
  playOpenSound: RainbowGlassSoundSynthesizer.playOpen,
  playCloseSound: RainbowGlassSoundSynthesizer.playClose,
};

export default RainbowGlassSlidingDoors;
