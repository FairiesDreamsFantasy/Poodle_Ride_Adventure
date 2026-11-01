/**
 * System/AI/In-Game/Category/Visuals/Canvas/CanvasRenderer.ts
 * 
 * Imprint: Fairies Dreams & Fantasy
 * Dedicated Canvas Rendering Pipeline for Poodle Ride Adventure.
 * 
 * Handles:
 * 1. Hardware-aware FPS throttling & dynamic device pixel ratio (DPR) calculation.
 * 2. Visual preference scaling: 2D, Low-res pixelation, Simulated3D, Super3D, Active3D, 3DPlus.
 * 3. Character & Rider View dispatch:
 *    - Abigay Rose Kone (Poodle Rider View & Active 3D)
 *    - Anninne-Amelia Rose Julisus (Shiny tan, umbrella)
 *    - Abigail Marigold Kenyatta
 *    - Dymond Daisy Qin-Reynolds
 *    - Priscilla & Olga-Olivia (Babylonian rider & POV)
 *    - Ride-On Pink Poodle Rocker Toy Interface
 * 4. Environmental layers, world objects, window views, and CST clock rendering.
 * 5. Babylon-Free Craftsmanship watermark and live positioning overlays.
 */

import { MutableRefObject } from 'react';
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  getCSTTime,
  getLightingMode,
  GameState
} from '../../../Logic/GameLogic';
import { drawEnvironment, drawWindowViews } from '../../../../../../Arena/Manorsville/Rasta-Manor/Environment';
import { drawWorldObjects } from '../../../../../Engine/Science/Graphical_Renderer/W/WorldRenderer';
import { drawToyInterface } from '../../../../../../World/Main_Game/World/1/Levels/Level_1/Courses/Poodle_Ride_Story_Book/StoryBookRenderer';
import { draw2DView } from '../../../../../Engine/Scientific_Imports/D/Drawing';
import { drawPoodleRiderView, drawPoodle3D } from '../../../../../../Characters/Poodles/Abigay_Rose_Kone';
import { drawAnninneAmeliaRiderView } from '../../../../../../Characters/Poodles/Anninne-Amelia_Rose_Julisus';
import { drawAbigailRiderView } from '../../../../../../Characters/Poodles/Abigail_Marigold_Kenyatta';
import { drawDymondRiderView } from '../../../../../../Characters/Poodles/Dymond_Daisy_Qin-Reynolds';
import { drawPriscillaRiderView, drawPriscillaPOV } from '../../../../../../Characters/Riders/Priscilla/Animations/PriscillaRiderRenderer';
import { drawPoodlePOV } from '../../../../../../Characters/Riders/Fairy-Rider/POV';
import { applyLegacyConstraints } from '../../../../../HardwareOptimization';
import { formulateAreaMetrics as formulateArenaMetrics } from '../../Arena';
import { getRelativePositionDescription } from '../../../../../Engine/Scientific_Imports/P/Positions';
import { getFootage } from '../../../../../Engine/Science/Physics/Measurements';

export interface CanvasRenderParams {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  time: number;
  hardwareProfile: MutableRefObject<any>;
  gameStateRef: MutableRefObject<GameState>;
  lastRenderTime: MutableRefObject<number>;
  renderRequestRef: MutableRefObject<number>;
}

