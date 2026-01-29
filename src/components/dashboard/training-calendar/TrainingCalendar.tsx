import { useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import style from "@/style/components/dashboard/training-calendar/TrainingCalendar.module.css";
import { iconServiceType } from "@/constants/icons";
import type { CalendarEvent } from "./types";

interface TrainingCalendarProps {
  events: CalendarEvent[];
}

export const TrainingCalendar = ({ events }: TrainingCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());

  const getDayBackground = (count: number) => {
    if (count === 0) return "#e5e5e5";
    if (count === 1) return "#c7d2fe";
    if (count === 2) return "#93c5fd";
    if (count === 3) return "#60a5fa";
    return "#3b82f6"; // 4+
  };

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

    events.forEach(ev => {
      if (!map[ev.date]) {
        map[ev.date] = [];
      }
      map[ev.date].push(ev);
    });

    return map;
  }, [events]);

  return (
    <div className={style.calendar}>
      {/* Header */}
      <div className={style.header}>
        <button onClick={() => setCurrentMonth(m => m.subtract(1, "month"))}>
          ▶
        </button>

        <div className={style.monthTitle}>
          {currentMonth.format("MMMM YYYY")}
        </div>

        <button onClick={() => setCurrentMonth(m => m.add(1, "month"))}>
          ◀
        </button>
      </div>

      {/* Weekdays */}
      <div className={style.weekdays}>
        {["א", "ב", "ג", "ד", "ה", "ו", "ש"].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className={style.grid}>
        {days.map(day => {
          const dateKey = day.format("YYYY-MM-DD");
          const dayEvents = eventsByDate[dateKey] || [];
          const eventsCount = dayEvents.length;

          return (
            <div
              key={dateKey}
              className={`${style.day} ${
                day.month() !== currentMonth.month() ? style.otherMonth : ""
              }`}
              style={{
                backgroundColor: getDayBackground(eventsCount),
              }}
            >
              {/* icons area */}
              <div className={style.iconsArea}>
                {dayEvents.slice(0, 4).map((event, idx) => (
                  <i
                    key={idx}
                    className={
                      iconServiceType[event.serviceType] ??
                      iconServiceType.default
                    }
                    title={`${event.title} (${event.gdud})`}
                  />
                ))}

                {eventsCount > 4 && (
                  <span className={style.more}>
                    +{eventsCount - 4}
                  </span>
                )}
              </div>

              {/* day number */}
              <div className={style.dayNumber}>
                {day.date()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
