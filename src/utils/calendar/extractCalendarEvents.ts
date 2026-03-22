import type { CalendarEvent } from "@/components/dashboard/training-calendar/types";
import type { DataResponse } from "@/api/dataRes.types";


export const extractCalendarEvents = (
  data: DataResponse,
): CalendarEvent[] => {
  const events: CalendarEvent[] = [];

  data.gdudim.forEach((gdud) => {
    gdud.shibutsim.forEach((sh) => {
      let current = new Date(sh.dateBegin);
      const end = new Date(sh.dateEnd);

      while (current <= end) {
        events.push({
          date: current.toISOString().slice(0, 10),
          title: sh.title,
          gdud: gdud.name,
          serviceType: sh.serviceType,
        });

        current.setDate(current.getDate() + 1);
      }
    });
  });

  return events;
};
