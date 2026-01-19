import Gant from "../components/dashboard/Gant";
import Header from "../components/dashboard/Header";
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
dayjs.locale('he');

import "../style/index.css"

export default function Dashboard() {


    const currentYear = new Date().getFullYear();
   // Le viewMode represente l'affichage dans le select time 
    const [viewMode, setViewMode] = useState<string>(`כל ${new Date().getFullYear()}`); //TODO change the name of the state 

    // Le startDate et endDate sont les valeurs des dates selectionnees dans le popover time mais par defaut elles affichent l'annee en cours   
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(`${currentYear}-01-01`));
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(`${currentYear}-12-31`));



    
    return (
        <div className="dashboard-container">
            <Header setViewMode={setViewMode} viewMode={viewMode} setStartDate={setStartDate} setEndDate={setEndDate} />
            <Gant  startDate={startDate} endDate={endDate}/>
            
        </div>
    );
}