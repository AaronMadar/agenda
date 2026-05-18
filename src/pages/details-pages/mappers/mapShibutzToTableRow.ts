import { type Shibutz } from '@/types/shibutzim.types';

export const mapShibutzToTableRow = (s: Shibutz) => ({
  id: s.codeShibutz,
  name: s.title,
  unitId: s.unitId,
  mesima: s.mesima,
  dateBegin: s.dateBegin,
  dateEnd: s.dateEnd,
  directCost: s.directCost,
  location: s.location,
});
