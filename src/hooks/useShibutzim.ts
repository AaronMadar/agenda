import { useEffect, useCallback } from "react";
import dayjs from "dayjs";
import { getShibutzimData } from "@/api/gant.api";
import { useFilters } from "@/stores/filtersStore";
import { useShibutzimContext } from "@/contexts/ShibutzimContext";

type RefetchParams = {
  from?: string | null;
  to?: string | null;
  unitIds?: string[] | null;
  serviceTypes?: string[] | null;
  resourceTypes?: string[] | null;
};

export const useShibutzim = () => {
  const {
    setShibutzimData,
    setStartDate,
    setEndDate,
    setLoading,
  } = useShibutzimContext();

  const rootUnitId = useFilters(state => state.UnitTreeData?.[0]?.id);

  // Fetch data from API with optional filters
  const refetchShibutzimData = useCallback(
    async ({
      from,
      to,
      unitIds,
      serviceTypes,
      resourceTypes,
    }: RefetchParams = {}) => {
      try {
        setLoading(true);

        const defaultFrom = dayjs().startOf("year").format("YYYY-MM-DD");
        const defaultTo = dayjs().endOf("year").format("YYYY-MM-DD");

        const fromDate = from ?? defaultFrom;
        const toDate = to ?? defaultTo;

        if (!unitIds?.length) return;

        console.log("Fetching data with filters:", {
          from: fromDate,
          to: toDate,
          unitIds,
          serviceTypes,
          resourceTypes,
        });

        const response = await getShibutzimData(
          fromDate,
          toDate,
          unitIds,
          serviceTypes,
          resourceTypes
        );

        setShibutzimData(response.shibutzim);
        setStartDate(dayjs(response.period.start));
        setEndDate(dayjs(response.period.end));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [setShibutzimData, setStartDate, setEndDate, setLoading]
  );

   // Initial fetch on mount (default: full current year)
  useEffect(() => {
    if (!rootUnitId) return;

    refetchShibutzimData({
      unitIds: [rootUnitId],
    });
  }, [rootUnitId]);

  return {
    refetchShibutzimData,
  };
};