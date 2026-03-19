import { Routes, Route } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/he";

import { ShibutzimProvider } from "@/contexts/ShibutzimContext";
import { GantPage } from '@/pages/GantPage'
import { Dashboard } from '@/pages/Dashboard'
import { useFilters } from "./stores/filtersStore";
import { useEffect } from "react";


dayjs.locale("he");

export default function App() {
    const loadFiltersData = useFilters((state) => state.loadFiltersData)

    useEffect(() => {
        const currentIdSoldier = "s12345";
        loadFiltersData(currentIdSoldier);
    }, [])

    return (
        <ShibutzimProvider>
            <Routes>
                <Route path="/" element={<GantPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </ShibutzimProvider>
    )
}