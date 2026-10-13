import React, { useEffect, useRef, useState } from 'react';
import { CeilingGeometryConfig, calculateVaultedZ } from '../Geometry';
import { CEILING_PALETTE, CeilingPattern, CeilingTexture } from '../Color_Palette';
import { drawCeiling2D } from '../2-D';
import { CeilingPixelation } from '../Pixelations';
import { CeilingPolygons, CeilingPolygon } from '../Polygons';
import { calculateCeilingAnimation, CeilingAnimationState } from '../Animations';

export interface GeneralCeilingProps {
  width: number;
  height: number;
  patternId?: string;
  textureId?: string;
  colorId?: string;
  renderMode?: '2D' | 'Pixel' | 'Polygon';
  isAnimated?: boolean;
}

/**
 * A highly robust and comprehensive general ceiling rendering system.
 * Incorporates 2D, Pixel, and Polygon modes alongside precise mathematical animation logic.
 */
export const GeneralCeilingRenderer: React.FC<GeneralCeilingProps> = ({
  width,
  height,
  patternId = 'pattern_smooth_plaster',
  textureId = 'texture_satin_matte',
  colorId = 'color_alabaster_white',
  renderMode = '2D',
  isAnimated = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [animState, setAnimState] = useState<CeilingAnimationState>({
    pulseFactor: 1,
    rotationOffset: 0,
    lightIntensity: 1
  });

  // Retrieve active palette definitions
  const activeColor = CEILING_PALETTE.colors.find(c => c.id === colorId) || CEILING_PALETTE.colors[0];
  const activePattern = CEILING_PALETTE.patterns.find(p => p.id === patternId) || CEILING_PALETTE.patterns[0];
  const activeTexture = CEILING_PALETTE.textures.find(t => t.id === textureId) || CEILING_PALETTE.textures[0];

  const config: CeilingGeometryConfig = {
    width,
    length: height,
    height: 10, // 10 feet
    vaultRise: activePattern.type === 'vaulted' ? 4 : 0,
    numPanelsX: 6,
    numPanelsY: 6
  };

  // Animation frame registration
  useEffect(() => {
    if (!isAnimated) return;

    let animFrame: number;
    const tick = (now: number) => {
      setAnimState(calculateCeilingAnimation(now, 1.2));
      animFrame = requestAnimationFrame(tick);
    };

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [isAnimated]);

  // Standard 2D Canvas rendering
  useEffect(() => {
    if (renderMode !== '2D') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Apply animation pulse factor to color light/dark balance
    let renderColor = activeColor.hex;
    if (isAnimated) {
      // Modify color hex intensity
      const r = parseInt(renderColor.slice(1, 3), 16);
      const g = parseInt(renderColor.slice(3, 5), 16);
      const b = parseInt(renderColor.slice(5, 7), 16);
      
      const adjustedR = Math.min(255, Math.floor(r * animState.pulseFactor));
      const adjustedG = Math.min(255, Math.floor(g * animState.pulseFactor));
      const adjustedB = Math.min(255, Math.floor(b * animState.pulseFactor));
      
      renderColor = `rgb(${adjustedR}, ${adjustedG}, ${adjustedB})`;
    }

    drawCeiling2D({
      ctx,
      x: 0,
      y: 0,
      width,
      height,
      config,
      pattern: activePattern,
      color: renderColor
    });
  }, [width, height, activeColor, activePattern, renderMode, isAnimated, animState]);

  // Generate vector polygons for the polygon mode (ceiling grids)
  const getPolygonData = (): CeilingPolygon[] => {
    const polygons: CeilingPolygon[] = [];
    const stepX = width / 4;
    const stepY = height / 4;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        // Form beautiful quad polygons representing coffered recessed panels
        const p1 = { x: i * stepX + 5, y: j * stepY + 5 };
        const p2 = { x: (i + 1) * stepX - 5, y: j * stepY + 5 };
        const p3 = { x: (i + 1) * stepX - 5, y: (j + 1) * stepY - 5 };
        const p4 = { x: i * stepX + 5, y: (j + 1) * stepY - 5 };

        // Alternating shades for mathematical depth mapping
        const shadeFactor = ((i + j) % 2 === 0 ? 0.95 : 0.85) * (isAnimated ? animState.pulseFactor : 1.0);
        const colorString = `rgba(${Math.floor(250 * shadeFactor)}, ${Math.floor(240 * shadeFactor)}, ${Math.floor(230 * shadeFactor)}, 0.8)`;

        polygons.push({
          points: [p1, p2, p3, p4],
          color: colorString,
          borderColor: activePattern.gridLineColor,
          opacity: 0.9
        });
      }
    }

    return polygons;
  };

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{ width, height }}
      id={`ceiling-container-${patternId}`}
    >
      {renderMode === '2D' && (
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="block absolute top-0 left-0"
        />
      )}

      {renderMode === 'Pixel' && (
        <div className="absolute top-0 left-0 w-full h-full">
          <CeilingPixelation
            color={activeColor.hex}
            gridLineColor={activePattern.gridLineColor}
            width={width}
            height={height}
            pixelSize={6}
          />
        </div>
      )}

      {renderMode === 'Polygon' && (
        <div className="absolute top-0 left-0 w-full h-full bg-stone-900">
          <CeilingPolygons
            polygons={getPolygonData()}
            width={width}
            height={height}
          />
        </div>
      )}

      {/* Decorative center medallion/chandelier indicator */}
      {activePattern.type === 'coffered' && (
        <div 
          className="absolute z-10 w-8 h-8 rounded-full border border-yellow-500/50 bg-stone-950/80 flex items-center justify-center shadow-lg transition-all"
          style={{
            transform: `scale(${isAnimated ? animState.lightIntensity : 1})`
          }}
        >
          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
        </div>
      )}
    </div>
  );
};
