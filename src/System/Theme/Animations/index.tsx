import { Variants } from 'motion/react';

/**
 * System/Theme/Animations/index.tsx
 * Lightweight, modular animation presets for themes and still ad decorations.
 */

export const themeFadeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.25, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    scale: 0.98,
    transition: { duration: 0.15, ease: 'easeIn' }
  }
};

export const floatingMenuVariants: Variants = {
  closed: { y: -60, opacity: 0, pointerEvents: 'none' },
  open: { 
    y: 0, 
    opacity: 1, 
    pointerEvents: 'auto',
    transition: { type: 'spring', stiffness: 300, damping: 25 }
  }
};

export const stillDecorationPulseVariants: Variants = {
  initial: { opacity: 0.85 },
  animate: {
    opacity: [0.85, 1, 0.85],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
  }
};
