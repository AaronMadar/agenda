import { useMemo, useState } from "react";
import style from "../../../style/components/dashboard/dashboard-table/DashboardTable.module.css";
import { DownloadIcon } from "@/assets/icons";
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

    // ================= COLUMN SELECTOR =================
    const [openColumnSelector, setOpenColumnSelector] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const [selectedColumns, setSelectedColumns] = useState<string[]>(
        () => columns.map(c => c.label)
    );

    const selectedColumnObjects = useMemo(() => {
        return columns.filter(c => selectedColumns.includes(c.label));
    }, [columns, selectedColumns]);

    const sumColumn = (colLabel: string) => {
        return displayData.reduce(
            (sum, row) => sum + (Number(row[colLabel]) || 0),
            0
        );
    };

    const displayData = useMemo(() => {
        if (!data) return [];

        let result = data;

        if (showOnlyFavorites) {
            result = result.filter(row => favoriteRows.has(row.id));
        }

        if (searchText.trim()) {
            const lowerSearch = searchText.toLowerCase();

            result = result.filter(row =>
                selectedColumnObjects.some(col => {
                    const value = row[col.label];
                    if (value == null) return false;

                    return String(value)
                        .toLowerCase()
                        .includes(lowerSearch);
                })
            );
        }

        return result;
    }, [data, showOnlyFavorites, searchText, favoriteRows, selectedColumnObjects]);

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

                {/* ================= COLUMN SELECT ================= */}
                <div className={style.chooseColumn}>
                    <div
                        className={style.chooseColumnHeader}
                        onClick={(e) => {
                            setAnchorEl(e.currentTarget);
                            setOpenColumnSelector(prev => !prev);
                        }}
                    >
                        בחר עמודות להצגה
                    </div>

                    <DropdownMultiSelect
                        search
                        options={columns.map(c => c.label)}
                        selectedOptions={selectedColumns}
                        onChange={setSelectedColumns}
                        open={openColumnSelector}
                        anchorEl={anchorEl}
                        onClose={() => setOpenColumnSelector(false)}
                    />
                </div>
            </div>

            {/* ================= TABLE ================= */}
            <div className={style.tableBody}>
                <div className={style.columnsHeaders}>
                    {favorites && (
                        <div className={style.favoriteSpaceHolder}></div>
                    )}

                    {selectedColumnObjects.map((col, index) => (
                        <div key={index} className={style.columnHeader}>
                            {col.label}
                        </div>
                    ))}
                </div>

                {displayData.map((row, rowIndex) => {
                    const hasBottomBorder =
                        showSum || rowIndex !== displayData.length - 1;

                    return (
                        <div
                            key={rowIndex}
                            className={style.tableRow}
                            style={{
                                borderBottom: hasBottomBorder
                                    ? "1px solid #ccc"
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

                            {selectedColumnObjects.map((col, colIndex) => (
                                <div
                                    key={colIndex}
                                    className={style.tableCell}
                                >
                                    {row[col.label]}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>

            {/* ================= SUM ================= */}
            {showSum && (
                <div className={style.sum}>
                    {favorites && (
                        <div className={style.favoriteSpaceHolder}>ס"ה</div>
                    )}

                    {selectedColumnObjects.map((col, index) => (
                        <div key={index} className={style.sumCell}>
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