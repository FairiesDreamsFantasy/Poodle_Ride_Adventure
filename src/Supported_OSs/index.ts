export const detectOS = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const platform = navigator.platform.toLowerCase();

  if (platform.includes('linux')) return 'Linux';
  if (userAgent.includes('android')) return 'Android';
  if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) return 'iOS';
  if (userAgent.includes('freedos')) return 'FreeDOS';
  
  return 'Other';
};

export const isSupportedOS = () => {
  return true; // Support all OSs, including Windows
};
