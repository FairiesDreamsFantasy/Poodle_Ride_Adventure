export function getCSTTime() {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utc + (3600000 * -6));
}

export function getLightingMode(hour: number): 'Day' | 'Evening' | 'Night' {
  if (hour >= 21 || hour < 4) return 'Night';
  if (hour >= 18 && hour < 21) return 'Evening';
  return 'Day';
}
