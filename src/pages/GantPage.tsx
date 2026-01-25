import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import Gant from "@/components/gantpage/Gant";
import Header from "@/components/gantpage/Header";
import "@/style/index.css"


dayjs.locale('he');

interface ShibutsApi {
    title: string;
    variationPastYear: number;
    dateBegin: string;
    dateEnd: string;
    ressource: Record<string, { quantity: number; price: number }>;
}

interface GdudApi {
    forceType: string;
    pikud: string;
    shibutsim: ShibutsApi[];
}

interface ApiResponse {
    unit: string;
    period: {
        start: string;
        end: string;
    };
    gdudim: Record<string, GdudApi>;
}


export default function GantPage() {
    const currentYear = new Date().getFullYear();


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


    return (
        <div className="gantpage-container">
            <Header setPeriodView={setPeriodView} periodView={periodView} setStartDate={setStartDate} setEndDate={setEndDate} />
            <Gant data={data} startDate={startDate} endDate={endDate} />
        </div>
    );
}