export const isWindows = (): boolean => {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent;
  const isWin = /Windows/i.test(ua);
  const isMSDOS4 = ua.includes('MSDOS 4.00');
  return isWin && !isMSDOS4;
};

export const isLinux = (): boolean => {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent;
  return /Linux/i.test(ua) && !/Android/i.test(ua);
};

export const getOSName = (): string => {
  if (typeof window === 'undefined') return 'Unknown';
  const ua = window.navigator.userAgent;
  if (/Windows/i.test(ua)) return 'Windows';
  if (/Linux/i.test(ua)) return 'Linux';
  if (/Macintosh/i.test(ua)) return 'macOS';
  if (/Android/i.test(ua)) return 'Android';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
  return 'Other';
};
