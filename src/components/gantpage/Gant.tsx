import { useMemo } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/he';

import ShibutsCard from "./ShibutsCard";

import "@/style/components/gantpage/Gant.css";


// --- CONSTANT ---
const MIN_WIDTH_PERCENT = 5;
const NEAR_END_THRESHOLD = 75; // Seuil en % pour déclencher le centrage/ruban vers la gauche

// --- TYPES ---
interface EventItem {
    title: string;
    variationPastYear: string;
    ressource: string[];
    dateBegin: string;
    dateEnd: string;
}

interface GantProps {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
}

interface ResourceItem {
    item: string;
    quantity: number;
    price: number;
}

interface ShibutsApi {
    title: string;
    variationPastYear: number;
    dateBegin: string;
    dateEnd: string;
    ressource: ResourceItem[];
}

interface GdudApi {
    name: string;
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
    gdudim: GdudApi[];
}



// --- LOGIQUE (Savoir-faire utilitaire) ---

const displayEventInRange = (items: EventItem[], rangeStart: Dayjs, rangeEnd: Dayjs): EventItem[] => {
    return items.filter(item => {
        const itemStart = dayjs(item.dateBegin);
        const itemEnd = dayjs(item.dateEnd);
        return (itemEnd.isAfter(rangeStart) || itemEnd.isSame(rangeStart, 'day')) &&
            (itemStart.isBefore(rangeEnd) || itemStart.isSame(rangeEnd, 'day'));
    });
};

const sortEventsByDate = (items: EventItem[]): EventItem[] => {
    return [...items].sort((a, b) => dayjs(a.dateBegin).unix() - dayjs(b.dateBegin).unix());
};

const calculatePosition = (shibuts: ShibutsApi, rangeStart: Dayjs, rangeEnd: Dayjs): number => {
    const diffInRangeDays = rangeEnd.endOf("day").diff(rangeStart.startOf("day"), 'day');
    if (diffInRangeDays <= 15) {
        const totalDays = diffInRangeDays + 1;
        const itemStart = dayjs(shibuts.dateBegin);
        const visualStart = itemStart.isBefore(rangeStart) ? rangeStart : itemStart;
        const diff = visualStart.diff(rangeStart, 'day');
        return (diff / totalDays) * 100;
    }
    // We add 1 to include the end day in the width calculation 
    const totalDays = rangeEnd.endOf('month').diff(rangeStart.startOf('month'), 'day') + 1;
    const itemStart = dayjs(shibuts.dateBegin);
    const visualStart = itemStart.isBefore(rangeStart) ? rangeStart : itemStart;
    const diff = visualStart.diff(rangeStart, 'day');
    return (diff / totalDays) * 100;
};

const calculateWidth = (shibuts: ShibutsApi, rangeStart: Dayjs, rangeEnd: Dayjs): number => {
    const diffInRangeDays = rangeEnd.endOf("day").diff(rangeStart.startOf("day"), 'day');
    if (diffInRangeDays <= 15) {
        const totalDays = diffInRangeDays + 1;
        const itemStart = dayjs(shibuts.dateBegin);
        const itemEnd = dayjs(shibuts.dateEnd);
        const visualStart = itemStart.isBefore(rangeStart) ? rangeStart : itemStart;
        const visualEnd = itemEnd.isAfter(rangeEnd) ? rangeEnd : itemEnd;
        let width = ((visualEnd.diff(visualStart, 'day') + 1) / totalDays) * 100;
        return width < MIN_WIDTH_PERCENT ? MIN_WIDTH_PERCENT : width;

    }
    const totalDays = rangeEnd.endOf('month').diff(rangeStart.startOf('month'), 'day') + 1;
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

// --- COMPOSANT PRINCIPAL ---


export default function Gant({ data, startDate, endDate }: GantProps) {


    const currentYear = dayjs().year();
    const unity = "גבעתי";

    const sDate = startDate || dayjs(`${currentYear}-01-01`);
    const eDate = endDate || dayjs(`${currentYear}-12-31`);

    const data: Record<string, EventItem[]> = {
        "גדוד 1": [
            { title: "מפלג10 טירונות", variationPastYear: "15%", ressource: ["אוכל"], dateBegin: "2026-01-10", dateEnd: "2026-01-12" },
            { title: 'תדיר 82 תורן', variationPastYear: '25%', ressource: ["אופניים"], dateBegin: "2026-03-10", dateEnd: "2026-07-10" }
        ],
        "גדוד 2": [
            { title: "מפשט סדיר", variationPastYear: "10%", ressource: ["מיטוט"], dateBegin: "2026-05-10", dateEnd: "2026-10-10" }
        ]
    };

    const dates = useMemo(() => generateTicks(sDate, eDate), [sDate, eDate]);

    return (
        <div className="gant">
            {/* TIMELINE HEADER */}
            <div className="timezone">
                <div className="yehida div-side">{unity}</div>
                <div className="frise-wrapper">
                    {dates.map((date, i) => (
                        <div className="frise-tick" key={i}>
                            <span className="date-text">{date}</span>
                            <i className="bi bi-caret-up-fill arrow-icon"></i>
                        </div>
                    ))}
                </div>
            </div>

            {data?.gdudim.map((gdudData, index) => {
                // 1. On passe le tableau des shibutsim à la fonction de filtrage
                const filtered = getFilteredShibutsim(gdudData.shibutsim, sDate, eDate);
                if (filtered.length === 0) {
                    return null; // Ne pas afficher les lignes vides (gdud sans shibuts dans la plage de dates)
                }
                const sortedItems = sortEventsByDate(filtered);

                return (
                    <div className="timezone gdudim" key={gdudData.name || index}>
                        <div className="div-side sidebar">{gdudData.name}</div>
                        <div className="row-content-wrapper" style={{ position: 'relative', minHeight: '60px' }}>
                            {sortedItems.map((item, idx) => {
                                // On utilise nos fonctions avec l'objet "item" entier
                                const startPos = calculatePosition(item, sDate, eDate);
                                const width = calculateWidth(item, sDate, eDate);
                                const isNearEnd = (startPos + width) > NEAR_END_THRESHOLD;

                                // 2. Transformation des ressources (Array -> String, seulement les noms des items, séparées par ' | ')
                                const resourceString = item.ressource
                                    .map(r => r.item)
                                    .join(' | ');

                                return (
                                    <div key={idx} className="gant-row">
                                        <ShibutsCard
                                            title={item.title}
                                            variation={`${item.variationPastYear}%`}
                                            dateBegin={item.dateBegin}
                                            dateEnd={item.dateEnd}
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