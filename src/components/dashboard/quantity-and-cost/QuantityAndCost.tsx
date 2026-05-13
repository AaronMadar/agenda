import { useMemo } from "react";
import style from "@/style/components/dashboard/quantity-and-cost/QuantityAndCost.module.css";
import { QuantityCostCard } from "./QuantityCostCard";
import { useShibutzimContext } from "@/contexts/ShibutzimContext";
import { useNavigate } from "react-router-dom"


export const QuantityAndCost = () => {
  const navigate = useNavigate();

  const { shibutzimData, loading } = useShibutzimContext();

  const summary = useMemo(() => {
    let trainingCount = 0;
    let trainingCost = 0;
    let courseCount = 0;
    let courseCost = 0;

    shibutzimData?.forEach(sh => {
      const isTraining = sh.domain === "אימון";
      const isCourse = sh.domain === "הכשרה";

      if (isTraining) {
        trainingCount++;
        trainingCost += sh.directCost + sh.costOfItems;
      }

      if (isCourse) {
        courseCount++;
        courseCost += sh.directCost + sh.costOfItems;
      }
    });

    return {
      trainingCount,
      trainingCost,
      courseCount,
      courseCost
    };
  }, [shibutzimData]);

  return (
    <div className={style.quantityAndCostGrid}>
      <QuantityCostCard
        loading={loading}
        title="כמות אימונים"
        total={summary.trainingCount}
        onClick={() => navigate("/details/quantity-cost/training-quantity")}
      />

      <QuantityCostCard
        loading={loading}
        title="עלות אימונים"
        total={summary.trainingCost}
        onClick={() => navigate("/details/quantity-cost/training-cost")}
      />

      <QuantityCostCard
        loading={loading}
        title="כמות הכשרות"
        total={summary.courseCount}
        onClick={() => navigate("/details/quantity-cost/course-quantity")}
      />

      <QuantityCostCard
        loading={loading}
        title="עלות הכשרות"
        total={summary.courseCost}
        onClick={() => navigate("/details/quantity-cost/course-cost")}
      />
    </div>
  );
};