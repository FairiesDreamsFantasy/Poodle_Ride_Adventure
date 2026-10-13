import { StreetsAmbience } from './Streets';
import { GardenAmbience } from './Garden';
import { FarmAmbience } from './Farm';
import { WindChimesRegistry } from './Wind_Chimes';

export * from './General';

export const AmbienceRegistry = {
  Streets: StreetsAmbience,
  Garden: GardenAmbience,
  Farm: FarmAmbience,
  WindChimes: WindChimesRegistry,
};
