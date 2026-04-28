import style from "@/style/components/dashboard/budget-resources/BudgetResourceCard.module.css";

export interface BudgetResource {
  name: string;
  quantity: number;
  cost: number;
}

interface BudgetResourceCardProps {
  resource: BudgetResource;
  headerColor?: string;
  onClick?: () => void;
}

const formatNumber = (value: number) => {
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";
  if (value >= 1_000) return (value / 1_000).toFixed(1) + "K";
  return value.toString();
};

export const BudgetResourceCard = ({ resource, headerColor, onClick }: BudgetResourceCardProps) => {
  return (
    <div 
      className={style.card}
      onClick={onClick}
    >
      <h4 className={style.title} style={{ color: headerColor }}>
        {resource.name}
      </h4>

      <div className={style.row}>
        <div className={style.block}>
          <span className={style.label}>כמות</span>
          <span className={style.value}>
            {formatNumber(resource.quantity)}
          </span>
        </div>

        <div className={style.block}>
          <span className={style.label}>עלות</span>
          <span className={style.value}>
            {formatNumber(resource.cost)} <span className={style.currency}>₪</span>
          </span>
        </div>
      </div>
    </div>
  );
};