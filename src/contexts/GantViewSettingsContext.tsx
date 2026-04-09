import { createContext, useContext, useState, type ReactNode } from "react";
import type { Shibutz } from "@/types/shibutzim.types";

interface GantViewSettingsContextType {
  showOpenCards: boolean;
  setShowOpenCards: (value: boolean) => void;

  groupsInAscOrder: boolean;
  setGroupsInAscOrder: (value: boolean) => void;

  groupByField: keyof Shibutz;
  setGroupByField: (field: keyof Shibutz) => void;
}

const GantViewSettingsContext = createContext<GantViewSettingsContextType | null>(null);

export const GantViewSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [showOpenCards, setShowOpenCards] = useState(false);
  const [groupsInAscOrder, setGroupsInAscOrder] = useState(true);
  const [groupByField, setGroupByField] = useState<keyof Shibutz>('location');

  return (
    <GantViewSettingsContext.Provider
      value={{
        showOpenCards,
        setShowOpenCards,
        groupByField,
        setGroupByField,
        groupsInAscOrder,
        setGroupsInAscOrder,
      }}
    >
      {children}
    </GantViewSettingsContext.Provider>
  );
};

export const useViewSettings = () => {
  const context = useContext(GantViewSettingsContext);
  if (!context) {
    throw new Error("useViewSettings must be used inside ViewSettingsProvider");
  }
  return context;
};