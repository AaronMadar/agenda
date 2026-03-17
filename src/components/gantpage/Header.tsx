
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import html2canvas from 'html2canvas';
import styles from "@/style/components/gantpage/Header.module.css";
import { ControlsPanel } from '../shared/ControlsPanel';
import { memo } from 'react';

interface HeaderProps {
    onMapClick: () => void
}


const handlePrint = () => {
    window.print();
};

const handleClickCamera = async () => {
    const appRoot = document.getElementById('root');
    if (!appRoot) return;

    const canvas = await html2canvas(appRoot, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: appRoot.scrollWidth,
        windowHeight: appRoot.scrollHeight,
        onclone: (clonedDoc) => {
            const header = clonedDoc.querySelector('header');
            if (header) header.style.display = 'none';

            const details = clonedDoc.querySelectorAll<HTMLElement>('[class*="variationContainer"], [class*="divDown"]');
            details.forEach(d => d.style.display = 'flex');
        }
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.download = `gantt-export-${new Date().getTime()}.png`;
    link.href = imgData;
    link.click(); 
};

export const Header = memo(({ onMapClick }: HeaderProps) => {

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
                        <i className={`bi bi-arrow-clockwise ${styles["header-icon"]}`} onClick={() => window.location.reload()} style={{ cursor: 'pointer' }} />
                    </Tooltip>
                    <Tooltip title="הדפסה" arrow>
                        <i
                            className={`bi bi-printer ${styles["little"]} ${styles["header-icon"]}`}
                            onClick={handlePrint} />
                    </Tooltip>
                    <Tooltip title="מצלמה" arrow>
                        <i className={`bi bi-camera ${styles["header-icon"]}`} onClick={handleClickCamera} style={{ cursor: 'pointer' }} />
                    </Tooltip>
                </div>
            </div>

            <i className={`${styles["control-icon"]} bi bi-grid ${styles["header-icon"]}`} />
            <div className={styles["header-time-controls"]}>
                <ControlsPanel />
            </div>
        </header>
    )
})
