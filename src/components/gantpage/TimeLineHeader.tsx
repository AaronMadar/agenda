import { useShibutzimContext } from "@/contexts/ShibutzimContext";
import dayjs, { Dayjs } from 'dayjs';
import { useMemo } from "react";
import styles from "@/style/components/gantpage/TimeLineHeader.module.css"
import { TicIcon } from "@/assets/icons";

export default function TimeLineHeader({ countDisplayed }: { countDisplayed: number }) {
    const { startDate, endDate, shibutzimData } = useShibutzimContext();

    const generateTicks = (start: Dayjs | null, end: Dayjs | null) => {
        if (!start || !end) return [];

        const ticks: {
            label: string;
            yearBadge?: string;
            isToday: boolean;
        }[] = [];
        const diffInDays = end.diff(start, 'day');
        const today = dayjs();

        let isFirstTick = true;
        let previousYear = start.year();

        if (diffInDays <= 15) {
            let current = start.clone();

            while (!current.isAfter(end.add(1, 'day'))) {
                let currentYear = current.year();
                let yearHasChanged = currentYear !== previousYear;


                ticks.push({
                    label: current.format('D MMM'),
                    yearBadge: isFirstTick || yearHasChanged
                        ? currentYear.toString()
                        : undefined,
                    isToday: current.isSame(today, 'day')
                });

                previousYear = currentYear;
                current = current.add(1, 'day');
                isFirstTick = false;
            }
        } else {
            let current = start.startOf('month');

            while (!current.isAfter(end.add(1, 'month'))) {
                let currentYear = current.year();
                let yearHasChanged = currentYear !== previousYear;


                ticks.push({
                    label: current.format('MMM'),
                    yearBadge: isFirstTick || yearHasChanged
                        ? currentYear.toString()
                        : undefined,
                    isToday: current.isSame(today, 'month')
                });

                previousYear = currentYear;
                current = current.add(1, 'month');
                isFirstTick = false;
            }
        }

        return ticks;
    };
    const dates = useMemo(() => generateTicks(startDate, endDate), [startDate, endDate]);

    const totalCount = useMemo(() => {
        if (!shibutzimData?.length) return 0;
        return shibutzimData.length;
    }, [shibutzimData]);

    return (
        <div className={styles["timeline-header"]}>
            {/* LEFT TOP CORNER */}
            <div className={styles["div-side"]}>
                <div style={{ fontSize: "0.9rem", opacity: 0.8, marginTop: 2 }}>
                    סה"כ שיבוצים: {countDisplayed}/{totalCount}
                </div>
            </div>

            {/* TICKS */}
            <div className={styles["ticks-container"]}>
                {dates.map((item, i) => (
                    <div
                        key={i}
                        className={`${styles["timeline-tick"]} ${item.isToday ? styles.today : ""}`}
                    >
                        <span className={styles["tick-label"]}>{item.label + " "}
                            {item.yearBadge && (
                                <span className={styles["year-badge"]}>
                                    {item.yearBadge}
                                </span>)}
                        </span>
                        <TicIcon className={styles["arrow-icon"]} />
                    </div>
                ))}
            </div>
        </div>
    )
}