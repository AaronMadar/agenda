import { useMemo, useState } from "react";
import style from "../../../style/components/dashboard/dashboard-table/DashboardTable.module.css";
import { ArrowDownIcon, DownloadIcon } from "@/assets/icons";
import { SearchInput } from "./SearchInput";
import { DropdownMultiSelect } from "./DropdownMultiSelect";

type Column = {
    label: string;
    searchable: boolean;
    sumable?: boolean;
};

type DashboardTableProps = {
    columns: Column[];
    data?: any[];
    showSum?: boolean;
    favorites?: boolean;

    favoriteRows?: Set<number>;
    onToggleFavorite?: (rowIndex: number) => void;
};

export const DashboardTable = ({
    columns,
    data,
    showSum = true,
    favorites = true,
    favoriteRows = new Set(),
    onToggleFavorite
}: DashboardTableProps) => {
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
    const [searchText, setSearchText] = useState("");

    // ================= COLUMN VISIBILITY (main selector) =================
    const [openColumnSelector, setOpenColumnSelector] = useState(false);

    const [selectedColumns, setSelectedColumns] = useState<string[]>(
        () => columns.map(c => c.label)
    );

    // ================= PER COLUMN FILTER =================
    const [columnFilters, setColumnFilters] = useState<Record<string, string[]>>({});

    const [openColumnFilter, setOpenColumnFilter] = useState<string | null>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const selectedColumnObjects = useMemo(() => {
        return columns.filter(c => selectedColumns.includes(c.label));
    }, [columns, selectedColumns]);

    // ================= UNIQUE VALUES PER COLUMN =================
    const getColumnOptions = (colLabel: string) => {
        if (!data) return [];

        return Array.from(
            new Set(
                data
                    .map(row => row[colLabel])
                    .filter(v => v != null)
                    .map(String)
            )
        );
    };

    // ================= FILTER DATA =================
    const displayData = useMemo(() => {
        if (!data) return [];

        let result = data;

        if (showOnlyFavorites) {
            result = result.filter(row => favoriteRows.has(row.id));
        }

        // global search
        if (searchText.trim()) {
            const lowerSearch = searchText.toLowerCase();

            result = result.filter(row =>
                selectedColumnObjects.some(col =>
                    String(row[col.label])
                        .toLowerCase()
                        .includes(lowerSearch)
                )
            );
        }

        // per-column filters
        Object.entries(columnFilters).forEach(([col, values]) => {
            if (!values.length) return;

            result = result.filter(row =>
                values.includes(String(row[col]))
            );
        });

        return result;
    }, [
        data,
        showOnlyFavorites,
        searchText,
        favoriteRows,
        selectedColumnObjects,
        columnFilters
    ]);

    const sumColumn = (colLabel: string) => {
        return displayData.reduce(
            (sum, row) => sum + (Number(row[colLabel]) || 0),
            0
        );
    };

    const resetFilters = () => {
        setShowOnlyFavorites(false);
        setSearchText("");
        setColumnFilters({});
        setSelectedColumns(columns.map(c => c.label));
    };

    return (
        <div className={style.container}>
            {/* ================= FILTERS ================= */}
            <div className={style.filters}>
                <div className={style.searchHolder}>
                    <div className={style.searchAndFavorites}>
                        <SearchInput
                            value={searchText}
                            setValue={setSearchText}
                            placeholder="חיפוש..."
                            width={200}
                        />

                        {favorites && (
                            <label className={style.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={showOnlyFavorites}
                                    onChange={(e) =>
                                        setShowOnlyFavorites(e.target.checked)
                                    }
                                />
                                <span className={style.checkmark}></span>
                                הצג מועדפים בלבד
                            </label>
                        )}
                    </div>
                </div>

                <DownloadIcon className={style.csvIcon} />

                <div className={style.resetFilters} onClick={resetFilters}>
                    איפוס סינונים
                </div>

                {/* ================= COLUMN SELECTOR (GLOBAL) ================= */}
                <div className={style.chooseColumn}>
                    <div
                        className={style.chooseColumnHeader}
                        onClick={(e) => {
                            setAnchorEl(e.currentTarget);
                            setOpenColumnSelector(prev => !prev);
                        }}
                    >
                        <div>בחר עמודות להצגה</div>
                        <ArrowDownIcon className={style.dropdownIcon} />
                    </div>

                    {openColumnSelector && (
                        <DropdownMultiSelect
                            positionRL={-10}
                            search
                            options={columns.map(c => c.label)}
                            selectedOptions={selectedColumns}
                            onChange={setSelectedColumns}
                            open={openColumnSelector}
                            anchorEl={anchorEl}
                            onClose={() => setOpenColumnSelector(false)}
                        />
                    )}
                </div>
            </div>

            {/* ================= TABLE ================= */}
            <div className={style.tableBody}>
                <div className={style.columnsHeaders}>
                    {favorites && (
                        <div className={style.favoriteSpaceHolder}></div>
                    )}

                    {selectedColumnObjects.map((col) => (
                        <div key={col.label} className={style.columnHeader}>
                            <div 
                                className={`${style.columnHeaderContent} ${col.searchable ? style.searchable : ""}`}
                                onClick={(e) => {
                                    if (!col.searchable) return;
                                    setAnchorEl(e.currentTarget);
                                    setOpenColumnFilter(prev => prev === col.label ? null : col.label);
                                }}>

                                <span>{col.label}</span>

                                {col.searchable && (
                                    <ArrowDownIcon className={style.dropdownIcon} />
                                )}
                            </div>

                            {/* ================= COLUMN FILTER DROPDOWN ================= */}
                            {openColumnFilter === col.label && (
                                <DropdownMultiSelect
                                    positionRL={-70}
                                    search
                                    options={getColumnOptions(col.label)}
                                    selectedOptions={
                                        columnFilters[col.label] || []
                                    }
                                    onChange={(newSelected) =>
                                        setColumnFilters(prev => ({
                                            ...prev,
                                            [col.label]: newSelected
                                        }))
                                    }
                                    open={true}
                                    anchorEl={anchorEl}
                                    onClose={() => setOpenColumnFilter(null)}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* ================= ROWS ================= */}
                {displayData.map((row, rowIndex) => {
                    const hasBottomBorder = showSum || rowIndex !== displayData.length -1;

                    return (
                        <div 
                            key={rowIndex} 
                            className={style.tableRow}
                            style={{
                                borderBottom: hasBottomBorder
                                    ? "1px solid #535a5b"  
                                    : "none"
                            }}
                            >
                            {favorites && (
                                <label className={style.favoriteCheckbox}>
                                    <input
                                        type="checkbox"
                                        checked={favoriteRows.has(row.id)}
                                        onChange={() =>
                                            onToggleFavorite?.(row.id)
                                        }
                                    />
                                    <span className={style.favoriteMark}></span>
                                </label>
                            )}

                            {selectedColumnObjects.map((col) => (
                                <div
                                    key={col.label}
                                    className={style.tableCell}
                                >
                                    {row[col.label]}
                                </div>
                            ))}
                        </div>
                    )
                })}
            </div>

            {/* ================= SUM ================= */}
            {showSum && (
                <div className={style.sum}>
                    {favorites && (
                        <div className={style.favoriteSpaceHolder}>ס"ה</div>
                    )}

                    {selectedColumnObjects.map((col) => (
                        <div key={col.label} className={style.sumCell}>
                            {col.sumable && (
                                <span className={style.sumValue}>
                                    {sumColumn(col.label)}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};