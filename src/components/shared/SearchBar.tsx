import { useEffect, useRef } from 'react';

import { Search } from '@/assets/icons';
import style from '@/style/components/shared/SearchBar.module.css';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onClose?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
};

export const SearchBar = ({
  value,
  onChange,
  onClose,
  placeholder = 'Search...',
  autoFocus = true,
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  return (
    <div className={style.container}>
      <Search className={style.icon} />

      <input
        ref={inputRef}
        className={style.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />

      <button
        type="button"
        className={style.close}
        onClick={() => {
          onChange('');
          onClose?.();
        }}
      >
        ✕
      </button>
    </div>
  );
};
