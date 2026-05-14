import type { TableColumn } from '../types';
import { type CommonShibutzRow } from './types';

export const commonShibutzColumns: TableColumn<CommonShibutzRow>[] = [
  { label: 'קוד שיבוץ', accessor: 'id', searchable: true },
  { label: 'שם שיבוץ', accessor: 'name', searchable: true },
  { label: 'יחידה', accessor: 'unitId', searchable: true },
  { label: 'משימה', accessor: 'mesima', searchable: true },
  { label: 'תאריך התחלה', accessor: 'dateBegin' },
  { label: 'תאריך סיום', accessor: 'dateEnd' },
  { label: 'עלות ישירה', accessor: 'directCost', sumable: true },
  { label: 'מיקום', accessor: 'location', searchable: true },
];
