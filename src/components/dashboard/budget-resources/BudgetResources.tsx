import { useMemo } from "react";
import style from "@/style/components/dashboard/budget-resources/BudgetResources.module.css";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { useShibutzimContext } from "@/contexts/ShibutzimContext";
import { BudgetResourceCard, type BudgetResource } from "./BudgetResourceCard";
import type { Shibutz } from "@/types/shibutzim.types";

type ItemSummary = {
  totalQuantity: number;
  totalCost: number;
  shibutzim: Shibutz[];
};

type CategorySummary = {
  totalQuantity: number;
  totalCost: number;
  items: Record<string, ItemSummary>;
};

type BudgetResourcesMap = Record<string, CategorySummary>;

export const BudgetResources = () => {
  const { shibutzimData, loading } = useShibutzimContext();

  // ================= Calculate =================
  const budgetResources: BudgetResourcesMap = useMemo(() => {
    if (!shibutzimData) return {};

    const map: BudgetResourcesMap = {};

    for (const shibutz of shibutzimData) {
      for (const resource of shibutz.resources) {
        const categoryKey = resource.categoryName;

        if (!map[categoryKey]) {
          map[categoryKey] = {
            totalQuantity: 0,
            totalCost: 0,
            items: {},
          };
        }

        for (const item of resource.items) {
          const itemKey = item.name;

          if (!map[categoryKey].items[itemKey]) {
            map[categoryKey].items[itemKey] = {
              totalQuantity: 0,
              totalCost: 0,
              shibutzim: [],
            };
          }

          const quantity = item.quantity;
          const cost = quantity * item.unitCost;

          map[categoryKey].totalQuantity += quantity;
          map[categoryKey].totalCost += cost;

          const itemSummary = map[categoryKey].items[itemKey];

          itemSummary.totalQuantity += quantity;
          itemSummary.totalCost += cost;

          if (!itemSummary.shibutzim.includes(shibutz)) {
            itemSummary.shibutzim.push(shibutz);
          }
        }
      }
    }

    return map;
  }, [shibutzimData]);

  // ================= Transform =================
  const resources: BudgetResource[] = useMemo(() => {
    return Object.entries(budgetResources).map(([categoryName, data]) => ({
      name: categoryName,
      quantity: data.totalQuantity,
      cost: data.totalCost,
    }));
  }, [budgetResources]);

  // ================= States =================
  if (loading) return <div>Loading...</div>;

  if (!shibutzimData) {
    return <ErrorState message="לא נטען מידע" />;
  }

  if (!resources.length) {
    return <EmptyState message="אין משאבים להצגה" />;
  }

  // ================= Render =================
  return (
    <div className={style.budgetResources}>
      <h4>משאבים תקציב</h4>

      <div className={style.grid}>
        {resources.map((resource, index) => (
          <BudgetResourceCard key={index} resource={resource} />
        ))}
      </div>
    </div>
  );
};