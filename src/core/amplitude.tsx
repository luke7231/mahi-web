import { useEffect, createContext } from "react";
import { Identify, identify, init, track } from "@amplitude/analytics-browser";

const AMPLITUDE_API_KEY = process.env.REACT_APP_AMPLITUDE_API_KEY;

interface Context {
  trackAmplitudeEvent: (evenName: string, eventProperties: any) => void;
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

    // sellerToken이 있는 경우 identify로 사용자 속성 추가
    if (sellerToken) {
      const identifyUser = new Identify().set("isSeller", true);
      identify(identifyUser); // 사용자 속성 설정
    }
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
