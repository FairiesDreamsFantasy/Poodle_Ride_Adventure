import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface GameContextType {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  isGameOver: boolean;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  speak: (text: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const synth = window.speechSynthesis;

  const speak = (text: string) => {
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  return (
    <GameContext.Provider value={{ score, setScore, isGameOver, setIsGameOver, speak }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};
