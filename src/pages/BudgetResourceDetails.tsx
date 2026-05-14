import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowRight } from '@/assets/icons';
import { DashboardTable } from '@/components/dashboard/dashboard-table/DashboardTable';
import { ErrorState } from '@/components/shared/ErrorState';
import { LoadingOverlay } from '@/components/shared/loading/LoadingOverlay';
import { getResourceLabel } from '@/constants/budgetResources';
import { useBudgetResourcesContext } from '@/contexts/BudgetResourcesContext';
import { useShibutzimContext } from '@/contexts/ShibutzimContext';
import { useFavorites } from '@/hooks/useFavorites';
import style from '@/style/pages/BudgetResourceDetails.module.css';

import { mapShibutzToTableRow } from './details-pages/mappers/mapShibutzToTableRow';
import {
  detailsPagesRegistry,
  type DetailsPageType,
} from './details-pages/registry';

// ======================================================
// COMPONENT
// ======================================================

export const BudgetResourceDetails = () => {
  const navigate = useNavigate();

  const { type, category, item } = useParams();

  const { loading, shibutzimData } = useShibutzimContext();

  const budgetResources = useBudgetResourcesContext();

  const isOverviewPage = !item;

  // ======================================================
  // FAVORITES
  // ======================================================

  const { favorites, toggleFavorite } = useFavorites(
    `details-${type}-${category}`,
  );

  // ======================================================
  // BUDGET RESOURCES
  // ======================================================

  const categoryName = getResourceLabel(category);

  const budgetCategoryData = useMemo(() => {
    if (!categoryName) return null;

    return budgetResources[categoryName];
  }, [budgetResources, categoryName]);

  // ======================================================
  // BUDGET ITEMS DATA
  // ======================================================

  const budgetItemsData = useMemo(() => {
    if (!budgetCategoryData) return [];

    return Object.entries(budgetCategoryData.items).map(([name, data]) => ({
      id: name,
      name,
      quantity: data.totalQuantity,
      cost: data.totalCost,
    }));
  }, [budgetCategoryData]);

  // ======================================================
  // BUDGET SHIBUTZIM DATA
  // ======================================================

  const budgetShibutzimData = useMemo(() => {
    if (!budgetCategoryData || isOverviewPage) {
      return [];
    }

    // ================= ALL =================

    if (item === '__all__') {
      const all = Object.values(budgetCategoryData.items).flatMap(
        (itemData: any) => itemData.shibutzim,
      );

      return Array.from(new Map(all.map((s) => [s.codeShibutz, s])).values());
    }

    // ================= SINGLE ITEM =================

    const itemData = budgetCategoryData.items[item!];

    return itemData?.shibutzim ?? [];
  }, [budgetCategoryData, item, isOverviewPage]);

  const budgetShibutzimTableData = useMemo(() => {
    return budgetShibutzimData.map(mapShibutzToTableRow);
  }, [budgetShibutzimData]);

  // ======================================================
  // QUANTITY & COST DATA
  // ======================================================

  const quantityAndCostData = useMemo(() => {
    const trainings = shibutzimData?.filter((s) => s.domain === 'אימון') ?? [];

    const courses = shibutzimData?.filter((s) => s.domain === 'הכשרה') ?? [];

    return {
      'training-quantity': {
        title: 'כמות אימונים',

        data: trainings.map(mapShibutzToTableRow),
      },

      'training-cost': {
        title: 'עלות אימונים',

        data: trainings.map(mapShibutzToTableRow),
      },

      'course-quantity': {
        title: 'כמות הכשרות',

        data: courses.map(mapShibutzToTableRow),
      },

      'course-cost': {
        title: 'עלות הכשרות',

        data: courses.map(mapShibutzToTableRow),
      },
    };
  }, [shibutzimData]);

  // ======================================================
  // PAGE
  // ======================================================

  const page = useMemo(() => {
    if (!type) return null;

    const pageType = type as DetailsPageType;

    const pageBuilder = detailsPagesRegistry[pageType];

    if (!pageBuilder) return null;

    // =========================
    // QUANTITY COST PAGE DATA
    // =========================

    const quantityCostPageData = category
      ? quantityAndCostData[category as keyof typeof quantityAndCostData]
      : null;

    if (!type || !category) {
      return null;
    }

    return pageBuilder({
      type,
      category,
      item,

      navigate,

      isOverviewPage,

      favorites,
      toggleFavorite,

      categoryName,

      budgetItemsData,
      budgetShibutzimTableData,

      quantityAndCostData,

      pageData: quantityCostPageData,
    });
  }, [
    type,
    category,
    item,

    navigate,

    isOverviewPage,

    favorites,
    toggleFavorite,

    categoryName,

    budgetItemsData,
    budgetShibutzimTableData,

    quantityAndCostData,
  ]);

  // ======================================================
  // HANDLERS
  // ======================================================

  const handleBack = () => {
    navigate(-1);
  };

  // ======================================================
  // INVALID PAGE
  // ======================================================

  if (!page) {
    return (
      <div className={style.page}>
        <div className={style.emptyState}>
          <ErrorState message="עמוד לא תקין" />
        </div>
      </div>
    );
  }

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <div className={style.page}>
      {/* HEADER */}

      <div className={style.header}>
        <div className={style.backButton} onClick={handleBack}>
          <ArrowRight className={style.backIcon} />
        </div>

        <h2 className={style.title}>{page.title}</h2>

        <div className={style.spacer}></div>

        <div className={style.iconContainer}>
          <img
            src="/dashboard-image-gray.png"
            alt="Dashboard"
            className={style.iconImage}
            onClick={() => navigate('/')}
          />

          <img
            src="/dashboard-image-blue.png"
            alt="Dashboard"
            className={style.iconImage}
            onClick={() => navigate('/')}
          />
        </div>
      </div>

      {/* TABLE */}

      <div className={style.tableContainer}>
        <LoadingOverlay loading={loading}>
          <DashboardTable
            columns={page.columns}
            data={page.data}
            favorites={page.favorites}
            favoriteRows={page.favorites ? favorites : undefined}
            onToggleFavorite={page.favorites ? toggleFavorite : undefined}
            isDrillable={page.isDrillable}
            onRowClick={page.onRowClick}
            showSum={page.showSum}
          />
        </LoadingOverlay>
      </div>
    </div>
  );
};
