import style from "@/style/components/dashboard/quantity-and-cost/QuantityAndCost.module.css";
import { QuantityCostCard } from "./QuantityCostCard";

interface QuantityAndCostProps {
  quantityAndCost?: {
    name: string;
    amount: number;
    percentage: number;
  }[];
}

export const QuantityAndCost = ({ quantityAndCost }: QuantityAndCostProps) => {
  return (
    <div className={style.quantityAndCostGrid}>
        {quantityAndCost?.map(resource => (
            <div className={style.cell} key={resource.name}>
                <QuantityCostCard resource={resource} />
            </div>
        ))}
    </div>
  );
};
