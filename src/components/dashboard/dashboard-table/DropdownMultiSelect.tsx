import { useState, useEffect, useRef } from "react";
import { SearchInput } from "./SearchInput";
import style from "@/style/components/dashboard/dashboard-table/DropdownMultiSelect.module.css";

type DropdownMultiSelectProps = {
    search?: boolean;
    selectedOptions: string[];
    options?: string[];
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
    onClose
}: DropdownMultiSelectProps) => {
    const [searchText, setSearchText] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleOption = (option: string) => {
        if (selectedOptions.includes(option)) {
            onChange(selectedOptions.filter(o => o !== option));
        } else {
            onChange([...selectedOptions, option]);
        }
    };

    const allSelected = options?.length
        ? options.every(opt => selectedOptions.includes(opt))
        : false;

    const toggleAll = () => {
        if (!options) return;

        if (allSelected) {
            onChange([]);
        } else {
            onChange(options);
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

    return (
        <div
            ref={dropdownRef}
            className={style.container}
            style={{
                position: "absolute",
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
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
                {options && options.length > 0 && (
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

                {options
                    ?.filter(opt =>
                        opt.toLowerCase().includes(searchText.toLowerCase())
                    )
                    .map(opt => (
                        <label key={opt} className={style.option}>
                            <input
                                type="checkbox"
                                checked={selectedOptions.includes(opt)}
                                onChange={() => toggleOption(opt)}
                            />
                            <span className={style.checkmark}></span>
                            {opt}
                        </label>
                    ))}
            </div>
        </div>
    );
};