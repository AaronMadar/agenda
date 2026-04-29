import { useMemo, useState, useRef } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Tooltip } from "@mui/material";
import { DateRange } from "@mui/icons-material";
import style from "@/style/components/dashboard/training-calendar/TrainingCalendar.module.css";
import { iconServiceType, type ServiceTypeKey } from "@/constants/icons";
import type { CalendarEvent } from "./types";
import { MonthPicker } from "./MonthPicker";
import { ArrowRight, ArrowLeft } from "@/assets/icons";
import { extractCalendarEvents } from "@/utils/calendar/extractCalendarEvents";
// import { ErrorState } from "@/components/shared/ErrorState";
import { EmptyState } from "@/components/shared/EmptyState";
import { useShibutzimContext } from "@/contexts/ShibutzimContext";


export const TrainingCalendar = () => {
  // ================= Context =================
  const { shibutzimData, loading } = useShibutzimContext();

  // ================= Local State =================
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [pickerOpen, setPickerOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  // ================= Derived Events =================
  const events: CalendarEvent[] = useMemo(() => {
    if (!shibutzimData) return [];
    return extractCalendarEvents(shibutzimData);
  }, [shibutzimData]);

  // ================= Calendar Days =================
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

  // ================= Events By Date =================
  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};

    events.forEach(ev => {
      (map[ev.date] ??= []).push(ev);
    });

    return map;
  }, [events]);

  // ================= Render =================
  return (
    <div className={style.calendar}>
      {/* ===== Header ===== */}
      <div className={style.header}>
        <h4>לוח אימונים</h4>

        <div className={style.headerControls}>
          <button onClick={() => setCurrentMonth(m => m.subtract(1, "month"))}>
            <ArrowRight style={{ width: 8, height: 30 }} />
          </button>

          <div className={style.monthTitleWrapper}>
            <div className={style.monthTitle}>
              {currentMonth.format("MMMM YYYY")}
            </div>

            <Tooltip
              title="בחירת חודש"
              arrow
              placement="top"
              slotProps={{ popper: { sx: { zIndex: 20000 } } }}
            >
              <button
                ref={anchorRef}
                className={style.openPickerBtn}
                onClick={() => setPickerOpen(v => !v)}
              >
                <DateRange sx={{ fontSize: 20 }} />
              </button>
            </Tooltip>

            <MonthPicker
              anchorRef={anchorRef}
              value={currentMonth}
              open={pickerOpen}
              onClose={() => setPickerOpen(false)}
              onChange={setCurrentMonth}
            />
          </div>

          <button onClick={() => setCurrentMonth(m => m.add(1, "month"))}>
            <ArrowLeft style={{ width: 8, height: 30 }} />
          </button>
        </div>

        <div className={style.spacer} />
      </div>

      {/* ===== States ===== */}
      {loading && <EmptyState message="טוען מידע..." />}

      {/* {!loading && !shibutzimData && (
        <ErrorState message="לא נטען מידע" />
      )} */}

      {!loading && shibutzimData && events.length === 0 && (
        <div>אין אירועים בלוח האימונים</div>
      )}

      {/* ===== Grid ===== */}
      {!loading && shibutzimData && events.length > 0 && (
        <>
          {/* ===== Weekdays ===== */}
          <div className={style.weekdays}>
            {["א", "ב", "ג", "ד", "ה", "ו", "ש"].map(d => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* ===== Days Grid ===== */}
          <div className={style.grid}>
            {days.map((day, index) => {
              const dateKey = day.format("YYYY-MM-DD");
              const dayEvents = eventsByDate[dateKey] || [];

              const isBusy = dayEvents.length > 0;
              const isToday = day.isSame(dayjs(), "day");
              const isOtherMonth = day.month() !== currentMonth.month();
              const isTopRow = Math.floor(index / 7) === 0;
              const isLeftColumn = (index + 1) % 7 === 0;

              const dayClassName = [
                style.day,
                isBusy && style.busyDay,
                isToday && style.isToday,
                isOtherMonth && style.otherMonth,
                isTopRow && style.topRow,
                isLeftColumn && style.leftColumn,
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <div key={dateKey} className={dayClassName}>
                  {/* Tooltip */}
                  {isBusy && (
                    <div className={style.tooltip}>
                      {dayEvents.map((ev, idx) => {
                        const icon =
                          iconServiceType[
                          ev.serviceType as ServiceTypeKey
                          ] ?? iconServiceType.default;

                        return (
                          <div key={idx} className={style.tooltipItem}>
                            <i
                              className={icon.className}
                              style={{ color: icon.color }}
                            />
                            <span>
                              {ev.title}{" "}
                              <span style={{ opacity: 0.6 }}>
                                ({ev.unitId}){" "}{"- "}
                              </span>
                              <span>
                                ק"ש : {ev.codeShibutz}
                              </span>
                            </span>

                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Icons Preview */}
                  <div className={style.iconsArea}>
                    {dayEvents.slice(0, 4).map((ev, idx) => {
                      const icon =
                        iconServiceType[
                        ev.serviceType as ServiceTypeKey
                        ] ?? iconServiceType.default;

                      return (
                        <i
                          key={idx}
                          className={icon.className}
                          style={{ color: icon.color }}
                        />
                      );
                    })}
                  </div>

                  {/* Day Number */}
                  <div className={style.dayNumber}>{day.date()}</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};