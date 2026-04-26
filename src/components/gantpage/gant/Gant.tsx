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

const MIN_WIDTH_PERCENT = 10;
/* =========================
   HELPERS
========================= */

const checkIsNearEnd = (startPos: number, cardWidth: number, activeMinWidth: number): boolean => {
  const maximalWidthPercent = cardWidth > activeMinWidth ? cardWidth : activeMinWidth;
  return (startPos + maximalWidthPercent) > 100;
};

 const checkIsNearStart = (endPos: number, cardWidth: number, activeMinWidth: number): boolean => {
  const maximalWidthPercent = cardWidth > activeMinWidth ? cardWidth : activeMinWidth;
  return endPos + maximalWidthPercent > 100;
}

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

const calculateStartPosition = (
  shibutsStart: Dayjs,
  rangeStart: Dayjs,
  rangeEnd: Dayjs
): number => {
  // TODO use the calculation of the days as a parameter, in order not to repeat yourself
  const diffInRangeDays = rangeEnd
    .endOf("day")
    .diff(rangeStart.startOf("day"), "day") + 1;

  const totalDays =
    diffInRangeDays <= 15
      ? diffInRangeDays
      : rangeEnd.endOf("month").diff(rangeStart.startOf("month"), "day") + 1;

  const visualStart = shibutsStart.isBefore(rangeStart) ? rangeStart : shibutsStart;

  const diff = visualStart.diff(rangeStart, "day");

  return (diff / totalDays) * 100;
};

const calculateEndPosition = (
  startpos: number,
  cardwidth: number,
  
): number => {
 const MAXIMAL_WIDTH_SCREEN = 100;
 // IMPORTANT THIS RETURN THE POSITION IN PERCENTAGE FROM THE END OF THE SCREEN , NOT FROM THE START
  return MAXIMAL_WIDTH_SCREEN - (startpos + cardwidth);
};


const calculateWidth = (
  shibuts: Shibutz,
  rangeStart: Dayjs,
  rangeEnd: Dayjs
): number => {
  const diffInRangeDays = rangeEnd
    .endOf("day")
    .diff(rangeStart.startOf("day"), "day") + 1;

  // the timeline for less than 15 days rendered days ticks , so we verify what will the percent by days , after 15 days it will be a month 
  const totalDays =
    diffInRangeDays <= 15
      ? diffInRangeDays + 1
      : rangeEnd.endOf("month").diff(rangeStart.startOf("month"), "day") + 1;

  const itemStart = dayjs(shibuts.dateBegin);
  const itemEnd = dayjs(shibuts.dateEnd);

  const visualStart = itemStart.isBefore(rangeStart) ? rangeStart : itemStart;
  const visualEnd = itemEnd.isAfter(rangeEnd) ? rangeEnd : itemEnd;

  if (itemEnd.isBefore(rangeStart) || itemStart.isAfter(rangeEnd)) {
    return 0;
  }
  const width =
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
  const { groupByField, groupsInAscOrder , setIsLittleScreen ,isLittleScreen} = useViewSettings();

  const activeMinWidth = isLittleScreen ? 60 : 40;



  // ---- 2. Listener taille écran ----
  useEffect(() => {
    const handleResize = () => {
      console.log("window width:", window.innerWidth);
      if (window.innerWidth < 1300) {
        setIsLittleScreen(true);
      } else {
        setIsLittleScreen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            <div>
              <div className={styles["div-side"]}>
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
          <div className={styles["div-side"]}>
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
              const startPos = calculateStartPosition(dayjs(shibuts.dateBegin), sDate, eDate);
              const cardWidth = calculateWidth(shibuts, sDate, eDate);
              const endPos = calculateEndPosition(startPos, cardWidth);
              const isNearEnd = checkIsNearEnd(startPos, cardWidth, activeMinWidth);
              const isNearStart = checkIsNearStart(endPos, cardWidth, activeMinWidth);
              const isNotLastInRow =
                group.shibutzim.indexOf(shibuts) !== group.shibutzim.length - 1;

              // Determine positioning to prevent overflow (0%..100%)
              let insetStart: string | undefined;
              let insetEnd: string | undefined;
              let widthVal: string | undefined;

              const maximalWidth = Math.min(Math.max(cardWidth, activeMinWidth), 100);
              const displayedWidth = Math.min(cardWidth, 100); 

              if (isNearEnd && isNearStart) {
                // If both edges are near, center card to keep it inside track
                insetStart = `${Math.max(0, (100 - maximalWidth) / 2)}%`;
                insetEnd = "auto";
                widthVal = `${displayedWidth}%`;
              } else if (isNearEnd) {
                // Near right edge: anchor from end to prevent right overflow
                insetStart = "auto";
                insetEnd = `${endPos}%`;
                widthVal = `${displayedWidth}%`;
              } else if (isNearStart) {
                // Near left edge while anchoring from end: keep start anchor
                insetStart = `${startPos}%`;
                insetEnd = "auto";
                widthVal = `${displayedWidth}%`;
              } else {
                // Default: preserve natural placement
                insetStart = `${startPos}%`;
                insetEnd = "auto";
                widthVal = cardWidth === MIN_WIDTH_PERCENT ? undefined : `${displayedWidth}%`;
              }

              return (
                <div
                  key={shibuts.codeShibutz}
                  style={{
                    padding: "0.2rem 0.4rem 2.7rem 0.4rem",
                    borderBottom: isNotLastInRow
                      ? "0.1px solid #343434a1"
                      : undefined,
                  }}
                >
                  <div className={styles["gant-row"]}>
                    <ShibutsCard
                      shibuts={shibuts}
                      style={{
                        backgroundColor:
                          forceColors[shibuts.forceType] ?? forceColors["אחר"],
                        insetInlineStart: insetStart,
                        insetInlineEnd: insetEnd,
                        width: widthVal,
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