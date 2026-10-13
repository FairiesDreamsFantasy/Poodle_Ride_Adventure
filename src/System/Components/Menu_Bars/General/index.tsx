import React from 'react';
import { CraftedMenuBar } from '../Crafted';

/**
 * System/Components/Menu_Bars/General/index.tsx
 * Root Menu_Bars General component.
 */

export interface MenuBarsProps {
  children?: React.ReactNode;
  onOpenLandingPage?: () => void;
}

export const MenuBarsGeneral: React.FC<MenuBarsProps> = ({ children, onOpenLandingPage }) => {
  return <CraftedMenuBar onOpenLandingPage={onOpenLandingPage}>{children}</CraftedMenuBar>;
};
