// import { useMemo , memo, useEffect } from 'react';

// import { Box, Skeleton } from '@mui/material';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import dayjs, { Dayjs } from 'dayjs';

// import { ShibutsCard } from "./gant/ShibutsCard";
// import { iconServiceType } from "@/constants/icons";
// import { forceColors } from "@/constants/colors";
// import type { ShibutsApi } from '@/types/api-response';
// import { useDateRange } from '@/contexts/DateRangeContext';

// // Importation du module CSS
// import styles from "@/style/components/gantpage/Gant.module.css";


// // --- CONSTANT ---
// const MIN_WIDTH_PERCENT = 5;
// const NEAR_END_THRESHOLD = 75;

// const getFilteredShibutsim = (shibutsim: ShibutsApi[], rangeStart: Dayjs, rangeEnd: Dayjs): ShibutsApi[] => {
//     return shibutsim.filter(shibut => {
//         const itemStart = dayjs(shibut.dateBegin);
//         const itemEnd = dayjs(shibut.dateEnd);

//         return (itemEnd.isAfter(rangeStart) || itemEnd.isSame(rangeStart, 'day')) &&
//             (itemStart.isBefore(rangeEnd) || itemStart.isSame(rangeEnd, 'day'));
//     });
// };

// const sortEventsByDate = (items: ShibutsApi[]): ShibutsApi[] => {
//     return [...items].sort((a, b) => dayjs(a.dateBegin).unix() - dayjs(b.dateBegin).unix());
// };

// const calculatePosition = (shibuts: ShibutsApi, rangeStart: Dayjs, rangeEnd: Dayjs): number => {
//     const diffInRangeDays = rangeEnd.endOf("day").diff(rangeStart.startOf("day"), 'day');
//     if (diffInRangeDays <= 15) {
//         const totalDays = diffInRangeDays + 1;
//         const itemStart = dayjs(shibuts.dateBegin);
//         const visualStart = itemStart.isBefore(rangeStart) ? rangeStart : itemStart;
//         const diff = visualStart.diff(rangeStart, 'day');
//         return (diff / totalDays) * 100;
//     }
//     const totalDays = rangeEnd.endOf('month').diff(rangeStart.startOf('month'), 'day') + 1;
//     const itemStart = dayjs(shibuts.dateBegin);
//     const visualStart = itemStart.isBefore(rangeStart) ? rangeStart : itemStart;
//     const diff = visualStart.diff(rangeStart, 'day');
//     return (diff / totalDays) * 100;
// };

// const calculateWidth = (shibuts: ShibutsApi, rangeStart: Dayjs, rangeEnd: Dayjs): number => {
//     const diffInRangeDays = rangeEnd.endOf("day").diff(rangeStart.startOf("day"), 'day');
//     if (diffInRangeDays <= 15) {
//         const totalDays = diffInRangeDays + 1;
//         const itemStart = dayjs(shibuts.dateBegin);
//         const itemEnd = dayjs(shibuts.dateEnd);
//         const visualStart = itemStart.isBefore(rangeStart) ? rangeStart : itemStart;
//         const visualEnd = itemEnd.isAfter(rangeEnd) ? rangeEnd : itemEnd;
//         let width = ((visualEnd.diff(visualStart, 'day') + 1) / totalDays) * 100;
//         return width < MIN_WIDTH_PERCENT ? MIN_WIDTH_PERCENT : width;

//     }
//     const totalDays = rangeEnd.endOf('month').diff(rangeStart.startOf('month'), 'day') + 1;
//     const itemStart = dayjs(shibuts.dateBegin);
//     const itemEnd = dayjs(shibuts.dateEnd);
//     const visualStart = itemStart.isBefore(rangeStart) ? rangeStart : itemStart;
//     const visualEnd = itemEnd.isAfter(rangeEnd) ? rangeEnd : itemEnd;
//     let width = ((visualEnd.diff(visualStart, 'day') + 1) / totalDays) * 100;
//     return width < MIN_WIDTH_PERCENT ? MIN_WIDTH_PERCENT : width;
// };

// const generateTicks = (start: Dayjs, end: Dayjs): string[] => {
//     dayjs.locale('he');
//     const ticks: string[] = [];
//     const diffInDays = end.diff(start, 'day');

//     if (diffInDays <= 15) {
//         let current = start.clone();
//         while (!current.isAfter(end.add(1, 'day'))) {
//             ticks.push(current.format('D MMM'));
//             current = current.add(1, 'day');
//         }
//     } else {
//         let current = start.startOf('month');
//         while (!current.isAfter(end.add(1, 'month'))) {
//             ticks.push(current.format('MMM'));
//             current = current.add(1, 'month');
//         }
//     }
//     return ticks;
// };

