import { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { BaseSelect } from "./BaseSelect";
import styles from "@/style/components/shared/Select.module.css";

interface MultiSelectProps {
  options: { id: string; name: string }[];
  value?: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = "בחר ערכים",
}: MultiSelectProps) {
  const [tempSelected, setTempSelected] = useState<string[]>(value);

  useEffect(() => {
    setTempSelected(value);
  }, [value]);

  const toggleOption = (option: { id: string; name: string }) => {
    setTempSelected((prev) =>
      prev.includes(option.id)
        ? prev.filter((item) => item !== option.id)
        : [...prev, option.id]
    );
  };

  const resetSelection = () => {
    setTempSelected([]);
  };

  const handleClose = (reason: "outside" | "action") => {
    if (reason === "outside") {
      setTempSelected(value);
    }
  };

  const getDisplayText = () => {
    if (tempSelected.length === 0) return placeholder;
    if (tempSelected.length <= 2) return tempSelected.map((id) => options.find((o) => o.id === id)?.name).filter(Boolean).join(", ");
    return `${placeholder} [${tempSelected.length}]`;
  };

  return (
    <BaseSelect
      displayText={getDisplayText()}
      placeholder={placeholder}
      isPlaceholder={tempSelected.length === 0}
      onClose={handleClose}
    >
      {({ close }) => (
        <>
          <div className={styles.dropdownContent}>
            {options.map((option) => {
              const selected = tempSelected.includes(option.id);

              return (
                <div
                  key={option.id}
                  className={styles.option}
                  onClick={() => toggleOption(option)}
                >
                  <div className={styles.optionFlex}>
                    <span>{option.name}</span>
                    {selected && (
                      <CheckIcon
                        className={styles.check}
                        sx={{ fontSize: 21 }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.footer}>
            <div className={styles.footerButtons}>
              <button
                className={styles.resetButton}
                onClick={resetSelection}
              >
                איפוס
              </button>

              <button
                className={styles.confirmButton}
                onClick={() => {
                  onChange(tempSelected);
                  close("action");
                }}
              >
                אישור
              </button>
            </div>
          </div>
        </>
      )}
    </BaseSelect>
  );
}