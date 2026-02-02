import { useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Check, Today } from "@mui/icons-material";
import style from "@/style/components/dashboard/training-calendar/monthPicker.module.css";

interface MonthPickerProps {
  value: Dayjs;
  open: boolean;
  onClose: () => void;
  onChange: (newMonth: Dayjs) => void;
}

export const MonthPicker = ({
  value,
  open,
  onClose,
  onChange,
}: MonthPickerProps) => {
  const [tempMonth, setTempMonth] = useState(value.month());
  const [tempYear, setTempYear] = useState(value.year());
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTempMonth(value.month());
    setTempYear(value.year());
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  if (!open) return null;

  const months = dayjs.months();
  const years = Array.from({ length: 21 }, (_, i) => value.year() - 10 + i);

  return (
    <div ref={ref} className={style.monthPicker}>
      <div className={style.btns}>
        <button
          title="אישור"
          className={`${style.actionBtn} ${style.confirmBtn}`}
          onClick={() => {
            onChange(dayjs().year(tempYear).month(tempMonth));
            onClose();
          }}
        >
          <Check fontSize="small" />
        </button>

        <button
          title="היום"
          className={`${style.actionBtn} ${style.todayBtn}`}
          onClick={() => {
            const today = dayjs();
            onChange(today);
            onClose();
          }}
        >
          <Today fontSize="small" />
        </button>
      </div>

      <div className={style.columns}>
        <div className={style.column}>
          {months.map((m, i) => (
            <div
              key={m}
              className={`${style.item} ${i === tempMonth ? style.active : ""}`}
              onClick={() => setTempMonth(i)}
            >
              {m}
            </div>
          ))}
        </div>

        <div className={style.column}>
          {years.map((y) => (
            <div
              key={y}
              className={`${style.item} ${y === tempYear ? style.active : ""}`}
              onClick={() => setTempYear(y)}
            >
              {y}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
