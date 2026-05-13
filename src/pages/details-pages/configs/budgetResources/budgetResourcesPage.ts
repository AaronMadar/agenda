import type { DetailsPageConfig } from "../../types";
import { budgetItemsColumns } from "./budgetItemsTable";
import { budgetShibutzimColumns } from "./budgetShibutzimTable";

import type { CreateBudgetResourcesPageParams } from "./types";

export const createBudgetResourcesPage = ({
  category,
  categoryName,
  item,
  isOverviewPage,
  budgetItemsData,
  budgetShibutzimTableData,
  navigate,
}: CreateBudgetResourcesPageParams): DetailsPageConfig => {
  if (isOverviewPage) {
    return {
      type: "items",
      title: item
        ? item === "__all__"
          ? `${categoryName} / כל השיבוצים`
          : `${categoryName} / ${item}`
        : categoryName,

      columns: budgetItemsColumns,
      data: budgetItemsData,

      favorites: true,
      favoriteKey: `budget-resource-${categoryName}`,
      isDrillable: true,
      showSum: true,

      onRowClick: (row) => {
        navigate(
            row.isSum
                ? `/details/budget-resources/${category}/__all__`
                : `/details/budget-resources/${category}/${row.name}`,
        );
      },
    };
  }

  return {
    type: "shibutzim",
    title: item
      ? item === "__all__"
        ? `${categoryName} / כל השיבוצים`
        : `${categoryName} / ${item}`
      : categoryName,

    columns: budgetShibutzimColumns,
    data: budgetShibutzimTableData,

    favorites: false,
    favoriteKey: `budget-resource-${categoryName}`,
  };
};