import { useState } from 'react';
import { PercentageWithArrow } from "@/components/shared/PercentageWithArrow";
import "@/style/components/gantpage/ShibutsCard.css";
import dayjs from 'dayjs';
import 'dayjs/locale/he';

interface ShibutsCardProps {
    title: string;
    variation?: string;
    dateBegin?: string;
    dateEnd?: string;
    resources?: string;
    style?: React.CSSProperties;
    className?: string;
    icon?: string;
}

export default function ShibutsCard({
    title, variation, dateBegin, dateEnd, resources, style, className, icon
}: ShibutsCardProps) {

    const [isHovered, setIsHovered] = useState(false);

    dayjs.locale('he');
    const formattedBegin = dateBegin ? `${dayjs(dateBegin).format('D MMM')}\`` : '';
    const formattedEnd = dateEnd ? `${dayjs(dateEnd).format('D MMM')}\`` : '';

    return (
        <div
            className={`shibuts-card ${className || ''}`}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="div-up">
                <div className="iconAndTitle">
                    <i className={`icon-card ${icon}`}></i>
                    <span className="card-title">{title}</span>
                </div>

                <div className={`variation-container ${isHovered ? 'visible' : 'hidden'}`}>
                    <PercentageWithArrow
                        value={variation ? parseFloat(variation) : 0}
                        gantMode
                    />
                </div>
            </div>
            <div className="div-down">
                {formattedBegin && formattedEnd && (
                    <span className="spanDate">{formattedBegin} - {formattedEnd}</span>
                )}
                {resources ? <span> | {resources}</span> : <span> | Aucune ressource</span>}
            </div>
        </div>
    );
}