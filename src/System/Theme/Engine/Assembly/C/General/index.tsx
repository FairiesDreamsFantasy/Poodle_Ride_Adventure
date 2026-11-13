/**
 * System/Theme/Engine/Assembly/C/General/index.tsx
 * Scientific Theme Engine Assembly C Core Module
 * Packed 32-bit ARGB/RGBA CSS color bit manipulation, Q16.16 fixed-point
 * token blending, and hardware LUT sRGB linearization.
 */

export class ThemeEngineAssemblyCColor {
  /** Packs RGB (0-255) and alpha (0-255) into unsigned 32-bit RGBA integer */
  public packColorRGBA(r: number, g: number, b: number, a: number = 255): number {
    return (((r & 0xff) << 24) | ((g & 0xff) << 16) | ((b & 0xff) << 8) | (a & 0xff)) >>> 0;
  }

  public unpackHexColor(hex: string): { r: number; g: number; b: number } {
    const clean = hex.replace('#', '').trim();
    if (clean.length === 3) {
      return {
        r: parseInt(clean[0] + clean[0], 16) || 0,
        g: parseInt(clean[1] + clean[1], 16) || 0,
        b: parseInt(clean[2] + clean[2], 16) || 0,
      };
    }
    const num = parseInt(clean.slice(0, 6), 16) || 0;
    return { r: (num >> 16) & 0xff, g: (num >> 8) & 0xff, b: num & 0xff };
  }

  /** IEC 61966-2-1 exact sRGB channel transfer to linear light intensity */
  public srgbChannelToLinear(channel8: number): number {
    const c = Math.max(0, Math.min(255, channel8)) / 255.0;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }

  public linearToSrgbChannel(linear: number): number {
    const c = Math.max(0, Math.min(1, linear));
    const enc = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    return Math.round(enc * 255);
  }

  /** Q16.16 fixed-point interpolation between two packed RGBA values */
  public lerpRGBAFixed(rgbaA: number, rgbaB: number, tNorm: number): number {
    const tFixed = Math.max(0, Math.min(65536, Math.round(tNorm * 65536)));
    const invFixed = 65536 - tFixed;
    const ch = (shift: number) => {
      const a = (rgbaA >>> shift) & 0xff;
      const b = (rgbaB >>> shift) & 0xff;
      return (a * invFixed + b * tFixed + 32768) >> 16;
    };
    return this.packColorRGBA(ch(24), ch(16), ch(8), ch(0));
  }
}

export const ThemeEngineAssemblyCColorInstance = new ThemeEngineAssemblyCColor();
