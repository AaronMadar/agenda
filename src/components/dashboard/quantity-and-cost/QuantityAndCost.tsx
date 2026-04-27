import { useMemo } from "react";
import style from "@/style/components/dashboard/quantity-and-cost/QuantityAndCost.module.css";
import { QuantityCostCard } from "./QuantityCostCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { useShibutzimContext } from "@/contexts/ShibutzimContext";
import { useNavigate } from "react-router-dom"


export const QuantityAndCost = () => {
  const navigate = useNavigate();

  const { shibutzimData, loading } = useShibutzimContext();

  const summary = useMemo(() => {
    if (!shibutzimData) return null;

    let trainingCount = 0;
    let trainingCost = 0;
    let courseCount = 0;
    let courseCost = 0;

    shibutzimData.forEach(item => {
      const isTraining = item.serviceType === "אימון";
      const isCourse = item.serviceType === "הכשרה";

      if (isTraining) {
        trainingCount++;
        trainingCost += item.directCost + item.costOfItems;
      }

      if (isCourse) {
        courseCount++;
        courseCost += item.directCost + item.costOfItems;
      }
    });

    return {
      trainingCount,
      trainingCost,
      courseCount,
      courseCost
    };
  }, [shibutzimData]);

  if (loading) return <div>Loading...</div>;
  if (!shibutzimData || shibutzimData.length === 0) return <EmptyState message="אין נתוני כמות ועלות להצגה" />;

  return (
    <div className={style.quantityAndCostGrid}>
      <QuantityCostCard
        title="כמות אימונים"
        value={60}
        total={300}
        onClick={() => navigate("/details/training-quantity")}
      />

      <QuantityCostCard
        title="עלות אימונים"
        value={1_200_000}
        isMoney
        onClick={() => navigate("/details/training-cost")}
      />

      <QuantityCostCard
        title="כמות הכשרות"
        value={120}
        total={300}
        onClick={() => navigate("/details/course-quantity")}
      />

      <QuantityCostCard
        title="עלות הכשרות"
        value={summary?.courseCost || 0}
        isMoney
        onClick={() => navigate("/details/course-cost")}
      />
    </div>
  );
};