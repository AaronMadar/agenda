import React, { useState } from 'react';
import dayjs from 'dayjs';

import { PercentageWithArrow } from "@/components/shared/PercentageWithArrow";
import type { ResourceItem } from '@/types/api-response';
import { iconResources } from '@/constants/icons';

import "@/style/components/gantpage/ShibutsCard.css";


interface ShibutsCardProps {
    title: string;
    variation?: string;
    dateBegin?: string;
    dateEnd?: string;
    resources?: ResourceItem[];
    style?: React.CSSProperties;
    className?: string;
    icon?: string;
}

export function ShibutsCard({
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
              
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px',flexWrap: 'nowrap',overflow: 'hidden' }}>
                     {formattedBegin && formattedEnd && (
                    <span className="spanDate">{formattedBegin} - {formattedEnd}</span>
                )}

                    {resources && resources.length > 0 ? (
                        resources.map((res, index) => (
                            <div
                                key={index}
                                className='div-ressource'
                                style={{
                                   
                                    borderRight: index === 0 ? 'none' : '1px solid #ccc',
                                   
                                }}
                            >
                                <i className={iconResources[res.item as keyof typeof iconResources] ?? iconResources.default}></i>
                                <span>{res.item}</span>
                            </div>
                        ))
                    ) : (
                        <span style={{ color: '#888', fontStyle: 'italic' }}>אין משאבים</span>
                    )}
                </div>
                
                 
            </div>
        </div>
    );
}