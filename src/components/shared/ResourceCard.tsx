import style from "@/style/components/shared/ResourceCard.module.css"
import { PercentageWithArrow } from "@/components/shared/PercentageWithArrow";


interface ResourceCardProps {
  resource: {
    name: string;
    amount: number;
    percentage: number;
  };
  noBackground?: boolean;
}


export const ResourceCard = ({ resource, noBackground = false }: ResourceCardProps) => {
  return (
    <div
      className={`${style.containerWrapper} ${
        noBackground ? style.noBackground : ""
      }`}
    >
      <h4 className={style.header} >{resource.name}</h4>
      <div className={style.details}>
        <div className={style.amount}>{resource.amount}M</div>
        <PercentageWithArrow value={resource.percentage} />
      </div>
    </div>
  );
};
