import { useEffect, useRef, useState, type ReactNode } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "@/style/components/shared/Select.module.css";

type CloseReason = "outside" | "action";

interface BaseSelectProps {
  label?: string;
  displayText: string;
  placeholder?: string;
  isPlaceholder?: boolean;
  onClose?: (reason: CloseReason) => void;
  children: (actions: { close: (reason?: CloseReason) => void }) => ReactNode;
}

export function BaseSelect({
  label,
  displayText,
  placeholder = "בחר ערך",
  isPlaceholder,
  onClose,
  children,
}: BaseSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const close = (reason: CloseReason = "action") => {
    setOpen(false);
    onClose?.(reason);
  };

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        close("outside");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.container}>
        <div
          className={styles.trigger}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span
            className={`${styles.text} ${
              isPlaceholder ? styles.placeholder : ""
            }`}
          >
            {displayText || placeholder}
          </span>

          <KeyboardArrowDownIcon
            className={`${styles.arrow} ${open ? styles.arrowUp : ""}`}
          />
        </div>

        {open && (
          <div className={styles.dropdown}>
            {children({ close })}
          </div>
        )}
      </div>
    </div>
  );
}