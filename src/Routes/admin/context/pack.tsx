import React, { createContext, useContext, useState, ReactNode } from "react";

export interface MenuItem {
  id: number;
  name: string;
  img: string;
  price: number;
  discountRate?: number; // 할인율 추가
  quantity?: number;
}

interface PackContextProps {
  packs: MenuItem[][];
  addPack: (items: MenuItem[]) => void;
  resetPacks: () => void; // resetPacks 추가
}

const PackContext = createContext<PackContextProps | undefined>(undefined);

export const usePackContext = () => {
  const context = useContext(PackContext);
  if (!context) {
    throw new Error("usePackContext must be used within a PackProvider");
  }
  return context;
};

export const PackProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [packs, setPacks] = useState<MenuItem[][]>([]);

  const addPack = (items: MenuItem[]) => {
    setPacks((prevPacks) => [...prevPacks, items]);
  };

  const resetPacks = () => {
    setPacks([]); // reset the packs to an empty array
  };

  return (
    <PackContext.Provider value={{ packs, addPack, resetPacks }}>
      {children}
    </PackContext.Provider>
  );
};
