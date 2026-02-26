import { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { BaseSelect } from "./BaseSelect";
import styles from "@/style/components/shared/Select.module.css";


interface MultiSelectProps {
  options: string[];
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

  const toggleOption = (option: string) => {
    setTempSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const resetSelection = () => {
    setTempSelected([]);
    onChange([]);
  };

  const getDisplayText = () => {
    if (tempSelected.length === 0) return placeholder;
    if (tempSelected.length <= 2) return tempSelected.join(", ");
    return `${placeholder} [${tempSelected.length}]`;
  };

  return (
    <BaseSelect
      displayText={getDisplayText()}
      placeholder={placeholder}
      isPlaceholder={tempSelected.length === 0}
    >
      {({ close }) => (
        <>
          <div className={styles.dropdownContent}>
            {options.map((option) => {
              const selected = tempSelected.includes(option);

              return (
                <div
                  key={option}
                  className={styles.option}
                  onClick={() => toggleOption(option)}
                >
                  <div className={styles.optionFlex}>
                    <span>{option}</span>
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
                  close();
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