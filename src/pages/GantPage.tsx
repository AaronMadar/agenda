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

<<<<<<< Updated upstream
    // Le startDate et endDate sont les valeurs des dates selectionnees dans le popover time mais par defaut elles affichent l'annee en cours   
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(`${currentYear}-01-01`));
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(`${currentYear}-12-31`));
=======
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);

    // The periodView represents the display in the select time component
    const [periodView, setPeriodView] = useState<string>(`כל ${currentYear}`);

    // The startDate and endDate are the values ​​of the start and end dates of the timeline.  
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);

    useEffect(() => {
        fetch("/data.json")
            .then(res => res.json())
            .then(jsonData => {
                setData(jsonData);
                // Si aucune date n'est encore fixée par l'utilisateur, 
                // on initialise avec les dates du serveur
                setStartDate(prev => prev || dayjs(jsonData.period.start));
                setEndDate(prev => prev || dayjs(jsonData.period.end));
                setLoading(false)
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>loading...</div>;
>>>>>>> Stashed changes

    return (
        <div className="dashboard-container">
            <Header setPeriodView={setPeriodView} periodView={periodView} setStartDate={setStartDate} setEndDate={setEndDate} />
            <Gant  startDate={startDate} endDate={endDate}/>
            
        </div>
    );
}