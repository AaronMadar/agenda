import style from "@/style/components/dashboard/DashboardBody.module.css";

import { BaseBodyCard } from "./BaseBodyCard";
import { QuantityAndCost } from "./quantity-and-cost/QuantityAndCost";
import { BudgetResources } from "./budget-resources/BudgetResources";
import { TrainingCalendar } from "./training-calendar/TrainingCalendar";
import { Reports } from "./reports/Reports";

export const DashboardBody = () => {
  return (
    <div className={style.bodyGrid}>
      <QuantityAndCost />

      <BaseBodyCard>
        <BudgetResources />
      </BaseBodyCard>

      <BaseBodyCard>
        <TrainingCalendar />
      </BaseBodyCard>

      <BaseBodyCard>
        <Reports />
      </BaseBodyCard>
    </div>
  );
};