// type gantProps = {
//     setForceDisplayed: (forces: string[]) => void;
// }

// export const Gant = memo(function Gant({setForceDisplayed}: gantProps) {

//     const {
//         startDate,
//         endDate,
//         data,
//         loading,
//     } = useDateRange();


//     const currentYear = dayjs().year();
//     const sDate = startDate || dayjs(`${currentYear}-01-01`);
//     const eDate = endDate || dayjs(`${currentYear}-12-31`);


//     const dates = useMemo(() => generateTicks(sDate, eDate), [sDate, eDate]);

//     const displayedForces = useMemo(() => {
//         if (!data?.gdudim) return [];
//         const forces = new Set<string>();
//         data.gdudim.forEach((gdudData) => {
//             const filteredShibutsim = getFilteredShibutsim(gdudData.shibutsim, sDate, eDate);
//             if (filteredShibutsim.length > 0 && gdudData.forceType) {
//                 forces.add(gdudData.forceType);
//             }
//         });
//         return Array.from(forces);
//     }, [data, sDate, eDate]);

//        useEffect(() => {
//             setForceDisplayed(displayedForces);
//         }, [displayedForces, setForceDisplayed]);

//     return (
//         <div className={styles["gant-container"]}>
//             {/* TIMELINE HEADER */}
//             <div className={styles["timeline-header"]}>
//                 <div className={`${styles["unit-title"]} ${styles["div-side"]}`}>{data?.unit}</div>
//                 <div className={styles["ticks-container"]}>
//                     {dates.map((date, i) => (
//                         <div className={styles["timeline-tick"]} key={i}>
//                             <span className={styles["tick-label"]}>{date}</span>
//                             <i className={`bi bi-caret-up-fill ${styles["arrow-icon"]}`}></i>
//                         </div>
//                     ))}
//                 </div>
//             </div>


//             {/*LOADING STATE*/ }
//             {loading && (
//                 <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
//                     {[1, 2, 3, 4, 5].map((i) => (
//                         <div className={`${styles["timeline-header"]} ${styles["gdudim"]}`} key={i} style={{ borderBottom: '1.9px solid rgb(87, 82, 82)' }}>

//                             {/* SIDEBAR */}
//                             <div className={`${styles["div-side"]} ${styles["sidebar"]}`}>
//                                 <Skeleton
//                                     variant="text"
//                                     width="50%"
//                                     sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}
//                                 />
//                             </div>

//                             {/* CONTENT */}
//                             <div className={styles["row-content-wrapper"]}>
//                                 <Skeleton
//                                     variant="rounded"
//                                     animation="wave"
//                                     sx={{
//                                         position: 'absolute',
//                                         height: '55px',
//                                         borderRadius: '20px',
//                                         bgcolor: 'rgba(255, 255, 255, 0.04)',
//                                         '&::after': {
//                                             background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.03), transparent) !important',
//                                         },
//                                         width: `${15 + (i * 7) % 20}%`,
//                                         insetInlineStart: `${5 + (i * 18) % 65}%`,
//                                         pointerEvents: 'none'
//                                     }}
//                                 />
//                             </div>
//                         </div>
//                     ))}
//                 </Box>
//             )}


//             {data?.gdudim.map((gdudData, index) => {
//                 const filteredShibutsim = getFilteredShibutsim(gdudData.shibutsim, sDate, eDate);
//                 if (filteredShibutsim.length === 0) {
//                     return null;
//                 }
//                 const contentToDisplay = sortEventsByDate(filteredShibutsim);
//                 return (
//                     <div className={`${styles["timeline-header"]} ${styles["gdudim"]}`} key={gdudData.name || index}>
//                         <div className={`${styles["div-side"]} ${styles["sidebar"]}`}>{gdudData.name}</div>
//                         <div className={styles["row-content-wrapper"]} >
//                             {contentToDisplay.map((shibuts, idx) => {
//                                 const startPos = calculatePosition(shibuts, sDate, eDate);
//                                 const width = calculateWidth(shibuts, sDate, eDate);
//                                 const isNearEnd = (startPos + width) > NEAR_END_THRESHOLD;


//                                 const resourcesArray = shibuts.resource;

