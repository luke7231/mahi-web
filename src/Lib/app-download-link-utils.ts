import { getOS } from "./user-agent-utils";

export const getDownloadLink = () => {
  const os: string = getOS();

  if (["Mac OS", "iOS", "Linux"].includes(os)) {
    return getiOSLink();
  }

  if (["Android", "Windows"].includes(os)) {
    return getAndroidLink();
  }

  return getAndroidLink();
};

export const getAndroidLink = () => {
  //   return "https://play.google.com/store/apps/details?id=co.kr.onthelook";
  return "https://play.google.com/store/apps/details?id=com.yourcompany.mahi&hl=ko";
};

export const getiOSLink = () => {
  //   return "https://apps.apple.com/kr/app/%EC%98%A8%EB%8D%94%EB%A3%A9-onthelook/id1476231289";
  return "https://apps.apple.com/ee/app/%EB%A7%88%EA%B0%90%ED%9E%88%EC%96%B4%EB%A1%9C/id6670562227";
};
