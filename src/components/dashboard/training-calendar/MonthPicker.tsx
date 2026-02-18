import { useEffect, useRef, useState, useLayoutEffect } from "react";
import type { RefObject } from "react";
import { Tooltip } from "@mui/material";
import { createPortal } from "react-dom";
import dayjs from "dayjs";
import { Check, Today } from "@mui/icons-material";
import style from "@/style/components/dashboard/training-calendar/monthPicker.module.css";

interface MonthPickerProps {
  value: dayjs.Dayjs;
  open: boolean;
  onClose: () => void;
  onChange: (newMonth: dayjs.Dayjs) => void;
  anchorRef: RefObject<HTMLButtonElement | null>;
}

export const MonthPicker = ({
  value,
  open,
  onClose,
  onChange,
  anchorRef,
}: MonthPickerProps) => {
  const [tempMonth, setTempMonth] = useState(value.month());
  const [tempYear, setTempYear] = useState(value.year());

  const [coords, setCoords] = useState({ top: 0, left: 0, isUp: false });

  const ref = useRef<HTMLDivElement | null>(null);
  const activeMonthRef = useRef<HTMLDivElement | null>(null);
  const activeYearRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTempMonth(value.month());
    setTempYear(value.year());
  }, [value]);

  useLayoutEffect(() => {
    if (open && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const isUp = spaceBelow < 250;

      setCoords({
        top: isUp ? rect.top : rect.bottom,
        left: rect.right,
        isUp,
      });
    }
  }, [open, anchorRef]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        activeMonthRef.current?.scrollIntoView({
          block: "nearest",
        });
        activeYearRef.current?.scrollIntoView({
          block: "nearest",
        });
      });
    }
  }, [open, tempMonth, tempYear]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const months = dayjs.months();
  const years = Array.from({ length: 21 }, (_, i) => value.year() - 10 + i);

  const pickerContent = (
    <div
      ref={ref}
      className={`${style.monthPicker} ${coords.isUp ? style.up : style.down}`}
      style={{
        position: "fixed",
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        transform: coords.isUp
          ? "translate(-100%, calc(-100% - 8px))"
          : "translateX(-100%)",
        marginTop: coords.isUp ? "0" : "8px",
      }}
    >
      <div className={style.btns}>
        <Tooltip
          title="אישור"
          arrow
          placement="top"
          slotProps={{
            popper: {
              sx: { zIndex: 20000 },
            },
          }}
        >
          <button
            className={style.actionBtn}
            onClick={() => {
              onChange(dayjs().year(tempYear).month(tempMonth));
              onClose();
            }}
          >
            <Check fontSize="small" />
          </button>
        </Tooltip>

        <Tooltip
          title="היום"
          arrow
          placement="top"
          slotProps={{
            popper: {
              sx: { zIndex: 20000 },
            },
          }}
        >
          <button
            className={style.actionBtn}
            onClick={() => {
              onChange(dayjs());
              onClose();
            }}
          >
            <Today fontSize="small" />
          </button>
        </Tooltip>
      </div>

      <div className={style.columns}>
        <div className={style.column}>
          {months.map((m, i) => (
            <div
              key={m}
              ref={i === tempMonth ? activeMonthRef : null}
              className={`${style.item} ${
                i === tempMonth ? style.active : ""
              }`}
              onClick={() => setTempMonth(i)}
            >
              {m}
            </div>
          ))}
        </div>

        <div className={`${style.column} ${style.yearsColumn}`}>
          {years.map((y) => (
            <div
              key={y}
              ref={y === tempYear ? activeYearRef : null}
              className={`${style.item} ${
                y === tempYear ? style.active : ""
              }`}
              onClick={() => setTempYear(y)}
            >
              {y}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return createPortal(pickerContent, document.body);
};
