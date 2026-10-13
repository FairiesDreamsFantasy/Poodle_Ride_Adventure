export const ALLISONS_GATE_DESCRIPTION = "A grand ornate gate, built with a mix of brass and steel. It is painted red and adorned with yellow flowers, green vines, and brown twigs. It automatically closes and locks once you enter the manor grounds.";

export interface GateState {
  isOpen: boolean;
}

export const initialGateState: GateState = {
  isOpen: false
};
