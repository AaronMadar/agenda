import { createContext, useContext, useState, type ReactNode } from "react";

interface GantViewSettingsContextType {
  showOpenCards: boolean;
  setShowOpenCards: (value: boolean) => void;

  selectedViewMode: string;
  setSelectedViewMode: (mode: string) => void;
}

const GantViewSettingsContext = createContext<GantViewSettingsContextType | null>(null);

export const GantViewSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [showOpenCards, setShowOpenCards] = useState(true);
  const [selectedViewMode, setSelectedViewMode] = useState<string>('location');

  return (
    <GantViewSettingsContext.Provider
      value={{
        showOpenCards,
        setShowOpenCards,
        selectedViewMode,
        setSelectedViewMode,
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