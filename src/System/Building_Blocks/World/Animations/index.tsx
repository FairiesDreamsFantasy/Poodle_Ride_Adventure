import { calculateCityAnimation, CityAnimationState } from '../Cities/Animations';
import { calculateClimateAnimation, ClimateAnimationState } from '../Climate/Animations';
import { calculateClockAnimation, ClockAnimationState } from '../Clock/Animations';
import { calculateEnvironmentAnimation, EnvironmentAnimationState } from '../Environments/Animations';
import { calculateNatureAnimation, NatureAnimationState } from '../Nature/Animations';
import { calculatePlaceAnimation, PlaceAnimationState } from '../Places/Animations';
import { calculateSkyAnimation, SkyAnimationState } from '../Skies/Animations';
import { calculateWeatherAnimation, WeatherAnimationState } from '../Weather/Animations';

export interface ComprehensiveWorldAnimationState {
  city: CityAnimationState;
  climate: ClimateAnimationState;
  clock: ClockAnimationState;
  environment: EnvironmentAnimationState;
  nature: NatureAnimationState;
  place: PlaceAnimationState;
  sky: SkyAnimationState;
  weather: WeatherAnimationState;
}

/**
 * High-performance unified world animation state calculation powerhouse.
 */
export function calculateMasterWorldAnimation(timestamp: number, date: Date = new Date()): ComprehensiveWorldAnimationState {
  return {
    city: calculateCityAnimation(timestamp),
    climate: calculateClimateAnimation(timestamp),
    clock: calculateClockAnimation(date),
    environment: calculateEnvironmentAnimation(timestamp),
    nature: calculateNatureAnimation(timestamp),
    place: calculatePlaceAnimation(timestamp),
    sky: calculateSkyAnimation(timestamp),
    weather: calculateWeatherAnimation(timestamp)
  };
}
