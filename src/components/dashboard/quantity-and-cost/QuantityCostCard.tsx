import { RefereeHat, Swords } from '@/assets/icons';
import { LoaderCircle } from '@/components/shared/loading/LoaderCircle';
import style from '@/style/components/dashboard/quantity-and-cost/QuantityCostCard.module.css';

interface QuantityCostCardProps {
  title: string;
  total: number;
  loading: boolean;
  onClick?: () => void;
}

const formatValue = (value: number) => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;

  return value.toString();
};

export const QuantityCostCard = ({
  title,
  total,
  loading,
  onClick,
}: QuantityCostCardProps) => {
  const isTraining = title.includes('אימונים');
  const isAmount = title.includes('עלות');

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

          {loading ? (
            <LoaderCircle size={20} />
          ) : (
            <div>{formatValue(total)}</div>
          )}
        </div>
      </div>
    </div>
  );
};
