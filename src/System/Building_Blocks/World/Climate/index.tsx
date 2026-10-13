export * from './General';
export * from './Animations';

export interface ClimateZone {
  id: string;
  name: string;
  temp: number;
  humidity: number;
}

export const CLIMATE_ZONES: ClimateZone[] = [
  { id: 'tropical', name: 'Tropical Island', temp: 28, humidity: 80 },
  { id: 'temperate', name: 'Temperate Woodland', temp: 20, humidity: 55 },
  { id: 'highland', name: 'Mountain Ridge', temp: 12, humidity: 40 }
];
