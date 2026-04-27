import { useMemo } from "react";
import style from "@/style/components/dashboard/budget-resources/BudgetResources.module.css";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { useShibutzimContext } from "@/contexts/ShibutzimContext";
import { BudgetResourceCard, type BudgetResource } from "./BudgetResourceCard";
import { useNavigate } from "react-router-dom";
import { useBudgetResources } from "@/hooks/useBudgetResources";

const headerColors: Record<string, string> = {
  "תחמושת": "#f28b82",
  "ימ\"מ": "#fbbc04",
  "הובלות": "#34a853",
  "ק\"מ": "#4285f4",
  "הפשרות": "#b36ec0",
  "סטיקלייט": "#e91e63",
  "מאמנים": "#00bcd4",

  "רכב": "#fbbc04",
  "ציוד": "#34a853",
  "אחר": "#4285f4",
  "לוגיסטיקה": "#b36ec0",
  "רפואה": "#e91e63",
  "תקשוב": "#00bcd4",
  "ציוד אישי": "#ff5722",
  "תחבורה": "#b98877",
  "הדרכה": "#8cb8ce",
  "תחזוקה": "#4caf50",
  "אבטחה": "#bc9393",
};

const resourceNames: Record<string, string> = {
  "תחמושת": "ammo",
  "ימ\"מ": "mm",
  "הובלות": "transportation",
  "ק\"מ": "km",
  "הפשרות": "thawing",
  "סטיקלייט": "sticklight",
  "מאמנים": "trainers",

  "רכב": "vehicle",
  "ציוד": "equipment",
  "אחר": "other",
  "לוגיסטיקה": "logistics",
  "רפואה": "medical",
  "תקשוב": "it",
  "ציוד אישי": "personal_equipment",
  "תחבורה": "transportation",
  "הדרכה": "training",
  "תחזוקה": "maintenance",
  "אבטחה": "security",
};

export const BudgetResources = () => {
  const navigate = useNavigate();
  const { shibutzimData, loading } = useShibutzimContext();
  const budgetResources = useBudgetResources(shibutzimData ?? []);

  const resources: BudgetResource[] = useMemo(() => {
    return Object.entries(budgetResources).map(([categoryName, data]) => ({
      name: categoryName,
      quantity: data.totalQuantity,
      cost: data.totalCost,
    }));
  }, [budgetResources]);

  // ================= States =================
  if (loading) return <div>Loading...</div>;

  if (!shibutzimData) {
    return <ErrorState message="לא נטען מידע" />;
  }

  if (!resources.length) {
    return <EmptyState message="אין משאבים להצגה" />;
  }

  // ================= Render =================
  return (
    <div className={style.budgetResources}>
      <h4>משאבים תקציב</h4>

      <div className={style.grid}>
        {resources.map((resource) => (
          <BudgetResourceCard
            key={resource.name}
            resource={resource}
            headerColor={headerColors[resource.name]}
            onClick={() =>
              navigate(`/details/budget-resources/${resourceNames[resource.name]}`)
            }
          />
        ))}
      </div>
    </div>
  );
};