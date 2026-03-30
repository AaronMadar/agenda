import { createContext, useContext, useState } from "react";
import { Dayjs } from "dayjs";
import type { Shibutz } from "@/types/shibutzim.types";

type ShibutzimContextType = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  shibutzimData: Shibutz[] | null;
  loading: boolean;
  setStartDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  setShibutzimData: React.Dispatch<React.SetStateAction<Shibutz[] | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShibutzimContext = createContext<ShibutzimContextType | null>(null);

export const ShibutzimProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Date range state
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  // API data state
  const [shibutzimData, setShibutzimData] = useState<Shibutz[] | null>(null);

  // Loading state
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <ShibutzimContext.Provider
      value={{
        startDate,
        endDate,
        shibutzimData,
        loading,
        setStartDate,
        setEndDate,
        setShibutzimData,
        setLoading,
      }}
    >
      {children}
    </ShibutzimContext.Provider>
  );
};

export const useShibutzimContext = () => {
  const context = useContext(ShibutzimContext);

  if (!context) {
    throw new Error("useShibutzimContext must be used inside DateRangeProvider");
  }

  return context;
};