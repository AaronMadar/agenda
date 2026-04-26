import { useMemo, useState, useRef, useEffect } from "react";
import style from "../../../style/components/dashboard/dashboard-table/DashboardTable.module.css";
import { ArrowDownIcon, DownloadIcon, DrillIcon } from "@/assets/icons";
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
    isDrillable?: boolean;
    favorites?: boolean;

    favoriteRows?: Set<number>;
    onToggleFavorite?: (rowIndex: number) => void;
};

export const DashboardTable = ({
    columns,
    data,
    showSum = true,
    isDrillable = true,
    favorites = true,
    favoriteRows = new Set(),
    onToggleFavorite
}: DashboardTableProps) => {
    const tableBodyRef = useRef<HTMLDivElement>(null);
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
    const [searchText, setSearchText] = useState("");

    // ================= COLUMN VISIBILITY =================
    const [openColumnSelector, setOpenColumnSelector] = useState(false);

    const [selectedColumns, setSelectedColumns] = useState<string[]>(
        () => columns.map(c => c.label)
    );

    // ================= PER COLUMN FILTER =================
    const [columnFilters, setColumnFilters] = useState<Record<string, string[]>>({});
    const [openColumnFilter, setOpenColumnFilter] = useState<string | null>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const selectedColumnObjects = useMemo(() => {
        return columns.filter(c => selectedColumns.includes(c.label));
    }, [columns, selectedColumns]);

    // ================= GRID TEMPLATE =================
    const gridTemplate = useMemo(() => {
        const cols = selectedColumnObjects.length;

        let template = `repeat(${cols}, minmax(150px, 1fr))`

        if (favorites) template = `40px ${template}`
        if (isDrillable) template = `${template} 100px`

        return template
    }, [selectedColumnObjects, favorites, isDrillable]);

    // ================= UNIQUE VALUES =================
    const getFilteredOptions = (colLabel: string) => {
        if (!data) return [];

        let result = data;

        // favorites
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

        // column filters (חוץ מהעמודה הנוכחית!)
        Object.entries(columnFilters).forEach(([col, values]) => {
            if (!values.length || col === colLabel) return;

            result = result.filter(row =>
                values.includes(String(row[col]))
            );
        });

        // עכשיו מחלץ ערכים ייחודיים רק ממה שנשאר
        return Array.from(
            new Set(
                result
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

    useEffect(() => {
        const tableBody = tableBodyRef.current;
        if (!tableBody) return;

        const handleWheel = (e: WheelEvent) => {
            const target = e.target as HTMLElement;

            if (target.closest('[role="listbox"]')) return;

            if (isDropdownOpen) return;

            const isInsideTable =
                target.closest(`.${style.columnsHeaders}`) ||
                target.closest(`.${style.sum}`);

            if (!isInsideTable) return;

            if (Math.abs(e.deltaY) > 0) {
                e.preventDefault();
                tableBody.scrollLeft += e.deltaY * 0.4;
            }
        };

        tableBody.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            tableBody.removeEventListener("wheel", handleWheel);
        };
    }, [isDropdownOpen]);

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

                <div className={style.recordsCount}>
                    {`מציג ${displayData.length} מתוך ${data?.length || 0} רשומות`}
                </div>

                <DownloadIcon className={style.csvIcon} />

                <div className={style.resetFilters} onClick={resetFilters}>
                    איפוס סינונים
                </div>

                {/* COLUMN SELECTOR */}
                <div className={style.chooseColumn}>
                    <div
                        className={style.chooseColumnHeader}
                        onClick={(e) => {
                            setAnchorEl(e.currentTarget);
                            setIsDropdownOpen(true);
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
                            onChange={(newSelected) => {
                                if (newSelected.length === 0) return;
                                setSelectedColumns(newSelected);
                            }}
                            open={openColumnSelector}
                            anchorEl={anchorEl}
                            onClose={() => {
                                setOpenColumnSelector(false);
                                setIsDropdownOpen(false);
                            }}
                        />
                    )}
                </div>
            </div>

            {/* ================= TABLE ================= */}
            <div className={style.tableBody} ref={tableBodyRef}>
                <div
                    className={style.tableInner}
                    style={{ "--grid-template": gridTemplate } as React.CSSProperties}
                >
                    {/* HEADER */}
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
                                        setIsDropdownOpen(true);
                                        setOpenColumnFilter(prev =>
                                            prev === col.label ? null : col.label
                                        );
                                    }}
                                >
                                    <span>{col.label}</span>

                                    {col.searchable && (
                                        <ArrowDownIcon className={style.dropdownIcon} />
                                    )}
                                </div>

                                {openColumnFilter === col.label && (
                                    <DropdownMultiSelect
                                        positionRL={-70}
                                        search
                                        options={getFilteredOptions(col.label)}
                                        selectedOptions={columnFilters[col.label] || []}
                                        onChange={(newSelected) =>
                                            setColumnFilters(prev => ({
                                                ...prev,
                                                [col.label]: newSelected
                                            }))
                                        }
                                        open={true}
                                        anchorEl={anchorEl}
                                        onClose={() => {
                                            setOpenColumnFilter(null);
                                            setIsDropdownOpen(false);
                                        }}
                                    />
                                )}
                            </div>
                        ))}

                        {selectedColumns.length > 0 && isDrillable && (
                            <div className={style.drillHolder}>
                                פירוט נוסף
                            </div>
                        )}
                    </div>

                    {/* ROWS */}
                    <div className={style.rows}>
                        {selectedColumns.length > 0 && displayData.map((row, rowIndex) => {
                            const hasBottomBorder = showSum || rowIndex !== displayData.length - 1;

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
                                        <div className={style.tableCell}>
                                            <div className={style.cellText}>
                                                {row[col.label]}
                                            </div>
                                        </div>
                                    ))}

                                    {isDrillable && (
                                        <div className={style.drillHolder} title="פירוט נוסף">
                                            <DrillIcon className={style.drillIcon} />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* SUM */}
                    {showSum && (
                        <div className={style.sum}>
                            <div className={style.sumLabel}>סכום כולל</div>
                            {favorites && (
                                <div className={style.favoriteSpaceHolder}></div>
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

                            {isDrillable && (
                                <div className={style.drillHolder} title="פירוט נוסף">
                                    <DrillIcon className={style.drillIcon} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};