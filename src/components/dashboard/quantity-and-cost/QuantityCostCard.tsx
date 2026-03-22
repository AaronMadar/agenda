import style from "@/style/components/dashboard/quantity-and-cost/QuantityCostCard.module.css";
import { ResourceCard } from "@/components/shared/ResourceCard";
import { Swords, RefereeHat } from "@/assets/icons";
import type { Resource } from "../../shared/resourceCard.types";

interface QuantityCostCardProps {
  resource: Resource;
}

export const QuantityCostCard = ({ resource }: QuantityCostCardProps) => {
  return (
    <div className={style.containerWrapper}>
      <div className={style.content}>

        <div className={style.iconBox}>
            {resource.name.includes("אימונים") ?
                <Swords className={style.icon} /> :
                <RefereeHat className={style.icon} />
            }
        </div>

        <ResourceCard resource={resource} noBackground />

      </div>
    </div>
  );
};
