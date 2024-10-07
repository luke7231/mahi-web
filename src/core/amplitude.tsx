import { useEffect, createContext } from "react";
import { init, track } from "@amplitude/analytics-browser";

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
    console.log(localStorage.getItem("mahi_uuid"));
    init(AMPLITUDE_API_KEY, localStorage.getItem("mahi_uuid") || undefined, {
      defaultTracking: {
        sessions: true,
        pageViews: true,
      },
    });
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
