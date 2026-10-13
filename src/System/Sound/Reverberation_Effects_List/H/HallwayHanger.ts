import { ReverbProfile } from "../ReverbProfile";

export const HALLWAY_REVERB: ReverbProfile = {
  name: "Hallway",
  delayTime: 0.15,
  gain: 0.45,
  feedback: 0.35,
  filterFreq: 1200,
  disableInternalEcho: true
};

export const HANGER_REVERB: ReverbProfile = {
  name: "Hanger",
  delayTime: 0.4,
  gain: 0.5,
  feedback: 0.45,
  filterFreq: 1500,
  disableInternalEcho: true
};
