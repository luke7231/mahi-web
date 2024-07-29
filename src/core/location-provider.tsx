// LocationContext.tsx
import { createContext, useContext, ReactNode, useState } from "react";

interface LocationContextProps {
  hasLastLo: boolean;
  getLocationFromStorage: () => { lat: number; lng: number };
  setLocationToStorage: (lat: number, lng: number) => void;
}

const LocationContext = createContext<LocationContextProps | undefined>(
  undefined
);

interface LocationProviderProps {
  children: ReactNode;
}

const processDefaultLocation = () => {
  const location = localStorage.getItem("lat");
  return Boolean(location);
};

const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [hasLastLo, setHasLastLo] = useState(processDefaultLocation);

  const getLocationFromStorage = () => {
    const lat = localStorage.getItem("lat");
    const lng = localStorage.getItem("lng");

    return {
      lat: Number(lat),
      lng: Number(lng),
    };
  };

  const setLocationToStorage = (lat: number, lng: number) => {
    setHasLastLo(true);
    localStorage.setItem("lat", String(lat));
    localStorage.setItem("lng", String(lng));
  };

  return (
    <LocationContext.Provider
      value={{ hasLastLo, getLocationFromStorage, setLocationToStorage }}
    >
      {children}
    </LocationContext.Provider>
  );
};

const useLocation = (): LocationContextProps => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within an LocationProvider");
  }
  return context;
};

export { LocationProvider, useLocation };
