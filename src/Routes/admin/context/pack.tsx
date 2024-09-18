import React, { createContext, useContext, useState, ReactNode } from "react";

export interface MenuItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  discountRate?: number; // 할인율 추가
}

interface PackContextProps {
  packs: MenuItem[][];
  addPack: (items: MenuItem[]) => void;
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

  return (
    <PackContext.Provider value={{ packs, addPack }}>
      {children}
    </PackContext.Provider>
  );
};
