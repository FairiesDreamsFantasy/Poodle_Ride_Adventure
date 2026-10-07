import React from 'react';
import { GeneralHeader } from './General';
import { Home } from 'lucide-react';

export function PlayAreaHeader({ 
  setGameState,
  onGoToLanding 
}: { 
  setGameState: (updater: (prev: any) => any) => void;
  onGoToLanding?: () => void;
}) {
  return (
    <header id="play-area-header" className="flex justify-between items-center border-b border-white/10 pb-6">
      <GeneralHeader setGameState={setGameState} onGoToLanding={onGoToLanding} />

    </header>
  );
}
