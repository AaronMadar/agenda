import { createBudgetResourcesPage } from './configs/budgetResources/budgetResourcesPage';
import { createQuantityCostPage } from './configs/quantityCost/quantityCostPage';

export const detailsPagesRegistry = {
  'budget-resources': createBudgetResourcesPage,
  'quantity-cost': createQuantityCostPage,
};

export type DetailsPageType = keyof typeof detailsPagesRegistry;
