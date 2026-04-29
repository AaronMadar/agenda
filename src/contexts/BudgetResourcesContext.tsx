import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import type { Shibutz } from "@/types/shibutzim.types";
import { useShibutzimContext } from "@/contexts/ShibutzimContext";

// ================= TYPES =================

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

// ================= CALCULATION =================

const calculateBudgetResources = (
  shibutzimData: Shibutz[],
): BudgetResourcesMap => {
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

        const exists = itemSummary.shibutzim.some(
          (s) => s.codeShibutz === shibutz.codeShibutz,
        );

        if (!exists) {
          itemSummary.shibutzim.push(shibutz);
        }
      }
    }
  }

  return map;
};

// ================= CONTEXT =================

const BudgetResourcesContext = createContext<BudgetResourcesMap | null>(null);

// ================= PROVIDER =================

export const BudgetResourcesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { shibutzimData } = useShibutzimContext();

  const budgetResources = useMemo(() => {
    return calculateBudgetResources(shibutzimData ?? []);
  }, [shibutzimData]);

  return (
    <BudgetResourcesContext.Provider value={budgetResources}>
      {children}
    </BudgetResourcesContext.Provider>
  );
};

// ================= HOOK =================

export const useBudgetResourcesContext = () => {
  const context = useContext(BudgetResourcesContext);

  if (!context) {
    throw new Error(
      "useBudgetResourcesContext must be used within BudgetResourcesProvider",
    );
  }

  return context;
};