import { useEffect, createContext } from "react";
import { Identify, identify, init, track } from "@amplitude/analytics-browser";
import { isAndroidApp, isIOSApp, isWeb } from "../Lib/user-agent-utils";

const AMPLITUDE_API_KEY = process.env.REACT_APP_AMPLITUDE_API_KEY;

interface Context {
  trackAmplitudeEvent: (eventName: string, eventProperties: any) => void;
}

export const AmplitudeContext = createContext<Context>({} as Context);

const AmplitudeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    if (!AMPLITUDE_API_KEY) return;

    const mahiUUID = localStorage.getItem("mahi_uuid");
    const sellerToken = localStorage.getItem("sellerToken");

    init(AMPLITUDE_API_KEY, mahiUUID || undefined, {
      defaultTracking: {
        sessions: true,
        pageViews: true,
      },
    });

    // 사용자 속성 설정
    const identifyUser = new Identify();

    const isAppDownloaded = isAndroidApp() || isIOSApp();
    if (isAppDownloaded) {
      identifyUser.set("isAppDownloaded", true);
    } else {
      identifyUser.set("isAppDownloaded", false);
    }

    if (isAndroidApp()) {
      identifyUser.set("mahi_platform", "Android App");
    } else if (isIOSApp()) {
      identifyUser.set("mahi_platform", "iOS App");
    } else if (isWeb()) {
      identifyUser.set("mahi_platform", "Web");
    }
    const loadAddr = localStorage.getItem("loadAddr");
    if (loadAddr) identifyUser.set("loadAddr", loadAddr);

    if (sellerToken) {
      identifyUser.set("isSeller", true);
    }

    identify(identifyUser);
  }, []);

  const trackAmplitudeEvent = (eventName: string, eventProperties: any) => {
    track(eventName, eventProperties);
  };

  const value = { trackAmplitudeEvent };

  return (
    <AmplitudeContext.Provider value={value}>
      {children}
    </AmplitudeContext.Provider>
  );
};

export default AmplitudeContextProvider;
