import { useEffect, useState } from "react";
import style from "@/style/components/dashboard/quantity-and-cost/QuantityAndCost.module.css";
import { QuantityCostCard } from "./QuantityCostCard";
import { getQuantityAndCost } from "@/api/dashboard.api";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";

interface Resource {
  name: string;
  amount: number;
  percentage: number;
}

export const QuantityAndCost = () => {
  const [data, setData] = useState<Resource[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getQuantityAndCost();
        setData(result);
      } catch (err) {
        console.error("Failed to load quantity and cost", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <ErrorState message={error} />;
  if (!data || data.length === 0) return <EmptyState message="אין נתוני כמות ועלות להצגה" />;

  return (
    <div className={style.quantityAndCostGrid}>
      {data.map(resource => (
        <div className={style.cell} key={resource.name}>
          <QuantityCostCard resource={resource} />
        </div>
      ))}
    </div>
  );
};