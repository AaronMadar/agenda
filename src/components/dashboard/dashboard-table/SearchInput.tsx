import { Search } from "@/assets/icons";
import style from "@/style/components/dashboard/dashboard-table/SearchInput.module.css";

type SearchInputProps = {
    value: string;
    setValue: (value: string) => void;
    placeholder?: string;
    width?: number | string;
};

export const SearchInput = ({
    value,
    setValue,
    placeholder = "חיפוש...",
    width = 200,
}: SearchInputProps) => {
    return (
        <div
            className={`${style.searchFilter} ${value ? style.hasText : ""}`}
            style={{ width }}
        >
            <Search className={style.searchIcon} />

            <input
                className={style.searchInput}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
};