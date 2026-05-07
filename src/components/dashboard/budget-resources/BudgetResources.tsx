import { useMemo } from "react";
import style from "@/style/components/dashboard/budget-resources/BudgetResources.module.css";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { useShibutzimContext } from "@/contexts/ShibutzimContext";
import { BudgetResourceCard, type BudgetResource } from "./BudgetResourceCard";
import { useNavigate } from "react-router-dom";
import { useBudgetResourcesContext } from "@/contexts/BudgetResourcesContext";
import { getResourceKey, getResourceColor } from "@/constants/budgetResources";
import { Loader } from "@/components/shared/Loader";

export const BudgetResources = () => {
  const navigate = useNavigate();
  const { shibutzimData, loading } = useShibutzimContext();
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
          <Loader text="טוען משאבים..." />
        </div>
      ) : !shibutzimData ? (
        <div className={style.emptyState}>
          <ErrorState message="לא נטען מידע" />
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
                navigate(`/details/budget-resources/${getResourceKey(resource.name)}`)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};