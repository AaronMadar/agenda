import { createContext, useContext, useState, useEffect } from "react";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { Shibutz } from "@/types/shibutzim.types";
import { getShibutzimData } from "@/api/gant.api";
import { useFilters } from "@/stores/filtersStore";

type ShibutzimContextType = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  shibutzimData: Shibutz[] | null;
  loading: boolean;

  setStartDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  setShibutzimData: React.Dispatch<React.SetStateAction<Shibutz[] | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  refetchShibutzim: (params?: {
    from?: string | null;
    to?: string | null;
    unitIds?: string[] | null;
    serviceTypeIds?: string[] | null;
    resourceTypeIds?: string[] | null;
  }) => Promise<void>;
};

const ShibutzimContext = createContext<ShibutzimContextType | null>(null);

export const ShibutzimProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [shibutzimData, setShibutzimData] = useState<Shibutz[] | null>(null);
  const [loading, setLoading] = useState(false);

  const rootUnitId = useFilters(state => state.UnitTreeData?.[0]?.id);

  const refetchShibutzim = async ({
    from,
    to,
    unitIds,
    serviceTypeIds,
    resourceTypeIds,
  }: {
    from?: string | null;
    to?: string | null;
    unitIds?: string[] | null;
    serviceTypeIds?: string[] | null;
    resourceTypeIds?: string[] | null;
  } = {}) => {
    try {
      setLoading(true);

      const defaultFrom = dayjs().startOf("year").format("YYYY-MM-DD");
      const defaultTo = dayjs().endOf("year").format("YYYY-MM-DD");

      const fromDate = from ?? defaultFrom;
      const toDate = to ?? defaultTo;

      const finalUnitIds = unitIds ?? (rootUnitId ? [rootUnitId] : null);

      if (!finalUnitIds?.length) return;

      const response = await getShibutzimData(
        fromDate,
        toDate,
        finalUnitIds,
        serviceTypeIds,
        resourceTypeIds
      );

      setShibutzimData(response.shibutzim);
      setStartDate(dayjs(response.period.start));
      setEndDate(dayjs(response.period.end));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!rootUnitId) return;

    refetchShibutzim({
      unitIds: [rootUnitId],
    });
  }, [rootUnitId]);

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
        refetchShibutzim,
      }}
    >
      {children}
    </ShibutzimContext.Provider>
  );
};

export const useShibutzimContext = () => {
  const context = useContext(ShibutzimContext);

  if (!context) {
    throw new Error("useShibutzimContext must be used inside ShibutzimProvider");
  }

  return context;
};