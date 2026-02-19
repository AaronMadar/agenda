import { iconServiceType , type ServiceTypeKey } from "@/constants/icons";
import { forceColors } from "@/constants/colors";

// Importation du module CSS
import styles from "@/style/components/gantpage/LegendPopup.module.css";

interface LegendProps {
    onClose:() => void;
    forceDisplayed: string[]
}

export function LegendPopup({ onClose, forceDisplayed }: LegendProps) {

    const serviceType = Object.keys(iconServiceType) 

    return (
        <div className={styles["legend-popup"]}>
            <div className={styles["legend-header"]}>
                <span>מקרא</span>
                <i className="bi bi-x-lg" onClick={onClose} style={{ cursor: 'pointer' }} />
            </div>

            <div className={styles["legend-body"]}>
                {/* Section Service Types */}
                <section className={styles["section-tsvaim"]}>
                    <h6>צבעים</h6>
                    <ul className={styles["legend-list"]}>
                        {Object.keys(forceColors).map(type => {
                            const isDisplayed = forceDisplayed.includes(type);
                            return (
                                <li key={type}>
                                    <span
                                        className={styles["force-tag"]}
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
                <section className={styles["force-container"]}>
                    <h6>סוג שירות</h6>
                    <ul className={styles["service-list"]}>
                        {serviceType.map(type => (
                            <li key={type}>
                                <span className={styles["span-icon-type"]}>
                                    <i className={`${iconServiceType[type as ServiceTypeKey].className } ${styles["me-2"]}`} />
                                    {type != "default" ? type : iconServiceType.default.otherName}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
}