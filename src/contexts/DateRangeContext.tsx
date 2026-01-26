import { createContext, useContext, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

type DateRangeContextType = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  periodView: string;

  setStartDate: (date: Dayjs | null) => void;
  setEndDate: (date: Dayjs | null) => void;
  setPeriodView: (value: string) => void;
};

const DateRangeContext = createContext<DateRangeContextType | null>(null);

export const DateRangeProvider = ({ children }: { children: React.ReactNode }) => {
  const currentYear = new Date().getFullYear();

  const [startDate, setStartDate] = useState<Dayjs | null>(
    dayjs(`${currentYear}-01-01`)
  );

  const [endDate, setEndDate] = useState<Dayjs | null>(
    dayjs(`${currentYear}-12-31`)
  );

  const [periodView, setPeriodView] = useState<string>(
    `כל ${currentYear}`
  );

  return (
    <DateRangeContext.Provider
      value={{
        startDate,
        endDate,
        periodView,
        setStartDate,
        setEndDate,
        setPeriodView,
      }}
    >
      {children}
    </DateRangeContext.Provider>
  );
};

export const useDateRange = () => {
  const context = useContext(DateRangeContext);
  if (!context) {
    throw new Error("useDateRange must be used inside DateRangeProvider");
  }
  return context;
};
