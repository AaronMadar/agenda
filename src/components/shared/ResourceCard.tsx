import type { CSSProperties } from "react";
import style from "@/style/components/shared/ResourceCard.module.css"
import { PercentageWithArrow } from "@/components/shared/PercentageWithArrow";


interface ResourceCardProps {
  resource: {
    name: string;
    amount: number;
    percentage: number;
  };
  noBackground?: boolean;
  externalStyle?: CSSProperties;
}

const convertToMOrK = (amount: number) => {
  if (amount >= 1_000_000) {
    return (amount / 1_000_000).toFixed(0) + "M";
  } else if (amount >= 1_000) {
    return (amount / 1_000).toFixed(0) + "K";
  } else {
    return amount.toString();
  }
}


export const ResourceCard = ({ resource, externalStyle, noBackground = false }: ResourceCardProps) => {
  return (
    <div
      style={externalStyle}
      className={`${style.containerWrapper} ${
        noBackground ? style.noBackground : ""
      }`}
    >
      <h4 className={style.header} >{resource.name}</h4>
      <div className={style.details}>
        <div className={style.amount}>{convertToMOrK(resource.amount)}</div>
        <PercentageWithArrow value={resource.percentage} />
      </div>
    </div>
  );
};
