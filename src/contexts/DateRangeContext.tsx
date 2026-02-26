import { createContext, useContext, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import type { ApiResponse } from "@/types/api-response";
import { getShibutzimData } from "@/api/gant.api";

type DateRangeContextType = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  periodView: string;
  data: ApiResponse | null;
  loading: boolean;
  setStartDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  setPeriodView: (value: string) => void;
  refetchData: (
    from: string,
    to: string,
    unitIds: string[],
    serviceTypes: string[] | null,
    resourceTypes: string[] | null,
  ) => void;
};

const DateRangeContext = createContext<DateRangeContextType | null>(null);

export const DateRangeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getShibutzimData(
      dayjs().startOf("year").format("YYYY-MM-DD"),
      dayjs().endOf("year").format("YYYY-MM-DD"),
    )
      .then((jsonData) => {
        setData(jsonData);
        setStartDate((prev) => prev || dayjs(jsonData.period.start));
        setEndDate((prev) => prev || dayjs(jsonData.period.end));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const currentYear = new Date().getFullYear();

  const [startDate, setStartDate] = useState<Dayjs | null>(
    dayjs(`${currentYear}-01-01`),
  );

  const [endDate, setEndDate] = useState<Dayjs | null>(
    dayjs(`${currentYear}-12-31`),
  );

  const [periodView, setPeriodView] = useState<string>(`כל ${currentYear}`);

  const refetchData = (
    from: string,
    to: string,
    unitIds: string[] | null,
    serviceTypes: string[] | null,
    resourceTypes: string[] | null,
  ) => {
    setLoading(true);
    getShibutzimData(from, to, unitIds, serviceTypes, resourceTypes)
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

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
        refetchData,
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
