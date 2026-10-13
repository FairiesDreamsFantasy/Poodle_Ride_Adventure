import React, { useEffect, useRef } from 'react';

/**
 * System/Sound/TTS/ScreenReader.tsx
 * Centralized screen reader announcement component.
 */

export interface ScreenReaderProps {
  message: string;
}

export const ScreenReader: React.FC<ScreenReaderProps> = ({ message }) => {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      // Announce message to screen reader
      messageRef.current.textContent = message;
    }
  }, [message]);

  return (
    <div 
      ref={messageRef} 
      className="sr-only" 
      aria-live="polite"
    >
      {message}
    </div>
  );
};
