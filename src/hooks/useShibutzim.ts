import { useEffect, useCallback } from "react";
import dayjs from "dayjs";
import { getShibutzimData } from "@/api/gant.api";
import { useFilters } from "@/stores/filtersStore";
import { useDateRange } from "@/contexts/DateRangeContext";

type RefetchParams = {
  from: string | null;
  to: string | null;
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
  } = useDateRange();

  const { UnitTreeData } = useFilters();

  /**
   * Fetch data from API with optional filters
   */
  const refetchShibutzimData = useCallback(
    async ({
      from,
      to,
      unitIds,
      serviceTypes,
      resourceTypes,
    }: RefetchParams) => {
      try {
        setLoading(true);

        const jsonData = await getShibutzimData(
          from,
          to,
          unitIds,
          serviceTypes,
          resourceTypes
        );

        setShibutzimData(jsonData);

        // Update date range based on API response
        setStartDate(dayjs(jsonData.period.start));
        setEndDate(dayjs(jsonData.period.end));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [setShibutzimData, setStartDate, setEndDate, setLoading]
  );

  /**
   * Initial fetch on mount (default: full current year)
   */
  useEffect(() => {
    const from = dayjs().startOf("year").format("YYYY-MM-DD");
    const to = dayjs().endOf("year").format("YYYY-MM-DD");

    const defaultUnitId = UnitTreeData.length > 0 ? UnitTreeData[0].id : null;

    const unitIds = defaultUnitId ? [defaultUnitId] : null;

    refetchShibutzimData({ from, to, unitIds });
  }, [refetchShibutzimData, UnitTreeData]);

  return {
    refetchShibutzimData,
  };
};