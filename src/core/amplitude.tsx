import { useEffect, createContext } from "react";
import {
  Identify,
  identify,
  init,
  track,
  add,
} from "@amplitude/analytics-browser";
import * as amplitude from "@amplitude/analytics-browser";
import { isAndroidApp, isIOSApp, isWeb } from "../Lib/user-agent-utils";
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";

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
    const sessionReplay = sessionReplayPlugin({ sampleRate: 0.2 });
    amplitude.add(sessionReplay);

    const mahiUUID = localStorage.getItem("mahi_uuid");
    const sellerToken = localStorage.getItem("sellerToken");

    amplitude.init(AMPLITUDE_API_KEY, mahiUUID || undefined, {
      defaultTracking: {
        sessions: true,
        pageViews: true,
      },
    });

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

    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      identifyUser.set("isRegisteredUser", true);
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
