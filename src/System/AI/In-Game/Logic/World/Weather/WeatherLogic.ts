export type WeatherCondition = 'Clear' | 'Rain' | 'Snow' | 'Fog' | 'Cloudy';

export interface WeatherState {
  condition: WeatherCondition;
  intensity: number; // 0.0 to 1.0
  temperature: number; // in Fahrenheit
}

export const INITIAL_WEATHER: WeatherState = {
  condition: 'Clear',
  intensity: 0,
  temperature: 72,
};
