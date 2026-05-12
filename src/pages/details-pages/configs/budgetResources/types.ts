import type { CommonShibutzRow } from "../../columns/types";
import type { BaseDetailsPageParams } from "../../types";

export type ItemsTableRow = {
  name: string;
  quantity: number;
  cost: number;

  isSum?: boolean;
};

export type CreateBudgetResourcesPageParams =
  BaseDetailsPageParams & {
    category: string;

    categoryName: string;

    isOverviewPage: boolean;

    budgetItemsData: ItemsTableRow[];

    budgetShibutzimTableData: CommonShibutzRow[];
  };