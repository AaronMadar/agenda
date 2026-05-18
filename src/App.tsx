import '@/style/index.css';
import 'dayjs/locale/he';

import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ShibutzimProvider } from '@/contexts/ShibutzimContext';
import { Dashboard } from '@/pages/Dashboard';
import { GantPage } from '@/pages/GantPage';

import { BudgetResourcesProvider } from './contexts/BudgetResourcesContext';
import { GantViewSettingsProvider } from './contexts/GantViewSettingsContext';
import { BudgetResourceDetails } from './pages/BudgetResourceDetails';
import { useFilters } from './stores/filtersStore';

dayjs.locale('he');
dayjs.extend(localeData);

export default function App() {
  const loadFiltersData = useFilters((state) => state.loadFiltersData);

  useEffect(() => {
    const currentIdSoldier = 's12345';
    loadFiltersData(currentIdSoldier);
  }, []);

  return (
    <GantViewSettingsProvider>
      <ShibutzimProvider>
        <BudgetResourcesProvider>
          <Routes>
            <Route path="/" element={<GantPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/details/:type/:category/:item?"
              element={<BudgetResourceDetails />}
            />
          </Routes>
        </BudgetResourcesProvider>
      </ShibutzimProvider>
    </GantViewSettingsProvider>
  );
}
