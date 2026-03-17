import { Gant } from "@/components/gantpage/Gant";
import { Header } from "@/components/gantpage/Header";

import "@/style/index.css"
import styles from "@/style/GantPage.module.css"

import { useCallback, useState } from "react";
import { LegendPopup } from "@/components/gantpage/gant/LegendPopup";
import TimeLineHeader from "@/components/gantpage/TimeLineHeader";


export function GantPage() {
    const [isLegendOpen, setIsLegendOpen] = useState<boolean>(false);
    const [forceDisplayed , setForceDisplayed] = useState<string[]>([])

    const toggleLegend = useCallback(() => {
        setIsLegendOpen(prev => !prev);
    }, []);

    return (
        <div className={styles["gantpage-container"]}>
            <Header onMapClick={toggleLegend} />
            <TimeLineHeader />
            
            <Gant setForceDisplayed={setForceDisplayed} />

            {isLegendOpen && (
                <LegendPopup 
                    onClose={() => setIsLegendOpen(false)} 
                    forceDisplayed={forceDisplayed} 
                />
            )}
        </div>
    );
}