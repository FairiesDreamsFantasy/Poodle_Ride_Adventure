import { ReverbProfile } from "../ReverbProfile";

export const GENERIC_REVERB: ReverbProfile = {
  name: "Generic",
  delayTime: 0.1,
  gain: 0.3,
  feedback: 0.2,
  filterFreq: 1000,
  disableInternalEcho: true
};

export const NO_REVERB: ReverbProfile = {
  name: "No Effect",
  delayTime: 0,
  gain: 0,
  feedback: 0,
  filterFreq: 20000
};
