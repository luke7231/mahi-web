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
export const getOS = () => {
  const userAgent = window.navigator.userAgent;

  let os = "web"; // 기본값: 웹

  if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent)) {
    os = "Mac OS";
  } else if (/iPhone|iPad|iPod/.test(userAgent)) {
    os = "iOS";
  } else if (/Windows/.test(userAgent)) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (/Linux/.test(userAgent)) {
    os = "Linux";
  }

  return os;
};
