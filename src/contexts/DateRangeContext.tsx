import { createContext, useContext, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import type { ApiResponse } from "@/types/api-response";


type DateRangeContextType = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  periodView: string;
  data: ApiResponse | null;
  loading: boolean;
  setStartDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  setPeriodView: (value: string) => void;
};

const DateRangeContext = createContext<DateRangeContextType | null>(null);

export const DateRangeProvider = ({ children }: { children: React.ReactNode }) => {

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch("/data.json")
      .then(res => res.json())
      .then(jsonData => {
        setTimeout(() => {
          setData(jsonData);
          setStartDate(prev => prev || dayjs(jsonData.period.start));
          setEndDate(prev => prev || dayjs(jsonData.period.end));
          setLoading(false)
        }, 10000)


      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

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
        data,
        loading,
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
