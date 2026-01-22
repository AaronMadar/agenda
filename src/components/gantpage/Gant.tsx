import { useEffect, useMemo, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/he';

import ShibutsCard from "./gant/ShibutsCard";
import { iconResources, iconServiceType } from "@/constants/icons";
import { forceColors } from "@/constants/colors";
import { translateKeyMap } from "@/constants/translation";


import "@/style/components/gantpage/Gant.css";


// --- CONSTANT ---
const MIN_WIDTH_PERCENT = 5;
const NEAR_END_THRESHOLD = 75; // Seuil en % pour déclencher le centrage/ruban vers la gauche


interface GantProps {
    data: ApiResponse | null;
    startDate: Dayjs | null;
    endDate: Dayjs | null;
}

interface ShibutsApi {
    title: string;
    variationPastYear: number;
    dateBegin: string;
    dateEnd: string;
    ressource: Record<string, { quantity: number; price: number }>;
}

interface GdudApi {
    forceType: string;
    pikud: string;
    shibutsim: ShibutsApi[];
}

interface ApiResponse {
    unit: string;
    period: {
        start: string;
        end: string;
    };
    gdudim: Record<string, GdudApi>;
}



// --- LOGIQUE (Savoir-faire utilitaire) ---

// On change les types pour correspondre à une liste de missions (ShibutsApi)
const getFilteredShibutsim = (shibutsim: ShibutsApi[], rangeStart: Dayjs, rangeEnd: Dayjs): ShibutsApi[] => {
    return shibutsim.filter(shibut => {
        const itemStart = dayjs(shibut.dateBegin);
        const itemEnd = dayjs(shibut.dateEnd);

        // La logique de comparaison est parfaite ! 
        return (itemEnd.isAfter(rangeStart) || itemEnd.isSame(rangeStart, 'day')) &&
               (itemStart.isBefore(rangeEnd) || itemStart.isSame(rangeEnd, 'day'));
    });
};

const sortEventsByDate = (items: ShibutsApi[]): ShibutsApi[] => {
    return [...items].sort((a, b) => dayjs(a.dateBegin).unix() - dayjs(b.dateBegin).unix());
};

const calculatePosition = (shibuts: ShibutsApi, rangeStart: Dayjs, rangeEnd: Dayjs): number => {
   // We add 1 to include the end day in the width calculation 
    const totalDays = rangeEnd.diff(rangeStart, 'day') + 1;
    const itemStart = dayjs(shibuts.dateBegin);
    const visualStart = itemStart.isBefore(rangeStart) ? rangeStart : itemStart;
    const diff = visualStart.diff(rangeStart, 'day');
    return (diff / totalDays) * 100;
};

const calculateWidth = (shibuts: ShibutsApi, rangeStart: Dayjs, rangeEnd: Dayjs): number => {
    const totalDays = rangeEnd.diff(rangeStart, 'day') + 1;
    const itemStart = dayjs(shibuts.dateBegin);
    const itemEnd = dayjs(shibuts.dateEnd);
    const visualStart = itemStart.isBefore(rangeStart) ? rangeStart : itemStart;
    const visualEnd = itemEnd.isAfter(rangeEnd) ? rangeEnd : itemEnd;
    let width = ((visualEnd.diff(visualStart, 'day')+1) / totalDays) * 100;
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



export default function Gant({ data, startDate, endDate }: GantProps) {

    
    const currentYear = dayjs().year();

    const sDate = startDate || dayjs(`${currentYear}-01-01`);
    const eDate = endDate || dayjs(`${currentYear}-12-31`);

    const dates = useMemo(() => generateTicks(sDate, eDate), [sDate, eDate]);

    return (
        <div className="gant">
            {/* TIMELINE HEADER */}
            <div className="timezone">
                <div className="yehida div-side">{data?.unit}</div>
                <div className="frise-wrapper">
                    {dates.map((date, i) => (
                        <div className="frise-tick" key={i}>
                            <span className="date-text">{date}</span>
                            <i className="bi bi-caret-up-fill arrow-icon"></i>
                        </div>
                    ))}
                </div>
            </div>

            
            {/* {Object.entries(data?.gdudim || []).map(([gdud, index]) => {
                const sortedItems = sortEventsByDate(getFilteredShibutsim(gdud, sDate, eDate));


                return (
                    <div className="timezone gdudim" key={gdud}>
                        <div className="div-side sidebar">{gdud}</div>
                        <div className="row-content-wrapper" style={{ overflow: 'visible' }}>
                            {sortedItems.map((item, idx) => {
                                const startPos = calculatePosition(item.dateBegin, sDate, eDate);
                                const width = calculateWidth(item.dateBegin, item.dateEnd, sDate, eDate);

                                const isNearEnd = (startPos + width) > NEAR_END_THRESHOLD;
                                return (
                                    <div key={idx} className="gant-row" >
                                        <ShibutsCard
                                            title={item.title}
                                            variation={item.variationPastYear}
                                            // On transforme le tableau en string pour ShibutsCard
                                            resources={item.ressource.join(', ')}
                                            style={{
                                                position: 'absolute',
                                                insetInlineStart: isNearEnd ? 'auto' : `${startPos}%`,
                                                insetInlineEnd: isNearEnd ? `${100 - (startPos + width)}%` : 'auto',
                                                width: `${calculateWidth(item.dateBegin, item.dateEnd, sDate, eDate)}%`,
                                                top: 0,
                                                zIndex: 10 // Base z-index
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })} */}

            {Object.entries(data?.gdudim || {}).map(([gdudName, gdudData]) => {
    // 1. On passe le tableau des shibutsim à la fonction de filtrage
    const filtered = getFilteredShibutsim(gdudData.shibutsim, sDate, eDate);
    const sortedItems = sortEventsByDate(filtered);

    return (
        <div className="timezone gdudim" key={gdudName}>
            <div className="div-side sidebar">{gdudName}</div>
            <div className="row-content-wrapper" style={{ position: 'relative', minHeight: '60px' }}>
                {sortedItems.map((item, idx) => {
                    // On utilise nos fonctions avec l'objet "item" entier
                    const startPos = calculatePosition(item, sDate, eDate);
                    const width = calculateWidth(item, sDate, eDate);
                    const isNearEnd = (startPos + width) > NEAR_END_THRESHOLD;

                    // 2. Transformation des ressources (Objet -> String)
                    const resourceString = item.ressource
                        .map(r => `${r.item} (${r.quantity})`)
                        .join(', ');

                    return (
                        <div key={idx} className="gant-row">
                            <ShibutsCard
                                title={item.title}
                                variation={`${item.variationPastYear}%`}
                                resources={resourceString}
                                style={{
                                    position: 'absolute',
                                    // Utilisation de insetInline pour gérer le RTL/LTR proprement
                                    insetInlineStart: isNearEnd ? 'auto' : `${startPos}%`,
                                    insetInlineEnd: isNearEnd ? `${100 - (startPos + width)}%` : 'auto',
                                    width: `${width}%`,
                                    top: 0
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
})}
        </div>
    );
}

