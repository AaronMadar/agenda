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
    events.forEach((ev) => {
      (map[ev.date] ??= []).push(ev);
    });
    return map;
  }, [events]);

  // ================= Helper Renders =================
  const renderDayCell = (day: Dayjs, dayEvents: CalendarEvent[]) => {
    const isBusy = dayEvents.length > 0;
    const isToday = day.isSame(dayjs(), "day");
    const isOtherMonth = day.month() !== currentMonth.month();

    const dayClassName = [
      style.day,
      isBusy && style.busyDay,
      isToday && style.isToday,
      isOtherMonth && style.otherMonth,
    ]
      .filter(Boolean)
      .join(" ");

    const iconsData = dayEvents.map((ev) => ({
      ...ev,
      iconConfig: iconServiceType[ev.serviceType as ServiceTypeKey] ?? iconServiceType.default,
    }));

    const tooltipTitle = isBusy ? (
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}
      className={isOtherMonth ? style.otherMonth : undefined}>
        {iconsData.map((ev, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}>
            <i className={ev.iconConfig.className} style={{ color: ev.iconConfig.color }} />
            <span>
              {ev.title} <span style={{ opacity: 0.6 }}>({ev.unitId}) - </span>
              <span>ק"ש : {ev.codeShibutz}</span>
            </span>
          </div>
        ))}
      </div>
    ) : "";

    return (
      <Tooltip
        key={day.format("YYYY-MM-DD")}
        title={tooltipTitle}
        arrow
        placement="top"
        disableHoverListener={!isBusy}
        slotProps={{
          tooltip: {
            sx: {
              backgroundColor: "#6d7479",
              color: "white",
              fontSize: "11px",
              borderRadius: "6px",
              padding: "6px 8px",
              zIndex: 20,
            },
          },
          arrow: { sx: { color: "#6d7479" } },
        }}
      >
        <div className={dayClassName}>
          <div className={style.iconsArea}>
            {iconsData.slice(0, 4).map((ev, idx) => (
              <i key={idx} className={ev.iconConfig.className} style={{ color: ev.iconConfig.color }} />
            ))}
          </div>
          <div className={style.dayNumber}>{day.date()}</div>
        </div>
      </Tooltip>
    );
  };

  // ================= Render =================
  return (
    <div className={style.calendar}>
      {/* ===== Header ===== */}
      <div className={style.header}>
        <h4>לוח אימונים</h4>

        <div className={style.headerControls}>
          <button onClick={() => setCurrentMonth((m) => m.subtract(1, "month"))}>
            <ArrowRight style={{ width: 8, height: 30 }} />
          </button>

          <div className={style.monthTitleWrapper}>
            <div className={style.monthTitle}>{currentMonth.format("MMMM YYYY")}</div>

            <Tooltip
              title="בחירת חודש"
              arrow
              placement="top"
              slotProps={{ popper: { sx: { zIndex: 20000 } } }}
            >
              <button
                ref={anchorRef}
                className={style.openPickerBtn}
                onClick={() => setPickerOpen((v) => !v)}
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

          <button onClick={() => setCurrentMonth((m) => m.add(1, "month"))}>
            <ArrowLeft style={{ width: 8, height: 30 }} />
          </button>
        </div>

        <div className={style.spacer} />
      </div>

      {/* ===== States ===== */}
      {loading && <EmptyState message="טוען מידע..." />}

      {/* ===== Grid ===== */}
      {!loading && (
        <>
          <div className={style.weekdays}>
            {["א", "ב", "ג", "ד", "ה", "ו", "ש"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className={style.grid}>
            {days.map((day) => renderDayCell(day, eventsByDate[day.format("YYYY-MM-DD")] || []))}
          </div>
        </>
      )}
    </div>
  );
};