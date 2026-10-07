import { ReverbProfile } from "../ReverbProfile";

export const CAVE_REVERB: ReverbProfile = {
  name: "Cave",
  delayTime: 0.25,
  gain: 0.6,
  feedback: 0.5,
  filterFreq: 800,
  disableInternalEcho: true
};

export const CITIES_REVERB: ReverbProfile = {
  name: "Cities",
  delayTime: 0.12,
  gain: 0.3,
  feedback: 0.2,
  filterFreq: 1500
};
