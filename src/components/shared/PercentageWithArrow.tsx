import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import style from "@/style/components/shared/PercentageWithArrow.module.css";

interface PercentageWithArrowProps {
  value: number;
}

export const PercentageWithArrow = ({ value }: PercentageWithArrowProps) => {
  const isNegative = value < 0;

  return (
    <div className={`${style.percentage} ${isNegative ? style.minus : ""}`}>
      {isNegative ? <TrendingDownIcon /> : <TrendingUpIcon />}
      {Math.abs(value)}%
    </div>
  );
};
