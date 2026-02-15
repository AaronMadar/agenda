import style from "@/style/components/dashboard/quantity-and-cost/QuantityCostCard.module.css";
import { ResourceCard } from "@/components/shared/ResourceCard";
import Swords from "@/assets/icons/Swords.svg?react";
import RefereeHat from "@/assets/icons/referee-hat.svg?react";


interface QuantityCostCardProps {
  resource: {
    name: string;
    amount: number;
    percentage: number;
  };
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

        <ResourceCard resource={resource} noBackground externalStyle={{flex: 1}} />

      </div>
    </div>
  );
};
