// import type { DetailsPageConfig } from "../../../details-pages/types";
// import { type ItemsTableRow } from "./types";
// import { type CommonShibutzRow } from "../../columns/types";

// import { budgetItemsColumns } from "./budgetItemsTable";
// import { budgetShibutzimColumns } from "./budgetShibutzimTable";

// export const createBudgetResourcesPage = ({
//   category,
//   categoryName,
//   item,
//   isOverviewPage,
//   budgetItemsData,
//   budgetShibutzimTableData,
//   navigate,
// }: any): DetailsPageConfig<ItemsTableRow | CommonShibutzRow> => {
//   return {
//     title: item
//       ? item === "__all__"
//         ? `${categoryName} / כל השיבוצים`
//         : `${categoryName} / ${item}`
//       : categoryName,

//     columns: isOverviewPage
//       ? budgetItemsColumns
//       : budgetShibutzimColumns,

//     data: isOverviewPage
//       ? budgetItemsData
//       : budgetShibutzimTableData,

//     favorites: isOverviewPage,

//     favoriteKey: `budget-resource-${categoryName}`,

//     isDrillable: isOverviewPage,

//     showSum: isOverviewPage,

//     onRowClick: (row) => {
//       navigate(
//         row.isSum
//           ? `/details/budget-resources/${category}/__all__`
//           : `/details/budget-resources/${category}/${row.name}`,
//       );
//     },
//   };
// };























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