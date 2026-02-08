import { useNavigate } from 'react-router-dom';

// Importation de l'objet styles
import styles from "@/style/components/gantpage/Header.module.css";
// import "@/style/components/shared/ControlsPanel.css"
import { ControlsPanel } from '../shared/ControlsPanel';

interface HeadeProps {
    onMapClick: () => void
}

export function Header({ onMapClick }: HeadeProps) {

    const navigate = useNavigate();

    return (
        <header className={styles["header"]}>
            <div className={styles["header-actions"]}>
                <div className={styles["header-actions-primary"]}>
                    <i className={`bi bi-speedometer2 ${styles["header-icon"]}`}
                        onClick={() => navigate('/dashboard')}
                        title="Dashboard" />
                    <i className={`bi bi-funnel ${styles["header-icon"]}`} />
                    <i className={`bi bi-map ${styles["header-icon"]}`} onClick={onMapClick} title="legend" />
                    <i className={`bi bi-bell ${styles["header-icon"]}`} />
                    <i className={`bi bi-search ${styles["header-icon"]}`} />
                </div>
                <span className={styles["header-separator"]}></span>
                <div className={styles["header-actions-secondary"]}>
                    <i className={`bi bi-pencil ${styles["header-icon"]}`} />
                    <i className={`bi bi-bookmark ${styles["header-icon"]}`} />
                    <i className={`bi bi-arrow-clockwise ${styles["header-icon"]}`} />
                    <i className={`bi bi-printer ${styles["header-icon"]}`} />
                    <i className={`bi bi-camera ${styles["header-icon"]}`} />
                </div>
            </div>
            <i className={`${styles["control-icon"]} bi bi-grid ${styles["header-icon"]}`} /> 
            <div className={styles["header-time-controls"]}>
                <ControlsPanel />
            </div>
        </header>
    )
}