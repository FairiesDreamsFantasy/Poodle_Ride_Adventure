import React from 'react';
import { GameState } from '../../../Engine/Core/Types';

export interface Coin {
  id: string;
  x: number;
  y: number;
  area: string;
  collected: boolean;
  isCollected: boolean;
  value: number;
}

export const generateCoins = (area: string, height: number): Coin[] => {
  const coins: Coin[] = [];
  
  if (area === 'PinkHouseTeaRoom') {
    // Manually placed coins for the tea room as requested
    const trCoins = [
      { x: 50, y: 50 }, { x: 350, y: 50 },
      { x: 50, y: 350 }, { x: 350, y: 350 },
      { x: 200, y: 50 }, { x: 200, y: 350 }
    ];
    trCoins.forEach((pos, i) => {
      coins.push({
        id: `coin-tr-${i}`,
        x: pos.x,
        y: pos.y,
        area: area,
        collected: false,
        isCollected: false,
        value: 10
      });
    });
    return coins;
  }

  const count = 10; // 10 coins per course segment
  
  for (let i = 0; i < count; i++) {
    coins.push({
      id: `coin-${area}-${i}`,
      x: 50 + Math.random() * 300,
      y: 50 + Math.random() * (height - 100),
      area: area,
      collected: false,
      isCollected: false,
      value: 1
    });
  }
  
  return coins;
};

export const checkCoinCollection = (state: GameState, coins: Coin[]): { collected: boolean, updatedCoins: Coin[], points: number } => {
  let points = 0;
  let collected = false;
  const currentArea = state.area;
  const updatedCoins = coins.map(coin => {
    if (!coin.isCollected && coin.area === currentArea) {
      const dx = state.gridX - coin.x;
      const dy = state.gridY - coin.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 15) { // Collection radius
        collected = true;
        points += coin.value;
        return { ...coin, isCollected: true, collected: true };
      }
    }
    return coin;
  });
  
  return { collected, updatedCoins, points };
};

export const renderCoins = (ctx: CanvasRenderingContext2D, coins: Coin[], scale: number, time: number) => {
  ctx.save();
  coins.forEach(coin => {
    if (!coin.isCollected) {
      const x = coin.x * scale;
      const y = coin.y * scale;
      
      // Spinning gold coin
      const spin = Math.sin(time / 200) * 0.5 + 0.5;
      ctx.fillStyle = '#ffd700'; // Gold
      ctx.strokeStyle = '#daa520'; // Goldenrod
      
      ctx.beginPath();
      ctx.ellipse(x, y, 5 * scale * spin, 5 * scale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Gleam
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(x - 2 * scale * spin, y - 2 * scale, 1 * scale, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  ctx.restore();
};

export const GeneralCoins: React.FC<any> = (props) => {
  return (
    <div id="coins-general">
      {props.children}
    </div>
  );
};
