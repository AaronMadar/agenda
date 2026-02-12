import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';

import styles from "@/style/components/gantpage/Header.module.css";
import { ControlsPanel } from '../shared/ControlsPanel';

interface HeadeProps {
    onMapClick: () => void
}

const handlePrint = () => {
    window.print();
};

export function Header({ onMapClick }: HeadeProps) {

    const navigate = useNavigate();

    return (
        <header className={styles["header"]}>
            <div className={styles["header-actions"]}>
                <div className={styles["header-actions-primary"]}>
                    <Tooltip title="לוח בקרה" arrow>
                        <i className={`bi bi-speedometer2 ${styles["header-icon"]}`}
                            onClick={() => navigate('/dashboard')} />
                    </Tooltip>
                    <Tooltip title="מסנן" arrow>
                        <i className={`bi bi-funnel ${styles["header-icon"]}`} />
                    </Tooltip>
                    <Tooltip title="מקרא" arrow>
                        <i className={`bi bi-map ${styles["little"]} ${styles["header-icon"]}`}
                            onClick={onMapClick} />
                    </Tooltip>
                    <Tooltip title="התראות" arrow>
                        <i className={`bi bi-bell ${styles["little"]} ${styles["header-icon"]}`} />
                    </Tooltip>
                    <Tooltip title="חיפוש" arrow>
                        <i className={`bi bi-search ${styles["little"]} ${styles["header-icon"]}`} />
                    </Tooltip>
                </div>

                <span className={styles["header-separator"]}></span>

                <div className={styles["header-actions-secondary"]}>
                    <Tooltip title="עריכה" arrow>
                        <i className={`bi bi-pencil ${styles["little"]} ${styles["header-icon"]}`} />
                    </Tooltip>
                    <Tooltip title="סימניה" arrow>
                        <i className={`bi bi-bookmark ${styles["little"]} ${styles["header-icon"]}`} />
                    </Tooltip>
                    <Tooltip title="רענון" arrow>
                        <i className={`bi bi-arrow-clockwise ${styles["header-icon"]}`} />
                    </Tooltip>
                    <Tooltip title="הדפסה" arrow>
                        <i
                            className={`bi bi-printer ${styles["little"]} ${styles["header-icon"]}`}
                            onClick={handlePrint} />
                    </Tooltip>
                    <Tooltip title="מצלמה" arrow>
                        <i className={`bi bi-camera ${styles["header-icon"]}`} />
                    </Tooltip>
                </div>
            </div>

            <i className={`${styles["control-icon"]} bi bi-grid ${styles["header-icon"]}`} />
            <div className={styles["header-time-controls"]}>
                <ControlsPanel />
            </div>
        </header>
    )
}


