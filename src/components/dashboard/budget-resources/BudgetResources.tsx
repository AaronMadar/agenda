import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { EmptyState } from '@/components/shared/EmptyState';
import { LoaderCircle } from '@/components/shared/loading/LoaderCircle';
import { getResourceColor, getResourceKey } from '@/constants/budgetResources';
import { useBudgetResourcesContext } from '@/contexts/BudgetResourcesContext';
import { useShibutzimContext } from '@/contexts/ShibutzimContext';
import style from '@/style/components/dashboard/budget-resources/BudgetResources.module.css';

import { type BudgetResource, BudgetResourceCard } from './BudgetResourceCard';

export const BudgetResources = () => {
  const navigate = useNavigate();
  const { loading } = useShibutzimContext();
  const budgetResources = useBudgetResourcesContext();

  const resources: BudgetResource[] = useMemo(() => {
    return Object.entries(budgetResources).map(([categoryName, data]) => ({
      name: categoryName,
      quantity: data.totalQuantity,
      cost: data.totalCost,
    }));
  }, [budgetResources]);

  return (
    <div className={style.budgetResources}>
      <h4>משאבים תקציב</h4>

      {loading ? (
        <div className={style.emptyState}>
          <LoaderCircle text="טוען משאבים..." />
        </div>
      ) : !resources.length ? (
        <div className={style.emptyState}>
          <EmptyState message="אין משאבים להצגה" />
        </div>
      ) : (
        <div className={style.grid}>
          {resources.map((resource) => (
            <BudgetResourceCard
              key={resource.name}
              resource={resource}
              headerColor={getResourceColor(resource.name)}
              onClick={() =>
                navigate(
                  `/details/budget-resources/${getResourceKey(resource.name)}`,
                )
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};
