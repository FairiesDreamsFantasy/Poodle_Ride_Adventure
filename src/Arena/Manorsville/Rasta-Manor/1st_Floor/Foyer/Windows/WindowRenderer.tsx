import { GameState } from "../../../../../../System/AI/In-Game/Logic/GameLogic";

export function drawWindowViews(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number, cstDate: Date) {
  const day = cstDate.getDay(); // 0=Sun, 1=Mon, ...
  const hour = cstDate.getHours();
  const min = cstDate.getMinutes();
  const timeVal = hour + min / 60;

  // West Windows
  if (state.direction === 'West') {
    // Draw 3-floor house in distance
    ctx.fillStyle = "#8b4513";
    ctx.fillRect(width * 0.1, height * 0.2, 100, 150);
    
    // Events
    // White rabbit tea (Tue 15:00-16:30)
    if (day === 2 && timeVal >= 15 && timeVal <= 16.5) {
      ctx.fillStyle = "#ffffff";
      ctx.fillText("🐇☕", width * 0.15, height * 0.3);
    }
    // Opossum recycling (Fri 17:00)
    if (day === 5 && hour === 17) {
      ctx.fillText("🐀♻️", width * 0.15, height * 0.4);
    }
    // Pink fox cleaning (Daily 07:00)
    if (hour === 7) {
      ctx.fillText("🦊🧹", width * 0.15, height * 0.5);
    }
    // Yellow upright poodle (Mon borrow, Fri return)
    if (day === 1 || day === 5) {
      ctx.fillText("🐩📚", width * 0.2, height * 0.35);
    }
  }

  // East Windows
  if (state.direction === 'East') {
    // Rastafarian Girl on Fox (Fri 14:00)
    if (day === 5 && hour === 14) {
      ctx.fillText("👧🦊", width * 0.8, height * 0.4);
    }
    // Gray jack opossum trash (Daily 10:00)
    if (hour === 10) {
      ctx.fillText("🐀🗑️", width * 0.8, height * 0.5);
    }
  }
}
