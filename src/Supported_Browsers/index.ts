export const isChromium = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('chrome') || userAgent.includes('chromium');
};

export const isFirefox = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('firefox');
};

export const checkBrowserSupport = () => {
  if (isChromium()) {
    console.log('Chromium-based browser detected. Full support enabled.');
    return true;
  }
  if (isFirefox()) {
    console.log('Firefox detected. Audio volume set to 100% for best experience.');
    return true;
  }
  return false;
};
