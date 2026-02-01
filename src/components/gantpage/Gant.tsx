import { useMemo } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import dayjs, { Dayjs } from 'dayjs';

import {ShibutsCard} from "./gant/ShibutsCard";
import { iconServiceType } from "@/constants/icons";
import { forceColors } from "@/constants/colors";
import type { ShibutsApi } from '@/types/api-response';
import { useDateRange } from '@/contexts/DateRangeContext';


import "@/style/components/gantpage/Gant.css";


// --- CONSTANT ---
const MIN_WIDTH_PERCENT = 5;
const NEAR_END_THRESHOLD = 75;

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



export function Gant() {

    const {
        startDate,
        endDate,
        data,
    } = useDateRange();


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

            {data?.gdudim.map((gdudData, index) => {
                const filteredShibutsim = getFilteredShibutsim(gdudData.shibutsim, sDate, eDate);
                if (filteredShibutsim.length === 0) {
                    return null; 
                }
                const sortedShibutsim = sortEventsByDate(filteredShibutsim);
                return (
                    <div className="timezone gdudim" key={gdudData.name || index}>
                        <div className="div-side sidebar">{gdudData.name}</div>
                        <div className="row-content-wrapper" >
                            {sortedShibutsim.map((shibuts, idx) => {
                                const startPos = calculatePosition(shibuts, sDate, eDate);
                                const width = calculateWidth(shibuts, sDate, eDate);
                                const isNearEnd = (startPos + width) > NEAR_END_THRESHOLD;


                                const resourcesArray = shibuts.resource;

                                return (
                                    <div key={idx} className="gant-row">
                                        <ShibutsCard
                                            title={shibuts.title}
                                            variation={`${shibuts.variationPastYear}%`}
                                            dateBegin={shibuts.dateBegin}
                                            dateEnd={shibuts.dateEnd}
                                            resources={resourcesArray}
                                            icon={iconServiceType[
                                                shibuts.seviceType as keyof typeof iconServiceType
                                            ] ?? iconServiceType.default}
                                            style={{
                                                backgroundColor: forceColors[gdudData.forceType] as keyof typeof forceColors || forceColors.default,
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

