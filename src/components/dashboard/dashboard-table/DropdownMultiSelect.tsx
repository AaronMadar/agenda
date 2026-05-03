import { useState, useEffect, useRef, useMemo } from "react";
import { SearchInput } from "./SearchInput";
import style from "@/style/components/dashboard/dashboard-table/DropdownMultiSelect.module.css";

type Option = string | { value: string; label: string };

type NormalizedOption = {
    value: string;
    label: string;
};

type DropdownMultiSelectProps = {
    search?: boolean;
    selectedOptions: string[];
    options?: Option[];
    positionRL?: number;
    onChange: (newSelected: string[]) => void;

    open: boolean;
    anchorEl: HTMLElement | null;
    onClose: () => void;
};

export const DropdownMultiSelect = ({
    search,
    selectedOptions,
    options,
    onChange,
    open,
    anchorEl,
    onClose,
    positionRL
}: DropdownMultiSelectProps) => {
    const [searchText, setSearchText] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const normalizedOptions: NormalizedOption[] = useMemo(() => {
        if (!options) return [];

        return options.map(opt => {
            if (typeof opt === "string") {
                return { value: opt, label: opt };
            }
            return opt;
        });
    }, [options]);

    const toggleOption = (value: string) => {
        if (selectedOptions.includes(value)) {
            onChange(selectedOptions.filter(o => o !== value));
        } else {
            onChange([...selectedOptions, value]);
        }
    };

    const allSelected = normalizedOptions.length
        ? normalizedOptions.every(opt => selectedOptions.includes(opt.value))
        : false;

    const toggleAll = () => {
        if (!normalizedOptions.length) return;

        if (allSelected) {
            onChange([]);
        } else {
            onChange(normalizedOptions.map(opt => opt.value));
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node) &&
                anchorEl &&
                !anchorEl.contains(e.target as Node)
            ) {
                onClose();
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, anchorEl, onClose]);

    if (!open || !anchorEl) return null;

    const rect = anchorEl.getBoundingClientRect();

    const filteredOptions = normalizedOptions.filter(opt =>
        opt.label.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div
            ref={dropdownRef}
            className={style.container}
            style={{
                position: "fixed",
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX + (positionRL || 0),
                zIndex: 1000
            }}
        >
            {search && (
                <SearchInput
                    value={searchText}
                    setValue={setSearchText}
                    placeholder="חיפוש..."
                    width="100%"
                />
            )}

            <div className={style.optionsList}>
                {normalizedOptions.length > 0 && (
                    <label className={style.option}>
                        <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={toggleAll}
                        />
                        <span className={style.checkmark}></span>
                        בחר הכל
                    </label>
                )}

                {filteredOptions.map(opt => (
                    <label key={opt.value} className={style.option}>
                        <input
                            type="checkbox"
                            checked={selectedOptions.includes(opt.value)}
                            onChange={() => toggleOption(opt.value)}
                        />
                        <span className={style.checkmark}></span>
                        {opt.label}
                    </label>
                ))}
            </div>
        </div>
    );
};