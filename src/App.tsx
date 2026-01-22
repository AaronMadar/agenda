import { Routes, Route } from "react-router-dom";
import GantPage from '@/pages/GantPage'
import { Dashboard } from '@/pages/Dashboard'
import { DateRangeProvider } from "./contexts";


export default function App() {
    return (
        <DateRangeProvider>
            <Routes>
                <Route path="/" element={<GantPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </DateRangeProvider>
    )
}