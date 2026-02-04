import { iconServiceType , type ServiceTypeKey } from "@/constants/icons";
import { forceColors } from "@/constants/colors";

import "@/style/components/gantpage/LegendPopup.css"

interface LegendProps {
    onClose:() => void;
    forceDisplayed: string[]
}


export function LegendPopup({ onClose  ,forceDisplayed}: LegendProps) {

    const serviceType = Object.keys(iconServiceType) 

    return (
        <div className="legend-popup">
            <div className="legend-header">
                <span>מקרא</span>
                <i className="bi bi-x-lg" onClick={onClose} style={{ cursor: 'pointer' }} />
            </div>

            <div className="legend-body">
                {/* Section Service Types */}
                <section className="section-tsvaim">
                    <h6>צבעים</h6>
                    <ul className="legend-list">
                        {Object.keys(forceColors).map(type => {
                            const isDisplayed = forceDisplayed.includes(type);
                            return (
                                <li key={type}>
                                    <span
                                        className="force-tag"
                                        style={{ 
                                            backgroundColor: isDisplayed 
                                                ? (forceColors[type] || forceColors['אחר']) 
                                                : '#cccccc', // Gray for not present
                                            opacity: isDisplayed ? 1 : 0.5 // Optional: reduce opacity for grayed-out items
                                        }}
                                    >
                                        {type}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>

                </section>

                <hr />

                {/* Section Force Colors */}
                <section className="force-container">
                    <h6>סוג שירות</h6>
                    <ul className="service-list">
                        {serviceType.map(type => (
                            <li key={type}>
                                <span className="span-icon-type">
                                    <i className={`${iconServiceType[type as ServiceTypeKey] || iconServiceType["דפולטיבי"]} me-2`} />
                                    {type}
                                </span>
                            </li>
                        ))}
                    </ul>

                </section>
            </div>
        </div>
    );
}