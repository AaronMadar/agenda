import { useMemo, useState, useRef } from "react";
import dayjs, { Dayjs } from "dayjs";
import localeData from "dayjs/plugin/localeData";
import style from "@/style/components/dashboard/training-calendar/TrainingCalendar.module.css";
import { iconServiceType } from "@/constants/icons";
import type { CalendarEvent } from "./types";
import { DateRange } from "@mui/icons-material";
import { MonthPicker } from "./MonthPicker";

dayjs.extend(localeData);

interface TrainingCalendarProps {
  events: CalendarEvent[];
}

export const TrainingCalendar = ({ events }: TrainingCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [pickerOpen, setPickerOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  /* ===== Calendar Days ===== */
  const days = useMemo(() => {
    const start = currentMonth.startOf("month").startOf("week");
    const end = currentMonth.endOf("month").endOf("week");

    const result: Dayjs[] = [];
    let d = start;

    while (d.isBefore(end) || d.isSame(end, "day")) {
      result.push(d);
      d = d.add(1, "day");
    }

    return result;
  }, [currentMonth]);

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    events.forEach((ev) => {
      (map[ev.date] ??= []).push(ev);
    });
    return map;
  }, [events]);

  return (
    <div className={style.calendar}>
      {/* ===== Header ===== */}
      <div className={style.header}>
        <button onClick={() => setCurrentMonth((m) => m.subtract(1, "month"))}>
          ▶
        </button>

        <div className={style.monthTitleWrapper}>
          <div className={style.monthTitle}>
            {currentMonth.format("MMMM YYYY")}
          </div>

          <button
            ref={anchorRef}
            className={style.openPickerBtn}
            onClick={() => setPickerOpen((v) => !v)}
          >
            <DateRange />
          </button>

          <MonthPicker
            anchorRef={anchorRef}
            value={currentMonth}
            open={pickerOpen}
            onClose={() => setPickerOpen(false)}
            onChange={setCurrentMonth}
          />
        </div>

        <button onClick={() => setCurrentMonth((m) => m.add(1, "month"))}>
          ◀
        </button>
      </div>

      {/* ===== Weekdays ===== */}
      <div className={style.weekdays}>
        {["א", "ב", "ג", "ד", "ה", "ו", "ש"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* ===== Grid ===== */}
      <div className={style.grid}>
        {days.map((day, index) => {
          const dateKey = day.format("YYYY-MM-DD");
          const dayEvents = eventsByDate[dateKey] || [];

          const isBusy = dayEvents.length > 0;
          const isOtherMonth = day.month() !== currentMonth.month();
          const isTopRow = Math.floor(index / 7) === 0;
          const isLeftColumn = (index + 1) % 7 === 0;

          const dayClassName = [
            style.day,
            isBusy && style.busyDay,
            isOtherMonth && style.otherMonth,
            isTopRow && style.topRow,
            isLeftColumn && style.leftColumn,
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div key={dateKey} className={dayClassName}>
              {isBusy && (
                <div className={style.tooltip}>
                  {dayEvents.map((ev, idx) => (
                    <div key={idx} className={style.tooltipItem}>
                      <i
                        className={
                          iconServiceType[ev.serviceType] ??
                          iconServiceType.default
                        }
                      />
                      <span>
                        {ev.title}
                        <span style={{ opacity: 0.6 }}> ({ev.gdud})</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className={style.iconsArea}>
                {dayEvents.slice(0, 4).map((event, idx) => (
                  <i
                    key={idx}
                    className={
                      iconServiceType[event.serviceType] ??
                      iconServiceType.default
                    }
                  />
                ))}
              </div>

              <div className={style.dayNumber}>{day.date()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
