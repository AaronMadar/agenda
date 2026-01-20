import { useMemo } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/he';

import ShibutsCard from "./gant/ShibutsCard";

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

const calculatePosition = (start: string, rangeStart: Dayjs, rangeEnd: Dayjs): number => {
    const totalDays = rangeEnd.diff(rangeStart, 'day');
    const itemStart = dayjs(start);
    const visualStart = itemStart.isBefore(rangeStart) ? rangeStart : itemStart;
    const diff = visualStart.diff(rangeStart, 'day');
    return (diff / totalDays) * 100;
};

const calculateWidth = (start: string, end: string, rangeStart: Dayjs, rangeEnd: Dayjs): number => {
    const totalDays = rangeEnd.diff(rangeStart, 'day');
    const itemStart = dayjs(start);
    const itemEnd = dayjs(end);
    const visualStart = itemStart.isBefore(rangeStart) ? rangeStart : itemStart;
    const visualEnd = itemEnd.isAfter(rangeEnd) ? rangeEnd : itemEnd;
    let width = (visualEnd.diff(visualStart, 'day') / totalDays) * 100;
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

export default function Gant({ startDate, endDate }: GantProps) {
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

            {/* BATTALIONS ROWS */}
            {Object.entries(data).map(([gdudName, items]) => {
                const sortedItems = sortEventsByDate(displayEventInRange(items, sDate, eDate));


                return (
                    <div className="timezone gdudim" key={gdudName}>
                        <div className="div-side sidebar">{gdudName}</div>
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
            })}
        </div>
    );
}