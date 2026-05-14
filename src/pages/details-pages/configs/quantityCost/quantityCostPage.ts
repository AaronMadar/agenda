import type { DetailsPageConfig } from '../../../details-pages/types';
import { costColumns } from './costTable';
import { quantityColumns } from './quantityTable';
import type { CreateQuantityCostPageParams } from './types';

export const createQuantityCostPage = ({
  category,
  pageData,
}: CreateQuantityCostPageParams): DetailsPageConfig | null => {
  if (!pageData) {
    return null;
  }

  const isQuantity = category.includes('quantity');

  return {
    type: 'shibutzim',
    title: pageData.title,

    columns: isQuantity ? quantityColumns : costColumns,

    data: pageData.data,
  };
};
