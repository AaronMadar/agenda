import { createContext, useContext, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import type { ApiResponse } from "@/types/api-response";
import { getShibutzimData } from "@/api/gant.api";

type RefetchParams = {
  from: string | null;
  to: string | null;
  unitIds?: string[] | null;
  serviceTypes?: string[] | null;
  resourceTypes?: string[] | null;
};

type DateRangeContextType = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  data: ApiResponse | null;
  loading: boolean;
  setStartDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  refetchData: (params: RefetchParams) => void;
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
        setStartDate((prev) => dayjs(jsonData.period.start) || prev);
        setEndDate((prev) => dayjs(jsonData.period.end) || prev);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const [startDate, setStartDate] = useState<Dayjs | null>(null);

  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const refetchData = ({
    from,
    to,
    unitIds,
    serviceTypes,
    resourceTypes,
  }: RefetchParams) => {
    setLoading(true);

    getShibutzimData(from, to, unitIds, serviceTypes, resourceTypes)
      .then((jsonData) => {
        setData(jsonData);
        setStartDate(dayjs(jsonData.period.start));
        setEndDate(dayjs(jsonData.period.end));
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
        data,
        loading,
        setStartDate,
        setEndDate,
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
