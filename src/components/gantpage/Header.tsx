import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SelectTime } from "./header/SelectTime";
import { PopoverTime } from "./header/PopoverTime";

import "@/style/components/gantpage/Header.css";
import { ControlsPanel } from '../shared/ControlsPanel';


export function Header() {
    const navigate = useNavigate();
    // AnchorEl contains the HtmlElement where the popover will be anchored
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget); // event.currentTarget is the element that was clicked
    };

    return (
        <header className="header">
            <div className="header-actions">
                <div className="header-actions-primary"> 
                    <i className='bi bi-speedometer2 header-icon' 
                    onClick={() => navigate('/dashboard')} 
                    title="Dashboard" /> 
                    <i className='bi bi-funnel header-icon' />
                    <i className='bi bi-map header-icon' />
                    <i className='bi bi-bell header-icon' />
                    <i className='bi bi-search header-icon' />
                </div>
                <span className="header-separator"></span>
                <div className="header-actions-secondary">
                    <i className='bi bi-pencil header-icon' />
                    <i className='bi bi-bookmark header-icon' />
                    <i className='bi bi-arrow-clockwise header-icon' />
                    <i className='bi bi-printer header-icon' />
                    <i className='bi bi-camera header-icon' />
                </div>
            </div>
            <div className="header-time-controls">
              

                <ControlsPanel/>    
            </div>
        </header>
    )
}