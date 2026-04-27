import { useMemo } from "react";
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

export type BudgetResourcesMap = Record<string, CategorySummary>;

export const useBudgetResources = (shibutzimData: Shibutz[]) => {
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

  return budgetResources;
};