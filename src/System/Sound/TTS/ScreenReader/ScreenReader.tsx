import React, { useEffect, useRef } from 'react';

export interface ScreenReaderProps {
  message: string;
  priority?: 'polite' | 'assertive';
}

/**
 * System/Sound/TTS/ScreenReader/ScreenReader.tsx
 * Centralized screen reader announcement ARIA component.
 */
export const ScreenReader: React.FC<ScreenReaderProps> = ({ message, priority = 'polite' }) => {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.textContent = message;
    }
  }, [message]);

  return (
    <div 
      ref={messageRef} 
      className="sr-only" 
      aria-live={priority}
      aria-atomic="true"
    >
      {message}
    </div>
  );
};
