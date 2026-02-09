import { Gant } from "@/components/gantpage/Gant";
import { Header } from "@/components/gantpage/Header";

import "@/style/index.css"
import styles from "@/style/GantPage.module.css"

import { useCallback, useState } from "react";
import { LegendPopup } from "@/components/gantpage/gant/LegendPopup";


export function GantPage() {
    const [isLegendOpen, setIsLegendOpen] = useState<boolean>(false);
    const [forceDisplayed , setForceDisplayed] = useState<string[]>([])

    const toggleLegend = useCallback(() => {
        setIsLegendOpen(prev => !prev);
    }, []);

    return (
        <div className={styles["gantpage-container"]}>
            {/* On passe la fonction de modification au Header */}
            <Header onMapClick={toggleLegend} />
            
            <Gant setForceDisplayed={setForceDisplayed} />

            {/* La popup s'affiche ici si l'état est vrai */}
            {isLegendOpen && (
                <LegendPopup 
                    onClose={() => setIsLegendOpen(false)} 
                    forceDisplayed={forceDisplayed} 
                />
            )}
        </div>
    );
}