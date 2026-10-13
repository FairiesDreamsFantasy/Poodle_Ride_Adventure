import React from 'react';
import { GeneralMainContent } from './General';

interface MainContainerProps {
  children: React.ReactNode;
}

export function PlayAreaMainContainer({ children, gameContainerRef }: { children: React.ReactNode, gameContainerRef?: React.RefObject<HTMLElement> }) {
  return (
    <main 
      id="play-area-container"
      ref={gameContainerRef as any}
      role="application"
      className="relative focus:outline-none" 
      aria-label="Poodle Ride Adventure Play Area. Use arrow keys to move, space to jump."
      tabIndex={-1}
    >
      <GeneralMainContent />
      {children}
    </main>
  );
}