export function renderCanvasFrame(params: CanvasRenderParams, requestNextFrame: (time: number) => void): void {
  const {
    canvas,
    ctx,
    time,
    hardwareProfile,
    gameStateRef,
    lastRenderTime
  } = params;

  const hw = hardwareProfile.current;
  const state = gameStateRef.current;

  // Hardware-aware throttling
  const fpsLimit = hw.targetFPS;
  const interval = 1000 / fpsLimit;
  if (time - lastRenderTime.current < interval) {
    requestNextFrame(time);
    return;
  }
  lastRenderTime.current = time;

  const cstDate = getCSTTime();
  const currentHour = cstDate.getHours();
  const lighting = getLightingMode(currentHour);
  const isNight = lighting === 'Night';

  applyLegacyConstraints(ctx);

  // Cache exact simulation epoch seconds to protect the browser heap from redundant float object allocations
  const nowSeconds = Date.now() / 1000;

  // Determine native device pixel density (DPR), restricted by mathematically-backed hardware capability caps
  const dpr = Math.min(hw.maxDPR, window.devicePixelRatio || 1);

  // Visual Preference: 2D Mode
  if (state.visualPrefs === '2D') {
    const physicalWidth = Math.round(GAME_WIDTH * dpr);
    const physicalHeight = Math.round(GAME_HEIGHT * dpr);
    if (canvas.width !== physicalWidth || canvas.height !== physicalHeight) {
      canvas.width = physicalWidth;
      canvas.height = physicalHeight;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    draw2DView(ctx, GAME_WIDTH, GAME_HEIGHT, state);
    ctx.restore();

    requestNextFrame(time);
    return;
  }

  // Pixelation support
  let pixelRatio =
    state.visualPrefs === 'Auto'
      ? state.pixelRatio
      : state.visualPrefs === 'Simulated3D'
      ? 0.5
      : state.visualPrefs === 'Super3D'
      ? 1.5
      : state.visualPrefs === '3DPlus'
      ? 1.2
      : 1;

  // Auto-recalibration for legacy hardware (e.g. iPad)
  if (state.visualPrefs === 'Auto' && hw.isLegacy) {
    pixelRatio = 0.75; // Save ~44% of pixel processing
  }

  // Compute total physical scaling (DPR mapped alongside visual quality multiplier)
  const physicalScale = dpr * pixelRatio;
  const physicalWidth = Math.round(GAME_WIDTH * physicalScale);
  const physicalHeight = Math.round(GAME_HEIGHT * physicalScale);

  // Dynamically size backing store only on changes to protect physical VRAM layout
  if (canvas.width !== physicalWidth || canvas.height !== physicalHeight) {
    canvas.width = physicalWidth;
    canvas.height = physicalHeight;
  }

  ctx.save();

  if (pixelRatio < 1) {
    // Multiplier scaling for low resolution / performance pixelation
    const renderScale = dpr * pixelRatio * pixelRatio;
    ctx.scale(renderScale, renderScale);

    // Adjust width/height for scaled context
    const sw = GAME_WIDTH / pixelRatio;
    const sh = GAME_HEIGHT / pixelRatio;

    // Ultra Black for night skies
    ctx.fillStyle = isNight ? '#000000' : '#050505';
    ctx.fillRect(0, 0, sw, sh);

    const { isLeaning, isGraspingCollar } = state;

    // Draw Environment
    drawEnvironment(ctx, sw, sh, state, nowSeconds);
    drawWorldObjects(ctx, sw, sh, state, nowSeconds);

    // Draw Window Views
    drawWindowViews(ctx, sw, sh, state, nowSeconds, cstDate);

    if (state.viewMode === 'Rider') {
      if (state.visualPrefs === 'Active3D') {
        drawPoodle3D(ctx, sw, sh, nowSeconds, 0);
      } else {
        // Draw Poodle (Rider's View - 3rd Person)
        if (state.characterName === 'Priscilla' || state.ridingAnimal === 'Olga-Olivia') {
          drawPriscillaRiderView(
            ctx,
            sw,
            sh,
            isLeaning,
            isGraspingCollar,
            nowSeconds,
            state.isPetting,
            state.lastPetTime
          );
        } else if (state.ridingAnimal === 'Anninne-Amelia Rose Julisus') {
          drawAnninneAmeliaRiderView(
            ctx,
            sw,
            sh,
            isLeaning,
            isGraspingCollar,
            nowSeconds,
            state.isUmbrellaEquipped,
            state.isUmbrellaOpen,
            state.isPetting,
            state.lastPetTime
          );
        } else if (state.ridingAnimal === 'Abigail Marigold Kenyatta') {
          drawAbigailRiderView(
            ctx,
            sw,
            sh,
            isLeaning,
            nowSeconds,
            state.isPetting,
            state.lastPetTime
          );
        } else if (state.isRidingToy) {
          drawToyInterface(ctx, sw, sh, state, nowSeconds);
        } else if (state.ridingAnimal === 'Dymond Daisy Qin-Reynolds') {
          drawDymondRiderView(ctx, sw, sh, state, nowSeconds);
        } else {
          drawPoodleRiderView(
            ctx,
            sw,
            sh,
            isLeaning,
            isGraspingCollar,
            nowSeconds,
            state.isUmbrellaEquipped,
            state.isUmbrellaOpen,
            state.isPetting,
            state.lastPetTime
          );
        }
      }
    } else {
      // POV Poodle Rendering (1st Person)
      if (state.characterName === 'Priscilla' || state.ridingAnimal === 'Olga-Olivia') {
        drawPriscillaPOV(
          ctx,
          sw,
          sh,
          state.isJumping,
          isLeaning,
          isGraspingCollar,
          nowSeconds,
          state.isPetting,
          state.lastPetTime
        );
      } else {
        drawPoodlePOV(
          ctx,
          sw,
          sh,
          state.isJumping,
          isLeaning,
          isGraspingCollar,
          nowSeconds,
          state.ridingAnimal,
          state.isPetting,
          state.lastPetTime
        );
      }
    }
  } else {
    // High-Quality / Standard Path
    ctx.scale(physicalScale, physicalScale);

    // Ultra Black for night skies
    ctx.fillStyle = isNight ? '#000000' : '#050505';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    const { isLeaning, isGraspingCollar } = state;

    // Draw Environment
    drawEnvironment(ctx, GAME_WIDTH, GAME_HEIGHT, state, nowSeconds);
    drawWorldObjects(ctx, GAME_WIDTH, GAME_HEIGHT, state, nowSeconds);

    // Draw Window Views
    drawWindowViews(ctx, GAME_WIDTH, GAME_HEIGHT, state, nowSeconds, cstDate);

    if (state.viewMode === 'Rider') {
      if (state.visualPrefs === 'Active3D') {
        drawPoodle3D(ctx, GAME_WIDTH, GAME_HEIGHT, nowSeconds, 0); // Front facing for now
      } else {
        // Draw Poodle (Rider's View - 3rd Person)
        if (state.characterName === 'Priscilla' || state.ridingAnimal === 'Olga-Olivia') {
          drawPriscillaRiderView(
            ctx,
            GAME_WIDTH,
            GAME_HEIGHT,
            isLeaning,
            isGraspingCollar,
            nowSeconds,
            state.isPetting,
            state.lastPetTime
          );
        } else if (state.ridingAnimal === 'Anninne-Amelia Rose Julisus') {
          drawAnninneAmeliaRiderView(
            ctx,
            GAME_WIDTH,
            GAME_HEIGHT,
            isLeaning,
            isGraspingCollar,
            nowSeconds,
            state.isUmbrellaEquipped,
            state.isUmbrellaOpen,
            state.isPetting,
            state.lastPetTime
          );
        } else if (state.ridingAnimal === 'Abigail Marigold Kenyatta') {
          drawAbigailRiderView(
            ctx,
            GAME_WIDTH,
            GAME_HEIGHT,
            isLeaning,
            nowSeconds,
            state.isPetting,
            state.lastPetTime
          );
        } else if (state.isRidingToy) {
          drawToyInterface(ctx, GAME_WIDTH, GAME_HEIGHT, state, nowSeconds);
        } else if (state.ridingAnimal === 'Dymond Daisy Qin-Reynolds') {
          drawDymondRiderView(ctx, GAME_WIDTH, GAME_HEIGHT, state, nowSeconds);
        } else {
          drawPoodleRiderView(
            ctx,
            GAME_WIDTH,
            GAME_HEIGHT,
            isLeaning,
            isGraspingCollar,
            nowSeconds,
            state.isUmbrellaEquipped,
            state.isUmbrellaOpen,
            state.isPetting,
            state.lastPetTime
          );
        }
      }
    } else {
      // POV Poodle Rendering (1st Person)
      if (state.characterName === 'Priscilla' || state.ridingAnimal === 'Olga-Olivia') {
        drawPriscillaPOV(
          ctx,
          GAME_WIDTH,
          GAME_HEIGHT,
          state.isJumping,
          isLeaning,
          isGraspingCollar,
          nowSeconds,
          state.isPetting,
          state.lastPetTime
        );
      } else {
        drawPoodlePOV(
          ctx,
          GAME_WIDTH,
          GAME_HEIGHT,
          state.isJumping,
          isLeaning,
          isGraspingCollar,
          nowSeconds,
          state.ridingAnimal,
          state.isPetting,
          state.lastPetTime
        );
      }
    }

    // Hybrid Mode: Scanlines
    if (state.visualPrefs === 'Hybrid') {
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      for (let i = 0; i < GAME_HEIGHT; i += 4) {
        ctx.fillRect(0, i, GAME_WIDTH, 2);
      }
      ctx.restore();
    }

    // 3D+ Mode: Slight Bloom/Glow
    if (state.visualPrefs === '3DPlus') {
      ctx.save();
      const bloomGrad = ctx.createRadialGradient(
        GAME_WIDTH / 2,
        GAME_HEIGHT / 2,
        50,
        GAME_WIDTH / 2,
        GAME_HEIGHT / 2,
        GAME_WIDTH
      );
      bloomGrad.addColorStop(0, 'rgba(255, 192, 203, 0.05)');
      bloomGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bloomGrad;
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      ctx.restore();
    }

    // Super 3D Effects
    if (state.visualPrefs === 'Super3D') {
      ctx.save();
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 50; i++) {
        ctx.fillRect(Math.random() * GAME_WIDTH, Math.random() * GAME_HEIGHT, 1, 1);
      }
      ctx.restore();
    }
  }

  // Draw CST Clock if enabled
  if (state.isCSTEnabled) {
    ctx.save();
    const timeStr = cstDate.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    ctx.fillStyle = '#00ff00';
    ctx.font = 'bold 14px monospace';
    ctx.fillText(`CST: ${timeStr} (Chicago)`, 20, 30);
    ctx.restore();
  }

  // Babylon-Free Label
  if (state.isPaused || !state.isStarted || state.isPositioningEnabled) {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.font = '10px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('BABYLON-FREE CRAFTSMANSHIP', GAME_WIDTH - 10, 20);
    ctx.restore();
  }

  // Positioning Info
  if (state.isPositioningEnabled) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(10, 10, 250, 60);
    ctx.fillStyle = '#00ff00';
    ctx.font = '10px monospace';
    ctx.textAlign = 'left';
    const currentAreaMetrics = formulateArenaMetrics(state.area);
    const currentDims = { width: currentAreaMetrics.width, height: currentAreaMetrics.height };
    ctx.fillText(`POSITIONING ACTIVE`, 20, 25);
    if (state.useCoordinates) {
      ctx.fillText(
        `POS: ${getRelativePositionDescription(
          state.gridX,
          state.gridY,
          currentDims.width / 2,
          currentDims.height
        )}`,
        20,
        40
      );
    }
    if (state.showMeasurements) {
      ctx.fillText(`FEET: ${getFootage(state.gridX)}x${getFootage(state.gridY)}`, 20, 55);
    }
  }

  ctx.restore();

  requestNextFrame(time);
}
