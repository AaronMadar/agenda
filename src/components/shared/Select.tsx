import { useEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "@/style/components/shared/Select.module.css";

interface SelectProps {
  options: string[];
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function Select({
  options,
  value,
  onChange,
  label,
  placeholder = "בחר ערך",
}: SelectProps) {

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const displayText = value || placeholder;

  const handleSelect = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
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
            className={`${styles.text} ${!value ? styles.placeholder : ""}`}
          >
            {displayText}
          </span>

          <KeyboardArrowDownIcon
            className={`${styles.arrow} ${open ? styles.arrowUp : ""}`}
          />
        </div>

        {open && (
          <div className={styles.dropdown}>
            <div className={styles.dropdownContent}>
              {options.map((option) => (
                <div
                  key={option}
                  className={styles.option}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
