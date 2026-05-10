import { useMemo, memo, useEffect, useRef } from "react";
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
import { EmptyState } from "@/components/shared/EmptyState";

const MIN_WIDTH_PERCENT = 10;
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

function proportionToTranslateX(
  cardWidthPercent: number,
  percentExit: number
): number {

  return (percentExit / cardWidthPercent) * 100;
}


/* =========================
   COMPONENT
========================= */

type GantProps = {
  setForceDisplayed: (forceTypes: string[]) => void;
  searchTerm: string
};

export const Gant = memo(function Gant({ setForceDisplayed, searchTerm }: GantProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { startDate, endDate, shibutzimData, loading } = useShibutzimContext();
  const { groupByField, groupsInAscOrder, setIsLittleScreen, showOpenCards, activeCardWidthPercent } = useViewSettings();

  useEffect(() => {
    const handleResize = () => {
      console.log("window width:", window.innerWidth);
      if (window.innerWidth < 1700) {
        setIsLittleScreen(true);
      }
      else {
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


  const displayedGrouped = useMemo(() => {
    if (!searchTerm.trim()) return grouped;

    const lowerSearch = searchTerm.toLowerCase().trim();

    return Object.entries(grouped).reduce<
      Record<string, { count: number; shibutzim: Shibutz[] }>
    >((acc, [groupName, group]) => {

      const filteredShibutzim = group.shibutzim.filter((shibutz) => {

        // resources searchable text
        const resourcesText =
          shibutz.resources
            ?.map((resource) => {
              const itemsNames = resource.items
                .map((item) => item.name)
                .join(" ");

              return `
              ${resource.categoryName}
              ${itemsNames}
            `;
            })
            .join(" ") || "";

        // all searchable content
        const searchableText = `
        ${shibutz.title}
        ${shibutz.codeShibutz}
        ${shibutz.mesima}
        ${shibutz.serviceType}
        ${shibutz.forceType}
        ${shibutz.location}
        ${resourcesText}
      `.toLowerCase();

        return searchableText.includes(lowerSearch);
      });

      // remove empty groups
      if (filteredShibutzim.length > 0) {
        acc[groupName] = {
          count: filteredShibutzim.length,
          shibutzim: filteredShibutzim,
        };
      }

      return acc;
    }, {});
  }, [grouped, searchTerm]);
  /* =========================
     RENDER
  ========================= */

  return (
    <div className={styles.wrapper}>
      <div className={styles.topFade} />

      <div ref={containerRef} className={`${styles["gant-container"]} ${(!loading && (shibutzimData?.length === 0 || Object.keys(displayedGrouped).length === 0)) ? styles["empty"] : ""}`}>
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
        {Object.entries(displayedGrouped).map(([groupName, group]) => {
          const isNotLastGroup = Object.keys(displayedGrouped).indexOf(groupName) !== Object.keys(displayedGrouped).length - 1;

          return (
            <div
              className={styles["gantrow"]}
              key={groupName}
              style={{
                borderBottom: isNotLastGroup
                  ? "1.9px solid #606368"
                  : undefined,
              }}
            >
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
                  const cardWidth = calculateWidth(shibuts, sDate, eDate); //minimal width is 10% maximal width is 100%
                  const maximalWidthPercent = cardWidth > activeCardWidthPercent ? cardWidth : activeCardWidthPercent;

                  const isExitNotActive = startPos + cardWidth > 100;
                  const percentExitNotActive = isExitNotActive ? startPos + cardWidth - 100 : 0;

                  const isExitActive = startPos + activeCardWidthPercent > 100;
                  const exitActive = isExitActive ? startPos + activeCardWidthPercent - 100 : 0;

                  const translateXNonActive = proportionToTranslateX(cardWidth, percentExitNotActive);
                  const translateXActive = proportionToTranslateX(maximalWidthPercent, exitActive);
                  const isNotLastInRow =
                    group.shibutzim.indexOf(shibuts) !== group.shibutzim.length - 1;


                  return (
                    <div
                      key={shibuts.codeShibutz}
                      style={{
                        padding: "0.2rem 0.4rem 2.6rem 0.4rem",
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
                            insetInlineStart: `${startPos}%`,
                            width: `${cardWidth}%`,
                            minWidth: showOpenCards ? `${activeCardWidthPercent}%` : undefined, // Very important - it's use for the opencard effect !
                            top: 0,
                            transform: `translateX(${showOpenCards ? translateXActive : translateXNonActive}%)`
                          }}
                          translateXActive={translateXActive}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        })}

        {/* EMPTY STATE */}
        {!loading && (shibutzimData?.length === 0 || Object.keys(displayedGrouped).length === 0) && (
          <EmptyState />
        )}
      </div>

      <div className={styles.bottomFade} />
    </div>
  );
});