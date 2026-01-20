import React, { useState } from 'react';
import { Dayjs } from 'dayjs'; 

import SelectTime from "./header/SelectTime";
import PopoverTime from "./header/PopoverTime";
import "@/style/components/gantpage/Header.css"
import "@/style/index.css"


// Interface des props : Ajout de setters pour startDate et endDate
// Le parent (ex. Dashboard) doit passer ces setters pour que Header puisse les updater
interface HeaderProps {
    setPeriodView: (value: string) => void;
    periodView: string ;
    setStartDate: (date: Dayjs | null) => void;
    setEndDate: (date: Dayjs | null) => void;
}


export default function Header({ setPeriodView, periodView, setStartDate, setEndDate }: HeaderProps) {
    // AnchorEl contains the element where the popover will be anchored
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    // Fonction to open the popover on click of the calendar icon , when the anchor element is an element in the dom , it will open the popover near the element 
    const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget); // event.currentTarget is the element that was clicked
    };

    return (
        <header className="theme header">
            {/* right side : action icons*/}
            <div className="div-header-right">
                <div className="inner-div-header-right">
                    <i className='bi bi-funnel icone'></i>
                    <i className='bi bi-map icone'></i>
                    <i className='bi bi-bell icone'></i>
                    <i className='bi bi-search icone'></i>
                </div>
                <span className="vertical-line"></span>
                <div className="inner-div-header-left">
                    <i className='bi bi-pencil icone'></i>
                    <i className='bi bi-bookmark icone'></i>
                    <i className='bi bi-arrow-clockwise icone'></i>
                    <i className='bi bi-printer icone'></i>
                    <i className='bi bi-camera icone'></i>
                </div>
            </div>

            {/*left side : calendar and time selector */}
            <div className="div-header-left">
                <i 
                    className="bi bi-calendar-date icone" 
                    onClick={handleOpenPopover}                    
                ></i>

                {/* passing the setters to the popovertime to update the dates and reset the viewmode */}
                <PopoverTime 
                    anchorEl={anchorEl} 
                    setAnchorEl={setAnchorEl} 
                    setStartDate={setStartDate} 
                    setEndDate={setEndDate} 
                    setPeriodView={setPeriodView} 
                />

                <SelectTime setPeriodView={setPeriodView} periodView={periodView} setStartDate={setStartDate} setEndDate={setEndDate} />
            </div>
        </header>
    )
}