import { Routes, Route } from "react-router-dom";
import GantPage from '@/pages/GantPage'


export default function App() {
    return (
        <Routes>
            <Route path="/" element={<GantPage />} />
        </Routes>
    )
}