import type { CalendarEvent } from "@/components/dashboard/training-calendar/types";
import type { Shibutz } from "@/types/shibutzim.types";

export const extractCalendarEvents = (
  shibutzim: Shibutz[],
): CalendarEvent[] => {
  const events: CalendarEvent[] = [];

  shibutzim.forEach((sh) => {
    let current = new Date(sh.dateBegin);
    const end = new Date(sh.dateEnd);

    while (current <= end) {
      events.push({
        date: current.toISOString().slice(0, 10),
        title: sh.title,
        unitId: sh.unitId,
        serviceType: sh.serviceType,
      });

      current.setDate(current.getDate() + 1);
    }
  });

  return events;
};