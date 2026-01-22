import { Routes, Route } from "react-router-dom";
import GantPage from '@/pages/GantPage'
import { Dashboard } from '@/pages/Dashboard'


export default function App() {
    return (
        <Routes>
            <Route path="/" element={<GantPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    )
}