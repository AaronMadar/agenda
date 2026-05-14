import style from '@/style/components/dashboard/DashboardBody.module.css';

import { BaseBodyCard } from './BaseBodyCard';
import { BudgetResources } from './budget-resources/BudgetResources';
import { QuantityAndCost } from './quantity-and-cost/QuantityAndCost';
import { Reports } from './reports/Reports';
import { TrainingCalendar } from './training-calendar/TrainingCalendar';

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
