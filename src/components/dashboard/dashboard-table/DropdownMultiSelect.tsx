import { useState } from "react";
import { SearchInput } from "./SearchInput";
import style from "@/style/components/dashboard/dashboard-table/DropdownMultiSelect.module.css";

type DropdownMultiSelectProps = {
    search?: boolean;
    selectedOptions: string[];
    options?: string[];
    onChange: (newSelected: string[]) => void;
};

export const DropdownMultiSelect = ({
    search,
    selectedOptions,
    options,
    onChange
}: DropdownMultiSelectProps) => {
    const [searchText, setSearchText] = useState("");

    const toggleOption = (option: string) => {
        if (selectedOptions.includes(option)) {
            onChange(selectedOptions.filter(o => o !== option));
        } else {
            onChange([...selectedOptions, option]);
        }
    };

    return (
        <div className={style.container}>
            {search && (
                <SearchInput
                    value={searchText}
                    setValue={setSearchText}
                    placeholder="חיפוש..."
                    width={"100%"}
                />
            )}

            <div className={style.optionsList}>
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