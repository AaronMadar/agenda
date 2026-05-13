import type {
  TableColumn,
} from "../../../details-pages/types";

import { type ItemsTableRow } from "./types";

export const budgetItemsColumns: TableColumn<ItemsTableRow>[] = [
  { label: "שם", accessor: "name", searchable: true },
  { label: "כמות", accessor: "quantity", sumable: true },
  { label: "עלות", accessor: "cost", sumable: true },
];