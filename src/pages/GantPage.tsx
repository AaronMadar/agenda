import { Gant } from "@/components/gantpage/Gant";
import { Header } from "@/components/gantpage/Header";
import { useDateRange } from '@/contexts/DateRangeContext';

import "@/style/index.css"


export function GantPage() {

    const {
        loading
    } = useDateRange();

    if (loading) return <div>loading...</div>;

    return (
        <div className="gantpage-container">
            <Header />
            <Gant />
        </div>
    );
}