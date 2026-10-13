export const getCSTTime = () => {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const cst = new Date(utc + (3600000 * -6)); // Central Standard Time (UTC-6)
  return cst;
};

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

export const getLightingMode = (date: Date) => {
  const hour = date.getHours();
  if (hour >= 6 && hour < 18) return 'Day';
  if (hour >= 18 && hour < 21) return 'Dusk';
  if (hour >= 21 || hour < 5) return 'Night';
  return 'Dawn';
};

export * from './General';
export * from './Animations';
