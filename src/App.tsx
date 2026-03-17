import { Routes, Route } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/he";

import { DateRangeProvider  } from "@/contexts/DateRangeContext";
// import { ControlsProvider } from "@/contexts/ControlsContext";
import { GantPage } from '@/pages/GantPage'
import { Dashboard } from '@/pages/Dashboard'
import { useControls } from "./stores/controlsStore";
import { useEffect } from "react";


dayjs.locale("he");

export default function App() {
    const loadInitialData = useControls((state) => state.loadInitialData)

    useEffect(()=> {
        const currentIdSoldier = "12345"; 
        loadInitialData(currentIdSoldier);
    },[])

    return (
        // <ControlsProvider>
            <DateRangeProvider>
                <Routes>
                    <Route path="/" element={<GantPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </DateRangeProvider>
        // </ControlsProvider>    
    
    )
}   