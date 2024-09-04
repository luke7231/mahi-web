export const isAndroidApp = () => {
  const userAgent = window.navigator.userAgent;
  return /mahi_app_android/.test(userAgent);
};

export const isIOSApp = () => {
  const userAgent = window.navigator.userAgent;
  return /mahi_app_ios/.test(userAgent);
};

export const isWeb = () => {
  const userAgent = window.navigator.userAgent;
  return !!!/mahi_app/.test(userAgent);
};
