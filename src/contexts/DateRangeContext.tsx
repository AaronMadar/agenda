// import { createContext, useContext, useEffect, useState } from "react";
// import dayjs, { Dayjs } from "dayjs";
// import type { ApiResponse } from "@/types/api-response";
// import { getShibutzimData } from "@/api/gant.api";

// type RefetchParams = {
//   from: string | null;
//   to: string | null;
//   unitIds?: string[] | null;
//   serviceTypes?: string[] | null;
//   resourceTypes?: string[] | null;
// };

// type DateRangeContextType = {
//   startDate: Dayjs | null;
//   endDate: Dayjs | null;
//   shibutzimData: ApiResponse | null;
//   loading: boolean;
//   setStartDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
//   setEndDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
//   refetchShibutzimData: (params: RefetchParams) => void;
// };

// const DateRangeContext = createContext<DateRangeContextType | null>(null);

// export const DateRangeProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [shibutzimData, setShibutzimData] = useState<ApiResponse | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getShibutzimData(
//       dayjs().startOf("year").format("YYYY-MM-DD"),
//       dayjs().endOf("year").format("YYYY-MM-DD"),
//     )
//       .then((jsonData) => {
//         setShibutzimData(jsonData);
//         setStartDate((prev) => dayjs(jsonData.period.start) || prev);
//         setEndDate((prev) => dayjs(jsonData.period.end) || prev);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   const [startDate, setStartDate] = useState<Dayjs | null>(null);

//   const [endDate, setEndDate] = useState<Dayjs | null>(null);

//   const refetchShibutzimData = ({
//     from,
//     to,
//     unitIds,
//     serviceTypes,
//     resourceTypes,
//   }: RefetchParams) => {
//     setLoading(true);

//     getShibutzimData(from, to, unitIds, serviceTypes, resourceTypes)
//       .then((jsonData) => {
//         setShibutzimData(jsonData);
//         setStartDate(dayjs(jsonData.period.start));
//         setEndDate(dayjs(jsonData.period.end));
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   };

//   return (
//     <DateRangeContext.Provider
//       value={{
//         startDate,
//         endDate,
//         shibutzimData,
//         loading,
//         setStartDate,
//         setEndDate,
//         refetchShibutzimData,
//       }}
//     >
//       {children}
//     </DateRangeContext.Provider>
//   );
// };

// export const useDateRange = () => {
//   const context = useContext(DateRangeContext);
//   if (!context) {
//     throw new Error("useDateRange must be used inside DateRangeProvider");
//   }
//   return context;
// };





























import { createContext, useContext, useState } from "react";
import { Dayjs } from "dayjs";
import type { ApiResponse } from "@/types/api-response";

type DateRangeContextType = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  shibutzimData: ApiResponse | null;
  loading: boolean;
  setStartDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  setShibutzimData: React.Dispatch<React.SetStateAction<ApiResponse | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const DateRangeContext = createContext<DateRangeContextType | null>(null);

export const DateRangeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Date range state
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  // API data state
  const [shibutzimData, setShibutzimData] = useState<ApiResponse | null>(null);

  // Loading state
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <DateRangeContext.Provider
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

































