import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import Gant from "@/components/gantpage/Gant";
import Header from "@/components/gantpage/Header";
import "@/style/index.css"


dayjs.locale('he');

export default function GantPage() {
    const currentYear = new Date().getFullYear();
    // The periodView represents the display in the select time component
    const [periodView, setPeriodView] = useState<string>(`כל ${currentYear}`);

    // The startDate and endDate are the values ​​of the start and end dates of the timeline.  
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(`${currentYear}-01-01`));
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(`${currentYear}-12-31`));

    return (
        <div className="gantpage-container">
            <Header setPeriodView={setPeriodView} periodView={periodView} setStartDate={setStartDate} setEndDate={setEndDate} />
            <Gant startDate={startDate} endDate={endDate} />
        </div>
    );
}