import { useMemo, useState, useRef, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import localeData from "dayjs/plugin/localeData";
import style from "@/style/components/dashboard/training-calendar/TrainingCalendar.module.css";
import { iconServiceType } from "@/constants/icons";
import type { CalendarEvent } from "./types";
import CheckIcon from "@mui/icons-material/Check";
import TodayIcon from "@mui/icons-material/Today";


dayjs.extend(localeData);

interface TrainingCalendarProps {
  events: CalendarEvent[];
}

export const TrainingCalendar = ({ events }: TrainingCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());

  /* ===== Month Picker ===== */
  const [pickerOpen, setPickerOpen] = useState(false);
  const [tempMonth, setTempMonth] = useState(currentMonth.month());
  const [tempYear, setTempYear] = useState(currentMonth.year());
  const pickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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

  const months = dayjs.months();
  const years = Array.from(
    { length: 21 },
    (_, i) => currentMonth.year() - 10 + i,
  );

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
            className={style.openPickerBtn}
            onClick={() => {
              setTempMonth(currentMonth.month());
              setTempYear(currentMonth.year());
              setPickerOpen((v) => !v);
            }}
          >
            📅
          </button>

          {pickerOpen && (
            <div ref={pickerRef} className={style.monthPicker}>
              <div className={style.column}>
                {months.map((m, i) => (
                  <div
                    key={m}
                    className={`${style.item} ${i === tempMonth ? style.active : ""}`}
                    onClick={() => setTempMonth(i)}
                  >
                    {m}
                  </div>
                ))}
              </div>

              <div className={style.column}>
                {years.map((y) => (
                  <div
                    key={y}
                    className={`${style.item} ${y === tempYear ? style.active : ""}`}
                    onClick={() => setTempYear(y)}
                  >
                    {y}
                  </div>
                ))}
              </div>

              {/* ✓ Confirm */}
              <div className={style.pickerActions}>
                <button
                  className={`${style.pickerActionBtn} ${style.confirmBtn}`}
                  onClick={() => {
                    setCurrentMonth(dayjs().year(tempYear).month(tempMonth));
                    setPickerOpen(false);
                  }}
                  title="אישור"
                >
                  <CheckIcon fontSize="small" />
                </button>

                <button
                  className={`${style.pickerActionBtn} ${style.todayBtn}`}
                  onClick={() => {
                    const today = dayjs();
                    setCurrentMonth(today);
                    setTempMonth(today.month());
                    setTempYear(today.year());
                    setPickerOpen(false);
                  }}
                  title="היום"
                >
                  <TodayIcon fontSize="small" />
                </button>
              </div>
            </div>
          )}
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
          const isLeftColumn = index % 7 === 6;

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
