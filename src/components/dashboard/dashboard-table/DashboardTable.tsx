import { useState } from 'react';
import style from '../../../style/components/dashboard/dashboard-table/DashboardTable.module.css'

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

    const [showColumns, setShowColumns] = useState<Set<string>>(new Set(columns.map(col => col.label)));
    const [selectedColumns, setSelectedColumns] = useState<Set<string>>(showColumns);
    const [openColumnSelector, setOpenColumnSelector] = useState(false);

    const sumColum = (colLabel: string) => {
        if (!data) return 0;
        return data.reduce((sum, row) => sum + (Number(row[colLabel]) || 0), 0);
    };

    return (
        <div className={style.container}>
            <div className={style.filters}>
                <div className={style.searchHolder}>
                    <div className={style.searchAndFavorites}>
                        <div className={style.searchFilter}>
                            search filter
                        </div>

                        {favorites && (
                            <label className={style.checkbox}>
                                <input type="checkbox" />
                                <span className={style.checkmark}></span>
                                הצג מועדפים בלבד
                            </label>
                        )}
                    </div>
                </div>

                <div className={style.csvIcon}>
                    download to csv icon
                </div>

                <div className={style.chooseColumn}>
                    <div className={`${style.upDownIcon} ${openColumnSelector ? style.open : ""}`} />
                    <div className={style.chooseColumnHeader} onClick={() => setOpenColumnSelector(prev => !prev)}>
                        בחר עמודות להצגה
                    </div>
                    <div className={style.columnsList}>
                    </div>
                </div>
            </div>

            <div className={style.tableBody}>
                <div className={style.columnsHeaders}>
                    {favorites && <div className={style.favoriteSpaceHolder}></div>}

                    {columns.map((col, index) => (
                        <div key={index} className={style.columnHeader}>
                            {col.label}
                            {col.searchable && (
                                <div className={style.columnSearch}>
                                    +
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {data && data.map((row, rowIndex) => (
                    <div key={rowIndex} className={style.tableRow}>
                        
                        {/* ⭐ FAVORITE TOGGLE */}
                        {favorites && (
                            <label className={style.favoriteCheckbox}>
                                <input
                                    type="checkbox"
                                    checked={favoriteRows.has(rowIndex)}
                                    onChange={() => onToggleFavorite?.(rowIndex)}
                                />
                                <span className={style.favoriteMark}></span>
                            </label>
                        )}

                        {columns.map((col, colIndex) => (
                            <div key={colIndex} className={style.tableCell}>
                                {row[col.label]}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {showSum && (
                <div className={style.sum}>
                    {favorites && <div className={style.favoriteSpaceHolder}></div>}
                    {columns.map((col, index) => (
                        <div key={index} className={style.sumCell}>
                            {col.sumable && (
                                <span className={style.sumValue}>
                                    {sumColum(col.label)}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};