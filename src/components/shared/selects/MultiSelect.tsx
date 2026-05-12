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
  const toggleOption = (optionId: string) => {
    const newValue = value.includes(optionId)
      ? value.filter((id) => id !== optionId)
      : [...value, optionId];
    onChange(newValue);
  };

  const getDisplayText = () => {
    if (value.length === 0) return placeholder;
    if (value.length <= 2) return options.filter(o => value.includes(o.id)).map(o => o.name).join(", ");
    return `${placeholder} [${value.length}]`;
  };

  return (
    <BaseSelect
      displayText={getDisplayText()}
      placeholder={placeholder}
      isPlaceholder={value.length === 0}
    >
      {({ close }) => (
        <>
          <div className={styles.dropdownContent}>
            {options.map((option) => (
              <div
                key={option.id}
                className={styles.option}
                onClick={() => toggleOption(option.id)}
              >
                <div className={styles.optionFlex}>
                  <span>{option.name}</span>
                  {value.includes(option.id) && (
                    <CheckIcon className={styles.check} sx={{ fontSize: 21 }} />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.footer}>
            <div className={styles.footerButtons}>
              <button className={styles.resetButton} onClick={() => onChange([])}>
                איפוס
              </button>
              <button className={styles.confirmButton} onClick={() => close()}>
                סגור
              </button>
            </div>
          </div>
        </>
      )}
    </BaseSelect>
  );
}