import style from "@/style/components/dashboard/quantity-and-cost/QuantityCostCard.module.css";
import { Swords, RefereeHat } from "@/assets/icons";

interface QuantityCostCardProps {
  title: string;
  value: number;
  total?: number;
  isMoney?: boolean;
  onClick?: () => void;
}

const formatValue = (value: number, isMoney?: boolean) => {
  if (!isMoney) return value.toString();

  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;

  return value.toString();
};

export const QuantityCostCard = ({
  title,
  value,
  total,
  isMoney,
  onClick
}: QuantityCostCardProps) => {
  const isTraining = title.includes("אימונים");
  const isAmount = title.includes("עלות");

  return (
    <div className={style.containerWrapper} onClick={onClick}>
      <div className={style.content}>

        <div className={`${style.iconBox} ${isAmount ? style.amount : ''}`}>
          {isTraining ? (
            <Swords className={style.icon} />
          ) : (
            <RefereeHat className={style.icon} />
          )}
        </div>

        <div className={style.textBox}>
          <div className={style.title}>{title}</div>

          {isMoney && (
            <div className={style.moneyValue}>
              {formatValue(value, true)}
            </div>
          )}

          {!isMoney && (
            <div className={style.value}>
              <div className={style.valueOnly}>
                {total ? `${formatValue(value)}` : formatValue(value)}
              </div>
              /
              <div className={style.total}>
                {formatValue(total!)}
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};