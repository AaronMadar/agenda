import { Routes, Route } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/he";
import localeData from "dayjs/plugin/localeData";

import { ShibutzimProvider } from "@/contexts/ShibutzimContext";
import { GantPage } from "@/pages/GantPage";
import { Dashboard } from "@/pages/Dashboard";
import { useFilters } from "./stores/filtersStore";
import { useEffect } from "react";
import { GantViewSettingsProvider } from "./contexts/GantViewSettingsContext";
import { BudgetResourceDetails } from "./pages/BudgetResourceDetails";

dayjs.locale("he");
dayjs.extend(localeData);

export default function App() {
  const loadFiltersData = useFilters((state) => state.loadFiltersData);

  useEffect(() => {
    const currentIdSoldier = "s12345";
    loadFiltersData(currentIdSoldier);
  }, []);

  return (
    <GantViewSettingsProvider>
      <ShibutzimProvider>
        <Routes>
          <Route path="/" element={<GantPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/details/budget-resources/:category/:item?" element={<BudgetResourceDetails />} />
        </Routes>
      </ShibutzimProvider>
    </GantViewSettingsProvider>
  );
}
