import React from 'react';
import { RegularDarkMenuBarGeneral } from '../Regular/General';

/**
 * System/Components/Menu_Bars/Crafted/Dark/General/index.tsx
 * Dark theme menu bar router / container.
 */

export interface DarkMenuBarProps {
  children?: React.ReactNode;
}

export const DarkMenuBarGeneral: React.FC<DarkMenuBarProps> = ({ children }) => {
  return <RegularDarkMenuBarGeneral>{children}</RegularDarkMenuBarGeneral>;
};
