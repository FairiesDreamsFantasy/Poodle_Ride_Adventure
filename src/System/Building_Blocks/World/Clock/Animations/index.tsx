export interface ClockAnimationState {
  secondHandAngle: number;
  minuteHandAngle: number;
  hourHandAngle: number;
}

/**
 * Calculates continuous clock hand angles for smooth 2D/3D analog clock renders.
 */
export function calculateClockAnimation(date: Date): ClockAnimationState {
  const seconds = date.getSeconds() + date.getMilliseconds() / 1000;
  const minutes = date.getMinutes() + seconds / 60;
  const hours = (date.getHours() % 12) + minutes / 60;

  return {
    secondHandAngle: (seconds / 60) * 360,
    minuteHandAngle: (minutes / 60) * 360,
    hourHandAngle: (hours / 12) * 360
  };
}
