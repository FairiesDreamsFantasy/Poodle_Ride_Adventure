/**
 * System/Theme/Engine/Assembly/CSharp/General/index.tsx
 * Scientific Theme Engine Assembly CSharp Core Module
 * Reactive theme policy validation, WCAG AA/AAA compliance assertions,
 * and Storybook wellness Night-Mode schedule evaluator (16:00 - 03:00).
 */

export interface ContrastComplianceReport {
  ratio: number;
  passesAA: boolean;
  passesAALarge: boolean;
  passesAAA: boolean;
}

export class ThemeEngineAssemblyCSharpPolicy {
  public evaluateWCAGCompliance(contrastRatio: number): ContrastComplianceReport {
    return {
      ratio: Number(contrastRatio.toFixed(3)),
      passesAA: contrastRatio >= 4.5,
      passesAALarge: contrastRatio >= 3.0,
      passesAAA: contrastRatio >= 7.0,
    };
  }

  /** Fixed artistic wellness schedule: Night Mode active 16:00 <= hour < 24 or 0 <= hour < 3 */
  public isWellnessNightWindow(hour24: number): boolean {
    const h = ((Math.floor(hour24) % 24) + 24) % 24;
    return h >= 16 || h < 3;
  }

  public computeBlueLightAttenuationFactor(hour24: number): number {
    if (!this.isWellnessNightWindow(hour24)) return 1.0;
    const h = ((Math.floor(hour24) % 24) + 24) % 24;
    // Deepest warm shift at midnight (00:00)
    if (h >= 21 || h < 2) return 0.72;
    return 0.84;
  }
}

export const ThemeEngineAssemblyCSharpInstance = new ThemeEngineAssemblyCSharpPolicy();
