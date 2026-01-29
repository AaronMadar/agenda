import style from "@/style/components/dashboard/quantity-and-cost/QuantityAndCost.module.css";
import { ResourceCard } from "../../shared/ResourceCard";

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
                <ResourceCard resource={resource} noBackground />
            </div>
        ))}
    </div>
  );
};
