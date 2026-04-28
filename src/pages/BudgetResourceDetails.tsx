import { useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useBudgetResources } from "@/hooks/useBudgetResources";
import { DashboardTable } from "@/components/dashboard/dashboard-table/DashboardTable";
import style from "@/style/pages/BudgetResourceDetails.module.css";
import { ArrowRight } from "@/assets/icons";
import "@/style/index.css";
import { useShibutzimContext } from "@/contexts/ShibutzimContext";
import { useFavorites } from "@/hooks/useFavorites";

const resourceLabels: Record<string, string> = {
  ammo: "תחמושת",
  mm: 'ימ"מ',
  transportationAAAAAAAAAAAAAA: "הובלות",
  transportation: "תחבורה",
  km: 'ק"מ',
  thawing: "הפשרות",
  sticklight: "סטיקלייט",
  trainers: "מאמנים",

  vehicle: "רכב",
  equipment: "ציוד",
  other: "אחר",
  logistics: "לוגיסטיקה",
  medical: "רפואה",
  it: "תקשוב",
  personal_equipment: "ציוד אישי",
  training: "הדרכה",
  maintenance: "תחזוקה",
  security: "אבטחה",
};

export const BudgetResourceDetails = () => {
  const navigate = useNavigate();
  //   const location = useLocation();
  const { category, item } = useParams();

  const { shibutzimData, loading } = useShibutzimContext();

  const budgetResources = useBudgetResources(shibutzimData ?? []);

  const isDataReady = shibutzimData && shibutzimData.length > 0;

  const categoryName = resourceLabels[category || ""];

  const { favorites, toggleFavorite } = useFavorites(`budget-resource-${categoryName}`);

  const categoryData = useMemo(() => {
    if (!categoryName) return null;
    return budgetResources[categoryName];
  }, [budgetResources, categoryName]);

  // ================= LEVEL 1 (Items) =================
  const itemsData = useMemo(() => {
    if (!categoryData) return [];

    return Object.entries(categoryData.items).map(([name, data]) => ({
      id: name,
      name,
      quantity: data.totalQuantity,
      cost: data.totalCost,
    }));
  }, [categoryData]);

  // ================= LEVEL 2 (Shibutzim) =================
  const shibutzimDataInner = useMemo(() => {
    if (!categoryData || !item) return [];

    if (item === "__all__") {
      const all = Object.values(categoryData.items).flatMap(
        (itemData: any) => itemData.shibutzim,
      );

      const unique = Array.from(
        new Map(all.map((s) => [s.codeShibutz, s])).values(),
      );

      return unique;
    }

    const itemData = categoryData.items[item];
    if (!itemData) return [];

    return itemData.shibutzim;
  }, [categoryData, item]);

  const shibutzimTableData = useMemo(() => {
    return shibutzimDataInner.map((s) => ({
      id: s.codeShibutz,
      name: s.title,
      unitId: s.unitId,
      mesima: s.mesima,
      dateBegin: s.dateBegin,
      dateEnd: s.dateEnd,
      directCost: s.directCost,
      location: s.location,
    }));
  }, [shibutzimDataInner]);

  if (loading || !isDataReady) {
    return <div>Loading...</div>;
  }

  if (!categoryName) {
    return <div>קטגוריה לא תקינה</div>;
  }

  if (!categoryData) {
    return <div>אין נתונים לקטגוריה</div>;
  }

  // ================= TABLE CONFIG =================

  const itemColumns = [
    { label: "שם", accessor: "name", searchable: true },
    { label: "כמות", accessor: "quantity", sumable: true },
    { label: "עלות", accessor: "cost", sumable: true },
  ];

  const shibutzColumns = [
    { label: "קוד שיבוץ", accessor: "id", searchable: true },
    { label: "שם שיבוץ", accessor: "name", searchable: true },
    { label: "יחידה", accessor: "unitId", searchable: true },
    { label: "משימה", accessor: "mesima", searchable: true },
    { label: "תאריך התחלה", accessor: "dateBegin" },
    { label: "תאריך סיום", accessor: "dateEnd" },
    { label: "עלות ישירה", accessor: "directCost", sumable: true },
    { label: "מיקום", accessor: "location", searchable: true },
  ];

  // ================= NAVIGATION =================

  const handleBack = () => {
    navigate(-1);
  };

  const handleRowClick = (row: any) => {
    if (!item) {
      if (row.isSum) {
        navigate(`/details/budget-resources/${category}/__all__`);
      } else {
        navigate(`/details/budget-resources/${category}/${row.name}`);
      }
    }
  };

  // ================= HEADER =================

  const title = item
    ? item === "__all__"
      ? `${categoryName} / כל השיבוצים`
      : `${categoryName} / ${item}`
    : categoryName;

  // ================= RENDER =================

  return (
    <div className={style.page}>
      {/* HEADER */}
      <div className={style.header}>
        <ArrowRight className={style.backIcon} onClick={handleBack} />
        <h2 className={style.title}>{title}</h2>
        <div className={style.spacer}></div>
        <div className={style.iconContainer}>
          <img
            src="/dashboard-image-gray.png"
            alt="Dashboard Image"
            className={style.iconImage}
            onClick={() => navigate("/")}
          />
          <img
            src="/dashboard-image-blue.png"
            alt="Dashboard Image"
            className={style.iconImage}
            onClick={() => navigate("/")}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className={style.tableContainer}>
        {!item ? (
          <DashboardTable
            columns={itemColumns}
            data={itemsData}
            favorites
            favoriteRows={favorites}
            onToggleFavorite={toggleFavorite}
            isDrillable
            onRowClick={handleRowClick}
            showSum
          />
        ) : (
          <DashboardTable columns={shibutzColumns} data={shibutzimTableData} />
        )}
      </div>
    </div>
  );
};
