import { CityPart, CITY_PARTS } from '../City_Parts';

export interface City {
  name: string;
  parts: CityPart[];
  isBabylonFree: boolean;
}

export const CITIES: City[] = [
  {
    name: "New Kinxton City",
    parts: CITY_PARTS,
    isBabylonFree: true
  },
  {
    name: "Ghana City",
    parts: CITY_PARTS,
    isBabylonFree: true
  }
];
