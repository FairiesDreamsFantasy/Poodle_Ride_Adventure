import { SIMULATED_GARDEN_DOOR_DESCRIPTION } from './Description';
import { SIMULATED_GARDEN_DOOR_DIMENSIONS } from './Description/Dimensions';
import { renderSimulatedGardenDoors } from './Animations';
import { SimulatedGardenSoundSynthesizer } from './Sound/Synthesizer';

export const SimulatedGardenSlidingDoors = {
  description: SIMULATED_GARDEN_DOOR_DESCRIPTION,
  dimensions: SIMULATED_GARDEN_DOOR_DIMENSIONS,
  render: renderSimulatedGardenDoors,
  sound: SimulatedGardenSoundSynthesizer,
  
  totalWidthFeet: SIMULATED_GARDEN_DOOR_DIMENSIONS.totalWidthFeet,
  heightFeet: SIMULATED_GARDEN_DOOR_DIMENSIONS.heightFeet,
  panelWidthFeet: SIMULATED_GARDEN_DOOR_DIMENSIONS.panelWidthFeet,
  playOpenSound: SimulatedGardenSoundSynthesizer.playOpen,
  playCloseSound: SimulatedGardenSoundSynthesizer.playClose,
};

export default SimulatedGardenSlidingDoors;
