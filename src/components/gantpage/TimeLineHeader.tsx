import { useDateRange } from "@/contexts/DateRangeContext";
import { Dayjs } from 'dayjs';
import { useMemo } from "react";
import styles from "@/style/components/gantpage/TimeLineHeader.module.css"


export default function TimeLineHeader() {

    const { startDate, endDate , shibutzimData } = useDateRange();

    const generateTicks = (start: Dayjs | null, end: Dayjs | null): string[] => {
        if (!start || !end) return []
        const ticks: string[] = [];
        const diffInDays = end.diff(start, 'day');
        if (diffInDays <= 15) {
            let current = start.clone();
            while (!current.isAfter(end.add(1, 'day'))) {
                ticks.push(current.format('D MMM'));
                current = current.add(1, 'day');
            }
        } else {
            let current = start.startOf('month');   
            while (!current.isAfter(end.add(1, 'month'))) {
                ticks.push(current.format('MMM'));
                current = current.add(1, 'month');
            }
        }
        return ticks;
    };

    const dates = useMemo(() => generateTicks(startDate, endDate), [startDate, endDate]);

    return (

        <div className={styles["timeline-header"]}>
            <div className={`${styles["unit-title"]} ${styles["div-side"]}`}>{shibutzimData?.unit}</div>
            <div className={styles["ticks-container"]}>
                {dates.map((date, i) => (
                    <div className={styles["timeline-tick"]} key={i}>
                        <span className={styles["tick-label"]}>{date}</span>
                        <i className={`bi bi-caret-up-fill ${styles["arrow-icon"]}`}></i>
                    </div>
                ))}
            </div>
        </div>
    )
}