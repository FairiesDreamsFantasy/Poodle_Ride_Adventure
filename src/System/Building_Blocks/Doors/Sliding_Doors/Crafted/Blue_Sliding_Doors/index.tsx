import { BLUE_DOOR_DESCRIPTION } from './Description';
import { BLUE_DOOR_DIMENSIONS } from './Description/Dimensions';
import { renderBlueSlidingDoors } from './Animations';
import { BlueDoorSoundSynthesizer } from './Sound/Synthesizer';

export const BlueSlidingDoors = {
  description: BLUE_DOOR_DESCRIPTION,
  dimensions: BLUE_DOOR_DIMENSIONS,
  render: renderBlueSlidingDoors,
  sound: BlueDoorSoundSynthesizer,
  
  totalWidthFeet: BLUE_DOOR_DIMENSIONS.totalWidthFeet,
  heightFeet: BLUE_DOOR_DIMENSIONS.heightFeet,
  panelWidthFeet: BLUE_DOOR_DIMENSIONS.panelWidthFeet,
  primaryColor: BLUE_DOOR_DIMENSIONS.colors.door,
  accentColor: BLUE_DOOR_DIMENSIONS.colors.accent,
  playOpenSound: BlueDoorSoundSynthesizer.playOpen,
  playCloseSound: BlueDoorSoundSynthesizer.playClose,
};

export default BlueSlidingDoors;