//                                 return (
//                                     <div key={idx} className={styles["gant-row"]}>
//                                         <ShibutsCard
//                                             title={shibuts.title}
//                                             variation={`${shibuts.variationPastYear}%`}
//                                             dateBegin={shibuts.dateBegin}
//                                             dateEnd={shibuts.dateEnd}
//                                             resources={resourcesArray}
//                                             icon={iconServiceType[
//                                                 shibuts.seviceType as keyof typeof iconServiceType
//                                             ] ?? iconServiceType["דפולטיבי"]}
//                                             style={{
//                                                 backgroundColor: forceColors[gdudData.forceType] as keyof typeof forceColors || forceColors.default,
//                                                 insetInlineStart: isNearEnd ? 'auto' : `${startPos}%`,
//                                                 insetInlineEnd: isNearEnd ? `${100 - (startPos + width)}%` : 'auto',
//                                                 width: `${width}%`,
//                                                 top: 0
//                                             }}
//                                         />
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }
// ) 


import { useMemo, memo, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import dayjs, { Dayjs } from 'dayjs';

import { ShibutsCard } from "./gant/ShibutsCard";
import { iconServiceType } from "@/constants/icons";
import { forceColors } from "@/constants/colors";
import type { ShibutsApi } from '@/types/api-response';
import { useDateRange } from '@/contexts/DateRangeContext';

// Importation du module CSS
import styles from "@/style/components/gantpage/Gant.module.css";

// --- CONSTANTES ---
const MIN_WIDTH_PERCENT = 5;
const NEAR_END_THRESHOLD = 75;

// --- UTILS (Calculs purs hors du composant pour la performance) ---
const getFilteredShibutsim = (shibutsim: ShibutsApi[], rangeStart: Dayjs, rangeEnd: Dayjs): ShibutsApi[] => {
    return shibutsim.filter(shibut => {
        const itemStart = dayjs(shibut.dateBegin);
        const itemEnd = dayjs(shibut.dateEnd);
        return (itemEnd.isAfter(rangeStart) || itemEnd.isSame(rangeStart, 'day')) &&
            (itemStart.isBefore(rangeEnd) || itemStart.isSame(rangeEnd, 'day'));
    });
};

const sortEventsByDate = (items: ShibutsApi[]): ShibutsApi[] => {
    return [...items].sort((a, b) => dayjs(a.dateBegin).unix() - dayjs(b.dateBegin).unix());
};

const calculatePosition = (shibuts: ShibutsApi, rangeStart: Dayjs, rangeEnd: Dayjs): number => {
    const diffInRangeDays = rangeEnd.endOf("day").diff(rangeStart.startOf("day"), 'day');
    const totalDays = diffInRangeDays <= 15 ? (diffInRangeDays + 1) : (rangeEnd.endOf('month').diff(rangeStart.startOf('month'), 'day') + 1);
    const itemStart = dayjs(shibuts.dateBegin);
    const visualStart = itemStart.isBefore(rangeStart) ? rangeStart : itemStart;
    const diff = visualStart.diff(rangeStart, 'day');
    return (diff / totalDays) * 100;
};

const calculateWidth = (shibuts: ShibutsApi, rangeStart: Dayjs, rangeEnd: Dayjs): number => {
    const diffInRangeDays = rangeEnd.endOf("day").diff(rangeStart.startOf("day"), 'day');
    const totalDays = diffInRangeDays <= 15 ? (diffInRangeDays + 1) : (rangeEnd.endOf('month').diff(rangeStart.startOf('month'), 'day') + 1);
    const itemStart = dayjs(shibuts.dateBegin);
    const itemEnd = dayjs(shibuts.dateEnd);
    const visualStart = itemStart.isBefore(rangeStart) ? rangeStart : itemStart;
    const visualEnd = itemEnd.isAfter(rangeEnd) ? rangeEnd : itemEnd;
    let width = ((visualEnd.diff(visualStart, 'day') + 1) / totalDays) * 100;
    return width < MIN_WIDTH_PERCENT ? MIN_WIDTH_PERCENT : width;
};

const generateTicks = (start: Dayjs, end: Dayjs): string[] => {
    dayjs.locale('he');
    const ticks: string[] = [];
    const diffInDays = end.diff(start, 'day');
    if (diffInDays <= 15) {
        let current = start.clone();
        while (!current.isAfter(end.add(1, 'day'))) {
            ticks.push(current.format('D MMM'));
            current = current.add(1, 'day');
        }
    } else {
        let current = start.startOf('month');
        while (!current.isAfter(end.add(1, 'month'))) {
            ticks.push(current.format('MMM'));
            current = current.add(1, 'month');
        }
    }
    return ticks;
};

type gantProps = {
    setForceDisplayed: (forces: string[]) => void;
}

export const Gant = memo(function Gant({ setForceDisplayed }: gantProps) {
    const { startDate, endDate, data, loading } = useDateRange();

    const currentYear = dayjs().year();
    const sDate = startDate || dayjs(`${currentYear}-01-01`);
    const eDate = endDate || dayjs(`${currentYear}-12-31`);

    const dates = useMemo(() => generateTicks(sDate, eDate), [sDate, eDate]);


    const rowsToDisplay = useMemo(() => {
        if (!data?.gdudim) return [];
        return data.gdudim.map((gdudData) => {

            const filtered = getFilteredShibutsim(gdudData.shibutsim, sDate, eDate);
            if (filtered.length === 0) return null;
            return {
                ...gdudData,
                contentToDisplay: sortEventsByDate(filtered)
            };
        }).filter((row): row is NonNullable<typeof row> => row !== null);
    }, [data, sDate, eDate]);

    const displayedForces = useMemo(() => {
        const forces = new Set<string>();
        rowsToDisplay.forEach((row) => {
            if (row.forceType) forces.add(row.forceType);
        });
        return Array.from(forces);
    }, [rowsToDisplay]);

    useEffect(() => {
        setForceDisplayed(displayedForces);
    }, [displayedForces, setForceDisplayed]);



    return (


        <div className={styles["gant-container"]}>

            {/* TIMELINE HEADER */}
            <div className={styles["timeline-header"]}>
                <div className={`${styles["unit-title"]} ${styles["div-side"]}`}>{data?.unit}</div>
                <div className={styles["ticks-container"]}>
                    {dates.map((date, i) => (
                        <div className={styles["timeline-tick"]} key={i}>
                            <span className={styles["tick-label"]}>{date}</span>
                            <i className={`bi bi-caret-up-fill ${styles["arrow-icon"]}`}></i>
                        </div>
                    ))}
                </div>
            </div>

            {/*LOADING STATE*/}
            {loading && (
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

                    {[1, 2, 3, 4, 5,6,7,8,9,10].map((i) => (
                        <div className={`${styles["timeline-header"]} ${styles["gdudim"]}`} key={i} style={{ borderBottom: '1.9px solid rgb(87, 82, 82)' }}>

                            {/* SIDEBAR */}
                            <div className={`${styles["div-side"]} ${styles["sidebar"]}`}>
                                <Skeleton
                                    variant="text"
                                    width="50%"
                                    sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}
                                />
                            </div>

                            {/* CONTENT */}
                            <div className={styles["row-content-wrapper"]}>
                                <Skeleton
                                    variant="rounded"
                                    animation="wave"
                                    sx={{
                                        position: 'absolute',
                                        height: '2.9rem',
                                        borderRadius: '10px',
                                        bgcolor: 'rgb(71, 71, 71)',
                                        '&::after': {
                                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.03), transparent) !important',
                                        },
                                        width: `${15 + (i * 7) % 20}%`,
                                        insetInlineStart: `${5 + (i * 18) % 65}%`,
                                        pointerEvents: 'none'
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </Box>
            )}







            {rowsToDisplay.map((row) => (
                <div className={`${styles["timeline-header"]} ${styles["gdudim"]}`} key={row.name}>
                    <div className={`${styles["div-side"]} ${styles["sidebar"]}`}>{row.name}</div>
                    <div className={styles["row-content-wrapper"]}>
                        {row.contentToDisplay.map((shibuts) => {
                            const startPos = calculatePosition(shibuts, sDate, eDate);
                            const width = calculateWidth(shibuts, sDate, eDate);
                            const isNearEnd = (startPos + width) > NEAR_END_THRESHOLD;

                            return (
                                <div key={shibuts.codeShibuts} className={styles["gant-row"]}>
                                    <ShibutsCard
                                        title={shibuts.title}
                                        variation={`${shibuts.variationPastYear}%`}
                                        dateBegin={shibuts.dateBegin}
                                        dateEnd={shibuts.dateEnd}
                                        resources={shibuts.resource}
                                        icon={iconServiceType[shibuts.seviceType as keyof typeof iconServiceType] ?? iconServiceType["דפולטיבי"]}
                                        style={{
                                            backgroundColor: forceColors[row.forceType as keyof typeof forceColors] || forceColors.default,
                                            insetInlineStart: isNearEnd ? 'auto' : `${startPos}%`,
                                            insetInlineEnd: isNearEnd ? `${100 - (startPos + width)}%` : 'auto',
                                            width: `${width}%`,
                                            top: 0,

                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
});
