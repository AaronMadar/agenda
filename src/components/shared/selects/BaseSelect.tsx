import { useEffect, useRef, useState, type ReactNode } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "@/style/components/shared/Select.module.css";


interface BaseSelectProps {
  label?: string;
  displayText: string;
  placeholder?: string;
  isPlaceholder?: boolean;
  children: (actions: { close: () => void }) => ReactNode;
}

export function BaseSelect({
  label,
  displayText,
  placeholder = "בחר ערך",
  isPlaceholder,
  children,
}: BaseSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const close = () => setOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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