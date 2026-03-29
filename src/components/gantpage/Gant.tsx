import { useMemo, memo, useEffect } from "react";
import { Box, Skeleton } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import dayjs, { Dayjs } from "dayjs";

import { ShibutsCard } from "./gant/ShibutsCard";
import { forceColors } from "@/constants/colors";
import type { Shibutz } from "@/api/dataRes.types";
import { useShibutzimContext } from "@/contexts/ShibutzimContext";

import styles from "@/style/components/gantpage/Gant.module.css";

const MIN_WIDTH_PERCENT = 5;
const NEAR_END_THRESHOLD = 75;

// const getFilteredShibutsim = (shibutsim: ShibutsApi[], rangeStart: Dayjs, rangeEnd: Dayjs): ShibutsApi[] => {
//     return shibutsim.filter(shibut => {
//         const itemStart = dayjs(shibut.dateBegin);
//         const itemEnd = dayjs(shibut.dateEnd);
//         return (itemEnd.isAfter(rangeStart) || itemEnd.isSame(rangeStart, 'day')) &&
//             (itemStart.isBefore(rangeEnd) || itemStart.isSame(rangeEnd, 'day'));
//     });
// };

const sortEventsByDate = (items: Shibutz[]): Shibutz[] => {
  return [...items].sort(
    (a, b) => dayjs(a.dateBegin).unix() - dayjs(b.dateBegin).unix(),
  );
};

const calculatePosition = (
  shibuts: Shibutz,
  rangeStart: Dayjs,
  rangeEnd: Dayjs,
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
  rangeEnd: Dayjs,
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
  let width = ((visualEnd.diff(visualStart, "day") + 1) / totalDays) * 100;
  return width < MIN_WIDTH_PERCENT ? MIN_WIDTH_PERCENT : width;
};

type gantProps = {
  setForceDisplayed: (forces: string[]) => void;
};

export const Gant = memo(function Gant({ setForceDisplayed }: gantProps) {
  const { startDate, endDate, shibutzimData, loading } = useShibutzimContext();

  const currentYear = dayjs().year();
  const sDate = startDate || dayjs(`${currentYear}-01-01`);
  const eDate = endDate || dayjs(`${currentYear}-12-31`);

  const gdudimToDisplay = useMemo(() => {
    if (!shibutzimData?.gdudim) return [];
    return shibutzimData.gdudim.map((gdudData) => {
      // const filtered = getFilteredShibutsim(gdudData.shibutsim, sDate, eDate);
      return {
        ...gdudData,
        // shibutsim: sortEventsByDate(filtered)
        shibutsim: sortEventsByDate(gdudData.shibutsim),
      };
    });
  }, [shibutzimData, sDate, eDate]);

  const displayedForces = useMemo(() => {
    const forces = new Set<string>();
    gdudimToDisplay.forEach((row) => {
      if (row.forceType) forces.add(row.forceType);
    });
    return Array.from(forces);
  }, [gdudimToDisplay]);

  useEffect(() => {
    setForceDisplayed(displayedForces);
  }, [displayedForces, setForceDisplayed]);

  return (
    <div className={styles["gant-container"]}>
      {/*LOADING STATE*/}
      {loading && (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div
              className={`${styles["timeline-header"]} ${styles["gdudim"]}`}
              key={i}
              style={{ borderBottom: "1.9px solid rgb(87, 82, 82)" }}
            >
              {/* SIDEBAR */}
              <div className={`${styles["div-side"]} ${styles["sidebar"]}`}>
                <Skeleton
                  variant="text"
                  width="50%"
                  sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
                />
              </div>

              {/* CONTENT */}
              <div className={styles["row-content-wrapper"]}>
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  sx={{
                    position: "absolute",
                    height: "2.9rem",
                    borderRadius: "10px",
                    bgcolor: "rgb(71, 71, 71)",
                    "&::after": {
                      background:
                        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.03), transparent) !important",
                    },
                    width: `${15 + ((i * 7) % 20)}%`,
                    insetInlineStart: `${5 + ((i * 18) % 65)}%`,
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          ))}
        </Box>
      )}

      {gdudimToDisplay.map((gdud) => (
        <div className={`${styles["gantrow"]}`} key={gdud.name}>
          <div className={`${styles["div-side"]} ${styles["sidebar"]}`}>
            {gdud.name}
          </div>
          <div className={styles["row-content-wrapper"]}>
            {gdud.shibutsim.map((shibuts) => {
              const startPos = calculatePosition(shibuts, sDate, eDate);
              const width = calculateWidth(shibuts, sDate, eDate);
              const isNearEnd = startPos + width > NEAR_END_THRESHOLD;

              return (
                <div style={{ height: "70px" }}>
                  <div key={shibuts.codeShibutz} className={styles["gant-row"]}>
                    <ShibutsCard
                      shibuts={shibuts}
                      pickud={gdud.pikud}
                      style={{
                        backgroundColor:
                          forceColors[
                            gdud.forceType as keyof typeof forceColors
                          ] || forceColors.default,
                        insetInlineStart: isNearEnd ? "auto" : `${startPos}%`,
                        insetInlineEnd: isNearEnd
                          ? `${100 - (startPos + width)}%`
                          : "auto",
                        width: `${width < MIN_WIDTH_PERCENT + 5 ? null : width}%`,
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
