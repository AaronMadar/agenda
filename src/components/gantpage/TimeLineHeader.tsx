import { useShibutzimContext } from "@/contexts/ShibutzimContext";
import dayjs, { Dayjs } from 'dayjs';
import { useMemo } from "react";
import styles from "@/style/components/gantpage/TimeLineHeader.module.css"
import { TicIcon } from "@/assets/icons";

export default function TimeLineHeader({ countDisplayed }: { countDisplayed: number }) {
    const { startDate, endDate , shibutzimData } = useShibutzimContext();

    const generateTicks = (start: Dayjs | null, end: Dayjs | null) => {
        if (!start || !end) return [];

        const ticks: { label: string; isToday: boolean }[] = [];
        const diffInDays = end.diff(start, 'day');

        const today = dayjs();

        if (diffInDays <= 15) {
            let current = start.clone();

            while (!current.isAfter(end.add(1, 'day'))) {
                const isToday = current.isSame(today, 'day');

                ticks.push({
                    label: current.format('D MMM'),
                    isToday
                });

                current = current.add(1, 'day');
            }
        } else {
            let current = start.startOf('month');

            while (!current.isAfter(end.add(1, 'month'))) {
                const isToday = current.isSame(today, 'month');

                ticks.push({
                    label: current.format('MMM - YY'),
                    isToday
                });

                current = current.add(1, 'month');
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
                        <span className={styles["tick-label"]}>{item.label}</span>
                        <TicIcon className={styles["arrow-icon"]}/>
                    </div>
                ))}
            </div>
        </div>
    )
}