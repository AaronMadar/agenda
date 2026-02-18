import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import style from "@/style/components/shared/PercentageWithArrow.module.css";
import { Tooltip } from "@mui/material";

interface PercentageWithArrowProps {
  value: number;
  gantMode?: boolean;
}

export const PercentageWithArrow = ({
  value,
  gantMode = false,
}: PercentageWithArrowProps) => {
  const isNegative = value < 0;
  const toolTipMsg = isNegative ? "ירידה לעומת שנה שעברה" : "עלייה לעומת שנה שעברה";

  return (
    <Tooltip
      title={toolTipMsg}
      arrow
      placement="top"
      slotProps={{
        popper: {
          sx: { zIndex: 20000 },
        },
      }}
    >
      <div
        className={`${style.percentage} ${isNegative ? style.minus : ""} ${gantMode ? style.gantMode : ""}`}
      >
        {isNegative ? <TrendingDownIcon /> : <TrendingUpIcon />}
        {Math.abs(value)}%
      </div>
    </Tooltip>
  );
};
