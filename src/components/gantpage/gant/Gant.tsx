import { useMemo, memo, useEffect } from "react";
import { Box, Skeleton } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import dayjs, { Dayjs } from "dayjs";

import { ShibutsCard } from "./ShibutsCard";
import type { Shibutz } from "@/types/shibutzim.types";
import { useShibutzimContext } from "@/contexts/ShibutzimContext";
import { useViewSettings } from "@/contexts/GantViewSettingsContext";
import { forceColors } from "@/constants/colors";

import styles from "@/style/components/gantpage/gant/Gant.module.css";

const MIN_WIDTH_PERCENT = 5;
const NEAR_END_THRESHOLD = 75;

/* =========================
   HELPERS
========================= */

const sortEventsByDate = (items: Shibutz[]): Shibutz[] => {
  return [...items].sort(
    (a, b) => dayjs(a.dateBegin).unix() - dayjs(b.dateBegin).unix()
  );
};

function groupBy<T, K extends keyof T>(
  items: T[],
  key: K,
  sortAsc: boolean = true
): Record<string, T[]> {
  const grouped = items.reduce((acc, item) => {
    const groupKey = String(item[key] ?? "Unknown");

    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(item);

    return acc;
  }, {} as Record<string, T[]>);

  const sortedEntries = Object.entries(grouped).sort(([a], [b]) =>
    sortAsc ? a.localeCompare(b) : b.localeCompare(a)
  );

  return sortedEntries.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {} as Record<string, T[]>);
}

/* enrichment */
function enrichGroups(grouped: Record<string, Shibutz[]>) {
  return Object.entries(grouped).reduce<Record<string, { count: number; shibutzim: Shibutz[] }>>(
    (acc, [key, items]) => {
      acc[key] = {
        count: items.length,
        shibutzim: sortEventsByDate(items),
      };
      return acc;
    },
    {}
  );
}

const calculatePosition = (
  shibuts: Shibutz,
  rangeStart: Dayjs,
  rangeEnd: Dayjs
): number => {
  const diffInRangeDays = rangeEnd
    .endOf("day")
    .diff(rangeStart.startOf("day"), "day");

  const totalDays =
    diffInRangeDays <= 15
      ? diffInRangeDays + 1
      : rangeEnd.endOf("month").diff(rangeStart.startOf("month"), "day") + 1;

  const itemStart = dayjs(shibuts.dateBegin);
  const visualStart = itemStart.isBefore(rangeStart) ? rangeStart : itemStart;

  const diff = visualStart.diff(rangeStart, "day");

  return (diff / totalDays) * 100;
};

const calculateWidth = (
  shibuts: Shibutz,
  rangeStart: Dayjs,
  rangeEnd: Dayjs
): number => {
  const diffInRangeDays = rangeEnd
    .endOf("day")
    .diff(rangeStart.startOf("day"), "day");

  const totalDays =
    diffInRangeDays <= 15
      ? diffInRangeDays + 1
      : rangeEnd.endOf("month").diff(rangeStart.startOf("month"), "day") + 1;

  const itemStart = dayjs(shibuts.dateBegin);
  const itemEnd = dayjs(shibuts.dateEnd);

  const visualStart = itemStart.isBefore(rangeStart) ? rangeStart : itemStart;
  const visualEnd = itemEnd.isAfter(rangeEnd) ? rangeEnd : itemEnd;

  let width =
    ((visualEnd.diff(visualStart, "day") + 1) / totalDays) * 100;

  return width < MIN_WIDTH_PERCENT ? MIN_WIDTH_PERCENT : width;
};

/* =========================
   COMPONENT
========================= */

type GantProps = {
  setForceDisplayed: (forceTypes: string[]) => void;
};

export const Gant = memo(function Gant({ setForceDisplayed }: GantProps) {
  const { startDate, endDate, shibutzimData, loading } = useShibutzimContext();
  const { groupByField, groupsInAscOrder } = useViewSettings();

  const currentYear = dayjs().year();
  const sDate = startDate || dayjs(`${currentYear}-01-01`);
  const eDate = endDate || dayjs(`${currentYear}-12-31`);

  /* =========================
     DISPLAYED FORCES
  ========================= */

  const displayedForces = useMemo(() => {
    if (!shibutzimData?.length) return [];
    const forces = new Set<string>();
    shibutzimData.forEach((shibut) => {
      if (shibut.forceType) forces.add(shibut.forceType);
    });
    return Array.from(forces);
  }, [shibutzimData]);

  useEffect(() => {
    setForceDisplayed(displayedForces);
  }, [displayedForces]);

  /* =========================
     GROUP + ENRICH
  ========================= */

  const grouped = useMemo(() => {
    if (!shibutzimData?.length) return {};

    const raw = groupBy(shibutzimData, groupByField, groupsInAscOrder);
    return enrichGroups(raw);
  }, [shibutzimData, groupByField, groupsInAscOrder]);

  /* =========================
     RENDER
  ========================= */

  return (
    <div className={styles["gant-container"]}>
      {/* LOADING */}
      {loading && (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`${styles["timeline-header"]} ${styles["gdudim"]}`}
            >
              <div className={`${styles["div-side"]} ${styles["sidebar"]}`}>
                <Skeleton width="50%" />
              </div>

              <div className={styles["row-content-wrapper"]}>
                <Skeleton
                  variant="rounded"
                  sx={{
                    position: "absolute",
                    height: "2.9rem",
                    borderRadius: "10px",
                    width: `${15 + ((i * 7) % 20)}%`,
                    insetInlineStart: `${5 + ((i * 18) % 65)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </Box>
      )}

      {/* DATA */}
      {Object.entries(grouped).map(([groupName, group]) => (
        <div className={styles["gantrow"]} key={groupName}>
          {/* SIDEBAR */}
          <div className={`${styles["div-side"]} ${styles["sidebar"]}`}>
            <div className={styles["sticky-side-header"]}>
              <div>{groupName}</div>
              <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                {group.count} שיבוצים
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className={styles["row-content-wrapper"]}>
            {group.shibutzim.map((shibuts) => {
              const startPos = calculatePosition(shibuts, sDate, eDate);
              const width = calculateWidth(shibuts, sDate, eDate);
              const isNearEnd = startPos + width > NEAR_END_THRESHOLD;
              const isNotLastInRow =
                group.shibutzim.indexOf(shibuts) !== group.shibutzim.length - 1;

              return (
                <div
                  key={shibuts.codeShibutz}
                  style={{
                    padding: "0.2rem 0.2rem 2.7rem 0.2rem",
                    borderBottom: isNotLastInRow
                      ? "0.1px dashed #3f3f3f"
                      : undefined,
                  }}
                >
                  <div className={styles["gant-row"]}>
                    <ShibutsCard
                      shibuts={shibuts}
                      style={{
                        backgroundColor:
                          forceColors[shibuts.forceType] ?? forceColors["אחר"],
                        insetInlineStart: isNearEnd ? "auto" : `${startPos}%`,
                        insetInlineEnd: isNearEnd
                          ? `${100 - (startPos + width)}%`
                          : "auto",
                        width:
                          width < MIN_WIDTH_PERCENT + 5
                            ? undefined
                            : `${width}%`,
                        top: 0,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
});