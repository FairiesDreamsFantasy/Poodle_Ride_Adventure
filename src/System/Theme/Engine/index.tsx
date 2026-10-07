import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * System/Theme/Engine/index.tsx
 * Ultra-scientific theme management engine with mathematical calculations
 * for layout ratios, contrast compliance, and theme persistence.
 */

export type ThemeType = 'Dark' | 'Cozy' | 'Comfortable';
export type SubThemeType = 'Regular' | 'Default';

export interface ThemeConfig {
  theme: ThemeType;
  subTheme: SubThemeType;
  scaleRatio: number; // Mathematical ratio (e.g. 1.25)
  contrastRatio: number;
  isMenuBarFloating: boolean;
  isHudTransparent: boolean;
  isMenuOpen: boolean;
}

interface ThemeContextType {
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeType, subTheme?: SubThemeType) => void;
  toggleMenu: () => void;
  setIsMenuOpen: (open: boolean) => void;
  calculateLayoutMath: (containerWidth: number) => { padding: number; innerGap: number; fontSize: number };
}

const DEFAULT_THEME_CONFIG: ThemeConfig = {
  theme: 'Dark',
  subTheme: 'Regular',
  scaleRatio: 1.25,
  contrastRatio: 4.5,
  isMenuBarFloating: false,
  isHudTransparent: false,
  isMenuOpen: false,
};

const ThemeContext = createContext<ThemeContextType>({
  themeConfig: DEFAULT_THEME_CONFIG,
  setTheme: () => {},
  toggleMenu: () => {},
  setIsMenuOpen: () => {},
  calculateLayoutMath: () => ({ padding: 16, innerGap: 16, fontSize: 16 }),
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(() => {
    try {
      const saved = localStorage.getItem('poodle_ride_theme');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_THEME_CONFIG, ...parsed, isMenuOpen: false };
      }
    } catch {
      // Fallback to default on error
    }
    return DEFAULT_THEME_CONFIG;
  });

  const setTheme = useCallback((theme: ThemeType, subTheme: SubThemeType = 'Regular') => {
    setThemeConfig((prev) => {
      const updated: ThemeConfig = {
        ...prev,
        theme,
        subTheme,
        isMenuBarFloating: theme === 'Cozy' || theme === 'Comfortable',
        isHudTransparent: theme === 'Comfortable',
      };
      try {
        localStorage.setItem('poodle_ride_theme', JSON.stringify({ theme, subTheme }));
      } catch {
        // LocalStorage save silent error handling
      }
      return updated;
    });
  }, []);

  const toggleMenu = useCallback(() => {
    setThemeConfig((prev) => ({ ...prev, isMenuOpen: !prev.isMenuOpen }));
  }, []);

  const setIsMenuOpen = useCallback((open: boolean) => {
    setThemeConfig((prev) => ({ ...prev, isMenuOpen: open }));
  }, []);

  // Scientific layout calculation function based on container width
  const calculateLayoutMath = useCallback((containerWidth: number) => {
    const basePadding = Math.max(16, Math.floor(containerWidth * 0.02));
    const innerGap = Math.floor(basePadding * 0.75);
    const fontSize = containerWidth > 1200 ? 18 : containerWidth > 800 ? 16 : 14;
    return { padding: basePadding, innerGap, fontSize };
  }, []);

  // Keyboard shortcut Alt+Shift+F handler for menu bar toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && (e.key === 'F' || e.key === 'f')) {
        e.preventDefault();
        toggleMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleMenu]);

  return (
    <ThemeContext.Provider
      value={{
        themeConfig,
        setTheme,
        toggleMenu,
        setIsMenuOpen,
        calculateLayoutMath,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeEngine = () => useContext(ThemeContext);
