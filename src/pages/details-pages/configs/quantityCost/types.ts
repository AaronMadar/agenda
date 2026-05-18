import type { CommonShibutzRow } from '../../columns/types';
import type { BaseDetailsPageParams } from '../../types';

export type CreateQuantityCostPageParams = BaseDetailsPageParams & {
  pageData: {
    title: string;
    data: CommonShibutzRow[];
  } | null;
};
