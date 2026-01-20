import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import Gant from "@/components/gantpage/Gant";
import Header from "@/components/gantpage/Header";
import "@/style/index.css"


dayjs.locale('he');

export default function GantPage() {
    const currentYear = new Date().getFullYear();
   // Le viewMode represente l'affichage dans le select time 
    const [periodView, setPeriodView] = useState<string>(`כל ${currentYear}`); //TODO change the name of the state 

    // Le startDate et endDate sont les valeurs des dates selectionnees dans le popover time mais par defaut elles affichent l'annee en cours   
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(`${currentYear}-01-01`));
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(`${currentYear}-12-31`));

    return (
        <div className="dashboard-container">
            <Header setPeriodView={setPeriodView} periodView={periodView} setStartDate={setStartDate} setEndDate={setEndDate} />
            <Gant  startDate={startDate} endDate={endDate}/>
            
        </div>
    );
}