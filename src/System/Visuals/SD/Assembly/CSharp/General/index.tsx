/**
 * System/Visuals/SD/Assembly/CSharp/General/index.tsx
 * Standard-definition compatibility preset coordinator (NTSC 640x480 / PAL 720x576 / DOS VGA 320x200).
 */

export type SDStandardPreset = 'VGA_320x200' | 'NTSC_640x480' | 'PAL_720x576';

export class VisualsSDAssemblyCSharpPreset {
  private preset: SDStandardPreset = 'NTSC_640x480';

  public setPreset(preset: SDStandardPreset): void {
    this.preset = preset;
  }

  public getPresetDimensions(): { width: number; height: number; refreshHz: number } {
    switch (this.preset) {
      case 'VGA_320x200':
        return { width: 320, height: 200, refreshHz: 70 };
      case 'PAL_720x576':
        return { width: 720, height: 576, refreshHz: 50 };
      default:
        return { width: 640, height: 480, refreshHz: 60 };
    }
  }
}

export const VisualsSDAssemblyCSharpInstance = new VisualsSDAssemblyCSharpPreset();
