import { useState, useMemo } from "react";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";

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
    positionRL = 0
}: DropdownMultiSelectProps) => {
    const [searchText, setSearchText] = useState("");

    const normalizedOptions: NormalizedOption[] = useMemo(() => {
        if (!options) return [];

        return options.map(opt =>
            typeof opt === "string"
                ? { value: opt, label: opt }
                : opt
        );
    }, [options]);

    const filteredOptions = useMemo(() => {
        return normalizedOptions.filter(opt =>
            opt.label.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [normalizedOptions, searchText]);

    const toggleOption = (value: string) => {
        if (selectedOptions.includes(value)) {
            onChange(selectedOptions.filter(o => o !== value));
        } else {
            onChange([...selectedOptions, value]);
        }
    };

    const allSelected =
        normalizedOptions.length > 0 &&
        normalizedOptions.every(opt => selectedOptions.includes(opt.value));

    const toggleAll = () => {
        if (!normalizedOptions.length) return;

        if (allSelected) {
            onChange([]);
        } else {
            onChange(normalizedOptions.map(opt => opt.value));
        }
    };

    return (
        <Popper
            open={open}
            anchorEl={anchorEl}
            placement="bottom-start"
            style={{ zIndex: 1000 }}
            modifiers={[
                {
                    name: "offset",
                    options: {
                    offset: [positionRL || 0, 0], // [x, y]
                    },
                },
                {
                    name: "preventOverflow",
                    options: { boundary: "viewport" }
                },
                {
                    name: "flip",
                    options: { fallbackPlacements: ["top-start"] }
                }
            ]}
        >
            <ClickAwayListener onClickAway={onClose}>
                <div className={style.container}>
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
                                <span className={style.checkmark} />
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
                                <span className={style.checkmark} />
                                {opt.label}
                            </label>
                        ))}
                    </div>
                </div>
            </ClickAwayListener>
        </Popper>
    );
};