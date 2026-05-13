import type { CommonShibutzRow } from "./columns/types";
import type { ItemsTableRow } from "./configs/budgetResources/types";
import type { NavigateFunction } from "react-router-dom";

export type TableColumn<T> = {
  label: string;
  accessor: keyof T; 
  searchable?: boolean;
  sumable?: boolean;
};

type BaseConfig = {
  title: string;
  favorites?: boolean;
  favoriteKey?: string;
  isDrillable?: boolean;
  showSum?: boolean;
};

type BudgetItemsConfig = BaseConfig & {
  type: "items";
  columns: TableColumn<ItemsTableRow>[];
  data: ItemsTableRow[];
  onRowClick?: (row: ItemsTableRow) => void;
};

type BudgetShibutzimConfig = BaseConfig & {
  type: "shibutzim";
  columns: TableColumn<CommonShibutzRow>[];
  data: CommonShibutzRow[];
  onRowClick?: (row: CommonShibutzRow) => void;
};

export type DetailsPageConfig =
  | BudgetItemsConfig
  | BudgetShibutzimConfig;

export type BaseDetailsPageParams = {
  type?: string;
  category: string;
  item?: string;

  navigate: NavigateFunction;

  isOverviewPage?: boolean;

  favorites?: Set<number>;
  toggleFavorite?: (id: number) => void;

  categoryName?: string;

  quantityAndCostData?: any;
};