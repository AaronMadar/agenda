import { BaseSelect } from "./BaseSelect";
import styles from "@/style/components/shared/Select.module.css";


interface SingleSelectProps {
  options: string[];
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function SingleSelect({
  options,
  value,
  onChange,
  label,
  placeholder = "בחר ערך",
}: SingleSelectProps) {
  return (
    <BaseSelect
      label={label}
      displayText={value || placeholder}
      placeholder={placeholder}
      isPlaceholder={!value}
    >
      {({ close }) => (
        <div className={styles.dropdownContent}>
          {options.map((option) => (
            <div
              key={option}
              className={styles.option}
              onClick={() => {
                onChange(option);
                close();
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </BaseSelect>
  );
}