/**
 * Scientific Visuals Engine Assembly C Direct Pixel Blitting Core Module
 * Direct 32-bit RGBA pixel packing/unpacking, Porter-Duff source-over blending,
 * Rec. 709 integer photometric luminance, and bilinear scanline interpolation.
 */

export interface RGBAChannels {
  r: number;
  g: number;
  b: number;
  a: number;
}

export class VisualsAssemblyCBlitter {
  public packRGBA(r: number, g: number, b: number, a: number = 255): number {
    return (((a & 0xff) << 24) | ((b & 0xff) << 16) | ((g & 0xff) << 8) | (r & 0xff)) >>> 0;
  }

  public unpackRGBA(packed: number): RGBAChannels {
    return {
      r: packed & 0xff,
      g: (packed >>> 8) & 0xff,
      b: (packed >>> 16) & 0xff,
      a: (packed >>> 24) & 0xff,
    };
  }

  /** Integer Porter-Duff source-over compositing without floating-point drift */
  public blendSourceOver(srcPacked: number, dstPacked: number): number {
    const src = this.unpackRGBA(srcPacked);
    if (src.a === 255) return srcPacked >>> 0;
    if (src.a === 0) return dstPacked >>> 0;
    const dst = this.unpackRGBA(dstPacked);
    const invA = 255 - src.a;
    const r = (src.r * src.a + dst.r * invA + 127) >> 8;
    const g = (src.g * src.a + dst.g * invA + 127) >> 8;
    const b = (src.b * src.a + dst.b * invA + 127) >> 8;
    const a = src.a + ((dst.a * invA + 127) >> 8);
    return this.packRGBA(r, g, b, Math.min(255, a));
  }

  /** Rec. 709 fixed-point luminance Y' = (54*R + 183*G + 19*B) >> 8 */
  public computeRec709Luma(packed: number): number {
    const { r, g, b } = this.unpackRGBA(packed);
    return (54 * r + 183 * g + 19 * b) >> 8;
  }

  public bilinearSampleRGBA(
    tl: number,
    tr: number,
    bl: number,
    br: number,
    fx: number,
    fy: number
  ): number {
    const ux = Math.max(0, Math.min(1, fx));
    const uy = Math.max(0, Math.min(1, fy));
    const c00 = this.unpackRGBA(tl);
    const c10 = this.unpackRGBA(tr);
    const c01 = this.unpackRGBA(bl);
    const c11 = this.unpackRGBA(br);

    const interp = (v00: number, v10: number, v01: number, v11: number) => {
      const top = v00 + (v10 - v00) * ux;
      const bot = v01 + (v11 - v01) * ux;
      return Math.round(top + (bot - top) * uy);
    };

    return this.packRGBA(
      interp(c00.r, c10.r, c01.r, c11.r),
      interp(c00.g, c10.g, c01.g, c11.g),
      interp(c00.b, c10.b, c01.b, c11.b),
      interp(c00.a, c10.a, c01.a, c11.a)
    );
  }
}

export const VisualsAssemblyCBlitterInstance = new VisualsAssemblyCBlitter();
