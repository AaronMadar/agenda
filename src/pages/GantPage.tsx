import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import Gant from "@/components/gantpage/Gant";
import Header from "@/components/gantpage/Header";
import "@/style/index.css"
import { useDateRange } from '@/contexts/DateRangeContext';


dayjs.locale('he');



export default function GantPage() {

    const {
       loading
    } = useDateRange();

    




   

    if (loading) return <div>loading...</div>;


    return (
        <div className="gantpage-container">
            <Header  />
            <Gant  />
        </div>
    );
}