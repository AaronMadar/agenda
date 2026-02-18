import { useEffect, useState } from "react";
import style from "@/style/components/dashboard/DashboardBody.module.css";

import { BaseBodyCard } from "./BaseBodyCard";
import { QuantityAndCost } from "./quantity-and-cost/QuantityAndCost";
import { BudgetResources } from "./budget-resources/BudgetResources";
import { Reports } from "./reports/Reports";
import { TrainingCalendar } from "./training-calendar/TrainingCalendar";

import { extractCalendarEvents } from "@/utils/calendar/extractCalendarEvents";
import type { CalendarEvent } from "./training-calendar/types";

/* -------- types -------- */

type DashboardSummaryResponse = {
  quantityAndCost: {
    name: string;
    amount: number;
    percentage: number;
  }[];
  resources: {
    name: string;
    amount: number;
    percentage: number;
  }[];
  reports: string[];
};

/* -------- component -------- */

export const DashboardBody = () => {
  const [summaryData, setSummaryData] = useState<DashboardSummaryResponse | null>(null);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

  /* KPI / cards data */
  useEffect(() => {
    fetch("/public/dashboardSummary.json")
      .then(res => res.json())
      .then(setSummaryData)
      .catch(err => {
        console.error("Failed to load dashboard summary", err);
      });
  }, []);

  /* Calendar data */
  useEffect(() => {
    fetch("/data.json")
      .then(res => res.json())
      .then(data => {
        const events = extractCalendarEvents(data);
        setCalendarEvents(events);
      })
      .catch(err => {
        console.error("Failed to load calendar data", err);
      });
  }, []);

  return (
    <div className={style.bodyGrid}>
      <QuantityAndCost quantityAndCost={summaryData?.quantityAndCost} />

      <BaseBodyCard>
        <BudgetResources resources={summaryData?.resources} />
      </BaseBodyCard>

      <BaseBodyCard>
        <TrainingCalendar events={calendarEvents} />
      </BaseBodyCard>

      <BaseBodyCard>
        <Reports reports={summaryData?.reports} />
      </BaseBodyCard>
    </div>
  );
};
