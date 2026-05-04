import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Shibutz } from "@/types/shibutzim.types";

interface GantViewSettingsContextType {
  showOpenCards: boolean;
  setShowOpenCards: (value: boolean) => void;

  groupsInAscOrder: boolean;
  setGroupsInAscOrder: (value: boolean) => void;

  groupByField: keyof Shibutz;
  setGroupByField: (field: keyof Shibutz) => void;

  isLittleScreen: boolean;
  setIsLittleScreen: (value: boolean) => void;

  activeCardWidthPercent: number;
}

const getFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const GantViewSettingsContext = createContext<GantViewSettingsContextType | null>(null);

export const GantViewSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [showOpenCards, setShowOpenCards] = useState(
    () => getFromStorage("showOpenCards", false)
  );

  const [groupsInAscOrder, setGroupsInAscOrder] = useState(
    () => getFromStorage("groupsInAscOrder", true)
  );

  const [groupByField, setGroupByField] = useState<keyof Shibutz>(
    () => getFromStorage("groupByField", "location")
  );

  const [isLittleScreen, setIsLittleScreen] = useState(window.innerWidth < 1700);

  const activeCardWidthPercent = isLittleScreen ? 60 : 40;

  /* ---------- SAVE TO LOCAL STORAGE ---------- */

  useEffect(() => {
    localStorage.setItem("showOpenCards", JSON.stringify(showOpenCards));
  }, [showOpenCards]);

  useEffect(() => {
    localStorage.setItem("groupsInAscOrder", JSON.stringify(groupsInAscOrder));
  }, [groupsInAscOrder]);

  useEffect(() => {
    localStorage.setItem("groupByField", JSON.stringify(groupByField));
  }, [groupByField]);

  return (
    <GantViewSettingsContext.Provider
      value={{
        showOpenCards,
        setShowOpenCards,
        groupByField,
        setGroupByField,
        groupsInAscOrder,
        setGroupsInAscOrder,
        isLittleScreen,
        setIsLittleScreen,
        activeCardWidthPercent,
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