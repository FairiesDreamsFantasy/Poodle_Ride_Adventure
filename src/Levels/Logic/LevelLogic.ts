import { create } from 'zustand';

interface LevelState {
  currentLevel: number;
  advanceLevel: () => void;
  setLevel: (level: number) => void;
}

export const useLevelLogic = create<LevelState>((set) => ({
  currentLevel: 0,
  advanceLevel: () => set((state) => ({ currentLevel: state.currentLevel + 1 })),
  setLevel: (level) => set({ currentLevel: level }),
}));
