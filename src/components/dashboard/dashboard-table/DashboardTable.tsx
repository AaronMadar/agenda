import { useMemo, useState, useRef, useEffect } from "react";
import style from "../../../style/components/dashboard/dashboard-table/DashboardTable.module.css";
import { ArrowDownIcon, DownloadIcon, DrillIcon, SortIcon } from "@/assets/icons";
import { SearchInput } from "./SearchInput";
import { DropdownMultiSelect } from "./DropdownMultiSelect";

type Column = {
    label: string;
    accessor: string;
    searchable?: boolean;
    sumable?: boolean;
};

type DashboardTableProps = {
    columns: Column[];
    data?: any[];
    showSum?: boolean;
    isDrillable?: boolean;
    onRowClick?: (rowData: any) => void;
    favorites?: boolean;

    favoriteRows?: Set<number>;
    onToggleFavorite?: (rowIndex: number) => void;
};

export const DashboardTable = ({
    columns,
    data,
    showSum = false,
    isDrillable = false,
    favorites = false,
    favoriteRows = new Set(),
    onToggleFavorite,
    onRowClick
}: DashboardTableProps) => {
    const tableBodyRef = useRef<HTMLDivElement>(null);
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
    const [searchText, setSearchText] = useState("");

    // ================= SORT =================
    const [sortConfig, setSortConfig] = useState<{
        accessor: string | null;
        direction: "asc" | "desc" | null;
    }>({ accessor: null, direction: null });

    // ================= COLUMN VISIBILITY =================
    const [openColumnSelector, setOpenColumnSelector] = useState(false);

    const [selectedColumns, setSelectedColumns] = useState<string[]>(
        () => columns.map(c => c.accessor)
    );

    // ================= PER COLUMN FILTER =================
    const [columnFilters, setColumnFilters] = useState<Record<string, string[]>>({});
    const [openColumnFilter, setOpenColumnFilter] = useState<string | null>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const selectedColumnObjects = useMemo(() => {
        return columns.filter(c => selectedColumns.includes(c.accessor));
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
    const getFilteredOptions = (accessor: string) => {
        if (!data) return [];

        let result = data;

        if (showOnlyFavorites) {
            result = result.filter(row => favoriteRows.has(row.id));
        }

        if (searchText.trim()) {
            const lowerSearch = searchText.toLowerCase();

            result = result.filter(row =>
                selectedColumnObjects.some(col =>
                    String(row[col.accessor])
                        .toLowerCase()
                        .includes(lowerSearch)
                )
            );
        }

        Object.entries(columnFilters).forEach(([col, values]) => {
            if (!values.length || col === accessor) return;

            result = result.filter(row =>
                values.includes(String(row[col]))
            );
        });

        return Array.from(
            new Set(
                result
                    .map(row => row[accessor])
                    .filter(v => v != null)
                    .map(String)
            )
        );
    };

    // ================= FILTER + SORT DATA =================
    const displayData = useMemo(() => {
        if (!data) return [];

        let result = [...data];

        if (showOnlyFavorites) {
            result = result.filter(row => favoriteRows.has(row.id));
        }

        if (searchText.trim()) {
            const lowerSearch = searchText.toLowerCase();

            result = result.filter(row =>
                selectedColumnObjects.some(col =>
                    String(row[col.accessor])
                        .toLowerCase()
                        .includes(lowerSearch)
                )
            );
        }

        Object.entries(columnFilters).forEach(([col, values]) => {
            if (!values.length) return;

            result = result.filter(row =>
                values.includes(String(row[col]))
            );
        });

        // ===== SORT =====
        if (sortConfig.accessor && sortConfig.direction) {
            result.sort((a, b) => {
                const valA = a[sortConfig.accessor!];
                const valB = b[sortConfig.accessor!];

                if (valA == null) return 1;
                if (valB == null) return -1;

                if (!isNaN(valA) && !isNaN(valB)) {
                    return sortConfig.direction === "asc"
                        ? Number(valA) - Number(valB)
                        : Number(valB) - Number(valA);
                }

                return sortConfig.direction === "asc"
                    ? String(valA).localeCompare(String(valB))
                    : String(valB).localeCompare(String(valA));
            });
        }

        return result;
    }, [
        data,
        showOnlyFavorites,
        searchText,
        favoriteRows,
        selectedColumnObjects,
        columnFilters,
        sortConfig
    ]);

    const sumColumn = (accessor: string) => {
        return displayData.reduce(
            (sum, row) => sum + (Number(row[accessor]) || 0),
            0
        );
    };

    const resetFilters = () => {
        setShowOnlyFavorites(false);
        setSearchText("");
        setColumnFilters({});
        setSelectedColumns(columns.map(c => c.accessor));

        // RESET SORT
        setSortConfig({ accessor: null, direction: null });
    };

    // ================= SORT CLICK =================
    const handleSort = (accessor: string) => {
        setSortConfig(prev => {
            if (prev.accessor !== accessor) {
                return { accessor, direction: "asc" };
            }

            if (prev.direction === "asc") {
                return { accessor, direction: "desc" };
            }

            return { accessor: null, direction: null };
        });
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

    useEffect(() => {
        setSelectedColumns(columns.map(c => c.accessor));
    }, [columns]);

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
                            search
                            options={columns.map(c => ({
                                value: c.accessor,
                                label: c.label
                            }))}
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

                        {selectedColumnObjects.map((col) => {
                            const isActive = sortConfig.accessor === col.accessor;

                            return (
                                <div key={col.accessor} className={style.columnHeader}>
                                    <div
                                        className={`${style.columnHeaderContent} ${col.searchable ? style.searchable : ""}`}
                                        onClick={(e) => {
                                            if (!col.searchable) return;
                                            setAnchorEl(e.currentTarget);
                                            setIsDropdownOpen(true);
                                            setOpenColumnFilter(prev =>
                                                prev === col.accessor ? null : col.accessor
                                            );
                                        }}
                                    >
                                        <div 
                                            className={style.sortIconHolder}
                                            style={{
                                                background: isActive ? "rgba(130, 192, 255, 0.1)" : "transparent",
                                            }}
                                        >
                                            <SortIcon
                                                className={style.sortIcon}
                                                style={{
                                                    opacity: isActive ? 1 : 0.4,
                                                    transform:
                                                        isActive && sortConfig.direction === "desc"
                                                            ? "rotate(180deg)"
                                                            : "rotate(0deg)"
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSort(col.accessor);
                                                }}
                                            />
                                        </div>

                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <span>{col.label}</span>

                                            {col.searchable && (
                                                <ArrowDownIcon className={style.dropdownIcon} />
                                            )}
                                        </div>
                                    </div>

                                    {openColumnFilter === col.accessor && (
                                        <DropdownMultiSelect
                                            positionRL={-70}
                                            search
                                            options={getFilteredOptions(col.accessor)}
                                            selectedOptions={columnFilters[col.accessor] || []}
                                            onChange={(newSelected) =>
                                                setColumnFilters(prev => ({
                                                    ...prev,
                                                    [col.accessor]: newSelected
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
                            );
                        })}

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
                                        <div key={col.accessor} className={style.tableCell}>
                                            <div className={style.cellText}>
                                                {String(row[col.accessor] ?? "--")}
                                            </div>
                                        </div>
                                    ))}

                                    {isDrillable && (
                                        <div 
                                            className={style.drillHolder} 
                                            title="פירוט נוסף"
                                            onClick={() => onRowClick?.(row)}
                                        >
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
                                <div key={col.accessor} className={style.sumCell}>
                                    {col.sumable && (
                                        <span className={style.sumValue}>
                                            {sumColumn(col.accessor)}
                                        </span>
                                    )}
                                </div>
                            ))}

                            {isDrillable && (
                                <div 
                                    className={style.drillHolder} 
                                    title="פירוט נוסף"
                                    onClick={() => onRowClick?.({isSum: true})}
                                >
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